import type { Coupon } from "@/types/order";
import { RESTAURANT_CONFIG } from "@/config/restaurant";

export type CouponResult =
  | { valid: true; coupon: Coupon }
  | { valid: false; error: string };

export function validateCoupon(code: string, subtotal: number): CouponResult {
  const found = RESTAURANT_CONFIG.coupons.find(
    (c) => c.code.toUpperCase() === code.trim().toUpperCase()
  );
  if (!found) return { valid: false, error: "Invalid promo code. Please check and try again." };
  if (found.type === "fixed" && subtotal < RESTAURANT_CONFIG.minDeliveryOrder) {
    return {
      valid: false,
      error: `This code requires a minimum order of $${RESTAURANT_CONFIG.minDeliveryOrder}.`,
    };
  }
  return { valid: true, coupon: found as Coupon };
}

export function calcDiscount(coupon: Coupon | null, subtotal: number): number {
  if (!coupon) return 0;
  if (coupon.type === "percentage") {
    return Math.round((subtotal * coupon.value) / 100 * 100) / 100;
  }
  if (coupon.type === "fixed") {
    return Math.min(coupon.value, subtotal);
  }
  return 0;
}
