"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Package, Truck, Lock } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { CustomerForm } from "@/components/order/CustomerForm";
import { PickupForm } from "@/components/order/PickupForm";
import { DeliveryForm } from "@/components/order/DeliveryForm";
import { PaymentMethods } from "@/components/order/PaymentMethods";
import { OrderReview } from "@/components/order/OrderReview";
import { OrderSummary } from "@/components/order/OrderSummary";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/UserContext";
import { formatPriceShort } from "@/lib/price";
import { RESTAURANT_CONFIG } from "@/config/restaurant";
import type { Order } from "@/types/order";

// ── Zod schema ───────────────────────────────────────────────────────────────

const schema = z
  .object({
    name: z.string().min(2, "Please enter your full name"),
    phone: z
      .string()
      .min(8, "Please enter a valid phone number")
      .regex(/^[0-9 +()-]+$/, "Invalid phone number"),
    email: z.string().email("Invalid email address").or(z.literal("")),
    orderType: z.enum(["pickup", "delivery"]),
    pickupTime: z.string().optional(),
    deliveryStreet: z.string().optional(),
    deliverySuburb: z.string().optional(),
    deliveryPostcode: z
      .string()
      .regex(/^\d{4}$/, "Postcode must be 4 digits")
      .or(z.literal(""))
      .optional(),
    deliveryNotes: z.string().optional(),
    paymentMethod: z.enum(["card", "apple_pay", "google_pay", "cash"]),
  })
  .superRefine((data, ctx) => {
    if (data.orderType === "pickup" && !data.pickupTime) {
      ctx.addIssue({ code: "custom", path: ["pickupTime"], message: "Please select a pickup time" });
    }
    if (data.orderType === "delivery") {
      if (!data.deliveryStreet) ctx.addIssue({ code: "custom", path: ["deliveryStreet"], message: "Street address is required" });
      if (!data.deliverySuburb) ctx.addIssue({ code: "custom", path: ["deliverySuburb"], message: "Suburb is required" });
      if (!data.deliveryPostcode) ctx.addIssue({ code: "custom", path: ["deliveryPostcode"], message: "Postcode is required" });
    }
  });

export type CheckoutFormValues = z.infer<typeof schema>;

// ── Steps ────────────────────────────────────────────────────────────────────

const STEPS = [
  { id: 0, label: "Details", short: "You" },
  { id: 1, label: "Collection", short: "How" },
  { id: 2, label: "Payment", short: "Pay" },
  { id: 3, label: "Review", short: "Review" },
];

// ── Component ────────────────────────────────────────────────────────────────

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, discount, deliveryFee, total, clearCart, setIsDelivery } = useCart();
  const { profile } = useUser();
  const [step, setStep] = useState(0);
  const [placing, setPlacing] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);

  const methods = useForm<CheckoutFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      orderType: "pickup",
      pickupTime: "asap",
      paymentMethod: "card",
      // Pre-fill from saved profile when available
      name: profile?.name ?? "",
      phone: profile?.phone ?? "",
      email: profile?.email ?? "",
      deliveryStreet: profile?.address?.street ?? "",
      deliverySuburb: profile?.address?.suburb ?? "",
      deliveryPostcode: profile?.address?.postcode ?? "",
      deliveryNotes: "",
    },
    mode: "onTouched",
  });

  const { watch, trigger, handleSubmit, getValues } = methods;
  const orderType = watch("orderType");

  // Keep cart delivery state in sync
  const handleOrderTypeChange = useCallback(
    (v: "pickup" | "delivery") => {
      setIsDelivery(v === "delivery");
      methods.setValue("orderType", v);
    },
    [setIsDelivery, methods]
  );

  // Step validation fields
  const STEP_FIELDS: (keyof CheckoutFormValues)[][] = [
    ["name", "phone", "email"],
    ["orderType", "pickupTime", "deliveryStreet", "deliverySuburb", "deliveryPostcode"],
    ["paymentMethod"],
    [],
  ];

  const goNext = async () => {
    const valid = await trigger(STEP_FIELDS[step] as (keyof CheckoutFormValues)[]);
    if (!valid) return;
    setDirection(1);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  const [orderError, setOrderError] = useState<string | null>(null);

  const onSubmit = async (data: CheckoutFormValues) => {
    setPlacing(true);
    setOrderError(null);

    const order: Order = {
      id: `SHG-${Date.now().toString(36).toUpperCase()}`,
      items,
      customer: { name: data.name, phone: data.phone, email: data.email ?? "" },
      orderType: data.orderType,
      pickupTime: (data.pickupTime ?? "asap") as Order["pickupTime"],
      deliveryAddress:
        data.orderType === "delivery"
          ? {
              street: data.deliveryStreet ?? "",
              suburb: data.deliverySuburb ?? "",
              postcode: data.deliveryPostcode ?? "",
              notes: data.deliveryNotes ?? "",
            }
          : undefined,
      paymentMethod: data.paymentMethod,
      subtotal,
      deliveryFee,
      discount,
      total,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
      if (!res.ok) throw new Error("Failed to place order");
    } catch {
      setOrderError("Something went wrong placing your order. Please try again or call us to order directly.");
      setPlacing(false);
      return;
    }

    // Persist order for success page, then clear cart
    try {
      sessionStorage.setItem("shish_last_order", JSON.stringify(order));
    } catch { /* ignore */ }

    clearCart();
    router.push("/order/success");
  };

  if (items.length === 0 && !placing && typeof window !== "undefined") {
    router.replace("/cart");
    return null;
  }

  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-[#FAF7F2] min-h-screen pt-24 pb-16">
        <Container narrow>
          {/* Back link */}
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 font-body text-sm text-[#6B6355] hover:text-[#B54E32] transition-colors mb-6"
          >
            <ArrowLeft size={15} /> Back to Cart
          </Link>

          <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">
            {/* Main checkout column */}
            <div>
              {/* Progress steps */}
              <div className="flex items-center gap-0 mb-8">
                {STEPS.map((s, i) => (
                  <div key={s.id} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-body text-xs font-semibold transition-all duration-300 ${
                          step > s.id
                            ? "bg-[#6E8B5C] text-white"
                            : step === s.id
                            ? "bg-[#B54E32] text-white shadow-md"
                            : "bg-[#E5DDD0] text-[#6B6355]"
                        }`}
                        aria-current={step === s.id ? "step" : undefined}
                      >
                        {step > s.id ? "✓" : s.id + 1}
                      </div>
                      <span
                        className={`mt-1.5 font-body text-[10px] font-medium whitespace-nowrap ${
                          step >= s.id ? "text-[#2F2F2F]" : "text-[#6B6355]/50"
                        }`}
                      >
                        {s.short}
                      </span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div
                        className={`flex-1 h-px mx-2 transition-colors duration-300 ${
                          step > i ? "bg-[#6E8B5C]" : "bg-[#E5DDD0]"
                        }`}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Form card */}
              <div className="bg-white rounded-3xl border border-[#E5DDD0]/60 shadow-sm overflow-hidden">
                {/* Card header */}
                <div className="px-7 py-5 border-b border-[#E5DDD0]">
                  <h1 className="font-heading text-2xl font-semibold text-[#2F2F2F]">
                    {STEPS[step].label}
                  </h1>
                  <p className="font-body text-xs text-[#6B6355] mt-0.5">
                    Step {step + 1} of {STEPS.length}
                  </p>
                </div>

                <FormProvider {...methods}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Animated step content */}
                    <div className="px-7 py-6 min-h-[300px]">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                          key={step}
                          initial={{ opacity: 0, x: direction * 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: direction * -30 }}
                          transition={{ duration: 0.22, ease: "easeInOut" }}
                        >
                          {step === 0 && (
                            <div className="space-y-5">
                              {profile && (
                                <div className="flex items-start gap-3 bg-[#F2ECE3] rounded-2xl p-4 border border-[#E5DDD0]">
                                  <div className="w-9 h-9 rounded-full bg-[#B54E32] flex items-center justify-center text-white font-body font-bold text-sm shrink-0">
                                    {profile.name?.charAt(0)?.toUpperCase() ?? "?"}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="font-body text-sm font-semibold text-[#2F2F2F]">Using your saved details</p>
                                    <p className="font-body text-xs text-[#6B6355] mt-0.5 truncate">{profile.name} · {profile.phone}</p>
                                    <p className="font-body text-xs text-[#6B6355]">Edit the fields below if anything has changed.</p>
                                  </div>
                                </div>
                              )}
                              <CustomerForm />
                            </div>
                          )}

                          {step === 1 && (
                            <div className="space-y-6">
                              {/* Order type toggle */}
                              <div>
                                <p className="font-body text-sm font-medium text-[#2F2F2F] mb-3">
                                  How would you like your order?
                                </p>
                                <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Order type">
                                  {(["pickup", "delivery"] as const).map((type) => (
                                    <button
                                      key={type}
                                      type="button"
                                      onClick={() => handleOrderTypeChange(type)}
                                      className={`flex flex-col items-center gap-2.5 py-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B54E32] ${
                                        orderType === type
                                          ? "border-[#B54E32] bg-[#B54E32]/6"
                                          : "border-[#E5DDD0] hover:border-[#B54E32]/40"
                                      }`}
                                      aria-pressed={orderType === type}
                                    >
                                      {type === "pickup" ? (
                                        <Package size={22} className={orderType === type ? "text-[#B54E32]" : "text-[#6B6355]"} />
                                      ) : (
                                        <Truck size={22} className={orderType === type ? "text-[#B54E32]" : "text-[#6B6355]"} />
                                      )}
                                      <span className={`font-body font-semibold text-sm ${orderType === type ? "text-[#B54E32]" : "text-[#2F2F2F]"}`}>
                                        {type === "pickup" ? "Pickup" : "Delivery"}
                                      </span>
                                      <span className={`font-body text-xs ${orderType === type ? "text-[#B54E32]/70" : "text-[#6B6355]"}`}>
                                        {type === "pickup" ? "Free · Ready in ~20 min" : `$${RESTAURANT_CONFIG.deliveryFee} · ~${RESTAURANT_CONFIG.deliveryTime} min`}
                                      </span>
                                    </button>
                                  ))}
                                </div>
                              </div>

                              {/* Conditional form */}
                              <AnimatePresence mode="wait">
                                <motion.div
                                  key={orderType}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  {orderType === "pickup" ? <PickupForm /> : <DeliveryForm />}
                                </motion.div>
                              </AnimatePresence>
                            </div>
                          )}

                          {step === 2 && <PaymentMethods />}

                          {step === 3 && (
                            <OrderReview values={getValues()} onEdit={setStep} />
                          )}
                        </motion.div>
                      </AnimatePresence>
                      {orderError && (
                        <div className="mt-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 font-body text-sm text-red-600" role="alert">
                          {orderError}
                        </div>
                      )}
                    </div>

                    {/* Navigation footer */}
                    <div className="px-7 py-5 border-t border-[#E5DDD0] flex items-center justify-between gap-4">
                      {step > 0 ? (
                        <button
                          type="button"
                          onClick={goBack}
                          className="flex items-center gap-2 font-body text-sm text-[#6B6355] hover:text-[#2F2F2F] transition-colors cursor-pointer"
                        >
                          <ArrowLeft size={15} /> Back
                        </button>
                      ) : (
                        <div />
                      )}

                      {step < STEPS.length - 1 ? (
                        <button
                          type="button"
                          onClick={goNext}
                          className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#D96C2F] text-white font-body font-semibold text-sm hover:bg-[#C45A20] transition-all duration-200 shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D96C2F]"
                        >
                          Continue <ArrowRight size={15} />
                        </button>
                      ) : (
                        <motion.button
                          type="submit"
                          disabled={placing}
                          whileTap={{ scale: 0.97 }}
                          className="flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#B54E32] text-white font-body font-bold text-sm hover:bg-[#D96C2F] transition-all duration-200 shadow-md cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B54E32]"
                        >
                          {placing ? (
                            <>
                              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                              </svg>
                              Placing Order…
                            </>
                          ) : (
                            <>
                              <Lock size={15} />
                              Place Order · {formatPriceShort(total)}
                            </>
                          )}
                        </motion.button>
                      )}
                    </div>
                  </form>
                </FormProvider>
              </div>
            </div>

            {/* Sidebar summary */}
            <div className="hidden lg:block sticky top-24">
              <OrderSummary showCoupon={false} compact cta={<></>} />
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
