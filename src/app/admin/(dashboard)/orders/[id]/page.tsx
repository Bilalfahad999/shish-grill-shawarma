import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Phone, Mail, MapPin, Clock, Download } from "lucide-react";
import { getOrder } from "@/lib/actions/orders";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { OrderStatusUpdater } from "./OrderStatusUpdater";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getOrder(id);
  if (!order) notFound();

  return (
    <div className="max-w-3xl space-y-5">
      <div className="flex items-center gap-3">
        <Link href="/admin/orders" className="w-8 h-8 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-500 hover:bg-neutral-100 transition-colors cursor-pointer">
          <ArrowLeft size={14} />
        </Link>
        <div>
          <h1 className="font-semibold text-[#111] text-base font-mono" style={{ fontFamily: "var(--font-inter)" }}>{order.orderRef}</h1>
          <p className="text-xs text-neutral-400" style={{ fontFamily: "var(--font-inter)" }}>
            {new Date(order.createdAt).toLocaleString("en-AU")}
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <a
            href={`/api/admin/orders/${order.id}/pdf`}
            download
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 text-xs font-medium text-neutral-600 hover:bg-neutral-50 transition-colors cursor-pointer"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <Download size={12} /> PDF
          </a>
          <StatusBadge status={order.status} type="order" size="md" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* Customer */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-5">
          <h2 className="font-semibold text-sm text-[#111] mb-3" style={{ fontFamily: "var(--font-inter)" }}>Customer</h2>
          <div className="space-y-2">
            <p className="font-medium text-neutral-800" style={{ fontFamily: "var(--font-inter)" }}>{order.customer.name}</p>
            <a href={`tel:${order.customer.phone}`} className="flex items-center gap-2 text-sm text-neutral-600 hover:text-[#B54E32] transition-colors" style={{ fontFamily: "var(--font-inter)" }}>
              <Phone size={13} /> {order.customer.phone}
            </a>
            {order.customer.email && (
              <a href={`mailto:${order.customer.email}`} className="flex items-center gap-2 text-sm text-neutral-600 hover:text-[#B54E32] transition-colors" style={{ fontFamily: "var(--font-inter)" }}>
                <Mail size={13} /> {order.customer.email}
              </a>
            )}
          </div>
        </div>

        {/* Delivery/Pickup */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-5">
          <h2 className="font-semibold text-sm text-[#111] mb-3" style={{ fontFamily: "var(--font-inter)" }}>
            {order.orderType === "DELIVERY" ? "Delivery" : "Pickup"}
          </h2>
          {order.orderType === "DELIVERY" && order.deliveryAddress ? (
            <div className="flex items-start gap-2 text-sm text-neutral-600" style={{ fontFamily: "var(--font-inter)" }}>
              <MapPin size={13} className="mt-0.5 shrink-0" />
              <span>{order.deliveryAddress.street}, {order.deliveryAddress.suburb} {order.deliveryAddress.postcode}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm text-neutral-600" style={{ fontFamily: "var(--font-inter)" }}>
              <Clock size={13} />
              <span>{order.pickupTime === "asap" ? "ASAP" : `In ${order.pickupTime} mins`}</span>
            </div>
          )}
          <p className="text-xs text-neutral-400 mt-2" style={{ fontFamily: "var(--font-inter)" }}>
            Payment: {order.paymentMethod?.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
          </p>
        </div>
      </div>

      {/* Items */}
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-neutral-100">
          <h2 className="font-semibold text-sm text-[#111]" style={{ fontFamily: "var(--font-inter)" }}>Order Items</h2>
        </div>
        <div className="divide-y divide-neutral-50">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-start justify-between gap-4 px-5 py-3.5">
              <div className="min-w-0">
                <p className="text-sm font-medium text-neutral-800" style={{ fontFamily: "var(--font-inter)" }}>
                  {item.quantity}× {item.name}
                </p>
                {item.notes && <p className="text-xs text-neutral-400 mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>Note: {item.notes}</p>}
              </div>
              <p className="text-sm font-semibold text-neutral-800 shrink-0" style={{ fontFamily: "var(--font-inter)" }}>
                ${(item.basePrice * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
        <div className="px-5 py-4 border-t border-neutral-100 bg-neutral-50/50 space-y-1.5">
          <div className="flex justify-between text-sm text-neutral-600" style={{ fontFamily: "var(--font-inter)" }}>
            <span>Subtotal</span><span>${order.subtotal.toFixed(2)}</span>
          </div>
          {order.deliveryFee > 0 && (
            <div className="flex justify-between text-sm text-neutral-600" style={{ fontFamily: "var(--font-inter)" }}>
              <span>Delivery fee</span><span>${order.deliveryFee.toFixed(2)}</span>
            </div>
          )}
          {order.discount > 0 && (
            <div className="flex justify-between text-sm text-[#6E8B5C]" style={{ fontFamily: "var(--font-inter)" }}>
              <span>Discount {order.coupon ? `(${order.coupon})` : ""}</span>
              <span>−${order.discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between font-semibold text-[#111] pt-1 border-t border-neutral-200" style={{ fontFamily: "var(--font-inter)" }}>
            <span>Total</span><span>${order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Status updater */}
      <OrderStatusUpdater orderId={order.id} currentStatus={order.status} orderType={order.orderType} />
    </div>
  );
}
