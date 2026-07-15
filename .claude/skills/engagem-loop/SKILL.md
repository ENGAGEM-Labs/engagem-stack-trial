---
name: engagem-loop
description: >-
  DRAFT. The ENGAGEM design-to-deploy loop for this Astro site. Use whenever
  turning a Paper canvas design into shipped pages, or pulling live pages back
  onto the canvas. Named artboards map 1:1 to routes; read the canvas via the
  Paper MCP; build routes as Astro components with flex layouts and real text;
  run web-design-guidelines before every push; every push deploys to Vercel;
  pulled pages are recreated on the canvas as artboards named pulled-<route>.
---

# ENGAGEM loop (draft)

The single loop this project runs on: **canvas → code → deploy**, and back
(**live → canvas**). Artboards and routes are two views of the same thing.

> Status: DRAFT — encodes the agreed workflow. Refine as the project settles.

## Core invariant: artboards map to routes

Artboard names ARE route paths. Keep them in lockstep — one artboard, one route.

| Artboard name | Route | Astro file |
|---|---|---|
| `home` | `/` | `src/pages/index.astro` |
| `about` | `/about` | `src/pages/about.astro` |
| `pricing` | `/pricing` | `src/pages/pricing.astro` |
| `blog/post` | `/blog/post` | `src/pages/blog/post.astro` |
| `pulled-<route>` | (mirror of a live page) | — read-only reference artboard |

Nested paths use `/` in the artboard name. If an artboard has no matching route,
that's the work item: build the route. If a route has no artboard, either it was
pulled from live (see below) or the canvas is behind.

## Direction A — canvas → code (build)

1. **Read the canvas via the Paper MCP.** Load the guide first
   (`get_guide({ topic: "paper-mcp-instructions" })`), then `get_basic_info` to
   enumerate artboards and dimensions, and `get_selection` for the user's focus.
   Pull exact values with `get_jsx` / `get_computed_styles` / `get_fill_image` —
   never read colors or sizes off a screenshot.
2. **Map each artboard to its route** per the table above.
3. **Build as Astro components.** Follow the installed `astro-framework` skill.
   Compose pages from reusable components in `src/components/`; keep pages in
   `src/pages/` thin. Use `frontend-design` and `ui-ux-pro-max` for aesthetic
   direction where the design leaves room.
4. **Flex layouts and real text only.**
   - Layout uses real CSS flexbox/grid that reflows — no absolute-positioned
     pixel-pinned nodes, no fixed heights standing in for content.
   - All copy is real, semantic text in the markup — no text baked into images,
     no lorem ipsum shipped, no screenshots of type.
5. **Before any push: run `web-design-guidelines`.** Review the changed
   files against the Web Interface Guidelines and fix findings first. This gate
   is mandatory — no push skips it.
6. **Push → deploy.** Every push to the repo deploys to Vercel. There is no
   separate deploy step; pushing IS deploying. So the pre-push guidelines review
   is also the pre-deploy review — treat `git push` as a production release.

## Direction B — live → canvas (pull)

When bringing a live/production page back onto the canvas (e.g. to redesign or
document what actually shipped):

1. Fetch/inspect the live page for the route.
2. Recreate it on the canvas as a **new artboard named `pulled-<route>`**
   (e.g. the live `/pricing` becomes artboard `pulled-pricing`; the `/` route —
   whose design artboard is `home` — becomes `pulled-home`). Use `write_html` to
   build the artboard, then `get_screenshot`
   to review, and `finish_working_on_nodes` when done.
3. `pulled-*` artboards are reference/mirror artboards — they record what is
   live. They are NOT the source-of-truth design artboard for the route; the
   plain-named artboard is. Diff `pulled-<route>` against `<route>` to see drift
   between design and production.

## Checklist per change

- [ ] Canvas read through Paper MCP (exact values, not screenshots)
- [ ] Artboard ↔ route mapping is 1:1 and correct
- [ ] Built as Astro components (`astro-framework` idioms)
- [ ] Flex/grid layout that reflows; all text is real semantic markup
- [ ] `web-design-guidelines` run and findings resolved
- [ ] Push (= Vercel deploy) only after the gate passes
- [ ] Any pulled page recreated as `pulled-<route>` artboard

## Related skills

- `astro-framework` — how to build the components/routes
- `web-design-guidelines` — the mandatory pre-push gate
- `frontend-design`, `ui-ux-pro-max` — aesthetic direction
- Paper MCP (`paper` server) — the canvas read/write interface
