import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { authApi, type AuthUser } from "@/api/auth";
import { inquiriesApi, type InquiryPayload } from "@/api/inquiries";
import { BackendStatus } from "@/components/SiteLayout";
import { PRODUCTS, COMPANY } from "@/data/catalog";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard | Sun Agri Science Portal" },
      { name: "description", content: "Dealer and admin overview for Sun Agri Science." },
      { property: "og:title", content: "Dashboard | Sun Agri Science" },
      { property: "og:description", content: "Dealer and admin overview." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Dashboard,
});

type Row = InquiryPayload & { id: string; createdAt: string };

function Dashboard() {
  const nav = useNavigate();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [rows, setRows] = useState<Row[]>([]);
  const [demo, setDemo] = useState(false);

  useEffect(() => {
    const u = authApi.currentUser();
    if (!u) return void nav({ to: "/login" });
    setUser(u);
    inquiriesApi.list().then((r) => { setRows(r.data); setDemo(r.demo); }).catch(() => setRows([]));
  }, [nav]);

  if (!user) return <div className="p-20 text-center text-muted-foreground">Loading…</div>;
  const cards = [
    ["Inquiries", rows.length],
    ["Dealership applications", rows.filter((r) => r.type === "dealership").length],
    ["Catalog products", PRODUCTS.length],
    ["Branch offices", COMPANY.branches.length],
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-widest text-primary">{user.role} dashboard</p>
          <h1 className="text-3xl font-semibold">Welcome, {user.name}</h1>
          <div className="mt-2"><BackendStatus /></div>
        </div>
        <button onClick={() => { authApi.logout(); nav({ to: "/login" }); }} className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm"><LogOut className="h-4 w-4" /> Sign out</button>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {cards.map(([l, v]) => (
          <div key={l} className="rounded-xl border bg-card p-5"><p className="font-display text-3xl text-primary">{v}</p><p className="text-sm text-muted-foreground">{l}</p></div>
        ))}
      </div>
      <section className="mt-10 rounded-xl border bg-card">
        <div className="flex items-center justify-between border-b p-5">
          <h2 className="text-xl font-semibold">{user.role === "admin" ? "All inquiries" : "Your inquiries"}</h2>
          <Link to="/inquiry" search={{ product: undefined }} className="text-sm font-semibold text-primary">+ New inquiry</Link>
        </div>
        {demo && <p className="bg-accent px-5 py-2 text-xs text-accent-foreground">Demo mode: showing inquiries saved in this browser.</p>}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-muted-foreground"><tr>{["Ref", "Company", "Type", "Location", "Volume", "Date"].map((h) => <th key={h} className="px-5 py-3 font-medium">{h}</th>)}</tr></thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="px-5 py-3 font-mono text-xs">{r.id}</td>
                  <td className="px-5 py-3">{r.companyName}<div className="text-xs text-muted-foreground">{r.contactPerson}</div></td>
                  <td className="px-5 py-3 capitalize">{r.type}</td>
                  <td className="px-5 py-3">{r.city}, {r.state}</td>
                  <td className="px-5 py-3">{r.volume}</td>
                  <td className="px-5 py-3">{new Date(r.createdAt).toLocaleDateString("en-IN")}</td>
                </tr>
              ))}
              {rows.length === 0 && <tr><td colSpan={6} className="px-5 py-10 text-center text-muted-foreground">No inquiries yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
