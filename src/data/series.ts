import type { EditorialStatus } from "./content";

/**
 * Public-safe roadmap metadata derived from the Dropbox review package dated
 * 2026-08-15. These are review candidates, not publication or KDP approvals.
 */
export type SeriesItem = {
  volume: string;
  title: string;
  category: string;
  description: string;
  status: EditorialStatus;
};

export const seriesItems: SeriesItem[] = [
  {
    volume: "Volume I",
    title: "The Independent Observer",
    category: "Democratic capacity",
    description:
      "A review-stage foundation for thinking about legitimacy, attention, evidence, public memory, and the practical capacity to use democratic institutions.",
    status: "In editorial development",
  },
  {
    volume: "Volume II",
    title: "The Empire Beneath Democracy",
    category: "Sovereignty and interdependence",
    description:
      "A concept-stage examination of how constitutional design, enforcement, alliances, markets, and research policy distribute political power.",
    status: "Concept preview",
  },
  {
    volume: "Volume III",
    title: "Managed Decline",
    category: "Work and social citizenship",
    description:
      "A concept-stage account of how labor markets, licensing, welfare, taxation, health systems, and public visibility shape economic insecurity.",
    status: "Concept preview",
  },
  {
    volume: "Volume IV",
    title: "The Last Human Workforce",
    category: "AI and human capability",
    description:
      "A review-stage framework for task exposure, augmentation, education, scientific capacity, and institutional adaptation in the age of AI.",
    status: "In editorial development",
  },
];
