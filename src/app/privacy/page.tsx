import { Container, TextHero } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Tailored Luxury Tours collects, uses and protects the information you send through this website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <TextHero title="Privacy Policy" eyebrow="Legal">
        <Breadcrumbs light items={[{ name: "Privacy Policy", path: "/privacy" }]} />
      </TextHero>
      <div className="pt-10">
      <Container className="max-w-3xl pb-12">
        <div className="prose-lux widget mt-6 p-6 sm:p-10">
          <p><strong>Last updated: October 2026</strong></p>
          <p>This page explains what information we collect through this website, why, and how we use it. Our booking terms are on the <a href="/terms">Terms &amp; Booking Information</a> page.</p>

          <h2>1. Who we are</h2>
          <p>{site.name} is a private tour operator based in Fez, Morocco, that plans and runs tailor-made tours across Morocco. We are the same company as Morocco Tailored Tours. By using this site or sending us an enquiry you agree to this policy. If you do not agree, please stop using the site.</p>

          <h2>2. Information we collect</h2>
          <ul>
            <li><strong>Contact details:</strong> your name, email address and, if you give it, your phone or WhatsApp number.</li>
            <li><strong>Trip details:</strong> destinations, dates, trip length, group size and who is travelling, interests, budget, the country you travel from, and any message or notes you add.</li>
            <li><strong>Messages:</strong> what you send us by form, email or WhatsApp, including special requirements.</li>
            <li><strong>Technical data:</strong> the site&rsquo;s servers may process your IP address to deliver pages and to limit spam. We use it for short-term rate limiting only.</li>
            <li><strong>Payments:</strong> we do not collect or store card numbers on this website. Deposits are paid through PayPal or a payment link we send you, which have their own privacy policies.</li>
          </ul>

          <h2>3. How we use your information</h2>
          <ul>
            <li><strong>Tour planning:</strong> to answer your enquiry and build a personal itinerary.</li>
            <li><strong>Communication:</strong> to contact you about your booking and answer your questions.</li>
            <li><strong>Booking management:</strong> to process the deposit, confirm reservations and manage your trip.</li>
            <li><strong>Safety and legal:</strong> to meet the requirements that apply to a tour operator in Morocco, and to protect the site from spam and abuse.</li>
            <li><strong>Travel updates:</strong> only if you ask for them. You can unsubscribe at any time.</li>
          </ul>

          <h2>4. Data sharing</h2>
          <p>We do not sell, trade or rent your information. We share it only with:</p>
          <ul>
            <li><strong>Guides, drivers and hotels:</strong> the details they need to look after you, such as your name, group size, dietary needs, arrival details and dates.</li>
            <li><strong>Service providers:</strong> Resend delivers your enquiry to our inbox by email, Vercel hosts the site, and PayPal processes deposits. Each handles your information only to provide that service.{site.plausibleDomain ? " Plausible Analytics provides cookie-free site statistics and never receives your name, email or message." : ""}</li>
            <li><strong>Authorities:</strong> where the law requires it.</li>
          </ul>
          <p>Links to other sites are governed by their own privacy policies.</p>

          <h2>5. Cookies</h2>
          <p>{site.plausibleDomain ? "This site does not set advertising or remarketing cookies. Our analytics service does not use cookies." : "This site does not set analytics, advertising or remarketing cookies."} The site works without cookies. You can also block or delete cookies in your browser settings.</p>

          <h2>6. Your rights</h2>
          <p>Wherever you live, and in particular if you are in the EU or UK, you have these rights:</p>
          <ul>
            <li><strong>Access:</strong> ask what information we hold about you.</li>
            <li><strong>Rectification:</strong> ask us to correct anything that is wrong.</li>
            <li><strong>Erasure:</strong> ask us to delete your information.</li>
            <li><strong>Restriction:</strong> ask us to limit how we use it.</li>
            <li><strong>Portability:</strong> ask for a copy in a common format.</li>
            <li><strong>Objection:</strong> object to us using your information for marketing.</li>
          </ul>
          <p>To use any of them, email {site.contactEmail ? <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a> : "us"}.</p>

          <h2>7. Data security and retention</h2>
          <p>The site is served over HTTPS, and only the people who need your details to organise your trip see them. We keep enquiry and booking records for as long as needed to deliver your trip and meet legal or accounting requirements, and delete them on request after that.</p>

          <h2>8. Changes to this policy</h2>
          <p>We may update this page and will show the date above when we do. Continued use of the site means you accept the update.</p>

          <h2>9. Contact us</h2>
          <p>
            {site.name}, Fez, Morocco<br />
            {site.contactEmail && <>Email: <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a><br /></>}
            {site.whatsappNumber && <>WhatsApp: +{site.whatsappNumber}</>}
          </p>
        </div>
      </Container>
      </div>
    </>
  );
}
