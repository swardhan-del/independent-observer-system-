export type EditorialStatus = "Concept preview" | "In editorial development";

export type EditorialDetailSection = {
  heading: string;
  paragraphs?: string[];
  items?: string[];
};

export type EditorialItem = {
  title: string;
  category: string;
  description: string;
  status: EditorialStatus;
  readingTime?: string;
  detailLead?: string;
  detailSections?: EditorialDetailSection[];
};

export const researchItems: EditorialItem[] = [
  {
    title: "Lawsuits Are Illusions: Where Institutional Power Actually Resides",
    category: "Law & Institutions",
    description:
      "A proposed analysis of the distance between formal legal remedies and the practical distribution of institutional power.",
    status: "In editorial development",
    readingTime: "Essay concept",
  },
  {
    title: "The Welfare Paradox",
    category: "Political Economy",
    description:
      "A research concept examining why voters may reject public programs from which their own communities benefit.",
    status: "Concept preview",
    readingTime: "Research brief concept",
  },
  {
    title: "The Autonomous Illusion",
    category: "Science & Labor",
    description:
      "An inquiry into the hidden system beneath the promise of autonomy: what technology can replace, what human labor it still depends on, and how compute, energy, data, maintenance, and institutions shape the outcome.",
    status: "Concept preview",
    readingTime: "Research concept · 8 min overview",
    detailLead:
      "The future of automation is often described as a software story. This project asks what happens when the full system—physical infrastructure, human judgment, and institutional capacity—comes back into view.",
    detailSections: [
      {
        heading: "The question beneath the headline",
        paragraphs: [
          "What looks like an autonomous machine is still part of a larger arrangement of people, resources, rules, and maintenance. The proposed investigation follows that arrangement instead of treating autonomy as a self-explanatory outcome.",
        ],
      },
      {
        heading: "A map for reading the debate",
        items: [
          "Which tasks are genuinely exposed to automation, and which are reorganized or moved out of sight?",
          "What computing, energy, data, maintenance, and human judgment must remain in the loop?",
          "Who owns the infrastructure, captures the gains, and carries the costs of transition?",
          "How should education, scientific capacity, and public institutions adapt to uncertain forecasts?",
        ],
      },
      {
        heading: "What a finished investigation must make visible",
        items: [
          "Separate technological forecasts from demonstrated deployments.",
          "Distinguish task substitution from augmentation and supervision.",
          "Test optimistic and pessimistic scenarios against their stated assumptions.",
          "Keep limitations, counterarguments, and unresolved questions visible.",
        ],
      },
    ],
  },
];

export const documentaryItems: EditorialItem[] = [
  {
    title: "Could America Leave NATO?",
    category: "Geopolitics",
    description:
      "A documentary concept mapping the legal, military, diplomatic, and economic consequences of a major alliance rupture.",
    status: "In editorial development",
  },
  {
    title: "The Martian Illusion",
    category: "Science & Civilization",
    description:
      "A proposed documentary asking whether civilization should prioritize Earth systems, energy, and nearer-space infrastructure.",
    status: "Concept preview",
  },
];

export const videoItems: EditorialItem[] = [
  {
    title: "Why Evidence Alone Is Not Enough",
    category: "Institutional Accountability",
    description:
      "A short-form editorial concept about the difference between possessing evidence and securing meaningful institutional review.",
    status: "Concept preview",
  },
  {
    title: "The Cost of Looking Away",
    category: "Civic Culture",
    description:
      "A sample video entry showing how future episodes can be catalogued with a synopsis, topic, and publication status.",
    status: "Concept preview",
  },
  {
    title: "Power, Procedure, and the Public Record",
    category: "Law & Institutions",
    description:
      "A placeholder for a future explainer on how procedure can determine whether facts ever receive substantive consideration.",
    status: "Concept preview",
  },
];

export const topics = [
  {
    name: "History",
    description: "Power shifts, institutions, and the inheritance of past decisions.",
  },
  {
    name: "Politics",
    description: "Public authority examined beyond party slogans and campaign cycles.",
  },
  {
    name: "Economics",
    description: "Labor, taxation, markets, and the distribution of risk and reward.",
  },
  { name: "Law", description: "Rules, remedies, procedure, and institutional accountability." },
  {
    name: "Science",
    description: "Evidence, medicine, energy, space, and scientific uncertainty.",
  },
  {
    name: "Technology",
    description: "Automation, artificial intelligence, infrastructure, and power.",
  },
];
