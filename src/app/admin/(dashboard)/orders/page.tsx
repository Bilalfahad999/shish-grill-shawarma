"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Search, RefreshCw } from "lucide-react";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { EmptyState } from "@/components/admin/EmptyState";
import { getOrders } from "@/lib/actions/orders";
import { timeAgo } from "@/lib/utils";
import type { AdminOrder, OrderStatus } from "@/types/admin";
import { useEffect } from "react";

const STATUS_FILTERS: { label: string; value: OrderStatus | "ALL" }[] = [
  { label: "All", value: "ALL" },
  { label: "Pending", value: "PENDING" },
  { label: "Confirmed", value: "CONFIRMED" },
  { label: "Preparing", value: "PREPARING" },
  { label: "Ready", value: "READY" },
  { label: "Delivering", value: "OUT_FOR_DELIVERY" },
  { label: "Delivered", value: "DELIVERED" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Cancelled", value: "CANCELLED" },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [total, setTotal] = useState(0);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "ALL">("ALL");
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();

  const load = () => {
    startTransition(async () => {
      const result = await getOrders({
        status: statusFilter === "ALL" ? undefined : statusFilter,
        search: search || undefined,
      });
      setOrders(result.orders);
      setTotal(result.total);
    });
  };

  useEffect(() => { load(); }, [statusFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    load();
  };

  return (
    <div className="space-y-5 max-w-[1200px]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-semibold text-[#111] text-lg" style={{ fontFamily: "var(--font-inter)" }}>Orders</h1>
          <p className="text-sm text-neutral-400 mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>{total} total orders</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-4 flex flex-col sm:flex-row gap-3">
        <form onSubmit={handleSearch} className="flex gap-2 flex-1">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              aria-label="Search orders"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, ref, phone…"
              className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-neutral-200 bg-neutral-50 focus:outline-none focus:border-[#B54E32] focus:bg-white transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>
          <button type="submit" className="px-4 py-2 rounded-xl bg-[#B54E32] text-white text-sm font-medium hover:bg-[#D96C2F] transition-colors cursor-pointer" style={{ fontFamily: "var(--font-inter)" }}>
            Search
          </button>
        </form>
        <button onClick={load} className="w-9 h-9 rounded-xl border border-neutral-200 flex items-center justify-center text-neutral-500 hover:bg-neutral-100 transition-colors cursor-pointer shrink-0" aria-label="Refresh">
          <RefreshCw size={14} className={isPending ? "animate-spin" : ""} />
        </button>
      </div>

      {/* Status tabs */}
      <div className="flex gap-1 overflow-x-auto pb-1">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setStatusFilter(f.value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
              statusFilter === f.value
                ? "bg-[#B54E32] text-white"
                : "bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50"
            }`}
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
        {orders.length === 0 ? (
          <EmptyState icon={Search} title="No orders found" description="Try adjusting your search or filter." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ fontFamily: "var(--font-inter)" }}>
              <thead>
                <tr className="border-b border-neutral-100 bg-neutral-50/50">
                  <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wide">Order</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wide">Customer</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wide hidden md:table-cell">Type</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wide hidden lg:table-cell">Items</th>
                  <th className="px-5 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wide">Total</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wide">Status</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wide hidden sm:table-cell">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-neutral-50 transition-colors group">
                    <td className="px-5 py-3.5">
                      <Link href={`/admin/orders/${order.id}`} className="font-mono text-xs text-[#B54E32] hover:underline font-medium">
                        {order.orderRef}
                      </Link>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-neutral-800">{order.customer.name}</p>
                      <p className="text-xs text-neutral-400">{order.customer.phone}</p>
                    </td>
                    <td className="px-5 py-3.5 hidden md:table-cell">
                      <span className="text-neutral-600">{order.orderType === "DELIVERY" ? "Delivery" : "Pickup"}</span>
                    </td>
                    <td className="px-5 py-3.5 hidden lg:table-cell text-neutral-500">
                      {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                    </td>
                    <td className="px-5 py-3.5 text-right font-semibold text-neutral-800">${order.total.toFixed(2)}</td>
                    <td className="px-5 py-3.5"><StatusBadge status={order.status} type="order" /></td>
                    <td className="px-5 py-3.5 hidden sm:table-cell text-xs text-neutral-400">{timeAgo(order.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
