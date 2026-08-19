# Hosting checks

This folder contains non-mutating checks for the Independent Observer hosting boundary.

## Custom-domain preflight

Run:

```sh
npm run domain:preflight
```

The check verifies:

- DNS for `independentobserver.org` and `www.independentobserver.org`;
- HTTPS and HTTP 200 for both hostnames;
- the homepage title;
- `robots.txt`, `sitemap.xml`, and `feed.xml`;
- canonical metadata, robots, and sitemap URLs pointing to the custom origin.

It never registers a domain, changes DNS, changes Vercel, or publishes files. It is expected to fail while the domain is unregistered or not attached to Vercel.

The existing Vercel address remains the verified public fallback until this preflight passes.
