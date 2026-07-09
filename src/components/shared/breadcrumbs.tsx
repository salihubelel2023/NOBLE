import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { siteUrl } from "@/lib/seo";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * One component, both UX and SEO: renders the visible breadcrumb trail AND
 * emits matching BreadcrumbList JSON-LD, so Catalog and Product Detail never
 * have these two things drift out of sync. See /ARCHITECTURE.md Section 9.
 */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const allItems: BreadcrumbItem[] = [{ label: "Home", href: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${siteUrl}${item.href}` } : {}),
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-noble-grey">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              {index > 0 && <ChevronRight className="h-3 w-3 text-noble-line" aria-hidden="true" />}
              {item.href && !isLast ? (
                <Link href={item.href} className="transition-colors hover:text-noble-black">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className={isLast ? "text-noble-black" : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
