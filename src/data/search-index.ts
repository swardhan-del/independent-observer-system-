import { taxonomyEntries } from "../../plugins/library-content/taxonomy";
import { readingTools } from "./reading-tools";
import { displayTitle } from "./reader-presentation";
import { historyPodcastEpisodes } from "./podcast";
import { documentaryItems, researchItems, topics, videoItems } from "./content";
import { dropboxFeedItems } from "./dropbox-content.generated";
import { publicDocumentItems } from "./documents";
import { seriesItems } from "./series";
import { volumeReels } from "./video-reels";
import { libraryVolumeGuides } from "../../plugins/library-content/catalog";
import { topicPluginFor } from "../../plugins/topic-discovery/catalog";
import { sitePath } from "../lib/paths";
import { slugify } from "../lib/slugs";
import type { SearchEntry } from "../lib/search";
import { previewGreenPublications } from "./green-publications";

const topicNames = topics.map((topic) => topic.name);
const feedHref: Record<string, string> = {
  research: sitePath("/research/"),
  documentary: sitePath("/documentaries/"),
  video: sitePath("/videos/"),
  series: sitePath("/series/"),
};
const topicsForCategory = (category: string) => {
  const value = category.toLocaleLowerCase();
  return topicNames.filter((topic) => {
    const name = topic.toLocaleLowerCase();
    if (value.includes(name)) return true;
    if (name === "economics") return /econom|labor|labour|tax|welfare/.test(value);
    if (name === "science") return /scien|quantum|physics/.test(value);
    if (name === "politics") return /politic|institution|civic|migration|demograph/.test(value);
    if (name === "history")
      return (
        value.includes("history") || value.includes("civilization") || value.includes("geopolitic")
      );
    if (name === "technology")
      return (
        value.includes("technology") ||
        value.includes("science") ||
        value.includes("comput") ||
        value.includes("labor")
      );
    return false;
  });
};

export const searchItems: SearchEntry[] = [
  ...taxonomyEntries
    .filter((entry) => !entry.href)
    .map((entry) => ({
      id: `taxonomy:${entry.id}`,
      title: entry.title,
      description: entry.summary,
      category: entry.branch,
      status: entry.status,
      type: "Research" as const,
      topics: topicsForCategory(entry.branch),
      volume: entry.volume,
      format: "Research map entry",
      href: sitePath(`/library/taxonomy/#${entry.id}`),
    })),
  ...readingTools.map((tool) => ({
    id: `reading-tool:${tool.id}`,
    title: tool.title,
    description: tool.introduction,
    searchText: [tool.example, tool.limit, ...tool.rows.flat()].join(" "),
    category: "Reading tools",
    status: "Public learning exercise",
    type: "Research" as const,
    topics: tool.topics,
    volume: tool.volume,
    format: "Learning exercise",
    href: sitePath(`/reading-tools/#${tool.id}`),
  })),
  ...historyPodcastEpisodes.map((episode) => ({
    id: `podcast:${episode.number}`,
    title: episode.title,
    category: "History podcast",
    description: episode.summary,
    searchText: episode.script,
    status: "Editorial preview",
    type: "Podcast" as const,
    topics: ["History"],
    volume: episode.volume,
    format: "Audio and transcript",
    href: sitePath(`/podcast/#episode-${String(episode.number).padStart(2, "0")}`),
  })),
  ...previewGreenPublications.map((item) => ({
    id: `publication:${item.candidateId}`,
    title: item.title,
    category: item.topics.slice(0, 2).join(" · "),
    description: item.standfirst,
    searchText: item.paragraphs.join(" "),
    status: item.status,
    type: "Research" as const,
    topics: item.topics,
    volume: item.volume,
    format: "bounded text-only preview article",
    href: sitePath(`/research/${item.slug}/`),
  })),
  ...researchItems.map((item) => ({
    id: `research:${item.title}`,
    title: item.title,
    category: item.category,
    description: item.description,
    status: item.status,
    type: "Research" as const,
    topics: topicsForCategory(item.category),
    format: "essay",
    href: sitePath(`/research/${slugify(item.title)}/`),
  })),
  ...documentaryItems.map((item) => ({
    id: `documentary:${item.title}`,
    title: item.title,
    category: item.category,
    description: item.description,
    status: item.status,
    type: "Documentary" as const,
    topics: topicsForCategory(item.category),
    format: "film",
    href: sitePath(`/documentaries/${slugify(item.title)}/`),
  })),
  ...videoItems.map((item) => ({
    id: `video:${item.title}`,
    title: item.title,
    category: item.category,
    description: item.description,
    status: item.status,
    type: "Video" as const,
    topics: topicsForCategory(item.category),
    format: "video",
    href: sitePath(`/videos/${slugify(item.title)}/`),
  })),
  ...volumeReels.map((item) => ({
    id: `video-reel:${item.title}`,
    title: item.title,
    category: item.category,
    description: item.description,
    status: item.sourceNote,
    type: "Video" as const,
    topics: topicsForCategory(item.category),
    volume: item.volume,
    format: "playable preview reel",
    href: sitePath(`/videos/#volume-reel-${slugify(`${item.volume}-${item.title}`)}`),
  })),
  ...seriesItems.map((item) => ({
    id: `series:${item.title}`,
    title: item.title,
    category: item.category,
    description: item.description,
    status: item.status,
    type: "Series" as const,
    topics: item.volume === "Volume IV" ? ["Technology", "Economics"] : [],
    volume: item.volume,
    format: "volume roadmap",
    href: sitePath(`/series/${slugify(item.title)}/`),
  })),
  ...dropboxFeedItems.map((item) => ({
    id: `approved:${item.id}`,
    title: item.title,
    category: item.category,
    description: item.description,
    status: item.status,
    type: "Approved preview" as const,
    format: item.kind,
    href: feedHref[item.kind] ?? sitePath("/library/"),
  })),
  ...publicDocumentItems.map((entry) => ({
    id: `document:${entry.id}`,
    title: entry.title,
    category: entry.category,
    description: entry.description,
    searchText: [
      displayTitle(entry),
      ...entry.sections
        .filter((section) => section.id !== "publication-boundary")
        .flatMap((section) => [
          section.heading,
          ...(section.paragraphs ?? []),
          ...(section.items ?? []),
          ...(section.table
            ? [section.table.caption, ...section.table.headers, ...section.table.rows.flat()]
            : []),
        ]),
    ].join(" "),
    status: entry.status ?? "Reviewed public copy",
    type:
      entry.status === "Author working paper"
        ? ("Research" as const)
        : ("Published document" as const),
    topics: topicsForCategory(entry.category),
    volume: entry.volume,
    format:
      entry.status === "Author working paper"
        ? `Working-paper summary${entry.researchGateUrl ? " · ResearchGate record" : ""}`
        : "document",
    href: sitePath(`/library/documents/${entry.id}/`),
  })),
  {
    id: "publication-operating-system",
    title: "Publication Operating System",
    category: "Editorial governance",
    description:
      "The Independent Observer's operating standard for research, approval, publication, distribution, and learning.",
    status: "Public reference document",
    type: "Published document" as const,
    topics: ["Law", "Politics"],
    format: "DOCX standard",
    href: sitePath("/publication-operating-system/"),
  },
  ...topics.map((topic) => ({
    id: `topic:${topic.name}`,
    title: topic.name,
    category: "Coverage field",
    description: topic.description,
    status: "Editorial framework",
    type: "Topic" as const,
    topics: [topic.name],
    format: "topic hub",
    href: sitePath(`/topics/${topic.name.toLocaleLowerCase()}/`),
  })),
  ...libraryVolumeGuides.map((guide) => ({
    id: `volume:${guide.volume}`,
    title: guide.volume,
    category: guide.focus,
    description: guide.summary,
    status: "Public summary",
    type: "Series" as const,
    topics: guide.topicSlugs.map((slug) => topicPluginFor(slug).name),
    volume: guide.volume,
    format: "volume content block",
    href: sitePath(`/library/#library-${slugify(guide.volume)}`),
  })),
];
