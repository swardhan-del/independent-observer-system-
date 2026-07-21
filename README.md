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
```

To apply formatting:

```bash
npm run format
```

To preview the production build:

```bash
npm run preview
```

## GitHub Pages deployment

The included `.github/workflows/deploy.yml` verifies and builds the site when changes reach `main`, then deploys `dist/` to GitHub Pages.

Before the first deployment:

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **GitHub Actions** as the source.
4. Merge reviewed changes into `main`, or run the workflow manually from the **Actions** tab.

The Astro configuration automatically uses `/independent-observer-system-/` as the project-site base path inside GitHub Actions, while local development remains at `/`.

## Content editing

- Shared editorial data: `src/data/content.ts`
- Pages: `src/pages/`
- Components: `src/components/`
- Global design system: `src/styles/global.css`

Replace placeholder descriptions only with verified, publication-ready material. Never commit private records, passwords, tokens, API keys, `.env` files, or unpublished evidence.
