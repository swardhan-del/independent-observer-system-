import { describe, expect, it } from "vitest";
import { contactTopics } from "../data/contact";
import { validateContactPayload } from "../../api/contact";

const validPayload = {
  name: "Reader",
  email: "reader@example.com",
  topic: contactTopics[0],
  message: "I have a question about the method section.",
  disclosure: true,
  website: "",
};

describe("contact endpoint validation", () => {
  it("accepts a relevant inquiry with an accepted disclosure", () => {
    const result = validateContactPayload(validPayload);

    expect(result).toEqual({
      ok: true,
      message: {
        name: "Reader",
        email: "reader@example.com",
        topic: contactTopics[0],
        message: "I have a question about the method section.",
      },
    });
  });

  it("accepts the no-JavaScript checkbox value from a form post", () => {
    const result = validateContactPayload({ ...validPayload, disclosure: "on" });

    expect(result.ok).toBe(true);
  });

  it("rejects an unlisted topic, invalid email, or missing disclosure", () => {
    expect(validateContactPayload({ ...validPayload, topic: "Unrelated topic" }).ok).toBe(false);
    expect(validateContactPayload({ ...validPayload, email: "not-an-email" }).ok).toBe(false);
    expect(validateContactPayload({ ...validPayload, disclosure: false }).ok).toBe(false);
  });

  it("rejects a filled honeypot field", () => {
    const result = validateContactPayload({ ...validPayload, website: "https://spam.example" });

    expect(result).toEqual({ ok: false, error: "The inquiry could not be accepted." });
  });
});
