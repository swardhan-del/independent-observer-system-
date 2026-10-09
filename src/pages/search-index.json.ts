import type { APIRoute } from "astro";
import { searchItems } from "../data/search-index";
import { normalizeSearchText } from "../lib/search";
// Ranking normalizes body text before matching. Store that same representation
// to remove redundant punctuation and whitespace without dropping searchable words.
const compactIndex = searchItems.map((entry) => {
  const compact = { ...entry };
  if (
    entry.format &&
    [entry.status, entry.type].some(
      (value) => normalizeSearchText(value) === normalizeSearchText(entry.format!),
    )
  )
    delete compact.format;
  if (!entry.searchText) return compact;
  let body = normalizeSearchText(entry.searchText);
  const title = normalizeSearchText(entry.title);
  // A repeated leading title is already searchable, and phrase-ranked, in title.
  if (body.startsWith(`${title} `)) body = body.slice(title.length).trimStart();
  return { ...compact, searchText: body };
});
export const GET: APIRoute = () =>
  new Response(JSON.stringify(compactIndex), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
