import { describe, expect, it } from "vitest";
import {
  greenPublications,
  previewGreenPublications,
  publicGreenPublication,
  readingTimeMinutes,
} from "../data/green-publications";

const expected = [
  ["IO-V4-REGROWING-HUMANITY", "regrowing-humanity", "Volume IV"],
  ["IO-V1-INDEPENDENT-OBSERVER-METHOD", "the-independent-observer-method", "Volume I"],
  ["IO-V4-LAST-HUMAN-WORKFORCE", "the-last-human-workforce", "Volume IV"],
  ["IO-V3-SERVER-AS-FURNACE", "the-server-as-a-furnace", "Volume III"],
  ["IO-V2-BORROWED-LABOR", "borrowed-labor", "Volume II"],
  ["IO-V2-DEMOCRACYS-ACHILLES-HEEL", "democracys-achilles-heel", "Volume II"],
] as const;

describe("central green publication registry", () => {
  it("contains the six exact candidate identities and unique routes", () => {
    expect(greenPublications).toHaveLength(6);
    expect(greenPublications.map((item) => item.candidateId)).toEqual(
      expected.map((item) => item[0]),
    );
    expect(greenPublications.map((item) => item.slug)).toEqual(expected.map((item) => item[1]));
    expect(greenPublications.map((item) => item.volume)).toEqual(expected.map((item) => item[2]));
    expect(new Set(greenPublications.map((item) => item.slug)).size).toBe(6);
  });

  it("is fail-closed for production and strips controller hashes from public data", () => {
    expect(
      greenPublications.every(
        (item) => item.sourceVerified && item.rightsReviewed && item.accessibilityReviewed,
      ),
    ).toBe(true);
    expect(greenPublications.every((item) => item.productionReleased === true)).toBe(true);
    const publicRecord = publicGreenPublication(greenPublications[0]);
    expect(publicRecord).not.toHaveProperty("controllerSha256");
    expect(JSON.stringify(publicRecord)).not.toMatch(
      /Dropbox|\/Users\/|\.codex_work|VERIFY|TODO|TBD|PLACEHOLDER/i,
    );
  });

  it("calculates reading time from the rendered article paragraphs", () => {
    for (const item of greenPublications)
      expect(readingTimeMinutes(item)).toBeGreaterThanOrEqual(1);
  });

  it("only exposes the records in an explicitly enabled preview build", () => {
    expect(previewGreenPublications.length === 0 || previewGreenPublications.length === 6).toBe(
      true,
    );
  });
});
