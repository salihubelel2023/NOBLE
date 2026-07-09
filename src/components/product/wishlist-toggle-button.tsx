"use client";

import { Heart } from "lucide-react";

import { useWishlist } from "@/hooks/use-wishlist";
import { cn } from "@/lib/utils";

interface WishlistToggleButtonProps {
  productId: string;
  className?: string;
}

/**
 * The ONLY interactive sliver inside an otherwise server-rendered
 * ProductCard. See /ARCHITECTURE.md Section 3 for why this boundary is
 * drawn here instead of making the whole card a Client Component.
 */
export function WishlistToggleButton({ productId, className }: WishlistToggleButtonProps) {
  const { isWishlisted, toggle } = useWishlist();
  const wishlisted = isWishlisted(productId);

  return (
    <button
      type="button"
      onClick={() => toggle(productId)}
      aria-pressed={wishlisted}
      aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full bg-noble-white/90 backdrop-blur-sm transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-noble-gold",
        className
      )}
    >
      <Heart
        className={cn("h-4 w-4 transition-colors", wishlisted ? "fill-noble-gold text-noble-gold" : "text-noble-black")}
      />
    </button>
  );
}
