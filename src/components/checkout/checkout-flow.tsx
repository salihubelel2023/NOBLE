"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { Banknote, Building2, Check, CreditCard, ShoppingBag } from "lucide-react";

import { useCart } from "@/hooks/use-cart";
import type { Product } from "@/types/product";
import { placeOrderAction } from "@/lib/actions/order-actions";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/shared/empty-state";
import { CheckoutSteps } from "@/components/checkout/checkout-steps";
import { OrderSummary, type OrderSummaryLine } from "@/components/checkout/order-summary";

interface ShippingDetails {
  email: string;
  fullName: string;
  address: string;
  city: string;
  phone: string;
}

const initialShipping: ShippingDetails = { email: "", fullName: "", address: "", city: "", phone: "" };

type PaymentMethod = "card" | "bank-transfer" | "pod";

const paymentOptions: { value: PaymentMethod; label: string; icon: typeof CreditCard }[] = [
  { value: "card", label: "Card", icon: CreditCard },
  { value: "bank-transfer", label: "Bank Transfer", icon: Building2 },
  { value: "pod", label: "Pay on Delivery", icon: Banknote },
];

interface CheckoutFlowProps {
  allProducts: Product[];
}

/**
 * Guest checkout is the default path — account creation, if ever offered,
 * comes after the order, never required upfront. The payment step is
 * UI-only (method selection, not card-number collection) since no gateway
 * is wired up yet — see ARCHITECTURE.md and wireframe notes.
 *
 * Receives allProducts as a prop (fetched once, server-side, by page.tsx)
 * rather than calling getProductById directly — products are database-
 * backed now and this is a Client Component. Placing an order calls the
 * real placeOrderAction Server Action, which writes an Order + OrderItems
 * — this is what /admin/orders actually has to show.
 */
export function CheckoutFlow({ allProducts }: CheckoutFlowProps) {
  const { lines, clear } = useCart();
  const [step, setStep] = useState(1);
  const [shipping, setShipping] = useState<ShippingDetails>(initialShipping);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);
  const [placeOrderError, setPlaceOrderError] = useState<string | null>(null);

  const summaryLines: OrderSummaryLine[] = useMemo(
    () =>
      lines
        .map((line) => {
          const product = allProducts.find((p) => p.id === line.productId);
          if (!product) return null;
          const variant = product.variants.find((v) => v.id === line.variantId);
          return {
            variantId: line.variantId,
            productName: product.name,
            variantLabel: variant?.label ?? product.name,
            imageUrl: product.images[0].url,
            imageAlt: product.images[0].alt,
            quantity: line.quantity,
            unitPrice: line.priceAtAdd,
          } satisfies OrderSummaryLine;
        })
        .filter((line): line is OrderSummaryLine => line !== null),
    [lines, allProducts]
  );

  function handleShippingSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStep(2);
  }

  async function handlePlaceOrder() {
    setPlacingOrder(true);
    setPlaceOrderError(null);
    try {
      const result = await placeOrderAction({
        customerEmail: shipping.email,
        customerName: shipping.fullName,
        shippingAddress: shipping.address,
        city: shipping.city,
        phone: shipping.phone,
        paymentMethod,
        currency: "NGN",
        items: summaryLines.map((line) => ({
          variantId: line.variantId,
          productName: line.productName,
          variantLabel: line.variantLabel,
          quantity: line.quantity,
          unitPrice: line.unitPrice,
        })),
      });
      setOrderNumber(result.orderNumber);
      setOrderPlaced(true);
      clear();
    } catch {
      setPlaceOrderError("Something went wrong placing your order. Please try again.");
    } finally {
      setPlacingOrder(false);
    }
  }

  if (orderPlaced) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-6 py-24 text-center">
        <Check className="h-10 w-10 text-noble-gold" />
        <h1 className="font-serif text-3xl text-noble-black">Order Confirmed</h1>
        <p className="text-noble-grey">
          Order <span className="font-medium text-noble-black">{orderNumber}</span> is being prepared. A confirmation has been sent to {shipping.email || "your email"}.
        </p>
        <Button asChild size="lg" className="mt-4">
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  if (summaryLines.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-6 py-24">
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Add a piece to your cart before checking out."
          ctaLabel="Explore Watches"
          ctaHref="/catalog/watches"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 lg:px-8 lg:py-16">
      <CheckoutSteps currentStep={step} />

      <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <div>
          {step === 1 && (
            <form onSubmit={handleShippingSubmit} className="flex flex-col gap-5">
              <h2 className="font-serif text-2xl text-noble-black">Shipping Details</h2>
              <label className="flex flex-col gap-1.5">
                <span className="text-sm text-noble-black">Email</span>
                <Input type="email" required value={shipping.email} onChange={(e) => setShipping({ ...shipping, email: e.target.value })} />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-sm text-noble-black">Full Name</span>
                <Input required value={shipping.fullName} onChange={(e) => setShipping({ ...shipping, fullName: e.target.value })} />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-sm text-noble-black">Address</span>
                <Input required value={shipping.address} onChange={(e) => setShipping({ ...shipping, address: e.target.value })} />
              </label>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm text-noble-black">City</span>
                  <Input required value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })} />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm text-noble-black">Phone</span>
                  <Input type="tel" required value={shipping.phone} onChange={(e) => setShipping({ ...shipping, phone: e.target.value })} />
                </label>
              </div>
              <Button type="submit" size="lg" className="mt-2 self-start">
                Continue to Payment
              </Button>
            </form>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-5">
              <h2 className="font-serif text-2xl text-noble-black">Payment Method</h2>
              <div className="grid gap-3 sm:grid-cols-3">
                {paymentOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setPaymentMethod(option.value)}
                    aria-pressed={paymentMethod === option.value}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-sm border px-4 py-6 text-sm transition-colors",
                      paymentMethod === option.value ? "border-noble-black bg-noble-ivory" : "border-noble-line hover:border-noble-black"
                    )}
                  >
                    <option.icon className="h-5 w-5 text-noble-gold" strokeWidth={1.5} />
                    {option.label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-noble-grey">
                Payment details are collected on the next, encrypted step. NOBLE never stores your full card number.
              </p>
              <div className="mt-2 flex gap-3">
                <Button type="button" variant="outline" size="lg" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button type="button" size="lg" onClick={() => setStep(3)}>
                  Continue to Review
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-6">
              <h2 className="font-serif text-2xl text-noble-black">Review Your Order</h2>
              <div className="border border-noble-line p-5">
                <p className="mb-2 text-[11px] uppercase tracking-[0.12em] text-noble-grey">Shipping To</p>
                <p className="text-sm text-noble-black">{shipping.fullName}</p>
                <p className="text-sm text-noble-grey">{shipping.address}, {shipping.city}</p>
                <p className="text-sm text-noble-grey">{shipping.phone} &middot; {shipping.email}</p>
              </div>
              <div className="border border-noble-line p-5">
                <p className="mb-2 text-[11px] uppercase tracking-[0.12em] text-noble-grey">Payment Method</p>
                <p className="text-sm text-noble-black">{paymentOptions.find((o) => o.value === paymentMethod)?.label}</p>
              </div>
              {placeOrderError && <p className="text-sm text-noble-error">{placeOrderError}</p>}
              <div className="flex gap-3">
                <Button type="button" variant="outline" size="lg" onClick={() => setStep(2)} disabled={placingOrder}>
                  Back
                </Button>
                <Button type="button" size="lg" onClick={handlePlaceOrder} disabled={placingOrder}>
                  {placingOrder ? "Placing Order..." : "Place Order"}
                </Button>
              </div>
            </div>
          )}
        </div>

        <OrderSummary lines={summaryLines} currency="NGN" />
      </div>
    </div>
  );
}
