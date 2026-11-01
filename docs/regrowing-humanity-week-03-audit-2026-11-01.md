# Week 3 Regrowing Humanity preview expansion — 1 November 2026

This change expands the existing Regrowing Humanity preview in place, using the
verified 30 July 2026 manuscript and the subsequently prepared text-only review
draft. The owner explicitly requested implementation and a commit after checks.
The change is prepared on the existing Week 3 PR; it grants no merge, deployment
or final publication release.

## Existing identity and preserved boundary

- Family: `IO-FAMILY-REGROWING-HUMANITY`, Volume IV.
- Candidate: `IO-V4-REGROWING-HUMANITY`.
- Only reading route: `/research/regrowing-humanity/`.
- Preflight main/production: `821c5d4913ba66de84f89fe2d5f42e9838bb2a10`;
  production build timestamp `2026-11-01T13:08:51.977Z`.
- Existing Week 3 audit head: `5c4c8f7d75822ebfee22fa9d0eb4b93072fa9961`.
  Open PRs were checked; this implementation continues PR #86 rather than adding
  a competing publication or PR. Week 1 PR #83 remains separate.

`productionReleased: false`, the preview status, pending final rights decision,
null canonical release route and `awaiting_human_release` remain unchanged. The
reading route remains self-canonical and noindex, with no publication date in
Article schema and no publication citation widget. Sitemap, RSS, Atom and release
log exclusions remain. No Evidence Lab, second article, raw manuscript or source
asset is added.

## Implementation

The existing article record now contains 11 bounded paragraphs, four section
headings and claim-linked citations using the shared article template. The
expansion distinguishes muscle/nerve signal strategies from bone attachment,
then distinguishes two historical experiments by population and setting. The
institutional proposals remain explicitly the author's recommendations.

The same template supplies the contents navigation, source/back-to-paragraph
links, reader tools, print behavior, related reading and contact/correction link.
No framework, component, route, styling, dependency or reader-tool implementation
is replaced. Existing related links retain Workforce and Server as contextual
author reading, not biomedical evidence.

The version becomes `Web preview v2`; the preparation/review date is 1 November 2026. The factual cutoff stays 30 July 2026. The new edition-history entry says
that an expansion was prepared; it does not invent a correction or publication.
The limited wording review does not claim independent clinical peer review.

## Controller, rights and privacy review

The identified controller is the 30 July 2026 Regrowing Humanity v1 manuscript,
SHA-256 `7c65698141490d6aa51ff544f3532d946cdb289fd4c6e4c32d58b259b916af96`.
Its metadata and verified source copy were rechecked. The October reconciled
ledger identifies the same controller and existing live preview. The older
Website Feed note prohibits automatically substituting manuscript/PDF/generated
output for its missing clean adaptation. Subsequent owner instructions authorize
preparing the private adaptation, then this bounded implementation for review;
they do not promote the source package or the complete manuscript to release.

Only original paraphrased text and public scholarly links are used. No source
figures, tables, screenshots, internal prompts, individual medical records,
private paths or unpublished companion manuscripts enter GitHub or page output.
The existing source license notice is preserved; its presence is not treated as
blanket derivative permission. Final publication rights/privacy and human release
remain distinct from this bounded review preparation. Exact private paths,
source fingerprints, approval scope and delivery receipts belong in the private
weekly progress report and change ledger.

## Claim review and disclosure

The exact technical descriptions and illustrative study findings were checked
against the controller and selected original records:

- [Kuiken et al. (2009)](https://pubmed.ncbi.nlm.nih.gov/19211469/): TMR control-signal definition.
- [Vu et al. (2020)](https://pubmed.ncbi.nlm.nih.gov/32132217/): reinnervation and biological signal amplification. No graft-construction detail or numerical stability claim is imported.
- [Ortiz-Catalan et al. (2014)](https://pubmed.ncbi.nlm.nih.gov/25298322/): combined bone-anchored/signal interface, with no generalized outcome or current approval claim.
- [Collinger et al. (2013)](https://pubmed.ncbi.nlm.nih.gov/23253623/) and its [author manuscript](https://pmc.ncbi.nlm.nih.gov/articles/PMC3641862/): one participant with tetraplegia controlling an external research robot; not a worn replacement limb after amputation.
- [Raspopovic et al. (2014)](https://pubmed.ncbi.nlm.nih.gov/24500407/): one participant and a specific sensory-feedback/grasp task; no general restoration claim.
- [Makin and Flor (2020)](https://pubmed.ncbi.nlm.nih.gov/32428706/): retained background review for body representation, not a new trial or diagnosis.

The source's no-competing-interests declaration is now attributed to its exact
dated edition. The adaptation does not invent a funding declaration or infer the
source manuscript's AI history. It accurately discloses AI assistance in this
adaptation and selected-record checking, with independent clinical review and
final publication release still pending.

The narrative-review, non-systematic/non-meta-analysis, heterogeneous evidence,
small-cohort/specialized-program, limited-follow-up and availability boundaries
remain explicit. This is not an exhaustive November evidence update or a repeat
of the package's historical 36-source review. The 2020 Ortiz-Catalan cohort claims
were omitted because the associated correction text was not verified. No pain,
complication, employment, regulatory or biological-regeneration claims are added.

## Verification and rollback

Regression coverage checks the built preview's source links, navigation,
disclosures and continued release exclusions. Browser coverage exercises keyboard
contents/source/return navigation, print disclosures and viewport fit on desktop
and mobile, with JavaScript enabled and disabled. Normal repository lint, build,
unit, metadata, sitemap and publication-boundary checks must pass, along with
hosted CI on the final commit. Actual results and any failures or unrun checks
are recorded in the PR and private reports.

Before merge, close the PR to abandon the proposal. To remove only the expansion
while keeping the earlier audit, revert the implementation commit on its branch
through a reviewed change. If later merged and a rollback is authorized, revert
that same implementation commit from current main, validate and use the normal
review/release process. Preserve later work and shared history. No source
restoration or production rollback is required by this unmerged preparation.
