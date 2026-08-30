/**
 * Public-safe evidence layers for the Volume I method anchor.
 *
 * These statements explain the public reading copy and its research logic
 * without presenting a working paper as a peer-reviewed finding or a released
 * publication.
 */
export const volumeOneEvidence = [
  {
    category: "Documented fact",
    text: "The public Volume I reading copy describes the Foundational Manifesto as a systems-level method paper joining law, labor, media, evidence, institutional constraints, and democratic capacity. It separates factual records, interpretation, policy design, and unresolved questions. Its last directly verified SSRN usage signal was 23 downloads and 113 abstract views on 25 August 2026; these are usage counts, not quality ratings.",
  },
  {
    category: "Interpretation",
    text: "The Volume I method treats information asymmetry and institutional design as political-economy conditions: the force of a public claim depends not only on what happened but on whether people can access records, understand definitions, contest interpretations, and use institutions to correct errors.",
  },
  {
    category: "Hypothesis",
    text: "If public arguments expose source selection, definitions, missing context, contradiction, and uncertainty, readers may be better able to test and correct them. Volume I frames this as a research hypothesis, not a causal finding.",
  },
  {
    category: "Policy proposal",
    text: "The practical proposal is a method of public work: preserve originals and chronology; distinguish record, interpretation, hypothesis, policy proposal, and unresolved question; show the source trail and its limits; and leave a correction route open. This is an editorial and research standard, not enacted policy or legal advice.",
  },
  {
    category: "Limitation",
    text: "The Foundational Manifesto is an early working paper and public reading copy, not a peer-reviewed conclusion. Its usage signal does not establish quality, causal impact, institutional adoption, or full-series publication; other mapped manuscripts are not included unless matched to a public record and release status.",
  },
  {
    category: "Counterargument",
    text: "Making sources and limits visible may improve accountability, but transparency alone cannot equalize time, safety, resources, media attention, institutional access, or missing records. A visible method can still be ignored, misread, or delayed by the systems it studies.",
  },
  {
    category: "Unresolved question",
    text: "Can this method increase usable democratic capacity when people lack time, security, trustworthy information, or a responsive institution? Volume I leaves that empirical question open for later papers and evidence.",
  },
] as const;

export const volumeOneClaimMap = {
  claim:
    "A public claim becomes more correctable when its evidence, definitions, interpretation, and limits remain visible.",
  evidence:
    "The Foundational Manifesto makes evidence, information asymmetry, institutional design, public reasoning, and democratic capacity its method vocabulary. The public record links to the SSRN entry; the last direct usage check recorded 23 downloads and 113 abstract views on 25 August 2026, which are usage counts rather than proof.",
  mechanism:
    "Separating record from interpretation lets readers inspect what was observed, what was inferred, and what is missing; preserving contradiction and uncertainty creates a route for challenge before a conclusion hardens into institutional or media shorthand.",
  counterargument:
    "Correctable reasoning still depends on unequal attention, resources, safety, institutional access, and responsive correction channels. A method can make a claim legible without making power equal.",
  limitation:
    "This map explains Volume I’s method and research logic; it is not a peer-reviewed thesis, an empirical proof of institutional effects, or a substitute for the full manuscript and source trail.",
} as const;
