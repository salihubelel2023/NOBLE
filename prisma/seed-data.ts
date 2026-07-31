/**
 * The original mock catalog, preserved here as the seed source.
 *
 * src/data/products.ts and src/data/categories.ts are about to become
 * Prisma-backed (reading from the database instead of an in-memory array)
 * — this file exists so the seed script has a stable, independent copy of
 * the original content to load INTO the database, decoupled from files
 * that are changing what they mean entirely. Nothing here is imported by
 * the app itself; only prisma/seed.ts reads this.
 */

function placeholder(label: string, bg: string, fg: string) {
  return `https://placehold.co/800x1000/${bg}/${fg}?text=${encodeURIComponent(label)}`;
}

interface SeedCategoryAttribute {
  key: string;
  label: string;
  inputType: string;
  options: string[];
  isFilterable: boolean;
  displayOrder: number;
}

interface SeedCategory {
  slug: string;
  name: string;
  description: string;
  displayOrder: number;
  attributes: SeedCategoryAttribute[];
}

interface SeedImage {
  url: string;
  alt: string;
  displayOrder: number;
}

interface SeedVariant {
  sku: string;
  label: string;
  priceOverride?: number;
  stockQuantity: number;
}

interface SeedProduct {
  slug: string;
  name: string;
  brand: string;
  categorySlug: string;
  shortDescription: string;
  description: string;
  basePrice: number;
  compareAtPrice?: number;
  currency: string;
  images: SeedImage[];
  variants: SeedVariant[];
  attributes: Record<string, string>;
  rating: number;
  reviewCount: number;
  isBestSeller?: boolean;
  isNew?: boolean;
  status: string;
  shippingEstimate: string;
}

export const seedCategories: SeedCategory[] = [
  {
    slug: "watches",
    name: "Watches",
    description: "Precision timepieces — automatic, mechanical and quartz — for every wrist and every budget.",
    displayOrder: 1,
    attributes: [
      { key: "movement", label: "Movement", inputType: "select", options: ["Automatic", "Mechanical", "Quartz"], isFilterable: true, displayOrder: 0 },
      { key: "strapMaterial", label: "Strap Material", inputType: "select", options: ["Leather", "Steel", "NATO", "Rubber"], isFilterable: true, displayOrder: 1 },
      { key: "caseSize", label: "Case Size", inputType: "select", options: ["34mm", "36mm", "38mm", "40mm", "42mm", "44mm"], isFilterable: true, displayOrder: 2 },
      { key: "color", label: "Color", inputType: "color", options: ["Black", "Silver", "Gold", "Brown", "Blue"], isFilterable: true, displayOrder: 3 },
      { key: "gender", label: "Gender", inputType: "select", options: ["Men's", "Women's", "Unisex"], isFilterable: true, displayOrder: 4 },
    ],
  },
];

export const seedProducts: SeedProduct[] = [
  {
    slug: "heritage-chronograph-automatic",
    name: "Heritage Chronograph",
    brand: "NOBLE",
    categorySlug: "watches",
    shortDescription: "Automatic chronograph in brushed steel, full-grain leather strap.",
    description: "A chronograph built for people who notice details. The Heritage Chronograph pairs a self-winding automatic movement with a brushed stainless case and a hand-stitched full-grain leather strap. Sapphire crystal front and back, 100m water resistance, 42-hour power reserve.",
    basePrice: 450000,
    currency: "NGN",
    images: [
      { url: placeholder("Heritage Chronograph", "F3F1EC", "0B0B0C"), alt: "NOBLE Heritage Chronograph, front view on ivory background", displayOrder: 0 },
      { url: placeholder("Heritage Chronograph", "0B0B0C", "F3F1EC"), alt: "NOBLE Heritage Chronograph, angled wrist shot on dark background", displayOrder: 1 },
    ],
    variants: [
      { sku: "NB-HC-42-LTH-BRN", label: "42mm / Leather", stockQuantity: 14 },
      { sku: "NB-HC-42-STL", label: "42mm / Steel", priceOverride: 495000, stockQuantity: 9 },
    ],
    attributes: { movement: "Automatic", strapMaterial: "Leather", caseSize: "42mm", color: "Brown", gender: "Men's" },
    rating: 4.8,
    reviewCount: 42,
    isBestSeller: true,
    status: "in-stock",
    shippingEstimate: "Ships in 24–48h",
  },
  {
    slug: "meridian-automatic",
    name: "Meridian Automatic",
    brand: "NOBLE",
    categorySlug: "watches",
    shortDescription: "Everyday automatic with a clean, symmetrical dial.",
    description: "Meridian is the watch you reach for on a normal Tuesday and a black-tie Saturday alike. A clean three-hand dial, applied indices, and a five-link steel bracelet built to outlast trends.",
    basePrice: 350000,
    currency: "NGN",
    images: [
      { url: placeholder("Meridian Automatic", "F3F1EC", "0B0B0C"), alt: "NOBLE Meridian Automatic, front view on ivory background", displayOrder: 0 },
      { url: placeholder("Meridian Automatic", "0B0B0C", "F3F1EC"), alt: "NOBLE Meridian Automatic, macro dial detail on dark background", displayOrder: 1 },
    ],
    variants: [{ sku: "NB-MA-40-STL-SLV", label: "40mm / Steel", stockQuantity: 22 }],
    attributes: { movement: "Automatic", strapMaterial: "Steel", caseSize: "40mm", color: "Silver", gender: "Men's" },
    rating: 4.7,
    reviewCount: 31,
    isBestSeller: true,
    status: "in-stock",
    shippingEstimate: "Ships in 24–48h",
  },
  {
    slug: "aurora-quartz",
    name: "Aurora Quartz",
    brand: "NOBLE",
    categorySlug: "watches",
    shortDescription: "Slim quartz dress watch with a gold-toned case.",
    description: "Aurora keeps things precise and unfussy: a slim gold-toned case, quartz movement for effortless accuracy, and a supple leather strap that dresses up or down without trying too hard.",
    basePrice: 150000,
    compareAtPrice: 185000,
    currency: "NGN",
    images: [
      { url: placeholder("Aurora Quartz", "F3F1EC", "8C6D3F"), alt: "NOBLE Aurora Quartz, front view on ivory background", displayOrder: 0 },
      { url: placeholder("Aurora Quartz", "8C6D3F", "FAFAF8"), alt: "NOBLE Aurora Quartz, worn on wrist", displayOrder: 1 },
    ],
    variants: [{ sku: "NB-AQ-36-LTH-GLD", label: "36mm / Leather", stockQuantity: 30 }],
    attributes: { movement: "Quartz", strapMaterial: "Leather", caseSize: "36mm", color: "Gold", gender: "Women's" },
    rating: 4.6,
    reviewCount: 58,
    isBestSeller: true,
    status: "in-stock",
    shippingEstimate: "Ships in 24–48h",
  },
  {
    slug: "solstice-mechanical",
    name: "Solstice Mechanical",
    brand: "NOBLE",
    categorySlug: "watches",
    shortDescription: "Hand-wound mechanical on a rugged NATO strap.",
    description: "A hand-wound mechanical movement, visible through an exhibition case back, on a matte black dial built for contrast and legibility. The NATO strap is functional first — this is a watch meant to be worn, not just looked at.",
    basePrice: 600000,
    currency: "NGN",
    images: [
      { url: placeholder("Solstice Mechanical", "F3F1EC", "0B0B0C"), alt: "NOBLE Solstice Mechanical, front view on ivory background", displayOrder: 0 },
      { url: placeholder("Solstice Mechanical", "0B0B0C", "B8935A"), alt: "NOBLE Solstice Mechanical, case-back detail on dark background", displayOrder: 1 },
    ],
    variants: [{ sku: "NB-SM-40-NATO-BLK", label: "40mm / NATO", stockQuantity: 11 }],
    attributes: { movement: "Mechanical", strapMaterial: "NATO", caseSize: "40mm", color: "Black", gender: "Unisex" },
    rating: 4.9,
    reviewCount: 19,
    isBestSeller: true,
    isNew: true,
    status: "in-stock",
    shippingEstimate: "Ships in 2–3 business days",
  },
  {
    slug: "onyx-minimalist",
    name: "Onyx Minimalist",
    brand: "NOBLE",
    categorySlug: "watches",
    shortDescription: "Hidden-lug case, no numerals, nothing extra.",
    description: "Onyx strips the watch face down to what matters: two hands and a clean black dial with no numerals, no date window, no distractions. A hidden-lug leather strap keeps the silhouette uninterrupted from every angle.",
    basePrice: 110000,
    currency: "NGN",
    images: [
      { url: placeholder("Onyx Minimalist", "F3F1EC", "0B0B0C"), alt: "NOBLE Onyx Minimalist, front view on ivory background", displayOrder: 0 },
      { url: placeholder("Onyx Minimalist", "0B0B0C", "F3F1EC"), alt: "NOBLE Onyx Minimalist, side profile on dark background", displayOrder: 1 },
    ],
    variants: [{ sku: "NB-OM-38-LTH-BLK", label: "38mm / Leather", stockQuantity: 40 }],
    attributes: { movement: "Quartz", strapMaterial: "Leather", caseSize: "38mm", color: "Black", gender: "Unisex" },
    rating: 4.5,
    reviewCount: 76,
    isBestSeller: true,
    status: "in-stock",
    shippingEstimate: "Ships in 24–48h",
  },
  {
    slug: "regent-classic",
    name: "Regent Classic",
    brand: "NOBLE",
    categorySlug: "watches",
    shortDescription: "Domed crystal, railway track dial, old-world proportions.",
    description: "Regent looks to the mid-century for its proportions: a domed acrylic-style crystal, a railway-track minute ring, and dauphine hands. Automatic movement, steel bracelet, and a dial that ages like a good idea.",
    basePrice: 520000,
    currency: "NGN",
    images: [
      { url: placeholder("Regent Classic", "F3F1EC", "0B0B0C"), alt: "NOBLE Regent Classic, front view on ivory background", displayOrder: 0 },
      { url: placeholder("Regent Classic", "0B0B0C", "F3F1EC"), alt: "NOBLE Regent Classic, bracelet detail on dark background", displayOrder: 1 },
    ],
    variants: [{ sku: "NB-RC-42-STL-SLV", label: "42mm / Steel", stockQuantity: 8 }],
    attributes: { movement: "Automatic", strapMaterial: "Steel", caseSize: "42mm", color: "Silver", gender: "Men's" },
    rating: 4.7,
    reviewCount: 24,
    isBestSeller: true,
    status: "in-stock",
    shippingEstimate: "Ships in 24–48h",
  },
  {
    slug: "lumiere-ladies-quartz",
    name: "Lumière Ladies Quartz",
    brand: "NOBLE",
    categorySlug: "watches",
    shortDescription: "Petite gold-toned case with a mother-of-pearl-style dial.",
    description: "Lumière is built for a smaller wrist without shrinking the details: a gold-toned steel case, a soft pearlescent dial finish, and a fine link bracelet with a secure fold-over clasp.",
    basePrice: 195000,
    currency: "NGN",
    images: [
      { url: placeholder("Lumiere Ladies Quartz", "F3F1EC", "8C6D3F"), alt: "NOBLE Lumière Ladies Quartz, front view on ivory background", displayOrder: 0 },
      { url: placeholder("Lumiere Ladies Quartz", "8C6D3F", "FAFAF8"), alt: "NOBLE Lumière Ladies Quartz, worn on wrist", displayOrder: 1 },
    ],
    variants: [{ sku: "NB-LL-34-STL-GLD", label: "34mm / Steel", stockQuantity: 17 }],
    attributes: { movement: "Quartz", strapMaterial: "Steel", caseSize: "34mm", color: "Gold", gender: "Women's" },
    rating: 4.8,
    reviewCount: 38,
    isBestSeller: true,
    status: "in-stock",
    shippingEstimate: "Ships in 24–48h",
  },
  {
    slug: "atlas-diver-automatic",
    name: "Atlas Diver Automatic",
    brand: "NOBLE",
    categorySlug: "watches",
    shortDescription: "200m dive-rated automatic with a unidirectional bezel.",
    description: "Atlas is rated to 200m with a unidirectional timing bezel, a screw-down crown, and a lume-filled dial legible in low light. The rubber strap is vulcanized for durability, not just water resistance.",
    basePrice: 400000,
    currency: "NGN",
    images: [
      { url: placeholder("Atlas Diver Automatic", "F3F1EC", "0B0B0C"), alt: "NOBLE Atlas Diver Automatic, front view on ivory background", displayOrder: 0 },
      { url: placeholder("Atlas Diver Automatic", "0B0B0C", "6E6E73"), alt: "NOBLE Atlas Diver Automatic, bezel detail on dark background", displayOrder: 1 },
    ],
    variants: [{ sku: "NB-AD-44-RBR-BLU", label: "44mm / Rubber", stockQuantity: 3 }],
    attributes: { movement: "Automatic", strapMaterial: "Rubber", caseSize: "44mm", color: "Blue", gender: "Men's" },
    rating: 4.6,
    reviewCount: 29,
    isBestSeller: true,
    status: "low-stock",
    shippingEstimate: "Ships in 3–5 business days",
  },
  {
    slug: "cadence-slim-quartz",
    name: "Cadence Slim Quartz",
    brand: "NOBLE",
    categorySlug: "watches",
    shortDescription: "Ultra-thin quartz, unisex, everyday-priced.",
    description: "Cadence proves affordable doesn't mean disposable: an ultra-thin quartz case at 6.5mm, a matte black dial, and a leather strap sized to fit most wrists comfortably.",
    basePrice: 95000,
    currency: "NGN",
    images: [
      { url: placeholder("Cadence Slim Quartz", "F3F1EC", "0B0B0C"), alt: "NOBLE Cadence Slim Quartz, front view on ivory background", displayOrder: 0 },
      { url: placeholder("Cadence Slim Quartz", "0B0B0C", "F3F1EC"), alt: "NOBLE Cadence Slim Quartz, profile view showing thin case", displayOrder: 1 },
    ],
    variants: [{ sku: "NB-CS-38-LTH-BLK", label: "38mm / Leather", stockQuantity: 26 }],
    attributes: { movement: "Quartz", strapMaterial: "Leather", caseSize: "38mm", color: "Black", gender: "Unisex" },
    rating: 4.4,
    reviewCount: 12,
    status: "in-stock",
    shippingEstimate: "Ships in 24–48h",
  },
  {
    slug: "voyager-gmt",
    name: "Voyager GMT",
    brand: "NOBLE",
    categorySlug: "watches",
    shortDescription: "Dual-time automatic for people who live across time zones.",
    description: "Voyager adds a 24-hour GMT hand and rotating bezel to an automatic base — built for people tracking a second time zone as often as their own. Currently between production runs.",
    basePrice: 680000,
    currency: "NGN",
    images: [
      { url: placeholder("Voyager GMT", "F3F1EC", "0B0B0C"), alt: "NOBLE Voyager GMT, front view on ivory background", displayOrder: 0 },
      { url: placeholder("Voyager GMT", "0B0B0C", "F3F1EC"), alt: "NOBLE Voyager GMT, bezel detail on dark background", displayOrder: 1 },
    ],
    variants: [{ sku: "NB-VG-42-STL-BLK", label: "42mm / Steel", stockQuantity: 0 }],
    attributes: { movement: "Automatic", strapMaterial: "Steel", caseSize: "42mm", color: "Black", gender: "Men's" },
    rating: 4.9,
    reviewCount: 8,
    status: "out-of-stock",
    shippingEstimate: "Ships in 24–48h",
  },
];
