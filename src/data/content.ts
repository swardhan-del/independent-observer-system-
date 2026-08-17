export type EditorialStatus = "Concept preview" | "In editorial development";

export type EditorialItem = {
  title: string;
  category: string;
  description: string;
  status: EditorialStatus;
  readingTime?: string;
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
      "A proposed inquiry into technological forecasts, labor displacement, infrastructure, and the limits of automation narratives.",
    status: "Concept preview",
    readingTime: "Essay concept",
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
    description: "Evidence, energy, space, and scientific uncertainty.",
  },
  {
    name: "Technology",
    description: "Automation, artificial intelligence, infrastructure, and power.",
  },
];
