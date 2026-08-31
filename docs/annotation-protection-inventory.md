# Annotation protection inventory

This inventory is intentionally conservative. It protects the active annotation
branch and the shared surfaces that carry evidence-layer behavior, annotation
anchors, source mappings, or the visible styling tested by that work.

## Branch and commit boundary

- Active branch: `build/interactive-publication-v1`
- Active unpublished tip: `4be397ffd6f920ffacac4a1d738ce43dfd98239`
- Reviewed production base: `571ff19e35ef9f61a2fbc120d2619e7d8ee49d46`
- Technical-foundations branch: `codex/production-foundations-v1`, created from
  the reviewed production base

The active tip's direct file set is:

```text
public/media/reels/volume-i-attention-and-public-record.mp4
public/media/reels/volume-i-expertise-and-independent-thought.mp4
public/media/reels/volume-ii-ballots-and-civic-participation.mp4
public/media/reels/volume-ii-elite-control-in-us-democracy.mp4
public/media/reels/volume-ii-terry-cascade.mp4
public/media/reels/volume-iii-dignity-trust-and-social-cooperation.mp4
public/media/reels/volume-iii-oil-money-productivity-and-labor.mp4
public/media/reels/volume-iv-prescription-pad-to-power.mp4
src/components/SiteSearch.astro
src/components/VolumeReelShelf.astro
src/data/video-reels.ts
src/pages/videos/index.astro
src/tests/content.test.ts
src/tests/interactive.test.ts
```

## Protected components and templates

```text
src/components/ClaimMap.astro
src/components/EvidenceLab.astro
src/components/EvidenceLayer.astro
src/components/MechanismDiagram.astro
src/components/PolicyTradeoff.astro
src/components/TopicQuestionBuilder.astro
src/components/TopicReviewQueue.astro
src/components/VolumeOneSourceMap.astro
src/components/VolumeResearchDossier.astro
src/components/VolumeResearchMap.astro
src/components/ReaderVolumeContext.astro
src/components/DocumentReader.astro
src/components/EditorialDetail.astro
src/components/ResearchCatalogue.astro
src/components/ResearchCatalogueCard.astro
src/components/LibraryResearchShelf.astro
src/components/PublicationCatalogue.astro
src/components/SiteSearch.astro
src/components/VolumeReelShelf.astro
src/pages/index.astro
src/pages/about/index.astro
src/pages/library/index.astro
src/pages/library/documents/[slug].astro
src/pages/research/[slug].astro
src/pages/series/[slug].astro
src/pages/topics/[slug].astro
src/pages/videos/[slug].astro
src/pages/videos/index.astro
```

## Protected data, schemas, and content fields

```text
src/data/content.ts
src/data/documents.ts
src/data/publication-registry.ts
src/data/release-log.ts
src/data/series.ts
src/data/ssrn.ts
src/data/topics.ts
src/data/video-reel-treatments.ts
src/data/video-reels.ts
src/data/volume-one-evidence.ts
src/data/volume-one-source-map.ts
src/data/volume-research.ts
src/data/volume-three-evidence.ts
src/data/volume-three-research.ts
src/data/volume-four-evidence.ts
src/data/volume-two-framework.ts
src/data/regrowing-humanity-evidence.ts
src/data/clearance-queue.ts
src/data/dropbox-content.generated.ts
plugins/library-content/catalog.ts
plugins/topic-discovery/catalog.ts
```

The protected fields include public title, slug/ID, status, volume, topic,
summary/abstract, source note, external URL, verification date, version,
release decision, correction/supersession state, evidence-layer category,
claim-map mapping, and any local fragment target.

## Protected styles and tests

```text
src/styles/global.css
src/tests/accessibility-tokens.test.ts
src/tests/content.test.ts
src/tests/interactive.test.ts
src/tests/library-content.test.ts
src/tests/privacy.test.ts
src/tests/release-safety.test.ts
src/tests/site-output.test.ts
src/tests/topic-discovery.test.ts
src/tests/workflows.test.ts
```

## Stable IDs and behavior to preserve

Known stable targets include:

```text
claim-map-title
evidence-lab-title
evidence-layer-title
question-builder
question-builder-title
topic-review-title
volume-three-research
volume-three-research-title
volume-research-map
homepage-evidence-title
topic-pathway-method
topic-pathway-ai-labor
topic-pathway-democracy
topic-pathway-human-capability
topic-pathway-migration
independent-observer-survey
```

This list is not permission to rename or remove other IDs. Before changing any
HTML structure, compare generated fragment targets and preserve all existing
fragment IDs. Evidence controls must continue to highlight categories without
hiding the remaining text, and the no-JavaScript reading path must remain intact.

## Conflict rule

PR 1 is limited to new validation/audit infrastructure, route and deployment
configuration that does not alter the protected data or interaction surfaces, and
new documentation. Any change that requires editing a protected component,
content record, evidence mapping, annotation style, or protected test is deferred
and recorded as an annotation conflict for a later PR after the annotation work
has merged and been verified.
