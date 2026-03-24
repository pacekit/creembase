![SaaS Boilerplate](public/images/og.jpg)

# CreemBase - Next.js + Supabase + Creem SaaS Boilerplate

Production-ready starter for Supabase Auth/Postgres and Creem subscriptions.

## 🚀 Quick Start

**Prerequisites:** Node.js, Bun, a Supabase project, and a Creem account.

```bash
# 1. Setup environment variables
cp .env.example .env.local

# 2. Install dependencies
bun install

# 3. Setup Supabase database schema
bun run setup:db

# 4. Create a dummy user for testing purposes
bun run setup:demo-user

# 5. Start development server
bun run dev

# 6. Run E2E tests (Playwright)
bun run test:e2e
```

App routes available: `/sign-in`, `/sign-up`, `/payments/pricing`, `/admin`, and `/payments/billing/success`.

### Testing

End-to-end tests are written using [Playwright](https://playwright.dev/). The suite includes a test for the complete Creem subscription checkout flow.
You can run the tests using:

```bash
# Run headless tests
bun run test:e2e

# Run tests with UI
bun run test:e2e --ui
```

---

## ⚙️ Configuration

### 1. Environment Variables (`.env.local`)

Ensure the following are set in your environment:

- **Supabase:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_DB_URL`
- **App:** `NEXT_PUBLIC_APP_URL` (Used for redirects and webhooks)
- **Creem:** `CREEM_API_KEY`, `CREEM_WEBHOOK_SECRET`, `CREEM_TEST_MODE`

### 2. Creem Subscription Plans

Create your recurring subscription products in the Creem dashboard. Copy the product IDs and configure your pricing and plan tiers directly in:
👉 `src/features/creem/plans.ts`

### 3. Dashboard Callbacks & Webhooks

- **Supabase OAuth:** Enable Email/Password and OAuth (Google, GitHub, and more) in Supabase. Set the redirect URL to `${NEXT_PUBLIC_APP_URL}/auth/callback`.
- **Creem Webhook:** In the Creem dashboard, set the webhook URL to `${NEXT_PUBLIC_APP_URL}/api/webhook/creem` and provide your webhook secret.

---

## 📚 Deep Dive & Architecture

_This section covers how the boilerplate works under the hood._

### Database Schema (`setup:db`)

The `bun run setup:db` script executes SQL from `supabase/migrations/**` in deterministic order.

- **`public.users`**: Synced automatically from `auth.users` via a Postgres trigger.
- **`public.subscriptions`**: Syncs Creem lifecycle events and uses strict Row Level Security (RLS).

### Protected Routes

Server-protected routes (like `/admin`) require two checks:

1.  A valid Supabase session (Auth).
2.  An active subscription stored in `public.subscriptions.is_active`.

### Security Notes

- **Webhooks**: Creem webhooks are verified server-side using the official Next.js adapter (`@creem_io/nextjs`).
- **Database Writes**: `public.subscriptions` is updated _only_ via Creem webhook events using the Supabase Service Role key. Direct user writes are prevented via RLS.
- **Route Protection**: All sensitive subscription checks happen securely on the server side.
