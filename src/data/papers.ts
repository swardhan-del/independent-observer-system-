import type { PublicDocument, PublicDocumentSection } from "./documents";

const author = "Siddhartha Harsh Wardhan";
const metricsDate = "25 August 2026";
const sourceReviewDate = "31 August 2026";

const researchGateUrls: Partial<Record<string, string>> = {
  "who-deported-more":
    "https://www.researchgate.net/publication/396491871_Who_Deported_More_Measuring_Removals_Returns_and_Enforcement_Priorities_Across_Presidential_Administrations_2000-2025",
  "disconnected-hearts":
    "https://www.researchgate.net/publication/397333270_Disconnected_Hearts_-_The_Tech_Revolution_of_Intimacy",
  "wardhan-tax-doctrine":
    "https://www.researchgate.net/publication/396189529_The_Wardhan_Tax_Doctrine_Time-as-Deduction_W-2_Relief_and_an_Eisenhower-Era_Return_to_Progressivity_with_IRC_Amendments",
  "double-tax-on-time":
    "https://www.researchgate.net/publication/397369506_The_Double_Tax_on_Time_Why_Women_Pay_for_Both_Biology_and_Bureaucracy",
  "from-colonization-to-chinas-rise":
    "https://www.researchgate.net/publication/396834165_From_Colonization_to_China%27s_Rise_How_Historical_Power_Shifts_Still_Shape_Global_Politics_and_Democracy",
  "independent-observer-volume-one":
    "https://www.researchgate.net/publication/395665962_Independent_Observer_Critical_Studies_in_Philosophy_Politics_Economics_and_History_-_Volume_I_Foundational_Manifesto",
  "a-systems-centered-manifesto":
    "https://www.researchgate.net/publication/395670267_A_Systems-Centered_Manifesto_on_Automation_Education_and_the_Carceral_State",
  "the-illusion-of-equality":
    "https://www.researchgate.net/publication/395751230_The_Illusion_of_Equality_The_Founding_Fathers%27_Contradictions_The_Flaws_of_Democracy_and_The_Future_of_US_Economic_Influence",
  "citizens-without-a-country":
    "https://www.researchgate.net/publication/400013203_Citizens_Without_a_Country_The_Democratic_Legitimacy_Crisis_of_Non-Resident_Birthright_Voting_in_US_Federal_Elections_Political_Empire_Independent_Observer_-Volume_II",
  "geography-of-enslaved-wealth":
    "https://www.researchgate.net/publication/397697866_The_Geography_of_Enslaved_Wealth_How_Resource-Rich_Lands_Produce_Poor_Societies",
  "two-masks-one-face":
    "https://www.researchgate.net/publication/398394116_Two_Masks_One_Face_State_Capitalism_and_Private_Feudalism_as_Mirrors_of_the_Same_System",
  "the-american-empire-was-never-a-democracy":
    "https://www.researchgate.net/publication/395703114_The_American_Empire_was_Never_a_Democracy",
  "when-the-storm-decides":
    "https://www.researchgate.net/publication/395918295_When_the_Storm_Decides_Crises_Perception_and_Electoral_Outcomes_in_the_United_States",
  "managed-interdependence":
    "https://www.researchgate.net/publication/398271387_Managed_Interdependence_Industrial_Policy_and_Governance_Sequencing_in_Post-Autocratic_Russia",
  "from-vietnam-to-terry-ohio":
    "https://www.researchgate.net/publication/397115063_From_Vietnam_to_Terry_v_Ohio_Investing_in_Human_Failure_vs_Human_Potential",
  "lottery-of-luck":
    "https://www.researchgate.net/publication/398222354_The_Lottery_of_Luck_Why_Education_Remains_the_Only_Scalable_Path_to_Middle-Class_Stability_in_the_AI_Economy",
  "entanglement-primer":
    "https://www.researchgate.net/publication/395684873_Entanglement_No-Signalling_and_the_Real_Path_to_Quantum_Advantage_A_Systems-Level_Primer_for_Practitioners_and_Policymakers",
  "entanglement-foundations":
    "https://www.researchgate.net/publication/395685020_Entanglement_No-Signalling_and_the_Real_Path_to_Quantum_Advantage_Foundations_Architectures_and_Societal_Implications",
};

const sourceReviews: Record<string, { fingerprint: string; taxonomy: string }> = {
  "who-deported-more": {
    fingerprint: "a27b80308a585940ea9e8a98559f75c08beed334263befa254de545f4b7028ef",
    taxonomy: "Volume II categorized paper controller; later review copies excluded",
  },
  "latino-irony": {
    fingerprint: "52597fb221559fbec73b81ceb9273ea407eba00ed0399136ee0cd7dd469d665e",
    taxonomy: "Volume II categorized paper controller",
  },
  "disconnected-hearts": {
    fingerprint: "eb982844da37f66ac593189df2c77964d955b918908338c94f1ab0cfde60e0d8",
    taxonomy: "Volume IV submission package; internal volume label needs reconciliation",
  },
  "wardhan-tax-doctrine": {
    fingerprint: "18ff5b27ed02f05c22261eff2df5987d572ac8cabe94fa7d8ba833b83cae10f1",
    taxonomy: "Volume III content-confirmed paper controller",
  },
  "double-tax-on-time": {
    fingerprint: "46dc7321e61bf6855bfffb1f2abc9b0c391d08d94ee2cacac0250616ac26b371",
    taxonomy: "Volume IV content-confirmed cross-volume controller",
  },
  "from-colonization-to-chinas-rise": {
    fingerprint: "b2fcdf9450af2ce52ce50ef8f60abc4bd06e45a7af98d6e22a1b8af002cf0e51",
    taxonomy: "Volume II categorized paper controller",
  },
  "independent-observer-volume-one": {
    fingerprint: "c896a12b0fddc67185b85797606c752367592b72caac0cce0067d37263c86b94",
    taxonomy: "Volume I foundational paper controller",
  },
  "a-systems-centered-manifesto": {
    fingerprint: "df8e41ba8c5a14a695eb83d8269bf42f4f3189753fd4e751d3d4c927f85ec386",
    taxonomy: "Volume I foundational paper controller",
  },
  "the-illusion-of-equality": {
    fingerprint: "3a5d9727dc807c97f3902af9ade8563afd0bfcd7f25c462bfc336d24b8ff4ea9",
    taxonomy: "Volume II categorized paper controller; duplicate DOCX copies excluded",
  },
  "citizens-without-a-country": {
    fingerprint: "22ca0a1781616e4c743fe6dcb60374ccd8b28362b941f0b144c72e12f0698472",
    taxonomy: "Volume II categorized paper controller",
  },
  "empire-of-distraction": {
    fingerprint: "b2ecbfabcf3e623c90d60a5c4cf11e87e2b7949d44f1d34987505c50fb6b89b3",
    taxonomy: "Volume III categorized controller; public volume placement needs reconciliation",
  },
  "geography-of-enslaved-wealth": {
    fingerprint: "f210b85d5d946ea35cffb12e3b48d12f80b15297b1ffda89cdfd7d940d9abfe2",
    taxonomy: "Volume II categorized paper controller",
  },
  "two-masks-one-face": {
    fingerprint: "85d2103ef680f0bd827708b9c92f079af3c7865d00047d5b54a0d8cd437d797a",
    taxonomy: "Volume II categorized paper controller",
  },
  "the-american-empire-was-never-a-democracy": {
    fingerprint: "8b76b1b09baea31498839f6ff9e269556b569bc46e10038c5351b7458cbdef15",
    taxonomy: "Volume II research-cleared paper controller",
  },
  "when-the-storm-decides": {
    fingerprint: "6bba0424911fe8523af12b71a6a0b6ef0a94023eb16ec92fd5d702b2d2e26a84",
    taxonomy: "Volume II categorized paper controller; methodology-hold revision excluded",
  },
  "managed-interdependence": {
    fingerprint: "b5ee549e2022df84243758cec6b6d71ff8e01793d831d4c99ca54076855f143b",
    taxonomy: "Volume II expanded categorized paper controller",
  },
  "from-vietnam-to-terry-ohio": {
    fingerprint: "02f0db78e3a69f476dde058798df6fd443d86ea7e560d008823f00a4ef57e9b9",
    taxonomy: "Volume III categorized paper controller",
  },
  "children-left-behind-after-a-war": {
    fingerprint: "79817c5a31f7ae2155a0ce4f6d71cb9204d670b4292f053b231ca553b8504db0",
    taxonomy: "Volume III categorized paper controller",
  },
  "lottery-of-luck": {
    fingerprint: "c9027cf239a300845a45ffe08acdf32ca6b9953f50da2027a604bc192cfc4f29",
    taxonomy: "Volume IV source under placement review; duplicate copies excluded",
  },
  "entanglement-primer": {
    fingerprint: "8f7a1eb1d1a5d00a6fecf974947ddc04ba75a7b1e2f9742d312d0ca6a2a8aa6d",
    taxonomy: "Volume IV paper controller",
  },
  "entanglement-foundations": {
    fingerprint: "25063baf328eee8719ef5e34d9d38209c1f4c4d0d655051e5210bcb0c33042c2",
    taxonomy: "Volume IV paper controller",
  },
};

type PaperInput = Omit<PublicDocument, "sourceLabel" | "status" | "author" | "metrics"> & {
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
      heading: "Author’s synopsis",
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
        "This document is presented as an author-paper catalogue entry connected to the Independent Observer program. Its source trail and status remain visible so readers can distinguish a working paper from a released publication.",
        "The complete manuscript is not hosted here. This page contains a source-reviewed synopsis and selected analytical points for discovery, citation, and discussion.",
        ...(publicationContext ? [publicationContext] : []),
        limitation,
      ],
    },
  ];
}

function makeDocument(input: PaperInput): PublicDocument {
  const { metricsCheckedAt, publicationContext: _publicationContext, ...document } = input;
  const researchGateUrl = researchGateUrls[document.id];
  const sourceReview = sourceReviews[document.id];

  return {
    ...document,
    sourceLabel: "Author-controlled source · selected public synopsis",
    sourceModified: `Author-controlled source reviewed ${sourceReviewDate}`,
    sourceReviewedAt: sourceReviewDate,
    sourceFingerprintSha256: sourceReview?.fingerprint,
    sourceTaxonomyNote: sourceReview?.taxonomy,
    rightsNotice:
      "Copyright and any paper-specific license remain with the author. This page is a selected synopsis; the complete manuscript file is not hosted here.",
    status: "Author working paper",
    author,
    researchGateUrl,
    externalVerification: researchGateUrl ? "verified" : "needs_review",
    citations: document.citations?.map((citation) => ({
      ...citation,
      label: researchGateUrl ? "ResearchGate" : "Independent Observer",
      url: researchGateUrl,
    })),
    metrics: {
      ...input.metrics,
      checkedAt: metricsCheckedAt ?? metricsDate,
    },
  };
}

/**
 * Public-safe, author-controlled article records selected from matching Dropbox
 * paper controllers. These are not Dropbox feed imports and do not set
 * releaseApproved or alter the empty approved feed.
 */
export const paperDocuments: PublicDocument[] = [
  makeDocument({
    id: "who-deported-more",
    volume: "Volume II",
    title:
      "Who Deported More? Measuring Removals, Returns, and Enforcement Priorities Across Presidential Administrations 2000–2025",
    category: "Demography & Migration",
    description:
      "A data-defined working paper that separates removals, returns, and expulsions before comparing enforcement priorities across administrations.",
    volumeRelevance:
      "This paper gives Volume II an empirical entry point into sovereignty and administrative power. Its definitions-first approach shows how legal categories, agency routines, and enforcement resources shape the public numbers through which political authority is judged.",
    publicationDate: "13 October 2025",
    dateLabel: "Posted",
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
      "An archived distribution snapshot from 25 August 2026 recorded 126 downloads and 6,397 abstract views. The originating platform is no longer relied upon for access. Metrics change over time; the archived source did not provide a star-rating field for this paper. The matching author working version requires removal of an older appendix before any longer-form release.",
    ),
    citations: [
      {
        id: "source-note-5495878",
        label: "Independent Observer",
        citation:
          "Harsh Wardhan, Siddhartha, Who Deported More? Measuring Removals, Returns, and Enforcement Priorities Across Presidential Administrations 2000–2025 (2025).",
      },
    ],
    notes: [
      "Featured first because it has the strongest retrieved archived distribution download and abstract-view signal among the matched author working papers.",
      "The site presents the controlled public synopsis, not the raw DOCX/PDF or an appended prior draft.",
    ],
    limitations: [
      "The archived distribution snapshot is a working paper, not peer-reviewed publication status.",
      "Comparisons depend on definitions, population coverage, reporting periods, and the treatment of Title 42 expulsions.",
      "Archived distribution counts are time-varying and should not be treated as scholarly quality ratings.",
    ],
  }),
  makeDocument({
    id: "latino-irony",
    volume: "Volume II",
    title: "The Latino Irony: Why Many Hispanic Americans Support Donald Trump",
    category: "Politics & Demography",
    description:
      "A working paper that treats Latino voting behavior as internally heterogeneous rather than as a single identity-based bloc.",
    volumeRelevance:
      "It contributes a democratic-membership case to Volume II by asking how identity, policy experience, local institutions, and immigration enforcement interact in political choice. The paper’s value is its refusal to treat a large population as one political actor or one explanation.",
    publicationDate: "23 September 2025",
    dateLabel: "Posted",
    metrics: { downloads: 56, abstractViews: 546, citations: 0, rank: 1010164 },
    sections: sections(
      "The paper proposes a multi-factor explanation for why a meaningful share of Hispanic and Latino voters supported Republican candidates, including Donald Trump. It combines identity heterogeneity, cultural conservatism, economic evaluation, political memory, and immigration-enforcement salience rather than treating ethnicity as a complete voting model.",
      [
        "The unit of analysis is the interaction among identity, policy experience, and local information environments.",
        "The paper frames its objective as explanation and measurement, not candidate advocacy.",
        "Service delivery, housing, schools, safety, permitting, and small-business conditions are treated as politically relevant outcomes.",
      ],
      "An archived distribution snapshot from 25 August 2026 recorded 56 downloads and 546 abstract views. The originating platform is no longer relied upon for access. Those figures are usage signals, not a rating or evidence that every causal claim is established.",
    ),
    citations: [
      {
        id: "source-note-5447654",
        label: "Independent Observer",
        citation:
          "Harsh Wardhan, Siddhartha, The Latino Irony: Why Many Hispanic Americans Support Donald Trump (2025).",
      },
    ],
    notes: [
      "Selected as the second-highest-download matched public working paper in the retrieved set.",
      "The page preserves the paper's analytical framing and does not present a demographic group as politically uniform.",
    ],
    limitations: [
      "This is a working paper and not a causal estimate of all Latino voting behavior.",
      "The title and argument concern heterogeneous populations; readers should not generalize from a summary to every voter or place.",
      "Usage metrics are not peer review, endorsement, or a star rating.",
    ],
  }),
  makeDocument({
    id: "disconnected-hearts",
    volume: "Volume IV",
    title: "Disconnected Hearts — The Tech Revolution of Intimacy",
    category: "Technology & Intimacy",
    description:
      "A short working paper on how automation, economic precarity, and digital mediation reshape intimacy, identity, and demographic life.",
    publicationDate: "6 November 2025",
    dateLabel: "Posted",
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
      "An archived distribution snapshot from 25 August 2026 recorded 47 downloads and 152 abstract views. The originating platform is no longer relied upon for access. The site uses the public summary and preserves its archived distribution counts; it does not reproduce email addresses, private correspondence, or alternate archive copies.",
    ),
    citations: [
      {
        id: "source-note-5578130",
        label: "Independent Observer",
        citation:
          "Harsh Wardhan, Siddhartha, Disconnected Hearts — The Tech Revolution of Intimacy (2025).",
      },
    ],
    notes: [
      "Featured because its retrieved archived distribution usage signal is stronger than the remaining matched Volume IV working papers in this set.",
      "The article is labeled as a working paper and not as a completed sociological or demographic finding.",
    ],
    limitations: [
      "The paper is conceptual and does not establish a single causal pathway from technology to demographic outcomes.",
      "The archived snapshot has no star-rating field; downloads and abstract views are descriptive usage counts.",
    ],
  }),
  makeDocument({
    id: "wardhan-tax-doctrine",
    volume: "Volume III",
    title:
      "The Wardhan Tax Doctrine: Time-as-Deduction, W-2 Relief, and an Eisenhower-Era Return to Progressivity",
    category: "Political Economy & Tax",
    description:
      "A Volume III policy working paper within Managed Decline. It asks how tax design can recognize time spent building skills, reduce pressure on wage labor, and restore progressive treatment of selected ownership income. Its placement is deliberate: the paper addresses Volume III’s inquiry into labor markets, welfare, taxation, and administrative access, rather than Volume I’s method foundation or Volume II’s sovereignty and institutional design. It connects the proposed credits and relief mechanisms to eligibility rules, reporting, documentation, and audit design.",
    publicationDate: "3 October 2025",
    dateLabel: "Posted",
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
        id: "source-note-5477606",
        label: "Independent Observer",
        citation:
          "Harsh Wardhan, Siddhartha, The Wardhan Tax Doctrine: Time-as-Deduction, W-2 Relief, and an Eisenhower-Era Return to Progressivity (with IRC Amendments) (2025).",
      },
    ],
    notes: [
      "Selected from the matching Volume III author submission package and ranked by the archived public usage signals.",
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
    id: "double-tax-on-time",
    volume: "Volume IV",
    title: "The Double Tax on Time: Why Women Pay for Both Biology and Bureaucracy",
    category: "Gender & Political Economy",
    description:
      "A working paper examining how biological timing, career structures, caregiving policy, and demographic economics interact.",
    publicationDate: "7 November 2025",
    dateLabel: "Posted",
    metrics: { downloads: 39, abstractViews: 225, citations: 0 },
    sections: sections(
      "The paper introduces the phrase “double tax on time” for the interaction between biological constraints and bureaucratic or economic arrangements that can narrow women's career choices. It compares policy tools such as parental leave, fertility care, education, and tax treatment while arguing for equity rather than identical treatment as a demographic and economic objective.",
      [
        "Caregiving is treated as a productive social investment rather than only as an individual interruption.",
        "The analysis connects gender economics, human capital, fertility, migration, and public policy.",
        "The paper presents a comparative policy frame rather than a single universal solution.",
      ],
      "An archived distribution snapshot from 25 August 2026 recorded 39 downloads and 225 abstract views. The originating platform is no longer relied upon for access. Several quantitative claims in the underlying working paper require careful source and currentness review; the website therefore foregrounds the thesis and boundary rather than reproducing every number.",
    ),
    citations: [
      {
        id: "source-note-5584710",
        label: "Independent Observer",
        citation:
          "Harsh Wardhan, Siddhartha, The Double Tax on Time: Why Women Pay for Both Biology and Bureaucracy (2025).",
      },
    ],
    notes: [
      "Selected from a content-confirmed author working paper with a matching archived distribution snapshot.",
      "The page retains visible limitations instead of treating the working paper's comparative claims as settled facts.",
    ],
    limitations: [
      "The article is a working paper and does not establish a universal estimate of productivity or demographic effect.",
      "Cross-national comparisons require careful attention to definitions, dates, institutions, and policy context.",
      "The archived source did not provide a star-rating field; usage figures are not scholarly validation.",
    ],
  }),
  makeDocument({
    id: "from-colonization-to-chinas-rise",
    volume: "Volume II",
    title:
      "From Colonization to China’s Rise: How Historical Power Shifts Still Shape Global Politics and Democracy",
    category: "History & Geopolitics",
    description:
      "A historical working paper connecting colonization, industrialization, economic design, and contemporary competition among major powers.",
    volumeRelevance:
      "This paper extends Volume II’s sovereignty inquiry across time: it connects historical extraction, industrial capacity, capital, and geopolitical competition to the institutions that make power durable. It gives the volume a long-range frame for reading present rivalry without collapsing different periods into one story.",
    publicationDate: "23 October 2025",
    dateLabel: "Posted",
    metrics: { downloads: 38, abstractViews: 161, citations: 0 },
    sections: sections(
      "The paper traces how colonization, industrialization, and strategic economic design shaped modern power. It argues that contemporary competition among the United States, China, and Russia should be read alongside older systems of knowledge extraction, inequality, and institutional control rather than as a wholly new contest.",
      [
        "Historical power shifts are treated as institutional and economic processes, not only military events.",
        "The paper links democratic vulnerability to literacy, corruption, inequality, and working-class exclusion.",
        "The conclusion asks what a more durable democratic political economy would need to change.",
      ],
      "An archived distribution snapshot from 25 August 2026 recorded 38 downloads and 161 abstract views. The originating platform is no longer relied upon for access. Historical analogy can illuminate mechanisms, but it does not prove that different periods or states are equivalent.",
    ),
    citations: [
      {
        id: "source-note-5540740",
        label: "Independent Observer",
        citation:
          "Harsh Wardhan, Siddhartha, From Colonization to China’s Rise: How Historical Power Shifts Still Shape Global Politics and Democracy (2025).",
      },
    ],
    notes: [
      "Selected from the matching Volume II author submission package and placed below the stronger-download records.",
      "The page labels historical synthesis and interpretation separately from documented chronology.",
    ],
    limitations: [
      "The paper is a historical and political-economy synthesis, not a predictive model of great-power competition.",
      "Comparative claims require attention to period, geography, and source selection.",
      "Usage metrics are not ratings or peer-review outcomes.",
    ],
  }),
  makeDocument({
    id: "independent-observer-volume-one",
    volume: "Volume I",
    title:
      "Independent Observer: Critical Studies in Philosophy, Politics, Economics, and History — Volume I (Foundational Manifesto)",
    category: "Method & Democratic Capacity",
    description:
      "Volume I is the method anchor for the Independent Observer: a systems-level reading of how law, labor, media, evidence, and democratic capacity shape public life. It connects philosophy, political economy, historical analysis, and public reasoning while keeping the limits of a working paper visible.",
    volumeRelevance:
      "This is the method anchor for the entire series. It establishes the volume’s central vocabulary—evidence, information asymmetry, institutional design, and public reasoning—and shows how to make the basis and limits of an argument visible before accepting its conclusion.",
    publicationDate: "19 September 2025",
    dateLabel: "Posted",
    metrics: { downloads: 23, abstractViews: 113, citations: 0 },
    sections: sections(
      "The foundational paper presents a systems-level critique of how law, labor, media, and institutional constraints shape democratic capacity. It proposes a method-first, nonpartisan approach that distinguishes factual records, interpretation, policy design, and unresolved questions while inviting future empirical work.",
      [
        "The method treats information asymmetry and institutional design as part of political economy.",
        "The framework joins political theory, economic policy, historical analysis, and public reasoning.",
        "The public-facing purpose is to make the basis and limits of an argument visible before asking readers to accept its conclusion.",
      ],
      "An archived distribution snapshot from 25 August 2026 recorded 23 downloads and 113 abstract views. The originating platform is no longer relied upon for access. It is a foundational working paper, not a claim that the full Independent Observer series has been published or peer reviewed.",
      "This page is the public entry point for Volume I’s Foundational Manifesto, one of three Volume I papers currently represented by matched archived distribution snapshots. It explains the method of observation, documentation, information asymmetry, institutional design, and public reasoning; other Volume I manuscripts remain outside this reading copy until their public records and release status are separately verified.",
    ),
    citations: [
      {
        id: "source-note-5431958",
        label: "Independent Observer",
        citation:
          "Harsh Wardhan, Siddhartha, Independent Observer: Critical Studies in Philosophy, Politics, Economics, and History — Volume I (Foundational Manifesto) (2025).",
      },
    ],
    notes: [
      "This is the Volume I method anchor for the series roadmap, not a replacement for the complete manuscript archive.",
      "The public page uses a short curated reading copy and the author-linked archived distribution snapshot.",
    ],
    limitations: [
      "The broader Independent Observer research project began within the past year. This foundation is an early working paper, open to discussion, empirical testing, and revision.",
      "Methodological claims are not the same as findings about any individual institution or person.",
      "archived distribution usage figures are descriptive and not a quality rating.",
    ],
  }),
  makeDocument({
    id: "a-systems-centered-manifesto",
    volume: "Volume I",
    title: "A Systems-Centered Manifesto on Automation, Education, and the Carceral State",
    category: "Automation, Labor & Democratic Capacity",
    description:
      "A working paper linking industrial automation in global supply chains, skill mismatch in U.S. labor markets, and mass incarceration and recidivism. It argues that tariffs alone cannot restore employment when production is automated and geographically flexible, and instead pairs industrial policy with vocational and apprenticeship pathways, reentry, second-chance hiring, and local skill investment.",
    volumeRelevance:
      "It demonstrates Volume I’s systems method by reading economic policy, labor-market capability, education, and carceral institutions as one connected structure rather than as isolated issues. Its value to the volume is the move from observation to a testable, people-centered reform agenda.",
    publicationDate: "19 September 2025",
    dateLabel: "Posted",
    metricsCheckedAt: "30 August 2026",
    metrics: { downloads: 22, abstractViews: 120, citations: 0 },
    sections: sections(
      "The paper connects automation in globalized supply chains with U.S. skill shortages and the labor-market effects of incarceration and recidivism. It argues that reshoring policy needs to be paired with vocational training, apprenticeships, reentry support, and local capability-building rather than relying on tariffs alone.",
      [
        "It treats definitions and institutional connections as part of the analysis: automation, skills, incarceration, and reentry are related policy questions.",
        "It tests whether a trade or industrial policy can improve work without ignoring geographic flexibility and automation.",
        "It frames second-chance hiring and apprenticeship pathways as human-capital and democratic-capacity interventions.",
      ],
      "The archived distribution snapshot was verified on 30 August 2026; its usage figures are descriptive signals, not peer review or a quality rating. It is a working paper, and the paper’s proposed relationships require further empirical testing.",
    ),
    citations: [
      {
        id: "source-note-5432014",
        label: "Independent Observer",
        citation:
          "Harsh Wardhan, Siddhartha, A Systems-Centered Manifesto on Automation, Education, and the Carceral State (2025).",
      },
    ],
    notes: [
      "Verified against an archived distribution snapshot matched to an author Volume I submission PDF.",
      "The site uses a public-safe synopsis and verified paper-discovery link; it does not publish the raw source PDF.",
    ],
    limitations: [
      "The paper is a working paper, not a peer-reviewed publication.",
      "The policy recommendations are proposals, not evidence that any single intervention will produce a given result.",
      "Downloads and abstract views are usage signals, not scholarly quality ratings.",
    ],
  }),
  makeDocument({
    id: "the-illusion-of-equality",
    volume: "Volume I",
    title:
      "The Illusion of Equality: The Founding Fathers’ Contradictions, The Flaws of Democracy, and The Future of U.S. Economic Influence",
    category: "Institutional Power & Political Economy",
    description:
      "A historical and political-economy working paper examining the gap between America’s language of equality and the constitutional, legal, electoral, and economic structures that distribute power. It moves from founding-era exclusions and sovereign immunity to representation, corporate influence, reserve-currency politics, BRICS, and tariffs.",
    volumeRelevance:
      "It extends Volume I’s method from individual claims to institutional comparison: readers can see why historical context, legal structure, definitions, and present-day incentives must be connected before a democracy claim is accepted. It serves as a concrete case of the volume’s focus on legitimacy, public reasoning, and the gap between formal rights and practical capacity.",
    publicationDate: "22 September 2025",
    dateLabel: "Posted",
    metricsCheckedAt: "30 August 2026",
    metrics: { downloads: 36, abstractViews: 137, citations: 0 },
    sections: sections(
      "This working paper examines the contradiction between founding claims of equality and institutions that excluded or disadvantaged large parts of the population. It combines constitutional history, democratic practice, and political economy to examine how representation, sovereign immunity, corporate influence, reserve-currency dynamics, BRICS coordination, and tariff policy shape modern power.",
      [
        "It uses founding-era contradictions and later legal structures to test the distance between formal equality and actual accountability.",
        "It connects constitutional design, representation, corporate influence, and global economic power in one institutional analysis.",
        "Its reform discussion gives readers a concrete example of how Volume I moves from diagnosis toward public reasoning about institutional change.",
      ],
      "The archived distribution snapshot was verified on 30 August 2026; its usage figures are descriptive signals, not peer review or a quality rating. The paper is a working paper and combines historical, legal, and political-economy arguments that remain open to source and interpretation review.",
    ),
    citations: [
      {
        id: "source-note-5442294",
        label: "Independent Observer",
        citation:
          "Harsh Wardhan, Siddhartha, The Illusion of Equality: The Founding Fathers’ Contradictions, The Flaws of Democracy, and The Future of U.S. Economic Influence (2025).",
      },
    ],
    notes: [
      "Verified against an archived distribution snapshot matched to an author Volume I PDF.",
      "The synopsis is public-safe and does not reproduce the raw source PDF.",
    ],
    limitations: [
      "The paper is a working paper, not a peer-reviewed publication.",
      "Historical analogies and institutional comparisons require attention to period, jurisdiction, and source selection.",
      "Downloads and abstract views are usage signals, not scholarly quality ratings.",
    ],
  }),
  makeDocument({
    id: "citizens-without-a-country",
    volume: "Volume II",
    title:
      "Citizens Without a Country: The Democratic Legitimacy Crisis of Non-Resident Birthright Voting in U.S. Federal Elections",
    category: "Democracy, Citizenship & Voting",
    description:
      "A Volume II working paper examining how non-resident birthright voting tests the relationship between political voice, residency, civic integration, and exposure to the consequences of federal policy.",
    volumeRelevance:
      "This paper gives Volume II a concrete case for studying sovereignty and democratic membership. It asks how the state defines the people who may decide its rules, and whether political authority remains reciprocal when voters have little or no lived connection to the institutions they help govern.",
    publicationDate: "22 January 2026",
    dateLabel: "Posted",
    metricsCheckedAt: "30 August 2026",
    metrics: { downloads: 17, abstractViews: 108, citations: 0 },
    sections: sections(
      "This working paper examines the democratic legitimacy of federal voting rights held by citizens who live permanently outside the United States, including people who have never lived there. It connects external voting to residency, taxation, civic integration, military service, comparative electoral design, and the question of whether political voice should track exposure to domestic policy consequences.",
      [
        "It treats citizenship and voting as institutional relationships that carry both rights and responsibilities, rather than as labels that answer every legitimacy question by themselves.",
        "The analysis compares the U.S. external-voting model with broader democratic design questions about residency, accountability, and political membership.",
        "Its proposed criteria are presented as a framework for debate and testing, not as enacted election law or a settled constitutional conclusion.",
      ],
      "The archived distribution snapshot lists 17 downloads and 108 abstract views in the indexed snapshot checked on 30 August 2026. Usage counts change over time and are not peer review or evidence that the paper's legitimacy framework is correct. The paper is a working argument about electoral design, not individualized legal advice.",
      "The Volume II resource map places this paper in the sovereignty, institutions, and democratic-membership line of inquiry. The website publishes a short synopsis and the public verified paper-discovery link; it does not expose the matching source manuscript.",
    ),
    citations: [
      {
        id: "source-note-5992076",
        label: "Independent Observer",
        citation:
          "Harsh Wardhan, Siddhartha, Citizens Without a Country: The Democratic Legitimacy Crisis of Non-Resident Birthright Voting in U.S. Federal Elections (2025).",
      },
    ],
    notes: [
      "Selected from the Volume II taxonomy after matching the paper title and author-controlled source.",
      "The public entry summarizes the argument without publishing the source manuscript or a private source path.",
    ],
    limitations: [
      "This is a working paper, not a ruling, statute, election-administration policy, or peer-reviewed finding.",
      "Comparative voting systems differ in history, law, population, and enforcement; no single criterion resolves every legitimacy question.",
      "Usage metrics are descriptive signals, not scholarly quality ratings.",
    ],
  }),
  makeDocument({
    id: "empire-of-distraction",
    volume: "Volume II",
    title:
      "The Empire of Distraction: Foreign Agenda-Setting, Malapportionment, and the Managed Myth of Popular Rule in the United States",
    category: "Institutions, Representation & Foreign Influence",
    description:
      "A Volume II working paper linking foreign-policy agenda shocks to unequal representation, attention allocation, lobbying, and the distance between population-weighted preferences and enacted policy.",
    volumeRelevance:
      "This is a central Volume II case study because it follows power from formal constitutional rules into the practical allocation of attention, hearings, contracts, and influence. It connects sovereignty abroad with representation at home without treating either as a single-cause explanation.",
    publicationDate: "22 January 2026",
    dateLabel: "Posted",
    metricsCheckedAt: "30 August 2026",
    metrics: { downloads: 20, abstractViews: 118, citations: 0 },
    sections: sections(
      "The paper argues that public policy can be pulled away from population-weighted preferences by two linked mechanisms: external conflicts that redirect attention and domestic rules that dilute representation. It proposes a measurement frame covering residents per senator, vote-seat bias, committee and floor time, appropriations, contract geography, lobbying, and donations, then connects those indicators to a reform menu.",
      [
        "Agenda shocks are treated as observable changes in policy attention, not proof that every foreign-policy event is manufactured or coordinated.",
        "The paper places Senate malapportionment, Electoral College amplification, district design, lobbying, and contract distribution in one institutional map.",
        "Its reform proposals—such as independent districting, public-finance tools, lobbying ledgers, and contract dashboards—are testable policy options rather than claims of enacted reform.",
      ],
      "The archived distribution snapshot lists 20 downloads and 118 abstract views in the indexed snapshot checked on 30 August 2026. The paper is a working analysis with no references listed on the public record; its indicators and causal interpretation require independent source review before being treated as established findings.",
      "The Volume II resource map assigns this record to the institutions-and-sovereignty family. The public catalogue keeps that taxonomy visible while separating the paper's argument from a claim that U.S. policy is controlled by one foreign actor or one hidden system.",
    ),
    citations: [
      {
        id: "source-note-5992215",
        label: "Independent Observer",
        citation:
          "Harsh Wardhan, Siddhartha, The Empire of Distraction: Foreign Agenda-Setting, Malapportionment, and the Managed Myth of Popular Rule in the United States (2025).",
      },
    ],
    notes: [
      "Matched to the Volume II resource taxonomy and author-controlled paper source.",
      "The site presents the measurement frame and reform questions, not the private working file.",
    ],
    limitations: [
      "The paper is a working paper and does not establish a complete causal model of agenda-setting or representation.",
      "Foreign influence, lobbying, and policy attention require claim-specific primary records and time-bounded comparisons.",
      "Usage metrics are not peer review, endorsement, or a quality rating.",
    ],
  }),
  makeDocument({
    id: "geography-of-enslaved-wealth",
    volume: "Volume II",
    title: "The Geography of Enslaved Wealth: How Resource-Rich Lands Produce Poor Societies",
    category: "Resource Wealth & Political Economy",
    description:
      "A comparative political-economy working paper asking why resource-rich regions can remain poor when capital, information, trade, and institutional access are tightly controlled.",
    volumeRelevance:
      "The paper extends Volume II's sovereignty inquiry beyond constitutions and elections into the control of capital, logistics, investment, and knowledge. Its significance is the link between resource endowments and the institutions that decide whether those resources become broad capability or concentrated patronage.",
    publicationDate: "17 November 2025",
    dateLabel: "Posted",
    metricsCheckedAt: "30 August 2026",
    metrics: { downloads: 41, abstractViews: 172, citations: 0 },
    sections: sections(
      "This working paper compares resource-rich regions including Siberia, Central Asia, and Saudi Arabia to ask why natural wealth does not automatically produce innovation, social mobility, or high living standards. It argues that political control over capital, foreign investment, trade, and information can turn resources into patronage and dependence rather than diversified development.",
      [
        "The analysis connects resource rents, public employment, foreign investment restrictions, logistics, and governance instead of treating geology as a complete explanation.",
        "Historical comparison and secondary data are used to examine how capital openness and institutional access affect development pathways.",
        "The paper places currency systems and de-dollarization inside a wider account of market access, while leaving those relationships open to further testing.",
      ],
      "The archived distribution snapshot lists 41 downloads and 172 abstract views in the indexed snapshot checked on 30 August 2026. The comparative argument draws on secondary data and historical synthesis; it does not prove that every resource-rich society follows the same path or that one reform would resolve the problem.",
      "Within Volume II, this paper supplies the resource-and-sovereignty case: who controls investment, information, and the terms under which wealth becomes public capability. The catalogue exposes only the public synopsis and archived distribution counts.",
    ),
    citations: [
      {
        id: "source-note-5624610",
        label: "Independent Observer",
        citation:
          "Harsh Wardhan, Siddhartha, The Geography of Enslaved Wealth: How Resource-Rich Lands Produce Poor Societies (2025).",
      },
    ],
    notes: [
      "Matched to a Volume II resource-wealth paper and its archived distribution snapshot.",
      "Historical interpretation and documented economic indicators remain visibly separate on the public reading page.",
    ],
    limitations: [
      "The paper is a comparative working paper, not a universal development law or predictive model.",
      "Country and region comparisons require attention to period, measurement, institutions, and source selection.",
      "Usage metrics are descriptive discovery signals, not scholarly validation.",
    ],
  }),
  makeDocument({
    id: "two-masks-one-face",
    volume: "Volume II",
    title:
      "Two Masks, One Face: State Capitalism and Private Feudalism as Mirrors of the Same System",
    category: "Political Economy & Institutions",
    description:
      "A comparative working paper testing whether state and private forms of concentrated power can reproduce similar hierarchies despite different ideological language and ownership structures.",
    volumeRelevance:
      "This paper makes Volume II's institutional question comparative: how do different political-economic systems distribute authority, protect hierarchy, and define worker independence? Its value is as a provocation to compare mechanisms rather than accept a system's self-description as evidence of its effects.",
    publicationDate: "5 December 2025",
    dateLabel: "Posted",
    metricsCheckedAt: "30 August 2026",
    metrics: { downloads: 30, abstractViews: 186, citations: 0 },
    sections: sections(
      "The paper compares state capitalism and private feudalism as two institutional forms that can concentrate decision-making power while presenting different accounts of freedom, equality, or merit. Through cases involving the Soviet Union, China, North Korea, post-Soviet Russia, and the United States, it asks whether hierarchy, worker dependence, and obedience can persist beneath opposing ideological masks.",
      [
        "The paper distinguishes formal ownership from practical control over work, investment, information, and political decision-making.",
        "Its comparative cases are used to generate an institutional question: when does an ideology's promise diverge from the distribution of power it enables?",
        "The title's claim that systems share one underlying face is the paper's interpretive thesis, not a verified finding that all states or economies are identical.",
      ],
      "The archived distribution snapshot lists 30 downloads and 186 abstract views in the indexed snapshot checked on 30 August 2026. This is a comparative and interpretive working paper; the cases are not interchangeable, and the argument requires period-specific evidence rather than ideological equivalence by assertion.",
      "The Volume II taxonomy places this paper alongside the programme's inquiry into sovereignty, institutions, and political economy. The public page keeps its strongest comparative language labeled as an argument and does not reproduce the source file.",
    ),
    citations: [
      {
        id: "source-note-5683068",
        label: "Independent Observer",
        citation:
          "Harsh Wardhan, Siddhartha, Two Masks, One Face: State Capitalism and Private Feudalism as Mirrors of the Same System (2025).",
      },
    ],
    notes: [
      "Matched to a Volume II political-economy paper and its archived distribution snapshot.",
      "The synopsis preserves the paper's comparative ambition without turning analogy into proof.",
    ],
    limitations: [
      "The paper is an interpretive working paper, not a complete comparative political-economy dataset.",
      "Historical systems differ in law, period, institutions, and social conditions; comparisons must be made mechanism by mechanism.",
      "Usage metrics are not quality ratings or peer-review outcomes.",
    ],
  }),
  makeDocument({
    id: "the-american-empire-was-never-a-democracy",
    volume: "Volume II",
    title: "The American Empire was Never a Democracy",
    category: "Democracy, Empire & Representation",
    description:
      "A political-history working paper examining how constitutional design, representation, money in politics, media concentration, and militarized foreign policy can limit popular sovereignty beneath democratic language.",
    volumeRelevance:
      "This paper gives Volume II a direct institutions-and-legitimacy case: it asks how formal representation can coexist with concentrated influence, and which reforms might make public power more accountable. Its contribution is a connected historical frame, not a claim that one mechanism explains every democratic failure.",
    publicationDate: "20 September 2025",
    dateLabel: "Posted",
    metricsCheckedAt: "31 August 2026",
    metrics: { downloads: 19, abstractViews: 85, citations: 0 },
    sections: sections(
      "This working paper argues that the United States has often operated less as a participatory democracy than as a managed republic in which elite interests exert outsized influence over political, economic, and informational institutions. It traces continuities from constitutional design and slavery through industrial capitalism, mass incarceration, money in politics, militarized foreign policy, and concentrated media ownership, then outlines reforms intended to widen social rights, representation, workplace voice, anti-monopoly enforcement, campaign-finance accountability, and diplomacy.",
      [
        "The paper links formal constitutional arrangements to later institutional practices instead of treating democratic language as proof of equal political power.",
        "Its historical sequence connects the Three-Fifths Compromise, felony disenfranchisement, wealth concentration, CEO-to-worker pay gaps, covert action, and overseas military infrastructure as separate cases in a wider power analysis.",
        "The proposed reforms—universal social rights, voting and representation reform, workplace democracy, anti-monopoly enforcement, campaign-finance reform, and diplomacy-first strategy—are policy options for discussion, not enacted outcomes.",
      ],
      "The archived distribution snapshot listed 19 downloads and 85 abstract views in the indexed snapshot checked on 31 August 2026. The paper is a historical and political-economic working paper; its continuities are interpretive claims that require period-specific evidence, and its reform agenda is not a legislative score or guarantee.",
      "The Volume II map places this paper at the intersection of sovereignty, representation, political economy, and foreign influence. The site publishes the public synopsis and verified paper-discovery link while keeping any matching source material outside the website.",
    ),
    citations: [
      {
        id: "source-note-5437015",
        label: "Independent Observer",
        citation: "Harsh Wardhan, Siddhartha, The American Empire was Never a Democracy (2025).",
      },
    ],
    notes: [
      "Matched to a Volume II democracy-and-empire paper controller and its archived distribution snapshot.",
      "The public entry preserves the paper's institutional thesis without exposing a private source path or presenting the thesis as settled history.",
    ],
    limitations: [
      "The paper is a working argument, not a complete history of U.S. political development or a causal estimate of institutional influence.",
      "Historical comparisons require attention to period, legal change, measurement, and competing explanations.",
      "Usage metrics are descriptive discovery signals, not peer review, endorsement, or a quality rating.",
    ],
  }),
  makeDocument({
    id: "when-the-storm-decides",
    volume: "Volume II",
    title:
      "When the Storm Decides: Crises, Perception, and Electoral Outcomes in the United States",
    category: "Politics & Legitimacy",
    description:
      "A political working paper examining how terrorist attacks, natural disasters, pandemics, revolutions, and financial collapses become competence tests that reshape electoral perception and institutional legitimacy.",
    volumeRelevance:
      "It adds a crisis-and-legitimacy case to Volume II: the paper asks how public judgments of competence are formed when institutions are under stress, and how a crisis narrative can change the perceived authority of an administration. The contribution is a testable frame for connecting event response, federalism, media attention, and electoral outcomes.",
    publicationDate: "27 September 2025",
    dateLabel: "Posted",
    metricsCheckedAt: "31 August 2026",
    metrics: { downloads: 34, abstractViews: 127, citations: 0 },
    sections: sections(
      "This working paper treats crises as inflection points in American politics. It argues that terrorist attacks, hurricanes, pandemics, revolutions, and financial collapses interrupt normal campaign calculations and force voters to judge leaders through perceived competence under stress. The paper uses episodes including the Iranian Hostage Crisis, 9/11, Hurricane Katrina, the 2008 financial crash, the COVID-19 pandemic, and later disaster politics to develop the claim that crisis effects are recurring tests of legitimacy rather than isolated flukes.",
      [
        "The paper shifts the unit of analysis from ideology alone to the relationship among disruption, executive response, public perception, and retrospective voting.",
        "Federalism, natural-disaster response, public health, financial management, and media narrative are treated as institutional conditions that can alter the meaning of a crisis.",
        "Its central claim—that crises can decide electoral trajectories—is a research argument open to comparative testing, not a universal rule that predicts every election.",
      ],
      "The archived distribution snapshot listed 34 downloads and 127 abstract views in the indexed snapshot checked on 31 August 2026. This is a short working paper using historical examples; the examples do not by themselves establish a causal estimate, and the paper should be read alongside event-level data and competing explanations.",
      "The Volume II connection is the practical legitimacy question: when authority is tested in public, which institutions can respond, document the response, and preserve trust? The website presents a bounded public summary and archived distribution snapshot, not private working notes or an assertion of electoral certainty.",
    ),
    citations: [
      {
        id: "source-note-5530960",
        label: "Independent Observer",
        citation:
          "Harsh Wardhan, Siddhartha, When the Storm Decides: Crises, Perception, and Electoral Outcomes in the United States (2025).",
      },
    ],
    notes: [
      "Matched to a Volume II crisis-and-electoral-legitimacy paper controller and its archived distribution snapshot.",
      "The page describes the paper's mechanism as a hypothesis to examine and does not turn historical examples into a deterministic forecast.",
    ],
    limitations: [
      "The paper is a working paper and does not provide a complete dataset for every crisis or election.",
      "Perception is shaped by timing, institutions, media, partisanship, economic conditions, and the quality of the response record.",
      "Usage metrics are descriptive signals, not peer review or evidence that the causal interpretation is settled.",
    ],
  }),
  makeDocument({
    id: "managed-interdependence",
    volume: "Volume II",
    title:
      "Managed Interdependence: Industrial Policy and Governance Sequencing in Post-Autocratic Russia",
    category: "Geopolitics & Sovereignty",
    description:
      "A geopolitical working paper modelling a twenty-year path for post-authoritarian reconstruction through administrative transparency, industrial diversification, civic reintegration, and carefully sequenced governance reform.",
    volumeRelevance:
      "This paper extends Volume II's sovereignty inquiry into industrial policy and post-autocratic reconstruction. It asks how a state can rebuild administrative capacity, diversify its economy, and reintegrate citizens without treating sovereignty as isolation or political liberalization as a substitute for functioning institutions.",
    publicationDate: "3 December 2025",
    dateLabel: "Posted",
    metricsCheckedAt: "31 August 2026",
    metrics: { downloads: 40, abstractViews: 173, citations: 0 },
    sections: sections(
      "This working paper models a twenty-year roadmap for Russia's post-authoritarian reconstruction through administrative, industrial, and civic reform. Drawing on historical transitions and comparative data from international institutions, it identifies three linked vectors: rule-of-law consolidation and bureaucratic transparency; diversification from raw-material dependence toward higher-value manufacturing and renewable energy; and civic reintegration through decentralized equity ownership. It places the proposed transformation within Eurasian balance, BRICS realignment, and G7 sanctions, and argues that sustainable sovereignty comes from informational openness and managed interdependence rather than isolation.",
      [
        "The paper treats reconstruction as a sequencing problem: administrative normalization, industrial diversification, and civic reintegration have to support one another over time.",
        "It connects industrial policy to sovereignty by asking whether raw-material dependence, sanctions, energy systems, and ownership structures expand or narrow practical state capacity.",
        "The twenty-year roadmap is a policy model and scenario frame, not an enacted programme or a prediction that a single sequence will fit every post-autocratic transition.",
      ],
      "The archived distribution snapshot listed 40 downloads and 173 abstract views in the indexed snapshot checked on 31 August 2026. The roadmap is a working model based on comparative synthesis; sanctions, industrial capacity, civic ownership, and political sequencing are context-dependent and require ongoing evidence review.",
      "Within Volume II, this record links sovereignty to the institutions that make production, information, ownership, and civic participation durable. The public page uses a synopsis and verified paper-discovery link only; the source manuscript remains outside the website.",
    ),
    citations: [
      {
        id: "source-note-5671691",
        label: "Independent Observer",
        citation:
          "Harsh Wardhan, Siddhartha, Managed Interdependence: Industrial Policy and Governance Sequencing in Post-Autocratic Russia (2025).",
      },
    ],
    notes: [
      "Matched to a Volume II geopolitics-and-industrial-policy paper controller and its archived distribution snapshot.",
      "The summary keeps the roadmap's policy ambition visible while labeling it as a model open to revision.",
    ],
    limitations: [
      "The paper is a scenario and policy model, not an official reconstruction plan or a forecast with guaranteed outcomes.",
      "Comparisons across post-authoritarian states require attention to political history, sanctions, energy systems, and administrative capacity.",
      "Usage metrics are descriptive discovery signals, not peer review or a measure of policy validity.",
    ],
  }),
  makeDocument({
    id: "from-vietnam-to-terry-ohio",
    volume: "Volume III",
    title: "From Vietnam to Terry v. Ohio: Investing in Human Failure vs. Human Potential",
    category: "Welfare, Social Control & Human Capital",
    description:
      "A Volume III working paper examining how veterans' reintegration, discretionary policing, welfare administration, and mass incarceration can redirect public investment toward punishment or human restoration.",
    volumeRelevance:
      "This paper gives Managed Decline a historical human-capital case: it asks how institutions respond when unmet needs are recorded as enforcement problems rather than as capacity problems. It connects welfare, policing, employment, public visibility, and the cost of social failure to the volume's question of who carries the burden of change.",
    publicationDate: "31 October 2025",
    dateLabel: "Posted",
    metricsCheckedAt: "31 August 2026",
    metrics: { downloads: 13, abstractViews: 56, citations: 0 },
    sections: sections(
      "This paper examines how the United States has repeatedly monetized failure, from the neglect of Vietnam veterans to the expansion of mass incarceration after Terry v. Ohio in 1968. It argues that justice systems and welfare bureaucracies can generate institutional returns through punishment, auditing, and exclusion, while comparative examples from Finland and Canada suggest ways investment might be redirected toward human restoration. The proposed framework treats human productivity as a stock-backed asset and asks whether veterans, disabled people, and structurally displaced workers can be supported as beneficiaries rather than treated as burdens.",
      [
        "The paper links reintegration, policing, welfare, and labor-market participation as connected institutional choices rather than separate policy silos.",
        "It contrasts punishment and exclusion with restoration-focused investment, using reduced homelessness, lower incarceration costs, and higher productivity as proposed outcomes to measure.",
        "Its human-capital framework is a policy proposal open to fiscal, legal, and empirical testing; it is not proof that every welfare or justice institution acts from the same motive.",
      ],
      "The archived distribution snapshot listed 13 downloads and 56 abstract views in the indexed snapshot checked on 31 August 2026. This is a short working paper and its proposed returns are not an independent fiscal score, clinical finding, or enacted policy. Historical and comparative claims require primary-source review and attention to institutional differences.",
      "The record is now a public Volume III reading entry, while the matching source material remains outside the website. It belongs alongside the volume's work on taxation, welfare, health systems, licensing, and public visibility because it asks how administrative choices distribute the cost of unmet human potential.",
    ),
    citations: [
      {
        id: "source-note-5563298",
        label: "Independent Observer",
        citation:
          "Harsh Wardhan, Siddhartha, From Vietnam to Terry v. Ohio: Investing in Human Failure vs. Human Potential (2025).",
      },
    ],
    notes: [
      "Matched to a Volume III welfare-and-human-capital source record and its archived distribution snapshot.",
      "The public synopsis identifies the proposal and its boundaries without reproducing the source manuscript or private notes.",
    ],
    limitations: [
      "The paper is a policy proposal, not an independent estimate of the fiscal returns of welfare or justice reform.",
      "Vietnam, Terry v. Ohio, Finland, and Canada represent different histories and institutions; the comparison requires mechanism-level analysis.",
      "Usage metrics are descriptive signals, not peer review, endorsement, or evidence of policy effectiveness.",
    ],
  }),
  makeDocument({
    id: "children-left-behind-after-a-war",
    volume: "Volume III",
    title:
      'Children Left Behind After a War: Why Vietnam Produced a Visible "War-Child" Generation—and Iraq Did Not',
    category: "Conflict, Demography & Social Visibility",
    description:
      "A comparative demographic working paper examining how war, stigma, law, migration, social contact, and changing communication technologies shape whether war-born children become visible public categories.",
    volumeRelevance:
      "This paper belongs in Volume III because it studies how institutions make social harm visible, countable, and eligible for support. It connects conflict to migration, stigma, family formation, administrative recognition, and the unequal distribution of public attention.",
    publicationDate: "22 January 2026",
    dateLabel: "Posted",
    metricsCheckedAt: "30 August 2026",
    metrics: { downloads: 14, abstractViews: 113, citations: 0 },
    sections: sections(
      "This working paper compares the public and institutional visibility of children born to foreign soldiers and local women during the Vietnam and Iraq wars. It asks how social contact, stigma, migration pathways, legal recognition, occupation structure, and persistent internet connectivity affect whether a war-born cohort becomes countable, publicly legible, and connected to policy.",
      [
        "The paper treats visibility as an institutional outcome: categories become socially consequential when families can be documented, recognized, counted, and connected to a policy pathway.",
        "It connects demographic evidence to social stigma, migration, law, and the changing conditions of wartime intimacy.",
        "Its comparison asks what a difference in public record can reveal about social structure without assuming that absence of documentation means absence of people or harm.",
      ],
      "The archived distribution snapshot lists 14 downloads and 113 abstract views in the indexed snapshot checked on 30 August 2026. The comparison is a working hypothesis, not proof that Iraq produced no comparable cases; undercounting, stigma, displacement, and uneven records may all affect visibility.",
      "This is a Volume III bridge between social citizenship and public visibility. It shows how a population can remain outside policy attention when institutions do not recognize or count its experience, while keeping the underlying working paper private beyond the public record.",
    ),
    citations: [
      {
        id: "source-note-5994534",
        label: "Independent Observer",
        citation:
          'Harsh Wardhan, Siddhartha, Children Left Behind After a War: Why Vietnam Produced a Visible "War-Child" Generation—and Iraq Did Not (2025).',
      },
    ],
    notes: [
      "Matched to a Volume III source file and the archived distribution snapshot.",
      "The public summary foregrounds visibility and uncertainty rather than treating a documentary gap as proof of nonexistence.",
    ],
    limitations: [
      "The paper is a comparative working paper and does not provide a complete population count for either conflict.",
      "Records of war-born children are shaped by stigma, migration, legal status, family privacy, and state capacity.",
      "Usage metrics are descriptive signals, not scholarly quality ratings.",
    ],
  }),
  makeDocument({
    id: "lottery-of-luck",
    volume: "Volume IV",
    title:
      "The Lottery of Luck: Why Education Remains the Only Scalable Path to Middle-Class Stability in the AI Economy",
    category: "Education, AI & Human Capability",
    description:
      "A Volume IV working paper examining education as economic infrastructure and asking how AI amplifies existing human capital, income concentration, and unequal routes to stable middle-class life.",
    volumeRelevance:
      "The paper gives Volume IV a human-capability test: when automation changes the value of skills, which institutions help people build durable capacity rather than depend on rare outlier success? It links education, re-skilling, AI literacy, and economic stability to the volume's wider question of who can govern technological change.",
    publicationDate: "1 December 2025",
    dateLabel: "Posted",
    metricsCheckedAt: "30 August 2026",
    metrics: { downloads: 40, abstractViews: 202, citations: 0 },
    sections: sections(
      "This working paper argues that education remains a scalable route to middle-class stability as AI changes the labor market. It contrasts broad human-capital pathways with highly concentrated platform success, and proposes foundational skills, AI and data literacy, and lifelong re-skilling as forms of economic infrastructure.",
      [
        "The paper distinguishes repeatable education and capability pathways from exceptional creator or platform outcomes that are difficult for most people to reproduce.",
        "AI is framed as an amplifier of existing human capability rather than a substitute for the institutions that build judgment, competence, and opportunity.",
        "Its policy proposals connect schooling, adult learning, employment, and tax design to the question of whether technological change expands practical agency.",
      ],
      "The archived distribution snapshot lists 40 downloads and 202 abstract views in the indexed snapshot checked on 30 August 2026. The title's claim that education is the only scalable path is the paper's thesis, not an established universal law; education quality, labor markets, disability, geography, family resources, and other pathways also require analysis.",
      "This Volume IV entry connects AI to the social infrastructure needed to use it. The site publishes the public synopsis and verified paper-discovery link, not the matching source PDF or manuscript text.",
    ),
    citations: [
      {
        id: "source-note-5663111",
        label: "Independent Observer",
        citation:
          "Harsh Wardhan, Siddhartha, The Lottery of Luck: Why Education Remains the Only Scalable Path to Middle-Class Stability in the AI Economy (2025).",
      },
    ],
    notes: [
      "Matched to a Volume IV working paper and its archived distribution snapshot.",
      "The catalogue keeps the paper's strong thesis visible while labeling it as an argument open to testing.",
    ],
    limitations: [
      "The paper is a working paper, not a forecast of every worker's outcome in an AI economy.",
      "Education effects vary with field, quality, cost, labor demand, geography, and access to complementary support.",
      "Usage metrics are not peer review or a measure of social impact.",
    ],
  }),
  makeDocument({
    id: "entanglement-primer",
    volume: "Volume IV",
    title:
      "Entanglement, No-Signalling, and the Real Path to Quantum Advantage: A Systems-Level Primer for Practitioners and Policymakers",
    category: "Quantum Computing & Scientific Capacity",
    description:
      "A concise Volume IV primer translating quantum-information concepts, engineering constraints, and policy implications into a practical map of what quantum systems can and cannot do.",
    volumeRelevance:
      "This is a capability paper for Volume IV: it connects scientific principles to hardware limits, error correction, cryptography, networking, and the institutional choices needed to turn technical possibility into public capacity.",
    publicationDate: "19 September 2025",
    dateLabel: "Posted",
    metricsCheckedAt: "30 August 2026",
    metrics: { downloads: 69, abstractViews: 549, citations: 0 },
    sections: sections(
      "This primer explains the physical ideas behind quantum information—superposition, measurement, interference, and entanglement—while correcting the misconception that entanglement enables faster-than-light communication. It maps the path from noisy devices to error-corrected systems and connects algorithms, quantum simulation, post-quantum cryptography, and networking to practical engineering and policy questions.",
      [
        "It separates quantum advantage in specific problem classes from the broader and unsupported idea that quantum computers make every computation faster.",
        "No-signalling, error correction, surface codes, teleportation, superdense coding, Shor's algorithm, and Grover's algorithm are placed inside one systems-level explanation.",
        "The policy layer asks how technical timelines, cryptography transitions, scientific infrastructure, and public investment should be discussed without hype.",
      ],
      "The archived distribution snapshot lists 69 downloads and 549 abstract views in the indexed snapshot checked on 30 August 2026. The primer is an educational working paper; technical claims and projected timelines should be checked against current primary research and standards before informing procurement or policy.",
      "This Volume IV record is the accessible on-ramp to the quantum line of inquiry. It publishes a public-safe explanation and preserves its archived distribution counts while keeping any local source files outside the website.",
    ),
    citations: [
      {
        id: "source-note-5434314",
        label: "Independent Observer",
        citation:
          "Harsh Wardhan, Siddhartha, Entanglement, No-Signalling, and the Real Path to Quantum Advantage: A Systems-Level Primer for Practitioners and Policymakers (2025).",
      },
    ],
    notes: [
      "Matched to a Volume IV PDF and the archived distribution snapshot.",
      "The synopsis is designed for public discovery and does not reproduce the local source document.",
    ],
    limitations: [
      "Quantum advantage is problem-specific and depends on hardware, algorithms, error rates, and available data.",
      "Projected dates and application claims can change as research and engineering progress.",
      "Usage metrics are descriptive discovery signals, not technical validation.",
    ],
  }),
  makeDocument({
    id: "entanglement-foundations",
    volume: "Volume IV",
    title:
      "Entanglement, No-Signalling, and the Real Path to Quantum Advantage: Foundations, Architectures, and Societal Implications",
    category: "Quantum Computing & Scientific Capacity",
    description:
      "A foundational Volume IV paper connecting quantum mechanics, fault-tolerant architectures, quantum networks, cryptography transition, and the social consequences of scientific infrastructure.",
    volumeRelevance:
      "Read alongside the primer, this paper moves from explanation to architecture and societal consequence. It asks what scientific capacity means when the decisive constraints are not only equations but error correction, networks, standards, security, and institutional readiness.",
    publicationDate: "19 September 2025",
    dateLabel: "Posted",
    metricsCheckedAt: "30 August 2026",
    metrics: { downloads: 32, abstractViews: 887, citations: 0 },
    sections: sections(
      "This paper introduces the foundations of quantum computing, explains why entanglement cannot transmit information on its own, and follows the engineering path toward fault-tolerant systems. It then connects quantum networks, post-quantum cryptography, simulation, optimization, and machine learning to the institutions and standards that determine whether scientific capability becomes socially useful.",
      [
        "The paper moves from first principles to architectures, making the distinction between a physical resource, an algorithmic speedup, and a deployable system explicit.",
        "Fault tolerance and surface-code error correction are treated as central engineering constraints rather than footnotes to a promise of quantum advantage.",
        "The societal section connects cryptography migration, scientific infrastructure, and public capability to the technical limits described earlier.",
      ],
      "The archived distribution snapshot lists 32 downloads and 887 abstract views in the indexed snapshot checked on 30 August 2026. This is a foundational working paper, not a current technology forecast or deployment recommendation; technical milestones and standards require up-to-date primary-source review.",
      "This record complements the shorter Volume IV primer: the primer is the public on-ramp, while this paper expands the architecture and societal implications. Neither public entry exposes the matching source file.",
    ),
    citations: [
      {
        id: "source-note-5432061",
        label: "Independent Observer",
        citation:
          "Harsh Wardhan, Siddhartha, Entanglement, No-Signalling, and the Real Path to Quantum Advantage: Foundations, Architectures, and Societal Implications (2025).",
      },
    ],
    notes: [
      "Matched to a Volume IV PDF and an archived distribution snapshot.",
      "The catalogue uses a concise public synopsis and preserves the distinction between research direction and deployment claim.",
    ],
    limitations: [
      "The paper is a conceptual and technical overview, not a complete survey of current quantum research.",
      "Hardware, error-correction, cryptography, and application timelines are fast-moving and require current verification.",
      "Usage metrics are not peer review, endorsement, or a measure of technical readiness.",
    ],
  }),
];
