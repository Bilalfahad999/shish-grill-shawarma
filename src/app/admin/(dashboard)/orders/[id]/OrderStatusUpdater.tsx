"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateOrderStatus } from "@/lib/actions/orders";
import type { OrderStatus, OrderType } from "@/types/admin";
import { Loader2, Save, Ban } from "lucide-react";

// Linear "next step" progression — differs for pickup vs delivery orders.
const NEXT_STATUS: Record<OrderType, Partial<Record<OrderStatus, OrderStatus>>> = {
  PICKUP: {
    PENDING: "CONFIRMED",
    CONFIRMED: "PREPARING",
    PREPARING: "READY",
    READY: "COMPLETED",
  },
  DELIVERY: {
    PENDING: "CONFIRMED",
    CONFIRMED: "PREPARING",
    PREPARING: "OUT_FOR_DELIVERY",
    OUT_FOR_DELIVERY: "DELIVERED",
  },
};

const NEXT_LABEL: Record<OrderStatus, string> = {
  PENDING: "Confirm Order",
  CONFIRMED: "Mark as Preparing",
  PREPARING: "Mark as Ready",
  READY: "Mark as Completed",
  OUT_FOR_DELIVERY: "Mark as Delivered",
  DELIVERED: "Delivered",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

// Every status the order is allowed to be manually set to, in display order.
const ALL_STATUSES: OrderStatus[] = [
  "PENDING",
  "CONFIRMED",
  "PREPARING",
  "READY",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "COMPLETED",
  "CANCELLED",
];

const STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  PREPARING: "Preparing",
  READY: "Ready for Pickup",
  OUT_FOR_DELIVERY: "Out for Delivery",
  DELIVERED: "Delivered",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export function OrderStatusUpdater({
  orderId,
  currentStatus,
  orderType,
}: {
  orderId: string;
  currentStatus: OrderStatus;
  orderType: OrderType;
}) {
  const router = useRouter();
  // `status` is the single source of truth for what this component displays — it's seeded
  // from the server but tracked locally afterward, since the mock-data backend doesn't
  // actually persist between requests (no DB connected yet) and `currentStatus` would
  // otherwise reset to its original value on every router.refresh().
  const [status, setStatus] = useState<OrderStatus>(currentStatus);
  const [selected, setSelected] = useState<OrderStatus>(currentStatus);
  const [isPending, startTransition] = useTransition();

  const isFinal = status === "CANCELLED" || status === "COMPLETED" || status === "DELIVERED";
  const nextStatus = NEXT_STATUS[orderType][status];

  const apply = (newStatus: OrderStatus) => {
    startTransition(async () => {
      await updateOrderStatus(orderId, newStatus);
      setStatus(newStatus);
      setSelected(newStatus);
      toast.success(`Order ${STATUS_LABELS[newStatus].toLowerCase()}`);
      router.refresh();
    });
  };

  const saveSelected = () => {
    if (selected === status) return;
    apply(selected);
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-sm text-[#111]" style={{ fontFamily: "var(--font-inter)" }}>Update Status</h2>
        {!isFinal && nextStatus && (
          <button
            onClick={() => apply(nextStatus)}
            disabled={isPending}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#B54E32] text-white text-sm font-medium hover:bg-[#D96C2F] transition-colors cursor-pointer disabled:opacity-50"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {isPending && <Loader2 size={13} className="animate-spin" />}
            {NEXT_LABEL[status]}
          </button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value as OrderStatus)}
          aria-label="Order status"
          disabled={isPending}
          className="flex-1 px-3 py-2 text-sm rounded-xl border border-neutral-200 bg-neutral-50 focus:outline-none focus:border-[#B54E32] transition-colors cursor-pointer disabled:opacity-50"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {ALL_STATUSES.map((s) => (
            <option key={s} value={s}>{STATUS_LABELS[s]}</option>
          ))}
        </select>
        <button
          onClick={saveSelected}
          disabled={isPending || selected === status}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-neutral-200 text-neutral-700 text-sm font-medium hover:bg-neutral-50 transition-colors cursor-pointer disabled:opacity-40"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          <Save size={13} /> Apply
        </button>
        {status !== "CANCELLED" && (
          <button
            onClick={() => apply("CANCELLED")}
            disabled={isPending}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <Ban size={13} /> Cancel Order
          </button>
        )}
      </div>
    </div>
  );
}
