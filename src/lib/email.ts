import type { EnquiryInput } from "./enquiry";
import { site } from "./site";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function emailConfig() {
  const apiKey = process.env.EMAIL_API_KEY?.trim();
  const from = process.env.EMAIL_FROM?.trim();
  const to = site.contactEmail;
  return apiKey && from && to ? { apiKey, from, to } : null;
}

const rows = (e: EnquiryInput): [string, string][] => [
  ["Name", e.name],
  ["Email", e.email],
  ["Country", e.country],
  ["Travel dates", e.dates],
  ["Travellers", e.travelers],
  ["Destinations", e.destinations],
  ["Interests", e.interests],
  ["Budget", e.budget],
  ["Message", e.message],
];

/** Sends the enquiry to the business inbox via Resend. Throws on any non-2xx so callers never report false success. */
export async function sendEnquiryEmail(e: EnquiryInput): Promise<void> {
  const cfg = emailConfig();
  if (!cfg) throw new Error("Email is not configured");

  const filled = rows(e).filter(([, v]) => v);
  const html = `<h2>New Morocco trip enquiry</h2><table cellpadding="6">${filled
    .map(([k, v]) => `<tr><td><strong>${esc(k)}</strong></td><td>${esc(v).replace(/\n/g, "<br>")}</td></tr>`)
    .join("")}</table>`;
  const text = filled.map(([k, v]) => `${k}: ${v}`).join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${cfg.apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: cfg.from,
      to: [cfg.to],
      reply_to: e.email,
      subject: `New enquiry from ${e.name.replace(/[\r\n]+/g, " ")}`,
      html,
      text,
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!res.ok) {
    // Log status only server-side; never leak provider details or PII to the visitor.
    console.error(`[enquiry] email provider responded ${res.status}`);
    throw new Error(`Email provider error ${res.status}`);
  }
}
