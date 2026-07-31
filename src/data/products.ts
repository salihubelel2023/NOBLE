import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/db";
import type { Product } from "@/types/product";

/**
 * Prisma-backed as of the admin build. Function names and signatures are
 * unchanged from the original mock-data version — every consumer just
 * gained `await` in front of these calls. See ARCHITECTURE.md Section 4
 * and Section 7 ("What This Changes in the Existing Storefront").
 *
 * `attributesJson` is parsed back into a plain object at this boundary —
 * see the note at the top of prisma/schema.prisma for why it's stored as
 * a JSON string rather than Prisma's native Json scalar.
 */

const productInclude = {
  images: { orderBy: { displayOrder: "asc" as const } },
  variants: true,
  category: true,
} satisfies Prisma.ProductInclude;

type DbProduct = Prisma.ProductGetPayload<{ include: typeof productInclude }>;

function mapProduct(dbProduct: DbProduct): Product {
  return {
    id: dbProduct.id,
    slug: dbProduct.slug,
    name: dbProduct.name,
    brand: dbProduct.brand,
    categorySlug: dbProduct.category.slug,
    shortDescription: dbProduct.shortDescription,
    description: dbProduct.description,
    basePrice: dbProduct.basePrice,
    compareAtPrice: dbProduct.compareAtPrice ?? undefined,
    currency: dbProduct.currency,
    images: dbProduct.images.map((image) => ({
      id: image.id,
      url: image.url,
      alt: image.alt,
      displayOrder: image.displayOrder,
    })),
    variants: dbProduct.variants.map((variant) => ({
      id: variant.id,
      sku: variant.sku,
      label: variant.label,
      priceOverride: variant.priceOverride ?? undefined,
      stockQuantity: variant.stockQuantity,
    })),
    attributes: JSON.parse(dbProduct.attributesJson) as Record<string, string>,
    rating: dbProduct.rating,
    reviewCount: dbProduct.reviewCount,
    isBestSeller: dbProduct.isBestSeller,
    isNew: dbProduct.isNew,
    status: dbProduct.status as Product["status"],
    shippingEstimate: dbProduct.shippingEstimate,
  };
}

export async function getAllProducts(): Promise<Product[]> {
  const dbProducts = await prisma.product.findMany({
    include: productInclude,
    orderBy: { createdAt: "desc" },
  });
  return dbProducts.map(mapProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const dbProduct = await prisma.product.findUnique({ where: { slug }, include: productInclude });
  return dbProduct ? mapProduct(dbProduct) : null;
}

export async function getProductById(id: string): Promise<Product | null> {
  const dbProduct = await prisma.product.findUnique({ where: { id }, include: productInclude });
  return dbProduct ? mapProduct(dbProduct) : null;
}

export async function getBestSellers(limit?: number): Promise<Product[]> {
  const dbProducts = await prisma.product.findMany({
    where: { isBestSeller: true },
    include: productInclude,
    orderBy: { createdAt: "desc" },
    take: limit,
  });
  return dbProducts.map(mapProduct);
}

/**
 * Fetches all products and filters in application code rather than via a
 * SQL `contains` filter — SQLite's `contains` in Prisma is case-sensitive
 * with no reliable `mode: "insensitive"` support, and the catalog is small
 * enough that fetching everything and filtering in JS (matching the exact
 * behavior of the original mock implementation) is both simpler and safer
 * than depending on that.
 */
export async function searchProducts(query: string, limit = 5): Promise<Product[]> {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];
  const allProducts = await getAllProducts();
  return allProducts
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
 * band, not random cross-selling. See wireframe notes on Product Detail.
 */
export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const category = await prisma.category.findUnique({ where: { slug: product.categorySlug } });
  if (!category) return [];

  const dbProducts = await prisma.product.findMany({
    where: { categoryId: category.id, id: { not: product.id } },
    include: productInclude,
  });

  return dbProducts
    .map(mapProduct)
    .sort((a, b) => Math.abs(a.basePrice - product.basePrice) - Math.abs(b.basePrice - product.basePrice))
    .slice(0, limit);
}
