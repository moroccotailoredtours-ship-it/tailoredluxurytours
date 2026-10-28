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
          <p>Please read this page before you book. How we handle your personal information is covered in our <a href="/privacy">Privacy Policy</a>.</p>

          <h2>1. How booking works</h2>
          <p>Sending an enquiry through this website does not create a booking. We discuss your plans, then send one tailored proposal. A trip is confirmed only when you accept a proposal and the deposit has been paid. We confirm the exact terms of your trip in writing before you pay anything.</p>

          <h2>2. Booking and payment</h2>
          <ul>
            <li><strong>Deposit:</strong> once you confirm an itinerary, a deposit of 20% of the trip price secures your dates. It is paid through PayPal or a payment link we send you, in euros.</li>
            <li><strong>Balance:</strong> the remaining balance is paid on the first day of your trip, in cash, unless we agree another method in writing.</li>
            <li><strong>Prices and currency:</strong> all prices and payments are in euros. Amounts in other currencies are approximate, based on a recent exchange rate, and shown for convenience only.</li>
            <li><strong>Changes:</strong> itineraries are private and can be adjusted. Changes after booking are accepted where hotels, vehicles and guides allow, and any difference in cost is confirmed in writing first.</li>
          </ul>

          <h2>3. What is included</h2>
          <p>What is included in your trip is always stated in your proposal. Usually included:</p>
          <ul>
            <li>Private air-conditioned vehicle and driver</li>
            <li>Licensed local guide</li>
            <li>Accommodation as in the itinerary (hotels, riads, desert camps)</li>
            <li>Meals as stated for each tour</li>
            <li>Camel trekking on desert tours</li>
            <li>Fuel and transport between destinations</li>
          </ul>
          <p>Not included:</p>
          <ul>
            <li>Lunches and drinks, unless stated</li>
            <li>Entry fees to monuments, museums and UNESCO sites</li>
            <li>Flights</li>
            <li>Travel insurance (strongly recommended)</li>
            <li>Personal expenses and shopping</li>
            <li>Tips, which are discretionary</li>
          </ul>

          <h2>4. Cancellation policy</h2>
          <ul>
            <li><strong>18 days or more before the trip starts:</strong> free.</li>
            <li><strong>Between 18 and 7 days before:</strong> 50% of the trip price.</li>
            <li><strong>Fewer than 7 days before:</strong> the full amount.</li>
          </ul>
          <p>We recommend comprehensive travel insurance with trip cancellation cover before you book.</p>

          <h2>5. Travelling with children</h2>
          <p>Families are welcome, and we adapt the pace, activities and meals. Please give children&rsquo;s ages when you enquire. Children must be accompanied by a parent or legal guardian at all times.</p>
          <ul>
            <li><strong>Under 5:</strong> free, sharing a bed with parents or guardians.</li>
            <li><strong>5 to 11:</strong> 30% discount on the standard price.</li>
            <li><strong>12 and over:</strong> standard adult price.</li>
          </ul>

          <h2>6. Entry requirements</h2>
          <p>Visa rules depend on your nationality and change over time, and your passport must be valid for the period required by Moroccan authorities. Please check current requirements with an official source, such as a Moroccan embassy or consulate, before you travel. We cannot accept responsibility for travellers refused entry because of their documents.</p>

          <h2>7. Health and medical advice</h2>
          <p>Please speak to your doctor or a travel clinic well before departure, and tell us about any medical condition, allergy or mobility limit when you book so we can plan around it. Anything we say about health is general guidance, not professional medical advice.</p>

          <h2>8. Limitation of liability</h2>
          <p>We arrange accommodation, transport and guiding as a private operator. We are not liable for loss or theft of belongings, flight delays or missed connections, events outside our control, or shortfalls by third-party suppliers beyond our reasonable control. Optional activities such as camel rides are done at your own risk. Our maximum liability is limited to the total amount you paid for the affected tour. Travel insurance is strongly recommended.</p>

          <h2>9. Changes to these terms</h2>
          <p>We may update this page and will show the date above when we do. A booking you have already confirmed stays under the terms in force when it was confirmed.</p>

          <h2>10. Contact us</h2>
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
