import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();

describe("publication security boundary", () => {
  it("stages restrictive security headers without unsafe-eval", () => {
    const config = JSON.parse(readFileSync(join(root, "vercel.json"), "utf8")) as {
      headers: Array<{ headers: Array<{ key: string; value: string }> }>;
    };
    const headers = Object.fromEntries(
      config.headers[0].headers.map(({ key, value }) => [key, value]),
    );
    expect(headers["Strict-Transport-Security"]).toContain("max-age=63072000");
    expect(headers["X-Content-Type-Options"]).toBe("nosniff");
    expect(headers["X-Frame-Options"]).toBe("DENY");
    expect(headers["Permissions-Policy"]).toContain("camera=()");
    expect(headers["Content-Security-Policy"]).toContain("object-src 'none'");
    expect(headers["Content-Security-Policy"]).not.toContain("unsafe-eval");
  });

  it("does not place environment or git metadata in the static output", () => {
    expect(existsSync(join(root, "dist", ".env"))).toBe(false);
    expect(existsSync(join(root, "dist", ".git", "config"))).toBe(false);
  });
});
