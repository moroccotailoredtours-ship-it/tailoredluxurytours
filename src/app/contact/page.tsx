import { Container, TextHero } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { EmailLink, WhatsAppButton } from "@/components/ui/ContactLinks";
import { Faq } from "@/components/ui/Faq";
import { getTour, homeFaqs } from "@/content";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, webPageLd } from "@/lib/seo";
import { site, whatsappHref } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Design Your Journey: Contact",
  description: "Tell us about the Morocco trip you have in mind. Share your dates, interests and ideas, and we'll reply to start shaping a tailored journey.",
  path: "/contact",
});

type Props = { searchParams: Promise<{ tour?: string | string[] }> };

export default async function ContactPage({ searchParams }: Props) {
  const raw = (await searchParams).tour;
  const tour = getTour(Array.isArray(raw) ? (raw[0] ?? "") : (raw ?? ""));
  const defaultMessage = tour ? `I'm interested in the "${tour.title}" itinerary (${tour.days} days from ${tour.start}). ` : "";
  const missing = [
    !site.contactEmail && "enquiry delivery (CONTACT_EMAIL)",
    !whatsappHref() && "WhatsApp (NEXT_PUBLIC_WHATSAPP_NUMBER)",
  ].filter(Boolean);

  return (
    <>
      <JsonLd data={webPageLd({ path: "/contact", name: "Design Your Journey", description: "Tell us about the Morocco you want to experience and we will shape a tailored proposal.", type: "ContactPage" })} />
      <TextHero
        eyebrow="Design your journey"
        title="Tell us about your Morocco."
        intro="Share what you have in mind, even if it’s only a feeling or a place. We’ll reply to talk it through and shape a tailored proposal. Nothing is booked or charged by sending this form."
      >
        <Breadcrumbs light items={[{ name: "Design Your Journey", path: "/contact" }]} />
      </TextHero>
      <Container className="pb-12 pt-14 lg:pt-20">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-4 text-gold">Prefer to talk first?</p>
            <p className="font-serif text-3xl">Reach us directly.</p>
            <div className="mt-8 space-y-4">
              <WhatsAppButton />
              {site.contactEmail && <p><EmailLink className="underline underline-offset-4" /></p>}
            </div>
            {process.env.NODE_ENV !== "production" && missing.length > 0 && (
              <p className="mt-10 border-l-2 border-gold bg-sand/60 p-4 text-sm">
                <strong>Setup required before launch (shown in development only):</strong> {missing.join("; ")}.
              </p>
            )}
          </div>
          <div className="lg:col-span-7">
            <EnquiryForm defaultMessage={defaultMessage} source={tour?.slug ?? "contact"} deliverTo={site.contactEmail || undefined} />
          </div>
        </div>

        <div className="mt-24 grid gap-12 lg:grid-cols-12">
          <h2 className="text-4xl lg:col-span-4">Before you write</h2>
          <div className="lg:col-span-8"><Faq items={homeFaqs} /></div>
        </div>
      </Container>
    </>
  );
}
