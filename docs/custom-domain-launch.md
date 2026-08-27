# Hosting and custom-domain launch checklist

This checklist documents the verified architecture without changing hosting, DNS, or deployment state.

## Verified architecture — 2026-08-27

- Canonical production host: the existing Vercel project `independent-observer`.
- Canonical origin: `https://independentobserver.org`.
- Verified Vercel fallback alias: [independent-observer.vercel.app](https://independent-observer.vercel.app/).
- `www.independentobserver.org` is attached to the same project and redirects to the apex origin.
- The current production deployment is retained as a rollback candidate. Its read-only Vercel
  metadata did not include a Git commit, so it is not treated as clean release provenance. The
  review branch is the traceable integration candidate and must be rebuilt from reviewed `main`
  before a future production promotion.
- GitHub Pages remains a secondary project-site fallback at
  `https://swardhan-del.github.io/independent-observer-system-/` and is built only from `main`.
- The custom domain, Vercel aliases, homepage, `robots.txt`, `sitemap.xml`, and `feed.xml` returned
  HTTP 200 during the read-only preflight. Canonical and discovery metadata use the apex origin.

Do not create a second Vercel project or duplicate canonical metadata. This release-candidate task
does not alter Vercel settings, DNS, domains, or production traffic. A production promotion still
requires explicit owner approval after the reconciled pull request is reviewed.

## Build configuration

- `npm run build` is the canonical root-origin build and defaults to `SITE_URL=https://independentobserver.org`.
- `npm run build:pages` produces the GitHub Pages fallback with
  `SITE_URL=https://swardhan-del.github.io` and `BASE_PATH=/independent-observer-system-`.
- The fallback build is useful for resilience and verification; it is not the canonical origin.

## Non-mutating preflight

Run:

```sh
CUSTOM_DOMAIN=independentobserver.org npm run domain:preflight
```

The check verifies DNS, HTTPS, required public routes, homepage metadata, robots, and sitemap
alignment. It never registers a domain, changes DNS, changes Vercel, or publishes files. If the
domain or project attachment changes later, rerun it before any search-engine submission or public
launch announcement.

## Human release sequence

1. Review and merge the release-candidate pull request only after editorial content gates pass.
2. Confirm the production Vercel deployment is built from the reviewed `main` commit.
3. Verify the canonical origin and required routes in a browser.
4. Submit `https://independentobserver.org/sitemap.xml` manually in Google Search Console only after
   the owner approves the publication and confirms the domain state.

## Future integrations

Use the separate `plugins/` workspace and the [Dropbox website-safe proof audit](./dropbox-safe-proof/README.md). Keep Dropbox as the private source archive and publish only reviewed, public-safe material. Never commit API keys, refresh tokens, private paths, booking information, or unreviewed claims.

Reference: [Vercel custom-domain documentation](https://vercel.com/docs/domains/set-up-custom-domain).
