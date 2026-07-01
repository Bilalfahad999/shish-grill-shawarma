"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Home, RotateCcw, Phone, MessageCircle, Clock, CheckCircle } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Container } from "@/components/ui/Container";
import { openWhatsApp } from "@/lib/whatsapp";
import { formatPriceShort } from "@/lib/price";
import { PICKUP_LABELS } from "@/lib/order-labels";
import { RESTAURANT_CONFIG } from "@/config/restaurant";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import type { Order } from "@/types/order";

export default function SuccessPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const { settings } = useSiteSettings();

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("shish_last_order");
      if (raw) setOrder(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);

  const prepTime =
    order?.orderType === "delivery"
      ? RESTAURANT_CONFIG.deliveryTime
      : RESTAURANT_CONFIG.preparationTime;

  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-[#FAF7F2] min-h-screen pt-24 pb-20">
        <Container narrow>
          <div className="max-w-lg mx-auto text-center">
            {/* Success animation */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
              className="w-24 h-24 rounded-full bg-[#6E8B5C]/15 flex items-center justify-center mx-auto mb-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.35 }}
              >
                <CheckCircle size={52} className="text-[#6E8B5C]" />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
            >
              <h1 className="font-heading text-4xl sm:text-5xl font-light text-[#2F2F2F] mb-3">
                Thank you!
              </h1>
              <p className="font-body text-base text-[#6B6355] mb-2">
                Your order has been received.
              </p>
              {order && (
                <p className="font-body text-sm text-[#B54E32] font-semibold tracking-wide">
                  Order #{order.id}
                </p>
              )}
            </motion.div>

            {/* Order info card */}
            {order && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mt-8 bg-white rounded-3xl border border-[#E5DDD0]/60 shadow-sm overflow-hidden text-left"
              >
                {/* Prep time banner */}
                <div className="bg-[#B54E32] px-6 py-4 flex items-center gap-3">
                  <Clock size={20} className="text-white/80" aria-hidden="true" />
                  <div>
                    <p className="font-body text-xs text-white/70">Estimated time</p>
                    <p className="font-body font-semibold text-white text-sm">
                      {order.orderType === "pickup"
                        ? `Ready in ${prepTime} minutes — ${PICKUP_LABELS[order.pickupTime]}`
                        : `Delivery in ~${prepTime} minutes`}
                    </p>
                  </div>
                </div>

                <div className="px-6 py-5 space-y-4">
                  {/* Items summary */}
                  <div>
                    <p className="font-body text-xs font-semibold tracking-[0.15em] uppercase text-[#B54E32] mb-3">
                      Your Order
                    </p>
                    <ul className="space-y-2" role="list">
                      {order.items.map((item) => (
                        <li key={item.cartId} className="flex justify-between font-body text-sm">
                          <span className="text-[#2F2F2F]">
                            {item.quantity}× {item.name}
                          </span>
                          <span className="text-[#D96C2F] font-medium">
                            {formatPriceShort(
                              (item.basePrice +
                                item.extras.reduce((s, e) => s + e.price * e.quantity, 0)) *
                                item.quantity
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Total */}
                  <div className="border-t border-[#E5DDD0] pt-3 flex justify-between">
                    <span className="font-body font-semibold text-[#2F2F2F]">Total Paid</span>
                    <span className="font-heading text-xl font-semibold text-[#B54E32]">
                      {formatPriceShort(order.total)}
                    </span>
                  </div>

                  {/* Collection detail */}
                  <div className="rounded-xl bg-[#F2ECE3] px-4 py-3">
                    <p className="font-body text-xs font-semibold text-[#2F2F2F] mb-1">
                      {order.orderType === "pickup" ? "Pickup from" : "Delivering to"}
                    </p>
                    <p className="font-body text-sm text-[#6B6355]">
                      {order.orderType === "pickup"
                        ? settings.address
                        : `${order.deliveryAddress?.street}, ${order.deliveryAddress?.suburb} ${order.deliveryAddress?.postcode}`}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.45 }}
              className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
            >
              {/* WhatsApp */}
              {order && (
                <button
                  onClick={() => openWhatsApp(order)}
                  className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#25D366] text-white font-body font-semibold text-sm hover:bg-[#1da851] transition-colors shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
                  aria-label="Send order via WhatsApp"
                >
                  <MessageCircle size={16} aria-hidden="true" />
                  Confirm on WhatsApp
                </button>
              )}

              {/* Call */}
              <a
                href={`tel:${settings.phone}`}
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full border border-[#B54E32] text-[#B54E32] font-body font-semibold text-sm hover:bg-[#B54E32]/8 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B54E32]"
              >
                <Phone size={15} aria-hidden="true" />
                Call Restaurant
              </a>
            </motion.div>

            {/* Secondary links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.4 }}
              className="mt-6 flex items-center justify-center gap-6"
            >
              <Link
                href="/"
                className="flex items-center gap-1.5 font-body text-sm text-[#6B6355] hover:text-[#B54E32] transition-colors cursor-pointer"
              >
                <Home size={14} aria-hidden="true" /> Return Home
              </Link>
              <Link
                href="/menu"
                className="flex items-center gap-1.5 font-body text-sm text-[#6B6355] hover:text-[#B54E32] transition-colors cursor-pointer"
              >
                <RotateCcw size={14} aria-hidden="true" /> Order Again
              </Link>
            </motion.div>
          </div>
        </Container>
      </main>
    </>
  );
}
