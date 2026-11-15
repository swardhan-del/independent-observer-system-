# Volume III linked preview batch — 12 November 2026

## Scope and authorization

The owner requested wiring more Volume III papers from the earlier 28-family
estimate, including the eight priority candidates. This change authorizes public
research questions and navigation only. It does not release full manuscripts,
approve source figures, certify external publication, or merge to main.

The historical estimate did not provide a complete named reconciliation. The
current batch therefore explicitly selects 28 existing research-map identities:
27 primarily in Volume III and Empire Without Bread in Volume II. Its placement
is preserved and shown as a cross-volume connection. No new family is inferred
from a duplicate file or a filename marked ready.

The dossier moves from seven entries to 30: two existing reading copies, five
previously unlinked directions upgraded to previews, and 23 additional dossier
entries. All 28 preview routes are new. Existing public-paper and released-article
counts remain 29 and five respectively.

## Priority source reconciliation

The eight selected source texts and the source audit were read. Public previews
reuse the existing taxonomy titles and summaries and add original research
questions, connections and evidence requirements. Other selected entries use
existing public-safe taxonomy metadata. Source files remain unchanged.

| Source family                                          | Existing taxonomy key (without `paper-`)                              | Remaining boundary                                                                                                |
| ------------------------------------------------------ | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| From Pockets to Portfolios                             | from-pockets-to-portfolios                                            | Legal doctrine, time-cost evidence and fiscal effects need separate review                                        |
| The Economics of Color                                 | the-economics-of-color                                                | Variant selection, causal comparisons and figure rights remain unresolved                                         |
| The Perception Proxy                                   | the-perception-proxy                                                  | Platform mechanisms and audience selection require testing; no inferred coordination                              |
| Redistribution and shareholder taxation                | redistribution-and-working-class-prosperity                           | The strong source-title thesis is presented as an argument to compare, not a finding                              |
| Status Incentives and Boundary Expansion               | status-incentives-and-boundary-expansion-in-u-s-racial-classification | Standards, implementation dates and hypothesized incentives remain distinct                                       |
| Empire Without Bread                                   | empire-without-bread                                                  | Preserve Volume II placement; link its domestic-priorities question to Volume III                                 |
| Expanded literacy, corruption and democracy manuscript | illiterate-voters-corrupt-leaders                                     | No source statistics or figure reproduced; existing Democracy’s Achilles’ Heel article remains a separate edition |
| Integrated Volume III macroeconomic synthesis          | economic-displacement-and-social-welfare                              | Parallel versions and causal claims remain under review; no completed-book claim                                  |

`src/data/volume-three-previews.ts` is the exact named 28-entry batch manifest.
Each entry keeps one existing taxonomy identity, one preview URL and two related
previews. The map, search, research catalogue, Volume III dossier, library landing
page and justice reading path connect to these URLs.

## Publication boundaries

- All new pages visibly say “Research preview · manuscript under review”.
- All are `noindex,follow` and excluded from the sitemap and publication feeds.
- No raw manuscripts, source identifiers, private paths, figures, unverified
  external paper URLs or publication dates are imported.
- No manuscript release authorization or released-article flag changes.
- The Perception Proxy and Prescription Pad dossier descriptions now follow their
  existing public taxonomy instead of the earlier, less specific inventory glosses.
- The preview date describes this web summary, not source publication.

## Verification

Local production build and Astro checks passed (three existing unused-import
hints). All 562 Vitest tests in 39 files passed. Tests cover all 28 identities,
eight priorities, resolved internal links, statuses, search/catalogue deduplication,
cross-volume placement, noindex/feed boundaries and private-content exclusions.
Formatting, editorial checks, publication boundary, canonical-origin, SEO,
Search Console readiness and performance budgets passed. These checks do not
certify manuscript claims or rights.

Desktop/mobile and JavaScript-disabled browser tests are added, including the
updated justice reading path. Local system Chromium could not start because the
runtime denied its process-singleton socket. Hosted preview checks independently confirmed the exact commit, keyboard navigation,
search, lens filtering, empty-state recovery and the preview layout. GitHub CI must
establish the full desktop/mobile results before production deployment; a passing
build alone is not a browser pass.

The first hosted run passed 143 browser checks, including all preview routes on
desktop/mobile. Two JavaScript-disabled pointer tests stalled in animation-frame
stability polling. The no-script test now exercises native keyboard activation;
script-enabled tests retain pointer coverage. Long research-map jumps now settle
immediately and map/dossier anchors use the masthead offset with a no-script
fallback. Article-shelf counts are explicitly scoped to that shelf.

Deployment uses the existing confirmed Vercel project and team from the reviewed
branch, with no merge to main. Confirm the exact deployed commit through
`/build-info.json`, all 28 preview responses and the Volume III interactions.
Rollback target before this batch: production deployment
`dpl_BSVxF9e1V7VsAX9JJPU52PcsgNwJ`, main commit
`a2b9150feaba24a81cfba380d181a9c20effe0dd`.
