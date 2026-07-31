"use server";

import { prisma } from "@/lib/db";

export interface PlaceOrderItemInput {
  variantId: string;
  productName: string;
  variantLabel: string;
  quantity: number;
  unitPrice: number;
}

export interface PlaceOrderInput {
  customerEmail: string;
  customerName: string;
  shippingAddress: string;
  city: string;
  phone: string;
  paymentMethod: string;
  currency: string;
  items: PlaceOrderItemInput[];
}

function generateOrderNumber(): string {
  return `NB-${Math.floor(10000 + Math.random() * 89999)}`;
}

/**
 * Persists a real Order + OrderItem rows — this is what makes /admin/orders
 * meaningful rather than a page with nothing to show. Called from
 * CheckoutFlow (a Client Component) as a Server Action, since placing an
 * order is a mutation and Client Components can't write to the database
 * directly. unitPrice is snapshotted from what the client already tracked
 * at add-to-cart time — never recalculated from a live product price here,
 * matching the "never renegotiate a historical order" rule in
 * ARCHITECTURE.md Section 4.
 */
export async function placeOrderAction(input: PlaceOrderInput): Promise<{ orderNumber: string }> {
  const subtotal = input.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const orderNumber = generateOrderNumber();

  await prisma.order.create({
    data: {
      orderNumber,
      customerEmail: input.customerEmail,
      customerName: input.customerName,
      shippingAddress: input.shippingAddress,
      city: input.city,
      phone: input.phone,
      paymentMethod: input.paymentMethod,
      currency: input.currency,
      subtotal,
      items: {
        create: input.items.map((item) => ({
          variantId: item.variantId,
          productName: item.productName,
          variantLabel: item.variantLabel,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        })),
      },
    },
  });

  return { orderNumber };
}
