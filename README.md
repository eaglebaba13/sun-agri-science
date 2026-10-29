# Sun Agri Science

Build a Corporate & Catalog Portal with B2B Inquiry Features for Sun Agri Science (https://sunagriscience.in/ - RS Group of Companies).

IMPORTANT ARCHITECTURE REQUIREMENTS:
- Do NOT use Supabase internal database or external cloud backend services.
- Connect to an external self-hosted backend API on VPS via a central API client configured to `import.meta.env.VITE_BACKEND_URL` (defaulting gracefully to an environment variable fallback, e.g. `https://api.yourdomain.com`).
- Include robust API client services (e.g. using Axios) under `src/api/` with token interceptors, typed endpoints, and graceful mock/fallback data so the app displays full real catalog data, company infrastructure, and interactive forms immediately even before the backend is wired up.
- All forms, login, and data fetching should route through these API service modules (`src/api/client.ts`, `src/api/auth.ts`, `src/api/products.ts`, `src/api/inquiries.ts`).

PRIMARY PAGES & FEATURES:
1. Home Page:
   - Hero section showcasing manufacturing strength (Sulphur WDG manufacturing unit, Agrochemicals, Fertilizers, Seeds), ISO 9001:2015 certification, and RS Group 100+ Crore turnover legacy.
   - Quick stats counter (15,000 sq. meter Sulphur WDG unit, 100+ Cr turnover, 5+ branch offices: Mumbai, Kolkata, Vapi, Indore, Kanpur, 30+ products).
   - Core product categories highlights (Sulphur Formulations, Insecticides, Fungicides, Plant Growth Regulators).
   - Infrastructure & quality highlight snippet.
   - Testimonials / Farmer & Dealer impact.

2. Product Catalog:
   - Searchable, filterable product grid by category (Sulphur Products like Sulphur 80% WDG, Sulphur 90%, Liquid Sulphur, Dusting Powder, Bentonite Sulphur; Agrochemicals like Chlorantraniliprole, Imidacloprid, Gibberellic Acid, Tebuconazole + Sulphur WG, upcoming products).
   - Detailed product view with technical specifications, packaging sizes, active ingredients, dosage/crop recommendations, and brochure download trigger.

3. About Us & Manufacturing Infrastructure:
   - Plant overview at Khasra No. 401/734, 404, Village Paldi, Tehsil Viratnagar, Dist. Jaipur.
   - Corporate office at Unnati Tower, Central Spine, Vidhyadhar Nagar, Jaipur.
   - High-tech infrastructure breakdown based on presentation: 15,000 sq.m Sulphur WDG plant, 3 Roller Grinding Mill, Spray Dryer Plant, Sand Mill Grinding, Nitrogen Plant, Fire Fighting System, and Quality Control Lab.

4. B2B / Dealer Inquiry Form:
   - Dedicated bulk inquiry and dealership application form with fields for Company/Shop Name, Contact Person, GST/License No, State/City, Products of Interest, and Estimated Order Volume.
   - Wired to `inquiriesApi.submit()` with optimistic validation, clear success modals, and fallback state.

5. Admin / Dealer Login:
   - Clean authentication interface (Email/Username and Password) wired to `authApi.login()`, storing JWT token in localStorage and redirecting to a Dealer/Admin dashboard overview.
   - Backend connection status indicator showing whether `VITE_BACKEND_URL` is responding or running in demonstration mode.

DESIGN & BRANDING:
- Professional agro-science aesthetic: earthy green, golden harvest accents, crisp white, clean typography, responsive layout, and mobile-friendly navigation.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://sun-agri-science.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ed3c766b-1fcd-4410-a949-1148945f995f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
