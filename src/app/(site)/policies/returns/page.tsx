import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";
import { getPolicyBySlug } from "@/data/policies";
import { PolicyNav } from "@/components/policies/policy-nav";
import { PolicyContent } from "@/components/policies/policy-content";

export const metadata: Metadata = buildMetadata({
  title: "Returns & Warranty",
  description: "NOBLE's returns and warranty policy - return windows, refunds, and warranty coverage.",
});

export default function ReturnsPolicyPage() {
  const policy = getPolicyBySlug("returns")!;

  return (
    <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-16">
      <PolicyNav activeSlug="returns" />
      <PolicyContent policy={policy} />
    </div>
  );
}
