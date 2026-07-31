import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";
import { getAllProducts } from "@/data/products";
import { WishlistView } from "@/components/wishlist/wishlist-view";

export const metadata: Metadata = buildMetadata({
  title: "Wishlist",
  description: "Your saved NOBLE pieces.",
});

/** Fetches every product once (Server Component) and hands it to the client WishlistView to filter by saved ID. */
export default async function WishlistPage() {
  const allProducts = await getAllProducts();
  return <WishlistView allProducts={allProducts} />;
}
