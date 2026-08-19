# Custom-domain launch checklist

This checklist keeps Independent Observer on the existing Vercel project and avoids duplicate deployments.

## Current hosting

- Public project: `independent-observer`
- Temporary production address: [independent-observer.vercel.app](https://independent-observer.vercel.app/)
- Canonical public origin configured in the build: `https://independentobserver.org`
- The custom domain must be registered before it can resolve.

## Launch sequence

1. Register `independentobserver.org` through the approved registrar or Vercel. Do not create a second Vercel project.
2. Add `independentobserver.org` to the existing `independent-observer` project.
3. At the registrar, use the exact DNS records Vercel displays for the project. For a typical Vercel apex setup this may be:
   - apex `@`: A `76.76.21.21`
   - `www`: CNAME `cname.vercel-dns-0.com`
4. Leave Cloudflare proxying disabled unless it is explicitly reviewed later.
5. Wait for DNS verification and HTTPS certificate issuance.
6. Open the exact custom-domain URL and verify:
   - homepage returns HTTP 200
   - navigation and search work
   - photographs and assets load
   - `/robots.txt`, `/sitemap.xml`, and `/feed.xml` resolve
   - canonical and Open Graph URLs use `https://independentobserver.org`
7. Submit `https://independentobserver.org/sitemap.xml` manually in Google Search Console after the domain is verified.

## Future integrations

Use the separate `plugins/` workspace. Keep Dropbox as the private source archive and publish only reviewed, public-safe material. Never commit API keys, refresh tokens, private paths, booking information, or unreviewed claims.

Reference: [Vercel custom-domain documentation](https://vercel.com/docs/domains/set-up-custom-domain).
