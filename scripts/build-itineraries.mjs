// Converts the owner-supplied itinerary .docx files in source/itineraries into src/content/itineraries.generated.json.
// Only documents with sequential "Day N:" headings become tours. Day trips / marketing write-ups are skipped here.
// Usage: node scripts/build-itineraries.mjs
import AdmZip from "adm-zip";
import { readdirSync, statSync, writeFileSync } from "node:fs";
import { join, basename } from "node:path";

const root = "source/itineraries";
const START = { Casa: "Casablanca", Marrakech: "Marrakech", fez: "Fez" }; // "fes tours" duplicates "fez" and is ignored

const text = (file) => {
  const xml = new AdmZip(file).readAsText("word/document.xml");
  return xml
    .replace(/<\/w:p>/g, "\n").replace(/<w:tab\/>/g, " ").replace(/<w:br[^>]*\/>/g, "\n").replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'")
    .replace(/﻿/g, "").split("\n").map((l) => l.replace(/\s+/g, " ").trim());
};

const slugify = (s) => s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const has = (s, re) => re.test(s);
const STOP = /^(why |book |ready |contact |highlights|inclusions|what |tour highlights|itinerary for|about )/i;

const tours = [];
for (const dir of Object.keys(START)) {
  for (const name of readdirSync(join(root, dir)).sort()) {
    if (!name.endsWith(".docx")) continue;
    const lines = text(join(root, dir, name));
    const nonEmpty = lines.filter(Boolean);
    const dayIdx = [];
    nonEmpty.forEach((l, i) => { const m = l.match(/^Day\s+(\d+)\s*[:\-–]\s*(.+)$/i); if (m) dayIdx.push({ i, n: Number(m[1]), title: m[2].trim() }); });
    const sequential = dayIdx.length >= 3 && dayIdx.every((d, k) => d.n === k + 1);
    if (!sequential) { console.log("skip (not a multi-day itinerary):", dir + "/" + name); continue; }

    const rawTitle = nonEmpty[0];
    const dayCount = dayIdx.length;
    let main = rawTitle.replace(/\s*\(\d+\s*Days?,\s*\d+\s*Nights?\)/i, "");
    let sub = "";
    if (main.includes(":")) { [main, sub] = [main.split(":")[0].trim(), main.split(":").slice(1).join(":").trim()]; }
    main = main.replace(/^\d+\.\s*/, "").replace(/^Embark on an?\s+/i, "").replace(/^\d+-Day\s+/i, "");
    sub = sub.replace(/^A Multi-Day Tour from Fez$/i, "From Fez").replace(/^A\s+\d+-Day\s+/i, "").replace(/^A\s+\d+-Day Journey\s+/i, "");

    const days = dayIdx.map((d, k) => {
      const end = k + 1 < dayIdx.length ? dayIdx[k + 1].i : nonEmpty.length;
      const body = [];
      for (let j = d.i + 1; j < end; j++) {
        const l = nonEmpty[j];
        if (STOP.test(l) || (body.length && l.length < 70)) break;
        body.push(l);
      }
      return { day: d.n, title: d.title, body: body.join(" ") };
    });

    // Intro paragraph (some docs have one between the title and the first day)
    const introLines = nonEmpty.slice(1, dayIdx[0].i).filter((l) => l.length > 110 && !STOP.test(l));
    const intro = introLines[0] ?? "";

    const all = nonEmpty.join(" ");
    const start = START[dir];
    const destinations = [
      has(all, /Marrakech/i) && "marrakech", has(all, /\bFez\b|\bFes\b/i) && "fez",
      has(all, /Merzouga|Sahara|Erg Chebbi|Erg Chigaga|camel/i) && "sahara",
      has(all, /Atlas|Dades|Todra|Ait Ben ?Haddou|Ouarzazate/i) && "atlas-mountains",
      has(all, /Essaouira|Atlantic|Oualidia|Asilah|El Jadida|Agadir/i) && "atlantic-coast",
      has(all, /Casablanca/i) && "casablanca",
      has(all, /Chefchaouen/i) && "chefchaouen",
    ].filter(Boolean);
    const count = (re) => (all.match(new RegExp(re.source, "gi")) ?? []).length;
    const themes = [
      count(/Merzouga|Sahara|Erg Chebbi|camel/) >= 2 && "desert",
      count(/Meknes|Rabat|Volubilis|imperial/) >= 2 && "imperial",
      count(/Atlas|Dades|Todra|Ait Ben ?Haddou/) >= 2 && "mountains",
      count(/Essaouira|Atlantic|Oualidia|Asilah|El Jadida|Agadir/) >= 2 && "coast",
      (/luxur/i.test(rawTitle) || count(/luxur|five-star|private chef|VIP/) >= 3) && "luxury",
      (/family/i.test(rawTitle) || count(/family|families|children|kids/) >= 3) && "family",
      (/wellness/i.test(rawTitle) || count(/spa|wellness|yoga|massage/) >= 3) && "wellness",
      count(/cooking|culinary/) >= 2 && "food",
    ].filter(Boolean);

    tours.push({
      slug: `${slugify(main)}-${dayCount}-days-from-${slugify(start)}`,
      title: main, subtitle: sub, start, days: dayCount, nights: dayCount - 1,
      intro, itinerary: days, destinations, themes, source: `${dir}/${basename(name)}`,
    });
  }
}

// De-duplicate by slug (keep first), then sort: start city, then length
const seen = new Set();
const unique = tours.filter((t) => (seen.has(t.slug) ? (console.log("duplicate slug dropped:", t.slug), false) : seen.add(t.slug)));
unique.sort((a, b) => a.days - b.days || a.title.localeCompare(b.title));
writeFileSync("src/content/itineraries.generated.json", JSON.stringify(unique, null, 1));
console.log(`\n${unique.length} itineraries written`);
for (const t of unique) console.log(`${String(t.days).padStart(2)}d ${t.start.padEnd(10)} ${t.title}${t.subtitle ? " — " + t.subtitle : ""} [${t.themes.join(",")}] intro:${t.intro ? "y" : "n"}`);
