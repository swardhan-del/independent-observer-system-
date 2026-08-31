import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const stylesheet = readFileSync(join(process.cwd(), "src/styles/global.css"), "utf8");

function token(name: string) {
  const match = stylesheet.match(new RegExp(`${name}:\\s*(#[0-9a-f]{6})`, "i"));
  if (!match) throw new Error(`Missing color token: ${name}`);
  return match[1];
}

function luminance(hex: string) {
  const channels = hex
    .slice(1)
    .match(/.{2}/g)!
    .map((value) => Number.parseInt(value, 16) / 255)
    .map((value) => (value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4));

  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

function contrast(foreground: string, background: string) {
  const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
}

describe("accessible color tokens", () => {
  it.each([
    ["--gold-ink", "--white"],
    ["--gold-ink", "--paper"],
    ["--slate-500", "--white"],
    ["--slate-500", "--paper"],
    ["--gold", "--navy-950"],
    ["--gold", "--navy-900"],
    ["--gold", "--navy-800"],
    ["--gold-light", "--navy-900"],
    ["--gold-light", "--navy-800"],
    ["--slate-300", "--navy-950"],
    ["--slate-300", "--navy-900"],
    ["--slate-300", "--navy-800"],
  ])("keeps %s text at AA contrast on %s", (foreground, background) => {
    expect(contrast(token(foreground), token(background))).toBeGreaterThanOrEqual(4.5);
  });

  it("uses the light-surface gold token for small gold text", () => {
    for (const selector of [
      "\\.eyebrow",
      "\\.mission-grid \\.index",
      "\\.topic span",
      "\\.mission-volume-number",
    ]) {
      expect(stylesheet).toMatch(
        new RegExp(`${selector}\\s*\\{[^}]*color:\\s*var\\(--gold-ink\\)`, "s"),
      );
    }
  });

  it("keeps dark documentary-card footers on the light slate token", () => {
    expect(stylesheet).toMatch(
      /\.section-navy \.card-footer\s*\{[^}]*color:\s*var\(--slate-300\)/s,
    );
  });

  it("uses high-contrast ink for the library research-map label", () => {
    expect(stylesheet).toMatch(
      /\.library-volume-shelf-research-label\s*\{[^}]*color:\s*var\(--navy-950\)/s,
    );
  });
});
