import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, Factory, FlaskConical, Leaf, ShieldCheck, Sprout, Bug, Droplets } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { CATEGORIES, INFRASTRUCTURE, PRODUCTS } from "@/data/catalog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sun Agri Science | Sulphur WDG & Agrochemical Manufacturer, Jaipur" },
      { name: "description", content: "ISO 9001:2015 maker of Sulphur WDG, insecticides, fungicides, fertilizers and seeds. R S Group, ₹100+ Cr turnover." },
      { property: "og:title", content: "Sun Agri Science | Sulphur & Agrochemical Manufacturer" },
      { property: "og:description", content: "15,000 sq. m Sulphur WDG plant in Jaipur. Bulk and dealer supply across India." },
    ],
  }),
  component: Home,
});

const ICONS = [Droplets, Bug, ShieldCheck, Sprout];
const STATS = [
  ["15,000", "sq. m Sulphur WDG unit"],
  ["₹100+ Cr", "R S Group turnover"],
  ["5+", "Branch offices"],
  [`${PRODUCTS.length}+`, "Products in the range"],
];
const TESTIMONIALS = [
  { q: "Their Sulphur 80% WDG mixes well in the tank and has cut powdery mildew in our grape blocks.", n: "Grape grower", l: "Nashik, Maharashtra" },
  { q: "Supply is steady and the sulphur is the same quality every batch. Our counter sells it all season.", n: "Agri-input dealer", l: "Indore, MP" },
  { q: "Bentonite sulphur gave a visible lift to our mustard oil content this rabi.", n: "Progressive farmer", l: "Alwar, Rajasthan" },
];

function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img src={hero} alt="Fields beside the Sun Agri Science plant" width={1600} height={912} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-foreground/85 via-foreground/60 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 py-24 md:py-36">
          <span className="inline-flex items-center gap-2 rounded-full bg-harvest px-3 py-1 text-xs font-semibold text-harvest-foreground"><Award className="h-3.5 w-3.5" /> ISO 9001:2015 Certified</span>
          <h1 className="mt-5 max-w-2xl text-4xl font-semibold leading-tight text-primary-foreground md:text-6xl">Sulphur, crop protection and nutrition, made in Jaipur.</h1>
          <p className="mt-5 max-w-xl text-lg text-primary-foreground/85">Sun Agri Science, part of the R S Group (₹100+ Crore), makes Sulphur WDG, agrochemicals, fertilizers and seeds for dealers and farmers across India.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/products" className="inline-flex items-center gap-2 rounded-md bg-harvest px-5 py-3 font-semibold text-harvest-foreground hover:opacity-90">Browse catalog <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/inquiry" className="rounded-md border border-primary-foreground/40 px-5 py-3 font-semibold text-primary-foreground hover:bg-primary-foreground/10">Become a dealer</Link>
          </div>
        </div>
      </section>

      <section className="border-b bg-secondary">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4">
          {STATS.map(([v, l]) => (
            <div key={l}>
              <p className="font-display text-3xl font-semibold text-primary md:text-4xl">{v}</p>
              <p className="text-sm text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Our range</p>
        <h2 className="mt-2 text-3xl font-semibold md:text-4xl">Product categories</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c, i) => {
            const Icon = ICONS[i];
            const count = PRODUCTS.filter((p) => p.category === c.name).length;
            return (
              <Link key={c.name} to="/products" search={{ category: c.name }} className="group rounded-xl border bg-card p-6 transition hover:-translate-y-1 hover:border-primary hover:shadow-lg">
                <Icon className="h-8 w-8 text-primary" />
                <h3 className="mt-4 text-xl font-semibold">{c.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.blurb}</p>
                <p className="mt-4 text-sm font-semibold text-primary">{count} products →</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 md:grid-cols-2">
          <div>
            <Factory className="h-10 w-10 text-harvest" />
            <h2 className="mt-4 text-3xl font-semibold md:text-4xl">Our plant and quality control</h2>
            <p className="mt-4 opacity-85">Our plant at Village Paldi, Viratnagar runs a 3-roller SS grinding mill, sand mills, a semi-automated spray dryer, a nitrogen plant and an in-house QC lab. Every batch is checked before it leaves.</p>
            <Link to="/about" className="mt-6 inline-flex items-center gap-2 font-semibold text-harvest">See the full plant <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {INFRASTRUCTURE.slice(0, 4).map((x) => (
              <div key={x.title} className="rounded-lg bg-primary-foreground/10 p-5">
                <p className="font-display text-2xl text-harvest">{x.stat}</p>
                <p className="mt-1 text-sm">{x.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="flex items-center gap-2 text-primary"><Leaf className="h-5 w-5" /><span className="text-sm font-semibold uppercase tracking-widest">From the field</span></div>
        <h2 className="mt-2 text-3xl font-semibold md:text-4xl">What farmers and dealers say</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.l} className="rounded-xl border bg-card p-6">
              <blockquote className="text-foreground/90">“{t.q}”</blockquote>
              <figcaption className="mt-4 text-sm"><span className="font-semibold">{t.n}</span> · <span className="text-muted-foreground">{t.l}</span></figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-start justify-between gap-4 rounded-xl bg-accent p-8 md:flex-row md:items-center">
          <div className="flex items-center gap-3"><FlaskConical className="h-8 w-8 text-accent-foreground" /><p className="text-lg font-semibold text-accent-foreground">Need bulk pricing or a dealership in your district?</p></div>
          <Link to="/inquiry" className="rounded-md bg-primary px-5 py-3 font-semibold text-primary-foreground">Send an inquiry</Link>
        </div>
      </section>
    </>
  );
}
