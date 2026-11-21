# Aggregate reporting contract

Production `src/lib/analytics.ts` remains a no-op. The privacy commitments, email flow and subscriber funnel are unchanged. No new tracking code, cookie, visitor identifier, API secret or paid analytics provider is installed.

The local desk accepts bounded owner-supplied aggregate exports. These are labeled **OWNER-REPORTED EXPORT AGGREGATE**, never authenticated API results. Missing values remain **NOT VERIFIED**, including confirmed subscribers, external publication history and returning readers. A zero is accepted only when the owner actually supplies a measured zero. Successful preparation counts are operational counts, not growth outcomes.

Save a private JSON file below 100 KB with mode 0600 in a mode 0700 directory outside Git/Dropbox. Import it with:

```sh
npm run growth -- import-metrics --input /absolute/private/aggregates.json
npm run growth -- report
```

Use `periodStart`, `periodEnd`, `metrics`, and optional `landingPages`. Each metric contains a nonnegative integer `value`, matching `source`, `evidenceRef` in the form `export-gsc-20261120`, and `observedAt` as an actual export-review date on/after the period end. The reference identifies an owner-held export; do not embed reader data, access tokens, private file paths or free-text notes. Unknown keys, emails, malformed/future dates, unsupported sources, negative/fractional totals, duplicate/non-public landing routes and inconsistent search totals are rejected. No sample figures are presented as actual audience data.

| Measures                                                    | Required source                    | Definition and limits                                                                                                                                               |
| ----------------------------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| searchClicks, searchImpressions                             | gsc                                | Settled Search Console totals for the same property, date range and search type. Impressions are appearances, not people.                                           |
| landingPages                                                | gsc export alongside search totals | Released canonical article routes with aggregate clicks/impressions; query/user strings are excluded.                                                               |
| siteVisits, engagedVisits, returningVisits, referralVisits  | first-party                        | Only an explicitly privacy-approved provider with documented definitions/retention. No collection is enabled by this importer. Referral visits are not subscribers. |
| confirmedSubscribers, newConfirmedSubscribers, unsubscribes | substack                           | Publication totals and changes from publisher statistics; do not infer these from share or subscription-link clicks.                                                |
| newsletterDelivered, newsletterOpens, newsletterClicks      | substack                           | Aggregate campaign counts with a defined reporting period. Opens are not a reliable unique-person measure and may be affected by privacy proxies.                   |
| linkedinImpressions, linkedinEngagements, linkedinClicks    | linkedin                           | Account/post aggregate windows; no viewer identities or private messages. Engagement is not a confirmed website read.                                               |
| youtubeViews, youtubeWatchMinutes, youtubeReturningViewers  | youtube                            | Studio aggregate windows; watch time is minutes, views are not unique audience, returning viewers follow the provider's definition.                                 |

Do not add or sum platform impressions, views, subscribers and people into one “total audience.” Do not compare unequal periods/post ages or attribute a change causally to this automation. Newsletter dispatch and confirmed social publication remain in the existing platform ledger until a separately authenticated readback integration can supply receipts.

## Connection status, 21 November 2026

The authenticated GSC Wizard `list_sites` request returned `payment_required / subscription_required`. No property or search metrics could be retrieved. An owner-held Search Console export can fill the report without buying a subscription. LinkedIn's connector supplies profile search, not posting/account analytics; the search returned no profile, while the public search and existing exact-account automation record identified the publisher's profile and Independent Observer project. No current editable session or metrics were verified. YouTube and Substack have existing official website destinations but no authenticated analytics/posting API in this implementation. The invideo CLI was not signed in, but the connected editor authenticated the owner and exposed an existing private editable timeline/export. Those references were indexed locally; no credits were spent and no public upload occurred.

Future adapters must read only authorized aggregate sources, store tokens in an OS secret store outside Git and outside reports, validate exact property/account identity and date window, preserve provider definitions, record authenticated receipt time, and keep manual exports labeled separately. A privacy-approved first-party transport requires a separate owner decision and matching privacy documentation before any collection is enabled. Hosting this desk requires real owner authentication/authorization on every page, API, export, preview and storage path; no hosted route is currently supplied.
