import { Container, PageHero } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ArticleCard } from "@/components/ui/Cards";
import { CtaBand } from "@/components/ui/CtaBand";
import { articles } from "@/content";
import { images } from "@/content/images";
import { JsonLd } from "@/components/seo/JsonLd";
import { itemListLd, pageMetadata, webPageLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Morocco Travel Journal",
  description: "Practical, honest guides for planning a trip to Morocco: when to go, the Sahara, imperial cities, culture and etiquette.",
  path: "/journal",
});

export default function JournalPage() {
  return (
    <>
      <JsonLd data={webPageLd({ path: "/journal", name: "Travel Journal", description: "Practical guides for planning a private journey in Morocco.", type: "CollectionPage" })} />
      <JsonLd data={itemListLd("Travel journal articles", articles.map((x) => ({ name: x.title, path: `/journal/${x.slug}` })))} />
      <PageHero eyebrow="Travel Journal" title="Guides for planning Morocco" intro="Practical, considered notes to help you decide where to go, when to travel and what to expect." img={images.atlasValley}>
        <div className="mb-8"><Breadcrumbs light items={[{ name: "Travel Journal", path: "/journal" }]} /></div>
      </PageHero>
      <section className="py-10 lg:py-14">
        <Container>
          <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => <ArticleCard key={a.slug} a={a} />)}
          </div>
        </Container>
      </section>
      <CtaBand source="journal_index" />
    </>
  );
}
