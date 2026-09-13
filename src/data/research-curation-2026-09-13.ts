import type { PublicDocument } from "./documents";
import { familyIdForKey } from "./family-registry";
import { placementDecisionFor } from "./placement-decisions";

const author = "Siddhartha Harsh Wardhan";
const reviewedAt = "13 September 2026";

function curated(
  input: Omit<
    PublicDocument,
    "familyId" | "sourceLabel" | "status" | "author" | "placementDecision"
  >,
): PublicDocument {
  const familyId = familyIdForKey(input.id);
  return {
    ...input,
    familyId,
    sourceLabel: "Author-controlled research copy · curated public synopsis",
    sourceReviewedAt: reviewedAt,
    sourceModified: "Research package reviewed 13 September 2026",
    rightsNotice:
      "Copyright and paper-specific rights remain with the author. This page is a bounded synopsis; the complete research package is not hosted here.",
    status: "Author working paper",
    author,
    placementDecision: placementDecisionFor(familyId, input.volume, input.category),
  };
}

export const curatedResearchDocuments: PublicDocument[] = [
  curated({
    id: "history-is-not-a-moral-certificate",
    volume: "Volume II",
    title: "History Is Not a Moral Certificate",
    category: "Empire, Geopolitics & National Memory",
    description:
      "A comparative working-paper synopsis separating the moral assessment of a war from broader claims about national character.",
    homepageDescription:
      "A structured comparison that keeps cause, conduct, outcome, and collective memory analytically separate when evaluating wars associated with emancipation or liberation.",
    volumeRelevance:
      "This Volume II paper examines how historical achievements become sources of institutional legitimacy and national memory, while preserving case-specific differences.",
    updatedDate: reviewedAt,
    keywords: ["national memory", "Civil War", "emancipation", "liberation", "comparative history"],
    availability: {
      webPage: "This page is a selected synopsis of the reviewed research package.",
      original:
        "The complete author manuscript and companion research files remain in the private research archive.",
      data: "No public numerical dataset accompanies this qualitative comparative-history synopsis.",
      code: "No analysis code is associated with this synopsis.",
    },
    reviewScope: {
      sourceChecking:
        "The research package was reviewed with its claim-verification ledger, comparative conflict matrix, evidence notes, bibliography, overlap memo, and abstract/keywords file.",
      editorialReview:
        "The public adaptation presents the paper's method, boundaries, and selected primary-source anchors without publishing private working files.",
      independentReview:
        "No independent scholarly peer review is documented for this working paper.",
    },
    sections: [
      {
        id: "abstract",
        heading: "The argument in brief",
        paragraphs: [
          "The paper asks what participation in a morally consequential war can establish about a society. It treats recognition of a particular cause, actor, law, or outcome as a different claim from assigning an enduring moral character to an entire population across generations.",
          "The comparison is designed to apply common questions while preserving differences in law, coercion, scale, institutions, and outcomes.",
        ],
        evidenceIds: ["history-emancipation", "history-thirteenth"],
      },
      {
        id: "four-part-test",
        heading: "Four questions the paper keeps separate",
        items: [
          "Cause: what objective was being pursued, and under what stated or documented rationale?",
          "Conduct: how were civilians, prisoners, and other protected persons treated?",
          "Outcome: what institutional or political result followed, and how durable was it?",
          "Collective memory: how are specific achievements later generalized into national narratives?",
        ],
      },
      {
        id: "evidence-method",
        heading: "Evidence method",
        paragraphs: [
          "The source package labels major statements as verified fact, scholarly interpretation, author analysis, contested interpretation, or conditional inference. The companion ledger maps major propositions to source IDs and records limitations.",
          "This web page preserves that distinction but does not reproduce the full internal ledger or claim that every case has been independently re-verified for publication here.",
        ],
      },
      {
        id: "limits",
        heading: "What the comparison does not do",
        items: [
          "It does not assign a numerical moral score to countries or civilizations.",
          "It does not treat historically different wars or belligerents as equivalent.",
          "It does not convert an author working paper into peer-reviewed historical consensus.",
        ],
      },
      {
        id: "publication-boundary",
        heading: "Publication boundary",
        paragraphs: [
          "The underlying Volume II source identifies itself as an author working paper and states that it is not peer reviewed.",
          "The complete manuscript, verification ledger, conflict matrix, and private editorial files remain outside the public build.",
        ],
      },
    ],
    summaryEvidence: [
      {
        id: "history-emancipation",
        label: "U.S. National Archives",
        citation:
          "Emancipation Proclamation, 1 January 1863. Primary-document anchor used by the research package.",
        url: "https://www.archives.gov/exhibits/featured-documents/emancipation-proclamation",
      },
      {
        id: "history-thirteenth",
        label: "U.S. National Archives",
        citation:
          "U.S. Constitution, Thirteenth Amendment (1865). Primary legal anchor for constitutional abolition.",
        url: "https://www.archives.gov/milestone-documents/13th-amendment",
      },
    ],
    limitations: [
      "This is a comparative synthesis, not a quantitative ranking or causal model.",
      "The underlying package spans multiple historical literatures; this synopsis exposes only selected source anchors.",
    ],
  }),
  curated({
    id: "richer-republic-weaker-hegemon",
    volume: "Volume III",
    title: "The Richer Republic, the Weaker Hegemon",
    category: "Macroeconomy, Industrial Power & Geopolitical Infrastructure",
    description:
      "A working-paper synopsis testing how absolute U.S. economic growth can coexist with reduced relative dominance in a more multipolar system.",
    homepageDescription:
      "A measurement-first account that separates nominal GDP, real GDP, PPP scale, household welfare, industrial capacity, finance, alliances, energy, and research capability.",
    volumeRelevance:
      "Volume III follows how wealth and infrastructure convert into power. This paper extends that analysis from households and institutions to national economic and strategic capacity.",
    updatedDate: reviewedAt,
    keywords: [
      "United States",
      "relative decline",
      "multipolarity",
      "GDP",
      "industrial capacity",
      "geopolitical power",
    ],
    availability: {
      webPage:
        "This page is a selected synopsis of the working paper and companion source-audit matrix.",
      original:
        "The complete manuscript, executive essay, video plan, and source-audit file remain in the private research archive.",
      data: "No standalone public dataset is supplied. The source audit records data years, claim types, caveats, and update requirements.",
      code: "No forecasting or statistical-analysis code is supplied. The long-horizon cases are analytical scenarios rather than point forecasts.",
    },
    reviewScope: {
      sourceChecking:
        "The 24–25 August 2026 research package was reviewed with its companion source-audit matrix, which records 30 substantive claims and their evidence status.",
      editorialReview:
        "The public adaptation keeps measurement definitions, counterweights, limitations, and falsifiable indicators while omitting private working files.",
      independentReview:
        "No independent scholarly peer review is documented for this working paper.",
    },
    sections: [
      {
        id: "abstract",
        heading: "The thesis in brief",
        paragraphs: [
          "The paper's central scenario is not national collapse. It is a United States that remains economically large and capable while facing stronger competitors and a higher cost of converting economic scale into uncontested international outcomes.",
          "The argument therefore separates absolute growth from relative power, and aggregate national output from household experience.",
        ],
        evidenceIds: ["richer-cbo", "richer-worldbank"],
      },
      {
        id: "measurement-map",
        heading: "Different measures answer different questions",
        table: {
          caption: "A measurement map for reading claims about prosperity and relative power",
          headers: ["Measure", "Useful for", "Does not show by itself"],
          rows: [
            [
              "Real GDP / real GDP per person",
              "Domestic output growth over time",
              "Distribution or relative geopolitical position",
            ],
            [
              "Nominal GDP",
              "Market-rate scale and internationally priced capacity",
              "Domestic purchasing-power scale or median welfare",
            ],
            [
              "PPP GDP",
              "Domestic production and purchasing-power scale",
              "Dollar-based financial reach or per-capita prosperity",
            ],
            [
              "Household income / affordability",
              "Typical household pressures",
              "Total national production or strategic reach",
            ],
            [
              "Capacity indicators",
              "Industry, finance, alliances, energy, research, logistics",
              "A single universal ranking of national power",
            ],
          ],
        },
      },
      {
        id: "strengths-and-constraints",
        heading: "Strengths and constraints tracked together",
        items: [
          "Strengths include capital-market depth, the dollar's international role, alliance networks, energy production, research institutions, software, and military reach.",
          "Constraints include fiscal pressure, housing affordability, uneven educational outcomes, and selected industrial-capacity gaps such as commercial shipbuilding.",
          "The paper treats those indicators as parts of a portfolio rather than as substitutes for one another.",
        ],
        evidenceIds: ["richer-cbo", "richer-worldbank", "richer-imf"],
      },
      {
        id: "falsifiable-indicators",
        heading: "What would force the thesis to change",
        items: [
          "Persistent failure of real per-capita growth would weaken the absolute-growth side of the thesis.",
          "Broad, durable improvement in household affordability would weaken the argument about divergence between aggregate growth and lived pressure.",
          "Failure by major competitors to convert economic scale into durable industrial, financial, scientific, diplomatic, or military capacity would weaken the relative-decline side.",
        ],
      },
      {
        id: "publication-boundary",
        heading: "Publication boundary",
        paragraphs: [
          "The source identifies itself as a private working paper / preprint draft. Its long-horizon cases are scenarios, not forecasts.",
          "This page publishes the analytical structure and selected source anchors only; it does not publish the private manuscript or source matrix.",
        ],
      },
    ],
    summaryEvidence: [
      {
        id: "richer-cbo",
        label: "Congressional Budget Office",
        citation:
          "The Long-Term Budget Outlook: 2025 to 2055. Conditional baseline used for growth, debt, and interest comparisons.",
        url: "https://www.cbo.gov/publication/61270",
      },
      {
        id: "richer-worldbank",
        label: "World Bank",
        citation:
          "World Development Indicators comparison for the United States, China, and India. The source paper keeps market-rate and PPP measures separate.",
        url: "https://data.worldbank.org/?locations=CN-US-EU-IN",
      },
      {
        id: "richer-imf",
        label: "International Monetary Fund",
        citation:
          "COFER data brief, 2026 Q1. Used for reserve-currency context; reserve share is not treated as the same measure as FX turnover.",
        url: "https://data.imf.org/en/news/imf%20data%20brief%20july%201",
      },
    ],
    limitations: [
      "The paper is a source-bounded synthesis, not a structural model of national power and not a prediction of collapse.",
      "Forward-looking baselines are conditional; policy, productivity, demographics, technology, interest rates, and shocks can change the path.",
      "GDP, spending, alliance, and research indicators are not interchangeable measures of strategic effectiveness or household welfare.",
    ],
  }),
];
