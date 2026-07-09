# NOBLE

Precision watches for people who don't need to say a word. A production-grade
Next.js 15 storefront, architected so future categories (Bags, Perfumes,
Sunglasses, Wallets, Jewelry, Accessories, Textiles) plug in as data, not
rewrites — see [`ARCHITECTURE.md`](./ARCHITECTURE.md).

## Stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui ·
Framer Motion · Zustand · Lucide Icons

## Getting Started

Requires Node.js 20.9 or later.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## What's built — full site, all pages

Every page from the original brief is now built end to end:

- **Home** — Hero, Featured Collections, Why Choose Noble, Best Sellers, Testimonials, Instagram Gallery, Newsletter.
- **Catalog** (`/catalog/watches`) — search, sort, and category-agnostic filtering (Brand, Price, Movement, Strap Material, Case Size, Color, Gender), all driven by URL state. Mobile bottom-sheet filters, active filter chips, "Load More" pagination, a rich zero-results state.
- **Product Detail** (`/product/[slug]`) — sticky swipeable gallery, variant selection with live pricing, real Add to Cart + Wishlist, sticky mobile buy bar, out-of-stock "Notify Me," accordioned Description/Specifications/Shipping/Reviews, related products, Product + BreadcrumbList JSON-LD.
- **About** — manifesto hero, alternating story sections, values, single closing CTA.
- **Contact** — WhatsApp/Call/Email quick actions (WhatsApp first, per the brief) plus a validated contact form.
- **FAQ** — searchable, grouped by topic, single-open accordion, FAQPage JSON-LD.
- **Policies** — Shipping, Returns & Warranty, Privacy, Terms, sharing one cross-linked layout.
- **Wishlist** — real Zustand-backed saved items, reusing ProductCard directly.
- **Account** — future-ready shell (Overview, Orders, Addresses, Settings) with placeholder data.
- **Checkout** — its own stripped-down layout (logo + "Secure Checkout" only, no nav), real 3-step guest flow (Shipping → Payment → Review) reading live cart data, sticky/collapsible order summary, mock order confirmation.

Cart and Wishlist are real, working Zustand stores (persisted to
localStorage) — add a product from its detail page, see the navbar badge
update, carry it through to Checkout, and place a (simulated) order.

### Known placeholders to swap before launch

- **Product photography** — every image is a labeled `placehold.co`
  placeholder. Swap the `images` URLs in `data/products.ts`; `next/image`
  and the hover-crossfade layout are already wired for it.
- **Business contact details** — WhatsApp number, phone, and email in
  `src/lib/constants.ts` are marked `TODO` with placeholder values.
- **Pricing currency** — defaults to USD via `src/lib/format.ts`.
- **Favicon** — `lib/seo.ts` points to `/favicon.ico`; add a real one at
  `src/app/favicon.ico`.
- **Legal copy** — `data/policies.ts` is realistic template content, not
  reviewed legal language. Have counsel finalize Privacy and Terms before
  launch.
- **Payment gateway** — Checkout's payment step collects a payment
  *method* selection only; no processor is wired up yet (see
  `components/checkout/checkout-flow.tsx`).

## Project Structure

See [`ARCHITECTURE.md`](./ARCHITECTURE.md) for the full reasoning. Quick
orientation:

```
src/
├── app/
│   ├── layout.tsx        True root: html/body, fonts, metadata only
│   ├── not-found.tsx     Branded 404
│   ├── (site)/           Route group: everything sharing Navbar+Footer
│   │   ├── page.tsx, about/, contact/, faq/, policies/,
│   │   └── catalog/, product/, wishlist/, account/
│   └── checkout/         Sibling of (site) — its own minimal layout
├── components/
│   ├── ui/               shadcn primitives (Button, Input, Sheet)
│   ├── layout/            Navbar, Footer, MobileMenu, SearchOverlay
│   ├── home/, catalog/, product/, checkout/, faq/, policies/,
│   │   account/, about/, contact/    One folder per page's own pieces
│   ├── shared/            Cross-page reusable pieces (PriceTag, CTAButton,
│   │                      Breadcrumbs, EmptyState...)
│   └── motion/            FadeIn — the single Framer Motion client boundary
├── data/                 Swappable data layer (mock today, DB-backed later)
├── types/                 Product, Category, Testimonial shapes
├── store/ + hooks/        Zustand state, accessed only through hooks/
└── lib/                   utils, constants, catalog-filters, price/SEO formatting
```

## Notes on this build pass

- Built by hand, file by file — not via `create-next-app`/`shadcn` CLI
  scaffolding, since those need network access. Every shadcn primitive
  matches current shadcn/ui + Tailwind v4 conventions.
- The `(site)` / `checkout` route-group split exists specifically so
  Checkout can strip its navigation down without duplicating the root
  layout — see `ARCHITECTURE.md`.
- No `.env` file yet — nothing in this build needs a secret. One will be
  introduced when the data layer moves from mock arrays to a real database.
