import { dropboxDocumentItems } from "./dropbox-content.generated";
import { paperDocuments } from "./papers";
import type { PlacementDecision } from "./placement-decisions";

export type PublicDocumentSection = {
  id: string;
  heading: string;
  paragraphs?: string[];
  items?: string[];
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
  status?: string;
  researchGateUrl?: string;
  metrics?: PublicDocumentMetrics;
  externalVerification?: ExternalVerificationStatus;
  notes?: string[];
  limitations?: string[];
  citations?: PublicCitation[];
  relatedIds?: string[];
  placementDecision?: PlacementDecision;
  sections: PublicDocumentSection[];
};

const reviewedDocuments: PublicDocument[] = [
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

export const publicDocumentItems: PublicDocument[] = [
  ...reviewedDocuments,
  ...paperDocuments,
  ...dropboxDocumentItems,
];
