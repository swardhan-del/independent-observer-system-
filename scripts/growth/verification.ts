import { request } from "node:https";
import { lookup } from "node:dns";
import { isIP } from "node:net";
import { type DraftPackage, type articles, canonical, verifyTraceability } from "./packages";

export type Article = (typeof articles)[number];
export type LinkCheck = {
  url: string;
  state: "ok" | "manual_required" | "failed";
  status: number | null;
  checkedAt: string;
  attempts: number;
  reason: string;
};
export type Inspection = LinkCheck & { body?: string };
export type Inspector = (url: string, body?: boolean) => Promise<Inspection>;
export type Gate = {
  checkedAt: string;
  ready: boolean;
  warnings: string[];
  links: LinkCheck[];
  sourceHash: string;
};

export function publicAddress(address: string) {
  if (address.startsWith("::ffff:")) return publicAddress(address.slice(7));
  if (isIP(address) === 6)
    return /^2[0-9a-f]{3}:/i.test(address) && !/^2001:(?:db8|0|10|20):/i.test(address);
  if (isIP(address) !== 4) return false;
  const [a, b] = address.split(".").map(Number);
  return !(
    a === 0 ||
    a === 10 ||
    a === 127 ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && [0, 168].includes(b)) ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 198 && [18, 19, 51].includes(b)) ||
    (a === 203 && b === 0) ||
    a >= 224
  );
}

export function publicUrl(value: string) {
  const u = new URL(value);
  if (
    u.protocol !== "https:" ||
    u.username ||
    u.password ||
    (u.port && u.port !== "443") ||
    !u.hostname.includes(".") ||
    /(?:^|\.)(?:localhost|local|internal|test|invalid|example)$/.test(u.hostname) ||
    isIP(u.hostname.replace(/[\[\]]/g, ""))
  )
    throw Error("Only public HTTPS hostnames on port 443 are allowed");
  return u;
}

async function readUrl(
  value: string,
  includeBody: boolean,
  redirects = 0,
): Promise<{ status: number; body: string }> {
  const u = publicUrl(value);
  return new Promise((resolve, reject) => {
    const req = request(
      u,
      {
        method: includeBody ? "GET" : "HEAD",
        headers: {
          "User-Agent": "IndependentObserver-SourceCheck/1.0",
          Accept: "text/html,application/pdf,*/*",
        },
        // Pin a validated DNS result to the actual connection, including each redirect.
        lookup(host, options, callback) {
          lookup(host, { all: true }, (error, addresses) => {
            if (error) return callback(error, [] as never, 0);
            if (!addresses.length || addresses.some((a) => !publicAddress(a.address)))
              return callback(
                Error("Private/reserved network destination rejected"),
                [] as never,
                0,
              );
            if (typeof options === "object" && options.all) callback(null, addresses as never);
            else callback(null, addresses[0].address, addresses[0].family);
          });
        },
      },
      (response) => {
        const status = response.statusCode ?? 0;
        if ([301, 302, 303, 307, 308].includes(status) && response.headers.location) {
          response.resume();
          if (redirects >= 4) return reject(Error("Redirect limit exceeded"));
          readUrl(new URL(response.headers.location, u).href, includeBody, redirects + 1).then(
            resolve,
            reject,
          );
          return;
        }
        if (status === 405 && !includeBody) {
          response.resume();
          readUrl(value, true, redirects).then(resolve, reject);
          return;
        }
        if (!includeBody) {
          response.resume();
          resolve({ status, body: "" });
          return;
        }
        let bytes = 0;
        const buffers: Buffer[] = [];
        response.on("data", (chunk: Buffer) => {
          bytes += chunk.length;
          if (bytes > 2_000_000) {
            req.destroy(Error("Source response exceeds 2 MB limit"));
            return;
          }
          buffers.push(chunk);
        });
        response.on("end", () =>
          resolve({ status, body: Buffer.concat(buffers).toString("utf8") }),
        );
        response.on("error", reject);
      },
    );
    const deadline = setTimeout(() => req.destroy(Error("Source deadline exceeded")), 10_000);
    req.once("close", () => clearTimeout(deadline));
    req.on("error", reject);
    req.end();
  });
}

export const inspectLink: Inspector = async (url, includeBody = false) => {
  let last: Inspection = {
    url,
    state: "failed",
    status: null,
    checkedAt: new Date().toISOString(),
    attempts: 0,
    reason: "Not checked",
  };
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const response = await readUrl(url, includeBody);
      const state =
        response.status >= 200 && response.status < 300
          ? "ok"
          : [401, 403, 429].includes(response.status)
            ? "manual_required"
            : "failed";
      last = {
        url,
        state,
        status: response.status,
        checkedAt: new Date().toISOString(),
        attempts: attempt,
        reason:
          state === "ok"
            ? "Reachable; factual verification still requires editorial review"
            : "Source inaccessible or restricted; requires correction or owner verification",
        ...(includeBody ? { body: response.body } : {}),
      };
      if (response.status < 500) break;
    } catch {
      last = {
        ...last,
        attempts: attempt,
        reason: "Request failed, timed out or destination was rejected",
      };
    }
  }
  return last;
};

export function plainText(text: string) {
  return text
    .replace(/<[^>]*>/g, " ")
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(
      /&(?:amp|lt|gt|quot|apos|nbsp);/g,
      (s) =>
        ({ "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&apos;": "'", "&nbsp;": " " })[
          s
        ]!,
    )
    .replace(/\s+/g, " ")
    .trim();
}

export async function verifyPackage(
  p: DraftPackage,
  article: Article,
  inspect: Inspector = inspectLink,
): Promise<Gate> {
  verifyTraceability(p, article);
  const warnings: string[] = [];
  const page = await inspect(canonical(article), true);
  const canonicalTag = page.body?.match(
    /<link\b(?=[^>]*\brel=["']canonical["'])[^>]*\bhref=["']([^"']+)["']/i,
  )?.[1];
  const text = plainText(page.body ?? "");
  if (
    page.state !== "ok" ||
    canonicalTag !== canonical(article) ||
    !p.claims.every((c) => text.includes(plainText(c.text))) ||
    !text.includes(article.version) ||
    !page.body?.includes(article.publicationDate)
  )
    warnings.push(
      "Live canonical page, edition, dates or selected source text could not be matched. No approval until corrected.",
    );
  const links: LinkCheck[] = [{ ...page, ...{ body: undefined } } as LinkCheck];
  // Every identifiable reference is checked, even when only one supports this excerpt.
  for (const source of article.sourceNotes) {
    publicUrl(source.href);
    const { body: _body, ...result } = await inspect(source.href);
    links.push(result);
    if (result.state !== "ok")
      warnings.push(`Reference needs manual verification: ${source.label}`);
  }
  return {
    checkedAt: new Date().toISOString(),
    ready: warnings.length === 0,
    warnings,
    links,
    sourceHash: p.sourceHash,
  };
}
