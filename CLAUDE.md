# ENGAGEM site

Minimal Astro site (Astro `^5.10.0`). Source lives in `src/pages/` (file-based
routing); `npm run dev` / `build` / `preview` per `package.json`. Every push to
`origin/master` deploys to Vercel.

## Skills (`.claude/skills/`)

Project-local skills are committed to `.claude/skills/` so they travel with the
repo — every clone and every teammate gets the same design-to-deploy tooling.
Prefer these over ad-hoc approaches when the task matches.

- **`engagem-loop`** — the project's core workflow. Follow it whenever turning a
  Paper canvas design into shipped pages, or pulling live pages back onto the
  canvas. Named artboards map 1:1 to routes (the `/` route ↔ artboard **`home`**);
  read the canvas via the Paper MCP; build routes as Astro components with flex
  layouts and real text; run `web-design-guidelines` before every push; every
  push deploys to Vercel; pulled pages become `pulled-<route>` artboards.
- **`astro-framework`** — Astro specialist (components, hydration, content
  layer, routing, view transitions). Use when building or editing `.astro` code.
- **`web-design-guidelines`** — mandatory pre-push review gate for UI changes;
  audits code against the Web Interface Guidelines.
- **`frontend-design`** / **`ui-ux-pro-max`** — aesthetic direction, typography,
  color, and layout intelligence when the design leaves room for choices.

### Conventions

- Install project skills into `.claude/skills/<name>/` (each a folder with its
  own `SKILL.md`) and commit them — do not rely on user- or machine-global skills
  for anything the whole team needs.
- The `/` route's design artboard is named **`home`** (route `/` →
  `src/pages/index.astro`). Keep artboard names and route paths in lockstep.
