import { describe, expect, it } from "vitest";
import { promptLibrary } from "../data/prompt-library";

describe("public prompt library", () => {
  it("contains uniquely addressable, non-empty public-safe templates", () => {
    expect(promptLibrary.length).toBeGreaterThanOrEqual(8);
    expect(new Set(promptLibrary.map((prompt) => prompt.id)).size).toBe(promptLibrary.length);

    for (const prompt of promptLibrary) {
      expect(prompt.title).not.toHaveLength(0);
      expect(prompt.summary).not.toHaveLength(0);
      expect(prompt.prompt.length).toBeGreaterThan(120);
      expect(prompt.prompt).not.toMatch(/\.codex_work|Dropbox|password|secret|token/i);
    }
  });
});
