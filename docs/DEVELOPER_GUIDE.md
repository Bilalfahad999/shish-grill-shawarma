# Developer Guide

## Design System

| Token | Value | Use |
|---|---|---|
| Terracotta | `#B54E32` | Primary brand color, CTAs |
| Burnt orange | `#D96C2F` | Secondary accent, hover states |
| Sage | `#6E8B5C` | Success states, "halal/fresh" accents |
| Cream | `#FAF7F2` | Page background |
| Sand | `#F2ECE3` | Card/section background |
| Charcoal | `#2F2F2F` | Body text, dark sections |

Fonts: `Cormorant Garamond` (`font-heading`, headings) and `Inter` (`font-body` / `font-sans`, everything else) — both loaded via `next/font/google` in `src/app/layout.tsx`. Both map to CSS variables (`--font-cormorant`, `--font-inter`) consumed through Tailwind's `@theme inline` block in `globals.css`.

**Do not introduce new colors or fonts.** If a page needs a new visual treatment, compose it from these tokens.

## Animation System

All animation should pull from `src/lib/motion.ts` rather than inlining Framer Motion variant objects:

```tsx
import { Reveal } from "@/components/motion/Reveal";
import { fadeUp, scaleIn } from "@/lib/motion";

<Reveal variants={fadeUp}>...</Reveal>          // scroll-triggered fade-up (default)
<Reveal variants={scaleIn} delay={0.1}>...</Reveal>
```

For staggered lists:

```tsx
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";

<RevealGroup className="grid grid-cols-3 gap-4">
  {items.map((item) => <RevealItem key={item.id}>...</RevealItem>)}
</RevealGroup>
```

For hover/tap presets on interactive elements, spread `hoverLift`, `hoverScale`, or `tapPress` from `src/lib/motion.ts` onto a `motion.*` element.

**Reduced motion is handled globally** — `<MotionConfig reducedMotion="user">` wraps the whole app in `src/components/Providers.tsx`, so individual components never need to check `prefers-reduced-motion` themselves. The same media query also collapses plain CSS transitions in `globals.css`.

## Conventions

- **Server Actions, not API routes, for admin mutations.** Public-facing form submissions (orders, contact, catering) use `/api/*` route handlers instead, because they need Zod validation + rate limiting before any session-aware logic runs.
- **Every admin mutation ends with a toast.** Import `toast` from `sonner` and call `toast.success(...)` after a successful Server Action call (see any file in `src/app/admin/(dashboard)/`).
- **Destructive admin actions use `<ConfirmDialog>`**, never `window.confirm`.
- **Shared lookups live in `src/lib/`,  not duplicated per-component.** Example: pickup-time and payment-method labels are in `src/lib/order-labels.ts` and consumed by the email templates, the PDF receipt, the WhatsApp message builder, and the checkout review step — don't redefine them locally.
- **Loading states are `loading.tsx` files**, not inline spinners — see any `src/app/**/loading.tsx` for the skeleton pattern (`Skeleton`, `TableSkeleton`, `GridSkeleton` in `src/components/{ui,admin}`).
- **Icon-only buttons need `aria-label`.** Search/filter inputs that rely on a placeholder for context need one too — placeholders aren't read reliably by all assistive tech.
- **Labels need `htmlFor` + matching `id`.** Wrapping a checkbox/radio directly in `<label>` is also valid and doesn't need `htmlFor`.

## Adding a New Admin CRUD Page

1. Add the Server Actions to `src/lib/actions/<domain>.ts` (or extend an existing file), following the `// TODO Prisma:` comment pattern used elsewhere.
2. Add the mock data to `src/lib/mock-data.ts` and the type to `src/types/admin.ts`.
3. Build the page under `src/app/admin/(dashboard)/<route>/page.tsx` — copy the structure of `menu/page.tsx` (list view) or `catering/[id]/page.tsx` (detail view) as a starting point.
4. Add a `loading.tsx` sibling using `TableSkeleton` or `GridSkeleton`.
5. Add the nav entry to `src/components/admin/Sidebar.tsx`.

## Testing the Build

```bash
npm run build
```

This runs the TypeScript compiler and Next's production build — treat any new error as blocking. There's no test suite configured yet; if you add one, Vitest + React Testing Library for components and Playwright for the checkout/admin-login flows are the natural fit given the stack.

## Environment Variables

See `.env.example` — every variable has an inline comment explaining what it's for and what happens if it's left unset.
