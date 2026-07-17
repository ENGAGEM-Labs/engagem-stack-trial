# Brand palette discrepancy — OPEN DECISION

Three sources disagree on the ENGAGEM palette. This is an **open brand decision**,
not a bug to "fix" in code. Nothing here changes the concept brief or any tokens.

## The three palettes, side by side

| Role | Live site (engagem.ca) | Concept brief | Logo (actual PNG pixels) |
|---|---|---|---|
| Green (primary) | `#16db94` | `#18d794` | `#18d890` |
| Dark | near-black `#1b1b1b` / `#313131` | teal-navy `#07344d` | navy `#001830` |
| Second accent | lime `#a9d621` | (none) | (none) |
| Surface | white `#ffffff` | white | white |
| Neutrals | greys `#f6f6f6 #f1f1f1 #d9d9d9 #4d4d4d` | (unspecified) | — |
| Type | Poppins | per-concept pairings | — |

Sources: live site + logo from `extract-design-system` run on 2026-07-16
(`.extract-design-system/raw.json`, logo sampled from
`https://engagem.ca/wp-content/uploads/2023/08/engagem_logo.png`); brief from
`ENGAGEM-concept-brief.md`.

## What actually agrees and disagrees

- **Green agrees everywhere.** All three land on essentially the same green
  (`#16db94` / `#18d794` / `#18d890`). This is not in dispute.
- **The dark color is the real split.**
  - Logo and brief both use a **navy** (`#001830` logo, `#07344d` brief).
  - The live site uses **near-black/grey** (`#1b1b1b` / `#313131`) with **no navy at all**.
- **Lime `#a9d621` exists only on the live site.** It is absent from both the
  logo and the brief.

## Why it matters

The logo is the one asset customers already associate with the brand, and it sides
with the brief (navy + green), against the current live site (black + lime + green).
The ten home-page concepts were built on the brief's teal-navy + green, so they match
the logo but not today's live site.

## The open question (for a human to decide)

1. Is the **live site** the current source of truth (adopt green + lime + black,
   drop navy), or is it **drifted** and due for realignment to the logo/brief?
2. Keep the **lime `#a9d621`** as an official second accent, or treat it as a
   live-site-only artifact?
3. If navy stays, which navy: the logo's `#001830` or the brief's `#07344d`?

No code, tokens, or brief have been changed pending this decision.
