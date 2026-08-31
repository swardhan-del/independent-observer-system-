import type { PublicDocument } from "./documents";
import { seriesItems, type SeriesItem } from "./series";
import { paperDocuments } from "./papers";

export type VolumeResearchItem = SeriesItem & {
  papers: PublicDocument[];
};

/**
 * Public reading signals for the four-volume roadmap. Archived distribution metrics are
 * ordered for discovery only; they are not ratings, endorsements, or release
 * approvals.
 */
export const volumeResearchMap: VolumeResearchItem[] = seriesItems.map((volume) => ({
  ...volume,
  papers: paperDocuments
    .filter((paper) => paper.volume === volume.volume)
    .sort((left, right) => (right.metrics?.downloads ?? -1) - (left.metrics?.downloads ?? -1)),
}));
