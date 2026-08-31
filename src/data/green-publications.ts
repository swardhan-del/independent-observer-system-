export type GreenPublication = {
  candidateId: string;
  slug: string;
  title: string;
  shortTitle: string;
  standfirst: string;
  author: string;
  volume: "Volume I" | "Volume II" | "Volume III" | "Volume IV";
  topics: string[];
  publicationType: "Research article";
  status: "Preview-only bounded text adaptation";
  version: string;
  factualCutoffDate: string;
  publicationDate: string;
  lastReviewedDate: string;
  license: string;
  controllerSha256: string;
  sourceVerified: true;
  rightsReviewed: true;
  accessibilityReviewed: true;
  productionReleased: false;
  relatedPublicationIds: string[];
  paragraphs: string[];
  sourceNotes: { label: string; href: string }[];
  limitations: string;
};

const author = "Siddhartha Harsh Wardhan";
const sharedLimitations =
  "This is a bounded text-only preview adaptation. It is not peer reviewed, legal or medical advice, a technical deployment plan, or a substitute for the cited sources. Interpretive and policy passages are the author’s analysis.";

export const greenPublications: GreenPublication[] = [
  {
    candidateId: "IO-V4-REGROWING-HUMANITY",
    slug: "regrowing-humanity",
    title:
      "Regrowing Humanity: How Robotic Limbs Are Becoming Integrated Extensions of the Human Body",
    shortTitle: "Regrowing Humanity",
    standfirst:
      "Advanced prostheses are becoming integrated human-machine systems, but their value depends on evidence, maintenance, consent, and access—not futuristic appearance.",
    author,
    volume: "Volume IV",
    topics: [
      "Science",
      "Technology",
      "Medicine and neuroprosthetics",
      "Human capability",
      "Accessibility",
    ],
    publicationType: "Research article",
    status: "Preview-only bounded text adaptation",
    version: "Controller v1; web adaptation v1",
    factualCutoffDate: "2026-07-30",
    publicationDate: "2026-07-30",
    lastReviewedDate: "2026-08-22",
    license: "CC BY-NC-ND 4.0",
    controllerSha256: "7c65698141490d6aa51ff544f3532d946cdb289fd4c6e4c32d58b259b916af96",
    sourceVerified: true,
    rightsReviewed: true,
    accessibilityReviewed: true,
    productionReleased: false,
    relatedPublicationIds: ["IO-V4-LAST-HUMAN-WORKFORCE", "IO-V3-SERVER-AS-FURNACE"],
    paragraphs: [
      "Prosthetic limbs are moving from passive substitutes toward systems that interpret motor intention, generate movement, return sensory information, and adapt through use. The central question is not whether a device looks futuristic, but whether it can become a reliable extension of embodied capability for a particular user.",
      "A useful taxonomy keeps socket-suspended, body-powered, myoelectric, peripheral-nerve, cortical, and bone-anchored systems distinct. Osseointegration describes skeletal attachment; targeted muscle reinnervation and regenerative peripheral nerve interfaces describe biological signal strategies. None is automatically superior for every user, task, environment, or budget.",
      "Integration is a control-loop property. Signal acquisition, decoding, actuation, feedback, rehabilitation, maintenance, and repair all matter. A device may work in a laboratory and fail in heat, fatigue, dust, or a workplace; it may improve control without reproducing ordinary sensation or becoming available through routine clinical care.",
      "The institutional unit is therefore a maintained human-machine system involving clinicians, software providers, payers, employers, and users. Durable support, cybersecurity, informed consent, equitable financing, and the right to remain fully human whether or not a device improves productivity are part of the technology’s public value.",
    ],
    sourceNotes: [
      {
        label: "Collinger et al. (2013), cortical robotic control",
        href: "https://doi.org/10.1038/nbt.2653",
      },
      {
        label: "Raspopovic et al. (2014), sensory feedback",
        href: "https://doi.org/10.1038/nn.3832",
      },
      {
        label: "Makin & Flor (2020), body representation review",
        href: "https://doi.org/10.1016/j.cub.2020.04.064",
      },
    ],
    limitations:
      "The controller describes a structured narrative review, not a preregistered systematic review or meta-analysis. Evidence is heterogeneous and often based on small cohorts or specialized programs.",
  },
  {
    candidateId: "IO-V1-INDEPENDENT-OBSERVER-METHOD",
    slug: "the-independent-observer-method",
    title: "The Independent Observer Method",
    shortTitle: "The Independent Observer Method",
    standfirst:
      "A standards-based framework for explaining institutional mechanisms, evidence, tradeoffs, and correction.",
    author,
    volume: "Volume I",
    topics: [
      "Method",
      "Evidence",
      "Public reasoning",
      "Democratic capacity",
      "Correction and accountability",
    ],
    publicationType: "Research article",
    status: "Preview-only bounded text adaptation",
    version: "Web adaptation v1",
    factualCutoffDate: "2026-07-30",
    publicationDate: "2026-07-30",
    lastReviewedDate: "2026-08-22",
    license: "CC BY-NC-ND 4.0",
    controllerSha256: "76d5d011f1e012788bfa748e876395c4f10b7a3552ca7a580a758655d0d2fe3f",
    sourceVerified: true,
    rightsReviewed: true,
    accessibilityReviewed: true,
    productionReleased: false,
    relatedPublicationIds: ["IO-V2-DEMOCRACYS-ACHILLES-HEEL"],
    paragraphs: [
      "Independence is not the same as centrism. It is a rule for handling evidence: state the standard before the conclusion, apply it across coalitions, distinguish facts from interpretations, and correct the record when evidence changes.",
      "The method asks four questions: what mechanism could produce the outcome; what would we expect to observe; which levers could change it; and what tradeoffs or new risks would those levers create? This structure does not promise neutrality or a single political programme. It makes disagreement more useful by forcing a claim to show its moving parts.",
      "A correctable publication gives claims a version, source note, and revision history. Disagreement should be answered by clarifying, narrowing, adding evidence, or withdrawing a proposition—not by quietly changing the standard.",
      "The goal is an institutional posture in miniature: broad enough for different subjects, disciplined enough to resist partisan conversion, and transparent enough to be corrected in public.",
    ],
    sourceNotes: [
      {
        label: "Douglass C. North, institutions and transaction costs",
        href: "https://doi.org/10.1111/j.1465-7295.1987.tb00750.x",
      },
      {
        label: "Knack & Keefer (1997), trust and economic performance",
        href: "https://doi.org/10.1162/003355300555475",
      },
    ],
    limitations: sharedLimitations,
  },
  {
    candidateId: "IO-V4-LAST-HUMAN-WORKFORCE",
    slug: "the-last-human-workforce",
    title: "The Last Human Workforce",
    shortTitle: "The Last Human Workforce",
    standfirst: "Automation changes the task bundle before it eliminates the job title.",
    author,
    volume: "Volume IV",
    topics: ["Automation", "Artificial intelligence", "Labor", "Education", "Human capability"],
    publicationType: "Research article",
    status: "Preview-only bounded text adaptation",
    version: "Web adaptation v1",
    factualCutoffDate: "2026-07-30",
    publicationDate: "2026-07-30",
    lastReviewedDate: "2026-08-22",
    license: "CC BY-NC-ND 4.0",
    controllerSha256: "31f921f6e7f52949687ed0b096bc783945752452aebfa29a1ded0856b84dc30d",
    sourceVerified: true,
    rightsReviewed: true,
    accessibilityReviewed: true,
    productionReleased: false,
    relatedPublicationIds: ["IO-V3-SERVER-AS-FURNACE", "IO-V4-REGROWING-HUMANITY"],
    paragraphs: [
      "The most misleading question about artificial intelligence and work is which jobs will disappear. A better question is which tasks will move, which tasks will be redesigned, and who will control the transition.",
      "Economic production is made of task bundles. Automation can displace labor from tasks it takes over, while new tasks can create demand elsewhere. Job titles may survive while the work inside them changes; the distribution of training, monitoring, and bargaining power determines who benefits.",
      "A study of 5,179 customer-support agents reported a 14% average increase in issues resolved per hour with a generative-AI assistant, including a 34% improvement for novice and lower-skilled agents. The specific workplace finding does not prove that AI raises productivity in every occupation.",
      "The policy lesson is transition design: track tasks, measure outcomes, disclose uncertainty, teach verification, and give workers a real path to learn and move. The phrase last human workforce names a struggle over the social arrangement around work, not a prophecy that humans become irrelevant.",
    ],
    sourceNotes: [
      {
        label: "Acemoglu & Restrepo (2019), automation and new tasks",
        href: "https://www.aeaweb.org/articles?id=10.1257/jep.33.2.3",
      },
      {
        label: "Brynjolfsson, Li & Raymond (2023), customer support field study",
        href: "https://www.nber.org/papers/w31161",
      },
    ],
    limitations: sharedLimitations,
  },
  {
    candidateId: "IO-V3-SERVER-AS-FURNACE",
    slug: "the-server-as-a-furnace",
    title: "The Server as a Furnace",
    shortTitle: "The Server as a Furnace",
    standfirst:
      "AI infrastructure is physical infrastructure: the public question is whether computing loads can also support heat recovery, skills, and accountable local investment.",
    author,
    volume: "Volume III",
    topics: [
      "Artificial intelligence",
      "Infrastructure",
      "Energy",
      "Industrial policy",
      "Regional development",
    ],
    publicationType: "Research article",
    status: "Preview-only bounded text adaptation",
    version: "Web adaptation v1",
    factualCutoffDate: "2026-07-18",
    publicationDate: "2026-07-18",
    lastReviewedDate: "2026-08-22",
    license: "CC BY-NC-ND 4.0",
    controllerSha256: "e4e8bda82c77dae4695a9b78c6446fbc98fb4e332566f535e106b4899fb3d5fe0",
    sourceVerified: true,
    rightsReviewed: true,
    accessibilityReviewed: true,
    productionReleased: false,
    relatedPublicationIds: ["IO-V4-LAST-HUMAN-WORKFORCE"],
    paragraphs: [
      "Artificial intelligence is often discussed as if it were weightless. A data center is an electrical load, cooling plant, fiber node, secured building, water user or water-avoidance system, and site that makes demands on local infrastructure.",
      "The phrase server as a furnace is a physical reminder, not a promise of free energy. A plausible heat-reuse chain needs compatible temperature, proximity, pipe economics, aligned load profiles, and redundant cooling when the host cannot accept heat.",
      "Water claims must specify the loop, climate, operating condition, and backup system. Likewise, construction jobs are not permanent jobs and a tax concession is not automatically a community benefit. Public support should be tied to measurable resource reporting, training, noise controls, and enforceable commitments.",
      "This is a conceptual screening and governance framework, not licensed engineering advice or proof that a particular site is feasible. A region can ask whether a new electrical load leaves behind useful heat, trained people, accountable procurement, and infrastructure that survives a software cycle.",
    ],
    sourceNotes: [
      {
        label: "Lawrence Berkeley National Laboratory, 2024 data-center energy report",
        href: "https://eta-publications.lbl.gov/publications/2024-lbnl-data-center-energy-usage-report",
      },
      {
        label: "U.S. Department of Energy, data-center design guide",
        href: "https://www.energy.gov/sites/default/files/2024-07/best-practice-guide-data-center-design.pdf",
      },
      {
        label: "ASHRAE AI data-center framework",
        href: "https://www.ashrae.org/technical-resources/ai-data-center-framework/energy-and-thermal-efficiency",
      },
    ],
    limitations:
      "Conceptual engineering analysis only; no site-specific design, feasibility finding, safety certification, or professional engineering advice.",
  },
  {
    candidateId: "IO-V2-BORROWED-LABOR",
    slug: "borrowed-labor",
    title: "Borrowed Labor",
    shortTitle: "Borrowed Labor",
    standfirst:
      "Demographic sovereignty is constrained by the workers and status systems that keep production, care, and services running.",
    author,
    volume: "Volume II",
    topics: ["Migration", "Demography", "Labor", "Political economy", "European sovereignty"],
    publicationType: "Research article",
    status: "Preview-only bounded text adaptation",
    version: "Web adaptation v1",
    factualCutoffDate: "2026-07-30",
    publicationDate: "2026-07-30",
    lastReviewedDate: "2026-08-22",
    license: "CC BY-NC-ND 4.0",
    controllerSha256: "d037f42087707a2731c60314a3b4a6642cd0a06245ab8314767583fed6f7504f",
    sourceVerified: true,
    rightsReviewed: true,
    accessibilityReviewed: true,
    productionReleased: false,
    relatedPublicationIds: ["IO-V2-DEMOCRACYS-ACHILLES-HEEL"],
    paragraphs: [
      "A state can promise demographic sovereignty while factories, hospitals, farms, hotels, construction sites, and care systems depend on workers born elsewhere. Borrowed labor describes a gap between economic function and political status; it is not a claim that every migrant worker is exploited.",
      "Eurostat recorded natural population decrease in Poland, Hungary, and Slovakia in 2024. Its fourth-quarter 2025 whole-economy job-vacancy rates were 0.7%, 2.0%, and 1.0%. These figures do not prove an absolute shortage or determine which migration policy is legitimate.",
      "Statistics Poland reported 1,141.1 thousand foreigners performing work in Poland on 31 December 2025, 7.2% more than a year earlier. This is a defined administrative statistic at a defined date—not a count of permanent settlers or proof that migration solved demographic change.",
      "The testable question is whether institutions recognize labor’s function through fair conditions, transparent rules, a lawful path to change employer, complaint access, and protection from recruitment debt or unlawful deductions. Migration can relieve some near-term constraints, but it cannot by itself reverse ageing.",
    ],
    sourceNotes: [
      {
        label: "Eurostat, demographic balance 2024",
        href: "https://ec.europa.eu/eurostat/statistics-explained/SEPDF/cache/1787.pdf",
      },
      {
        label: "Statistics Poland, foreigners performing work in December 2025",
        href: "https://stat.gov.pl/en/experimental-statistics/human-capital/foreigners-performing-work-in-poland-in-december-2025%2C12%2C38.html",
      },
      {
        label: "OECD, structural forces in labour shortages",
        href: "https://www.oecd.org/en/publications/oecd-economic-outlook-volume-2024-issue-2_d8814e8b-en/full-report/understanding-labour-shortages-the-structural-forces-at-play_321e116a.html",
      },
    ],
    limitations:
      "Factual claims retain their dated cutoff. Interpretive and policy passages are conditional analysis, not legal advice or a universal account of migration.",
  },
  {
    candidateId: "IO-V2-DEMOCRACYS-ACHILLES-HEEL",
    slug: "democracys-achilles-heel",
    title: "Democracy’s Achilles’ Heel",
    shortTitle: "Democracy’s Achilles’ Heel",
    standfirst:
      "Formal political equality is only the starting point; responsiveness also depends on access, information, administration, and correction.",
    author,
    volume: "Volume II",
    topics: [
      "Democracy",
      "Institutions",
      "Political power",
      "Public administration",
      "Accountability",
    ],
    publicationType: "Research article",
    status: "Preview-only bounded text adaptation",
    version: "Web adaptation v1",
    factualCutoffDate: "2026-08-16",
    publicationDate: "2026-08-16",
    lastReviewedDate: "2026-08-22",
    license: "CC BY-NC-ND 4.0",
    controllerSha256: "e18478ee1676f1720abf7e766f7314c665ef501445120188ef1433177c8cada7",
    sourceVerified: true,
    rightsReviewed: true,
    accessibilityReviewed: true,
    productionReleased: false,
    relatedPublicationIds: ["IO-V1-INDEPENDENT-OBSERVER-METHOD", "IO-V2-BORROWED-LABOR"],
    paragraphs: [
      "Democracy’s formal promise is necessary but incomplete. Citizens also need information, organization, access to institutions, understandable rules, and a meaningful correction when a decision is wrong.",
      "The framework follows five channels: resource conversion; administrative access; information pluralism; partisan tolerance; and institutional referees. None is a complete theory of democratic failure, and each can have legitimate functions. The question is whether a rule’s necessity, implementation, and review are proportionate to the burden it creates.",
      "The U.S. Election Assistance Commission reported more than 158 million counted ballots in the 2024 general election and turnout equal to 64.7% of the citizen voting-age population. Those figures show substantial participation; they do not settle whether access, agenda-setting, or correction are equal between elections.",
      "The practical test is contestability: can an opposition realistically win, obtain information and competent administration, exercise rights without partisan identity as the price of entry, and obtain review? This is a discipline for inquiry, not proof of a single ideology or a universal causal claim.",
    ],
    sourceNotes: [
      {
        label: "U.S. Election Assistance Commission, 2024 EAVS",
        href: "https://www.eac.gov/sites/default/files/2025-07/2024_EAVS_Report_508.pdf",
      },
      {
        label: "U.S. Election Assistance Commission release",
        href: "https://www.eac.gov/news/2025/06/30/us-election-assistance-commission-releases-2024-election-administration-and-voting",
      },
    ],
    limitations:
      "The article preserves methodological limits: unequal outcomes do not by themselves prove capture, suppression, or bad faith; propositions are not presented as proven causal findings.",
  },
];

export const publicationPreviewEnabled =
  process.env.PUBLICATION_PREVIEW === "true" || process.env.VERCEL_ENV === "preview";
export const previewGreenPublications = publicationPreviewEnabled ? greenPublications : [];
export const greenPublicationBySlug = new Map(
  greenPublications.map((publication) => [publication.slug, publication]),
);
export const greenPublicationById = new Map(
  greenPublications.map((publication) => [publication.candidateId, publication]),
);

export function readingTimeMinutes(publication: GreenPublication) {
  const words = publication.paragraphs.join(" ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

export function publicGreenPublication(publication: GreenPublication) {
  const { controllerSha256: _controllerSha256, ...safe } = publication;
  return { ...safe, readingTimeMinutes: readingTimeMinutes(publication) };
}
