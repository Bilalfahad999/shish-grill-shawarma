import type { OrderStatus, CateringStatus } from "@/types/admin";

const orderColors: Record<OrderStatus, string> = {
  PENDING: "bg-amber-100 text-amber-700 border-amber-200",
  CONFIRMED: "bg-sky-100 text-sky-700 border-sky-200",
  PREPARING: "bg-blue-100 text-blue-700 border-blue-200",
  READY: "bg-[#6E8B5C]/10 text-[#4C6B3C] border-[#6E8B5C]/20",
  OUT_FOR_DELIVERY: "bg-purple-100 text-purple-700 border-purple-200",
  DELIVERED: "bg-[#6E8B5C]/10 text-[#4C6B3C] border-[#6E8B5C]/20",
  COMPLETED: "bg-neutral-100 text-neutral-500 border-neutral-200",
  CANCELLED: "bg-red-100 text-red-600 border-red-200",
};

const cateringColors: Record<CateringStatus, string> = {
  NEW: "bg-[#B54E32]/10 text-[#B54E32] border-[#B54E32]/20",
  CONTACTED: "bg-blue-100 text-blue-700 border-blue-200",
  QUOTED: "bg-amber-100 text-amber-700 border-amber-200",
  CONFIRMED: "bg-[#6E8B5C]/10 text-[#4C6B3C] border-[#6E8B5C]/20",
  COMPLETED: "bg-neutral-100 text-neutral-500 border-neutral-200",
  ARCHIVED: "bg-neutral-50 text-neutral-400 border-neutral-100",
};

const labels: Record<string, string> = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  PREPARING: "Preparing",
  READY: "Ready",
  OUT_FOR_DELIVERY: "Delivering",
  DELIVERED: "Delivered",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
  NEW: "New",
  CONTACTED: "Contacted",
  QUOTED: "Quoted",
  ARCHIVED: "Archived",
};

interface StatusBadgeProps {
  status: OrderStatus | CateringStatus;
  type?: "order" | "catering";
  size?: "sm" | "md";
}

export function StatusBadge({ status, type = "order", size = "sm" }: StatusBadgeProps) {
  const colors = type === "order" ? orderColors : cateringColors;
  const color = (colors as Record<string, string>)[status] ?? "bg-neutral-100 text-neutral-500 border-neutral-200";
  return (
    <span
      className={`inline-flex items-center border rounded-full font-medium capitalize ${
        size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm"
      } ${color}`}
      style={{ fontFamily: "var(--font-inter)" }}
    >
      {labels[status] ?? status}
    </span>
  );
}
