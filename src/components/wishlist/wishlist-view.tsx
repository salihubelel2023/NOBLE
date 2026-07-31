"use client";

import { Heart } from "lucide-react";

import { useWishlist } from "@/hooks/use-wishlist";
import type { Product } from "@/types/product";
import { ProductCard } from "@/components/product/product-card";
import { EmptyState } from "@/components/shared/empty-state";

interface WishlistViewProps {
  allProducts: Product[];
}

/**
 * Client Component: wishlist state (which IDs are saved) lives in
 * localStorage via Zustand, which doesn't exist at build or server-request
 * time. See /ARCHITECTURE.md Section 2. Products are now database-backed,
 * so this component can no longer import them directly — the page.tsx
 * (a Server Component) fetches every product once and passes the full
 * list down as `allProducts`; this component just filters it client-side
 * by the ID list it already has from Zustand. Split out from page.tsx so
 * the route can still export static `metadata` (Client Components can't).
 */
export function WishlistView({ allProducts }: WishlistViewProps) {
  const { productIds } = useWishlist();
  const wishlistedProducts = allProducts.filter((product) => productIds.includes(product.id));

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
      <h1 className="mb-10 font-serif text-3xl tracking-tight text-noble-black md:text-4xl">
        Your Wishlist {wishlistedProducts.length > 0 && `(${wishlistedProducts.length})`}
      </h1>

      {wishlistedProducts.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="Nothing saved yet"
          description="Tap the heart on any product to save it here for later."
          ctaLabel="Explore Watches"
          ctaHref="/catalog/watches"
        />
      ) : (
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 md:gap-x-6 xl:grid-cols-4">
          {wishlistedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
