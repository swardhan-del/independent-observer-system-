import { createHash } from "node:crypto";

const HEX_SHA256 = /^[a-f0-9]{64}$/i;
const SAFE_ID = /^[A-Z0-9]+(?:-[A-Z0-9]+)*$/;
const SAFE_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const PUBLIC_REFERENCE = /^\/(?!\/)[a-zA-Z0-9._~!$&'()*+,;=:@%/-]+$/;
const CONTENT_TYPES = new Set(["research", "documentary", "video", "series", "document"]);
const LICENSES = new Set(["all-rights-reserved", "CC BY", "CC BY-NC-ND", "custom"]);
const CITATION_STATUSES = new Set(["verified", "reviewed", "not-applicable"]);
const REQUIRED_GATES = [
  "sourceVerified",
  "contentQualityChecked",
  "rightsAndProvenanceReviewed",
  "privacyLegalSafetyReviewed",
  "accessibilityChecked",
  "releaseApproved",
];

function fail(message) {
  throw new Error(`Publication manifest rejected: ${message}`);
}

function text(value, field, max = 400) {
  if (typeof value !== "string" || !value.trim() || value.length > max) fail(`${field} is invalid`);
  if (/[\u0000-\u001f<>]/.test(value)) fail(`${field} contains unsafe characters`);
  return value.trim();
}

function date(value, field) {
  const parsed = Date.parse(value);
  if (
    typeof value !== "string" ||
    !/^\d{4}-\d{2}-\d{2}(?:T[^\s]+)?$/.test(value) ||
    Number.isNaN(parsed)
  ) {
    fail(`${field} is not an ISO date`);
  }
  return value;
}

function boolean(value, field) {
  if (typeof value !== "boolean") fail(`${field} must be boolean`);
  return value;
}

function publicReferences(value, field) {
  if (!Array.isArray(value) || value.length > 20) fail(`${field} is invalid`);
  for (const [index, reference] of value.entries()) {
    const path = text(reference, `${field}[${index}]`, 500);
    if (
      !PUBLIC_REFERENCE.test(path) ||
      /(?:dropbox|Users|CloudStorage|\.codex_work|private|secret|token)/i.test(path)
    ) {
      fail(`${field}[${index}] is not a public repository reference`);
    }
  }
  return [...value];
}

export function validatePublicationManifest(manifest, { ownerId = null } = {}) {
  if (
    !manifest ||
    manifest.schemaVersion !== 3 ||
    !Array.isArray(manifest.items) ||
    manifest.items.length > 100
  ) {
    fail("schemaVersion or items is invalid");
  }

  const seen = new Set();
  const items = manifest.items.map((item, index) => {
    const field = `items[${index}]`;
    if (!item || typeof item !== "object") fail(`${field} is invalid`);
    const candidateId = text(item.candidateId, `${field}.candidateId`, 80);
    if (!SAFE_ID.test(candidateId) || seen.has(candidateId))
      fail(`${field}.candidateId is invalid or duplicated`);
    seen.add(candidateId);
    const slug = text(item.slug, `${field}.slug`, 100);
    if (!SAFE_SLUG.test(slug)) fail(`${field}.slug is invalid`);
    const volume = text(item.volume, `${field}.volume`, 20);
    if (!/^Volume [IV]+$/.test(volume)) fail(`${field}.volume is invalid`);
    const contentType = text(item.contentType, `${field}.contentType`, 30);
    if (!CONTENT_TYPES.has(contentType)) fail(`${field}.contentType is invalid`);
    const topics = item.topics;
    if (
      !Array.isArray(topics) ||
      topics.length < 1 ||
      topics.length > 12 ||
      topics.some((topic) => typeof topic !== "string" || !topic.trim())
    ) {
      fail(`${field}.topics is invalid`);
    }
    const sourceVerified = boolean(item.sourceVerified, `${field}.sourceVerified`);
    const contentQualityChecked = boolean(
      item.contentQualityChecked,
      `${field}.contentQualityChecked`,
    );
    const rightsAndProvenanceReviewed = boolean(
      item.rightsAndProvenanceReviewed,
      `${field}.rightsAndProvenanceReviewed`,
    );
    const privacyLegalSafetyReviewed = boolean(
      item.privacyLegalSafetyReviewed,
      `${field}.privacyLegalSafetyReviewed`,
    );
    const accessibilityChecked = boolean(
      item.accessibilityChecked,
      `${field}.accessibilityChecked`,
    );
    const releaseApproved = boolean(item.releaseApproved, `${field}.releaseApproved`);
    const approvedBy = releaseApproved ? text(item.approvedBy, `${field}.approvedBy`, 120) : null;
    const approvedAt = releaseApproved ? date(item.approvedAt, `${field}.approvedAt`) : null;
    if (!releaseApproved) fail(`${field}.releaseApproved must be true`);
    if (releaseApproved && ownerId && approvedBy !== ownerId)
      fail(`${field}.approvedBy is not the configured owner`);
    if (releaseApproved && REQUIRED_GATES.some((gate) => item[gate] !== true))
      fail(`${field} has an incomplete release gate`);
    if (!releaseApproved && (approvedBy || approvedAt))
      fail(`${field} has approval metadata without release approval`);
    const publicAssetReferences = publicReferences(
      item.publicAssetReferences,
      `${field}.publicAssetReferences`,
    );
    const downloadAllowed = boolean(item.downloadAllowed, `${field}.downloadAllowed`);
    if (downloadAllowed && publicAssetReferences.length === 0)
      fail(`${field}.downloadAllowed requires a public asset reference`);
    const license = text(item.license, `${field}.license`, 60);
    if (!LICENSES.has(license)) fail(`${field}.license is invalid`);
    const citationStatus = text(item.citationStatus, `${field}.citationStatus`, 30);
    if (!CITATION_STATUSES.has(citationStatus)) fail(`${field}.citationStatus is invalid`);
    const controllerSha256 = text(
      item.controllerSha256,
      `${field}.controllerSha256`,
      64,
    ).toLowerCase();
    if (!HEX_SHA256.test(controllerSha256)) fail(`${field}.controllerSha256 is invalid`);

    return {
      candidateId,
      slug,
      title: text(item.title, `${field}.title`, 240),
      shortTitle: text(item.shortTitle, `${field}.shortTitle`, 70),
      author: text(item.author, `${field}.author`, 160),
      volume,
      topics: topics.map((topic, topicIndex) => text(topic, `${field}.topics[${topicIndex}]`, 80)),
      contentType,
      version: text(item.version, `${field}.version`, 80),
      dateCreated: date(item.dateCreated, `${field}.dateCreated`),
      dateModified: date(item.dateModified, `${field}.dateModified`),
      controllerSha256,
      sourceVerified,
      contentQualityChecked,
      rightsAndProvenanceReviewed,
      privacyLegalSafetyReviewed,
      accessibilityChecked,
      releaseApproved,
      approvedBy,
      approvedAt,
      license,
      citationStatus,
      downloadAllowed,
      publicAssetReferences,
    };
  });

  return { schemaVersion: 3, items };
}

export function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}
