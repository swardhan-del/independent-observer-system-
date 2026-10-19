import type { SearchEntry } from "./search";

// This order is the v1 wire contract. Change the endpoint version if it changes.
const fields = [
  "id",
  "title",
  "category",
  "description",
  "status",
  "type",
  "href",
  "topics",
  "volume",
  "format",
  "searchText",
] as const;
type StringValue = string | number;
type Cell = StringValue | StringValue[] | null;
type SearchPayload = { version: 1; strings: string[]; rows: Cell[][] };

// Only repeated complete strings enter the dictionary. No words, sentences,
// metadata or record identities are removed to meet the download budget.
export function encodeSearchIndex(entries: SearchEntry[]): SearchPayload {
  const counts = new Map<string, number>();
  for (const entry of entries) {
    for (const field of fields) {
      const value = entry[field];
      for (const text of Array.isArray(value) ? value : value === undefined ? [] : [value])
        counts.set(text, (counts.get(text) ?? 0) + 1);
    }
  }
  const strings = [...counts].filter(([, count]) => count > 1).map(([text]) => text);
  const references = new Map(strings.map((text, index) => [text, index]));
  const encode = (text: string): StringValue => references.get(text) ?? text;
  return {
    version: 1,
    strings,
    rows: entries.map((entry) =>
      fields.map((field) => {
        const value = entry[field];
        return value === undefined
          ? null
          : Array.isArray(value)
            ? value.map(encode)
            : encode(value);
      }),
    ),
  };
}

function invalid(): never {
  throw new Error("Invalid search index");
}

function validateEntry(value: unknown): SearchEntry {
  if (!value || typeof value !== "object") return invalid();
  const entry = value as Record<string, unknown>;
  for (const field of fields.slice(0, 7)) if (typeof entry[field] !== "string") return invalid();
  for (const field of ["volume", "format", "searchText"])
    if (entry[field] !== undefined && typeof entry[field] !== "string") return invalid();
  if (
    entry.topics !== undefined &&
    (!Array.isArray(entry.topics) || !entry.topics.every((topic) => typeof topic === "string"))
  )
    return invalid();
  return value as SearchEntry;
}

export function decodeSearchIndex(value: unknown): SearchEntry[] {
  // Older page HTML can still name the original endpoint during a rollout.
  if (Array.isArray(value)) return value.map(validateEntry);
  if (!value || typeof value !== "object") return invalid();
  const payload = value as Record<string, unknown>;
  if (
    payload.version !== 1 ||
    !Array.isArray(payload.strings) ||
    !payload.strings.every((text) => typeof text === "string") ||
    !Array.isArray(payload.rows)
  )
    return invalid();
  const strings = payload.strings as string[];
  const decode = (cell: unknown): string => {
    if (typeof cell === "string") return cell;
    if (typeof cell === "number" && Number.isInteger(cell) && cell >= 0 && cell < strings.length)
      return strings[cell];
    return invalid();
  };
  return payload.rows.map((row: unknown) => {
    if (!Array.isArray(row) || row.length !== fields.length) return invalid();
    const entry: Record<string, unknown> = {};
    fields.forEach((field, index) => {
      const cell = row[index];
      if (cell === null && index >= 7) return;
      if (field === "topics") {
        if (!Array.isArray(cell)) return invalid();
        entry[field] = cell.map(decode);
      } else entry[field] = decode(cell);
    });
    return validateEntry(entry);
  });
}
