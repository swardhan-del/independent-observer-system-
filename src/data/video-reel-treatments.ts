export type ReelTreatment = {
  volume: "Volume I" | "Volume II" | "Volume III" | "Volume IV";
  title: string;
  category: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  volumeHref: string;
};

const volumeVisuals = {
  "Volume I": {
    imageSrc: "/volume-illustrations/volume-i-observation.jpg",
    imageAlt: "Editorial collage of an observation lens, layered records, and linked public nodes.",
    volumeHref: "/series/independent-observer/",
  },
  "Volume II": {
    imageSrc: "/volume-illustrations/volume-ii-sovereignty.jpg",
    imageAlt:
      "Editorial collage of civic buildings, map layers, legal pathways, and connected institutions.",
    volumeHref: "/series/the-empire-beneath-democracy/",
  },
  "Volume III": {
    imageSrc: "/volume-illustrations/volume-iii-distribution.jpg",
    imageAlt:
      "Editorial collage of industrial and service work, a time grid, public infrastructure, and balanced pathways.",
    volumeHref: "/series/managed-decline/",
  },
  "Volume IV": {
    imageSrc: "/volume-illustrations/volume-iv-capability.jpg",
    imageAlt:
      "Editorial collage of a human figure connected to laboratory instruments, energy, compute, and care systems.",
    volumeHref: "/series/the-last-human-workforce/",
  },
} as const;

const treatment = (
  volume: ReelTreatment["volume"],
  title: string,
  category: string,
  description: string,
): ReelTreatment => ({
  volume,
  title,
  category,
  description,
  ...volumeVisuals[volume],
});

/**
 * Public storyboard treatments for additional reels. They are not playable media or release
 * approvals; the four entries in data/video-reels.ts remain the only current players.
 */
export const reelTreatments: ReelTreatment[] = [
  treatment(
    "Volume I",
    "The Record Before the Reaction",
    "Method · evidence · public memory",
    "A visual treatment that follows a claim from source and date to context, contradiction, and a correction path before the audience is asked to judge.",
  ),
  treatment(
    "Volume I",
    "When a Fact Fails to Travel",
    "Attention · institutions · accountability",
    "A storyboard about the distance between documented evidence and institutional response: who notices, who authenticates, and which procedures carry a record forward.",
  ),
  treatment(
    "Volume II",
    "Who Gets to Set the Agenda?",
    "Power · representation · enforcement",
    "A systems treatment tracing how agenda-setting, unequal representation, lobbying, and enforcement shape practical sovereignty beneath formal democratic language.",
  ),
  treatment(
    "Volume II",
    "The Border Is an Institution",
    "Migration · citizenship · membership",
    "A documentary outline that treats movement and belonging as administrative systems, asking whose category, record, and appeal becomes visible.",
  ),
  treatment(
    "Volume III",
    "Hours, Tax, and the Cost of Change",
    "Work · time · taxation",
    "A visual route from hours worked to ownership, tax design, welfare access, and the unequal capacity to absorb an economic transition.",
  ),
  treatment(
    "Volume III",
    "From Steel to Screens",
    "Deindustrialization · labor · security",
    "A before-and-after treatment of industrial, service, platform, and data work that keeps the distribution of time and security visible.",
  ),
  treatment(
    "Volume IV",
    "Capability Has a Supply Chain",
    "AI · energy · infrastructure",
    "A visual systems map connecting compute, energy, semiconductors, maintenance, education, and governance to the promise of advanced technology.",
  ),
  treatment(
    "Volume IV",
    "The Human Loop",
    "Science · care · adaptation",
    "A treatment about embodied knowledge, neurotechnology, intimacy, and care: capability becomes real only when people can understand, maintain, and govern it.",
  ),
];
