import { ShoppingBag, Users, ChefHat, Star, TrendingUp, Clock, ImageIcon } from "lucide-react";
import { AnalyticsCard } from "@/components/admin/AnalyticsCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { getDashboardStats, getOrders } from "@/lib/actions/orders";
import { getCateringRequests } from "@/lib/actions/catering";
import { timeAgo } from "@/lib/utils";
import Link from "next/link";

// Mini bar chart — no external library
function WeeklyChart({ data }: { data: { day: string; count: number; revenue: number }[] }) {
  const max = Math.max(...data.map((d) => d.count), 1);
  return (
    <div className="flex items-stretch gap-1.5 h-16">
      {data.map((d) => {
        const pct = Math.max((d.count / max) * 100, 8);
        return (
          <div key={d.day} className="flex flex-col items-center flex-1 group">
            {/* Track — a flex-grow child within a column flex container has a definite
                height, so the percentage-height bar below resolves correctly. A row with
                items-end (the old layout) does NOT give its children a definite height,
                which silently collapsed every bar to 0px. */}
            <div
              className="w-full flex-1 flex items-end rounded-t bg-[#B54E32]/10 group-hover:bg-[#B54E32]/20 transition-colors overflow-hidden"
              title={`${d.day}: ${d.count} orders`}
            >
              <div
                className="w-full bg-[#B54E32] rounded-t transition-all"
                style={{ height: `${pct}%` }}
              />
            </div>
            <span className="mt-1 text-[9px] text-neutral-400 font-medium shrink-0" style={{ fontFamily: "var(--font-inter)" }}>{d.day}</span>
          </div>
        );
      })}
    </div>
  );
}

export default async function AdminDashboardPage() {
  const [stats, ordersResult, cateringResult] = await Promise.all([
    getDashboardStats(),
    getOrders({ page: 1 }),
    getCateringRequests(),
  ]);

  const recentOrders = (ordersResult.orders ?? []).slice(0, 5);
  const recentCatering = (cateringResult.requests ?? []).slice(0, 3);

  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <AnalyticsCard
          title="Today's Orders"
          value={stats.todayOrders}
          subtitle={`${stats.activeOrders} active`}
          icon={ShoppingBag}
          trend={{ value: "+12% vs yesterday", up: true }}
          color="terracotta"
        />
        <AnalyticsCard
          title="Today's Revenue"
          value={`$${stats.todayRevenue.toFixed(2)}`}
          subtitle="Before tax"
          icon={TrendingUp}
          trend={{ value: "+8% vs yesterday", up: true }}
          color="sage"
        />
        <AnalyticsCard
          title="Catering Requests"
          value={stats.pendingCatering}
          subtitle="Awaiting response"
          icon={Users}
          color="orange"
        />
        <AnalyticsCard
          title="Gallery Images"
          value={stats.galleryImages}
          subtitle="Published"
          icon={Star}
          color="default"
        />
      </div>

      {/* Chart + quick info */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-neutral-200 p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-semibold text-[#111] text-sm" style={{ fontFamily: "var(--font-inter)" }}>Weekly Orders</h2>
              <p className="text-xs text-neutral-400 mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>Last 7 days</p>
            </div>
            <span className="text-xs text-neutral-400 bg-neutral-100 px-2 py-1 rounded-lg" style={{ fontFamily: "var(--font-inter)" }}>
              Total: {stats.weeklyOrders.reduce((s, d) => s + d.count, 0)}
            </span>
          </div>
          <WeeklyChart data={stats.weeklyOrders} />
        </div>

        <div className="bg-white rounded-2xl border border-neutral-200 p-5 flex flex-col gap-4">
          <h2 className="font-semibold text-[#111] text-sm" style={{ fontFamily: "var(--font-inter)" }}>Quick Stats</h2>
          {[
            { label: "Menu Items", value: stats.totalMenuItems, icon: ChefHat },
            { label: "Active Orders", value: stats.activeOrders, icon: Clock },
            { label: "Gallery Images", value: stats.galleryImages, icon: Star },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-500 shrink-0">
                <Icon size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-neutral-400" style={{ fontFamily: "var(--font-inter)" }}>{label}</p>
                <p className="text-sm font-semibold text-[#111]" style={{ fontFamily: "var(--font-inter)" }}>{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent orders + catering */}
      <div className="grid lg:grid-cols-5 gap-4">
        {/* Recent orders */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-neutral-200 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
            <h2 className="font-semibold text-[#111] text-sm" style={{ fontFamily: "var(--font-inter)" }}>Recent Orders</h2>
            <Link href="/admin/orders" className="text-xs text-[#B54E32] hover:underline font-medium" style={{ fontFamily: "var(--font-inter)" }}>
              View all →
            </Link>
          </div>
          <div className="divide-y divide-neutral-50">
            {recentOrders.map((order) => (
              <Link
                key={order.id}
                href={`/admin/orders/${order.id}`}
                className="flex items-center gap-4 px-5 py-3.5 hover:bg-neutral-50 transition-colors group"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-neutral-800 truncate" style={{ fontFamily: "var(--font-inter)" }}>
                    {order.customer.name}
                  </p>
                  <p className="text-xs text-neutral-400 mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>
                    {order.orderRef} · {order.orderType === "DELIVERY" ? "Delivery" : "Pickup"} · {timeAgo(order.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-sm font-semibold text-[#111]" style={{ fontFamily: "var(--font-inter)" }}>${order.total.toFixed(2)}</span>
                  <StatusBadge status={order.status} type="order" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent catering */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-neutral-200 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
            <h2 className="font-semibold text-[#111] text-sm" style={{ fontFamily: "var(--font-inter)" }}>Catering Requests</h2>
            <Link href="/admin/catering" className="text-xs text-[#B54E32] hover:underline font-medium" style={{ fontFamily: "var(--font-inter)" }}>
              View all →
            </Link>
          </div>
          <div className="divide-y divide-neutral-50">
            {recentCatering.map((req) => (
              <Link
                key={req.id}
                href={`/admin/catering/${req.id}`}
                className="flex flex-col gap-1 px-5 py-3.5 hover:bg-neutral-50 transition-colors"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-neutral-800 truncate" style={{ fontFamily: "var(--font-inter)" }}>{req.name}</p>
                  <StatusBadge status={req.status} type="catering" />
                </div>
                <p className="text-xs text-neutral-400" style={{ fontFamily: "var(--font-inter)" }}>
                  {req.eventType} · {req.guestCount} guests · {req.date}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
