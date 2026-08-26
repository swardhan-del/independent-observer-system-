export type EditorialStatus = "Concept preview" | "In editorial development";

export type EditorialDetailSection = {
  heading: string;
  paragraphs?: string[];
  items?: string[];
};

export type EditorialSourceLink = {
  label: string;
  url: string;
};

export type EditorialItem = {
  title: string;
  category: string;
  description: string;
  status: EditorialStatus;
  volume?: string;
  readingTime?: string;
  detailLead?: string;
  detailSections?: EditorialDetailSection[];
  sourceNote?: string;
  sourceLinks?: EditorialSourceLink[];
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
    category: "Democratic capacity & civic culture",
    description:
      "A documentary explainer concept about the gap between a public record and a meaningful institutional response: what determines whether evidence is noticed, processed, challenged, and corrected.",
    status: "Concept preview",
    volume: "Volume II · Democracy & Institutions",
    readingTime: "Video concept · 12–18 min",
    detailLead:
      "A record can be visible without becoming usable. This concept follows the institutional path between evidence and response—access, information, administration, review, and correction—while keeping the method of observation separate from the conclusions still to be tested.",
    detailSections: [
      {
        heading: "Topic and volume",
        paragraphs: [
          "The concept belongs to Volume II’s democracy-and-institutions work and is designed as a public-facing companion to Democracy’s Achilles’ Heel. Its question is not whether participation exists, but whether people can convert participation and evidence into a fair hearing between elections.",
        ],
      },
      {
        heading: "What the public-safe audit establishes",
        paragraphs: [
          "The 2026-08-22 Website Publication Audit classifies Democracy’s Achilles’ Heel as a higher-standard working paper that remains B — YELLOW / REVIEW REQUIRED. Its web-ready source notes report more than 158 million counted ballots in the 2024 U.S. general election and turnout of 64.7% of the citizen voting-age population, using the U.S. Election Assistance Commission’s 2024 Election Administration and Voting Survey.",
        ],
        items: [
          "Those figures document substantial participation; they do not, by themselves, show that agenda-setting, information access, administration, or correction are equally available between elections.",
          "The source notes caution that an unequal outcome does not by itself prove capture, suppression, or bad faith.",
        ],
      },
      {
        heading: "The mechanism the video would test",
        items: [
          "Evidence becomes consequential only when people can reach a forum, administrators can process the claim, institutions can hear competing accounts, and a correction path exists.",
          "The same record can be visible and still be unusable when access burdens, information asymmetry, or procedural delay prevent meaningful review.",
          "A finished treatment would keep documented facts, interpretation, hypothesis, counterargument, and unresolved questions visibly separate.",
        ],
      },
      {
        heading: "Publication status and release boundary",
        paragraphs: [
          "This page is an Independent Observer concept preview, not a released video or article. The related Volume II candidate remains awaiting human release; no player, transcript, final citation package, media-rights clearance, or production release is asserted here.",
        ],
      },
    ],
    sourceNote:
      "The page uses only the public-safe source notes reviewed in the 2026-08-22 Website Publication Audit. Private Dropbox paths, working-paper files, internal controller evidence, and watermarked video exports remain outside the website.",
    sourceLinks: [
      {
        label: "U.S. Election Assistance Commission · 2024 EAVS report",
        url: "https://www.eac.gov/sites/default/files/2025-07/2024_EAVS_Report_508.pdf",
      },
      {
        label: "U.S. Election Assistance Commission · 2024 EAVS release",
        url: "https://www.eac.gov/news/2025/06/30/us-election-assistance-commission-releases-2024-election-administration-and-voting",
      },
    ],
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
