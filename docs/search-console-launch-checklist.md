# Google Search Console launch checklist

The production site is prepared for Google Search Console. The repository already
generates the canonical sitemap and `robots.txt`, includes the homepage verification
tag, exposes six topic hubs, and checks canonical URLs during CI.

## Google account actions

1. Open Google Search Console with the Google account that controls
   `independentobserver.org`.
2. Add the Domain property `sc-domain:independentobserver.org`.
3. If the domain property is already verified, add or select the URL-prefix property
   `https://independentobserver.org/` only when a separate URL-prefix view is useful.
4. Submit:
   `https://independentobserver.org/sitemap.xml`
5. Use URL Inspection on the homepage, `/latest/`, `/governance/`, `/topics/`, and
   three representative public research or library pages. Request indexing only for
   pages that are public, canonical, and intentionally indexable.
6. Check the Page indexing report and resolve errors before expanding the content
   programme.

## What the repository guarantees

- Production `robots.txt` allows crawling and points to the canonical sitemap.
- Production sitemap URLs use `https://independentobserver.org` and map to built pages.
- Public pages emit canonical URLs and are not generated with `noindex`.
- Preview and GitHub Pages fallback builds remain noindex and crawl-disallowed.
- The Google verification tag remains present on the homepage.

## Not part of this launch

Do not create a Google Business Profile for Independent Observer solely to improve
website search visibility. The project is an online publication/research site, not a
local business with customer-facing premises. Reconsider that decision only if the
project later has a genuine eligible in-person operation.
