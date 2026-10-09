import type { GreenPublication } from "../data/green-publications";
import type { PublicationRegistryRecord } from "../data/publication-registry";
import { citationDate } from "./citations";

/** Static release checks supplement editorial review; they cannot prove a claim true. */
export function validatePublications(
  articles: GreenPublication[],
  registry: PublicationRegistryRecord[],
) {
  const slugs = new Set<string>();
  const reservedIds = [
    "article-sources",
    "article-limitations",
    "article-disclosures",
    "revision-history",
  ];
  for (const article of articles) {
    const fail = (reason: string): never => {
      throw new Error(`${article.slug}: ${reason}`);
    };
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug) || slugs.has(article.slug))
      fail("invalid or duplicate slug");
    slugs.add(article.slug);
    if (
      ![
        article.title,
        article.standfirst,
        article.author,
        article.version,
        article.license,
        article.limitations,
      ].every((value) => value.trim())
    )
      fail("missing publication metadata");
    for (const date of [
      article.publicationDate,
      article.lastReviewedDate,
      article.factualCutoffDate,
    ]) {
      if (!citationDate(date)) fail("invalid calendar date");
    }
    if (article.factualCutoffDate > article.lastReviewedDate)
      fail("factual cutoff is later than review");
    if (!article.paragraphs.length || article.paragraphs.some((paragraph) => !paragraph.trim()))
      fail("empty article body");
    if (!article.sourceNotes.length) fail("missing sources");
    for (const source of article.sourceNotes) {
      let url: URL;
      try {
        url = new URL(source.href);
      } catch {
        fail("source must have an absolute public URL");
      }
      if (url!.protocol !== "https:" || url!.username || url!.password || !source.label.trim())
        fail("invalid source link");
    }
    const publicText = JSON.stringify([
      article.title,
      article.standfirst,
      article.paragraphs,
      article.sourceNotes,
      article.limitations,
      article.adaptationDisclosure,
      article.revisionNotes,
    ]);
    if (
      /\b(?:TODO|TBD|PLACEHOLDER)\b|Internal synthesis|awaiting human release|W-00\d|\/Users\/|ns:\d+\/\//i.test(
        publicText,
      )
    )
      fail("internal or unfinished text in public article");
    const citationParagraphs = new Set<number>();
    for (const citation of article.citations ?? []) {
      if (
        !Number.isInteger(citation.paragraph) ||
        citation.paragraph < 0 ||
        citation.paragraph >= article.paragraphs.length ||
        citationParagraphs.has(citation.paragraph)
      )
        fail("invalid or duplicate citation paragraph");
      citationParagraphs.add(citation.paragraph);
      if (
        !citation.sources.length ||
        new Set(citation.sources).size !== citation.sources.length ||
        citation.sources.some(
          (index) => !Number.isInteger(index) || index < 0 || index >= article.sourceNotes.length,
        )
      )
        fail("citation points to a missing or duplicate source");
    }
    const headingIds = new Set(reservedIds);
    const headingPositions = new Set<number>();
    for (const heading of article.sectionHeadings ?? []) {
      if (
        !/^[a-z]+(?:-[a-z]+)*$/.test(heading.id) ||
        headingIds.has(heading.id) ||
        !heading.title.trim()
      )
        fail("invalid or duplicate heading");
      headingIds.add(heading.id);
      if (
        !Number.isInteger(heading.beforeParagraph) ||
        heading.beforeParagraph < 0 ||
        heading.beforeParagraph >= article.paragraphs.length ||
        headingPositions.has(heading.beforeParagraph)
      )
        fail("heading is outside the article or duplicated");
      headingPositions.add(heading.beforeParagraph);
    }
    for (const revision of article.revisionNotes ?? []) {
      if (
        !citationDate(revision.date) ||
        revision.date > article.lastReviewedDate ||
        !revision.change.trim()
      )
        fail("invalid edition history");
    }
    const record = registry.find((item) => item.canonicalRoute === `/research/${article.slug}/`);
    if (
      article.relatedPublicationIds.some(
        (id) => !articles.some((related) => related.familyId === id || related.candidateId === id),
      )
    )
      fail("related reading points to a missing article");
    if (article.productionReleased) {
      if (
        !article.sourceVerified ||
        !article.rightsReviewed ||
        !article.accessibilityReviewed ||
        article.status !== "Published bounded text adaptation"
      )
        fail("release checks are incomplete");
      if (article.lastReviewedDate < article.publicationDate || !article.citations?.length)
        fail("release needs reviewed dates and attached citations");
      if (
        !record ||
        record.releaseDecision !== "owner_released" ||
        record.status !== "approved_article" ||
        record.rightsDecision !== "reviewed_public_safe_text"
      )
        fail("release does not match the owner-approved registry");
    } else if (record?.releaseDecision === "owner_released") {
      fail("preview conflicts with a released registry record");
    }
  }
  for (const record of registry.filter((item) => item.releaseDecision === "owner_released")) {
    if (
      !articles.some(
        (article) =>
          article.productionReleased && record.canonicalRoute === `/research/${article.slug}/`,
      )
    )
      throw new Error(`${record.id}: registry release has no released article`);
  }
  return {
    released: articles.filter((article) => article.productionReleased).length,
    previews: articles.filter((article) => !article.productionReleased).length,
  };
}
