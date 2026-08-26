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
  volumeLabels: string[];
  primaryVolumeLabel: string;
  coreIdeas: string[];
  contentLinks: PathwayContentLink[];
};

export type PathwayContentLink = {
  kind:
    | "Series roadmap"
    | "SSRN preprint"
    | "Research preview"
    | "Documentary preview"
    | "Video preview";
  label: string;
  path: string;
};

export type VolumeTopicConnection = {
  lens: string;
  topicSlugs: string[];
  coreIdeas: string[];
  contentLinks: PathwayContentLink[];
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
    volumeLabels: ["Volume I", "Volume II"],
    primaryVolumeLabel: "Volume I",
    coreIdeas: [
      "Define the terms before drawing the conclusion.",
      "Keep documented fact, interpretation, and uncertainty visibly separate.",
      "Treat correction, limitation, and public reasoning as part of the method.",
    ],
    contentLinks: [
      {
        kind: "Series roadmap",
        label: "Independent Observer · Volume I",
        path: "/series/independent-observer/",
      },
      {
        kind: "SSRN preprint",
        label: "Independent Observer: Volume I foundational manifesto",
        path: "/library/documents/independent-observer-volume-one-ssrn/",
      },
      {
        kind: "Research preview",
        label: "Lawsuits Are Illusions",
        path: "/research/lawsuits-are-illusions-where-institutional-power-actually-resides/",
      },
      {
        kind: "Video preview",
        label: "Why Evidence Alone Is Not Enough",
        path: "/videos/why-evidence-alone-is-not-enough/",
      },
    ],
  },
  {
    id: "ai-labor",
    label: "Explore AI and labor",
    question:
      "What changes when automation is treated as a whole system rather than a software feature?",
    description:
      "Follow work, infrastructure, task exposure, and the institutions that shape transition.",
    topicSlugs: ["technology", "economics", "science"],
    volumeLabels: ["Volume III", "Volume IV"],
    primaryVolumeLabel: "Volume IV",
    coreIdeas: [
      "Treat automation as infrastructure, not only as software.",
      "Distinguish task substitution from augmentation, supervision, and hidden labor.",
      "Follow compute, energy, data, maintenance, and institutional adaptation.",
    ],
    contentLinks: [
      {
        kind: "Series roadmap",
        label: "The Last Human Workforce · Volume IV",
        path: "/series/the-last-human-workforce/",
      },
      {
        kind: "Research preview",
        label: "The Autonomous Illusion",
        path: "/research/the-autonomous-illusion/",
      },
      {
        kind: "SSRN preprint",
        label: "Disconnected Hearts — The Tech Revolution of Intimacy",
        path: "/library/documents/disconnected-hearts-ssrn/",
      },
      {
        kind: "SSRN preprint",
        label: "The Double Tax on Time",
        path: "/library/documents/double-tax-on-time-ssrn/",
      },
    ],
  },
  {
    id: "democracy",
    label: "Explore democracy and institutions",
    question: "How do authority, law, history, and public capacity interact?",
    description:
      "Compare formal legitimacy with the procedures and resources that make institutions usable.",
    topicSlugs: ["politics", "law", "history"],
    volumeLabels: ["Volume I", "Volume II", "Volume IV"],
    primaryVolumeLabel: "Volume I",
    coreIdeas: [
      "Separate formal legitimacy from the capacity to make institutions usable.",
      "Read law, procedure, enforcement, and evidence together.",
      "Ask who can decide, who can review, and who bears the consequences.",
      "Test how scientific and technical capacity changes institutional action.",
    ],
    contentLinks: [
      {
        kind: "Series roadmap",
        label: "Independent Observer · Volume I",
        path: "/series/independent-observer/",
      },
      {
        kind: "Series roadmap",
        label: "The Empire Beneath Democracy · Volume II",
        path: "/series/the-empire-beneath-democracy/",
      },
      {
        kind: "SSRN preprint",
        label: "From Colonization to China’s Rise",
        path: "/library/documents/from-colonization-to-chinas-rise-ssrn/",
      },
      {
        kind: "Documentary preview",
        label: "Could America Leave NATO?",
        path: "/documentaries/could-america-leave-nato/",
      },
      {
        kind: "Series roadmap",
        label: "The Last Human Workforce · Volume IV",
        path: "/series/the-last-human-workforce/",
      },
      {
        kind: "Research preview",
        label: "The Autonomous Illusion",
        path: "/research/the-autonomous-illusion/",
      },
    ],
  },
  {
    id: "human-capability",
    label: "Explore science and human capability",
    question: "Where do evidence, medical possibility, energy, and human limits meet?",
    description:
      "Read the science and technology map with its uncertainty and release boundaries visible.",
    topicSlugs: ["science", "technology"],
    volumeLabels: ["Volume IV"],
    primaryVolumeLabel: "Volume IV",
    coreIdeas: [
      "Make evidence, uncertainty, and release boundaries visible.",
      "Distinguish human augmentation from claims of human replacement.",
      "Connect medicine, energy, infrastructure, and human limits without inventing certainty.",
    ],
    contentLinks: [
      {
        kind: "Series roadmap",
        label: "The Last Human Workforce · Volume IV",
        path: "/series/the-last-human-workforce/",
      },
      {
        kind: "Research preview",
        label: "The Autonomous Illusion",
        path: "/research/the-autonomous-illusion/",
      },
      {
        kind: "SSRN preprint",
        label: "Disconnected Hearts — The Tech Revolution of Intimacy",
        path: "/library/documents/disconnected-hearts-ssrn/",
      },
      {
        kind: "Documentary preview",
        label: "The Martian Illusion",
        path: "/documentaries/the-martian-illusion/",
      },
    ],
  },
  {
    id: "migration",
    label: "Explore migration and political economy",
    question: "How do movement, enforcement, labor, and distribution shape public life?",
    description:
      "Connect demographic change to institutions, work, borders, and the allocation of risk.",
    topicSlugs: ["economics", "politics", "history"],
    volumeLabels: ["Volume II", "Volume III"],
    primaryVolumeLabel: "Volume II",
    coreIdeas: [
      "Define removals, returns, expulsions, and migration categories before comparison.",
      "Read movement through enforcement, labor, institutions, and political memory.",
      "Connect demographic change to distribution and the allocation of public risk.",
    ],
    contentLinks: [
      {
        kind: "Series roadmap",
        label: "The Empire Beneath Democracy · Volume II",
        path: "/series/the-empire-beneath-democracy/",
      },
      {
        kind: "SSRN preprint",
        label: "Who Deported More?",
        path: "/library/documents/who-deported-more-ssrn/",
      },
      {
        kind: "SSRN preprint",
        label: "The Latino Irony",
        path: "/library/documents/latino-irony-ssrn/",
      },
      {
        kind: "SSRN preprint",
        label: "From Colonization to China’s Rise",
        path: "/library/documents/from-colonization-to-chinas-rise-ssrn/",
      },
      {
        kind: "Series roadmap",
        label: "Managed Decline · Volume III",
        path: "/series/managed-decline/",
      },
    ],
  },
];

/**
 * The four-volume spine is the primary relationship on the Topics page. Topic hubs are lenses
 * on these volumes, not separate collections competing for attention.
 */
export const volumeTopicConnections: Record<string, VolumeTopicConnection> = {
  "Volume I": {
    lens: "Foundation, evidence, and democratic capacity",
    topicSlugs: ["history", "politics", "law"],
    coreIdeas: [
      "Method before conclusion: define evidence, interpretation, and uncertainty.",
      "Democratic capacity depends on usable institutions, not only formal legitimacy.",
      "Public memory and correction are part of institutional accountability.",
    ],
    contentLinks: [
      {
        kind: "SSRN preprint",
        label: "Independent Observer: Volume I foundational manifesto",
        path: "/library/documents/independent-observer-volume-one-ssrn/",
      },
      {
        kind: "Research preview",
        label: "Lawsuits Are Illusions",
        path: "/research/lawsuits-are-illusions-where-institutional-power-actually-resides/",
      },
      {
        kind: "Video preview",
        label: "Why Evidence Alone Is Not Enough",
        path: "/videos/why-evidence-alone-is-not-enough/",
      },
    ],
  },
  "Volume II": {
    lens: "Sovereignty, institutions, and public power",
    topicSlugs: ["history", "politics", "economics"],
    coreIdeas: [
      "Sovereignty is shaped by constitutional design, enforcement, alliances, and markets.",
      "Historical power shifts remain active in present political arrangements.",
      "Migration, demography, and public authority are connected questions.",
    ],
    contentLinks: [
      {
        kind: "SSRN preprint",
        label: "Who Deported More?",
        path: "/library/documents/who-deported-more-ssrn/",
      },
      {
        kind: "SSRN preprint",
        label: "The Latino Irony",
        path: "/library/documents/latino-irony-ssrn/",
      },
      {
        kind: "SSRN preprint",
        label: "From Colonization to China’s Rise",
        path: "/library/documents/from-colonization-to-chinas-rise-ssrn/",
      },
      {
        kind: "Documentary preview",
        label: "Could America Leave NATO?",
        path: "/documentaries/could-america-leave-nato/",
      },
    ],
  },
  "Volume III": {
    lens: "Work, social citizenship, and economic insecurity",
    topicSlugs: ["economics", "law", "politics"],
    coreIdeas: [
      "Work is shaped by licensing, welfare, taxation, health systems, and public visibility.",
      "Economic insecurity is institutional, not only individual.",
      "Policy proposals need administrative design as well as moral argument.",
    ],
    contentLinks: [
      {
        kind: "SSRN preprint",
        label: "The Wardhan Tax Doctrine",
        path: "/library/documents/wardhan-tax-doctrine-ssrn/",
      },
      {
        kind: "Research preview",
        label: "The Welfare Paradox",
        path: "/research/the-welfare-paradox/",
      },
      {
        kind: "Series roadmap",
        label: "Managed Decline",
        path: "/series/managed-decline/",
      },
    ],
  },
  "Volume IV": {
    lens: "AI, science, infrastructure, and human capability",
    topicSlugs: ["technology", "science", "economics"],
    coreIdeas: [
      "Automation is a system of compute, energy, data, maintenance, and human judgment.",
      "Scientific capability must be read with uncertainty and release boundaries visible.",
      "Human work, intimacy, health, and adaptation remain part of the technology story.",
    ],
    contentLinks: [
      {
        kind: "Research preview",
        label: "The Autonomous Illusion",
        path: "/research/the-autonomous-illusion/",
      },
      {
        kind: "SSRN preprint",
        label: "Disconnected Hearts — The Tech Revolution of Intimacy",
        path: "/library/documents/disconnected-hearts-ssrn/",
      },
      {
        kind: "SSRN preprint",
        label: "The Double Tax on Time",
        path: "/library/documents/double-tax-on-time-ssrn/",
      },
      {
        kind: "Documentary preview",
        label: "The Martian Illusion",
        path: "/documentaries/the-martian-illusion/",
      },
    ],
  },
};

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
