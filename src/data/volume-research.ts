import { byReadingUsefulness } from "./scholarly-clarity";
import type { PublicDocument } from "./documents";
import { seriesItems, type SeriesItem } from "./series";
import { paperDocuments } from "./papers";

export type VolumeResearchItem = SeriesItem & {
  papers: PublicDocument[];
};

/**
 * Public reading signals for the four-volume roadmap. Editorial reading usefulness determines order. Archived usage is not a quality rating.
 */
export const volumeResearchMap: VolumeResearchItem[] = seriesItems.map((volume) => ({
  ...volume,
  papers: paperDocuments
    .filter((paper) => paper.volume === volume.volume)
    .sort(byReadingUsefulness),
}));
