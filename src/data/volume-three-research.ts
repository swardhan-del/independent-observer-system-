/**
 * Public-safe research map for Volume III, Managed Decline.
 *
 * The titles are drawn from the read-only Volume III source inventory. Only a
 * matching public SSRN record is linked; all other entries remain deliberately
 * unlinked working-paper directions until their own public release gates pass.
 */
export type VolumeThreeResearchRecord = {
  id: string;
  title: string;
  status: "Public reading copy" | "Working-paper direction";
  lenses: string[];
  summary: string;
  whyItMatters: string;
  boundary: string;
  sourceDescription: string;
  publicDocumentId?: string;
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
    publicDocumentId: "wardhan-tax-doctrine-ssrn",
    lenses: ["Labor markets", "Taxation and ownership"],
    summary:
      "A public SSRN reading copy proposing a labor-and-capital tax framework built around time investment, wage relief, and progressive treatment of ownership income.",
    whyItMatters:
      "It gives Managed Decline a concrete policy-design case: who is recognized as carrying the cost of skill-building, how wage labor is relieved, and what administrative choices would be required.",
    boundary:
      "This is a proposal, not enacted law, official fiscal scoring, legal advice, or a claim that the model has been independently validated.",
    sourceDescription:
      "Matched public SSRN record · 42 downloads and 202 abstract views when last checked",
  },
  {
    id: "vietnam-terry-ohio",
    title: "From Vietnam to Terry v. Ohio: Investing in Human Failure vs. Human Potential",
    status: "Working-paper direction",
    lenses: ["Welfare and social control", "Public visibility", "Labor markets"],
    summary:
      "A Volume III source direction connecting Vietnam veterans’ reintegration needs, Terry v. Ohio, discretionary policing, and the institutional choices that can make hardship visible as enforcement rather than as a capacity problem.",
    whyItMatters:
      "The line of inquiry asks how employment, reintegration, welfare, public records, and policing interact when institutions respond to unmet human potential. It gives the volume a historical mechanism to test rather than a single-cause explanation of mass incarceration.",
    boundary:
      "The source remains private working material. The public page uses a bounded research description and does not reproduce the manuscript, private notes, or personal records.",
    sourceDescription: "Matched Volume III source record · public reading copy not yet cleared",
  },
  {
    id: "welfare-wealthfare-social-control",
    title: "Welfare, Wealthfare, and Social Control in Advanced Democracies",
    status: "Working-paper direction",
    lenses: ["Welfare and social control", "Labor markets", "Public visibility"],
    summary:
      "A working-paper direction about deindustrialization, blocked education and employment, welfare administration, surveillance, punishment, and the distribution of economic insecurity.",
    whyItMatters:
      "It makes the volume’s central question legible: whether public systems restore social citizenship or manage a population’s constrained choices through assistance, monitoring, and punishment.",
    boundary:
      "“Open-air prison” is an analytical hypothesis in the source, not a literal description of every neighborhood. The page does not present the hypothesis as a verified finding.",
    sourceDescription: "Matched Volume III source record · public reading copy not yet cleared",
  },
  {
    id: "prescription-pad-to-power",
    title: "From Prescription Pad to Power",
    status: "Working-paper direction",
    lenses: ["Health systems", "Licensing and access", "Public visibility"],
    summary:
      "A health-and-human-capital source direction examining how prescribing, medical labor, and institutional access may allocate practical power.",
    whyItMatters:
      "Health systems are part of Managed Decline because access to care, professional authority, and the visibility of need can shape whether a person can remain able to work and participate.",
    boundary:
      "This entry identifies a research direction from the Volume III inventory; it does not assert a medical finding, provide clinical guidance, or reproduce an unverified source claim.",
    sourceDescription:
      "Matched Volume III health-and-human-capital source record · public reading copy not yet cleared",
  },
  {
    id: "ious-to-dos",
    title:
      "From IOUs to DOs: The Macroeconomic Chain Linking Federal Reserve Debt Instruments, Tariff Policy, and Domestic Medical Labor",
    status: "Working-paper direction",
    lenses: ["Health systems", "Labor markets", "Taxation and ownership"],
    summary:
      "A macroeconomy and medical-labor source direction tracing a proposed relationship among debt instruments, tariff policy, and domestic medical work in a changing monetary order.",
    whyItMatters:
      "It widens the volume’s lens from household policy to infrastructure: macroeconomic choices can shape the cost, supply, and visibility of essential work without appearing as a labor-market decision.",
    boundary:
      "The relationship is presented as a research question, not as a verified causal chain or current economic forecast. The private source file is not linked or copied.",
    sourceDescription:
      "Matched Volume III macroeconomy source record · public reading copy not yet cleared",
  },
  {
    id: "perception-proxy",
    title: "The Perception Proxy",
    status: "Working-paper direction",
    lenses: ["Public visibility", "Licensing and access", "Welfare and social control"],
    summary:
      "A public-visibility source direction asking how proxies for direct evidence shape institutional attention, classification, and the treatment of people who are difficult to see in official systems.",
    whyItMatters:
      "Managed Decline needs a visibility test: a person can be counted, licensed, audited, or surveilled without the underlying conditions of insecurity becoming understandable to decision-makers.",
    boundary:
      "The title marks an open research direction. No perception measure, score, or empirical result is asserted on this page.",
    sourceDescription: "Matched Volume III source record · public reading copy not yet cleared",
  },
];
