# Independent Observer production-readiness baseline

Historical baseline: paper-reader and external-link observations in this file predate the
author-controlled paper catalogue. The current catalogue audit is
`docs/author-paper-migration-audit-2026-08-31.md`.

Status: baseline captured before implementation

Audit timestamp: `2026-08-31T00:08:01Z`

This is a factual baseline for the technical-foundations work. It does not approve
publication, release, policy wording, author claims, source claims, or deployment.

## Verified project identity

| Identifier        | Verified value                              | Evidence                                                  |
| ----------------- | ------------------------------------------- | --------------------------------------------------------- |
| Production domain | `https://independentobserver.org`           | Vercel alias and live HTTP probe                          |
| GitHub repository | `swardhan-del/independent-observer-system-` | `origin` remote in the authoritative checkout             |
| Vercel project    | `independent-observer`                      | `.vercel/project.json` and `vercel project ls`            |
| Framework         | Astro `7.1.3`                               | `package.json`, `astro.config.mjs`, Vercel build metadata |
| Rendering         | Static output, trailing-slash routes        | `astro.config.mjs`                                        |

Authoritative checkout used for this audit: the isolated website checkout
inside the Dropbox desktop workspace. Local absolute paths are intentionally
omitted from repository documentation.

The parent Dropbox desktop folder is a different, dirty archive repository with
remote `https://github.com/swardhan-del/Independent-Observer-desktop.git`. It was
not edited.

## Git, deployment, and annotation protection

The checkout was clean before this baseline documentation commit. The repository
default branch is `main` at `4f4d776b85bd19b406ef4ffaf9be79fbcc13059a`. The active
annotation branch is `build/interactive-publication-v1`; its remote tip is
`571ff19e35ef9f61a2fbc120d2619e7d8ee49d46`, and the local checkout had one newer,
unpublished commit `4be397ffd6f920ffacac4a1d738ce43dfd98239`.

The exact production deployment pinned before implementation is:

- Vercel deployment: `dpl_FQGXt5eADmQRrK1nDQyNWBnj6UwS`
- Deployment URL: `https://independent-observer-7awyw56h4-swardhan1-9944s-projects.vercel.app`
- Aliases: `https://independentobserver.org`, `https://www.independentobserver.org`, and the Vercel project aliases
- Status: `READY`, promoted to production
- Production Git SHA: `571ff19e35ef9f61a2fbc120d2619e7d8ee49d46`
- Production Git ref: `build/interactive-publication-v1`
- Vercel metadata message: `Give the archive theme a brighter historical motif`

Open pull requests observed before editing included PR 29
(`build/interactive-publication-v1`, interactive publication work), PR 30
(`security/platform-hardening-v1`), and PR 28 (editorial release candidate). No
PR was merged or closed by this task.

The implementation branch was created as
`codex/production-foundations-v1` from the exact deployed SHA above. The active
annotation branch and its unpublished tip remain separate and were not reset,
rebased, deleted, force-pushed, or overwritten.

The protected annotation scope is recorded in
[`annotation-protection-inventory.md`](./annotation-protection-inventory.md).
This task treats shared templates, content data, evidence primitives, annotation
styles, and their tests as protected whenever a change could alter annotation
behavior, evidence mappings, stable IDs, or visible annotation styling.

## Baseline commands

| Check                                     | Result                                                                                                                   |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `npm ci`                                  | Passed; 326 packages audited; install warned of 20 vulnerabilities across the full dependency tree (5 moderate, 15 high) |
| `npm audit --omit=dev --audit-level=high` | Passed; 0 production vulnerabilities reported                                                                            |
| `npm run lint`                            | Passed; Astro check reported 0 errors, 0 warnings, 0 hints across 117 files                                              |
| `npm run format:check`                    | Passed                                                                                                                   |
| `npm test`                                | Passed; Astro build plus 333 Vitest tests across 10 files                                                                |
| Production build                          | Passed; 55 pages reported by Astro, including utility outputs and the custom 404                                         |

There is no standalone `typecheck` script. Type checking is included in
`astro check`, which is used by `lint`, `test`, and the production build.

## Route and indexing crawl

The build contains 54 `index.html` route files plus `404.html`. Excluding the
explicitly noindex Evidence Lab route and the legacy noindex `/start-here/`
redirect leaves the 52 intended indexable public HTML routes. A live crawl of
those 52 routes returned HTTP 200 for all 52.

The live sitemap returned 44 locations. It is missing these eight indexable,
HTTP-200 routes:

- `/research/lawsuits-are-illusions-where-institutional-power-actually-resides/`
- `/research/the-autonomous-illusion/`
- `/research/the-welfare-paradox/`
- `/documentaries/could-america-leave-nato/`
- `/documentaries/the-martian-illusion/`
- `/documentaries/the-work-behind-the-machine/`
- `/videos/the-cost-of-looking-away/`
- `/videos/why-evidence-alone-is-not-enough/`

The same crawl found:

- one canonical per intended page;
- one H1 per intended page;
- parseable JSON-LD blocks;
- no broken internal targets among 54 discovered internal paths;
- no accidental `noindex` meta on the 52 intended indexable routes;
- `/start-here/` is a noindex legacy page canonicalized to `/start/`;
- `/review/regrowing-humanity/` is a noindex staged Evidence Lab.

The sitemap, route generation, search corpus, feeds, navigation, related-content
links, and structured data do not yet share one canonical route registry. Their
current source map is documented below.

## Public artifacts and current production observations

| Artifact                          | Baseline observation                                                                                |
| --------------------------------- | --------------------------------------------------------------------------------------------------- |
| `/robots.txt`                     | HTTP 200; allows the production site and names `/sitemap.xml`                                       |
| `/sitemap.xml`                    | HTTP 200; 44 URLs                                                                                   |
| `/feed.xml`                       | HTTP 200; RSS scaffold with no approved `<item>` entries                                            |
| `/feed.atom.xml`                  | HTTP 200; Atom scaffold with no approved `<entry>` entries                                          |
| `/.well-known/security.txt`       | HTTP 200; points to the contact route and `/about/`                                                 |
| `/security.txt`                   | HTTP 404; no redirect to the standard well-known location                                           |
| `/404.html`                       | HTTP 200 when requested directly; the custom 404 artifact is built                                  |
| Publication Operating System DOCX | HTTP 200; `66333` bytes; SHA-256 `07984db194983a9ac7f50c244c8a4afea7b4b810602bd9abfb4d309bab1445ed` |

The live site currently returns HTTP 200 for `/index.html`, `/about`, and other
noncanonical variants instead of permanent redirects. The site is configured for
trailing-slash output, but redirect behavior is not yet enforced at the edge.

## Current canonical data sources

| Consumer                        | Current source(s)                                                                                                                            |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Header navigation               | hard-coded links in `src/components/Header.astro`                                                                                            |
| Search                          | `src/components/SiteSearch.astro`, aggregating `content.ts`, `documents.ts`, `series.ts`, `topics.ts`, and public retired repository records |
| Research catalogue              | `src/lib/research-catalogue.ts`, `content.ts`, `series.ts`, `retired-repository.ts`, and `volume-research.ts`                                |
| Sitemap                         | `src/pages/sitemap.xml.ts`, manually combining `topicHubs`, `publicDocumentItems`, `seriesItems`, and section paths                          |
| RSS and Atom                    | `src/data/release-log.ts` through `src/pages/feed.xml.ts` and `src/pages/feed.atom.xml.ts`                                                   |
| Volume counts and relationships | `src/data/series.ts`, `src/data/papers.ts`, `src/data/documents.ts`, volume evidence/research maps, and topic plugin catalogs                |
| Related work                    | `src/lib/related.ts` plus page-specific arrays and component inputs                                                                          |
| Structured data                 | `src/layouts/BaseLayout.astro` and page/component-specific markup                                                                            |
| Release safety                  | `src/data/publication-registry.ts`, `src/data/clearance-queue.ts`, `src/data/release-log.ts`, and release-safety tests                       |

The current typed publication registry is a useful foundation, but it is a
metadata-only release queue plus external-record projection. It is not yet the
single canonical model for every research, documentary, video, volume, topic, and
library route.

## Baseline size measurements

Measured from the live production alias on the audit timestamp:

- homepage HTML: `128286` bytes;
- Library HTML: `215959` bytes;
- Research HTML: `161319` bytes;
- four-volume PNG: `2690774` bytes;
- Publication Operating System DOCX: `66333` bytes.

The full recommended-reading/search payload is embedded in page output through
the current component architecture. Its isolated size was not separately
measured in this baseline; the next performance pass must measure it before and
after any change.

## Known baseline gaps

1. The sitemap omits the eight live indexable routes listed above.
2. `/start/` and legacy `/start-here/` are separate generated routes; the latter
   is noindex, but the policy decision is not represented in one route registry.
3. Noncanonical variants such as `/index.html` and slashless paths do not yet
   redirect permanently.
4. The CSP contains `script-src 'unsafe-inline'` and `style-src 'unsafe-inline'`.
   The response also permits `https:` images and returns `Access-Control-Allow-Origin: *`.
5. The contact form has a `mailto:` action while CSP permits only `form-action 'self'`;
   client-side JavaScript converts the form into a mail draft. No approved role
   mailbox or server delivery credential was verified.
6. The standard security report is available at `/.well-known/security.txt`, but
   `/security.txt` is a 404 and the current policy URL has not been verified as a
   disclosure policy.
7. Several reader labels still imply a local public reading copy even where the
   page only exposes a public retired repository record and synopsis.
8. The four volume totals, content status vocabulary, page metadata, and related
   links are derived from multiple overlapping models.
9. Current visible copy includes the reported grammar/pluralization defects,
   including `1 public preprints`, `1 previews`, `videopreviews`, and
   `Power →Distribution`.
10. CI runs important checks, but it does not yet fail on the complete route,
    sitemap, canonical/H1, internal-link, JSON-LD, security-reporting, or image
    integrity contract requested for this work.

## Decisions still requiring owner approval

The following are not silently decided by this baseline:

- whether a thin research, documentary, or video concept should be indexable;
- which verified author/editorial, ownership, independence, funding, conflict,
  correction, privacy, accessibility, licensing, source-challenge, and
  vulnerability-disclosure statements may be published;
- whether the 21 retired repository document routes may use any local full-text promise;
- whether an approved role mailbox and server-side delivery channel exist;
- whether any public-release, peer-review, correction, or supersession status has
  changed since the recorded source checks;
- whether a public privacy policy may be added to navigation.

No new research, citation, policy claim, biography, funding statement, conflict
statement, peer-review claim, or publication approval was created by this audit.
