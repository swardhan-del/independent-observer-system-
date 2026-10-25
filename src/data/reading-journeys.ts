import { publicDocumentItems } from "./documents";
export const readingJourneys = [
  {
    id: "method",
    title: "How do we know what to trust?",
    introduction:
      "Start with observation, then examine the gap between public claims and the institutions behind them.",
    episode: 1,
    continuations: [
      {
        href: "/research/the-independent-observer-method/",
        label: "Evidence and correction: The Independent Observer Method",
        format: "Published bounded article",
      },
      {
        href: "/research/lawsuits-are-illusions-where-institutional-power-actually-resides/",
        label: "Institutions and usable remedies: Lawsuits Are Illusions",
        format: "Concept in editorial development",
      },
    ],
    papers: ["independent-observer-volume-one", "the-illusion-of-equality", "who-deported-more"],
  },
  {
    id: "power",
    title: "Where does public power come from?",
    introduction:
      "Follow historical power shifts into institutions, sovereignty, and economic dependence.",
    episode: 2,
    continuations: [
      {
        href: "/research/democracys-achilles-heel/",
        label: "Institutional incentives: Democracy’s Achilles’ Heel",
        format: "Published bounded article",
      },
    ],
    papers: [
      "from-colonization-to-chinas-rise",
      "the-american-empire-was-never-a-democracy",
      "geography-of-enslaved-wealth",
    ],
  },
  {
    id: "work",
    title: "Who carries the cost of change?",
    introduction:
      "Connect work, taxation, and unequal demands on time to the question of economic security.",
    episode: 3,
    continuations: [
      {
        href: "/collections/ai-work-and-infrastructure/",
        label: "Continue into AI, infrastructure, energy and labor",
        format: "Collection of three published bounded articles",
      },
    ],
    papers: ["from-vietnam-to-terry-ohio", "wardhan-tax-doctrine", "double-tax-on-time"],
  },
  {
    id: "capability",
    title: "What does technology make possible?",
    introduction:
      "Explore AI, intimacy, education, and the infrastructure behind scientific capability.",
    episode: 4,
    continuations: [
      {
        href: "/library/documents/when-real-science-becomes-science-fiction/",
        label: "Science literacy: When Real Science Becomes Science Fiction",
        format: "Working-paper synopsis",
      },
      {
        href: "/research/regrowing-humanity/",
        label: "Medical technology and capability: Regrowing Humanity",
        format: "Bounded public preview",
      },
    ],
    papers: ["disconnected-hearts", "entanglement-primer", "lottery-of-luck"],
  },
].map((journey) => ({
  ...journey,
  papers: journey.papers.map((id) => {
    const record = publicDocumentItems.find((item) => item.id === id);
    if (!record) throw new Error(`Reading journey references unknown public paper: ${id}`);
    return record;
  }),
}));
