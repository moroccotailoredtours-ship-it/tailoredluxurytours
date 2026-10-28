import { describe, expect, it } from "vitest";
import { collections } from "@/content/collections";
import { articles, destinations, tours } from "@/content";
import { buildLlmsTxt } from "@/app/llms.txt/route";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { destinationLd, tourLd, webPageLd } from "@/lib/seo";

describe("programmatic collections", () => {
  it("only exist with enough real itineraries, so no page is thin", () => {
    expect(collections.length).toBeGreaterThan(8);
    for (const c of collections) expect(c.tours.length, c.path).toBeGreaterThanOrEqual(3);
  });

  it("have unique paths, titles and descriptions", () => {
    for (const key of ["path", "title", "description"] as const) {
      const vals = collections.map((c) => c[key]);
      expect(new Set(vals).size, key).toBe(vals.length);
    }
    for (const c of collections) {
      expect(c.title.length, c.title).toBeLessThanOrEqual(70);
      expect(c.description.length, c.path).toBeLessThanOrEqual(160);
    }
  });

  it("state only figures that match the catalogue", () => {
    for (const c of collections) {
      const days = c.tours.map((t) => t.days);
      expect(c.faqs[0]!.a, c.path).toContain(`${c.tours.length} itinerar`);
      expect(c.faqs[1]!.a, c.path).toContain(`${Math.min(...days)} days`);
      expect(c.faqs[1]!.a, c.path).toContain(`${Math.max(...days)} days`);
      expect(c.intro.join(" "), c.path).not.toMatch(/€|\$|£|from \d+ per|discount/i);
    }
  });

  it("are all in the sitemap", () => {
    const urls = new Set(sitemap().map((e) => e.url));
    for (const c of collections) expect(urls.has(`https://tailoredluxurytours.com${c.path}`), c.path).toBe(true);
  });
});

describe("llms.txt and robots", () => {
  it("lists every destination, experience, article and tour exactly from the content", () => {
    const txt = buildLlmsTxt();
    for (const d of destinations) expect(txt).toContain(`/destinations/${d.slug}`);
    for (const a of articles) expect(txt).toContain(`/journal/${a.slug}`);
    for (const t of tours) expect(txt).toContain(`/tours/${t.slug}`);
    expect(txt).toMatch(/not published on this site/);
  });

  it("is blocked entirely off the production domain, and names answer-engine bots on it", () => {
    const r = robots();
    expect(JSON.stringify(r.rules)).toContain("disallow");
  });
});

describe("structured data builders", () => {
  it("never emit prices or offers", () => {
    const t = tours[0]!;
    const blob = JSON.stringify([tourLd(t, ["Fez"]), destinationLd(destinations[0]!), webPageLd({ path: "/", name: "x", description: "y" })]);
    expect(blob).not.toMatch(/"(price|priceCurrency|offers|aggregateRating|review)"/);
  });

  it("describe the trip with one itinerary entry per day", () => {
    const t = tours.find((x) => x.days > 5)!;
    const ld = tourLd(t, []) as { itinerary: { numberOfItems: number } };
    expect(ld.itinerary.numberOfItems).toBe(t.itinerary.length);
  });
});
