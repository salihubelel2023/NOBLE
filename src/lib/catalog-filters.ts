import type { Product } from "@/types/product";
import type { Category } from "@/types/category";

/**
 * The shape Next.js hands page components for searchParams. Attribute keys
 * (movement, strapMaterial, ...) are indexed dynamically since they come
 * from CategoryAttributeDefinition, not a fixed list — this is what lets
 * the SAME filtering function serve any future category without changes.
 */
export type CatalogSearchParams = Record<string, string | string[] | undefined>;

export const DEFAULT_PAGE_SIZE = 8;

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "best-sellers", label: "Best Sellers" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
] as const;

export type SortValue = (typeof SORT_OPTIONS)[number]["value"];

function readParam(searchParams: CatalogSearchParams, key: string): string | undefined {
  const value = searchParams[key];
  return Array.isArray(value) ? value[0] : value;
}

export function parseMultiValue(value?: string): string[] {
  if (!value) return [];
  return value.split(",").filter(Boolean);
}

export function getAvailableBrands(products: Product[], categorySlug: string): string[] {
  const brands = new Set(
    products.filter((product) => product.categorySlug === categorySlug).map((product) => product.brand)
  );
  return Array.from(brands).sort();
}

export function getPriceBounds(products: Product[], categorySlug: string): { min: number; max: number } {
  const prices = products.filter((product) => product.categorySlug === categorySlug).map((product) => product.basePrice);
  if (prices.length === 0) return { min: 0, max: 0 };
  return { min: Math.floor(Math.min(...prices) / 10) * 10, max: Math.ceil(Math.max(...prices) / 10) * 10 };
}

interface FilterResult {
  items: Product[];
  total: number;
  sort: SortValue;
  query: string;
}

/**
 * The single function every catalog view (today: /catalog/[category]; later:
 * search results, a future cross-category browse) should filter through.
 * Loops over `category.attributeDefinitions` generically — it has no idea
 * whether it's filtering watches or, someday, perfumes.
 */
export function filterAndSortProducts(
  allProducts: Product[],
  category: Category,
  searchParams: CatalogSearchParams
): FilterResult {
  let items = allProducts.filter((product) => product.categorySlug === category.slug);

  const query = (readParam(searchParams, "q") ?? "").trim();
  if (query) {
    const normalized = query.toLowerCase();
    items = items.filter(
      (product) =>
        product.name.toLowerCase().includes(normalized) ||
        product.brand.toLowerCase().includes(normalized) ||
        product.shortDescription.toLowerCase().includes(normalized)
    );
  }

  const brands = parseMultiValue(readParam(searchParams, "brand"));
  if (brands.length > 0) {
    items = items.filter((product) => brands.includes(product.brand));
  }

  const minPrice = readParam(searchParams, "minPrice");
  const maxPrice = readParam(searchParams, "maxPrice");
  if (minPrice) items = items.filter((product) => product.basePrice >= Number(minPrice));
  if (maxPrice) items = items.filter((product) => product.basePrice <= Number(maxPrice));

  for (const definition of category.attributeDefinitions) {
    const selected = parseMultiValue(readParam(searchParams, definition.key));
    if (selected.length > 0) {
      items = items.filter((product) => selected.includes(product.attributes[definition.key]));
    }
  }

  const sortParam = readParam(searchParams, "sort");
  const sort: SortValue = SORT_OPTIONS.some((option) => option.value === sortParam) ? (sortParam as SortValue) : "newest";

  const sorted = [...items].sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return a.basePrice - b.basePrice;
      case "price-desc":
        return b.basePrice - a.basePrice;
      case "rating":
        return b.rating - a.rating;
      case "best-sellers":
        return Number(b.isBestSeller ?? false) - Number(a.isBestSeller ?? false);
      case "newest":
      default:
        // Mock data has no createdAt field yet — `isNew` is the stand-in
        // signal until the real schema's timestamp column exists.
        return Number(b.isNew ?? false) - Number(a.isNew ?? false);
    }
  });

  return { items: sorted, total: sorted.length, sort, query };
}
