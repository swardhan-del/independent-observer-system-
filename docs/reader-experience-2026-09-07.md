# Independent Observer: implemented reader-experience audit

## Review scope and preview

Local preview: http://127.0.0.1:4337/ (available while the preview server is running).

Branch: `codex/reader-experience-2026-09-07`. The isolated Dropbox checkout was created from production/main commit `de3a2a5855b77f9c19d79c1b79356e82929485af`. The original checkout, unrelated changes, and manuscripts were preserved. No merge, deployment, DNS change, subscription, message sending, or analytics installation was performed.

Restart from this checkout with `npm run preview -- --host 127.0.0.1 --port 4337` after `npm run build` if necessary. This is a local production-mode build for review; it is not a public deployment. Separate preview-deployment and GitHub Pages indexing protections were tested.

The audit covered the homepage, library, document reader, volume guides, topic hubs, research catalogue, Start Here, podcast, video availability, About, Contact, search, follow links, and related-reading journeys. Template coverage does not mean every scientific claim or every media caption was independently revalidated.

## Verified baseline

The [fresh live baseline](audits/reader-experience-2026-09-07/live-baseline.json) records 54 sitemap URLs, successful responses, unique titles/descriptions, one H1 per page, matching canonicals, and a legitimate missing-page 404. Those technical foundations were preserved. Crawlability is not proof of search-engine indexing.

The `.com` domain still returned a parked page. The `.org` production build matched the starting commit above. Some earlier observations were already partly resolved: the video index contains playable preview reels, while individual concepts can remain text only. The implementation preserves both and labels the destinations accordingly.

## Findings and implemented changes

Impact levels are qualitative priorities based on likely reader value, accessibility, and search relevance. They are not measured traffic or conversion gains.

| Layer                                       | Verified Issue                                                                                                                                                                            | Impact | Implemented Fix                                                                                                                                                                                                                   | Validation                                                                                                                                                                                                        |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Search and discovery                        | Reader vocabulary and multiword queries were handled inconsistently; the library used a separate matching implementation.                                                                 | High   | Shared ranking, relevant synonyms and word variants, stopword handling, and low-weight indexing of approved public article text. Exact titles and strong topics outrank incidental body mentions.                                 | Regression queries cover deportation, Who Deported More, immigration, AI jobs, automation, technology and intimacy, tax, quantum entanglement, and podcast; browser checks cover library persistence and filters. |
| Content and search intent                   | “Who Deported More?” suggested a ranking beyond the public page's evidence. Long academic headings obscured what visitors receive.                                                        | High   | Web heading now “How to Compare Deportation Statistics”; concise display titles and descriptions distinguish explanations from complete manuscripts. Original formal titles remain in bibliographic records and citations.        | Built-page assertions, title uniqueness, source-boundary tests, and mobile visual review. No unsupported presidential ranking added.                                                                              |
| Publication accuracy                        | A search classification compared against the wrong status string, labeling working-paper summaries as published documents. Concepts, previews, and editorial terminology added confusion. | High   | Correct working-paper search labels; reader-facing availability language; simpler topic preview/development sections; video CTAs target actual playable reels.                                                                    | Content/output tests and homepage-to-media browser checks; preview/feed eligibility rules remain unchanged.                                                                                                       |
| Reading and accessibility                   | Mobile readers encountered useful contents navigation too late; long titles, table access, and search keyboard semantics needed attention.                                                | High   | Contents disclosure before article text, compact mobile headings, byline/status/date/reading time, focusable table scroll regions, ordinary result links with real keyboard focus, Escape restoration, and URL-state restoration. | Desktop/mobile browser suite, focused keyboard tests, mobile screenshot review, and overflow assertions.                                                                                                          |
| Contact and conversion                      | Contact depended on a mail application and requested a redundant reply address.                                                                                                           | High   | Optional reply address, copy-email and copy-message controls, selectable-text fallback when clipboard access fails, and explicit feedback that nothing was sent.                                                                  | Browser tests exercise successful and failed clipboard paths without sending messages.                                                                                                                            |
| Content depth                               | “Disconnected Hearts” gave readers little standalone explanation.                                                                                                                         | Medium | Expanded the existing public conceptual argument with assessment questions and explicit limits, using approved material only.                                                                                                     | Content assertions preserve the publication boundary; no new empirical findings or citations invented.                                                                                                            |
| Information architecture and follow journey | Navigation and catalogue explanations competed with direct reading; follow destinations needed clearer expectations.                                                                      | Medium | Clear Read/Listen/Topics/Follow destinations, concise homepage promise and entry cards, shorter catalogue copy, voluntary follow invitation, and explanation of Substack profile and feed behavior.                               | Homepage-to-reading/listening checks and public Substack profile HTTP/title verification; no subscription performed.                                                                                              |
| Related reading                             | Shared volume alone could determine recommendations.                                                                                                                                      | Medium | Require explicit relationships or shared subject/category/subfolder evidence; preserve explanatory recommendations.                                                                                                               | Related-content tests and built-page checks. Relevance still benefits from editorial review.                                                                                                                      |
| On-page SEO                                 | Several metadata fields reused long formal titles or volume descriptions.                                                                                                                 | Medium | Concise distinct titles/descriptions across document, volume, library, research, and About templates; corrected a duplicate introduced during revision.                                                                           | SEO audit: 62 HTML files; sitemap report: 54 pages, zero failures.                                                                                                                                                |
| Technical SEO                               | `.com` remains parked; ownership and configuration are external to the repository.                                                                                                        | Medium | No DNS mutation. Retained `.org` canonical origin and stable URLs; documented domain dependency.                                                                                                                                  | Live domain response inspected; canonical, preview-indexing, and fallback verification pass.                                                                                                                      |

## Validation evidence

- Baseline: 399 tests passed before implementation.
- Final normal build: 413 tests passed across 24 files; Astro reported zero errors and zero warnings, with one pre-existing unused-variable hint.
- Desktop/mobile browser suite: 53 passed, one intentionally skipped desktop-only check on mobile. Includes search relevance and keyboard access, query/filter recovery, library persistence, mobile contents and tables, contact clipboard fallbacks, follow/media links, podcast resume, reading-list behavior, and no-JavaScript reading.
- GitHub Pages fallback: build passed, 184 applicable tests passed, fallback verifier passed.
- Preview deployment: build and preview-indexing verifier passed. Normal production-mode output was rebuilt afterward for local review.
- Canonical-origin and publication operating-system checks passed. SEO audit passed for 62 HTML files; sitemap report covered 54 URLs with zero failures and one expected warning for the intentionally empty release feed.
- Dependency audit: zero reported vulnerabilities. No new dependency or tracking service was introduced.
- Formatting and whitespace checks are part of the final handoff verification.

Focused new regressions are in [unit tests](../src/tests/reader-experience.test.ts) and [browser tests](../e2e/reader-experience.spec.ts).

## Measured asset sizes, not speed claims

The same repository measurement script was run on baseline and final normal builds.

| Measurement                       | Baseline |  Final |
| --------------------------------- | -------: | -----: |
| Homepage HTML bytes               |   37,481 | 37,091 |
| Search index bytes                |   58,884 | 92,141 |
| Search entries                    |       69 |     69 |
| Search index embedded in homepage |       No |     No |

The search index grows because it includes approved public article text; it remains lazily loaded. These are generated file sizes, not compressed transfer sizes, loading times, Core Web Vitals, or real-user performance results. Existing map/audio variants were retained. The repository performance-budget check passed.

## Remaining dependencies and limits

1. The `.com` redirect needs verified domain ownership and explicit configuration/release authorization.
2. Stronger empirical comparisons, unpublished manuscript contents, new citations, and further substantive expansions require approved evidence and editorial decisions. No private manuscript was published.
3. The Substack destination was verified as the publication's public profile. A follow click is not a completed subscription; subscription completion was not exercised.
4. Current Search Console indexing, rankings, analytics funnels, real-user Core Web Vitals, and conversion outcomes were unavailable. No improvements in those outcomes are claimed.
5. Keyboard, responsive, semantic, and focused accessibility checks were completed; this is not a full WCAG 2.2 AA certification or physical assistive-technology audit. Completeness of captions/transcripts across all media remains an editorial review item.
6. The release feed remains intentionally empty under its publication rules. No content was promoted merely to remove a report warning.
7. Public release remains pending. Review this local branch/preview before separately authorizing merge or deployment.

## Measurement plan: no new collection activated

Use an already authorized analytics setup only after confirming consent and privacy requirements. Establish a baseline before setting numerical improvement targets.

| Reader outcome      | Suggested event or measure                              | Interpretation and safeguard                                                                                                     |
| ------------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Find useful work    | Search result opened; zero-result rate; result position | Avoid collecting raw search text by default. A result opening does not prove relevance; sample usability sessions can assess it. |
| Continue reading    | Related-work link opened, segmented by referring page   | A click is a discovery signal, not proof of comprehension.                                                                       |
| Listen successfully | User-initiated playback and meaningful progress         | Keep page views separate from playback; do not infer completion from opening the podcast page.                                   |
| Follow voluntarily  | Outbound Substack/feed action                           | Label as outbound intent; only authorized destination evidence can confirm subscription.                                         |
| Contact comfortably | Copy-address, copy-draft, or mail-app action            | These do not mean an email was sent. Never collect draft contents or email addresses for measurement.                            |

Search relevance, shortened headings, follow invitations, and related-reading changes are implemented and regression-tested. Their effect on satisfaction, discovery, and conversion remains a hypothesis requiring user research or appropriately authorized analytics.
