// Catalogues source/photos and renders numbered contact sheets for curation.
// Usage: node scripts/catalog-photos.mjs <outDir>
import sharp from "sharp";
import { readdirSync, statSync, writeFileSync, mkdirSync } from "node:fs";
import { join, extname } from "node:path";

const root = "source/photos";
const out = process.argv[2];
mkdirSync(out, { recursive: true });
const files = [];
(function walk(d) {
  for (const n of readdirSync(d)) {
    const p = join(d, n);
    if (statSync(p).isDirectory()) walk(p);
    else if ([".jpg", ".jpeg", ".png"].includes(extname(n).toLowerCase())) files.push(p);
  }
})(root);

const rows = [];
for (const p of files) {
  try {
    const m = await sharp(p).metadata();
    rows.push({ path: p.replace(/\\/g, "/"), w: m.width, h: m.height, bytes: statSync(p).size });
  } catch { /* skip unreadable */ }
}
rows.forEach((r, i) => (r.id = i));
writeFileSync(join(out, "index.json"), JSON.stringify(rows, null, 1));

const usable = rows.filter((r) => r.w >= 1400 && r.w / r.h >= 1.25); // landscape, decent size
console.log(`total ${rows.length}, usable landscape >=1400px: ${usable.length}, portrait/small: ${rows.length - usable.length}`);
const dist = {};
for (const r of rows) { const k = r.w >= 3000 ? "3000+" : r.w >= 2000 ? "2000-2999" : r.w >= 1400 ? "1400-1999" : "<1400"; dist[k] = (dist[k] || 0) + 1; }
console.log(dist);

const COLS = 8, ROWS = 6, TW = 230, TH = 150, PER = COLS * ROWS;
for (let s = 0; s * PER < usable.length; s++) {
  const batch = usable.slice(s * PER, (s + 1) * PER);
  const comps = [];
  for (let i = 0; i < batch.length; i++) {
    const r = batch[i];
    const x = (i % COLS) * TW, y = Math.floor(i / COLS) * TH;
    const buf = await sharp(r.path).resize(TW - 4, TH - 4, { fit: "cover" }).jpeg({ quality: 60 }).toBuffer();
    comps.push({ input: buf, left: x + 2, top: y + 2 });
    const label = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="64" height="26"><rect width="64" height="26" fill="#000" opacity=".75"/><text x="6" y="19" font-size="18" font-family="Arial" font-weight="700" fill="#fff">${r.id}</text></svg>`);
    comps.push({ input: label, left: x + 2, top: y + 2 });
  }
  await sharp({ create: { width: COLS * TW, height: Math.ceil(batch.length / COLS) * TH, channels: 3, background: "#111" } })
    .composite(comps).jpeg({ quality: 70 }).toFile(join(out, `sheet-${String(s + 1).padStart(2, "0")}.jpg`));
}
console.log("sheets:", Math.ceil(usable.length / PER));
