import { releasedGreenPublications } from "./green-publications";

export const editorialMission =
  "Independent research and analysis of the institutions, economics, and technologies shaping our future.";

export const editorialThemes = [
  {
    label: "History & institutions",
    description: "How earlier decisions shape who holds power and how it can be challenged.",
    href: "/topics/history/",
  },
  {
    label: "Political economy & policy",
    description: "How public rules and private incentives shape decisions and their costs.",
    href: "/topics/politics/",
  },
  {
    label: "AI, technology & employment",
    description:
      "Which tasks change, who controls the transition, and what infrastructure it takes.",
    href: "/collections/ai-work-and-infrastructure/",
  },
  {
    label: "Wealth, labour & opportunity",
    description:
      "Who gains from growth, what makes work durable, and where barriers to opportunity sit.",
    href: "/topics/economics/",
  },
  {
    label: "Science & innovation",
    description: "What emerging capabilities can do and what their evidence does not yet show.",
    href: "/topics/science/",
  },
] as const;

// These are editorial entry points to the released records, not a publication registry.
const featureNotes = [
  {
    slug: "the-last-human-workforce",
    theme: "AI & employment",
    cover: "tasks",
    hook: "A job can keep its title while its daily tasks change. What should workers and employers measure?",
    introduction:
      "Start by listing what someone does in a shift: retrieve information, make a decision, check an answer, handle an exception. The task framework asks which activities move to software and which new ones people take on. A customer support study gives a concrete example of assistance in one workplace. It cannot tell us how many jobs will exist next year. The useful question for this article is what evidence would show whether a transition improved the work as well as the output.",
    sources: [1, 2],
  },
  {
    slug: "factories-return-but-do-the-jobs",
    theme: "Labour & ownership",
    cover: "industry",
    hook: "A new plant can raise domestic output. How much durable work and income does it create?",
    introduction:
      "A factory opening can matter for supply resilience even if it supports fewer jobs than people expected. To evaluate a jobs promise, follow operating hours, real compensation and domestic value added alongside production. The article uses a study of high-skilled recruitment restrictions to show why some firms’ options extend beyond hiring locally. It then asks who captures the gains. The historical evidence is specific to the employers and policy examined; the article proposes a way to test the broader argument.",
    sources: [1, 8],
  },
  {
    slug: "democracys-achilles-heel",
    theme: "Institutions & accountability",
    cover: "review",
    hook: "Voting is one part of democratic power. What happens when a decision needs to be challenged?",
    introduction:
      "A ballot measures one act of participation. It does not tell us what it costs to understand a rule, obtain the records or appeal a decision. This article looks at those costs through the idea of contestability: can people get information, exercise rights and seek meaningful review? The US election report describes participation in a particular election. The five channels discussed in the essay are a framework for investigation; they do not establish wrongdoing by any institution.",
    sources: [1],
  },
  {
    slug: "the-server-as-a-furnace",
    theme: "Science & infrastructure",
    cover: "thermal",
    hook: "Computing creates heat. Whether a neighbour can use it depends on the design and the demand.",
    introduction:
      "Follow the heat from a computing chip to a possible customer. The path needs equipment, a nearby user, useful temperatures and a plan for periods when the customer cannot take heat. Design guidance explains why those conditions matter. The article then asks a separate public policy question: what commitments should a community expect from a facility it supports? A possible heat connection is an engineering option; a redevelopment district is an author proposal.",
    sources: [2, 3],
  },
] as const;

export const featuredInvestigations = featureNotes.map((feature) => {
  const publication = releasedGreenPublications.find((item) => item.slug === feature.slug);
  if (!publication || feature.sources.some((index) => !publication.sourceNotes[index - 1])) {
    throw new Error(`Missing released publication or source for feature: ${feature.slug}`);
  }
  return { ...feature, publication };
});

// Reader routes reuse the featured selection and its release checks above.
export const editorialEntryPoints = [
  {
    label: "Institutions & public accountability",
    slug: "democracys-achilles-heel",
    href: "/topics/politics/",
    action: "Explore institutions & accountability",
  },
  {
    label: "Economics, work & opportunity",
    slug: "factories-return-but-do-the-jobs",
    href: "/topics/economics/",
    action: "Explore economics & opportunity",
  },
  {
    label: "Science, AI & technology",
    slug: "the-last-human-workforce",
    href: "/collections/ai-work-and-infrastructure/",
    action: "Explore AI, work and infrastructure",
  },
].map((entry) => {
  const feature = featuredInvestigations.find((item) => item.slug === entry.slug);
  if (!feature) throw new Error(`Missing featured investigation for entry point: ${entry.slug}`);
  return { ...entry, publication: feature.publication };
});
