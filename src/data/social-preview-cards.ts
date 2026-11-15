type SocialPreviewCard = {
  src: string;
  alt: string;
  type: "image/jpeg";
  width: 1200;
  height: 630;
};

const socialPreviewCards: Record<string, SocialPreviewCard> = {
  "/": {
    src: "/social-cards/brand-home-v2.jpg",
    alt: "Follow the evidence. — Institutions, economics, and technology. A civic building and a check mark represent public review.",
    type: "image/jpeg",
    width: 1200,
    height: 630,
  },
  "/start/": {
    src: "/social-cards/start-here.jpg",
    alt: "Start with a question. A guided entry to Independent Observer.",
    type: "image/jpeg",
    width: 1200,
    height: 630,
  },
  "/library/": {
    src: "/social-cards/public-library.jpg",
    alt: "Find your next useful read in the Independent Observer Public Research Library.",
    type: "image/jpeg",
    width: 1200,
    height: 630,
  },
  "/about/": {
    src: "/social-cards/about.jpg",
    alt: "About Independent Observer by Siddhartha Harsh Wardhan.",
    type: "image/jpeg",
    width: 1200,
    height: 630,
  },
  "/press/": {
    src: "/social-cards/press.jpg",
    alt: "Press, research and collaboration information for Independent Observer.",
    type: "image/jpeg",
    width: 1200,
    height: 630,
  },
  "/library/documents/who-deported-more/": {
    src: "/social-cards/who-deported-more.jpg",
    alt: "Who Deported More? A Guide to Comparing Deportation Statistics.",
    type: "image/jpeg",
    width: 1200,
    height: 630,
  },
  "/research/the-last-human-workforce/": {
    src: "/social-cards/brand-workforce-v2.jpg",
    alt: "When AI changes the work — Tasks, evidence, and who gains. Connected task cards show a workflow with separate review paths.",
    type: "image/jpeg",
    width: 1200,
    height: 630,
  },
  "/research/factories-return-but-do-the-jobs/": {
    src: "/social-cards/brand-factories-v2.jpg",
    alt: "The factory is back. Are the jobs? — Output, wages, and ownership. An outline of a factory illustrates the question about jobs.",
    type: "image/jpeg",
    width: 1200,
    height: 630,
  },
  "/research/democracys-achilles-heel/": {
    src: "/social-cards/brand-democracy-v2.jpg",
    alt: "After the ballot is counted — Access, information, and review. A civic building and a check mark represent a route to review.",
    type: "image/jpeg",
    width: 1200,
    height: 630,
  },
  "/research/the-server-as-a-furnace/": {
    src: "/social-cards/brand-furnace-v2.jpg",
    alt: "Where does the server heat go? — What makes heat recovery useful. Curved lines represent separate paths for moving heat.",
    type: "image/jpeg",
    width: 1200,
    height: 630,
  },
  "/podcast/": {
    src: "/social-cards/podcast.jpg",
    alt: "History Across the Volumes: four Independent Observer audio essays.",
    type: "image/jpeg",
    width: 1200,
    height: 630,
  },
};

export function socialPreviewCardForPath(path: string): SocialPreviewCard | undefined {
  return socialPreviewCards[path];
}

export { socialPreviewCards };
