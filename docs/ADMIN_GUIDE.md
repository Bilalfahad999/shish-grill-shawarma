# Admin Guide

The dashboard lives at `/admin`. Log in at `/admin/login`.

## Dashboard Home

Today's order count and revenue, active orders, pending catering requests, a 7-day order chart, and the most recent orders/catering enquiries. Everything here is read-only — click through to act on something.

## Menu

- **Menu** (`/admin/menu`) — every menu item as a card: image, price, category, badge. Search filters by name or category.
  - **Available / Unavailable** toggle — instantly hides an item from the public menu without deleting it. Use this for "sold out today."
  - The **⋯** menu on each card: **Duplicate** (clone an item to start a variant), **Archive** (soft-remove, keeps order history intact), **Delete** (permanent, asks for confirmation).
  - **Add Item** opens a form: name, price, category, description, image (upload or paste a URL), dietary/property flags (vegetarian, spicy, charcoal-grilled, popular), and an optional badge ("Best Seller", "New").
- **Categories** (`/admin/categories`) — add/rename/hide categories. Hiding a category hides it from the public menu without touching its items. Each row shows how many items are in it.

## Orders

`/admin/orders` lists every order with a status filter (Pending → Preparing → Ready → Completed, or Cancelled) and search by customer name, order reference, or phone. Click into an order to see the full breakdown — items, customer contact, delivery/pickup details, payment method — and to advance its status with one click, or cancel it. Every order detail page has a **PDF** button for a printable receipt.

## Catering

`/admin/catering` lists enquiries with a status pipeline (New → Contacted → Quoted → Confirmed → Completed, or Archived). Each enquiry detail page lets you update status, write internal notes (visible only to staff), and download a PDF summary — useful for forwarding to a kitchen manager.

## Gallery

`/admin/gallery` — add images (upload or paste a URL), assign a category (Food / Restaurant / Kitchen / Events), and mark images as **Featured** to prioritize them on the public gallery. Delete removes an image permanently.

## Reviews

`/admin/reviews` — toggle **Pin** (forces a review to the top), **Feature** (shows it on the homepage), and **Hide** (removes it from public view without deleting it — useful for a review under dispute).

## Site Content

- **Announcements** (`/admin/announcements`) — the dismissible banner shown across the site. Toggle it on/off, set the message, color (info/success/warning), and an optional call-to-action button.
- **Opening Hours** (`/admin/hours`) — per-day open/close times, or mark a day fully closed.
- **Settings** (`/admin/settings`) — restaurant name, contact details, social links, delivery fee/minimum, prep/delivery time estimates, and SEO title/description.

## Profile

`/admin/profile` — update your display name and password.

## Notes

- Every save shows a toast confirmation in the top-right corner.
- Destructive actions (delete) always show a confirmation dialog first.
- The dashboard currently runs on built-in sample data until a database is connected — see [ARCHITECTURE.md](ARCHITECTURE.md#database--the-mock-data-pattern). Changes you make persist for your session but reset on server restart until then.
