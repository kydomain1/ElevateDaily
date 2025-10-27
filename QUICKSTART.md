# ElevateDaily - Quick Start Guide

## 🚀 Getting Started in 2 Minutes

### Method 1: Direct File Opening
1. Navigate to the `ElevateDaily` folder
2. Double-click `index.html`
3. Your default browser will open the website

### Method 2: Local Server (Recommended)
For a better experience, use a local web server:

**Using Python 3:**
```bash
cd ElevateDaily
python -m http.server 8000
```
Then open: http://localhost:8000

**Using Node.js (with http-server):**
```bash
cd ElevateDaily
npx http-server -p 8000
```
Then open: http://localhost:8000

**Using VS Code:**
- Install "Live Server" extension
- Right-click `index.html`
- Select "Open with Live Server"

## 📱 Features Overview

### Homepage (index.html)
✅ **Hero Section** - Clean, minimalist welcome message
✅ **Search Bar** - Real-time article search
✅ **Category Filters** - 6 category chips for filtering
✅ **Blog Grid** - Responsive card layout
✅ **Pagination** - Navigate through articles
✅ **Responsive Navigation** - Mobile-friendly menu

### Article Pages (article.html)
✅ **Dynamic Content** - Articles load based on URL parameter
✅ **Product Recommendations** - Embedded product cards
✅ **Rich Media** - Multiple images per article
✅ **Clean Typography** - Optimized for reading

### About Page (about.html)
✅ **Mission Statement** - Company values and philosophy
✅ **Value Cards** - Four core values in card format
✅ **Scroll Animations** - Elements fade in on scroll

### Contact Page (contact.html)
✅ **Contact Form** - Validated submission form
✅ **Success Notifications** - User feedback on submission
✅ **Social Links** - Connect via social media

## 🎨 Design Features

### Minimalist Aesthetic
- **Large Whitespace**: Breathing room for content
- **Limited Colors**: Black, white, and grays
- **Clean Lines**: Simple borders and separators
- **Simple Typography**: Inter font family

### Animations
- **Fade In**: Hero elements on page load
- **Scroll Animations**: Content appears while scrolling
- **Hover Effects**: Subtle transitions on interactive elements
- **Smooth Navigation**: Animated page transitions

## 📝 Using the Website

### Browsing Articles
1. **Home Page**: View all 5 articles in grid layout
2. **Filter by Category**: Click category chips to filter
3. **Search**: Type keywords in search bar
4. **Click Any Card**: Opens full article

### Reading Articles
- Articles include comprehensive content
- Product recommendations with ratings
- Multiple high-quality images
- Related information and tips

### Categories
1. **Fashion & Accessories** - Style guides, wardrobe essentials
2. **Health & Beauty** - Skincare, wellness products
3. **Home & Garden** - Smart home, interior design
4. **Travel & Accommodation** - Travel tips, booking platforms
5. **Finance & Insurance** - Investment advice, financial planning
6. **Food & Beverage** - Coming soon (extendable)

## 🛠️ Customization Guide

### Change Site Colors
Edit `css/style.css` (lines 13-21):
```css
:root {
    --color-primary: #1a1a1a;      /* Main text */
    --color-accent: #000000;        /* Headings, buttons */
    --color-background: #ffffff;    /* Background */
    --color-border: #e5e5e5;       /* Borders */
}
```

### Add New Article
Edit `js/data.js` and add to `blogArticles` array:
```javascript
{
    id: 6,
    title: "Your New Article Title",
    slug: "your-article-slug",
    category: "food",  // or any category
    categoryName: "Food & Beverage",
    date: "September 15, 2025",
    readTime: "7 min read",
    excerpt: "Article summary...",
    featuredImage: "https://images.unsplash.com/...",
    content: `
        <p>Your article content here...</p>
        <!-- Add more HTML content -->
    `,
    images: [/* Array of image URLs */]
}
```

### Update Social Media Links
Edit footer in `index.html`, `about.html`, `contact.html`:
```html
<a href="https://facebook.com/yourpage" target="_blank" class="social-icon">
```

### Modify Navigation
Edit nav menu in HTML files:
```html
<ul class="nav-menu" id="navMenu">
    <li><a href="your-page.html" class="nav-link">Your Page</a></li>
</ul>
```

## 📊 5 Articles Included

| # | Title | Category | Date | Content |
|---|-------|----------|------|---------|
| 1 | Minimalist Fashion Guide | Fashion | Jan 2025 | Wardrobe essentials, sustainable brands |
| 2 | Clean Beauty Revolution | Health | Mar 2025 | Natural skincare, product reviews |
| 3 | Smart Home Essentials | Home | May 2025 | Connected devices, minimal design |
| 4 | Slow Travel Movement | Travel | Jun 2025 | Authentic experiences, platforms |
| 5 | Sustainable Investing | Finance | Aug 2025 | ESG investing, wealth building |

Each article includes:
- 📸 4-5 high-quality images
- 🛍️ 3 product recommendations with ratings
- 📝 1000-1500 words of content
- ⭐ Detailed reviews and insights

## 🧪 Testing Checklist

- [ ] Open homepage - layout looks clean
- [ ] Click each category filter - articles filter correctly
- [ ] Search for "fashion" - search works
- [ ] Click pagination - navigation works
- [ ] Open an article - content loads properly
- [ ] Resize browser - responsive design works
- [ ] Open on mobile device - mobile menu works
- [ ] Submit contact form - validation works
- [ ] Scroll through pages - animations trigger

## 🌐 Browser Compatibility

✅ **Chrome** - Full support
✅ **Firefox** - Full support  
✅ **Safari** - Full support
✅ **Edge** - Full support
✅ **Mobile Browsers** - Responsive design

## 💡 Tips

1. **Images Load from Unsplash**: No local files needed, requires internet
2. **No Backend**: This is a static site, contact form is demo only
3. **Extend Easily**: Add more articles, categories, or pages
4. **SEO Ready**: Semantic HTML, proper heading structure
5. **Fast Loading**: Minimal JavaScript, optimized CSS

## 🎯 Project Goals Achieved

✅ **Minimalist Design** - Clean, focused, spacious
✅ **6 Categories** - All lifestyle areas covered
✅ **5 Detailed Articles** - Rich, valuable content
✅ **Product Recommendations** - Real-world product reviews
✅ **Search & Filter** - Easy content discovery
✅ **Pagination** - Organized content display
✅ **Responsive Design** - Works on all devices
✅ **Smooth Animations** - Professional feel
✅ **Social Integration** - Connect with audience

## 📞 Need Help?

- Check `README.md` for detailed documentation
- Review code comments in JavaScript files
- Inspect CSS for styling details
- All code is well-organized and commented

---

**Enjoy your minimalist blog!** ✨


