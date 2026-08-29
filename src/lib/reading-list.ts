export type SavedReadingListItem = {
  id: string;
  title: string;
  href: string;
};

export const MAX_READING_LIST_IMPORT_BYTES = 1_048_576;
export const MAX_READING_LIST_RECORDS = 500;

const allowedTypes = new Set(["research", "documentary", "video", "series", "library"]);
const allowedStatuses = new Set(["saved", "preview", "published"]);
const allowedPathPrefixes = ["/library/", "/research/", "/documentaries/", "/videos/", "/series/"];

function hasControlCharacters(value: string): boolean {
  return /[\u0000-\u001f\u007f]/.test(value);
}

function fullyDecode(value: string): string | null {
  let decoded = value;
  for (let index = 0; index < 4; index += 1) {
    try {
      const next = decodeURIComponent(decoded);
      if (next === decoded) return decoded;
      decoded = next;
    } catch {
      return null;
    }
  }
  return decoded;
}

/** Accept only same-site, root-relative routes from the public publication. */
export function isSafeInternalHref(value: unknown): value is string {
  if (typeof value !== "string" || !value || value !== value.trim() || value.length > 2_048)
    return false;
  if (
    value.includes("\\") ||
    hasControlCharacters(value) ||
    !value.startsWith("/") ||
    value.startsWith("//")
  )
    return false;

  const decoded = fullyDecode(value);
  if (
    !decoded ||
    decoded.includes("\\") ||
    hasControlCharacters(decoded) ||
    decoded.startsWith("//")
  )
    return false;
  if (/(?:^|\/)\.\.?(?:\/|$)/.test(decoded)) return false;
  if (/^(?:javascript|data|vbscript|file):/i.test(decoded)) return false;

  try {
    const url = new URL(value, "https://internal.invalid");
    if (url.origin !== "https://internal.invalid" || !url.pathname.startsWith("/")) return false;
    return allowedPathPrefixes.some((prefix) => url.pathname.startsWith(prefix));
  } catch {
    return false;
  }
}

function boundedText(value: unknown, maximum: number): value is string {
  return (
    typeof value === "string" &&
    value.length > 0 &&
    value.length <= maximum &&
    !hasControlCharacters(value)
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isSafeStoredItem(value: unknown): value is SavedReadingListItem {
  return (
    isRecord(value) &&
    boundedText(value.id, 128) &&
    boundedText(value.title, 240) &&
    isSafeInternalHref(value.href)
  );
}

export type ReadingListImportRecord = SavedReadingListItem & {
  type: string;
  savedAt: string;
  status: string;
  tag: string;
};

function isSafeImportRecord(value: unknown): value is ReadingListImportRecord {
  if (!isRecord(value)) return false;
  const savedAt = value.savedAt;
  const savedDate = typeof savedAt === "string" ? new Date(savedAt) : null;
  return (
    boundedText(value.id, 128) &&
    boundedText(value.title, 240) &&
    isSafeInternalHref(value.href) &&
    boundedText(value.type, 32) &&
    allowedTypes.has(value.type) &&
    boundedText(value.status, 32) &&
    allowedStatuses.has(value.status) &&
    boundedText(value.tag, 80) &&
    Boolean(savedDate) &&
    Number.isFinite(savedDate?.getTime())
  );
}

export function parseStoredReadingList(raw: string): SavedReadingListItem[] {
  if (new TextEncoder().encode(raw).byteLength > MAX_READING_LIST_IMPORT_BYTES) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isSafeStoredItem).slice(0, MAX_READING_LIST_RECORDS);
  } catch {
    return [];
  }
}

export function parseReadingListImport(raw: string): SavedReadingListItem[] | null {
  if (new TextEncoder().encode(raw).byteLength > MAX_READING_LIST_IMPORT_BYTES) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length > MAX_READING_LIST_RECORDS) return null;
    const records = parsed as unknown[];
    if (!records.every(isRecord)) return null;

    const valid = records.map((record) => {
      if (!isSafeImportRecord(record)) return null;
      return { id: record.id, title: record.title, href: record.href };
    });

    return valid.every((item): item is SavedReadingListItem => item !== null) ? valid : null;
  } catch {
    return null;
  }
}
