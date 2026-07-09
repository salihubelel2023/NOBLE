import { Frown } from "lucide-react";

import type { Product } from "@/types/product";
import { ProductCard } from "@/components/product/product-card";
import { EmptyState } from "@/components/shared/empty-state";
import { getBestSellers } from "@/data/products";

interface ProductGridProps {
  products: Product[];
  clearFiltersHref: string;
}

/**
 * Zero-results is never a dead end: icon + message + a one-tap "Clear
 * filters" action, plus a handful of popular products shown as a fallback
 * so the customer isn't one click from leaving the site. See wireframe
 * notes on the Catalog zero-results state.
 */
export function ProductGrid({ products, clearFiltersHref }: ProductGridProps) {
  if (products.length === 0) {
    const fallback = getBestSellers(4);
    return (
      <div>
        <EmptyState
          icon={Frown}
          title="No pieces match these filters"
          description="Try widening your price range or clearing a filter or two."
          ctaLabel="Clear Filters"
          ctaHref={clearFiltersHref}
        />
        {fallback.length > 0 && (
          <div className="mt-4">
            <p className="mb-6 text-center text-[11px] uppercase tracking-[0.12em] text-noble-grey">
              You might like these instead
            </p>
            <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4 md:gap-x-6">
              {fallback.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 md:gap-x-6 md:gap-y-14 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
