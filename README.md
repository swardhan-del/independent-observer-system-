# The Independent Observer

Private workspace for The Independent Observer. This first website version is a static editorial publication built with Astro.

Repository provenance: this project was initialized as `independent-observer-system-` with the description "private workspace for independent observer." This website version preserves that private-workspace purpose while adding the documentation needed to review and maintain the site.

## Status

This is a working preview. Sample cards are explicitly labeled **Concept preview** or **In editorial development**. The site does not claim that placeholder work has been published, peer reviewed, or institutionally affiliated.

## Requirements

- Node.js 22 or newer
- npm 10 or newer

## Install

```bash
npm install
```

## Local development

```bash
npm run dev
```

Open the local address printed in the terminal, normally `http://localhost:4321/`.

## Verification

```bash
npm run format:check
npm run lint
npm test
npm run build
npm run build:pages
```

`npm test` creates a fresh normal production build before running the content, route, link,
accessibility-structure, metadata, contrast, and workflow-safety tests. `npm run build:pages`
creates the planned GitHub Pages project-site build. Builds and tests only write to `dist/`; they do
not publish or deploy the website.

To apply formatting:

```bash
npm run format
```

To preview the production build:

```bash
npm run preview
```

## Production URL settings

Astro reads two public build settings:

- `SITE_URL`: the production origin only, without a project path. It defaults to
  `https://swardhan-del.github.io`.
- `BASE_PATH`: the deployment path, or `/` for a root deployment. It defaults to `/`.

Run a normal production build with:

```bash
npm run build
```

Run the configured GitHub Pages project-site build with:

```bash
npm run build:pages
```

Equivalent custom settings can be supplied explicitly:

```bash
SITE_URL=https://example.com BASE_PATH=/publication/ npm run build
```

These settings generate absolute canonical and social-sharing URLs at build time.

## Public Research Library

The public site now includes [`/library/`](https://swardhan-del.github.io/independent-observer-system-/library/), a reviewed public-safe map of the Independent Observer Dropbox archive. It publishes aggregate counts, three high-level volume summaries, and broad research areas; it does not publish raw files, local paths, private records, draft evidence, or working archive filenames.

The library is a reviewed snapshot from the Dropbox `public_export` package. It is deliberately separate from the protected archive and is labeled as a snapshot so aggregate counts are not mistaken for a live inventory. The existing approved-feed automation remains narrower: it accepts only structured preview items from `/Independent Observer desktop/Website Feed/approved`, opens a pull request, and waits for CI and human review.

If that exact approved folder is unavailable, the automation must fail closed. Do not repoint it at the general Independent Observer archive or at a catalog manifest. To publish more material, first create a small public-safe summary, mark it approved, and let the review workflow handle it.

## Integration boundary

This site uses Astro, native browser search/filter interactions, GitHub Actions, and the narrow Dropbox feed contract. Those are the integrations currently needed for this static publication; no third-party website plugin is required for the public library. An SEO or content autopilot must not generate or publish claims without human review. Search visibility comes from the existing crawlable pages, canonical metadata, JSON-LD, robots file, sitemap, and human-submitted Search Console indexing requests.

## Google Search visibility

The public build includes a crawlable `robots.txt`, an absolute-URL XML sitemap, canonical URLs,
Open Graph metadata, and JSON-LD for the website and each page. It also exposes the sitemap URL in
each page's HTML head and publishes a two-level breadcrumb graph for non-home routes.

To monitor actual Google discovery and indexing, the site owner must add the deployed URL as a
property in [Google Search Console](https://search.google.com/search-console), submit:

```
https://swardhan-del.github.io/independent-observer-system-/sitemap.xml
```

Then use URL Inspection for the home page and the first genuinely published article. This repository
does not use an autonomous content-generation or SEO-autopilot service; all public content remains
approved and human-reviewed.

## GitHub Pages deployment

Continuous integration and deployment are separate workflows. Pull requests and pushes to `main`
run read-only checks through `.github/workflows/ci.yml`; that workflow has no Pages permissions or
deployment steps.

GitHub Pages must use **Settings → Pages → Build and deployment → GitHub Actions** as its source.
After a reviewed pull request is merged and CI succeeds, the deployment workflow publishes the
current `main` branch automatically. The workflow still refuses to deploy from any branch other
than `main`. A manual `workflow_dispatch` run remains available, but requires the explicit
deployment confirmation input and any protected `github-pages` environment approval.

## Content editing

- Shared editorial data: `src/data/content.ts`
- Pages: `src/pages/`
- Components: `src/components/`
- Global design system: `src/styles/global.css`

Replace placeholder descriptions only with verified, publication-ready material. Never commit private records, passwords, tokens, API keys, `.env` files, or unpublished evidence.

## Dropbox website-feed automation

The repository includes an approval-gated workflow at `.github/workflows/sync-dropbox-content.yml`.
It does not mirror the Dropbox archive and it does not publish directly. It reads only a
`manifest.json` from this exact approved folder:

`/Independent Observer desktop/Website Feed/approved`

The manifest must set `approvedForWebsite` to `true` and every item must use one of the two
preview statuses: `Concept preview` or `In editorial development`. The schema example is in
`content/dropbox/manifest.example.json`. DOCX, PDF, PPTX, raw research, private records, and
unapproved media are intentionally outside the feed contract.

To activate the workflow, create a Dropbox app with read-only metadata/content access and add
these GitHub repository secrets: `DROPBOX_APP_KEY`, `DROPBOX_APP_SECRET`, and
`DROPBOX_REFRESH_TOKEN`. The workflow runs daily and can be started manually; when the approved
manifest changes it opens a pull request containing only the generated data file. CI and human
review remain required before merge or deployment.
