<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- All data/auth/inquiry calls go through `src/api/*` (axios client on `VITE_BACKEND_URL`); no Supabase/Cloud — the client targets a self-hosted VPS backend.
- When the backend is unreachable, API modules fall back to bundled data in `src/data/catalog.ts` (demo mode) so the site always renders.
