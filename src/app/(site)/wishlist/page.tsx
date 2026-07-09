import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";
import { WishlistView } from "@/components/wishlist/wishlist-view";

export const metadata: Metadata = buildMetadata({
  title: "Wishlist",
  description: "Your saved NOBLE pieces.",
});

export default function WishlistPage() {
  return <WishlistView />;
}
