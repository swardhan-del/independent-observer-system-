import { documentaryItems, researchItems, videoItems, type EditorialItem } from "./content";
import { seriesItems, type SeriesItem } from "./series";
import { slugify } from "../lib/slugs";
import { sitePath } from "../lib/paths";

export type TopicHub = {
  name: string;
  slug: string;
  description: string;
  related: Array<
    (EditorialItem & { href: string; type: string }) | (SeriesItem & { href: string; type: string })
  >;
};

const allItems = [
  ...researchItems.map((item) => ({
    ...item,
    href: sitePath(`/research/${slugify(item.title)}/`),
    type: "Research preview",
  })),
  ...documentaryItems.map((item) => ({
    ...item,
    href: sitePath(`/documentaries/${slugify(item.title)}/`),
    type: "Documentary preview",
  })),
  ...videoItems.map((item) => ({
    ...item,
    href: sitePath(`/videos/${slugify(item.title)}/`),
    type: "Video preview",
  })),
  ...seriesItems.map((item) => ({
    ...item,
    href: sitePath(`/series/${slugify(item.title)}/`),
    type: item.volume,
  })),
];

const topicMatches: Record<string, string[]> = {
  history: ["Independent Observer", "The Empire Beneath Democracy", "The Martian Illusion"],
  politics: [
    "Could America Leave NATO?",
    "Lawsuits Are Illusions: Where Institutional Power Actually Resides",
    "Independent Observer",
  ],
  economics: ["The Welfare Paradox", "Managed Decline", "The Last Human Workforce"],
  law: [
    "Lawsuits Are Illusions: Where Institutional Power Actually Resides",
    "Why Evidence Alone Is Not Enough",
    "Could America Leave NATO?",
  ],
  science: ["The Autonomous Illusion", "The Martian Illusion", "The Last Human Workforce"],
  technology: ["The Autonomous Illusion", "The Last Human Workforce", "The Martian Illusion"],
};

export const topicHubs: TopicHub[] = [
  {
    name: "History",
    slug: "history",
    description:
      "Power shifts, institutional inheritance, and the decisions that remain active in the present.",
    related: [],
  },
  {
    name: "Politics",
    slug: "politics",
    description:
      "Public authority examined beyond party slogans, campaign cycles, and simplified institutional stories.",
    related: [],
  },
  {
    name: "Economics",
    slug: "economics",
    description: "Labor, taxation, markets, welfare, and the distribution of risk and reward.",
    related: [],
  },
  {
    name: "Law",
    slug: "law",
    description:
      "Rules, remedies, procedure, and the conditions under which public evidence can receive review.",
    related: [],
  },
  {
    name: "Science",
    slug: "science",
    description:
      "Evidence, energy, capability, scientific uncertainty, and the limits of confident forecasts.",
    related: [],
  },
  {
    name: "Technology",
    slug: "technology",
    description:
      "Automation, artificial intelligence, computing infrastructure, and the institutions that shape technical change.",
    related: [],
  },
].map((topic) => ({
  ...topic,
  related: topicMatches[topic.slug].flatMap((title) =>
    allItems.filter((item) => item.title === title),
  ),
}));
