"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { enquirySchema, fieldErrors, type EnquiryResult, type FieldErrors } from "@/lib/enquiry";
import { track } from "@/lib/analytics";
import { buttonClass } from "@/components/ui/Button";

type Status = "idle" | "submitting" | "success" | "error";

const input =
  "mt-2 block w-full rounded-none border border-ink/15 bg-ivory px-4 py-3.5 text-base text-ink placeholder:text-ink/45 transition focus:border-gold focus:bg-white focus:outline-none focus:ring-4 focus:ring-gold-bright/25 aria-[invalid=true]:border-red-700";

function Field({ id, label, optional, error, children }: { id: string; label: string; optional?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold">
        {label} {optional && <span className="font-normal text-ink-soft">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-800">
          {error}
        </p>
      )}
    </div>
  );
}

export function EnquiryForm({ defaultMessage = "", source }: { defaultMessage?: string; source?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [banner, setBanner] = useState("");
  const [startedAt] = useState(() => Date.now());
  const inFlight = useRef(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inFlight.current) return; // duplicate-submission guard
    const fd = new FormData(e.currentTarget);
    const raw = Object.fromEntries(fd.entries());
    const payload = { ...raw, consent: fd.get("consent") === "on", startedAt };

    const parsed = enquirySchema.safeParse(payload);
    if (!parsed.success) {
      const errs = fieldErrors(parsed.error);
      setErrors(errs);
      setStatus("error");
      setBanner("Please check the highlighted fields and try again.");
      const first = Object.keys(errs)[0];
      if (first) (e.currentTarget.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }

    inFlight.current = true;
    setErrors({});
    setBanner("");
    setStatus("submitting");
    try {
      const res = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed.data) });
      const result = (await res.json()) as EnquiryResult;
      if (res.ok && result.ok) {
        track("enquiry_submit", source ? { source } : undefined);
        setStatus("success");
        return;
      }
      if (!result.ok && result.code === "validation") {
        setErrors(result.errors);
        setBanner("Please check the highlighted fields and try again.");
      } else {
        setBanner(!result.ok && "message" in result ? result.message : "Something went wrong. Please try again.");
      }
      setStatus("error");
    } catch {
      setBanner("We couldn't reach the server. Please check your connection and try again.");
      setStatus("error");
    } finally {
      inFlight.current = false;
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="widget p-8">
        <h2 className="text-3xl">Thank you. Your enquiry has been sent.</h2>
        <p className="mt-4 text-ink-soft">
          We&rsquo;ll read it carefully and reply by email to start shaping your journey. Sending this form doesn&rsquo;t confirm or reserve a trip. That only happens after you&rsquo;ve reviewed a tailored proposal.
        </p>
      </div>
    );
  }

  const err = (k: keyof FieldErrors) => ({
    "aria-invalid": errors[k] ? (true as const) : undefined,
    "aria-describedby": errors[k] ? `${String(k)}-error` : undefined,
  });

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5" aria-describedby="form-status">
      <div id="form-status" role={status === "error" ? "alert" : undefined} className={banner ? "rounded-none border border-red-700/40 bg-red-50 p-4 text-sm text-red-900" : "sr-only"}>
        {banner}
      </div>

      <fieldset className="widget grid gap-5 p-5 sm:grid-cols-2 sm:p-8">
        <legend className="sr-only">About you</legend>
        <p className="eyebrow text-gold sm:col-span-2"><span className="num mr-2 inline-flex size-6 items-center justify-center rounded-full bg-gold text-white">1</span>About you</p>
        <Field id="name" label="Full name" error={errors.name}>
          <input id="name" name="name" autoComplete="name" required className={input} {...err("name")} />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          <input id="email" name="email" type="email" autoComplete="email" required className={input} {...err("email")} />
        </Field>
        <Field id="country" label="Country of residence" optional>
          <input id="country" name="country" autoComplete="country-name" className={input} />
        </Field>
        <Field id="travelers" label="Number of travellers" optional>
          <input id="travelers" name="travelers" placeholder="e.g. 2 adults" className={input} />
        </Field>
      </fieldset>

      <fieldset className="widget grid gap-5 p-5 sm:grid-cols-2 sm:p-8">
        <legend className="sr-only">Your trip</legend>
        <p className="eyebrow text-gold sm:col-span-2"><span className="num mr-2 inline-flex size-6 items-center justify-center rounded-full bg-gold text-white">2</span>Your trip</p>
        <Field id="dates" label="Approximate travel dates" optional>
          <input id="dates" name="dates" placeholder="e.g. April 2027, flexible" className={input} />
        </Field>
        <Field id="budget" label="Estimated budget" optional>
          <input id="budget" name="budget" placeholder="If you have one in mind" className={input} />
        </Field>
        <div className="sm:col-span-2">
          <Field id="destinations" label="Places you'd like to visit" optional>
            <input id="destinations" name="destinations" placeholder="e.g. Marrakech, the Sahara, Fez" className={input} />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field id="interests" label="Interests and experiences" optional>
            <input id="interests" name="interests" placeholder="e.g. architecture, food, walking, photography" className={input} />
          </Field>
        </div>
      </fieldset>

      <div className="widget p-5 sm:p-8">
        <p className="eyebrow mb-1 text-gold"><span className="num mr-2 inline-flex size-6 items-center justify-center rounded-full bg-gold text-white">3</span>In your words</p>
        <Field id="message" label="Anything else we should know?" optional>
          <textarea id="message" name="message" rows={5} defaultValue={defaultMessage} className={`${input} resize-y`} />
        </Field>
      </div>

      {/* Honeypot: hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm text-ink-soft">
          <input type="checkbox" name="consent" className="mt-1 size-5 accent-gold" {...err("consent")} />
          <span>
            I&rsquo;m happy for Tailored Luxury Tours to use these details to reply to my enquiry. See the{" "}
            <Link href="/privacy" className="underline underline-offset-4">privacy policy</Link>.
          </span>
        </label>
        {errors.consent && <p id="consent-error" className="mt-2 text-sm text-red-800">{errors.consent}</p>}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" disabled={status === "submitting"} className={buttonClass("primary", "disabled:cursor-wait disabled:opacity-70")}>
          {status === "submitting" ? "Sending…" : "Send my enquiry"}
        </button>
        <p className="text-sm text-ink-soft">Required fields: name, email and consent. This doesn&rsquo;t confirm a booking.</p>
      </div>
    </form>
  );
}
