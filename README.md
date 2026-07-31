# NOBLE

Noble watches, Move Noble. A production-grade Next.js 15 storefront with a
real admin dashboard behind it — architected so future categories (Bags,
Perfumes, Sunglasses, Wallets, Jewelry, Accessories, Textiles) plug in as
data, not rewrites. See [`ARCHITECTURE.md`](./ARCHITECTURE.md) for the
storefront's architecture and [`ADMIN_SETUP.md`](./ADMIN_SETUP.md) for the
admin panel.

## Stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui ·
Framer Motion · Zustand · Lucide Icons · Prisma · SQLite

## Getting Started

Requires Node.js 20.9 or later.

```bash
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

Storefront: [http://localhost:3000](http://localhost:3000)
Admin: [http://localhost:3000/admin/login](http://localhost:3000/admin/login) — see [`ADMIN_SETUP.md`](./ADMIN_SETUP.md) for your login and full setup notes.

## What's built — the complete site, storefront + admin

**Storefront** — every page from the original brief: Home, Catalog
(search/sort/filter, all URL-driven), Product Detail (real Add to Cart,
variant selection, reviews), About, Contact, FAQ, Policies, Wishlist,
Account, and a real 3-step guest Checkout that writes an actual Order to
the database.

**Admin dashboard** (`/admin`) — real, database-backed, behind a login:
- **Products** — full create/edit/delete, with category-specific attribute
  fields rendered automatically (the same pattern the storefront's filters
  use), image URLs, variants/SKUs, and a per-product shipping estimate.
- **Categories** — add a new vertical (e.g. Bags) with its own filterable
  attributes, and it appears in the storefront nav/catalog/filters with
  zero code changes. This is the architecture's central promise, made real.
- **Orders** — every real order placed at Checkout, with status updates.
- **Settings** — WhatsApp, phone, email, Instagram, Facebook, tagline —
  edit once here, it updates everywhere on the site instantly.

Cart and Wishlist are real Zustand stores; Checkout persists to Postgres-
ready SQLite via Prisma; the whole storefront reads live data through the
same admin panel you use to manage it.

## Your business info (already loaded)

Seeded with your real WhatsApp number, phone, email, Instagram
(`@msalihubelel`), Facebook, and tagline ("Noble watches, Move Noble").
Pricing is in **NGN (₦)** throughout. Full detail, including your admin
login, is in [`ADMIN_SETUP.md`](./ADMIN_SETUP.md).

### Still to add later (no code needed — do it in `/admin` once it's running)

- **Real products** — the 10 seeded watches are placeholders; add your
  actual catalog through `/admin/products` whenever you're ready.
- **Real product photography** — swap the `placehold.co` image URLs per
  product.
- **Domain** — once you register one, update `siteUrl` in `src/lib/seo.ts`
  (one line; affects the sitemap and social share previews only).
- **CAC-registered legal name**, if it differs from "NOBLE," for the
  footer copyright line and Terms of Service — tell me once it's official.
- **Facebook URL** — I constructed `facebook.com/NobleWatches` from the
  page name you gave me; confirm or correct it in `/admin/settings` if
  your actual username differs.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx        True root: html/body, fonts, metadata only
│   ├── (site)/            Route group: Navbar+Footer chrome — Home, Catalog,
│   │                      Product, About, Contact, FAQ, Policies, Wishlist, Account
│   ├── checkout/           Its own minimal layout (no nav at the moment of payment)
│   └── admin/
│       ├── (auth)/login/   The one public admin route
│       └── (protected)/    Auth-gated: Dashboard, Products, Categories, Orders, Settings
├── components/            ui/, layout/, home/, catalog/, product/, checkout/,
│                           admin/, shared/, motion/ — one folder per concern
├── data/                   The data layer — Prisma-backed (products, categories,
│                           site settings, orders) or static (reviews, FAQ, policies)
├── lib/actions/            Server Actions — every database write goes through one
├── store/ + hooks/          Zustand (cart, wishlist), accessed only through hooks/
└── lib/                     db.ts (Prisma client), auth.ts, password.ts, utils, etc.
prisma/
├── schema.prisma           SQLite now, Postgres-compatible by design
├── seed.ts + seed-data.ts   Populates the database with your real info + mock catalog
```

## Notes on this build pass

- Built by hand, file by file — not via CLI scaffolding, since this
  environment has no functional package registry access. I could not run
  `npm install`, `npx prisma generate/migrate`, or `npm run build` myself;
  everything here was verified by careful static analysis (import
  resolution, bracket balance, async/await consistency, client/server
  boundary checks) rather than an actual compile. Please run `npm run
  build` yourself once you have it locally — if anything surfaces, send it
  over and I'll fix it immediately.
- `.env` is pre-filled and gitignored — fine for local dev, just don't
  commit it anywhere public.
