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

It never registers a domain, changes DNS, changes Vercel, or publishes files. It fails closed if the
domain is unregistered, not attached to Vercel, or serving metadata for another origin.

The verified Vercel project is the canonical production host at `https://independentobserver.org`;
the Vercel-provided project alias and GitHub Pages project site remain secondary fallbacks.
