import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";
import { getPolicyBySlug } from "@/data/policies";
import { PolicyNav } from "@/components/policies/policy-nav";
import { PolicyContent } from "@/components/policies/policy-content";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How NOBLE collects, uses, and protects your personal information.",
});

export default function PrivacyPolicyPage() {
  const policy = getPolicyBySlug("privacy")!;

  return (
    <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-16">
      <PolicyNav activeSlug="privacy" />
      <PolicyContent policy={policy} />
    </div>
  );
}
