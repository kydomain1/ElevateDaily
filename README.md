# ElevateDaily - Minimalist Lifestyle Blog

A beautifully designed, minimalist blog website featuring curated content across six lifestyle categories.

## Features

### Design
- **Minimalist Aesthetic**: Clean lines, ample whitespace, limited color palette
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices
- **Smooth Animations**: Elegant transitions and scroll-based animations
- **Modern Typography**: Inter font family for optimal readability

### Functionality
- **6 Categories**: Fashion & Accessories, Health & Beauty, Home & Garden, Travel & Accommodation, Finance & Insurance, Food & Beverage
- **Search**: Real-time article search functionality
- **Category Filtering**: Easy navigation through content categories
- **Pagination**: Clean pagination for blog post listings
- **5 Detailed Articles**: Comprehensive blog posts with images and product recommendations

### Pages
- **Home**: Hero section, category filters, blog grid, search functionality
- **About**: Company mission, values, and philosophy
- **Contact**: Contact form with validation
- **Article Pages**: Individual article pages with rich content and product recommendations

## Project Structure

```
ElevateDaily/
├── index.html              # Homepage with blog listings
├── about.html              # About page
├── contact.html            # Contact page
├── article.html            # Article detail page template
├── css/
│   └── style.css           # Main stylesheet with minimalist design
├── js/
│   ├── data.js             # Blog articles data
│   ├── main.js             # Main JavaScript functionality
│   └── contact.js          # Contact form handling
└── README.md               # This file
```

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Flexbox, Grid, animations
- **JavaScript (ES6+)**: Dynamic content rendering, filtering, search
- **Google Fonts**: Inter typeface
- **Unsplash**: High-quality stock images

## Features in Detail

### Category System
Articles are organized into 6 main categories:
- Fashion & Accessories
- Health & Beauty
- Home & Garden
- Travel & Accommodation
- Finance & Insurance
- Food & Beverage

### Search Functionality
Real-time search across article titles, excerpts, and categories.

### Responsive Design
Breakpoints at:
- Mobile: < 480px
- Tablet: 768px
- Desktop: 1200px

### Article Content
Each article includes:
- Featured image
- Multiple in-content images
- Product recommendations with ratings
- Detailed reviews and descriptions
- Read time estimation
- Publication date

## Articles Included

1. **The Essential Guide to Minimalist Fashion in 2025** (January 2025)
   - Category: Fashion & Accessories
   - Focus: Capsule wardrobes, sustainable fashion, product recommendations

2. **Clean Beauty Revolution: Natural Skincare Products That Actually Work** (March 2025)
   - Category: Health & Beauty
   - Focus: Clean beauty ingredients, skincare routine, product reviews

3. **Smart Home Essentials: Creating a Minimalist Connected Living Space** (May 2025)
   - Category: Home & Garden
   - Focus: Smart home devices, minimalist integration, product recommendations

4. **Slow Travel Movement: Discovering Authentic Experiences in 2025** (June 2025)
   - Category: Travel & Accommodation
   - Focus: Slow travel philosophy, accommodation platforms, sustainable tourism

5. **Sustainable Investing: Building Wealth While Making an Impact** (August 2025)
   - Category: Finance & Insurance
   - Focus: ESG investing, sustainable platforms, investment strategies

## Getting Started

1. **Open the website**: Simply open `index.html` in a modern web browser
2. **No build process required**: This is a static website that runs entirely in the browser
3. **All images are loaded from Unsplash CDN**: No local image files needed

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Customization

### Changing Colors
Edit CSS variables in `css/style.css`:
```css
:root {
    --color-primary: #1a1a1a;
    --color-accent: #000000;
    /* ... more variables */
}
```

### Adding Articles
Add new article objects to the `blogArticles` array in `js/data.js`:
```javascript
{
    id: 6,
    title: "Your Article Title",
    slug: "your-article-slug",
    category: "category-name",
    // ... more properties
}
```

### Modifying Layout
All layout styles are in `css/style.css`. Key sections:
- Navigation: `.nav-container`
- Hero: `.hero`
- Blog Grid: `.blog-grid`
- Article Page: `.article-content`

## Performance Optimizations

- Lazy loading for images
- CSS animations with GPU acceleration
- Debounced search functionality
- Efficient DOM manipulation
- Intersection Observer for scroll animations

## Accessibility

- Semantic HTML elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Sufficient color contrast ratios
- Responsive text sizing

## Social Media Integration

The website includes linked social media icons for:
- Facebook
- Twitter
- Instagram
- Pinterest

Update the href attributes in the footer to link to your actual social media profiles.

## License

This project is created for educational and portfolio purposes.

## Credits

- Design: Minimalist aesthetic inspired by modern web design principles
- Images: [Unsplash](https://unsplash.com)
- Icons: SVG icons (social media)
- Fonts: [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)

---

**ElevateDaily** - Elevate Your Everyday


