import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Loader2, Lock, Sun } from "lucide-react";
import { toast } from "sonner";
import { authApi } from "@/api/auth";
import { BackendStatus } from "@/components/SiteLayout";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Dealer & Admin Login | Sun Agri Science" },
      { name: "description", content: "Sign in to the Sun Agri Science dealer and admin portal." },
      { property: "og:title", content: "Dealer Login | Sun Agri Science" },
      { property: "og:description", content: "Secure portal for Sun Agri Science dealers and staff." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Login,
});

function Login() {
  const nav = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!id || !pw) return toast.error("Enter your email/username and password");
    setBusy(true);
    try {
      const r = await authApi.login(id, pw);
      toast.success(r.demo ? "Signed in (demo mode)" : "Signed in");
      nav({ to: "/dashboard" });
    } catch {
      toast.error("Wrong email/username or password");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid min-h-[75vh] place-items-center bg-secondary px-4 py-12">
      <form onSubmit={submit} className="w-full max-w-sm rounded-xl border bg-card p-8 shadow-sm">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-primary text-harvest"><Sun /></span>
        <h1 className="mt-4 text-2xl font-semibold">Dealer / Admin login</h1>
        <p className="mt-1 text-sm text-muted-foreground">Sign in to see your inquiries and account.</p>
        <label className="mt-6 block text-sm font-medium">Email or username
          <input value={id} onChange={(e) => setId(e.target.value)} autoComplete="username" className="mt-1 w-full rounded-md border px-3 py-2.5 outline-none focus:ring-2 focus:ring-ring" />
        </label>
        <label className="mt-4 block text-sm font-medium">Password
          <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} autoComplete="current-password" className="mt-1 w-full rounded-md border px-3 py-2.5 outline-none focus:ring-2 focus:ring-ring" />
        </label>
        <button disabled={busy} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary py-3 font-semibold text-primary-foreground disabled:opacity-60">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />} Sign in
        </button>
        <div className="mt-5 flex justify-center"><BackendStatus /></div>
        <p className="mt-3 text-center text-xs text-muted-foreground">In demo mode, any password of 4+ characters works. Use a name with "admin" in it to see the admin view.</p>
      </form>
    </div>
  );
}
