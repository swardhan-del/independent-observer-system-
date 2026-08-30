import type { PublicDocument, PublicDocumentSection } from "./documents";

const author = "Siddhartha Harsh Wardhan";
const metricsDate = "25 August 2026";

type SsrnInput = Omit<PublicDocument, "sourceLabel" | "status" | "author" | "metrics"> & {
  metrics: Omit<NonNullable<PublicDocument["metrics"]>, "checkedAt">;
  metricsCheckedAt?: string;
  publicationContext?: string;
};

function sections(
  abstractText: string,
  readingPoints: string[],
  limitation: string,
  publicationContext?: string,
): PublicDocumentSection[] {
  return [
    {
      id: "abstract",
      heading: "Abstract",
      paragraphs: [abstractText],
    },
    {
      id: "reading-points",
      heading: "What the paper examines",
      items: readingPoints,
    },
    {
      id: "publication-boundary",
      heading: "Publication boundary",
      paragraphs: [
        "This document is presented as a public reading copy connected to the Independent Observer program. Its source trail and status remain visible so readers can distinguish a working preprint from a released publication.",
        ...(publicationContext ? [publicationContext] : []),
        limitation,
      ],
    },
  ];
}

function makeDocument(input: SsrnInput): PublicDocument {
  const { metricsCheckedAt, ...document } = input;

  return {
    ...document,
    sourceLabel: "Author preprint controller · SSRN public record",
    status: "SSRN preprint",
    author,
    externalVerification: "needs_review",
    metrics: {
      ...input.metrics,
      checkedAt: metricsCheckedAt ?? metricsDate,
    },
  };
}

/**
 * Public-safe, SSRN-linked article records selected from matching Dropbox
 * preprint controllers. These are not Dropbox feed imports and do not set
 * releaseApproved or alter the empty approved feed.
 */
export const ssrnPreprintDocuments: PublicDocument[] = [
  makeDocument({
    id: "who-deported-more-ssrn",
    volume: "Volume II",
    title:
      "Who Deported More? Measuring Removals, Returns, and Enforcement Priorities Across Presidential Administrations 2000–2025",
    category: "Demography & Migration",
    description:
      "A data-defined working paper that separates removals, returns, and expulsions before comparing enforcement priorities across administrations.",
    volumeRelevance:
      "This paper gives Volume II an empirical entry point into sovereignty and administrative power. Its definitions-first approach shows how legal categories, agency routines, and enforcement resources shape the public numbers through which political authority is judged.",
    sourceModified: "Author preprint matched to SSRN abstract 5495878",
    publicationDate: "13 October 2025",
    dateLabel: "Posted",
    sourceUrl: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5495878",
    researchGateUrl:
      "https://www.researchgate.net/publication/396491871_Who_Deported_More_Measuring_Removals_Returns_and_Enforcement_Priorities_Across_Presidential_Administrations_2000-2025",
    metrics: { downloads: 126, abstractViews: 6397, citations: 0, rank: 592433 },
    sections: sections(
      "This working paper clarifies commonly conflated measures of immigration enforcement—“removals,” “returns,” interior versus border enforcement—and explains how shifts in policy priorities alter those measures over time. We outline definitions used in official yearbooks and examine how administrative choices (prosecutorial discretion, detainer policies, expedited removal, and resource allocation) affect headline counts. The aim is not to adjudicate competing claims about which administration removed more people, but to standardize concepts so public debate rests on comparable metrics. We conclude with a template for year-by-year reporting and provide suggestions for enhancing data transparency and comparability.",
      [
        "It compiles a definitions-first descriptive dataset from the DHS Yearbook of Immigration Statistics, using ICE Enforcement and Removal Operations annual removal statistics provisionally for FY2023–FY2024 while the OHSS series is pending consolidation.",
        "It defines a removal as a mandatory movement recorded under immigration law and a return as a confirmed departure without a removal order, then distinguishes interior enforcement from border enforcement and explains expedited removal as a limited process without a full hearing.",
        "It keeps Title 42 public-health expulsions from FY2020–FY2022 separate from the removals-and-returns time series so those pandemic-era events do not break comparability with earlier years; interior and border shares are left blank when a like-for-like historical split cannot be documented.",
        "It provides a tidy CSV, codebook, and table footnotes for reproducibility. The transformations are limited to category alignment and percentage-share arithmetic; the paper does not use a predictive or causal model.",
        "It shows how prosecutorial discretion, detainer policies, expedited-removal scope, and resource allocation can change headline counts without proving a simple increase or decrease in total enforcement.",
      ],
      "The last directly verified public SSRN result (25 August 2026) reported 126 downloads and 6,397 abstract views. A 28 August 2026 recheck was access-blocked, so current availability is not confirmed. Metrics change over time; SSRN does not provide a star-rating field for this paper. The matching author working version requires removal of an older appendix before any longer-form release.",
    ),
    citations: [
      {
        id: "ssrn-5495878",
        label: "SSRN",
        citation:
          "Harsh Wardhan, Siddhartha, Who Deported More? Measuring Removals, Returns, and Enforcement Priorities Across Presidential Administrations 2000–2025 (2025), SSRN abstract 5495878.",
        url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5495878",
      },
    ],
    notes: [
      "Featured first because it has the strongest retrieved SSRN download and abstract-view signal among the matched public preprints.",
      "The site presents the controlled public synopsis, not the raw DOCX/PDF or an appended prior draft.",
    ],
    limitations: [
      "The SSRN record is a working paper, not peer-reviewed publication status.",
      "Comparisons depend on definitions, population coverage, reporting periods, and the treatment of Title 42 expulsions.",
      "SSRN usage statistics are time-varying and should not be treated as scholarly quality ratings.",
    ],
  }),
  makeDocument({
    id: "latino-irony-ssrn",
    volume: "Volume II",
    title: "The Latino Irony: Why Many Hispanic Americans Support Donald Trump",
    category: "Politics & Demography",
    description:
      "A working paper that treats Latino voting behavior as internally heterogeneous rather than as a single identity-based bloc.",
    volumeRelevance:
      "It contributes a democratic-membership case to Volume II by asking how identity, policy experience, local institutions, and immigration enforcement interact in political choice. The paper’s value is its refusal to treat a large population as one political actor or one explanation.",
    sourceModified: "Author preprint matched to SSRN abstract 5447654",
    publicationDate: "23 September 2025",
    dateLabel: "Posted",
    sourceUrl: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5447654",
    metrics: { downloads: 56, abstractViews: 546, citations: 0, rank: 1010164 },
    sections: sections(
      "The paper proposes a multi-factor explanation for why a meaningful share of Hispanic and Latino voters supported Republican candidates, including Donald Trump. It combines identity heterogeneity, cultural conservatism, economic evaluation, political memory, and immigration-enforcement salience rather than treating ethnicity as a complete voting model.",
      [
        "The unit of analysis is the interaction among identity, policy experience, and local information environments.",
        "The paper frames its objective as explanation and measurement, not candidate advocacy.",
        "Service delivery, housing, schools, safety, permitting, and small-business conditions are treated as politically relevant outcomes.",
      ],
      "The last directly verified public SSRN result (25 August 2026) reported 56 downloads and 546 abstract views. A 28 August 2026 recheck was access-blocked, so current availability is not confirmed. Those figures are usage signals, not a rating or evidence that every causal claim is established.",
    ),
    citations: [
      {
        id: "ssrn-5447654",
        label: "SSRN",
        citation:
          "Harsh Wardhan, Siddhartha, The Latino Irony: Why Many Hispanic Americans Support Donald Trump (2025), SSRN abstract 5447654.",
        url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5447654",
      },
    ],
    notes: [
      "Selected as the second-highest-download matched public preprint in the retrieved set.",
      "The page preserves the paper's analytical framing and does not present a demographic group as politically uniform.",
    ],
    limitations: [
      "This is a working paper and not a causal estimate of all Latino voting behavior.",
      "The title and argument concern heterogeneous populations; readers should not generalize from a summary to every voter or place.",
      "Usage metrics are not peer review, endorsement, or a star rating.",
    ],
  }),
  makeDocument({
    id: "disconnected-hearts-ssrn",
    volume: "Volume IV",
    title: "Disconnected Hearts — The Tech Revolution of Intimacy",
    category: "Technology & Intimacy",
    description:
      "A short working paper on how automation, economic precarity, and digital mediation reshape intimacy, identity, and demographic life.",
    sourceModified: "Author submission package matched to SSRN abstract 5578130",
    publicationDate: "6 November 2025",
    dateLabel: "Posted",
    sourceUrl: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5578130",
    researchGateUrl:
      "https://www.researchgate.net/publication/397333270_Disconnected_Hearts_-_The_Tech_Revolution_of_Intimacy",
    metrics: { downloads: 47, abstractViews: 152, citations: 0 },
    sections: sections(
      "The paper describes a digital transformation of intimacy in which technology, economic liberalization, declining birth rates, and social isolation interact. It links the commodification of labor and the virtualization of connection without treating digital mediation as a complete explanation for demographic change.",
      [
        "Automation and economic precarity are examined as social conditions, not only as technical trends.",
        "The paper connects labor, intimacy, identity, and demographic questions across a wider Volume IV research arc.",
        "Its central contribution is a research frame for asking how institutions shape the conditions under which connection is possible.",
      ],
      "The last directly verified public SSRN result (25 August 2026) reported 47 downloads and 152 abstract views. A 28 August 2026 recheck was access-blocked, so current availability is not confirmed. The site uses the public summary and links to the SSRN record; it does not reproduce email addresses, private correspondence, or alternate archive copies.",
    ),
    citations: [
      {
        id: "ssrn-5578130",
        label: "SSRN",
        citation:
          "Harsh Wardhan, Siddhartha, Disconnected Hearts — The Tech Revolution of Intimacy (2025), SSRN abstract 5578130.",
        url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5578130",
      },
    ],
    notes: [
      "Featured because its retrieved SSRN usage signal is stronger than the remaining matched Volume IV preprints in this set.",
      "The article is labeled as a preprint and not as a completed sociological or demographic finding.",
    ],
    limitations: [
      "The paper is conceptual and does not establish a single causal pathway from technology to demographic outcomes.",
      "No star-rating system is reported by SSRN; downloads and abstract views are descriptive usage counts.",
    ],
  }),
  makeDocument({
    id: "wardhan-tax-doctrine-ssrn",
    volume: "Volume III",
    title:
      "The Wardhan Tax Doctrine: Time-as-Deduction, W-2 Relief, and an Eisenhower-Era Return to Progressivity",
    category: "Political Economy & Tax",
    description:
      "A Volume III policy working paper within Managed Decline. It asks how tax design can recognize time spent building skills, reduce pressure on wage labor, and restore progressive treatment of selected ownership income. Its placement is deliberate: the paper addresses Volume III’s inquiry into labor markets, welfare, taxation, and administrative access, rather than Volume I’s method foundation or Volume II’s sovereignty and institutional design. It connects the proposed credits and relief mechanisms to eligibility rules, reporting, documentation, and audit design.",
    sourceModified: "Author submission package matched to SSRN abstract 5477606",
    publicationDate: "3 October 2025",
    dateLabel: "Posted",
    sourceUrl: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5477606",
    metrics: { downloads: 42, abstractViews: 202, citations: 0 },
    sections: sections(
      "The Wardhan Tax Doctrine asks whether the tax system can recognize time spent acquiring skills as a form of investment rather than treating it only as a private cost. Its proposed framework combines a refundable time-investment credit, targeted relief for low-to-moderate W-2 earners, and narrower treatment of selected capital preferences, with the stated aim of reducing pressure on wage labor while restoring progressivity at the top. The paper treats eligibility rules, administrative reporting, documentation, and audit mechanisms as part of the policy itself: distributional reform is not complete unless the system can identify who qualifies, record the relevant activity, and be reviewed for compliance. This is a policy proposal for public analysis, not enacted law, an official revenue score, or individualized tax advice.",
      [
        "The paper treats time spent acquiring skills as a possible policy object, asking how a tax system might recognize training and human-capital formation without confusing a proposal with a guaranteed benefit.",
        "It separates labor-side relief for W-2 earners from capital-side preference reform, so the reader can see which distributional problem each mechanism is intended to address.",
        "Eligibility, documentation, reporting, and audit design are presented as core parts of the doctrine rather than administrative afterthoughts.",
        "The doctrine also distinguishes earnings, asset appreciation, and credit. W-2 and 1099 income, dividends, realized capital gains, and loan proceeds are not interchangeable tax categories; borrowing against appreciated assets can avoid a sale at the time of borrowing while introducing interest, collateral, repayment, and market risk. That difference helps explain how access to assets and credit can compound wealth without claiming that every wealthy person uses the same strategy.",
        "The institutional question connects with Volume II's inquiry into sovereignty, finance, and administrative power, while the distributive and reporting question belongs with Volume III's Managed Decline. Named case studies and acquisition figures require primary-source verification before they can be treated as evidence.",
      ],
      "This Volume III research develops an ongoing question about how wealth can accumulate over time when labor income, asset appreciation, dividends, and access to credit are treated differently by institutions. It considers how a person with substantial assets may borrow against appreciated holdings rather than sell them, preserving ownership while taking on interest, collateral, repayment, and market risk. The point is to examine a distributional mechanism—not to claim that every investor uses the same strategy or that borrowing is cost-free.",
      "Independent Observer presents this as ongoing research open to correction and discussion. Corrections should be grounded in identifiable facts, references, and sources; this page does not present a personal tax conclusion, legal advice, enacted law, or an official fiscal score.",
    ),
    citations: [
      {
        id: "ssrn-5477606",
        label: "SSRN",
        citation:
          "Harsh Wardhan, Siddhartha, The Wardhan Tax Doctrine: Time-as-Deduction, W-2 Relief, and an Eisenhower-Era Return to Progressivity (with IRC Amendments) (2025), SSRN abstract 5477606.",
        url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5477606",
      },
    ],
    notes: [
      "Selected from a matching Volume III SSRN submission package and ranked by the retrieved public usage signals.",
      "The page distinguishes policy design from enacted law and avoids reproducing private financial or asset-protection material.",
    ],
    limitations: [
      "The paper is a proposal and does not provide an official budget score or legislative adoption record.",
      "Tax-law effects require jurisdiction-specific legal and fiscal review.",
      "Claims about named individuals, acquisition figures, personal tax bills, or financing structures require primary-source verification and are not evidence supplied by this reading copy.",
      "Downloads and abstract views are not quality ratings.",
    ],
  }),
  makeDocument({
    id: "double-tax-on-time-ssrn",
    volume: "Volume IV",
    title: "The Double Tax on Time: Why Women Pay for Both Biology and Bureaucracy",
    category: "Gender & Political Economy",
    description:
      "A working paper examining how biological timing, career structures, caregiving policy, and demographic economics interact.",
    sourceModified: "Author content-confirmed preprint matched to SSRN abstract 5584710",
    publicationDate: "7 November 2025",
    dateLabel: "Posted",
    sourceUrl: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5584710",
    metrics: { downloads: 39, abstractViews: 225, citations: 0 },
    sections: sections(
      "The paper introduces the phrase “double tax on time” for the interaction between biological constraints and bureaucratic or economic arrangements that can narrow women's career choices. It compares policy tools such as parental leave, fertility care, education, and tax treatment while arguing for equity rather than identical treatment as a demographic and economic objective.",
      [
        "Caregiving is treated as a productive social investment rather than only as an individual interruption.",
        "The analysis connects gender economics, human capital, fertility, migration, and public policy.",
        "The paper presents a comparative policy frame rather than a single universal solution.",
      ],
      "The last directly verified public SSRN result (25 August 2026) reported 39 downloads and 225 abstract views. A 28 August 2026 recheck was access-blocked, so current availability is not confirmed. Several quantitative claims in the underlying preprint require careful source and currentness review; the website therefore foregrounds the thesis and boundary rather than reproducing every number.",
    ),
    citations: [
      {
        id: "ssrn-5584710",
        label: "SSRN",
        citation:
          "Harsh Wardhan, Siddhartha, The Double Tax on Time: Why Women Pay for Both Biology and Bureaucracy (2025), SSRN abstract 5584710.",
        url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5584710",
      },
    ],
    notes: [
      "Selected from a content-confirmed author preprint with a matching SSRN record.",
      "The page retains visible limitations instead of treating the preprint's comparative claims as settled facts.",
    ],
    limitations: [
      "The article is a working paper and does not establish a universal estimate of productivity or demographic effect.",
      "Cross-national comparisons require careful attention to definitions, dates, institutions, and policy context.",
      "SSRN does not provide a star-rating field; usage figures are not scholarly validation.",
    ],
  }),
  makeDocument({
    id: "from-colonization-to-chinas-rise-ssrn",
    volume: "Volume II",
    title:
      "From Colonization to China’s Rise: How Historical Power Shifts Still Shape Global Politics and Democracy",
    category: "History & Geopolitics",
    description:
      "A historical working paper connecting colonization, industrialization, economic design, and contemporary competition among major powers.",
    volumeRelevance:
      "This paper extends Volume II’s sovereignty inquiry across time: it connects historical extraction, industrial capacity, capital, and geopolitical competition to the institutions that make power durable. It gives the volume a long-range frame for reading present rivalry without collapsing different periods into one story.",
    sourceModified: "Author submission package matched to SSRN abstract 5540740",
    publicationDate: "23 October 2025",
    dateLabel: "Posted",
    sourceUrl: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5540740",
    metrics: { downloads: 38, abstractViews: 161, citations: 0 },
    sections: sections(
      "The paper traces how colonization, industrialization, and strategic economic design shaped modern power. It argues that contemporary competition among the United States, China, and Russia should be read alongside older systems of knowledge extraction, inequality, and institutional control rather than as a wholly new contest.",
      [
        "Historical power shifts are treated as institutional and economic processes, not only military events.",
        "The paper links democratic vulnerability to literacy, corruption, inequality, and working-class exclusion.",
        "The conclusion asks what a more durable democratic political economy would need to change.",
      ],
      "The last directly verified public SSRN result (25 August 2026) reported 38 downloads and 161 abstract views. A 28 August 2026 recheck was access-blocked, so current availability is not confirmed. Historical analogy can illuminate mechanisms, but it does not prove that different periods or states are equivalent.",
    ),
    citations: [
      {
        id: "ssrn-5540740",
        label: "SSRN",
        citation:
          "Harsh Wardhan, Siddhartha, From Colonization to China’s Rise: How Historical Power Shifts Still Shape Global Politics and Democracy (2025), SSRN abstract 5540740.",
        url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5540740",
      },
    ],
    notes: [
      "Selected from a matching Volume II SSRN submission package and placed below the stronger-download records.",
      "The page labels historical synthesis and interpretation separately from documented chronology.",
    ],
    limitations: [
      "The paper is a historical and political-economy synthesis, not a predictive model of great-power competition.",
      "Comparative claims require attention to period, geography, and source selection.",
      "Usage metrics are not ratings or peer-review outcomes.",
    ],
  }),
  makeDocument({
    id: "independent-observer-volume-one-ssrn",
    volume: "Volume I",
    title:
      "Independent Observer: Critical Studies in Philosophy, Politics, Economics, and History — Volume I (Foundational Manifesto)",
    category: "Method & Democratic Capacity",
    description:
      "Volume I is the method anchor for the Independent Observer: a systems-level reading of how law, labor, media, evidence, and democratic capacity shape public life. It connects philosophy, political economy, historical analysis, and public reasoning while keeping the limits of a working paper visible.",
    volumeRelevance:
      "This is the method anchor for the entire series. It establishes the volume’s central vocabulary—evidence, information asymmetry, institutional design, and public reasoning—and shows how to make the basis and limits of an argument visible before accepting its conclusion.",
    sourceModified: "Author Volume I SSRN-ready controller matched to SSRN abstract 5431958",
    publicationDate: "19 September 2025",
    dateLabel: "Posted",
    sourceUrl: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5431958",
    metrics: { downloads: 23, abstractViews: 113, citations: 0 },
    sections: sections(
      "The foundational paper presents a systems-level critique of how law, labor, media, and institutional constraints shape democratic capacity. It proposes a method-first, nonpartisan approach that distinguishes factual records, interpretation, policy design, and unresolved questions while inviting future empirical work.",
      [
        "The method treats information asymmetry and institutional design as part of political economy.",
        "The framework joins political theory, economic policy, historical analysis, and public reasoning.",
        "The public-facing purpose is to make the basis and limits of an argument visible before asking readers to accept its conclusion.",
      ],
      "The last directly verified public SSRN result (25 August 2026) reported 23 downloads and 113 abstract views. A 28 August 2026 recheck was access-blocked, so current availability is not confirmed. It is a foundational working paper, not a claim that the full Independent Observer series has been published or peer reviewed.",
      "This page is the public entry point for Volume I’s Foundational Manifesto, one of three Volume I papers currently represented by matched public SSRN records. It explains the method of observation, documentation, information asymmetry, institutional design, and public reasoning; other Volume I manuscripts remain outside this reading copy until their public records and release status are separately verified.",
    ),
    citations: [
      {
        id: "ssrn-5431958",
        label: "SSRN",
        citation:
          "Harsh Wardhan, Siddhartha, Independent Observer: Critical Studies in Philosophy, Politics, Economics, and History — Volume I (Foundational Manifesto) (2025), SSRN abstract 5431958.",
        url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5431958",
      },
    ],
    notes: [
      "This is the Volume I method anchor for the series roadmap, not a replacement for the complete manuscript archive.",
      "The public page uses a short curated reading copy and the author-linked SSRN record.",
    ],
    limitations: [
      "The broader Independent Observer research project began within the past year. This foundation is an early working paper, open to discussion, empirical testing, and revision.",
      "Methodological claims are not the same as findings about any individual institution or person.",
      "SSRN usage figures are descriptive and not a quality rating.",
    ],
  }),
  makeDocument({
    id: "a-systems-centered-manifesto-ssrn",
    volume: "Volume I",
    title: "A Systems-Centered Manifesto on Automation, Education, and the Carceral State",
    category: "Automation, Labor & Democratic Capacity",
    description:
      "A working paper linking industrial automation in global supply chains, skill mismatch in U.S. labor markets, and mass incarceration and recidivism. It argues that tariffs alone cannot restore employment when production is automated and geographically flexible, and instead pairs industrial policy with vocational and apprenticeship pathways, reentry, second-chance hiring, and local skill investment.",
    volumeRelevance:
      "It demonstrates Volume I’s systems method by reading economic policy, labor-market capability, education, and carceral institutions as one connected structure rather than as isolated issues. Its value to the volume is the move from observation to a testable, people-centered reform agenda.",
    sourceModified: "Author Volume I PDF matched to SSRN abstract 5432014",
    publicationDate: "19 September 2025",
    dateLabel: "Posted",
    sourceUrl: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5432014",
    metricsCheckedAt: "30 August 2026",
    metrics: { downloads: 22, abstractViews: 120, citations: 0 },
    sections: sections(
      "The paper connects automation in globalized supply chains with U.S. skill shortages and the labor-market effects of incarceration and recidivism. It argues that reshoring policy needs to be paired with vocational training, apprenticeships, reentry support, and local capability-building rather than relying on tariffs alone.",
      [
        "It treats definitions and institutional connections as part of the analysis: automation, skills, incarceration, and reentry are related policy questions.",
        "It tests whether a trade or industrial policy can improve work without ignoring geographic flexibility and automation.",
        "It frames second-chance hiring and apprenticeship pathways as human-capital and democratic-capacity interventions.",
      ],
      "The SSRN record was verified on 30 August 2026; its usage figures are descriptive signals, not peer review or a quality rating. It is a working paper, and the paper’s proposed relationships require further empirical testing.",
    ),
    citations: [
      {
        id: "ssrn-5432014",
        label: "SSRN",
        citation:
          "Harsh Wardhan, Siddhartha, A Systems-Centered Manifesto on Automation, Education, and the Carceral State (2025), SSRN abstract 5432014.",
        url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5432014",
      },
    ],
    notes: [
      "Verified as a public SSRN record matched to an author Volume I submission PDF.",
      "The site uses a public-safe synopsis and SSRN link; it does not publish the raw source PDF.",
    ],
    limitations: [
      "The paper is a working paper, not a peer-reviewed publication.",
      "The policy recommendations are proposals, not evidence that any single intervention will produce a given result.",
      "Downloads and abstract views are usage signals, not scholarly quality ratings.",
    ],
  }),
  makeDocument({
    id: "the-illusion-of-equality-ssrn",
    volume: "Volume I",
    title:
      "The Illusion of Equality: The Founding Fathers’ Contradictions, The Flaws of Democracy, and The Future of U.S. Economic Influence",
    category: "Institutional Power & Political Economy",
    description:
      "A historical and political-economy working paper examining the gap between America’s language of equality and the constitutional, legal, electoral, and economic structures that distribute power. It moves from founding-era exclusions and sovereign immunity to representation, corporate influence, reserve-currency politics, BRICS, and tariffs.",
    volumeRelevance:
      "It extends Volume I’s method from individual claims to institutional comparison: readers can see why historical context, legal structure, definitions, and present-day incentives must be connected before a democracy claim is accepted. It serves as a concrete case of the volume’s focus on legitimacy, public reasoning, and the gap between formal rights and practical capacity.",
    sourceModified: "Author Volume I PDF matched to SSRN abstract 5442294",
    publicationDate: "22 September 2025",
    dateLabel: "Posted",
    sourceUrl: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5442294",
    metricsCheckedAt: "30 August 2026",
    metrics: { downloads: 36, abstractViews: 137, citations: 0 },
    sections: sections(
      "This working paper examines the contradiction between founding claims of equality and institutions that excluded or disadvantaged large parts of the population. It combines constitutional history, democratic practice, and political economy to examine how representation, sovereign immunity, corporate influence, reserve-currency dynamics, BRICS coordination, and tariff policy shape modern power.",
      [
        "It uses founding-era contradictions and later legal structures to test the distance between formal equality and actual accountability.",
        "It connects constitutional design, representation, corporate influence, and global economic power in one institutional analysis.",
        "Its reform discussion gives readers a concrete example of how Volume I moves from diagnosis toward public reasoning about institutional change.",
      ],
      "The SSRN record was verified on 30 August 2026; its usage figures are descriptive signals, not peer review or a quality rating. The paper is a working paper and combines historical, legal, and political-economy arguments that remain open to source and interpretation review.",
    ),
    citations: [
      {
        id: "ssrn-5442294",
        label: "SSRN",
        citation:
          "Harsh Wardhan, Siddhartha, The Illusion of Equality: The Founding Fathers’ Contradictions, The Flaws of Democracy, and The Future of U.S. Economic Influence (2025), SSRN abstract 5442294.",
        url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5442294",
      },
    ],
    notes: [
      "Verified as a public SSRN record matched to an author Volume I PDF.",
      "The synopsis is public-safe and does not reproduce the raw source PDF.",
    ],
    limitations: [
      "The paper is a working paper, not a peer-reviewed publication.",
      "Historical analogies and institutional comparisons require attention to period, jurisdiction, and source selection.",
      "Downloads and abstract views are usage signals, not scholarly quality ratings.",
    ],
  }),
  makeDocument({
    id: "citizens-without-a-country-ssrn",
    volume: "Volume II",
    title:
      "Citizens Without a Country: The Democratic Legitimacy Crisis of Non-Resident Birthright Voting in U.S. Federal Elections",
    category: "Democracy, Citizenship & Voting",
    description:
      "A Volume II working paper examining how non-resident birthright voting tests the relationship between political voice, residency, civic integration, and exposure to the consequences of federal policy.",
    volumeRelevance:
      "This paper gives Volume II a concrete case for studying sovereignty and democratic membership. It asks how the state defines the people who may decide its rules, and whether political authority remains reciprocal when voters have little or no lived connection to the institutions they help govern.",
    sourceModified: "Volume II author preprint matched to SSRN abstract 5992076",
    publicationDate: "22 January 2026",
    dateLabel: "Posted",
    sourceUrl: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5992076",
    metricsCheckedAt: "30 August 2026",
    metrics: { downloads: 17, abstractViews: 108, citations: 0 },
    sections: sections(
      "This working paper examines the democratic legitimacy of federal voting rights held by citizens who live permanently outside the United States, including people who have never lived there. It connects external voting to residency, taxation, civic integration, military service, comparative electoral design, and the question of whether political voice should track exposure to domestic policy consequences.",
      [
        "It treats citizenship and voting as institutional relationships that carry both rights and responsibilities, rather than as labels that answer every legitimacy question by themselves.",
        "The analysis compares the U.S. external-voting model with broader democratic design questions about residency, accountability, and political membership.",
        "Its proposed criteria are presented as a framework for debate and testing, not as enacted election law or a settled constitutional conclusion.",
      ],
      "The public SSRN record lists 17 downloads and 108 abstract views in the indexed snapshot checked on 30 August 2026. Usage counts change over time and are not peer review or evidence that the paper's legitimacy framework is correct. The paper is a working argument about electoral design, not individualized legal advice.",
      "The Volume II resource map places this paper in the sovereignty, institutions, and democratic-membership line of inquiry. The website publishes a short synopsis and the public SSRN link; it does not expose the matching source manuscript.",
    ),
    citations: [
      {
        id: "ssrn-5992076",
        label: "SSRN",
        citation:
          "Harsh Wardhan, Siddhartha, Citizens Without a Country: The Democratic Legitimacy Crisis of Non-Resident Birthright Voting in U.S. Federal Elections (2025), SSRN abstract 5992076.",
        url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5992076",
      },
    ],
    notes: [
      "Selected from the Volume II taxonomy after matching the public SSRN title and author record.",
      "The public entry summarizes the argument without publishing the source manuscript or a private source path.",
    ],
    limitations: [
      "This is a working paper, not a ruling, statute, election-administration policy, or peer-reviewed finding.",
      "Comparative voting systems differ in history, law, population, and enforcement; no single criterion resolves every legitimacy question.",
      "Usage metrics are descriptive signals, not scholarly quality ratings.",
    ],
  }),
  makeDocument({
    id: "empire-of-distraction-ssrn",
    volume: "Volume II",
    title:
      "The Empire of Distraction: Foreign Agenda-Setting, Malapportionment, and the Managed Myth of Popular Rule in the United States",
    category: "Institutions, Representation & Foreign Influence",
    description:
      "A Volume II working paper linking foreign-policy agenda shocks to unequal representation, attention allocation, lobbying, and the distance between population-weighted preferences and enacted policy.",
    volumeRelevance:
      "This is a central Volume II case study because it follows power from formal constitutional rules into the practical allocation of attention, hearings, contracts, and influence. It connects sovereignty abroad with representation at home without treating either as a single-cause explanation.",
    sourceModified: "Volume II taxonomy match to SSRN abstract 5992215",
    publicationDate: "22 January 2026",
    dateLabel: "Posted",
    sourceUrl: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5992215",
    metricsCheckedAt: "30 August 2026",
    metrics: { downloads: 20, abstractViews: 118, citations: 0 },
    sections: sections(
      "The paper argues that public policy can be pulled away from population-weighted preferences by two linked mechanisms: external conflicts that redirect attention and domestic rules that dilute representation. It proposes a measurement frame covering residents per senator, vote-seat bias, committee and floor time, appropriations, contract geography, lobbying, and donations, then connects those indicators to a reform menu.",
      [
        "Agenda shocks are treated as observable changes in policy attention, not proof that every foreign-policy event is manufactured or coordinated.",
        "The paper places Senate malapportionment, Electoral College amplification, district design, lobbying, and contract distribution in one institutional map.",
        "Its reform proposals—such as independent districting, public-finance tools, lobbying ledgers, and contract dashboards—are testable policy options rather than claims of enacted reform.",
      ],
      "The public SSRN record lists 20 downloads and 118 abstract views in the indexed snapshot checked on 30 August 2026. The paper is a working analysis with no references listed on the public record; its indicators and causal interpretation require independent source review before being treated as established findings.",
      "The Volume II resource map assigns this record to the institutions-and-sovereignty family. The public catalogue keeps that taxonomy visible while separating the paper's argument from a claim that U.S. policy is controlled by one foreign actor or one hidden system.",
    ),
    citations: [
      {
        id: "ssrn-5992215",
        label: "SSRN",
        citation:
          "Harsh Wardhan, Siddhartha, The Empire of Distraction: Foreign Agenda-Setting, Malapportionment, and the Managed Myth of Popular Rule in the United States (2025), SSRN abstract 5992215.",
        url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5992215",
      },
    ],
    notes: [
      "Matched to the Volume II resource taxonomy and a public SSRN author record.",
      "The site presents the measurement frame and reform questions, not the private working file.",
    ],
    limitations: [
      "The paper is a working paper and does not establish a complete causal model of agenda-setting or representation.",
      "Foreign influence, lobbying, and policy attention require claim-specific primary records and time-bounded comparisons.",
      "Usage metrics are not peer review, endorsement, or a quality rating.",
    ],
  }),
  makeDocument({
    id: "geography-of-enslaved-wealth-ssrn",
    volume: "Volume II",
    title: "The Geography of Enslaved Wealth: How Resource-Rich Lands Produce Poor Societies",
    category: "Resource Wealth & Political Economy",
    description:
      "A comparative political-economy working paper asking why resource-rich regions can remain poor when capital, information, trade, and institutional access are tightly controlled.",
    volumeRelevance:
      "The paper extends Volume II's sovereignty inquiry beyond constitutions and elections into the control of capital, logistics, investment, and knowledge. Its significance is the link between resource endowments and the institutions that decide whether those resources become broad capability or concentrated patronage.",
    sourceModified: "Volume II author paper matched to SSRN abstract 5624610",
    publicationDate: "17 November 2025",
    dateLabel: "Posted",
    sourceUrl: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5624610",
    metricsCheckedAt: "30 August 2026",
    metrics: { downloads: 41, abstractViews: 172, citations: 0 },
    sections: sections(
      "This working paper compares resource-rich regions including Siberia, Central Asia, and Saudi Arabia to ask why natural wealth does not automatically produce innovation, social mobility, or high living standards. It argues that political control over capital, foreign investment, trade, and information can turn resources into patronage and dependence rather than diversified development.",
      [
        "The analysis connects resource rents, public employment, foreign investment restrictions, logistics, and governance instead of treating geology as a complete explanation.",
        "Historical comparison and secondary data are used to examine how capital openness and institutional access affect development pathways.",
        "The paper places currency systems and de-dollarization inside a wider account of market access, while leaving those relationships open to further testing.",
      ],
      "The public SSRN record lists 41 downloads and 172 abstract views in the indexed snapshot checked on 30 August 2026. The comparative argument draws on secondary data and historical synthesis; it does not prove that every resource-rich society follows the same path or that one reform would resolve the problem.",
      "Within Volume II, this paper supplies the resource-and-sovereignty case: who controls investment, information, and the terms under which wealth becomes public capability. The catalogue exposes only the public synopsis and SSRN record.",
    ),
    citations: [
      {
        id: "ssrn-5624610",
        label: "SSRN",
        citation:
          "Harsh Wardhan, Siddhartha, The Geography of Enslaved Wealth: How Resource-Rich Lands Produce Poor Societies (2025), SSRN abstract 5624610.",
        url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5624610",
      },
    ],
    notes: [
      "Matched to a Volume II resource-wealth paper and its public SSRN record.",
      "Historical interpretation and documented economic indicators remain visibly separate on the public reading page.",
    ],
    limitations: [
      "The paper is a comparative working paper, not a universal development law or predictive model.",
      "Country and region comparisons require attention to period, measurement, institutions, and source selection.",
      "Usage metrics are descriptive discovery signals, not scholarly validation.",
    ],
  }),
  makeDocument({
    id: "two-masks-one-face-ssrn",
    volume: "Volume II",
    title:
      "Two Masks, One Face: State Capitalism and Private Feudalism as Mirrors of the Same System",
    category: "Political Economy & Institutions",
    description:
      "A comparative working paper testing whether state and private forms of concentrated power can reproduce similar hierarchies despite different ideological language and ownership structures.",
    volumeRelevance:
      "This paper makes Volume II's institutional question comparative: how do different political-economic systems distribute authority, protect hierarchy, and define worker independence? Its value is as a provocation to compare mechanisms rather than accept a system's self-description as evidence of its effects.",
    sourceModified: "Volume II author paper matched to SSRN abstract 5683068",
    publicationDate: "5 December 2025",
    dateLabel: "Posted",
    sourceUrl: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5683068",
    metricsCheckedAt: "30 August 2026",
    metrics: { downloads: 30, abstractViews: 186, citations: 0 },
    sections: sections(
      "The paper compares state capitalism and private feudalism as two institutional forms that can concentrate decision-making power while presenting different accounts of freedom, equality, or merit. Through cases involving the Soviet Union, China, North Korea, post-Soviet Russia, and the United States, it asks whether hierarchy, worker dependence, and obedience can persist beneath opposing ideological masks.",
      [
        "The paper distinguishes formal ownership from practical control over work, investment, information, and political decision-making.",
        "Its comparative cases are used to generate an institutional question: when does an ideology's promise diverge from the distribution of power it enables?",
        "The title's claim that systems share one underlying face is the paper's interpretive thesis, not a verified finding that all states or economies are identical.",
      ],
      "The public SSRN record lists 30 downloads and 186 abstract views in the indexed snapshot checked on 30 August 2026. This is a comparative and interpretive working paper; the cases are not interchangeable, and the argument requires period-specific evidence rather than ideological equivalence by assertion.",
      "The Volume II taxonomy places this paper alongside the programme's inquiry into sovereignty, institutions, and political economy. The public page keeps its strongest comparative language labeled as an argument and does not reproduce the source file.",
    ),
    citations: [
      {
        id: "ssrn-5683068",
        label: "SSRN",
        citation:
          "Harsh Wardhan, Siddhartha, Two Masks, One Face: State Capitalism and Private Feudalism as Mirrors of the Same System (2025), SSRN abstract 5683068.",
        url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5683068",
      },
    ],
    notes: [
      "Matched to a Volume II political-economy paper and its public SSRN record.",
      "The synopsis preserves the paper's comparative ambition without turning analogy into proof.",
    ],
    limitations: [
      "The paper is an interpretive working paper, not a complete comparative political-economy dataset.",
      "Historical systems differ in law, period, institutions, and social conditions; comparisons must be made mechanism by mechanism.",
      "Usage metrics are not quality ratings or peer-review outcomes.",
    ],
  }),
  makeDocument({
    id: "children-left-behind-after-a-war-ssrn",
    volume: "Volume III",
    title:
      'Children Left Behind After a War: Why Vietnam Produced a Visible "War-Child" Generation—and Iraq Did Not',
    category: "Conflict, Demography & Social Visibility",
    description:
      "A comparative demographic working paper examining how war, stigma, law, migration, social contact, and changing communication technologies shape whether war-born children become visible public categories.",
    volumeRelevance:
      "This paper belongs in Volume III because it studies how institutions make social harm visible, countable, and eligible for support. It connects conflict to migration, stigma, family formation, administrative recognition, and the unequal distribution of public attention.",
    sourceModified: "Volume III author preprint matched to SSRN abstract 5994534",
    publicationDate: "22 January 2026",
    dateLabel: "Posted",
    sourceUrl: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5994534",
    metricsCheckedAt: "30 August 2026",
    metrics: { downloads: 14, abstractViews: 113, citations: 0 },
    sections: sections(
      "This working paper compares the public and institutional visibility of children born to foreign soldiers and local women during the Vietnam and Iraq wars. It asks how social contact, stigma, migration pathways, legal recognition, occupation structure, and persistent internet connectivity affect whether a war-born cohort becomes countable, publicly legible, and connected to policy.",
      [
        "The paper treats visibility as an institutional outcome: categories become socially consequential when families can be documented, recognized, counted, and connected to a policy pathway.",
        "It connects demographic evidence to social stigma, migration, law, and the changing conditions of wartime intimacy.",
        "Its comparison asks what a difference in public record can reveal about social structure without assuming that absence of documentation means absence of people or harm.",
      ],
      "The public SSRN record lists 14 downloads and 113 abstract views in the indexed snapshot checked on 30 August 2026. The comparison is a working hypothesis, not proof that Iraq produced no comparable cases; undercounting, stigma, displacement, and uneven records may all affect visibility.",
      "This is a Volume III bridge between social citizenship and public visibility. It shows how a population can remain outside policy attention when institutions do not recognize or count its experience, while keeping the underlying preprint private beyond the public record.",
    ),
    citations: [
      {
        id: "ssrn-5994534",
        label: "SSRN",
        citation:
          'Harsh Wardhan, Siddhartha, Children Left Behind After a War: Why Vietnam Produced a Visible "War-Child" Generation—and Iraq Did Not (2025), SSRN abstract 5994534.',
        url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5994534",
      },
    ],
    notes: [
      "Matched to a Volume III source file and the public SSRN record.",
      "The public summary foregrounds visibility and uncertainty rather than treating a documentary gap as proof of nonexistence.",
    ],
    limitations: [
      "The paper is a comparative working paper and does not provide a complete population count for either conflict.",
      "Records of war-born children are shaped by stigma, migration, legal status, family privacy, and state capacity.",
      "Usage metrics are descriptive signals, not scholarly quality ratings.",
    ],
  }),
  makeDocument({
    id: "lottery-of-luck-ssrn",
    volume: "Volume IV",
    title:
      "The Lottery of Luck: Why Education Remains the Only Scalable Path to Middle-Class Stability in the AI Economy",
    category: "Education, AI & Human Capability",
    description:
      "A Volume IV working paper examining education as economic infrastructure and asking how AI amplifies existing human capital, income concentration, and unequal routes to stable middle-class life.",
    volumeRelevance:
      "The paper gives Volume IV a human-capability test: when automation changes the value of skills, which institutions help people build durable capacity rather than depend on rare outlier success? It links education, re-skilling, AI literacy, and economic stability to the volume's wider question of who can govern technological change.",
    sourceModified: "Volume IV author preprint matched to SSRN abstract 5663111",
    publicationDate: "1 December 2025",
    dateLabel: "Posted",
    sourceUrl: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5663111",
    metricsCheckedAt: "30 August 2026",
    metrics: { downloads: 40, abstractViews: 202, citations: 0 },
    sections: sections(
      "This working paper argues that education remains a scalable route to middle-class stability as AI changes the labor market. It contrasts broad human-capital pathways with highly concentrated platform success, and proposes foundational skills, AI and data literacy, and lifelong re-skilling as forms of economic infrastructure.",
      [
        "The paper distinguishes repeatable education and capability pathways from exceptional creator or platform outcomes that are difficult for most people to reproduce.",
        "AI is framed as an amplifier of existing human capability rather than a substitute for the institutions that build judgment, competence, and opportunity.",
        "Its policy proposals connect schooling, adult learning, employment, and tax design to the question of whether technological change expands practical agency.",
      ],
      "The public SSRN record lists 40 downloads and 202 abstract views in the indexed snapshot checked on 30 August 2026. The title's claim that education is the only scalable path is the paper's thesis, not an established universal law; education quality, labor markets, disability, geography, family resources, and other pathways also require analysis.",
      "This Volume IV entry connects AI to the social infrastructure needed to use it. The site publishes the public synopsis and SSRN link, not the matching source PDF or manuscript text.",
    ),
    citations: [
      {
        id: "ssrn-5663111",
        label: "SSRN",
        citation:
          "Harsh Wardhan, Siddhartha, The Lottery of Luck: Why Education Remains the Only Scalable Path to Middle-Class Stability in the AI Economy (2025), SSRN abstract 5663111.",
        url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5663111",
      },
    ],
    notes: [
      "Matched to a Volume IV working paper and its public SSRN record.",
      "The catalogue keeps the paper's strong thesis visible while labeling it as an argument open to testing.",
    ],
    limitations: [
      "The paper is a working paper, not a forecast of every worker's outcome in an AI economy.",
      "Education effects vary with field, quality, cost, labor demand, geography, and access to complementary support.",
      "Usage metrics are not peer review or a measure of social impact.",
    ],
  }),
  makeDocument({
    id: "entanglement-primer-ssrn",
    volume: "Volume IV",
    title:
      "Entanglement, No-Signalling, and the Real Path to Quantum Advantage: A Systems-Level Primer for Practitioners and Policymakers",
    category: "Quantum Computing & Scientific Capacity",
    description:
      "A concise Volume IV primer translating quantum-information concepts, engineering constraints, and policy implications into a practical map of what quantum systems can and cannot do.",
    volumeRelevance:
      "This is a capability paper for Volume IV: it connects scientific principles to hardware limits, error correction, cryptography, networking, and the institutional choices needed to turn technical possibility into public capacity.",
    sourceModified: "Volume IV PDF matched to SSRN abstract 5434314",
    publicationDate: "19 September 2025",
    dateLabel: "Posted",
    sourceUrl: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5434314",
    metricsCheckedAt: "30 August 2026",
    metrics: { downloads: 69, abstractViews: 549, citations: 0 },
    sections: sections(
      "This primer explains the physical ideas behind quantum information—superposition, measurement, interference, and entanglement—while correcting the misconception that entanglement enables faster-than-light communication. It maps the path from noisy devices to error-corrected systems and connects algorithms, quantum simulation, post-quantum cryptography, and networking to practical engineering and policy questions.",
      [
        "It separates quantum advantage in specific problem classes from the broader and unsupported idea that quantum computers make every computation faster.",
        "No-signalling, error correction, surface codes, teleportation, superdense coding, Shor's algorithm, and Grover's algorithm are placed inside one systems-level explanation.",
        "The policy layer asks how technical timelines, cryptography transitions, scientific infrastructure, and public investment should be discussed without hype.",
      ],
      "The public SSRN record lists 69 downloads and 549 abstract views in the indexed snapshot checked on 30 August 2026. The primer is an educational working paper; technical claims and projected timelines should be checked against current primary research and standards before informing procurement or policy.",
      "This Volume IV record is the accessible on-ramp to the quantum line of inquiry. It publishes a public-safe explanation and the SSRN record while keeping any local source files outside the website.",
    ),
    citations: [
      {
        id: "ssrn-5434314",
        label: "SSRN",
        citation:
          "Harsh Wardhan, Siddhartha, Entanglement, No-Signalling, and the Real Path to Quantum Advantage: A Systems-Level Primer for Practitioners and Policymakers (2025), SSRN abstract 5434314.",
        url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5434314",
      },
    ],
    notes: [
      "Matched to a Volume IV PDF and the public SSRN record.",
      "The synopsis is designed for public discovery and does not reproduce the local source document.",
    ],
    limitations: [
      "Quantum advantage is problem-specific and depends on hardware, algorithms, error rates, and available data.",
      "Projected dates and application claims can change as research and engineering progress.",
      "Usage metrics are descriptive discovery signals, not technical validation.",
    ],
  }),
  makeDocument({
    id: "entanglement-foundations-ssrn",
    volume: "Volume IV",
    title:
      "Entanglement, No-Signalling, and the Real Path to Quantum Advantage: Foundations, Architectures, and Societal Implications",
    category: "Quantum Computing & Scientific Capacity",
    description:
      "A foundational Volume IV paper connecting quantum mechanics, fault-tolerant architectures, quantum networks, cryptography transition, and the social consequences of scientific infrastructure.",
    volumeRelevance:
      "Read alongside the primer, this paper moves from explanation to architecture and societal consequence. It asks what scientific capacity means when the decisive constraints are not only equations but error correction, networks, standards, security, and institutional readiness.",
    sourceModified: "Volume IV PDF matched to SSRN abstract 5432061",
    publicationDate: "19 September 2025",
    dateLabel: "Posted",
    sourceUrl: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5432061",
    metricsCheckedAt: "30 August 2026",
    metrics: { downloads: 32, abstractViews: 887, citations: 0 },
    sections: sections(
      "This paper introduces the foundations of quantum computing, explains why entanglement cannot transmit information on its own, and follows the engineering path toward fault-tolerant systems. It then connects quantum networks, post-quantum cryptography, simulation, optimization, and machine learning to the institutions and standards that determine whether scientific capability becomes socially useful.",
      [
        "The paper moves from first principles to architectures, making the distinction between a physical resource, an algorithmic speedup, and a deployable system explicit.",
        "Fault tolerance and surface-code error correction are treated as central engineering constraints rather than footnotes to a promise of quantum advantage.",
        "The societal section connects cryptography migration, scientific infrastructure, and public capability to the technical limits described earlier.",
      ],
      "The public SSRN record lists 32 downloads and 887 abstract views in the indexed snapshot checked on 30 August 2026. This is a foundational working paper, not a current technology forecast or deployment recommendation; technical milestones and standards require up-to-date primary-source review.",
      "This record complements the shorter Volume IV primer: the primer is the public on-ramp, while this paper expands the architecture and societal implications. Neither public entry exposes the matching source file.",
    ),
    citations: [
      {
        id: "ssrn-5432061",
        label: "SSRN",
        citation:
          "Harsh Wardhan, Siddhartha, Entanglement, No-Signalling, and the Real Path to Quantum Advantage: Foundations, Architectures, and Societal Implications (2025), SSRN abstract 5432061.",
        url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5432061",
      },
    ],
    notes: [
      "Matched to a Volume IV PDF and a public SSRN record.",
      "The catalogue uses a concise public synopsis and preserves the distinction between research direction and deployment claim.",
    ],
    limitations: [
      "The paper is a conceptual and technical overview, not a complete survey of current quantum research.",
      "Hardware, error-correction, cryptography, and application timelines are fast-moving and require current verification.",
      "Usage metrics are not peer review, endorsement, or a measure of technical readiness.",
    ],
  }),
];
