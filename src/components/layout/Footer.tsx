import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Section";
import { buttonClass } from "@/components/ui/Button";
import { TrackedAnchor } from "@/components/ui/TrackedLink";
import { collections } from "@/content/collections";
import { destinations } from "@/content";
import { mailHref, site, whatsappHref } from "@/lib/site";

const col = "flex flex-col gap-2.5 text-[0.95rem] text-ivory/80";
const link = "underline-offset-4 hover:text-white hover:underline";
const head = "mb-5 font-serif !text-2xl !leading-tight text-white";

const planLinks = [
  { label: "All tours", href: "/tours" },
  ...collections.filter((c) => c.kind === "city").map((c) => ({ label: c.h1.replace("Private Morocco journeys", "Tours"), href: c.path })),
  ...collections.filter((c) => c.kind === "style").map((c) => ({ label: c.h1.replace(" journeys in Morocco", ""), href: c.path })),
  ...collections.filter((c) => c.kind === "length").map((c) => ({ label: c.h1.replace("Morocco trips of ", "Trips of "), href: c.path })),
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Travel Journal", href: "/journal" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Booking Information", href: "/terms" },
];

export function Footer() {
  const mail = mailHref();
  const email = mail?.slice("mailto:".length).split("?")[0];
  const wa = whatsappHref();
  return (
    <footer className="on-dark zellige mt-6 bg-forest text-ivory max-md:pb-[calc(6.5rem+env(safe-area-inset-bottom))]">
      <Container className="grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:py-16">
        <div>
          <Logo />
          <p className="mt-7 max-w-xs font-serif text-3xl leading-tight text-white">Let&rsquo;s build the Morocco trip you actually want.</p>
          <p className="mt-5 max-w-xs text-[0.95rem] text-ivory/75">Private, tailor-made journeys shaped around your pace, starting from Marrakech, Fez or Casablanca.</p>
          {site.social.length > 0 && (
            <ul className="mt-6 flex gap-5 text-sm">
              {site.social.map((s) => (
                <li key={s.href}><a className={link} href={s.href} rel="me noopener noreferrer" target="_blank">{s.label}</a></li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label="Footer: plan a trip">
          <h2 className={head}>Plan a trip</h2>
          <ul className={col}>
            {planLinks.map((n) => (
              <li key={n.href}><Link className={link} href={n.href}>{n.label}</Link></li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer: destinations">
          <h2 className={head}>Destinations</h2>
          <ul className={col}>
            {destinations.map((d) => (
              <li key={d.slug}><Link className={link} href={`/destinations/${d.slug}`}>{d.title}</Link></li>
            ))}
            <li><Link className="font-semibold text-white underline-offset-4 hover:underline" href="/destinations">All destinations</Link></li>
          </ul>
        </nav>

        <nav aria-label="Footer: company">
          <h2 className={head}>Company</h2>
          <ul className={col}>
            {companyLinks.map((n) => (
              <li key={n.href}><Link className={link} href={n.href}>{n.label}</Link></li>
            ))}
          </ul>
        </nav>
      </Container>

      <div className="border-t border-white/15">
        <Container className="flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-[0.95rem] text-ivory/85">
            {wa && (
              <li>
                <TrackedAnchor event="whatsapp_click" label="footer_whatsapp" href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white">
                  <MessageCircle className="size-4" aria-hidden="true" />WhatsApp us
                </TrackedAnchor>
              </li>
            )}
            {mail && (
              <li>
                <TrackedAnchor event="email_click" label="footer_email" href={mail} className="inline-flex items-center gap-2 hover:text-white">
                  <Mail className="size-4" aria-hidden="true" />{email}
                </TrackedAnchor>
              </li>
            )}
          </ul>
          <div className="md:text-right">
            <Link href="/contact" className={buttonClass("primary", "")}>Start planning my trip</Link>
            <p className="mt-3 max-w-sm text-sm text-ivory/65 md:ml-auto">Tell us your dates and ideas. Sending an enquiry doesn&rsquo;t book or charge anything.</p>
          </div>
        </Container>
      </div>

      <div className="border-t border-white/15">
        <Container className="flex flex-col gap-2 py-6 text-sm text-ivory/65 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Private tailor-made travel in Morocco.</p>
        </Container>
      </div>
    </footer>
  );
}
