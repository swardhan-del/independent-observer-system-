import { dropboxDocumentItems } from "./dropbox-content.generated";
import { paperDocuments } from "./papers";
import type { PlacementDecision } from "./placement-decisions";
import { whoDeportedMoreTitle } from "./public-titles";
import { curatedResearchDocuments } from "./research-curation-2026-09-13";
import { enhanceDeportationReader } from "./deportation-reader-enhancements";

export type PublicDocumentSection = {
  id: string;
  heading: string;
  paragraphs?: string[];
  items?: string[];
  evidenceIds?: string[];
  table?: { caption: string; headers: string[]; rows: string[][] };
};

export type PublicCitation = {
  id: string;
  label: string;
  citation: string;
  url?: string;
};

export type PublicDocumentMetrics = {
  downloads?: number;
  abstractViews?: number;
  citations?: number;
  rank?: number;
  checkedAt: string;
};

export type ExternalVerificationStatus = "verified" | "needs_review";

export type PublicDocument = {
  id: string;
  familyId: string;
  title: string;
  volume?: string;
  category: string;
  description: string;
  homepageDescription?: string;
  volumeRelevance?: string;
  sourceLabel: string;
  sourceModified?: string;
  sourceReviewedAt?: string;
  sourceFingerprintSha256?: string;
  sourceTaxonomyNote?: string;
  rightsNotice?: string;
  author?: string;
  publicationDate?: string;
  dateLabel?: string;
  updatedDate?: string;
  keywords?: string[];
  status?: string;
  researchGateUrl?: string;
  metrics?: PublicDocumentMetrics;
  externalVerification?: ExternalVerificationStatus;
  notes?: string[];
  limitations?: string[];
  citations?: PublicCitation[];
  relatedIds?: string[];
  genre?: string;
  availability?: { webPage: string; original: string; data: string; code: string };
  reviewScope?: { sourceChecking?: string; editorialReview?: string; independentReview?: string };
  summaryEvidence?: PublicCitation[];
  sourceEvidenceNote?: string;
  publicationChecklistVersion?: "v1";
  relatedReadingReasons?: Record<string, string>;
  placementDecision?: PlacementDecision;
  sections: PublicDocumentSection[];
};

const reviewedDocuments: PublicDocument[] = [
  {
    id: "w2-withholding-reading-guide",
    familyId: "IO-FAMILY-W2-WITHHOLDING-READING-GUIDE",
    title: "What a W-2 and Federal Withholding Do—and Do Not—Show",
    volume: "Volume III",
    category: "Work, Tax & Public Records",
    description: "A source-led guide to reading federal wage and withholding records without treating them as a complete tax return, a household account, or a policy verdict.",
    sourceLabel: "Official-source reading guide",
    sourceReviewedAt: "28 September 2026",
    updatedDate: "28 September 2026",
    author: "Independent Observer",
    publicationDate: "28 September 2026",
    dateLabel: "Published",
    status: "Public learning exercise",
    publicationChecklistVersion: "v1",
    genre: "Bounded public explanation; not tax advice and not a release of the related working paper",
    availability: {
      webPage: "This source-led reading guide is available here.",
      original: "It does not reproduce or release the related author working paper.",
      data: "No dataset or codebook accompanies this guide.",
      code: "No analysis code accompanies this guide.",
    },
    reviewScope: {
      sourceChecking: "The cited IRS pages and publications were checked on 28 September 2026.",
      editorialReview: "This guide was checked to separate document description from tax or policy interpretation.",
      independentReview: "No external peer review or independent validation is recorded for this guide.",
    },
    summaryEvidence: [
      { id: "irs-w2", label: "IRS, Form W-2", citation: "About Form W-2, Wage and Tax Statement (current information page).", url: "https://www.irs.gov/forms-pubs/about-form-w-2" },
      { id: "irs-w4", label: "IRS, Form W-4", citation: "About Form W-4, Employee’s Withholding Certificate (current information page).", url: "https://www.irs.gov/forms-pubs/about-form-w-4" },
      { id: "irs-p15", label: "IRS, Publication 15", citation: "Publication 15 (2026), Employer’s Tax Guide.", url: "https://www.irs.gov/publications/p15" },
      { id: "irs-p15t", label: "IRS, Publication 15-T", citation: "Publication 15-T (2026), Federal Income Tax Withholding Methods.", url: "https://www.irs.gov/publications/p15t" },
    ],
    citations: [{ id: "guide-citation", label: "Independent Observer", citation: "Independent Observer, What a W-2 and Federal Withholding Do—and Do Not—Show (2026)." }],
    limitations: [
      "This guide describes selected federal documents; it is not tax, legal, payroll, or financial advice.",
      "A W-2 and withholding entries do not by themselves determine a person’s final tax liability, refund, household circumstances, deductions, credits, state or local obligations, or employer compliance.",
      "Forms and rules can change. Readers should use the current IRS material and qualified professional advice for an individual situation.",
    ],
    sections: [
      { id: "what-the-record-shows", heading: "What the record is for", paragraphs: ["A Form W-2 is an employer wage-and-tax statement. Federal withholding is an amount taken from pay under payroll rules; it is not the same thing as a final individual income-tax calculation."], evidenceIds: ["irs-w2", "irs-w4"] },
      { id: "how-withholding-works", heading: "How to read withholding carefully", paragraphs: ["Form W-4 supplies withholding information to an employer. Publication 15 and Publication 15-T explain employer responsibilities and federal withholding methods. That chain can explain a payroll entry without proving what a worker ultimately owes or receives after filing."], evidenceIds: ["irs-w4", "irs-p15", "irs-p15t"] },
      { id: "boundary", heading: "What this guide does not establish", paragraphs: ["The guide does not calculate anyone’s tax, evaluate the related working paper’s proposals, or infer a policy result from one document. It is a document-reading aid: start with the form, identify the tax and period, then consult the current official instructions."] },
    ],
  },
  {
    id: "bls-ai-projections-reading-guide",
    publicationChecklistVersion: "v1",
    familyId: "IO-FAMILY-BLS-AI-PROJECTIONS-READING-GUIDE",
    title: "What BLS Employment Projections Say About AI—and What They Do Not",
    volume: "Volume IV",
    category: "Technology, Work & Measurement",
    description: "A bounded guide to reading BLS employment projections on AI, without turning a national ten-year scenario into a prediction about a particular worker, employer, or policy.",
    sourceLabel: "Official-source reading guide",
    sourceReviewedAt: "28 September 2026",
    updatedDate: "28 September 2026",
    author: "Independent Observer",
    publicationDate: "28 September 2026",
    dateLabel: "Published",
    status: "Public learning exercise",
    genre: "Bounded public explanation accompanying a research preview; not an employment forecast or investment advice",
    availability: {
      webPage: "This source-led reading guide is available here.",
      original: "It does not release a completed investigation behind The Autonomous Illusion research preview.",
      data: "The guide links to public BLS publications; it supplies no new dataset.",
      code: "No analysis code accompanies this guide.",
    },
    reviewScope: {
      sourceChecking: "The cited BLS publications and projection pages were checked on 28 September 2026.",
      editorialReview: "This guide was checked to separate published BLS projections from broader claims about automation.",
      independentReview: "No external peer review or independent validation is recorded for this guide.",
    },
    summaryEvidence: [
      { id: "bls-ep", label: "BLS Employment Projections", citation: "Employment Projections home page, including the 2025–35 release.", url: "https://www.bls.gov/emp/" },
      { id: "bls-summary", label: "BLS 2025–35 summary", citation: "Employment Projections: 2025–2035 Summary.", url: "https://www.bls.gov/news.release/ecopro.nr0.htm" },
      { id: "bls-ai", label: "BLS AI and employment", citation: "Artificial intelligence, information technology, and employment, 2024–34.", url: "https://www.bls.gov/opub/ted/2026/artificial-intelligence-information-technology-and-employment-2024-34.htm" },
      { id: "bls-method", label: "BLS AI methodology", citation: "Incorporating AI impacts in BLS employment projections: occupational case studies.", url: "https://www.bls.gov/opub/mlr/2025/article/incorporating-ai-impacts-in-bls-employment-projections.htm" },
    ],
    citations: [{ id: "guide-citation", label: "Independent Observer", citation: "Independent Observer, What BLS Employment Projections Say About AI—and What They Do Not (2026)." }],
    limitations: [
      "BLS projections are national, model-based ten-year projections; they are not predictions for a named worker, employer, locality, or investment.",
      "The cited BLS pages use different projection vintages where stated. Readers should not combine values across vintages without checking the publication period and definitions.",
      "This guide does not establish that AI will produce one universal employment outcome or assess the merits of a policy response.",
    ],
    sections: [
      { id: "projection-not-prediction", heading: "A projection is a defined scenario", paragraphs: ["BLS publishes projections for the labor force, macroeconomy, industry output and employment, and occupations. The 2025–35 release reports national projected employment changes under stated methods and assumptions; it does not report a guaranteed future."], evidenceIds: ["bls-ep", "bls-summary"] },
      { id: "where-ai-enters", heading: "How AI enters the published discussion", paragraphs: ["BLS material identifies channels through which AI and information technology may affect selected occupations and industries. It also describes AI-related assumptions and occupational case studies. Those are more specific than a claim that every task, job, or worker will be replaced."], evidenceIds: ["bls-ai", "bls-method"] },
      { id: "how-to-use", heading: "How to use the numbers", paragraphs: ["Check the projection vintage, the unit of analysis, the baseline, and whether a claim concerns occupations, industries, tasks, earnings, or a local labor market. Treat the figures as one public input for inquiry, alongside observed conditions and stated uncertainty."] },
    ],
  },
  {
    id: "documentary-projects-print-capture",
    familyId: "IO-FAMILY-DOCUMENTARY-PROJECTS-PRINT-CAPTURE",
    title: "Documentary Projects — Independent Observer",
    category: "Documentary desk",
    description:
      "A reviewed public-safe reading copy of the Documentary Projects print capture added to the Independent Observer working archive.",
    sourceLabel: "Reviewed print capture",
    sourceModified: "August 18, 2026",
    sections: [
      {
        id: "documentary-desk",
        heading: "The documentary desk",
        paragraphs: [
          "Visual investigations built around context, systems, and consequences—not spectacle for its own sake.",
          "Project cards describe concepts in development. They do not represent completed or released films.",
        ],
      },
      {
        id: "project-previews",
        heading: "Project previews",
        items: [
          "Could America Leave NATO? — A documentary concept mapping the legal, military, diplomatic, and economic consequences of a major alliance rupture. Status: in editorial development.",
          "The Martian Illusion — A proposed documentary asking whether civilization should prioritize Earth systems, energy, and nearer-space infrastructure. Status: concept preview.",
        ],
      },
      {
        id: "production-standard",
        heading: "Production standard",
        paragraphs: [
          "Research before narration. Each project is intended to begin with a source dossier and an explicit claim map. The script, visual plan, narration, and distribution package should follow from that research, not substitute for it.",
        ],
        items: [
          "Source and citation dossier",
          "Long-form narration script",
          "Scene-by-scene visual treatment",
          "Fact-check and legal-risk review",
          "Short-form educational adaptations",
        ],
      },
      {
        id: "publication-boundary",
        heading: "Publication boundary",
        paragraphs: [
          "The site is the home base; social channels help people find the work.",
          "This reading copy preserves the public-facing text from the print capture. It does not expose the original source file, private research, personal records, or unpublished evidence.",
        ],
      },
    ],
  },
];

const canonicalSourceCitations: Record<string, string> = {
  "who-deported-more": `Harsh Wardhan, Siddhartha, ${whoDeportedMoreTitle} (2025).`,
};

const normalizePaperMetadata = (document: PublicDocument): PublicDocument => {
  const canonicalCitation = canonicalSourceCitations[document.id];
  if (!canonicalCitation || !document.citations?.length) return document;
  return {
    ...document,
    citations: document.citations.map((citation) => ({ ...citation, citation: canonicalCitation })),
  };
};

const sourceEvidenceBoundary = "No page-specific supporting-source package is published for this synopsis. The external author record identifies a manuscript; it is not independent verification.";

export const publicDocumentItems: PublicDocument[] = [
  ...reviewedDocuments,
  ...paperDocuments.map(normalizePaperMetadata).map(enhanceDeportationReader).map((document) => document.summaryEvidence?.length ? document : { ...document, sourceEvidenceNote: sourceEvidenceBoundary }),
  ...curatedResearchDocuments,
  ...dropboxDocumentItems,
];
