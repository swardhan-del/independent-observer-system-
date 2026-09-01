# Independent Observer

Private workspace for Independent Observer. This first website version is a static editorial publication built with Astro.

Repository provenance: this project was initialized as `independent-observer-system-` with the description "private workspace for independent observer." This website version preserves that private-workspace purpose while adding the documentation needed to review and maintain the site.

## Status

`https://independentobserver.org` is the canonical production origin and GitHub Pages is retained as a secondary fallback deployment. The known-good production deployment is preserved for rollback; a read-only audit found that its Vercel deployment metadata does not carry a Git commit, so this review branch is the traceable integration candidate and production provenance must be re-established from reviewed `main` before release. Sample cards are explicitly labeled **Concept preview** or **In editorial development**. The site does not claim that candidate work has been published, peer reviewed, or institutionally affiliated.

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
npm run verify:pages-fallback
npm run verify:canonical-origin
npm run verify:operating-system
SEO_SITE_URL=https://independentobserver.org npm run seo:audit
```

`npm test` creates a fresh normal production build before running the content, route, link,
accessibility-structure, metadata, contrast, and workflow-safety tests. `npm run build:pages`
creates the GitHub Pages fallback project-site build. That fallback is custom-domain canonical,
noindex, and crawl-disallowed. Builds and tests only write to `dist/`; they do not publish or deploy
the website.

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
  `https://independentobserver.org`.
- `BASE_PATH`: the deployment path, or `/` for a root deployment. It defaults to `/`.

Run a normal production build with:

```bash
npm run build
```

Run the configured GitHub Pages fallback project-site build with:

```bash
npm run build:pages
```

Equivalent custom settings can be supplied explicitly:

```bash
SITE_URL=https://example.com BASE_PATH=/publication/ npm run build
```

These settings generate absolute canonical and social-sharing URLs at build time.

## Public Research Library

The public site now includes [`/library/`](https://independentobserver.org/library/), a reviewed public-safe map of the Independent Observer archive. It publishes aggregate counts, four high-level volume summaries, and broad research areas; it does not publish raw files, local paths, private records, draft evidence, or working archive filenames.

The public site also includes [`/prompts/`](https://independentobserver.org/prompts/), a curated Visibility Studio with public-safe templates for source-led reels, graphics, SEO reviews, transcripts, essays, and focused distribution. The prompt library is an editorial aid, not an automatic publishing system or a substitute for source review.

The library is a reviewed snapshot from the Dropbox `public_export` package. It is deliberately separate from the protected archive and is labeled as a snapshot so aggregate counts are not mistaken for a live inventory. The existing approved-feed automation remains narrower: it accepts only structured preview items from the dedicated approved website-feed folder, opens a pull request, and waits for CI and human review.

The library also includes a public document reader. It publishes reviewed plain-text sections rather than mirroring Dropbox PDFs, DOCX files, private notes, or local archive paths. The reader provides a table of contents and stable section links so approved material can be found and read on the site.

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
https://independentobserver.org/sitemap.xml
```

Then use URL Inspection for the home page and the first genuinely published article. This repository
does not use an autonomous content-generation or SEO-autopilot service; all public content remains
approved and human-reviewed.

## Canonical production and fallback deployment

The canonical public origin is `https://independentobserver.org`, served by the existing Vercel
project `independent-observer`. The Vercel-provided alias
[`independent-observer.vercel.app`](https://independent-observer.vercel.app/) remains a verified
fallback address. The apex custom domain is the canonical origin; `www.independentobserver.org`
redirects to it. The current production artifact is retained for rollback, while the release
candidate must be rebuilt from a reviewed Git commit before promotion.

The public indexing policy is deliberate:

- `sitemap.xml` lists genuine public section pages and the public library. Detail routes remain out
  until they contain finished, review-cleared publications.
- `feed.xml` contains only owner-approved releases. Preview cards, external records, private
  material, and unpublished Dropbox artifacts are excluded until a release is real.
- `feed.atom.xml` remains empty until an owner-approved release is recorded in the release log.

## GitHub Pages fallback deployment

Continuous integration and deployment are separate workflows. Pull requests and pushes to `main`
run read-only checks through `.github/workflows/ci.yml`; that workflow has no Pages permissions or
deployment steps.

GitHub Pages must use **Settings → Pages → Build and deployment → GitHub Actions** as its source.
After a reviewed pull request is merged and CI succeeds, the deployment workflow publishes the
current `main` branch to the project-site fallback automatically. The workflow still refuses to
deploy from any branch other than `main`. A manual `workflow_dispatch` run remains available, but
requires the explicit deployment confirmation input and any protected `github-pages` environment
approval. GitHub Pages is not the canonical origin; its fallback artifact is noindex and uses the
custom domain in canonical and social metadata.

## Content editing

- Shared editorial data: `src/data/content.ts`
- Pages: `src/pages/`
- Components: `src/components/`
- Global design system: `src/styles/global.css`

Replace placeholder descriptions only with verified, publication-ready material. Never commit private records, passwords, tokens, API keys, `.env` files, or unpublished evidence.

## Dropbox website-feed automation

The repository includes an approval-gated workflow at `.github/workflows/sync-dropbox-content.yml`.
It reads only `manifest.json` from this exact approved folder:

The workflow reads the dedicated approved website-feed folder configured in the private
`DROPBOX_APPROVED_PATH` GitHub Actions variable. The path value is intentionally not stored in this
repository.

The workflow fails closed when the folder, manifest, credentials, manifest schema, approval gates,
source declarations, or artifact checks are unavailable or invalid. The manifest must use
`schemaVersion: 3`, include every required publication field, set `approvedForWebsite` to `true`, set all release gates to `true`, and match the configured owner in `approvedBy`:
`sourceVerified`, `contentQualityChecked`, `rightsAndProvenanceReviewed`, and `releaseApproved`.
Items are limited to approved public categories and preview statuses. When a source artifact is
declared, the workflow verifies its safe relative path, SHA-256, byte size, and expected container
type. Structured document entries additionally require reviewed sections and a public source label.
Restricted text and private, legal-evidence, raw-research, credential, or unpublished material is rejected.

The workflow produces only `src/data/dropbox-content.generated.ts`; it never copies raw Dropbox files
into `public/` and never deploys directly. The sequence is:

`approved Dropbox folder -> validation -> generated website data -> pull request -> CI -> human review -> merge -> deployment`

The review branch also carries a sanitized metadata registry in
`src/data/publication-registry.ts` and a metadata-only next-clearance queue in
`src/data/clearance-queue.ts`. The six first-wave candidates remain `public_preview` records awaiting
human release; they have no public article routes, no release flag, and no manuscript text in the
registry. A local ignored audit manifest may hold source-level checksums and reviewer notes for
release management, but it is never committed or included in the build.

To activate the workflow, the repository owner must configure the read-only Dropbox credentials as
GitHub repository secrets named `DROPBOX_APP_KEY`, `DROPBOX_APP_SECRET`, and `DROPBOX_REFRESH_TOKEN`.
They must never be committed to this repository. The workflow runs weekly on Mondays and can be
started manually; any generated change remains subject to CI, human review, branch protection, and
the normal main-branch deployment gate.
