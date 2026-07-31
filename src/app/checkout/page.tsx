import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";
import { getAllProducts } from "@/data/products";
import { CheckoutFlow } from "@/components/checkout/checkout-flow";

export const metadata: Metadata = buildMetadata({
  title: "Checkout",
  description: "Secure checkout for your NOBLE order.",
});

export default async function CheckoutPage() {
  const allProducts = await getAllProducts();
  return <CheckoutFlow allProducts={allProducts} />;
}
