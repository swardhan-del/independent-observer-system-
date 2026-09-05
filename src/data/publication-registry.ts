import { paperDocuments } from "./papers";

export type ControlledPublicationStatus =
  | "approved_article"
  | "public_preview"
  | "working_paper"
  | "roadmap_concept"
  | "correction"
  | "withdrawn"
  | "private_restricted"
  | "rights_unclear"
  | "duplicate_or_superseded";

export type ReleaseDecision = "external_record_only" | "awaiting_human_release";

export type PublicationRegistryRecord = {
  id: string;
  title: string;
  author: string;
  contentType: "research" | "document";
  volume: "Volume I" | "Volume II" | "Volume III" | "Volume IV";
  topics: string[];
  status: ControlledPublicationStatus;
  rightsDecision: "reviewed_public_safe_text" | "pending_final_rights_review";
  externalVerification: "verified" | "needs_review" | "not_applicable";
  provenanceFingerprint: string;
  verifiedExternalUrl: string | null;
  releaseDecision: ReleaseDecision;
  canonicalRoute: string | null;
  lastVerificationDate: string;
};

const registryDate = "2026-08-27";
const author = "Siddhartha Harsh Wardhan";

/**
 * Metadata-only release queue. These records intentionally do not contain
 * manuscript text, Dropbox paths, private identifiers, or release flags.
 */
export const sixCandidateReleaseQueue: PublicationRegistryRecord[] = [
  {
    id: "regrowing-humanity",
    title:
      "Regrowing Humanity: How Robotic Limbs Are Becoming Integrated Extensions of the Human Body",
    author,
    contentType: "research",
    volume: "Volume IV",
    topics: ["Science", "Technology", "Human capability"],
    status: "public_preview",
    rightsDecision: "pending_final_rights_review",
    externalVerification: "not_applicable",
    provenanceFingerprint: "audit-2026-08-22-regrowing-humanity",
    verifiedExternalUrl: null,
    releaseDecision: "awaiting_human_release",
    canonicalRoute: null,
    lastVerificationDate: registryDate,
  },
  {
    id: "the-independent-observer-method-candidate",
    title: "The Independent Observer Method",
    author,
    contentType: "research",
    volume: "Volume I",
    topics: ["History", "Law", "Politics", "Evidence"],
    status: "public_preview",
    rightsDecision: "reviewed_public_safe_text",
    externalVerification: "not_applicable",
    provenanceFingerprint: "audit-2026-08-22-independent-observer-method",
    verifiedExternalUrl: null,
    releaseDecision: "awaiting_human_release",
    canonicalRoute: null,
    lastVerificationDate: registryDate,
  },
  {
    id: "the-last-human-workforce-candidate",
    title: "The Last Human Workforce",
    author,
    contentType: "research",
    volume: "Volume IV",
    topics: ["Technology", "Economics", "Labor", "Artificial intelligence"],
    status: "public_preview",
    rightsDecision: "reviewed_public_safe_text",
    externalVerification: "not_applicable",
    provenanceFingerprint: "audit-2026-08-22-last-human-workforce",
    verifiedExternalUrl: null,
    releaseDecision: "awaiting_human_release",
    canonicalRoute: null,
    lastVerificationDate: registryDate,
  },
  {
    id: "the-server-as-a-furnace-candidate",
    title: "The Server as a Furnace",
    author,
    contentType: "research",
    volume: "Volume III",
    topics: ["Technology", "Science", "Energy", "Labor"],
    status: "public_preview",
    rightsDecision: "reviewed_public_safe_text",
    externalVerification: "not_applicable",
    provenanceFingerprint: "audit-2026-08-22-server-as-a-furnace",
    verifiedExternalUrl: null,
    releaseDecision: "awaiting_human_release",
    canonicalRoute: null,
    lastVerificationDate: registryDate,
  },
  {
    id: "borrowed-labor-candidate",
    title: "Borrowed Labor",
    author,
    contentType: "research",
    volume: "Volume II",
    topics: ["Migration", "Economics", "Politics", "Labor"],
    status: "public_preview",
    rightsDecision: "reviewed_public_safe_text",
    externalVerification: "not_applicable",
    provenanceFingerprint: "audit-2026-08-22-borrowed-labor",
    verifiedExternalUrl: null,
    releaseDecision: "awaiting_human_release",
    canonicalRoute: null,
    lastVerificationDate: registryDate,
  },
  {
    id: "democracys-achilles-heel-candidate",
    title: "Democracy’s Achilles’ Heel",
    author,
    contentType: "research",
    volume: "Volume II",
    topics: ["Politics", "Law", "Institutions", "Democracy"],
    status: "public_preview",
    rightsDecision: "reviewed_public_safe_text",
    externalVerification: "not_applicable",
    provenanceFingerprint: "audit-2026-08-22-democracys-achilles-heel",
    verifiedExternalUrl: null,
    releaseDecision: "awaiting_human_release",
    canonicalRoute: null,
    lastVerificationDate: registryDate,
  },
];

const authorPaperRecords: PublicationRegistryRecord[] = paperDocuments.map((document) => {
  const volume = document.volume;
  if (!volume || !["Volume I", "Volume II", "Volume III", "Volume IV"].includes(volume)) {
    throw new Error(`Unsupported volume in public registry: ${document.id}`);
  }

  return {
    id: document.id,
    title: document.title,
    author: document.author ?? author,
    contentType: "document",
    volume: volume as PublicationRegistryRecord["volume"],
    topics: [document.category],
    status: "working_paper",
    rightsDecision: "reviewed_public_safe_text",
    externalVerification: document.researchGateUrl ? "verified" : "needs_review",
    provenanceFingerprint: document.sourceFingerprintSha256 ?? `public-${document.id}`,
    verifiedExternalUrl: document.researchGateUrl ?? null,
    releaseDecision: "external_record_only",
    canonicalRoute: `/library/documents/${document.id}/`,
    lastVerificationDate: document.metrics?.checkedAt ?? registryDate,
  };
});

export const publicPublicationRegistry: PublicationRegistryRecord[] = [
  ...authorPaperRecords,
  ...sixCandidateReleaseQueue,
];
