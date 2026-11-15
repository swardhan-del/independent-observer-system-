# Research reading and navigation update — 13 November 2026

## Scope

Built on production commit `2b41a01f1bd84ace6d8b71472ae5121f2d3551de`, including its three reading exercises. This is a direct Vercel release branch; it does not merge to `main`.

- Latest lists all 34 existing research preview families in descending update order. Eight appear immediately; 26 remain available through a native disclosure.
- Every volume has a volume switcher, current-volume indication, section links and an atlas deep link.
- New Volume II and IV research appears before the lengthy overview.
- The detailed About atlas uses the full content width, stacked facts and a single column for extended text. Existing keyboard tab and deep-link behavior is retained.
- Volume role labels retain dark text on light cards instead of inheriting the surrounding dark section's pale text.
- Atlas deep links explicitly open their containing disclosure, including after keyboard selection and reload.
- Search includes the full text of the two new web essays without duplicating their existing catalogue entries.

## Complete web reading copies

| Volume | Existing research direction                   | New web edition                                                                              |
| ------ | --------------------------------------------- | -------------------------------------------------------------------------------------------- |
| II     | The Cost of Political Independence            | Six-section working essay adapted from the 12 November source paper; four source records     |
| IV     | AI and the First Rung of Economic Opportunity | Six-section working essay developed from the 31 October research brief; three source records |

Each edition has a version, update date, reading time, section contents, argument, competing explanations, limitations and linked sources. Source-check scope is stated beside each reference. These are complete web essays, not releases of the longer source manuscripts or claims of external peer review. They remain on their existing preview routes, with explicit status and `noindex,follow`; feeds and sitemap publication rules are unchanged. The 29 paper records and five released articles are unchanged.

No private source paths, file identifiers or archive documents are included. The remaining 32 research directions do not acquire a complete-essay claim.

## Verification

- Local Astro check, production build and complete Vitest suite: 568 tests passed; 119 HTML pages built.
- Formatting: changed files and the configured formatting gate checked.
- Performance: compact search index 186,571 bytes, within the 200,000-byte budget.
- New source/output checks cover ordering, all 34 unique families, unchanged manuscript status, substantive essay content, citation anchors, index/feed boundaries, full-text search and all four volume navigation targets.
- New browser journeys cover keyboard reading links, all four volume jump links, 320-pixel search/reading, atlas width and deep links, and operation without JavaScript, on desktop and mobile projects.
- Local Chromium cannot launch because this environment rejects its process socket. Hosted CI supplies browser verification. Final CI and production audit results belong in the release PR record.

## Production audit checklist

1. Confirm the deployment commit and team match the tested release.
2. Check Latest, all four volume pages and both complete reading copies on the production alias.
3. Exercise atlas tabs, hash reload, reading contents, source links and search.
4. Check narrow layouts for horizontal overflow and reachable navigation.
5. Verify sitemap routes, internal targets and retained preview indexing rules.
