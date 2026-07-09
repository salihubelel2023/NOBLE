"use client";

import { X } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import type { Category } from "@/types/category";
import { parseMultiValue } from "@/lib/catalog-filters";

interface Chip {
  paramKey: string;
  label: string;
  value: string;
}

/**
 * Removable chips so refining a search doesn't require reopening the whole
 * filter panel to uncheck one box — plus a single "Clear all". Reads the
 * same generic attribute-definition loop as FilterControls, so a chip for
 * a brand-new category's attribute appears automatically.
 */
export function ActiveFilterChips({ category }: { category: Category }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const chips: Chip[] = [];

  parseMultiValue(searchParams.get("brand") ?? undefined).forEach((value) => {
    chips.push({ paramKey: "brand", label: value, value });
  });

  category.attributeDefinitions.forEach((definition) => {
    parseMultiValue(searchParams.get(definition.key) ?? undefined).forEach((value) => {
      chips.push({ paramKey: definition.key, label: value, value });
    });
  });

  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  if (minPrice || maxPrice) {
    chips.push({ paramKey: "price", label: `$${minPrice ?? "0"} – $${maxPrice ?? "Any"}`, value: "price" });
  }

  if (chips.length === 0) return null;

  function removeChip(chip: Chip) {
    const params = new URLSearchParams(searchParams.toString());
    if (chip.paramKey === "price") {
      params.delete("minPrice");
      params.delete("maxPrice");
    } else {
      const remaining = parseMultiValue(params.get(chip.paramKey) ?? undefined).filter((v) => v !== chip.value);
      if (remaining.length > 0) params.set(chip.paramKey, remaining.join(","));
      else params.delete(chip.paramKey);
    }
    params.delete("visible");
    router.push(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`, { scroll: false });
  }

  function clearAll() {
    router.push(pathname, { scroll: false });
  }

  return (
    <div className="flex flex-wrap items-center gap-2 pb-2">
      {chips.map((chip) => (
        <button
          key={`${chip.paramKey}-${chip.value}`}
          type="button"
          onClick={() => removeChip(chip)}
          className="flex items-center gap-1.5 rounded-full border border-noble-line bg-noble-white px-3 py-1.5 text-xs text-noble-black transition-colors hover:border-noble-black"
        >
          {chip.label}
          <X className="h-3 w-3" />
        </button>
      ))}
      <button type="button" onClick={clearAll} className="text-xs text-noble-grey underline underline-offset-2 hover:text-noble-black">
        Clear all
      </button>
    </div>
  );
}
