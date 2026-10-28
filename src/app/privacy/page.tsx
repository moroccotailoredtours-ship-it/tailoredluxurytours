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
        <p className="widget mt-6 p-5 text-sm">
          <strong>Draft for owner and legal review.</strong> This describes what the website actually does today. Business-specific legal details (marked below) must be completed and reviewed by a qualified professional before launch. It is not legal advice and makes no claim of compliance with any specific law.
        </p>
        <div className="prose-lux widget mt-6 p-6 sm:p-10">
          <h2>Who we are</h2>
          <p>{site.name} operates this website. Legal entity name and registered address: <mark>[to be completed by the business]</mark>. Contact: {site.contactEmail || <mark>[contact email to be configured]</mark>}.</p>

          <h2>Information we collect</h2>
          <p>When you send an enquiry we collect the details you enter: your name and email, and optionally your country, travel dates, number of travellers, preferred destinations, interests, budget and message. We ask only for what helps us plan your trip.</p>
          <p>The website&rsquo;s servers may process technical data such as your IP address to deliver pages and to limit spam. We use your IP address for short-term rate limiting only.</p>

          <h2>How we use it</h2>
          <ul>
            <li>To reply to your enquiry and prepare a tailored proposal.</li>
            <li>To protect the site from spam and abuse.</li>
          </ul>

          <h2>Who receives it</h2>
          <p>Enquiries are delivered by email through our email delivery provider (Resend) to the business inbox. <mark>[Confirm any further processors, such as CRM or hosting providers, before launch.]</mark> We do not sell your information.</p>

          <h2>Cookies and analytics</h2>
          <p>{site.plausibleDomain ? "This site uses Plausible Analytics, a privacy-focused service that does not use cookies. We never send names, email addresses or message content to analytics." : "At present this site does not set analytics or advertising cookies."} <mark>[Update this section if analytics or marketing tools are added.]</mark></p>

          <h2>Retention</h2>
          <p><mark>[Retention period to be decided by the business, e.g. how long enquiries are kept.]</mark></p>

          <h2>Your rights</h2>
          <p>Depending on where you live, you may have rights to access, correct or delete your information. To make a request, contact us using the details above. <mark>[Complete according to the applicable laws for your business.]</mark></p>
        </div>
      </Container>
      </div>
    </>
  );
}
