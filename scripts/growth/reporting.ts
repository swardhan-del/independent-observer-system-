import { readFileSync } from "node:fs";
import { articles, destinations } from "./packages";
import type { GrowthStore } from "./store";

export const metricSources = {
  searchClicks: "gsc",
  searchImpressions: "gsc",
  siteVisits: "first-party",
  engagedVisits: "first-party",
  returningVisits: "first-party",
  referralVisits: "first-party",
  confirmedSubscribers: "substack",
  newConfirmedSubscribers: "substack",
  unsubscribes: "substack",
  newsletterDelivered: "substack",
  newsletterOpens: "substack",
  newsletterClicks: "substack",
  linkedinImpressions: "linkedin",
  linkedinEngagements: "linkedin",
  linkedinClicks: "linkedin",
  youtubeViews: "youtube",
  youtubeWatchMinutes: "youtube",
  youtubeReturningViewers: "youtube",
} as const;
type MetricName = keyof typeof metricSources;
type Count = { value: number; source: string; evidenceRef: string; observedAt: string };
export type Metrics = {
  periodStart: string;
  periodEnd: string;
  metrics: Partial<Record<MetricName, Count>>;
  landingPages: { path: string; clicks: number; impressions: number }[];
};
export const validDate = (s: unknown): s is string =>
  typeof s === "string" &&
  /^\d{4}-\d{2}-\d{2}$/.test(s) &&
  !Number.isNaN(Date.parse(`${s}T00:00:00Z`)) &&
  new Date(`${s}T00:00:00Z`).toISOString().startsWith(s);
function keys(raw: object, allowed: string[]) {
  if (Object.keys(raw).some((k) => !allowed.includes(k)))
    throw Error("Unknown fields; personal data and unrecognized metrics are not accepted");
}
function object(raw: unknown): asserts raw is Record<string, unknown> {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) throw Error("Expected object");
}

export function validateMetrics(raw: unknown): Metrics {
  object(raw);
  keys(raw, ["periodStart", "periodEnd", "metrics", "landingPages"]);
  if (
    !validDate(raw.periodStart) ||
    !validDate(raw.periodEnd) ||
    raw.periodStart > raw.periodEnd ||
    raw.periodEnd > new Date().toISOString().slice(0, 10)
  )
    throw Error("Invalid or future reporting period");
  object(raw.metrics);
  keys(raw.metrics, Object.keys(metricSources));
  for (const [name, count] of Object.entries(raw.metrics)) {
    object(count);
    keys(count, ["value", "source", "evidenceRef", "observedAt"]);
    if (
      !Number.isSafeInteger(count.value) ||
      Number(count.value) < 0 ||
      count.source !== metricSources[name as MetricName] ||
      typeof count.evidenceRef !== "string" ||
      !/^export-[a-z0-9-]{8,80}$/.test(count.evidenceRef) ||
      !validDate(count.observedAt) ||
      count.observedAt < raw.periodEnd ||
      count.observedAt > new Date().toISOString().slice(0, 10)
    )
      throw Error(
        "Metric requires a nonnegative aggregate, matching source and dated export evidence",
      );
  }
  const pages = raw.landingPages ?? [];
  if (!Array.isArray(pages) || pages.length > 100) throw Error("Invalid landing pages");
  const routes = new Set(
    articles.filter((a) => a.productionReleased).map((a) => `/research/${a.slug}/`),
  );
  for (const page of pages) {
    object(page);
    keys(page, ["path", "clicks", "impressions"]);
    if (
      !routes.has(String(page.path)) ||
      !Number.isSafeInteger(page.clicks) ||
      !Number.isSafeInteger(page.impressions) ||
      Number(page.clicks) < 0 ||
      Number(page.impressions) < Number(page.clicks)
    )
      throw Error("Only released article routes and valid search totals are allowed");
  }
  if (new Set(pages.map((p) => p.path)).size !== pages.length)
    throw Error("Duplicate landing page");
  const data = { ...raw, landingPages: pages } as Metrics;
  if (
    data.metrics.searchClicks &&
    data.metrics.searchImpressions &&
    data.metrics.searchClicks.value > data.metrics.searchImpressions.value
  )
    throw Error("Search clicks exceed impressions");
  for (const key of ["engagedVisits", "returningVisits", "referralVisits"] as const)
    if (
      data.metrics[key] &&
      data.metrics.siteVisits &&
      data.metrics[key]!.value > data.metrics.siteVisits.value
    )
      throw Error("Visit subtotal exceeds total");
  return data;
}

export function saveMetrics(store: GrowthStore, raw: unknown) {
  const data = validateMetrics(raw);
  const month = data.periodEnd.slice(0, 7);
  store.db
    .prepare("INSERT INTO metrics VALUES(?,?) ON CONFLICT(month) DO UPDATE SET data=excluded.data")
    .run(month, JSON.stringify(data));
  store.event(null, "aggregate_import", {
    month,
    metrics: Object.keys(data.metrics),
    status: "Owner-supplied export aggregates; not independently authenticated",
  });
  return month;
}

type Criterion = {
  id: number;
  criterion: string;
  baseline: number | null;
  baselineEvidence: string;
};
const criteria = JSON.parse(
  readFileSync(new URL("./council-criteria.json", import.meta.url), "utf8"),
) as Criterion[];
export function monthlyReport(store: GrowthStore, month = new Date().toISOString().slice(0, 7)) {
  if (!/^\d{4}-(?:0[1-9]|1[0-2])$/.test(month)) throw Error("Invalid report month");
  const stored = store.db.prepare("SELECT data FROM metrics WHERE month=?").get(month);
  const metrics = stored ? validateMetrics(JSON.parse(String(stored.data))) : null;
  const rows = store.list();
  const report = {
    month,
    generatedAt: new Date().toISOString(),
    quality: {
      provisionalOverall: 6.6,
      target: 8,
      targetReached: false,
      status:
        "Provisional owner-supplied readiness baseline retained; no calibrated overall reassessment or proven growth",
      historicalCouncilAverage: 6.1,
      method:
        "One model simulates five perspectives; not five independent reviewers. PR #99 historical five-role average uses a different aggregation from the provisional 6.6.",
    },
    councilors: [
      {
        role: "A — Academic Editor",
        finding:
          "Only released bounded articles; exact excerpts and source ledger. Reachability checks cannot prove a claim or reuse rights. Owner review remains mandatory.",
      },
      {
        role: "B — Audience Strategist",
        finding:
          "One LinkedIn review weekly and one brief monthly proposed; no new filming obligation. Ten–twenty minutes is a proposed review budget, not measured production time.",
      },
      {
        role: "C — SEO and Distribution",
        finding:
          "Reuse canonical routes and related articles, no new public admin route or tracking. Search results and referrals NOT VERIFIED unless supported by dated exports.",
      },
      {
        role: "D — Product and Mobile",
        finding:
          "Local authenticated review forms and copy-ready drafts. Browser regression evidence belongs to the implementation report; real-device reader behavior remains NOT VERIFIED.",
      },
      {
        role: "E — Growth Analyst",
        finding:
          "Separate metrics, provenance, periods and conversions. Preparation counts do not establish growth; manual imports are labeled owner-reported aggregates.",
      },
    ],
    criteria: criteria.map((c) => ({
      ...c,
      current: c.baseline,
      assessment:
        c.criterion === "Distribution workflow"
          ? "Working persistent preparation, source gate and per-channel approval added. Baseline score retained pending sustained use and editorial review."
          : c.criterion === "Growth reporting"
            ? "Monthly queue/aggregate reporting implemented. Baseline score retained until actual authenticated performance data is available."
            : "Historical provisional grade retained, or NOT VERIFIED. This change does not supply new outcome evidence for this criterion.",
    })),
    outcomes: Object.fromEntries(
      Object.keys(metricSources).map((k) => [
        k,
        metrics?.metrics[k as MetricName]
          ? {
              ...metrics.metrics[k as MetricName],
              verification: "OWNER-REPORTED EXPORT AGGREGATE — not independently authenticated",
            }
          : "NOT VERIFIED",
      ]),
    ),
    organicLandingPages: metrics?.landingPages.length ? metrics.landingPages : "NOT VERIFIED",
    reportingPeriod: metrics ? [metrics.periodStart, metrics.periodEnd] : "NOT VERIFIED",
    queue: {
      total: rows.length,
      active: rows.filter((r) => r.status !== "superseded").length,
      blocked: rows.filter((r) => r.status === "blocked").length,
      approvedCopyDecisions: rows
        .flatMap((r) => Object.values(r.decisions))
        .filter((d) => d.state === "approved").length,
      externalPublications: "NOT VERIFIED — this system never publishes",
    },
    workload: {
      weekly: "Review one prepared LinkedIn post and source warnings; copy only after approval",
      monthly: "Review one Observer Brief and this report",
      optional: "YouTube script and storyboard; no filming or editing commitment",
      budget:
        "Proposed 10–20 minutes of publisher review weekly; reduce cadence when verification or capacity fails",
    },
    priorities: [
      "Resolve source warnings before copy approval",
      "Record actual owner-held Search Console and platform aggregates",
      "Measure review time and first-reader behavior before changing cadence",
    ],
    connections: destinations,
    jobs: store.jobs(),
  };
  if (report.criteria.length !== 68)
    throw Error("Council assessment must preserve all 68 original criteria");
  store.db
    .prepare("INSERT INTO reports VALUES(?,?) ON CONFLICT(month) DO UPDATE SET data=excluded.data")
    .run(month, JSON.stringify(report));
  return report;
}
