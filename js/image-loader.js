// Enhanced Image Loader for Unsplash
// Improves image loading reliability and user experience

(function() {
    'use strict';
    
    // Configuration
    const config = {
        retryAttempts: 3,
        retryDelay: 1000,
        lazyLoadThreshold: 100,
        placeholderColor: '#f0f0f0'
    };
    
    // Image loading statistics
    const stats = {
        total: 0,
        loaded: 0,
        failed: 0,
        retrying: 0
    };
    
    // Retry queue
    const retryQueue = new Map();
    
    /**
     * Enhanced image loader with retry mechanism
     */
    function enhanceImageLoading() {
        const images = document.querySelectorAll('img');
        stats.total = images.length;
        
        images.forEach((img, index) => {
            // Skip if already processed
            if (img.dataset.enhanced) return;
            
            img.dataset.enhanced = 'true';
            img.dataset.index = index;
            
            // Add loading placeholder
            addLoadingPlaceholder(img);
            
            // Set up error handling
            setupImageErrorHandling(img);
            
            // Set up load success handling
            setupImageLoadHandling(img);
        });
        
        console.log(`🖼️ Enhanced ${stats.total} images with retry mechanism`);
    }
    
    /**
     * Add visual loading placeholder
     */
    function addLoadingPlaceholder(img) {
        if (!img.src) return;
        
        const wrapper = img.parentElement;
        if (wrapper && !wrapper.classList.contains('image-wrapper')) {
            img.style.backgroundColor = config.placeholderColor;
            img.style.minHeight = '200px';
        }
    }
    
    /**
     * Setup error handling with retry mechanism
     */
    function setupImageErrorHandling(img) {
        img.addEventListener('error', function(e) {
            const attempts = parseInt(img.dataset.retryAttempts || '0');
            
            if (attempts < config.retryAttempts) {
                console.warn(`⚠️ Image failed to load (attempt ${attempts + 1}/${config.retryAttempts}):`, img.src);
                retryImageLoad(img, attempts + 1);
            } else {
                console.error(`❌ Image failed after ${config.retryAttempts} attempts:`, img.src);
                handleImageLoadFailure(img);
                stats.failed++;
            }
        });
    }
    
    /**
     * Setup load success handling
     */
    function setupImageLoadHandling(img) {
        img.addEventListener('load', function() {
            if (img.dataset.retrying) {
                console.log(`✅ Image loaded successfully after retry:`, img.src);
                stats.retrying--;
            }
            stats.loaded++;
            removeLoadingPlaceholder(img);
        });
    }
    
    /**
     * Retry loading image with exponential backoff
     */
    function retryImageLoad(img, attemptNumber) {
        stats.retrying++;
        img.dataset.retryAttempts = attemptNumber;
        img.dataset.retrying = 'true';
        
        const delay = config.retryDelay * attemptNumber;
        const originalSrc = img.src;
        
        setTimeout(() => {
            // Add cache buster to force reload
            const url = new URL(originalSrc);
            url.searchParams.set('retry', attemptNumber);
            url.searchParams.set('t', Date.now());
            
            img.src = url.toString();
        }, delay);
    }
    
    /**
     * Handle permanent image load failure
     */
    function handleImageLoadFailure(img) {
        const alt = img.alt || 'Image';
        const wrapper = img.parentElement;
        
        // Create fallback placeholder
        const placeholder = document.createElement('div');
        placeholder.className = 'image-placeholder';
        placeholder.style.cssText = `
            width: 100%;
            height: 250px;
            background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            color: #999;
            font-size: 14px;
            text-align: center;
            padding: 20px;
        `;
        
        placeholder.innerHTML = `
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            <div style="margin-top: 10px;">${alt}</div>
            <div style="font-size: 11px; color: #ccc; margin-top: 5px;">Image temporarily unavailable</div>
        `;
        
        // Replace image with placeholder
        if (wrapper && wrapper.classList.contains('image-wrapper')) {
            wrapper.appendChild(placeholder);
            img.style.display = 'none';
        } else {
            img.parentNode.insertBefore(placeholder, img);
            img.style.display = 'none';
        }
    }
    
    /**
     * Remove loading placeholder
     */
    function removeLoadingPlaceholder(img) {
        img.style.backgroundColor = '';
        img.style.minHeight = '';
    }
    
    /**
     * Optimize Unsplash URLs
     */
    function optimizeUnsplashUrls() {
        const images = document.querySelectorAll('img[src*="unsplash.com"]');
        
        images.forEach(img => {
            const url = new URL(img.src);
            
            // Ensure optimal parameters
            if (!url.searchParams.has('auto')) {
                url.searchParams.set('auto', 'format');
            }
            if (!url.searchParams.has('q')) {
                url.searchParams.set('q', '80');
            }
            
            // Update if changed
            const newUrl = url.toString();
            if (img.src !== newUrl) {
                img.dataset.originalSrc = img.src;
                img.src = newUrl;
            }
        });
    }
    
    /**
     * Check network connectivity to Unsplash
     */
    async function checkUnsplashConnectivity() {
        const testUrl = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=50&h=50&fit=crop';
        
        try {
            const img = new Image();
            const loadPromise = new Promise((resolve, reject) => {
                img.onload = () => resolve(true);
                img.onerror = () => reject(false);
                setTimeout(() => reject(false), 5000); // 5 second timeout
            });
            
            img.src = testUrl;
            await loadPromise;
            
            console.log('✅ Unsplash connectivity: OK');
            return true;
        } catch (error) {
            console.warn('⚠️ Unsplash connectivity: Issues detected');
            showConnectivityWarning();
            return false;
        }
    }
    
    /**
     * Show connectivity warning banner
     */
    function showConnectivityWarning() {
        const banner = document.createElement('div');
        banner.id = 'connectivity-warning';
        banner.style.cssText = `
            position: fixed;
            top: 70px;
            left: 50%;
            transform: translateX(-50%);
            background: #fff3cd;
            color: #856404;
            padding: 12px 20px;
            border: 1px solid #ffeaa7;
            border-radius: 4px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            z-index: 9999;
            font-size: 14px;
            max-width: 90%;
            text-align: center;
            animation: slideDown 0.3s ease;
        `;
        
        banner.innerHTML = `
            <strong>⚠️ Network Notice:</strong> Some images may load slowly due to network conditions.
            <button onclick="this.parentElement.remove()" style="
                margin-left: 10px;
                background: transparent;
                border: none;
                color: #856404;
                cursor: pointer;
                font-weight: bold;
            ">×</button>
        `;
        
        // Add animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateX(-50%) translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(banner);
        
        // Auto-hide after 10 seconds
        setTimeout(() => {
            if (banner.parentElement) {
                banner.style.animation = 'slideDown 0.3s ease reverse';
                setTimeout(() => banner.remove(), 300);
            }
        }, 10000);
    }
    
    /**
     * Get loading statistics
     */
    function getStats() {
        return {
            ...stats,
            successRate: stats.total > 0 ? ((stats.loaded / stats.total) * 100).toFixed(1) + '%' : 'N/A'
        };
    }
    
    /**
     * Initialize enhanced image loading
     */
    function init() {
        // Check if page has images
        const images = document.querySelectorAll('img');
        if (images.length === 0) return;
        
        console.log('🚀 Initializing enhanced image loader...');
        
        // Check connectivity first
        checkUnsplashConnectivity();
        
        // Optimize URLs
        optimizeUnsplashUrls();
        
        // Enhance image loading
        enhanceImageLoading();
        
        // Report stats after initial load
        window.addEventListener('load', () => {
            setTimeout(() => {
                const currentStats = getStats();
                console.log('📊 Image Loading Statistics:', currentStats);
                
                if (stats.failed > 0) {
                    console.warn(`⚠️ ${stats.failed} images failed to load after retries`);
                }
            }, 2000);
        });
        
        // Re-enhance dynamically added images
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeName === 'IMG') {
                        enhanceImageLoading();
                    } else if (node.querySelectorAll) {
                        const newImages = node.querySelectorAll('img');
                        if (newImages.length > 0) {
                            enhanceImageLoading();
                        }
                    }
                });
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Expose API for debugging
    window.imageLoader = {
        getStats,
        retry: enhanceImageLoading,
        checkConnectivity: checkUnsplashConnectivity
    };
    
})();

