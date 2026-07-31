"use client";

import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";

import { useWishlist } from "@/hooks/use-wishlist";
import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";

function NavIconBadge({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-noble-gold px-1 text-[10px] font-medium text-noble-black">
      {count > 9 ? "9+" : count}
    </span>
  );
}

const iconLinkClass =
  "relative flex h-10 w-10 items-center justify-center text-noble-black transition-colors hover:text-noble-gold";

/** Wishlist icon — client because it subscribes to the wishlist store for its badge count. */
export function WishlistNavIcon({ className }: { className?: string }) {
  const { count } = useWishlist();
  return (
    <Link href="/wishlist" aria-label={`Wishlist, ${count} item${count === 1 ? "" : "s"}`} className={cn(iconLinkClass, className)}>
      <Heart className="h-5 w-5" strokeWidth={1.5} />
      <NavIconBadge count={count} />
    </Link>
  );
}

/** Cart icon — client because it subscribes to the cart store for its badge count. */
export function CartNavIcon({ className }: { className?: string }) {
  const { count } = useCart();
  return (
    <Link href="/checkout" aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`} className={cn(iconLinkClass, className)}>
      <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
      <NavIconBadge count={count} />
    </Link>
  );
}
