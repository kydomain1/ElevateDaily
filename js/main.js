// Main JavaScript for ElevateDaily

// Global Variables
let currentPage = 1;
let postsPerPage = 6;
let currentCategory = 'all';
let searchQuery = '';
let filteredArticles = [];

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Dropdown handling for mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                this.classList.toggle('active');
            }
        });
    });

    // Initialize if on blog page
    if (document.getElementById('blogGrid')) {
        initializeBlog();
    }

    // Scroll animations
    initScrollAnimations();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Category filter links
    const categoryLinks = document.querySelectorAll('[data-category]');
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.classList.contains('filter-chip')) {
                e.preventDefault();
                const category = this.getAttribute('data-category');
                filterByCategory(category);
            }
        });
    });

    // Check if on article page
    const articleSlug = getArticleSlugFromURL();
    if (articleSlug && !document.getElementById('blogGrid')) {
        loadArticle(articleSlug);
    }
});

// Initialize Blog Functions
function initializeBlog() {
    filteredArticles = [...blogArticles];
    
    // Search functionality
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    // Filter chips
    const filterChips = document.querySelectorAll('.filter-chip');
    filterChips.forEach(chip => {
        chip.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterByCategory(category);
        });
    });

    // Pagination
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) prevBtn.addEventListener('click', () => changePage(currentPage - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => changePage(currentPage + 1));

    // Initial render
    renderBlog();
}

// Filter by Category
function filterByCategory(category) {
    currentCategory = category;
    currentPage = 1;
    
    // Clear search query when changing category
    searchQuery = '';
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
    }
    
    // Update active filter chip
    const filterChips = document.querySelectorAll('.filter-chip');
    filterChips.forEach(chip => {
        chip.classList.remove('active');
        if (chip.getAttribute('data-category') === category) {
            chip.classList.add('active');
        }
    });
    
    // Filter articles
    if (category === 'all') {
        filteredArticles = [...blogArticles];
    } else {
        filteredArticles = blogArticles.filter(article => article.category === category);
    }
    
    renderBlog();
}

// Search Functionality
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    searchQuery = searchInput.value.trim().toLowerCase();
    currentPage = 1;
    
    // Start with current category filter
    if (currentCategory === 'all') {
        filteredArticles = [...blogArticles];
    } else {
        filteredArticles = blogArticles.filter(article => article.category === currentCategory);
    }
    
    // Apply search on top of category filter
    applySearch();
    renderBlog();
}

function applySearch() {
    if (searchQuery) {
        filteredArticles = filteredArticles.filter(article => 
            article.title.toLowerCase().includes(searchQuery) ||
            article.excerpt.toLowerCase().includes(searchQuery) ||
            article.categoryName.toLowerCase().includes(searchQuery)
        );
    }
}

// Render Blog Posts
function renderBlog() {
    const blogGrid = document.getElementById('blogGrid');
    if (!blogGrid) return;
    
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const postsToShow = filteredArticles.slice(startIndex, endIndex);
    
    if (postsToShow.length === 0) {
        blogGrid.innerHTML = '<div class="no-results"><h3>No articles found</h3><p>Try adjusting your filters or search query.</p></div>';
        updatePagination();
        return;
    }
    
    blogGrid.innerHTML = postsToShow.map(article => `
        <article class="blog-card" onclick="navigateToArticle('${article.slug}')">
            <img src="${article.featuredImage}" alt="${article.title}" class="blog-card-image" loading="lazy">
            <div class="blog-card-content">
                <div class="blog-card-category">${article.categoryName}</div>
                <h2 class="blog-card-title">${article.title}</h2>
                <p class="blog-card-excerpt">${article.excerpt}</p>
                <div class="blog-card-meta">
                    <span>${article.date}</span>
                    <span class="read-more">${article.readTime} →</span>
                </div>
            </div>
        </article>
    `).join('');
    
    updatePagination();
    
    // Trigger scroll animations for new elements
    setTimeout(() => {
        const cards = document.querySelectorAll('.blog-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'all 0.5s ease';
                requestAnimationFrame(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                });
            }, index * 50);
        });
    }, 10);
}

// Pagination
function updatePagination() {
    const totalPages = Math.ceil(filteredArticles.length / postsPerPage);
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const pageNumbers = document.getElementById('pageNumbers');
    
    // Update prev/next buttons
    if (prevBtn) prevBtn.disabled = currentPage === 1;
    if (nextBtn) nextBtn.disabled = currentPage === totalPages || totalPages === 0;
    
    // Generate page numbers
    if (pageNumbers) {
        let numbersHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 || 
                i === totalPages || 
                (i >= currentPage - 1 && i <= currentPage + 1)
            ) {
                numbersHTML += `
                    <button class="page-number ${i === currentPage ? 'active' : ''}" 
                            onclick="changePage(${i})">${i}</button>
                `;
            } else if (i === currentPage - 2 || i === currentPage + 2) {
                numbersHTML += '<span>...</span>';
            }
        }
        pageNumbers.innerHTML = numbersHTML;
    }
}

function changePage(page) {
    const totalPages = Math.ceil(filteredArticles.length / postsPerPage);
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    renderBlog();
    
    // Scroll to top of blog section
    const blogSection = document.querySelector('.blog-section');
    if (blogSection) {
        blogSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Navigate to Article
function navigateToArticle(slug) {
    window.location.href = `article.html?slug=${slug}`;
}

// Get Article Slug from URL
function getArticleSlugFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('slug');
}

// Load and Display Article
function loadArticle(slug) {
    const article = blogArticles.find(a => a.slug === slug);
    
    if (!article) {
        document.body.innerHTML = '<div class="container"><h1>Article not found</h1></div>';
        return;
    }
    
    // Update page title
    document.title = `${article.title} - ElevateDaily`;
    
    // Create article page structure
    const articleHTML = `
        <article class="article-page">
            <header class="article-header">
                <div class="article-category">${article.categoryName}</div>
                <h1 class="article-title">${article.title}</h1>
                <div class="article-meta">
                    <span>${article.date}</span>
                    <span>•</span>
                    <span>${article.readTime}</span>
                </div>
            </header>
            
            <img src="${article.featuredImage}" alt="${article.title}" class="article-featured-image">
            
            <div class="article-content">
                ${article.content}
            </div>
        </article>
    `;
    
    // Find the main content area (after nav, before footer)
    const nav = document.querySelector('.nav-container');
    const footer = document.querySelector('.footer');
    
    if (nav && footer) {
        // Remove everything between nav and footer
        let current = nav.nextElementSibling;
        while (current && current !== footer) {
            const next = current.nextElementSibling;
            current.remove();
            current = next;
        }
        
        // Insert article
        footer.insertAdjacentHTML('beforebegin', articleHTML);
    }
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all fade-in-scroll elements
    document.querySelectorAll('.fade-in-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Utility: Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Reset mobile menu on desktop
        if (window.innerWidth > 768) {
            const navMenu = document.getElementById('navMenu');
            if (navMenu) navMenu.classList.remove('active');
        }
    }, 250);
});

// Lazy loading images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    // Observer will be applied when images with data-src are added
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}


