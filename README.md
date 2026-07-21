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

## GitHub Pages deployment

Continuous integration and deployment are separate workflows. Pull requests and pushes to `main`
run read-only checks through `.github/workflows/ci.yml`; that workflow has no Pages permissions or
deployment steps. Merging does not deploy the website.

Before the first deployment:

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **GitHub Actions** as the source.
4. In **Settings → Environments → github-pages**, add required reviewers if approval is desired.

After a reviewed pull request is merged and CI succeeds, deployment still requires an explicit
manual action:

1. Open **Actions → Deploy website to GitHub Pages**.
2. Choose **Run workflow** from the `main` branch.
3. Enable the required deployment confirmation and run the workflow.
4. Approve the protected `github-pages` environment if repository settings require it.

The deployment workflow refuses to run its deployment job from any branch other than `main` and
cannot be triggered by a pull request or push. Do not manually dispatch it until publication is
approved.

## Content editing

- Shared editorial data: `src/data/content.ts`
- Pages: `src/pages/`
- Components: `src/components/`
- Global design system: `src/styles/global.css`

Replace placeholder descriptions only with verified, publication-ready material. Never commit private records, passwords, tokens, API keys, `.env` files, or unpublished evidence.
