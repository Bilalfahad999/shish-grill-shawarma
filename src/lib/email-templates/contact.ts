import { emailLayout, emailDivider, emailRow } from "./layout";

export interface ContactEnquiry {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

export function customerContactConfirmationEmail(c: ContactEnquiry): { subject: string; html: string } {
  const body = `
    <p style="margin:0 0 8px;color:#2F2F2F;font-size:14px;line-height:1.6;">Hi ${c.name},</p>
    <p style="margin:0;color:#2F2F2F;font-size:14px;line-height:1.6;">Thanks for reaching out! We've received your message and will get back to you as soon as possible.</p>
    ${emailDivider()}
    <p style="margin:0 0 4px;color:#6B6355;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;">Your Message</p>
    <p style="margin:0 0 12px;color:#2F2F2F;font-size:13px;font-weight:600;">${c.subject}</p>
    <p style="margin:0;color:#2F2F2F;font-size:13px;line-height:1.6;white-space:pre-wrap;">${c.message}</p>
  `;

  return {
    subject: "We've Received Your Message",
    html: emailLayout({
      heading: "Message received!",
      subheading: "We'll be in touch shortly.",
      bodyHtml: body,
      preheader: `Your message "${c.subject}" was received`,
    }),
  };
}

export function restaurantContactNotificationEmail(c: ContactEnquiry): { subject: string; html: string } {
  const body = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${emailRow("Name", c.name)}
      ${emailRow("Phone", c.phone)}
      ${emailRow("Email", c.email)}
      ${emailRow("Subject", c.subject)}
    </table>
    ${emailDivider()}
    <p style="margin:0 0 4px;color:#6B6355;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;">Message</p>
    <p style="margin:0;color:#2F2F2F;font-size:13px;line-height:1.6;white-space:pre-wrap;">${c.message}</p>
  `;

  return {
    subject: `📩 New Contact Form: ${c.subject}`,
    html: emailLayout({
      heading: "New contact message",
      subheading: `From ${c.name}`,
      bodyHtml: body,
      preheader: `New contact form submission from ${c.name}`,
    }),
  };
}
