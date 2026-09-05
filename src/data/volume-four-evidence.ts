/**
 * Public-safe evidence layers for Volume IV, The Last Human Workforce.
 *
 * These statements explain the capability inquiry represented by the public
 * catalogue entry. They distinguish the catalogue's synthesis from the
 * working papers and technical claims that still require review.
 */
export const volumeFourEvidence = [
  {
    category: "Documented fact",
    text: "The public catalogue identifies The Last Human Workforce as Volume IV's capability inquiry. Its scope includes AI, automation, scientific infrastructure, energy, quantum computing, medical technology, neuroprosthetics, education, intimacy, and human evolution. The entry remains in editorial development; it is not a finished publication. The public library connects the volume to reading copies on digital intimacy, biological timing and care, education in an AI economy, and quantum information and infrastructure. Those records are labeled as public author papers; their usage signals are discovery metadata, not peer review or technical validation.",
    source: {
      label: "Browse Volume IV's public records",
      href: "/library/",
      internal: true,
    },
  },
  {
    category: "Interpretation",
    text: "Volume IV reads technological change as a systems problem rather than a software-only story. A tool becomes usable human capability only through the surrounding conditions of compute, energy, data, maintenance, scientific knowledge, education, care, institutional rules, and the people who can understand and repair it.",
  },
  {
    category: "Hypothesis",
    text: "When infrastructure, training, care, and governance are accessible and accountable, technological change may expand practical human agency. When those conditions remain concentrated, opaque, or difficult to repair, the same technologies may increase dependency and distribute their gains unevenly. This is a research hypothesis, not an established causal finding.",
  },
  {
    category: "Policy proposal",
    text: "The Volume IV map raises possible policy tests around AI and data literacy, lifelong re-skilling, scientific standards, post-quantum security, accessible medical and neuroprosthetic care, infrastructure maintenance, and protections for intimacy and agency. These are directions for comparison and review, not enacted policy or a final recommendation.",
  },
  {
    category: "Limitation",
    text: "This layer is a public editorial synthesis of a developing volume. It does not establish that any forecast will occur, reproduce private manuscripts, certify a medical or quantum claim, or substitute for current primary research, technical testing, clinical review, or the full source trail.",
  },
  {
    category: "Counterargument",
    text: "Technological change can create useful capability through private investment, lower costs, open tools, scientific discovery, and user adaptation before public institutions catch up. A complete account must test those routes alongside concerns about concentration, maintenance, access, and governance rather than assuming one outcome.",
  },
  {
    category: "Unresolved question",
    text: "What evidence would show that a new system expands capability rather than merely shifting work and risk: time saved, health, learning, secure employment, autonomy, equitable access, repairability, resilience, or the ability to challenge an automated decision? Volume IV leaves those measures open for later research and review.",
  },
] as const;

export const volumeFourClaimMap = {
  claim:
    "Technological progress becomes human capability only when the systems around it are understandable, maintainable, teachable, and governed for human agency.",
  evidence:
    "The public Volume IV record joins research on AI and education, quantum systems, infrastructure, care, intimacy, and embodied capability while keeping each record's preprint or preview status visible.",
  mechanism:
    "Compute, energy, data, scientific infrastructure, training, care, and maintenance determine who can use a technology, who can repair it, and whether its benefits remain usable beyond an initial demonstration.",
  counterargument:
    "Private investment, open tools, lower costs, and individual adaptation may expand capability even when institutions are slow to change; those pathways require comparison with public provision and governance.",
  limitation:
    "This map describes Volume IV's developing research logic. It is not a peer-reviewed thesis, a medical or engineering certification, a deployment forecast, or evidence that a proposed policy has produced an outcome.",
} as const;
