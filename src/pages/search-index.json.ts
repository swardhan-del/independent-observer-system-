import type { APIRoute } from "astro";
import { compactSearchItems } from "../data/search-payload";
// Preserve the array endpoint for cached pages and existing consumers.
export const GET: APIRoute = () =>
  new Response(JSON.stringify(compactSearchItems), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
