# Design System

Visual identity for rennancl.github.io (home + Details). Not applied to Breakout, Bigorna, or the Constellation page — those keep their own look.

## Why olive + violet

Most personal sites lean on one accent color. This one uses two, deliberately:

- **Olive** — curiosity, exploration, day-to-day work. Used for links, primary actions, and tags.
- **Violet** — reflection, research, synthesis. Used for headings and moments of emphasis.

They don't compete — olive invites you in, violet marks the more considered moments (a heading, a callout, an insight).

## Color tokens

The site draws from a larger brand palette (Base, Olives, Purples, Neutrals, Reds, Yellows, Blues, Functional — see `assets/css/style.css` for the full `:root` token list). Only a handful of semantic roles are actually used on the page today:

| Token | Hex | Source | Use |
|---|---|---|---|
| `--bg` / `--bg-light` | `#F3F2F3` | White Smoke / Paper | Page background, nav bar, card backgrounds |
| `--text` | `#0F1110` | Onyx | Body copy only — never headings |
| `--text-secondary` | `#76756D` | Stone | Captions, authors, meta text |
| `--olive-700` | `#415323` | Olive Leaf / Olive 700 | Links, primary buttons, tags |
| `--violet-700` | `#36263D` | Midnight Violet / Plum 700 | Headings, hover states, secondary buttons |
| `--violet-400` | `#68546E` | Vintage Grape / Grape 500 | Icon hover, emphasis in running text |
| `--border` | `#CFCBC3` | Ash | 1px dividers only |

**Rule:** headings are always `--violet-700`, never `--text`. Body copy is always `--text`, never pure black. This is what gives the page depth without adding more colors.

The rest of the brand palette (Reds, Yellows, Blues, Functional colors like `--success`/`--warning`/`--error`) isn't used on the site yet — it's there for future features that need status/alert colors, without inventing new ones ad hoc.

## Typography

Three families, nothing else:

| Family | Where | Weights |
|---|---|---|
| Cormorant Garamond | All headings | 500, 600, 700 |
| Inter | Body copy, nav, buttons | 400, 500 (never bolder) |
| IBM Plex Mono | Dates, tags, the logomark, captions | 400 |

Scale (desktop maximum, scaled down responsively via `clamp()`):

| Token | Size |
|---|---|
| H1 | 72px |
| H2 | 48px |
| H3 | 32px |
| Body | 22px |
| Small | 18px |
| Caption | 15px |
| Mono | 14px |

Generous line-height: 1.5–1.6 for body copy, 1.2–1.3 for headings.

## Buttons

**Primary** — `background: var(--olive-700); color: var(--bg);` → hover `background: var(--violet-700);`

**Secondary** — `background: transparent; border: 1px solid var(--violet-700); color: var(--violet-700);` → hover `background: var(--violet-700); color: var(--bg);`

## Icons

Hand-drawn inline SVGs, no icon library. 24×24 viewBox, `stroke="currentColor"`, `stroke-width: 1.5`, `fill: none`, rounded caps/joins. Color follows the same rules as text/links (`--olive-700` default, `--violet-400` on hover).

## Dividers

1px, `--border`, nothing heavier.
