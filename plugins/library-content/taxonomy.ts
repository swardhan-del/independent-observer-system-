import entries from "./taxonomy.generated.json";
export type TaxonomyEntry = {
  id: string;
  title: string;
  volume: string;
  branch: string;
  summary: string;
  status: string;
  href?: string;
};
export const taxonomyEntries: TaxonomyEntry[] = entries;
export const taxonomyVolumes = ["Volume I", "Volume II", "Volume III", "Volume IV"] as const;
export const taxonomyBranches = [...new Set(taxonomyEntries.map((entry) => entry.branch))].sort();
