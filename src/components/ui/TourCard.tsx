import Link from "next/link";
import { Photo } from "./Section";
import { buttonClass } from "./Button";
import { themeLabels } from "@/content/tours";
import { destinationTitles } from "@/content/destination-titles";
import type { Img, Tour } from "@/lib/types";

/** Slim, serialisable shape so client components don't ship full itineraries. */
export interface TourCardData {
  slug: string;
  title: string;
  subtitle: string;
  start: string;
  days: number;
  summary: string;
  image: Img;
  themes: string[];
  /** Places the journey visits, as display names. */
  visits: string[];
  /** One complete sentence for the card, built from the route (the long summary is clipped mid-sentence). */
  blurb: string;
}

const themePhrase: Record<string, string> = {
  desert: "the desert", imperial: "imperial cities", mountains: "the mountains", coast: "the coast",
  luxury: "comfort and luxury", family: "family travel", wellness: "wellness", food: "food and tradition",
};

const join = (xs: string[]) => (xs.length > 1 ? `${xs.slice(0, -1).join(", ")} and ${xs.at(-1)}` : (xs[0] ?? ""));

export const toCardData = (t: Tour): TourCardData => {
  const visits = t.destinations.map((s) => destinationTitles[s]).filter((x): x is string => Boolean(x));
  const focus = t.themes.slice(0, 2).map((x) => themePhrase[x]).filter((x): x is string => Boolean(x));
  const an = [8, 11, 18].includes(t.days) ? "An" : "A";
  return {
    slug: t.slug, title: t.title, subtitle: t.subtitle, start: t.start, days: t.days, summary: t.summary, image: t.image, themes: t.themes, visits,
    blurb: `${an} ${t.days}-day private journey from ${t.start}${focus.length ? `, shaped around ${join(focus)}` : ""}.`,
  };
};

const MAX_VISITS = 4;

export function TourCard({ tour, sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw", priority = false }: { tour: TourCardData; sizes?: string; priority?: boolean }) {
  const theme = themeLabels[tour.themes[0] as keyof typeof themeLabels];
  const visits = tour.visits.length ? tour.visits : [tour.start];
  const extra = visits.length - MAX_VISITS;
  return (
    <article className="group surface relative flex h-full flex-col overflow-hidden transition-shadow duration-500 hover:shadow-[0_24px_50px_-24px_rgb(10_28_24/0.45)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Photo img={tour.image} sizes={sizes} priority={priority} className="transition-transform duration-[1400ms] ease-[var(--ease-lux)] group-hover:scale-[1.05]" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/35 via-transparent to-transparent" />
        {theme && <span className="eyebrow absolute left-3 top-3 bg-ink/85 px-3 py-1.5 !text-[0.66rem] text-white">{theme}</span>}
        <span className="num absolute right-3 top-3 bg-ink/85 px-3 py-1.5 text-[0.78rem] font-semibold text-white">{tour.days} days</span>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="line-clamp-2 !text-[1.55rem]">
          <Link href={`/tours/${tour.slug}`} className="after:absolute after:inset-0">{tour.title}</Link>
        </h3>
        <p className="mt-3 line-clamp-2 text-[0.95rem] text-ink-soft">{tour.blurb}</p>
        <p className="mt-4 text-[0.9rem] leading-relaxed text-ink-soft">
          <span className="eyebrow mr-2 !text-[0.66rem] text-gold-deep">Visits</span>
          {visits.slice(0, MAX_VISITS).join(" · ")}{extra > 0 && <span className="text-gold-deep"> · +{extra} more</span>}
        </p>
        <p className="num mt-3 border-t border-ink/15 pt-3 text-[0.8rem] text-ink-soft">
          {tour.days} days / {tour.days - 1} nights · from {tour.start}
        </p>
        <div className="relative z-10 mt-auto grid grid-cols-2 gap-3 pt-5">
          <Link href={`/tours/${tour.slug}`} className={buttonClass("primary", "!px-3")}>View tour</Link>
          <Link href={`/contact?tour=${tour.slug}`} className={buttonClass("outline", "!px-3")}>Get in touch</Link>
        </div>
      </div>
    </article>
  );
}
