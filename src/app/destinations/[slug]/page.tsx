import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, PageHero } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ArticleCard } from "@/components/ui/Cards";
import { TourCard, toCardData } from "@/components/ui/TourCard";
import { CtaBand } from "@/components/ui/CtaBand";
import { Photo } from "@/components/ui/Section";
import { photosByPlace, placeForDestination, toImg } from "@/content/images";
import { articles, destinations, getDestination, pick, toursForDestination } from "@/content";
import { JsonLd } from "@/components/seo/JsonLd";
import { destinationLd, pageMetadata, webPageLd } from "@/lib/seo";

export const dynamicParams = false;
export const generateStaticParams = () => destinations.map((d) => ({ slug: d.slug }));

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const d = getDestination((await params).slug);
  if (!d) return {};
  return pageMetadata({ ...d.seo, path: `/destinations/${d.slug}`, image: d.image.src });
}

export default async function DestinationPage({ params }: Props) {
  const d = getDestination((await params).slug);
  if (!d) notFound();
  const relTours = toursForDestination(d.slug, 6);
  const relArticles = pick(articles, d.articles);
  const placeKey = placeForDestination(d.slug);
  const strip = placeKey ? photosByPlace(placeKey).filter((p) => p.width / p.height > 1.2).slice(0, 6) : [];

  return (
    <>
      <JsonLd data={webPageLd({ path: `/destinations/${d.slug}`, name: d.seo.title, description: d.seo.description, image: d.image.src })} />
      <JsonLd data={destinationLd(d)} />
      <PageHero eyebrow={d.kicker} title={d.title} intro={d.summary} img={d.image}>
        <div className="mb-8"><Breadcrumbs light items={[{ name: "Destinations", path: "/destinations" }, { name: d.title, path: `/destinations/${d.slug}` }]} /></div>
      </PageHero>

      <section className="py-10 lg:py-14">
        <Container className="grid gap-14 lg:grid-cols-12">
          <div className="space-y-5 text-lg text-ink-soft lg:col-span-6">{d.intro.map((p) => <p key={p}>{p}</p>)}</div>
          <div className="lg:col-span-5 lg:col-start-8">
            <h2 className="eyebrow mb-4 !font-sans text-gold">Best for</h2>
            <ul className="flex flex-wrap gap-2">
              {d.bestFor.map((b) => <li key={b} className="rounded-none bg-gold/10 px-4 py-1.5 text-sm font-semibold text-gold-deep">{b}</li>)}
            </ul>
          </div>
        </Container>
      </section>

      <section className="panel py-10 lg:py-14">
        <Container>
          <h2>Highlights</h2>
          <div className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-2">
            {d.highlights.map((h) => (
              <div key={h.title} className="widget p-6 sm:p-7">
                <h3>{h.title}</h3>
                <p className="mt-2 text-ink-soft">{h.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {strip.length > 0 && placeKey && (
        <section className="py-10 lg:py-14">
          <Container>
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <h2>{d.title} in pictures</h2>
              <Link href={`/gallery/${placeKey}`} className="underline underline-offset-[6px]">See all {photosByPlace(placeKey).length} photos</Link>
            </div>
            <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">
              {strip.map((p) => (
                <li key={p.id} className="aspect-[4/3] overflow-hidden rounded-none">
                  <Link href={`/gallery/${placeKey}`} className="block size-full"><Photo img={toImg(p)} sizes="(min-width: 768px) 33vw, 50vw" quality={70} /></Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <section className="py-10 lg:py-14">
        <Container className="grid gap-12 lg:grid-cols-12">
          <h2 className="text-4xl lg:col-span-4">Practical information</h2>
          <ul className="widget list-disc space-y-3 p-6 pl-10 text-lg text-ink-soft sm:p-8 sm:pl-12 lg:col-span-7 lg:col-start-6">{d.practical.map((p) => <li key={p}>{p}</li>)}</ul>
        </Container>
      </section>

      {relTours.length > 0 && (
        <section className="panel py-10 lg:py-14">
          <Container>
            <h2>Itineraries that include {d.title}</h2>
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relTours.map((t) => <li key={t.slug}><TourCard tour={toCardData(t)} /></li>)}
            </ul>
          </Container>
        </section>
      )}

      {relArticles.length > 0 && (
        <section className="py-10 lg:py-14">
          <Container>
            <h2>Useful reading</h2>
            <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-3">
              {relArticles.map((a) => <ArticleCard key={a.slug} a={a} />)}
            </div>
          </Container>
        </section>
      )}

      <CtaBand img={d.image} source={`dest_${d.slug}`} title={`Thinking of ${d.title}?`} text="Tell us when you’d like to go and what you’d love to do, and we’ll shape the journey around it." />
    </>
  );
}
