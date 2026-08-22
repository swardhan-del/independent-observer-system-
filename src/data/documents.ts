import { dropboxDocumentItems } from "./dropbox-content.generated";

export type PublicDocumentSection = {
  id: string;
  heading: string;
  paragraphs?: string[];
  items?: string[];
};

export type PublicDocument = {
  id: string;
  title: string;
  category: string;
  description: string;
  sourceLabel: string;
  sourceModified?: string;
  sections: PublicDocumentSection[];
};

const reviewedDocuments: PublicDocument[] = [
  {
    id: "documentary-projects-print-capture",
    title: "Documentary Projects — Independent Observer",
    category: "Documentary desk",
    description:
      "A reviewed public-safe reading copy of the Documentary Projects print capture added to the Independent Observer Dropbox workspace.",
    sourceLabel: "Reviewed Dropbox print capture",
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
          "This reading copy preserves the public-facing text from the print capture. It does not expose the original Dropbox file, private research, personal records, or unpublished evidence.",
        ],
      },
    ],
  },
];

export const publicDocumentItems: PublicDocument[] = [
  ...reviewedDocuments,
  ...dropboxDocumentItems,
];
