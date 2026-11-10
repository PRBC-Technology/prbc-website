# PRBC Website - Quick Start Guide

## What is this project?

This is the static website for **Park Ridge Baptist Church** (PRBC), an Australian Baptist church in Park Ridge, Queensland. The site provides information about church services, events, community involvement, and ways to connect.

**Live Site**: https://prbc.org.au/

---

## Project Type: Static Site

The current site contains the Home, About and Contact pages.

---

## Key Folders

| Folder | Purpose |
|--------|---------|
| Repository root | Website pages, styles, scripts and assets |
| `pages-dist/` | GitHub Pages build (auto-generated, do not edit) |
| `scripts/` | Preview build scripts |
| `PRBC Fonts/` | Brand typeface files (Montserrat, Noto Serif) |

---

## Making Changes

### Edit Homepage
```
index.html → Edit content, sections
home.css   → Edit homepage styling
brand.css  → Edit brand colors, fonts
```

### Edit Other Pages
```
about/index.html          → About page
contact/index.html        → Contact page
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
# Edit website files at the repository root
git add .
git commit -m "your message"
git push
```

### 2. Preview on GitHub Pages (Automatic)
- GitHub Actions runs `scripts/build_pages.py`
- Creates `pages-dist/` with noindex headers
- Preview: https://prbc-technology.github.io/prbc-website/

### 3. Preview Locally
- Run `python -m http.server 8000 --bind 127.0.0.1` from the repository root.
- Open http://localhost:8000/; opening `index.html` directly does not resolve root-relative paths.

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

### `build_pages.py`
Prepares GitHub Pages deployment (adds path prefix, noindex headers)
```bash
python scripts/build_pages.py
```
Output: `pages-dist/` folder for GitHub Pages

When adding a top-level page or asset folder, add it to `site_items` in
`scripts/build_pages.py` so it is included in the preview build.

---

## File Structure at a Glance

```
repository root/
├── index.html              ← Homepage
├── 404.html                ← Branded not-found page (also used by GitHub Pages)
├── about/index.html        ← About page
├── contact/index.html      ← Contact page
├── home.css               ← Homepage styles
├── brand.css              ← Brand colors/fonts
├── home.js                ← Menu toggle
├── assets/                ← Images & fonts
├── site-content/          ← Images used by the current pages
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
2. The website links to the Church Center event listing

### Update Service Times
1. Edit `index.html` - search for "9 AM" or "8:30 am"
2. Update both hero section and visit section
3. Test on GitHub Pages before deploying to production

### Update Contact Info
1. Edit email addresses in `index.html` and `contact/index.html`
2. Check `brand.css` for any hardcoded links
3. Update Google Maps URL if location changes

### Add a New Page
1. Create folder: `my-page/`
2. Create file: `my-page/index.html`
3. Use existing pages as template
4. Link from `index.html` navigation and add `my-page` to `site_items` in `scripts/build_pages.py`

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
1. Clear the browser cache or use an incognito window.
2. Check whether the expected content is visible.

### Links broken after deployment?
1. Check relative paths don't have extra slashes
2. Ensure `robots.txt` allows crawling
3. Verify `sitemap.xml` includes new pages

---

## Resources

- [SEO-NOTES.md](./SEO-NOTES.md) - Local SEO strategy and research
- [README.md](./README.md) - Project overview
- GitHub: https://github.com/PRBC-Technology/prbc-website

---

**Quick Reference**
- Edit website files in: the repository root
- Preview: GitHub Pages (automatic)
- Production: `prbc.org.au`
