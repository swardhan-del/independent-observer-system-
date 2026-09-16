import type { APIRoute } from "astro";

const body = `# Independent Observer

Independent Observer is an independent research and essay project by Siddhartha Harsh Wardhan examining institutional power, political economy, history, law, science, and technology.

Canonical site: https://independentobserver.org/
Author: Siddhartha Harsh Wardhan
ORCID: https://orcid.org/0009-0005-4228-1124

Primary resources:
- https://independentobserver.org/about/
- https://independentobserver.org/library/
- https://independentobserver.org/series/
- https://independentobserver.org/topics/
- https://independentobserver.org/research/

Discovery:
- Sitemap: https://independentobserver.org/sitemap.xml
- RSS: https://independentobserver.org/feed.xml
- Atom: https://independentobserver.org/feed.atom.xml

IndependentObserver.org is the canonical public record for reader-facing pages. Research records should be interpreted according to the publication status, source notes, limitations, correction information, and first-party provenance shown on each page. External platform references, where retained elsewhere for historical context, are not required validation authorities or publication destinations.
`;

export const GET: APIRoute = () =>
  new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
