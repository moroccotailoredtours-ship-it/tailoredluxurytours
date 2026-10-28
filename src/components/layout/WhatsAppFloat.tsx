import { MessageCircle } from "lucide-react";
import { TrackedAnchor } from "@/components/ui/TrackedLink";
import { whatsappHref } from "@/lib/site";

/** Floating WhatsApp button. Renders nothing until NEXT_PUBLIC_WHATSAPP_NUMBER is set, so it never links to a wrong number. */
export function WhatsAppFloat() {
  const href = whatsappHref();
  if (!href) return null;
  return (
    <TrackedAnchor
      event="whatsapp_click"
      label="floating_whatsapp"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-24 right-4 z-40 inline-flex size-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_12px_30px_-10px_rgb(0_0_0/0.5)] transition-transform hover:scale-105 lg:bottom-8 lg:right-8"
    >
      <MessageCircle className="size-7" aria-hidden="true" />
    </TrackedAnchor>
  );
}
