# Private growth measurement — evidence contract and offline scorecard

## Current status

The browser event adapter in `src/lib/analytics.ts` has a **production no-op** transport. The website does not receive search-query content, reading-list notes, visitor emails or analytics events. This patch does not change that. The real subscription path is an external Substack link and no subscriber conversions can be verified from site clicks alone. Google Search Console connected reporting was unavailable in the current review because the third-party service requested a subscription.

## Safe local workflow implemented

The standalone `scripts/growth-scorecard.mjs` produces a **local-only static HTML** summary from a small, manually supplied aggregate JSON file. It never opens network connections and has no tracking script, cookies, authorization system or production route. Missing fields render **NOT VERIFIED**, not zero. It rejects unknown JSON keys, negative/non-integer measurements, unapproved topic labels and impossible visit subtotals. It keeps the data input and HTML output **outside the Git repository** and creates the report with owner-only file permissions where the OS supports them. A local HTML file is not an authenticated hosted dashboard; do not upload it to public Vercel, GitHub Pages or a shared folder.

Run from the repository root:

```sh
node scripts/growth-scorecard.mjs --output /absolute/private/location/growth-report.html
# After acquiring truthful aggregate figures:
node scripts/growth-scorecard.mjs --input /absolute/private/location/aggregate.json --output /absolute/private/location/growth-report.html
```

An optional input file may contain only aggregate quantities and public topic categories:

```json
{
  "periodStart": "2026-11-01",
  "periodEnd": "2026-11-20",
  "metrics": {},
  "sources": [],
  "topics": []
}
```

Empty fields in this template are intentional: there are **no invented performance numbers**. Recognized metric keys are `searchClicks`, `searchImpressions`, `siteVisits`, `engagedVisits`, `returningVisits`, `confirmedSubscribers`, `newConfirmedSubscribers`, `unsubscribes`. Allowed source labels: `google-search-console`, `site-analytics`, `substack`, `manual`. Approved topic labels: `AI and work`, `Institutions`, `History`, `Political economy`, `Science`, `Wealth and labour`. Each topic row has a `topic` string and nonnegative `visits` integer. Never include individual visitor identifiers, email addresses, granular referrers, full queries or private article text.

## Data-quality gates and calculations

- Every input must carry the same closed date window; keep search, visits and newsletter snapshots separately sourced if their reporting windows differ.
- Search CTR = clicks ÷ impressions × 100, only when both totals are known and impressions are nonzero; Google Search Console CTR is *search-specific*, not article engagement.
- Confirmed subscribers are a snapshot; new confirmed subscribers and unsubscribes are period flows, not necessarily reconstructable from snapshots when imports or account actions occur.
- Visit/engagement/returning-visit definitions depend on the selected approved analytics vendor; compare like with like.
- Do not infer visitor identity or true unique-person reach from client-side storage.
- Do not multiply subcategory totals to claim a whole-site total if categories overlap.

## Later owner-only hosted dashboard (not activated)

Before implementing a hosted private dashboard, require explicit authorization, real authentication and authorization checks for every route, endpoint and export; ensure secrets stay server-side; require secure session management; decide provider and retention with a privacy-law review; then verify that no data is exposed to anonymous users. Vercel preview protection is not by itself proof that an authenticated admin view exists on a public domain. Do not modify the public privacy disclosure until practice is approved and accurately described.

## Metrics still NOT VERIFIED

Unique readers, SEO traffic, impressions, CTR, average position, indexed URLs, article engagement, repeat visits, social-channel attribution, subscriber counts, paid conversion, newsletter retention and growth rate. Record first valid settled reporting dates before trends or before/after claims.
