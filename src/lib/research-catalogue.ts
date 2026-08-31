import { researchItems, topics } from "../data/content";
import { seriesItems } from "../data/series";
import { ssrnPreprintDocuments } from "../data/ssrn";
import { volumeResearchMap } from "../data/volume-research";
import { sitePath } from "./paths";
import { slugify } from "./slugs";
import type { SearchEntry } from "./search";
import { previewGreenPublications } from "../data/green-publications";

export type ResearchCatalogueKind =
  "Volume record" | "SSRN preprint" | "Research concept" | "Current research article";

export type ResearchCatalogueRecord = SearchEntry & {
  kind: ResearchCatalogueKind;
  publicationDate?: string;
  dateLabel?: string;
  metrics?: {
    downloads?: number;
    abstractViews?: number;
    checkedAt: string;
  };
  sourceUrl?: string;
  researchGateUrl?: string;
  paperCount?: number;
};

const topicNames = topics.map((topic) => topic.name);

function topicsForRecord(category: string, volume?: string): string[] {
  const value = `${category} ${volume ?? ""}`.toLocaleLowerCase();
  const matches = topicNames.filter((topic) => {
    const name = topic.toLocaleLowerCase();
    if (value.includes(name)) return true;
    if (name === "economics") {
      return /econom|labor|work|tax|welfare|market|demograph|migration|gender/.test(value);
    }
    if (name === "politics") {
      return /politic|institution|democra|sovereign|govern|migration|enforcement/.test(value);
    }
    if (name === "history") {
      return /history|geopolit|colon|demograph|method|sovereign/.test(value);
    }
    if (name === "law") return /law|legal|tax|institution|enforcement/.test(value);
    if (name === "science") return /science|human capability|intimacy/.test(value);
    if (name === "technology") return /technology|comput|ai|automation|intimacy/.test(value);
    return false;
  });

  return [...new Set(matches)];
}

const volumeRecords: ResearchCatalogueRecord[] = volumeResearchMap.map((volume) => ({
  id: `volume:${volume.volume}`,
  title: volume.title,
  category: volume.category,
  description: volume.description,
  status: volume.status,
  type: "Series",
  format: "Volume catalogue record",
  href: sitePath(`/series/${slugify(volume.title)}/`),
  topics: topicsForRecord(volume.category, volume.volume),
  volume: volume.volume,
  kind: "Volume record",
  paperCount: volume.papers.length,
}));

const paperRecords: ResearchCatalogueRecord[] = [...ssrnPreprintDocuments]
  .sort((left, right) => (right.metrics?.downloads ?? -1) - (left.metrics?.downloads ?? -1))
  .map((paper) => ({
    id: `paper:${paper.id}`,
    title: paper.title,
    category: paper.category,
    description: paper.description,
    status: paper.status ?? "SSRN preprint",
    type: "Research",
    format: "Public SSRN reading copy",
    href: sitePath(`/library/documents/${paper.id}/`),
    topics: topicsForRecord(paper.category, paper.volume),
    volume: paper.volume,
    kind: "SSRN preprint",
    publicationDate: paper.publicationDate,
    dateLabel: paper.dateLabel,
    metrics: {
      downloads: paper.metrics?.downloads,
      abstractViews: paper.metrics?.abstractViews,
      checkedAt: paper.metrics?.checkedAt ?? "not recorded",
    },
    sourceUrl: paper.sourceUrl,
    researchGateUrl: paper.researchGateUrl,
  }));

const conceptRecords: ResearchCatalogueRecord[] = researchItems.map((item) => ({
  id: `concept:${slugify(item.title)}`,
  title: item.title,
  category: item.category,
  description: item.description,
  status: item.status,
  type: "Research",
  format: "Research concept",
  href: sitePath(`/research/${slugify(item.title)}/`),
  topics: topicsForRecord(item.category, item.volume),
  volume: item.volume,
  kind: "Research concept",
}));

const greenRecords: ResearchCatalogueRecord[] = previewGreenPublications.map((item) => ({
  id: `green:${item.candidateId}`,
  title: item.title,
  category: item.topics.slice(0, 2).join(" · "),
  description: item.standfirst,
  status: item.status,
  type: "Research",
  format: "Bounded text-only preview",
  href: sitePath(`/research/${item.slug}/`),
  topics: item.topics,
  volume: item.volume,
  kind: "Current research article",
  publicationDate: item.publicationDate,
}));

/**
 * One public-safe research index. Volume records lead the default view, while
 * SSRN reading copies are sorted by retrieved usage signal for discovery only.
 */
export const researchCatalogueRecords: ResearchCatalogueRecord[] = [
  ...volumeRecords,
  ...paperRecords,
  ...conceptRecords,
  ...greenRecords,
];

export const researchCatalogueKinds: ResearchCatalogueKind[] = [
  "Volume record",
  "SSRN preprint",
  "Research concept",
  "Current research article",
];

export const researchCatalogueTopics = topicNames;

export const researchCatalogueVolumes = seriesItems.map((item) => item.volume);

export const researchCatalogueStatuses = [
  ...new Set(researchCatalogueRecords.map((record) => record.status)),
];
