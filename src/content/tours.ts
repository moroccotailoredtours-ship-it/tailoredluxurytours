import type { Img, Tour, Theme } from "@/lib/types";
import { images } from "./images";
import { driveFor } from "./drives";
import generated from "./itineraries.generated.json";

/**
 * Tours are built from the owner-supplied itinerary documents (source/itineraries) via
 * `node scripts/build-itineraries.mjs`, which writes itineraries.generated.json. Do not hand-edit that file;
 * edit the .docx and regenerate. Durations and day-by-day plans are the owner's. Prices, inclusions and
 * accommodation names are NOT in the documents, so none are shown: they're agreed in the tailored proposal.
 */
interface Raw {
  slug: string;
  title: string;
  subtitle: string;
  start: string;
  days: number;
  nights: number;
  intro: string;
  itinerary: { day: number; title: string; body: string }[];
  destinations: string[];
  themes: Theme[];
}

const pools: Record<string, Img[]> = {
  desert: [images.saharaCaravan, images.saharaGolden, images.saharaTrek, images.desertCamp, images.saharaDune, images.dunesTravellers],
  imperial: [images.fezTanneries, images.fezRooftops, images.fezMadrasa, images.fezGate, images.volubilis, images.bahia],
  mountains: [images.atlasValley, images.aitBenhaddou, images.kasbahRiver, images.palmKasbah, images.atlasRoad, images.atlasCanyon],
  coast: [images.essaouiraCoast, images.essaouiraPort, images.blueBoats, images.beach],
  marrakech: [images.koutoubia, images.lanterns, images.marrakechWall, images.bahia],
  casablanca: [images.hassanII, images.hassanArches],
};
const cursor: Record<string, number> = {};
const next = (pool: string) => {
  const list = pools[pool]!;
  const i = (cursor[pool] = (cursor[pool] ?? -1) + 1);
  return list[i % list.length]!;
};

/** Tours whose cover was chosen by hand instead of rotating through the theme pool. */
const coverOverrides: Record<string, Img> = {
  "morocco-imperial-cities-tour-7-days-from-casablanca": images.bahia,
};

function coverFor(t: Raw): Img {
  const title = t.title.toLowerCase();
  if (/family/.test(title)) return images.camel;
  if (/luxury/.test(title)) return images.desertCamp;
  if (/coast/.test(title)) return next("coast");
  if (/marrakech city|culture and wellness/.test(title)) return next("marrakech");
  if (/imperial|royal|authentic|cultural/.test(title)) return next("imperial");
  if (t.themes.includes("desert")) return next("desert");
  if (t.themes.includes("mountains")) return next("mountains");
  return t.start === "Casablanca" ? next("casablanca") : next("marrakech");
}

const names: Record<string, string> = {
  marrakech: "Marrakech", fez: "Fez", sahara: "the Sahara", "atlas-mountains": "the Atlas Mountains",
  "atlantic-coast": "the Atlantic coast", casablanca: "Casablanca", chefchaouen: "Chefchaouen",
};
const list = (xs: string[]) => (xs.length > 1 ? `${xs.slice(0, -1).join(", ")} and ${xs.at(-1)}` : (xs[0] ?? ""));

const expFor = (themes: Theme[]) => {
  const e = new Set(["culture-heritage"]);
  if (themes.includes("desert")) e.add("desert-journeys");
  if (themes.includes("imperial")) e.add("architecture-historic-cities");
  if (themes.includes("mountains")) { e.add("mountains-nature"); e.add("scenic-road-journeys"); }
  if (themes.includes("food")) e.add("food-traditions");
  return [...e];
};

const firstSentence = (s: string) => (s.match(/^.*?[.!?](\s|$)/)?.[0] ?? s).trim();
const clip = (s: string, n: number) => (s.length <= n ? s : `${s.slice(0, n - 1).replace(/\s+\S*$/, "")}…`);

/** Search title: name, length and start city, kept short enough to show in full in results. */
const seoTitle = (title: string, days: number, start: string) => {
  const full = `${title}: ${days}-Day Private Tour from ${start}`;
  return full.length <= 62 ? full : `${title}: ${days} Days from ${start}`;
};

export const allTours: Tour[] = (generated as Raw[]).map((t) => {
  const places = t.destinations.filter((d) => d !== "casablanca" || t.start === "Casablanca").map((d) => names[d] ?? d);
  const summary = t.intro
    ? clip(firstSentence(t.intro), 170)
    : `A ${t.days}-day private journey from ${t.start} through ${list(places.filter((p) => p !== t.start).slice(0, 4))}.`;
  const heading = t.subtitle ? `${t.title}: ${t.subtitle}` : t.title;
  return {
    slug: t.slug,
    status: "published",
    title: t.title,
    subtitle: t.subtitle,
    start: t.start,
    days: t.days,
    nights: t.nights,
    summary,
    image: coverOverrides[t.slug] ?? coverFor(t),
    intro: t.intro || `This ${t.days}-day itinerary begins in ${t.start} and moves through ${list(places.slice(0, 5))}. Treat it as a starting point: dates, pace and stops can all be adjusted around you.`,
    itinerary: t.itinerary.map((day) => ({ ...day, drive: driveFor(t.slug, day.day, day.title) })),
    destinations: t.destinations,
    experiences: expFor(t.themes),
    themes: t.themes,
    practical: [
      "This day-by-day plan is a starting template and can be adjusted to your dates, interests and pace.",
      "Some days involve long drives. We talk through the pacing with you before you decide.",
      ...(t.themes.includes("desert") ? ["Desert nights can be cold in winter and very hot in summer. We advise on timing when we plan your dates."] : []),
      "Prices, accommodation and inclusions are agreed in your tailored proposal.",
    ],
    faqs: [
      { q: "Is this itinerary fixed?", a: "No. It's a starting point. We adjust the route, length, pace and experiences to suit your dates and interests before anything is proposed." },
      { q: "Does sending an enquiry confirm a booking?", a: "No. An enquiry starts a conversation. Nothing is reserved or charged until you've reviewed a tailored proposal and chosen to confirm." },
      { q: "What do prices and inclusions look like?", a: "They depend on your dates, group size and choices, so they're set out in your proposal rather than listed here." },
    ],
    seo: {
      title: seoTitle(t.title, t.days, t.start),
      description: clip(`${heading}: ${t.days} days, ${t.nights} nights from ${t.start}. ${summary} Enquire to tailor it.`, 158),
    },
  };
});

export const themeLabels: Record<Theme, string> = {
  desert: "Desert", imperial: "Imperial cities", mountains: "Mountains", coast: "Coast",
  luxury: "Luxury", family: "Family", wellness: "Wellness", food: "Food",
};
