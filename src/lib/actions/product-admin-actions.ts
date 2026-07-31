"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/db";

export interface ProductFormState {
  error?: string;
}

interface ParsedImage {
  url: string;
  alt: string;
  displayOrder: number;
}

interface ParsedVariant {
  sku: string;
  label: string;
  priceOverride?: number;
  stockQuantity: number;
}

function parseImages(raw: string): ParsedImage[] {
  try {
    const parsed = JSON.parse(raw) as { url: string; alt: string }[];
    return parsed
      .filter((image) => image.url.trim())
      .map((image, index) => ({ url: image.url.trim(), alt: image.alt.trim() || "Product image", displayOrder: index }));
  } catch {
    return [];
  }
}

function parseVariants(raw: string): ParsedVariant[] {
  try {
    const parsed = JSON.parse(raw) as { sku: string; label: string; priceOverride?: string; stockQuantity: string }[];
    return parsed
      .filter((variant) => variant.sku.trim() && variant.label.trim())
      .map((variant) => ({
        sku: variant.sku.trim(),
        label: variant.label.trim(),
        priceOverride: variant.priceOverride ? Number(variant.priceOverride) : undefined,
        stockQuantity: Number(variant.stockQuantity) || 0,
      }));
  } catch {
    return [];
  }
}

/** Pulls every `attr_*` field out of the form into a plain Record — one input per CategoryAttributeDefinition, rendered dynamically by ProductForm. */
function parseAttributes(formData: FormData): Record<string, string> {
  const attributes: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (key.startsWith("attr_") && typeof value === "string" && value) {
      attributes[key.replace("attr_", "")] = value;
    }
  }
  return attributes;
}

function buildProductData(formData: FormData) {
  const basePrice = Number(formData.get("basePrice"));
  const compareAtPriceRaw = String(formData.get("compareAtPrice") ?? "").trim();

  return {
    slug: String(formData.get("slug") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
    brand: String(formData.get("brand") ?? "").trim(),
    categoryId: String(formData.get("categoryId") ?? ""),
    shortDescription: String(formData.get("shortDescription") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    basePrice,
    compareAtPrice: compareAtPriceRaw ? Number(compareAtPriceRaw) : null,
    currency: String(formData.get("currency") ?? "NGN"),
    attributesJson: JSON.stringify(parseAttributes(formData)),
    rating: Number(formData.get("rating") ?? 0),
    reviewCount: Number(formData.get("reviewCount") ?? 0),
    isBestSeller: formData.get("isBestSeller") === "on",
    isNew: formData.get("isNew") === "on",
    status: String(formData.get("status") ?? "in-stock"),
    shippingEstimate: String(formData.get("shippingEstimate") ?? "Ships in 24–48h").trim(),
  };
}

export async function createProductAction(_prevState: ProductFormState, formData: FormData): Promise<ProductFormState> {
  const data = buildProductData(formData);

  if (!data.slug || !data.name || !data.categoryId) {
    return { error: "Name, slug, and category are required." };
  }

  const images = parseImages(String(formData.get("imagesJson") ?? "[]"));
  const variants = parseVariants(String(formData.get("variantsJson") ?? "[]"));

  if (images.length === 0) {
    return { error: "Add at least one product image." };
  }
  if (variants.length === 0) {
    return { error: "Add at least one variant (SKU)." };
  }

  try {
    await prisma.product.create({
      data: {
        ...data,
        images: { create: images },
        variants: { create: variants },
      },
    });
  } catch {
    return { error: "Could not save this product — check that the slug and SKUs are unique." };
  }

  revalidatePath("/admin/products");
  revalidatePath("/catalog");
  redirect("/admin/products");
}

export async function updateProductAction(
  productId: string,
  _prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  const data = buildProductData(formData);

  if (!data.slug || !data.name || !data.categoryId) {
    return { error: "Name, slug, and category are required." };
  }

  const images = parseImages(String(formData.get("imagesJson") ?? "[]"));
  const variants = parseVariants(String(formData.get("variantsJson") ?? "[]"));

  if (images.length === 0) {
    return { error: "Add at least one product image." };
  }
  if (variants.length === 0) {
    return { error: "Add at least one variant (SKU)." };
  }

  try {
    // Simplest correct approach for a v1 admin form: replace images/variants
    // wholesale on every save rather than diffing. Deleting and recreating
    // is safe here because OrderItem snapshots product name/label/price at
    // the moment of order (see ARCHITECTURE.md Section 4) — it never
    // references a live ProductVariant row, so removing old variant rows
    // cannot corrupt historical orders.
    await prisma.$transaction([
      prisma.productImage.deleteMany({ where: { productId } }),
      prisma.productVariant.deleteMany({ where: { productId } }),
      prisma.product.update({
        where: { id: productId },
        data: {
          ...data,
          images: { create: images },
          variants: { create: variants },
        },
      }),
    ]);
  } catch {
    return { error: "Could not save this product — check that the slug and SKUs are unique." };
  }

  revalidatePath("/admin/products");
  revalidatePath("/catalog");
  revalidatePath(`/product/${data.slug}`);
  redirect("/admin/products");
}

export async function deleteProductAction(productId: string): Promise<void> {
  await prisma.product.delete({ where: { id: productId } });
  revalidatePath("/admin/products");
  revalidatePath("/catalog");
}
