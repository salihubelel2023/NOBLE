import Link from "next/link";

interface LoadMoreLinkProps {
  href: string;
  remaining: number;
}

/**
 * A styled Link, not a client "Load More" button — bumping the `visible`
 * search param causes Next.js to re-render this Server Component with more
 * items shown. No client JS needed, works with JS disabled, and the
 * browser back button behaves correctly (unlike infinite scroll). See
 * wireframe notes: "Load More button, not infinite scroll, not numbered
 * pagination."
 */
export function LoadMoreLink({ href, remaining }: LoadMoreLinkProps) {
  return (
    <div className="mt-14 flex justify-center">
      <Link
        href={href}
        scroll={false}
        className="inline-flex h-12 items-center justify-center rounded-sm border border-noble-line px-8 text-sm text-noble-black transition-colors hover:border-noble-black"
      >
        Load More ({remaining} remaining)
      </Link>
    </div>
  );
}
