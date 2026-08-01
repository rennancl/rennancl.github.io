# Design System

An **editorial, scientific, technical, tactile** visual language — intellectual and confident without being ornamental.

It relies on strong typography, generous negative space, physical depth, isolated photographic objects, precise technical annotation, and restrained color.

**Principles** — Curiosity (invite exploration) · Depth (reveal structure) · Intentionality (every decision has a reason) · Elegance (distinction through restraint) · Clarity · Simplicity · Precision.

> **The page is a workspace. Ideas are organized on it, evidence is measured on it, objects are placed upon it for examination.**

---

## Tokens

Nothing outside this set should appear as a raw value in a stylesheet.

```css
:root {
  /* Base — the actual identity */
  --onyx:       #101015;  /* structure */
  --navy:       #080880;  /* depth     */
  --blue:       #1111DE;  /* focus     */
  --paper:      #FDFCFD;  /* space     */

  /* Supporting neutrals */
  --graphite:   #2D2D36;  /* secondary dark surfaces and text */
  --mist:       #C9CAD4;  /* dividers, metadata               */

  /* Blue, carried into the dark — takes Onyx text when used as a fill */
  --blue-bell: #10A4FF;

  /* Semantic — two levels only, Deep for surfaces, Signal for communication */
  --green-deep:    #043C12;   --green-signal:  #077A10;
  --yellow-deep:   #4D3500;   --yellow-signal: #B59A00;
  --red-deep:      #3F000C;   --red-signal:    #900B10;

  /* Elevation — derived from Onyx, never pure black */
  --shadow-sm: 0 2px 8px   rgba(16, 16, 21, .06);
  --shadow-md: 0 8px 24px  rgba(16, 16, 21, .09);
  --shadow-lg: 0 20px 50px rgba(16, 16, 21, .14);

  /* Voices */
  --serif: "Source Serif 4", Georgia, serif;
  --sans:  "Source Sans 3", Inter, Helvetica, Arial, sans-serif;
  --mono:  "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}
```

Weights: Source Serif 4 `300–700` (optical sizing `8..60`) · Source Sans 3 `300–700` · IBM Plex Mono `400/500/600`.

Further hierarchy comes from **opacity over these tokens**, not new color values — e.g. `rgba(253,252,253,.75)` for secondary text on dark, `rgba(201,202,212,.42)` for quiet borders on light. Avoid families of near-identical grays.

---

## Color

| Color      | Meaning                                | Use for                                                                     |
| ---------- | -------------------------------------- | --------------------------------------------------------------------------- |
| **Onyx**   | rigor, structure, information          | body text, typographic contrast, dark surfaces, diagrams. Prefer to pure black |
| **Navy**   | knowledge, depth, synthesis, authority | major sections, large dark surfaces, important headings, section transitions |
| **Blue**   | attention, interaction, discovery      | links, active states, selected data, paths, CTAs, key words, interruptions   |
| **Paper**  | clarity, openness, editorial space     | the dominant surface — prefer empty space over additional elements           |

These four account for the overwhelming majority of every composition, in the hierarchy **Paper + Onyx → Navy → Blue → semantic**. Most work should feel complete with the base palette alone. Blue is the most active color and should occupy less area than Navy or Paper.

### Blue on dark surfaces

Blue is nearly unreadable on Onyx — around **1.9:1**, barely separable from the background. On dark surfaces its role passes to **Blue Bell `#10A4FF`**: kickers, links, active indicators, mono annotations, icon strokes, and the accent on any dark field.

| Accent on Onyx      | Contrast    |
| ------------------- | ----------- |
| `--blue` `#1111DE`  | 1.95:1 ✗    |
| `--blue-bell` `#10A4FF` | 7.02:1 ✓ |

Blue Bell is not a fifth brand color. It is Blue carried into the dark, saturated enough to still read as *blue* rather than drifting into lavender.

**A Blue Bell fill takes Onyx text, not Paper.** It is bright enough to behave as a light color — Paper on Blue Bell is only 2.6:1, while Onyx on Blue Bell is 7.0:1. This inverts the light-mode rule, where a Blue fill takes Paper text.

The distinction is between marks and fills:

* **as a mark** — text, strokes, rules — Blue fails on dark and must become Blue Bell;
* **as a fill** — buttons, badges — either works, but the text on top flips accordingly.

### Semantic layer

Green, Yellow, and Red communicate **meaning, not identity**. Each has exactly two levels: `Deep` for large surfaces, `Signal` for immediate communication.

| Color      | Meaning                                              |
| ---------- | ---------------------------------------------------- |
| **Green**  | success, validation, completion, improvement         |
| **Yellow** | attention, caution, anomaly, unresolved information  |
| **Red**    | error, risk, failure, contradiction, limitation      |

They must never compete with Blue as brand colors, and should carry real meaning rather than add variety. A composition holding many colors at once is exceptional, not normal.

> **Base colors create the identity. Semantic colors communicate states.**

---

## Typography

Three voices, separated by **function**:

| Voice             | Role                | Use for                                                                       |
| ----------------- | ------------------- | ----------------------------------------------------------------------------- |
| **Source Serif 4** | expresses the idea | titles, section headings, key concepts, editorial statements, questions, quotes |
| **Source Sans 3**  | explains the idea  | body copy, descriptions, navigation, labels, buttons, captions, UI             |
| **IBM Plex Mono**  | measures the idea  | code, values, metrics, dates, parameters, table data, metadata, identifiers    |

A typical composition contains all three:

**Representation Through Sequence** (serif)
We investigate how information changes as contextual constraints are introduced. (sans)
`N = 18,420 · CONTEXT = 16K · Δ +12.8%` (mono)

### Metrics

Much of the character comes from **how type is set**, not only which typeface.

**Serif display** — weight `500`, *not* `700`; tracking `-0.045em` at display sizes, `-0.025em` at smaller headings; line-height `0.96`. Display type earns presence through size and space, never boldness. At weight 700 a title looks like an advertisement.

**Sans** — normal tracking; line-height `1.2` at large sizes, `1.35` for small text. Secondary text uses `Graphite`, not a lighter weight.

**Mono, two modes** — *values* are tight and normal-case (`-0.015em`): `N = 12,840 · Δ +18.4%`. *Labels* are uppercase and open (`0.06em`–`0.08em`): `EXPERIMENT / 04`. The first measures, the second annotates.

**Scale** — only the editorial voice scales; body and technical text stay fixed.

```css
h1 { font-size: clamp(70px, 9vw, 136px); }
h2 { font-size: clamp(48px, 6vw, 86px); }
```

Sans weights: `400` normal · `500` emphasis and UI · `600` section labels · `700` sparingly. Never depend on weight for hierarchy — size, spacing, and position do the work.

### Kicker

A short mono label above a serif heading, naming the territory without adding a second headline. `Blue Bell` on dark surfaces.

```css
font-family: var(--mono);
font-size: 13px;
letter-spacing: 0.08em;
text-transform: uppercase;
color: var(--blue);
```

---

## Depth and Surfaces

### Geometry

The system is **square** — cards, fields, buttons, tables, images and surfaces all use `0` radius. The only rounded forms are genuinely circular objects such as status dots. Rounded rectangles read as generic product UI; sharp corners read as print.

### Gradients

Never decorative, never glossy or three-dimensional. Exactly three are permitted, all sharing a `135deg` axis so the light direction stays consistent.

**01 — Ambient wash.** Paper is rarely dead white; a faint atmosphere suggests light falling across the page. If it reads as "a gradient", it is too strong.

```css
background:
  radial-gradient(circle at 75% 15%, rgba(17, 17, 222, .10), transparent 28%),
  radial-gradient(circle at 12% 82%, rgba(8, 8, 128, .09), transparent 30%),
  var(--paper);
```

**02 — Dark surfaces.** Never flat Onyx; the move into Navy reads as depth rather than a black box, and the Blue glow keeps the section from feeling inert.

```css
background:
  radial-gradient(circle at 80% 25%, rgba(17, 17, 222, .35), transparent 28%),
  linear-gradient(135deg, var(--onyx), var(--navy));
```

**03 — Semantic fields.** `Deep → Signal`, giving the two-step families a large-surface form without inventing intermediate tints.

```css
background: linear-gradient(135deg, var(--green-deep), var(--green-signal));
```

### Translucency

Glassmorphism is rejected as a style. Blur is permitted only for **chrome floating above content** — navigation, controls, viewport-anchored overlays. Content itself is never placed on frosted glass. Blur signals *this is above the page*, not *this is pretty*.

```css
background: rgba(253, 252, 253, .78);
backdrop-filter: blur(12px);
border: 1px solid rgba(201, 202, 212, .72);
```

### Shadows

Soft and diffuse, derived from Onyx rather than black. Used for cards, floating objects, cutouts, overlays, and elements breaking the grid. Avoid dramatic elevation.

**Rectangles** (cards, fields, chrome) use `box-shadow` with the tokens. **Cutout objects** use `filter: drop-shadow()` so the shadow follows the contour rather than the bounding box — using `box-shadow` on a cutout draws a visible rectangle around a silhouette and breaks the metaphor.

```css
filter: drop-shadow(0 32px 45px rgba(16, 16, 21, .26));
```

Object shadows are larger, lower, and more diffuse than card shadows: a card sits on the page, an object has been placed on it.

> **Shadows indicate hierarchy, not decoration.**

---

## Composition

Three depths: **01 Surface** (usually Paper — quiet, open, flat) · **02 Information** (typography, grids, tables, diagrams, rules) · **03 Objects** (silhouettes, featured results, focal cards — these float, overlap, cast shadows, and may escape the grid).

Compositions are built **header → body → footer**: a kicker and serif heading above, mono metadata below, the weight in the middle.

**Deliberate asymmetry** — two-column splits sit slightly off balance. The difference is small enough never to read as a mistake, large enough that the layout never feels like a default. An exact `1fr 1fr` reads as a template. Three-column groups are the exception and do sit even, since their rhythm comes from the cards.

```css
grid-template-columns: .92fr 1.08fr;   /* argument | evidence */
grid-template-columns: 1.02fr .98fr;   /* statement | object  */
```

**Space** — generous outer padding is part of the identity, not margin to reclaim. Content should end well before the edge. When a composition feels weak, the answer is almost always more space and fewer elements, not another accent color.

---

## Components

### Cards

Use only when grouping genuinely improves understanding — prefer open layouts, whitespace, alignment, dividers, and typographic hierarchy over turning everything into a container. Three tiers:

```css
/* Default — a barely-there surface lifted off Paper */
background: rgba(247, 246, 247, .72);
border: 1px solid rgba(201, 202, 212, .42);
box-shadow: var(--shadow-sm);

/* Feature — promoted by light and elevation, not color: brighter, not darker */
background: var(--paper);
box-shadow: var(--shadow-md);

/* Dark — a single point of contrast, at most one per row */
background: var(--onyx);
color: var(--paper);
border: 0;
box-shadow: var(--shadow-lg);
```

Inside a dark card, dividers become `rgba(253, 252, 253, .28)` rather than Mist. Blue is rarely used for large card backgrounds — its saturation gives it far too much prominence.

### Fields

A saturated block carrying a statement, not a container of details — an interruption rather than a neutral surface. Generous padding, short large type. A field holding a paragraph of small text is a card that was colored in by mistake. Fields are a natural surface for a cutout to overlap.

```css
background: var(--navy);  /* or var(--blue) */
color: var(--paper);
padding: 50px;
box-shadow: var(--shadow-lg);
```

**Navy** can be used freely for section weight. **Blue** should appear roughly once per composition.

### Badges

Small mono markers labelling an object or state — `13px`, Paper on Blue, `8px 10px` padding. On a colored field they become `rgba(253, 252, 253, .18)`. Badges are labels, not buttons, and never form rows of decorative pills.

### Featured values

One important number may be set far larger than everything around it — mono, `~70px`, line-height `.95`, tracking `-.05em`, in Blue. It stays in mono because it remains evidence; it does not become a serif headline just because it grew. One per composition — a grid of six giant numbers is a dashboard, not an argument.

### Buttons

**Primary** — Blue background, Paper text. **Secondary** — Onyx or Navy text with a restrained border, optionally inverting to Navy on hover. **Tertiary** — text only, usually Blue with a typographic indicator (`→` `↗` `+`). Avoid button chrome.

### Borders and dividers

`1px solid var(--mist)`. For major transitions prefer whitespace, a change in scale, a Navy section, or a typographic break over thicker rules.

### Tables

Sans for descriptive row labels; mono for numbers, percentages, conditions, codes, dates, and model names treated as identifiers. Never box every cell. One `Onyx` rule under the header, `Mist` between rows, no vertical rules at all. Numeric columns are right-aligned so digits stack.

```css
th { font-family: var(--mono); font-size: 13px; text-transform: uppercase;
     letter-spacing: .06em; color: var(--graphite); text-align: left;
     border-bottom: 1px solid var(--onyx); }
td { border-bottom: 1px solid var(--mist); }
```

| MODEL    | CONTEXT | ROUGE-1 |        Δ |
| -------- | ------: | ------: | -------: |
| Baseline |    `4K` | `0.418` |      `—` |
| Proposed |   `16K` | `0.512` | `+22.5%` |

The impression should be a **research artifact**, not a spreadsheet application.

### Diagrams

Colors come from the base palette: `Onyx` structure and labels · `Navy` established structure · `Blue` active path · `Paper` negative space. Introduce `Green/Yellow/Red Signal` only when the semantic meaning is genuinely needed.

A node is a small floating surface, not an outlined box — serif for the concept (`Surface`), mono for the identifier (`01 / PAPER`). Connectors are plain `2px` lines, not ornamental arrows. Nodes cast shadows and may sit at slight angles; connectors stay straight.

```css
background: var(--paper);
border: 1px solid rgba(201, 202, 212, .7);
box-shadow: var(--shadow-md);
```

The result should look like objects arranged and linked on a surface, not a flowchart from a diagramming tool.

### Icons

Simple and subordinate to typography. `Onyx` default, `Graphite` secondary, `Blue` interactive; semantic colors only when communicating those states.

```text
24 × 24 viewBox · stroke="currentColor" · stroke-width="1.5"
fill="none" · stroke-linecap="round" · stroke-linejoin="round"
```

---

## Objects and Imagery

Images should feel like **objects under examination**, not decorative photography:

**object → cutout → shadow → composition**, never **photo → rounded rectangle → card**.

Preserve the natural silhouette of the subject and let its own contour define the image. Suitable subjects: plants, leaves, instruments, books, artifacts, computers, components, architecture, prototypes, documents — anything directly related to the subject discussed. Background removal need not be artificially perfect when the natural contour contributes character.

Silhouettes may overlap typography, cards, diagrams, grid boundaries, fields, and margins, creating controlled irregularity within a rigorous system.

**Rotation** — objects are almost never perfectly upright. A `3°`–`9°` tilt separates *an object resting on a surface* from *an image pasted into a slot*. Beyond ~`10°` it reads as playful. The grid stays rigorous; the objects placed on it do not.

---

## Applying the System

Work in this order:

**1. Typography** — the idea should be understandable through hierarchy alone.
**2. Space** — give the composition room.
**3. Base palette** — establish identity with Paper, Onyx, Navy, Blue.
**4. Structure** — grids, rules, tables, alignment.
**5. Depth** — shadows and layering where useful.
**6. Objects** — silhouettes and cutouts as focal elements.
**7. Semantic color** — only when meaning requires it.

**Avoid:** unnecessary containers · rounded corners on surfaces · gradients as decoration rather than atmosphere, depth, or semantic surface · frosted glass anywhere but floating chrome · excessive pills · icon-heavy interfaces · illustration without semantic purpose · generic 3D blobs · collections of unrelated accent colors.

---

> **Serif ideas. Sans explanations. Mono evidence.**
> **Paper space. Onyx structure. Navy depth. Blue focus.**
> **Semantic color only when it means something.**
> **Shadows and silhouettes to give ideas physical presence.**

This keeps the **`#101015 / #080880 / #1111DE / #FDFCFD` quartet unmistakably the brand**, rather than letting secondary colors dilute it.
