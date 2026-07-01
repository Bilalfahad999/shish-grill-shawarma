import { NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail } from "@/lib/email";
import { customerOrderConfirmationEmail, restaurantOrderNotificationEmail } from "@/lib/email-templates/order";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { RESTAURANT_CONFIG } from "@/config/restaurant";
import type { Order } from "@/types/order";

const cartExtraSchema = z.object({
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
});

const cartItemSchema = z.object({
  cartId: z.string(),
  menuItemId: z.string(),
  name: z.string(),
  basePrice: z.number(),
  quantity: z.number().min(1),
  extras: z.array(cartExtraSchema),
  notes: z.string(),
  image: z.string(),
  category: z.string(),
});

const orderSchema = z.object({
  id: z.string(),
  items: z.array(cartItemSchema).min(1),
  customer: z.object({
    name: z.string().min(2),
    phone: z.string().min(8),
    email: z.string().email().or(z.literal("")),
  }),
  orderType: z.enum(["pickup", "delivery"]),
  pickupTime: z.enum(["asap", "15", "30", "45", "60"]),
  deliveryAddress: z
    .object({ street: z.string(), suburb: z.string(), postcode: z.string(), notes: z.string() })
    .optional(),
  paymentMethod: z.enum(["card", "apple_pay", "google_pay", "cash"]),
  subtotal: z.number(),
  deliveryFee: z.number(),
  discount: z.number(),
  total: z.number(),
  coupon: z.object({ code: z.string(), type: z.string(), value: z.number(), description: z.string() }).optional(),
  status: z.string(),
  createdAt: z.string(),
});

export async function POST(request: Request) {
  const ip = getClientIp(request.headers);
  const { allowed } = rateLimit(`orders:${ip}`, 10, 60_000);
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = orderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid order data", details: parsed.error.issues }, { status: 400 });
  }

  const order = parsed.data as Order;

  // TODO Prisma: persist order, customer, order items to database here

  const emailTasks: Promise<unknown>[] = [];

  if (order.customer.email) {
    const customerMail = customerOrderConfirmationEmail(order);
    emailTasks.push(sendEmail({ to: order.customer.email, subject: customerMail.subject, html: customerMail.html }));
  }

  const restaurantMail = restaurantOrderNotificationEmail(order);
  emailTasks.push(sendEmail({ to: RESTAURANT_CONFIG.email, subject: restaurantMail.subject, html: restaurantMail.html }));

  await Promise.allSettled(emailTasks);

  return NextResponse.json({ success: true, orderId: order.id });
}
