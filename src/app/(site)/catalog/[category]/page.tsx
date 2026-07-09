import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { categories, getCategoryBySlug } from "@/data/categories";
import { products } from "@/data/products";
import {
  filterAndSortProducts,
  getAvailableBrands,
  getPriceBounds,
  DEFAULT_PAGE_SIZE,
  type CatalogSearchParams,
} from "@/lib/catalog-filters";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CatalogToolbar } from "@/components/catalog/catalog-toolbar";
import { ActiveFilterChips } from "@/components/catalog/active-filter-chips";
import { FilterControls } from "@/components/catalog/filter-controls";
import { ProductGrid } from "@/components/catalog/product-grid";
import { LoadMoreLink } from "@/components/catalog/load-more-link";

type PageProps = {
  params: Promise<{ category: string }>;
  searchParams: Promise<CatalogSearchParams>;
};

/**
 * Every known category is pre-rendered at build time by reading
 * data/categories.ts. Add "bags" there later and it's included on the
 * next build automatically — no new route file needed. See
 * /ARCHITECTURE.md Section 2 / Section 11.
 *
 * Note: because this page also reads `searchParams` for filtering, Next.js
 * still renders it dynamically per-request regardless of this list — this
 * only tells Next.js which category *segments* are valid.
 */
export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) return buildMetadata({ title: "Catalog" });
  return buildMetadata({ title: category.name, description: category.description });
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { category: categorySlug } = await params;
  const resolvedSearchParams = await searchParams;

  const category = getCategoryBySlug(categorySlug);
  if (!category) notFound();

  const { items, total } = filterAndSortProducts(products, category, resolvedSearchParams);
  const brands = getAvailableBrands(products, category.slug);
  const priceBounds = getPriceBounds(products, category.slug);

  const visibleRaw = resolvedSearchParams.visible;
  const parsedVisible = Number(Array.isArray(visibleRaw) ? visibleRaw[0] : visibleRaw);
  const visibleCount = Math.max(DEFAULT_PAGE_SIZE, Number.isFinite(parsedVisible) && parsedVisible > 0 ? parsedVisible : DEFAULT_PAGE_SIZE);
  const visibleItems = items.slice(0, visibleCount);
  const remaining = total - visibleItems.length;

  const loadMoreParams = new URLSearchParams();
  Object.entries(resolvedSearchParams).forEach(([key, value]) => {
    if (key === "visible" || value === undefined) return;
    loadMoreParams.set(key, Array.isArray(value) ? value[0] : value);
  });
  loadMoreParams.set("visible", String(visibleCount + DEFAULT_PAGE_SIZE));

  return (
    <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-12">
      <Breadcrumbs items={[{ label: "Catalog", href: "/catalog" }, { label: category.name }]} className="mb-6" />

      {/* Unique per-category intro paragraph — the on-page content that gives
          search engines something distinct to index per category, per the
          SEO strategy in /ARCHITECTURE.md Section 10. */}
      <div className="mb-10 max-w-2xl">
        <h1 className="font-serif text-3xl tracking-tight text-noble-black md:text-4xl">{category.name}</h1>
        <p className="mt-3 text-noble-grey">{category.description}</p>
      </div>

      <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-10 xl:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <Suspense fallback={null}>
              <FilterControls category={category} brands={brands} priceBounds={priceBounds} />
            </Suspense>
          </div>
        </aside>

        <div>
          <Suspense fallback={<div className="h-10" />}>
            <CatalogToolbar category={category} brands={brands} priceBounds={priceBounds} resultCount={total} />
            <div className="pt-4">
              <ActiveFilterChips category={category} />
            </div>
          </Suspense>

          <div className="mt-2">
            <ProductGrid products={visibleItems} clearFiltersHref={`/catalog/${category.slug}`} />
          </div>

          {remaining > 0 && (
            <LoadMoreLink href={`/catalog/${category.slug}?${loadMoreParams.toString()}`} remaining={remaining} />
          )}
        </div>
      </div>
    </div>
  );
}
