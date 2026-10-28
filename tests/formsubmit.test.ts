import { afterEach, describe, expect, it, vi } from "vitest";
import { sendEnquiry } from "@/lib/formsubmit";

const enquiry = { name: "Ada <b>Lovelace</b>", email: "ada@example.com", country: "", dates: "", travelers: "", destinations: "", interests: "", budget: "", message: "Hi\nthere", consent: true as const, website: "" };
const ok = () => new Response(JSON.stringify({ success: "true", message: "ok" }), { status: 200 });

afterEach(() => vi.unstubAllGlobals());

describe("sendEnquiry (FormSubmit, from the browser)", () => {
  it("posts the visitor's fields to the inbox and resolves true on confirmation", async () => {
    const fetchMock = vi.fn().mockResolvedValue(ok());
    vi.stubGlobal("fetch", fetchMock);
    await expect(sendEnquiry("inbox@example.com", enquiry)).resolves.toBe(true);
    expect(fetchMock.mock.calls[0]![0]).toBe("https://formsubmit.co/ajax/inbox%40example.com");
    const body = JSON.parse(fetchMock.mock.calls[0]![1].body);
    expect(body.email).toBe("ada@example.com");
    expect(body.Message).toBe("Hi\nthere");
    expect(body._captcha).toBe("false");
    expect(body.Country).toBeUndefined();
  });

  it("resolves false on an error status", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("err", { status: 500 })));
    await expect(sendEnquiry("inbox@example.com", enquiry)).resolves.toBe(false);
  });

  it("resolves false when FormSubmit answers 200 but not success (for example, not activated)", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: "false", message: "needs Activation" }), { status: 200 })));
    await expect(sendEnquiry("inbox@example.com", enquiry)).resolves.toBe(false);
  });

  it("resolves false when the network fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    await expect(sendEnquiry("inbox@example.com", enquiry)).resolves.toBe(false);
  });
});
