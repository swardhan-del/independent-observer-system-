# Subscriber funnel architecture

Companion reference for the reader-conversion funnel work on top of PR #56
(navigation/growth) and PR #55 (entity authority). Covers what actually
exists, how each piece is wired, and exactly what an owner needs to do to
turn each architecture-only piece into a live one. Nothing described here
as "not configured" or "planned" should be read as implemented.

## 1. Email signup

**Status: no first-party provider is configured. The Substack link-out
remains the only working subscribe path.**

- `src/lib/email-signup.ts` defines the provider-agnostic interface
  (`EmailSignupProvider`) that any future first-party provider (Buttondown,
  ConvertKit, Beehiiv, Resend, etc.) implements:
  ```ts
  type EmailSignupProvider = {
    readonly name: string;
    readonly isConfigured: boolean;
    subscribe(request: SubscribeRequest): Promise<SubscribeResult>;
  };
  ```
- `activeEmailProvider` currently points at `unconfiguredProvider`, whose
  `subscribe()` always returns `{ status: "not_configured" }`. No on-site
  form claims to submit an email anywhere in the site today; the Join page
  and every Observer Brief CTA link out to the existing Substack list
  instead, exactly as before this work.
- **Why no on-site form was built**: the task required investigating for a
  real, working provider before building UI ("do NOT create a fake form").
  No email-provider API key, account, or endpoint exists anywhere in this
  repository's environment variables or dependencies (verified by
  exhaustive grep of `process.env`/`import.meta.env` references and
  `package.json`). Building a form with nowhere to submit would violate
  that rule, and collecting addresses into a repo file or client-side
  store would violate the "never collect emails into an unsecured flat
  file or client-side storage" rule.

**To wire in a real provider:**

1. Pick a provider and create an account + API key (owner decision --
   pricing/deliverability/compliance are business decisions, not
   engineering ones).
2. Add the credential as a Vercel environment variable (e.g.
   `BUTTONDOWN_API_KEY`). Never commit it.
3. Implement a server endpoint (an Astro API route, e.g.
   `src/pages/api/subscribe.ts`) that calls the provider's API using that
   env var and returns one of `SubscribeResult`'s statuses. This is the
   only code that should ever see the raw API key.
4. Implement a second `EmailSignupProvider` in `email-signup.ts` (or a new
   file) that POSTs to that endpoint, and set `isConfigured: true` on it
   only once `subscribe()` genuinely works end-to-end against the
   provider.
5. Point `activeEmailProvider` at the new implementation.
6. Build the on-site form (email field + submit), wired to
   `activeEmailProvider.subscribe()`, with the required success state
   ("You're subscribed. Start with one of these three pieces" + three
   recommended reads) and a visible failure state. Add
   `email_signup_completed` tracking on success (see Analytics below).
7. Add the dedicated tests the task requires: successful subscription
   state, failed/invalid-email state.

## 2. Analytics

**Status: implemented as a real, working, privacy-constrained event
system, including a real (not placeholder) transport. No data currently
leaves the visitor's browser** -- the transport only sends anywhere once
the deployment owner sets `PUBLIC_ANALYTICS_ENDPOINT`; unset, production
is a no-op exactly as before.

- `src/lib/analytics.ts` exports `track(name, properties)` and the full
  documented 14-event vocabulary (`FunnelEventName`): `homepage_view`,
  `start_here_click`, `article_view`, `article_50_percent`,
  `article_complete`, `related_article_click`, `search_used`,
  `save_article`, `join_page_view`, `email_signup_started`,
  `email_signup_completed`, `paid_membership_view`,
  `paid_checkout_started`, `paid_membership_completed`.
- **Transport**: on `localhost`, events are logged to `console.debug` only
  (for local development/QA). Everywhere else (including production),
  `track()` calls `prodTransport`, which reads `PUBLIC_ANALYTICS_ENDPOINT`
  (a `PUBLIC_`-prefixed Vite/Astro env var, so it is safe to expose
  client-side) and, only if it is set, sends `{name, properties, path,
referrer}` to that URL via `navigator.sendBeacon` (falling back to
  `fetch(..., {keepalive: true})`). No environment currently sets that
  variable, so no request leaves the browser in practice today -- but the
  code path is real, not a placeholder, and turning it on is a
  configuration change, not a code change.
- **Privacy contract** (enforced by the type signature and documented at
  the top of `analytics.ts`): `FunnelEventProperties` only accepts
  `string | number | boolean | undefined` values, and every call site
  passes only route/article IDs, category strings, and booleans -- never
  manuscript text, search-query contents, email addresses, or free-text
  reading notes. `search_used` in particular fires on first keystroke
  with no query payload at all.
- **Where each event currently fires**:
  - `homepage_view` -- `src/pages/index.astro`
  - `start_here_click` -- global click delegate in `BaseLayout.astro`
    for any link to `/start/`
  - `article_view`, `article_50_percent`, `article_complete` --
    `initArticleTracking()`, called from `DocumentReader.astro` and
    `library/manuscripts/[slug].astro`; scroll-depth thresholds at 50%
    and 95% of scrollable height, each fired at most once per page view
  - `related_article_click` -- `RelatedContent.astro`, on each
    "Continue this inquiry" card
  - `search_used` -- `src/lib/search-drawer.ts`, once per search session
    on first non-empty input
  - `save_article` -- `src/lib/reading-drawer.ts`, on save (not on unsave)
  - `join_page_view`, `paid_membership_view` -- `src/pages/join/index.astro`
  - `email_signup_started` -- global click delegate in `BaseLayout.astro`
    for any `[data-email-signup-start]` element (every Substack
    link-out/CTA carries this attribute)
  - `email_signup_completed`, `paid_checkout_started`,
    `paid_membership_completed` -- **not yet fired anywhere**, since no
    first-party signup form or checkout exists yet to complete

**To turn on a real analytics provider:**

1. Choose a privacy-conscious provider (e.g. Plausible, Fathom, or a
   self-hosted option) consistent with the no-PII contract above, or stand
   up a small serverless collector you control that forwards to one.
2. Set `PUBLIC_ANALYTICS_ENDPOINT` (a Vercel environment variable) to that
   collector's URL. `prodTransport` in `analytics.ts` already POSTs every
   event there once the variable is set -- no code change is required for
   this step.
3. Do not add fields to `FunnelEventProperties` that would carry
   manuscript text, query strings, emails, or IP addresses.
4. **Retention**: whatever the provider's default retention window is,
   document it here once chosen, and confirm it matches (or update) the
   site's privacy disclosure. As of this writing, since no provider is
   connected, no subscriber-funnel event data exists outside the visitor's
   own `console.debug` output on localhost, and no retention question
   currently applies.
5. If any provider additionally requires a client-side script tag (e.g. to
   read `window.plausible`), load it only on pages that need it and keep
   it out of the critical render path (performance budget).

## 3. Repeat-reader system (local-only, no account)

**Status: fully implemented, entirely client-side, no server involved.**

- `src/lib/reading-history.ts`: versioned localStorage keys
  (`independent-observer:last-article:v1`,
  `independent-observer:last-visit:v1`), with the same defensive
  parse/validate pattern as the pre-existing `reading-list.ts`
  (`isSafeHref`, try/catch JSON parsing, no crash on corrupt or malicious
  stored values).
- **Continue Reading**: `src/components/ContinueReading.astro`, placed on
  the homepage directly below the hero. Hidden by default (nothing to
  render server-side); a client script reads the last recorded article
  from localStorage and reveals a single "Continue reading: <title> ->"
  link if there is one, and if it isn't the page the visitor is already
  on. `recordLastArticle()` is called from both article-shaped readers
  (`DocumentReader.astro`, the manuscript reader).
- **New since your last visit**: `BaseLayout.astro` runs a synchronous
  inline `<head>` script (before any other script on the page) that reads
  the previous `last-visit` timestamp into `window.__ioPreviousVisit`
  _before_ overwriting it with the current visit time. This avoids a
  race condition between "read the old value" and "record this visit"
  without needing a second storage key. `/latest/` consumes that global
  via `isNewSinceLastVisit()` to badge releases and revisions dated after
  the visitor's previous visit.
- **Podcast playback position**: already existed prior to this work
  (`PodcastEpisode.astro`) and was not duplicated.
- No account, no fingerprinting, no server round-trip; the convenience
  silently does nothing if `localStorage` is unavailable (private
  browsing, disabled storage).

## 4. Membership data model (Phase 8)

**Status: types only. No live wiring, no database, no payment
integration.**

- `src/data/membership.ts` defines `Membership` (provider customer ID,
  provider subscription ID, status, tier, renewal state, email identity)
  and `MembershipTierCopy`, used only to render the Join page's two tiers
  honestly, with each unimplemented benefit explicitly marked
  `implemented: false`.
- `MembershipStatus` mirrors Stripe's own subscription statuses (`active`,
  `trialing`, `past_due`, `canceled`, `incomplete`, `unpaid`) so that a
  future webhook handler can map Stripe's status directly onto this type
  without translation.
- There is no database or persistence layer behind this type yet. Wiring
  it up requires the payment integration in the next section first.

## 5. Payment infrastructure (Phase 7)

**Status: not implemented. No Stripe (or other) account, keys, or
endpoints exist anywhere in this repository or its environment.** The
Join page explicitly states "Secure paid checkout is not enabled yet" and
must continue to say so until this is built and the owner has activated
real production payments.

Verified absence: exhaustive search of `process.env.*` /
`import.meta.env.*` references, `package.json` dependencies, and string
search for `stripe`/`checkout`/payment-provider names across the
repository turned up nothing. Per the task's explicit instruction, the
correct response to missing credentials is to produce this setup
checklist rather than insert placeholder code that looks functional.

**Recommended architecture** (minimal, hosted checkout -- never handle raw
card data in this codebase):

1. Create a Stripe account (owner decision) and a single recurring price
   for "Supporting Member," ~$5/month.
2. Add these Vercel environment variables (owner must supply the actual
   values -- this repository never invents or hardcodes them):
   - `STRIPE_SECRET_KEY`
   - `STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `STRIPE_PRICE_SUPPORTING_MEMBER`
3. Add a server endpoint (e.g. `src/pages/api/create-checkout-session.ts`)
   that uses `STRIPE_SECRET_KEY` server-side only to create a Stripe
   Checkout Session for `STRIPE_PRICE_SUPPORTING_MEMBER`, and redirects
   the browser to Stripe's hosted checkout page. `paid_checkout_started`
   should fire when this is invoked.
4. Add a webhook endpoint (e.g. `src/pages/api/stripe-webhook.ts`) that:
   - Verifies the incoming signature against `STRIPE_WEBHOOK_SECRET`
     using Stripe's SDK verification helper -- reject anything that
     doesn't verify.
   - Is idempotent: safe to receive the same event ID twice without
     double-processing (e.g. upsert keyed on Stripe's event ID or
     subscription ID, not a blind insert).
   - On `checkout.session.completed` / `customer.subscription.*` events,
     upserts a `Membership` record (Section 4) with the provider IDs and
     status from the event -- Stripe webhooks are the sole authority for
     paid status, never client-side state.
   - Fires `paid_membership_completed` (or updates status on
     cancellation) based on the event, server-side.
5. Test entirely in Stripe test mode first, with Stripe's test webhook
   signing secret, before switching any key to a live one.
6. **Do not flip `STRIPE_SECRET_KEY` (or any related key) to a live-mode
   value, and do not remove the "not enabled yet" copy from the Join
   page, until the owner has explicitly approved activating real
   production payments.** Passing test-mode checkout is not that
   approval.
7. Add the dedicated tests the task requires once built: checkout
   initiation, webhook signature rejection on a bad signature, duplicate
   webhook idempotency, canceled-subscription handling.

## 6. Accounts (Phase 9)

No account system exists and none was added. A free subscriber is
identified only by their email address in the (not yet connected) email
provider's own list; a supporting member's status lives in Stripe and
(once built) the `Membership` record keyed by email/customer ID. Neither
requires the reader to create a password or log in. If member-only content
is ever built, prefer a provider-hosted customer portal or a signed,
emailed magic link over building custom authentication.

## 7. Owner-facing dashboard (Phase 14) and growth phases (11-13)

Not built in this pass. The prerequisites this section depends on --
a connected analytics provider (Section 2) and a connected payment
provider (Section 5) -- do not exist yet, so there is no live data to
dashboard. SEO verification (Phase 11), UTM-aware landing pages (Phase
12), and the lightweight referral link (Phase 13) were deferred to keep
this pass honest about what's actually wired up versus scaffolded; they
are natural follow-ups once Sections 1 and 5 have real providers behind
them.
