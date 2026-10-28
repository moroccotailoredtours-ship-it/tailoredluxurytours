import type { EnquiryInput } from "./enquiry";
import { site } from "./site";

/** Enquiries are delivered by FormSubmit (https://formsubmit.co) to the business inbox, called from the server so the address never reaches the browser. */
export function emailConfig() {
  const to = site.contactEmail;
  return to ? { to } : null;
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

/** Sends the enquiry to the business inbox via FormSubmit. Throws unless FormSubmit confirms success, so callers never report false success. */
export async function sendEnquiryEmail(e: EnquiryInput): Promise<void> {
  const cfg = emailConfig();
  if (!cfg) throw new Error("Email is not configured");

  // "name" and "email" are lower-case on purpose: FormSubmit uses "email" as the reply-to address.
  const fields = { name: e.name, email: e.email, ...Object.fromEntries(rows(e).filter(([k, v]) => v && k !== "Name" && k !== "Email")) };
  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(cfg.to)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json", Origin: site.url, Referer: `${site.url}/contact` },
    body: JSON.stringify({
      ...fields,
      _subject: `New enquiry from ${e.name.replace(/[\r\n]+/g, " ")}`,
      _template: "table",
      _captcha: "false",
    }),
    signal: AbortSignal.timeout(10_000),
  });

  const result = (await res.json().catch(() => null)) as { success?: unknown } | null;
  const ok = res.ok && (result?.success === true || result?.success === "true");
  if (!ok) {
    // Log status only server-side; never leak provider details or PII to the visitor.
    console.error(`[enquiry] email provider responded ${res.status}`);
    throw new Error(`Email provider error ${res.status}`);
  }
}
