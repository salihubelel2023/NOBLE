import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";
import { getPolicyBySlug } from "@/data/policies";
import { PolicyNav } from "@/components/policies/policy-nav";
import { PolicyContent } from "@/components/policies/policy-content";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description: "The terms governing your use of the NOBLE website and purchases.",
});

export default function TermsPolicyPage() {
  const policy = getPolicyBySlug("terms")!;

  return (
    <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-16">
      <PolicyNav activeSlug="terms" />
      <PolicyContent policy={policy} />
    </div>
  );
}
