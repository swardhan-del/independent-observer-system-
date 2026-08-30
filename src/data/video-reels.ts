export type VolumeReel = {
  volume: "Volume I" | "Volume II" | "Volume III" | "Volume IV";
  volumeTitle: string;
  title: string;
  category: string;
  description: string;
  mediaUrl: string;
  mediaType: "video/mp4";
  sourceLabel: string;
  sourceNote: string;
  volumeHref: string;
};

/**
 * Public-safe media previews selected from the organized video archive.
 * These players are preview assets; they do not assert publication approval.
 */
export const volumeReels: VolumeReel[] = [
  {
    volume: "Volume I",
    volumeTitle: "Independent Observer",
    title: "When Evidence Meets Institutional Denial",
    category: "Institutions, Bureaucracy & Evidence",
    description:
      "A visual entry into Volume I’s method: timelines, contradictions, and surviving records that let readers distinguish what was observed from what an institution says happened.",
    mediaUrl: "/media/reels/volume-i-evidence-and-institutional-denial.mp4",
    mediaType: "video/mp4",
    sourceLabel: "Organized video export · high-confidence subject classification",
    sourceNote: "Preview asset · release review remains separate",
    volumeHref: "/series/independent-observer/",
  },
  {
    volume: "Volume II",
    volumeTitle: "The Empire Beneath Democracy",
    title: "The Architect’s Blueprint",
    category: "Institutions, Power & State Capacity",
    description:
      "A systems-level visual treatment of institutional design and state capacity, opening Volume II’s question of how power is structured beneath formal democratic language.",
    mediaUrl: "/media/reels/volume-ii-the-architects-blueprint.mp4",
    mediaType: "video/mp4",
    sourceLabel: "Organized long-form video export · institution and power classification",
    sourceNote: "Preview asset · release review remains separate",
    volumeHref: "/series/the-empire-beneath-democracy/",
  },
  {
    volume: "Volume III",
    volumeTitle: "Managed Decline",
    title: "Factory Labor, Wages, and Economic Power",
    category: "Economy, Labor & Social Policy",
    description:
      "A visual argument about factory labor, wages, and economic power—the material starting point for Volume III’s study of work, taxation, time, and social citizenship.",
    mediaUrl: "/media/reels/volume-iii-factory-labor-and-economic-power.mp4",
    mediaType: "video/mp4",
    sourceLabel: "Organized video export · high-confidence labor classification",
    sourceNote: "Preview asset · release review remains separate",
    volumeHref: "/series/managed-decline/",
  },
  {
    volume: "Volume IV",
    volumeTitle: "The Last Human Workforce",
    title: "Engineering the Brainstem: The 3D Cranial Traversal",
    category: "Science, Medicine & Human Capability",
    description:
      "A three-dimensional science preview for Volume IV, where technical possibility is tested against embodied knowledge, education, care, institutions, and the human work required to make capability real.",
    mediaUrl: "/media/reels/volume-iv-engineering-the-brainstem.mp4",
    mediaType: "video/mp4",
    sourceLabel: "Organized science video export · high-confidence anatomy classification",
    sourceNote: "Preview asset · release review remains separate",
    volumeHref: "/series/the-last-human-workforce/",
  },
];
