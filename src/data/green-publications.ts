import { archiveFamilyIds, familyIdForKey } from "./family-registry";

export type GreenPublication = {
  candidateId: string;
  familyId: string;
  slug: string;
  title: string;
  shortTitle: string;
  standfirst: string;
  author: string;
  volume: "Volume I" | "Volume II" | "Volume III" | "Volume IV";
  topics: string[];
  publicationType: "Research article";
  status: "Preview-only bounded text adaptation" | "Published bounded text adaptation";
  version: string;
  factualCutoffDate: string;
  publicationDate: string;
  lastReviewedDate: string;
  license: string;
  controllerSha256: string;
  sourceVerified: true;
  rightsReviewed: true;
  accessibilityReviewed: true;
  productionReleased: boolean;
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
    familyId: familyIdForKey("IO-V4-REGROWING-HUMANITY"),
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
    version: "Public preview v1",
    factualCutoffDate: "2026-07-30",
    publicationDate: "2026-07-30",
    lastReviewedDate: "2026-08-22",
    license: "CC BY-NC-ND 4.0",
    controllerSha256: "7c65698141490d6aa51ff544f3532d946cdb289fd4c6e4c32d58b259b916af96",
    sourceVerified: true,
    rightsReviewed: true,
    accessibilityReviewed: true,
    productionReleased: false,
    relatedPublicationIds: [archiveFamilyIds.lastHumanWorkforce, archiveFamilyIds.serverAsFurnace],
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
      "This preview is a structured narrative review, not a preregistered systematic review or meta-analysis. Evidence is heterogeneous and often based on small cohorts or specialized programs.",
  },
  {
    candidateId: "IO-V1-INDEPENDENT-OBSERVER-METHOD",
    familyId: familyIdForKey("IO-V1-INDEPENDENT-OBSERVER-METHOD"),
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
    status: "Published bounded text adaptation",
    version: "Web adaptation v2",
    factualCutoffDate: "2026-07-30",
    publicationDate: "2026-09-18",
    lastReviewedDate: "2026-09-18",
    license: "CC BY-NC-ND 4.0",
    controllerSha256: "76d5d011f1e012788bfa748e876395c4f10b7a3552ca7a580a758655d0d2fe3f",
    sourceVerified: true,
    rightsReviewed: true,
    accessibilityReviewed: true,
    productionReleased: true,
    relatedPublicationIds: [archiveFamilyIds.democracysAchillesHeel],
    paragraphs: [
      "Independence is often confused with centrism. The two are not the same.",
      "Centrism is a position on an ideological spectrum. Independence is a rule for handling evidence: state the standard before the conclusion, apply it across coalitions, distinguish facts from interpretations, and correct the record when the evidence changes.",
      "The Independent Observer Method is built around four questions:",
      "What mechanism could produce the outcome? What would we expect to observe if that mechanism were operating? Which levers could change it? What tradeoffs or new risks would those levers create?",
      "This structure is deliberately modest. It does not promise neutrality, omniscience, or a single correct political program. It makes disagreement more useful by forcing a claim to show its moving parts.",
      "The public context makes that discipline valuable. Gallup reported that 45% of U.S. adults identified as political independents in 2025. Pew Research Center reported that 17% trusted the federal government to do what is right “just about always” or “most of the time” in September 2025. Those numbers do not prove that everyone wants the same kind of publication. They do show a measurable environment of weak party attachment and low institutional trust.",
      "The method’s central thesis is that institutional trust can function like infrastructure. North’s institutional-economics work connects rules and institutions to transaction costs and economic performance. The Independent Observer does not convert that institutional perspective into a universal “trust causes growth” formula. It uses this perspective as a reason to ask practical questions: Are rules predictable? Are decisions explainable? Can a person appeal? Can an outsider verify what happened? Are enforcement standards applied consistently?",
      "A publication that wants to be independent must also be correctable. A claim should have a version, a source note, and a revision history. A disagreement should be answered by clarifying the proposition, narrowing it, adding evidence, or withdrawing it—not by quietly changing the standard after the fact.",
      "That is why this method is not a promise to avoid judgment. It is a promise to make judgment inspectable. A paper may conclude that a policy is unjust, inefficient, or dangerous. But the conclusion should identify the evidence, the mechanism, the uncertainty, and the cost of the proposed alternative.",
      "The goal is an institutional posture in miniature: broad enough to be used across subjects, disciplined enough to resist partisan conversion, and transparent enough to be corrected in public.",
    ],
    sourceNotes: [
      {
        label: "Gallup, political identification in 2025 (12 January 2026)",
        href: "https://news.gallup.com/poll/700499/new-high-identify-political-independents.aspx",
      },
      {
        label: "Pew Research Center, Public Trust in Government: 1958–2025",
        href: "https://www.pewresearch.org/politics/2025/12/04/public-trust-in-government-1958-2025/",
      },
      {
        label: "Douglass C. North (1987), Institutions, Transaction Costs and Economic Growth",
        href: "https://doi.org/10.1111/j.1465-7295.1987.tb00750.x",
      },
    ],
    limitations:
      "This is an author-written, bounded public adaptation, not an independently peer-reviewed study. Polling figures describe their stated periods and do not establish demand for this publication. Institutional and policy passages are the author’s analysis; associations are not presented as universal causal laws.",
  },
  {
    candidateId: "IO-V4-LAST-HUMAN-WORKFORCE",
    familyId: familyIdForKey("IO-V4-LAST-HUMAN-WORKFORCE"),
    slug: "the-last-human-workforce",
    title: "The Last Human Workforce: Task Bundles, Automation, and Transition Design",
    shortTitle: "The Last Human Workforce: Task Bundles, Automation, and Transition Design",
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
    relatedPublicationIds: [archiveFamilyIds.serverAsFurnace, archiveFamilyIds.regrowingHumanity],
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
    familyId: familyIdForKey("IO-V3-SERVER-AS-FURNACE"),
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
    relatedPublicationIds: [archiveFamilyIds.lastHumanWorkforce],
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
      {
        label: "Author’s ResearchGate record",
        href: "https://www.researchgate.net/publication/411789776_The_Server_as_a_Furnace_Rust_Belt_AI_Thermal_Infrastructure",
      },
    ],
    limitations:
      "Conceptual engineering analysis only; no site-specific design, feasibility finding, safety certification, or professional engineering advice.",
  },
  {
    candidateId: "IO-V2-BORROWED-LABOR",
    familyId: familyIdForKey("IO-V2-BORROWED-LABOR"),
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
    relatedPublicationIds: [archiveFamilyIds.democracysAchillesHeel],
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
    familyId: familyIdForKey("IO-V2-DEMOCRACYS-ACHILLES-HEEL"),
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
    status: "Published bounded text adaptation",
    version: "Web adaptation v2",
    factualCutoffDate: "2026-08-16",
    publicationDate: "2026-09-18",
    lastReviewedDate: "2026-09-18",
    license: "CC BY-NC-ND 4.0",
    controllerSha256: "e18478ee1676f1720abf7e766f7314c665ef501445120188ef1433177c8cada7",
    sourceVerified: true,
    rightsReviewed: true,
    accessibilityReviewed: true,
    productionReleased: true,
    relatedPublicationIds: [
      archiveFamilyIds.independentObserverMethod,
      archiveFamilyIds.borrowedLabor,
    ],
    paragraphs: [
      "Democracy’s formal promise is simple: citizens possess equal political standing, ballots are counted, and public power can be contested peacefully.",
      "That promise is necessary. It is not the whole system.",
      "A citizen must also be able to obtain information, organize, reach the relevant institution, understand the rules, withstand administrative burdens, and obtain a meaningful correction when a decision is wrong. The gap between formal equality and practical responsiveness is this article’s central concern.",
      "The scale of voting in the United States is one reason the argument should not be confused with fatalism. The U.S. Election Assistance Commission reports that the 2024 general election produced more than 158 million counted ballots, with turnout equal to 64.7% of the citizen voting-age population. Those figures are evidence of substantial participation. They do not, by themselves, answer whether agenda-setting, access, information, or administrative correction are equally available between elections.",
      "The working framework identifies five channels:",
      "Resource conversion: money, expertise, organization, and time can become sustained political access. Administrative access: registration, identification, polling, mail, disability access, language access, and correction procedures can impose different practical costs. Information pluralism: citizens need multiple independent ways to discover, contest, and correct public claims. Partisan tolerance: voters and institutions may excuse rule-breaking when the preferred side benefits. Institutional referees: courts, election administrators, auditors, regulators, and professional civil services need both independence and accountability.",
      "None of these channels is a complete theory of democratic failure. Each can also have legitimate functions. Identification rules can protect accurate administration; courts can protect minorities; professional expertise can improve decisions; and constitutional veto points can slow harmful majorities. The question is whether a rule’s necessity, implementation, and review are proportionate to the burden it creates.",
      "This is why the article rejects universal formulas. A single percentage about media ownership, a single turnout comparison, or a single scandal cannot stand in for a defined market, jurisdiction, period, and mechanism. Good analysis names what is being measured and what the evidence cannot show.",
      "The practical test is contestability. Can an opposition realistically win? Can it obtain information and competent administration? Can rights be exercised without partisan identity becoming the price of entry? Can an adverse decision be reviewed? Can a temporary advantage be reversed without first dismantling the system?",
      "These questions do not produce a single ideology. They produce a publication discipline. State the mechanism. Identify the observable implication. Name plausible confounders. Separate documented fact from interpretation. Then evaluate reform not only by the problem it targets, but also by the new veto points or capture opportunities it might create.",
      "Democracy’s vulnerability is therefore not that citizens are always powerless or that institutions are always corrupt. It is that advantages can compound while correction becomes harder to access. The remedy is not a romantic return to an imagined past. It is continuous institutional engineering: clearer rules, lower avoidable burdens, plural information, accountable expertise, and visible routes for correction.",
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

export const releasedGreenPublications = greenPublications.filter(
  (item) => item.productionReleased,
);
/**
 * Bounded previews stay visible for editorial and visual review. They are
 * never treated as releases; release feeds and indexing use the strict
 * releasedGreenPublications collection above.
 */
export const previewGreenPublications = greenPublications;
export const greenPublicationBySlug = new Map(
  greenPublications.map((publication) => [publication.slug, publication]),
);
export const greenPublicationById = new Map(
  greenPublications.map((publication) => [publication.candidateId, publication]),
);
export const greenPublicationByFamilyId = new Map(
  greenPublications.map((publication) => [publication.familyId, publication]),
);

export function readingTimeMinutes(publication: GreenPublication) {
  const words = publication.paragraphs.join(" ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

export function publicGreenPublication(publication: GreenPublication) {
  const { controllerSha256: _controllerSha256, ...safe } = publication;
  return { ...safe, readingTimeMinutes: readingTimeMinutes(publication) };
}
