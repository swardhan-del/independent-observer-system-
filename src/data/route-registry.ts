import { documentaryItems, researchItems, videoItems } from "./content";
import { publicDocumentItems } from "./documents";
import { seriesItems } from "./series";
import { topicHubs } from "./topics";
import { sitePath } from "../lib/paths";
import { slugify } from "../lib/slugs";
import { previewGreenPublications, publicationPreviewEnabled } from "./green-publications";

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
  indexable: boolean;
  canonicalRoute?: string;
};

const sectionRoutes: CanonicalRouteRecord[] = [
  {
    route: "/series/",
    title: "Publication Catalogue",
    type: "section",
    source: "series",
    indexable: true,
  },
  { route: "/library/", title: "Library", type: "section", source: "documents", indexable: true },
  {
    route: "/whats-new/",
    title: "What’s New",
    type: "section",
    source: "release-log",
    indexable: true,
  },
  {
    route: "/research/",
    title: "Research & Essays",
    type: "section",
    source: "research",
    indexable: true,
  },
  {
    route: "/documentaries/",
    title: "Documentaries",
    type: "section",
    source: "documentary",
    indexable: true,
  },
  { route: "/videos/", title: "Videos", type: "section", source: "video", indexable: true },
  { route: "/about/", title: "About", type: "section", source: "about", indexable: true },
  { route: "/contact/", title: "Contact", type: "section", source: "contact", indexable: true },
  { route: "/start/", title: "Start Here", type: "section", source: "start", indexable: true },
  {
    route: "/publication-operating-system/",
    title: "Publication Operating System",
    type: "section",
    source: "operating-system",
    indexable: true,
  },
  { route: "/topics/", title: "Topics", type: "section", source: "topics", indexable: true },
];

const contentRoutes: CanonicalRouteRecord[] = [
  ...seriesItems.map((item) => ({
    route: `/series/${slugify(item.title)}/`,
    title: `${item.volume}: ${item.title}`,
    type: "series" as const,
    source: "series",
    indexable: true,
  })),
  ...topicHubs.map((topic) => ({
    route: `/topics/${topic.slug}/`,
    title: topic.name,
    type: "topic" as const,
    source: "topics",
    indexable: true,
  })),
  ...publicDocumentItems.map((item) => ({
    route: `/library/documents/${item.id}/`,
    title: item.title,
    type: "document" as const,
    source: "documents",
    indexable: true,
  })),
  ...researchItems.map((item) => ({
    route: `/research/${slugify(item.title)}/`,
    title: item.title,
    type: "research" as const,
    source: "content",
    indexable: true,
  })),
  ...previewGreenPublications.map((item) => ({
    route: `/research/${item.slug}/`,
    title: item.title,
    type: "research" as const,
    source: "publication-registry",
    indexable: !publicationPreviewEnabled,
  })),
  ...documentaryItems.map((item) => ({
    route: `/documentaries/${slugify(item.title)}/`,
    title: item.title,
    type: "documentary" as const,
    source: "content",
    indexable: true,
  })),
  ...videoItems.map((item) => ({
    route: `/videos/${slugify(item.title)}/`,
    title: item.title,
    type: "video" as const,
    source: "content",
    indexable: true,
  })),
];

const utilityRoutes: CanonicalRouteRecord[] = [
  {
    route: "/",
    title: "Independent Observer",
    type: "home",
    source: "home",
    indexable: true,
  },
  {
    route: "/start-here/",
    title: "Start Here redirect",
    type: "legacy",
    source: "start-here",
    indexable: false,
    canonicalRoute: "/start/",
  },
  {
    route: "/review/regrowing-humanity/",
    title: "Regrowing Humanity Evidence Lab",
    type: "review",
    source: "review",
    indexable: false,
  },
  {
    route: "/build-info.json",
    title: "Build information",
    type: "utility",
    source: "build",
    indexable: false,
  },
];

function assertUniqueRoutes(records: CanonicalRouteRecord[]) {
  const seen = new Set<string>();
  for (const record of records) {
    const normalized = sitePath(record.route);
    if (seen.has(normalized)) {
      throw new Error(`Duplicate canonical route: ${record.route}`);
    }
    seen.add(normalized);
  }
}

export const canonicalRouteRegistry = [
  ...utilityRoutes,
  ...sectionRoutes,
  ...contentRoutes,
] as CanonicalRouteRecord[];

assertUniqueRoutes(canonicalRouteRegistry);

export const indexableRouteRegistry = canonicalRouteRegistry.filter((record) => record.indexable);

export function canonicalRouteFor(route: string) {
  const normalized = sitePath(route.endsWith("/") ? route : `${route}/`);
  return canonicalRouteRegistry.find((record) => sitePath(record.route) === normalized);
}
