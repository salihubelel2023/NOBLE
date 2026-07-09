import { useWishlistStore } from "@/store/wishlist-store";

/**
 * The interface components use to touch wishlist state. Components import
 * this hook, never the store directly — see /ARCHITECTURE.md Section 1.
 */
export function useWishlist() {
  const productIds = useWishlistStore((state) => state.productIds);
  const toggle = useWishlistStore((state) => state.toggle);
  const isWishlisted = useWishlistStore((state) => state.isWishlisted);
  const clear = useWishlistStore((state) => state.clear);

  return { productIds, toggle, isWishlisted, clear, count: productIds.length };
}
