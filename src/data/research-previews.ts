import { volumeThreePreviews, volumeThreePreviewDate } from "./volume-three-previews";
import { curatedResearchPreviews } from "./curated-research-previews";
import type { ResearchPreview } from "./research-preview-types";

/** Shared renderer and discovery contract; the Volume III batch retains its identities. */
export const researchPreviews: ResearchPreview[] = [
  ...volumeThreePreviews.map((entry): ResearchPreview => ({
    ...entry,
    contextVolume: "Volume III",
    contextTitle: entry.volume === "Volume III" ? "Managed Decline" : "Connected to Volume III",
    backHref: `/series/managed-decline/#research-${entry.id}`,
    updatedDate: entry.updatedDate ?? volumeThreePreviewDate,
    relatedLinks: entry.related.map((id) => {
      const related = volumeThreePreviews.find((item) => item.id === id)!;
      return { title: related.title, href: related.href, label: "Research preview" };
    }),
  })),
  ...curatedResearchPreviews,
];
