type SocialPreviewCard = {
  src: string;
  alt: string;
  type: "image/jpeg";
  width: 1200;
  height: 630;
};

const socialPreviewCards: Record<string, SocialPreviewCard> = {
  "/": {
    src: "/social-cards/home.jpg",
    alt: "Independent Observer: Observe the system. Question the frame.",
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
    src: "/social-cards/last-human-workforce.jpg",
    alt: "The Last Human Workforce: Task Bundles, Automation, and Transition Design.",
    type: "image/jpeg",
    width: 1200,
    height: 630,
  },
  "/research/factories-return-but-do-the-jobs/": {
    src: "/social-cards/factories-return.jpg",
    alt: "Factories Return but Do the Jobs: reshoring, work, wages and ownership.",
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
