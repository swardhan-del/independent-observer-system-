import taxonomy from "../../plugins/library-content/taxonomy.generated.json" with { type: "json" };
import { familyIdForKey } from "./family-registry";

/** Public research questions only. Neither a manuscript controller nor a release approval. */
type PreviewNote = {
  key: string;
  priority?: boolean;
  lenses: string[];
  question: string;
  contribution: string;
  evidenceNeeded: string;
  related: string[];
};

export const volumeThreePreviewStatus = "Research preview · manuscript under review";
export const volumeThreePreviewDate = "2026-11-12";

const notes: PreviewNote[] = [
  {
    key: "from-pockets-to-portfolios",
    priority: true,
    lenses: ["Labor markets", "Taxation and ownership", "Welfare and social control"],
    question:
      "How should time lost to policing and legal obligations enter an account of working-class economic security?",
    contribution:
      "Connects the volume’s analysis of work and ownership to a proposed labor-first account of social citizenship. It asks readers to follow time costs alongside wages and assets.",
    evidenceNeeded:
      "Distinguish stops, protective frisks and traffic enforcement; verify jurisdiction and current doctrine. Test claims about missed work, fees and tax incidence against dated evidence. The proposed reform is not legal advice or a scored fiscal policy.",
    related: ["the-economics-of-color", "redistribution-and-working-class-prosperity"],
  },
  {
    key: "the-economics-of-color",
    priority: true,
    lenses: ["Labor markets", "Welfare and social control", "Public visibility"],
    question:
      "How do industrial employment, accumulated wealth and legal institutions interact with racial inequality?",
    contribution:
      "Brings employment, place, ownership and cultural expression into the same inquiry while keeping their separate histories visible.",
    evidenceNeeded:
      "Compare competing explanations and distinguish association from causation. Review manuscript variants, demographic comparisons, citations and figure rights. This preview makes no claim about inherent group traits and does not reduce racial inequality to a single cause.",
    related: ["from-steel-to-screens", "the-perception-proxy"],
  },
  {
    key: "the-perception-proxy",
    priority: true,
    lenses: ["Public visibility", "Labor markets", "Welfare and social control"],
    question:
      "When does media attention translate economic insecurity into symbolic or identity conflict?",
    contribution:
      "Examines the proposed connection between material displacement, attention incentives and public explanations of hardship. It connects the volume’s economic questions to the narratives people encounter.",
    evidenceNeeded:
      "Test audience selection, platform incentives and alternative causes with transparent methods. A proposed mechanism does not establish deliberate coordination, individual motives or a universal explanation of political disagreement.",
    related: ["smashing-the-proxy", "nativist-politics-and-globalized-capital"],
  },
  {
    key: "redistribution-and-working-class-prosperity",
    priority: true,
    lenses: ["Taxation and ownership", "Labor markets"],
    question:
      "Which combinations of taxation, investment and public spending improve working-class security?",
    contribution:
      "Introduces a competing policy argument about capital mobility, municipal revenue and access to jobs and ownership. It gives the volume’s tax proposals a comparison to test.",
    evidenceNeeded:
      "The source title argues that taxing shareholders and investors does not lift the working class; that is a thesis under review. Compare tax incidence, revenue stability, public-service benefits and distributional outcomes across jurisdictions before drawing a policy conclusion.",
    related: ["from-pockets-to-portfolios", "social-class-and-welfare"],
  },
  {
    key: "status-incentives-and-boundary-expansion-in-u-s-racial-classification",
    priority: true,
    lenses: ["Public visibility", "Licensing and access"],
    question:
      "How do administrative categories, institutional treatment and social status change at different speeds?",
    contribution:
      "Offers a three-part research framework for separating statistical definitions, institutional sorting and cultural signals.",
    evidenceNeeded:
      "Verify the applicable statistical standards and their implementation dates. Evaluate the status-incentive hypothesis separately from documented category changes. Administrative classifications do not establish biological differences or individual identity.",
    related: ["the-economics-of-color", "the-closed-door-penalty"],
  },
  {
    key: "empire-without-bread",
    priority: true,
    lenses: ["Public visibility", "Welfare and social control"],
    question:
      "How can we compare attention to geopolitical commitments with attention to domestic material needs?",
    contribution:
      "Connects Volume II’s inquiry into sovereignty with Volume III’s concern for social citizenship through budgets, legislative attention and institutional priorities.",
    evidenceNeeded:
      "The existing research map places this family in Volume II. Its inclusion here is a cross-volume reading connection. Spending, agenda time and influence require separate measures; none alone establishes elite intent or the absence of democratic accountability.",
    related: [
      "economic-displacement-and-social-welfare",
      "from-territorial-collapse-to-networked-fade",
    ],
  },
  {
    key: "illiterate-voters-corrupt-leaders",
    priority: true,
    lenses: ["Public visibility", "Licensing and access"],
    question:
      "What conditions help civic literacy translate into effective democratic accountability?",
    contribution:
      "Connects educational access, public information and participation to the volume’s broader account of social citizenship.",
    evidenceNeeded:
      "Literacy, education, corruption and participation require distinct definitions and comparable data. Correlation does not establish causation or justify stereotypes about voters. The expanded manuscript and its figure remain under review; this preview reproduces neither its statistics nor its figure.",
    related: ["misdiagnosing-the-problem", "the-administrative-university"],
  },
  {
    key: "economic-displacement-and-social-welfare",
    priority: true,
    lenses: ["Labor markets", "Welfare and social control", "Taxation and ownership"],
    question:
      "How can monetary change, political finance and labor institutions be studied together without assuming one master cause?",
    contribution:
      "Provides the integrated macroeconomic research direction behind the volume: connect household outcomes to monetary arrangements, bargaining power and social protection.",
    evidenceNeeded:
      "The source synthesizes a 1971–2025 timeline. Parallel versions still require reconciliation. Verify each historical series and legal claim independently; events moving together do not establish a single causal chain. This is a preview of the synthesis, not the completed book.",
    related: [
      "from-ious-to-empires",
      "welfare-wealthfare-and-social-control-in-advanced-democracies",
    ],
  },
  {
    key: "welfare-wealthfare-and-social-control-in-advanced-democracies",
    lenses: ["Welfare and social control", "Labor markets", "Public visibility"],
    question:
      "When do assistance and asset-support policies expand mobility, and when do they manage insecurity?",
    contribution:
      "Places welfare conditions and support for asset owners within a shared inquiry into access, mobility and administrative power.",
    evidenceNeeded:
      "Compare eligibility, take-up, sanctions and long-term outcomes. Claims of social control are hypotheses requiring institutional evidence; they do not establish the intentions of every administrator.",
    related: ["social-class-and-welfare", "homelessness-manufacture"],
  },
  {
    key: "social-class-and-welfare",
    lenses: ["Welfare and social control", "Labor markets", "Taxation and ownership"],
    question: "How could welfare design connect immediate security with access to ownership?",
    contribution:
      "Uses welfare socialism as an open analytical question about collective provision, dignity and social citizenship. It links the volume’s household and institutional perspectives.",
    evidenceNeeded:
      "Specify eligibility, financing, implementation and distributional effects. Ownership proposals require comparison with cash support and public services; no preferred model is treated as validated.",
    related: ["redistribution-and-working-class-prosperity", "hours-to-ownership"],
  },
  {
    key: "from-prescription-pad-to-power",
    lenses: ["Health systems", "Licensing and access", "Taxation and ownership"],
    question:
      "How do clinical labor, research ownership and professional access shape medical innovation?",
    contribution:
      "Connects the volume’s labor-to-ownership inquiry to physician entrepreneurship, intellectual property and the organization of research.",
    evidenceNeeded:
      "Separate clinical evidence from economic and institutional proposals. Licensing rules, ownership arrangements and incentives need jurisdiction-specific review; this preview gives no clinical or investment guidance.",
    related: ["at-will-america-globalized-r-d-and-physician-pay", "from-iou-to-do"],
  },
  {
    key: "from-iou-to-do",
    lenses: ["Health systems", "Labor markets", "Taxation and ownership"],
    question: "Through which mechanisms could monetary and trade choices affect medical labor?",
    contribution:
      "Connects macroeconomic arrangements to the financing and organization of essential professional work.",
    evidenceNeeded:
      "Each proposed link between debt instruments, tariffs and medical employment requires its own evidence and time scale. The chain remains a research question rather than a verified forecast.",
    related: ["from-prescription-pad-to-power", "economic-displacement-and-social-welfare"],
  },
  {
    key: "from-steel-to-screens",
    lenses: ["Labor markets", "Welfare and social control", "Public visibility"],
    question: "How do employment loss and changing media markets reshape available forms of work?",
    contribution:
      "Connects industrial restructuring with screen-based work and the institutions surrounding economic insecurity.",
    evidenceNeeded:
      "Resolve manuscript variants before releasing a longer text. Distinguish voluntary work, constrained choice and coercion; employment and incarceration trends alone do not prove a causal pathway.",
    related: ["the-economics-of-color", "hours-to-ownership"],
  },
  {
    key: "homelessness-manufacture",
    lenses: ["Welfare and social control", "Labor markets"],
    question: "Which housing and institutional incentives contribute to persistent insecurity?",
    contribution:
      "Connects household vulnerability to housing supply, administration and the outcomes of public intervention.",
    evidenceNeeded:
      "The title names a research hypothesis. Test mechanisms against local housing, income and service data; persistence of homelessness does not by itself prove deliberate manufacture.",
    related: [
      "welfare-wealthfare-and-social-control-in-advanced-democracies",
      "the-broken-window-state",
    ],
  },
  {
    key: "hours-to-ownership",
    lenses: ["Labor markets", "Taxation and ownership"],
    question: "How does access to productive assets affect who benefits from cognitive automation?",
    contribution:
      "Connects returns from labor to ownership of equity, data, intellectual property and computing infrastructure.",
    evidenceNeeded:
      "Distinguish task exposure from job loss and potential productivity from measured gains. Compare proposed ownership mechanisms by cost, access and distribution of risk.",
    related: ["social-class-and-welfare", "the-digital-empire"],
  },
  {
    key: "passport-strength-is-not-merit",
    lenses: ["Labor markets", "Licensing and access"],
    question: "How do mobility rules shape access to work independently of individual skill?",
    contribution:
      "Extends the volume’s account of opportunity to migration categories, outsourcing and the international distribution of skilled work.",
    evidenceNeeded:
      "Compare specific mobility and credential-recognition systems. Nationality is not a measure of merit, and aggregate migration patterns do not establish an individual’s ability or intentions.",
    related: ["at-will-america-globalized-r-d-and-physician-pay", "the-closed-door-penalty"],
  },
  {
    key: "the-broken-window-state",
    lenses: ["Welfare and social control", "Health systems"],
    question:
      "How should courts, probation and treatment systems be evaluated by their incentives and outcomes?",
    contribution:
      "Brings institutional responses to hardship into the same frame as prevention, recovery and public capacity.",
    evidenceNeeded:
      "Separate legal authority, program financing and measured outcomes. Proposed institutional incentives require evidence; this preview does not attribute misconduct or offer treatment advice.",
    related: ["homelessness-manufacture", "from-pockets-to-portfolios"],
  },
  {
    key: "the-plate-they-deny",
    lenses: ["Welfare and social control", "Public visibility", "Labor markets"],
    question:
      "How do welfare narratives influence cooperation among people facing economic insecurity?",
    contribution:
      "Connects deindustrialization and social provision to the language through which political interests are formed.",
    evidenceNeeded:
      "Compare narrative content with policy design and audience responses. Claims about racialized framing require contextual evidence and cannot establish the motives of all speakers or voters.",
    related: [
      "the-perception-proxy",
      "welfare-wealthfare-and-social-control-in-advanced-democracies",
    ],
  },
  {
    key: "nativist-politics-and-globalized-capital",
    lenses: ["Labor markets", "Public visibility"],
    question: "How do nationalist narratives interact with cross-border production and investment?",
    contribution:
      "Connects political explanations of economic insecurity to the material dependencies of firms and labor markets.",
    evidenceNeeded:
      "Define the narrative, policy and economic relationship being compared. Distinguish rhetoric from implementation and avoid treating national populations or political movements as uniform.",
    related: ["passport-strength-is-not-merit", "from-ious-to-empires"],
  },
  {
    key: "smashing-the-proxy",
    lenses: ["Public visibility", "Taxation and ownership"],
    question:
      "When does symbolic targeting influence institutions, and when does it leave ownership unchanged?",
    contribution:
      "Connects public expression to the distinction between visible brands and the institutions or assets they represent.",
    evidenceNeeded:
      "Define outcomes before interpreting an episode of protest or vandalism. Symbolic action, ownership change and policy effects require separate evidence; this is analysis, not encouragement of property damage.",
    related: ["the-perception-proxy", "hours-to-ownership"],
  },
  {
    key: "the-closed-door-penalty",
    lenses: ["Licensing and access", "Labor markets", "Public visibility"],
    question:
      "How could exclusionary rhetoric affect cooperation, talent and institutional access?",
    contribution:
      "Proposes a way to connect public language with the practical relationships on which economic capacity depends.",
    evidenceNeeded:
      "Separate rhetoric from other causes of changing trade, mobility or cooperation. Test the proposed mechanism across cases without assigning collective intent to a population.",
    related: [
      "passport-strength-is-not-merit",
      "status-incentives-and-boundary-expansion-in-u-s-racial-classification",
    ],
  },
  {
    key: "from-ious-to-empires",
    lenses: ["Labor markets", "Taxation and ownership"],
    question: "How are monetary claims, demand and industrial capacity connected across economies?",
    contribution:
      "Connects the volume’s household concerns to production networks and the relationship between finance and material capacity.",
    evidenceNeeded:
      "Use dated trade, production and financial accounts with consistent definitions. Distinguish a proposed framework from a complete model of U.S.–China interdependence.",
    related: [
      "economic-displacement-and-social-welfare",
      "the-empire-of-the-dollar-vs-the-brics-parallel-market",
    ],
  },
  {
    key: "from-territorial-collapse-to-networked-fade",
    lenses: ["Public visibility", "Taxation and ownership"],
    question:
      "How does declining territorial control compare with changing influence through networks?",
    contribution:
      "Connects historical comparison to financial, technological and institutional forms of power relevant to economic life.",
    evidenceNeeded:
      "Specify comparable indicators and limits of the historical analogy. A framework for studying decline is not a prediction of collapse.",
    related: ["empire-without-bread", "the-digital-empire"],
  },
  {
    key: "the-digital-empire",
    lenses: ["Taxation and ownership", "Licensing and access"],
    question: "Who controls the infrastructure on which digital participation depends?",
    contribution:
      "Connects fiber, cloud platforms and data infrastructure to ownership, access and economic influence.",
    evidenceNeeded:
      "Distinguish physical ownership, operational control, market concentration and jurisdiction. Infrastructure maps alone do not establish coercion or political intent.",
    related: ["hours-to-ownership", "from-territorial-collapse-to-networked-fade"],
  },
  {
    key: "the-empire-of-the-dollar-vs-the-brics-parallel-market",
    lenses: ["Taxation and ownership", "Public visibility"],
    question:
      "Which changes in trade settlement and financial infrastructure would meaningfully alter monetary influence?",
    contribution:
      "Connects monetary arrangements to the volume’s inquiry into economic capacity and distribution.",
    evidenceNeeded:
      "Separate settlement currency, invoicing, reserves and payment infrastructure. Use dated measures; a non-dollar transaction does not by itself demonstrate a replacement monetary order.",
    related: ["from-ious-to-empires", "economic-displacement-and-social-welfare"],
  },
  {
    key: "at-will-america-globalized-r-d-and-physician-pay",
    lenses: ["Health systems", "Labor markets", "Licensing and access"],
    question:
      "How do employment institutions and international research networks shape medical careers?",
    contribution:
      "Connects professional training and clinical work to institutional bargaining power and the organization of innovation.",
    evidenceNeeded:
      "Verify country-specific employment, licensing and remuneration arrangements. Separate compensation data from career predictions; this preview is not employment, immigration or financial advice.",
    related: ["from-prescription-pad-to-power", "passport-strength-is-not-merit"],
  },
  {
    key: "misdiagnosing-the-problem",
    lenses: ["Licensing and access", "Public visibility"],
    question: "Which parts of education governance actually control funding, access and outcomes?",
    contribution:
      "Connects institutional design to the volume’s concern with the development of human capability.",
    evidenceNeeded:
      "Separate federal, state and local responsibilities and date any policy proposal. Evaluate actual funding and outcome mechanisms before attributing an education problem to a single institution.",
    related: ["illiterate-voters-corrupt-leaders", "the-administrative-university"],
  },
  {
    key: "the-administrative-university",
    lenses: ["Licensing and access", "Labor markets"],
    question:
      "When do university processes support academic mobility, and when do they create avoidable barriers?",
    contribution:
      "Connects institutional administration, tuition and student debt to the acquisition and recognition of capability.",
    evidenceNeeded:
      "Compare defined administrative functions, costs and outcomes. The research direction does not establish wrongdoing by an institution or reproduce personal case records.",
    related: ["misdiagnosing-the-problem", "at-will-america-globalized-r-d-and-physician-pay"],
  },
];

export const volumeThreePreviews = notes.map((note) => {
  const taxonomyId = `paper-${note.key}`;
  const entry = taxonomy.find((candidate) => candidate.id === taxonomyId);
  if (!entry || entry.href) throw new Error(`Review preview identity: ${taxonomyId}`);
  return {
    ...note,
    id: note.key,
    taxonomyId,
    familyId: familyIdForKey(entry.title),
    title: entry.title,
    summary: entry.summary,
    volume: entry.volume,
    branch: entry.branch,
    topics: ["Economics", "Politics"],
    href: `/library/research/${note.key}/`,
    status: volumeThreePreviewStatus,
    manuscriptReleased: false as const,
  };
});
export type VolumeThreePreview = (typeof volumeThreePreviews)[number];
