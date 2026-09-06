/**
 * Stable public-family identifiers. A family is the canonical public entity;
 * titles, slugs, candidate keys, and archive labels are aliases of it.
 */
export const archiveFamilyIds = {
  illusionOfEquality: "IO-FAMILY-ILLUSION-OF-EQUALITY",
  empireOfDistraction: "IO-FAMILY-EMPIRE-OF-DISTRACTION",
  lotteryOfLuck: "IO-FAMILY-LOTTERY-OF-LUCK",
  lastHumanWorkforce: "IO-FAMILY-LAST-HUMAN-WORKFORCE",
  regrowingHumanity: "IO-FAMILY-REGROWING-HUMANITY",
  serverAsFurnace: "IO-FAMILY-SERVER-AS-FURNACE",
  borrowedLabor: "IO-FAMILY-BORROWED-LABOR",
  democracysAchillesHeel: "IO-FAMILY-DEMOCRACYS-ACHILLES-HEEL",
  independentObserverMethod: "IO-FAMILY-INDEPENDENT-OBSERVER-METHOD",
} as const;

const aliasToFamilyId: Record<string, string> = {
  "the-illusion-of-equality": archiveFamilyIds.illusionOfEquality,
  "illusion-of-equality": archiveFamilyIds.illusionOfEquality,
  "the-empire-of-distraction": archiveFamilyIds.empireOfDistraction,
  "empire-of-distraction": archiveFamilyIds.empireOfDistraction,
  "empire-distraction": archiveFamilyIds.empireOfDistraction,
  "the-lottery-of-luck": archiveFamilyIds.lotteryOfLuck,
  "lottery-of-luck": archiveFamilyIds.lotteryOfLuck,
  "the-last-human-workforce": archiveFamilyIds.lastHumanWorkforce,
  "last-human-workforce": archiveFamilyIds.lastHumanWorkforce,
  "io-v4-last-human-workforce": archiveFamilyIds.lastHumanWorkforce,
  "the-last-human-workforce-candidate": archiveFamilyIds.lastHumanWorkforce,
  "regrowing-humanity": archiveFamilyIds.regrowingHumanity,
  "io-v4-regrowing-humanity": archiveFamilyIds.regrowingHumanity,
  "server-as-a-furnace": archiveFamilyIds.serverAsFurnace,
  "io-v3-server-as-furnace": archiveFamilyIds.serverAsFurnace,
  "borrowed-labor": archiveFamilyIds.borrowedLabor,
  "io-v2-borrowed-labor": archiveFamilyIds.borrowedLabor,
  "democracys-achilles-heel": archiveFamilyIds.democracysAchillesHeel,
  "democracys-achilles-heel-candidate": archiveFamilyIds.democracysAchillesHeel,
  "io-v2-democracys-achilles-heel": archiveFamilyIds.democracysAchillesHeel,
  "the-independent-observer-method": archiveFamilyIds.independentObserverMethod,
  "the-independent-observer-method-candidate": archiveFamilyIds.independentObserverMethod,
  "io-v1-independent-observer-method": archiveFamilyIds.independentObserverMethod,
  "children-left-behind-after-a-war": "IO-FAMILY-CHILDREN-LEFT-BEHIND",
  "children-left-behind": "IO-FAMILY-CHILDREN-LEFT-BEHIND",
  "american-empire-was-never-a-democracy": "IO-FAMILY-AMERICAN-EMPIRE-NEVER-DEMOCRACY",
  "american-empire-never-democracy": "IO-FAMILY-AMERICAN-EMPIRE-NEVER-DEMOCRACY",
  "from-colonization-to-chinas-rise": "IO-FAMILY-FROM-COLONIZATION-TO-CHINAS-RISE",
  "from-colonization-to-china": "IO-FAMILY-FROM-COLONIZATION-TO-CHINAS-RISE",
  "from-vietnam-to-terry-ohio": "IO-FAMILY-FROM-VIETNAM-TO-TERRY-OHIO",
  "from-vietnam-terry": "IO-FAMILY-FROM-VIETNAM-TO-TERRY-OHIO",
  "quantum-advantage-primer": "IO-FAMILY-QUANTUM-ADVANTAGE-PRIMER",
  "entanglement-primer": "IO-FAMILY-QUANTUM-ADVANTAGE-PRIMER",
  "quantum-advantage-foundations": "IO-FAMILY-QUANTUM-ADVANTAGE-FOUNDATIONS",
  "entanglement-foundations": "IO-FAMILY-QUANTUM-ADVANTAGE-FOUNDATIONS",
  "quantum-computing-antimatter-energy-revolution": "IO-FAMILY-QUANTUM-ANTIMATTER",
  "quantum-antimatter": "IO-FAMILY-QUANTUM-ANTIMATTER",
  "when-real-science-becomes-science-fiction":
    "IO-FAMILY-WHEN-REAL-SCIENCE-BECOMES-SCIENCE-FICTION",
  "when-real-science-fiction": "IO-FAMILY-WHEN-REAL-SCIENCE-BECOMES-SCIENCE-FICTION",
  "capital-amplification-equal-opportunity": "IO-FAMILY-CAPITAL-AMPLIFICATION",
  "capital-amplification": "IO-FAMILY-CAPITAL-AMPLIFICATION",
  "programmable-gene-silencing-governance": "IO-FAMILY-PROGRAMMABLE-GENE-SILENCING",
  "programmable-gene-silencing": "IO-FAMILY-PROGRAMMABLE-GENE-SILENCING",
  "environmental-instability-early-homo": "IO-FAMILY-ENVIRONMENTAL-INSTABILITY",
  "environmental-instability": "IO-FAMILY-ENVIRONMENTAL-INSTABILITY",
  "human-rights-policing-hidden-taxation": "IO-FAMILY-HIDDEN-TAXATION",
  "hidden-taxation": "IO-FAMILY-HIDDEN-TAXATION",
  "heavy-water-data-center-coolant-feasibility": "IO-FAMILY-HEAVY-WATER-DATA-CENTER-COOLANT",
  "rival-west-built": "IO-FAMILY-RIVAL-WEST-BUILT",
  "the-rival-the-west-built": "IO-FAMILY-RIVAL-WEST-BUILT",
};

function normalizeFamilyKey(value: string) {
  return value
    .trim()
    .toLocaleLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function familyIdForKey(value: string) {
  const normalized = normalizeFamilyKey(value);
  return (
    aliasToFamilyId[normalized] ?? `IO-FAMILY-${normalized.replace(/-/g, "_").toLocaleUpperCase()}`
  );
}

export type FamilyRelationshipLabel = "same-subfolder" | "same-volume" | "approved-cross-volume";

export type ApprovedFamilyRelationship = {
  fromFamilyId: string;
  toFamilyId: string;
  label: FamilyRelationshipLabel;
};

export const approvedFamilyRelationships: ApprovedFamilyRelationship[] = [
  {
    fromFamilyId: archiveFamilyIds.lastHumanWorkforce,
    toFamilyId: archiveFamilyIds.serverAsFurnace,
    label: "approved-cross-volume",
  },
  {
    fromFamilyId: archiveFamilyIds.lastHumanWorkforce,
    toFamilyId: archiveFamilyIds.regrowingHumanity,
    label: "approved-cross-volume",
  },
  {
    fromFamilyId: archiveFamilyIds.serverAsFurnace,
    toFamilyId: archiveFamilyIds.lastHumanWorkforce,
    label: "approved-cross-volume",
  },
  {
    fromFamilyId: archiveFamilyIds.regrowingHumanity,
    toFamilyId: archiveFamilyIds.lastHumanWorkforce,
    label: "approved-cross-volume",
  },
  {
    fromFamilyId: archiveFamilyIds.independentObserverMethod,
    toFamilyId: archiveFamilyIds.democracysAchillesHeel,
    label: "approved-cross-volume",
  },
  {
    fromFamilyId: archiveFamilyIds.democracysAchillesHeel,
    toFamilyId: archiveFamilyIds.independentObserverMethod,
    label: "approved-cross-volume",
  },
];

export function explicitRelatedFamilyIds(familyId?: string) {
  if (!familyId) return [];
  return approvedFamilyRelationships
    .filter((relationship) => relationship.fromFamilyId === familyId)
    .map((relationship) => relationship.toFamilyId);
}
