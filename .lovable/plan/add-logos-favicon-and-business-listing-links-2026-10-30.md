# Add logos, favicon and business listing links

## What changes
1. **Main logo** — replace the sun icon + text in the top bar with the uploaded Sun Agri Science name logo (sunagriscience_name_logo1.png). The footer also shows it.
2. **Favicon** — the browser tab icon becomes the uploaded Sun Agri Science icon (sunagriscience_icon.png).
3. **"Find us online" links with icons** in the footer (each opens in a new tab):
   - IndiaMART
   - Justdial – Paldi (plant)
   - Justdial – Vidhyadhar Nagar (corporate office)
   - IndiaLei
   - LinkedIn
4. **Campaign logos strip** in the footer: Make in India, Save Water Save Life, Swachh Bharat, Swadeshi Apnao, shown in a row on a light band so they stay readable on the green footer.

## Technical details
- Upload the 5 display logos with `lovable-assets` into `src/assets/*.png.asset.json` and import their `.url`.
- Favicon: `magick` resize the icon to 64x64 into `public/favicon.png`, update the `rel: "icon"` link in `__root.tsx`, delete `public/favicon.ico`.
- Add `SOCIAL_LINKS` to `COMPANY` in `src/data/catalog.ts` (label, url, icon). Icons: lucide `Linkedin` for LinkedIn, `Store` for IndiaMART, `MapPin` for Justdial, `Building2` for IndiaLei (no brand icons for those in lucide).
- Edit `src/components/SiteLayout.tsx` header + footer only; links use `target="_blank" rel="noopener noreferrer"`.
