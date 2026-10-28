import Link from "next/link";
import { Container } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";

export const metadata = { title: "Page not found", robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <section className="pt-40 pb-32">
      <Container className="widget max-w-3xl p-8 sm:p-14">
        <p className="eyebrow mb-4 text-gold">Error 404</p>
        <h1>This path leads nowhere.</h1>
        <p className="mt-6 text-lg text-ink-soft">The page you were looking for doesn&rsquo;t exist or has moved. These may help you find your way.</p>
        <ul className="mt-8 grid gap-2 underline-offset-4 sm:grid-cols-2 [&_a]:underline">
          <li><Link href="/tours">Morocco Tours</Link></li>
          <li><Link href="/destinations">Destinations</Link></li>
          <li><Link href="/journal">Travel Journal</Link></li>
        </ul>
        <div className="mt-10 flex gap-4">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/contact" variant="outline">Design Your Journey</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
