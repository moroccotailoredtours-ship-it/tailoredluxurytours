// Submits every sitemap URL to IndexNow (Bing, Yandex, Naver, Seznam and others; Google does not use IndexNow).
// Run manually AFTER deploying: INDEXNOW_KEY=yourkey node scripts/indexnow.mjs
const host = "tailoredluxurytours.com";
const key = process.env.INDEXNOW_KEY;
if (!key) { console.error("Set INDEXNOW_KEY first."); process.exit(1); }
const xml = await (await fetch(`https://${host}/sitemap.xml`)).text();
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation: `https://${host}/indexnow-key.txt`, urlList }),
});
console.log(res.status, res.statusText, `${urlList.length} URLs`);
