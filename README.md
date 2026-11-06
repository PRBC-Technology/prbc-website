# PRBC static site snapshot

The `static-site` folder contains a snapshot of the public WordPress pages and their same-domain assets, captured 6 November 2026. Deploy the contents of that folder to the root of a static host; preserve the folder structure and configure directory URLs to serve `index.html`.

This is a starting point for migration, not a verified replacement for the live site. WordPress features do not become static automatically. In particular, the contact form requires a replacement form service, calendar/search controls require a dynamic service or replacement, and donation and donor-dashboard functionality must be checked and replaced or linked to the existing provider. Event content is a snapshot and will not update automatically. External embeds, fonts, videos and Church Center links still depend on their respective providers. Links to endpoints that returned 404 on the original site are recorded in `static-site/migration-report.json`.

Before switching DNS or cancelling the current hosting: compare each page and mobile layout, test all navigation and external integrations, set up and test a contact form and giving, review redirects and SEO, and obtain a full WordPress/database/media backup. This snapshot does not include the WordPress database, private content, or site administration.
