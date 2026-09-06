import { archivePlacementsForFamily } from "../data/archive-navigation";
import { explicitRelatedFamilyIds } from "../data/family-registry";

export type RelatedRecord = {
  id: string;
  title: string;
  description: string;
  category: string;
  href: string;
  status: string;
  topics?: string[];
  familyId?: string;
  volume?: string;
  relatedIds?: string[];
};

function placementContext(record: RelatedRecord) {
  const placements = archivePlacementsForFamily(record.familyId);
  return {
    volumes: new Set([
      ...(record.volume ? [record.volume] : []),
      ...placements.map((placement) => placement.volume),
    ]),
    subfolders: new Set(
      placements.map(
        (placement) => `${placement.volume}:${placement.sectionId}:${placement.subfolderId}`,
      ),
    ),
  };
}

export function relatedRecords(
  current: RelatedRecord,
  records: RelatedRecord[],
  limit = 3,
): RelatedRecord[] {
  const structuredMetadata = Boolean(
    current.familyId ||
    current.volume ||
    records.some((record) => record.familyId || record.volume),
  );
  if (structuredMetadata) {
    const currentContext = placementContext(current);
    const explicitIds = new Set([
      ...(current.relatedIds ?? []),
      ...explicitRelatedFamilyIds(current.familyId),
    ]);

    return records
      .filter(
        (record) =>
          record.id !== current.id && (!current.familyId || record.familyId !== current.familyId),
      )
      .map((record) => {
        const candidateContext = placementContext(record);
        const isExplicit = Boolean(record.familyId && explicitIds.has(record.familyId));
        const sameSubfolder = [...currentContext.subfolders].some((key) =>
          candidateContext.subfolders.has(key),
        );
        const sameVolume = [...currentContext.volumes].some((volume) =>
          candidateContext.volumes.has(volume),
        );
        const score = (isExplicit ? 1000 : 0) + (sameSubfolder ? 100 : 0) + (sameVolume ? 10 : 0);
        return { record, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score || a.record.title.localeCompare(b.record.title, "en"))
      .slice(0, limit)
      .map(({ record }) => record);
  }

  const currentTopics = new Set((current.topics ?? []).map((topic) => topic.toLocaleLowerCase()));
  return records
    .filter((record) => record.id !== current.id)
    .map((record) => {
      const sharedTopics = (record.topics ?? []).filter((topic) =>
        currentTopics.has(topic.toLocaleLowerCase()),
      ).length;
      const sameCategory = record.category === current.category ? 3 : 0;
      const currentWords = new Set(current.title.toLocaleLowerCase().split(/\W+/));
      const sharedWords = record.title
        .toLocaleLowerCase()
        .split(/\W+/)
        .filter((word) => word.length > 3 && currentWords.has(word)).length;
      return { record, score: sharedTopics * 4 + sameCategory + Math.min(sharedWords, 2) };
    })
    .sort((a, b) => b.score - a.score || a.record.title.localeCompare(b.record.title, "en"))
    .slice(0, limit)
    .map(({ record }) => record);
}
