# Topic discovery plugin

Status: active and dependency-free.

This plugin powers the public /topics/ atlas and topic pathways. It is a
metadata layer derived from the dated Independent Observer Website Publication
Audit and Human Approval Copy Plan in Dropbox (2026-08-22).

## Included modules

- catalog.ts — six subject definitions, five guided reading pathways, and six
  safe release-queue signals.
- src/components/TopicPathways.astro — question-led entry points.
- src/components/TopicAtlas.astro — browser-local filters for preprints,
  previews, roadmap notes, and held-for-release signals.
- src/components/TopicVolumeMap.astro — the four-volume spine that connects
  every subject hub to the series roadmap.
- src/components/TopicReviewQueue.astro — visible human-release boundary.

## Safety boundary

The plugin does not copy manuscript text, private Dropbox paths, credentials,
raw archive files, or unapproved drafts. The six release-queue signals are
metadata-only labels. They are not article links and do not set
releaseApproved or populate Website Feed/approved/.

All interaction is progressive enhancement using native Astro/browser code.
There is no network request, account, tracker, analytics, or third-party
dependency.
