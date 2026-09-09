import { describe, it, expect } from "vitest";
import { energyScenario } from "../lib/energy-scenario";
describe("hypothetical energy scenario", () => {
  it("converts kW to MW and includes annual facility overhead exactly once", () => {
    expect(energyScenario(1000, 1, 1.2)).toEqual({ itMW: 1, facilityMWh: 10512 });
    expect(energyScenario(1, 0.5, 1)?.facilityMWh).toBeCloseTo(4.38);
    expect(energyScenario(2000, 1, 1.2)?.facilityMWh).toBe(21024);
  });
  it("rejects invalid or unbounded assumptions instead of displaying a result", () => {
    for (const args of [
      [0, 1, 1],
      [-1, 1, 1],
      [1.5, 1, 1],
      [1, 0, 1],
      [1, -1, 1],
      [1, 1, 0.9],
      [1, 1, 11],
      [Infinity, 1, 1],
      [1, NaN, 1],
      [1e10, 1, 1],
    ])
      expect(energyScenario(...(args as [number, number, number]))).toBeNull();
  });
});
