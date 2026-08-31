import type { ControlledPublicationStatus } from "./publication-registry";

export type ClearanceQueueItem = {
  id: string;
  title: string;
  volume: "Volume I" | "Volume II" | "Volume III" | "Volume IV" | null;
  priority: "priority" | "second_wave";
  status: ControlledPublicationStatus;
  manuscriptTextIncluded: false;
  publicRoute: null;
  releaseDecision: "item_level_clearance_required";
};

const item = (
  id: string,
  title: string,
  volume: ClearanceQueueItem["volume"],
  priority: ClearanceQueueItem["priority"],
): ClearanceQueueItem => ({
  id,
  title,
  volume,
  priority,
  status: "working_paper",
  manuscriptTextIncluded: false,
  publicRoute: null,
  releaseDecision: "item_level_clearance_required",
});

/** Metadata-only queue; no manuscript text is intentionally exposed. */
export const nextClearanceQueue: ClearanceQueueItem[] = [
  item(
    "when-real-science-becomes-science-fiction",
    "When Real Science Becomes Science Fiction",
    "Volume IV",
    "priority",
  ),
  item(
    "quantum-computing-antimatter-energy-revolution",
    "Quantum Computing, Antimatter, and the Next Energy Revolution",
    "Volume IV",
    "priority",
  ),
  item("the-rival-the-west-built", "The Rival the West Built", null, "priority"),
  item(
    "capital-amplification-equal-opportunity",
    "Capital Amplification and the Myth of Equal Opportunity",
    "Volume I",
    "second_wave",
  ),
  item(
    "attention-infrastructure-gap",
    "The Attention Infrastructure Gap",
    "Volume I",
    "second_wave",
  ),
  item(
    "programmable-gene-silencing-governance",
    "Programmable Gene Silencing Governance",
    "Volume IV",
    "second_wave",
  ),
  item(
    "environmental-instability-early-homo",
    "Environmental Instability and Early Homo",
    "Volume IV",
    "second_wave",
  ),
  item(
    "american-empire-was-never-a-democracy",
    "American Empire Was Never a Democracy",
    "Volume II",
    "second_wave",
  ),
  item(
    "human-rights-policing-hidden-taxation",
    "Human Rights, Policing, and Hidden Taxation",
    "Volume II",
    "second_wave",
  ),
  item("how-empires-fail", "How Empires Fail", "Volume II", "second_wave"),
  item(
    "from-mao-to-manufacturing-sovereignty",
    "From Mao to Manufacturing Sovereignty",
    "Volume II",
    "second_wave",
  ),
  item(
    "heavy-water-data-center-coolant-feasibility",
    "Heavy Water Data Center Coolant Feasibility Study",
    "Volume III",
    "second_wave",
  ),
];
