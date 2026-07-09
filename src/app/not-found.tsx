import { Compass } from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";

/**
 * A branded 404 rather than the framework default — consistent with the
 * "no dead ends" principle applied everywhere else on the site. Lives at
 * the true root so it covers both the (site) group and /checkout.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6">
      <EmptyState
        icon={Compass}
        title="This page has wandered off"
        description="The page you're looking for doesn't exist or may have moved."
        ctaLabel="Back to Home"
        ctaHref="/"
      />
    </div>
  );
}
