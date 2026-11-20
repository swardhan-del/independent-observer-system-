# Independent Observer: a focused reader and traction pilot

## Decision

Improve the route into the existing articles, then test one subject with readers before expanding production. The council disagreed about sequencing: the first-principles view favoured making existing analysis useful sooner; the expansionist view favoured a new public-record case. Do them in that order. A new feature or a larger catalogue is not evidence of demand.

This is a 30-day operating supplement to [ROADMAP.md](ROADMAP.md), [MEASUREMENT.md](MEASUREMENT.md), and the existing [AI and work package](packages/01-ai-and-work/formats.md). Day 1 starts after the reviewed change is released and the publisher starts the pilot. Dates below are proposed work windows, not promised publication dates.

## Verified starting point and existing work

On 20 November 2026, GitHub main and live `/build-info.json` both identified `fc9d991e43485e5a6b5a5064af45f60d53b71898`. The site already has five released articles, source-linked introductions, an AI/work/infrastructure collection, a free Substack subscription route, reusable media packages, and a reader-testing plan. Production analytics sends no events; this task adds no provider or tracking. Traffic and subscriber baselines are unavailable here, not zero.

| Existing proposal                                                   | Comparison with current main                                                                 | Decision for this change                                                                                                           |
| ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| PR #94: Workforce outage-study paragraphs and section VI.B citation | Not in main. Adds an empirical interpretation and a link to the existing First Rung preview. | Keep in its existing draft for a separate passage-and-source review; do not silently add new article prose to an interface change. |
| PR #94: Democracy committee example and Empire's Mirror link        | Not in main. It is explicitly fictional, not a documented institutional case.                | Keep as a possible teaching exercise. It does not satisfy the recommendation for original documentary reporting.                   |
| PR #94: Democracy section headings                                  | Not in main. The current article remains readable without them.                              | Evaluate with that editorial change, independently of whether the fictional example is retained.                                   |
| PR #94: v3 versions, review dates, output-test edits                | Describe the proposed text expansions, not current main.                                     | Do not copy those version/date changes when the expansions have not been adopted.                                                  |
| PR #94: surrounding author/disclosure wording                       | The existing branch contains wording that conflicts with the author's current declaration.   | Use the declaration supplied on 20 November in this change. Reconcile the old branch before any later release.                     |
| PR #95: three further worked examples                               | Stacked on #94, not on current main.                                                         | Leave untouched; assess each example on its own source and teaching value.                                                         |
| PR #91: reader discovery and transparency                           | Conflicted against main; overlaps work already released through #96.                         | Leave untouched. Do not merge the branch wholesale or recreate its homepage work.                                                  |

PR status is a dated observation. Recheck heads and bases before future work. None of these PRs was merged, closed, rebased or rewritten for this change.

## Implemented in this branch

- Shared article layout: three direct links to article text, source notes and publication record; section navigation uses native disclosure; the full citation/version record follows the body. Titles, author, status and dates remain at the opening. Existing paragraphs, citations, article versions and factual cutoff dates are unchanged.
- The existing article follow-up component uses its compact form: one direct free Substack subscription action.
- A shared author declaration supplies the confirmed conflict statement to governance and article disclosures. Funding remains unspecified. Unsupported AI-use wording is removed in accordance with the author's correction; no claim about absent funding or independent review is invented.
- The site changelog describes the interface and declaration update. Browser coverage checks mobile reading, source navigation, citation access and signup without JavaScript, alongside the existing article journeys.

Code locations: `src/components/GreenPublicationArticle.astro`, `src/data/publication-disclosures.ts`, `src/data/green-publications.ts`, `src/data/factories-return.ts`, `src/pages/governance/index.astro`, `src/data/site-updates.ts`, `src/lib/publication-validation.ts`, and `e2e/approved-articles.spec.ts`.

Work occurs in an isolated checkout outside Dropbox. Original manuscripts, source folders, generated Dropbox feed, publication release decisions, other branches and existing dirty work are preserved. The branch and PR are reviewable implementation; merge and production release are separate states.

## Days 1–7: test the reading experience

Start with **workers and people responsible for workplace training who need to evaluate an AI productivity claim**. This is a pilot audience, not a permanent restriction on the publication. Use The Last Human Workforce as the entry article and the existing collection for the next read. Factories Return supplies a second useful question: does more output produce more durable work and income?

Ask five consenting first-time readers to use their phones without guidance. Record task completion, elapsed time and the point of confusion under anonymous participant numbers. Ask them to:

1. Explain the central claim in their own words.
2. Find a source supporting one factual statement and describe what it measured.
3. Name a limitation and distinguish an author proposal from a study finding.
4. Choose a useful next article, or explain why none is useful.
5. Find the free email subscription destination. Do not require an actual subscription to complete the test.

Proposed diagnostic thresholds: four of five can state the claim and a limitation; three of five can find a relevant source within 60 seconds. These are small-sample usability heuristics, not proof of learning, market demand or conversion. Fix repeated confusion before adding another reader feature. Obtain real observations; leave unavailable results blank.

## Days 8–21: one useful case and two distribution channels

The most defensible growth opportunity is a recurring, inspectable question: **what did a public promise actually deliver?** Pilot one data-centre employment or community-benefit promise only if the public record is sufficient. Reuse the work/infrastructure collection rather than create another section.

Before drafting, identify the exact project, jurisdiction, promise, responsible organisation and reporting period. Collect the original announcement, planning/permit or subsidy agreement, dated amendments, and any actual outcome report. Distinguish permanent operating jobs from construction jobs. Distinguish a heat-reuse possibility from an operating heat customer. Use a compact table: promise, dated source and exact location, responsible party, deadline, observed outcome, missing evidence. An absent outcome record is unknown, not evidence of failure. Include the strongest competing explanation and what future evidence would change the assessment. Do not infer intent or wrongdoing from an unmet promise alone.

Publish only an author-reviewed case whose records support its claims. If sufficient records cannot be found within the agreed research budget, stop the case and use the existing Factories Return arithmetic as a clearly labelled teaching example instead. Do not fill missing records with a fictional investigation.

For the initial distribution experiment, use **Substack and one existing social channel, LinkedIn**. Reuse the existing package and original author-approved excerpts: one useful question, one evidence item, one limitation, one canonical article link. The Factories Return example already shows why 20% more output and 30% fewer hours per unit produce 16% fewer total hours under its stated assumptions. It needs no duplicate article. Use it as a discussion entry point, not a forecast.

Proposed publishing pace: one source-reviewed package per week if sustainable. Do not promise that cadence on the site until it is being maintained. Cap adaptations at two per package during the pilot. Ask for a concrete response, such as which task or public promise the reader needs to evaluate. External posts, emails and invitations are not sent by this implementation.

## Days 22–30: judge usefulness and repeatability

Use the existing measurement workflow and native platform aggregates where available. Record the baseline date, actual release dates, canonical article, labour hours and complete reporting windows. Count substantive replies and confirmed Substack subscriptions and cancellations separately. Search Console clicks, if accessible, describe Google search only. A signup click is not a confirmed subscription; impressions and scroll depth do not establish readership. Do not claim channel attribution without supporting data or reconstruct reader identity from browser storage.

Ask the same readers voluntarily whether they used an idea again, what decision it helped and what evidence they still needed. Two independent accounts of actual reuse would justify another bounded case; treat this as a provisional decision rule. If people cannot explain or reuse the work, revise the topic and opening before expanding formats. If they find it useful but never encounter it, prioritise distribution. If no dependable measurement exists, report the qualitative findings and the missing data plainly.

The next competitive advantage is an accurate case that gets revisited: update the same canonical page when a promised deadline passes, show the changed evidence, and link the revision through the Observer Brief. Maintenance cost belongs in the pilot decision.

## Reusable Codex prompt

> Work on `swardhan-del/independent-observer-system-`. First verify current main, open PR heads/bases, CI and live build information. Read applicable AGENTS.md instructions and `docs/media-brand/TRACTION_PILOT_2026-11-20.md`. Preserve all original Dropbox material and unrelated work. Use an isolated branch outside Dropbox. Reuse existing articles, collection, media packages, signup route and tests.
>
> Reconcile the reader-traction implementation against main before writing code. If already released, do not duplicate it. Keep the author's confirmed conflict declaration consistent. Keep funding and independent-review claims within the available evidence. Do not add speculative disclosure requirements.
>
> Select the next smallest change using actual reader observations. For PR #94, compare each proposed passage with the current article and its primary source, retain only supported author-approved changes, preserve existing factual cutoffs unless genuinely updated, and record adopted revisions accurately. A fictional exercise must remain labelled and cannot substitute for a real case.
>
> For a public-record pilot, gather sufficient primary records and document the promise, period, measures, uncertainty and competing explanation before producing a draft. Keep unreviewed editorial material private. Do not invent a case, source, result, endorsement, partnership, audience metric or reader response. Do not send messages, publish social posts, activate tracking or launch payments as part of a code task.
>
> Complete the relevant build, editorial/publication boundary, link/fragment, desktop/mobile browser and fallback checks. Commit and push the coherent change and open a PR with the exact scope, evidence and validation. Report separately what is committed, checked, awaiting author review, merged and live. Do not describe a planned experiment as a demonstrated traction gain.
