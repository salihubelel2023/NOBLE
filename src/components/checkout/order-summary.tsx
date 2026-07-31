import Image from "next/image";

import { formatPrice } from "@/lib/format";

export interface OrderSummaryLine {
  variantId: string;
  productName: string;
  variantLabel: string;
  imageUrl: string;
  imageAlt: string;
  quantity: number;
  unitPrice: number;
}

interface OrderSummaryProps {
  lines: OrderSummaryLine[];
  currency?: string;
}

/**
 * Stays visible (sticky, on desktop) across all three steps — the customer
 * should never lose sight of exactly what they're paying for. On mobile it
 * collapses into a "Show order summary" accordion above the form rather
 * than eating the whole first screen — native <details> again, zero extra
 * client JS for the collapse itself. See wireframe notes on Checkout.
 */
export function OrderSummary({ lines, currency = "NGN" }: OrderSummaryProps) {
  const subtotal = lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);

  const body = (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-4">
        {lines.map((line) => (
          <div key={line.variantId} className="flex items-center gap-3">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-noble-ivory">
              <Image src={line.imageUrl} alt={line.imageAlt} fill sizes="64px" className="object-cover" />
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-noble-black text-[10px] text-noble-white">
                {line.quantity}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-noble-black">{line.productName}</p>
              <p className="text-xs text-noble-grey">{line.variantLabel}</p>
            </div>
            <span className="shrink-0 text-sm text-noble-black">{formatPrice(line.unitPrice * line.quantity, currency)}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2 border-t border-noble-line pt-4 text-sm">
        <div className="flex justify-between text-noble-grey">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal, currency)}</span>
        </div>
        <div className="flex justify-between text-noble-grey">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between border-t border-noble-line pt-2 text-base font-medium text-noble-black">
          <span>Total</span>
          <span>{formatPrice(subtotal, currency)}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="lg:sticky lg:top-24">
      <details className="lg:hidden" open>
        <summary className="mb-4 flex cursor-pointer list-none items-center justify-between border-y border-noble-line py-4 text-sm font-medium text-noble-black">
          Show order summary
          <span>{formatPrice(subtotal, currency)}</span>
        </summary>
        {body}
      </details>
      <div className="hidden lg:block">
        <p className="mb-5 text-[11px] uppercase tracking-[0.12em] text-noble-grey">Order Summary</p>
        {body}
      </div>
    </div>
  );
}
