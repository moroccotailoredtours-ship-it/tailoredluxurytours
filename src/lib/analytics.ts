type EventName = "cta_click" | "enquiry_submit" | "whatsapp_click" | "email_click" | "tour_enquiry_click";

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Record<string, string> }) => void;
  }
}

/** Fire-and-forget. Never pass personal data in `props`. No-op when analytics isn't configured. */
export function track(event: EventName, props?: Record<string, string>) {
  if (typeof window !== "undefined" && typeof window.plausible === "function") {
    window.plausible(event, props ? { props } : undefined);
  }
}
