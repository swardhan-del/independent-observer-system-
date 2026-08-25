# Interactive publication v1 audit

Branch: `build/interactive-publication-v1`

Base: `main` at `4f4d776b85bd19b406ef4ffaf9be79fbcc13059a`
Scope: static-first Astro improvements; no release, deployment, merge, secret configuration, or Dropbox feed mutation.

## Before / after feature matrix

| Surface            | Before                                               | After                                                                                                                                                                                                                                                                 |
| ------------------ | ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Site search        | Browser-local substring matching across a flat list  | Token-boundary ranking, diacritic and punctuation normalization, controlled synonyms, type/topic/status/volume filters, URL state, grouped results, safe highlighting, zero-result suggestions, keyboard navigation, focus restoration, and live result announcements |
| Desk filters       | Text substring plus status buttons                   | Token-boundary matching retained with URL-persisted query/status state                                                                                                                                                                                                |
| Reader             | Static section list and public-safe notice           | Reusable progress indicator, sticky TOC with scroll spy, section-link copy, reading time, status/source metadata, references/source notes/limitations, suggested citation, print/share/link actions, related work, and no-JavaScript-readable HTML                    |
| Evidence model     | Editorial method described in prose                  | Reusable evidence-layer controls and claim maps for fact, interpretation, hypothesis, proposal, limitation, counterargument, and unresolved question; no confidence scores                                                                                            |
| Discovery          | Home cards, six coverage fields, four-volume roadmap | `/start/`, six topic hubs, topic index, honest preview/release labels, related-content model, and roadmap timeline                                                                                                                                                    |
| Reading list       | Local save/remove/clear                              | Versioned local model with count, unread/reading/finished status, local tags, sort modes, JSON export/import, storage failure notice, cross-page/storage events, and focus support                                                                                    |
| Visual explainers  | No reusable explainer primitives                     | Timeline, mechanism diagram, trade-off comparison, glossary tooltip, and searchable transcript components ready for reviewed content                                                                                                                                  |
| Homepage           | Public archive progress and discovery cards          | Compact guided path, evidence-layer preview, topic-hub links, transparent approval-gated release status, and preserved navy/gold identity                                                                                                                             |
| SSRN preprints     | No article content on the research shelf             | Seven public-safe, SSRN-linked reading copies selected from matching Dropbox preprint controllers; sorted by retrieved downloads, with abstract-view counts, direct SSRN links, visible limitations, and no invented ratings                                          |
| Operating standard | Not hosted by the website                            | Exact owner-provided Publication Operating System DOCX hosted on the review deployment with a dedicated reference page, search entry, sitemap route, and integrity test; it is not an article or feed item                                                            |
| Privacy boundary   | Approval-gated generated data and local interactions | Same fail-closed feed; generated feed remains empty; no network search, accounts, analytics, tracking, or private-file exposure added                                                                                                                                 |

## Editorial and release boundary

- `src/data/dropbox-content.generated.ts` remains generated and empty for the current build.
- Seven curated SSRN-linked reading copies were added to the review branch from matching public-safe Dropbox preprint controllers. Each is labeled `SSRN preprint`; none is represented as a peer-reviewed or Independent Observer-published article.
- The exact owner-provided `INDEPENDENT_OBSERVER_PUBLICATION_ENGINE_2026.docx` was copied into the review deployment as a separately labeled operating-standard reference. Its SHA-256 is `07984db194983a9ac7f50c244c8a4afea7b4b810602bd9abfb4d309bab1445ed`; no Dropbox URL is embedded in public output.
- The operating standard is not an article, is not in the approved feed, and does not change `releaseApproved` state.
- No future article candidate was copied into the public feed or marked `releaseApproved`.
- Existing research, documentary, video, and series entries remain explicitly preview/development content.
- The approved Dropbox folder was not written to or populated.
- The publication sequence remains: approved manifest → validation → generated public-safe data → pull request → CI → human review → merge → deployment.

### SSRN selection note

The public SSRN search results do not provide a star-rating field. The shelf is therefore ordered by the latest retrievable download signal, with abstract views and citations displayed as descriptive context rather than quality scores. The first five records are: `Who Deported More?` (126 downloads), `The Latino Irony` (56), `Disconnected Hearts` (47), `The Wardhan Tax Doctrine` (42), and `The Double Tax on Time` (39). Metrics are time-varying and should be refreshed before any production release decision.

## Dependency and plugin review

### Dependencies

No dependency was added. The interaction layer uses Astro, TypeScript, CSS, native HTML controls, browser-local storage, the Clipboard/Share APIs when available, and progressive enhancement. A third-party package would add bundle, maintenance, license, security, and privacy surface without being necessary for these interactions.

`npm ci` on the base toolchain reported 20 existing audit findings (5 moderate, 15 high) in the installed development dependency tree. This branch did not add or upgrade a package, and the findings were not silently bypassed or represented as resolved; they remain a separate dependency-maintenance task.

### Retained repository integrations

- `plugins/seo/seo-audit.mjs` — retained and exercised after the custom-domain build.
- `plugins/hosting/custom-domain-preflight.mjs` — retained; no hosting or DNS state was changed.
- `scripts/sync-dropbox-public-feed.mjs` and `.github/workflows/sync-dropbox-content.yml` — retained; the narrow approval-gated workflow remains the only Dropbox publication boundary.
- `plugins/integrations/`, `plugins/dropbox/`, `plugins/reading-list/`, and `plugins/social/` documentation/configuration — retained as audit/reference material; no external service was activated.

### Rejected archive/dependency candidates

The following categories were explicitly excluded from implementation and public output: `.venv/`, `site-packages/`, archived Python `plugin.py` files, `.codex_work/` and recovered workspaces as feature sources, compatibility variants, generated render directories, dependency caches, duplicate/conflicted copies, unverified scripts, abandoned website copies, and large composite/private DOCX or media reservoirs. A filename containing `plugin` was not treated as authorization to install or copy it.

## Accessibility and performance findings

- Keyboard: search supports Command/Ctrl-K, Escape, arrow selection, Enter-to-open, focus restoration, and a bounded dialog tab loop; the reading list and native details controls remain keyboard operable.
- Semantics: landmarks, one-page `h1` structure, labels, live status messages, dialog names, result roles, and non-color evidence labels are present in the static output.
- Responsive checks: layouts include explicit behavior for 375px, 768px, 1024px, and 1440px review widths; the new grids collapse at 900px and 620px.
- Motion: existing brand/hero motion remains restrained and the reduced-motion rule disables animated transitions/animations for users who request it.
- Performance/privacy: no SPA conversion or third-party runtime was introduced; search and reading-list state stay in the browser; noncritical media behavior is unchanged; no query or list data is sent over the network.
- GitHub Pages compatibility: all new links use `sitePath()`, and the Pages build remains static. Custom-domain root paths are verified separately.

## Deferred because release evidence is unavailable

- Full Independent Observer article publication remains distinct from the new SSRN-linked reading copies. Full article text, claim-level citation maps, source-backed charts, documentary players, transcripts, and any production release status remain deferred until the exact public-safe controller, rights, metadata, final rendering, and human release gates are complete.
- The six Green candidates remain candidates awaiting human release and are not included in this branch's production data.
- Native citation download is intentionally withheld when author and publication-date metadata are incomplete.

## Verification record

The final command results are recorded in the handoff for this branch. The required final suite must include formatting, Astro check, tests, production build, Pages build, built-output tests, custom-domain build, and custom-domain SEO audit. A green result does not authorize merge, deployment, publication, or Dropbox mutation.
