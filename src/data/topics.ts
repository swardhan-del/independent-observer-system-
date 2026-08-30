import { documentaryItems, researchItems, videoItems } from "./content";
import { seriesItems } from "./series";
import { ssrnPreprintDocuments } from "./ssrn";
import { slugify } from "../lib/slugs";
import { sitePath } from "../lib/paths";

export type TopicRelatedItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  status: string;
  href: string;
  type: string;
  volume?: string;
};

export type TopicHub = {
  name: string;
  slug: string;
  description: string;
  reviewIntro?: string;
  related: TopicRelatedItem[];
};

const allItems = [
  ...researchItems.map((item) => ({
    ...item,
    id: slugify(item.title),
    href: sitePath(`/research/${slugify(item.title)}/`),
    type: "Research preview",
  })),
  ...documentaryItems.map((item) => ({
    ...item,
    id: slugify(item.title),
    href: sitePath(`/documentaries/${slugify(item.title)}/`),
    type: "Documentary preview",
  })),
  ...videoItems.map((item) => ({
    ...item,
    id: slugify(item.title),
    href: sitePath(`/videos/${slugify(item.title)}/`),
    type: "Video preview",
  })),
  ...seriesItems.map((item) => ({
    ...item,
    id: slugify(item.title),
    href: sitePath(`/series/${slugify(item.title)}/`),
    type: item.volume,
  })),
  ...ssrnPreprintDocuments.map((item) => ({
    id: item.id,
    title: item.title,
    category: item.category,
    description: item.description,
    status: item.status ?? "SSRN preprint",
    href: sitePath(`/library/documents/${item.id}/`),
    type: "SSRN preprint",
    volume: item.volume,
  })),
];

const topicMatches: Record<string, string[]> = {
  history: [
    "Independent Observer",
    "The Empire Beneath Democracy",
    "The Martian Illusion",
    "From Colonization to China’s Rise: How Historical Power Shifts Still Shape Global Politics and Democracy",
    "Independent Observer: Critical Studies in Philosophy, Politics, Economics, and History — Volume I (Foundational Manifesto)",
  ],
  politics: [
    "Could America Leave NATO?",
    "Lawsuits Are Illusions: Where Institutional Power Actually Resides",
    "Independent Observer",
    "The Latino Irony: Why Many Hispanic Americans Support Donald Trump",
    "From Colonization to China’s Rise: How Historical Power Shifts Still Shape Global Politics and Democracy",
  ],
  economics: [
    "The Welfare Paradox",
    "Managed Decline",
    "The Last Human Workforce",
    "The Wardhan Tax Doctrine: Time-as-Deduction, W-2 Relief, and an Eisenhower-Era Return to Progressivity",
    "The Double Tax on Time: Why Women Pay for Both Biology and Bureaucracy",
  ],
  law: [
    "Lawsuits Are Illusions: Where Institutional Power Actually Resides",
    "Why Evidence Alone Is Not Enough",
    "Could America Leave NATO?",
    "Independent Observer: Critical Studies in Philosophy, Politics, Economics, and History — Volume I (Foundational Manifesto)",
  ],
  science: [
    "The Autonomous Illusion",
    "The Martian Illusion",
    "The Last Human Workforce",
    "Disconnected Hearts — The Tech Revolution of Intimacy",
  ],
  technology: [
    "The Autonomous Illusion",
    "The Last Human Workforce",
    "The Martian Illusion",
    "Disconnected Hearts — The Tech Revolution of Intimacy",
  ],
};

export const topicHubs: TopicHub[] = [
  {
    name: "History",
    slug: "history",
    description:
      "History is a way to trace how colonization, industrialization, constitutional design, political ritual, and public memory continue to distribute power in the present—not a timeline of disconnected events.",
    reviewIntro:
      "History on this site is treated as an active system, not as background chronology. The current research map follows how colonization, industrialization, constitutional design, political ritual, and public memory continue to shape power in the present. A public preprint, From Colonization to China’s Rise, reads historical power shifts through knowledge extraction, inequality, institutional control, and strategic economic design—not only through military events. The four-volume map carries those questions into Volume I’s evidence and democratic capacity, Volume II’s sovereignty and enforcement, and Volume III’s labor, taxation, and social citizenship. Other mapped directions examine state funerals, structural literacy, and institutional memory. These are public-safe research signals; underlying drafts remain unlinked and unpublished until the owner closes the human release gate.",
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
