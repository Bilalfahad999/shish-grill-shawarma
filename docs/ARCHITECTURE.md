# Architecture

## Folder Structure

```
src/
├── app/                      # Next.js App Router — routes, layouts, API handlers
│   ├── (storefront pages)    # /, /menu, /about, /gallery, /catering, /contact, /faq
│   ├── cart/, checkout/, order/success/
│   ├── admin/
│   │   ├── login/            # outside the protected route group
│   │   └── (dashboard)/      # route group — layout.tsx checks auth() and redirects
│   │       ├── menu/, categories/, orders/, catering/
│   │       ├── gallery/, reviews/, announcements/, hours/
│   │       └── settings/, profile/
│   ├── api/
│   │   ├── auth/[...nextauth]/   # NextAuth handlers
│   │   ├── orders/               # checkout submission (validates, persists, emails)
│   │   ├── catering-enquiry/     # catering form submission
│   │   ├── contact/              # contact form submission
│   │   └── admin/{orders,catering}/[id]/pdf/  # PDF generation (auth-gated)
│   ├── sitemap.ts, robots.ts, manifest.ts
│   ├── error.tsx, global-error.tsx, not-found.tsx, offline/
│   └── layout.tsx             # fonts, metadata, JSON-LD, MotionConfig, skip link
│
├── components/
│   ├── ui/                    # generic primitives: PrimaryButton, SectionTitle, Skeleton
│   ├── motion/                # Reveal, RevealGroup, ScrollProgress — see DEVELOPER_GUIDE
│   ├── admin/                 # Sidebar, Topbar, ConfirmDialog, MenuItemForm, etc.
│   ├── order/                 # cart, checkout step forms
│   ├── seo/                   # JsonLd
│   └── {about,catering,contact,faq,gallery,menu}/   # page-specific sections
│
├── lib/
│   ├── actions/                # Server Actions ("use server") — the data layer
│   ├── email-templates/        # HTML email builders
│   ├── pdf/                    # @react-pdf/renderer document templates
│   ├── auth.ts                 # NextAuth config
│   ├── mock-data.ts            # fallback data used until DATABASE_URL is set
│   ├── order-labels.ts         # shared pickup-time / payment-method labels
│   ├── motion.ts                # animation variant system
│   ├── seo.ts                  # metadata + JSON-LD builders
│   ├── rate-limit.ts           # in-memory rate limiter for public API routes
│   └── whatsapp.ts             # WhatsApp deep-link message builders
│
├── config/                     # RESTAURANT_CONFIG, site copy, gallery data
├── data/menu.ts                 # public menu content (categories + items)
├── context/CartContext.tsx      # client-side cart state
└── types/                      # admin.ts (CMS types), order.ts (storefront types)

prisma/schema.prisma            # full schema, ready for `DATABASE_URL`
```

## Data Flow

**Storefront** reads static config (`src/config`, `src/data/menu.ts`) at build/render time — there's no database dependency for browsing the menu or reading page content. Cart state lives in `CartContext` (React context + `sessionStorage`).

**Checkout** posts to `/api/orders`, which validates with Zod, sends confirmation emails (customer + restaurant), and — once Prisma is connected — will persist the order. The success page reads the order back from `sessionStorage` to avoid a round-trip.

**Admin dashboard** is a fully protected route group (`src/app/admin/(dashboard)/`). Every page calls a Server Action from `src/lib/actions/`, which currently reads/writes `mock-data.ts` and has the exact Prisma query commented above each mock implementation.

## Database — the mock-data pattern

The app is designed to run completely standalone. Every mutating Server Action follows this shape:

```ts
export async function updateOrderStatus(id: string, status: OrderStatus) {
  const session = await auth();
  if (!session) return { success: false, error: "Unauthorized" };

  // TODO Prisma: await prisma.order.update({ where: { id }, data: { status } })
  revalidatePath("/admin/orders");
  return { success: true, data: undefined };
}
```

To connect a real database:

1. Set `DATABASE_URL` in `.env`
2. Run `npx prisma generate && npx prisma migrate dev`
3. Go through `src/lib/actions/*.ts` and uncomment/implement the `// TODO Prisma:` line in each function, replacing the mock-data read/write
4. Swap `src/lib/auth.ts`'s commented Prisma block back in for `AdminUser` lookups

No component code needs to change — they only ever call the Server Actions, never `mock-data.ts` directly.

## Auth

NextAuth v5 (Auth.js), JWT sessions, Credentials provider. `src/middleware.ts` protects `/admin/*` (except `/admin/login`). Login falls back, in order: Prisma `AdminUser` (commented until DB is connected) → `ADMIN_EMAIL`/`ADMIN_PASSWORD_HASH` env vars (bcrypt) → a hardcoded dev-only credential when `NODE_ENV=development`.

## Animation system

See [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md#animation-system) — all scroll/hover/tap animations should use `src/lib/motion.ts` variants rather than ad-hoc Framer Motion props.
