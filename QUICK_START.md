# PRBC Website - Quick Start Guide

## What is this project?

This is the static website for **Park Ridge Baptist Church** (PRBC), an Australian Baptist church in Park Ridge, Queensland. The site provides information about church services, events, community involvement, and ways to connect.

**Live Site**: https://prbc.org.au/

---

## Project Type: Static Site from WordPress

```
WordPress (Dynamic) → Scraper (clone-site.py) → Static HTML → GitHub Pages Preview
                                                                    ↓
                                                          + path prefixes
                                                          + noindex headers
                                                                    
                                                    Production (static-site/)
                                                          ↓
                                                      SFTP Upload
                                                          ↓
                                                      prbc.org.au
```

---

## Key Folders

| Folder | Purpose |
|--------|---------|
| `static-site/` | **Production website** - deployed to prbc.org.au |
| `pages-dist/` | GitHub Pages build (auto-generated, do not edit) |
| `scripts/` | Build & deployment scripts |
| `PRBC Fonts/` | Brand typeface files (Montserrat, Noto Serif) |

---

## Making Changes

### Edit Homepage
```
static-site/index.html → Edit content, sections
static-site/home.css   → Edit homepage styling
static-site/brand.css  → Edit brand colors, fonts
```

### Edit Other Pages
```
static-site/about/index.html          → About page
static-site/contact/index.html        → Contact page
static-site/services/index.html       → Services page
static-site/events/index.html         → Events listing
```

### Key Styling Variables (in `brand.css`)
```css
--navy: #003057          /* Dark blue (primary) */
--aqua: #00bfb2          /* Teal (accent) */
--peach: #ffdbb2         /* Peach (secondary) */
--cream: #bbe5f0         /* Light blue (backgrounds) */
--body: Montserrat       /* Body font */
--head: Montserrat       /* Heading font */
```

---

## Workflow

### 1. Make Changes Locally
```bash
cd "C:\Users\jakes\Documents\Developer\ChatGPT\PRBC Website"
# Edit files in static-site/
git add .
git commit -m "your message"
git push
```

### 2. Preview on GitHub Pages (Automatic)
- GitHub Actions runs `scripts/build_pages.py`
- Creates `pages-dist/` with noindex headers
- Preview: https://prbc-technology.github.io/prbc-website/

### 3. Deploy to Production (Manual)
- Install VS Code **SFTP** extension
- Open `.vscode/sftp.json` (has encrypted config)
- Enter FTP password when prompted
- Right-click `static-site/` → **SFTP: Upload Folder**
- Site updates at https://prbc.org.au/

---

## Important URLs

| URL | Purpose |
|-----|---------|
| https://prbc.org.au/ | **Live production website** |
| https://prbc-technology.github.io/prbc-website/ | GitHub Pages preview (with noindex) |
| https://parkridgebaptist.churchcenter.com/home | Church community portal |
| https://loganconnect.org.au/ | Community service partner |

---

## Church Information

**Service Times**
- Sunday: 9:00 AM
- Pre-service coffee: 8:00 AM
- Community Service Sunday (1st Sunday Feb-Oct): 8:30 AM

**Address**
- 3922 Mount Lindesay Highway
- Park Ridge QLD 4125
- Phone/Email: admin@prbc.org.au

**Leadership**
- Senior Pastors: Steven & Stefanie Goleby

---

## Build Scripts

### `clone-site.py`
Scrapes WordPress site and creates static HTML copy
```bash
python clone-site.py
```
Output: `static-site/` folder with all pages and assets

### `build_pages.py`
Prepares GitHub Pages deployment (adds path prefix, noindex headers)
```bash
python scripts/build_pages.py
```
Output: `pages-dist/` folder for GitHub Pages

---

## File Structure at a Glance

```
static-site/
├── index.html              ← Homepage
├── about/index.html        ← About page
├── contact/index.html      ← Contact page
├── services/index.html     ← Services
├── events/                 ← Event pages
├── blog/index.html         ← Blog
├── donation-info/          ← Giving info
├── home.css               ← Homepage styles
├── brand.css              ← Brand colors/fonts
├── home.js                ← Menu toggle
├── assets/                ← Images & fonts
├── site-content/          ← WordPress exports (plugins, themes, uploads)
├── robots.txt             ← SEO robot directives
└── sitemap.xml            ← Search engine sitemap
```

---

## Brand Colors

Used throughout site for consistency:
- **Navy** (#003057): Headers, footers, primary text
- **Aqua** (#00bfb2): Links, accents, highlights
- **Peach** (#ffdbb2): Secondary highlights, warmth
- **Cream** (#bbe5f0): Section backgrounds, lightness
- **White** (#fff): Clean, minimal backgrounds

---

## Common Tasks

### Add a New Event
1. Event details go in Church Center: https://parkridgebaptist.churchcenter.com/registrations/events
2. Event listing pages auto-populate from Church Center API
3. For static snapshots, add to `events/` folder as needed

### Update Service Times
1. Edit `static-site/index.html` - search for "9 AM" or "8:30 am"
2. Update both hero section and visit section
3. Test on GitHub Pages before deploying to production

### Update Contact Info
1. Edit email addresses in `index.html` and `static-site/contact/index.html`
2. Check `brand.css` for any hardcoded links
3. Update Google Maps URL if location changes

### Add a New Page
1. Create folder: `static-site/my-page/`
2. Create file: `static-site/my-page/index.html`
3. Use existing pages as template
4. Link from `static-site/index.html` navigation

---

## Deployment Checklist

Before going to production:

- [ ] Content reviewed by church leadership
- [ ] Links tested (internal and external)
- [ ] Forms tested (contact, giving)
- [ ] Mobile view tested (responsive)
- [ ] Images optimized and loading correctly
- [ ] Spelling and grammar checked
- [ ] Google Business Profile verified
- [ ] Search Console setup complete
- [ ] Social media links working
- [ ] Map embed functional

---

## Troubleshooting

### Changes not appearing on GitHub Pages?
1. Check GitHub Actions workflow completed
2. Verify `pages-dist/` was updated
3. Clear browser cache or use incognito mode
4. May take 1-2 minutes to publish

### Changes not appearing on production?
1. Verify SFTP upload completed successfully
2. Clear browser cache
3. Check if file was deleted or replaced correctly
4. May take a few seconds to propagate

### Links broken after deployment?
1. Check relative paths don't have extra slashes
2. Ensure `static-site/robots.txt` allows crawling
3. Verify `sitemap.xml` includes new pages

---

## Resources

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Detailed deployment instructions
- [SEO-NOTES.md](./SEO-NOTES.md) - Local SEO strategy and research
- [README.md](./README.md) - Project overview
- GitHub: https://github.com/PRBC-Technology/prbc-website

---

**Quick Reference**
- Edit files in: `static-site/`
- Deploy via: VS Code SFTP extension
- Preview: GitHub Pages (automatic)
- Production: `prbc.org.au`
