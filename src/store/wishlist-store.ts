import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistState {
  productIds: string[];
  toggle: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  clear: () => void;
}

/**
 * Global client state for the wishlist, persisted to localStorage today.
 * Components should not import this store directly — go through
 * `@/hooks/use-wishlist` instead, so the day this graduates to an
 * API-synced, cross-device wishlist (see WishlistItem in the schema),
 * only this file and the hook change.
 */
export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      productIds: [],
      toggle: (productId) =>
        set((state) => ({
          productIds: state.productIds.includes(productId)
            ? state.productIds.filter((id) => id !== productId)
            : [...state.productIds, productId],
        })),
      isWishlisted: (productId) => get().productIds.includes(productId),
      clear: () => set({ productIds: [] }),
    }),
    { name: "noble-wishlist" }
  )
);
