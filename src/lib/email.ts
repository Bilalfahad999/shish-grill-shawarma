import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const FROM = process.env.EMAIL_FROM ?? "Shish Shawarma & Grill <onboarding@resend.dev>";

interface EmailAttachment {
  filename: string;
  content: Buffer;
}

interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
  attachments?: EmailAttachment[];
}

export async function sendEmail({ to, subject, html, attachments }: SendEmailInput): Promise<{ success: boolean; error?: string }> {
  if (!resend) {
    console.info(`[email:dev] Would send "${subject}" to ${to}${attachments?.length ? ` with ${attachments.length} attachment(s)` : ""} (RESEND_API_KEY not configured)`);
    return { success: true };
  }

  try {
    await resend.emails.send({ from: FROM, to, subject, html, attachments });
    return { success: true };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}
