"use client";

import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { CartItemRow } from "@/components/order/CartItem";
import { OrderSummary } from "@/components/order/OrderSummary";
import { EmptyCart } from "@/components/order/EmptyCart";
import { Container } from "@/components/ui/Container";

export default function CartPage() {
  const { items } = useCart();

  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-[#FAF7F2] min-h-screen pt-24 pb-16">
        <Container>
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 font-body text-sm text-[#6B6355] hover:text-[#B54E32] transition-colors mb-4 cursor-pointer"
            >
              <ArrowLeft size={15} aria-hidden="true" />
              Continue Shopping
            </Link>
            <div className="flex items-center gap-3">
              <ShoppingBag size={28} className="text-[#B54E32]" aria-hidden="true" />
              <h1 className="font-heading text-4xl sm:text-5xl font-light text-[#2F2F2F]">
                Your Cart
              </h1>
            </div>
          </div>

          {items.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
              {/* Cart items */}
              <div className="space-y-4">
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <CartItemRow key={item.cartId} item={item} />
                  ))}
                </AnimatePresence>

                {/* Continue shopping link */}
                <div className="pt-2">
                  <Link
                    href="/menu"
                    className="inline-flex items-center gap-2 font-body text-sm text-[#B54E32] hover:text-[#D96C2F] transition-colors cursor-pointer"
                  >
                    <ArrowLeft size={14} aria-hidden="true" />
                    Add more items
                  </Link>
                </div>
              </div>

              {/* Order summary — sticky sidebar */}
              <div className="lg:sticky lg:top-24">
                <OrderSummary showCoupon />
              </div>
            </div>
          )}
        </Container>
      </main>
      <Footer />
    </>
  );
}
