import { Container, PageHero } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { DestinationTile } from "@/components/ui/Cards";
import { CtaBand } from "@/components/ui/CtaBand";
import { destinations } from "@/content";
import { images } from "@/content/images";
import { JsonLd } from "@/components/seo/JsonLd";
import { itemListLd, pageMetadata, webPageLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Morocco Destinations",
  description: "From Marrakech and Fez to the Sahara, the Atlas Mountains and the Atlantic coast: explore the regions you can include in a private Morocco journey.",
  path: "/destinations",
});

export default function DestinationsPage() {
  return (
    <>
      <JsonLd data={webPageLd({ path: "/destinations", name: "Morocco Destinations", description: "Seven places across Morocco, each with its own pace and character.", type: "CollectionPage" })} />
      <JsonLd data={itemListLd("Morocco destinations", destinations.map((x) => ({ name: x.title, path: `/destinations/${x.slug}` })))} />
      <PageHero eyebrow="Destinations" title="Where will Morocco take you?" intro="Seven places, each with its own pace and character. Combine them in the proportions that suit you." img={images.koutoubia}>
        <div className="mb-8"><Breadcrumbs light items={[{ name: "Destinations", path: "/destinations" }]} /></div>
      </PageHero>
      <section className="py-10 lg:py-14">
        <Container>
          <ul className="grid auto-rows-[24rem] gap-4 md:grid-cols-2">
            {destinations.map((d, i) => (
              <li key={d.slug} className={i === 0 ? "md:col-span-2" : ""}>
                <DestinationTile d={d} className="h-full" sizes={i === 0 ? "100vw" : "(min-width: 768px) 50vw, 100vw"} />
              </li>
            ))}
          </ul>
          <ul className="mt-10 grid gap-10 md:grid-cols-2">
            {destinations.map((d) => (
              <li key={d.slug} className="widget p-6 sm:p-7">
                <h2 className="text-3xl">{d.title}</h2>
                <p className="mt-2 text-ink-soft">{d.summary}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <CtaBand source="destinations_index" />
    </>
  );
}
