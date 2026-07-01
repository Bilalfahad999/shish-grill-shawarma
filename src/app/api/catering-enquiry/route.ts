import { NextResponse } from "next/server";
import { z } from "zod";
import { renderToBuffer } from "@react-pdf/renderer";
import { sendEmail } from "@/lib/email";
import { customerCateringConfirmationEmail, restaurantCateringNotificationEmail } from "@/lib/email-templates/catering";
import { CateringSummaryDocument } from "@/lib/pdf/CateringSummaryDocument";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { RESTAURANT_CONFIG } from "@/config/restaurant";

const enquirySchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  email: z.string().email(),
  eventType: z.string().min(2),
  guestCount: z.string().min(1),
  date: z.string().min(1),
  time: z.string().min(1),
  collectionType: z.enum(["pickup", "delivery"]),
  venueAddress: z.string().optional(),
  budget: z.string().optional(),
  specialRequests: z.string().optional(),
});

export async function POST(request: Request) {
  const ip = getClientIp(request.headers);
  const { allowed } = rateLimit(`catering:${ip}`, 5, 60_000);
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid enquiry data", details: parsed.error.issues }, { status: 400 });
  }

  const enquiry = parsed.data;

  // TODO Prisma: persist catering enquiry to database here (CateringRequest model)

  const customerMail = customerCateringConfirmationEmail(enquiry);
  const restaurantMail = restaurantCateringNotificationEmail(enquiry);

  const pdfBuffer = await renderToBuffer(CateringSummaryDocument({ enquiry }));
  const attachments = [{ filename: "catering-enquiry-summary.pdf", content: Buffer.from(pdfBuffer) }];

  await Promise.allSettled([
    sendEmail({ to: enquiry.email, subject: customerMail.subject, html: customerMail.html, attachments }),
    sendEmail({ to: RESTAURANT_CONFIG.email, subject: restaurantMail.subject, html: restaurantMail.html, attachments }),
  ]);

  return NextResponse.json({ success: true });
}
