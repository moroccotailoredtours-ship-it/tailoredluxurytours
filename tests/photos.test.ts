import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import { images, photos, places, photosByPlace, socialImage } from "@/content/images";
import sitemap from "@/app/sitemap";

const onDisk = (p: string) => join("public", p);

describe("photo SEO", () => {
  it("publishes a large library across every place", () => {
    expect(photos.length).toBeGreaterThan(400);
    for (const key of Object.keys(places)) expect(photosByPlace(key).length, key).toBeGreaterThan(0);
    for (const p of photos) expect(places[p.place], `#${p.id}`).toBeDefined();
  });

  it("gives every photo unique, human-written alt text of sensible length", () => {
    const seen = new Set<string>();
    for (const p of photos) {
      expect(p.alt.length, `#${p.id} "${p.alt}"`).toBeGreaterThanOrEqual(20);
      expect(p.alt.length, `#${p.id} "${p.alt}"`).toBeLessThanOrEqual(125);
      expect(p.alt, `#${p.id}`).not.toMatch(/\b(image|picture|photo|photograph) of\b/i);
      expect(p.alt, `#${p.id}`).not.toMatch(/\.(jpe?g|png|webp)\b/i);
      expect(seen.has(p.alt.toLowerCase()), `duplicate alt: ${p.alt}`).toBe(false);
      seen.add(p.alt.toLowerCase());
    }
  });

  it("uses descriptive kebab-case file names, never camera or numeric names", () => {
    const names = new Set<string>();
    for (const p of photos) {
      expect(p.name, p.file).toMatch(/^[a-z0-9]+(-[a-z0-9]+){3,}$/);
      expect(p.name, p.file).not.toMatch(/^(img|dsc|pxl|photo|image|screenshot)[-_]?\d*/);
      expect(p.name, p.file).toMatch(/morocc|marrakech|fez|sahara|atlas|essaouira|casablanca|chefchaouen|rabat|tangier|agadir|volubilis|meknes|ifrane/);
      expect(names.has(p.name), `duplicate file name ${p.name}`).toBe(false);
      names.add(p.name);
    }
  });

  it("has every file on disk at its recorded size, with description metadata and no leftover GPS", async () => {
    for (const p of photos) {
      expect(existsSync(onDisk(p.file)), p.file).toBe(true);
      const m = await sharp(onDisk(p.file)).metadata();
      expect(m.width, p.file).toBe(p.width);
      expect(m.height, p.file).toBe(p.height);
      expect(m.exif, `${p.file} should carry our EXIF description`).toBeDefined();
      const exif = m.exif!.toString("latin1");
      expect(exif, p.file).toContain(p.alt.slice(0, 20));
      expect(exif, `${p.file} must not contain GPS data`).not.toMatch(/GPS|Make|Model/);
    }
  }, 120_000);

  it("provides a 1200x630 social image for every hero photo and gallery cover", async () => {
    const heroes = photos.filter((p) => p.hero);
    expect(heroes.length).toBeGreaterThan(30);
    for (const p of heroes) {
      expect(p.og, p.file).toBeTruthy();
      expect(existsSync(onDisk(p.og!)), p.og!).toBe(true);
      const m = await sharp(onDisk(p.og!)).metadata();
      expect([m.width, m.height]).toEqual([1200, 630]);
    }
    for (const key of Object.keys(places)) {
      const cover = photosByPlace(key).find((p) => p.hero) ?? photosByPlace(key)[0]!;
      expect(cover.og, key).toBeTruthy();
    }
  });

  it("resolves page images to social images with alt text, falling back to the default", () => {
    const s = socialImage(images.saharaCaravan.src);
    expect(s.url).toMatch(/^\/og\/.+\.jpg$/);
    expect(s.alt.length).toBeGreaterThan(10);
    expect(socialImage("/not-a-photo.jpg").url).toBe("/og-default.jpg");
  });

  it("lists every gallery page in the sitemap with its images", () => {
    const map = new Map(sitemap().map((e) => [e.url, e]));
    expect(map.has("https://tailoredluxurytours.com/gallery")).toBe(true);
    for (const key of Object.keys(places)) {
      const e = map.get(`https://tailoredluxurytours.com/gallery/${key}`);
      expect(e, key).toBeDefined();
      expect(e!.images?.length, key).toBe(photosByPlace(key).length);
      for (const u of e!.images ?? []) expect(u.startsWith("https://tailoredluxurytours.com/images/"), u).toBe(true);
    }
    for (const [url, e] of map) if (url.includes("/tours/")) expect(e.images?.length, url).toBeGreaterThan(0);
  });
});
