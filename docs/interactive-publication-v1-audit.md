# Interactive publication v1 audit

Branch: `build/interactive-publication-v1`

Base: `main` at `4f4d776b85bd19b406ef4ffaf9be79fbcc13059a`
Scope: static-first Astro improvements; no release, deployment, merge, secret configuration, or Dropbox feed mutation.

## Before / after feature matrix

| Surface               | Before                                                     | After                                                                                                                                                                                                                                                                                                                                             |
| --------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Site search           | Browser-local substring matching across a flat list        | Token-boundary ranking, diacritic and punctuation normalization, controlled synonyms, type/topic/status/volume filters, URL state, grouped results, safe highlighting, zero-result suggestions, keyboard navigation, focus restoration, and live result announcements                                                                             |
| Desk filters          | Text substring plus status buttons                         | Token-boundary matching retained with URL-persisted query/status state                                                                                                                                                                                                                                                                            |
| Reader                | Static section list and public-safe notice                 | Reusable progress indicator, sticky TOC with scroll spy, section-link copy, reading time, status/source metadata, references/source notes/limitations, suggested citation, print/share/link actions, related work, and no-JavaScript-readable HTML                                                                                                |
| Evidence model        | Editorial method described in prose                        | Reusable evidence-layer controls and claim maps for fact, interpretation, hypothesis, proposal, limitation, counterargument, and unresolved question; no confidence scores                                                                                                                                                                        |
| Discovery             | Home cards, six coverage fields, four-volume roadmap       | `/start/`, six topic hubs, a prominent four-volume development guide naming Siddhartha Harsh Wardhan, five question pathways with discovery plugins for primary volume, core ideas, and public entry points, plus selected public work                                                                                                            |
| Public library        | Three high-level volume summaries and a document shelf     | Four public-safe volume content blocks explaining why each volume matters, its principles and topic lenses, a representative paper signal for each volume, local URL filtering, and seven SSRN preprint cards linked to their internal readers and public SSRN records                                                                            |
| Publication catalogue | Volume filters and local query exposed volume records only | The catalogue now leads with a visible four-volume spine, then carries each volume's matched SSRN reading copies; paper descriptions/categories/statuses are indexed by the local query, and every paper offers both an internal reading-copy link and a direct SSRN record link; retrieved downloads remain usage signals, not ratings           |
| Research catalogue    | Three concept previews and a separate SSRN shelf           | One local searchable catalogue with four volume records, seven volume-linked SSRN reading copies, and three research concepts; token-boundary ranking, volume/topic/status/content-type filters, URL state, ranked result reordering, zero-result suggestions, save controls, and direct public record links keep the four-volume spine connected |
| Reading list          | Local save/remove/clear                                    | Versioned local model with count, unread/reading/finished status, local tags, sort modes, JSON export/import, storage failure notice, cross-page/storage events, focus support, and an explicit curated shelf for the five highest-download matched SSRN preprints plus four book/volume roadmap previews                                         |
| Visual explainers     | No reusable explainer primitives                           | Timeline, mechanism diagram, trade-off comparison, glossary tooltip, and searchable transcript components ready for reviewed content                                                                                                                                                                                                              |
| Homepage              | Public archive progress and discovery cards                | Compact guided path, evidence-layer preview, topic-hub links, transparent approval-gated release status, and preserved navy/gold identity                                                                                                                                                                                                         |
| SSRN preprints        | No article content on the research shelf                   | Seven public-safe, SSRN-linked reading copies selected from matching Dropbox preprint controllers; sorted by retrieved downloads, with abstract-view counts, direct SSRN links, visible limitations, and no invented ratings                                                                                                                      |
| Volume I method       | About page introduced the project in general terms         | About now explains Volume I as an observation method: document before reaction, distinguish record from interpretation, and connect the method to the public Volume I SSRN reading copy and series roadmap                                                                                                                                        |
| Video pathways        | Video desk described future formats without a reader path  | Video desk now connects concept-only shorts/reels, the planned Independent Observer Survey, and documentary/explainer depth while stating that no survey responses or results are published and that media still requires clearance                                                                                                               |
| Operating standard    | Not hosted by the website                                  | Exact owner-provided Publication Operating System DOCX hosted on the review deployment with a dedicated reference page, search entry, sitemap route, and integrity test; it is not an article or feed item                                                                                                                                        |
| Privacy boundary      | Approval-gated generated data and local interactions       | Same fail-closed feed; generated feed remains empty; no network search, accounts, analytics, tracking, or private-file exposure added                                                                                                                                                                                                             |

## Editorial and release boundary

- `src/data/dropbox-content.generated.ts` remains generated and empty for the current build.
- Seven curated SSRN-linked reading copies were added to the review branch from matching public-safe Dropbox preprint controllers. Each is labeled `SSRN preprint`; none is represented as a peer-reviewed or Independent Observer-published article.
- The exact owner-provided `INDEPENDENT_OBSERVER_PUBLICATION_ENGINE_2026.docx` was copied into the review deployment as a separately labeled operating-standard reference. Its SHA-256 is `07984db194983a9ac7f50c244c8a4afea7b4b810602bd9abfb4d309bab1445ed`; no Dropbox URL is embedded in public output.
- The operating standard is not an article, is not in the approved feed, and does not change `releaseApproved` state.
- No future article candidate was copied into the public feed or marked `releaseApproved`.
- Existing research, documentary, video, and series entries remain explicitly preview/development content.
- The approved Dropbox folder was not written to or populated.
- The catalogue integration was built from the existing public-safe SSRN data model after read-only confirmation of matching volume-organized Dropbox source files. Raw Dropbox files, recovered workspaces, and private paths remain excluded.
- The Research desk now uses the same public-safe model: four volume records, seven SSRN reading copies ordered by retrieved downloads, and three research concepts are indexed locally in `src/lib/research-catalogue.ts`; no raw Dropbox source, private path, or approval state is added.
- The publication sequence remains: approved manifest → validation → generated public-safe data → pull request → CI → human review → merge → deployment.

### SSRN selection note

The public SSRN search results do not provide a star-rating field. The shelf is therefore ordered by the latest retrievable download signal, with abstract views and citations displayed as descriptive context rather than quality scores. The first five records are: `Who Deported More?` (126 downloads), `The Latino Irony` (56), `Disconnected Hearts` (47), `The Wardhan Tax Doctrine` (42), and `The Double Tax on Time` (39). Metrics are time-varying and should be refreshed before any production release decision.

The Reading List dialog now exposes those five public-safe reading copies and all four volume roadmap previews as recommendations. Nothing is silently inserted into the browser-local list: readers must select an individual `Save` control or the explicit `Save all previews` action. ResearchGate links are shown only where an exact public copy was verified for `Who Deported More?` and `Disconnected Hearts`; no ResearchGate rating or citation count is represented as a quality score, and sensitive case-study results were excluded.

## Dependency and plugin review

### Dependencies

No dependency was added. The interaction layer uses Astro, TypeScript, CSS, native HTML controls, browser-local storage, the Clipboard/Share APIs when available, and progressive enhancement. A third-party package would add bundle, maintenance, license, security, and privacy surface without being necessary for these interactions.

`npm ci` on the base toolchain reported 20 existing audit findings (5 moderate, 15 high) in the installed development dependency tree. This branch did not add or upgrade a package, and the findings were not silently bypassed or represented as resolved; they remain a separate dependency-maintenance task.

### Retained repository integrations

- `plugins/seo/seo-audit.mjs` — retained and exercised after the custom-domain build.
- `plugins/hosting/custom-domain-preflight.mjs` — retained; no hosting or DNS state was changed.
- `scripts/sync-dropbox-public-feed.mjs` and `.github/workflows/sync-dropbox-content.yml` — retained; the narrow approval-gated workflow remains the only Dropbox publication boundary.
- `plugins/integrations/`, `plugins/dropbox/`, `plugins/reading-list/`, and `plugins/social/` documentation/configuration — retained as audit/reference material; no external service was activated.
- `plugins/library-content/` — added as a dependency-free public metadata layer for the four volume blocks; it does not import private archive files or alter the approved feed.

### Rejected archive/dependency candidates

The following categories were explicitly excluded from implementation and public output: `.venv/`, `site-packages/`, archived Python `plugin.py` files, `.codex_work/` and recovered workspaces as feature sources, compatibility variants, generated render directories, dependency caches, duplicate/conflicted copies, unverified scripts, abandoned website copies, and large composite/private DOCX or media reservoirs. A filename containing `plugin` was not treated as authorization to install or copy it.

## Accessibility and performance findings

- Keyboard: search supports Command/Ctrl-K, Escape, arrow selection, Enter-to-open, focus restoration, and a bounded dialog tab loop; the reading list and native details controls remain keyboard operable.
- Semantics: landmarks, one-page `h1` structure, labels, live status messages, dialog names, result roles, and non-color evidence labels are present in the static output.
- Responsive checks: layouts include explicit behavior for 375px, 768px, 1024px, and 1440px review widths; the new grids collapse at 900px and 620px.
- Topic navigation: the Topics page now leads with exactly five question pathways, each connected to relevant volume detail routes and subject hubs, followed by all four roadmap volumes; no topic card is presented as a released article and the layout does not imply a sixth route.
- Pathway plugins: each of the five routes now exposes a primary volume, three core ideas, and links to public-safe SSRN preprints or clearly labeled research, documentary, video, and series previews. The migration route is explicitly Volume II-led; science and human capability is explicitly Volume IV-led.
- Start Here: the page now identifies the four-volume project and author in the hero, places the volume guide first, and then deep-links five guided cards to pathway plugins with core ideas and public entry points. The card copy now names Volume I's observation method, Volume IV's AI/labor, democracy-capacity, and science/capability routes, and the Volumes II-III migration/political-economy route; the observation framing treats time, resources, and economic position as an analytical lens rather than an unsupported universal claim.
- Library navigation: the Public Library now leads with four volume blocks, each showing why the volume matters, its core ideas, topic lenses, roadmap links, and mapped SSRN preprint reading copies. One representative paper per volume is surfaced using the highest current download signal within that volume; it is labeled as descriptive discovery context, not a rating or endorsement.
- Volume I method: the About page now gives the method a dedicated public section and links readers directly to the Volume I SSRN reading copy and its Volume I roadmap entry. The Harvard reference is named as Charles Hamilton Houston, not the unverified “Charles Hicks” wording from the comment.
- Video desk: the new format pathway is intentionally editorial rather than promotional: Shorts & Reels, Independent Observer Survey, and Documentary & Explainers are separate concept states, with no survey data or uncleared media presented as live publication.
- Motion: existing brand/hero motion remains restrained and the reduced-motion rule disables animated transitions/animations for users who request it.
- Performance/privacy: no SPA conversion or third-party runtime was introduced; search and reading-list state stay in the browser; noncritical media behavior is unchanged; no query or list data is sent over the network.
- GitHub Pages compatibility: all new links use `sitePath()`, and the Pages build remains static. Custom-domain root paths are verified separately.

## Deferred because release evidence is unavailable

- Full Independent Observer article publication remains distinct from the new SSRN-linked reading copies. Full article text, claim-level citation maps, source-backed charts, documentary players, transcripts, and any production release status remain deferred until the exact public-safe controller, rights, metadata, final rendering, and human release gates are complete.
- The six Green candidates remain candidates awaiting human release and are not included in this branch's production data.
- Native citation download is intentionally withheld when author and publication-date metadata are incomplete.

## Verification record

Verification on 2026-08-26: format check passed; Astro check passed with 0 errors, 0 warnings, and 0 hints; `npm test` passed with 172 tests across 9 files; production and GitHub Pages builds each produced 38 static pages; built-output tests passed with 172 tests; the custom-domain root build passed; the SEO audit passed all 38 HTML files; and the public artifact leakage scan passed. A green result does not authorize merge, article publication, or Dropbox mutation.
