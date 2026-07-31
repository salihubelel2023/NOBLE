"use client";

import { useTransition } from "react";

import { updateOrderStatusAction } from "@/lib/actions/order-admin-actions";
import { cn } from "@/lib/utils";

const statusOptions = ["processing", "shipped", "delivered", "cancelled"];

export function OrderStatusSelect({ orderId, currentStatus }: { orderId: string; currentStatus: string }) {
  const [isPending, startTransition] = useTransition();

  function handleChange(status: string) {
    startTransition(() => {
      updateOrderStatusAction(orderId, status);
    });
  }

  return (
    <select
      value={currentStatus}
      disabled={isPending}
      onChange={(e) => handleChange(e.target.value)}
      className={cn(
        "h-9 rounded-sm border border-noble-line bg-transparent px-3 text-sm capitalize disabled:opacity-50"
      )}
    >
      {statusOptions.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
}
