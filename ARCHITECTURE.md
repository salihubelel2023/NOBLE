# NOBLE — Architecture Reference

This file is the condensed, in-repo version of the architecture decisions made
before any code was written. Source code comments throughout the project
point back to specific sections here (e.g. `// see /ARCHITECTURE.md Section 3`)
— this file is what those comments are citing.

The guiding principle behind every decision below:

> **Products are generic. Categories are configuration, not code.**

A watch and a future perfume bottle flow through the same `ProductCard`, the
same catalog filters, the same checkout — only the *data* differs.

---

## Section 1 — Folder Boundaries

- `app/` contains routing only — no business logic. If a `page.tsx` needs
  40+ lines of logic, that logic belongs in a hook or component.
- **Route groups**: the true root `app/layout.tsx` holds only html/body,
  fonts, and metadata. Every standard-chrome page (Home, Catalog, Product,
  About, Contact, FAQ, Policies, Wishlist, Account) lives inside
  `app/(site)/` and shares `(site)/layout.tsx` (Navbar + Footer + WhatsApp
  button). `app/checkout/` is a sibling of `(site)`, not a child of it, with
  its own minimal layout (logo + "Secure Checkout" label only) — full
  navigation at the moment of payment gives the customer an obvious exit
  ramp, which is exactly what checkout should not offer. Route groups
  (parentheses in the folder name) never affect the URL: `/about` is still
  `/about` whether it's nested in `(site)` or not.
- `data/` is the swappable data-access layer. Today it exports hardcoded
  arrays; later it exports the same *shapes* from real database calls.
  Every component imports from `data/`, never from a raw array or a
  database client directly.
- `types/` is centralized so a `Product` is defined once, and every mock
  entry, component, and future API response conforms to that one shape.

## Section 3 — Component Hierarchy & the Server/Client Boundary

Layers, in dependency order, where a lower layer never imports a higher one:

0. **Primitives** (`components/ui`) — untouched shadcn/Radix wrappers.
2. **Shared** (`components/shared`) — category-agnostic, cross-domain pieces.
3. **Feature** (`components/home`, `product`, `catalog`...) — domain UI.
4. **Layout** (`components/layout`) — Navbar, Footer, mounted once.
5. **Pages** (`app/**/page.tsx`) — compose feature components, fetch data.

Every component is a Server Component by default in the App Router. The
senior move is pushing `"use client"` as far down the tree as possible —
wrapping only the interactive sliver, not the whole section — so most of
the page ships zero JavaScript.

**Concretely, in this codebase:** `ProductCard` is a Server Component; only
its child `WishlistToggleButton` is a Client Component. Every Home page
section is a Server Component except `Testimonials` (genuine carousel
state); scroll-reveal animation is handled by a single small Client
Component, `FadeIn` (`components/motion/fade-in.tsx`), which sections wrap
around otherwise-static content rather than becoming Client Components
themselves — Framer Motion cannot run in a Server Component at all, so this
wrapper is the boundary, not the section around it.

## Section 4 — Database Schema (future)

Not implemented yet — `data/*.ts` stands in for it — but every field name
in `types/product.ts` and `types/category.ts` mirrors a planned Postgres
column 1:1, so wiring up Prisma later is a data-source swap inside `data/`
only.

The mechanism that lets a category plug in without a migration:
`CategoryAttributeDefinition` (see `types/category.ts`) — a table describing
which attributes each category expects. `Product.attributes` will be a
JSONB column validated against it. `FilterSidebar` (Catalog build step) will
loop over whatever `CategoryAttributeDefinition` rows exist for the active
category and render the right filter inputs — no new frontend code per
category.

## Section 9 — Reusable Components

| Component | Reused across | Why |
|---|---|---|
| `ProductCard` | Best Sellers, Catalog, Wishlist, Search results | One `Product` prop in, consistent card out |
| `PriceTag` | Everywhere a price appears | Currency formatting + sale strikethrough in one place |
| `CTAButton` | Every page | Wraps shadcn `Button`, enforces only the two approved variants (solid/outline) |
| `SectionHeading` | Every homepage/category section | Eyebrow + heading + optional CTA, consistent rhythm |
| `BadgeStatus` | ProductCard, (future) Product Detail | Single source of truth for New/Low Stock/Sold Out styling |
| `FadeIn` | Every section needing scroll-reveal | The one Client Component boundary for Framer Motion |

## Section 10 — SEO Strategy

- `generateMetadata()` per dynamic route (Product Detail build step), title
  template `%s | NOBLE` from `lib/seo.ts`.
- `sitemap.ts` queries `data/categories.ts` and `data/products.ts` directly
  — a new product or category is included on the next build with zero
  manual sitemap edits.
- `next/font` (self-hosted Fraunces + Inter) avoids a render-blocking
  external font request and prevents layout shift.
- Descriptive slugs everywhere (`/product/heritage-chronograph-automatic`),
  never ID-only paths.

## Section 11 — Scalability Plan for Future Categories

To launch Perfumes (or Bags, Sunglasses, Wallets, Jewelry, Accessories,
Textiles) later:

1. Add one object to `data/categories.ts` with its own
   `attributeDefinitions` (e.g. `scentFamily`, `volumeMl`).
2. Add `Product` rows with `categorySlug: "perfumes"` and matching
   `attributes`.
3. **Nothing else changes.** `Navbar`, `FeaturedCollections`, and the
   Catalog build step's `FilterSidebar` all read from `data/categories.ts`
   — the new nav link, collection card, and filter set appear
   automatically.
4. `sitemap.ts` picks up the new URLs on the next build.

Launching a new vertical becomes a data-entry exercise, not an engineering
project.
