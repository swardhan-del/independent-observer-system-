# Week 1: source-to-public state reconciliation

As of 25 October 2026. Audit note only: no public page, route, release flag, reader
tool, design or Dropbox record changes. Historical staging labels do not authorize
new releases.

## Repository and production baseline

- Repository: `swardhan-del/independent-observer-system-`.
- Inspected main: `f56534ad88407d4232da3d64f8defb8ae83e55d3`.
- Live `/build-info.json` returned HTTP 200 with that exact commit SHA and build
  timestamp `2026-10-25T11:10:24.466Z`.
- Existing Vercel production deployment `dpl_3YMujy7piry6GTvEKx4HFg6mb163` is READY
  and aliased to the canonical domain. This audit performed no deployment.
- Existing main checks `verify` and `deploy` completed successfully. These are
  baseline evidence, not validation of this documentation commit.
- Open PRs inspected: #28, #29, #30, #32, #33, #37, #38, #42, #58, #59, #61,
  #71, #72, #73. Open state alone does not establish missing content.
- PR #59 head `54a4e7410452422c578f7b40a492bcffdf3b3cf6` is diverged:
  35 commits ahead / 67 behind inspected main.
- PR #61 head `5826db9b00ddbd43d7bd4fe76809847ded185a8b` is diverged:
  2 ahead / 66 behind. Ancestry counts do not measure unpublished editorial work.

## Source evidence and scope

Read the 16 October Website Curation Audit, the 9 October Curation Decisions and
the 16 October Reconciled Curation Ledger through the source connector; metadata
confirmed the selected artifacts. Read all five Review Ready adaptations and all
17 Blocked status notes. Read the current source-directory routing: later organized
snapshots and author-review drafts do not select a controller or establish approval.

Private source locations, IDs, raw manuscripts and crosswalks are omitted.
The numbered family references below identify rows in the 16 October ledger,
not new canonical IDs. Stable public IDs remain in
`src/data/family-registry.ts`.

## Demonstrated stale-state reconciliation

1. Method, Workforce, Furnace and Democracy's Achilles' Heel still say “awaiting
   human release” in Review Ready. Current publication-registry records identify
   released editions and all four existing routes returned HTTP 200. Treat the
   staging files as historical candidates, not a missing-release queue.
2. Borrowed Labor remains a preview: its existing route returned HTTP 200 with
   `noindex,follow`. WEB_READY is not permission to promote it.
3. Regrowing already has a bounded preview. The public page retains narrative-
   review and small-cohort limitations. The old Blocked note's missing complete
   web-adaptation concern does not establish that no preview exists. The audit's
   version-specific disclosure discrepancy remains unresolved; do not import a
   manuscript declaration into the public preview without review.
4. All six PR #61-related document routes returned HTTP 200. Current main's
   `website-feed-reading-2026-09-18.ts` contains their bounded adaptations;
   `docs/archive-curation-2026-10-09.md` records selective reuse. Do not recreate
   them or label the still-open PR as six wholly missing pages.
5. PR #59's current `curated-publications.ts` contains the five civic/realignment
   adaptations. All five have `rightsReviewed: false` and
   `productionReleased: false`. Existing work is queued with release blocked;
   no independent factual or rights certification is supplied by this audit.
6. The 16 October ledger places Factories Return in Volume III; current release
   metadata and the 9 October repository record identify its released edition
   primarily as Volume IV. Preserve the route and flag placement for source
   review rather than silently changing release metadata.

No demonstrated stale public label is corrected: the discrepancies established
here concern staging and older queue descriptions. Dropbox remains unchanged.
No candidate was newly certified release-ready.

## Source-family to public-identity map

Already live refers only to the stated format, never full-manuscript clearance.
Evidence distinguishes today's route checks from dated ledger observations.
Catalogue/controller-review entries may already have taxonomy identities; do not
call them missing works or create routes without resolving the existing linkage.

| Ledger family | Source family | Existing public identity | Classification | Evidence |
| --- | --- | --- | --- | --- |
| 1 | Regrowing Humanity | [Existing route](https://independentobserver.org/research/regrowing-humanity/) | Already live: preview | 16 Oct ledger; not re-fetched |
| 2 | Independent Observer Method | [Existing route](https://independentobserver.org/research/the-independent-observer-method/) | Already live: article | HTTP 200 on 25 Oct |
| 3 | Last Human Workforce | [Existing route](https://independentobserver.org/research/the-last-human-workforce/) | Already live: article | HTTP 200 on 25 Oct |
| 4 | Server as a Furnace | [Existing route](https://independentobserver.org/research/the-server-as-a-furnace/) | Already live: article | HTTP 200 on 25 Oct |
| 5 | Borrowed Labor | [Existing route](https://independentobserver.org/research/borrowed-labor/) | Already live: preview | HTTP 200 on 25 Oct |
| 6 | From Plato to Chomsky: Democracy and Civic Capacity | No new route proposed | Queued in PR #59; release blocked | PR #59 source read 25 Oct |
| 7 | Formation Through Struggle | No new route proposed | Queued in PR #59; release blocked | PR #59 source read 25 Oct |
| 8 | Civil Rights Realignment and Party Sorting | No new route proposed | Queued in PR #59; release blocked | PR #59 source read 25 Oct |
| 9 | Welfare Queen and the Tax Cut | No new route proposed | Queued in PR #59; release blocked | PR #59 source read 25 Oct |
| 10 | Party Switch and Polarization | No new route proposed | Queued in PR #59; release blocked | PR #59 source read 25 Oct |
| 11 | Empire's Mirror | [Existing route](https://independentobserver.org/library/documents/empires-mirror/) | Already live: bounded synopsis | HTTP 200 on 25 Oct |
| 12 | Fear Circuit | [Existing route](https://independentobserver.org/library/documents/the-fear-circuit/) | Already live: bounded synopsis | HTTP 200 on 25 Oct |
| 13 | Sanctioned Capital and the American Opportunity Myth | [Existing route](https://independentobserver.org/library/documents/sanctioned-capital-and-the-american-opportunity-myth/) | Already live: bounded synopsis | HTTP 200 on 25 Oct |
| 14 | How Command States Finance Power | [Existing route](https://independentobserver.org/library/documents/how-command-states-finance-power/) | Already live: bounded synopsis | HTTP 200 on 25 Oct |
| 15 | When Real Science Becomes Science Fiction | [Existing route](https://independentobserver.org/library/documents/when-real-science-becomes-science-fiction/) | Already live: bounded synopsis | HTTP 200 on 25 Oct |
| 16 | Early Homo | No new route proposed | Blocked for expansion; catalogue/controller review | 16 Oct ledger; clearance not re-certified |
| 17 | Programmable Gene Silencing | No new route proposed | Blocked for expansion; catalogue/controller review | 16 Oct ledger; clearance not re-certified |
| 18 | American Empire Not Democracy | [Existing route](https://independentobserver.org/library/documents/the-american-empire-was-never-a-democracy/) | Already live: bounded synopsis | 16 Oct ledger; not re-fetched |
| 19 | Human Rights Policing Hidden Taxation | No new route proposed | Blocked for expansion; catalogue/controller review | 16 Oct ledger; clearance not re-certified |
| 20 | From Mao to Manufacturing Sovereignty | No new route proposed | Blocked for expansion; catalogue/controller review | 16 Oct ledger; clearance not re-certified |
| 21 | Democracy's Achilles' Heel | [Existing route](https://independentobserver.org/research/democracys-achilles-heel/) | Already live: article | HTTP 200 on 25 Oct |
| 22 | Capital Amplification | No new route proposed | Blocked for expansion; catalogue/controller review | 16 Oct ledger; clearance not re-certified |
| 23 | Attention Infrastructure Gap | No new route proposed | Blocked for expansion; catalogue/controller review | 16 Oct ledger; clearance not re-certified |
| 24 | Power of Knowledge Skills and Abilities | No new route proposed | Blocked for expansion; catalogue/controller review | 16 Oct ledger; clearance not re-certified |
| 25 | From Pockets to Portfolios | No new route proposed | Blocked for expansion; catalogue/controller review | 16 Oct ledger; clearance not re-certified |
| 26 | Economics of Color | No new route proposed | Blocked for expansion; catalogue/controller review | 16 Oct ledger; clearance not re-certified |
| 27 | From Steel to Screens | No new route proposed | Blocked for expansion; catalogue/controller review | 16 Oct ledger; clearance not re-certified |
| 28 | Perception Proxy | No new route proposed | Blocked for expansion; catalogue/controller review | 16 Oct ledger; clearance not re-certified |
| 29 | Literacy Corruption and Democracy | No new route proposed | Blocked for expansion; catalogue/controller review | 16 Oct ledger; clearance not re-certified |
| 30 | Ceiling of Accountability | No new route proposed | Blocked for expansion; catalogue/controller review | 16 Oct ledger; clearance not re-certified |
| 31 | Children Left Behind After a War | [Existing route](https://independentobserver.org/library/documents/children-left-behind-after-a-war/) | Already live: bounded synopsis | 16 Oct ledger; not re-fetched |
| 32 | Redistribution and Shareholder Taxation | No new route proposed | Blocked for expansion; catalogue/controller review | 16 Oct ledger; clearance not re-certified |
| 33 | History Is Not a Moral Certificate | [Existing route](https://independentobserver.org/library/documents/history-is-not-a-moral-certificate/) | Already live: bounded synopsis | 16 Oct ledger; not re-fetched |
| 34 | Richer Republic Weaker Hegemon | [Existing route](https://independentobserver.org/library/documents/richer-republic-weaker-hegemon/) | Already live: bounded synopsis | 16 Oct ledger; not re-fetched |
| 35 | Quantum Computing, Antimatter, and the Next Energy Revolution | [Existing route](https://independentobserver.org/library/documents/quantum-computing-antimatter-and-the-next-energy-revolution/) | Already live: bounded synopsis | HTTP 200 on 25 Oct |
| 36 | Mind Hive Horizons: Energy, Error-Correction, and the Real Timeline to Type-I Emulation | No new route proposed | Blocked for expansion; catalogue/controller review | 16 Oct ledger; clearance not re-certified |
| 37 | Entanglement, No-Signalling, and the Real Path to Quantum Advantage | [Existing route](https://independentobserver.org/library/documents/entanglement-primer/) | Already live: bounded synopsis | 16 Oct ledger; not re-fetched |
| 38 | Factories Return but Do the Jobs | [Existing route](https://independentobserver.org/research/factories-return-but-do-the-jobs/) | Already live: article | 16 Oct ledger; not re-fetched |
| 39 | Lawsuits Are Illusions: Where Institutional Power Actually Resides | [Existing route](https://independentobserver.org/research/lawsuits-are-illusions-where-institutional-power-actually-resides/) | Already live: concept preview | 16 Oct ledger; not re-fetched |
| 40 | The Welfare Paradox | [Existing route](https://independentobserver.org/research/the-welfare-paradox/) | Already live: concept preview | 16 Oct ledger; not re-fetched |
| 41 | The Autonomous Illusion | [Existing route](https://independentobserver.org/research/the-autonomous-illusion/) | Already live: concept preview | 16 Oct ledger; not re-fetched |

The entanglement foundations reader remains distinct from the primer and
quantum/antimatter synopsis. No consolidation is proposed.

## Remaining gates

- Week 2: reuse Method, the Volume II policing family, Volume III Pockets and
  Vietnam/Terry. Pockets concerns policing, time costs and fiscal architecture.
  Check sources and current law; distinguish doctrine, interpretation, empirical
  claims and the author's proposal. Unreviewed justice briefs remain private.
- Regrowing: compare controller, rights, disclosure, scientific wording and
  accessible copy. Preserve the narrative-review and small-cohort limitations.
- PR #59: review existing adaptations in place, reconcile current main and obtain
  rights/release decisions. Do not bulk-merge its unrelated scope.
- Volume III: resolve Steel/Screens content/controller, Economics of Color
  variants and causal/fairness claims, Perception Proxy placement, Literacy figure
  rights, and Ceiling controller/currentness.
- Blocked notes retain verification-marker, source/currentness, version,
  specialist, license/rights, privacy and author-release gates. Existing synopses
  do not clear the longer manuscripts. Gene-silencing and GeneLock fiction remain
  separate; mixed documentary indexes need individual public-safe dossiers.
- Raw media, unclassified exports, private administration and evidence stay out.
  October 23 author-review drafts are not newly approved controllers.

## Validation and handoff

Passing read-only checks: selected folder listings exhausted pagination; main and
open PRs inspected; production build SHA matches main; eleven selected production
routes returned HTTP 200; Borrowed Labor remains noindex. Regrowing's preview and
limitations were read separately through the web connector.

Local clone failed because the configured proxy at port 8080 was unreachable.
Lint, build, unit, generated route/metadata/sitemap and publication-boundary checks
were therefore not run locally. This is an environment limitation, not an
established pre-existing repository test failure. Historical main checks are
reported separately above. Keep this documentation-only PR draft pending its
own hosted checks and review; no preview readiness is asserted here.

Exact changed path: `docs/source-to-public-reconciliation-2026-10-25.md`.
No public pages changed. This note records existing identities and gates without
copying manuscripts or creating competing routes.
