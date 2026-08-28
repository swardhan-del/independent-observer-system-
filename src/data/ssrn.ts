import type { PublicDocument, PublicDocumentSection } from "./documents";

const author = "Siddhartha Harsh Wardhan";
const metricsDate = "25 August 2026";

type SsrnInput = Omit<PublicDocument, "sourceLabel" | "status" | "author" | "metrics"> & {
  metrics: Omit<NonNullable<PublicDocument["metrics"]>, "checkedAt">;
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
      heading: "What the paper contributes",
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
  return {
    ...input,
    sourceLabel: "Dropbox preprint controller · SSRN public record",
    status: "SSRN preprint",
    author,
    externalVerification: "needs_review",
    metrics: {
      ...input.metrics,
      checkedAt: metricsDate,
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
    sourceModified: "Dropbox preprint matched to SSRN abstract 5495878",
    publicationDate: "13 October 2025",
    dateLabel: "Posted",
    sourceUrl: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5495878",
    researchGateUrl:
      "https://www.researchgate.net/publication/396491871_Who_Deported_More_Measuring_Removals_Returns_and_Enforcement_Priorities_Across_Presidential_Administrations_2000-2025",
    metrics: { downloads: 126, abstractViews: 6397, citations: 0, rank: 592433 },
    sections: sections(
      "The paper argues that public debate often collapses distinct immigration pathways into one deportation score. It separates removals, returns, and Title 42 expulsions, distinguishes interior from border enforcement, and uses official immigration-statistics series to make comparisons more consistent.",
      [
        "Definitions are treated as part of the evidence rather than as background terminology.",
        "Administrative choices and enforcement venues can change headline totals without representing the same underlying event.",
        "The proposed reporting template favors comparable year-by-year series over partisan scorekeeping.",
      ],
      "The last directly verified public SSRN result (25 August 2026) reported 126 downloads and 6,397 abstract views. A 28 August 2026 recheck was access-blocked, so current availability is not confirmed. Metrics change over time; SSRN does not provide a star-rating field for this paper. The matching Dropbox version requires removal of an older appendix before any longer-form release.",
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
    sourceModified: "Dropbox preprint matched to SSRN abstract 5447654",
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
    sourceModified: "Dropbox submission package matched to SSRN abstract 5578130",
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
    sourceModified: "Dropbox submission package matched to SSRN abstract 5477606",
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
    sourceModified: "Dropbox content-confirmed preprint matched to SSRN abstract 5584710",
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
      "Selected from a content-confirmed Dropbox preprint with a matching SSRN record.",
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
    sourceModified: "Dropbox submission package matched to SSRN abstract 5540740",
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
    sourceModified: "Dropbox Volume I SSRN-ready controller matched to SSRN abstract 5431958",
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
      "This page is the public entry point for Volume I’s Foundational Manifesto, the one Volume I paper currently represented by a matched public SSRN record. It explains the method of observation, documentation, information asymmetry, institutional design, and public reasoning; other Volume I papers remain outside this reading copy until their public records and release status are separately verified.",
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
];
