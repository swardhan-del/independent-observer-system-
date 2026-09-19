import { manuscripts, manuscriptPath } from "../../plugins/library-content/manuscripts";
import { documentaryItems, researchItems, videoItems } from "./content";
import { publicDocumentItems } from "./documents";
import { seriesItems } from "./series";
import { topicHubs } from "./topics";
import { sitePath } from "../lib/paths";
import { slugify } from "../lib/slugs";
import { previewGreenPublications } from "./green-publications";
import { familyIdForKey } from "./family-registry";
import { isManuscriptAuthorizedForRelease } from "./manuscript-release-registry";
import { citationDate } from "../lib/citations";

const SITE_AUDIT_DATE = "2026-09-19";

function normalizedLastModified(...candidates: Array<string | undefined>) {
  for (const candidate of candidates) {
    if (!candidate) continue;
    const direct = citationDate(candidate);
    if (direct) return direct;
    const dayFirst = candidate.match(/(\d{1,2}\s+[A-Za-z]+\s+\d{4})/);
    const normalizedDayFirst = citationDate(dayFirst?.[1]);
    if (normalizedDayFirst) return normalizedDayFirst;
    const monthFirst = candidate.match(/([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})/);
    const normalizedMonthFirst = citationDate(
      monthFirst ? `${monthFirst[2]} ${monthFirst[1]} ${monthFirst[3]}` : undefined,
    );
    if (normalizedMonthFirst) return normalizedMonthFirst;
  }
  return SITE_AUDIT_DATE;
}

export type CanonicalRouteType =
  | "home"
  | "section"
  | "series"
  | "topic"
  | "document"
  | "research"
  | "documentary"
  | "video"
  | "legacy"
  | "review"
  | "utility";

export type CanonicalRouteRecord = {
  route: string;
  title: string;
  type: CanonicalRouteType;
  source: string;
  familyId?: string;
  indexable: boolean;
  canonicalRoute?: string;
  lastModified: string;
};

const sectionRoutes: CanonicalRouteRecord[] = [
  {
    route: "/library/taxonomy/",
    title: "Four volume research map",
    type: "section",
    source: "taxonomy",
    indexable: true,
    lastModified: SITE_AUDIT_DATE,
  },
  {
    route: "/governance/",
    title: "Editorial standards, corrections & privacy",
    type: "section",
    source: "governance",
    indexable: true,
    lastModified: SITE_AUDIT_DATE,
  },
  {
    route: "/reading-tools/",
    title: "Reading tools: test a claim",
    type: "section",
    source: "reading-tools",
    indexable: true,
    lastModified: SITE_AUDIT_DATE,
  },
  {
    route: "/series/",
    title: "Publication Catalogue",
    type: "section",
    source: "series",
    indexable: true,
    lastModified: SITE_AUDIT_DATE,
  },
  {
    route: "/library/",
    title: "Library",
    type: "section",
    source: "documents",
    indexable: true,
    lastModified: SITE_AUDIT_DATE,
  },
  {
    route: "/latest/",
    title: "Latest research",
    type: "section",
    source: "release-log",
    indexable: true,
    lastModified: SITE_AUDIT_DATE,
  },
  {
    route: "/join/",
    title: "Join Independent Observer",
    type: "section",
    source: "reader-membership",
    indexable: true,
    lastModified: SITE_AUDIT_DATE,
  },
  {
    route: "/whats-new/",
    title: "Site Changelog",
    type: "section",
    source: "site-updates",
    indexable: true,
    lastModified: SITE_AUDIT_DATE,
  },
  {
    route: "/research/",
    title: "Research & Essays",
    type: "section",
    source: "research",
    indexable: true,
    lastModified: SITE_AUDIT_DATE,
  },
  {
    route: "/prompts/",
    title: "Visibility Studio",
    type: "section",
    source: "prompts",
    indexable: true,
    lastModified: SITE_AUDIT_DATE,
  },
  {
    route: "/documentaries/",
    title: "Documentaries",
    type: "section",
    source: "documentary",
    indexable: true,
    lastModified: SITE_AUDIT_DATE,
  },
  {
    route: "/videos/",
    title: "Videos",
    type: "section",
    source: "video",
    indexable: true,
    lastModified: SITE_AUDIT_DATE,
  },
  {
    route: "/podcast/",
    title: "History Across the Volumes",
    type: "section",
    source: "podcast",
    indexable: true,
    lastModified: SITE_AUDIT_DATE,
  },
  {
    route: "/about/",
    title: "About",
    type: "section",
    source: "about",
    indexable: true,
    lastModified: SITE_AUDIT_DATE,
  },
  {
    route: "/contact/",
    title: "Contact",
    type: "section",
    source: "contact",
    indexable: true,
    lastModified: SITE_AUDIT_DATE,
  },
  {
    route: "/start/",
    title: "Start Here",
    type: "section",
    source: "start",
    indexable: true,
    lastModified: SITE_AUDIT_DATE,
  },
  {
    route: "/topics/",
    title: "Topics",
    type: "section",
    source: "topics",
    indexable: true,
    lastModified: SITE_AUDIT_DATE,
  },
];

const contentRoutes: CanonicalRouteRecord[] = [
  ...seriesItems.map((item) => ({
    route: `/series/${slugify(item.title)}/`,
    title: `${item.volume}: ${item.title}`,
    type: "series" as const,
    source: "series",
    familyId: familyIdForKey(item.title),
    indexable: true,
    lastModified: SITE_AUDIT_DATE,
  })),
  ...topicHubs.map((topic) => ({
    route: `/topics/${topic.slug}/`,
    title: topic.name,
    type: "topic" as const,
    source: "topics",
    indexable: true,
    lastModified: SITE_AUDIT_DATE,
  })),
  ...publicDocumentItems.map((item) => ({
    route: `/library/documents/${item.id}/`,
    title: item.title,
    type: "document" as const,
    source: "documents",
    familyId: item.familyId,
    indexable: true,
    lastModified: normalizedLastModified(
      item.updatedDate,
      item.sourceReviewedAt,
      item.sourceModified,
      item.publicationDate,
    ),
  })),
  ...researchItems.map((item) => ({
    route: `/research/${slugify(item.title)}/`,
    title: item.title,
    type: "research" as const,
    source: "content",
    familyId: familyIdForKey(item.title),
    indexable: true,
    lastModified: SITE_AUDIT_DATE,
  })),
  ...previewGreenPublications.map((item) => ({
    route: `/research/${item.slug}/`,
    title: item.title,
    type: "research" as const,
    source: "publication-registry",
    familyId: item.familyId,
    indexable: item.productionReleased,
    lastModified: normalizedLastModified(item.lastReviewedDate, item.publicationDate),
  })),
  ...documentaryItems.map((item) => ({
    route: `/documentaries/${slugify(item.title)}/`,
    title: item.title,
    type: "documentary" as const,
    source: "content",
    indexable: true,
    lastModified: SITE_AUDIT_DATE,
  })),
  ...videoItems.map((item) => ({
    route: `/videos/${slugify(item.title)}/`,
    title: item.title,
    type: "video" as const,
    source: "content",
    indexable: true,
    lastModified: SITE_AUDIT_DATE,
  })),
];

const utilityRoutes: CanonicalRouteRecord[] = [
  {
    route: "/",
    title: "Independent Observer",
    type: "home",
    source: "home",
    indexable: true,
    lastModified: SITE_AUDIT_DATE,
  },
  {
    route: "/start-here/",
    title: "Start Here redirect",
    type: "legacy",
    source: "start-here",
    indexable: false,
    canonicalRoute: "/start/",
    lastModified: SITE_AUDIT_DATE,
  },
  {
    route: "/build-info.json",
    title: "Build information",
    type: "utility",
    source: "build",
    indexable: false,
    lastModified: SITE_AUDIT_DATE,
  },
];

export function normalizePublicTitle(title: string) {
  return title
    .toLocaleLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

export function assertUniqueRoutes(records: CanonicalRouteRecord[]) {
  const seen = new Set<string>();
  for (const record of records) {
    const normalized = sitePath(record.route);
    if (seen.has(normalized)) {
      throw new Error(`Duplicate canonical route: ${record.route}`);
    }
    seen.add(normalized);
  }
}

export function assertUniquePublicTitles(records: CanonicalRouteRecord[]) {
  const grouped = new Map<string, CanonicalRouteRecord[]>();
  for (const record of records.filter((candidate) => candidate.indexable)) {
    const key = `${record.type}:${normalizePublicTitle(record.title)}`;
    const existing = grouped.get(key) ?? [];
    existing.push(record);
    grouped.set(key, existing);
  }

  for (const [key, matches] of grouped) {
    if (matches.length > 1) {
      throw new Error(`Duplicate normalized public title within entity type: ${key}`);
    }
  }
}

export const canonicalRouteRegistry = [
  ...utilityRoutes,
  ...sectionRoutes,
  ...contentRoutes,
  ...manuscripts.map((entry) => ({
    route: manuscriptPath(entry),
    title: entry.title,
    type: "research" as const,
    source: "manuscripts",
    familyId: entry.familyId,
    // Fail-closed: a manuscript route is only indexable once its edition has
    // an explicit record in manuscriptReleaseAuthorizations.
    indexable: isManuscriptAuthorizedForRelease(entry.slug),
    lastModified: normalizedLastModified(entry.sourceDate),
  })),
] as CanonicalRouteRecord[];

assertUniqueRoutes(canonicalRouteRegistry);
assertUniquePublicTitles(canonicalRouteRegistry);

export const indexableRouteRegistry = canonicalRouteRegistry.filter((record) => record.indexable);

export function canonicalRouteFor(route: string) {
  const normalized = sitePath(route.endsWith("/") ? route : `${route}/`);
  return canonicalRouteRegistry.find((record) => sitePath(record.route) === normalized);
}
