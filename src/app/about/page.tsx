import Link from "next/link";
import { Container, PageHero } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CtaBand } from "@/components/ui/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { images } from "@/content/images";
import { tours } from "@/content";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, webPageLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Us: Tailor-Made Morocco Travel",
  description: "How Tailored Luxury Tours plans private journeys: listening first, designing around you, and confirming only when you're ready.",
  path: "/about",
});

const days = tours.map((t) => t.days);

const glance: [string, string][] = [
  ["Based in", "Fez, Morocco"],
  ["Type of trips", "Private, tailor-made luxury journeys across Morocco"],
  ["Trips start from", "Marrakech, Fez and Casablanca"],
  ["Itineraries", `${tours.length} starting points, from ${Math.min(...days)} to ${Math.max(...days)} days`],
  ["Prices", "Agreed with you in a tailored proposal, not published online"],
  ["Booking", "No instant checkout. You confirm only after reviewing a proposal"],
  ["Languages", "English, French and Arabic"],
  ["Founder", "Omar Hafidi, a Fez medina native"],
  ["Standard tours", "Morocco Tailored Tours, our other brand"],
];

// Names, roles and places come from the owner's team page on moroccotailoredtours.com (same team). Bios here are short and rewritten so the two sites do not duplicate text.
// OWNER TO CONFIRM: each line below, and whether to add photos.
const team = [
  ["Omar Hafidi", "Founder & Fez Expert", "Fez medina native", "Founded the company and plans the Fez itineraries."],
  ["Issam", "Medina Heritage Specialist", "Fez Mellah native", "A licensed guide with deep knowledge of Fez's history and craft traditions."],
  ["Mustapha", "Desert & Berber Culture Expert", "Zagora, Draa Valley", "Grew up in the Draa Valley and knows the desert routes and camps."],
  ["Anouar", "Marrakech & Souks Specialist", "Marrakech medina", "Knows the Marrakech souks by trade, courtyard and rooftop."],
  ["Youssef \"Yeshu\"", "Atlas & Amazigh Culture Expert", "Tinghir, High Atlas", "From the Todra Gorge area, leads journeys through High Atlas villages."],
];

const practice = [
  ["Listen first", "Every journey starts with what you want to feel and see, not with a catalogue."],
  ["Design with honesty", "Realistic travel times, clear trade-offs, and suggestions that suit your pace."],
  ["Stay personal", "You talk with people about your trip, and your preferences shape every decision."],
  ["Confirm when ready", "No pressure and no instant checkout. You confirm only after reviewing a proposal."],
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={webPageLd({ path: "/about", name: "About Us", description: "How Tailored Luxury Tours plans private, personalised journeys across Morocco.", type: "AboutPage" })} />
      <PageHero eyebrow="About Us" title="Travel designed around the traveller" intro="Tailored Luxury Tours is built on a simple idea: the best journey is the one made for you." img={images.bahia}>
        <div className="mb-8"><Breadcrumbs light items={[{ name: "About Us", path: "/about" }]} /></div>
      </PageHero>

      <section className="py-12 lg:py-16">
        <Container className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow mb-4 text-gold">At a glance</p>
            <h2>The facts, plainly</h2>
            <p className="mt-6 text-ink-soft">We plan private journeys around your interests, your timing and your style of travel. Here is what to expect.</p>
          </Reveal>
          <dl className="border-t-2 border-ink lg:col-span-8">
            {glance.map(([k, v]) => (
              <div key={k} className="grid gap-1 border-b border-ink/15 py-5 sm:grid-cols-[12rem_1fr] sm:gap-8">
                <dt className="eyebrow !font-sans text-gold">{k}</dt>
                <dd className="text-lg">
                  {k === "Standard tours" ? (
                    <a className="underline underline-offset-4 hover:text-gold" href="https://www.moroccotailoredtours.com/" target="_blank" rel="noopener noreferrer">{v}</a>
                  ) : v}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="panel panel-sand py-12 lg:py-16">
        <Container>
          <Reveal><p className="eyebrow mb-4 text-gold">What that means in practice</p><h2>How we plan your trip</h2></Reveal>
          <dl className="mt-10 grid gap-y-10 border-t-2 border-ink sm:grid-cols-2 lg:grid-cols-4">
            {practice.map(([t, d], i) => (
              <Reveal key={t} delay={i * 80} className={`pt-8 ${i ? "lg:border-l lg:pl-8" : ""} border-ink/15 lg:pr-6`}>
                <span className="num mb-5 block font-serif text-6xl leading-none text-gold-bright">0{i + 1}</span>
                <dt className="font-serif text-2xl">{t}</dt>
                <dd className="mt-3 text-ink-soft">{d}</dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      <section className="py-12 lg:py-16">
        <Container className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <h2>If something needs to change</h2>
            <p className="mt-6 text-lg text-ink-soft">Every itinerary is a starting point. Dates, route, pace and stops are adjusted with you before anything is confirmed, so the plan can change without starting again.</p>
          </Reveal>
          <Reveal delay={80}>
            <h2>One company, two brands</h2>
            <p className="mt-6 text-lg text-ink-soft">
              Tailored Luxury Tours and{" "}
              <a className="underline underline-offset-4 hover:text-gold" href="https://www.moroccotailoredtours.com/" target="_blank" rel="noopener noreferrer">Morocco Tailored Tours</a>
              {" "}are the same company. Morocco Tailored Tours offers our standard private tours, and Tailored Luxury Tours is where we plan the luxury journeys.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="panel py-12 lg:py-16">
        <Container>
          <Reveal className="max-w-3xl">
            <p className="eyebrow mb-4 text-gold">The team behind your trip</p>
            <h2>Planned by people who know each region</h2>
            <p className="mt-6 text-lg text-ink-soft">Your journey is planned by our team in Morocco, with regional specialists who each know the place they grew up in.</p>
          </Reveal>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map(([name, role, from, bio], i) => (
              <Reveal as="li" key={name} delay={i * 60} className="widget flex flex-col p-6">
                <span aria-hidden="true" className="num mb-5 flex size-14 items-center justify-center bg-forest font-serif text-2xl text-gold-light">{(name ?? "").charAt(0)}</span>
                <h3 className="font-serif text-2xl">{name}</h3>
                <p className="eyebrow mt-2 !font-sans text-gold">{role}</p>
                <p className="mt-1 text-sm text-ink-soft">{from}</p>
                <p className="mt-4 text-ink-soft">{bio}</p>
              </Reveal>
            ))}
          </ul>
          <p className="mt-8"><Link href="/contact" className="underline underline-offset-4 hover:text-gold">Ask us anything before you plan</Link></p>
        </Container>
      </section>

      <CtaBand source="about" />
    </>
  );
}
