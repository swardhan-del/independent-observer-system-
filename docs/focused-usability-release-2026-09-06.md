# Focused usability release — 6 September 2026

The homepage now presents one featured question, three selected paper summaries, one podcast entry, and a compact four-volume map. The full catalogue remains in the library. Primary navigation is Start Here, Read, Listen & Watch, and About, with secondary routes under More or the mobile menu.

The mobile masthead is smaller, and the reading list sits in normal page flow so it cannot cover article text. Search presents grouped reader-facing statuses while retaining the underlying index and approval records. Draft articles show a concise review status and expandable version details.

## Duplicate check

Compared with origin/main at a0ee91942c695fa1134603f279e86dcf5a8c6a7e and the open PR list. No existing usability release matched this scope. No source manuscripts, public assets, catalogue records, release flags, or Dropbox generated records are added or changed. Selected links reuse existing canonical document IDs. Separate podcast and worksheet PRs are not duplicated in this branch.

## Measured local result

At a 393 × 852 viewport, homepage document height fell from 40,986 to 5,933 pixels (about 86% shorter). The sticky header fell from approximately 222 to 106 pixels. No horizontal overflow was observed. Homepage HTML is 36,247 bytes; the public search index remains lazy-loaded.

Build and source checks: 390 tests pass, with no Astro errors or warnings. All 22 desktop and mobile browser checks pass (16 in the first run and six on a single-worker rerun after updating test interactions). Browser verification covers navigation, search, reading-list persistence, citations, podcasts, and article anchors. Final CI and Vercel state are recorded on the pull request.

Production merging remains subject to GitHub's required verify check and independent approval of the latest push. A preview deployment is not evidence of a production release.

## Review corrections

The secondary dropdown now renders beyond the masthead without clipping. Homepage headings use the shared two-column structure. The sound toggle lives beside the reading-list control, remaining reachable when the viewport narrows. Global search uses `search-*` URL parameters so it cannot overwrite catalogue or desk filters. Legacy unprefixed search links remain readable on pages without their own filters. Article version details expand for printing and return to their previous state afterwards.

Regression coverage exercises the actual More link click, catalogue-filter persistence after search and reload, pausing sound after a desktop-to-mobile resize, and print disclosure restoration.

Review-fix validation: 390 tests and 29 browser checks pass; the desktop-only menu check is intentionally skipped in the mobile project.
