"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

import type { Category } from "@/types/category";
import { parseMultiValue } from "@/lib/catalog-filters";
import { FilterFieldset } from "@/components/catalog/filter-fieldset";
import { Button } from "@/components/ui/button";

interface FilterControlsProps {
  category: Category;
  brands: string[];
  priceBounds: { min: number; max: number };
}

/**
 * The actual filter logic — same component rendered inside a sticky
 * desktop sidebar and inside the mobile bottom sheet ("same logic, two
 * shells" per /ARCHITECTURE.md Section 9). Filters live in the URL, not
 * local state: shareable, indexable by search engines, and survives a
 * refresh — see /ARCHITECTURE.md Section 5 reasoning on state management.
 *
 * Loops over `category.attributeDefinitions` — this component has never
 * heard of "movement" or "strap material" specifically. It renders
 * whichever attributes the active category defines.
 */
export function FilterControls({ category, brands, priceBounds }: FilterControlsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") ?? "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") ?? "");

  function pushParams(mutate: (params: URLSearchParams) => void) {
    const params = new URLSearchParams(searchParams.toString());
    mutate(params);
    params.delete("visible"); // any filter change resets pagination
    router.push(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`, { scroll: false });
  }

  function toggleValue(key: string, value: string) {
    pushParams((params) => {
      const current = parseMultiValue(params.get(key) ?? undefined);
      const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
      if (next.length > 0) params.set(key, next.join(","));
      else params.delete(key);
    });
  }

  function applyPrice() {
    pushParams((params) => {
      if (minPrice) params.set("minPrice", minPrice);
      else params.delete("minPrice");
      if (maxPrice) params.set("maxPrice", maxPrice);
      else params.delete("maxPrice");
    });
  }

  function clearAll() {
    setMinPrice("");
    setMaxPrice("");
    router.push(pathname, { scroll: false });
  }

  const hasActiveFilters = Array.from(searchParams.keys()).some((key) => key !== "sort" && key !== "q");

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-[11px] uppercase tracking-[0.12em] text-noble-grey">Filter</p>
        {hasActiveFilters && (
          <button type="button" onClick={clearAll} className="text-xs text-noble-black underline underline-offset-2">
            Clear all
          </button>
        )}
      </div>

      <FilterFieldset
        title="Brand"
        options={brands}
        selected={parseMultiValue(searchParams.get("brand") ?? undefined)}
        onToggle={(value) => toggleValue("brand", value)}
        defaultOpen
      />

      <details className="group border-b border-noble-line py-4" open>
        <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-noble-black">
          Price
        </summary>
        <div className="mt-3 flex items-center gap-3">
          <label className="flex-1">
            <span className="sr-only">Minimum price</span>
            <input
              type="number"
              inputMode="numeric"
              min={priceBounds.min}
              placeholder={`$${priceBounds.min}`}
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              onBlur={applyPrice}
              className="w-full rounded-sm border border-noble-line bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </label>
          <span className="text-noble-grey">–</span>
          <label className="flex-1">
            <span className="sr-only">Maximum price</span>
            <input
              type="number"
              inputMode="numeric"
              max={priceBounds.max}
              placeholder={`$${priceBounds.max}`}
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              onBlur={applyPrice}
              className="w-full rounded-sm border border-noble-line bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </label>
        </div>
      </details>

      {category.attributeDefinitions
        .filter((definition) => definition.isFilterable && definition.options)
        .map((definition) => (
          <FilterFieldset
            key={definition.key}
            title={definition.label}
            options={definition.options ?? []}
            selected={parseMultiValue(searchParams.get(definition.key) ?? undefined)}
            onToggle={(value) => toggleValue(definition.key, value)}
          />
        ))}

      <Button type="button" variant="outline" size="sm" onClick={applyPrice} className="mt-4 w-full lg:hidden">
        Apply Price
      </Button>
    </div>
  );
}
