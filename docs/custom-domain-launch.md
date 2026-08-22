# Custom-domain launch checklist

This checklist keeps Independent Observer on the existing Vercel project and avoids duplicate deployments.

## Current hosting

- Public project: `independent-observer`
- Temporary production address: [independent-observer.vercel.app](https://independent-observer.vercel.app/)
- Desired custom origin: `https://independentobserver.org`
- The desired custom origin is staged in the site's metadata, but it is not a live address until the domain resolves and Vercel verifies it.
- Do not create a second Vercel project.

## Verified state — 2026-08-19

- The existing Vercel project is `READY` in production.
- Its attached domains are Vercel-provided domains only: `independent-observer.vercel.app` and its generated project alias.
- `independentobserver.org` and `www.independentobserver.org` returned DNS `NXDOMAIN` during this audit.
- No purchase, registration, registrar change, DNS change, or custom-domain attachment was attempted.
- The Vercel URL remains the only verified public address for now.
- The live Vercel homepage, library, `robots.txt`, and `sitemap.xml` returned HTTP 200 through Vercel's deployment fetch. The sitemap and robots file currently point at the desired custom origin, so do not submit that sitemap to Google or advertise the custom URL until the domain is connected.

## Launch sequence after the domain is registered

1. Register `independentobserver.org` through the registrar you approve. Do not purchase it automatically.
2. Add both `independentobserver.org` and `www.independentobserver.org` to the existing `independent-observer` Vercel project.
3. At the registrar, enter the exact DNS records Vercel displays for this project. Do not substitute remembered records if Vercel shows different values.
4. Leave Cloudflare proxying disabled unless it is explicitly reviewed later.
5. Wait for DNS verification and HTTPS certificate issuance.
6. Open the exact custom-domain URL and verify:
   - homepage returns HTTP 200;
   - navigation, search, and reading list work;
   - photographs and other assets load;
   - `/robots.txt`, `/sitemap.xml`, and `/feed.xml` resolve;
   - canonical, Open Graph, JSON-LD, robots, and sitemap URLs use `https://independentobserver.org`.
7. Submit `https://independentobserver.org/sitemap.xml` manually in Google Search Console only after the domain is verified.

## Future integrations

Use the separate `plugins/` workspace and the [Dropbox website-safe proof audit](./dropbox-safe-proof/README.md). Keep Dropbox as the private source archive and publish only reviewed, public-safe material. Never commit API keys, refresh tokens, private paths, booking information, or unreviewed claims.

Reference: [Vercel custom-domain documentation](https://vercel.com/docs/domains/set-up-custom-domain).
