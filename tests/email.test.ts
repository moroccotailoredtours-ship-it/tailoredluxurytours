import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const enquiry = { name: "Ada <b>Lovelace</b>", email: "ada@example.com", country: "", dates: "", travelers: "", destinations: "", interests: "", budget: "", message: "Hi\nthere", consent: true as const, website: "" };

async function load() {
  vi.resetModules();
  return import("@/lib/email");
}

describe("sendEnquiryEmail", () => {
  beforeEach(() => {
    vi.stubEnv("CONTACT_EMAIL", "inbox@example.com");
    vi.stubEnv("EMAIL_FROM", "TLT <enquiries@example.com>");
    vi.stubEnv("EMAIL_API_KEY", "re_test");
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("resolves only when the provider accepts, and escapes HTML in the body", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    const { sendEnquiryEmail } = await load();
    await expect(sendEnquiryEmail(enquiry)).resolves.toBeUndefined();
    const body = JSON.parse(fetchMock.mock.calls[0]![1].body);
    expect(body.to).toEqual(["inbox@example.com"]);
    expect(body.reply_to).toBe("ada@example.com");
    expect(body.html).not.toContain("<b>Lovelace");
    expect(body.html).toContain("&lt;b&gt;");
  });

  it("throws on provider failure so the API never reports false success", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("err", { status: 500 })));
    vi.spyOn(console, "error").mockImplementation(() => {});
    const { sendEnquiryEmail } = await load();
    await expect(sendEnquiryEmail(enquiry)).rejects.toThrow();
  });

  it("throws when not configured", async () => {
    vi.stubEnv("EMAIL_API_KEY", "");
    const { sendEnquiryEmail, emailConfig } = await load();
    expect(emailConfig()).toBeNull();
    await expect(sendEnquiryEmail(enquiry)).rejects.toThrow(/not configured/);
  });
});
