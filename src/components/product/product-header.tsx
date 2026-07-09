import Link from "next/link";

import type { Product } from "@/types/product";
import { RatingStars } from "@/components/shared/rating-stars";

/**
 * Purely static — brand, name, rating summary. Split out from the
 * interactive purchase panel below it so this part of the page ships zero
 * client JS, matching the "push the client boundary down" principle.
 */
export function ProductHeader({ product }: { product: Product }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[11px] uppercase tracking-[0.12em] text-noble-grey">{product.brand}</p>
      <h1 className="font-serif text-3xl tracking-tight text-noble-black md:text-4xl">{product.name}</h1>
      <Link href="#reviews" className="w-fit">
        <RatingStars rating={product.rating} count={product.reviewCount} />
      </Link>
    </div>
  );
}
