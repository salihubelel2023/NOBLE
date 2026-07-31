import { notFound } from "next/navigation";

import { prisma } from "@/lib/db";
import { getCategories } from "@/data/categories";
import { updateProductAction } from "@/lib/actions/product-admin-actions";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ProductForm, type ProductFormInitialValues } from "@/components/admin/product-form";

type PageProps = { params: Promise<{ id: string }> };

export const metadata = { title: "Edit Product | NOBLE Admin" };

export default async function EditProductPage({ params }: PageProps) {
  const { id } = await params;

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id },
      include: { images: { orderBy: { displayOrder: "asc" } }, variants: true },
    }),
    getCategories(),
  ]);

  if (!product) notFound();

  const initialValues: ProductFormInitialValues = {
    slug: product.slug,
    name: product.name,
    brand: product.brand,
    categoryId: product.categoryId,
    shortDescription: product.shortDescription,
    description: product.description,
    basePrice: String(product.basePrice),
    compareAtPrice: product.compareAtPrice ? String(product.compareAtPrice) : "",
    currency: product.currency,
    rating: String(product.rating),
    reviewCount: String(product.reviewCount),
    isBestSeller: product.isBestSeller,
    isNew: product.isNew,
    status: product.status,
    shippingEstimate: product.shippingEstimate,
    attributes: JSON.parse(product.attributesJson) as Record<string, string>,
    images: product.images.map((image) => ({ url: image.url, alt: image.alt })),
    variants: product.variants.map((variant) => ({
      sku: variant.sku,
      label: variant.label,
      priceOverride: variant.priceOverride ? String(variant.priceOverride) : "",
      stockQuantity: String(variant.stockQuantity),
    })),
  };

  // Binds the product id as the first argument, leaving the (prevState,
  // formData) shape useActionState expects — the standard pattern for a
  // parameterized Server Action. See ARCHITECTURE.md Section 5.
  const boundUpdateAction = updateProductAction.bind(null, id);

  return (
    <div>
      <AdminPageHeader title={`Edit: ${product.name}`} />
      <ProductForm categories={categories} initialValues={initialValues} action={boundUpdateAction} submitLabel="Save Changes" />
    </div>
  );
}
