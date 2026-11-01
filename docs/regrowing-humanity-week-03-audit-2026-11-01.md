# Regrowing Humanity Week 3 audit — 1 November 2026

Week 3 was brought forward from 8 November at the owner's request after Week 2
PR [#85](https://github.com/swardhan-del/independent-observer-system-/pull/85)
was merged and verified in production. This pass completes the bounded audit;
the proposed expansion remains **blocked pending edition-specific clearance**.
It does not mark any earlier blocked pass as completed or authorize release.

## Current identity and baseline

- Main and production build identity: `821c5d4913ba66de84f89fe2d5f42e9838bb2a10`.
- Production build timestamp: `2026-11-01T13:08:51.977Z`.
- Family: `IO-FAMILY-REGROWING-HUMANITY`, Volume IV; existing adaptation
  candidate: `IO-V4-REGROWING-HUMANITY`.
- Existing reading identity: [/research/regrowing-humanity/](https://independentobserver.org/research/regrowing-humanity/).
  It returns HTTP 200, identifies itself canonically at that route and retains
  `noindex,follow`. It is a bounded preview, not a released full manuscript.
- `green-publications.ts` retains `productionReleased: false`; the release queue
  retains `public_preview`, `pending_final_rights_review`,
  `awaiting_human_release` and a null canonical release route.
- Open PRs were checked before preparation. No open PR already implements this
  Week 3 expansion. Week 1 PR #83 remains separate and unmerged.

Historical documentation mentions a staged Evidence Lab. The current main has
no corresponding route, and `/review/regrowing-humanity/` returns 404. An
unrouted evidence-data module is not a released edition or a second publication
identity. This audit creates neither route.

## Source controller and curation records

The 30 July 2026 Volume IV **Regrowing Humanity v1** manuscript is the controller
identified by the reconciled 16 October ledger. Its freshly downloaded bytes
have SHA-256
`7c65698141490d6aa51ff544f3532d946cdb289fd4c6e4c32d58b259b916af96`,
matching the controller fingerprint already stored with the preview. The source
is therefore identified; the remaining hold is not a missing manuscript.

The September candidate ledger still lists owner release, rights, accessibility
and web QA. The October reconciled ledger classifies the family `LIVE_PREVIEW`
and recommends expanding the existing identity while preserving small-cohort
and availability limitations. The Website Feed blocker explicitly says the
separately prepared clean web adaptation was not found and prohibits replacing
it with the manuscript, SSRN PDF, generated output or an older draft. This pass
did not locate that adaptation within the inspected package and curation
records; it makes no claim that it is absent from every Dropbox location.

Twelve selected source and curation files were downloaded and checked against
Dropbox content hashes and local synced bytes. Exact private paths and the
verification manifest belong in the owner's private weekly reports. No raw
source, figure, private path or extracted manuscript is added to the repository.
The organized manuscript copy in the current directory hub is a routing aid;
it does not supersede the ledger's identified controller or grant release.

## Disclosure reconciliation

The controlled v1 manuscript and its accompanying metadata contain the author's
declaration of no competing interests. The preview currently uses the shared
absence-of-disclosures paragraph for funding, conflicts and AI use. These are
different editions: a declaration in the manuscript is not evidence that the
preview has its own complete disclosure statement. The current paragraph must
not be read as proof that the underlying manuscript lacks a declaration.

A future reviewed adaptation should attribute the competing-interest declaration
specifically to the dated source edition and separately resolve funding and AI
disclosures for the web edition. It must not invent a no-funding statement, an
AI-use declaration, independent verification of the author's declaration, or
new author consent. No disclosure field or public review date is changed here.

## Scientific review boundary

The existing preview already says it is a structured narrative review, not a
preregistered systematic review or meta-analysis, and preserves heterogeneous
evidence and small-cohort/specialized-program limitations. Its factual cutoff
remains 30 July 2026; this audit is not a new clinical evidence review.

The three bibliography identities were spot-checked against public primary
publication records: [Collinger et al.](https://pubmed.ncbi.nlm.nih.gov/23253623/),
[Raspopovic et al.](https://pubmed.ncbi.nlm.nih.gov/24500407/) and
[Makin and Flor](https://pubmed.ncbi.nlm.nih.gov/32428706/).
The Collinger direct PubMed page presented a browser challenge; its indexed
record supplied bibliographic identity only. This limited check does not repeat
the package's historical 30-record citation audit, validate all 36 sources,
establish treatment suitability, or verify current device availability and
regulatory status. The package's July QA claims remain attributed historical
records rather than results newly certified by this audit.

Any future expansion must keep laboratory control, clinical use, sensory
feedback, reported embodiment and institutional interpretation distinct. It
must retain rehabilitation, maintenance, selection and follow-up limitations.
Device-specific authorization cannot establish class-wide safety or superiority.
No medical recommendation or new current regulatory claim is prepared here.

## Expansion gates

| Gate                        | Evidence observed                                                     | Remaining requirement                                                                                                                         |
| --------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Canonical source controller | Exact v1 bytes match the preview fingerprint                          | Bind any proposed web edition to this controller and its own version                                                                          |
| Public-safe adaptation      | Existing bounded preview is already live                              | Locate the clean adaptation or obtain an explicit instruction resolving the staging hold before preparing replacement prose                   |
| Factual and citation review | Historical source audits and three bibliography identities inspected  | Review the exact added claims, study context, currentness and citations; do not inherit a blanket QA pass                                     |
| Rights and privacy          | Preview has existing review flags; manuscript carries CC BY-NC-ND 4.0 | Record edition-specific adaptation/figure rights and privacy clearance; existing flags and license text do not clear a new derivative edition |
| Disclosures and limitations | Source declaration and preview disclaimer distinguished               | Resolve web-edition funding, competing-interest attribution and AI-use wording; retain narrative-review and small-cohort limits               |
| Accessibility and metadata  | Existing route remains usable as a preview                            | Review the exact proposed web copy, headings, citations, print/mobile output and edition metadata                                             |
| Owner release               | Existing release queue remains held                                   | Record item-level authorization for the exact reviewed edition; this weekend audit request is not production release                          |

The candidate is **already live as a preview** and **blocked for expansion or
release**. CI success cannot supply any missing editorial gate. No new public
delta passes all gates in this pass, so the only proposed change is this audit.
The blocked expansion carries forward to the release-gate review rather than
being recreated on another route or counted as a completed publication.

## Validation and rollback

Run the repository's normal lint/build/unit checks, publication and editorial
boundary checks, canonical/metadata/sitemap checks and hosted CI on the exact
audit commit. Record actual outcomes, pre-existing hints, and unrun checks in
the PR and private reports; do not infer success from this checklist.

This PR changes one documentation file only. It does not change site content,
routes, feed generation, assets, publication status, production or Dropbox
originals. Before merge, close the PR to abandon it. If later merged, revert its
single audit commit through a reviewed PR, preserving subsequent work. No
production rollback or source restoration is required for this audit-only pass.
