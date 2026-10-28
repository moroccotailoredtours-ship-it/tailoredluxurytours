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
          <p>Here we describe the personal information this website gathers, the reasons for it and what happens to it afterwards. Our booking conditions are on the <a href="/terms">Terms &amp; Booking Information</a> page.</p>

          <h2>1. Who is responsible</h2>
          <p>{site.name} is a private tour operator in Fez, Morocco, designing and running tailor-made trips across the country. We are the same company as Morocco Tailored Tours. Using this site or sending an enquiry means you accept this policy; if you don&rsquo;t, please stop using the site.</p>

          <h2>2. What we collect</h2>
          <ul>
            <li><strong>Contact details:</strong> your name and email address, plus a phone or WhatsApp number if you choose to give one.</li>
            <li><strong>Trip details:</strong> where and when you want to travel, for how long, how many of you are going, your interests and budget, the country you are travelling from, and anything you add in your message.</li>
            <li><strong>Correspondence:</strong> whatever you send us through the form, by email or on WhatsApp, including special requirements.</li>
            <li><strong>Technical data:</strong> our servers may handle your IP address in order to serve pages and block spam. We use it only for short-lived rate limiting.</li>
            <li><strong>Payments:</strong> this website never collects or stores card numbers. Deposits are taken through PayPal or a payment link we send, and those services have their own privacy policies.</li>
          </ul>

          <h2>3. Why we use it</h2>
          <ul>
            <li><strong>Planning your trip:</strong> replying to your enquiry and drawing up a personal itinerary.</li>
            <li><strong>Staying in touch:</strong> writing to you about your booking and answering questions.</li>
            <li><strong>Managing the booking:</strong> taking the deposit, confirming reservations and running your trip.</li>
            <li><strong>Safety, legal and security:</strong> meeting the rules that apply to a tour operator in Morocco and keeping the site free of spam and abuse.</li>
            <li><strong>Updates:</strong> sending travel news only if you ask, with the option to unsubscribe whenever you like.</li>
          </ul>

          <h2>4. Who else sees it</h2>
          <p>We never sell, trade or rent personal information. We pass it on only to:</p>
          <ul>
            <li><strong>Guides, drivers and hotels:</strong> the information they need to look after you, for example your name, party size, dietary needs, arrival details and dates.</li>
            <li><strong>Service providers:</strong> Resend sends your enquiry to our inbox, Vercel hosts the site and PayPal handles deposits. Each uses your data only to deliver its service.{site.plausibleDomain ? " Plausible Analytics supplies cookie-free statistics and never receives your name, email or message." : ""}</li>
            <li><strong>Authorities:</strong> when the law obliges us to.</li>
          </ul>
          <p>Other websites we link to have their own privacy policies.</p>

          <h2>5. Cookies</h2>
          <p>{site.plausibleDomain ? "We set no advertising or remarketing cookies, and our analytics service uses none either." : "We set no analytics, advertising or remarketing cookies."} The site works fine without cookies, and you can block or delete them in your browser settings at any time.</p>

          <h2>6. Your rights</h2>
          <p>Wherever you live, and especially in the EU or UK, you can:</p>
          <ul>
            <li><strong>Access</strong> the information we hold about you.</li>
            <li><strong>Correct</strong> anything inaccurate.</li>
            <li><strong>Erase</strong> your information.</li>
            <li><strong>Restrict</strong> how we use it.</li>
            <li><strong>Port</strong> it, by asking for a copy in a common format.</li>
            <li><strong>Object</strong> to its use for marketing.</li>
          </ul>
          <p>To exercise any of these rights, email {site.contactEmail ? <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a> : "us"}.</p>

          <h2>7. Security and how long we keep data</h2>
          <p>The site uses HTTPS, and your details are visible only to the people who need them to arrange your trip. Enquiry and booking records are kept for as long as we need them to deliver the trip and to meet legal and accounting duties; after that we delete them if you ask.</p>

          <h2>8. Updates to this policy</h2>
          <p>We may revise this page, and the date above will change when we do. Carrying on using the site means you accept the revised version.</p>

          <h2>9. Contact</h2>
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
