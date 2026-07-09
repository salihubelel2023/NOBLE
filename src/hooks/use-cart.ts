import { useCartStore } from "@/store/cart-store";

/**
 * The interface components use to touch cart state. Components import this
 * hook, never the store directly — see /ARCHITECTURE.md Section 1.
 */
export function useCart() {
  const lines = useCartStore((state) => state.lines);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clear = useCartStore((state) => state.clear);

  const count = lines.reduce((sum, line) => sum + line.quantity, 0);

  return { lines, addItem, removeItem, updateQuantity, clear, count };
}
