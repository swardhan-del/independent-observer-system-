export type SearchEntryType =
  | "Published document"
  | "Approved preview"
  | "Research"
  | "Series"
  | "Documentary"
  | "Video"
  | "Topic";

export type SearchEntry = {
  id: string;
  title: string;
  category: string;
  description: string;
  status: string;
  type: SearchEntryType;
  href: string;
  topics?: string[];
  volume?: string;
  format?: string;
};

export type SearchFilters = {
  type?: string;
  topic?: string;
  status?: string;
  volume?: string;
};

export type RankedSearchResult = SearchEntry & {
  score: number;
  matchedFields: string[];
};

type SynonymGroup = {
  key: string;
  terms: string[];
};

const synonymGroups: SynonymGroup[] = [
  { key: "ai", terms: ["ai", "artificial", "intelligence", "automation"] },
  { key: "labor", terms: ["labor", "workforce", "employment"] },
  { key: "institutions", terms: ["institution", "institutions", "governance", "administration"] },
  {
    key: "migration",
    terms: ["migration", "migrations", "demographic", "demographics", "foreign", "workers"],
  },
  { key: "technology", terms: ["technology", "technologies", "computing", "infrastructure"] },
];

const synonymLookup = new Map(
  synonymGroups.flatMap((group) => group.terms.map((term) => [term, group] as const)),
);

export function normalizeSearchText(value: string): string {
  return value
    .replace(/[’‘']/g, "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("en")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()
    .replace(/\s+/g, " ");
}

export function tokenizeSearchText(value: string): string[] {
  const normalized = normalizeSearchText(value);
  return normalized ? normalized.split(" ") : [];
}

function queryGroups(query: string): SynonymGroup[] {
  const seen = new Set<string>();
  const groups: SynonymGroup[] = [];

  for (const token of tokenizeSearchText(query)) {
    const group = synonymLookup.get(token) ?? { key: token, terms: [token] };
    if (!seen.has(group.key)) {
      seen.add(group.key);
      groups.push(group);
    }
  }

  return groups;
}

function fieldTokens(value: string | string[] | undefined): Set<string> {
  return new Set(tokenizeSearchText(Array.isArray(value) ? value.join(" ") : (value ?? "")));
}

function hasGroupMatch(group: SynonymGroup, tokens: Set<string>): boolean {
  return group.terms.some((term) => tokens.has(term));
}

function entryFields(entry: SearchEntry) {
  return {
    title: fieldTokens(entry.title),
    category: fieldTokens(entry.category),
    topics: fieldTokens(entry.topics),
    description: fieldTokens(entry.description),
    status: fieldTokens(entry.status),
    format: fieldTokens([entry.format ?? "", entry.type, entry.volume ?? ""]),
  };
}

export function matchesSearchFilters(entry: SearchEntry, filters: SearchFilters = {}): boolean {
  return (
    (!filters.type || entry.type === filters.type) &&
    (!filters.topic || (entry.topics ?? []).some((topic) => topic === filters.topic)) &&
    (!filters.status || entry.status === filters.status) &&
    (!filters.volume || entry.volume === filters.volume)
  );
}

export function rankSearchEntries(
  entries: SearchEntry[],
  query: string,
  filters: SearchFilters = {},
): RankedSearchResult[] {
  const normalizedQuery = normalizeSearchText(query);
  const groups = queryGroups(query);

  return entries
    .filter((entry) => matchesSearchFilters(entry, filters))
    .flatMap((entry) => {
      const fields = entryFields(entry);
      if (!groups.length) {
        return [{ ...entry, score: 0, matchedFields: [] }];
      }

      const searchable = [
        entry.title,
        entry.category,
        ...(entry.topics ?? []),
        entry.description,
        entry.status,
        entry.format ?? "",
        entry.type,
        entry.volume ?? "",
      ]
        .map(normalizeSearchText)
        .join(" ");
      const normalizedTitle = normalizeSearchText(entry.title);
      const titlePhrase = normalizedQuery && normalizedTitle.includes(normalizedQuery);
      const matchedFields = new Set<string>();
      let score = 0;

      if (normalizedQuery === normalizedTitle) score += 10000;
      else if (titlePhrase) score += 7000;

      for (const group of groups) {
        const titleMatch = hasGroupMatch(group, fields.title);
        const taxonomyMatch =
          hasGroupMatch(group, fields.category) || hasGroupMatch(group, fields.topics);
        const descriptionMatch = hasGroupMatch(group, fields.description);
        const statusMatch =
          hasGroupMatch(group, fields.status) || hasGroupMatch(group, fields.format);
        const anyMatch = titleMatch || taxonomyMatch || descriptionMatch || statusMatch;

        if (!anyMatch) return [];
        if (titleMatch) {
          score += 1500;
          matchedFields.add("title");
        } else if (taxonomyMatch) {
          score += 900;
          matchedFields.add("topic");
        } else if (descriptionMatch) {
          score += 500;
          matchedFields.add("description");
        } else if (statusMatch) {
          score += 200;
          matchedFields.add("status");
        }
      }

      if (searchable.includes(normalizedQuery) && !titlePhrase) score += 25;
      return [{ ...entry, score, matchedFields: [...matchedFields] }];
    })
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title, "en"));
}

export function highlightTokens(query: string): string[] {
  const terms = new Set<string>();
  for (const group of queryGroups(query)) {
    for (const term of group.terms) terms.add(term);
  }
  return [...terms];
}

export function searchSuggestions(query: string): string[] {
  const normalized = normalizeSearchText(query);
  if (!normalized) return ["AI", "institutions", "archive"];
  if (normalized === "ai" || normalized === "artificial intelligence") {
    return ["automation", "workforce", "technology"];
  }
  if (normalized.includes("institution")) return ["governance", "law", "democracy"];
  if (normalized.includes("archive")) return ["public library", "research", "series"];
  return ["AI", "institutions", "public library"];
}
