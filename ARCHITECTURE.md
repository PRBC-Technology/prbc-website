# PRBC Website - Architecture & Technical Details

> Historical snapshot: This analysis describes the earlier WordPress export.
> The current site is at the repository root and contains Home, About and Contact; older pages and migration
> files have been removed. See `QUICK_START.md` for current guidance.

## Component Structure

### Homepage Layout

```
┌─────────────────────────────────────────────────┐
│  HEADER (navy background)                       │
│  ┌────────────────────────────────────────────┐ │
│  │ Logo | Nav: About | Connect | Events | ... │ │  Mobile: burger menu
│  └────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  HERO SECTION (navy bg + image)                 │
│  ┌────────────────────┐  ┌─────────────────┐   │
│  │ Family following   │  │   Hero Image    │   │
│  │ *Jesus*            │  │   (community    │   │
│  │                    │  │    photo)       │   │
│  │ 9 AM Sunday        │  │                 │   │
│  │ [Buttons]          │  │                 │   │
│  └────────────────────┘  └─────────────────┘   │
│  FAITH · FAMILY · COMMUNITY                     │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  WELCOME SECTION (white bg)                     │
│  "Life is better *together*"                    │
│  [Intro copy + CTA link]                        │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  FEATURES SECTION (cream bg)                    │
│  "Find Your Next Step"                          │
│  ┌──────────────────┐  ┌──────────────────┐    │
│  │ GET CONNECTED    │  │ WHAT'S ON        │    │  Cards:
│  │ [Image]          │  │ [Image]          │    │  - Hover effect
│  │ Find your people │  │ Explore events   │    │  - Links to Church Center
│  │ → →              │  │ → →              │    │
│  └──────────────────┘  └──────────────────┘    │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  COMMUNITY SERVICE SECTION (white + peach image)│
│  "For our neighbours. For our community."       │
│  [Community Service Sunday info]                │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  PASTORS SECTION (navy bg + white text)         │
│  "We'd love to meet you"                        │
│  [Quote] [Pastor photo] [Signature]             │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  VISIT SECTION (split layout)                   │
│  ┌──────────────┐  ┌────────────────────────┐   │
│  │ Visit Details│  │   Google Map Embed     │   │
│  │ Service time │  │   [Interactive map]    │   │
│  │ Address      │  │                        │   │
│  │ Get directions   │                        │   │
│  │ Contact info │  │                        │   │
│  └──────────────┘  └────────────────────────┘   │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  FOOTER (navy bg)                               │
│  ┌────────────────────────────────────────────┐ │
│  │ Links  │  Contact  │  Social Media        │ │
│  │ About  │  Address  │  Facebook            │ │
│  │ Blog   │  Email    │  [Year] © PRBC       │ │
│  └────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

---

## CSS Architecture

### File Organization

```
static-site/
├── home.css           ← Homepage-specific styles
│                       (layout, components, responsive)
│
├── brand.css          ← Brand identity & legacy content
│                       (colors, fonts, legacy WP content styling)
│
├── pages.css          ← General page styles
├── inner-pages.css    ← Inner page specific
├── responsive.css     ← Additional responsive styles
└── [others]
```

### CSS Custom Properties (Variables)

```css
:root {
  /* Colors */
  --navy: #003057;          /* Primary dark blue */
  --aqua: #00bfb2;          /* Teal accent */
  --peach: #ffdbb2;         /* Warm accent */
  --cream: #bbe5f0;         /* Light backgrounds */
  
  /* Typography */
  --body: 'PRBC Montserrat', sans-serif;
  --head: 'PRBC Montserrat', sans-serif;
  
  /* Responsive */
  /* Media query based adjustments */
}
```

### Component Classes

```css
.header              ← Navigation bar
.hero                ← Hero section
.hero-grid           ← Hero layout (2-column on desktop, 1 on mobile)
.hero-copy           ← Left text area
.hero-art            ← Right image area
.section             ← Generic section with padding
.shell               ← Content container (max-width: 1320px)
.eyebrow             ← Small uppercase labels
.cards               ← Feature card grid
.feature-card        ← Individual card with hover effect
.button              ← CTA buttons
.text-link           ← Text-based links with underline
.arrow-link          ← Links with arrow decoration
.footer              ← Footer section
```

---

## JavaScript Functionality

### home.js - Menu Toggle

```javascript
// Initialize menu toggle button
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');

// Click handler: toggle menu state
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  document.body.classList.toggle('menu-open', !open);
  toggle.querySelector('.sr-only').textContent = open ? 'Open menu' : 'Close menu';
});

// Click on nav link: close menu
nav.addEventListener('click', event => {
  if (event.target.closest('a')) {
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    toggle.querySelector('.sr-only').textContent = 'Open menu';
  }
});
```

**Key Features:**
- Vanilla JS (no frameworks)
- ARIA attributes for accessibility
- Body class toggle for menu state
- Screen reader text updates

---

## Responsive Design

### Breakpoints

```css
/* Desktop (default styles) */
900px+ width

/* Tablet */
@media (max-width: 900px) {
  - Adjust grid layouts (2-col → 1-col where needed)
  - Shrink padding/margins
  - Move hero image
  - Show mobile menu toggle
}

/* Mobile */
@media (max-width: 600px) {
  - Single column layouts
  - Smaller fonts (using clamp())
  - Stack all sections vertically
  - Full-width images
  - Hide secondary elements
  - Adjust footer layout
}
```

### Fluid Typography

```css
h1 {
  font-size: clamp(62px, 6.6vw, 100px);
  /* Min: 62px, Preferred: 6.6vw, Max: 100px */
}
```

---

## SEO & Structured Data

### Schema.org JSON-LD

```json
{
  "@context": "https://schema.org",
  "@type": "Church",
  "@id": "https://prbc.org.au/#church",
  "name": "Park Ridge Baptist Church",
  "alternateName": "PRBC",
  "url": "https://prbc.org.au/",
  "description": "A Spirit-filled Baptist church...",
  "image": "https://prbc.org.au/assets/hero-original.jpg",
  "email": "admin@prbc.org.au",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "3922 Mount Lindesay Highway",
    "addressLocality": "Park Ridge",
    "addressRegion": "QLD",
    "postalCode": "4125",
    "addressCountry": "AU"
  },
  "sameAs": ["https://www.facebook.com/ParkRidgeBaptist"]
}
```

### Meta Tags

```html
<!-- Basic -->
<title>Park Ridge Baptist Church | Park Ridge, Logan QLD</title>
<meta name="description" content="Join Park Ridge Baptist Church...">

<!-- Canonical -->
<link rel="canonical" href="https://prbc.org.au/">

<!-- Open Graph (Social) -->
<meta property="og:type" content="website">
<meta property="og:site_name" content="Park Ridge Baptist Church">
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="...">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
```

### Sitemaps & Robots

```
robots.txt
- Allow all bots
- Declare sitemap location

sitemap.xml
- Lists all indexable pages
- Includes last modified dates
- Prioritizes key pages
```

---

## Performance Optimizations

### Font Delivery

```css
@font-face {
  font-family: 'PRBC Montserrat';
  src: url('assets/fonts/montserrat-regular.woff2') format('woff2');
  font-display: swap;  /* Show fallback while loading */
}
```

**Benefits:**
- WOFF2 format (modern, compressed)
- font-display: swap (no invisible text)
- System font fallback

### Image Optimization

```html
<!-- Lazy loading for below-fold images -->
<img src="..." alt="..." loading="lazy">

<!-- Responsive images -->
<img src="..." alt="..." srcset="...">
```

### CSS Optimization

- Minimal CSS (no build step needed)
- CSS variables reduce duplication
- Responsive mobile-first approach
- No vendor prefixes needed (modern browsers)

---

## Deployment Details

### GitHub Pages Build

```bash
build_pages.py workflow:
1. Copy static-site/ → pages-dist/
2. Add path prefix (/prbc-website) to all asset paths
3. Remove canonical tags
4. Remove structured data (JSON-LD)
5. Remove robots.txt and sitemap.xml
6. Add noindex meta tag to all HTML
7. Update og:url to GitHub Pages domain
8. Create .nojekyll file
```

**Result**: Public preview that doesn't compete with production site

## File Size & Performance

### Typical Page Sizes

| Item | Size |
|------|------|
| index.html | ~9.3 KB |
| home.css | ~12 KB |
| brand.css | ~4 KB |
| hero-original.jpg | ~341 KB |
| Montserrat WOFF2 (all weights) | ~60 KB total |
| Full homepage (HTML + CSS + Fonts) | ~500 KB |

### Perceived Performance
- Fonts load via WOFF2 (modern, compressed)
- Hero image loads eagerly as the main page's prominent image
- CSS-only animations (no JavaScript)
- No external dependencies
- No tracking scripts

---

## Browser Support

### Target Browsers
- Modern Chrome/Edge (Chromium-based)
- Firefox (current)
- Safari (iOS 13+)
- Mobile browsers

### Features Used
- CSS Grid & Flexbox
- CSS Custom Properties
- WOFF2 fonts
- Semantic HTML5
- Native lazy loading
- Fetch API (if used)

### Fallbacks
- System fonts if WOFF2 fails
- CSS Grid fallback for older browsers
- Progressive enhancement (JS optional)

---

## Security Considerations

### Content Security
- No user input processing (static site)
- No backend services
- No database
- No sensitive data stored in files

### Git Repository
- Credentials excluded from git
- `.gitignore` excludes node_modules, secrets
- Public repository (no sensitive data)

---

## Future Scalability

### If Content Grows
```
Current: ~15 pages
├── Organize into categories
├── Create index pages
└── Implement search functionality
```

### If Interactivity Needed
```
Current: Minimal JS (menu only)
├── Add form validation
├── Add event filtering
├── Add member portal
└── Consider lightweight framework
```

### If Dynamic Content Needed
```
Current: Static HTML
├── Migrate to static site generator (11ty, Hugo)
├── Implement CMS integration
├── Add API endpoints
└── Consider headless CMS
```

---

## Maintenance & Monitoring

### Regular Tasks
1. **Content Updates**: Edit static files, git commit, push
2. **Link Checks**: Monthly validation of external links
3. **Image Optimization**: Compress new images before adding
4. **Security Updates**: Keep dependencies current (fonts, tools)
5. **Analytics**: Monitor Google Search Console data
6. **Backups**: Git history serves as backup

### Monitoring
- Google Search Console: impressions, clicks, indexing
- GitHub Pages: build logs
- Web server logs: traffic, errors
- Manual: Test links, forms, accessibility

---

**Last Updated**: November 7, 2026
