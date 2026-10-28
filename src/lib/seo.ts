import type { Metadata } from "next";
import { absoluteUrl, isIndexable, site } from "./site";
import { socialImage } from "@/content/images";

interface PageMeta {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  publishedTime?: string;
}

/** Builds consistent per-page metadata with a self-referencing canonical URL. */
export function pageMetadata({ title, description, path, image, type = "website", noindex, publishedTime }: PageMeta): Metadata {
  const url = absoluteUrl(path);
  const img = socialImage(image);
  // Keep "| Tailored Luxury Tours" only when the whole title fits in a search result (~65 chars).
  const branded = `${title} | ${site.name}`;
  return {
    title: branded.length <= 65 ? title : { absolute: title },
    description,
    alternates: { canonical: url },
    robots: noindex || !isIndexable ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url,
      siteName: site.name,
      locale: "en_GB",
      type,
      images: [{ url: absoluteUrl(img.url), width: 1200, height: 630, alt: img.alt }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description, images: [{ url: absoluteUrl(img.url), alt: img.alt }] },
  };
}

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: absoluteUrl(it.path),
  })),
});

export const organizationLd = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "TravelAgency"],
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      logo: absoluteUrl("/logo/icon-512.png"),
      description: site.description,
      slogan: site.tagline,
      areaServed: { "@type": "Country", name: "Morocco" },
      knowsAbout: ["Private travel in Morocco", "Sahara desert journeys", "Imperial cities of Morocco", "Atlas Mountains travel", "Moroccan culture and food"],
      ...(site.contactEmail ? { email: site.contactEmail } : {}),
      ...(site.social.length ? { sameAs: site.social.map((s) => s.href) } : {}),
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      inLanguage: "en",
      publisher: { "@id": `${site.url}/#organization` },
    },
  ],
});

const orgRef = { "@id": `${site.url}/#organization` };

/** A page entity that points at the site and organisation, so answer engines can tie pages to one publisher. */
export const webPageLd = (o: { path: string; name: string; description: string; type?: string; image?: string }) => ({
  "@context": "https://schema.org",
  "@type": o.type ?? "WebPage",
  "@id": `${absoluteUrl(o.path)}#webpage`,
  url: absoluteUrl(o.path),
  name: o.name,
  description: o.description,
  inLanguage: "en",
  isPartOf: { "@id": `${site.url}/#website` },
  publisher: orgRef,
  ...(o.image ? { primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl(o.image) } } : {}),
});

/** Ordered list of internal pages (home shelf, index and programmatic pages). */
export const itemListLd = (name: string, items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name,
  numberOfItems: items.length,
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: absoluteUrl(it.path) })),
});

interface TourLike { slug: string; title: string; summary: string; image: { src: string }; itinerary: { day: number; title: string; body: string }[]; themes: string[] }

/** Itinerary as a TouristTrip. No offers or prices: none are published. */
export const tourLd = (t: TourLike, placeNames: string[]) => ({
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  "@id": `${absoluteUrl(`/tours/${t.slug}`)}#trip`,
  name: t.title,
  description: t.summary,
  url: absoluteUrl(`/tours/${t.slug}`),
  image: absoluteUrl(t.image.src),
  touristType: t.themes,
  provider: orgRef,
  ...(placeNames.length ? { includesAttraction: placeNames.map((n) => ({ "@type": "TouristAttraction", name: n })) } : {}),
  itinerary: {
    "@type": "ItemList",
    numberOfItems: t.itinerary.length,
    itemListElement: t.itinerary.map((d) => ({ "@type": "ListItem", position: d.day, name: `Day ${d.day}: ${d.title}`, description: d.body })),
  },
});

export const destinationLd = (d: { slug: string; title: string; summary: string; image: { src: string }; bestFor: string[] }) => ({
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "@id": `${absoluteUrl(`/destinations/${d.slug}`)}#destination`,
  name: d.title,
  description: d.summary,
  url: absoluteUrl(`/destinations/${d.slug}`),
  image: absoluteUrl(d.image.src),
  touristType: d.bestFor,
  containedInPlace: { "@type": "Country", name: "Morocco" },
});

