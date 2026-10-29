import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { productsQuery } from "@/api/products";
import { CATEGORIES } from "@/data/catalog";

export const Route = createFileRoute("/products/")({
  validateSearch: (s: Record<string, unknown>) => ({ category: typeof s.category === "string" ? s.category : undefined }),
  head: () => ({
    meta: [
      { title: "Product Catalog | Sun Agri Science" },
      { name: "description", content: "Sulphur WDG, bentonite sulphur, insecticides, fungicides and plant growth regulators from Sun Agri Science." },
      { property: "og:title", content: "Product Catalog | Sun Agri Science" },
      { property: "og:description", content: "Search our sulphur and agrochemical products by category." },
    ],
  }),
  component: Catalog,
});

function Catalog() {
  const { category } = Route.useSearch();
  const navigate = Route.useNavigate();
  const { data: products } = useQuery(productsQuery());
  const [q, setQ] = useState("");
  const list = useMemo(
    () => products.filter((p) => (!category || p.category === category) && (p.name + p.activeIngredient + p.crops.join(" ")).toLowerCase().includes(q.toLowerCase())),
    [products, category, q],
  );
  const chip = (active: boolean) => `rounded-full border px-4 py-1.5 text-sm ${active ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:border-primary"}`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-14">
      <h1 className="text-4xl font-semibold">Product catalog</h1>
      <p className="mt-2 text-muted-foreground">More than 35 brands across sulphur formulations and crop protection.</p>
      <div className="relative mt-8 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search product, ingredient or crop…" className="w-full rounded-md border bg-card py-2.5 pl-9 pr-3 outline-none focus:ring-2 focus:ring-ring" />
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <button className={chip(!category)} onClick={() => navigate({ search: { category: undefined } })}>All</button>
        {CATEGORIES.map((c) => (
          <button key={c.name} className={chip(category === c.name)} onClick={() => navigate({ search: { category: c.name } })}>{c.name}</button>
        ))}
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <Link key={p.id} to="/products/$slug" params={{ slug: p.slug }} className="flex flex-col rounded-xl border bg-card p-6 transition hover:border-primary hover:shadow-md">
            <div className="flex items-start justify-between gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">{p.category}</span>
              {p.upcoming && <span className="rounded-full bg-harvest px-2 py-0.5 text-[10px] font-bold uppercase text-harvest-foreground">Upcoming</span>}
            </div>
            <h3 className="mt-2 text-xl font-semibold">{p.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{p.formulation}</p>
            <p className="mt-3 line-clamp-2 flex-1 text-sm">{p.description}</p>
            {p.crops.length > 0 && <p className="mt-4 text-xs text-muted-foreground">Crops: {p.crops.slice(0, 4).join(", ")}</p>}
          </Link>
        ))}
        {list.length === 0 && <p className="text-muted-foreground">No products match your search.</p>}
      </div>
    </div>
  );
}
