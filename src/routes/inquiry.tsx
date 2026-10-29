import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { inquiriesApi, type InquiryPayload } from "@/api/inquiries";
import { PRODUCTS } from "@/data/catalog";

export const Route = createFileRoute("/inquiry")({
  validateSearch: (s: Record<string, unknown>): { product?: string | undefined } => ({ product: typeof s["product"] === "string" ? s["product"] : undefined }),
  head: () => ({
    meta: [
      { title: "Dealer & Bulk Inquiry | Sun Agri Science" },
      { name: "description", content: "Apply for a Sun Agri Science dealership or ask for bulk prices on sulphur and agrochemical products." },
      { property: "og:title", content: "Dealer & Bulk Inquiry | Sun Agri Science" },
      { property: "og:description", content: "Become a Sun Agri Science dealer or place a bulk order." },
    ],
  }),
  component: Inquiry,
});

const STATES = ["Rajasthan", "Maharashtra", "Gujarat", "Madhya Pradesh", "Uttar Pradesh", "West Bengal", "Punjab", "Haryana", "Karnataka", "Andhra Pradesh", "Telangana", "Tamil Nadu", "Bihar", "Other"];
const VOLUMES = ["Under 1 MT", "1 – 5 MT", "5 – 25 MT", "25 – 100 MT", "100+ MT"];
type Errors = Partial<Record<keyof InquiryPayload, string>>;

export function validateInquiry(f: InquiryPayload): Errors {
  const e: Errors = {};
  if (f.companyName.trim().length < 2) e.companyName = "Enter your company or shop name";
  if (f.contactPerson.trim().length < 2) e.contactPerson = "Enter a contact name";
  if (!/^[6-9]\d{9}$/.test(f.phone.replace(/\D/g, "").slice(-10))) e.phone = "Enter a valid 10-digit mobile number";
  if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Enter a valid email";
  if (f.gstOrLicense.trim().length < 5) e.gstOrLicense = "Enter your GST or pesticide licence number";
  if (!f.state) e.state = "Select a state";
  if (!f.city.trim()) e.city = "Enter a city";
  if (f.products.length === 0) e.products = "Select at least one product";
  if (!f.volume) e.volume = "Select an estimated volume";
  return e;
}

function Inquiry() {
  const { product } = Route.useSearch();
  const [f, setF] = useState<InquiryPayload>({ type: "dealership", companyName: "", contactPerson: "", phone: "", email: "", gstOrLicense: "", state: "", city: "", products: product ? [product] : [], volume: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<{ id: string; demo: boolean } | null>(null);
  const set = <K extends keyof InquiryPayload>(k: K, v: InquiryPayload[K]) => {
    setF((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  async function submit(ev: FormEvent) {
    ev.preventDefault();
    const e = validateInquiry(f);
    setErrors(e);
    if (Object.keys(e).length) { toast.error("Please fix the highlighted fields"); return; }
    setBusy(true);
    try {
      const r = await inquiriesApi.submit(f);
      setDone({ id: r.data.id, demo: r.demo });
    } catch {
      toast.error("We couldn't send your inquiry. Please try again or call us.");
    } finally {
      setBusy(false);
    }
  }

  const input = (k: keyof InquiryPayload) => `mt-1 w-full rounded-md border bg-card px-3 py-2.5 outline-none focus:ring-2 focus:ring-ring ${errors[k] ? "border-destructive" : ""}`;
  const Err = ({ k }: { k: keyof InquiryPayload }) => (errors[k] ? <p className="mt-1 text-xs text-destructive">{errors[k]}</p> : null);
  const field = (k: "companyName" | "contactPerson" | "phone" | "email" | "gstOrLicense" | "city", label: string, type = "text") => (
    <label className="block text-sm font-medium">
      {label}
      <input type={type} value={f[k]} onChange={(e) => set(k, e.target.value)} className={input(k)} />
      <Err k={k} />
    </label>
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <h1 className="text-4xl font-semibold">Dealer and bulk inquiry</h1>
      <p className="mt-2 text-muted-foreground">Tell us about your business. Our sales team will reply within one working day.</p>
      <form onSubmit={submit} noValidate className="mt-8 space-y-6 rounded-xl border bg-card p-6 md:p-8">
        <div className="flex gap-2">
          {(["dealership", "bulk"] as const).map((t) => (
            <button type="button" key={t} onClick={() => set("type", t)} className={`rounded-md border px-4 py-2 text-sm font-medium ${f.type === t ? "border-primary bg-primary text-primary-foreground" : ""}`}>
              {t === "dealership" ? "Dealership application" : "Bulk order inquiry"}
            </button>
          ))}
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {field("companyName", "Company / Shop name")}
          {field("contactPerson", "Contact person")}
          {field("phone", "Mobile number", "tel")}
          {field("email", "Email", "email")}
          {field("gstOrLicense", "GST / Licence no.")}
          <label className="block text-sm font-medium">
            Estimated order volume
            <select value={f.volume} onChange={(e) => set("volume", e.target.value)} className={input("volume")}>
              <option value="">Select…</option>
              {VOLUMES.map((v) => <option key={v}>{v}</option>)}
            </select>
            <Err k="volume" />
          </label>
          <label className="block text-sm font-medium">
            State
            <select value={f.state} onChange={(e) => set("state", e.target.value)} className={input("state")}>
              <option value="">Select…</option>
              {STATES.map((s) => <option key={s}>{s}</option>)}
            </select>
            <Err k="state" />
          </label>
          {field("city", "City / District")}
        </div>
        <div>
          <p className="text-sm font-medium">Products you're interested in</p>
          <div className="mt-2 grid max-h-56 gap-1 overflow-y-auto rounded-md border p-3 sm:grid-cols-2">
            {PRODUCTS.map((p) => (
              <label key={p.id} className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={f.products.includes(p.name)} onChange={(e) => set("products", e.target.checked ? [...f.products, p.name] : f.products.filter((x) => x !== p.name))} className="accent-primary" />
                {p.name}
              </label>
            ))}
          </div>
          <Err k="products" />
        </div>
        <label className="block text-sm font-medium">
          Message (optional)
          <textarea rows={3} value={f.message} onChange={(e) => set("message", e.target.value)} className={input("message")} />
        </label>
        <button disabled={busy} className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground disabled:opacity-60">
          {busy && <Loader2 className="h-4 w-4 animate-spin" />} Submit inquiry
        </button>
      </form>

      <Dialog open={!!done} onOpenChange={(o) => !o && setDone(null)}>
        <DialogContent>
          <DialogHeader>
            <CheckCircle2 className="h-12 w-12 text-primary" />
            <DialogTitle>Inquiry received</DialogTitle>
            <DialogDescription>
              Thank you, {f.contactPerson}. Your reference number is <span className="font-semibold text-foreground">{done?.id}</span>. Our team will contact you at {f.phone}.
              {done?.demo && <span className="mt-3 block rounded bg-accent p-2 text-xs text-accent-foreground">Demo mode: the server isn't connected yet, so this inquiry was saved only in this browser.</span>}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
