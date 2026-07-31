import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

interface PriceTagProps {
  price: number;
  compareAtPrice?: number;
  currency?: string;
  className?: string;
}

export function PriceTag({ price, compareAtPrice, currency = "NGN", className }: PriceTagProps) {
  const onSale = typeof compareAtPrice === "number" && compareAtPrice > price;

  return (
    <div className={cn("flex items-baseline gap-2", className)}>
      <span className="text-base font-medium text-noble-black">{formatPrice(price, currency)}</span>
      {onSale && (
        <span className="text-sm text-noble-grey line-through">{formatPrice(compareAtPrice, currency)}</span>
      )}
    </div>
  );
}
