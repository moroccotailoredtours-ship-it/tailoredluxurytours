import { Container, TextHero } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Terms & Booking Information",
  description: "How enquiries, proposals, deposits, cancellations and trip confirmations work with Tailored Luxury Tours.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <TextHero title="Terms &amp; Booking Information" eyebrow="Legal">
        <Breadcrumbs light items={[{ name: "Terms & Booking Information", path: "/terms" }]} />
      </TextHero>
      <div className="pt-10">
      <Container className="max-w-3xl pb-12">
        <div className="prose-lux widget mt-6 p-6 sm:p-10">
          <p><strong>Last updated: October 2026</strong></p>
          <p>These are the terms that apply when you book with us. The way we treat your personal data is set out separately in the <a href="/privacy">Privacy Policy</a>.</p>

          <h2>1. From enquiry to booking</h2>
          <p>An enquiry sent through this website is not a booking. We talk through your plans and then put one tailored proposal in front of you. Your trip is confirmed only once you accept that proposal and the deposit is paid. Before any payment, we set out the exact terms of your trip in writing.</p>

          <h2>2. Payment</h2>
          <ul>
            <li><strong>Deposit:</strong> after you confirm an itinerary, 20% of the trip price reserves your dates. You pay it in euros through PayPal or a payment link we send you.</li>
            <li><strong>Balance:</strong> the rest is due in cash on the first day of the trip, unless we agree a different method with you in writing.</li>
            <li><strong>Currency:</strong> prices and payments are in euros. Figures shown in other currencies are estimates based on a recent exchange rate and are for convenience only.</li>
            <li><strong>Amendments:</strong> because every itinerary is private, it can be changed. After booking, we make changes wherever hotels, vehicles and guides can accommodate them, and we confirm any difference in price in writing beforehand.</li>
          </ul>

          <h2>3. What the price covers</h2>
          <p>Your proposal always states what is included. As a rule, the price covers:</p>
          <ul>
            <li>A private air-conditioned vehicle with a driver</li>
            <li>A licensed local guide</li>
            <li>Hotels, riads or desert camps as set out in the itinerary</li>
            <li>The meals listed for each tour</li>
            <li>Camel trekking on desert tours</li>
            <li>Fuel and transfers between destinations</li>
          </ul>
          <p>As a rule, it does not cover:</p>
          <ul>
            <li>Lunches and drinks, unless stated</li>
            <li>Entrance fees for monuments, museums and UNESCO sites</li>
            <li>Flights</li>
            <li>Travel insurance, which we strongly recommend</li>
            <li>Personal spending and shopping</li>
            <li>Tips, which are left to your discretion</li>
          </ul>

          <h2>4. Cancelling a trip</h2>
          <ul>
            <li><strong>At least 18 days before the start:</strong> no charge.</li>
            <li><strong>From 18 down to 7 days before:</strong> half the trip price.</li>
            <li><strong>Under 7 days before:</strong> the whole amount.</li>
          </ul>
          <p>Please take out full travel insurance that covers trip cancellation before you book.</p>

          <h2>5. Families and children</h2>
          <p>We welcome families and adjust the pace, activities and meals to suit. Tell us the children&rsquo;s ages when you enquire. A child must always be with a parent or legal guardian.</p>
          <ul>
            <li><strong>Under 5:</strong> no charge, sharing a bed with a parent or guardian.</li>
            <li><strong>Ages 5 to 11:</strong> 30% off the standard price.</li>
            <li><strong>Age 12 and above:</strong> the standard adult price.</li>
          </ul>

          <h2>6. Passports and visas</h2>
          <p>Visa requirements vary by nationality and can change, and your passport must meet the validity that Moroccan authorities require. Check the current rules with an official source, such as a Moroccan embassy or consulate, before you travel. We are not responsible if a traveller is refused entry because of their documents.</p>

          <h2>7. Health</h2>
          <p>See your doctor or a travel clinic well ahead of departure, and let us know when you book about any medical condition, allergy or limit on mobility so we can plan around it. What we say about health is general guidance and is not medical advice.</p>

          <h2>8. Our liability</h2>
          <p>We organise accommodation, transport and guiding as a private operator. We are not responsible for lost or stolen belongings, flight delays or missed connections, events beyond our control, or failings by third-party suppliers that we could not reasonably prevent. Optional activities, such as camel rides, are undertaken at your own risk. Our liability is capped at the total you paid for the trip concerned. We strongly recommend travel insurance.</p>

          <h2>9. Updates to these terms</h2>
          <p>We may revise this page, and the date above will change when we do. A confirmed booking stays subject to the terms that applied on the day it was confirmed.</p>

          <h2>10. Contact</h2>
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
