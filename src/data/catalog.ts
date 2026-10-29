export type Category = "Sulphur Formulations" | "Insecticides" | "Fungicides" | "Plant Growth Regulators";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  formulation: string;
  activeIngredient: string;
  description: string;
  packaging: string[];
  dosage: string;
  crops: string[];
  specs: Record<string, string>;
  upcoming?: boolean;
}

export const CATEGORIES: { name: Category; blurb: string }[] = [
  { name: "Sulphur Formulations", blurb: "WDG, WP, SC, DP and bentonite sulphur made in our Jaipur plant." },
  { name: "Insecticides", blurb: "Granules, dusts and suspension concentrates for pest control." },
  { name: "Fungicides", blurb: "Triazole, strobilurin and sulphur combinations for disease control." },
  { name: "Plant Growth Regulators", blurb: "Gibberellic acid and triacontanol to support crop growth." },
];

const p = (o: Omit<Product, "id" | "slug" | "specs"> & { specs?: Record<string, string> }): Product => {
  const slug = o.name.toLowerCase().replace(/[%+.]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return { id: slug, slug, specs: { "Formulation type": o.formulation, "Active ingredient": o.activeIngredient, ...(o.specs ?? {}) }, ...o };
};

const PACK_S = ["1 kg", "3 kg", "5 kg", "25 kg bag"];
const PACK_L = ["250 ml", "500 ml", "1 L", "5 L"];
const PACK_G = ["4 kg", "10 kg", "25 kg bag"];

export const PRODUCTS: Product[] = [
  p({ name: "Sulphur 80% WDG", category: "Sulphur Formulations", formulation: "Water Dispersible Granules", activeIngredient: "Sulphur 80% w/w", description: "Our flagship spray-dried granule, made in the 15,000 sq. m WDG unit. Disperses quickly, low dust, controls powdery mildew and mites, and supplies sulphur as a nutrient.", packaging: PACK_S, dosage: "750 g – 1 kg per acre in 200 L water", crops: ["Grapes", "Chilli", "Cumin", "Pea", "Mango"], specs: { "Plant capacity": "9,000 MT per annum", Process: "Sand mill + spray dryer" } }),
  p({ name: "Sulphur 90% Bentonite", category: "Sulphur Formulations", formulation: "Bentonite Granules", activeIngredient: "Sulphur 90% w/w", description: "Bentonite sulphur pastilles for soil application. Releases sulphur slowly for oilseeds, pulses and cereals.", packaging: ["10 kg", "25 kg bag", "50 kg bag"], dosage: "3 – 6 kg per acre as basal dose", crops: ["Mustard", "Groundnut", "Soybean", "Wheat"] }),
  p({ name: "Liquid Sulphur", category: "Sulphur Formulations", formulation: "Suspension Concentrate", activeIngredient: "Sulphur 40% / 55.16% SC", description: "Ready-to-mix liquid sulphur for foliar spray and fertigation. Even coverage with a low dose.", packaging: PACK_L, dosage: "500 ml – 1 L per acre", crops: ["Vegetables", "Cotton", "Onion", "Pulses"] }),
  p({ name: "Sulphur 85% Dusting Powder", category: "Sulphur Formulations", formulation: "Dusting Powder", activeIngredient: "Sulphur 85% w/w", description: "Fine dusting powder for direct application on crops. Made in our DP formulation area with 10,000 MT per year capacity.", packaging: ["1 kg", "5 kg", "25 kg bag"], dosage: "8 – 10 kg per acre", crops: ["Cumin", "Coriander", "Mango", "Vegetables"] }),
  p({ name: "Sulphur 80% WP", category: "Sulphur Formulations", formulation: "Wettable Powder", activeIngredient: "Sulphur 80% w/w", description: "A cost-effective wettable powder that works as a fungicide and miticide.", packaging: PACK_S, dosage: "1 – 1.25 kg per acre", crops: ["Grapes", "Apple", "Peas"] }),
  p({ name: "Sulphur 99% Technical (Imported)", category: "Sulphur Formulations", formulation: "Technical Grade", activeIngredient: "Sulphur 99.99% w/w", description: "Imported technical-grade sulphur for formulators and industrial buyers. We can store 1,500 MT at a time.", packaging: ["50 kg bag", "1 MT jumbo bag"], dosage: "For industrial / formulation use", crops: ["Industrial"] }),
  p({ name: "Lime Sulphur 22% SC", category: "Sulphur Formulations", formulation: "Suspension Concentrate", activeIngredient: "Calcium polysulphide 22%", description: "A classic dormant-season spray for orchards that controls scale, mites and fungal diseases.", packaging: PACK_L, dosage: "As per label recommendation", crops: ["Apple", "Citrus", "Grapes"] }),
  p({ name: "Chlorantraniliprole 18.5% SC", category: "Insecticides", formulation: "Suspension Concentrate", activeIngredient: "Chlorantraniliprole 18.5% w/w", description: "Diamide insecticide for lepidopteran pests: stem borer, fruit borer and leaf folder.", packaging: ["10 ml", "30 ml", "60 ml", "150 ml"], dosage: "60 ml per acre", crops: ["Paddy", "Sugarcane", "Tomato", "Cotton"] }),
  p({ name: "Chlorantraniliprole 0.4% GR", category: "Insecticides", formulation: "Granules", activeIngredient: "Chlorantraniliprole 0.4% w/w", description: "Granules for soil and paddy-water application. Protects against stem borer for a long period.", packaging: PACK_G, dosage: "4 kg per acre", crops: ["Paddy", "Sugarcane"] }),
  p({ name: "Imidacloprid 0.3% GR", category: "Insecticides", formulation: "Granules", activeIngredient: "Imidacloprid 0.3% w/w", description: "Systemic granules against sucking and soil pests.", packaging: PACK_G, dosage: "6 – 8 kg per acre", crops: ["Sugarcane", "Paddy", "Groundnut"] }),
  p({ name: "Carbofuran 3% CG", category: "Insecticides", formulation: "Coated Granules", activeIngredient: "Carbofuran 3% w/w", description: "Soil insecticide and nematicide granules.", packaging: PACK_G, dosage: "As per label recommendation", crops: ["Paddy", "Maize", "Sugarcane"] }),
  p({ name: "Chlorpyriphos 1.5% DP", category: "Insecticides", formulation: "Dusting Powder", activeIngredient: "Chlorpyriphos 1.5% w/w", description: "Dusting powder against termites and soil-dwelling pests.", packaging: ["1 kg", "5 kg", "25 kg bag"], dosage: "8 – 10 kg per acre", crops: ["Wheat", "Gram", "Groundnut"] }),
  p({ name: "Cypermethrin 0.25% DP", category: "Insecticides", formulation: "Dusting Powder", activeIngredient: "Cypermethrin 0.25% w/w", description: "Pyrethroid dust that knocks down chewing pests quickly.", packaging: ["1 kg", "5 kg", "25 kg bag"], dosage: "8 – 10 kg per acre", crops: ["Pulses", "Vegetables"] }),
  p({ name: "Fenvalerate 0.4% DP", category: "Insecticides", formulation: "Dusting Powder", activeIngredient: "Fenvalerate 0.4% w/w", description: "Contact and stomach-action dust for field crops.", packaging: ["1 kg", "5 kg", "25 kg bag"], dosage: "8 – 10 kg per acre", crops: ["Cotton", "Pulses"] }),
  p({ name: "Malathion 5% DP", category: "Insecticides", formulation: "Dusting Powder", activeIngredient: "Malathion 5% w/w", description: "Broad-spectrum organophosphate dust for crops and grain protection.", packaging: ["1 kg", "5 kg", "25 kg bag"], dosage: "8 – 10 kg per acre", crops: ["Pulses", "Cereals", "Vegetables"] }),
  p({ name: "Tebuconazole 10% + Sulphur 65% WG", category: "Fungicides", formulation: "Water Dispersible Granules", activeIngredient: "Tebuconazole 10% + Sulphur 65% w/w", description: "Combination fungicide with systemic and contact action, for powdery mildew and leaf spots.", packaging: ["250 g", "500 g", "1 kg"], dosage: "500 g per acre", crops: ["Chilli", "Soybean", "Grapes"] }),
  p({ name: "Gibberellic Acid 40% WSG", category: "Plant Growth Regulators", formulation: "Water Soluble Granules", activeIngredient: "Gibberellic Acid 40% w/w", description: "Plant growth regulator that improves fruit size, cell elongation and uniform flowering.", packaging: ["1 g", "5 g", "10 g"], dosage: "As per crop schedule", crops: ["Grapes", "Paddy", "Vegetables"] }),
  p({ name: "Triacontanol 0.05% GR", category: "Plant Growth Regulators", formulation: "Granules", activeIngredient: "Triacontanol 0.05% min.", description: "Growth promoter granules that support tillering, root growth and higher yield.", packaging: PACK_G, dosage: "4 – 5 kg per acre", crops: ["Paddy", "Wheat", "Vegetables"] }),
  ...["Pyriproxyfen 10% EC|Insecticides", "Thiamethoxam 25% WG|Insecticides", "Azoxystrobin 23% SC|Fungicides", "Tebuconazole 25.9% EC|Fungicides", "Captan 70% + Hexaconazole 5% WP|Fungicides", "Azoxystrobin 18.2% + Difenoconazole 11.4% SC|Fungicides", "Azoxystrobin 11% + Tebuconazole 18.3% SC|Fungicides"].map((s) => {
    const [name, category] = s.split("|");
    return p({ name, category: category as Category, formulation: name.split(" ").pop()!, activeIngredient: name, description: "Coming soon to the Sun Agri Science range. Contact us to book early dealer allocation.", packaging: ["To be announced"], dosage: "Label pending", crops: [], upcoming: true });
  }),
];

export const COMPANY = {
  name: "Sun Agri Science",
  group: "R S Group of Companies",
  corporate: "S-221, Unnati Tower, Central Spine, Vidhyadhar Nagar, Jaipur – 302039",
  plant: "Khasra No. 401/734, 404, Village Paldi, Tehsil Viratnagar, Dist. Jaipur – 303003",
  branches: ["Mumbai", "Kolkata", "Vapi", "Indore", "Kanpur"],
  phones: ["+91 63778 39496", "+91 98285 70280"],
  email: "sunagrisciencejpr@gmail.com",
};

export const INFRASTRUCTURE = [
  { title: "Sulphur WDG Unit", stat: "15,000 sq. m", text: "A dedicated plant for making water dispersible granules." },
  { title: "Raw Sulphur Storage", stat: "1,500 MT", text: "A 12,000 sq. ft storage area for 99.99% technical and ground sulphur." },
  { title: "3 Roller Grinding Mill", stat: "18,000 MT/yr", text: "A stainless steel mill that grinds raw sulphur lumps for WDG." },
  { title: "Sand Mill Grinding", stat: "5,000 L tanks", text: "Fine wet milling with 1,000 L batch charging and 5,000 L holding tanks." },
  { title: "Spray Dryer Plant", stat: "9,000 MT/yr", text: "A semi-automated spray dryer for uniform WDG granules." },
  { title: "Nitrogen Plant", stat: "50 NM³", text: "Nitrogen supply for smooth machine running and safety." },
  { title: "Fire Fighting System", stat: "300 KL", text: "An automated pumping system with a 300 KL water storage tank." },
  { title: "Steam Boiler", stat: "6 MT/hr", text: "Steam supply for the whole process." },
  { title: "Dust Powder Formulation", stat: "10,000 MT/yr", text: "A separate area for making DP formulations." },
  { title: "Brand Packaging", stat: "10,500 sq. ft", text: "Space for packing under our own and partner brands." },
  { title: "Quality Control Lab", stat: "ISO 9001:2015", text: "Every batch is tested for active content, suspensibility and particle size." },
];
