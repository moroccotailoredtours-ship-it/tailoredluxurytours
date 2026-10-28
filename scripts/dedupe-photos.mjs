// Clusters near-duplicate photos by perceptual hash (dHash) and writes a representative per cluster.
// Usage: node scripts/dedupe-photos.mjs <index.json> <out.json>
import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";

const rows = JSON.parse(readFileSync(process.argv[2], "utf8"));

async function dhash(path) {
  const { data } = await sharp(path).rotate().grayscale().resize(9, 8, { fit: "fill" }).raw().toBuffer({ resolveWithObject: true });
  let bits = "";
  for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) bits += data[y * 9 + x] > data[y * 9 + x + 1] ? "1" : "0";
  return bits;
}
const ham = (a, b) => { let d = 0; for (let i = 0; i < 64; i++) if (a[i] !== b[i]) d++; return d; };

for (const r of rows) { try { r.hash = await dhash(r.path); } catch { r.hash = null; } }
const ok = rows.filter((r) => r.hash);
const parent = new Map(ok.map((r) => [r.id, r.id]));
const find = (x) => { while (parent.get(x) !== x) { parent.set(x, parent.get(parent.get(x))); x = parent.get(x); } return x; };
for (let i = 0; i < ok.length; i++) for (let j = i + 1; j < ok.length; j++) if (ham(ok[i].hash, ok[j].hash) <= 5) parent.set(find(ok[j].id), find(ok[i].id));

const clusters = new Map();
for (const r of ok) { const k = find(r.id); (clusters.get(k) ?? clusters.set(k, []).get(k)).push(r); }
const out = [];
for (const members of clusters.values()) {
  members.sort((a, b) => b.w * b.h - a.w * a.h);
  out.push({ rep: members[0].id, members: members.map((m) => m.id), size: members.length });
}
out.sort((a, b) => a.rep - b.rep);
writeFileSync(process.argv[3], JSON.stringify({ total: rows.length, unreadable: rows.length - ok.length, clusters: out }, null, 1));
console.log(`files ${rows.length}, unreadable ${rows.length - ok.length}, unique pictures ${out.length}, duplicates removed ${ok.length - out.length}`);
console.log("largest clusters:", out.filter((c) => c.size > 1).sort((a, b) => b.size - a.size).slice(0, 8).map((c) => `${c.rep}x${c.size}`).join(" "));
