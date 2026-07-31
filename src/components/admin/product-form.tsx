"use client";

import { useActionState, useState } from "react";

import type { Category } from "@/types/category";
import type { ProductFormState } from "@/lib/actions/product-admin-actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageUrlRepeater, type ImageEntry } from "@/components/admin/image-url-repeater";
import { VariantRepeater, type VariantEntry } from "@/components/admin/variant-repeater";

export interface ProductFormInitialValues {
  slug: string;
  name: string;
  brand: string;
  categoryId: string;
  shortDescription: string;
  description: string;
  basePrice: string;
  compareAtPrice: string;
  currency: string;
  rating: string;
  reviewCount: string;
  isBestSeller: boolean;
  isNew: boolean;
  status: string;
  shippingEstimate: string;
  attributes: Record<string, string>;
  images: ImageEntry[];
  variants: VariantEntry[];
}

const emptyValues: ProductFormInitialValues = {
  slug: "",
  name: "",
  brand: "NOBLE",
  categoryId: "",
  shortDescription: "",
  description: "",
  basePrice: "",
  compareAtPrice: "",
  currency: "NGN",
  rating: "5",
  reviewCount: "0",
  isBestSeller: false,
  isNew: false,
  status: "in-stock",
  shippingEstimate: "Ships in 24–48h",
  attributes: {},
  images: [{ url: "", alt: "" }],
  variants: [{ sku: "", label: "", priceOverride: "", stockQuantity: "0" }],
};

interface ProductFormProps {
  categories: Category[];
  initialValues?: ProductFormInitialValues;
  action: (state: ProductFormState, formData: FormData) => Promise<ProductFormState>;
  submitLabel: string;
}

/**
 * One form serves both create and edit — `action` is either
 * createProductAction directly, or updateProductAction.bind(null, id)
 * from the edit page. Loops over the selected category's
 * attributeDefinitions to render the right fields (Movement/Strap/Size
 * for Watches today) — the same category-agnostic pattern as the
 * storefront's FilterControls. A future Bags category gets its own form
 * fields automatically, no new form code. See ARCHITECTURE.md Section 5
 * (admin architecture doc).
 */
export function ProductForm({ categories, initialValues, action, submitLabel }: ProductFormProps) {
  const [state, formAction, isPending] = useActionState(action, {});
  const values = initialValues ?? emptyValues;

  const [categoryId, setCategoryId] = useState(values.categoryId || categories[0]?.id || "");
  const [attributes, setAttributes] = useState<Record<string, string>>(values.attributes);
  const [images, setImages] = useState<ImageEntry[]>(values.images);
  const [variants, setVariants] = useState<VariantEntry[]>(values.variants);

  const selectedCategory = categories.find((category) => category.id === categoryId) ?? categories[0];

  return (
    <form action={formAction} className="flex flex-col gap-8">
      {state.error && <p className="border border-noble-error bg-noble-error/5 p-3 text-sm text-noble-error">{state.error}</p>}

      <section className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm text-noble-black">Name</span>
          <Input name="name" required defaultValue={values.name} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm text-noble-black">Slug (URL)</span>
          <Input name="slug" required defaultValue={values.slug} placeholder="heritage-chronograph-automatic" />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm text-noble-black">Brand</span>
          <Input name="brand" required defaultValue={values.brand} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm text-noble-black">Category</span>
          <select
            name="categoryId"
            required
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="h-11 rounded-sm border border-noble-line bg-transparent px-3 text-sm"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
      </section>

      <section className="flex flex-col gap-5">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm text-noble-black">Short Description</span>
          <Input name="shortDescription" required defaultValue={values.shortDescription} placeholder="Shown on the product card" />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm text-noble-black">Full Description</span>
          <textarea
            name="description"
            required
            defaultValue={values.description}
            rows={4}
            className="rounded-sm border border-noble-line bg-transparent px-3 py-2 text-sm"
          />
        </label>
      </section>

      <section className="grid gap-5 sm:grid-cols-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm text-noble-black">Base Price</span>
          <Input name="basePrice" type="number" step="0.01" required defaultValue={values.basePrice} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm text-noble-black">Compare-at Price</span>
          <Input name="compareAtPrice" type="number" step="0.01" defaultValue={values.compareAtPrice} placeholder="Optional" />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm text-noble-black">Currency</span>
          <Input name="currency" required defaultValue={values.currency} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm text-noble-black">Status</span>
          <select name="status" defaultValue={values.status} className="h-11 rounded-sm border border-noble-line bg-transparent px-3 text-sm">
            <option value="in-stock">In Stock</option>
            <option value="low-stock">Low Stock</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm text-noble-black">Rating (0–5)</span>
          <Input name="rating" type="number" step="0.1" min="0" max="5" defaultValue={values.rating} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm text-noble-black">Review Count</span>
          <Input name="reviewCount" type="number" min="0" defaultValue={values.reviewCount} />
        </label>
      </section>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm text-noble-black">Shipping Estimate</span>
        <Input name="shippingEstimate" required defaultValue={values.shippingEstimate} placeholder="Ships in 24–48h" />
      </label>

      <section className="flex gap-6">
        <label className="flex items-center gap-2 text-sm text-noble-black">
          <input type="checkbox" name="isBestSeller" defaultChecked={values.isBestSeller} className="h-4 w-4 accent-noble-black" />
          Best Seller
        </label>
        <label className="flex items-center gap-2 text-sm text-noble-black">
          <input type="checkbox" name="isNew" defaultChecked={values.isNew} className="h-4 w-4 accent-noble-black" />
          New Arrival
        </label>
      </section>

      {selectedCategory && (
        <section className="flex flex-col gap-4">
          <p className="text-[11px] uppercase tracking-[0.1em] text-noble-grey">
            {selectedCategory.name} Attributes
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {selectedCategory.attributeDefinitions.map((definition) => (
              <label key={definition.key} className="flex flex-col gap-1.5">
                <span className="text-sm text-noble-black">{definition.label}</span>
                {definition.options && definition.options.length > 0 ? (
                  <select
                    name={`attr_${definition.key}`}
                    value={attributes[definition.key] ?? ""}
                    onChange={(e) => setAttributes({ ...attributes, [definition.key]: e.target.value })}
                    className="h-11 rounded-sm border border-noble-line bg-transparent px-3 text-sm"
                  >
                    <option value="">Select...</option>
                    {definition.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <Input
                    name={`attr_${definition.key}`}
                    value={attributes[definition.key] ?? ""}
                    onChange={(e) => setAttributes({ ...attributes, [definition.key]: e.target.value })}
                  />
                )}
              </label>
            ))}
          </div>
        </section>
      )}

      <section className="flex flex-col gap-3">
        <p className="text-[11px] uppercase tracking-[0.1em] text-noble-grey">Images</p>
        <ImageUrlRepeater images={images} onChange={setImages} />
        <input type="hidden" name="imagesJson" value={JSON.stringify(images)} />
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-[11px] uppercase tracking-[0.1em] text-noble-grey">Variants</p>
        <VariantRepeater variants={variants} onChange={setVariants} />
        <input type="hidden" name="variantsJson" value={JSON.stringify(variants)} />
      </section>

      <Button type="submit" size="lg" disabled={isPending} className="w-fit">
        {isPending ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}
