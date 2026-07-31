# NOBLE Admin — Setup & Reference

This is the doc that in-code comments point to (`// see ADMIN_SETUP.md`).

## First-time setup

```bash
npm install
npm run db:migrate    # creates prisma/dev.db and the tables, prompts for a migration name
npm run db:seed       # loads the watch catalog + your real business info + your admin login
npm run dev
```

Then visit `http://localhost:3000/admin/login`.

`.env` is already filled in with real values (see below) — you don't need to create it yourself for local development.

## Your login

```
Email:    salihubelel2023@gmail.com
Password: Admin12@
```

This is a temporary password. Change it by editing `ADMIN_PASSWORD` in `.env`, deleting the existing row (`npx prisma studio` → AdminUser table → delete the row, or `rm prisma/dev.db` to start clean), and re-running `npm run db:seed`. A proper "change password" screen inside `/admin/settings` is a natural next addition, not yet built.

## What's already loaded

Running `db:seed` populates:
- **Watches category**, with its 5 filterable attributes (Movement, Strap Material, Case Size, Color, Gender)
- **10 mock products**, priced in NGN, each with a per-product shipping estimate
- **Site settings** — your real WhatsApp number, phone, email, Instagram, Facebook, and tagline
- **Your admin account**

Product photography is still `placehold.co` placeholders — replace image URLs per product from `/admin/products` whenever you have real photos hosted somewhere.

One assumption worth double-checking: the Facebook URL was constructed as `facebook.com/NobleWatches` from the page name you gave me ("Noble Watches") — Facebook page usernames can't contain spaces, but I don't know your *exact* username. Confirm it's right (or fix it) in `/admin/settings`.

## How auth actually works (two layers, on purpose)

1. **`src/middleware.ts`** — runs in the Edge runtime on every request to `/admin/*`. It only checks whether a session cookie *exists*. That's it — no database call, because Prisma doesn't run in the Edge runtime. This catches "never logged in" instantly.
2. **`src/app/admin/(protected)/layout.tsx`** — runs in the normal Node.js runtime, on every request to any protected admin page. This is where the cookie is actually looked up in the `Session` table and checked for expiry. This is the real gate.

Practically: middleware gets you a fast redirect for the common case; the protected layout is what you'd actually audit if you cared about security correctness.

## Adding a new product category (the "no redesign" proof)

Go to `/admin/categories`, fill in a name, slug, and however many filterable attributes it needs (e.g., for Bags: `material` / Material / "Leather, Canvas, Nylon", `size` / Size / "Small, Medium, Large"). Submit.

That's it. The new category now:
- Appears in the storefront navbar and mobile menu
- Gets its own `/catalog/<slug>` page with working filters for exactly the attributes you defined
- Is selectable in the Product form's category dropdown, which renders the right attribute fields for it automatically

No code was touched. This is the architecture's central promise, made real.

## Known v1 limitations (deliberate, not oversights)

- **Images are URLs, not uploads.** Real drag-and-drop upload needs a storage provider (Vercel Blob, Cloudinary, S3...) with its own account — pick one and share an API key, and swapping the URL field for a real upload button is a contained addition.
- **One admin account, no roles.** Fine for a single owner-operator; a `role` field on `AdminUser` is the natural extension if you add staff later.
- **Reviews stay static** (`src/data/reviews.ts`) — not part of the database yet. Ratings/review counts on each product are plain numbers you can edit directly on the product form.
- **Testimonials, FAQ, and Policy page content** also stay static files, editable by hand (or ask me) — these change rarely enough that a full CMS UI for them isn't worth it yet.
- **No email notifications** on order placement — the confirmation screen is what the customer sees; nothing gets emailed yet.

## Currency

Everything is NGN (₦) — schema defaults, seed data, `formatPrice`. If this ever needs to change again, the values to touch are: `formatPrice`'s defaults in `src/lib/format.ts`, the `currency` default in `prisma/schema.prisma`, and the per-product `currency` field (editable per product in the admin form already, so most of this is a data change, not a code change).
