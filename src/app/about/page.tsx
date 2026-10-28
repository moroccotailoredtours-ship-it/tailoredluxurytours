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
  description: "A private Morocco tour company based in Fez: private-only trips, routes drafted by hand, one agreed price, and a team that knows each region.",
  path: "/about",
});

const glance: [string, string][] = [
  ["Based in", "Fez, Morocco"],
  ["Type of trips", "Private only: never combined with other travellers"],
  ["Trips start from", "Marrakech, Fez and Casablanca"],
  ["Languages", "English, French and Arabic"],
  ["Founder", "Omar Hafidi, a Fez medina native"],
  ["Cancellation", "Free up to 18 days before the trip"],
  ["Standard tours", "Morocco Tailored Tours, our other brand"],
];

const practice = [
  ["Private only", "We don't run fixed-departure group tours. Every itinerary is built for one group, which means the pace, the stops, and the route are all negotiable from the start."],
  ["Drafted by hand", "Routes aren't pulled from a template. Each one is drawn up specifically for the people taking it, around how much time they have and what they actually want to see."],
  ["An honest cost, agreed upfront", "You receive one considered proposal before committing to anything, covering exactly what's listed as included. Nothing is added once you're on the road."],
  ["Based here", "Planning happens in Morocco, by people who drive these routes and know when a road is closed, a festival changes a town's hotel prices, or a season makes the desert unpleasant."],
];

const team = [
  ["Omar Hafidi", "Founder & Fez Expert", "Fez Medina native · 12+ years", "Born and raised inside the walls of Fez el-Bali, Omar holds a degree in English Literature and has spent over a decade leading travellers through the 9,000 alleys of the world's largest car-free city. He can trace a route from the Bou Inania Madrasa to the Chouara tannery without once checking a map, and founded the company on a simple frustration with fixed-group departures: they rush past exactly the details worth slowing down for. He still drafts every Fez itinerary himself."],
  ["Issam", "Medina Heritage Specialist", "Fez Mellah native · 10+ years", "A licensed guide with deep roots in the Jewish Mellah quarter of Fez, Issam brings deep knowledge of the city's layered history, from Phoenician trade routes to Andalusian artisan traditions. He grew up a few doorways from the Ibn Danan Synagogue and can walk you through nine centuries of coexistence between Fes el-Bali's Muslim, Jewish, and Andalusian quarters, pointing out which tilework patterns, doorway shapes, and guild marks belong to which era and why."],
  ["Mustapha", "Desert & Berber Culture Expert", "Zagora, Draa Valley · 15+ years", "Mustapha grew up among the dunes of the Draa Valley and speaks three Berber dialects, learned trading routes between oasis villages long before he ever led a tour. He knows the difference between a good camp and a great one: which dune face catches sunrise best, which track into the erg avoids the daytime 4x4 traffic, and when to stop talking and let the desert do the rest. He's also a professional driver who handles every kilometre of the route himself, and knows the full itinerary down to the last stop. His camps are legendary: fire stories, traditional music, and a silence you will never forget."],
  ["Anouar", "Marrakech & Souks Specialist", "Marrakech Medina · 8+ years", "High energy and encyclopaedic knowledge of the Red City. Anouar studied English Linguistics in Marrakech and has spent years mapping the souks by trade rather than by tourist route: which alley belongs to the leatherworkers, which to the lantern-makers, which spice stall has sourced from the same family for generations. He knows every hidden courtyard, spice merchant, and rooftop terrace, and exactly which ones are worth the detour. A professional driver as well as a guide, he handles the road between stops himself and knows the full itinerary inside out."],
  ["Youssef \"Yeshu\"", "Atlas & Amazigh Culture Expert", "Tinghir, High Atlas · 10+ years", "Born in the shadow of the Todra Gorge, Yeshu is as much a storyteller as he is a guide. He grew up around the seasonal rhythms of High Atlas village life and leads treks through walnut groves and Amazigh villages most itineraries never reach, translating not just language but the customs behind a shared pot of mint tea or an invitation into someone's home. He's also a professional driver who knows every switchback of the Atlas roads and the full itinerary by heart. Every route he plans starts with the same question: who do you actually want to meet, not just what do you want to see."],
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={webPageLd({ path: "/about", name: "About Us", description: "How Tailored Luxury Tours plans private, personalised journeys across Morocco.", type: "AboutPage" })} />
      <PageHero eyebrow="About Us" title="A private Morocco tour company, built the harder way" intro="Fixed group departures are simpler to run: one route, one bus, the same day for everyone. We think that trade-off shows in the trip itself, so we built the harder version instead." img={images.bahia}>
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
            <h2>Who you&rsquo;ll actually deal with</h2>
            <p className="mt-6 text-lg text-ink-soft">One trip designer handles your itinerary from the first message to the final draft, so you&rsquo;re never repeating yourself to someone new. On the road, you travel with a private, licensed driver who knows the route personally, never a rotating roster of subcontractors.</p>
          </Reveal>
          <Reveal delay={80}>
            <h2>If something needs to change</h2>
            <p className="mt-6 text-lg text-ink-soft">Trips rarely go exactly to plan, and that&rsquo;s fine. Your trip designer stays reachable throughout, so a missed connection, a change of mind, or an extra night somewhere is resolved quietly, without starting over.</p>
          </Reveal>
        </Container>
      </section>

      <section className="panel py-12 lg:py-16">
        <Container className="max-w-4xl">
          <Reveal>
            <h2>How to choose a Morocco tour company</h2>
            <p className="mt-6 text-lg text-ink-soft">There are many tour companies in Morocco, and the differences are not always visible online. Ask whether the trip is genuinely private or joined to a group on the road, who the driver and guide will be, what the price includes, and how changes are handled once you are travelling.</p>
            <p className="mt-4 text-lg text-ink-soft">A private tour should show you one full price before you commit, name the hotels it uses (or say plainly how they are chosen), and be adjustable. You can see how we do it on every <Link href="/tours" className="underline underline-offset-4 hover:text-gold">tour page</Link>.</p>
          </Reveal>
        </Container>
      </section>

      <section className="py-12 lg:py-16">
        <Container>
          <Reveal className="max-w-3xl">
            <p className="eyebrow mb-4 text-gold">The team behind your trip</p>
            <h2>Planned by people who know each region</h2>
            <p className="mt-6 text-lg text-ink-soft">Your itinerary is planned by our founders in Fez, drawing on a small team of regional specialists, each one based where they grew up, who feed in the on-the-ground detail a guidebook won&rsquo;t have.</p>
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
