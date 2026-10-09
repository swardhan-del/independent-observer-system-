import { describe, expect, it } from "vitest";
import { greenPublications } from "../data/green-publications";
import { sixCandidateReleaseQueue } from "../data/publication-registry";
import { validatePublications } from "../lib/publication-validation";

const copy = () => structuredClone(greenPublications);
const released = (articles: typeof greenPublications) =>
  articles.find((article) => article.slug === "the-last-human-workforce")!;
describe("editorial publication gates", () => {
  it("accepts the four released editions while retaining two previews", () => {
    expect(validatePublications(copy(), sixCandidateReleaseQueue)).toEqual({
      released: 4,
      previews: 2,
    });
  });
  it("rejects a release without corresponding owner approval", () => {
    const articles = copy();
    articles[0].productionReleased = true;
    articles[0].status = "Published bounded text adaptation";
    articles[0].citations = [{ paragraph: 0, sources: [0] }];
    expect(() => validatePublications(articles, sixCandidateReleaseQueue)).toThrow(
      /owner-approved registry/,
    );
  });
  it("rejects missing sources, unattached citations, and nonexistent source references", () => {
    for (const problem of ["empty", "unattached", "bad-reference"]) {
      const articles = copy();
      const article = released(articles);
      if (problem === "empty") article.sourceNotes = [];
      if (problem === "unattached") article.citations = [];
      if (problem === "bad-reference") article.citations = [{ paragraph: 0, sources: [99] }];
      expect(() => validatePublications(articles, sixCandidateReleaseQueue)).toThrow(
        /source|citation/,
      );
    }
  });
  it("rejects impossible dates, internal notes, unsafe links and broken heading anchors", () => {
    for (const problem of ["date", "internal", "link", "heading"]) {
      const articles = copy();
      const article = released(articles);
      if (problem === "date") article.publicationDate = "2026-02-30";
      if (problem === "internal")
        article.paragraphs[0] = "Internal synthesis — awaiting human release";
      if (problem === "link") article.sourceNotes[0].href = "javascript:alert(1)";
      if (problem === "heading") article.sectionHeadings![0].id = "article-sources";
      expect(() => validatePublications(articles, sixCandidateReleaseQueue)).toThrow();
    }
  });
});
