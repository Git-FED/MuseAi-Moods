# Deployment

## GitHub Pages

1. Create or open the repository named `Muse-AI-Moods`.
2. Upload the contents of this folder to the repository root.
3. In **Settings → Pages**, choose **Deploy from a branch**.
4. Select the default branch and `/ (root)` as the folder.
5. Save and wait for GitHub Pages to publish.

The site uses relative paths, so it works at a project URL such as `https://username.github.io/Muse-AI-Moods/`.

## Cloudflare Pages

1. Create a Pages project connected to the GitHub repository.
2. Select the production branch.
3. Leave the build command empty.
4. Set the output directory to `.` or the repository root.
5. Deploy.

The `_headers` and `_redirects` files are included for Cloudflare Pages. The `_redirects` file sends unknown paths to the HTML `404.html` page, never a plain-text fallback.

## Cloudflare Workers / Pages

For a static Pages deployment with Wrangler, keep this folder as the Pages directory and configure the project in Cloudflare’s dashboard or your existing Wrangler workflow. No server-side code is required for this site.

## Local check

From the project root, run any static server, for example:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080/` and test the navigation. Do not open the files only with `file://` if you want to test redirects.
