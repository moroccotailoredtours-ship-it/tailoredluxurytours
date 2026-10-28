import { NextResponse } from "next/server";
import { enquirySchema, fieldErrors, type EnquiryResult } from "@/lib/enquiry";
import { emailConfig, sendEnquiryEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const reply = (body: EnquiryResult, status = 200) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(req: Request) {
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return reply({ ok: false, code: "bad_request", message: "Request not allowed." }, 403);
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!rateLimit(`enquiry:${ip}`)) {
    return reply({ ok: false, code: "rate_limited", message: "Too many enquiries from this connection. Please try again shortly." }, 429);
  }

  let json: unknown;
  try {
    if (Number(req.headers.get("content-length") ?? 0) > 20_000) throw new Error("too large");
    json = await req.json();
  } catch {
    return reply({ ok: false, code: "bad_request", message: "We couldn't read that submission." }, 400);
  }

  const parsed = enquirySchema.safeParse(json);
  if (!parsed.success) return reply({ ok: false, code: "validation", errors: fieldErrors(parsed.error) }, 422);
  const data = parsed.data;

  // Spam traps: a filled honeypot, or a submission faster than a human could complete the form.
  // Pretend success so bots learn nothing, but deliver nothing.
  const tooFast = data.startedAt !== undefined && Date.now() - data.startedAt < 2500;
  if (data.website || tooFast) return reply({ ok: true });

  if (!emailConfig()) {
    console.error("[enquiry] Email delivery is not configured (CONTACT_EMAIL, EMAIL_FROM, EMAIL_API_KEY).");
    return reply(
      { ok: false, code: "not_configured", message: "Our enquiry form isn't fully set up yet. Please contact us by email or WhatsApp instead." },
      503,
    );
  }

  try {
    await sendEnquiryEmail(data);
    return reply({ ok: true });
  } catch {
    return reply(
      { ok: false, code: "delivery_failed", message: "We couldn't send your enquiry just now. Please try again in a moment, or contact us directly." },
      502,
    );
  }
}
