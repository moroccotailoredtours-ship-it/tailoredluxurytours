import type { MetadataRoute } from "next";
import { absoluteUrl, isIndexable } from "@/lib/site";

/** Crawlers that fetch pages to answer questions or power AI search. Allowed explicitly so the policy is visible. */
const answerEngineBots = ["OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "Perplexity-User", "Claude-SearchBot", "Claude-User", "Applebot", "Googlebot", "Bingbot"];

export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: [
      { userAgent: answerEngineBots, allow: "/", disallow: ["/api/"] },
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
