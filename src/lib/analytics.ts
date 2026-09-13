/**
 * Provider-agnostic, privacy-conscious funnel-event adapter.
 *
 * Current state: no analytics framework exists anywhere in this repository
 * (verified: no Plausible/Fathom/GA/PostHog/Segment/Mixpanel script or
 * dependency, no related environment variable). This module does NOT add one.
 * By default, `track()` only reports to `console.debug` in development and is
 * a genuine no-op in production -- no request leaves the browser, no third
 * party receives anything, until an owner explicitly configures a provider
 * (see docs/subscriber-funnel-architecture.md for the setup checklist).
 *
 * The point of shipping this now, rather than waiting for a provider
 * decision, is that the call sites (the actual UX moments worth measuring)
 * are the part that requires touching many pages/components; the transport
 * is a one-line swap once a provider is chosen. Call sites should import
 * `track` and call it at the moment described by the event name below --
 * they should never need to change when the transport changes.
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
 * No-op in production until an owner-configured provider is wired in here.
 * Swap this for a real transport (e.g. a fetch() to a privacy-respecting
 * provider's collect endpoint, reading its site id from a PUBLIC_ env var)
 * once one is chosen. Never point this at a provider without updating the
 * privacy contract above and docs/subscriber-funnel-architecture.md.
 */
const prodTransport: AnalyticsTransport = () => {};

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
