import Link from "next/link";
import { ArrowUpRight, CalendarDays, Hourglass, MessagesSquare, PlaneLanding } from "lucide-react";
import { HeroSlider } from "@/components/home/HeroSlider";
import { DestinationSpotlight } from "@/components/home/DestinationSpotlight";
import { ThemeStrip } from "@/components/home/ThemeStrip";
import { Container, Photo, SectionHeading } from "@/components/ui/Section";
import { ArticleCard } from "@/components/ui/Cards";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { articles, destinations, tourFacts, tours } from "@/content";
import { images } from "@/content/images";
import { JsonLd } from "@/components/seo/JsonLd";
import { itemListLd, pageMetadata, webPageLd } from "@/lib/seo";

export const metadata = {
  ...pageMetadata({
    title: "Private, Tailor-Made Morocco Travel",
    description: "Tailored Luxury Tours designs private, personalised journeys across Morocco, from the Sahara to the medinas, shaped around your interests and pace.",
    path: "/",
  }),
  title: { absolute: "Tailored Luxury Tours | Private, Tailor-Made Morocco Travel" },
};

const slides = [
  { img: images.saharaTrek, label: "The Sahara", zoom: 1.25, blurb: "Golden dunes, camel treks and nights under open sky." },
  { img: images.koutoubia, label: "Marrakech & the Atlas", blurb: "The Red City beneath the snow-capped High Atlas." },
  { img: images.atlasValley, label: "The Atlas Mountains", blurb: "Valley walks, village stays and high mountain passes." },
  { img: images.desertCamp, label: "Private desert nights", blurb: "Unhurried evenings in the dunes, planned around you." },
];

const difference = [
  ["Planned around you", "Your interests, timing and travel style come first, rather than a set itinerary."],
  ["Flexible conversations", "Routes and pacing are discussed and adjusted with you before anything is proposed."],
  ["Thoughtful routes", "Honest travel times, with space to rest, wander and linger where you love."],
  ["Personal communication", "A real conversation about your trip, not an automated booking funnel."],
];

const steps = [
  ["Discover inspiration", "Browse itineraries, places and experiences that appeal to you."],
  ["Share your travel ideas", "Tell us your dates, interests and what you hope to feel."],
  ["Discuss your preferences", "We talk through the details, options and pacing together."],
  ["Receive a tailored proposal", "A journey designed for you, for you to review and refine."],
  ["Confirm when you’re ready", "Nothing is booked by sending an enquiry. You decide when to confirm."],
];

const themeTiles = [
  { id: "desert", label: "Desert", blurb: "Dunes, camel treks and nights under the stars.", img: images.saharaDune },
  { id: "imperial", label: "Imperial cities", blurb: "Medinas, madrasas and palaces of Fez and Marrakech.", img: images.fezGate },
  { id: "mountains", label: "Mountains", blurb: "Atlas valleys, villages and high passes.", img: images.atlasValley },
  { id: "coast", label: "Coast", blurb: "Atlantic light, ramparts and fishing ports.", img: images.essaouiraCoast },
  { id: "family", label: "Family", blurb: "Journeys paced for travelling together.", img: images.camel },
  { id: "luxury", label: "Luxury", blurb: "Refined stays and unhurried private travel.", img: images.desertCamp },
];

const intro = [
  { icon: CalendarDays, title: "When to go", body: "Spring and autumn are often the most comfortable. Summer is very hot inland, and winter is cold in the mountains and desert.", href: "/journal/when-to-visit-morocco", cta: "Season guide" },
  { icon: Hourglass, title: "How long to stay", body: `Itineraries run from ${tourFacts.minDays} to ${tourFacts.maxDays} days, from a short escape to a grand tour, with honest travel times and room to rest.`, href: "/tours", cta: "Browse itineraries" },
  { icon: PlaneLanding, title: "Where to start", body: `Begin in ${tourFacts.starts.slice(0, -1).join(", ")} or ${tourFacts.starts.at(-1)}. Each city has itineraries, and routes adapt to your flights.`, href: "/tours", cta: "Pick a starting city" },
  { icon: MessagesSquare, title: "How planning works", body: "An enquiry doesn’t confirm or charge for anything. We talk through your plans, then propose a route for you to refine.", href: "/contact", cta: "Start your enquiry" },
];

const destTitle: Record<string, string> = Object.fromEntries(destinations.map((d) => [d.slug, d.title]));

/** IATA codes of the main airport serving each starting city. */
const airportCodes: Record<string, string> = { Casablanca: "CMN", Marrakech: "RAK", Fez: "FEZ" };

const startImages: Record<string, typeof images.hassanII> = { Casablanca: images.hassanII, Marrakech: images.koutoubia, Fez: images.fezTanneries };

/** Hand-picked mix of lengths and styles for the homepage shelf. */
const featuredPicks: [title: string, days: number][] = [
  ["Marrakech and Desert Adventure", 5],
  ["Morocco Imperial Cities Tour", 7],
  ["Moroccan Family Adventure", 7],
  ["Morocco Coastal Escape Tour", 6],
  ["Moroccan Luxury Journey", 10],
  ["Grand Desert and Cultural Journey", 11],
];

export default function HomePage() {
  const featured = featuredPicks
    .map(([title, days]) => tours.find((t) => t.title === title && t.days === days))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  return (
    <>
      <JsonLd data={webPageLd({ path: "/", name: "Tailored Luxury Tours | Private, Tailor-Made Morocco Travel", description: "Private, personalised journeys across Morocco, from the Sahara to the medinas, shaped around your interests and pace." })} />
      <JsonLd data={itemListLd("Signature Morocco journeys", featured.map((x) => ({ name: x.title, path: `/tours/${x.slug}` })))} />
      <HeroSlider slides={slides} />

      {/* 2. Intro: practical things worth knowing before planning, then the finder */}
      <section aria-label="Planning your journey" className="bg-ivory">
        <Container className="py-10 lg:py-14">
          <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow mb-4 text-gold">Before you plan</p>
              <h2>Four things worth knowing about a trip to Morocco.</h2>
            </div>
            <p className="text-lg text-ink-soft lg:col-span-5">A little context makes the first conversation easier. Here is what most travellers ask us about first.</p>
          </Reveal>
          <dl className="mt-10 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {intro.map(({ icon: Icon, title, body, href, cta }, i) => (
              <Reveal key={title} delay={i * 80} className="flex flex-col border-t-2 border-ink pt-6">
                <Icon className="size-8 text-gold" strokeWidth={1.4} aria-hidden="true" />
                <dt className="mt-5 font-serif text-3xl">{title}</dt>
                <dd className="mt-3 text-ink-soft">{body}</dd>
                <Link href={href} className="mt-auto inline-flex self-start pt-6 items-center gap-1.5 text-sm font-semibold text-gold-deep underline underline-offset-[6px]">{cta}<ArrowUpRight className="size-4" aria-hidden="true" /></Link>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      {/* 3. Choose a style: expanding photo columns */}
      <section className="py-12 lg:py-16">
        <Container>
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="Choose your Morocco" title="Which kind of journey calls to you?">
              <p>Pick a style to see the itineraries that fit. Every one is adapted to you.</p>
            </SectionHeading>
            <ButtonLink href="/tours" variant="outline">See all journeys</ButtonLink>
          </Reveal>
          <div className="mt-12"><ThemeStrip items={themeTiles.map((x) => {
            const ts = tours.filter((t) => (t.themes as string[]).includes(x.id));
            return { ...x, count: ts.length, minDays: Math.min(...ts.map((t) => t.days)), maxDays: Math.max(...ts.map((t) => t.days)) };
          })} /></div>
        </Container>
      </section>

      {/* 4. Welcome: refined two-column introduction, then a cinematic photo band */}
      <section className="bg-paper">
        <Container className="grid gap-14 py-12 lg:grid-cols-12 lg:gap-20 lg:py-16">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow mb-5 text-gold">Welcome</p>
            <h2 className="!text-4xl !leading-[1.1] sm:!text-5xl">A Morocco planned around you, <em className="text-gold">not a package.</em></h2>
            <p className="mt-7 max-w-xl text-lg text-ink-soft">Tailored Luxury Tours plans private journeys across Morocco. We begin with a conversation about what draws you here, then shape a route, a pace and a set of experiences to suit you.</p>
            <dl className="mt-10 grid max-w-xl grid-cols-3 border-y border-ink/20">
              {[[String(tourFacts.count), "itineraries to adapt"], [`${tourFacts.minDays}–${tourFacts.maxDays}`, "days, short to grand"], [String(tourFacts.starts.length), "starting cities"]].map(([n, l], i) => (
                <div key={l} className={`py-5 ${i ? "border-l border-ink/20 pl-5" : ""}`}>
                  <dt className="num font-serif text-4xl leading-none text-gold-deep">{n}</dt>
                  <dd className="mt-2 text-sm text-ink-soft">{l}</dd>
                </div>
              ))}
            </dl>
            <ButtonLink href="/about" variant="outline" className="mt-10">How we plan a journey</ButtonLink>
          </Reveal>
          <div className="lg:col-span-6 lg:pt-12">
            <p className="eyebrow mb-2 text-ink-soft">What “private” means here</p>
            <ul>
              {[
                ["Your dates", "No fixed departures to fit around. The journey follows your calendar."],
                ["Your interests", "Desert, medinas, mountains, food or craft: the themes you choose shape the route."],
                ["Your pace", "Travel days and rest days are balanced with you, with space to linger."],
                ["Your questions", "Answered by a person, from first idea to final plan."],
              ].map(([t, d], i) => (
                <li key={t} className="border-t border-ink/20 last:border-b">
                  <Reveal delay={i * 70} className="grid grid-cols-[2.5rem_1fr] gap-4 py-6 sm:grid-cols-[3rem_12rem_1fr]">
                    <span className="num font-serif text-xl text-gold">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-serif text-2xl leading-tight sm:text-3xl">{t}</span>
                    <span className="col-start-2 text-ink-soft sm:col-start-auto">{d}</span>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* 5. Signature journeys: one wide row per journey, with facts and two actions */}
      <section className="py-12 lg:py-16">
        <Container>
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="Signature journeys" title="Itineraries to start the conversation">
              <p>Real day-by-day plans, from a few days to two weeks. Each one is adapted to your dates, interests and pace.</p>
            </SectionHeading>
            <ButtonLink href="/tours" variant="outline">All {tourFacts.count} itineraries</ButtonLink>
          </Reveal>
          <ul className="mt-10 border-t-2 border-ink">
            {featured.map((t, i) => (
              <li key={t.slug} className="border-b border-ink/20">
                <Reveal className="grid gap-8 py-10 lg:grid-cols-12 lg:items-center lg:gap-14 lg:py-12">
                  <Link href={`/tours/${t.slug}`} tabIndex={-1} aria-hidden="true" className={`group relative block aspect-[16/10] overflow-hidden bg-ink lg:col-span-5 ${i % 2 ? "lg:order-2" : ""}`}>
                    <Photo img={t.image} sizes="(min-width: 1024px) 40vw, 100vw" className="transition-transform duration-[1400ms] group-hover:scale-[1.05]" />
                    <span className="num absolute left-4 top-4 bg-forest/90 px-3 py-1.5 font-serif text-2xl text-gold-light">{String(i + 1).padStart(2, "0")}</span>
                  </Link>
                  <div className="lg:col-span-7">
                    <p className="eyebrow !text-xs text-gold">Starts in {t.start}</p>
                    <h3 className="mt-2 !text-3xl sm:!text-4xl">{t.title}</h3>
                    <p className="mt-4 max-w-2xl text-ink-soft">{t.summary}</p>
                    <dl className="mt-6 grid max-w-2xl gap-x-8 gap-y-4 border-y border-ink/15 py-5 sm:grid-cols-[auto_1fr]">
                      <div>
                        <dt className="eyebrow !text-[0.68rem] text-ink-soft">Duration</dt>
                        <dd className="num mt-1 font-serif text-2xl">{t.days} days <span className="text-ink-soft">/ {t.nights} nights</span></dd>
                      </div>
                      <div>
                        <dt className="eyebrow !text-[0.68rem] text-ink-soft">Route</dt>
                        <dd className="mt-1 text-lg">{t.destinations.map((s) => destTitle[s]).filter(Boolean).join(" · ") || t.start}</dd>
                      </div>
                    </dl>
                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                      <ButtonLink href={`/tours/${t.slug}`}>View tour</ButtonLink>
                      <ButtonLink href={`/contact?tour=${t.slug}`} variant="outline">Contact us</ButtonLink>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 6. Start from where you land: three captioned city cards with airport codes */}
      <section className="bg-paper py-12 lg:py-14">
        <Container>
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="Start from where you land" title="Begin in the city that suits your flight">
              <p>Every itinerary starts in one of three cities. Pick the airport you’re flying into and we’ll show the journeys that begin there.</p>
            </SectionHeading>
          </Reveal>
          <ul className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
            {tourFacts.starts.map((c, i) => {
              const ts = tours.filter((t) => t.start === c);
              const lo = Math.min(...ts.map((t) => t.days));
              const hi = Math.max(...ts.map((t) => t.days));
              return (
                <li key={c}>
                  <Reveal delay={i * 90}>
                    <Link href={`/tours?start=${c}`} className="group block">
                      <span className="relative block aspect-[4/3] overflow-hidden bg-ink">
                        <Photo img={startImages[c] ?? images.koutoubia} sizes="(min-width: 768px) 33vw, 100vw" className="transition-transform duration-[1400ms] group-hover:scale-[1.05]" />
                        {airportCodes[c] && <span className="num absolute left-0 top-0 bg-forest px-3.5 py-2 text-sm font-bold tracking-[0.2em] text-gold-light" aria-label={`Airport code ${airportCodes[c]}`}>{airportCodes[c]}</span>}
                      </span>
                      <span className="eyebrow mt-5 block !text-xs text-gold">Start in</span>
                      <span className="mt-1 flex items-center justify-between font-serif text-4xl sm:text-5xl">{c}<ArrowUpRight className="size-7 text-gold transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" /></span>
                      <span className="mt-4 grid grid-cols-2 border-y border-ink/20 py-4">
                        <span><span className="num block font-serif text-3xl leading-none text-gold-deep">{ts.length}</span><span className="mt-1 block text-sm text-ink-soft">itineraries</span></span>
                        <span className="border-l border-ink/20 pl-5"><span className="num block font-serif text-3xl leading-none text-gold-deep">{lo}–{hi}</span><span className="mt-1 block text-sm text-ink-soft">days</span></span>
                      </span>
                    </Link>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* 8. Destinations: tabbed spotlight on forest green */}
      <section className="on-dark zellige bg-forest py-12 text-ivory lg:py-16">
        <Container>
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="Discover Morocco" title="Places that change the pace of a trip" />
            <ButtonLink href="/destinations" variant="outline-light">All destinations</ButtonLink>
          </Reveal>
          <div className="mt-12"><DestinationSpotlight items={destinations} /></div>
        </Container>
      </section>

      {/* Tailored difference */}
      <section className="py-12 lg:py-16">
        <Container>
          <Reveal><SectionHeading eyebrow="The Tailored Difference" title="Why plan a trip around you, rather than a package?" /></Reveal>
          <dl className="mt-10 grid gap-y-12 border-t-2 border-ink sm:grid-cols-2 lg:grid-cols-4">
            {difference.map(([t, d], i) => (
              <Reveal key={t} delay={i * 80} className={`pt-8 ${i ? "lg:border-l lg:pl-8" : ""} border-ink/15 lg:pr-6`}>
                <span className="num mb-6 block font-serif text-7xl leading-none text-gold-bright">0{i + 1}</span>
                <dt className="font-serif text-2xl">{t}</dt>
                <dd className="mt-3 text-ink-soft">{d}</dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      {/* How it works */}
      <section className="panel panel-sand py-12 lg:py-16">
        <Container>
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="How it works" title="From first idea to a tailored proposal">
              <p>Sending an enquiry doesn’t confirm or charge for anything. It starts a conversation.</p>
            </SectionHeading>
            <ButtonLink href="/contact">Start your enquiry</ButtonLink>
          </Reveal>
          <ol className="mt-10 grid gap-10 lg:grid-cols-5 lg:gap-0">
            {steps.map(([t, d], i) => (
              <li key={t}>
                <Reveal delay={i * 80} className={`relative border-t-2 border-ink pt-6 lg:pr-8 ${i ? "lg:border-l lg:border-l-ink/15 lg:pl-8" : ""}`}>
                  <span className="num block font-serif text-7xl leading-none text-gold-bright">{i + 1}</span>
                  <h3 className="mt-6">{t}</h3>
                  <p className="mt-2 text-ink-soft">{d}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Journal */}
      <section className="py-12 lg:py-16">
        <Container>
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="Travel Journal" title="Practical guides for planning Morocco" />
            <Link href="/journal" className="underline underline-offset-[6px]">All articles</Link>
          </Reveal>
          <div className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-3">
            {articles.slice(0, 3).map((a, i) => (
              <Reveal key={a.slug} delay={i * 90} className="h-full"><ArticleCard a={a} /></Reveal>
            ))}
          </div>
        </Container>
      </section>

    </>
  );
}
