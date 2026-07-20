# ENGAGEM Paper Playbook v1.2

Living document. Log new tricks, gotchas, and agent behaviors here as we find them. Sources: paper.design/docs (support, MCP, tokens, paste pages) and the Paper build log. Paper docs show Mac keys; on our Windows machines read Cmd as Ctrl and Option as Alt.

---

## Nat's onboarding: machine setup, step by step

One-time setup, about 20 minutes. Do this before the first session tutorial below. Everything here lives on your machine; the account, the repo, and the skills are already set up and come along automatically.

**1. Install Paper Desktop.** Download the Windows app from paper.design, install, and sign in to the ENGAGEM team (Chris sends the invite from the team settings). Confirm you can open the engagem-stack-trial file and see the smoke-test artboard.

**2. Install Paper Snapshot.** Chrome Web Store, search Paper Snapshot, add to Chrome. This is the tool that pulls live web pages onto your canvas.

**3. Install Claude Code.** Follow the current install instructions at code.claude.com for Windows. When it asks you to log in, use the ENGAGEM Claude account credentials (get them from Chris). Heads up: we share one plan for now, so if the agent ever stalls with a limits message mid-session, that's you and Chris drawing from the same tank; tell Chris, it's a known constraint.

**4. Get the project.** Open PowerShell (Start menu, type PowerShell, Enter) and run these two lines. The first copies the site project to your machine, the second steps into it:
```
git clone https://github.com/ENGAGEM/engagem-stack-trial.git
cd engagem-stack-trial
```
If PowerShell says git isn't recognized, install it from git-scm.com first (default options all the way through), then reopen PowerShell and retry. Ask Chris for the exact repo address if the line above doesn't match.

**5. Connect Paper to the agent.** One line, one time, with Paper Desktop open:
```
claude mcp add paper --transport http http://127.0.0.1:29979/mcp --scope user
```
Success message: "Added HTTP MCP server paper." Every project on your machine can now see your canvas.

**6. First launch.** In PowerShell, still inside the project folder, type `claude` and Enter. It will ask if you trust this folder; answer yes (it's our own project). Then type `/mcp` and confirm paper shows a green "connected."

**7. Prove it works.** Type this to the agent: "Using the paper MCP tools, tell me which Paper file you currently see." If it names the file you have open, your bridge is live. If it fails: is Paper Desktop open with a file loaded? Restart Paper, then restart the agent session, in that order.

**8. Authenticate on first use.** The first time you ask the agent to publish anything, it will walk you through logging in to GitHub and Vercel in your browser. Follow its prompts; it's a one-time handshake per service.

Daily startup after onboarding is just: open Paper Desktop with your file, open PowerShell, `cd engagem-stack-trial`, `claude`. Two apps, four words.

---

## Hotkeys that matter

### Canvas basics
| Key | Action |
|---|---|
| **F** | Add a frame (the page container; correction: it is F, not A) |
| **Shift+F** | Wrap current selection in a frame |
| **Shift+A** | Wrap selection in a flex layout (real web layout, the agent thinks in these) |
| **T** | Text layer |
| **R** | Rectangle |
| **P** | Pen tool (draw and edit SVG paths) |
| **V** | Move tool |
| **H** | Pan tool (stays active until you switch) |
| **Ctrl+.** | Hide/show the entire UI (clean look at the design) |

### Selection (learn these, they save the most time)
| Key | Action |
|---|---|
| **Enter / Esc** | Step down into children / up to parent of current layer |
| **Ctrl+Click** | Deep select a layer nested inside frames |
| **Ctrl+Right-click** | List every layer under the cursor |

### Duplicate, styles, sharing
| Key | Action |
|---|---|
| **Ctrl+D** | Duplicate selection |
| **Shift+Ctrl+V** | Paste on top of selection |
| **Shift+Ctrl+R** | Paste to replace selection |
| **Alt+Ctrl+C / Alt+Ctrl+V** | Copy styles / paste styles (huge for consistency) |
| **Ctrl+L** | Copy share link to current file |

### Typography (Nat's row)
| Key | Action |
|---|---|
| **Ctrl+B / Ctrl+I** | Bold / italic |
| **Ctrl+Shift+, / .** | Font size down / up |
| **Alt+Shift+, / .** | Line height down / up |
| **Alt+, / .** | Letter spacing down / up |
| **Alt+Ctrl+, / .** | Font weight down / up |
| **Alt+Ctrl+L / T / R** | Align text left / center / right |

---

## Key features to know

**Flex layouts are the native language.** Paper elements are real HTML/CSS. Design in flex frames (Shift+A) instead of free-floating pixels and the agent's code output matches the canvas one to one. Rule of thumb: if Nat builds it with flex, the round trip is clean.

**Theme tokens, synced by agent.** Tokens (colors, spacing, type) can be added to a Paper file via MCP straight from a codebase's CSS variables, or from an existing design. Copy a theme between files: File menu > Theme > Copy theme / Paste theme. This is how the ENGAGEM brand skill and the canvas will share one source of truth.

**Paste from anywhere.** Figma selections, raw HTML, and SVGs paste in as editable layers. Snapshot (our Chrome extension) does the same for any live web page.

**Shaders.** Built-in GPU effects (gradients, grain, presets) with video export. Agents can create and adjust them by prompt. This is our anti-generic visual ammo; use one signature effect per page, not five.

**Pen and SVG editing.** Full vector path editing on anything pasted, generated, or vectorized. Logo tweaks and custom marks can happen on canvas.

**Other styles panel.** Agent-added CSS that has no visual control yet shows up in an "Other styles" panel. If something looks uneditable, check there before assuming a bug.

---

## Agent + MCP rules of thumb

1. **The MCP server only exists while Paper Desktop has a file open.** Agent can't see Paper? Check the desktop app first.
2. **The agent operates on the currently open file.** Verify with "call get_basic_info and tell me which file you see" before real work.
3. **Standard fix for stale connections:** restart Paper Desktop, then restart the Claude Code session. In that order.
4. **Name artboards like routes** (home-hero, pricing, contact). Named artboards become unambiguous instructions: "build home-hero as the index page."
5. **Comments are instructions.** Write canvas comments as imperatives ("Increase headline to 64px", "Swap this image"), one change per comment. The agent implements them on request.
6. **Log every failure.** Tool errors, wrong-file confusion, fidelity drift. The stack is young; our log is the stability verdict.

---

## Resources

- **paper.design/docs** — MCP setup, tokens, paste, SVGs, support. Short reads, check MCP and Tokens pages first.
- **paper.design/build-log** — ships changes constantly (tokens-via-MCP and the pen tool both landed recently). Skim weekly; new agent abilities appear here first.
- **paper.design/docs/support** — troubleshooting list, including proxy/firewall allowlist if we ever run this behind client networks.
- **team@paper.design** — direct line to the team; they're in alpha and responsive to feedback.
- **Our own log below** — the fastest accelerator is our own notes.

---

## Nat's first session: a guided tour in 10 exercises

Built for someone fluent in Figma, XD, and Canva. Budget 90 minutes. Do these in order in the engagem-stack-trial file; each one teaches a capability we'll use in production. Chris pairs on exercises 8 to 10.

**The one mental shift before starting:** in Figma you draw a picture of a website. In Paper you build the actual material of one. Every element is real HTML/CSS, so the properties panel shows web truth (padding, gap, flex direction), and whatever you make is what ships. Nothing gets "handed off" and reinterpreted; the agent reads your canvas directly.

### 1. Selection model (5 min)
Click into any nested layer. Use **Enter** to step down into children, **Esc** to step up to the parent, **Ctrl+Click** to deep select, **Ctrl+Right-click** to list everything under the cursor. Same tree-thinking as Figma, slightly different keys. This is the muscle memory to rebuild first.

### 2. Frames and flex (10 min)
Press **F**, draw a frame, drop three rectangles in it, select them, press **Shift+A** to wrap in a flex layout. Now inspect the panel: direction, gap, padding. This is Figma auto layout, except it IS CSS flexbox rather than an imitation of it. Lesson that matters most for us: anything built in flex round-trips to code cleanly; free-floating absolute elements are where fidelity drift lives. Flex by default.

### 3. Typography (10 min)
Add text (**T**), then drive everything from the keyboard: size **Ctrl+Shift+, / .**, line height **Alt+Shift+, / .**, letter spacing **Alt+, / .**, weight **Alt+Ctrl+, / .**. Copy styles with **Alt+Ctrl+C**, paste onto other text with **Alt+Ctrl+V**. These are real CSS properties, so the type you set is the type users get.

### 4. Paste from Figma (10 min)
Copy a frame from any existing Figma file and paste it into Paper. Inspect what survived and what didn't; simple structures come across near-perfect, complex auto layout sometimes needs a touch-up. Verdict to form: is pasting old ENGAGEM assets in faster than rebuilding? Log the answer.

### 5. Tokens (10 min)
Open File menu > Theme. Tokens are named values (colors, spacing, type) that everything references, same idea as Figma styles/variables. The difference: the agent can create and edit tokens too, including pulling them from a codebase's CSS variables, so canvas and code share one palette. Rule: style with tokens, never hard-coded hex, and the brand stays consistent everywhere by mechanism instead of discipline.

### 6. Shaders (10 min)
Add a shader element and cycle the presets: gradients, grain, textures. Nothing in Figma or Canva corresponds to this; they're live GPU effects that ship as real web material, and the agent can adjust them by prompt. Our rule from the playbook: one signature effect per page. Pick one you'd actually use on the ENGAGEM hero.

### 7. Pen and SVG (5 min)
Paste the ENGAGEM logo SVG and click in with the pen tool (**P**). Full node editing, curvature, fill and stroke. Small vector work no longer requires Illustrator round trips.

### 8. Comments as instructions (10 min, with Chris)
Leave three comments on a test artboard, written as imperatives, one change each: "Set headline to 64px." "Make this button green." "Add 40px gap between these." Chris tells Claude Code to read and implement them, and you watch your comments become edits. This is your production workflow: you never touch a terminal, your annotations are the commands. Writing tip: comment like you're briefing a very fast, very literal junior. Specific values beat adjectives ("64px" beats "bigger").

### 9. Watch the agent draw (5 min, with Chris)
Chris asks Claude to build something on your canvas from a sentence while you watch. Form an opinion about what it's good at (structure, layout, speed, variants) and where it needs you (taste, brand judgment, restraint). Division of labor: the agent produces, you direct and elevate.

### 10. The full loop (15 min, with Chris)
The finale, and the reason the stack exists. Watch one page go: your artboard, then Claude builds it as real code, then a private preview link on the web, then Snapshot pulls that live page BACK onto your canvas as editable layers, then you change the headline, then the agent re-publishes it. That loop is what replaces WordPress.

### How pages move to and from the web (plain-language version)
You never open GitHub or Vercel; those run underneath, operated by the agent. The vocabulary that matters:

- **"Build this artboard as a page"** — the agent turns your named artboard (home-hero, pricing) into real site code and stores it in the project's version history. Every change is recorded and reversible, like Figma version history for the whole website.
- **"Publish"** or **"deploy"** — the agent pushes that code to the web. Every change first gets a **preview link**: a private URL showing exactly what the live site will look like. Nothing goes public without someone approving the preview.
- **"Pull the page"** — Snapshot (Chrome extension) captures any live page, ours or a reference site, back onto your canvas as editable layers. Edit it visually, then the agent reconciles your changes with the real code and re-publishes.

So the whole system in one sentence: you design and annotate on canvas, the agent handles every technical step in both directions, and version history means nothing can be permanently broken.

### Getting the best out of Claude, designer's edition
1. Name artboards like routes (home-hero, contact), never Frame 1.
2. Build in flex layouts; avoid free-floating elements.
3. Style with tokens, not hard-coded values.
4. Design with real ENGAGEM content, never lorem ipsum.
5. One change per comment, imperative voice, specific values.
6. Delegate the repetitive (variants, resizes, spacing sweeps); keep the judgment (hierarchy, taste, brand).
7. If the agent goes blind or weird: Paper Desktop open? Right file open? Restart Paper, then restart the agent session.
8. Log surprises in the field log below; your notes train the whole team.

---

## ENGAGEM field log

*(Add dated entries as we learn. Format: date, what happened, what we now do differently.)*

- 2026-07-15 — Stack trial day. Desktop app installed, Snapshot installed, engagem-stack-trial file created.
- 2026-07-15 — MCP smoke test passed first try: agent created the smoke-test artboard exactly to spec. Loop proven canvas to live (Test 1 pass, zero drift).
- 2026-07-15 — Snapshot extension verdict: broken in Chrome (icon dead, then saved .html files instead of clipboard), part-works in second browser (Ctrl+Enter = whole page). Benched: alpha, unreliable on Windows, revisit in a few releases. Use case is competitor/reference/client-site imports only; for our own pages, pull from code via the agent instead. Dragging files onto the Paper canvas is not a supported import path.
- 2026-07-15 — Infra locked: repo under ENGAGEM-Labs org, Vercel team (Pro) confirmed, auto-deploys on push. Rule: repos live under the org, never personal accounts.
- 2026-07-15 — Concept gallery run: 10 pages in 19 min. Lesson: directions from a text database render generic. Fix adopted: reference-driven workflow (real sites, steal-notes, extraction, DESIGN.md contract, then 3 deep concepts instead of 10 shallow).
- 2026-07-15 — Skill collision seen in the wild: ui-ux-pro-max proposed Inter; frontend-design bans it. When outputs conflict, name which skill leads for the task.
- 2026-07-16 — Supply-chain lesson: designlang repo (3.4k stars three months ago) deleted; only copy an unverifiable 0-star fork. Rule: agent verifies sources before install, we read every SKILL.md before approving, prefer maintained alternatives. Installed arvindrk/extract-design-system instead.
- 2026-07-16 — Skills shelf now 7: frontend-design, web-design-guidelines, astro-framework, ui-ux-pro-max, engagem-loop, logo-designer, extract-design-system. All committed to the repo; Playwright Chromium (~690 MB) lives in machine cache, per machine.
- 2026-07-16 — extract-design-system v1 quirk: normalizer drops colors; the real data is in raw.json. Agent must read raw.json directly; tokens.css was hand-rebuilt. Log kept: environment installs happen at session start, never mid-task.
- 2026-07-16 — Extraction on engagem.ca surfaced brand drift: green agrees everywhere (#16db94/#18d794/#18d890), but dark color is contested (logo navy #001830 vs live-site black + stray lime #a9d621; brief's teal-navy #07344d matches neither). Documented in design-system/brand-discrepancy.md. Open question owned by Nat as design-brief input #1.
- 2026-07-20 — extract-design-system v1 quirk #2: iconSystem came back empty on 6 of the 8 core reference sites (crope, superside, antigravity, wavespace, vcamp, zendesk); only osmo and softr populated it, and even then it reports generic type ("SVG Icons", "Font Awesome"), never icon style. So the field is useless for our icon steals either way. What we do differently: icon-related steals (crope's hamburger, wavespace's "/ Industries We Serve") get manual visual capture — screenshot the element and read it by eye, do not wait on the extractor. Broader lesson from the 8-site run: the tool reliably captures the token layer (color, type scale, spacing, radius, shadow, borders, breakpoints) and captures none of the structural/motion/imagery layer, which was 12 of our ~18 steal-notes. Plan extraction as the token half of the job only.

