import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, X, Phone, Mail, MapPin, Linkedin, Store, Building2 } from "lucide-react";
import { checkBackendHealth, BACKEND_URL } from "@/api/client";
import { COMPANY } from "@/data/catalog";
import logo from "@/assets/sunagriscience_name_logo1.png.asset.json";
import makeInIndia from "@/assets/make-in-india.png.asset.json";
import saveWater from "@/assets/save_water_save_life.png.asset.json";
import swachh from "@/assets/swachh_bharat.png.asset.json";
import swadeshi from "@/assets/swadeshi_apnao.png.asset.json";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About & Plant" },
  { to: "/inquiry", label: "Dealer Inquiry" },
] as const;

const LINKS = [
  { label: "IndiaMART", icon: Store, url: "https://www.indiamart.com/sun-agri-science/" },
  { label: "Justdial · Paldi", icon: MapPin, url: "https://www.justdial.com/Jaipur/Sun-Agri-Science-Paldi/0141PX141-X141-231111080046-Q2K8_BZDET?trkid=&term=&ncatid=10009583&area=&search=Showing%20Results%20for%20%22Sun%20Agri%20Science%20Vidhyadhar%20Nagar%22%20in%20Jaipur&mncatname=Sun%20Agri%20Science%20Vidhyadhar%20Nagar&ftterm=Sun%20Agri%20Science%20Vidhyadhar%20Nagar&csell=&oncatid=10009583&abd_btn=&abd_heading=&isFreetxt=1&bd=2&cat_b2b_flag=&searchfrom=lst&thumbnail=" },
  { label: "Justdial · Vidhyadhar Nagar", icon: MapPin, url: "https://www.justdial.com/Jaipur/search?q=Sun-Agri-Science-Vidhyadhar-Nagar&stype=company_list&filters=[{%22e%22:%22100%22,%22v%22:[%22Distance%22]}]&v=nctol" },
  { label: "IndiaLei", icon: Building2, url: "https://indialei.in/detailed-information/48304046/9845008D7CBB9610DM05/sun-agri-science/" },
  { label: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/in/sun-agri-science-4209772b8/" },
];

const CAMPAIGNS = [
  { src: makeInIndia.url, alt: "Make in India" },
  { src: saveWater.url, alt: "Save Water Save Life" },
  { src: swachh.url, alt: "Swachh Bharat" },
  { src: swadeshi.url, alt: "Swadeshi Apnao" },
];

export function BackendStatus() {
  const [s, setS] = useState<"checking" | "live" | "demo">("checking");
  useEffect(() => {
    checkBackendHealth().then((ok) => setS(ok ? "live" : "demo"));
  }, []);
  const color = s === "live" ? "bg-primary" : s === "demo" ? "bg-harvest" : "bg-muted-foreground";
  return (
    <span title={BACKEND_URL} className="inline-flex items-center gap-2 text-xs text-muted-foreground">
      <span className={`h-2 w-2 rounded-full ${color} ${s === "checking" ? "animate-pulse" : ""}`} />
      {s === "live" ? "Backend connected" : s === "demo" ? "Demo mode" : "Checking backend…"}
    </span>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-harvest"><Sun className="h-5 w-5" /></span>
            <span className="leading-tight">
              <span className="block font-display text-lg font-semibold">Sun Agri Science</span>
              <span className="block text-[10px] uppercase tracking-widest text-muted-foreground">R S Group · ISO 9001:2015</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }} className="text-sm font-medium text-muted-foreground hover:text-foreground" activeProps={{ className: "text-primary" }}>
                {n.label}
              </Link>
            ))}
            <Link to="/login" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Dealer Login</Link>
          </nav>
          <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X /> : <Menu />}</button>
        </div>
        {open && (
          <nav className="flex flex-col gap-1 border-t px-4 py-3 md:hidden">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="rounded px-2 py-2 text-sm hover:bg-muted">{n.label}</Link>
            ))}
            <Link to="/login" onClick={() => setOpen(false)} className="rounded px-2 py-2 text-sm font-medium text-primary">Dealer Login</Link>
          </nav>
        )}
      </header>
      <main className="flex-1">{children}</main>
      <footer className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-3">
          <div>
            <p className="font-display text-xl">Sun Agri Science</p>
            <p className="mt-2 text-sm opacity-80">Pesticides · Fertilizers · Seeds. A company of the R S Group, with a turnover of more than ₹100 Crore.</p>
          </div>
          <div className="space-y-2 text-sm opacity-90">
            <p className="flex gap-2"><MapPin className="h-4 w-4 shrink-0" />{COMPANY.corporate}</p>
            <p className="flex gap-2"><Phone className="h-4 w-4 shrink-0" />{COMPANY.phones.join(" · ")}</p>
            <p className="flex gap-2"><Mail className="h-4 w-4 shrink-0" />{COMPANY.email}</p>
          </div>
          <div className="text-sm opacity-90">
            <p className="font-semibold text-harvest">Branch offices</p>
            <p className="mt-1">{COMPANY.branches.join(" · ")}</p>
            <div className="mt-4 [&_span]:text-primary-foreground/80"><BackendStatus /></div>
          </div>
        </div>
        <p className="border-t border-primary-foreground/15 py-4 text-center text-xs opacity-70">© {new Date().getFullYear()} Sun Agri Science. All rights reserved.</p>
      </footer>
    </div>
  );
}
