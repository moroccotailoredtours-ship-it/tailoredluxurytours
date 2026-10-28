import { site } from "@/lib/site";

export const dynamic = "force-static";

/** IndexNow ownership file. Empty (404) until INDEXNOW_KEY is set. */
export function GET() {
  if (!site.indexNowKey) return new Response("Not found", { status: 404 });
  return new Response(site.indexNowKey, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
