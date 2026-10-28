import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, PageHero } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ArticleCard } from "@/components/ui/Cards";
import { TourCard, toCardData } from "@/components/ui/TourCard";
import { CtaBand } from "@/components/ui/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { articles, destinations, getArticle, pick, toursForDestination } from "@/content";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";

export const dynamicParams = false;
export const generateStaticParams = () => articles.map((a) => ({ slug: a.slug }));

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const a = getArticle((await params).slug);
  if (!a) return {};
  return pageMetadata({ ...a.seo, path: `/journal/${a.slug}`, image: a.image.src, type: "article", publishedTime: a.datePublished });
}

export default async function ArticlePage({ params }: Props) {
  const a = getArticle((await params).slug);
  if (!a) notFound();
  const relTours = (a.related.destinations ?? []).flatMap((d) => toursForDestination(d, 2)).filter((t, i, all) => all.findIndex((x) => x.slug === t.slug) === i).slice(0, 3);
  const relDests = pick(destinations, a.related.destinations);
  const more = articles.filter((x) => x.slug !== a.slug).slice(0, 3);
  const date = new Date(a.datePublished).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: a.title,
          description: a.seo.description,
          image: { "@type": "ImageObject", url: absoluteUrl(a.image.src), width: a.image.width, height: a.image.height, caption: a.image.alt },
          datePublished: a.datePublished,
          mainEntityOfPage: absoluteUrl(`/journal/${a.slug}`),
          author: { "@type": "Organization", name: site.name },
          publisher: { "@id": `${site.url}/#organization` },
        }}
      />
      <PageHero eyebrow={`${a.category} · ${a.readingMinutes} min read`} title={a.title} intro={a.excerpt} img={a.image}>
        <div className="mb-8"><Breadcrumbs light items={[{ name: "Travel Journal", path: "/journal" }, { name: a.title, path: `/journal/${a.slug}` }]} /></div>
      </PageHero>

      <article className="py-12 lg:py-16">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="prose-lux lg:col-span-8 lg:col-start-3">
            <p className="!mt-0 text-sm"><time dateTime={a.datePublished}>{date}</time> · {site.name}</p>
            {a.body.map((b, i) =>
              b.type === "h2" ? <h2 key={i}>{b.text}</h2>
              : b.type === "p" ? <p key={i}>{b.text}</p>
              : <ul key={i}>{b.items.map((li) => <li key={li}>{li}</li>)}</ul>,
            )}
            <p className="mt-12 border-t border-ink/20 pt-6 text-sm">
              This guide is general planning information. Conditions, opening hours and entry rules change, so we confirm current details when planning your journey.
            </p>
          </div>
        </Container>
      </article>

      {(relTours.length > 0 || relDests.length > 0) && (
        <section className="panel py-12 lg:py-16">
          <Container>
            <h2 className="text-4xl">Plan it with us</h2>
            {relDests.length > 0 && (
              <p className="mt-4 text-ink-soft">
                Related destinations:{" "}
                {relDests.map((d, i) => <span key={d.slug}>{i > 0 && ", "}<Link className="underline underline-offset-4" href={`/destinations/${d.slug}`}>{d.title}</Link></span>)}
              </p>
            )}
            <ul className="mt-10 grid gap-6 md:grid-cols-3">
              {relTours.map((t) => <li key={t.slug}><TourCard tour={toCardData(t)} /></li>)}
            </ul>
          </Container>
        </section>
      )}

      <section className="py-12 lg:py-16">
        <Container>
          <h2 className="text-4xl">More from the journal</h2>
          <div className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-3">
            {more.map((m) => <ArticleCard key={m.slug} a={m} />)}
          </div>
        </Container>
      </section>

      <CtaBand source={`article_${a.slug}`} />
    </>
  );
}
