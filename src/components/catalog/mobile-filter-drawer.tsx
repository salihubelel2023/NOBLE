"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";

import type { Category } from "@/types/category";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FilterControls } from "@/components/catalog/filter-controls";

interface MobileFilterDrawerProps {
  category: Category;
  brands: string[];
  priceBounds: { min: number; max: number };
  resultCount: number;
}

/**
 * Slides up from the bottom over the current view rather than navigating
 * away — the customer's scroll position and result count stay intact when
 * they close it. Same `FilterControls` as the desktop sidebar; only the
 * shell differs. See wireframe notes: "Sidebar on desktop, bottom sheet on
 * mobile — not the same component just resized."
 */
export function MobileFilterDrawer({ category, brands, priceBounds, resultCount }: MobileFilterDrawerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 lg:hidden">
          <SlidersHorizontal className="h-4 w-4" />
          Filter
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="flex h-[85vh] flex-col p-0">
        <SheetHeader className="shrink-0">
          <SheetTitle>Filter</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-6">
          <FilterControls category={category} brands={brands} priceBounds={priceBounds} />
        </div>
        <div className="shrink-0 border-t border-noble-line p-4">
          <Button className="w-full" onClick={() => setOpen(false)}>
            Show {resultCount} {resultCount === 1 ? "Result" : "Results"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
