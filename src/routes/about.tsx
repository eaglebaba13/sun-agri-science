import { createFileRoute } from "@tanstack/react-router";
import { Building2, Factory, MapPin, Target } from "lucide-react";
import { COMPANY, INFRASTRUCTURE } from "@/data/catalog";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About & Manufacturing Plant | Sun Agri Science" },
      { name: "description", content: "R S Group company with a 15,000 sq. m Sulphur WDG plant at Village Paldi, Viratnagar, Jaipur. ISO 9001:2015 certified." },
      { property: "og:title", content: "About Sun Agri Science & our Jaipur plant" },
      { property: "og:description", content: "Spray dryer, sand mill, nitrogen plant, QC lab and more at our Viratnagar plant." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="bg-secondary">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">About us</p>
          <h1 className="mt-2 text-4xl font-semibold md:text-5xl">Helping farmers get better harvests.</h1>
          <p className="mt-5 text-lg text-muted-foreground">Sun Agri Science is part of the {COMPANY.group}. The group makes and sells agrochemicals, fertilizers, seeds, laboratory chemicals and industrial chemicals, with a turnover of more than ₹100 Crore. Our directors have over 20 years of experience in insecticides, fungicides, weedicides and plant growth regulators. We sell more than 35 products under our brand names.</p>
          <div className="mt-8 flex items-start gap-3 rounded-lg bg-card p-5">
            <Target className="mt-0.5 h-6 w-6 text-primary" />
            <p><span className="font-semibold">Our aim:</span> always to see a smile on our end customers' faces. We work in a consistent, honest, respectful and transparent way.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-5 px-4 py-14 md:grid-cols-2">
        <div className="rounded-xl border bg-card p-6">
          <Factory className="h-7 w-7 text-primary" />
          <h2 className="mt-3 text-xl font-semibold">Manufacturing plant</h2>
          <p className="mt-2 flex gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4 shrink-0" />{COMPANY.plant}</p>
        </div>
        <div className="rounded-xl border bg-card p-6">
          <Building2 className="h-7 w-7 text-primary" />
          <h2 className="mt-3 text-xl font-semibold">Corporate office</h2>
          <p className="mt-2 flex gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4 shrink-0" />{COMPANY.corporate}</p>
          <p className="mt-2 text-sm text-muted-foreground">Branches: {COMPANY.branches.join(", ")}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20">
        <h2 className="text-3xl font-semibold md:text-4xl">Plant infrastructure</h2>
        <p className="mt-2 text-muted-foreground">From raw sulphur to finished, packed goods, all at one site.</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INFRASTRUCTURE.map((x, i) => (
            <div key={x.title} className="rounded-xl border bg-card p-6">
              <p className="text-xs font-semibold text-muted-foreground">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-2 font-display text-3xl font-semibold text-primary">{x.stat}</p>
              <h3 className="mt-1 text-lg font-semibold">{x.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{x.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
