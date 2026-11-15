import { volumeThreePreviews } from "./volume-three-previews";

/**
 * Public-safe research map for Volume III, Managed Decline.
 *
 * The titles are drawn from the read-only Volume III source inventory. Public reading copies retain their existing routes; research directions link
 * to bounded previews without releasing the underlying manuscripts.
 */
export type VolumeThreeResearchRecord = {
  id: string;
  title: string;
  status: "Public reading copy" | "Research preview · manuscript under review";
  lenses: string[];
  summary: string;
  whyItMatters: string;
  boundary: string;
  sourceDescription: string;
  publicDocumentId?: string;
  previewHref?: string;
  primaryVolume?: string;
};

export const volumeThreeResearchLenses = [
  "Labor markets",
  "Licensing and access",
  "Welfare and social control",
  "Taxation and ownership",
  "Health systems",
  "Public visibility",
] as const;

export const volumeThreeResearchRecords: VolumeThreeResearchRecord[] = [
  {
    id: "wardhan-tax-doctrine",
    title: "The Wardhan Tax Doctrine",
    status: "Public reading copy",
    publicDocumentId: "wardhan-tax-doctrine",
    lenses: ["Labor markets", "Taxation and ownership"],
    summary:
      "A public author paper page proposing a labor-and-capital tax framework built around time investment, wage relief, and progressive treatment of ownership income.",
    whyItMatters:
      "It gives Managed Decline a concrete policy-design case: who is recognized as carrying the cost of skill-building, how wage labor is relieved, and what administrative choices would be required.",
    boundary:
      "This is a proposal, not enacted law, official fiscal scoring, legal advice, or a claim that the model has been independently validated.",
    sourceDescription:
      "Matched public paper record · 42 downloads and 202 abstract views when last checked",
  },
  {
    id: "vietnam-terry-ohio",
    title: "From Vietnam to Terry v. Ohio: Investing in Human Failure vs. Human Potential",
    status: "Public reading copy",
    publicDocumentId: "from-vietnam-to-terry-ohio",
    lenses: ["Welfare and social control", "Public visibility", "Labor markets"],
    summary:
      "An author-controlled working-paper synopsis connecting Vietnam veterans’ reintegration needs, Terry v. Ohio, discretionary policing, and the institutional choices that can make hardship visible as enforcement rather than as a capacity problem.",
    whyItMatters:
      "The line of inquiry asks how employment, reintegration, welfare, public records, and policing interact when institutions respond to unmet human potential. It gives the volume a historical mechanism to test rather than a single-cause explanation of mass incarceration.",
    boundary:
      "The public paper record is available as a reading entry, while the matching source material remains outside the website. The public page does not reproduce the manuscript, private notes, or personal records.",
    sourceDescription:
      "Matched public paper record · 13 downloads and 56 abstract views when last checked on 31 August 2026",
  },
  ...volumeThreePreviews.map((entry) => ({
    id: entry.id,
    title: entry.title,
    status: entry.status as "Research preview · manuscript under review",
    lenses: entry.lenses,
    summary: entry.summary,
    whyItMatters: entry.contribution,
    boundary: entry.evidenceNeeded,
    sourceDescription: "Public research-map summary · full manuscript under review",
    previewHref: entry.href,
    primaryVolume: entry.volume,
  })),
];
