# Publishing to NewSprout

Test the changes on GitHub Pages before uploading website files from the repository root to NewSprout. The GitHub Pages build uses `pages-dist`; do not upload that folder to the live website.

Older WordPress snapshot pages are not included in the current site. Their URLs will not be available in new GitHub Pages builds.

Open the repository in VS Code and install the **SFTP** extension by Natizyskunk. The local `.vscode/sftp.json` uses encrypted FTP, sets the local deployment context to the repository root, and does not upload automatically on save. The file is ignored by Git so it can be kept local.

Before the first upload, use the SFTP remote explorer to verify that `/` contains the live website's `index.html` and `assets` folder. If the FTP account's root is not `public_html`, adjust `remotePath` to the correct folder first. Enter the FTP password when prompted; don't put it in the configuration or commit it to GitHub.

When ready to publish, upload only the website files and folders: `index.html`, `home.css`, `home.js`, `brand.css`, `pages.css`, `robots.txt`, `sitemap.xml`, `about/`, `contact/`, `assets/` and `site-content/`. Use the SFTP upload command on each item. **Do not upload the repository root as a folder**: it also contains Git metadata, local configuration, scripts and documentation. This writes to the live website. Check the site after uploading. Uploading does not automatically remove files deleted locally; review obsolete files before removing them from the server.
