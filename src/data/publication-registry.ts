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

export type ReleaseCandidatePresentation = {
  description: string;
  publicRoute: string;
  linkLabel: string;
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

/**
 * Public-safe editorial descriptions for the release queue. The routes point
 * to verified public records, volume briefs, or public companions; they never
 * expose working-file locations or imply that a candidate has been released.
 */
export const releaseCandidatePresentations: Record<string, ReleaseCandidatePresentation> = {
  "regrowing-humanity": {
    description:
      "Reviews how robotic limbs are moving from passive devices toward systems that interpret intention and, in some cases, return limited sensation. The paper keeps engineering, embodiment, rehabilitation, maintenance, consent, financing, and access distinct so Volume IV can ask when a technical advance becomes usable human capability.",
    publicRoute: "/review/regrowing-humanity/",
    linkLabel: "Open the public evidence brief →",
  },
  "the-independent-observer-method-candidate": {
    description:
      "Defines the method behind the series: name the source, separate observation from interpretation and proposal, record uncertainty, and make correction possible. Its contribution is a repeatable way to move from a public record to an institutional diagnosis without treating confidence as proof.",
    publicRoute: "/library/documents/independent-observer-volume-one/",
    linkLabel: "Read the public Volume I record →",
  },
  "the-last-human-workforce-candidate": {
    description:
      "Follows automation and artificial intelligence through education, originality, time, political volatility, and the rebuilding of an intellectual middle class. It asks how institutions can preserve meaningful work and shared capability when tasks, credentials, and economic security are reorganized by machines.",
    publicRoute: "/series/the-last-human-workforce/",
    linkLabel: "Read the Volume IV brief →",
  },
  "the-server-as-a-furnace-candidate": {
    description:
      "Uses the data center as a lens on the material cost of digital life: compute, energy, cooling, infrastructure, labor, and regional industrial change. The Volume III inquiry asks who finances that transition, who bears its burdens, and whether a server economy expands or constrains social citizenship.",
    publicRoute: "/series/managed-decline/",
    linkLabel: "Read the Volume III brief →",
  },
  "borrowed-labor-candidate": {
    description:
      "Maps how Poland, Hungary, and Slovakia can combine demographic-sovereignty rhetoric with reliance on foreign workers. It introduces the membership–function gap and demographic time-lag problem, then follows ageing, wages, childcare, productivity, managed migration, portable status, and integration through the Volume II power inquiry.",
    publicRoute: "/library/?paperVolume=Volume%20II#research-volume-ii",
    linkLabel: "Open the Volume II research shelf →",
  },
  "democracys-achilles-heel-candidate": {
    description:
      "Examines how concentrated resources, unequal participation, information gatekeeping, partisan tolerance for rule-breaking, and weakened institutional referees may reinforce one another. Its purpose is to test identifiable pathways and correction points rather than reduce democratic outcomes to a single cause.",
    publicRoute: "/videos/the-cost-of-looking-away/",
    linkLabel: "Open the public companion →",
  },
};

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
