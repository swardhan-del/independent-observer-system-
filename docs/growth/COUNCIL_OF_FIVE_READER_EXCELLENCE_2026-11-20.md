# Council of Five — reader excellence implementation, 20 November 2026

## Decision and scope

This change implements real public reader functions rather than adding another planning-only report. It is based on production main `fc9d991e43485e5a6b5a5064af45f60d53b71898` and is independent of PR #98 (article reflow and author disclosure) and PR #99 (strategy reports and offline scorecard). It does not touch any research paragraph, citation record, archived source, publication date, release status, analytics transport, private data, or Dropbox asset.

## Council's follow-up (judgmental, not traffic measurement)

| Simulated reviewer | Prior finding | Implemented response | Outcome |
|---|---|---|---|
| Editorial | Sources need usable provenance | Copy the canonical citation, not just the URL; preserve a selectable citation when scripts are off | Testable feature, no new factual claims |
| Audience | First reads need low-friction commitment cues | Display verified article length in the hero's three released choices | Reader clarity, not demonstrated growth |
| SEO | Canonicality matters for shared links | Citation and copy-link controls use the existing `publicSitePath` canonical URL | No new indexable pages or fabricated backlinks |
| Mobile product | Small taps and copy workflows frustrate phone users | 44px copy actions, native share where supported, clear success/error feedback, no-JS fallback | Requires device field testing |
| Growth analytics | Visitor and subscriber outcomes still unknown | Honest Substack FAQ; no new tracking or claims | Traction remains NOT VERIFIED |

## Changes

- `src/components/PublicationRecord.astro`: progressive enhancement of existing citations with Copy citation, Copy article link and optional OS share sheet. The buttons remain hidden if unsupported; existing citation remains selectable. Inline feedback is announced with a polite live region. The copy failure state is explicit.
- `src/components/EditorialEntryPoints.astro`: show 'Released article' and reading duration in compact first-read choices as well as expanded mode.
- `src/pages/join/index.astro`: reader questions about free access, cadence, the Substack email boundary and external peer-review status. Uses accessible native disclosure controls with no JavaScript dependency.
- `e2e/reader-excellence.spec.ts`: responsive clipboard success/error, no-script fallback, reading lengths and FAQ tests.

## Protected boundaries and verification

No changes to `src/data/green-publications.ts`, publication registry, preview publication state, reviewed article text, factual cutoffs, Google Search Console configuration, or analytics provider. Browser-side copying remains within the reader's own device and occurs only on click. The share control invokes the native OS sheet only on click. **No audience measurement has been enabled**, and no subscriber or traffic increase is claimed.

Before merge, require successful `npm test`, browser suites, publication-boundary checks, preview noindex and SEO checks. Review the new action styling and screen-reader announcements on iOS Safari in a real-device pass. Keep existing PR #98/#99 independent until reviewed and reconciled; production deployment is a separate authorization and verification step.
