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

## Reader growth workflow

After a production-origin build, run `npm run seo:report`. This explicitly reads `growth-plan.json` and emits `seo-reports/latest.json`, outside the public build. CI saves the report as the `seo-growth-report` artifact. The report joins the reviewed action plan with current sitemap eligibility, duplicate-title warnings and release-feed status. It fails if a sitemap page is missing, noindex or on the wrong origin, or production robots blocks all crawling.

The weekly audit agent should read this JSON and the latest dated visitor audit, recheck the live production commit, and select the highest-priority unfinished action. Update the plan after verifying a change. A report is not proof of Google indexing or of traffic growth.

Google discovers the canonical sitemap advertised in robots.txt. With access to the verified Search Console property, submit `https://independentobserver.org/sitemap.xml`, inspect priority URLs, and record the response. The GSC Wizard connection was unavailable because its subscription had expired on 6 September 2026; do not claim that a submission happened. No paid subscription is purchased by this workflow.

Use [Search Console recrawl guidance](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl). [Google's AI search guidance](https://developers.google.com/search/docs/appearance/ai-features) requires ordinary crawlable, useful content; no special AI file is required. Preserve canonical paper families and draft release boundaries. Avoid mass-generated pages, fabricated popularity and duplicate tracking.
