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
  editorialType?: "Analysis" | "Method";
  citations?: { paragraph: number; sources: number[] }[];
  sectionHeadings?: { beforeParagraph: number; id: string; title: string }[];
  revisionNotes?: { date: string; change: string }[];
  adaptationDisclosure?: string;
};

const author = "Siddhartha Harsh Wardhan";

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
    editorialType: "Method",
    citations: [
      { paragraph: 5, sources: [0, 1] },
      { paragraph: 6, sources: [2] },
    ],
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
    status: "Published bounded text adaptation",
    version: "Web adaptation v2",
    factualCutoffDate: "2026-10-09",
    publicationDate: "2026-10-09",
    lastReviewedDate: "2026-10-09",
    license: "CC BY-NC-ND 4.0",
    controllerSha256: "31f921f6e7f52949687ed0b096bc783945752452aebfa29a1ded0856b84dc30d",
    sourceVerified: true,
    rightsReviewed: true,
    accessibilityReviewed: true,
    productionReleased: true,
    relatedPublicationIds: [archiveFamilyIds.serverAsFurnace, archiveFamilyIds.regrowingHumanity],
    paragraphs: [
      "The most misleading question about artificial intelligence and work is: “Which jobs will disappear?”",
      "A better question is: “Which tasks will move, which tasks will be redesigned, and who will control the transition?”",
      "Economic production is made of task bundles. Automation can move tasks from workers to machines. But technology can also create new tasks in which people retain a comparative advantage. Acemoglu and Restrepo describe this tension as the interaction between displacement and reinstatement: automation can reduce labor demand in tasks it takes over, while new tasks can create demand for labor elsewhere. The result is not a simple story of machines replacing everyone or technology helping everyone equally.",
      "That distinction matters because job titles can survive while the work inside them changes. A customer-support representative may still hold the same title while receiving automated suggestions, summaries, routing, and quality checks. A researcher may still write, but spend more time designing questions, checking sources, and deciding what deserves publication. A teacher may still teach, while routine practice and feedback are partly automated. These are analytical possibilities, not universal predictions; the institutional question is who receives training and who is left with only the most monitored or precarious tasks.",
      "One field study gives the argument a useful boundary. In the final 2025 journal publication, Brynjolfsson, Li, and Raymond studied 5,172 customer-support agents during the introduction of a generative-AI conversational assistant. They reported an average 15% increase in issues resolved per hour. Less experienced and lower-skilled agents benefited more, while the most experienced and highest-skilled agents saw small speed gains and small quality declines. The finding is important precisely because it is specific: it describes one customer-support setting, not a guaranteed productivity gain in every occupation.",
      "The policy lesson is therefore neither prohibition nor surrender. It is transition design.",
      "Workers need enough domain knowledge to recognize a wrong answer, enough tool literacy to use assistance productively, and enough bargaining power to benefit from productivity gains rather than absorb all of the adjustment cost. Employers that deploy AI can be asked to disclose where tasks are changing, provide training, and evaluate workers on outcomes rather than on an obsolete performance ritual. Schools and public institutions can teach source verification, process documentation, and practical demonstration alongside foundational knowledge.",
      "The phrase “last human workforce” should not be read as a prophecy that humans become economically irrelevant. It names a struggle over the last workforce arrangement in which a job title, a credential, and a stable social position were expected to line up automatically. That arrangement was never universal, and it was never equally accessible. But its erosion creates a public question: will AI widen the distance between owners of systems and people who perform fragmented tasks, or will institutions use it to expand capability?",
      "The evidence does not decide that question in advance. It does establish a disciplined starting point: track tasks, measure outcomes, disclose uncertainty, and give workers a real path to learn and move.",
    ],
    sourceNotes: [
      {
        label:
          "Acemoglu and Restrepo (2019), Automation and New Tasks: How Technology Displaces and Reinstates Labor, Journal of Economic Perspectives 33(2), 3–30",
        href: "https://www.aeaweb.org/articles?id=10.1257/jep.33.2.3",
      },
      {
        label:
          "Brynjolfsson, Li, and Raymond (2025), Generative AI at Work, Quarterly Journal of Economics 140(2), 889–942, abstract; DOI 10.1093/qje/qjae044",
        href: "https://doi.org/10.1093/qje/qjae044",
      },
    ],
    limitations:
      "This is an author’s analysis, not an independently peer-reviewed study or a forecast of employment. The cited field study concerns one customer-support setting; its results do not establish effects in every occupation. Examples of changing research and teaching tasks are analytical possibilities. Training and bargaining proposals are the author’s policy interpretation.",
    editorialType: "Analysis",
    citations: [
      {
        paragraph: 2,
        sources: [0],
      },
      {
        paragraph: 4,
        sources: [1],
      },
    ],
    sectionHeadings: [
      {
        beforeParagraph: 0,
        id: "tasks-before-titles",
        title: "Start with tasks, not job titles",
      },
      {
        beforeParagraph: 4,
        id: "workplace-evidence",
        title: "What one workplace study shows",
      },
      {
        beforeParagraph: 5,
        id: "transition-design",
        title: "Transition design is a public choice",
      },
    ],
    revisionNotes: [
      {
        date: "2026-10-09",
        change:
          "First released web edition, expanded from the short preview. The customer-support evidence now cites the final 2025 journal publication (5,172 agents; 15% average productivity gain), replacing the 2023 working-paper figures (5,179; 14%; 34% subgroup gain).",
      },
    ],
    adaptationDisclosure:
      "This web edition was prepared with AI assistance for editing, source checking, and website implementation. The argument is the author’s; no independent peer review is claimed. Funding and conflict-of-interest declarations have not been supplied.",
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
    status: "Published bounded text adaptation",
    version: "Web adaptation v2",
    factualCutoffDate: "2026-10-09",
    publicationDate: "2026-10-09",
    lastReviewedDate: "2026-10-09",
    license: "CC BY-NC-ND 4.0",
    controllerSha256: "e4e8bda82c77dae4695a9b78c6446fbc98fb4e332566f535e106b4899fb3d5fe0",
    sourceVerified: true,
    rightsReviewed: true,
    accessibilityReviewed: true,
    productionReleased: true,
    relatedPublicationIds: [archiveFamilyIds.lastHumanWorkforce],
    paragraphs: [
      "Artificial intelligence is often discussed as if it were weightless: models, tokens, clouds, and intelligence moving through a network.",
      "The physical system is different. A data center is an electrical load, a cooling plant, a fiber node, a secured building, a water user or water-avoidance system, and a site that makes demands on local infrastructure. Lawrence Berkeley National Laboratory’s 2024 report treats data-center electricity use as a national planning issue while emphasizing that future demand remains scenario-dependent.",
      "The phrase “the server as a furnace” is a physical reminder, not a promise of free energy. Electricity delivered to computing equipment ultimately becomes heat. The practical question is whether that heat is rejected as a liability or captured at a useful temperature for a nearby demand.",
      "The most credible pathway is a chain of ordinary components: liquid cooling close to the chip, a coolant-distribution unit or heat exchanger, a separated facility loop, a heat pump where temperature lift is necessary, insulated distribution, and a heat host such as a building, campus, industrial process, or district loop. The Department of Energy’s data-center design guidance emphasizes the importance of a nearby heat host, a compatible temperature level, and redundant cooling when the host cannot accept heat. ASHRAE’s AI data-center framework similarly identifies direct-to-chip and warm-water loops as potential enablers of higher-grade heat reuse.",
      "That conditional language matters. A data center cannot heat a neighborhood merely because it produces heat. The host must be close enough, the temperature must be useful, the pipe route must be affordable, the load profile must align, and the cooling system must remain reliable when the network is unavailable. Some buildings, parcels, and industrial sites will fail these tests.",
      "The same discipline applies to water. A closed technology loop can move heat without putting sensitive IT equipment directly in an open facility-water system, but the overall site still has to account for heat rejection, makeup water, treatment, and drought conditions. “Water-free” is not a universal label; it is a design claim that must specify which loop, climate, operating condition, and backup system it describes.",
      "The public bargain is equally important. A locality should not treat a large computing load as a factory simply because a project carries an industrial aesthetic. Construction jobs are not permanent jobs. A tax concession is not automatically a community benefit. A site should earn public support through measurable commitments: resource reporting, reliable heat-reuse performance where feasible, paid apprenticeships, local training, noise and diesel controls, affordable heat or public-building connections where appropriate, and restoration obligations if the facility closes.",
      "This is the proposed Rust Belt AI–Thermal Redevelopment District: not a promise that every vacant mall or factory can become a data center, but a screening and governance framework for projects that connect computing to grid upgrades, thermal networks, skilled trades, repair, and enforceable public claims.",
      "The larger point is modest. AI infrastructure will not recreate the employment density or civic institutions of a mid-century steel plant by itself. But a region can still ask whether a new electrical load leaves behind more than servers: a stronger grid, useful heat, trained people, accountable procurement, and infrastructure that remains valuable after the software cycle changes.",
    ],
    sourceNotes: [
      {
        label:
          "Lawrence Berkeley National Laboratory (2024), United States Data Center Energy Usage Report",
        href: "https://eta-publications.lbl.gov/publications/2024-lbnl-data-center-energy-usage-report",
      },
      {
        label:
          "U.S. Department of Energy (July 2024), Best Practices Guide for Energy-Efficient Data Center Design, sections 5.6 and 7.1",
        href: "https://www.energy.gov/sites/default/files/2024-07/best-practice-guide-data-center-design_0.pdf",
      },
      {
        label:
          "PNNL/ASHRAE/NEMA, AI Data Center Energy Performance Framework: Energy and Thermal Efficiency, heat reuse and technology cooling systems",
        href: "https://www.ashrae.org/technical-resources/topics-and-initiatives/ai-data-center/energy-and-thermal-efficiency",
      },
      {
        label:
          "U.S. Department of Energy, Cooling Water Efficiency Opportunities for Federal Data Centers",
        href: "https://www.energy.gov/cmei/femp/cooling-water-efficiency-opportunities-federal-data-centers",
      },
    ],
    limitations:
      "This is an author’s infrastructure and policy analysis, not a peer-reviewed study, a site-specific feasibility assessment, or professional engineering advice. Heat reuse depends on local design and demand; the proposed redevelopment district and community-benefit conditions are the author’s proposals, not documented project outcomes.",
    editorialType: "Analysis",
    citations: [
      {
        paragraph: 1,
        sources: [0],
      },
      {
        paragraph: 2,
        sources: [1],
      },
      {
        paragraph: 3,
        sources: [1, 2],
      },
      {
        paragraph: 4,
        sources: [1],
      },
      {
        paragraph: 5,
        sources: [2, 3],
      },
    ],
    sectionHeadings: [
      {
        beforeParagraph: 0,
        id: "physical-infrastructure",
        title: "AI has a physical footprint",
      },
      {
        beforeParagraph: 2,
        id: "useful-heat",
        title: "When waste heat becomes useful",
      },
      {
        beforeParagraph: 5,
        id: "water-and-reliability",
        title: "Water claims need a boundary",
      },
      {
        beforeParagraph: 6,
        id: "public-bargain",
        title: "What should a community receive?",
      },
    ],
    revisionNotes: [
      {
        date: "2026-10-09",
        change:
          "First released web edition, expanded from the short preview. Technical sources were checked, the DOE and ASHRAE citation destinations corrected, and design conditions separated from the author’s redevelopment proposal.",
      },
    ],
    adaptationDisclosure:
      "This web edition was prepared with AI assistance for editing, source checking, and website implementation. The argument is the author’s; no independent peer review is claimed. Funding and conflict-of-interest declarations have not been supplied.",
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
    citations: [{ paragraph: 3, sources: [0, 1] }],
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
