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
      "A Volume III research inquiry into how legal remedies become usable—or remain formal—using working-paper directions on Terry v. Ohio, mass incarceration, social control, and the Volume II question of practical democratic access.",
    status: "In editorial development",
    volume: "Volume III",
    readingTime: "Essay concept · Volume III",
    detailLead:
      "This Volume III-connected inquiry follows the gap between a legal remedy on paper and the institutional capacity required to make that remedy usable: access, enforcement, welfare administration, work, and public visibility.",
    detailSections: [
      {
        heading: "Volume III connection",
        paragraphs: [
          "The concept is mapped to Volume III, Managed Decline, because it asks how law, enforcement, welfare, taxation, labor, and public records distribute practical power and insecurity.",
          "The closely related Volume III working-paper direction is From Vietnam to Terry v. Ohio: Investing in Human Failure vs. Human Potential. That source remains working material in the private archive; this page uses the relationship as a research map, not as a claim that the paper or this concept has been released.",
        ],
      },
      {
        heading: "Questions carried into the volume",
        items: [
          "When formal legal remedies exist, what determines whether a person can reach, understand, and use them?",
          "How do enforcement, welfare, and labor systems record hardship—and how might those records conceal institutional choices?",
          "What would a restoration-focused policy have to measure before it could be compared with punitive or exclusionary systems?",
        ],
      },
      {
        heading: "Volume III research directions",
        paragraphs: [
          "One Volume III working-paper direction follows the paper's argument from Vietnam veterans' unmet reintegration needs to Terry v. Ohio and the institutional growth of discretionary policing. This page does not treat Terry v. Ohio as a single-cause explanation for mass incarceration; it marks a historical mechanism for further legal and empirical testing.",
          "A second Volume III direction, Welfare, Wealthfare, and Social Control in Advanced Democracies, asks whether deindustrialization, blocked education and employment, welfare administration, surveillance, and punishment can create forms of structural confinement without a formal prison sentence. 'Open-air prison' is an analytical hypothesis in that working paper, not a verified description of every neighborhood.",
          "Together with the public Volume III reading copy The Wardhan Tax Doctrine, these directions make the volume's concern concrete: who carries the cost of change, how institutions record failure, and whether public systems restore capacity or manage it.",
        ],
        items: [
          "Terry v. Ohio and discretionary enforcement.",
          "Mass incarceration and the 'failure economy': distinguish documented policy mechanisms from claims about motive.",
          "Societal failure as a systems question: education, employment, welfare, records, and legal access.",
          "Counterargument: avoid single-cause explanations and keep agency, institutional variation, and uncertainty visible.",
        ],
      },
      {
        heading: "Volume II context",
        paragraphs: [
          "The adjacent Volume II research line, Democracy's Achilles' Heel: Institutional Incentives and Political Outcomes, examines the distance between formal political equality and the practical ability to set agendas, obtain information, participate, and secure institutional correction.",
          "That connection helps explain why this preview asks about usable remedies rather than lawsuits alone: rights, procedures, administration, and public capacity must meet before a formal remedy changes lived conditions. The Volume II manuscript remains a working/preprint direction, not a released Independent Observer publication.",
        ],
        items: [
          "Resource conversion and access.",
          "Information gatekeeping and institutional referees.",
          "Correction channels between elections.",
        ],
      },
    ],
    sourceNote:
      "This public catalogue relationship draws on the audited Volume III working-paper directions From Vietnam to Terry v. Ohio: Investing in Human Failure vs. Human Potential and Welfare, Wealthfare, and Social Control in Advanced Democracies, alongside the Volume II working-paper direction Democracy's Achilles' Heel: Institutional Incentives and Political Outcomes. These source reservoirs inform the research map; they are not public releases. Raw source files, alternate drafts, private metadata, and unverified claims remain outside the website.",
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
      "The page uses only the public-safe source notes reviewed in the 2026-08-22 Website Publication Audit. Private source paths, working-paper files, internal controller evidence, and watermarked video exports remain outside the website.",
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
