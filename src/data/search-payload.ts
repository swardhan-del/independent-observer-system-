import { searchItems } from "./search-index";
import { normalizeSearchText } from "../lib/search";

// Keep the existing normalization shared by the legacy and compact endpoints.
// Display text and full articles are unchanged.
export const compactSearchItems = searchItems.map((entry) => {
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
  if (body.startsWith(`${title} `)) body = body.slice(title.length).trimStart();
  return { ...compact, searchText: body };
});
