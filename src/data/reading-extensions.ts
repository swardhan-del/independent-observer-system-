import type { PublicDocumentSection, PublicCitation } from "./documents";
export const readingExtensions: Record<string, PublicDocumentSection[]> = {
  "entanglement-primer": [
    {
      id: "worked-example",
      heading: "Can Alice send a message by flipping her qubit?",
      paragraphs: [
        "Imagine many pairs prepared in the Bell state (|00⟩ + |11⟩)/√2. The first digit belongs to Alice and the second to Bob. Both measure in the computational basis. Alice either leaves her qubit alone (I) or applies a bit flip (X).",
        "The joint predictions change, but Bob's local probabilities do not. The table is an original worked illustration; a finite run can be uneven by chance.",
      ],
      table: {
        caption: "Predicted results for an ideal Bell pair — not experimental data",
        headers: ["Alice's choice", "Joint results (Alice, Bob)", "Bob sees 0", "Bob sees 1"],
        rows: [
          ["Leave it alone (I)", "00 or 11, each with probability 1/2", "1/2", "1/2"],
          ["Apply a bit flip (X)", "01 or 10, each with probability 1/2", "1/2", "1/2"],
        ],
      },
    },
    {
      id: "worked-example-limits",
      heading: "What Bob can learn",
      paragraphs: [
        "Bob cannot read Alice's choice from these local measurements: both choices give the same distribution. Comparing their records later reveals matching or opposite results, but that comparison needs communication.",
        "This illustrates one failed signalling scheme. It is not a proof of the general no-signalling theorem, and these same-basis rows alone are not a Bell-inequality test; shared classical randomness could reproduce them.",
        "Quantum teleportation transfers quantum information using shared entanglement and two classical bits. It does not transport matter. IBM's protocol shows where those bits enter the correction step.",
      ],
      evidenceIds: ["ibm-teleportation"],
    },
  ],
  "wardhan-tax-doctrine": [
    {
      id: "balance-sheet-example",
      heading: "Worked example: cash is not the same as net wealth",
      paragraphs: [
        "Consider an invented balance sheet with an asset worth 100 units, no cash and no debt. A loan of 20 units adds 20 cash and 20 debt. Net wealth remains 100 at that instant. If the 20 cash is then consumed, 80 remains before interest, fees or changes in asset value.",
      ],
      table: {
        caption: "Fictional accounting illustration — no tax calculation",
        headers: ["Position", "Asset value", "Cash", "Debt", "Net wealth"],
        rows: [
          ["Before borrowing", "100", "0", "0", "100"],
          ["After borrowing", "100", "20", "20", "100"],
          ["After consuming the borrowed cash", "100", "0", "20", "80"],
        ],
      },
    },
    {
      id: "balance-sheet-limits",
      heading: "Keep the accounting and tax questions separate",
      paragraphs: [
        "This example explains liquidity and liabilities, not the tax treatment of a loan, a sale or an estate. It assumes consumption leaves no resale asset and ignores interest, fees and price changes. It supplies no personal financing recommendation.",
        "To assess a real tax claim, identify the jurisdiction, date, transaction and applicable primary authority. The author's reform proposals on this page are proposals, not enacted rules.",
      ],
    },
  ],
};
export const extensionEvidence: Record<string, PublicCitation[]> = {
  "entanglement-primer": [
    {
      id: "ibm-teleportation",
      label: "IBM Quantum Learning",
      citation:
        "Quantum teleportation: introduction and Protocol. Shared entanglement plus two classical bits; the receiver's conditional corrections. Checked 9 September 2026. The I/X table is an original illustration, not IBM experimental data.",
      url: "https://quantum.cloud.ibm.com/learning/en/courses/basics-of-quantum-information/entanglement-in-action/quantum-teleportation",
    },
  ],
};
