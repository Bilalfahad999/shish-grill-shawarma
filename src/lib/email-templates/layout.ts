import { RESTAURANT_CONFIG } from "@/config/restaurant";

export function emailLayout(opts: {
  preheader?: string;
  heading: string;
  subheading?: string;
  bodyHtml: string;
  accent?: string;
}): string {
  const { preheader = "", heading, subheading, bodyHtml, accent = "#B54E32" } = opts;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${heading}</title>
</head>
<body style="margin:0;padding:0;background-color:#FAF7F2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <span style="display:none;font-size:1px;color:#FAF7F2;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${preheader}</span>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#FAF7F2;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #E5DDD0;">

          <!-- Header -->
          <tr>
            <td style="background-color:${accent};padding:32px 32px 28px;text-align:center;">
              <div style="width:48px;height:48px;border-radius:50%;background-color:rgba(255,255,255,0.18);display:inline-block;line-height:48px;text-align:center;margin-bottom:12px;">
                <span style="font-size:22px;">🍢</span>
              </div>
              <p style="margin:0;color:#ffffff;font-size:20px;font-weight:700;letter-spacing:0.3px;">${RESTAURANT_CONFIG.name}</p>
              <p style="margin:4px 0 0;color:rgba(255,255,255,0.85);font-size:11px;text-transform:uppercase;letter-spacing:1.5px;">100% Halal · Melbourne</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 32px 8px;">
              <h1 style="margin:0 0 6px;color:#2F2F2F;font-size:22px;font-weight:600;">${heading}</h1>
              ${subheading ? `<p style="margin:0 0 24px;color:#6B6355;font-size:14px;line-height:1.6;">${subheading}</p>` : `<div style="height:18px;"></div>`}
              ${bodyHtml}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:28px 32px 32px;border-top:1px solid #F2ECE3;margin-top:24px;">
              <p style="margin:0 0 4px;color:#2F2F2F;font-size:13px;font-weight:600;">${RESTAURANT_CONFIG.name}</p>
              <p style="margin:0 0 2px;color:#6B6355;font-size:12px;">${RESTAURANT_CONFIG.address}</p>
              <p style="margin:0;color:#6B6355;font-size:12px;">${RESTAURANT_CONFIG.phone} · ${RESTAURANT_CONFIG.email}</p>
            </td>
          </tr>
        </table>
        <p style="margin:16px 0 0;color:#A39C8E;font-size:11px;">This is an automated message from ${RESTAURANT_CONFIG.name}.</p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function emailButton(label: string, href: string, accent = "#B54E32"): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:20px 0;">
    <tr><td style="border-radius:999px;background-color:${accent};">
      <a href="${href}" style="display:inline-block;padding:13px 28px;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;border-radius:999px;">${label}</a>
    </td></tr>
  </table>`;
}

export function emailDivider(): string {
  return `<div style="height:1px;background-color:#F2ECE3;margin:20px 0;"></div>`;
}

export function emailRow(label: string, value: string): string {
  return `<tr>
    <td style="padding:6px 0;color:#6B6355;font-size:13px;vertical-align:top;width:42%;">${label}</td>
    <td style="padding:6px 0;color:#2F2F2F;font-size:13px;font-weight:500;vertical-align:top;">${value}</td>
  </tr>`;
}
