import {
  contactAddress,
  contactPolicy,
  contactTopics,
  type ContactTopic,
} from "../src/data/contact";

type VercelRequest = {
  method?: string;
  body?: unknown;
  headers?: Record<string, string | string[] | undefined>;
};

type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
};

export type ContactMessage = {
  name: string;
  email: string;
  topic: ContactTopic;
  message: string;
};

type ValidationResult = { ok: true; message: ContactMessage } | { ok: false; error: string };

const topicSet = new Set<string>(contactTopics);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function hasAcceptedDisclosure(value: unknown): boolean {
  return value === true || value === "on" || value === "true";
}

export function validateContactPayload(payload: unknown): ValidationResult {
  if (!isRecord(payload)) {
    return { ok: false, error: "Please submit the inquiry form again." };
  }

  if (readText(payload.website)) {
    return { ok: false, error: "The inquiry could not be accepted." };
  }

  const name = readText(payload.name);
  const email = readText(payload.email);
  const topic = readText(payload.topic);
  const message = readText(payload.message);

  if (name.length > contactPolicy.maxNameLength) {
    return { ok: false, error: "Please keep your name under 120 characters." };
  }

  if (email.length > contactPolicy.maxEmailLength || !emailPattern.test(email)) {
    return { ok: false, error: "Please provide a valid email address." };
  }

  if (!topicSet.has(topic)) {
    return { ok: false, error: "Please select a relevant inquiry topic." };
  }

  if (
    message.length < contactPolicy.minMessageLength ||
    message.length > contactPolicy.maxMessageLength
  ) {
    return { ok: false, error: "Please keep the inquiry between 10 and 5,000 characters." };
  }

  if (!hasAcceptedDisclosure(payload.disclosure)) {
    return { ok: false, error: "Please accept the inquiry disclosure before sending." };
  }

  return {
    ok: true,
    message: {
      name,
      email,
      topic: topic as ContactTopic,
      message,
    },
  };
}

function getHeader(req: VercelRequest, name: string): string {
  const headers = req.headers ?? {};
  const value = headers[name] ?? headers[name.toLowerCase()];
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

function isAllowedOrigin(origin: string): boolean {
  if (!origin) return true;

  const configuredSite = (process.env.SITE_URL ?? "https://independentobserver.org").replace(
    /\/$/u,
    "",
  );
  return new Set([
    configuredSite,
    "https://independentobserver.org",
    "https://www.independentobserver.org",
    "http://localhost:4321",
    "http://localhost:3000",
  ]).has(origin);
}

function parseBody(body: unknown): unknown {
  if (typeof body !== "string") return body;

  try {
    return JSON.parse(body) as unknown;
  } catch {
    return null;
  }
}

function respond(res: VercelResponse, status: number, body: unknown): void {
  res.status(status).json(body);
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    respond(res, 405, { error: "Method not allowed." });
    return;
  }

  const origin = getHeader(req, "origin");
  if (!isAllowedOrigin(origin)) {
    respond(res, 403, { error: "This inquiry can only be sent from the site." });
    return;
  }

  const requestBodySize = JSON.stringify(req.body ?? "").length;
  if (requestBodySize > 20_000) {
    respond(res, 413, { error: "The inquiry is too large to send." });
    return;
  }

  const rawBody = parseBody(req.body);
  const validation = validateContactPayload(rawBody);
  if (!validation.ok) {
    respond(res, 400, { error: validation.error });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || contactAddress;

  if (!apiKey || !from) {
    respond(res, 503, {
      error: "Direct delivery is not configured yet. Please try again later.",
    });
    return;
  }

  const { message } = validation;
  const text = [
    "Independent Observer inquiry",
    "",
    `Name: ${message.name || "Not provided"}`,
    `Email: ${message.email}`,
    `Inquiry about: ${message.topic}`,
    "",
    message.message,
    "",
    "The sender accepted the inquiry disclosure on the website.",
  ].join("\n");

  try {
    const delivery = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: message.email,
        subject: `Independent Observer inquiry · ${message.topic}`,
        text,
      }),
    });

    if (!delivery.ok) {
      respond(res, 502, {
        error: "The inquiry could not be delivered. Please try again later.",
      });
      return;
    }
  } catch {
    respond(res, 502, {
      error: "The inquiry could not be delivered. Please try again later.",
    });
    return;
  }

  respond(res, 200, {
    ok: true,
    message:
      "Your inquiry was sent to the research desk. An inquiry does not guarantee a response.",
  });
}
