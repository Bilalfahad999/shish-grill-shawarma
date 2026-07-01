# Deployment Guide

## Minimum to go live

The app runs without a database or any third-party API keys (mock data + console-logged emails). For a real launch you need at least:

| Variable | Why |
|---|---|
| `AUTH_SECRET` | Required by NextAuth in production. Generate with `openssl rand -base64 32`. |
| `NEXTAUTH_URL` | Your production URL, e.g. `https://shishshawarma.com.au`. |
| `ADMIN_EMAIL` + `ADMIN_PASSWORD_HASH` | Real admin login — the dev fallback credential is disabled outside `NODE_ENV=development`. Generate the hash with `node -e "console.log(require('bcryptjs').hashSync('yourpassword', 12))"`. |
| `RESEND_API_KEY` + `EMAIL_FROM` | Without these, order/catering/contact confirmation emails are logged to the server console instead of sent. |
| `NEXT_PUBLIC_SITE_URL` | Used for canonical URLs, the sitemap, and Open Graph tags. |

## Recommended before launch

| Variable | Why |
|---|---|
| `DATABASE_URL` | Without it, all admin changes (menu edits, order status, etc.) reset on server restart. See [ARCHITECTURE.md](ARCHITECTURE.md#database--the-mock-data-pattern) for the migration steps. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console ownership verification. |

## Not yet wired up (scaffolded, needs keys + ~1 integration pass each)

- **Stripe** — `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`. Checkout currently supports card/Apple Pay/Google Pay/cash *labels* but doesn't process a real charge.
- **Google Maps embed** — `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`. The Contact page shows a styled placeholder with a "directions" link until this is set.
- **reCAPTCHA** — `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, `RECAPTCHA_SECRET_KEY`. The contact form currently uses a honeypot field + rate limiting as a stopgap.

## Production checklist

- [ ] Run `npm run build` locally — must complete with zero TypeScript errors
- [ ] Set every variable in [Minimum to go live](#minimum-to-go-live)
- [ ] Replace placeholder phone/address/social URLs in `src/config/restaurant.ts`
- [ ] Generate real app icons (`/icon-192.png`, `/icon-512.png`, `/icon-maskable.png`) and an OG image (`/og-image.jpg`) — referenced in `manifest.ts` and `lib/seo.ts` but not yet supplied
- [ ] Connect a real database (recommended — see above) or accept that admin edits are ephemeral
- [ ] Point DNS / configure the hosting platform's domain
- [ ] Verify `/admin` is not indexed: confirm `robots.txt` disallows it (already configured in `src/app/robots.ts`)
- [ ] Submit the sitemap (`/sitemap.xml`) to Google Search Console

## Hosting

Built for Vercel (zero-config Next.js deploys, Edge-ready middleware), but any Node host that supports the Next.js App Router works. If self-hosting:

```bash
npm run build
npm run start
```

Security headers and CSP are already configured in `next.config.ts` and apply regardless of host.

## Backups (once a database is connected)

- **Database:** use your provider's automated daily backups (Neon, Supabase, and RDS all offer this out of the box) plus a periodic `pg_dump` to off-platform storage for disaster recovery.
- **Media:** uploaded images currently use object URLs as a placeholder (see `// TODO UploadThing` in `src/components/admin/ImageUploader.tsx`); once a real upload provider (UploadThing/Cloudinary/S3) is connected, rely on its built-in redundancy rather than a separate backup process.
