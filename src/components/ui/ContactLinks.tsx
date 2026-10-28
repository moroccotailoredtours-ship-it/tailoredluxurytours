import { Mail, MessageCircle } from "lucide-react";
import { mailHref, whatsappHref } from "@/lib/site";
import { buttonClass } from "./Button";
import { TrackedAnchor } from "./TrackedLink";

/** WhatsApp CTA. Renders nothing until a real number is configured, so there is never a broken link. */
export function WhatsAppButton({ variant = "outline", className = "", label = "Chat on WhatsApp" }: { variant?: "outline" | "outline-light" | "primary"; className?: string; label?: string }) {
  const href = whatsappHref();
  if (!href) return null;
  return (
    <TrackedAnchor event="whatsapp_click" label="whatsapp" href={href} target="_blank" rel="noopener noreferrer" className={buttonClass(variant, className)}>
      <MessageCircle className="size-4" aria-hidden="true" />
      {label}
    </TrackedAnchor>
  );
}

export function EmailLink({ className = "", children }: { className?: string; children?: React.ReactNode }) {
  const href = mailHref();
  if (!href) return null;
  const address = href.slice("mailto:".length).split("?")[0];
  return (
    <TrackedAnchor event="email_click" label="email" href={href} className={className}>
      {children ?? (
        <>
          <Mail className="mr-2 inline size-4" aria-hidden="true" />
          {address}
        </>
      )}
    </TrackedAnchor>
  );
}
