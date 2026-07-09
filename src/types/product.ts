export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  displayOrder: number;
}

export interface ProductVariant {
  id: string;
  sku: string;
  /** Human label, e.g. "42mm / Steel" */
  label: string;
  priceOverride?: number;
  stockQuantity: number;
}

export type ProductStatus = "in-stock" | "low-stock" | "out-of-stock";

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  categorySlug: string;
  shortDescription: string;
  description: string;
  basePrice: number;
  compareAtPrice?: number;
  currency: string;
  images: ProductImage[];
  variants: ProductVariant[];
  /**
   * Category-specific facets (movement, strapMaterial, caseSize, color, gender
   * for Watches today). Validated against CategoryAttributeDefinition at
   * write time in the real schema — see /ARCHITECTURE.md Section 4.
   */
  attributes: Record<string, string>;
  rating: number;
  reviewCount: number;
  isBestSeller?: boolean;
  isNew?: boolean;
  status: ProductStatus;
}
