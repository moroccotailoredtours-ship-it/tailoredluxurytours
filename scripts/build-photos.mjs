// Builds every published photo from source/photos using scripts/photo-manifest.mjs.
//   - SEO file names derived from alt text (descriptive kebab-case, no camera names like IMG_1234)
//   - hero-grade ("*") images: 2560px JPEG in public/images/    ; the rest: <=1600px WebP in public/images/gallery/<place>/
//   - 1200x630 social-sharing JPEGs in public/og/ for hero images and each gallery cover
//   - EXIF: description, artist, copyright written; ALL original metadata (including GPS location) is stripped
//   - src/content/photos.generated.json drives the site
// Usage: node scripts/build-photos.mjs
import sharp from "sharp";
import { readFileSync, writeFileSync, mkdirSync, rmSync, statSync } from "node:fs";
import { places, entries } from "./photo-manifest.mjs";

const OWNER = "Tailored Luxury Tours";
const index = new Map(JSON.parse(readFileSync("source/photo-index.json", "utf8")).map((r) => [r.id, r]));
const clusters = JSON.parse(readFileSync("source/photo-clusters.json", "utf8")).clusters;
const clusterOf = new Map();
for (const c of clusters) for (const m of c.members) clusterOf.set(m, c);

const STOP = new Set(["a", "an", "the", "of", "at", "in", "on", "over", "by", "to", "with", "and", "for", "from", "into", "its", "their", "beside", "beneath", "above", "under", "across", "toward", "while"]);
const slug = (s) => s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, " ").trim();

const parsed = entries.trim().split("\n").map((line, n) => {
  const m = line.match(/^(\*?)(\d+)\|([a-z]+)\|(.+)$/);
  if (!m) throw new Error(`manifest line ${n + 1} is malformed: ${line}`);
  return { hero: m[1] === "*", id: Number(m[2]), place: m[3], alt: m[4].trim() };
});

// ---- validation ----
const problems = [];
const seenIds = new Set(), seenAlt = new Set();
for (const e of parsed) {
  if (!places[e.place]) problems.push(`#${e.id}: unknown place ${e.place}`);
  if (!index.has(e.id)) problems.push(`#${e.id}: not in photo index`);
  if (seenIds.has(e.id)) problems.push(`#${e.id}: listed twice`);
  seenIds.add(e.id);
  if (seenAlt.has(e.alt.toLowerCase())) problems.push(`#${e.id}: duplicate alt "${e.alt}"`);
  seenAlt.add(e.alt.toLowerCase());
  if (e.alt.length < 20 || e.alt.length > 125) problems.push(`#${e.id}: alt length ${e.alt.length}`);
  if (/\b(image|picture|photo|photograph) of\b/i.test(e.alt)) problems.push(`#${e.id}: alt starts with filler`);
}
for (const e of parsed) {
  const c = clusterOf.get(e.id);
  if (c && c.size > 1) for (const m of c.members) if (m !== e.id && seenIds.has(m)) problems.push(`#${e.id} and #${m} are near-duplicates, list only one`);
}
if (problems.length) { console.error(problems.join("\n")); process.exit(1); }

// ---- file names ----
const usedNames = new Map();
for (const e of parsed) {
  const words = slug(e.alt).split(" ").filter((w) => !STOP.has(w));
  let base = words.slice(0, 9).join("-");
  if (!/morocc/.test(base) && !words.includes("morocco")) base += "-morocco";
  const n = (usedNames.get(base) ?? 0) + 1;
  usedNames.set(base, n);
  e.name = n === 1 ? base : `${base}-${n}`;
}

// ---- export ----
for (const d of ["public/images", "public/og"]) { rmSync(d, { recursive: true, force: true }); mkdirSync(d, { recursive: true }); }
const exif = (alt) => ({ IFD0: { ImageDescription: alt.replace(/[^\x20-\x7e]/g, ""), Artist: OWNER, Copyright: `(c) ${OWNER}` } });
const ogDone = new Set();
const out = [];
let bytes = 0;

const placeFirst = new Map();
for (const e of parsed) if (!placeFirst.has(e.place) || (e.hero && !placeFirst.get(e.place).hero)) placeFirst.set(e.place, e);

for (const e of parsed) {
  const src = index.get(e.id).path;
  const base = sharp(src).rotate();
  let file, info;
  if (e.hero) {
    file = `/images/${e.name}.jpg`;
    ({ info } = await base.clone().resize({ width: 2560, withoutEnlargement: true }).withExif(exif(e.alt)).jpeg({ quality: 80, mozjpeg: true }).toFile(`public${file}`).then((i) => ({ info: i })));
  } else {
    mkdirSync(`public/images/gallery/${e.place}`, { recursive: true });
    file = `/images/gallery/${e.place}/${e.name}.webp`;
    ({ info } = await base.clone().resize({ width: 1600, withoutEnlargement: true }).withExif(exif(e.alt)).webp({ quality: 74, effort: 5 }).toFile(`public${file}`).then((i) => ({ info: i })));
  }
  bytes += statSync(`public${file}`).size;
  let og = null;
  if (e.hero || placeFirst.get(e.place) === e) {
    og = `/og/${e.name}.jpg`;
    if (!ogDone.has(og)) {
      await base.clone().resize(1200, 630, { fit: "cover", position: sharp.strategy.attention }).jpeg({ quality: 78, mozjpeg: true }).toFile(`public${og}`);
      ogDone.add(og);
    }
  }
  out.push({ id: e.id, place: e.place, alt: e.alt, name: e.name, file, width: info.width, height: info.height, hero: e.hero, og });
}

writeFileSync("src/content/photos.generated.json", JSON.stringify({ places, photos: out }, null, 1));
const byPlace = {};
for (const p of out) byPlace[p.place] = (byPlace[p.place] ?? 0) + 1;
console.log(`published ${out.length} photos (${parsed.filter((p) => p.hero).length} hero-grade), ${ogDone.size} social images`);
console.log("per place:", JSON.stringify(byPlace));
console.log(`image payload on disk: ${(bytes / 1048576).toFixed(1)} MB`);
console.log(`not published: ${index.size - out.length} of ${index.size} source files (duplicates, selfies/crowds, film-set, low-value)`);
