"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Check, Heart, ShieldCheck, Truck } from "lucide-react";

import type { Product, ProductVariant } from "@/types/product";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";

interface ProductPurchasePanelProps {
  product: Product;
}

/**
 * One cohesive interactive unit — variant choice, live price, Add to Cart,
 * wishlist, and the mobile sticky bar all share the same `selectedVariant`
 * state, so unlike ProductCard (where only the wishlist heart needed to be
 * client) this whole panel is genuinely one Client Component. ProductHeader
 * next to it stays server-rendered for the static brand/name/rating.
 *
 * Swatches are rendered as labeled pill buttons rather than color chips —
 * this project's variants are a flat list with a combined label (e.g.
 * "42mm / Leather") rather than independent strap/case axes, so a pill per
 * variant is the honest representation of the actual data shape.
 */
export function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [added, setAdded] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState("");
  const [notifySubmitted, setNotifySubmitted] = useState(false);

  const { addItem } = useCart();
  const { isWishlisted, toggle } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  const price = selectedVariant.priceOverride ?? product.basePrice;
  const isOutOfStock = product.status === "out-of-stock";

  useEffect(() => {
    const revealThreshold = window.innerHeight * 0.5;
    function handleScroll() {
      setStickyVisible(window.scrollY > revealThreshold);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleAddToCart() {
    addItem({ variantId: selectedVariant.id, productId: product.id, quantity: 1, priceAtAdd: price });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  }

  function handleNotifySubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!notifyEmail.trim()) return;
    // TODO: wire up to /api/newsletter or a dedicated back-in-stock endpoint.
    setNotifySubmitted(true);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-baseline gap-3">
        <span className="text-2xl font-medium text-noble-black">{formatPrice(price, product.currency)}</span>
        {product.compareAtPrice && product.compareAtPrice > price && (
          <span className="text-base text-noble-grey line-through">{formatPrice(product.compareAtPrice, product.currency)}</span>
        )}
      </div>

      {product.variants.length > 1 && (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-noble-black">Options</p>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                type="button"
                onClick={() => setSelectedVariant(variant)}
                aria-pressed={variant.id === selectedVariant.id}
                disabled={variant.stockQuantity === 0}
                className={cn(
                  "rounded-sm border px-4 py-2 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-40",
                  variant.id === selectedVariant.id
                    ? "border-noble-black bg-noble-black text-noble-white"
                    : "border-noble-line text-noble-black hover:border-noble-black"
                )}
              >
                {variant.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {isOutOfStock ? (
        notifySubmitted ? (
          <p className="flex items-center gap-2 text-sm text-noble-black">
            <Check className="h-4 w-4 text-noble-gold" />
            We&apos;ll email you the moment this is back.
          </p>
        ) : (
          <form onSubmit={handleNotifySubmit} className="flex flex-col gap-2 sm:flex-row">
            <Input
              type="email"
              required
              placeholder="Your email"
              value={notifyEmail}
              onChange={(e) => setNotifyEmail(e.target.value)}
            />
            <Button type="submit" variant="outline" className="shrink-0">
              Notify Me
            </Button>
          </form>
        )
      ) : (
        <div className="flex items-center gap-3">
          <Button onClick={handleAddToCart} size="lg" className="flex-1">
            {added ? (
              <>
                <Check className="h-4 w-4" /> Added
              </>
            ) : (
              `Add to Cart — ${formatPrice(price, product.currency)}`
            )}
          </Button>
          <button
            type="button"
            onClick={() => toggle(product.id)}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={wishlisted}
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-sm border border-noble-line transition-colors hover:border-noble-black"
          >
            <Heart className={cn("h-5 w-5", wishlisted ? "fill-noble-gold text-noble-gold" : "text-noble-black")} />
          </button>
        </div>
      )}

      <div className="flex flex-col gap-1.5 border-t border-noble-line pt-4 text-sm text-noble-grey">
        <p className="flex items-center gap-2">
          <Truck className="h-4 w-4 text-noble-gold" />
          {isOutOfStock ? "Currently unavailable" : product.shippingEstimate}
        </p>
        <p className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-noble-gold" />
          Authenticity guaranteed
        </p>
      </div>

      {/* Sticky mobile bar — appears once the customer scrolls past the
          initial fold, not from first paint, which would just duplicate the
          button already visible above. See wireframe notes on Product Detail. */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-30 flex items-center gap-3 border-t border-noble-line bg-noble-white/95 p-4 backdrop-blur-sm transition-transform duration-300 lg:hidden",
          stickyVisible && !isOutOfStock ? "translate-y-0" : "pointer-events-none translate-y-full"
        )}
      >
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-noble-black">{product.name}</p>
          <p className="text-sm text-noble-grey">{formatPrice(price, product.currency)}</p>
        </div>
        <Button onClick={handleAddToCart} className="shrink-0">
          {added ? <Check className="h-4 w-4" /> : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
}
