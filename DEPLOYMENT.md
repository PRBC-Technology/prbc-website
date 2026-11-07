# Publishing to NewSprout

Test the changes on GitHub Pages before uploading the `static-site` folder to NewSprout. The GitHub Pages build uses `pages-dist`; do not upload that folder to the live website.

Open the repository in VS Code and install the **SFTP** extension by Natizyskunk. The local `.vscode/sftp.json` uses encrypted FTP, limits the local deployment context to `static-site`, and does not upload automatically on save. The file is ignored by Git so it can be kept local.

Before the first upload, use the SFTP remote explorer to verify that `/` contains the live website's `index.html` and `assets` folder. If the FTP account's root is not `public_html`, adjust `remotePath` to the correct folder first. Enter the FTP password when prompted; don't put it in the configuration or commit it to GitHub.

When ready to publish, right-click `static-site` in the Explorer and choose **SFTP: Upload Folder**. This writes to the live website. Check the site after uploading. Uploading does not automatically remove files deleted locally; review obsolete files before removing them from the server.
