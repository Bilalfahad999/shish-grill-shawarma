# Shish Shawarma & Grill

Production-ready website and admin dashboard for Shish Shawarma & Grill — a Melbourne-based halal charcoal grill restaurant. Built with the Next.js App Router, fully functional without a database (mock-data fallback), and architected to drop in PostgreSQL + Prisma when ready.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion (see [`src/lib/motion.ts`](src/lib/motion.ts) for the shared variant system)
- **Forms:** React Hook Form + Zod
- **Auth:** NextAuth (Auth.js v5), credentials provider
- **Database:** Prisma + PostgreSQL (optional — see [Database](#database) below)
- **Email:** Resend
- **PDF generation:** @react-pdf/renderer
- **Toasts:** sonner

## Getting Started

```bash
npm install
cp .env.example .env       # fill in what you have; everything has a safe fallback
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the storefront, and [http://localhost:3000/admin/login](http://localhost:3000/admin/login) for the admin dashboard.

**Dev admin login** (only works when `NODE_ENV=development` and no `ADMIN_EMAIL`/`ADMIN_PASSWORD_HASH` are set):
`admin@shishgrill.com.au` / `admin123`

## Documentation

| Guide | What it covers |
|---|---|
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Folder structure, data flow, the mock-data → Prisma migration path |
| [docs/ADMIN_GUIDE.md](docs/ADMIN_GUIDE.md) | How to use the dashboard (menu, orders, catering, content, settings) |
| [docs/DEVELOPER_GUIDE.md](docs/DEVELOPER_GUIDE.md) | Conventions, the design system, the animation system, how to add a feature |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | Environment variables, production checklist, hosting notes |

## Project Status

This codebase was built in phases; each phase's output is fully functional:

1. **Storefront** — homepage, design system, brand identity
2. **Menu** — full menu browsing, search, filtering, item detail modal
3. **Ordering** — cart, checkout, coupons, order confirmation
4. **Trust pages** — About, Gallery, Catering, Contact, FAQ
5. **Admin dashboard** — full CMS (menu, orders, catering, gallery, reviews, settings) running on mock data, architected for Prisma
6. **Integrations** — transactional email, PDF receipts, WhatsApp deep links, SEO (sitemap/robots/structured data), security headers, error pages
7. **Polish** — animation system, loading/empty/success states, accessibility audit, performance audit, this documentation

Payment processing (Stripe), the Google Maps embed, and reCAPTCHA are scaffolded with clear `// TODO` markers but require API keys to activate — see [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Scripts

```bash
npm run dev      # start dev server (Turbopack)
npm run build    # production build
npm run start    # run a production build
npm run lint     # ESLint
```

## Database

The app runs entirely on typed mock data in [`src/lib/mock-data.ts`](src/lib/mock-data.ts) until `DATABASE_URL` is configured. Every Server Action in [`src/lib/actions/`](src/lib/actions/) has a `// TODO Prisma:` comment showing the exact query to swap in — see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md#database--the-mock-data-pattern) for the full migration path.
