# Local search and launch notes

## Current research (6 November 2026)

Park Ridge searches include Baptist churches and other Christian churches. Local listings identify Logan Grace Baptist Church and Zomi Baptist Church in Park Ridge, while Parklands Church highlights its gathering time, location, children and next steps. PRBC can distinguish itself with its own verified identity: a Baptist, Spirit-filled church in Park Ridge, its 9 am Sunday gathering, pre-service coffee from 8 am, and its partnership with Neighbour in Need for Community Service Sunday. Keep these details human-readable and consistent across the website and profiles, rather than repeating keyword lists or naming other churches on PRBC pages.

Sources:
- https://auschurches.com.au/denominations/baptist/city/brisbane
- https://parklandschurch.org/
- https://parkridgebaptist.churchcenter.com/home
- https://developers.google.com/search/docs/appearance/structured-data/local-business
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview

## Before the production migration

1. Keep the church-confirmed schedule current: coffee from 8 am and service at 9 am on regular Sundays; on the first Sunday of February to October, Community Service Sunday with Neighbour in Need starts at 8:30 am instead. Confirm Kingdom Kids information before adding detailed claims. Church Center should be updated to match this schedule.
2. Verify the correct public phone number and check the exact name, address, contact details, categories, hours, and holiday arrangements in Google Business Profile and other major directories. Do not mark a service time as general business opening hours without confirmation.
3. Claim and verify the production domain in Google Search Console and Bing Webmaster Tools. After this version is live on prbc.org.au, submit https://prbc.org.au/sitemap.xml and inspect the home, About and Contact URLs. Check the deployed robots.txt and pages do not carry a noindex directive.
4. Preserve useful existing URLs and implement permanent redirects at the new host for any URLs that change. Audit the WordPress content and live search traffic before retiring old pages. The initial sitemap lists only the reviewed Home, About and Contact pages; add other useful and current pages once ready.
5. Confirm that external links and the embedded map work on the production domain. Review contact, giving and event features before taking down WordPress. Keep Church Center event information current.
6. Consider a useful first-time visitor page with verified details about parking, accessibility, children, what to expect, and service format. Link it from the homepage and local profiles once approved.
7. Measure Search Console impressions, queries and indexing over time. Search rankings, snippets and rich results are not guaranteed by metadata or structured data.

The GitHub Pages workflow adds noindex to the public draft and omits the production sitemap and robots.txt from the draft output. The source is prepared for the production domain; do not remove draft protection before the production transition has been planned.
