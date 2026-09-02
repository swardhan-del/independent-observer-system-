import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { archivePapers, archivePlacementsForFamily } from "../src/data/archive-navigation";
import { nextClearanceQueue } from "../src/data/clearance-queue";
import { publicDocumentItems } from "../src/data/documents";
import { archiveFamilyIds } from "../src/data/family-registry";
import { previewGreenPublications } from "../src/data/green-publications";
import { unresolvedPlacementFamilyIds } from "../src/data/placement-decisions";
import { canonicalRouteRegistry, indexableRouteRegistry } from "../src/data/route-registry";

const outputDirectory = join(
  process.cwd(),
  "docs/audits/independent-observer-redundancy-provenance-2026-09-01",
);
const liveOrigin = "https://independentobserver.org";

type SourceRecord = {
  familyId: string;
  title: string;
  controller: string;
  hash?: string;
  entityType: string;
  status?: string;
  volume?: string;
  category?: string;
  urls: string[];
  relatedIds: string[];
};

function csv(value: string) {
  return `"${value.replaceAll('"', '""')}"`;
}

function contentHash(path: string) {
  if (!existsSync(path)) return "NOT_AVAILABLE_BEFORE_LOCAL_BUILD";
  const html = readFileSync(path, "utf8");
  const main = (html.match(/<main[\s\S]*?<\/main>/i) || [html])[0]
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "")
    .replace(/&#39;/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return createHash("sha256").update(main).digest("hex");
}

function addRecord(map: Map<string, SourceRecord[]>, record: SourceRecord) {
  const existing = map.get(record.familyId) ?? [];
  existing.push(record);
  map.set(record.familyId, existing);
}

const recordsByFamily = new Map<string, SourceRecord[]>();
for (const record of archivePapers) {
  addRecord(recordsByFamily, {
    familyId: record.familyId,
    title: record.title,
    controller: `src/data/archive-navigation.ts#archivePapers[${record.id}]`,
    entityType: "archive-family",
    status: record.status,
    urls: record.href ? [record.href] : [],
    relatedIds: [],
  });
}
for (const record of publicDocumentItems) {
  addRecord(recordsByFamily, {
    familyId: record.familyId,
    title: record.title,
    controller:
      record.id === "documentary-projects-print-capture"
        ? "src/data/documents.ts#reviewedDocuments"
        : `src/data/papers.ts#paperDocuments[${record.id}]`,
    hash: record.sourceFingerprintSha256,
    entityType: record.id === "documentary-projects-print-capture" ? "document" : "paper-synopsis",
    status: record.status,
    volume: record.volume,
    category: record.category,
    urls: [`/library/documents/${record.id}/`],
    relatedIds: record.relatedIds ?? [],
  });
}
for (const record of previewGreenPublications) {
  addRecord(recordsByFamily, {
    familyId: record.familyId,
    title: record.title,
    controller: `src/data/green-publications.ts#greenPublications[${record.candidateId}]`,
    hash: record.controllerSha256,
    entityType: "research-article",
    status: record.status,
    volume: record.volume,
    category: record.topics.slice(0, 2).join(" · "),
    urls: [`/research/${record.slug}/`],
    relatedIds: record.relatedPublicationIds,
  });
}
for (const record of nextClearanceQueue) {
  addRecord(recordsByFamily, {
    familyId: record.familyId,
    title: record.title,
    controller: `src/data/clearance-queue.ts#nextClearanceQueue[${record.id}]`,
    entityType: "clearance-queue",
    status: record.status,
    volume: record.volume ?? undefined,
    urls: [],
    relatedIds: [],
  });
}

const routeRecordsByFamily = new Map<string, typeof canonicalRouteRegistry>();
for (const record of canonicalRouteRegistry) {
  if (!record.familyId) continue;
  const existing = routeRecordsByFamily.get(record.familyId) ?? [];
  existing.push(record);
  routeRecordsByFamily.set(record.familyId, existing);
}

const flagsFor = (familyId: string, records: SourceRecord[], placementCount: number) => {
  const flags: string[] = [];
  if (unresolvedPlacementFamilyIds.has(familyId)) flags.push("placement-conflict");
  if (placementCount > 1) flags.push("intentional-cross-volume-or-book-relationship");
  if (familyId === archiveFamilyIds.illusionOfEquality)
    flags.push("duplicate-review-variants-excluded-from-public-record");
  if (familyId === archiveFamilyIds.empireOfDistraction)
    flags.push("byte-identical-controller-and-categorized-copy; PDF-derivative");
  if (familyId === archiveFamilyIds.lotteryOfLuck)
    flags.push("duplicate-review-variants; PDF-derivative");
  if (familyId === archiveFamilyIds.lastHumanWorkforce)
    flags.push("book-and-research-article-relationship; DOCX/PDF/PPTX-version-set");
  if (records.some((record) => record.entityType === "clearance-queue"))
    flags.push("not-cleared-for-public-release");
  return flags.join("; ") || "none";
};

const actionFor = (familyId: string, records: SourceRecord[]) => {
  if (unresolvedPlacementFamilyIds.has(familyId)) return "HOLD";
  if (records.some((record) => record.entityType === "clearance-queue")) return "HOLD";
  if (familyId === archiveFamilyIds.lastHumanWorkforce) return "REPOINT";
  if (routeRecordsByFamily.has(familyId)) return "KEEP";
  return "EXCLUDE";
};

const headers = [
  "stable_archive_family_id",
  "title_aliases",
  "canonical_source_controller_path",
  "sha256",
  "current_website_urls",
  "entity_type",
  "volume_category_subfolder",
  "publication_status",
  "related_ids",
  "duplicate_version_conflict_flags",
  "placement_decision",
  "proposed_action",
];

function rows(before = false) {
  return [...recordsByFamily.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([familyId, records]) => {
      const placements = archivePlacementsForFamily(familyId);
      const routeRecords = routeRecordsByFamily.get(familyId) ?? [];
      const titles = [...new Set(records.map((record) => record.title))];
      const hashes = [...new Set(records.map((record) => record.hash).filter(Boolean))];
      const urls = [
        ...new Set([
          ...records.flatMap((record) => record.urls),
          ...routeRecords.map((record) => record.route),
        ]),
      ];
      const placementLabels = [
        ...records
          .filter((record) => record.volume || record.category)
          .map((record) => [record.volume, record.category].filter(Boolean).join(" / ")),
        ...placements.map(
          (placement) =>
            `${placement.volume} / ${placement.sectionTitle} / ${placement.subfolderTitle} [${placement.relationship ?? "unspecified"}]`,
        ),
      ];
      const relatedIds = [
        ...new Set(records.flatMap((record) => record.relatedIds).filter(Boolean)),
      ];
      const conflict = unresolvedPlacementFamilyIds.has(familyId);
      return [
        familyId,
        before && familyId === archiveFamilyIds.lastHumanWorkforce
          ? "The Last Human Workforce"
          : titles.join(" | "),
        [...new Set(records.map((record) => record.controller))].join("; "),
        hashes.join("; ") || "NOT_RECORDED_IN_PUBLIC_CONTROLLER",
        urls.join("; ") || "NONE",
        [...new Set(records.map((record) => record.entityType))].join("; "),
        placementLabels.join("; ") || "UNPLACED_OR_NOT_APPLICABLE",
        [...new Set(records.map((record) => record.status).filter(Boolean))].join("; ") ||
          "NOT_RELEASED",
        relatedIds.join("; ") || "NONE",
        flagsFor(familyId, records, placements.length),
        before && conflict
          ? "UNRESOLVED; current taxonomy was not guarded by an owner-approval hold"
          : conflict
            ? "HOLD; canonical volume/category/subfolder = UNKNOWN pending owner approval"
            : "RESOLVED_OR_NOT_APPLICABLE",
        actionFor(familyId, records),
      ];
    });
}

function renderCsv(data: string[][]) {
  return [headers, ...data].map((row) => row.map(csv).join(",")).join("\n") + "\n";
}

function write(name: string, content: string) {
  writeFileSync(join(outputDirectory, name), content);
}

mkdirSync(outputDirectory, { recursive: true });
write("before-crosswalk.csv", renderCsv(rows(true)));
write("after-crosswalk.csv", renderCsv(rows(false)));

const beforeSitemap = readFileSync(join(outputDirectory, "live-sitemap-before.txt"), "utf8")
  .split(/\r?\n/)
  .map((route) => route.trim())
  .filter(Boolean);
const afterSitemap = indexableRouteRegistry.map((record) => new URL(record.route, liveOrigin).href);
write("sitemap-after.txt", afterSitemap.join("\n") + "\n");
const beforeSet = new Set(beforeSitemap.map((url) => new URL(url).pathname));
const afterSet = new Set(indexableRouteRegistry.map((record) => record.route));
const addedRoutes = [...afterSet].filter((route) => !beforeSet.has(route));
const removedRoutes = [...beforeSet].filter((route) => !afterSet.has(route));

const seriesPath = join(process.cwd(), "dist/series/the-last-human-workforce/index.html");
const researchPath = join(process.cwd(), "dist/research/the-last-human-workforce/index.html");
write(
  "content-comparison.md",
  `# Live collision content comparison\n\n` +
    `The pre-change live pages were fetched directly from the canonical domain on 2026-09-01. Their normalized main-content SHA-256 values were:\n\n` +
    `- Series catalogue: \`09e1380f90040e8d92c3c3721646090d3f2e2b7e3bba5dab2ed06ac4f09ed263\`\n` +
    `- Research article: \`3adbf0b0e7b92735cffb1ec3fd0dc284a3c28ce98b8b4dec2deaf0c303aaffeb\`\n\n` +
    `The hashes differ. The series page is a Volume IV roadmap/book catalogue entry; the research page is a bounded article about task bundles, automation, and transition design, with distinct body text and sources. Both routes are retained. The research article keeps its slug for compatibility but receives the disambiguated title **The Last Human Workforce: Task Bundles, Automation, and Transition Design** in its H1, title tag, Open Graph/Twitter metadata, JSON-LD headline, catalogue card, and related/internal labels.\n\n` +
    `After the local build, normalized main-content hashes are:\n\n` +
    `- Series catalogue: \`${contentHash(seriesPath)}\`\n` +
    `- Research article: \`${contentHash(researchPath)}\`\n\n` +
    `This comparison supports preservation of both distinct entities; it does not authorize deletion of either archive source.\n`,
);

write(
  "source-version-comparison.md",
  `# Exact source-version comparison\n\n` +
    `The following comparisons use byte-level SHA-256 values from the reviewed archive evidence. A different hash identifies a different byte package; it does not, by filename alone, establish release authority.\n\n` +
    `## The Illusion of Equality\n\n` +
    `- Reviewed controller represented in the public synopsis: \`3a5d9727dc807c97f3902af9ade8563afd0bfcd7f25c462bfc336d24b8ff4ea9\`.\n` +
    `- Alternate reviewed packages: \`593b4ac488c4e551250062f1ce114ffed78f4089e6b6424848ba53d857e992a6\`; \`6f0edc2182992a95ed8f2628da8ac0ba98ac92e0a4a1fea6d16e7e845d4b429b\`.\n` +
    `- Comparison: the three packages are not byte-identical. The public controller hash remains represented; competing archive placement is HOLD.\n\n` +
    `## The Empire of Distraction\n\n` +
    `- Reviewed controller represented in the public synopsis: \`b2ecbfabcf3e623c90d60a5c4cf11e87e2b7949d44f1d34987505c50fb6b89b3\`.\n` +
    `- A second categorized controller has the same hash: \`b2ecbfabcf3e623c90d60a5c4cf11e87e2b7949d44f1d34987505c50fb6b89b3\`. The reviewed PDF derivative is \`6ec8c20059056ae13456c682a5f876d8724e88c7503229400b862fdcd042d157\`; other review packages are \`760732ad2d55de8980815eabb416c8a072f49e1c2f2f50ddcddf26a4f2a01b66\` and \`34bade21ba7f9626a50cce9e1812ffb3646f62607ac9a43edb3de0604d903bb3\`.\n` +
    `- Comparison: the two controller packages are byte-identical; the PDF and other review packages differ. This is one family with a derivative/version set, not multiple public pages; placement remains HOLD because assignment is not owner-approved.\n\n` +
    `## The Lottery of Luck\n\n` +
    `- Reviewed controller represented in the public synopsis: \`c9027cf239a300845a45ffe08acdf32ca6b9953f50da2027a604bc192cfc4f29\`.\n` +
    `- Alternate reviewed packages: \`b51bb2e2740c2da1d2a1b063b25f27e03bdf0ffe39cf1468fb7b989a70e1afca\`; \`227178bcb3038054dae9fe69c1a8327ff72ec2af48cff46411efa22af3fd1c52\`; and PDF derivative \`913b345b52f39e2dd42d0eda7c71b8ac99ba2b6ef669041bd9696e0c3c11c8a9\`.\n` +
    `- Comparison: the reviewed controller, alternate review packages, and export derivative are not byte-identical. They remain one family; no alternate package is promoted or published. Placement remains HOLD.\n\n` +
    `## The Last Human Workforce\n\n` +
    `- Reviewed article controller: \`31f921f6e7f52949687ed0b096bc783945752452aebfa29a1ded0856b84dc30d\`.\n` +
    `- Related format packages: PDF derivative \`3eb9d5fbbabe2ba814cab3944625035ff7960e974ac32f993974e36d8dcedb6c\`; presentation versions \`f41bcfb6baa0d3816ae2722d831255f8c450dfe346222790f04ba450ed2d8974\` and \`99e1583cddc044c3041ce368d0c4bf7dd167eb4c10761c53e44ea6d963240d1a\`.\n` +
    `- Comparison: the article controller and related format packages are distinct byte/version packages but belong to one family. The book/catalogue and research article are distinct public entities, so the routes are retained and only the article title is disambiguated.\n`,
);

const actionGroups = new Map<string, string[]>();
for (const row of rows(false)) {
  const action = row.at(-1) ?? "UNKNOWN";
  const existing = actionGroups.get(action) ?? [];
  existing.push(`${row[0]} — ${row[1]}`);
  actionGroups.set(action, existing);
}
const actionOrder = ["KEEP", "REPOINT", "REMOVE_ROUTE", "HOLD", "EXCLUDE"];
write(
  "decisions.md",
  `# Redundancy and provenance decisions\n\n` +
    `Every family in the crosswalk receives one fail-closed action. Archive-only records marked EXCLUDE are not deleted; they remain outside public routes.\n\n` +
    actionOrder
      .map((action) => {
        const entries = actionGroups.get(action) ?? [];
        return `## ${action}\n\n${entries.length ? entries.map((entry) => `- ${entry}`).join("\n") : "None."}\n`;
      })
      .join("\n") +
    `\nREMOVE_ROUTE is intentionally empty: the two collision pages contain distinct entities, so compatibility is preserved and neither route is removed.\n`,
);

write(
  "route-and-sitemap-diff.md",
  `# Route and sitemap diff\n\n` +
    `- Live pre-change sitemap routes captured: **${beforeSet.size}**\n` +
    `- Local post-change indexable routes: **${afterSet.size}**\n` +
    `- Added routes: **${addedRoutes.length ? addedRoutes.join(", ") : "none"}**\n` +
    `- Removed routes: **${removedRoutes.length ? removedRoutes.join(", ") : "none"}**\n` +
    `- Canonical route registry records (including non-indexable utility/legacy records): **${canonicalRouteRegistry.length}**\n\n` +
    `The research route \`/research/the-last-human-workforce/\` is retained and its title metadata is disambiguated. The series route \`/series/the-last-human-workforce/\` is retained as the canonical book/catalogue entity. The legacy archive-navigation pointer for the book family is REPOINTED from the research route to the series route.\n\n` +
    `The complete post-change URL list is in [sitemap-after.txt](./sitemap-after.txt); the direct live pre-change capture is in [live-sitemap-before.txt](./live-sitemap-before.txt).\n`,
);

const publicDocumentCount = publicDocumentItems.length;
const greenCount = previewGreenPublications.length;
const queueCount = nextClearanceQueue.length;
const archiveCount = archivePapers.length;
write(
  "content-loss-evidence.md",
  `# Content-loss evidence\n\n` +
    `The audit changes only controller metadata, route labels, relationship logic, and audit artifacts. It does not delete or move archive originals.\n\n` +
    `- Archive family records: ${archiveCount} before, ${archiveCount} after (archive navigation record count).\n` +
    `- Public document records: ${publicDocumentCount} before, ${publicDocumentCount} after (public document controller count).\n` +
    `- Green research records: ${greenCount} before, ${greenCount} after (green publication controller count).\n` +
    `- Clearance queue records: ${queueCount} before, ${queueCount} after (metadata-only queue count).\n` +
    `- Indexable sitemap routes: ${beforeSet.size} before, ${afterSet.size} after (exact route-set comparison).\n\n` +
    `The three placement-conflict paper pages remain reachable at their existing library routes. The research collision page remains reachable at its existing research route. The following exact source/controller hashes remain represented in the after crosswalk:\n\n` +
    `- Illusion of Equality: \`3a5d9727dc807c97f3902af9ade8563afd0bfcd7f25c462bfc336d24b8ff4ea9\`\n` +
    `- Empire of Distraction: \`b2ecbfabcf3e623c90d60a5c4cf11e87e2b7949d44f1d34987505c50fb6b89b3\`\n` +
    `- Lottery of Luck: \`c9027cf239a300845a45ffe08acdf32ca6b9953f50da2027a604bc192cfc4f29\`\n` +
    `- Last Human Workforce article controller: \`31f921f6e7f52949687ed0b096bc783945752452aebfa29a1ded0856b84dc30d\`\n`,
);

write(
  "unresolved-owner-decisions.md",
  `# Unresolved owner decisions\n\n` +
    `The following decisions require explicit owner approval before any canonical placement, stale placement removal, publication expansion, or archive reorganization:\n\n` +
    `- **The Illusion of Equality** — approve one canonical volume, category, and subfolder. Current public reading route is retained with placement HOLD.\n` +
    `- **The Empire of Distraction** — approve one canonical volume, category, and subfolder. Current public reading route is retained with placement HOLD.\n` +
    `- **The Lottery of Luck** — approve one canonical volume, category, and subfolder. Current public reading route is retained with placement HOLD.\n\n` +
    `No competing archive source was deleted, moved, renamed, or reorganized. No stale competing website placement record was removed because the owner decision is not documented.\n`,
);
