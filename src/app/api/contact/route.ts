import { NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail } from "@/lib/email";
import { customerContactConfirmationEmail, restaurantContactNotificationEmail } from "@/lib/email-templates/contact";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { RESTAURANT_CONFIG } from "@/config/restaurant";

const contactSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  email: z.string().email(),
  subject: z.string().min(3),
  message: z.string().min(10).max(2000),
  // Honeypot field — real users never fill this in; bots usually do
  website: z.string().max(0).optional(),
});

export async function POST(request: Request) {
  const ip = getClientIp(request.headers);
  const { allowed } = rateLimit(`contact:${ip}`, 5, 60_000);
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid form data", details: parsed.error.issues }, { status: 400 });
  }

  // Honeypot tripped — silently succeed without sending anything
  if (parsed.data.website) {
    return NextResponse.json({ success: true });
  }

  const { name, phone, email, subject, message } = parsed.data;

  // TODO Prisma: persist contact enquiry to database here
  // TODO reCAPTCHA: verify request.body.recaptchaToken against Google's siteverify endpoint
  //   when NEXT_PUBLIC_RECAPTCHA_SITE_KEY / RECAPTCHA_SECRET_KEY are configured

  const customerMail = customerContactConfirmationEmail({ name, phone, email, subject, message });
  const restaurantMail = restaurantContactNotificationEmail({ name, phone, email, subject, message });

  await Promise.allSettled([
    sendEmail({ to: email, subject: customerMail.subject, html: customerMail.html }),
    sendEmail({ to: RESTAURANT_CONFIG.email, subject: restaurantMail.subject, html: restaurantMail.html }),
  ]);

  return NextResponse.json({ success: true });
}
