import { byReadingUsefulness } from "./scholarly-clarity";
import type { PublicDocument } from "./documents";
import { seriesItems, type SeriesItem } from "./series";
import { paperDocuments } from "./papers";
import { curatedResearchDocuments } from "./research-curation-2026-09-13";

export type VolumeResearchItem = SeriesItem & {
  papers: PublicDocument[];
};

const publicVolumeDocuments = [...paperDocuments, ...curatedResearchDocuments];

/**
 * Public reading signals for the four-volume roadmap. Editorial reading usefulness determines order. Archived usage is not a quality rating.
 */
export const volumeResearchMap: VolumeResearchItem[] = seriesItems.map((volume) => ({
  ...volume,
  papers: publicVolumeDocuments
    .filter((paper) => paper.volume === volume.volume)
    .sort(byReadingUsefulness),
}));
