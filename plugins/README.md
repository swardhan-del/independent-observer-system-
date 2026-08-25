# Independent Observer plugin workspace

This folder contains small, reviewable integrations for the public site.

## Rules

- Plugins are repository code and documentation, not a promise that an external service is connected.
- Public content must be human-reviewed before publication.
- No Dropbox credentials, API keys, refresh tokens, booking data, or private paths belong here.
- Automation is fail-closed: it reports problems and stops; it does not silently publish.
- Each plugin should have its own folder, README, configuration, and tests or checks where practical.

## Current modules

- `seo/` — audit-only metadata, indexability, feed, asset, and public-leakage checks.
- `integrations/` — the safe integration map for search, RSS, Dropbox, and social awareness.
- `dropbox/` — the approved Dropbox-to-site boundary and review gate.
- `social/` — public social links that have been explicitly verified.
- `topic-discovery/` — question-led topic pathways, public-preprint signals, and the human-release boundary.

## Running the SEO audit

Build the site with its intended public origin, then run:

```sh
SITE_URL=https://independentobserver.org BASE_PATH=/ npm run build
npm run seo:audit
```

The audit is local and read-only. It does not contact Google, Dropbox, YouTube, or any publishing API.
