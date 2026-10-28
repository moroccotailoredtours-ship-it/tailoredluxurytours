/**
 * Central business + site configuration.
 * Anything marked `unconfirmed` must be supplied or verified by the business before launch.
 */
const PRODUCTION_URL = "https://tailoredluxurytours.com";

export const siteUrl = (process.env.SITE_URL?.replace(/\/$/, "") || PRODUCTION_URL) as string;

/** Only the production deployment on the canonical domain should be indexable. */
export const isIndexable =
  siteUrl === PRODUCTION_URL &&
  (process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : process.env.NODE_ENV === "production");

const digits = (v?: string) => (v ?? "").replace(/\D/g, "");

export const site = {
  name: "Tailored Luxury Tours",
  shortName: "TLT",
  tagline: "Private, tailor-made travel in Morocco",
  description:
    "Tailored Luxury Tours designs private, personalised journeys across Morocco, shaped around your interests, your pace and the experiences that matter most to you.",
  url: siteUrl,
  locale: "en",
  contactEmail: process.env.CONTACT_EMAIL?.trim() || "",
  whatsappNumber: digits(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER),
  whatsappMessage:
    "Hello, I’m interested in planning a tailor-made trip to Morocco. I’d love to discuss my travel dates and preferences.",
  /** Verified social profile URLs. Empty until the business provides them. */
  social: [] as { label: string; href: string }[],
  /** Business details NOT yet provided. Never rendered as fact. */
  unconfirmed: {
    legalName: "",
    registeredAddress: "",
    foundedYear: "",
    phone: "",
  },
  plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN?.trim() || "",
  googleVerification: process.env.GOOGLE_SITE_VERIFICATION?.trim() || "",
  bingVerification: process.env.BING_SITE_VERIFICATION?.trim() || "",
  yandexVerification: process.env.YANDEX_SITE_VERIFICATION?.trim() || "",
  baiduVerification: process.env.BAIDU_SITE_VERIFICATION?.trim() || "",
  naverVerification: process.env.NAVER_SITE_VERIFICATION?.trim() || "",
  indexNowKey: process.env.INDEXNOW_KEY?.trim() || "",
} as const;

export const nav = [
  { label: "Morocco Tours", href: "/tours" },
  { label: "Destinations", href: "/destinations" },
  { label: "Gallery", href: "/gallery" },
  { label: "About Us", href: "/about" },
  { label: "Travel Journal", href: "/journal" },
] as const;

export const absoluteUrl = (path = "/") => `${siteUrl}${path === "/" ? "" : path}`;

export function whatsappHref(message: string = site.whatsappMessage): string | null {
  return site.whatsappNumber ? `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}` : null;
}

export const mailHref = (subject = "Morocco trip enquiry") =>
  site.contactEmail ? `mailto:${site.contactEmail}?subject=${encodeURIComponent(subject)}` : null;
