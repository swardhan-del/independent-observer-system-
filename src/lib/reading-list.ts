export type ReadingStatus = "unread" | "reading" | "finished";

export type SavedReadingItem = {
  id: string;
  title: string;
  href: string;
  type?: string;
  savedAt: number;
  status: ReadingStatus;
  tag?: string;
};

export const readingListStorageKey = "independent-observer:reading-list:v2";

export function isSavedReadingItem(value: unknown): value is SavedReadingItem {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<SavedReadingItem>;
  return (
    typeof item.id === "string" &&
    typeof item.title === "string" &&
    typeof item.href === "string" &&
    typeof item.savedAt === "number" &&
    ["unread", "reading", "finished"].includes(item.status ?? "")
  );
}

export function parseReadingList(value: string | null): SavedReadingItem[] {
  if (!value) return [];
  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isSavedReadingItem).map((item) => ({
      ...item,
      tag: typeof item.tag === "string" ? item.tag.slice(0, 80) : undefined,
      type: typeof item.type === "string" ? item.type : undefined,
    }));
  } catch {
    return [];
  }
}

export function migrateReadingList(value: string | null): SavedReadingItem[] {
  const parsed = parseReadingList(value);
  if (parsed.length > 0) return parsed;

  try {
    const legacy: unknown = value ? JSON.parse(value) : [];
    if (!Array.isArray(legacy)) return [];
    return legacy.flatMap((item: unknown) => {
      if (!item || typeof item !== "object") return [];
      const candidate = item as { id?: unknown; title?: unknown; href?: unknown };
      if (
        typeof candidate.id !== "string" ||
        typeof candidate.title !== "string" ||
        typeof candidate.href !== "string"
      ) {
        return [];
      }
      return [
        {
          id: candidate.id,
          title: candidate.title,
          href: candidate.href,
          savedAt: Date.now(),
          status: "unread" as const,
        },
      ];
    });
  } catch {
    return [];
  }
}

export function sortReadingList(
  items: SavedReadingItem[],
  sort: "recent" | "title" | "type" = "recent",
): SavedReadingItem[] {
  return [...items].sort((a, b) => {
    if (sort === "title") return a.title.localeCompare(b.title, "en");
    if (sort === "type")
      return (
        (a.type ?? "").localeCompare(b.type ?? "", "en") || a.title.localeCompare(b.title, "en")
      );
    return b.savedAt - a.savedAt;
  });
}
