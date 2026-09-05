export type EditorialStatus = "Concept preview" | "In editorial development";

export type EditorialDetailSection = {
  heading: string;
  paragraphs?: string[];
  items?: string[];
};

export type EditorialSourceLink = {
  label: string;
  url: string;
  internal?: boolean;
};

export type EditorialItem = {
  title: string;
  category: string;
  description: string;
  status: EditorialStatus;
  volume?: string;
  readingTime?: string;
  detailHeading?: string;
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
          "The closely related Volume III public author paper page is From Vietnam to Terry v. Ohio: Investing in Human Failure vs. Human Potential. The public record is linked for discovery, while the matching source material remains outside the website; this page uses the relationship as a research map rather than reproducing the manuscript.",
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
      "This public catalogue relationship draws on the public author paper page From Vietnam to Terry v. Ohio: Investing in Human Failure vs. Human Potential, the audited Volume III working-paper direction Welfare, Wealthfare, and Social Control in Advanced Democracies, and the Volume II working-paper direction Democracy's Achilles' Heel: Institutional Incentives and Political Outcomes. These source reservoirs inform the research map; Raw source files, alternate drafts, private metadata, and unverified claims remain outside the website.",
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
    volume: "Volume II",
    readingTime: "Documentary treatment preview · Volume II",
    detailHeading: "A documentary about the conditions of strategic choice.",
    detailLead:
      "Could America Leave NATO? is a documentary question, not a prediction. It asks what changes when a country that has organized security through an alliance begins to reconsider the legal commitments, military capacity, industrial base, and political story that make that role possible.",
    detailSections: [
      {
        heading: "The question beneath the headline",
        paragraphs: [
          "The film would begin with a simple question—what would leaving, weakening, or conditionally continuing an alliance actually require?—then separate formal legal authority from practical capacity. A treaty decision, a military posture, a diplomatic signal, and a public narrative are related events, but they are not the same event and should not be collapsed into one dramatic claim.",
          "The working question is how strategic dependence is distributed. Who supplies security, who carries the cost, who can replace a capability, and which domestic institutions can review a major change? The film would follow those relationships rather than present geopolitical rupture as a single switch.",
        ],
      },
      {
        heading: "A five-part documentary route",
        items: [
          "Law and membership: distinguish treaty text, constitutional authority, executive direction, legislative involvement, notice, and the difference between formal withdrawal and reduced participation.",
          "Military capacity: ask which capabilities, logistics, intelligence, procurement, and readiness arrangements are shared, duplicated, or difficult to replace on a short timeline.",
          "Diplomacy and alliance bargaining: trace how partners respond through negotiation, reassurance, rearmament, hedging, or new forms of cooperation rather than assuming one uniform reaction.",
          "Industry, capital, and resources: connect security commitments to production, energy, technology, labor, public budgets, and the economic systems that sustain strategic choice.",
          "Public reasoning: show how evidence, uncertainty, competing interests, and democratic correction should remain visible when a high-stakes policy is narrated to the public.",
        ],
      },
      {
        heading: "How empires contract from within",
        paragraphs: [
          "The phrase ‘how empires collapse within themselves’ is used here as a testable documentary lens, not as a claim that an alliance rupture is inevitable or that contemporary states are identical to historic empires. The film would examine possible internal pressures: commitments that outgrow the productive base, security arrangements that distribute costs unevenly, allies that must adapt, domestic legitimacy that weakens, and institutions that cannot explain or correct a major decision.",
          "Each pressure would need its own evidence and counterargument. A burden can be real without proving decline; a rearmament response can signal adaptation without proving collapse; and a public disagreement can reflect democratic contest rather than institutional failure.",
        ],
      },
      {
        heading: "Connections across the Independent Observer spine",
        paragraphs: [
          "Volume II supplies the central map: sovereignty is relational, material, and conditional. Its public research frame connects alliance dependence to capital, technology, security, labor, resources, enforcement, and the institutions that turn formal authority into usable choices.",
          "Volume III adds the distribution question. Strategic change is also a question of work, industrial capacity, taxation, public budgets, education, and who absorbs the transition cost. That cross-volume connection keeps the film from treating foreign policy as separate from social citizenship at home.",
        ],
      },
      {
        heading: "Phase 3 treatment boundary",
        paragraphs: [
          "The Dropbox-backed public audit identifies this project as a documentary concept in editorial development. The website can publish a public-safe treatment outline and its research connections; it does not publish a private Phase 3 dossier, raw archive material, unreleased footage, working contacts, or an unverified production claim.",
          "A future Phase 3 package would still need a source dossier, legal and rights review, a scene-by-scene treatment, current fact-checking, access decisions, and human release approval before it could be described as a finished documentary or a production commitment.",
        ],
      },
      {
        heading: "What a finished film must verify",
        items: [
          "The legal route and institutional roles involved in any change to alliance participation.",
          "The specific military, diplomatic, industrial, and fiscal dependencies being described.",
          "The strongest argument for continuity alongside the strongest argument for retrenchment.",
          "What is documented, what is inferred, what is forecast, and what remains unresolved for the viewer.",
        ],
      },
    ],
    sourceNote:
      "This public preview expands the existing Dropbox-backed Documentary Projects record without reproducing private production material. It is connected to the public Volume II roadmap and public paper synopsis pages; those links are reading routes, not evidence that a film has been released or that every mapped research direction is public.",
    sourceLinks: [
      {
        label: "Read the Volume II public reading frame",
        url: "/series/the-empire-beneath-democracy/",
        internal: true,
      },
      {
        label: "Read From Colonization to China’s Rise",
        url: "/library/documents/from-colonization-to-chinas-rise/",
        internal: true,
      },
      {
        label: "Read the Managed Decline roadmap",
        url: "/series/managed-decline/",
        internal: true,
      },
    ],
  },
  {
    title: "The Martian Illusion",
    category: "Science & Civilization",
    description:
      "A proposed documentary asking whether civilization should prioritize Earth systems, energy, and nearer-space infrastructure.",
    status: "Concept preview",
  },
  {
    title: "The Work Behind the Machine",
    category: "AI & Human Capability · Volume IV",
    description:
      "A Volume IV documentary concept about the human systems behind automation—compute, energy, education, care, maintenance, and the judgment required to turn technical possibility into usable capability.",
    status: "Concept preview",
    volume: "Volume IV",
    readingTime: "Documentary concept · Volume IV",
    detailHeading: "A documentary about the work behind automation.",
    detailLead:
      "Volume IV asks what it takes for a new tool to become usable human capability. This treatment would follow the overlooked systems around automation—compute, energy, maintenance, training, care, and institutional accountability—rather than treating replacement as the whole story.",
    detailSections: [
      {
        heading: "The Volume IV question",
        paragraphs: [
          "A machine can appear autonomous while depending on a large human and material support system. The documentary would make that system visible: the scientific infrastructure, energy, data, repair, education, and care required before technical possibility becomes durable public capacity.",
        ],
      },
      {
        heading: "What the treatment would make visible",
        items: [
          "The difference between a task being replaced, reorganized, augmented, or moved out of sight.",
          "The people who maintain, explain, repair, supervise, and challenge automated systems.",
          "How education, health, time, and institutional rules shape who can benefit from technical change.",
          "The evidence needed to distinguish expanded human capability from a simple transfer of work and risk.",
        ],
      },
      {
        heading: "Publication status",
        paragraphs: [
          "This is a concept preview connected to The Last Human Workforce, not a released film. Research, source verification, rights review, a finished treatment, production, and human release approval remain separate requirements.",
        ],
      },
    ],
    sourceNote:
      "This concept uses the public Volume IV research frame as a map for a future documentary treatment. Public author paper pages and research previews remain distinct from a finished or released film; private source files and unpublished production material stay outside the website.",
  },
];

export const videoItems: EditorialItem[] = [
  {
    title: "Why Evidence Alone Is Not Enough",
    category: "Institutional Accountability",
    description:
      "A short-form visual essay tracing the gap between having evidence and making it matter. It follows how a record is noticed, authenticated, interpreted, and carried into institutional review—and why access, procedure, competing narratives, and public attention can determine whether a documented fact leads to accountability or disappears.",
    status: "Concept preview",
    readingTime: "Short-form video concept · 3–5 min",
    detailHeading: "What this video is for.",
    detailLead:
      "This video is meant to help viewers see the missing steps between a record and a public response. It uses the Independent Observer method to show that evidence must be preserved, made legible, carried into a forum, tested against competing explanations, and connected to a correction path before it can support accountability.",
    detailSections: [
      {
        heading: "What the video follows",
        items: [
          "The record: what was observed, preserved, and authenticated before interpretation begins.",
          "The passage into public attention: how framing, competing narratives, and media incentives can make the same evidence visible or easy to ignore.",
          "The institutional test: whether a person can reach review, receive a reasoned response, challenge an error, and obtain correction.",
        ],
      },
      {
        heading: "Why it matters to the project",
        paragraphs: [
          "Independent Observer asks readers to separate a documented fact from the explanation built around it. This concept makes that discipline visual by showing the missing steps between possessing evidence and securing meaningful institutional review.",
        ],
      },
    ],
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
