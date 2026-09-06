import { archiveFamilyIds } from "./family-registry";

export type PlacementDecision = {
  status: "resolved" | "held";
  canonicalVolume: string | null;
  canonicalCategory: string | null;
  canonicalSubfolder: string | null;
  ownerApprovalRequired: boolean;
  reason: string;
};

const heldPlacementReason =
  "Archive controller evidence is not a single owner-approved placement; publication taxonomy is held pending an explicit decision.";

export const unresolvedPlacementDecisions: Record<string, PlacementDecision> = {
  [archiveFamilyIds.illusionOfEquality]: {
    status: "held",
    canonicalVolume: null,
    canonicalCategory: null,
    canonicalSubfolder: null,
    ownerApprovalRequired: true,
    reason: heldPlacementReason,
  },
  [archiveFamilyIds.empireOfDistraction]: {
    status: "held",
    canonicalVolume: null,
    canonicalCategory: null,
    canonicalSubfolder: null,
    ownerApprovalRequired: true,
    reason: heldPlacementReason,
  },
  [archiveFamilyIds.lotteryOfLuck]: {
    status: "held",
    canonicalVolume: null,
    canonicalCategory: null,
    canonicalSubfolder: null,
    ownerApprovalRequired: true,
    reason: heldPlacementReason,
  },
};

export function placementDecisionFor(
  familyId: string,
  currentVolume?: string,
  currentCategory?: string,
): PlacementDecision {
  return (
    unresolvedPlacementDecisions[familyId] ?? {
      status: "resolved",
      canonicalVolume: currentVolume ?? null,
      canonicalCategory: currentCategory ?? null,
      canonicalSubfolder: null,
      ownerApprovalRequired: false,
      reason: "Current public taxonomy is retained as the reviewed controller classification.",
    }
  );
}

export const unresolvedPlacementFamilyIds = new Set(Object.keys(unresolvedPlacementDecisions));
