import type { PublicDocument, PublicDocumentSection } from "./documents";

const annotationSections: PublicDocumentSection[] = [
  {
    id: "annotation-schema",
    heading: "Annotation guide — six fields to mark before comparing totals",
    table: {
      caption: "A reading key for immigration-enforcement statistics",
      headers: ["Field", "Why it matters", "Question to ask"],
      rows: [
        ["Action", "Removal, return, and Title 42 expulsion are different categories.", "Are both totals counting the same action?"],
        ["Reporting period", "Federal reports commonly use fiscal years rather than calendar years.", "What exact dates belong to each total?"],
        ["Agency coverage", "DHS, CBP, ICE, and component reports can have different scopes.", "Which agencies and transfers are included?"],
        ["Enforcement context", "Border-related and interior activity are separate classifications.", "Does the figure describe where enforcement began or who carried out the departure?"],
        ["Unit counted", "A table may count actions, cases, encounters, or people.", "Are the two sources using the same unit?"],
        ["Legal authority", "Reporting categories can change when the governing authority changes.", "Does a policy or legal change interrupt the series?"],
      ],
    },
    evidenceIds: ["ohss-definitions", "ohss-title42", "ice-reporting"],
  },
  {
    id: "annotation-agency",
    heading: "Annotation — agency role is not the same as enforcement context",
    paragraphs: [
      "ICE's FY2024 report presents overall removals, interior removals, and removals by arresting agency as separate breakdowns. A departure carried out by ICE therefore should not automatically be read as an interior arrest.",
      "When reading a headline total, mark both the agency that first encountered or arrested the person and the agency that carried out the departure when the source provides those fields.",
    ],
    evidenceIds: ["ice-reporting"],
  },
  {
    id: "annotation-period",
    heading: "Annotation — administration labels need a declared date rule",
    paragraphs: [
      "Agency reports are organized around reporting periods and administrative categories, not around a built-in presidential scorecard. Fiscal years also do not align exactly with inauguration dates.",
      "A reproducible administration-level comparison should therefore state how transition periods are assigned before totals are compared.",
    ],
  },
  {
    id: "headline-checklist",
    heading: "A 30-second comparison checklist",
    items: [
      "Underline the category in the claim: removal, return, expulsion, repatriation, encounter, case, or person.",
      "Circle the date range and mark fiscal year or calendar year.",
      "Write the reporting agency beside the number.",
      "Mark whether border and interior activity are combined or separated.",
      "Check whether a legal authority or reporting rule changes the series.",
      "Compare totals only after those annotations line up.",
    ],
  },
];

export function enhanceDeportationReader(document: PublicDocument): PublicDocument {
  if (document.id !== "who-deported-more") return document;

  const existingIds = new Set(document.sections.map((section) => section.id));
  const additions = annotationSections.filter((section) => !existingIds.has(section.id));
  const sections = [...document.sections];
  const boundaryIndex = sections.findIndex((section) => section.id === "publication-boundary");
  sections.splice(boundaryIndex >= 0 ? boundaryIndex : sections.length, 0, ...additions);

  return {
    ...document,
    description:
      "An annotated public guide to comparing immigration-enforcement totals only after categories, periods, agency coverage, units, and enforcement context are aligned.",
    updatedDate: "13 September 2026",
    sections,
    notes: [
      ...(document.notes ?? []),
      "The annotation guide was added on 13 September 2026 as editorial reading guidance. It does not add a new dataset or an administration ranking.",
    ],
    limitations: [
      ...(document.limitations ?? []),
      "Before combining sources, verify whether each table counts people, actions, cases, encounters, or another unit.",
      "Administration-level use of fiscal-year statistics requires an explicit transition-period rule.",
    ],
    reviewScope: {
      ...document.reviewScope,
      editorialReview:
        "The 13 September 2026 annotation pass added a comparison schema, agency-role note, reporting-period note, and headline checklist. It did not add a harmonized dataset, ranking, or causal claim.",
    },
  };
}
