import entries from "./taxonomy.generated.json";
import { websiteFeedReadingLinks } from "../../src/data/website-feed-reading-2026-09-18";
export type TaxonomyEntry = {
  id: string;
  title: string;
  volume: string;
  branch: string;
  summary: string;
  status: string;
  href?: string;
};
export const taxonomyEntries: TaxonomyEntry[] = entries.map((entry) => {
  const reading = websiteFeedReadingLinks.find((item) => item.taxonomyId === entry.id);
  return reading
    ? {
        ...entry,
        status:
          entry.id === "paper-the-fear-circuit"
            ? "Research hypothesis · bounded reading available · scientific review outstanding"
            : "Author working paper · bounded reading available",
        href: `/library/documents/${reading.id}/`,
      }
    : entry;
});
export const taxonomyVolumes = ["Volume I", "Volume II", "Volume III", "Volume IV"] as const;
export const taxonomyBranches = [...new Set(taxonomyEntries.map((entry) => entry.branch))].sort();
