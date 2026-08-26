import type { PublicDocument } from "./documents";
import { seriesItems, type SeriesItem } from "./series";
import { ssrnPreprintDocuments } from "./ssrn";

export type VolumeResearchItem = SeriesItem & {
  papers: PublicDocument[];
};

/**
 * Public reading signals for the four-volume roadmap. SSRN usage metrics are
 * ordered for discovery only; they are not ratings, endorsements, or release
 * approvals.
 */
export const volumeResearchMap: VolumeResearchItem[] = seriesItems.map((volume) => ({
  ...volume,
  papers: ssrnPreprintDocuments
    .filter((paper) => paper.volume === volume.volume)
    .sort((left, right) => (right.metrics?.downloads ?? -1) - (left.metrics?.downloads ?? -1)),
}));
