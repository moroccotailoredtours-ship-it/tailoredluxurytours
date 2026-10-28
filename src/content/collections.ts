import { tours, experiences } from "./index";
import { themeLabels } from "./tours";
import { destinationTitles } from "./destination-titles";
import type { Tour } from "@/lib/types";

/**
 * Programmatic landing pages built only from the real itinerary catalogue.
 * A page exists only when enough itineraries match (MIN_TOURS), so none is thin, and every figure on it is computed, not typed.
 */
export type CollectionKind = "city" | "style" | "length" | "city-style";

export interface Collection {
  kind: CollectionKind;
  path: string;
  /** Short label used in titles, breadcrumbs and FAQ questions. */
  label: string;
  title: string;
  description: string;
  h1: string;
  intro: string[];
  tours: Tour[];
  faqs: { q: string; a: string }[];
  /** Links to sibling collections, for crawl paths and for visitors. */
  related: { label: string; path: string }[];
}

const MIN_TOURS = 3;

/** Title-case wording for page titles ("Mountain Tours", not "Mountains Tours"). */
const styleTitle: Record<string, string> = {
  desert: "Desert", imperial: "Imperial Cities", mountains: "Mountain", coast: "Coastal",
  luxury: "Luxury", family: "Family", wellness: "Wellness", food: "Food",
};

const cities = [...new Set(tours.map((t) => t.start))].sort();
const styleIds = (Object.keys(themeLabels) as (keyof typeof themeLabels)[]);
const styleExperience: Record<string, string> = { desert: "desert-journeys", imperial: "architecture-historic-cities", mountains: "mountains-nature", food: "food-traditions" };
const stylePhrase: Record<string, string> = {
  desert: "the Sahara and desert landscapes", imperial: "Morocco’s imperial cities", mountains: "the Atlas Mountains and mountain scenery",
  coast: "the Atlantic coast", luxury: "comfort and a refined pace", family: "travelling as a family", wellness: "wellness and rest", food: "food and Moroccan traditions",
};
export const lengthBuckets = [
  { id: "3-5-days", label: "3 to 5 days", titleLabel: "3 to 5 Day", test: (d: number) => d <= 5 },
  { id: "6-8-days", label: "6 to 8 days", titleLabel: "6 to 8 Day", test: (d: number) => d >= 6 && d <= 8 },
  { id: "9-plus-days", label: "9 days or more", titleLabel: "9+ Day", test: (d: number) => d >= 9 },
];

const list = (xs: string[]) => (xs.length > 1 ? `${xs.slice(0, -1).join(", ")} and ${xs.at(-1)}` : (xs[0] ?? ""));
const plural = (n: number, w: string) => `${n} ${w}${n === 1 ? "" : "s"}`;

function topPlaces(ts: Tour[], skip?: string, n = 4) {
  const count = new Map<string, number>();
  for (const t of ts) for (const s of t.destinations) {
    const name = destinationTitles[s];
    if (name && name !== skip) count.set(name, (count.get(name) ?? 0) + 1);
  }
  return [...count.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, n).map(([name]) => name);
}

function facts(ts: Tour[]) {
  const sorted = [...ts].sort((a, b) => a.days - b.days || a.title.localeCompare(b.title));
  const min = sorted[0]!;
  const max = sorted.at(-1)!;
  return { sorted, min, max, range: min.days === max.days ? `${min.days} days` : `${min.days} to ${max.days} days` };
}

function build(o: { kind: CollectionKind; path: string; label: string; ts: Tour[]; lead: string; h1: string; titleBase: string; extra?: string; skipPlace?: string }): Collection {
  const { sorted, min, max, range } = facts(o.ts);
  const places = topPlaces(o.ts, o.skipPlace);
  const intro = [
    `${o.lead} They run ${range}, from “${min.title}” (${min.days} days) to “${max.title}” (${max.days} days).`,
    ...(places.length ? [`Across these journeys, the places that appear most are ${list(places)}.`] : []),
    ...(o.extra ? [o.extra] : []),
    "Each itinerary is a starting point, not a fixed package. We adapt the route, pace and stops to your dates and interests, and agree prices and inclusions in a tailored proposal.",
  ];
  const nights = (t: Tour) => `${t.days} days / ${t.nights} nights`;
  return {
    kind: o.kind,
    path: o.path,
    label: o.label,
    title: `${o.titleBase}: ${o.ts.length} Private Itineraries`,
    description: `${plural(o.ts.length, "private itinerary")} for ${o.label.toLowerCase()}, ${range}. Adapted to your dates and pace, with prices agreed in a tailored proposal.`.slice(0, 158),
    h1: o.h1,
    intro,
    tours: sorted,
    faqs: [
      { q: `How many itineraries are there for ${o.label.toLowerCase()}?`, a: `We currently list ${plural(o.ts.length, "itinerary")} for ${o.label.toLowerCase()}, ranging from ${range}.` },
      { q: `What is the shortest and longest option?`, a: `The shortest is “${min.title}” (${nights(min)}, from ${min.start}) and the longest is “${max.title}” (${nights(max)}, from ${max.start}).` },
      { q: "Can I change one of these itineraries?", a: "Yes. They are starting points. Dates, route, pace and experiences are shaped around you, and nothing is booked or charged by sending an enquiry." },
    ],
    related: [],
  };
}

const all: Collection[] = [];

for (const c of cities) {
  const ts = tours.filter((t) => t.start === c);
  if (ts.length >= MIN_TOURS) all.push(build({ kind: "city", path: `/tours/from/${c.toLowerCase()}`, label: `journeys from ${c}`, ts, lead: `${plural(ts.length, "private itinerary")} start in ${c}.`, h1: `Private Morocco journeys from ${c}`, titleBase: `Morocco Tours from ${c}`, skipPlace: c }));
}

for (const id of styleIds) {
  const ts = tours.filter((t) => (t.themes as string[]).includes(id));
  if (ts.length < MIN_TOURS) continue;
  const exp = experiences.find((e) => e.slug === styleExperience[id]);
  all.push(build({ kind: "style", path: `/tours/style/${id}`, label: `${themeLabels[id].toLowerCase()} journeys`, ts, lead: `${ts.length} of our ${tours.length} itineraries are shaped around ${stylePhrase[id]}.`, h1: `${themeLabels[id]} journeys in Morocco`, titleBase: `${styleTitle[id]} Tours in Morocco`, extra: exp?.summary }));
}

for (const b of lengthBuckets) {
  const ts = tours.filter((t) => b.test(t.days));
  if (ts.length >= MIN_TOURS) all.push(build({ kind: "length", path: `/tours/length/${b.id}`, label: `${b.label} Morocco trips`, ts, lead: `${plural(ts.length, "private itinerary")} last ${b.label.toLowerCase()}.`, h1: `Morocco trips of ${b.label}`, titleBase: `${b.titleLabel} Morocco Tours` }));
}

for (const c of cities) for (const id of styleIds) {
  const ts = tours.filter((t) => t.start === c && (t.themes as string[]).includes(id));
  if (ts.length >= MIN_TOURS + 1) all.push(build({ kind: "city-style", path: `/tours/from/${c.toLowerCase()}/${id}`, label: `${themeLabels[id].toLowerCase()} journeys from ${c}`, ts, lead: `${ts.length} ${themeLabels[id].toLowerCase()} itineraries start in ${c}, shaped around ${stylePhrase[id]}.`, h1: `${themeLabels[id]} journeys from ${c}`, titleBase: `${styleTitle[id]} Tours from ${c}`, skipPlace: c }));
}

for (const c of all) {
  const siblings = all.filter((x) => x.kind === c.kind && x.path !== c.path);
  const parent = c.kind === "city-style" ? all.filter((x) => x.kind === "city" && c.path.startsWith(`${x.path}/`)) : [];
  c.related = [...parent, ...siblings].slice(0, 8).map((x) => ({ label: x.h1, path: x.path }));
}

export const collections = all;
export const getCollection = (path: string) => all.find((c) => c.path === path);
