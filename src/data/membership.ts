/**
 * Minimal membership data model (Phase 8 of the subscriber-funnel plan).
 *
 * This file defines TYPES ONLY. Nothing here is wired to a live payment
 * provider, a database, or any request handler -- there is no Stripe
 * integration in this repository yet (see docs/subscriber-funnel-architecture.md
 * for the exact owner setup checklist to add one).
 *
 * The shape intentionally mirrors what a hosted-checkout provider (e.g.
 * Stripe) already tracks, so a future integration can map its own records
 * onto this type directly instead of inventing a parallel schema:
 * - `providerCustomerId` / `providerSubscriptionId`: opaque IDs owned by the
 *   payment provider. This repo never generates or stores its own.
 * - `status`: mirrors Stripe subscription statuses, since payment-provider
 *   webhooks are the authoritative source for paid status (Phase 8).
 * - No profiling fields (name, address, payment method, etc.) -- only what
 *   is needed to answer "is this email a supporting member, and of what
 *   tier."
 */

export type MembershipTier = "free_reader" | "supporting_member";

export type MembershipStatus =
  "active" | "trialing" | "past_due" | "canceled" | "incomplete" | "unpaid";

export type Membership = {
  /** The subscriber's email identity. Required only when the provider needs
   * it to reconcile a webhook event with a reader. */
  email: string;
  tier: MembershipTier;
  status: MembershipStatus;
  /** Opaque ID from the payment provider (e.g. a Stripe customer ID). */
  providerCustomerId?: string;
  /** Opaque ID from the payment provider (e.g. a Stripe subscription ID). */
  providerSubscriptionId?: string;
  /** ISO timestamp of the current billing period's renewal or expiry. */
  renewsAt?: string;
};

/** Human-facing copy for each tier on the Join page. Benefits marked
 * `implemented: false` MUST be displayed as planned, not available --
 * see the Phase 6 rule against promising unbuilt benefits. */
export type MembershipTierCopy = {
  tier: MembershipTier;
  name: string;
  price: string;
  benefits: { label: string; implemented: boolean }[];
};

export const membershipTiers: MembershipTierCopy[] = [
  {
    tier: "free_reader",
    name: "Free reader",
    price: "$0",
    benefits: [
      { label: "Full access to all public research", implemented: true },
      { label: "The Observer Brief by email", implemented: false },
    ],
  },
  {
    tier: "supporting_member",
    name: "Supporting member",
    price: "$5/month (planned)",
    benefits: [
      { label: "Everything in Free reader", implemented: true },
      { label: "Supports continued independent research", implemented: false },
      { label: "Extended monthly Brief", implemented: false },
      { label: "Downloadable source packs", implemented: false },
      { label: "Early access to new research", implemented: false },
    ],
  },
];
