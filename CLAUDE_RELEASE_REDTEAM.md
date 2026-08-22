# Independent Observer — Release Red-Team

Reviewer: Claude (editorial/release review agent) · Branch: `claude/editorial-release-review`
Scope: repository state only. No deploy, merge, or DNS/Vercel/GitHub Pages settings change was made or attempted. Where live-network verification was attempted, the attempt and its outcome are recorded below rather than assumed.

---

## 0. Network-verification disclosure

This session attempted read-only HTTPS checks against `swardhan-del.github.io`, `independent-observer.vercel.app`, `independentobserver.org`, and `www.independentobserver.org`. All four were blocked by this session's outbound network policy (`gateway answered 403 to CONNECT`, confirmed via `$HTTPS_PROXY/__agentproxy/status`) — not a finding about the sites themselves. Every claim below about _live_ host behavior is therefore marked `INSUFFICIENT EVIDENCE` and should be checked by Codex or a human with unrestricted network access, per Task 7's instruction not to fill evidence gaps by guessing.

---

## 1. CRITICAL — Two documented "canonical" production hosts, in conflict

This is the single most important finding in this review.

- `README.md` line 9: _"The repository is public and configured for GitHub Pages."_
- `.github/workflows/deploy.yml`: deploys `npm run build:pages` output to GitHub Pages on every push to `main`, no confirmation required.
- `docs/dropbox-safe-proof/README.md` line 35: _"the current canonical website remains **the existing Vercel deployment**."_
- `docs/custom-domain-launch.md`: describes an "existing Vercel project" (`independent-observer`), a live temporary address `independent-observer.vercel.app`, and a plan to attach `independentobserver.org` to **that Vercel project** — not to GitHub Pages.

**There is no `vercel.json`, no `.vercel/` directory, and no Vercel reference anywhere in `.github/workflows/` or `package.json` in this repository.** (Confirmed via repo-wide search; see §2.) That means either:

(a) Vercel is deploying this exact repo automatically via its own dashboard-side Git integration (no `vercel.json` required for zero-config Astro), and both GitHub Pages _and_ Vercel are live, publicly reachable, simultaneous deployments of the same content, or
(b) the Vercel references are stale/aspirational documentation from an earlier hosting decision that GitHub Pages superseded, and `docs/custom-domain-launch.md` / `docs/dropbox-safe-proof/README.md` need to be corrected, or
(c) Vercel was decommissioned and the docs weren't updated.

`INSUFFICIENT EVIDENCE` to say which. This needs a direct answer from whoever has Vercel dashboard access (Codex or the site owner) before any further hosting or SEO work proceeds, because it directly affects §2 and §3 below.

**Why this matters concretely, if (a) is true:** the repository's _default_ build (`npm run build`, no env vars) emits `site = https://swardhan-del.github.io`, `base = "/"` (`astro.config.mjs` lines 3, 42-48). If Vercel is building this repo with its default build command and no `SITE_URL`/`BASE_PATH` environment override configured on the Vercel _project_ (which this repo cannot show — that config lives only in the Vercel dashboard), the Vercel-hosted pages would ship canonical/OG/JSON-LD/sitemap URLs pointing at `swardhan-del.github.io` while being served from `independent-observer.vercel.app` or `independentobserver.org`. That is a canonical-URL mismatch that would actively hurt search indexing on whichever host is meant to be canonical. `INSUFFICIENT EVIDENCE` on whether Vercel's project env vars are actually set correctly — this repo has no visibility into that. **Action: Codex or the owner should confirm the current Vercel project's `SITE_URL`/`BASE_PATH` env vars (or confirm Vercel is not actually deployed) and reconcile the two docs.**

## 2. Fallback-host / stale-reference audit

Repo-wide search for hosting references (`grep -rI "vercel\|github.io\|independentobserver"`):

| Reference          | Location                                                       | Value                                                                                                                                                    |
| ------------------ | -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Default `SITE_URL` | `astro.config.mjs:3`                                           | `https://swardhan-del.github.io`                                                                                                                         |
| GH Pages base path | `package.json` `build:pages` script                            | `/independent-observer-system-`                                                                                                                          |
| CI's third build   | `.github/workflows/ci.yml:42`                                  | `SITE_URL=https://independentobserver.org BASE_PATH=/` — built only to feed the SEO audit step; **never deployed anywhere by this repo's own workflows** |
| SEO audit default  | `plugins/seo/seo-audit.mjs:5`, `plugins/seo/seo.config.json:3` | defaults to `https://independentobserver.org`                                                                                                            |
| Domain preflight   | `plugins/hosting/custom-domain-preflight.mjs:3`                | defaults to `independentobserver.org`                                                                                                                    |
| Vercel temp domain | `docs/custom-domain-launch.md:8`                               | `independent-observer.vercel.app` — **not referenced in any workflow, config, or test in this repo**                                                     |

No `vercel.json`, `.vercel/`, `now.json`, or any file matching `*vercel*` exists in the tracked tree (confirmed by glob). The Vercel project, if live, is configured entirely outside this repository.

**HIGH VALUE:** three distinct `SITE_URL` values exist across the repo (`swardhan-del.github.io`, `independentobserver.org`, and implicitly whatever Vercel's dashboard has, if different again) and only one of them (`swardhan-del.github.io` + `/independent-observer-system-` base) is actually wired to a real, in-repo, automatic deployment (`deploy.yml`). Recommend picking one authoritative production origin and updating `astro.config.mjs`'s default, the CI SEO-audit step, and the two `docs/` files to agree, once (1) above is resolved.

## 3. Old personal/medical preview material — does it exist in tracked source?

Checked: `src/data/*.ts`, all `src/pages/**/*.astro`, `docs/`, `content/`, `plugins/`, `README.md` for emails, Dropbox URLs/paths, local filesystem paths (`/Users/`, `/home/`, `C:\`), medical/student-record terms (student ID, SSN, date of birth, patient), and credential-shaped strings.

**Result: none found.** The only personally-identifying-adjacent content is the documentary concept "Three Countries. Three Systems. One MD." (`src/data/content.ts` line 53-59, mirrored in `src/data/documents.ts` and `docs/dropbox-safe-proof/README.md`), and its own copy explicitly states it compares medical-education systems _"without publishing private academic records."_ No student records, institution names, dates, or identifying details appear in the tracked source — only the high-level concept description. This matches the intent recorded in `docs/dropbox-safe-proof/public-safe-file-manifest.csv` (`DSA-012`: browser captures/personal material explicitly marked `EXCLUDE`).

A parallel `plugins/seo/seo-audit.mjs` build check (`publicLeakPatterns`, lines 59-64) already fails the build on `/Users/`, `/private/tmp`, Dropbox lockbox/private/secret paths, and credential-shaped strings in any rendered HTML — this is a real, CI-enforced guardrail, not just documentation. **This is a genuine strength: leakage prevention is automated, not just promised.**

## 4. Can removed content reappear through alternate routes?

- `getStaticPaths()` in every dynamic route (`research/[slug].astro`, `documentaries/[slug].astro`, `videos/[slug].astro`, `series/[slug].astro`, `library/documents/[slug].astro`) generates pages **only** from the corresponding `src/data/*.ts` array at build time. There is no client-side router, no catch-all route, and no server runtime (`output: "static"`, `astro.config.mjs:46`) — a removed item's page simply stops being generated on the next build. **No route-based reappearance risk found.**
- The Dropbox feed (`src/data/dropbox-content.generated.ts`) is checked into git as an explicit **empty-by-default** file with a code comment stating the empty state is intentional (lines 4-9) — a removed/rejected Dropbox item cannot silently reappear because the generator (`scripts/sync-dropbox-public-feed.mjs`) only ever regenerates this exact file from the exact approved manifest, and the PR-based flow (`sync-dropbox-content.yml`) requires human review before merge.
- **MEDIUM:** git history is public (this is a public GitHub repo) and retains every prior commit, including the pre-rename repository state (`ee5afd3`, `2bed602`, etc.) and the removed/re-added YouTube link commits (`cd7346b` → `739f98b`). None of the diffs reviewed exposed anything sensitive being _removed_ — the renames were cosmetic (dropping "The" from the brand name) — but as a general practice, **anything committed and later deleted from a public repo remains visible via GitHub's commit history UI.** This is standard for any public repo and not a bug, but it means "remove from source" is not equivalent to "make unreachable" for anyone who checks git history. Worth knowing if a future removal is ever privacy-motivated rather than editorial.

## 5. Canonical URL consistency (in generated output)

Verified against the two build modes this repo actually deploys/tests (`npm run build` default and `npm run build:pages`):

- `BaseLayout.astro` computes `canonicalUrl`, `og:url`, JSON-LD `@id`s, and the sitemap `<link rel="sitemap">` all from the same `Astro.site` + `sitePath()` helper (`src/lib/paths.ts`) — single source of truth, no duplication of the origin string across the layout. **Good.**
- `site-output.test.ts` asserts `og:url === canonical` and that the sitemap `<link>` matches the same origin, for every route, on every CI run. This is real, automated canonical-consistency enforcement, not just a claim.
- The one place canonical logic is _not_ shared: `src/pages/feed.xml.ts` reimplements its own `slugify()` (lines 5-9) instead of importing `src/lib/slugs.ts`. For the current title set the two implementations happen to produce identical slugs, but they are independent code paths that could silently diverge if a future title contains characters the two regexes treat differently (e.g. accented characters — `lib/slugs.ts` does Unicode `NFKD` normalization, `feed.xml.ts`'s local slugify does not). **MEDIUM**, flagged again in the code-review report.

## 6. Sitemap consistency

- `src/pages/sitemap.xml.ts` hardcodes an 8-route `publicRoutes` list (`/`, `/series/`, `/library/`, `/research/`, `/documentaries/`, `/videos/`, `/about/`, `/contact/`) — the eight top-level desks only.
- **HIGH VALUE:** none of the 13 individual detail pages (3 research, 3 documentaries, 3 videos, 4 series volumes) or the 1 library document reader are listed in the sitemap, even though they are fully public, crawlable, internally linked, indexable pages (no `noindex`) with unique canonical URLs. This appears to be a **deliberate, test-locked decision** — `site-output.test.ts` line 131-135 asserts the sitemap contains _exactly_ the same 8-route list and nothing else — rather than an oversight, since the same status labels ("Concept preview") appear on those pages too, making it a defensible pre-launch choice not to actively invite crawlers to thin one-paragraph pages. **Recommend this be revisited deliberately, not silently, once real content exists per page** — right now Google can still reach and index those pages via the internal links from the desk index pages, sitemap or not, so the current setup does not hide them from search, it just doesn't actively prioritize them.
- Sitemap correctly excludes `/404/` (asserted by `site-output.test.ts` line 140).

## 7. robots.txt

`src/pages/robots.txt.ts` — `Allow: /` for all user agents, points at the generated sitemap URL. Nothing disallowed, nothing stale. No finding.

## 8. RSS (`/feed.xml`)

`src/pages/feed.xml.ts` — covers research, documentary, and video items only (not series volumes, not library documents). Given the sitemap's similar top-level-only scope, this is consistent rather than an isolated gap, but worth deciding together with §6 rather than separately. **MEDIUM.**

## 9. Open Graph / JSON-LD

Both are generated centrally in `BaseLayout.astro` and asserted by `site-output.test.ts` on every route (image dimensions, MIME type, alt text, `WebSite`/`WebPage`/`BreadcrumbList` graph shape). No stale or duplicated metadata found. **No finding — this is solid, test-enforced infrastructure.**

## 10. External links / redirect behavior

- All three social links (`src/data/social.ts`) use `target="_blank" rel="me noopener noreferrer"` (`Footer.astro`, `index.astro` distribution grid) — correct `rel` usage (tab-nabbing protection + `rel="me"` for identity verification).
- The YouTube URL (`https://www.youtube.com/@independenobserver`) is missing the "t" that would make it read "independent" — this looks at first glance like a typo, but git blame shows it was added in commit `739f98b` ("Add verified YouTube channel link") with the message _"Publish the exact channel URL supplied by the site owner,"_ authored by the site owner directly. **Not flagged as a bug** — treated as the actual verified handle — but `INSUFFICIENT EVIDENCE` that it still resolves live today (network check blocked, see §0). Recommend a quick manual click-through before launch, since it's an easy string to have silently drifted from the real handle since it was recorded.
- No other outbound links found in reviewed source besides the three social links, the Vercel/domain docs (not rendered on the site), and the schema.org/sitemaps.org namespace URLs in JSON-LD/sitemap XML (standard, non-clickable).

## 11. Broken routes / duplicated pages

- No broken internal links found in tracked source — and this is not just a manual read: `site-output.test.ts` ("keeps every internal link valid") programmatically resolves every `<a>` tag in every built page against the actual `dist/` output and fails the build on a dead link or a dead in-page anchor. This test passed in this session's build (see Task 6 / test log).
- **Duplication, not brokenness:** `/library/documents/documentary-projects-print-capture/` is a reading-copy transcription of the same three documentary concepts already shown at `/documentaries/` (compare `src/data/documents.ts` lines 41-45 to `src/data/content.ts` lines 38-60). Not a bug — it's explicitly a "reviewed public reading copy" of a specific Dropbox print capture — but it is duplicate _content_, not duplicate _routing_, and a search engine or a careful reader will notice the overlap. Already flagged in the editorial audit (Task 1, §5).

## 12. Old preview artifacts

- No `.env`, credential file, or stray build artifact is tracked (`.gitignore` correctly excludes `dist/`, `.astro/`, `node_modules/`, `.env*`).
- `docs/dropbox-safe-proof/public-safe-file-manifest.csv` records that a `independent-observer-approved-preview.zip` archive was inspected read-only in Dropbox (not in this repo) and found to contain only site source/assets with no secrets, absolute paths, path traversal, or symlinks (`DSA-002`). That artifact does not exist in this repository; it is a Dropbox-side audit record only. No action needed here.

---

## Findings summary (severity-ordered)

| #           | Finding                                                                                                                                                           | Severity                     |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| 1           | GitHub Pages vs. Vercel: two docs claim two different "canonical" hosts; no Vercel config exists in-repo to confirm which is actually live or how it's configured | **CRITICAL**                 |
| 2           | Three different `SITE_URL` values exist across config/docs/plugins with only one wired to a real deployment                                                       | HIGH VALUE                   |
| 6           | 13 real detail pages + 1 document reader excluded from sitemap (appears deliberate/test-locked, not a bug, but undocumented as a decision)                        | HIGH VALUE                   |
| 5/10 (code) | `feed.xml.ts` duplicates `lib/slugs.ts` slugify logic instead of importing it                                                                                     | MEDIUM                       |
| 8           | RSS feed scope narrower than full content set (consistent with sitemap scope, same open decision)                                                                 | MEDIUM                       |
| 4           | Public git history retains all prior commits (normal for a public repo, worth knowing)                                                                            | MEDIUM (informational)       |
| 11          | Library document reader duplicates documentaries-index content                                                                                                    | MEDIUM (cross-ref to Task 1) |
| 10          | YouTube handle unverified live this session (owner-confirmed in git history, not a code bug)                                                                      | LOW — verify manually        |

**No CRITICAL findings involve exposed secrets, personal/medical data, or broken publication gates.** The one CRITICAL finding is architectural/documentation ambiguity about which host is actually production, which should be resolved before any further SEO or launch-sequencing work is trusted.
