export type RelatedRecord = {
  id: string;
  title: string;
  description: string;
  category: string;
  href: string;
  status: string;
  topics?: string[];
};

export function relatedRecords(
  current: RelatedRecord,
  records: RelatedRecord[],
  limit = 3,
): RelatedRecord[] {
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
