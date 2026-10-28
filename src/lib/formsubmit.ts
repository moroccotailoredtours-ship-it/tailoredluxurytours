import type { EnquiryInput } from "./enquiry";

const labels: [keyof EnquiryInput, string][] = [
  ["country", "Country"],
  ["dates", "Travel dates"],
  ["travelers", "Travellers"],
  ["destinations", "Destinations"],
  ["interests", "Interests"],
  ["budget", "Budget"],
  ["message", "Message"],
];

/**
 * Sends an enquiry to the business inbox through FormSubmit (https://formsubmit.co).
 * Runs in the visitor's browser, because FormSubmit rejects requests that come from cloud servers.
 * Resolves true only when FormSubmit confirms the message was accepted.
 */
export async function sendEnquiry(to: string, e: EnquiryInput): Promise<boolean> {
  // "name" and "email" are lower-case on purpose: FormSubmit uses "email" as the reply-to address.
  const fields: Record<string, string> = { name: e.name, email: e.email };
  for (const [key, label] of labels) if (e[key]) fields[label] = String(e[key]);

  try {
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        ...fields,
        _subject: `New enquiry from ${e.name.replace(/[\r\n]+/g, " ")}`,
        _template: "table",
        _captcha: "false",
        _honey: "",
      }),
    });
    const result = (await res.json().catch(() => null)) as { success?: unknown } | null;
    return res.ok && (result?.success === true || result?.success === "true");
  } catch {
    return false;
  }
}
