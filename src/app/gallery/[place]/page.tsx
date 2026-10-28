import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, PageHero } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PhotoGrid } from "@/components/ui/PhotoGrid";
import { TourCard, toCardData } from "@/components/ui/TourCard";
import { CtaBand } from "@/components/ui/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { photosByPlace, placeCover, places, toImg } from "@/content/images";
import { toursForDestination } from "@/content";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";

export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(places).map((place) => ({ place }));

type Props = { params: Promise<{ place: string }> };

export async function generateMetadata({ params }: Props) {
  const key = (await params).place;
  const p = places[key];
  if (!p) return {};
  const cover = placeCover(key);
  return pageMetadata({
    title: `${p.name}: Photo Gallery`,
    description: `${photosByPlace(key).length} photographs of ${p.name}. ${p.blurb}`.slice(0, 160),
    path: `/gallery/${key}`,
    image: cover.file,
  });
}

export default async function PlaceGalleryPage({ params }: Props) {
  const key = (await params).place;
  const place = places[key];
  if (!place) notFound();
  const list = photosByPlace(key);
  const cover = placeCover(key);
  const tours = place.dest ? toursForDestination(place.dest, 3) : [];
  const year = new Date().getFullYear();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          name: `${place.name}: photo gallery`,
          description: place.blurb,
          url: absoluteUrl(`/gallery/${key}`),
          mainEntityOfPage: absoluteUrl(`/gallery/${key}`),
          hasPart: list.slice(0, 60).map((p) => ({
            "@type": "ImageObject",
            contentUrl: absoluteUrl(p.file),
            name: p.alt,
            caption: p.alt,
            width: p.width,
            height: p.height,
            creditText: site.name,
            creator: { "@type": "Organization", name: site.name },
            copyrightNotice: `© ${year} ${site.name}`,
          })),
        }}
      />
      <PageHero eyebrow={`${list.length} photos`} title={place.name} intro={place.blurb} img={toImg(cover)}>
        <div className="mb-8"><Breadcrumbs light items={[{ name: "Gallery", path: "/gallery" }, { name: place.name, path: `/gallery/${key}` }]} /></div>
      </PageHero>

      <section className="py-10 lg:py-12">
        <Container>
          <PhotoGrid photos={list.map(({ id, file, alt, width, height }) => ({ id, file, alt, width, height }))} placeName={place.name} />
          <nav aria-label="More galleries" className="mt-10 border-t border-ink/15 pt-8">
            <p className="eyebrow mb-4 text-gold">More galleries</p>
            <ul className="flex flex-wrap gap-2">
              {Object.entries(places).filter(([k]) => k !== key).map(([k, p]) => (
                <li key={k}><Link href={`/gallery/${k}`} className="chip">{p.name}</Link></li>
              ))}
            </ul>
          </nav>
        </Container>
      </section>

      {tours.length > 0 && (
        <section className="panel py-12 lg:py-16">
          <Container>
            <h2 className="text-4xl">Itineraries that include {place.name}</h2>
            {place.dest && <p className="mt-3"><Link href={`/destinations/${place.dest}`} className="underline underline-offset-4">Read the {place.name} destination guide</Link></p>}
            <ul className="mt-10 grid gap-6 md:grid-cols-3">
              {tours.map((t) => <li key={t.slug}><TourCard tour={toCardData(t)} /></li>)}
            </ul>
          </Container>
        </section>
      )}

      <CtaBand img={toImg(cover)} source={`gallery_${key}`} title={`Picture yourself in ${place.name}`} text="Tell us your dates and what you'd love to see, and we'll shape a journey around it." />
    </>
  );
}
