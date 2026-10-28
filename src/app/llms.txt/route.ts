import { articles, destinations, tours } from "@/content";
import { absoluteUrl, site } from "@/lib/site";

export const dynamic = "force-static";

/** Plain-text map of the site for AI assistants. Built from the same content as the pages, so it cannot drift. */
export function buildLlmsTxt(): string {
  const link = (title: string, path: string, note?: string) => `- [${title}](${absoluteUrl(path)})${note ? `: ${note}` : ""}`;
  return [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    "Itineraries are starting points that are adapted to each traveller. Prices, accommodation and inclusions are agreed in a tailored proposal and are not published on this site. Sending an enquiry does not book or charge anything.",
    "",
    "## Main pages",
    link("Morocco tours", "/tours", `${tours.length} day-by-day itineraries`),
    link("Destinations", "/destinations"),
    link("Travel journal", "/journal"),
    link("About us", "/about"),
    link("Design your journey (enquiry)", "/contact"),
    "",
    "## Destinations",
    ...destinations.map((d) => link(d.title, `/destinations/${d.slug}`, d.summary)),
    "",
    "## Planning guides",
    ...articles.map((a) => link(a.title, `/journal/${a.slug}`, a.excerpt)),
    "",
    "## Itineraries",
    ...tours.map((t) => link(`${t.title} (${t.days} days, from ${t.start})`, `/tours/${t.slug}`)),
    "",
  ].join("\n");
}

export function GET() {
  return new Response(buildLlmsTxt(), { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" } });
}
