import type { APIRoute } from "astro";
import { searchItems } from "../data/search-index";
export const GET: APIRoute = () =>
  new Response(JSON.stringify(searchItems), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
