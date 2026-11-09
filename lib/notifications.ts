import { Resend } from "resend";

export type InquiryNotificationPayload = {
  name: string;
  email: string;
  company?: string | null;
  projectType: string;
  budgetRange: string;
  timeline: string;
  description: string;
};

const TARGET_EMAIL = process.env.NOTIFICATION_EMAIL || "siddusidharth613@gmail.com";
const TARGET_PHONE = "+919390291870";

export async function sendInquiryNotification(inquiry: InquiryNotificationPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;

  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: process.env.NOTIFICATION_FROM_EMAIL || "FRAME Studio <onboarding@resend.dev>",
        to: TARGET_EMAIL,
        replyTo: inquiry.email,
        subject: `⚡ New Project Inquiry: ${inquiry.name} — ${inquiry.projectType}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0a; color: #f5f5f0; padding: 32px; border-radius: 8px; max-width: 600px; margin: 0 auto; border: 1px solid #222;">
            <div style="border-bottom: 2px solid #c8ff00; padding-bottom: 16px; margin-bottom: 24px;">
              <span style="color: #c8ff00; font-size: 11px; font-weight: bold; letter-spacing: 1.5px; text-transform: uppercase;">// INCOMING TRANSMISSION</span>
              <h2 style="color: #ffffff; margin: 8px 0 0 0; font-size: 24px; text-transform: uppercase;">New Client Inquiry</h2>
            </div>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
              <tr>
                <td style="padding: 10px 0; color: #888; width: 140px; border-bottom: 1px solid #1a1a1a;">Client Name:</td>
                <td style="padding: 10px 0; color: #fff; font-weight: bold; border-bottom: 1px solid #1a1a1a;">${escapeHtml(inquiry.name)}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #888; border-bottom: 1px solid #1a1a1a;">Email:</td>
                <td style="padding: 10px 0; color: #c8ff00; border-bottom: 1px solid #1a1a1a;">
                  <a href="mailto:${escapeHtml(inquiry.email)}" style="color: #c8ff00; text-decoration: none;">${escapeHtml(inquiry.email)}</a>
                </td>
              </tr>
              ${
                inquiry.company
                  ? `<tr>
                      <td style="padding: 10px 0; color: #888; border-bottom: 1px solid #1a1a1a;">Company:</td>
                      <td style="padding: 10px 0; color: #fff; border-bottom: 1px solid #1a1a1a;">${escapeHtml(inquiry.company)}</td>
                    </tr>`
                  : ""
              }
              <tr>
                <td style="padding: 10px 0; color: #888; border-bottom: 1px solid #1a1a1a;">Project Type:</td>
                <td style="padding: 10px 0; color: #fff; border-bottom: 1px solid #1a1a1a;">${escapeHtml(inquiry.projectType)}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #888; border-bottom: 1px solid #1a1a1a;">Budget Range:</td>
                <td style="padding: 10px 0; color: #c8ff00; font-weight: bold; border-bottom: 1px solid #1a1a1a;">${escapeHtml(inquiry.budgetRange)}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #888; border-bottom: 1px solid #1a1a1a;">Timeline:</td>
                <td style="padding: 10px 0; color: #fff; border-bottom: 1px solid #1a1a1a;">${escapeHtml(inquiry.timeline)}</td>
              </tr>
            </table>

            <div style="background: #111; padding: 16px; border-radius: 4px; border-left: 3px solid #c8ff00; margin-bottom: 24px;">
              <p style="color: #888; margin: 0 0 8px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Project Brief / Message:</p>
              <p style="color: #eee; margin: 0; line-height: 1.6; white-space: pre-wrap; font-size: 14px;">${escapeHtml(inquiry.description)}</p>
            </div>

            <div style="font-size: 11px; color: #555; text-align: center; border-top: 1px solid #1a1a1a; padding-top: 16px;">
              FRAME Studio • Routed to ${TARGET_EMAIL} • Phone: ${TARGET_PHONE}
            </div>
          </div>
        `,
      });
      console.log(`[Notification] Successfully dispatched inquiry email to ${TARGET_EMAIL}`);
    } catch (err) {
      console.error("[Notification] Failed to send email via Resend:", err);
    }
  } else {
    console.log(
      `[Notification] RESEND_API_KEY not configured. To receive emails at ${TARGET_EMAIL}, add RESEND_API_KEY to your environment variables.`,
    );
  }

  // Webhook support (Discord / Slack / Telegram)
  const webhookUrl = process.env.NOTIFICATION_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `⚡ **New Inquiry from ${inquiry.name}**\n**Email:** ${inquiry.email}\n**Project:** ${inquiry.projectType}\n**Budget:** ${inquiry.budgetRange}\n**Timeline:** ${inquiry.timeline}\n**Brief:** ${inquiry.description.slice(0, 300)}...`,
        }),
      });
    } catch (webhookErr) {
      console.error("[Notification] Webhook dispatch error:", webhookErr);
    }
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
