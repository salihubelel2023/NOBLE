"use client";

import { ChevronDown } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { SORT_OPTIONS } from "@/lib/catalog-filters";

/**
 * A styled native <select> rather than a custom Radix Select — one fewer
 * primitive to hand-maintain for a single dropdown, with no loss of
 * keyboard or screen-reader support. Updates the `sort` URL param directly.
 */
export function SortSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get("sort") ?? "newest";

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "newest") params.delete("sort");
    else params.set("sort", value);
    router.push(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`, { scroll: false });
  }

  return (
    <div className="relative">
      <label htmlFor="catalog-sort" className="sr-only">
        Sort products
      </label>
      <select
        id="catalog-sort"
        value={current}
        onChange={(e) => handleChange(e.target.value)}
        className="h-10 appearance-none rounded-sm border border-noble-line bg-transparent py-2 pl-3 pr-9 text-sm text-noble-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-noble-grey" />
    </div>
  );
}
