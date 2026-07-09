import type { ReactNode } from "react";

interface ProductAccordionSectionProps {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

/**
 * Native <details>/<summary> — zero client JS for the expand/collapse
 * itself, consistent with the same pattern used in the Footer. Specs opens
 * by default (watch buyers are disproportionately detail-driven); the rest
 * default closed. See wireframe notes on Product Detail.
 */
export function ProductAccordionSection({ title, defaultOpen = false, children }: ProductAccordionSectionProps) {
  return (
    <details className="group border-b border-noble-line py-5" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center justify-between font-serif text-lg text-noble-black">
        {title}
        <span className="text-noble-grey transition-transform group-open:rotate-180">⌄</span>
      </summary>
      <div className="mt-4 text-sm leading-relaxed text-noble-grey">{children}</div>
    </details>
  );
}
