import type { APIRoute } from "astro";
import { compactSearchItems } from "../data/search-payload";
import { encodeSearchIndex } from "../lib/search-payload";

export const GET: APIRoute = () =>
  new Response(JSON.stringify(encodeSearchIndex(compactSearchItems)), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
