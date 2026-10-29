import { describe, expect, it } from "vitest";
import { validateInquiry } from "@/routes/inquiry";

const ok = { type: "bulk" as const, companyName: "Kisan Agro", contactPerson: "Ram", phone: "9828570280", email: "a@b.in", gstOrLicense: "08ABCDE1234F1Z5", state: "Rajasthan", city: "Jaipur", products: ["Sulphur 80% WDG"], volume: "1 – 5 MT" };

describe("inquiry validation", () => {
  it("accepts a complete inquiry", () => expect(validateInquiry(ok)).toEqual({}));
  it("requires at least one product", () => expect(validateInquiry({ ...ok, products: [] }).products).toBeDefined());
  it("rejects an invalid mobile number", () => expect(validateInquiry({ ...ok, phone: "12345" }).phone).toBeDefined());
  it("requires GST or licence number", () => expect(validateInquiry({ ...ok, gstOrLicense: "" }).gstOrLicense).toBeDefined());
});
