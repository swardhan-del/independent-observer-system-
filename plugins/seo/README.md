# SEO audit plugin

This is the site's SEO safety layer. It checks the built static output for:

- titles and descriptions
- canonical URLs
- Open Graph and JSON-LD metadata
- robots, sitemap, RSS feed, and social image files
- canonical URLs using the intended public origin
- accidental private paths, credentials, or secret-like values

It is deliberately audit-only. It does not generate claims, buy an SEO service, submit content, or publish to search engines automatically. Search Console submission and editorial decisions remain human-controlled.

## Usage

```sh
SITE_URL=https://independentobserver.org BASE_PATH=/ npm run build
npm run seo:audit
```

Set `SEO_DIST_DIR` to audit another build directory. Set `SEO_SITE_URL` to audit a different approved origin.
