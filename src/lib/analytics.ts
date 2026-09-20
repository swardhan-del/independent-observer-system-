/**
 * Provider-agnostic, privacy-conscious funnel-event adapter.
 *
 * Current state: no analytics *provider* is connected anywhere in this
 * repository (verified: no Plausible/Fathom/GA/PostHog/Segment/Mixpanel
 * script or dependency). The transport below is real, working code -- it is
 * not a placeholder -- but it stays a genuine no-op, with no request ever
 * leaving the browser, unless the deployment owner sets the
 * `PUBLIC_ANALYTICS_ENDPOINT` environment variable to a collection endpoint
 * they control (see docs/subscriber-funnel-architecture.md for the setup
 * checklist). Until that variable is set, production behaves exactly as it
 * did before this transport existed.
 *
 * The point of shipping this now, rather than waiting for a provider
 * decision, is that the call sites (the actual UX moments worth measuring)
 * are the part that requires touching many pages/components; turning the
 * transport on is then a one-line environment-variable change, not a code
 * change. Call sites should import `track` and call it at the moment
 * described by the event name below -- they should never need to change
 * when the transport changes.
 *
 * PRIVACY CONTRACT (do not violate when adding new call sites):
 * - Never pass manuscript/article body text, search query text, saved
 *   reading-list contents, or any other free-text reader input as a
 *   property value.
 * - Property values are limited to: route paths, content ids/slugs already
 *   public in the URL, coarse category/topic labels, and booleans/numbers.
 * - No email address, IP address, or persistent cross-site identifier is
 *   collected by this module. If a future provider requires a client id, it
 *   must be a random value stored only in this origin's localStorage, never
 *   sent anywhere without the owner enabling that provider.
 */

export type FunnelEventName =
  | "homepage_view"
  | "start_here_click"
  | "article_view"
  | "article_50_percent"
  | "article_complete"
  | "related_article_click"
  | "search_used"
  | "save_article"
  | "join_page_view"
  | "email_signup_started"
  | "email_signup_completed"
  | "paid_membership_view"
  | "paid_checkout_started"
  | "paid_membership_completed";

export type FunnelEventProperties = Record<string, string | number | boolean | undefined>;

export type AnalyticsTransport = (name: FunnelEventName, properties: FunnelEventProperties) => void;

const devTransport: AnalyticsTransport = (name, properties) => {
  if (typeof window === "undefined") return;
  // eslint-disable-next-line no-console -- intentional: this is the entire dev-mode transport.
  console.debug(`[analytics:dev] ${name}`, properties);
};

/**
 * Sends an event to `PUBLIC_ANALYTICS_ENDPOINT` when the owner has set one
 * (e.g. a serverless collector they control, or a self-hosted/privacy-first
 * provider's own event endpoint). No endpoint configured -> no request is
 * made, matching the no-op behaviour this module has always documented.
 *
 * The payload is limited to what `FunnelEventProperties` already allows
 * (see the privacy contract above) plus the current path and referrer, both
 * already visible to any server the browser talks to. `sendBeacon` is
 * preferred so the event survives page navigation; `fetch(..., {keepalive:
 * true})` is the fallback for browsers without it.
 */
const prodTransport: AnalyticsTransport = (name, properties) => {
  if (typeof window === "undefined") return;
  const endpoint = import.meta.env.PUBLIC_ANALYTICS_ENDPOINT as string | undefined;
  if (!endpoint) return;
  let payload: string;
  try {
    payload = JSON.stringify({
      name,
      properties,
      path: window.location.pathname,
      referrer: document.referrer || undefined,
    });
  } catch {
    return;
  }
  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon(endpoint, new Blob([payload], { type: "application/json" }));
    } else {
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // Best-effort only; a tracking call must never throw or block the UI.
  }
};

function currentTransport(): AnalyticsTransport {
  if (typeof window !== "undefined" && window.location.hostname === "localhost") {
    return devTransport;
  }
  return prodTransport;
}

export function track(name: FunnelEventName, properties: FunnelEventProperties = {}): void {
  currentTransport()(name, properties);
}

/**
 * Fires article_view once, then article_50_percent and article_complete the
 * first time the reader's scroll position crosses each threshold. Safe to
 * call on any article-shaped page (research article or manuscript reader);
 * does nothing if `window`/`document` are unavailable (build time).
 */
export function initArticleTracking(articleId: string, articleType: "document" | "manuscript") {
  if (typeof window === "undefined") return;
  track("article_view", { articleId, articleType });
  let firedHalf = false;
  let firedComplete = false;
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const percent = max > 0 ? (window.scrollY / max) * 100 : 100;
    if (!firedHalf && percent >= 50) {
      firedHalf = true;
      track("article_50_percent", { articleId, articleType });
    }
    if (!firedComplete && percent >= 95) {
      firedComplete = true;
      track("article_complete", { articleId, articleType });
      window.removeEventListener("scroll", onScroll);
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
}
