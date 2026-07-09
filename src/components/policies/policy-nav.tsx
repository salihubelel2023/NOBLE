import Link from "next/link";

import { policies } from "@/data/policies";
import { cn } from "@/lib/utils";

/**
 * Sticky cross-links so someone reading Shipping can jump straight to
 * Returns without navigating back through the footer — policies are trust
 * documents, and a policy page that's frustrating to navigate quietly
 * undermines the trust it exists to build. On mobile this becomes a
 * horizontal scrollable pill-tab row instead of a dropdown, keeping all
 * four options visible at a glance. See wireframe notes on Policies.
 *
 * Pure navigation, no interactive state — stays a Server Component.
 */
export function PolicyNav({ activeSlug }: { activeSlug: string }) {
  return (
    <nav aria-label="Policy pages" className="mb-8 lg:mb-0">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
        {policies.map((policy) => {
          const isActive = policy.slug === activeSlug;
          return (
            <Link
              key={policy.slug}
              href={`/policies/${policy.slug}`}
              className={cn(
                "shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm transition-colors lg:rounded-none lg:border-none lg:border-l-2 lg:px-4 lg:py-2",
                isActive
                  ? "border-noble-black bg-noble-black text-noble-white lg:border-l-noble-black lg:bg-transparent lg:text-noble-black lg:font-medium"
                  : "border-noble-line text-noble-black lg:border-l-transparent lg:text-noble-grey lg:hover:text-noble-black"
              )}
            >
              {policy.title.replace(" Policy", "").replace(" & Warranty", "").replace(" of Service", "")}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
