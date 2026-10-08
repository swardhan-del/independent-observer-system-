# Independent Observer: reader discovery audit, 8 October 2026

## Verified starting point

- Repository: https://github.com/swardhan-del/independent-observer-system- ; default branch `main`.
- Clean checkout of `1f8522c892a420d0a40ff0fd8e927bdbd61b65c6`; no AGENTS.md found. README, publishing documentation and CI inspected before changes.
- Production: https://independentobserver.org/ . `/build-info.json` matched that commit, built 7 October at 10:24:31 UTC.
- Vercel: `independent-observer`, project `prj_KF5jNuvfO4aK4dV0WIJfcWoezNGX`, team `team_VNVkTS3pSbYEmFv7LdcSwFyX`; production deployment `dpl_2RJjyNFyWFYAZSHsnKYLNgYjJ7Mm` was READY and linked to this repository. Other volume/boundary projects are outside this batch.
- Fourteen open PRs were inspected. PR #72 contains relevant reader-clarity work; #37 contains the focused first-seek speed fix. This branch selectively carries that work forward against current main, preserving current dependencies and the existing article-navigation wait fix. Other editorial/release PRs remain separate.
- Dropbox's Independent Observer workspace and Website Feed were accessible. The remote folder called “Independent Observer desktop” is not proof of access to the publisher's physical desktop. That desktop is unavailable in this environment.
- The latest available weekly maintenance report, review-ready sources, curated-resource folders and a historical Google coverage workbook were read. Raw unpublished drafts remain outside this public repository.

## Observations and likely visitor response

The live homepage establishes an independent research project across politics, economics, technology and science. Navy/gold styling, legible typography and the author identity are recognizable strengths and are preserved. A first visitor can identify the general purpose, but repeated standards copy and competing reading routes increase the work needed to choose an article. The homepage's featured guide said three minutes while the actual article said four.

The library placed a large research programme ahead of readily available reading. Its six-item publication shelf called everything a draft preview even though the item data and individual pages distinguish two released adaptations from four pending previews. That mismatch makes a reader question publication status. Public Join/governance/roadmap text also exposed implementation and owner-decision notes. A reader should see truthful availability and an actionable subscription link, while operating details belong in documentation.

The representative article `/library/documents/who-deported-more/` already provides author identity, a four-minute reading estimate, source locations, contextual corrections and related reading. Its hypothetical numerical example is identified as illustrative rather than real-world statistics. Existing article metadata and evidence panels are stronger than the site's initial browsing experience. Preserve these protections instead of expanding release scope.

The existing Join route offers a real external Substack destination. There is no working paid checkout to advertise. The batch makes that distinction clear; it does not claim successful subscriptions can be observed on this site.

Desktop and mobile automated journeys cover homepage, Start Here, library and topic browsing, manuscript/article navigation, About, contact drafts, Join, search, saved reading, citations and podcast controls. The first transcript seek reproducibly reset a preselected playback speed; setting both default and current playback rates corrects that behavior.

## Visibility and measurement

Production has canonical-origin, sitemap, robots, heading/metadata and structured-data checks. The generated SEO report checks 66 sitemap pages; preview builds have a separate noindex boundary. Internal search already covers papers and transcripts, so adding another search feature is unnecessary. Current performance budgets cover homepage size, search payload and image derivatives. These are technical checks, not proof of search ranking or good field Core Web Vitals.

A Dropbox Google coverage export dated 27 September records 24 indexed and 6 excluded pages on 21 September. Its chart records 245 impressions across 5–21 September. Exclusions include two redirects, one noindex and three crawled-not-indexed entries, but the extracted data does not identify the affected URLs. Redirects/noindex may be intentional. This is a historical, partial baseline, not current traffic data. Clicks, queries, acquisition sources, returning readers and demographics were not available.

`src/lib/analytics.ts` has privacy-conscious event call sites but a no-op production transport. No new provider is enabled. Events must exclude article text, search text, email addresses and other sensitive input. External Substack clicks are starts, not successful subscriptions; completion requires provider-supported confirmation and aggregate reporting.

## Audience hypotheses

| Audience                                                    | Content evidence                                                                          | Proposed role                                                                                        |
| ----------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Curious general readers seeking evidence-based explanations | Deportation comparison guide, entanglement primer, technology/attention and tax summaries | Primary: a specific question, short readable explanation, inspectable evidence and related next read |
| Students and independent researchers                        | Citation exports, source panels, manuscript records, taxonomy and reading tools           | Secondary: definitions, review status and sources before treating a summary as a released manuscript |
| Viewers arriving from future audio/video/social content     | Existing podcast/transcripts, reading journeys and video preview surfaces                 | Acquisition hypothesis: link each item to its corresponding article; no demonstrated audience size   |

These are content-based hypotheses, not inferred reader demographics. The site promise should remain coherent: explanations of how institutions, technology and human choices interact, with evidence and limits visible. Retain the broader subjects through topic navigation rather than a crowded homepage.

## Committed batch goal

A first-time visitor can identify the publisher and purpose, choose one useful first read or a small cross-topic selection, distinguish released articles from pending research, read comfortably on mobile and follow a truthful next step. The publisher has a documented draft-to-release workflow without weakening existing publication boundaries.

## Prioritized backlog

| Priority / item                                 | Evidence and benefit                                                                   | Effort / dependencies                                                       | Acceptance                                                                                                            |
| ----------------------------------------------- | -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| P0: simplify homepage and Start Here            | Competing copy and inaccurate reading estimate; reduce choice friction                 | Small; existing routes and metadata                                         | One featured first read, accurate four-minute label, clear author/date and three varied selections                    |
| P0: correct release labels and library ordering | Two released items were described as previews; improve trust and access                | Small; existing release flags                                               | Shelf identifies two released/four preview items; CTA matches each status; available reading precedes roadmap         |
| P0: truthful Join/governance copy               | Public TODOs and unavailable paid promises; clarify next action                        | Small; existing Substack link and policy pages                              | No fake form or paid checkout; public availability clear; owner decisions retained in docs                            |
| P1: preserve podcast speed                      | First seek resets selected rate; maintain usable listening                             | Small; existing audio player                                                | Preselected 1.5× survives first nonzero transcript seek on desktop/mobile                                             |
| P1: reconcile source candidates                 | Full drafts overlap existing short adaptations                                         | Medium; source revision and editorial review                                | Private inventory of five read candidates; stage two strongest sources without overwrite or new release flags         |
| P2: release a reviewed source-led article       | Server heat/workforce drafts contain internal references and claim-review dependencies | Medium; editorial approval, verified citations, asset rights                | Claim-source ledger, specific related links and approval manifest before release                                      |
| P2: measure useful reading                      | Only historical search coverage and inactive event transport                           | Medium; fresh Search Console export and existing supported analytics choice | 28-day impressions/clicks/landing pages baseline; aggregate article continuation and confirmed subscription reporting |

## Validation and follow-up

Rendered evidence for the implemented homepage: [desktop](audits/reader-discovery-2026-10-08/home-after-desktop.jpg) and [390px mobile](audits/reader-discovery-2026-10-08/home-after-mobile.jpg). Both fit the viewport without horizontal overflow. These captures are of the local production build, not evidence of a remote deployment.

Local validation: 496 unit/output tests passed; 99 desktop/mobile browser journeys passed, one existing conditional test skipped. Build/type analysis found no errors or warnings (two existing unused-variable hints). Publication, canonical and Google-readiness checks passed; 66-page SEO report had zero failures/warnings. Homepage output 27,520 bytes and lazy search index 174,708 bytes stayed within repository budgets. Dependency audit reported zero vulnerabilities. Formatting and diff checks passed. A verified DOE source URL was corrected without changing the associated article's claims or release status.

This batch keeps the stack, recognizable brand, private/public boundary, release flags and generated Dropbox feed unchanged. Relevant checks: build/type analysis, unit/output tests, desktop/mobile browser journeys, format/diff checks, publication/canonical/preview contracts, SEO report and performance budgets. Preview and production must be traced to their actual Git commit, not just a deployment alias.

Follow-up targets are proposals: test comprehension with five new readers (four can identify purpose and choose a first read within ten seconds); reconcile all five staged candidates before publishing another overlapping adaptation; establish a fresh 28-day measurement baseline before setting growth targets. These are not demonstrated traffic or subscriber gains.

Rollback: revert the eventual merge commit on main and redeploy, or use the verified pre-change Vercel deployment above as an emergency rollback candidate. Normal GitHub review/check requirements apply; do not bypass protection.
