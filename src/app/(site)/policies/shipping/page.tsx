import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";
import { getPolicyBySlug } from "@/data/policies";
import { PolicyNav } from "@/components/policies/policy-nav";
import { PolicyContent } from "@/components/policies/policy-content";

export const metadata: Metadata = buildMetadata({
  title: "Shipping Policy",
  description: "NOBLE's shipping policy - processing times, delivery estimates, tracking, and costs.",
});

export default function ShippingPolicyPage() {
  const policy = getPolicyBySlug("shipping")!;

  return (
    <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-16">
      <PolicyNav activeSlug="shipping" />
      <PolicyContent policy={policy} />
    </div>
  );
}
