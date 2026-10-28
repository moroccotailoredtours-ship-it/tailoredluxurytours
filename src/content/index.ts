import { allTours } from "./tours";
import { destinations as allDestinations } from "./destinations";
import { experiences as allExperiences } from "./experiences";
import { articles as allArticles } from "./articles";

const pub = <T extends { status: string }>(xs: T[]) => xs.filter((x) => x.status === "published");

export const tours = pub(allTours);
export const destinations = pub(allDestinations);
export const experiences = pub(allExperiences);
export const articles = pub(allArticles).sort((a, b) => b.datePublished.localeCompare(a.datePublished));

const by = <T extends { slug: string }>(xs: T[]) => (slug: string) => xs.find((x) => x.slug === slug);
export const getTour = by(tours);
export const getDestination = by(destinations);
export const getExperience = by(experiences);
export const getArticle = by(articles);

export const pick = <T extends { slug: string }>(xs: T[], slugs: string[] = []) =>
  slugs.map((s) => xs.find((x) => x.slug === s)).filter((x): x is T => Boolean(x));

/** Tours whose route includes a destination, most relevant (start there) first, then shortest. */
export const toursForDestination = (slug: string, limit = 6) =>
  tours
    .filter((t) => t.destinations.includes(slug))
    .sort((a, b) => Number(b.start.toLowerCase() === slug) - Number(a.start.toLowerCase() === slug) || a.days - b.days)
    .slice(0, limit);

export const toursForExperience = (slug: string, limit = 6) =>
  tours.filter((t) => t.experiences.includes(slug)).sort((a, b) => a.days - b.days).slice(0, limit);

export const tourFacts = {
  count: tours.length,
  minDays: Math.min(...tours.map((t) => t.days)),
  maxDays: Math.max(...tours.map((t) => t.days)),
  starts: [...new Set(tours.map((t) => t.start))].sort(),
};

export const homeFaqs = [
  {
    q: "Does sending an enquiry confirm a booking?",
    a: "No. An enquiry opens a planning conversation. Nothing is reserved or charged until you've reviewed a tailored proposal and decided to confirm.",
  },
  {
    q: "Can I change the itineraries shown on this site?",
    a: "Yes. They are starting points, not fixed packages. Dates, route, pace and experiences are all shaped around you.",
  },
  {
    q: "How should I contact you?",
    a: "Use the enquiry form for the most complete picture of your plans. WhatsApp and email are also available when shown on the site.",
  },
];
