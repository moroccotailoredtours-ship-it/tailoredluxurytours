import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const enquiry = { name: "Ada <b>Lovelace</b>", email: "ada@example.com", country: "", dates: "", travelers: "", destinations: "", interests: "", budget: "", message: "Hi\nthere", consent: true as const, website: "" };

async function load() {
  vi.resetModules();
  return import("@/lib/email");
}

const ok = () => new Response(JSON.stringify({ success: "true", message: "ok" }), { status: 200 });

describe("sendEnquiryEmail (FormSubmit)", () => {
  beforeEach(() => {
    vi.stubEnv("CONTACT_EMAIL", "inbox@example.com");
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("resolves only when FormSubmit confirms, posts to the inbox and sends the visitor's fields", async () => {
    const fetchMock = vi.fn().mockResolvedValue(ok());
    vi.stubGlobal("fetch", fetchMock);
    const { sendEnquiryEmail } = await load();
    await expect(sendEnquiryEmail(enquiry)).resolves.toBeUndefined();
    expect(fetchMock.mock.calls[0]![0]).toBe("https://formsubmit.co/ajax/inbox%40example.com");
    const body = JSON.parse(fetchMock.mock.calls[0]![1].body);
    expect(body.email).toBe("ada@example.com");
    expect(body.Message).toBe("Hi\nthere");
    expect(body._captcha).toBe("false");
    expect(body.name).toBe("Ada <b>Lovelace</b>");
    expect(body.Country).toBeUndefined();
  });

  it("throws when FormSubmit answers with an error status", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("err", { status: 500 })));
    vi.spyOn(console, "error").mockImplementation(() => {});
    const { sendEnquiryEmail } = await load();
    await expect(sendEnquiryEmail(enquiry)).rejects.toThrow();
  });

  it("throws when the response is 200 but does not report success", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: "false" }), { status: 200 })));
    vi.spyOn(console, "error").mockImplementation(() => {});
    const { sendEnquiryEmail } = await load();
    await expect(sendEnquiryEmail(enquiry)).rejects.toThrow();
  });

  it("throws when no contact email is configured", async () => {
    vi.stubEnv("CONTACT_EMAIL", "");
    const { sendEnquiryEmail, emailConfig } = await load();
    expect(emailConfig()).toBeNull();
    await expect(sendEnquiryEmail(enquiry)).rejects.toThrow(/not configured/);
  });
});
