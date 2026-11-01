# Week 2: law, time and public capacity

Prepared 1 November 2026, Europe/Budapest. The existing Start page has four
question journeys and the reading continuations released through PR #84. It
does not yet connect the Method, Volume II policing, Volume III Pockets and
Vietnam/Terry in the requested sequence.

This change adds one bounded reading path to `/start/#justice-to-capacity`.
It links existing public identities and describes their current availability.
No new route, article, family, publication flag or manuscript text is added.

## Baseline and source review

Inspected current main and production both identify
`b60abd090c7c306915d448b586faec7f4a25a196`. Fifteen open PRs were reviewed for
overlap; none contains this Week 2 path. PR #83 retains the Week 1 audit and its
separate CI repair. PR #59's civic adaptations and PR #61's already-live bounded
readings are separate work, not missing parts to recreate here.

Read the 16 October curation audit and reconciled ledger, 9 October decisions,
the pathway card and implementation handoff, the policing status note, the
higher-standard policing controller, the Pockets master and the selected
9/16 October justice supplements. Nine selected archive artifacts were verified
by full remote-byte download and Dropbox content hash; private report records
retain exact source paths and SHA-256 hashes. No archive file changes.

The current Pockets catalogue already describes law, time and labor taxation.
That classification is retained. The safe delta is a reading connection and
clear availability, not another catalogue rewrite or a new adaptation.

| Source family                                        | Existing public identity                                                      | Classification for this change                                |
| ---------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Independent Observer Method                          | `/research/the-independent-observer-method/`                                  | Already live: published bounded article                       |
| Human Rights, Policing Doctrine, and Hidden Taxation | `/library/taxonomy/#paper-human-rights-policing-doctrine-and-hidden-taxation` | Already live: map entry; full-text release blocked            |
| From Pockets to Portfolios                           | `/library/taxonomy/#paper-from-pockets-to-portfolios`                         | Already live: Volume III map entry; full-text release blocked |
| From Vietnam to Terry v. Ohio                        | `/library/documents/from-vietnam-to-terry-ohio/`                              | Already live: working-paper synopsis                          |

The navigation adaptation is safe to prepare for review. It reuses existing
public catalogue metadata; it does not release the two held manuscripts. The
component reads the existing map titles, volumes and statuses and stops the
build if either record disappears or gains a reading link, requiring a review
of the availability wording.

## Evidence boundaries and carried blockers

The reader guide separates legal doctrine, historical interpretation, empirical
claims and policy proposals. It distinguishes a stop, protective frisk and
traffic-stop extension without claiming a new legal holding or providing a
current jurisdiction-specific legal analysis. The historical Supreme Court
opinions in [Terry](https://www.govinfo.gov/content/pkg/USREPORTS-392/pdf/USREPORTS-392-1.pdf)
and [Rodriguez](https://www.govinfo.gov/content/pkg/USREPORTS-575/pdf/USREPORTS-575-348.pdf)
are linked as primary reading, not evidence for the manuscripts' wider social
or fiscal claims. Both opinion links returned HTTP 200.

No claim is added about recent ALPR litigation, home-entry litigation,
revocation statistics, current people, individual cases or current tax rules.
The October briefs remain private research inputs. They require their own
currentness, jurisdiction, factual, rights/privacy and owner-release checks.

Policing remains blocked for factual/legal-fairness, privacy, rights and owner
release review. Pockets retains citation repair, empirical causal-chain,
tax/current-law, rights and owner-release gates. Its controlled master is not
approved by its filename. Vietnam/Terry retains its existing source-audit,
comparative-history and policy-model limitations; no synopsis expansion is
proposed. Technical validation does not close these editorial gates.

## Validation and rollback

The proposed public page is `/start/` only. Changed implementation paths are
`src/components/JusticeCapacityPath.astro` and `src/pages/start/index.astro`.
`src/components/AnchorOffset.astro` extends the existing sticky-header offset
handling to the new section so its heading remains visible on deep links.
Browser journey coverage in `e2e/reader-journeys.spec.ts` follows the existing
destinations, checks the map-only boundaries and tests desktop/mobile with
JavaScript on and off. It also checks horizontal overflow and native keyboard
navigation. Existing route, metadata, sitemap, publication-boundary and build
checks apply; exact results and hosted preview status are recorded in the PR
and private progress/change-ledger reports.

No merge, manual deployment or domain change is performed. To withdraw the
unmerged proposal, close its focused PR. If later merged, prepare a reviewed
revert of only this path's component/import, its tests and this note, preserving
later changes and all original public pages. No source-archive rollback is
needed. Do not reset main, change publication flags or deploy an older artifact.
