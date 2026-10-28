import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container, PageHero, Photo } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CtaBand } from "@/components/ui/CtaBand";
import { images, photos, photosByPlace, placeCover, places, toImg } from "@/content/images";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, webPageLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Morocco Photo Gallery",
  description: `${photos.length} photographs of Morocco by destination: Marrakech, Fez, the Sahara, the Atlas, Chefchaouen, Essaouira, Casablanca and more.`,
  path: "/gallery",
  image: images.koutoubia.src,
});

export default function GalleryPage() {
  const list = Object.entries(places).sort(([a], [b]) => photosByPlace(b).length - photosByPlace(a).length);
  return (
    <>
      <JsonLd data={webPageLd({ path: "/gallery", name: "Morocco Photo Gallery", description: "Photographs of Morocco by place: cities, desert, mountains and coast.", type: "CollectionPage" })} />
      <PageHero eyebrow="Gallery" title="Morocco in pictures" intro={`${photos.length} photographs across ${list.length} places, from desert dunes to blue-washed lanes. Pick a place to browse.`} img={images.saharaGolden}>
        <div className="mb-8"><Breadcrumbs light items={[{ name: "Gallery", path: "/gallery" }]} /></div>
      </PageHero>
      <section className="py-12 lg:py-16">
        <Container>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map(([key, p], i) => {
              const cover = placeCover(key);
              return (
                <li key={key}>
                  <Link href={`/gallery/${key}`} className="group on-dark relative isolate arch flex aspect-[4/5] flex-col justify-end overflow-hidden bg-ink p-6 text-white sm:aspect-[4/3]">
                    <Photo img={toImg(cover)} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" priority={i < 3} className="absolute inset-0 -z-10 transition-transform duration-[1400ms] ease-[var(--ease-lux)] group-hover:scale-[1.05]" />
                    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                    <p className="eyebrow num text-white/85">{photosByPlace(key).length} photos</p>
                    <h2 className="mt-1 flex items-center justify-between gap-3 !text-3xl">{p.name}<ArrowUpRight className="size-5 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" /></h2>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>
      <CtaBand title="Seen somewhere you'd love to go?" text="Tell us which places caught your eye and we'll shape a journey around them." source="gallery_index" img={images.desertCamp} />
    </>
  );
}
