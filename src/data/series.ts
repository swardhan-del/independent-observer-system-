import type { EditorialStatus } from "./content";

/**
 * Public-safe roadmap metadata derived from the Dropbox review package dated
 * 2026-08-15. These are review candidates, not publication or KDP approvals.
 */
export type SeriesItem = {
  volume: string;
  title: string;
  category: string;
  description: string;
  status: EditorialStatus;
};

export const seriesItems: SeriesItem[] = [
  {
    volume: "Volume I",
    title: "Independent Observer",
    category: "Democratic capacity",
    description:
      "Volume I is the method anchor for the Independent Observer series. It is about how a public claim becomes believable: what was observed, which sources support it, what context or contradiction is missing, how interpretation becomes argument, and how uncertainty is recorded. It brings law, labor, media, history, public memory, and democratic practice into one framework so readers can follow not only a conclusion but the path that produced it. Its central question is whether people can use and correct their institutions in practice, not merely whether those institutions are formally legitimate. The volume represents disciplined observation before judgment and is intended to establish the evidence, memory, and accountability standards used by the later volumes. It remains a review-stage catalogue entry, not a finished publication.",
    status: "In editorial development",
  },
  {
    volume: "Volume II",
    title: "The Empire Beneath Democracy",
    category: "Sovereignty and interdependence",
    description:
      "Volume II is the power inquiry of the Independent Observer series: it studies how authority can remain formally democratic while becoming materially managed. Its research map brings together four families—democracy, institutions, and party power; immigration, citizenship, and border; civil rights, the carceral state, and legal power; and empire, geopolitics, and sovereignty. Across those families, the volume asks who can set the agenda, who is exposed to enforcement, whose membership is recognized, which definitions make a statistic meaningful, and how capital, technology, security, labor, markets, and alliances shape practical sovereignty. It represents the inquiry beneath constitutional language, party rotation, and national claims of independence: the operating arrangements that narrow or expand usable public power. This remains a concept-stage catalogue entry, not a finished publication.",
    status: "Concept preview",
  },
  {
    volume: "Volume III",
    title: "Managed Decline",
    category: "Work and social citizenship",
    description:
      "A concept-stage account of Managed Decline: how the Western industrial order moved from steel mills, mass production, and stable wage institutions toward screen-based, service, platform, and data work—and how that transition redistributes time, security, and economic opportunity. Volume III studies labor markets, licensing, welfare, taxation, health systems, and public visibility, asking whether administrative systems restore social citizenship or manage constrained choices. Its research map connects the public reading copy The Wardhan Tax Doctrine with bounded working-paper directions including From Steel to Screens, From Vietnam to Terry v. Ohio: Investing in Human Failure vs. Human Potential, and Welfare, Wealthfare, and Social Control in Advanced Democracies. These are research directions and reading links, not a claim that every manuscript is a released publication.",
    status: "Concept preview",
  },
  {
    volume: "Volume IV",
    title: "The Last Human Workforce",
    category: "AI and human capability",
    description:
      "A review-stage framework for task exposure, augmentation, education, scientific capacity, and institutional adaptation in the age of AI.",
    status: "In editorial development",
  },
];
