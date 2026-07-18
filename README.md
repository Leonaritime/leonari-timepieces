# Leonari Timepieces

A black & gold watch storefront: public catalog with direct Stripe checkout,
plus a password-protected `/admin` dashboard where you add, edit, mark sold,
or remove watches — no code changes needed after setup.

Built with Next.js, Prisma, and Stripe. You own all of this code outright.

---

## 1. Run it locally (~10 minutes)

You'll need [Node.js 18+](https://nodejs.org) installed.

```bash
cd leonari-timepieces
npm install
cp .env.example .env
```

Open `.env` and fill in:
- `ADMIN_PASSWORD` — whatever you'll type in at `/admin` to log in
- `ADMIN_SESSION_SECRET` — any long random string (e.g. run `openssl rand -hex 32`)
- Leave `STRIPE_SECRET_KEY` and `DATABASE_URL` as-is for now — Stripe is set up in step 2.

Then create the local database and load 3 sample watches:

```bash
npx prisma db push
npx prisma db seed
npm run dev
```

Visit **http://localhost:3000** — you should see the storefront with 3 sample
watches. Visit **http://localhost:3000/admin** and log in with your
`ADMIN_PASSWORD` to add your real inventory (delete the sample watches once
you've added your own).

---

## 2. Connect Stripe (so "Buy Now" actually charges cards)

1. Create a free account at [stripe.com](https://dashboard.stripe.com/register).
2. In the Stripe Dashboard, go to **Developers → API keys**, copy the
   **Secret key** (starts `sk_test_...` while in test mode), and put it in
   `.env` as `STRIPE_SECRET_KEY`.
3. Install the [Stripe CLI](https://docs.stripe.com/stripe-cli) to forward
   webhook events to your local server:
   ```bash
   stripe login
   stripe listen --forward-to localhost:3000/api/webhook/stripe
   ```
   This prints a `whsec_...` value — put that in `.env` as `STRIPE_WEBHOOK_SECRET`,
   then restart `npm run dev`.

The webhook is what marks a watch "SOLD" the instant payment succeeds, so a
one-of-a-kind piece can never be bought twice.

**Test it:** add a watch with a real price, click Buy Now, and use Stripe's
test card `4242 4242 4242 4242` with any future expiry/CVC. You should land
on the success page and see the watch flip to "Sold" in `/admin`.

---

## 3. Going to production

Two things change for a live deployment: the database and the Stripe mode.

### Database
SQLite (used locally) doesn't persist on serverless hosts like Vercel. Get a
free Postgres database from [Neon](https://neon.tech) or
[Supabase](https://supabase.com), then:

1. In `prisma/schema.prisma`, change:
   ```
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
2. Set `DATABASE_URL` to the connection string Neon/Supabase gives you.
3. Run `npx prisma db push` once against that URL to create the table.

### Stripe live mode
Toggle **Test mode → Live mode** in the Stripe Dashboard, grab your live
`sk_live_...` key, and repeat the webhook setup (Dashboard → Developers →
Webhooks → Add endpoint → `https://leonaritime.com/api/webhook/stripe`,
event: `checkout.session.completed`) to get a live `whsec_...`.

Stripe will also ask you to verify your business (legal name, bank account)
before payouts start — normal for any new merchant account, usually same-day.

### Deploy (recommended: Vercel — free, built for Next.js)
1. Push this code to a GitHub repo.
2. Go to [vercel.com](https://vercel.com) → New Project → import the repo.
3. Add all the variables from your `.env` as Environment Variables in the
   Vercel project settings (use your live Stripe keys + Postgres URL).
4. Deploy.

### Connect leonaritime.com
In Vercel: Project → Settings → Domains → add `leonaritime.com`. Vercel gives
you either an A record or a CNAME to add — do that in whatever registrar you
bought the domain through. It's usually live within an hour.

---

## Notes on selling watches specifically

- **Price = $0 means "Inquire"** — the Buy button becomes an email link
  instead of checkout, matching how AB Luxe & Co lists pieces without a
  posted price.
- Because these are one-of-a-kind items, "Buy Now" checks stock at the
  moment of purchase and the webhook immediately marks it sold — no
  overselling risk from two buyers clicking at once.
- For anything high-value, consider enabling Stripe Radar (fraud
  detection, on by default) and requiring signature confirmation on
  shipping for orders over a threshold you set with your carrier.
