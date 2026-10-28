import { Container, TextHero } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms & Booking Information",
  description: "How enquiries, proposals and trip confirmations work with Tailored Luxury Tours.",
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
        <p className="widget mt-6 p-5 text-sm">
          <strong>Draft structure only.</strong> The commercial terms below are placeholders that the business must define and have reviewed before publishing. No policy here is final.
        </p>
        <div className="prose-lux widget mt-6 p-6 sm:p-10">
          <h2>How booking works</h2>
          <p>Sending an enquiry through this website does not create a booking. We discuss your plans, then send a tailored proposal. A trip is confirmed only when you accept a proposal and the confirmation steps set out in that proposal are completed.</p>

          <h2>Proposals and pricing</h2>
          <p><mark>[Business to define: how prices are quoted, currency, validity period of proposals, what is included and excluded.]</mark></p>

          <h2>Deposits and payments</h2>
          <p><mark>[Business to define: deposit amount, payment schedule and accepted methods.]</mark></p>

          <h2>Changes and cancellations</h2>
          <p><mark>[Business to define: amendment policy, cancellation terms and refund conditions.]</mark></p>

          <h2>Travel insurance and documents</h2>
          <p><mark>[Business to define: insurance recommendations, visa and passport responsibilities.]</mark></p>

          <h2>Liability</h2>
          <p><mark>[To be drafted by a qualified professional.]</mark></p>
        </div>
      </Container>
      </div>
    </>
  );
}
