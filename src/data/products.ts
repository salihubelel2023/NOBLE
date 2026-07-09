import type { Product } from "@/types/product";

/**
 * Mock product data standing in for the database described in
 * /ARCHITECTURE.md Section 4. Every field name here matches a future Postgres
 * column 1:1 (basePrice, compareAtPrice, attributes as JSONB, etc.) so wiring
 * this up to Prisma later is a data-source swap inside this file only —
 * no component that imports from `@/data/products` needs to change.
 *
 * Images are https://placehold.co placeholders — swap for real photography
 * before launch. Each product ships two images so ProductCard's hover
 * crossfade has something to show.
 */

function placeholder(label: string, bg: string, fg: string) {
  return `https://placehold.co/800x1000/${bg}/${fg}?text=${encodeURIComponent(label)}`;
}

export const products: Product[] = [
  {
    id: "prod_heritage_chronograph",
    slug: "heritage-chronograph-automatic",
    name: "Heritage Chronograph",
    brand: "NOBLE",
    categorySlug: "watches",
    shortDescription: "Automatic chronograph in brushed steel, full-grain leather strap.",
    description:
      "A chronograph built for people who notice details. The Heritage Chronograph pairs a self-winding automatic movement with a brushed stainless case and a hand-stitched full-grain leather strap. Sapphire crystal front and back, 100m water resistance, 42-hour power reserve.",
    basePrice: 1240,
    currency: "USD",
    images: [
      { id: "img1", url: placeholder("Heritage Chronograph", "F3F1EC", "0B0B0C"), alt: "NOBLE Heritage Chronograph, front view on ivory background", displayOrder: 0 },
      { id: "img2", url: placeholder("Heritage Chronograph", "0B0B0C", "F3F1EC"), alt: "NOBLE Heritage Chronograph, angled wrist shot on dark background", displayOrder: 1 },
    ],
    variants: [
      { id: "var1", sku: "NB-HC-42-LTH-BRN", label: "42mm / Leather", stockQuantity: 14 },
      { id: "var2", sku: "NB-HC-42-STL", label: "42mm / Steel", priceOverride: 1340, stockQuantity: 9 },
    ],
    attributes: { movement: "Automatic", strapMaterial: "Leather", caseSize: "42mm", color: "Brown", gender: "Men's" },
    rating: 4.8,
    reviewCount: 42,
    isBestSeller: true,
    status: "in-stock",
  },
  {
    id: "prod_meridian_automatic",
    slug: "meridian-automatic",
    name: "Meridian Automatic",
    brand: "NOBLE",
    categorySlug: "watches",
    shortDescription: "Everyday automatic with a clean, symmetrical dial.",
    description:
      "Meridian is the watch you reach for on a normal Tuesday and a black-tie Saturday alike. A clean three-hand dial, applied indices, and a five-link steel bracelet built to outlast trends.",
    basePrice: 980,
    currency: "USD",
    images: [
      { id: "img1", url: placeholder("Meridian Automatic", "F3F1EC", "0B0B0C"), alt: "NOBLE Meridian Automatic, front view on ivory background", displayOrder: 0 },
      { id: "img2", url: placeholder("Meridian Automatic", "0B0B0C", "F3F1EC"), alt: "NOBLE Meridian Automatic, macro dial detail on dark background", displayOrder: 1 },
    ],
    variants: [{ id: "var1", sku: "NB-MA-40-STL-SLV", label: "40mm / Steel", stockQuantity: 22 }],
    attributes: { movement: "Automatic", strapMaterial: "Steel", caseSize: "40mm", color: "Silver", gender: "Men's" },
    rating: 4.7,
    reviewCount: 31,
    isBestSeller: true,
    status: "in-stock",
  },
  {
    id: "prod_aurora_quartz",
    slug: "aurora-quartz",
    name: "Aurora Quartz",
    brand: "NOBLE",
    categorySlug: "watches",
    shortDescription: "Slim quartz dress watch with a gold-toned case.",
    description:
      "Aurora keeps things precise and unfussy: a slim gold-toned case, quartz movement for effortless accuracy, and a supple leather strap that dresses up or down without trying too hard.",
    basePrice: 420,
    compareAtPrice: 520,
    currency: "USD",
    images: [
      { id: "img1", url: placeholder("Aurora Quartz", "F3F1EC", "8C6D3F"), alt: "NOBLE Aurora Quartz, front view on ivory background", displayOrder: 0 },
      { id: "img2", url: placeholder("Aurora Quartz", "8C6D3F", "FAFAF8"), alt: "NOBLE Aurora Quartz, worn on wrist", displayOrder: 1 },
    ],
    variants: [{ id: "var1", sku: "NB-AQ-36-LTH-GLD", label: "36mm / Leather", stockQuantity: 30 }],
    attributes: { movement: "Quartz", strapMaterial: "Leather", caseSize: "36mm", color: "Gold", gender: "Women's" },
    rating: 4.6,
    reviewCount: 58,
    isBestSeller: true,
    status: "in-stock",
  },
  {
    id: "prod_solstice_mechanical",
    slug: "solstice-mechanical",
    name: "Solstice Mechanical",
    brand: "NOBLE",
    categorySlug: "watches",
    shortDescription: "Hand-wound mechanical on a rugged NATO strap.",
    description:
      "A hand-wound mechanical movement, visible through an exhibition case back, on a matte black dial built for contrast and legibility. The NATO strap is functional first — this is a watch meant to be worn, not just looked at.",
    basePrice: 1680,
    currency: "USD",
    images: [
      { id: "img1", url: placeholder("Solstice Mechanical", "F3F1EC", "0B0B0C"), alt: "NOBLE Solstice Mechanical, front view on ivory background", displayOrder: 0 },
      { id: "img2", url: placeholder("Solstice Mechanical", "0B0B0C", "B8935A"), alt: "NOBLE Solstice Mechanical, case-back detail on dark background", displayOrder: 1 },
    ],
    variants: [{ id: "var1", sku: "NB-SM-40-NATO-BLK", label: "40mm / NATO", stockQuantity: 11 }],
    attributes: { movement: "Mechanical", strapMaterial: "NATO", caseSize: "40mm", color: "Black", gender: "Unisex" },
    rating: 4.9,
    reviewCount: 19,
    isBestSeller: true,
    isNew: true,
    status: "in-stock",
  },
  {
    id: "prod_onyx_minimalist",
    slug: "onyx-minimalist",
    name: "Onyx Minimalist",
    brand: "NOBLE",
    categorySlug: "watches",
    shortDescription: "Hidden-lug case, no numerals, nothing extra.",
    description:
      "Onyx strips the watch face down to what matters: two hands and a clean black dial with no numerals, no date window, no distractions. A hidden-lug leather strap keeps the silhouette uninterrupted from every angle.",
    basePrice: 310,
    currency: "USD",
    images: [
      { id: "img1", url: placeholder("Onyx Minimalist", "F3F1EC", "0B0B0C"), alt: "NOBLE Onyx Minimalist, front view on ivory background", displayOrder: 0 },
      { id: "img2", url: placeholder("Onyx Minimalist", "0B0B0C", "F3F1EC"), alt: "NOBLE Onyx Minimalist, side profile on dark background", displayOrder: 1 },
    ],
    variants: [{ id: "var1", sku: "NB-OM-38-LTH-BLK", label: "38mm / Leather", stockQuantity: 40 }],
    attributes: { movement: "Quartz", strapMaterial: "Leather", caseSize: "38mm", color: "Black", gender: "Unisex" },
    rating: 4.5,
    reviewCount: 76,
    isBestSeller: true,
    status: "in-stock",
  },
  {
    id: "prod_regent_classic",
    slug: "regent-classic",
    name: "Regent Classic",
    brand: "NOBLE",
    categorySlug: "watches",
    shortDescription: "Domed crystal, railway track dial, old-world proportions.",
    description:
      "Regent looks to the mid-century for its proportions: a domed acrylic-style crystal, a railway-track minute ring, and dauphine hands. Automatic movement, steel bracelet, and a dial that ages like a good idea.",
    basePrice: 1450,
    currency: "USD",
    images: [
      { id: "img1", url: placeholder("Regent Classic", "F3F1EC", "0B0B0C"), alt: "NOBLE Regent Classic, front view on ivory background", displayOrder: 0 },
      { id: "img2", url: placeholder("Regent Classic", "0B0B0C", "F3F1EC"), alt: "NOBLE Regent Classic, bracelet detail on dark background", displayOrder: 1 },
    ],
    variants: [{ id: "var1", sku: "NB-RC-42-STL-SLV", label: "42mm / Steel", stockQuantity: 8 }],
    attributes: { movement: "Automatic", strapMaterial: "Steel", caseSize: "42mm", color: "Silver", gender: "Men's" },
    rating: 4.7,
    reviewCount: 24,
    isBestSeller: true,
    status: "in-stock",
  },
  {
    id: "prod_lumiere_ladies_quartz",
    slug: "lumiere-ladies-quartz",
    name: "Lumière Ladies Quartz",
    brand: "NOBLE",
    categorySlug: "watches",
    shortDescription: "Petite gold-toned case with a mother-of-pearl-style dial.",
    description:
      "Lumière is built for a smaller wrist without shrinking the details: a gold-toned steel case, a soft pearlescent dial finish, and a fine link bracelet with a secure fold-over clasp.",
    basePrice: 540,
    currency: "USD",
    images: [
      { id: "img1", url: placeholder("Lumiere Ladies Quartz", "F3F1EC", "8C6D3F"), alt: "NOBLE Lumière Ladies Quartz, front view on ivory background", displayOrder: 0 },
      { id: "img2", url: placeholder("Lumiere Ladies Quartz", "8C6D3F", "FAFAF8"), alt: "NOBLE Lumière Ladies Quartz, worn on wrist", displayOrder: 1 },
    ],
    variants: [{ id: "var1", sku: "NB-LL-34-STL-GLD", label: "34mm / Steel", stockQuantity: 17 }],
    attributes: { movement: "Quartz", strapMaterial: "Steel", caseSize: "34mm", color: "Gold", gender: "Women's" },
    rating: 4.8,
    reviewCount: 38,
    isBestSeller: true,
    status: "in-stock",
  },
  {
    id: "prod_atlas_diver_automatic",
    slug: "atlas-diver-automatic",
    name: "Atlas Diver Automatic",
    brand: "NOBLE",
    categorySlug: "watches",
    shortDescription: "200m dive-rated automatic with a unidirectional bezel.",
    description:
      "Atlas is rated to 200m with a unidirectional timing bezel, a screw-down crown, and a lume-filled dial legible in low light. The rubber strap is vulcanized for durability, not just water resistance.",
    basePrice: 1120,
    currency: "USD",
    images: [
      { id: "img1", url: placeholder("Atlas Diver Automatic", "F3F1EC", "0B0B0C"), alt: "NOBLE Atlas Diver Automatic, front view on ivory background", displayOrder: 0 },
      { id: "img2", url: placeholder("Atlas Diver Automatic", "0B0B0C", "6E6E73"), alt: "NOBLE Atlas Diver Automatic, bezel detail on dark background", displayOrder: 1 },
    ],
    variants: [{ id: "var1", sku: "NB-AD-44-RBR-BLU", label: "44mm / Rubber", stockQuantity: 3 }],
    attributes: { movement: "Automatic", strapMaterial: "Rubber", caseSize: "44mm", color: "Blue", gender: "Men's" },
    rating: 4.6,
    reviewCount: 29,
    isBestSeller: true,
    status: "low-stock",
  },
  {
    id: "prod_cadence_slim_quartz",
    slug: "cadence-slim-quartz",
    name: "Cadence Slim Quartz",
    brand: "NOBLE",
    categorySlug: "watches",
    shortDescription: "Ultra-thin quartz, unisex, everyday-priced.",
    description:
      "Cadence proves affordable doesn't mean disposable: an ultra-thin quartz case at 6.5mm, a matte black dial, and a leather strap sized to fit most wrists comfortably.",
    basePrice: 265,
    currency: "USD",
    images: [
      { id: "img1", url: placeholder("Cadence Slim Quartz", "F3F1EC", "0B0B0C"), alt: "NOBLE Cadence Slim Quartz, front view on ivory background", displayOrder: 0 },
      { id: "img2", url: placeholder("Cadence Slim Quartz", "0B0B0C", "F3F1EC"), alt: "NOBLE Cadence Slim Quartz, profile view showing thin case", displayOrder: 1 },
    ],
    variants: [{ id: "var1", sku: "NB-CS-38-LTH-BLK", label: "38mm / Leather", stockQuantity: 26 }],
    attributes: { movement: "Quartz", strapMaterial: "Leather", caseSize: "38mm", color: "Black", gender: "Unisex" },
    rating: 4.4,
    reviewCount: 12,
    status: "in-stock",
  },
  {
    id: "prod_voyager_gmt",
    slug: "voyager-gmt",
    name: "Voyager GMT",
    brand: "NOBLE",
    categorySlug: "watches",
    shortDescription: "Dual-time automatic for people who live across time zones.",
    description:
      "Voyager adds a 24-hour GMT hand and rotating bezel to an automatic base — built for people tracking a second time zone as often as their own. Currently between production runs.",
    basePrice: 1890,
    currency: "USD",
    images: [
      { id: "img1", url: placeholder("Voyager GMT", "F3F1EC", "0B0B0C"), alt: "NOBLE Voyager GMT, front view on ivory background", displayOrder: 0 },
      { id: "img2", url: placeholder("Voyager GMT", "0B0B0C", "F3F1EC"), alt: "NOBLE Voyager GMT, bezel detail on dark background", displayOrder: 1 },
    ],
    variants: [{ id: "var1", sku: "NB-VG-42-STL-BLK", label: "42mm / Steel", stockQuantity: 0 }],
    attributes: { movement: "Automatic", strapMaterial: "Steel", caseSize: "42mm", color: "Black", gender: "Men's" },
    rating: 4.9,
    reviewCount: 8,
    status: "out-of-stock",
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}

export function getBestSellers(limit?: number) {
  const bestSellers = products.filter((product) => product.isBestSeller);
  return typeof limit === "number" ? bestSellers.slice(0, limit) : bestSellers;
}

export function searchProducts(query: string, limit = 5) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];
  return products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(normalized) ||
        product.brand.toLowerCase().includes(normalized) ||
        product.shortDescription.toLowerCase().includes(normalized)
    )
    .slice(0, limit);
}

/**
 * "You May Also Like" pulls from the same category within a similar price
 * band, not random cross-selling — showing a $200 strap next to a $3,000
 * watch undermines both products' positioning. See wireframe notes on
 * Product Detail.
 */
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((candidate) => candidate.id !== product.id && candidate.categorySlug === product.categorySlug)
    .sort((a, b) => Math.abs(a.basePrice - product.basePrice) - Math.abs(b.basePrice - product.basePrice))
    .slice(0, limit);
}
