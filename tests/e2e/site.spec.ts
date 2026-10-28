import { expect, test, type Page } from "@playwright/test";

const widths = [320, 390, 768, 1280, 1920, 2560];
const routes = ["/", "/tours", "/tours/marrakech-and-desert-adventure-5-days-from-marrakech", "/destinations", "/destinations/sahara", "/gallery", "/gallery/sahara", "/journal", "/journal/when-to-visit-morocco", "/about", "/contact", "/privacy", "/terms"];

function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("response", (r) => r.status() >= 400 && errors.push(`${r.status()} ${r.url()}`));
  return errors;
}

test("every route renders one H1, has a canonical, and logs no errors", async ({ page }) => {
  test.setTimeout(120_000);
  // Vercel Analytics and Speed Insights scripts only exist on Vercel's servers.
  await page.route("**/_vercel/**", (r) => r.fulfill({ contentType: "application/javascript", body: "" }));
  const errors = collectErrors(page);
  for (const path of routes) {
    await page.goto(path, { waitUntil: "networkidle" });
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://tailoredluxurytours.com${path === "/" ? "" : path}`);
  }
  expect(errors).toEqual([]);
});

for (const width of widths) {
  test(`no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ["/", "/tours/marrakech-and-desert-adventure-5-days-from-marrakech", "/contact", "/destinations", "/gallery/fez"]) {
      await page.goto(path, { waitUntil: "networkidle" });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, `${path} @${width}`).toBeLessThanOrEqual(0);
    }
  });
}

test("hero slider: manual controls, keyboard and pause", async ({ page }) => {
  await page.goto("/");
  const dots = page.getByRole("group", { name: "Choose slide" }).getByRole("button");
  await expect(dots).toHaveCount(4);
  await expect(dots.first()).toHaveAttribute("aria-current", "true");
  await page.getByRole("button", { name: "Next slide" }).click();
  await expect(dots.nth(1)).toHaveAttribute("aria-current", "true");
  await page.getByRole("button", { name: "Previous slide" }).click();
  await expect(dots.first()).toHaveAttribute("aria-current", "true");
  await dots.nth(2).click();
  await page.keyboard.press("ArrowRight");
  await expect(dots.nth(3)).toHaveAttribute("aria-current", "true");
});

test("hero slider respects reduced motion (no autoplay)", async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto("/");
  await page.waitForTimeout(5500);
  await expect(page.getByRole("button", { name: "Play slideshow" })).toBeVisible();
  await ctx.close();
});

test("mobile journey: menu → tour → enquiry prefilled", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  const menu = page.getByRole("dialog", { name: "Menu" });
  await expect(menu).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();
  await page.getByRole("button", { name: "Open menu" }).click();
  await menu.getByRole("link", { name: "Morocco Tours" }).click();
  await expect(page).toHaveURL(/\/tours$/);
  await expect(menu).toBeHidden();
  await page.locator("article h3 a").first().click();
  await expect(page).toHaveURL(/\/tours\/.+/);
  await page.getByRole("link", { name: "Enquire about this journey" }).click();
  await expect(page).toHaveURL(/\/contact\?tour=/);
  await expect(page.getByLabel(/Anything else/)).toHaveValue(/itinerary \(\d+ days from/);
});

test("WhatsApp CTA only appears when a number is configured, and links to wa.me", async ({ page }) => {
  await page.goto("/contact");
  const links = page.locator('a[href^="https://wa.me/"]');
  if (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || (await links.count()) > 0) {
    await expect(links.first()).toHaveAttribute("href", /^https:\/\/wa\.me\/\d{8,15}\?text=/);
  } else {
    await expect(page.getByRole("link", { name: /WhatsApp/i })).toHaveCount(0);
  }
});

test.describe("enquiry form", () => {
  test("shows validation errors and moves focus", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: "Send my enquiry" }).click();
    await expect(page.getByText("Please tell us your name.")).toBeVisible();
    await expect(page.getByText("Please enter a valid email address.")).toBeVisible();
    await expect(page.getByLabel("Full name")).toBeFocused();
    await expect(page.locator("#form-status")).toContainText("check the highlighted fields");
  });

  async function fill(page: Page) {
    await page.goto("/contact");
    await page.waitForTimeout(2800); // clears the minimum-fill-time spam check
    await page.getByLabel("Full name").fill("Ada Lovelace");
    await page.getByLabel("Email", { exact: true }).fill("ada@example.com");
    await page.getByRole("checkbox").check();
  }

  test("does NOT show success when FormSubmit refuses (for example, not activated)", async ({ page }) => {
    // Stubbed so the test never sends a real enquiry through the email provider.
    await page.route("**/formsubmit.co/**", (r) => r.fulfill({ json: { success: "false", message: "This form needs Activation." } }));
    await fill(page);
    await page.getByRole("button", { name: "Send my enquiry" }).click();
    await expect(page.locator("#form-status")).toContainText("couldn't send");
    await expect(page.getByText("Your enquiry has been sent")).toHaveCount(0);
  });

  test("shows success only after the server accepts", async ({ page }) => {
    await page.route("**/formsubmit.co/**", (r) => r.fulfill({ json: { success: "true", message: "ok" } }));
    await fill(page);
    await page.getByRole("button", { name: "Send my enquiry" }).click();
    await expect(page.getByRole("status")).toContainText("Your enquiry has been sent");
  });

  test("shows a failure message when delivery fails", async ({ page }) => {
    await page.route("**/formsubmit.co/**", (r) => r.fulfill({ status: 500, json: { success: "false" } }));
    await fill(page);
    await page.getByRole("button", { name: "Send my enquiry" }).click();
    await expect(page.locator("#form-status")).toContainText("couldn't send");
  });
});

test("unknown URL returns a branded 404", async ({ page }) => {
  const res = await page.goto("/definitely-not-here");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("leads nowhere");
});

test("tour explorer: filters narrow results, deep-link from URL, and reset", async ({ page }) => {
  await page.goto("/tours");
  const count = async () => Number((await page.getByRole("status").first().innerText()).match(/\d+/)![0]);
  const all = await count();
  expect(all).toBeGreaterThanOrEqual(20);
  await page.getByRole("group", { name: "Starting in" }).getByRole("button", { name: "Fez" }).click();
  const fez = await count();
  expect(fez).toBeGreaterThan(0);
  expect(fez).toBeLessThan(all);
  for (const t of await page.locator("article").allInnerTexts()) expect(t).toContain("from Fez");
  await expect(page).toHaveURL(/start=Fez/);
  await page.getByRole("group", { name: "Length" }).getByRole("button", { name: "9+ days" }).click();
  expect(await count()).toBeLessThan(fez);
  await page.getByRole("button", { name: "Reset" }).click();
  expect(await count()).toBe(all);

  await page.goto("/tours?start=Casablanca&length=short");
  await expect(page.getByRole("group", { name: "Starting in" }).getByRole("button", { name: "Casablanca" })).toHaveAttribute("aria-pressed", "true");
});

test("tour page: every itinerary day is always open, sub-nav appears after scrolling", async ({ page }) => {
  await page.goto("/tours/marrakech-and-desert-adventure-5-days-from-marrakech");
  await expect(page.getByRole("button", { name: /Day 3/ })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Collapse all" })).toHaveCount(0);
  const day3 = page.locator("li", { has: page.getByRole("heading", { name: /Day 3/ }) }).first();
  await expect(day3).toContainText("Merzouga");
  await expect(day3.locator("p")).toBeVisible();
  await page.evaluate(() => window.scrollTo(0, 1400));
  await expect(page.getByRole("navigation", { name: "On this page" })).toBeVisible();
});

test("mobile tab bar navigates, marks the current tab and is hidden on desktop", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/tours");
  const bar = page.getByRole("navigation", { name: "App navigation" });
  await expect(bar).toBeVisible();
  await expect(bar.getByRole("link", { name: "Tours" })).toHaveAttribute("aria-current", "page");
  await bar.getByRole("link", { name: "Gallery" }).click();
  await expect(page).toHaveURL(/\/gallery$/);
  await expect(bar.getByRole("link", { name: "Gallery" })).toHaveAttribute("aria-current", "page");
  await bar.getByRole("link", { name: "Enquire" }).click();
  await expect(page).toHaveURL(/\/contact$/);
  await page.setViewportSize({ width: 1280, height: 800 });
  await expect(bar).toBeHidden();
});

test("manifest is served for add-to-home-screen", async ({ request }) => {
  const m = await (await request.get("/manifest.webmanifest")).json();
  expect(m.display).toBe("standalone");
  expect(m.icons[0].src).toBe("/logo/icon-512.png");
});

test("gallery: index lists places, place page shows alt-texted photos and an accessible lightbox", async ({ page }) => {
  await page.goto("/gallery");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Morocco in pictures");
  await page.getByRole("link", { name: /^The Sahara|Sahara/ }).first().click();
  await expect(page).toHaveURL(/\/gallery\/sahara/);
  const imgs = page.locator("ul img");
  expect(await imgs.count()).toBeGreaterThan(40);
  for (const alt of await imgs.evaluateAll((els) => els.slice(0, 20).map((e) => e.getAttribute("alt") ?? ""))) expect(alt.length).toBeGreaterThan(20);

  const first = page.getByRole("button", { name: /^Enlarge:/ }).first();
  await first.click();
  const dialog = page.getByRole("dialog", { name: /photo viewer/ });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText("1 /")).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(dialog.getByText("2 /")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(first).toBeFocused();
});

test("structured data and social images are present on gallery and tour pages", async ({ page }) => {
  await page.goto("/gallery/chefchaouen");
  const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
  const gallery = ld.map((t) => JSON.parse(t)).find((j) => j["@type"] === "ImageGallery");
  expect(gallery.hasPart.length).toBeGreaterThan(10);
  expect(gallery.hasPart[0]["@type"]).toBe("ImageObject");
  expect(gallery.hasPart[0].contentUrl).toMatch(/^https:\/\/tailoredluxurytours\.com\/images\//);
  const og = await page.locator('meta[property="og:image"]').first().getAttribute("content");
  expect(og).toMatch(/\/og\/.+\.jpg$/);
  expect(await page.locator('meta[property="og:image:alt"]').first().getAttribute("content")).toBeTruthy();
  expect((await page.request.get(og!.replace("https://tailoredluxurytours.com", ""))).status()).toBe(200);
});

test("sitemap exposes images", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  expect(xml).toContain("xmlns:image");
  expect(xml).toContain("<image:loc>https://tailoredluxurytours.com/images/gallery/sahara/");
  expect((xml.match(/<url>/g) ?? []).length).toBeGreaterThan(60);
});
