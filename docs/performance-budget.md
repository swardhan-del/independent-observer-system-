# Performance budget and measurement record

These budgets are engineering guardrails, not a claim of formal performance
conformance. They are based on the measured production baseline in
`docs/production-readiness-audit.md` and should be revisited after the
annotation branch is integrated.

| Artifact             |                            Baseline |                                                                           Working budget |
| -------------------- | ----------------------------------: | ---------------------------------------------------------------------------------------: |
| Homepage HTML        |                       128,286 bytes |                                                                         <= 130,000 bytes |
| Library HTML         |                       215,959 bytes |                                <= 220,000 bytes until the recommendation drawer is split |
| Research HTML        |                       161,319 bytes |                                                                         <= 165,000 bytes |
| Shared generated CSS | 167,804 bytes in the baseline build |                                                                         <= 170,000 bytes |
| Four-volume map PNG  |                     2,690,774 bytes | Replace with responsive AVIF/WebP; target <= 1,000,000 bytes per delivered desktop asset |

The embedded search corpus was not isolated from page HTML in the baseline. The
performance follow-up must measure it separately before changing its loading
strategy. No before/after improvement is claimed by this document.

Performance work that changes `SiteSearch.astro`, `ReadingList.astro`, global
styles, or annotation-adjacent media templates is deferred until the active
annotation work is merged and verified because those files are protected in
`docs/annotation-protection-inventory.md`.
