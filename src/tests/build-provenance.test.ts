import { describe, expect, it } from "vitest";
import { resolveCommitSha } from "../lib/build-provenance";
describe("build provenance", () => {
  it("skips missing, blank and malformed values in priority order", () => {
    expect(
      resolveCommitSha(
        [undefined, " ", "unknown", "invalid", ` ${"a".repeat(40)} `, "b".repeat(40)],
        true,
      ),
    ).toBe("a".repeat(40));
  });
  it("fails closed in production and marks unidentified local builds explicitly", () => {
    expect(resolveCommitSha([undefined, ""])).toBe("unknown");
    expect(() => resolveCommitSha([undefined, "bad"], true)).toThrow();
  });
});
