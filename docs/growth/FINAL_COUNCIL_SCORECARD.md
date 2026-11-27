# Council of Five — final scorecard and release decision

**Review date:** 2026-11-20. **Baseline:** main `fc9d991`. **Candidate:** `codex/council-five-growth-audit-20261120`. This is a *pre-merge candidate* comparison; no production audience outcomes can yet be measured.

| Councilor | Before: growth-readiness /10 | After: evidence-supported grade | Why |
|---|---:|---|---|
| Editorial Director | 8.0 | NOT RE-RATED | Research content and public disclosures deliberately unchanged; other branch holds author statement. |
| Audience Strategist | 6.5 | NOT RE-RATED | Added strategy and pilot plan, not demonstrated visitors or conversion. |
| SEO Strategist | 7.0 | NOT RE-RATED | Existing infrastructure inspected; live indexing/query data still missing. |
| Mobile Product Designer | 7.0 | NOT RE-RATED | No new field usability session or fresh production test. |
| Growth Analyst | 2.0 | NOT RE-RATED | Offline reporting tool prepared; still no production collection or real metrics. |

**Initial Council mean: 6.1/10 (provisional). Post-change website impact: NOT VERIFIED. Audience growth/traction: NOT VERIFIED.** These distinctions prevent treating a documentation commit, passing CI, or a preview deployment as measurable audience growth.

## Acceptance checklist status

| Requirement | Status |
|---|---|
| Preserve original manuscripts, Dropbox archive, published paragraphs and citations | PASS BY SCOPE — additive branch; inspect PR diff before merge |
| Preserve preview/released status | PASS BY SCOPE — no registry edit |
| Improve publicly visible homepage and article journeys | ALREADY PARTLY PRESENT ON MAIN; further article changes separate preview |
| Build privacy-safe reporting preparation | IMPLEMENTED AS LOCAL TOOL; data source missing |
| Verified owner-only hosted dashboard | NOT IMPLEMENTED — requires explicit authentication and analytics decisions |
| Verify live Search Console click/impression metrics | NOT VERIFIED — no authorized metrics data accessible |
| Run full application + device test suite | NOT YET VERIFIED — CI/preview checks required |
| Deploy to production | NOT DONE — review required |
| Demonstrated visitor/subscriber lift | NOT VERIFIED — no valid baseline |

## Decision

Keep the candidate isolated pending tests and review. Prioritize the existing reader-traction preview's independent review, collect truthful first baseline figures, then test small purposeful UX and distribution changes. Only re-rate website quality after actual device/CI checks and re-rate traction after comparable traffic/subscriber records exist. Never mark an unknown value as zero or claim 10/10 without evidence.
