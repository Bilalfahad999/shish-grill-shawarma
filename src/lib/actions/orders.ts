"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import {
  MOCK_ORDERS, MOCK_DASHBOARD_STATS, MOCK_MENU_ITEMS,
  MOCK_GALLERY, MOCK_CATERING,
} from "@/lib/mock-data";
import type { AdminOrder, OrderStatus, DashboardStats, ActionResult } from "@/types/admin";

const ACTIVE_ORDER_STATUSES: OrderStatus[] = ["PENDING", "CONFIRMED", "PREPARING", "READY", "OUT_FOR_DELIVERY"];

export async function getDashboardStats(): Promise<DashboardStats> {
  // TODO Prisma: complex aggregation query — replace the counts below with real
  // prisma.{model}.count()/aggregate() calls once a database is connected.
  return {
    ...MOCK_DASHBOARD_STATS,
    totalMenuItems: MOCK_MENU_ITEMS.filter((m) => !m.archived).length,
    activeOrders: MOCK_ORDERS.filter((o) => ACTIVE_ORDER_STATUSES.includes(o.status)).length,
    todayOrders: MOCK_ORDERS.length,
    todayRevenue: MOCK_ORDERS.reduce((sum, o) => sum + o.total, 0),
    pendingCatering: MOCK_CATERING.filter((c) => c.status === "NEW").length,
    galleryImages: MOCK_GALLERY.length,
  };
}

export async function getOrders(filters?: {
  status?: OrderStatus;
  search?: string;
  page?: number;
}): Promise<{ orders: AdminOrder[]; total: number }> {
  // TODO Prisma:
  // const where = { ... }
  // const [orders, total] = await prisma.$transaction([
  //   prisma.order.findMany({ where, include: { customer: true, items: true }, orderBy: { createdAt: "desc" }, take: 20, skip: (page-1)*20 }),
  //   prisma.order.count({ where }),
  // ])
  let filtered = MOCK_ORDERS;
  if (filters?.status) filtered = filtered.filter((o) => o.status === filters.status);
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    filtered = filtered.filter(
      (o) =>
        o.orderRef.toLowerCase().includes(q) ||
        o.customer.name.toLowerCase().includes(q) ||
        o.customer.phone.includes(q)
    );
  }
  return { orders: filtered, total: filtered.length };
}

export async function getOrder(id: string): Promise<AdminOrder | null> {
  // TODO Prisma: return prisma.order.findUnique({ where: { id }, include: { customer: true, items: true } })
  return MOCK_ORDERS.find((o) => o.id === id) ?? null;
}

export async function updateOrderStatus(
  id: string,
  status: OrderStatus
): Promise<ActionResult> {
  const session = await auth();
  if (!session) return { success: false, error: "Unauthorized" };

  const order = MOCK_ORDERS.find((o) => o.id === id);
  if (!order) return { success: false, error: "Order not found" };

  // TODO Prisma: await prisma.order.update({ where: { id }, data: { status } })
  order.status = status;
  order.updatedAt = new Date().toISOString();

  revalidatePath("/admin/orders");
  return { success: true, data: undefined };
}
