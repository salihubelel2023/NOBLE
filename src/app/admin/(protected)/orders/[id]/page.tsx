import { notFound } from "next/navigation";

import { prisma } from "@/lib/db";
import { formatPrice } from "@/lib/format";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { OrderStatusSelect } from "@/components/admin/order-status-select";

type PageProps = { params: Promise<{ id: string }> };

export const metadata = { title: "Order Detail | NOBLE Admin" };

export default async function AdminOrderDetailPage({ params }: PageProps) {
  const { id } = await params;
  const order = await prisma.order.findUnique({ where: { id }, include: { items: true } });
  if (!order) notFound();

  return (
    <div>
      <AdminPageHeader
        title={order.orderNumber}
        description={order.createdAt.toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })}
        action={<OrderStatusSelect orderId={order.id} currentStatus={order.status} />}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="border border-noble-line bg-noble-white p-5">
          <p className="mb-3 text-[11px] uppercase tracking-[0.1em] text-noble-grey">Customer</p>
          <p className="text-sm text-noble-black">{order.customerName}</p>
          <p className="text-sm text-noble-grey">{order.customerEmail}</p>
          <p className="text-sm text-noble-grey">{order.phone}</p>
        </div>
        <div className="border border-noble-line bg-noble-white p-5">
          <p className="mb-3 text-[11px] uppercase tracking-[0.1em] text-noble-grey">Shipping</p>
          <p className="text-sm text-noble-black">{order.shippingAddress}</p>
          <p className="text-sm text-noble-grey">{order.city}</p>
          <p className="mt-2 text-sm capitalize text-noble-grey">Payment: {order.paymentMethod.replace("-", " ")}</p>
        </div>
      </div>

      <div className="mt-6 border border-noble-line bg-noble-white">
        <p className="border-b border-noble-line px-5 py-4 text-[11px] uppercase tracking-[0.1em] text-noble-grey">Items</p>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-noble-line text-left text-xs uppercase tracking-[0.08em] text-noble-grey">
              <th className="px-5 py-3 font-medium">Product</th>
              <th className="px-5 py-3 font-medium">Variant</th>
              <th className="px-5 py-3 font-medium">Qty</th>
              <th className="px-5 py-3 text-right font-medium">Unit Price</th>
              <th className="px-5 py-3 text-right font-medium">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.id} className="border-b border-noble-line last:border-none">
                <td className="px-5 py-3 text-noble-black">{item.productName}</td>
                <td className="px-5 py-3 text-noble-grey">{item.variantLabel}</td>
                <td className="px-5 py-3 text-noble-grey">{item.quantity}</td>
                <td className="px-5 py-3 text-right text-noble-grey">{formatPrice(item.unitPrice, order.currency)}</td>
                <td className="px-5 py-3 text-right text-noble-black">{formatPrice(item.unitPrice * item.quantity, order.currency)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4} className="px-5 py-3 text-right text-sm font-medium text-noble-black">
                Total
              </td>
              <td className="px-5 py-3 text-right text-sm font-medium text-noble-black">{formatPrice(order.subtotal, order.currency)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
