/**
 * Public-safe, source-labeled evidence layers for the Volume III case study.
 *
 * The record is a public SSRN reading copy. The layers distinguish what the
 * record says from editorial interpretation, hypotheses, and review questions;
 * they do not turn a working paper into an approved publication.
 */
export const volumeThreeTaxDoctrineEvidence = [
  {
    category: "Documented fact",
    text: "The public SSRN record identifies The Wardhan Tax Doctrine as abstract 5477606, posted 3 October 2025. The site's last checked signal records 42 downloads and 202 abstract views; those are usage counts, not quality ratings.",
    source: {
      label: "Open the SSRN public record",
      href: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5477606",
    },
  },
  {
    category: "Interpretation",
    text: "Within Volume III, the paper can be read as a test of whether tax administration recognizes the time and resources required to build skills, rather than treating that investment as an invisible private burden.",
  },
  {
    category: "Hypothesis",
    text: "If a tax system recognizes documented time investment while relieving low-to-moderate wage earners, it may reduce one source of economic insecurity. That relationship remains a hypothesis to test, not an established outcome.",
  },
  {
    category: "Policy proposal",
    text: "The paper proposes a refundable time-investment credit, targeted W-2 relief, and narrower treatment of selected capital preferences, alongside eligibility, reporting, documentation, and audit rules.",
    source: {
      label: "Read the public Volume III copy",
      href: "/library/documents/wardhan-tax-doctrine-ssrn/",
      internal: true,
    },
  },
  {
    category: "Limitation",
    text: "This is a policy working paper, not enacted law, an official revenue score, individualized tax advice, or an independently validated finding. Its public usage signal cannot establish whether the proposed effects occur.",
  },
  {
    category: "Counterargument",
    text: "A credit tied to time investment could be difficult to administer or easier for people with existing resources to claim. A full review must test eligibility, distributional effects, fraud controls, and alternatives rather than assuming relief is equally reachable.",
  },
  {
    category: "Unresolved question",
    text: "What evidence would show that the proposal improves social citizenship and labor-market access without expanding surveillance, administrative burden, or unequal treatment?",
  },
] as const;

export const volumeThreeTaxDoctrineClaimMap = {
  claim: "Recognizing time investment in tax design could reduce pressure on wage labor.",
  evidence:
    "The public paper proposes a refundable time-investment credit, W-2 relief, and capital-preference reform.",
  mechanism:
    "Eligibility and reporting rules would convert documented skill-building time into a possible tax benefit.",
  counterargument:
    "Administrative complexity and unequal access could make the benefit regressive or expand surveillance.",
  limitation:
    "No official fiscal score or causal outcome evidence is supplied by the public reading copy.",
} as const;
