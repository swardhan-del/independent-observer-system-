/**
 * Provider-agnostic interface for "The Observer Brief" free email signup.
 *
 * Current state: no first-party newsletter API/backend exists anywhere in this
 * repository or its connected Vercel project (verified by searching for
 * Substack/Buttondown/ConvertKit/Mailchimp/Beehiiv/Resend/SendGrid integrations
 * and for any related environment variable references -- none exist). The only
 * functioning subscription path today is linking out to the existing
 * Independent Observer Substack, which is what src/components/FollowUpdates.astro
 * and src/pages/join/index.astro actually do.
 *
 * This file exists so that a future first-party provider can be plugged in
 * without redesigning the site: implement `EmailSignupProvider` and swap the
 * export at the bottom. Nothing here should be imported by a page unless that
 * page is prepared to call `subscribe()` and render a real success/error state
 * from the result -- do not wire this up to a form that always "succeeds."
 */

export type SubscribeRequest = {
  email: string;
  /** Where on the site the signup was initiated, for provider-side segmentation only. */
  source?: string;
};

export type SubscribeResult =
  | { status: "subscribed" }
  | { status: "already_subscribed" }
  | { status: "invalid_email" }
  | { status: "provider_error"; message: string }
  | { status: "not_configured" };

export type EmailSignupProvider = {
  /** Human-readable provider name, shown nowhere except logs/docs. */
  readonly name: string;
  /** Whether this provider can actually accept a subscription right now. */
  readonly isConfigured: boolean;
  subscribe(request: SubscribeRequest): Promise<SubscribeResult>;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  return emailPattern.test(value.trim());
}

/**
 * No first-party provider is configured. This provider never claims success --
 * it always reports `not_configured` so that no caller can accidentally present
 * a fake "you're subscribed" confirmation. The live subscription path remains
 * the external Substack link rendered directly in FollowUpdates.astro and
 * /join/, which does not go through this adapter at all.
 */
export const unconfiguredProvider: EmailSignupProvider = {
  name: "none",
  isConfigured: false,
  async subscribe(): Promise<SubscribeResult> {
    return { status: "not_configured" };
  },
};

/**
 * The provider the site currently uses. Swap this export for a real
 * implementation (e.g. a Buttondown or Resend-backed provider reading its API
 * key from a Vercel environment variable) once the owner has selected and
 * configured one -- see docs/subscriber-funnel-architecture.md for the exact
 * setup checklist. Do not set this to anything whose `isConfigured` is true
 * unless `subscribe()` genuinely calls a real, working API.
 */
export const activeEmailProvider: EmailSignupProvider = unconfiguredProvider;
