"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/db";

const VALID_STATUSES = ["processing", "shipped", "delivered", "cancelled"];

export async function updateOrderStatusAction(orderId: string, status: string): Promise<void> {
  if (!VALID_STATUSES.includes(status)) return;
  await prisma.order.update({ where: { id: orderId }, data: { status } });
  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);
}
