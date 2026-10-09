import { greenPublicationBySlug } from "./green-publications";

export const aiReadingCollection = {
  route: "/collections/ai-work-and-infrastructure/",
  title: "AI, work and infrastructure",
  description:
    "Two connected analyses of AI’s physical demands and changing work: follow the evidence, then examine the choices communities and workers face.",
  slugs: ["the-server-as-a-furnace", "the-last-human-workforce"],
  reviewedDate: "2026-10-09",
};

export const aiCollectionArticles = aiReadingCollection.slugs.map((slug) => {
  const article = greenPublicationBySlug.get(slug);
  if (!article?.productionReleased)
    throw new Error(`Reading collection requires a released article: ${slug}`);
  return article;
});
