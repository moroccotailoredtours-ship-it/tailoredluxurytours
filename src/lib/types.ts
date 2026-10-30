export type Status = "published" | "draft";

export interface Img {
  src: string;
  alt: string;
  /** CSS object-position focal point, e.g. "50% 40%" */
  focal?: string;
  width: number;
  height: number;
}

export interface Seo {
  title: string;
  description: string;
}

export type Theme = "desert" | "imperial" | "mountains" | "coast" | "luxury" | "family" | "wellness" | "food";

export interface Tour {
  slug: string;
  status: Status;
  title: string;
  subtitle: string;
  /** City the journey starts in (Casablanca, Marrakech or Fez). */
  start: string;
  days: number;
  nights: number;
  summary: string;
  image: Img;
  intro: string;
  itinerary: ItineraryDay[];
  destinations: string[]; // destination slugs
  experiences: string[]; // experience slugs
  themes: Theme[];
  practical: string[];
  faqs: { q: string; a: string }[];
  seo: Seo;
}

/** Approximate driving leg: road km and driving minutes, no stops. */
export interface Drive {
  km: number;
  minutes: number;
}

/** Approximate driving leg: road km and driving minutes, no stops. */
export interface Drive {
  km: number;
  minutes: number;
}

export interface ItineraryDay {
  day: number;
  title: string;
  body: string;
  drive?: Drive;
}

export interface Destination {
  slug: string;
  status: Status;
  title: string;
  kicker: string;
  summary: string;
  image: Img;
  intro: string[];
  highlights: { title: string; body: string }[];
  practical: string[];
  bestFor: string[];
  experiences: string[];
  articles: string[];
  seo: Seo;
}

export interface Experience {
  slug: string;
  status: Status;
  title: string;
  summary: string;
  image: Img;
  intro: string[];
  whatItInvolves: string[];
  whoEnjoys: string[];
  considerations: string[];
  destinations: string[];
  seo: Seo;
}

export interface Article {
  slug: string;
  status: Status;
  title: string;
  excerpt: string;
  image: Img;
  datePublished: string; // ISO
  category: string;
  readingMinutes: number;
  body: ArticleBlock[];
  related: { destinations?: string[] };
  /** Claims the owner should verify before relying on them. */
  verify: string[];
  seo: Seo;
}

export type ArticleBlock =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };
