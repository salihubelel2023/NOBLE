"use client";

import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

/**
 * Debounced so every keystroke doesn't push a new URL entry — 350ms after
 * the person stops typing, the `q` param updates and the server re-filters.
 * Search lives in the URL for the same reason every other filter does: it's
 * shareable, indexable, and survives a refresh.
 */
export function CatalogSearchInput() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("q") ?? "");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  function handleChange(next: string) {
    setValue(next);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (next.trim()) params.set("q", next.trim());
      else params.delete("q");
      params.delete("visible");
      router.push(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`, { scroll: false });
    }, 350);
  }

  function clear() {
    handleChange("");
  }

  return (
    <div className="relative w-full sm:w-64">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-noble-grey" />
      <input
        type="search"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Search this collection..."
        aria-label="Search this collection"
        className="h-10 w-full rounded-sm border border-noble-line bg-transparent py-2 pl-9 pr-8 text-sm placeholder:text-noble-grey focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      />
      {value && (
        <button type="button" onClick={clear} aria-label="Clear search" className="absolute right-2.5 top-1/2 -translate-y-1/2 text-noble-grey hover:text-noble-black">
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
