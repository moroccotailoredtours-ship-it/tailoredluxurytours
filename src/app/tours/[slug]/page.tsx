import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Compass, MapPin, Moon } from "lucide-react";
import { Container, PageHero, Photo } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { TourCard, toCardData } from "@/components/ui/TourCard";
import { CtaBand } from "@/components/ui/CtaBand";
import { Faq } from "@/components/ui/Faq";
import { Itinerary } from "@/components/ui/Itinerary";
import { TourSubnav } from "@/components/ui/TourSubnav";
import { buttonClass } from "@/components/ui/Button";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { WhatsAppButton } from "@/components/ui/ContactLinks";
import { destinations, getTour, pick, tours } from "@/content";
import { images } from "@/content/images";
import { themeLabels } from "@/content/tours";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, tourLd, webPageLd } from "@/lib/seo";
import { destinationTitles } from "@/content/destination-titles";

export const dynamicParams = false;
export const generateStaticParams = () => tours.map((t) => ({ slug: t.slug }));

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const t = getTour((await params).slug);
  if (!t) return {};
  return pageMetadata({ ...t.seo, path: `/tours/${t.slug}`, image: t.image.src });
}

const sections = [
  { id: "overview", label: "Overview" },
  { id: "itinerary", label: "Itinerary" },
  { id: "practical", label: "Good to know" },
  { id: "faq", label: "FAQ" },
];

export default async function TourPage({ params }: Props) {
  const tour = getTour((await params).slug);
  if (!tour) notFound();
  const dests = pick(destinations, tour.destinations);
  // Related: same start city or sharing most destinations, similar length first
  const related = tours
    .filter((t) => t.slug !== tour.slug)
    .map((t) => ({ t, score: t.destinations.filter((d) => tour.destinations.includes(d)).length * 2 + Number(t.start === tour.start) - Math.abs(t.days - tour.days) / 4 }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((x) => x.t);
  const facts = [
    { icon: Clock, label: "Length", value: `${tour.days} days` },
    { icon: Moon, label: "Nights", value: String(tour.nights) },
    { icon: MapPin, label: "Starts in", value: tour.start },
    { icon: Compass, label: "Style", value: "Private" },
  ];

  return (
    <>
      <JsonLd data={webPageLd({ path: `/tours/${tour.slug}`, name: tour.seo.title, description: tour.seo.description, image: tour.image.src })} />
      <JsonLd data={tourLd(tour, tour.destinations.map((s) => destinationTitles[s]).filter((x): x is string => Boolean(x)))} />
      <TourSubnav items={sections} title={tour.title} slug={tour.slug} />
      <PageHero eyebrow={`${tour.days} days · from ${tour.start}`} title={tour.title} intro={tour.subtitle || tour.summary} img={tour.image}>
        <div className="mb-8">
          <Breadcrumbs light items={[{ name: "Morocco Tours", path: "/tours" }, { name: tour.title, path: `/tours/${tour.slug}` }]} />
        </div>
      </PageHero>

      <section className="pt-8 lg:pt-10">
        <Container>
          <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
            {facts.map((f) => (
              <div key={f.label} className="widget flex items-center gap-4 p-4 sm:p-6">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-gold/10">
                  <f.icon className="size-5 text-gold-deep" aria-hidden="true" />
                </span>
                <div>
                  <dt className="eyebrow !text-[0.66rem] text-ink-soft">{f.label}</dt>
                  <dd className="num mt-0.5 font-serif text-2xl leading-none">{f.value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <Container className="grid gap-14 py-12 lg:grid-cols-12 lg:py-16">
        <div className="lg:col-span-7">
          <section id="overview" className="scroll-mt-40">
            <p className="text-xl leading-relaxed text-ink">{tour.intro}</p>
            {tour.themes.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Journey styles">
                {tour.themes.map((th) => <li key={th} className="rounded-none bg-sand/70 px-3.5 py-1 text-sm font-semibold">{themeLabels[th]}</li>)}
              </ul>
            )}
            <p className="widget mt-8 p-5 text-sm text-ink-soft">
              <strong>A starting point, not a fixed package.</strong> Dates, pace, stops and experiences are adjusted with you. Prices, accommodation and inclusions are agreed in your tailored proposal.
            </p>
          </section>

          <section id="itinerary" className="mt-10 scroll-mt-40">
            <h2 className="mb-8 text-4xl">Day by day</h2>
            <Itinerary days={tour.itinerary} />
          </section>

          <section id="practical" className="mt-10 scroll-mt-40">
            <h2 className="text-4xl">Good to know</h2>
            <ul className="mt-6 space-y-3 text-ink-soft">
              {tour.practical.map((p) => <li key={p} className="surface px-5 py-4">{p}</li>)}
            </ul>
          </section>
        </div>

        <aside className="lg:col-span-5">
          <div className="sticky top-44 space-y-5">
            <div className="surface space-y-6 p-7">
              <div>
                <h2 className="text-3xl">Plan this journey</h2>
                <p className="mt-3 text-ink-soft">Tell us your dates and what you&rsquo;d like to change. No booking is made by sending an enquiry.</p>
              </div>
              <div className="flex flex-col gap-3">
                <TrackedLink event="tour_enquiry_click" label={tour.slug} href={`/contact?tour=${tour.slug}`} className={buttonClass("primary")}>
                  Enquire about this journey
                </TrackedLink>
                <WhatsAppButton />
              </div>
              <div className="space-y-1 border-t border-ink/10 pt-5 text-sm">
                <p className="eyebrow !text-[0.66rem] text-gold">Places on the route</p>
                <p>{dests.map((d, i) => (<span key={d.slug}>{i > 0 && " · "}<Link className="underline underline-offset-4" href={`/destinations/${d.slug}`}>{d.title}</Link></span>))}</p>
              </div>
            </div>
            <div className="relative hidden aspect-[4/3] overflow-hidden rounded-none lg:block">
              <Photo img={dests[0]?.image ?? images.koutoubia} sizes="(min-width: 1024px) 40vw, 100vw" />
            </div>
          </div>
        </aside>
      </Container>

      <section id="faq" className="scroll-mt-40 py-10 lg:py-14">
        <Container className="grid gap-12 lg:grid-cols-12">
          <h2 className="text-4xl lg:col-span-4">Questions</h2>
          <div className="lg:col-span-8"><Faq items={tour.faqs} /></div>
        </Container>
      </section>

      <section className="pb-12">
        <Container>
          <h2 className="text-4xl">Similar journeys</h2>
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {related.map((t) => <li key={t.slug}><TourCard tour={toCardData(t)} /></li>)}
          </ul>
        </Container>
      </section>

      <CtaBand img={tour.image} source={`tour_${tour.slug}`} title="Make this journey yours" text="Share your dates and ideas. We’ll shape the route around them." />
    </>
  );
}
