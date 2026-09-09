import type { PublicDocument } from "./documents";

export const scholarlyClarity: Record<string, Partial<PublicDocument>> = {
  "who-deported-more": {
    genre: "Public explanation accompanying an author working paper",
    description:
      "A public explanation of why removals, returns and expulsions cannot be compared without checking definitions, reporting periods and agency coverage.",
    limitations: [
      "This remains an author working-paper record; the web explanation does not change its publication or review status.",
      "The complete manuscript and a validated comparison dataset are not supplied here. Assess the cited official sources directly.",
    ],
    updatedDate: "9 September 2026",
    availability: {
      webPage:
        "Read the definitions, example and source links here without an account. This is a public explanation, not the manuscript or a ranked comparison.",
      original:
        "The manuscript is not hosted here. The external ResearchGate record is a separate research object with its own access conditions; this update does not change its release status.",
      data: "No CSV or codebook is published or downloadable through this website. Their mention in the source manuscript is not proof of a publicly available, validated dataset.",
      code: "No analysis code is supplied with this web explanation. The worked example uses invented numbers only; it does not analyze an actual dataset.",
    },
    reviewScope: {
      sourceChecking:
        "Definitions and reporting conventions in this explanation were checked against the official DHS/OHSS FY2022 enforcement report and ICE FY2024 annual report on 6 September 2026. The manuscript’s comparison table and appended earlier draft were excluded.",
      editorialReview:
        "This update clarifies the public explanation and its limits. It does not validate the manuscript’s complete dataset or argument.",
      independentReview:
        "No independent scholarly review is documented for this explanation. Source checking and editorial revision are not peer review.",
    },
    sections: [
      {
        id: "abstract",
        heading: "The short answer",
        paragraphs: [
          "A headline deportation count does not answer the question until you know what it counts. Removals, returns and Title 42 expulsions describe different actions. Even the label “removals” needs a source-specific check: ICE’s FY2024 report includes returns in its removal figures. Comparing that total with a removals-only series would compare different measures.",
          "This explanation shows how to read a comparison. It does not identify which president deported more people or establish that a policy caused a change.",
        ],
        evidenceIds: ["ohss-definitions", "ice-reporting"],
      },
      {
        id: "definitions",
        heading: "Three terms that need separate columns",
        table: {
          caption: "Definitions for reading enforcement reports, not a numerical comparison",
          headers: ["Term", "What it describes", "What to check"],
          rows: [
            [
              "Removal",
              "Departure carried out under a removal order.",
              "Whether the source uses this narrower meaning or combines removals with returns.",
            ],
            [
              "Return",
              "Departure without a removal order; the FY2022 report discusses voluntary return, voluntary departure and withdrawal of an application for admission.",
              "Do not read “voluntary” as meaning all such departures are free of enforcement pressure.",
            ],
            [
              "Title 42 expulsion",
              "An expulsion under public-health authority, discussed separately from Title 8 immigration processes in the FY2022 report.",
              "Whether the total includes these events, and which reporting period it covers.",
            ],
          ],
        },
        paragraphs: [
          "The FY2022 report explains that the forms of return it describes still involve mandatory repatriation despite the voluntary label. These definitions describe that report’s categories; they are not advice about an individual immigration case.",
        ],
        evidenceIds: ["ohss-yearbook", "ohss-definitions", "ohss-title42"],
      },
      {
        id: "reading-points",
        heading: "Interior and border are a different question",
        paragraphs: [
          "The action taken and the enforcement context are separate classifications. “Removal or return?” asks about the action; “interior or border?” asks about its context. Do not use the second pair as substitutes for the first.",
          "ICE’s FY2024 report presents overall removals, interior removals and removals by arresting agency as distinct breakdowns. An ICE-carried-out departure need not mean ICE made the initial arrest: the report includes people transferred from CBP. Read each breakdown’s definition rather than equating the agency carrying out departure with an interior case.",
        ],
        evidenceIds: ["ice-reporting"],
      },
      {
        id: "example",
        heading: "Worked example — invented numbers",
        paragraphs: [
          "Imagine two fictional reports covering the same period and agencies. Report A lists 100 removals. Report B lists 150 departures: 80 removals plus 70 returns. Comparing 150 with 100 makes B look larger. Comparing removals alone gives 80 versus 100: B has 20 fewer removals. The headline reverses because the categories differ.",
          "This is a hypothetical teaching example. Every number is invented; none describes an administration or reproduces the manuscript’s table. For real reports, first align definitions, periods and agency coverage, then compare like with like.",
        ],
      },
      {
        id: "comparison-limits",
        heading: "What this comparison cannot establish",
        items: [
          "This page supplies no harmonized time series and no presidential ranking. The title’s 2000–2025 span describes the original paper, not a dataset reproduced here.",
          "The OHSS report covers fiscal year 2022; ICE’s selected figures cover fiscal years 2019–2024. The FY2024 removal data are current through September 30, 2024; ICE describes FY2019–2023 data as locked. Those boundaries must travel with any reuse.",
          "A count alone cannot establish policy effectiveness, fairness, individual circumstances or a causal effect of presidential decisions. Those questions require additional evidence and an explicit research design.",
        ],
        evidenceIds: ["ohss-definitions", "ice-reporting"],
      },
      {
        id: "publication-boundary",
        heading: "Publication boundary",
        paragraphs: [
          "This release adds a bounded public explanation to the existing author-paper record. The manuscript, appended draft and unverified comparison table remain outside the website build.",
        ],
      },
    ],
    summaryEvidence: [
      {
        id: "ohss-yearbook",
        label: "DHS / OHSS Yearbook",
        citation:
          "2022 Yearbook of Immigration Statistics, Table 39 (continued), printed p. 104 (PDF p. 112), footnotes 1–3. Series covers FY1892–FY2022. Defines removals, returns and public-health expulsions; distinguishes administrative and enforcement returns.",
        url: "https://ohss.dhs.gov/sites/default/files/2024-03/2023_0818_plcy_yearbook_immigration_statistics_fy2022.pdf#page=112",
      },
      {
        id: "ohss-definitions",
        label: "DHS / Office of Homeland Security Statistics",
        citation:
          "Immigration Enforcement Actions: 2022, printed pp. 5–6, ‘Repatriation Process’ and ‘Returns.’ Reporting period: FY2022. Supports the action categories and the qualification on voluntary returns.",
        url: "https://ohss.dhs.gov/sites/default/files/2024-03/2023_0818_plcy_enforcement_actions_fy2022.pdf#page=5",
      },
      {
        id: "ohss-title42",
        label: "DHS / Office of Homeland Security Statistics",
        citation:
          "Immigration Enforcement Actions: 2022, printed pp. 2–3, discussion of Title 42 and ‘COVID-19 Pandemic and Title 42 Expulsions.’ Reporting period: FY2022. Supports the distinction between public-health expulsions and Title 8 processing.",
        url: "https://ohss.dhs.gov/sites/default/files/2024-03/2023_0818_plcy_enforcement_actions_fy2022.pdf#page=3",
      },
      {
        id: "ice-reporting",
        label: "U.S. Immigration and Customs Enforcement",
        citation:
          "FY2024 Annual Report, printed p. 31, Figure 23 and footnote 29; p. 32, Figure 25; p. 33, Figure 26. Figures cover FY2019–FY2024. Footnote 29 explains inclusion of returns, transfers to ERO and the data cutoff.",
        url: "https://www.ice.gov/doclib/eoy/iceAnnualReportFY2024.pdf#page=31",
      },
    ],
    notes: [
      "The existing Volume II controller was reused. No manuscript, appended prior draft, numerical comparison table, CSV or codebook was added to the public build.",
    ],
    relatedReadingReasons: {
      "latino-irony":
        "For a separate political question: how immigration-policy experiences enter a discussion of heterogeneous Latino voting. It does not supply enforcement counts.",
    },
  },
  "entanglement-primer": {
    genre: "Synopsis of a systems-level primer",
    relatedReadingReasons: {
      "entanglement-foundations":
        "Continue from the primer to the companion synopsis on architectures and societal implications. Neither page supplies a current technical literature review.",
    },
  },
  "disconnected-hearts": {
    genre: "Synopsis of a conceptual argument",
    sections: [
      {
        id: "abstract",
        heading: "The argument in brief",
        paragraphs: [
          "The paper asks how the conditions of work and the ways people connect through technology interact. Its argument brings economic precarity, digital mediation, intimacy and demographic questions into the same frame, rather than treating technology as a complete explanation for social change.",
          "This is a conceptual argument. The public synopsis does not establish that digital technology causes social isolation or declining birth rates.",
        ],
      },
      {
        id: "reading-points",
        heading: "Three connected questions",
        items: [
          "Work: how might automation and economic insecurity affect the conditions in which people form relationships?",
          "Connection: what changes when intimacy and identity are increasingly mediated through digital interaction?",
          "Institutions: what would help people sustain human connection as those conditions change?",
        ],
      },
      {
        id: "reading-limits",
        heading: "How to assess the argument",
        paragraphs: [
          "Treat these as questions to investigate, not demonstrated causal links. A useful next step is to ask which observations would distinguish economic pressures from changes in communication, and whether different groups or settings would support different explanations.",
          "The original working-paper record is linked below. No dataset or independent scholarly review is supplied with this synopsis, so it cannot tell you the size or direction of a technology effect on demographic outcomes.",
        ],
      },
      {
        id: "publication-boundary",
        heading: "Publication boundary",
        paragraphs: [
          "This remains a synopsis of an author working paper, not a released publication. The complete manuscript is not hosted here; the original paper record and limitations are available below.",
        ],
      },
    ],
    relatedReadingReasons: {
      "double-tax-on-time":
        "Compare a separate argument about the time costs of work with this account of intimacy. The connection is time and social life, not evidence of a causal technology effect.",
    },
  },
  "wardhan-tax-doctrine": {
    genre: "Synopsis of a policy proposal",
    relatedReadingReasons: {
      "double-tax-on-time":
        "Read the companion question of who bears work and time costs alongside the tax proposal; this does not constitute a fiscal score.",
    },
  },
};

export const startingQuestions: Record<string, string> = {
  "who-deported-more": "What does a deportation count actually count?",
  "entanglement-primer": "What can quantum entanglement do?",
  "wardhan-tax-doctrine": "How might tax design change economic incentives?",
  "disconnected-hearts": "How might technology reshape intimacy?",
  "double-tax-on-time": "Who bears the time costs of work?",
};
export function byReadingUsefulness(a: PublicDocument, b: PublicDocument): number {
  const ids = Object.keys(startingQuestions);
  const rank = (id: string) => (ids.includes(id) ? ids.indexOf(id) : ids.length);
  return rank(a.id) - rank(b.id) || a.title.localeCompare(b.title, "en");
}
