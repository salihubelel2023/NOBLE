import type { LucideIcon } from "lucide-react";

import { CTAButton } from "@/components/shared/cta-button";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
}

/**
 * Every empty state on this site (Catalog zero-results, Wishlist, future
 * empty Order history) routes through this one component and never just
 * shows a blank screen — see /ARCHITECTURE.md Section 9 and the wireframe
 * notes on "no dead ends."
 */
export function EmptyState({ icon: Icon, title, description, ctaLabel, ctaHref }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <Icon className="h-9 w-9 text-noble-line" strokeWidth={1.5} />
      <p className="font-serif text-xl text-noble-black">{title}</p>
      <p className="max-w-sm text-sm text-noble-grey">{description}</p>
      {ctaLabel && ctaHref && (
        <CTAButton href={ctaHref} variant="outline" className="mt-2">
          {ctaLabel}
        </CTAButton>
      )}
    </div>
  );
}
