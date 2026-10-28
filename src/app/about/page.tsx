import Link from "next/link";
import { Container, PageHero } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CtaBand } from "@/components/ui/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { images } from "@/content/images";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, webPageLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Us: Private Luxury Morocco Tours",
  description: "A Fez-based team planning private luxury journeys across Morocco: one group per trip, routes drawn by hand, a single agreed price, and guides from each region.",
  path: "/about",
});

const glance: [string, string][] = [
  ["Based in", "Fez, Morocco"],
  ["Type of trips", "Strictly private: your group travels alone, never with strangers"],
  ["Trips start from", "Marrakech, Fez and Casablanca"],
  ["Languages", "English, French and Arabic"],
  ["Founder", "Omar Hafidi, born in the Fez medina"],
  ["Cancellation", "No charge up to 18 days before departure"],
  ["Standard tours", "Morocco Tailored Tours, our other brand"],
];

const practice = [
  ["One group per trip", "There are no scheduled group departures. Each journey is built around a single party, so the pace, the stops and the route can all be shaped from the first conversation."],
  ["Drawn by hand", "We don't adapt a stock itinerary. Every route is drawn for the people travelling, around the time they have and the places they really want to see."],
  ["One clear price", "Before you commit to anything you get a single proposal that spells out what is included. Nothing is added to the bill while you travel."],
  ["Planned on the ground", "The planning is done here in Morocco by people who drive these roads. They know when a route is shut, when a festival pushes hotel prices up, and when the desert is at its least comfortable."],
];

const team = [
  ["Omar Hafidi", "Founder & Fez Expert", "Fez medina native · 12+ years", "Omar grew up inside the walls of Fez el-Bali and studied English Literature. For more than ten years he has guided travellers through the 9,000 alleys of the largest car-free city in the world, and he can walk from the Bou Inania Madrasa to the Chouara tannery without a map. He started the company because fixed group departures hurry past the very details worth lingering over. He still plans every Fez itinerary himself."],
  ["Issam", "Medina Heritage Specialist", "Fez Mellah native · 10+ years", "Issam is a licensed guide from the Jewish Mellah quarter of Fez, where he grew up a few doors from the Ibn Danan Synagogue. He knows the city's long history, from Phoenician trade routes to Andalusian craft traditions, and can take you through nine centuries of Muslim, Jewish and Andalusian life in Fes el-Bali, showing which tile patterns, door shapes and guild marks belong to which period and why."],
  ["Mustapha", "Desert & Berber Culture Expert", "Zagora, Draa Valley · 15+ years", "Mustapha grew up in the dunes of the Draa Valley and speaks three Berber dialects, having learned the oasis trading routes long before he guided his first trip. He can tell a good desert camp from a great one, knows which dune catches the best sunrise and which track into the erg avoids the daytime 4x4 traffic, and knows when to stay quiet and let the desert speak. He is also a professional driver who covers every kilometre of the route himself and knows the itinerary stop by stop. His camps are known for fireside stories, traditional music and a deep silence."],
  ["Anouar", "Marrakech & Souks Specialist", "Marrakech medina · 8+ years", "Anouar is energetic, and his knowledge of Marrakech runs deep. He studied English Linguistics there and has spent years mapping the souks by trade rather than by tourist trail: the leatherworkers' alley, the lantern-makers' lane, the spice stall supplied by one family for generations. He knows the hidden courtyards, the spice merchants and the rooftop terraces, and which of them repay a detour. He is both guide and professional driver, handling the road between stops himself and knowing the whole itinerary."],
  ["Youssef \"Yeshu\"", "Atlas & Amazigh Culture Expert", "Tinghir, High Atlas · 10+ years", "Yeshu was born beside the Todra Gorge and is as much a storyteller as a guide. Raised within the seasonal rhythm of High Atlas village life, he leads treks through walnut groves and Amazigh villages that most itineraries never reach, explaining the customs behind a shared pot of mint tea or an invitation into a family home as well as the language. He is also a professional driver who knows every bend of the Atlas roads and the full itinerary by heart. Each route he plans begins with one question: who do you want to meet, not only what do you want to see?"],
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={webPageLd({ path: "/about", name: "About Us", description: "How Tailored Luxury Tours plans private, personalised journeys across Morocco.", type: "AboutPage" })} />
      <PageHero eyebrow="About Us" title="Private luxury Morocco tours, done the demanding way" intro="Group departures are easier to operate: a single route, a single coach, the same schedule for everyone. We believe the traveller feels that compromise, so we chose the more demanding way to do it." img={images.bahia}>
        <div className="mb-8"><Breadcrumbs light items={[{ name: "About Us", path: "/about" }]} /></div>
      </PageHero>

      <section className="py-12 lg:py-16">
        <Container className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow mb-4 text-gold">At a glance</p>
            <h2>The facts, plainly</h2>
            <p className="mt-6 text-ink-soft">Tailored Luxury Tours and Morocco Tailored Tours are the same company. Standard private tours are on Morocco Tailored Tours; the luxury journeys are planned here.</p>
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
            <h2>Who looks after you</h2>
            <p className="mt-6 text-lg text-ink-soft">A single trip designer looks after your plans from your first message to the finished itinerary, so you never have to explain yourself twice. Once you are travelling, a private licensed driver who knows the route first-hand takes you, not a changing cast of subcontractors.</p>
          </Reveal>
          <Reveal delay={80}>
            <h2>If something needs to change</h2>
            <p className="mt-6 text-lg text-ink-soft">Few trips run exactly as drawn, and that is expected. Your trip designer remains in touch the whole way, so a missed connection, a change of heart or an extra night can be sorted out calmly, without redoing the plan.</p>
          </Reveal>
        </Container>
      </section>

      <section className="panel py-12 lg:py-16">
        <Container className="max-w-4xl">
          <Reveal>
            <h2>How to choose a Morocco tour company</h2>
            <p className="mt-6 text-lg text-ink-soft">Morocco has plenty of tour companies, and what separates them is hard to spot online. Ask whether the trip is truly private or merges with a group along the way, who will drive and guide you, what the price covers, and how changes are dealt with once you are on the road.</p>
            <p className="mt-4 text-lg text-ink-soft">A good private tour gives you one complete price before you commit, names its hotels or explains openly how it picks them, and can be changed. Each <Link href="/tours" className="underline underline-offset-4 hover:text-gold">tour page</Link> shows how we approach it.</p>
          </Reveal>
        </Container>
      </section>

      <section className="py-12 lg:py-16">
        <Container>
          <Reveal className="max-w-3xl">
            <p className="eyebrow mb-4 text-gold">The team behind your trip</p>
            <h2>Planned by people who know each region</h2>
            <p className="mt-6 text-lg text-ink-soft">Our founders in Fez plan your itinerary with a small group of regional specialists. Each lives in the place they grew up and contributes the local detail you won&rsquo;t find in a guidebook.</p>
          </Reveal>
          <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
        </Container>
      </section>

      <CtaBand source="about" />
    </>
  );
}
