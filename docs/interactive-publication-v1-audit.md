# Interactive publication v1 audit

Branch: `build/interactive-publication-v1`

Base: `main` at `4f4d776b85bd19b406ef4ffaf9be79fbcc13059a`
Scope: static-first Astro improvements; no release, deployment, merge, secret configuration, or Dropbox feed mutation.

## Before / after feature matrix

| Surface                   | Before                                                                   | After                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Site search               | Browser-local substring matching across a flat list                      | Token-boundary ranking, diacritic and punctuation normalization, controlled synonyms, type/topic/status/volume filters, URL state, grouped results, safe highlighting, zero-result suggestions, keyboard navigation, focus restoration, and live result announcements                                                                                                                                                                                                                                                                  |
| Desk filters              | Text substring plus status buttons                                       | Token-boundary matching retained with URL-persisted query/status state                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Reader                    | Static section list and public-safe notice                               | Reusable progress indicator, sticky TOC with scroll spy, section-link copy, reading time, status/source metadata, volume-aware publication boundary with a same-volume reading-copy stack, references/source notes/limitations, suggested citation, print/share/link actions, related work, and no-JavaScript-readable HTML                                                                                                                                                                                                            |
| Evidence model            | Editorial method described in prose                                      | Reusable evidence-layer controls and claim maps for fact, interpretation, hypothesis, proposal, limitation, counterargument, and unresolved question; no confidence scores                                                                                                                                                                                                                                                                                                                                                             |
| Discovery                 | Home cards, six coverage fields, four-volume roadmap                     | `/start/`, six topic hubs, a prominent four-volume development guide naming Siddhartha Harsh Wardhan, a question-to-volume route builder, a six-field/four-volume relationship matrix, five pathway plugins with primary volume/core ideas/public entry points, plus selected public work                                                                                                                                                                                                                                              |
| Public library            | Three high-level volume summaries and a document shelf                   | Four public-safe volume content blocks explaining why each volume matters, its principles and topic lenses, a representative paper signal for each volume, local URL filtering, and seven SSRN preprint cards linked to their internal readers and public SSRN records                                                                                                                                                                                                                                                                 |
| Publication catalogue     | Volume filters and local query exposed volume records only               | The catalogue now leads with a visible four-volume spine, then carries each volume's matched SSRN reading copies; paper descriptions/categories/statuses are indexed by the local query, and every paper offers both an internal reading-copy link and a direct SSRN record link; retrieved downloads remain usage signals, not ratings                                                                                                                                                                                                |
| Research catalogue        | Three concept previews and a separate SSRN shelf                         | One local searchable catalogue with four volume records, seven volume-linked SSRN reading copies, and three research concepts; token-boundary ranking, volume/topic/status/content-type filters, URL state, ranked result reordering, zero-result suggestions, save controls, and direct public record links keep the four-volume spine connected                                                                                                                                                                                      |
| Research-to-volume links  | Research concepts stood alone from the volume work                       | The institutional-power concept is mapped to Volume III (Managed Decline), names the related Terry v. Ohio working-paper direction without reproducing its private source, and exposes Volume III's public SSRN reading copy beneath the preview                                                                                                                                                                                                                                                                                       |
| Volume III catalogue file | Managed Decline had a title, summary, and generic concept-stage boundary | The Volume III page now carries a seven-line research dossier covering labor markets, licensing and access, welfare and social control, taxation and ownership, health systems, and public visibility. One matched SSRN reading copy is linked; six private-source directions remain status-labeled and unlinked, including a clearly bounded welfare-socialism question. Local search, lens filters, URL state, expandable research notes, and recoverable empty-state guidance are dependency-free and progressive-enhancement safe. |
| Reading list              | Local save/remove/clear                                                  | Versioned local model with count, unread/reading/finished status, local tags, sort modes, JSON export/import, storage failure notice, cross-page/storage events, focus support, and an explicit curated shelf for the five highest-download matched SSRN preprints plus four book/volume roadmap previews                                                                                                                                                                                                                              |
| Visual explainers         | No reusable explainer primitives                                         | Timeline, mechanism diagram, trade-off comparison, glossary tooltip, and searchable transcript components ready for reviewed content                                                                                                                                                                                                                                                                                                                                                                                                   |
| Homepage                  | Public archive progress and discovery cards                              | Compact guided path, evidence-layer preview, topic-hub links, transparent approval-gated release status, smaller responsive display typography, four-volume method summary, and preserved navy/gold identity                                                                                                                                                                                                                                                                                                                           |
| SSRN preprints            | No article content on the research shelf                                 | Seven public-safe, SSRN-linked reading copies selected from matching Dropbox preprint controllers; sorted by retrieved downloads, with abstract-view counts, direct SSRN links, visible limitations, and no invented ratings                                                                                                                                                                                                                                                                                                           |
| Volume I method           | About page introduced the project in general terms                       | About now explains Volume I as an observation method: document before reaction, distinguish record from interpretation, and connect the method to the public Volume I SSRN reading copy and series roadmap                                                                                                                                                                                                                                                                                                                             |
| Video pathways            | Video desk described future formats without a reader path                | Video desk now connects concept-only shorts/reels, the planned Independent Observer Survey, and documentary/explainer depth; `The Cost of Looking Away` carries a source-labeled Volume II evidence layer and claim map while stating that no survey responses or results are published and that media still requires clearance                                                                                                                                                                                                        |
| Operating standard        | Not hosted by the website                                                | Exact owner-provided Publication Operating System DOCX hosted on the review deployment with a dedicated reference page, search entry, sitemap route, and integrity test; it is not an article or feed item                                                                                                                                                                                                                                                                                                                             |
| Privacy boundary          | Approval-gated generated data and local interactions                     | Same fail-closed feed; generated feed remains empty; no network search, accounts, analytics, tracking, or private-file exposure added                                                                                                                                                                                                                                                                                                                                                                                                  |

## Research desk volume map

Research detail pages now carry a separate four-volume research map beneath the evidence controls. It explains the relative role of Volume I (method), Volume II (power and sovereignty), Volume III (work and social citizenship), and Volume IV (capability and adaptation), then links only to the existing public-safe concept and SSRN records. This map does not relabel any preview as published and remains distinct from publication status, topic hubs, and the public library.

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
- “Lawsuits Are Illusions: Where Institutional Power Actually Resides” is now mapped to Volume III, Managed Decline. The page describes the Volume III connection and the related “From Vietnam to Terry v. Ohio” working-paper direction, while keeping the raw Dropbox source, private metadata, and alternate drafts outside the build. Its related public Volume III SSRN reading copy is shown as context, not as proof or publication.
- The publication sequence remains: approved manifest → validation → generated public-safe data → pull request → CI → human review → merge → deployment.

### Volume III research dossier

The `Managed Decline` catalogue page now includes seven public-safe research lines drawn from the read-only Volume III inventory: the public `The Wardhan Tax Doctrine` reading copy plus six bounded working-paper directions covering reintegration and policing, welfare and social control, social class and welfare, health and licensing, macroeconomic/medical labor links, and public visibility. The social-class line names “welfare socialism” only as an open analytical question; it is not presented as a finding or endorsement. Each card explains why the line matters and states its boundary. The dossier is a discovery layer, not a bulk manuscript import: it contains no private source text, local paths, Dropbox links, personal records, unsupported metrics, or release flags. Search and lens filters update `q` and `lens` in the local URL with `history.replaceState`; when a query and lens have no intersection, the empty state explains the conjunction and provides keyboard-accessible recovery buttons; the static cards and native `<details>` notes remain usable without JavaScript.

The same page now turns the evidence control into a concrete Volume III case study for `The Wardhan Tax Doctrine`. The public SSRN record, proposal, interpretation, hypothesis, limitation, counterargument, and unresolved question are shown as separate, selectable layers, with an explicit `Volume III public reading copy · SSRN preprint · policy proposal under review` status. The accompanying claim map is also source-specific and avoids confidence scoring. This makes the evidence interaction useful for a real public reading copy while preserving the distinction between a paper, an interpretation, and an approved publication.

### SSRN selection note

The public SSRN search results do not provide a star-rating field. The shelf is therefore ordered by the latest retrievable download signal, with abstract views and citations displayed as descriptive context rather than quality scores. The first five records are: `Who Deported More?` (126 downloads), `The Latino Irony` (56), `Disconnected Hearts` (47), `The Wardhan Tax Doctrine` (42), and `The Double Tax on Time` (39). Metrics are time-varying and should be refreshed before any production release decision.

The Reading List dialog now exposes those five public-safe reading copies and all four volume roadmap previews as recommendations. Nothing is silently inserted into the browser-local list: readers must select an individual `Save` control or the explicit `Save all previews` action. ResearchGate links are shown only where an exact public copy was verified for `Who Deported More?` and `Disconnected Hearts`; no ResearchGate rating or citation count is represented as a quality score, and sensitive case-study results were excluded.

The public document reader now identifies the current document's real volume and series title inside
its publication-boundary section. It stacks the currently indexed SSRN reading copies for that same
volume, marks the current document, shows the descriptive download signal where available, and keeps
the preprint/release distinction visible. The component is data-driven across Volumes I–IV; it does
not call a remote service, expose Dropbox paths, or imply that a volume is a finished publication.

The Volume III Wardhan Tax Doctrine reading copy now uses a fuller public abstract: it explains the
time-investment premise, W-2 relief, selected capital-preference reform, administrative controls, and
the distinction between a policy proposal and enacted law or an official fiscal score.

## Comment implementation pass

The latest preview-comment pass adds three reader-facing changes without treating private Dropbox
material as a publication source. The Topics page now has an `Investigative entry point` form that
maps a selected subject, concern, and public state to the nearest one of five pathways, preserving
the choice in the URL and keeping the release boundary explicit. It also has a keyboard-operable
six-field by four-volume matrix: each cell explains whether the connection is mapped, exposes the
volume lens and core ideas, and links to already-public reading copies, previews, or catalogue
entries. Unmapped cells remain visibly unmapped.

The topic atlas now supports local query, volume, content-type, status, and ordering refinements.
Its synonym groups and token boundaries mean a query such as `AI` matches AI/automation/computing
work without substring-matching an unrelated word. The new controls preserve URL state and provide
an honest empty-state recovery path. The Volume III dossier uses the same boundary-aware approach
for terms such as welfare, taxation, licensing, and visibility.

The flagship video concept now has a source-labeled evidence case study based on the already-public
EAVS source notes: documented participation figures, interpretation, hypothesis, policy boundary,
limitation, counterargument, and unresolved question are separate layers, with a claim map that
does not assign a confidence score. This remains a Volume II concept preview; it does not create a
player, publish a transcript, or assert release approval.

A second comment-focused pass makes the Public Library a usable four-volume research shelf rather
than leaving the volume explanation below the archive snapshot. The first view now presents each
volume's focus, public reading-copy count, current download signal, status, importance, core
principles, and direct catalogue/topic links. A local paper browser then indexes all seven public
SSRN reading copies by volume, title, subject, status, downloads, and views; query and volume state
persist as `paperQ` and `paperVolume` without sending data off-device. Download counts are explicitly
described as discovery signals, not ratings. The jump rail is an accessible labelled group rather
than a competing navigation landmark, and the responsive rules collapse the shelf and paper cards
for narrow screens.

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
- `src/data/volume-three-research.ts` and `src/components/VolumeResearchDossier.astro` — added as a dependency-free Volume III discovery layer; it links only the already-public SSRN reading copy and leaves all uncleared working-paper directions unlinked.

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
- Typography: the homepage hero, mission lead, topic hero, research-detail hero, about hero, and document-reader hero now use more compact responsive display scales so descriptive body copy and volume context have more room at laptop and tablet widths.
- Performance/privacy: no SPA conversion or third-party runtime was introduced; search and reading-list state stay in the browser; noncritical media behavior is unchanged; no query or list data is sent over the network.
- GitHub Pages compatibility: all new links use `sitePath()`, and the Pages build remains static. Custom-domain root paths are verified separately.

## Deferred because release evidence is unavailable

- Full Independent Observer article publication remains distinct from the new SSRN-linked reading copies. Full article text, claim-level citation maps, source-backed charts, documentary players, transcripts, and any production release status remain deferred until the exact public-safe controller, rights, metadata, final rendering, and human release gates are complete.
- The five non-public Volume III source directions remain deferred as public reading copies until separate source verification, rights/provenance, quality, metadata, and human release approval are complete. The dossier intentionally provides no direct link to their private source files.
- The six Green candidates remain candidates awaiting human release and are not included in this branch's production data.
- Native citation download is intentionally withheld when author and publication-date metadata are incomplete.

## Verification record

Verification on 2026-08-27: the initial full verification passed before this second pass. After the
library shelf changes, `npm test` passed with 196 tests across 9 files and produced 38 static pages;
`astro check` reported 0 errors, warnings, or hints. The remaining full verification commands
(`npm run format:check`, `npm run lint`, `npm run build:pages`, `npm run test:built`,
`SITE_URL=https://independentobserver.org BASE_PATH=/ npm run build`, and
`SEO_SITE_URL=https://independentobserver.org npm run seo:audit`) are run again before the commit is
pushed. A green result does not authorize merge, article publication, or Dropbox mutation.
