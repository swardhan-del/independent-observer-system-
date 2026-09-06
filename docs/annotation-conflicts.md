# Annotation boundary and deferred work

Historical boundary: this file records the earlier foundations deferrals. The current
`content/author-controlled-paper-catalogue-2026-08-31` branch implements the owner-requested paper
catalogue migration while preserving and retesting the protected annotation behavior.

This branch is based on the exact production commit
`571ff19e35ef9f61a2fbc120d2619e7d8ee49d46`. The active annotation work is on
`build/interactive-publication-v1` at `4be397ffd6f920ffacac4a1d738ce43dfd98239`.
This document records work intentionally kept out of the foundations change.

## Protected scope

The annotation branch owns the interactive search and reel work, including
`SiteSearch.astro`, `VolumeReelShelf.astro`, `video-reels.ts`, the video index,
interactive/content tests, and the eight reel assets. The conservative
annotation inventory in `docs/annotation-protection-inventory.md` also protects
shared evidence components, document/research templates, canonical content
data, global styles, and their existing tests because they carry annotation
anchors, evidence-layer mappings, or active interaction behavior.

## Deferred portions

- The new route registry drives sitemap coverage and route-contract tests. A
  later integration should extend it to search, navigation, feeds, related
  content, and page-specific structured data only after the annotation branch
  is merged and its stable IDs and evidence behavior are reverified.
- One existing site-output test fixture now derives its sitemap expectation
  from the registry; no annotation assertion, anchor, or behavior was changed.
- Large information-architecture changes, status/grammar copy changes, retired repository
  reader-label changes, format minimums, and library pagination are deferred
  because they overlap protected templates, content data, or annotation-owned
  tests.
- Search-corpus loading, recommendation-drawer rendering, and global style
  splitting are deferred because they overlap `SiteSearch.astro`, reading-list
  behavior, or protected shared styles.
- The contact page remains unchanged. No approved role mailbox, delivery
  credential, retention wording, or server-side endpoint was available; the
  existing contact contract and tests are also protected. The branch does not
  weaken CSP to accommodate the current `mailto:` form.
- Preview indexability, author/editorial claims, publication status, full-text
  availability, peer-review labels, source packages, licensing, and policy
  wording remain owner decisions recorded in
  `docs/content-decisions-needed.md`.

No annotation data, stable annotation ID, evidence-layer mapping, annotation
style, or annotation interaction was changed by this branch.
