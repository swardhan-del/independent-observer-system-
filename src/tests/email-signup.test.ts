import { describe, expect, it } from "vitest";
import { isValidEmail, unconfiguredProvider, activeEmailProvider } from "../lib/email-signup";

describe("email signup adapter", () => {
  it("validates plausible email shapes and rejects obviously invalid ones", () => {
    expect(isValidEmail("reader@example.com")).toBe(true);
    expect(isValidEmail("  reader@example.com  ")).toBe(true);
    expect(isValidEmail("not-an-email")).toBe(false);
    expect(isValidEmail("missing-domain@")).toBe(false);
    expect(isValidEmail("@missing-local.com")).toBe(false);
    expect(isValidEmail("")).toBe(false);
  });

  it("never claims a subscription succeeded when no provider is configured", async () => {
    expect(unconfiguredProvider.isConfigured).toBe(false);
    const result = await unconfiguredProvider.subscribe({ email: "reader@example.com" });
    expect(result.status).toBe("not_configured");
  });

  it("keeps the active provider honest: not configured until a real one is wired in", async () => {
    // This is the load-bearing assertion for "do not fake a working signup
    // form": until the site owner configures and wires a real provider, the
    // active export must stay unconfigured so no caller can present a false
    // success state.
    expect(activeEmailProvider.isConfigured).toBe(false);
    const result = await activeEmailProvider.subscribe({ email: "reader@example.com" });
    expect(result.status).toBe("not_configured");
  });
});
