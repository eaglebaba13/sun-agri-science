import { api, withFallback } from "./client";

export interface InquiryPayload {
  type: "bulk" | "dealership";
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  gstOrLicense: string;
  state: string;
  city: string;
  products: string[];
  volume: string;
  message?: string;
}
export interface InquiryResult {
  id: string;
  status: "received";
}

const DEMO_KEY = "sas_demo_inquiries";

export const inquiriesApi = {
  submit: (data: InquiryPayload) =>
    withFallback(
      async () => (await api.post<InquiryResult>("/inquiries", data)).data,
      () => {
        const id = `SAS-${Date.now().toString(36).toUpperCase()}`;
        const list = JSON.parse(localStorage.getItem(DEMO_KEY) || "[]");
        list.unshift({ ...data, id, createdAt: new Date().toISOString() });
        localStorage.setItem(DEMO_KEY, JSON.stringify(list.slice(0, 50)));
        return { id, status: "received" as const };
      },
    ),
  list: () =>
    withFallback(
      async () => (await api.get<(InquiryPayload & { id: string; createdAt: string })[]>("/inquiries")).data,
      () => JSON.parse(localStorage.getItem(DEMO_KEY) || "[]") as (InquiryPayload & { id: string; createdAt: string })[],
    ),
};
