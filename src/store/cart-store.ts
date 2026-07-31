import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartLine {
  variantId: string;
  productId: string;
  quantity: number;
  /** Price captured at the moment of add — protects against a mid-session
   *  price change causing a checkout mismatch. See /ARCHITECTURE.md Section 4. */
  priceAtAdd: number;
}

interface CartState {
  lines: CartLine[];
  addItem: (line: CartLine) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clear: () => void;
}

/**
 * Global client cart state. The Product Detail build step wires up
 * `addItem`; for now the Navbar only reads item count for its badge.
 * Persistence swaps from localStorage to an API-synced middleware once
 * accounts ship — the action names (`addItem`, `removeItem`, ...) don't
 * change, so no component that calls `useCart()` needs to be touched.
 */
export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      addItem: (line) =>
        set((state) => {
          const existing = state.lines.find((l) => l.variantId === line.variantId);
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                l.variantId === line.variantId ? { ...l, quantity: l.quantity + line.quantity } : l
              ),
            };
          }
          return { lines: [...state.lines, line] };
        }),
      removeItem: (variantId) =>
        set((state) => ({ lines: state.lines.filter((l) => l.variantId !== variantId) })),
      updateQuantity: (variantId, quantity) =>
        set((state) => ({
          lines: state.lines.map((l) => (l.variantId === variantId ? { ...l, quantity } : l)),
        })),
      clear: () => set({ lines: [] }),
    }),
    { name: "noble-cart" }
  )
);
