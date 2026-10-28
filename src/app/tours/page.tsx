import Link from "next/link";
import { collections } from "@/content/collections";
import { Container, PageHero } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { TourExplorer, type Filters, type Length } from "@/components/ui/TourExplorer";
import { toCardData } from "@/components/ui/TourCard";
import { CtaBand } from "@/components/ui/CtaBand";
import { tourFacts, tours } from "@/content";
import { images } from "@/content/images";
import { themeLabels } from "@/content/tours";
import { JsonLd } from "@/components/seo/JsonLd";
import { itemListLd, pageMetadata, webPageLd } from "@/lib/seo";
import type { Theme } from "@/lib/types";

export const metadata = pageMetadata({
  title: "Morocco Tours: Private Itineraries from 3 to 15 Days",
  description: `Browse ${tourFacts.count} day-by-day Morocco itineraries from Casablanca, Marrakech and Fez, from ${tourFacts.minDays} to ${tourFacts.maxDays} days. Each is tailored to your dates and pace.`,
  path: "/tours",
});

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

export default async function ToursPage({ searchParams }: Props) {
  const sp = await searchParams;
  const themeIds = [...new Set(tours.flatMap((t) => t.themes))] as Theme[];
  const themes = themeIds.map((id) => ({ id, label: themeLabels[id] }));
  const start = one(sp.start);
  const length = one(sp.length) as Length;
  const theme = one(sp.theme);
  const initial: Filters = {
    start: tourFacts.starts.includes(start) ? start : "all",
    length: (["short", "week", "long"] as string[]).includes(length) ? length : "any",
    theme: themeIds.includes(theme as Theme) ? theme : "all",
  };

  return (
    <>
      <JsonLd data={webPageLd({ path: "/tours", name: "Morocco Tours", description: "Day-by-day private itineraries for Morocco, adapted to each traveller.", type: "CollectionPage" })} />
      <JsonLd data={itemListLd("Morocco itineraries", tours.map((x) => ({ name: x.title + " (" + x.days + " days from " + x.start + ")", path: `/tours/${x.slug}` })))} />
      <PageHero
        eyebrow="Morocco Tours"
        title="Find the journey that fits you"
        intro={`${tourFacts.count} itineraries from ${tourFacts.minDays} to ${tourFacts.maxDays} days. Treat each as a starting point: we adapt the route, pace and stops to you.`}
        img={images.atlasValley}
      >
        <div className="mb-8"><Breadcrumbs light items={[{ name: "Morocco Tours", path: "/tours" }]} /></div>
      </PageHero>
      <section className="py-10 lg:py-12">
        <Container>
          <ul className="mb-10 grid gap-3 sm:grid-cols-2 sm:gap-8">
            <li className="border-l-2 border-gold pl-5"><strong className="font-serif text-xl">Prices and inclusions</strong><span className="mt-1 block text-ink-soft">Agreed with you in a tailored proposal.</span></li>
            <li className="border-l-2 border-gold pl-5"><strong className="font-serif text-xl">No instant booking</strong><span className="mt-1 block text-ink-soft">Every journey begins with a conversation.</span></li>
          </ul>
          <TourExplorer tours={tours.map(toCardData)} starts={tourFacts.starts} themes={themes} initial={initial} />
        </Container>
      </section>
      <section className="bg-paper py-12 lg:py-16">
        <Container>
          <p className="eyebrow mb-4 text-gold">Browse by</p>
          <ul className="flex flex-wrap gap-3">
            {collections.filter((c) => c.kind !== "city-style").map((c) => <li key={c.path}><Link href={c.path} className="chip">{c.h1}</Link></li>)}
          </ul>
        </Container>
      </section>
      <CtaBand title="Not sure where to begin?" text="Tell us what you’d love to experience. We’ll suggest a route and pace to match." source="tours_index" img={images.desertCamp} />
    </>
  );
}
