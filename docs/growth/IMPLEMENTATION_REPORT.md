# Council of Five — implementation report

**2026-11-20.** Implementation branch: `codex/council-five-growth-audit-20261120`, created from production main `fc9d991e43485e5a6b5a5064af45f60d53b71898`. Changes are deliberately **additive** and separate from the pre-existing `codex/observer-reader-traction-20261120` branch.

## Completed in this isolated branch

- New full Council of Five baseline with all prompt-requested criteria, evidence and NOT VERIFIED marking.
- New audience strategy, measurement specification, 90-day plan and final comparison.
- New **offline** aggregate scorecard source with no production telemetry, browser network activity, public route or credentials.
- New offline scorecard behavior tests (missing metrics, CTR denominator, invalid/PII-shaped fields, invalid dates and HTML escaping).

## Already in production main before this branch

Question-led hero, released first-read cards, volume/topic collection navigation, external Substack Join flow, local saved-reading utilities, source/correction metadata, documented metadata/indexing gates, and browser tests. Do not claim this branch created those features. A separate unmerged November 20 preview provides article UX and author conflict wording; it was not copied or modified here.

## Deliberately NOT changed

Original manuscripts, Dropbox folders, published article paragraphs, citations, factual cutoff and publication dates, released-versus-preview flags, email provider, production analytics transport, public privacy statement, authentication settings, deployment configuration, or the main branch.

## Verification and limits

Offline scorecard logic can be exercised with a local no-data report and synthetic aggregate values. Repository CI and Vercel preview checks must be reviewed after the PR is opened. **No production deployment, live analytics onboarding, Google metrics, subscriber figures, manual iPhone session or comprehensive Lighthouse benchmark is claimed.** The environment had read/write GitHub and Vercel inspection tools but not a local full repository checkout/remote package installation, so application-wide builds and browser tests were not executed locally. Existing README and test files were inspected; they do not substitute for a new run.

## Required merge checks

```sh
npm ci
npm run format:check
npm run lint
npm test
npm run build
npm run verify:publication-boundary
npm run verify:canonical-origin
npm run verify:preview-indexing
npm run test:e2e
```

Do not merge on the strength of documentation alone. Inspect CI checks, preview pages, local scorecard output and any changed packages. Production deployment requires a reviewed merge and separate production build verification with a rollback candidate.
