# PRBC Website - Project Analysis

> Historical snapshot: This analysis describes the earlier WordPress export.
> The current site is at the repository root and contains Home, About and Contact; older pages and migration
> files have been removed. See `QUICK_START.md` for current guidance.

## Project Overview

**Project Name:** PRBC Website (Park Ridge Baptist Church)  
**Repository:** PRBC-Technology/prbc-website  
**Live Domain:** https://prbc.org.au/  
**Purpose:** Official website for Park Ridge Baptist Church, a Spirit-filled Baptist church community in Park Ridge, Queensland, Australia

---

## Core Mission & Purpose

The website serves as the digital home for Park Ridge Baptist Church, enabling:
- **Community engagement**: Connecting with current and prospective members
- **Event management**: Showcasing upcoming events and services
- **Information dissemination**: Sharing church details, service times, location, contact info
- **Local SEO**: Establishing verified online presence for local search discovery
- **Faith communication**: Communicating the church's mission and welcoming newcomers

---

## Project Architecture

### 📁 Directory Structure

```
PRBC Website/
├── static-site/              # Production-ready website (deployed to prbc.org.au)
│   ├── index.html            # Homepage
│   ├── about/index.html      # About page
│   ├── contact/index.html    # Contact page
│   ├── services/index.html   # Services page
│   ├── blog/index.html       # Blog page
│   ├── events/               # Event listings (list, month, today views)
│   ├── event/                # Individual event pages (dynamically populated)
│   ├── donation-info/        # Donation information
│   ├── our-locations/        # Location details
│   ├── assets/               # Images, fonts, favicon
│   │   └── fonts/            # WOFF2 font files (Montserrat, Noto Serif)
│   ├── site-content/         # WordPress-extracted content (plugins, themes, uploads)
│   ├── site-libraries/       # Reusable blocks and JS libraries
│   ├── *.css                 # Stylesheets (home.css, brand.css, responsive.css, etc.)
│   ├── home.js               # Homepage interactive behavior
│   ├── robots.txt            # SEO robot directives
│   └── sitemap.xml           # XML sitemap for search engines
│
├── pages-dist/               # GitHub Pages build (auto-generated from static-site)
│   └── [Same structure as static-site with modifications]
│
├── scripts/
│   └── build_pages.py        # Build script for GitHub Pages (adds noindex, path prefixes)
│
├── PRBC Fonts/               # Brand typeface files
│   ├── NotoSerif-LightItalic.ttf
│   └── Montserrat/           # Multiple weights and styles
│
├── clone-site.py             # Python script to scrape/clone from WordPress
├── pages-api.json            # WordPress API export of all pages
├── original-home.html        # Original homepage reference
├── README.md                 # Project brief
├── SEO-NOTES.md              # Local SEO strategy and research
└── .github/workflows/        # GitHub Actions CI/CD
```

---

## Technology Stack

### Frontend Technologies
- **HTML5**: Semantic markup for accessibility
- **CSS3**: Custom styling with CSS custom properties (CSS Variables)
  - `home.css`: Homepage-specific layout and components
  - `brand.css`: Brand colors, typography, legacy WordPress content styling
  - `pages.css`, `inner-pages.css`, `responsive.css`: Additional styling modules
- **JavaScript (Vanilla)**: Minimal, no frameworks
  - `home.js`: Mobile menu toggle, accessibility features
  - Typical features: burger menu, smooth scrolling, interactive elements

### Assets & Design
- **Fonts**: 
  - Montserrat (brand font, multiple weights: Regular, Medium, SemiBold, Bold)
  - Noto Serif Light Italic (accent styling)
  - Delivered as WOFF2 for modern browsers
- **Images**: PNG, JPG (hero images, community photos, team photos)
- **Favicon**: PNG format

### Build & Deployment
- **Python Scripts**: 
  - `clone-site.py`: Scrapes WordPress site to create static copy
  - `build_pages.py`: Prepares GitHub Pages deployment with noindex headers
- **GitHub Pages**: Public preview/staging
- **Git**: Version control

---

## Design System & Brand

### Color Palette (from CSS variables)
- **Navy/Ink** (`#003057`): Primary dark color for headers, footers, text
- **Aqua** (`#00bfb2`): Secondary accent color
- **Peach** (`#ffdbb2`): Tertiary accent for highlights
- **Cream** (`#bbe5f0`): Light background sections
- **White** (`#fff`): Clean backgrounds

### Typography
- **Body**: Montserrat (Sans-serif, modern, friendly)
- **Headings**: Montserrat (Bold, SemiBold variants)
- **Accents**: Noto Serif Light Italic (elegant, editorial feel)

### Visual Hierarchy
- Clean, minimal design with strong visual separation
- Generous whitespace and clear sectioning
- Hero images dominate above-the-fold
- Card-based component system for feature listings

---

## Key Features & Sections

### Homepage Sections
1. **Header/Navigation**
   - Responsive burger menu on mobile
   - Brand logo and church name
   - Main navigation: About, Logan Connect, Events, Connect, Contact, "Find us" CTA

2. **Hero Section**
   - Hero image with text overlay
   - Main heading: "Family following Jesus"
   - Service time and Community Service Sunday note
   - Call-to-action buttons: "Come say hello", "Get to know us"

3. **Welcome Section**
   - Intro copy: "Life is better together"
   - Welcoming message for first-time visitors

4. **Feature Cards**
   - "Get Connected" → Church Center portal
   - "What's On" → Events calendar

5. **Community/Service Section**
   - Community Service Sunday initiative
   - Partnership with "Neighbour in Need" (Logan Connect)
   - Service activities: household help, meals, prayer, kindness

6. **Pastors Section**
   - Welcome message from Steven & Stefanie Goleby (Senior Pastors)
   - Pastor photo

7. **Visit Section**
   - Service times (9 AM on Sundays, 8:30 AM on first Sunday Feb-Oct)
   - Address: 3922 Mount Lindesay Highway, Park Ridge QLD 4125
   - Contact information
   - Embedded Google Map
   - Pre-service coffee details (8 AM)

8. **Footer**
   - Navigation links
   - Contact details
   - Social media (Facebook)

### Additional Pages
- **About Page**: Detailed church information
- **Contact Page**: Contact form and details
- **Services Page**: Service information
- **Blog Page**: News/articles
- **Events**: Multiple views (list, calendar month, today's events)
- **Event Details**: Individual event pages
- **Donation Pages**: Giving information and confirmation pages
- **Our Locations**: Location details (if multiple campuses)

---

## SEO & Metadata Strategy

### Structured Data (JSON-LD)
- **Schema.org Church type**: Complete church schema with:
  - Name, alternateName (PRBC)
  - URL, description, image
  - Email, phone (implied from address)
  - Address with postal components
  - Map link
  - Social media links (Facebook)

### Meta Tags & Open Graph
- Proper canonical URLs pointing to `prbc.org.au`
- og:image for social sharing
- og:locale set to `en_AU`
- Twitter card support
- Description tags optimized for organic search

### Local SEO Focus (from SEO-NOTES.md)
- Distinguish PRBC as: Baptist, Spirit-filled church in Park Ridge
- Highlight: 9 AM Sunday gathering, pre-service coffee from 8 AM
- Partner with Neighbour in Need for Community Service Sunday
- Keep details human-readable across website and local profiles
- Avoid keyword stuffing or competing church mentions

### Search Engine Registration (Planned)
- Google Search Console claim for prbc.org.au
- Bing Webmaster Tools verification
- Submit sitemap.xml
- Monitor impressions, queries, indexing

---

## Deployment Strategy

### Current Architecture
1. **WordPress Source**: Original website runs on WordPress at prbc.org.au
2. **Static Generation**: `clone-site.py` scrapes WordPress and creates static HTML
3. **GitHub Pages**: `pages-dist/` directory deployed for public preview

### GitHub Pages Build Process
`build_pages.py` transforms `static-site/` → `pages-dist/`:
- Adds `/prbc-website` path prefix (for repo-based deployment)
- Removes `robots.txt` and `sitemap.xml` (not needed for preview)
- Adds `<meta name="robots" content="noindex, nofollow">` to all HTML
- Removes canonical tags
- Removes structured data (JSON-LD)
- Updates og:url to GitHub Pages domain
- Replaces hero image URL with GitHub Pages version
- Adds `.nojekyll` file to prevent Jekyll processing

## Content Management

### Data Sources
- **pages-api.json**: Exported from WordPress REST API
  - Contains all pages, posts, metadata
  - Used by clone-site.py to determine which pages to scrape
  - Excludes: donor-dashboard, donation-confirmation, donation-failed pages

### External Integrations
- **Church Center**: Event management and community connection
  - Links: `/registrations/events` and `/home` portal
- **Logan Connect**: Community service program (Neighbour in Need)
  - Community Service Sunday coordination
- **Google Maps**: Embedded map for location
- **Facebook**: Social media link in footer

---

## Accessibility & Performance

### Accessibility Features
- Skip-to-content link (`<a class="skip">`)
- Screen reader only content (`.sr-only` class)
- Proper semantic HTML (header, main, section, nav)
- ARIA labels for interactive elements
- Keyboard-navigable menu with aria-expanded
- Focus management on menu toggle

### Performance Optimizations
- WOFF2 font files (modern, compressed)
- CSS custom properties for efficient styling
- Minimal JavaScript (no frameworks)
- Lazy loading on non-critical images
- Responsive images and responsive design
- Mobile-first CSS with media query breakpoints

### Responsive Breakpoints
- Desktop: 900px+ width
- Tablet: 600px - 900px
- Mobile: < 600px

---

## Git Workflow

### Recent Commits (from log)
```
51279ef - deploy
7136fa7 - Organize static website assets
1f0a5b1 - Prepare local SEO and clarify service schedule
38fdccb - Apply PRBC brand guidelines
7503b04 - Prepare GitHub Pages deployment
4d8c5eb - Refresh church website design
67f77f0 - Add static website snapshot
```

### Key Development Areas
1. SEO optimization
2. Brand application
3. Static site generation
4. GitHub Pages deployment workflow
5. Asset organization

---

## Known Considerations & Next Steps

### Before Production Migration (from SEO-NOTES.md)

1. **Schedule Verification**
   - Confirm coffee (8 AM) and service (9 AM) times
   - Verify Community Service Sunday schedule
   - Update Kingdom Kids information if needed
   - Keep Church Center synced

2. **Business Profile Verification**
   - Google Business Profile: verify name, address, phone, hours, categories
   - Bing and other directory listings
   - Don't mark service time as general business hours

3. **Search Console Setup**
   - Claim prbc.org.au in Google Search Console
   - Verify in Bing Webmaster Tools
   - Submit sitemap.xml
   - Inspect Home, About, Contact URLs
   - Verify robots.txt and no noindex directives

4. **URL Preservation & Redirects**
   - Audit existing WordPress URLs
   - Implement permanent redirects for changed URLs
   - Review search traffic patterns

5. **Feature Testing**
   - Test external links functionality
   - Verify embedded map on production domain
   - Test contact and giving features

6. **Content Planning**
   - Consider first-time visitor guide (parking, accessibility, children, format expectations)
   - Add to homepage and local profiles

7. **Monitoring**
   - Track Search Console impressions and queries
   - Monitor search rankings and rich results

### Missing/Future Pages
- Accessibility/parking information for visitors
- Detailed Kingdom Kids program info
- Potential multi-campus pages (if expansion occurs)

---

## Project Status

✅ **Completed**
- Static site generation from WordPress
- Brand application and design system
- SEO metadata and structured data
- GitHub Pages deployment workflow
- Basic homepage and core pages
- Responsive design

⚠️ **In Progress / Planned**
- Production domain setup and migration
- Search Console verification and monitoring
- Business profile verification across directories
- Visitor experience guide (first-time visitor info)

---

## Quick Reference

### Key Files to Know
- `static-site/index.html` - Homepage
- `static-site/home.css` - Homepage styling
- `static-site/brand.css` - Brand colors and typography
- `clone-site.py` - WordPress scraper
- `scripts/build_pages.py` - GitHub Pages build
- `SEO-NOTES.md` - Local SEO strategy

### Important URLs
- **Live Site**: https://prbc.org.au/
- **GitHub Pages Preview**: https://prbc-technology.github.io/prbc-website/
- **Church Center Connect**: https://parkridgebaptist.churchcenter.com/home
- **Logan Connect**: https://loganconnect.org.au/
- **Location Map**: https://maps.app.goo.gl/WTQ8YhZzamGXZMEJ9

### Contact
- **Email**: admin@prbc.org.au
- **Address**: 3922 Mount Lindesay Highway, Park Ridge QLD 4125
- **Facebook**: https://www.facebook.com/ParkRidgeBaptist

---

## Observations & Strengths

1. **Well-Structured Codebase**: Clear separation of static assets, build scripts, and deployment processes
2. **SEO-First Design**: Comprehensive schema markup, metadata, and local optimization planning
3. **Accessibility Focus**: Proper semantic HTML, ARIA labels, keyboard navigation
4. **Brand Consistency**: Unified design system with CSS variables and typography standards
5. **Deployment Strategy**: Clean separation between staging (GitHub Pages) and production
6. **Documentation**: Local SEO strategy in SEO-NOTES.md
7. **Performance**: Minimal JavaScript, modern image formats, optimized fonts
8. **Community-Focused**: Content emphasizes belonging, welcome, and community service

---

**Analysis Date**: November 7, 2026  
**Repository**: PRBC-Technology/prbc-website
