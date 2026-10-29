import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Download, Package, Sprout, Beaker } from "lucide-react";
import brochure from "@/assets/brochure.pdf.asset.json";
import { PRODUCTS } from "@/data/catalog";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = PRODUCTS.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} | Sun Agri Science` },
          { name: "description", content: loaderData.product.description.slice(0, 155) },
          { property: "og:title", content: `${loaderData.product.name} | Sun Agri Science` },
          { property: "og:description", content: loaderData.product.description.slice(0, 155) },
        ]
      : [{ title: "Product not found | Sun Agri Science" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-3xl font-semibold">Product not found</h1>
      <Link to="/products" search={{ category: undefined }} className="mt-4 inline-block text-primary">Back to catalog</Link>
    </div>
  ),
  component: Detail,
});

function Detail() {
  const { product: p } = Route.useLoaderData();
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <Link to="/products" search={{ category: undefined }} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"><ArrowLeft className="h-4 w-4" /> Catalog</Link>
      <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-primary">{p.category}</p>
      <h1 className="mt-1 text-4xl font-semibold md:text-5xl">{p.name}</h1>
      {p.upcoming && <span className="mt-3 inline-block rounded-full bg-harvest px-3 py-1 text-xs font-bold text-harvest-foreground">Upcoming launch</span>}
      <p className="mt-5 max-w-3xl text-lg text-muted-foreground">{p.description}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href={brochure.url} download="Sun-Agri-Science-Brochure.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 font-semibold text-primary-foreground"><Download className="h-4 w-4" /> Download brochure</a>
        <Link to="/inquiry" search={{ product: p.name }} className="rounded-md border px-5 py-3 font-semibold hover:border-primary">Ask for bulk pricing</Link>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <section className="rounded-xl border bg-card p-6">
          <h2 className="flex items-center gap-2 text-xl font-semibold"><Beaker className="h-5 w-5 text-primary" /> Technical specifications</h2>
          <dl className="mt-4 divide-y text-sm">
            {Object.entries(p.specs).map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-2.5"><dt className="text-muted-foreground">{k}</dt><dd className="text-right font-medium">{v}</dd></div>
            ))}
          </dl>
        </section>
        <section className="space-y-6">
          <div className="rounded-xl border bg-card p-6">
            <h2 className="flex items-center gap-2 text-xl font-semibold"><Package className="h-5 w-5 text-primary" /> Pack sizes</h2>
            <div className="mt-4 flex flex-wrap gap-2">{p.packaging.map((x) => <span key={x} className="rounded-md bg-secondary px-3 py-1 text-sm">{x}</span>)}</div>
          </div>
          <div className="rounded-xl border bg-card p-6">
            <h2 className="flex items-center gap-2 text-xl font-semibold"><Sprout className="h-5 w-5 text-primary" /> Dosage and crops</h2>
            <p className="mt-3 text-sm"><span className="font-semibold">Dosage:</span> {p.dosage}</p>
            {p.crops.length > 0 && <p className="mt-2 text-sm"><span className="font-semibold">Recommended crops:</span> {p.crops.join(", ")}</p>}
            <p className="mt-3 text-xs text-muted-foreground">Always read the product label and leaflet before use.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
