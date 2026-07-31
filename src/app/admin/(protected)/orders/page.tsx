import Link from "next/link";

import { prisma } from "@/lib/db";
import { formatPrice } from "@/lib/format";
import { AdminPageHeader } from "@/components/admin/admin-page-header";

export const metadata = { title: "Orders | NOBLE Admin" };

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <AdminPageHeader title="Orders" description={`${orders.length} total`} />

      <div className="overflow-x-auto border border-noble-line bg-noble-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-noble-line text-left text-xs uppercase tracking-[0.08em] text-noble-grey">
              <th className="px-4 py-3 font-medium">Order</th>
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Items</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 text-right font-medium">Total</th>
              <th className="px-4 py-3 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-noble-line last:border-none">
                <td className="px-4 py-3">
                  <Link href={`/admin/orders/${order.id}`} className="font-mono text-xs text-noble-black hover:text-noble-gold">
                    {order.orderNumber}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <p className="text-noble-black">{order.customerName}</p>
                  <p className="text-xs text-noble-grey">{order.customerEmail}</p>
                </td>
                <td className="px-4 py-3 text-noble-grey">{order.items.length}</td>
                <td className="px-4 py-3 capitalize text-noble-grey">{order.status}</td>
                <td className="px-4 py-3 text-right text-noble-black">{formatPrice(order.subtotal, order.currency)}</td>
                <td className="px-4 py-3 text-noble-grey">
                  {order.createdAt.toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && <p className="px-4 py-8 text-center text-sm text-noble-grey">No orders yet.</p>}
      </div>
    </div>
  );
}
