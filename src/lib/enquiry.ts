import { z } from "zod";

const clean = (max: number) => z.string().trim().max(max);
const optional = (max: number) => clean(max).optional().default("");

export const enquirySchema = z.object({
  name: clean(120).min(2, "Please tell us your name."),
  email: clean(200).pipe(z.email("Please enter a valid email address.")),
  country: optional(80),
  dates: optional(120),
  travelers: optional(60),
  destinations: optional(300),
  interests: optional(500),
  budget: optional(120),
  message: optional(3000),
  consent: z.literal(true, { error: "Please confirm you're happy for us to use your details to reply." }),
  /** Honeypot: real visitors never see or fill this. */
  website: optional(200),
  /** Epoch ms when the form was rendered; used to reject instant bot submissions. */
  startedAt: z.coerce.number().optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export type FieldErrors = Partial<Record<keyof EnquiryInput, string>>;

export function fieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof EnquiryInput | undefined;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}

export type EnquiryResult =
  | { ok: true }
  | { ok: false; code: "validation"; errors: FieldErrors }
  | { ok: false; code: "rate_limited" | "not_configured" | "delivery_failed" | "bad_request"; message: string };
