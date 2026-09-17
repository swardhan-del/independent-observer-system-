import type { GreenPublication } from "./green-publications";
import { archiveFamilyIds, familyIdForKey } from "./family-registry";

export type EvidenceKind = "documented" | "interpretation" | "proposition" | "limitation";

export type EvidenceRecord = {
  kind: EvidenceKind;
  label: string;
  claim: string;
  sourceLabel?: string;
  sourceHref?: string;
};

export type CuratedPublication = Omit<
  GreenPublication,
  "controllerSha256" | "sourceVerified" | "rightsReviewed" | "accessibilityReviewed"
> & {
  controllerSha256?: string;
  sourceVerified: true;
  rightsReviewed: boolean;
  accessibilityReviewed: true;
  adaptationNote: string;
  evidence: EvidenceRecord[];
};

const author = "Siddhartha Harsh Wardhan";
const previewStatus = "Preview-only bounded text adaptation" as const;
const license = "CC BY-NC-ND 4.0";

export const curatedPublications: CuratedPublication[] = [
  {
    candidateId: "IO-V1-PLATO-CHOMSKY-CIVIC-CAPACITY",
    familyId: familyIdForKey("IO-FAMILY-PLATO_TO_CHOMSKY"),
    slug: "from-plato-to-chomsky-civic-capacity",
    title: "From Plato to Chomsky: Democracy, Mass Manipulation, and Civic Capacity",
    shortTitle: "From Plato to Chomsky",
    standfirst:
      "Elections authorize government, but accountable self-government also depends on civic capacity, institutional capacity, and mechanisms for correction.",
    author,
    volume: "Volume I",
    topics: ["Democracy", "Civic capacity", "Institutions", "Media systems", "Public reasoning"],
    publicationType: "Research article",
    status: previewStatus,
    version: "Web adaptation v1",
    factualCutoffDate: "2026-07-29",
    publicationDate: "2026-07-29",
    lastReviewedDate: "2026-09-16",
    license,
    sourceVerified: true,
    rightsReviewed: false,
    accessibilityReviewed: true,
    productionReleased: false,
    relatedPublicationIds: [archiveFamilyIds.independentObserverMethod],
    paragraphs: [
      "Elections are necessary for democratic authorization, but they do not by themselves guarantee capable or accountable self-government. This paper separates two dimensions that are often collapsed into one another: civic capacity and institutional capacity. Civic capacity concerns the practical resources people use to understand public choices, organize, evaluate information, and participate. Institutional capacity concerns a state’s ability to administer rules, collect information, implement decisions, maintain legal predictability, and sustain policy over time.",
      "The distinction is not a voting qualification. The manuscript explicitly rejects literacy tests, class-weighted voting, educational qualifications, and restrictions on universal voting rights. Unequal access to time, education, economic security, media literacy, association, and institutional knowledge is treated as a problem for democratic equality, not as a reason to narrow citizenship.",
      "Institutional capacity is also not treated as a synonym for liberal democracy. A state may implement policy effectively while constraining pluralism or correction; a highly participatory system may still struggle to deliver policy consistently. The paper uses comparative cases to examine different combinations and sequences rather than to rank civilizations or claim that wealth mechanically produces democracy.",
      "The result is a research heuristic rather than a new composite index. Its value lies in forcing separate questions: who can participate, who can understand and organize, what institutions can actually implement, and how mistakes can be detected and corrected. The paper’s major limitation is endogeneity: education, wealth, state capacity, organization, and democratic practice can reinforce one another in both directions.",
    ],
    sourceNotes: [
      {
        label: "V-Dem Institute, Democracy Report 2026",
        href: "https://www.v-dem.net/documents/75/V-Dem_Institute_Democracy_Report_2026_lowres.pdf",
      },
      {
        label: "World Bank, Worldwide Governance Indicators — 2025 methodology",
        href: "https://www.worldbank.org/en/publication/worldwide-governance-indicators",
      },
    ],
    limitations:
      "The civic-capacity framework is a comparative heuristic, not a causal index or a ranking of populations. Cross-country indicators are coarse, cases are historically specific, and the direction of causation among education, prosperity, organization, state capacity, and democratic practice remains contested.",
    adaptationNote:
      "Source-audited adaptation of the July 2026 Volume I working paper. Comparative material is deliberately bounded and no voting restriction is endorsed.",
    evidence: [
      {
        kind: "documented",
        label: "Democracy has multiple measurable dimensions",
        claim:
          "V-Dem separately measures electoral, liberal, egalitarian, participatory, and deliberative dimensions rather than treating elections as the whole of democracy.",
        sourceLabel: "V-Dem Democracy Report 2026",
        sourceHref:
          "https://www.v-dem.net/documents/75/V-Dem_Institute_Democracy_Report_2026_lowres.pdf",
      },
      {
        kind: "documented",
        label: "Governance indicators are broad diagnostic tools",
        claim:
          "The World Bank describes its Worldwide Governance Indicators as useful for broad comparison while cautioning that specific reforms require more detailed country-level diagnostics.",
        sourceLabel: "World Bank WGI",
        sourceHref: "https://www.worldbank.org/en/publication/worldwide-governance-indicators",
      },
      {
        kind: "interpretation",
        label: "Two-capacity framework",
        claim:
          "The author interprets civic capacity and institutional capacity as analytically distinct dimensions whose interaction helps explain why electoral systems can differ in accountability and implementation.",
      },
      {
        kind: "proposition",
        label: "Correction mechanisms",
        claim:
          "A testable implication is that participation should produce more accountable outcomes when citizens can organize and institutions can implement and correct decisions.",
      },
      {
        kind: "limitation",
        label: "Endogeneity",
        claim:
          "Education, income, civic organization, institutional capacity, and democratic practice influence one another, so observed associations do not establish a one-way causal sequence.",
      },
    ],
  },
  {
    candidateId: "IO-V1-FORMATION-THROUGH-STRUGGLE",
    familyId: familyIdForKey("IO-FAMILY-FORMATION_THROUGH_STRUGGLE"),
    slug: "formation-through-struggle",
    title: "Formation Through Struggle: Learning Beyond Merit",
    shortTitle: "Formation Through Struggle",
    standfirst:
      "Difficulty can become educational only when it is intelligible, supported, reflective, fair, and recoverable; suffering itself is neither virtue nor proof of merit.",
    author,
    volume: "Volume I",
    topics: [
      "Education",
      "Human capability",
      "Artificial intelligence",
      "Assessment",
      "Institutional design",
    ],
    publicationType: "Research article",
    status: previewStatus,
    version: "Web adaptation v1",
    factualCutoffDate: "2026-07-15",
    publicationDate: "2026-07-15",
    lastReviewedDate: "2026-09-16",
    license,
    sourceVerified: true,
    rightsReviewed: false,
    accessibilityReviewed: true,
    productionReleased: false,
    relatedPublicationIds: [
      archiveFamilyIds.independentObserverMethod,
      archiveFamilyIds.lastHumanWorkforce,
    ],
    paragraphs: [
      "Education needs standards, credentials, and demonstrations of competence, but those instruments can become misleading when a temporary performance is treated as a complete measure of a person. Formation Through Struggle distinguishes achievement, merit, learning, status, and longer-term human formation instead of treating them as interchangeable.",
      "The paper’s central claim is deliberately conditional: struggle becomes educational when resistance or failure is converted through reflection, inquiry, disciplined action, support, and public reasoning into expanded capability. Pain does not certify virtue. Arbitrary exclusion, humiliation, violence, illness, or inaccessible assessment may destroy agency rather than develop it.",
      "Eight practical criteria separate structured challenge from trial by ordeal: the challenge should be intelligible; meaningful agency should remain; demands should be proportionate; support and accommodation should be available; reflection should be possible; failure should be substantially recoverable; procedures should be fair and reviewable; and learning should be transferable or explainable beyond the original task.",
      "Generative AI strengthens the case for assessing process and judgment rather than polished output alone. The paper does not claim that traditional assessment is obsolete. It argues that source criticism, oral explanation, iterative work, and transparent reasoning become more important when fluent output can be produced with machine assistance.",
      "The institutional implication is not to manufacture hardship. It is to design demanding but recoverable pathways: transparent standards, disability support, meaningful review, plural academic and vocational routes, AI literacy, and routes back after exclusion. Personal disputes and medical history are excluded from this public adaptation.",
    ],
    sourceNotes: [
      {
        label: "UNESCO, Guidance for generative AI in education and research",
        href: "https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research?hub=253682",
      },
      {
        label: "TEQSA, Assessment Reform for the Age of Artificial Intelligence",
        href: "https://www.teqsa.gov.au/guides-resources/resources/corporate-publications/assessment-reform-age-artificial-intelligence",
      },
      {
        label: "Swiecki et al. (2022), Assessment in the Age of Artificial Intelligence",
        href: "https://doi.org/10.1016/j.caeai.2022.100075",
      },
    ],
    limitations:
      "This is a philosophical and interdisciplinary synthesis, not evidence that adversity reliably causes growth. Survivorship bias, cultural variation, disability, trauma, institutional power, and unequal material resources constrain any general claim about struggle and learning.",
    adaptationNote:
      "The public adaptation removes personal medical history and case-specific institutional dispute material identified by the source audit as inappropriate for this lane.",
    evidence: [
      {
        kind: "documented",
        label: "AI is changing assessment conditions",
        claim:
          "UNESCO and tertiary-education guidance treat generative AI as a reason to reconsider pedagogy, assessment, human agency, privacy, and verification rather than simply ignore the technology.",
        sourceLabel: "UNESCO GenAI guidance",
        sourceHref:
          "https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research?hub=253682",
      },
      {
        kind: "interpretation",
        label: "Struggle is not suffering",
        claim:
          "The author distinguishes engagement with resistance from suffering and argues that only some forms of challenge can become formative.",
      },
      {
        kind: "proposition",
        label: "Recoverable failure",
        claim:
          "A testable educational proposition is that failure is more likely to support learning when feedback, support, review, and a credible route to another attempt remain available.",
      },
      {
        kind: "limitation",
        label: "No adversity premium",
        claim:
          "The paper does not infer superior character, knowledge, or entitlement from hardship, low grades, institutional conflict, or survival of adversity.",
      },
    ],
  },
  {
    candidateId: "IO-V2-CIVIL-RIGHTS-REALIGNMENT",
    familyId: familyIdForKey("IO-FAMILY-CIVIL_RIGHTS_REALIGNMENT"),
    slug: "civil-rights-realignment-party-sorting",
    title: "Civil Rights Realignment and Party Sorting in the United States",
    shortTitle: "Civil Rights Realignment and Party Sorting",
    standfirst:
      "A process-tracing account of institutional opening, disenfranchisement, electorate reopening, and gradual party sorting across different levels of American politics.",
    author,
    volume: "Volume II",
    topics: ["History", "Democracy", "Civil rights", "Party systems", "Political development"],
    publicationType: "Research article",
    status: previewStatus,
    version: "Web adaptation v1",
    factualCutoffDate: "2026-08-17",
    publicationDate: "2026-08-17",
    lastReviewedDate: "2026-09-16",
    license,
    sourceVerified: true,
    rightsReviewed: false,
    accessibilityReviewed: true,
    productionReleased: false,
    relatedPublicationIds: [archiveFamilyIds.democracysAchillesHeel],
    paragraphs: [
      "American party change is better studied as a sequence than as an overnight exchange of complete party identities. This paper separates party labels from the coalitions, organizations, voters, officeholders, issue commitments, and regional structures that can move on different timelines.",
      "The analysis follows four historical mechanisms. Reconstruction created an institutional opening in which Black political participation and representation became visible at the national level. The retreat from Reconstruction and discriminatory registration systems then narrowed the effective electorate. Before 1965, civil-rights organizations, labor, migration, and party conflict were already changing coalition incentives. The Voting Rights Act then altered the enforcement environment and reopened access in jurisdictions where discrimination had blocked participation.",
      "The Voting Rights Act is therefore treated as an electorate-reopening mechanism, not as a statute that automatically converted voters from one party to another. Federal enforcement changed who could register and participate more effectively; later party sorting still depended on organization, region, race, religion, class, candidate strategy, generational replacement, and other political-development processes.",
      "The central methodological warning is against ecological overreach. Aggregate election results can document regional or party change without proving why an individual voter changed identification or vote choice. Contemporary coalition composition should not be projected backward onto earlier electorates, especially when access itself was institutionally restricted.",
    ],
    sourceNotes: [
      {
        label: "National Archives, Voting Rights Act of 1965",
        href: "https://www.archives.gov/milestone-documents/voting-rights-act",
      },
      {
        label: "U.S. House Historian, Black Americans in Congress",
        href: "https://history.house.gov/baic/",
      },
      {
        label: "Pew Research Center, Changing Partisan Coalitions (2024)",
        href: "https://www.pewresearch.org/politics/2024/04/09/changing-partisan-coalitions-in-a-politically-divided-nation/",
      },
    ],
    limitations:
      "This is historical process tracing, not an individual-level causal estimate. Party organizations, voters, platforms, regions, and levels of government changed asynchronously, and several rival explanations can account for portions of the same long-run pattern.",
    adaptationNote:
      "The web adaptation uses neutral process language and does not assign moral continuity or collective motive to a modern party, voter group, or region.",
    evidence: [
      {
        kind: "documented",
        label: "Reconstruction representation",
        claim:
          "The House Historian records Hiram Revels and Joseph Rainey entering Congress in 1870 and documents the wider Reconstruction-era generation of Black lawmakers.",
        sourceLabel: "U.S. House Historian",
        sourceHref: "https://history.house.gov/baic/",
      },
      {
        kind: "documented",
        label: "Federal voting-rights enforcement",
        claim:
          "The 1965 Voting Rights Act outlawed literacy tests, provided for federal examiners in covered settings, and required preclearance for specified changes in covered jurisdictions under the original statutory framework.",
        sourceLabel: "National Archives",
        sourceHref: "https://www.archives.gov/legislative/features/voting-rights-1965",
      },
      {
        kind: "interpretation",
        label: "Electorate reopening",
        claim:
          "The author interprets stronger federal enforcement as changing the electoral opportunity structure without treating the statute as a single-cause explanation for later partisan realignment.",
      },
      {
        kind: "proposition",
        label: "Sorting can be asynchronous",
        claim:
          "A party-realignment account should allow presidential voting, congressional representation, state organizations, activists, and mass identification to change at different rates.",
      },
      {
        kind: "limitation",
        label: "Aggregate outcomes are not individual conversions",
        claim:
          "State or county election returns cannot by themselves establish which individuals changed party identification or why they did so.",
      },
    ],
  },
  {
    candidateId: "IO-V2-WELFARE-QUEEN-TAX-CUT",
    familyId: familyIdForKey("IO-FAMILY-WELFARE_QUEEN_TAX_CUT"),
    slug: "welfare-queen-tax-cut-policy-visibility",
    title: "The Welfare Queen and the Tax Cut: Policy Visibility, Rhetoric, and Political Economy",
    shortTitle: "The Welfare Queen and the Tax Cut",
    standfirst:
      "A source-bounded examination of how visible means-tested assistance and less visible tax-based support can acquire different political meanings during economic change.",
    author,
    volume: "Volume II",
    topics: ["Political economy", "Welfare policy", "Tax policy", "Labor", "Political rhetoric"],
    publicationType: "Research article",
    status: previewStatus,
    version: "Web adaptation v1",
    factualCutoffDate: "2026-08-17",
    publicationDate: "2026-08-17",
    lastReviewedDate: "2026-09-16",
    license,
    sourceVerified: true,
    rightsReviewed: false,
    accessibilityReviewed: true,
    productionReleased: false,
    relatedPublicationIds: [archiveFamilyIds.democracysAchillesHeel],
    paragraphs: [
      "Public policy can distribute support through very different institutional channels. Means-tested programs are often visible because eligibility, certification, recertification, and program administration are explicit. Tax preferences can reduce liabilities or exclude forms of compensation from taxable income without appearing to beneficiaries as a direct government payment. The paper asks how those differences in visibility shape political narratives about dependency and deservingness.",
      "The argument draws on scholarship documenting racialized welfare imagery while rejecting the claim that every disagreement about social policy reflects racial animus. Rhetorical examples establish framing; they do not by themselves prove how an audience interpreted a message or that a particular phrase caused later legislation.",
      "The paper proposes a five-stage mechanism linking economic dislocation, unequal policy visibility, judgments of deservingness, policy conversion, and institutional feedback. It treats that mechanism as a hypothesis to be tested against rival explanations including inflation, fiscal constraints, labor-market change, ideology, trade, technology, and broad anti-government sentiment.",
      "The historical sections compare policy change across several administrations to examine continuity and divergence. They do not claim that the two major parties were identical or coordinated by a single center. The narrower proposition is that durable institutions can persist across changes in party control while parties continue to differ materially across other domains.",
    ],
    sourceNotes: [
      {
        label: "USDA, Characteristics of SNAP Households: Fiscal Year 2023",
        href: "https://www.fns.usda.gov/research/snap/characteristics-fy23",
      },
      {
        label: "Congressional Budget Office, Distribution of Major Tax Expenditures",
        href: "https://www.cbo.gov/publication/43768",
      },
      {
        label: "Pew Research Center, Changing Partisan Coalitions (2024)",
        href: "https://www.pewresearch.org/politics/2024/04/09/changing-partisan-coalitions-in-a-politically-divided-nation/",
      },
    ],
    limitations:
      "This is interpretive historical synthesis, not an estimate of the causal effect of political rhetoric. Tax expenditures and direct spending are different legal and fiscal instruments, and distributional incidence does not by itself establish motive, deservingness, or audience response.",
    adaptationNote:
      "The adaptation narrows the controller manuscript to policy visibility, institutional design, and testable rhetorical mechanisms; it avoids inferring intent from disparate outcomes.",
    evidence: [
      {
        kind: "documented",
        label: "SNAP serves a heterogeneous participant population",
        claim:
          "USDA’s FY2023 household-characteristics report describes the demographic and economic circumstances of SNAP households rather than a single racial or family profile.",
        sourceLabel: "USDA Food and Nutrition Service",
        sourceHref: "https://www.fns.usda.gov/research/snap/characteristics-fy23",
      },
      {
        kind: "documented",
        label: "Tax expenditures are a substantial policy channel",
        claim:
          "CBO analyzes exclusions, deductions, preferential rates, and credits as tax expenditures that affect the federal budget and household income distribution.",
        sourceLabel: "Congressional Budget Office",
        sourceHref: "https://www.cbo.gov/publication/43768",
      },
      {
        kind: "interpretation",
        label: "Visibility asymmetry",
        claim:
          "The author interprets direct and tax-based forms of support as politically unequal in visibility, which can influence the public categories through which dependency is discussed.",
      },
      {
        kind: "proposition",
        label: "Framing must be tested",
        claim:
          "A causal claim about rhetoric requires evidence connecting a dated message to audience response, policy choice, or institutional behavior rather than relying on thematic similarity alone.",
      },
      {
        kind: "limitation",
        label: "No universal motive claim",
        claim:
          "The paper does not infer that all opposition to welfare policy, all tax preferences, or all partisan change share one racial, economic, or ideological motive.",
      },
    ],
  },
  {
    candidateId: "IO-V2-PARTY-SWITCH-POLARIZATION",
    familyId: familyIdForKey("IO-FAMILY-PARTY_SWITCH_POLARIZATION"),
    slug: "party-switch-realignment-polarization",
    title: "Party Switch or Party Realignment? Sorting, Polarization, and Democratic Inclusion",
    shortTitle: "Party Switch or Party Realignment?",
    standfirst:
      "The familiar ‘party switch’ shorthand captures a real directional transformation but obscures the different timelines of voter coalitions, regions, officeholders, ideology, and party identification.",
    author,
    volume: "Volume II",
    topics: [
      "Party systems",
      "Political development",
      "Polarization",
      "Civil rights",
      "Democratic inclusion",
    ],
    publicationType: "Research article",
    status: previewStatus,
    version: "Web adaptation v1",
    factualCutoffDate: "2026-08-17",
    publicationDate: "2026-08-17",
    lastReviewedDate: "2026-09-16",
    license,
    sourceVerified: true,
    rightsReviewed: false,
    accessibilityReviewed: true,
    productionReleased: false,
    relatedPublicationIds: [archiveFamilyIds.democracysAchillesHeel],
    paragraphs: [
      "The phrase ‘party switch’ is useful shorthand for a major transformation in American party coalitions, but it can imply a single event that the historical record does not support. Party labels persisted while voters, regional organizations, officeholders, activists, issue positions, and demographic coalitions changed at different rates.",
      "The paper therefore distinguishes party identification from vote choice and ideology. It also separates partisan sorting, ideological polarization, affective polarization, and demographic sorting. These processes can reinforce one another without being the same measure or sharing one cause.",
      "Civil rights is a central axis of twentieth-century realignment but not an exhaustive explanation. Economic development, migration, labor, religion, suburbanization, education, national security, candidate strategy, and demographic change also altered political incentives. A simplified realignment narrative can summarize direction while still missing timing and level-of-government differences.",
      "Democratic inclusion is treated as both transformative and incomplete. Formal voting rights establish legal access and accountability mechanisms, but they do not automatically equalize time, money, civic skills, organized access, or policy influence. Likewise, turnout statistics cannot establish why a particular person did not vote; survey populations and denominators must be kept explicit.",
    ],
    sourceNotes: [
      {
        label: "Pew Research Center, Changing Partisan Coalitions in a Politically Divided Nation",
        href: "https://www.pewresearch.org/politics/2024/04/09/changing-partisan-coalitions-in-a-politically-divided-nation/",
      },
      {
        label: "National Archives, Voting Rights Act of 1965",
        href: "https://www.archives.gov/milestone-documents/voting-rights-act",
      },
      {
        label: "American National Election Studies",
        href: "https://electionstudies.org/",
      },
    ],
    limitations:
      "This is a historical synthesis rather than a new causal model. Survey measures, ecological inference, candidate effects, regional variation, and differences among presidential, congressional, state, and local politics prevent a single timetable or motive from being assigned to all voters or institutions.",
    adaptationNote:
      "The public title replaces the controller manuscript’s more argumentative title with a neutral question while preserving its central finding that realignment was substantial and gradual.",
    evidence: [
      {
        kind: "documented",
        label: "Coalitions continue to change",
        claim:
          "Pew’s multi-decade registered-voter series documents substantial changes in the demographic and educational composition of both party coalitions while overall partisan identification remains closely divided.",
        sourceLabel: "Pew Research Center",
        sourceHref:
          "https://www.pewresearch.org/politics/2024/04/09/changing-partisan-coalitions-in-a-politically-divided-nation/",
      },
      {
        kind: "documented",
        label: "Voting-rights enforcement changed access",
        claim:
          "The Voting Rights Act supplied federal enforcement tools against discriminatory voting practices; that legal change is distinct from any claim that the statute dictated later party identification.",
        sourceLabel: "National Archives",
        sourceHref: "https://www.archives.gov/milestone-documents/voting-rights-act",
      },
      {
        kind: "interpretation",
        label: "Realignment is the more precise analytic frame",
        claim:
          "The author treats ‘switch’ as shorthand and uses realignment to describe asynchronous change in coalitions, issues, regions, organizations, and officeholding.",
      },
      {
        kind: "proposition",
        label: "Separate the measures",
        claim:
          "Claims about polarization should specify whether they refer to ideology, partisan identity, affective attitudes, demographic composition, vote choice, or officeholding.",
      },
      {
        kind: "limitation",
        label: "No single voter motive",
        claim:
          "Aggregate trends do not establish why an individual changed parties, voted for a candidate, abstained, or adopted a political identity.",
      },
    ],
  },
];

export const curatedPublicationBySlug = new Map(
  curatedPublications.map((publication) => [publication.slug, publication]),
);

export const allCuratedPublicationsReleased = curatedPublications.filter(
  (publication) => publication.productionReleased,
);
