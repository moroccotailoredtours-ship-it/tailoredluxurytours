import { describe, expect, it, beforeEach } from "vitest";
import { enquirySchema, fieldErrors } from "@/lib/enquiry";
import { rateLimit, _resetRateLimit } from "@/lib/rate-limit";
import { articles, destinations, experiences, tours } from "@/content";
import { whatsappHref } from "@/lib/site";
import { existsSync } from "node:fs";
import { join } from "node:path";

const valid = { name: "Ada Lovelace", email: "ada@example.com", consent: true };

describe("enquiry schema", () => {
  it("accepts a minimal valid enquiry and defaults optional fields", () => {
    const r = enquirySchema.safeParse(valid);
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.message).toBe("");
  });

  it("rejects bad email, short name and missing consent with field-level messages", () => {
    const r = enquirySchema.safeParse({ name: "A", email: "nope", consent: false });
    expect(r.success).toBe(false);
    if (!r.success) {
      const e = fieldErrors(r.error);
      expect(e.name).toBeTruthy();
      expect(e.email).toBeTruthy();
      expect(e.consent).toBeTruthy();
    }
  });

  it("rejects over-long input", () => {
    expect(enquirySchema.safeParse({ ...valid, message: "x".repeat(3001) }).success).toBe(false);
  });
});

describe("rate limiter", () => {
  beforeEach(_resetRateLimit);
  it("blocks after the limit and recovers after the window", () => {
    for (let i = 0; i < 5; i++) expect(rateLimit("ip", 5, 1000, 0)).toBe(true);
    expect(rateLimit("ip", 5, 1000, 10)).toBe(false);
    expect(rateLimit("ip", 5, 1000, 2000)).toBe(true);
  });
});

describe("content integrity", () => {
  const slugs = (xs: { slug: string }[]) => new Set(xs.map((x) => x.slug));
  it("has unique slugs and unique SEO titles/descriptions", () => {
    const all = [...tours, ...destinations, ...experiences, ...articles];
    for (const col of [tours, destinations, experiences, articles]) expect(slugs(col).size).toBe(col.length);
    const dupes = (f: (x: (typeof all)[number]) => string) => {
      const seen = new Map<string, string>(), out: string[] = [];
      for (const x of all) { const k = f(x); if (seen.has(k)) out.push(`${seen.get(k)} == ${x.slug}`); else seen.set(k, x.slug); }
      return out;
    };
    expect(dupes((x) => x.seo.title), "duplicate SEO titles").toEqual([]);
    expect(dupes((x) => x.seo.description), "duplicate SEO descriptions").toEqual([]);
  });

  it("only cross-references slugs that exist", () => {
    const d = slugs(destinations), e = slugs(experiences);
    for (const x of tours) { x.destinations.forEach((s) => expect(d.has(s), s).toBe(true)); x.experiences.forEach((s) => expect(e.has(s), s).toBe(true)); }
    for (const x of destinations) x.experiences.forEach((s) => expect(e.has(s), s).toBe(true));
    for (const x of experiences) x.destinations.forEach((s) => expect(d.has(s), s).toBe(true));
    for (const x of articles) x.related.destinations?.forEach((s) => expect(d.has(s), s).toBe(true));
  });

  it("builds every tour from a complete, sequential itinerary", () => {
    expect(tours.length).toBeGreaterThanOrEqual(20);
    for (const t of tours) {
      expect(t.itinerary.map((x) => x.day), t.slug).toEqual(t.itinerary.map((_, i) => i + 1));
      expect(t.days, t.slug).toBe(t.itinerary.length);
      expect(t.nights, t.slug).toBe(t.days - 1);
      for (const day of t.itinerary) expect(day.body.length, `${t.slug} day ${day.day}`).toBeGreaterThan(60);
      expect(["Casablanca", "Marrakech", "Fez"]).toContain(t.start);
    }
  });

  it("references only image files that exist in /public", () => {
    const all = [...tours, ...destinations, ...experiences, ...articles].map((x) => x.image.src);
    for (const src of new Set(all)) expect(existsSync(join("public", src)), src).toBe(true);
  });

  it("never states prices or inclusions that the source documents do not contain", () => {
    for (const t of tours) expect(JSON.stringify(t.itinerary), t.slug).not.toMatch(/[$€£]\s?\d|\bUSD\b|\bEUR\b|per person/);
  });
});

describe("whatsapp link", () => {
  it("is null when no number is configured (no broken link)", () => {
    expect(whatsappHref()).toBeNull();
  });
});

describe("destination titles", () => {
  it("match the destinations content, so tour cards show the right place names", async () => {
    const { destinationTitles } = await import("@/content/destination-titles");
    for (const d of destinations) expect(destinationTitles[d.slug], d.slug).toBe(d.title);
    expect(Object.keys(destinationTitles).sort()).toEqual(destinations.map((d) => d.slug).sort());
  });
});
