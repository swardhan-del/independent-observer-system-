/**
 * Public-safe topic discovery metadata derived from the dated Website Publication Audit
 * and its human approval copy plan (2026-08-22).
 *
 * This is a discovery layer, not a publication feed. It contains no manuscript text,
 * private paths, credentials, or release authorization.
 */
export type TopicPluginDefinition = {
  slug: string;
  name: string;
  kicker: string;
  question: string;
  method: string;
};

export type TopicPathway = {
  id: string;
  label: string;
  question: string;
  description: string;
  topicSlugs: string[];
};

export type ReviewQueueSignal = {
  title: string;
  status: "Awaiting human release";
  category: string;
  description: string;
  topicSlugs: string[];
};

export const topicPluginDefinitions: TopicPluginDefinition[] = [
  {
    slug: "history",
    name: "History",
    kicker: "Inheritance and power",
    question: "Which past arrangements are still doing work in the present?",
    method: "Trace institutions, resource flows, and power shifts across time.",
  },
  {
    slug: "politics",
    name: "Politics",
    kicker: "Authority and legitimacy",
    question: "Who can make a decision, and who can make it matter?",
    method: "Read public authority through rules, incentives, enforcement, and capacity.",
  },
  {
    slug: "economics",
    name: "Economics",
    kicker: "Work and distribution",
    question: "Who carries the cost of change, and who captures its gains?",
    method: "Follow labor, taxation, markets, welfare, and the distribution of risk.",
  },
  {
    slug: "law",
    name: "Law",
    kicker: "Procedure and remedy",
    question: "What must happen before a documented harm can receive a remedy?",
    method: "Separate written rules, institutional procedure, evidence, and practical access.",
  },
  {
    slug: "science",
    name: "Science",
    kicker: "Evidence and uncertainty",
    question: "What is demonstrated, what is inferred, and what remains unknown?",
    method: "Make methods, sources, limitations, and the boundaries of a claim visible.",
  },
  {
    slug: "technology",
    name: "Technology",
    kicker: "Systems and capability",
    question: "What infrastructure and human work remain behind the promise of automation?",
    method: "Examine computing, energy, data, maintenance, labor, and institutional adaptation.",
  },
];

export const topicPathways: TopicPathway[] = [
  {
    id: "method",
    label: "Understand the method",
    question: "How does Independent Observer separate evidence from interpretation?",
    description:
      "Begin with the method anchor, then move through democratic capacity and public reasoning.",
    topicSlugs: ["law", "politics", "history"],
  },
  {
    id: "ai-labor",
    label: "Explore AI and labor",
    question:
      "What changes when automation is treated as a whole system rather than a software feature?",
    description:
      "Follow work, infrastructure, task exposure, and the institutions that shape transition.",
    topicSlugs: ["technology", "economics", "science"],
  },
  {
    id: "democracy",
    label: "Explore democracy and institutions",
    question: "How do authority, law, history, and public capacity interact?",
    description:
      "Compare formal legitimacy with the procedures and resources that make institutions usable.",
    topicSlugs: ["politics", "law", "history"],
  },
  {
    id: "human-capability",
    label: "Explore science and human capability",
    question: "Where do evidence, medical possibility, energy, and human limits meet?",
    description:
      "Read the science and technology map with its uncertainty and release boundaries visible.",
    topicSlugs: ["science", "technology"],
  },
  {
    id: "migration",
    label: "Explore migration and political economy",
    question: "How do movement, enforcement, labor, and distribution shape public life?",
    description:
      "Connect demographic change to institutions, work, borders, and the allocation of risk.",
    topicSlugs: ["economics", "politics", "history"],
  },
];

/**
 * Safe release signals only. The underlying drafts remain in Dropbox and are not linked as
 * articles here. The status is intentionally visible so a fuller archive does not look like
 * an approved publication catalogue.
 */
export const reviewQueueSignals: ReviewQueueSignal[] = [
  {
    title:
      "Regrowing Humanity: How Robotic Limbs Are Becoming Integrated Extensions of the Human Body",
    status: "Awaiting human release",
    category: "Science & Technology",
    description:
      "Green conversion candidate with a reviewed evidence package; author, rights, web adaptation, and final accessibility gates remain.",
    topicSlugs: ["science", "technology"],
  },
  {
    title: "The Independent Observer Method",
    status: "Awaiting human release",
    category: "Method & Democratic Capacity",
    description:
      "Web-ready method draft held for the owner’s release decision and final publication checks.",
    topicSlugs: ["history", "politics", "law"],
  },
  {
    title: "The Last Human Workforce",
    status: "Awaiting human release",
    category: "AI & Human Capability",
    description:
      "Web-ready research draft held while evidence, rights, controller, and publication gates are reviewed.",
    topicSlugs: ["technology", "economics", "science"],
  },
  {
    title: "The Server as a Furnace",
    status: "Awaiting human release",
    category: "Technology & Energy",
    description: "Web-ready research draft held for source, rights, and final editorial review.",
    topicSlugs: ["technology", "science", "economics"],
  },
  {
    title: "Borrowed Labor",
    status: "Awaiting human release",
    category: "Labor & Political Economy",
    description:
      "Web-ready research draft held for evidence, overlap, provenance, and human approval checks.",
    topicSlugs: ["economics", "politics", "history"],
  },
  {
    title: "Democracy’s Achilles’ Heel",
    status: "Awaiting human release",
    category: "Democracy & Institutions",
    description:
      "Web-ready research draft held for example, overlap, interpretive-label, rights, and human approval checks.",
    topicSlugs: ["politics", "law", "history"],
  },
];

export function topicPluginFor(slug: string): TopicPluginDefinition {
  return topicPluginDefinitions.find((topic) => topic.slug === slug) ?? topicPluginDefinitions[0];
}

export function reviewQueueForTopic(slug: string): ReviewQueueSignal[] {
  return reviewQueueSignals.filter((signal) => signal.topicSlugs.includes(slug));
}
