"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PriceTag } from "@/components/shared/price-tag";
import { searchProductsAction } from "@/lib/actions/product-actions";
import type { Product } from "@/types/product";
import { cn } from "@/lib/utils";

/**
 * Full-width search overlay triggered from the navbar icon. Calls
 * searchProductsAction (a Server Action) rather than a direct data-layer
 * import, since searchProducts now queries the database and this is a
 * Client Component — debounced so it doesn't fire a query on every
 * keystroke. See ARCHITECTURE.md Section 7.
 */
export function SearchOverlay() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestIdRef = useRef(0);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      return;
    }

    const thisRequestId = ++requestIdRef.current;
    debounceRef.current = setTimeout(async () => {
      const found = await searchProductsAction(trimmed);
      // Ignore stale responses if the query changed again while this was in flight.
      if (thisRequestId === requestIdRef.current) setResults(found);
    }, 250);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setResults([]);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search products"
        className="flex h-10 w-10 items-center justify-center text-noble-black transition-colors hover:text-noble-gold"
      >
        <Search className="h-5 w-5" strokeWidth={1.5} />
      </button>

      <div
        className={cn(
          "fixed inset-0 z-[60] bg-noble-white transition-opacity duration-200",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        aria-hidden={!open}
        inert={!open}
      >
        <div className="mx-auto flex h-full max-w-3xl flex-col px-6 pt-24 md:pt-32">
          <div className="flex items-center gap-4 border-b border-noble-line pb-4">
            <Search className="h-5 w-5 shrink-0 text-noble-grey" strokeWidth={1.5} />
            <Input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search watches..."
              className="h-auto border-none bg-transparent p-0 text-xl focus-visible:ring-0"
            />
            <Button variant="ghost" size="icon" aria-label="Close search" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="mt-6 flex-1 overflow-y-auto pb-16">
            {query.trim() && results.length === 0 && (
              <p className="pt-8 text-center text-noble-grey">No pieces match &ldquo;{query}&rdquo;.</p>
            )}
            <ul className="flex flex-col gap-4">
              {results.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/product/${product.slug}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-4 rounded-sm p-2 transition-colors hover:bg-noble-ivory"
                  >
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-noble-ivory">
                      <Image src={product.images[0].url} alt={product.images[0].alt} fill className="object-cover" sizes="64px" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] uppercase tracking-[0.1em] text-noble-grey">{product.brand}</p>
                      <p className="font-serif text-base text-noble-black">{product.name}</p>
                    </div>
                    <PriceTag price={product.basePrice} compareAtPrice={product.compareAtPrice} currency={product.currency} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
