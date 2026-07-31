"use server";

import { searchProducts } from "@/data/products";

/**
 * A Server Action, not a plain data-layer call — searchProducts now reads
 * the database, and SearchOverlay (the caller) is a Client Component.
 * Client components can invoke Server Actions directly; they can't await
 * a database query in their own module. See ARCHITECTURE.md Section 7.
 */
export async function searchProductsAction(query: string) {
  return searchProducts(query);
}
