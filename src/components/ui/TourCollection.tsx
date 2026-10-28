import Link from "next/link";
import { Container, PageHero } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { TourCard, toCardData } from "@/components/ui/TourCard";
import { CtaBand } from "@/components/ui/CtaBand";
import { Faq } from "@/components/ui/Faq";
import { JsonLd } from "@/components/seo/JsonLd";
import { itemListLd, webPageLd } from "@/lib/seo";
import { images } from "@/content/images";
import type { Collection } from "@/content/collections";
import type { Img } from "@/lib/types";

/** One programmatic landing page: computed intro, real itinerary cards, data-derived FAQ and sibling links. */
export function TourCollection({ c, img = images.atlasValley, crumbs }: { c: Collection; img?: Img; crumbs: { name: string; path: string }[] }) {
  return (
    <>
      <JsonLd data={webPageLd({ path: c.path, name: c.title, description: c.description, type: "CollectionPage", image: img.src })} />
      <JsonLd data={itemListLd(c.h1, c.tours.map((t) => ({ name: `${t.title} (${t.days} days from ${t.start})`, path: `/tours/${t.slug}` })))} />
      <PageHero eyebrow={`${c.tours.length} itineraries`} title={c.h1} intro={c.intro[0]} img={img}>
        <div className="mb-8"><Breadcrumbs light items={[{ name: "Morocco Tours", path: "/tours" }, ...crumbs]} /></div>
      </PageHero>
      <section className="py-12 lg:py-16">
        <Container>
          <div className="max-w-3xl space-y-4 text-lg text-ink-soft">
            {c.intro.slice(1).map((p) => <p key={p}>{p}</p>)}
          </div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {c.tours.map((t, i) => <li key={t.slug}><TourCard tour={toCardData(t)} priority={i < 3} /></li>)}
          </ul>
        </Container>
      </section>
      <section className="bg-paper py-12 lg:py-16">
        <Container className="grid gap-10 lg:grid-cols-12">
          <h2 className="text-4xl lg:col-span-4">Questions about these journeys</h2>
          <div className="lg:col-span-8"><Faq items={c.faqs} /></div>
        </Container>
      </section>
      {c.related.length > 0 && (
        <section className="py-12 lg:py-16">
          <Container>
            <p className="eyebrow mb-4 text-gold">Keep exploring</p>
            <ul className="flex flex-wrap gap-3">
              {c.related.map((r) => <li key={r.path}><Link href={r.path} className="chip">{r.label}</Link></li>)}
              <li><Link href="/tours" className="chip">All itineraries</Link></li>
            </ul>
          </Container>
        </section>
      )}
      <CtaBand title="Want one of these shaped around you?" text="Tell us your dates and interests and we’ll adapt the route and pace." source={`collection_${c.kind}`} />
    </>
  );
}
