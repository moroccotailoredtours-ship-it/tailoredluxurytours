import type { MetadataRoute } from "next";
import { articles, destinations, tours } from "@/content";
import { collections } from "@/content/collections";
import { photosByPlace, places } from "@/content/images";
import { absoluteUrl } from "@/lib/site";

type Entry = MetadataRoute.Sitemap[number];
const imgs = (...srcs: string[]) => [...new Set(srcs)].slice(0, 1000).map(absoluteUrl);

/** Every indexable URL, with the images each page shows so Google Images can associate them with the page. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["/", "/tours", "/destinations", "/gallery", "/journal", "/about", "/contact", "/privacy", "/terms"];
  const entries: Entry[] = [
    ...staticPaths.map((p) => ({ url: absoluteUrl(p), priority: p === "/" ? 1 : 0.7 })),
    ...tours.map((t) => ({ url: absoluteUrl(`/tours/${t.slug}`), priority: 0.8, images: imgs(t.image.src) })),
    ...destinations.map((d) => {
      const place = Object.entries(places).find(([, v]) => v.dest === d.slug)?.[0];
      return { url: absoluteUrl(`/destinations/${d.slug}`), priority: 0.8, images: imgs(d.image.src, ...(place ? photosByPlace(place).slice(0, 6).map((p) => p.file) : [])) };
    }),
    ...articles.map((a) => ({ url: absoluteUrl(`/journal/${a.slug}`), priority: 0.6, lastModified: a.datePublished, images: imgs(a.image.src) })),
    ...collections.map((c) => ({ url: absoluteUrl(c.path), priority: 0.7, images: imgs(c.tours[0]!.image.src) })),
    ...Object.keys(places).map((k) => ({ url: absoluteUrl(`/gallery/${k}`), priority: 0.6, images: imgs(...photosByPlace(k).map((p) => p.file)) })),
  ];
  return entries;
}
