import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/types/product";
import { PriceTag } from "@/components/shared/price-tag";
import { RatingStars } from "@/components/shared/rating-stars";
import { BadgeStatus, type BadgeStatusValue } from "@/components/shared/badge-status";
import { WishlistToggleButton } from "@/components/product/wishlist-toggle-button";

interface ProductCardProps {
  product: Product;
}

function getBadgeStatus(product: Product): BadgeStatusValue | null {
  if (product.isNew) return "new";
  if (product.status === "low-stock" || product.status === "out-of-stock") return product.status;
  return null;
}

/**
 * The single card component reused across Best Sellers, Catalog, Related
 * Products, Wishlist and Search — one Product prop in, consistent card out.
 * No bespoke "homepage card" exists; see /ARCHITECTURE.md Section 9.
 *
 * Stays a Server Component: the hover image crossfade is pure CSS
 * (stacked images, opacity transition on `.group:hover`), so the only
 * client-side JS on this whole card is the wishlist heart button.
 */
export function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] ?? primaryImage;
  const badgeStatus = getBadgeStatus(product);

  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-noble-ivory">
        <Link href={`/product/${product.slug}`} className="absolute inset-0 block" aria-label={product.name}>
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover transition-opacity duration-500 ease-out group-hover:opacity-0"
          />
          <Image
            src={secondaryImage.url}
            alt={secondaryImage.alt}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
          />
        </Link>

        <div className="absolute right-3 top-3 z-10">
          <WishlistToggleButton productId={product.id} />
        </div>

        {badgeStatus && (
          <div className="absolute left-3 top-3 z-10">
            <BadgeStatus status={badgeStatus} />
          </div>
        )}
      </div>

      <div className="mt-4 space-y-1.5">
        <p className="text-[11px] uppercase tracking-[0.12em] text-noble-grey">{product.brand}</p>
        <Link
          href={`/product/${product.slug}`}
          className="block font-serif text-lg text-noble-black transition-colors hover:text-noble-gold"
        >
          {product.name}
        </Link>
        <div className="flex items-center justify-between pt-1">
          <PriceTag price={product.basePrice} compareAtPrice={product.compareAtPrice} currency={product.currency} />
          <RatingStars rating={product.rating} count={product.reviewCount} size="sm" />
        </div>
      </div>
    </article>
  );
}
