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
    | "Published article"
    | "Author paper"
    | "Cross-volume author paper"
    | "Research preview"
    | "Concept preview"
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
  /** Curated public entry points for a specific topic-volume relationship. */
  topicConnections: Partial<Record<string, TopicVolumeCellConnection>>;
};

export type TopicVolumeCellConnection = {
  lens: string;
  coreIdeas: string[];
  contentLinks: PathwayContentLink[];
};

export type ReviewQueueSignal = {
  title: string;
  status: "In editorial development";
  category: string;
  description: string;
  publicState: "Public preview available" | "Related public work available";
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
        kind: "Author paper",
        label: "Independent Observer: Volume I foundational manifesto",
        path: "/library/documents/independent-observer-volume-one/",
      },
      {
        kind: "Concept preview",
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
        kind: "Concept preview",
        label: "The Autonomous Illusion",
        path: "/research/the-autonomous-illusion/",
      },
      {
        kind: "Author paper",
        label: "Disconnected Hearts — The Tech Revolution of Intimacy",
        path: "/library/documents/disconnected-hearts/",
      },
      {
        kind: "Author paper",
        label: "The Double Tax on Time",
        path: "/library/documents/double-tax-on-time/",
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
        kind: "Author paper",
        label: "From Colonization to China’s Rise",
        path: "/library/documents/from-colonization-to-chinas-rise/",
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
        kind: "Concept preview",
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
        kind: "Concept preview",
        label: "The Autonomous Illusion",
        path: "/research/the-autonomous-illusion/",
      },
      {
        kind: "Author paper",
        label: "Disconnected Hearts — The Tech Revolution of Intimacy",
        path: "/library/documents/disconnected-hearts/",
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
        kind: "Author paper",
        label: "Who Deported More? A Guide to Comparing Deportation Statistics",
        path: "/library/documents/who-deported-more/",
      },
      {
        kind: "Author paper",
        label: "The Latino Irony",
        path: "/library/documents/latino-irony/",
      },
      {
        kind: "Author paper",
        label: "From Colonization to China’s Rise",
        path: "/library/documents/from-colonization-to-chinas-rise/",
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
    topicSlugs: ["history", "politics", "economics", "law", "technology"],
    coreIdeas: [
      "Method before conclusion: define evidence, interpretation, and uncertainty.",
      "Democratic capacity depends on usable institutions, not only formal legitimacy.",
      "Public memory and correction are part of institutional accountability.",
    ],
    contentLinks: [
      {
        kind: "Author paper",
        label: "Independent Observer: Volume I foundational manifesto",
        path: "/library/documents/independent-observer-volume-one/",
      },
      {
        kind: "Concept preview",
        label: "Lawsuits Are Illusions",
        path: "/research/lawsuits-are-illusions-where-institutional-power-actually-resides/",
      },
      {
        kind: "Video preview",
        label: "Why Evidence Alone Is Not Enough",
        path: "/videos/why-evidence-alone-is-not-enough/",
      },
    ],
    topicConnections: {
      history: {
        lens: "Method, memory, and historical context",
        coreIdeas: [
          "Place public claims in historical context before drawing conclusions.",
          "Keep evidence, interpretation, and uncertainty visible across time.",
        ],
        contentLinks: [
          {
            kind: "Published article",
            label: "The Independent Observer Method",
            path: "/research/the-independent-observer-method/",
          },
          {
            kind: "Author paper",
            label: "Independent Observer: Volume I foundational manifesto",
            path: "/library/documents/independent-observer-volume-one/",
          },
        ],
      },
      politics: {
        lens: "Democratic capacity and public reasoning",
        coreIdeas: [
          "Assess whether people can use and correct institutions in practice.",
          "Separate formal legitimacy from the capacity that makes public authority usable.",
        ],
        contentLinks: [
          {
            kind: "Published article",
            label: "The Independent Observer Method",
            path: "/research/the-independent-observer-method/",
          },
          {
            kind: "Author paper",
            label: "Independent Observer: Volume I foundational manifesto",
            path: "/library/documents/independent-observer-volume-one/",
          },
          {
            kind: "Video preview",
            label: "Why Evidence Alone Is Not Enough",
            path: "/videos/why-evidence-alone-is-not-enough/",
          },
        ],
      },
      law: {
        lens: "Procedure, evidence, and remedy",
        coreIdeas: [
          "Trace how a documented claim moves through procedure to review.",
          "Distinguish formal legal remedies from practical access to them.",
        ],
        contentLinks: [
          {
            kind: "Author paper",
            label: "Independent Observer: Volume I foundational manifesto",
            path: "/library/documents/independent-observer-volume-one/",
          },
          {
            kind: "Author paper",
            label: "The Illusion of Equality",
            path: "/library/documents/the-illusion-of-equality/",
          },
          {
            kind: "Concept preview",
            label: "Lawsuits Are Illusions",
            path: "/research/lawsuits-are-illusions-where-institutional-power-actually-resides/",
          },
        ],
      },
      economics: {
        lens: "Equality, ownership, and political economy",
        coreIdeas: [
          "Compare formal equality with the legal and economic structures distributing power.",
          "Read labor, automation, and incarceration as connected institutional questions.",
        ],
        contentLinks: [
          {
            kind: "Author paper",
            label: "The Illusion of Equality",
            path: "/library/documents/the-illusion-of-equality/",
          },
          {
            kind: "Author paper",
            label: "A Systems-Centered Manifesto on Automation, Education, and the Carceral State",
            path: "/library/documents/a-systems-centered-manifesto/",
          },
        ],
      },
      technology: {
        lens: "Automation, labor, and democratic capacity",
        coreIdeas: [
          "Treat automation as a labor and institutional transition, not only a software feature.",
          "Connect skill development and reentry to how communities adapt to industrial change.",
        ],
        contentLinks: [
          {
            kind: "Author paper",
            label: "A Systems-Centered Manifesto on Automation, Education, and the Carceral State",
            path: "/library/documents/a-systems-centered-manifesto/",
          },
        ],
      },
    },
  },
  "Volume II": {
    lens: "Sovereignty, institutions, and public power",
    topicSlugs: ["history", "politics", "economics", "law"],
    coreIdeas: [
      "Sovereignty is shaped by constitutional design, enforcement, alliances, and markets.",
      "Historical power shifts remain active in present political arrangements.",
      "Migration, demography, and public authority are connected questions.",
    ],
    contentLinks: [
      {
        kind: "Author paper",
        label: "Who Deported More? A Guide to Comparing Deportation Statistics",
        path: "/library/documents/who-deported-more/",
      },
      {
        kind: "Author paper",
        label: "The Latino Irony",
        path: "/library/documents/latino-irony/",
      },
      {
        kind: "Author paper",
        label: "From Colonization to China’s Rise",
        path: "/library/documents/from-colonization-to-chinas-rise/",
      },
      {
        kind: "Documentary preview",
        label: "Could America Leave NATO?",
        path: "/documentaries/could-america-leave-nato/",
      },
    ],
    topicConnections: {
      history: {
        lens: "Historical power and political memory",
        coreIdeas: [
          "Trace how historical power shifts shape present institutions.",
          "Compare migration and enforcement claims using defined categories and time periods.",
        ],
        contentLinks: [
          {
            kind: "Author paper",
            label: "From Colonization to China’s Rise",
            path: "/library/documents/from-colonization-to-chinas-rise/",
          },
          {
            kind: "Author paper",
            label: "Who Deported More? A Guide to Comparing Deportation Statistics",
            path: "/library/documents/who-deported-more/",
          },
        ],
      },
      politics: {
        lens: "Sovereignty, authority, and membership",
        coreIdeas: [
          "Follow how institutions define membership and exercise public power.",
          "Read alliances and enforcement through constitutional and institutional arrangements.",
        ],
        contentLinks: [
          {
            kind: "Published article",
            label: "Democracy’s Achilles Heel",
            path: "/research/democracys-achilles-heel/",
          },
          {
            kind: "Author paper",
            label: "Who Deported More? A Guide to Comparing Deportation Statistics",
            path: "/library/documents/who-deported-more/",
          },
          {
            kind: "Author paper",
            label: "The Latino Irony",
            path: "/library/documents/latino-irony/",
          },
          {
            kind: "Author paper",
            label: "From Colonization to China’s Rise",
            path: "/library/documents/from-colonization-to-chinas-rise/",
          },
          {
            kind: "Documentary preview",
            label: "Could America Leave NATO?",
            path: "/documentaries/could-america-leave-nato/",
          },
        ],
      },
      economics: {
        lens: "Migration, enforcement, and distribution",
        coreIdeas: [
          "Define removals and returns before comparing enforcement patterns.",
          "Connect migration policy to labor, distribution, and institutional incentives.",
        ],
        contentLinks: [
          {
            kind: "Author paper",
            label: "Who Deported More? A Guide to Comparing Deportation Statistics",
            path: "/library/documents/who-deported-more/",
          },
          {
            kind: "Author paper",
            label: "The Latino Irony",
            path: "/library/documents/latino-irony/",
          },
          {
            kind: "Author paper",
            label: "Two Masks, One Face",
            path: "/library/documents/two-masks-one-face/",
          },
          {
            kind: "Author paper",
            label: "The Geography of Enslaved Wealth",
            path: "/library/documents/geography-of-enslaved-wealth/",
          },
        ],
      },
      law: {
        lens: "Citizenship, voting, and legal membership",
        coreIdeas: [
          "Examine how law defines membership and political voice across borders.",
          "Connect enforcement statistics to the legal categories and institutional rules behind them.",
        ],
        contentLinks: [
          {
            kind: "Author paper",
            label: "Citizens Without a Country",
            path: "/library/documents/citizens-without-a-country/",
          },
          {
            kind: "Author paper",
            label: "Who Deported More? A Guide to Comparing Deportation Statistics",
            path: "/library/documents/who-deported-more/",
          },
        ],
      },
    },
  },
  "Volume III": {
    lens: "Work, social citizenship, and economic insecurity",
    topicSlugs: ["history", "economics", "law", "politics", "technology"],
    coreIdeas: [
      "Work is shaped by licensing, welfare, taxation, health systems, and public visibility.",
      "Economic insecurity is institutional, not only individual.",
      "Policy proposals need administrative design as well as moral argument.",
      "Industrial history connects deindustrialization to the institutions that distribute risk.",
    ],
    contentLinks: [
      {
        kind: "Author paper",
        label: "The Wardhan Tax Doctrine",
        path: "/library/documents/wardhan-tax-doctrine/",
      },
      {
        kind: "Author paper",
        label: "Children Left Behind After a War",
        path: "/library/documents/children-left-behind-after-a-war/",
      },
      {
        kind: "Series roadmap",
        label: "Managed Decline",
        path: "/series/managed-decline/",
      },
    ],
    topicConnections: {
      history: {
        lens: "Industrial change, war, and institutional memory",
        coreIdeas: [
          "Connect industrial change and war to the institutions distributing risk.",
          "Treat public memory as part of how systems record and respond to social costs.",
        ],
        contentLinks: [
          {
            kind: "Author paper",
            label: "Children Left Behind After a War",
            path: "/library/documents/children-left-behind-after-a-war/",
          },
          {
            kind: "Series roadmap",
            label: "Managed Decline",
            path: "/series/managed-decline/",
          },
        ],
      },
      economics: {
        lens: "Labor, taxation, welfare, and economic security",
        coreIdeas: [
          "Follow who carries the costs of work, taxation, and economic change.",
          "Evaluate policy proposals alongside eligibility, reporting, and administrative design.",
        ],
        contentLinks: [
          {
            kind: "Author paper",
            label: "The Wardhan Tax Doctrine",
            path: "/library/documents/wardhan-tax-doctrine/",
          },
          {
            kind: "Series roadmap",
            label: "Managed Decline",
            path: "/series/managed-decline/",
          },
        ],
      },
      law: {
        lens: "Policing, constitutional exposure, and practical remedy",
        coreIdeas: [
          "Study discretionary policing alongside work, welfare, and institutional response.",
          "Keep constitutional doctrine distinct from claims about downstream social effects.",
        ],
        contentLinks: [
          {
            kind: "Author paper",
            label: "From Vietnam to Terry v. Ohio",
            path: "/library/documents/from-vietnam-to-terry-ohio/",
          },
          {
            kind: "Concept preview",
            label: "Lawsuits Are Illusions",
            path: "/research/lawsuits-are-illusions-where-institutional-power-actually-resides/",
          },
        ],
      },
      politics: {
        lens: "Public systems and social citizenship",
        coreIdeas: [
          "Ask how public institutions distribute security, risk, and access.",
          "Read welfare and labor arrangements as questions of public capacity and accountability.",
        ],
        contentLinks: [
          {
            kind: "Author paper",
            label: "Children Left Behind After a War",
            path: "/library/documents/children-left-behind-after-a-war/",
          },
          {
            kind: "Series roadmap",
            label: "Managed Decline",
            path: "/series/managed-decline/",
          },
        ],
      },
      technology: {
        lens: "Industrial technology, energy, and changing work",
        coreIdeas: [
          "Trace how industrial systems reshape jobs, infrastructure, and local economies.",
          "Connect technical capacity to energy use, maintenance, and the distribution of work.",
        ],
        contentLinks: [
          {
            kind: "Published article",
            label: "The Server as a Furnace",
            path: "/research/the-server-as-a-furnace/",
          },
          {
            kind: "Published article",
            label: "Factories Return but Do the Jobs?",
            path: "/research/factories-return-but-do-the-jobs/",
          },
          {
            kind: "Series roadmap",
            label: "Managed Decline",
            path: "/series/managed-decline/",
          },
        ],
      },
    },
  },
  "Volume IV": {
    lens: "AI, science, infrastructure, and human capability",
    topicSlugs: ["technology", "science", "economics", "politics"],
    coreIdeas: [
      "Automation is a system of compute, energy, data, maintenance, and human judgment.",
      "Scientific capability must be read with uncertainty and release boundaries visible.",
      "Human work, intimacy, health, and adaptation remain part of the technology story.",
      "Technical capability becomes political through procurement, standards, lobbying, and public investment.",
    ],
    contentLinks: [
      {
        kind: "Concept preview",
        label: "The Autonomous Illusion",
        path: "/research/the-autonomous-illusion/",
      },
      {
        kind: "Author paper",
        label: "Disconnected Hearts — The Tech Revolution of Intimacy",
        path: "/library/documents/disconnected-hearts/",
      },
      {
        kind: "Author paper",
        label: "The Double Tax on Time",
        path: "/library/documents/double-tax-on-time/",
      },
      {
        kind: "Cross-volume author paper",
        label: "The Empire of Distraction",
        path: "/library/documents/empire-of-distraction/",
      },
      {
        kind: "Documentary preview",
        label: "The Martian Illusion",
        path: "/documentaries/the-martian-illusion/",
      },
    ],
    topicConnections: {
      technology: {
        lens: "Automation, infrastructure, and human work",
        coreIdeas: [
          "Follow the compute, data, energy, maintenance, and labor behind automation.",
          "Separate task substitution from augmentation and hidden human work.",
        ],
        contentLinks: [
          {
            kind: "Published article",
            label: "The Last Human Workforce",
            path: "/research/the-last-human-workforce/",
          },
          {
            kind: "Concept preview",
            label: "The Autonomous Illusion",
            path: "/research/the-autonomous-illusion/",
          },
          {
            kind: "Author paper",
            label: "Disconnected Hearts — The Tech Revolution of Intimacy",
            path: "/library/documents/disconnected-hearts/",
          },
          {
            kind: "Documentary preview",
            label: "The Martian Illusion",
            path: "/documentaries/the-martian-illusion/",
          },
        ],
      },
      science: {
        lens: "Evidence, human capability, and uncertainty",
        coreIdeas: [
          "Show what evidence supports a capability claim and where uncertainty remains.",
          "Connect medical and technical possibilities to human limits and release boundaries.",
        ],
        contentLinks: [
          {
            kind: "Concept preview",
            label: "The Autonomous Illusion",
            path: "/research/the-autonomous-illusion/",
          },
          {
            kind: "Research preview",
            label: "Regrowing Humanity",
            path: "/research/regrowing-humanity/",
          },
          {
            kind: "Documentary preview",
            label: "The Martian Illusion",
            path: "/documentaries/the-martian-illusion/",
          },
          {
            kind: "Author paper",
            label: "Entanglement, No-Signalling, and the Real Path to Quantum Advantage",
            path: "/library/documents/entanglement-primer/",
          },
          {
            kind: "Author paper",
            label: "When Real Science Becomes Science Fiction",
            path: "/library/documents/when-real-science-becomes-science-fiction/",
          },
        ],
      },
      economics: {
        lens: "Task change, labor, and the distribution of gains",
        coreIdeas: [
          "Distinguish job-task exposure from claims about whole occupations disappearing.",
          "Track who captures productivity gains and who bears transition costs.",
        ],
        contentLinks: [
          {
            kind: "Concept preview",
            label: "The Autonomous Illusion",
            path: "/research/the-autonomous-illusion/",
          },
          {
            kind: "Author paper",
            label: "The Double Tax on Time",
            path: "/library/documents/double-tax-on-time/",
          },
          {
            kind: "Author paper",
            label: "The Lottery of Luck",
            path: "/library/documents/lottery-of-luck/",
          },
          {
            kind: "Published article",
            label: "The Last Human Workforce",
            path: "/research/the-last-human-workforce/",
          },
          {
            kind: "Series roadmap",
            label: "The Last Human Workforce · Volume IV",
            path: "/series/the-last-human-workforce/",
          },
        ],
      },
      politics: {
        lens: "Technical capability and public power",
        coreIdeas: [
          "Read procurement, standards, lobbying, and public investment as political choices.",
          "Ask who governs opaque systems and who can review their consequences.",
        ],
        contentLinks: [
          {
            kind: "Cross-volume author paper",
            label: "The Empire of Distraction",
            path: "/library/documents/empire-of-distraction/",
          },
          {
            kind: "Concept preview",
            label: "The Autonomous Illusion",
            path: "/research/the-autonomous-illusion/",
          },
          {
            kind: "Published article",
            label: "The Last Human Workforce",
            path: "/research/the-last-human-workforce/",
          },
          {
            kind: "Series roadmap",
            label: "The Last Human Workforce · Volume IV",
            path: "/series/the-last-human-workforce/",
          },
        ],
      },
    },
  },
};

export function topicVolumeConnectionFor(volume: string, topicSlug: string) {
  const volumeConnection = volumeTopicConnections[volume];
  const detail = volumeConnection?.topicConnections[topicSlug];
  const connected = Boolean(volumeConnection?.topicSlugs.includes(topicSlug));

  return {
    connected,
    lens: detail?.lens ?? volumeConnection?.lens ?? "Research connection",
    coreIdeas: connected ? (detail?.coreIdeas ?? volumeConnection?.coreIdeas ?? []) : [],
    contentLinks: connected ? (detail?.contentLinks ?? []) : [],
  };
}

/**
 * Public development signals distinguish planned research from available reading copies.
 */
export const reviewQueueSignals: ReviewQueueSignal[] = [
  {
    title:
      "Regrowing Humanity: How Robotic Limbs Are Becoming Integrated Extensions of the Human Body",
    status: "In editorial development",
    category: "Science & Technology",
    description:
      "A bounded public preview is available. An expanded adaptation still needs owner-release, accessibility, and web QA review.",
    publicState: "Public preview available",
    topicSlugs: ["science", "technology"],
  },
  {
    title: "Independent Observer · Volume I manuscript",
    status: "In editorial development",
    category: "Method & Democratic Capacity",
    description:
      "The method article and foundational paper are public; the book-length Volume I project remains in editorial development.",
    publicState: "Related public work available",
    topicSlugs: ["history", "politics", "law"],
  },
  {
    title: "The Last Human Workforce · Volume IV manuscript",
    status: "In editorial development",
    category: "AI & Human Capability",
    description:
      "A selected research article and the Volume IV roadmap are public; the book-length manuscript remains in editorial development.",
    publicState: "Related public work available",
    topicSlugs: ["technology", "economics", "science"],
  },
  {
    title: "Borrowed Labor",
    status: "In editorial development",
    category: "Labor & Political Economy",
    description:
      "A public preview is available. A fuller adaptation remains in development pending current-data and rights review.",
    publicState: "Public preview available",
    topicSlugs: ["economics", "politics", "history"],
  },
];

export function topicPluginFor(slug: string): TopicPluginDefinition {
  return topicPluginDefinitions.find((topic) => topic.slug === slug) ?? topicPluginDefinitions[0];
}

export function reviewQueueForTopic(slug: string): ReviewQueueSignal[] {
  return reviewQueueSignals.filter((signal) => signal.topicSlugs.includes(slug));
}
