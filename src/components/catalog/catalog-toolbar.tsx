import type { Category } from "@/types/category";
import { SortSelect } from "@/components/catalog/sort-select";
import { CatalogSearchInput } from "@/components/catalog/catalog-search-input";
import { MobileFilterDrawer } from "@/components/catalog/mobile-filter-drawer";

interface CatalogToolbarProps {
  category: Category;
  brands: string[];
  priceBounds: { min: number; max: number };
  resultCount: number;
}

/**
 * Result count and applied filter state are always visible, never buried —
 * an orientation signal so the customer always knows how many pieces
 * they're looking at, per the wireframe.
 */
export function CatalogToolbar({ category, brands, priceBounds, resultCount }: CatalogToolbarProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-noble-line pb-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <MobileFilterDrawer category={category} brands={brands} priceBounds={priceBounds} resultCount={resultCount} />
        <p className="text-sm text-noble-grey">
          <span className="font-medium text-noble-black">{resultCount}</span> {resultCount === 1 ? "result" : "results"}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <CatalogSearchInput />
        <SortSelect />
      </div>
    </div>
  );
}
