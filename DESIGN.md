# Design System

The system combines **editorial clarity, scientific precision, and visual curiosity**. It should feel thoughtful and sophisticated without becoming ornamental; technical without becoming cold.

## Design Principles

The visual system is guided by:

**Curiosity** — invite exploration and discovery.
**Depth** — reveal layers, connections, and underlying structure.
**Intentionality** — every visual decision has a purpose.
**Elegance** — achieve distinction through restraint.
**Clarity** — make complex ideas understandable.
**Simplicity** — remove what does not contribute.
**Precision** — communicate and execute with rigor.

The overall visual language should feel **contemporary, intellectual, confident, and understated**.

---

# Why Olive + Navy

The identity uses two primary chromatic voices, each with a distinct conceptual role.

### Olive — Exploration

Olive represents **curiosity, exploration, movement, and discovery**.

It is the active color of the system: links, actions, paths, tags, exploratory diagrams, interactive elements, and points of interest.

> Olive represents what is being explored.

### Navy — Knowledge

Navy represents **knowledge, depth, synthesis, confidence, and intellectual structure**.

It anchors the system and is used for headings, major surfaces, section transitions, research-oriented content, and moments of consolidated understanding.

> Navy represents what has been understood.

Together, they form the conceptual movement of the identity:

**Olive / Exploration → Navy / Understanding**

They should not compete. Olive attracts attention and suggests movement; Navy provides depth and resolution.

---

# Color Tokens

The base palette consists of five colors:

| Token         | Hex       | Meaning     | Primary use                          |
| ------------- | --------- | ----------- | ------------------------------------ |
| `--olive-700` | `#415323` | Exploration | Actions, links, paths, active states |
| `--paper`     | `#FDFCFD` | Clarity     | Main background, negative space      |
| `--onyx`      | `#0F1110` | Structure   | Body text, maximum contrast          |
| `--navy-700`  | `#1F2E3A` | Knowledge   | Headings, dark surfaces, synthesis   |
| `--stone`     | `#76756D` | Context     | Secondary information, metadata      |

The supporting neutral system should be recalibrated around the new `#FDFCFD` Paper:

`--paper: #FDFCFD`
`--surface: #F7F6F7`
`--surface-muted: #F1F0F1`
`--ash: #CFCBC3`
`--stone: #76756D`
`--charcoal: #252723`
`--onyx: #0F1110`

The distinction between `Paper`, `Surface`, and `Surface Muted` should be subtle. Cards should feel like layers of paper rather than colored boxes.

---

# Color Language

Colors have semantic meaning and should remain consistent.

**Olive** — exploration, curiosity, action, direction.
**Navy** — knowledge, synthesis, authority, understanding.
**Onyx** — structure, rigor, primary information.
**Stone** — context, secondary information, support.
**Paper** — clarity, space, simplicity.
**Gold** — insight, discovery, exceptional emphasis.
**Oxblood / Rosewood** — criticism, limitations, risk.
**Blue-gray** — information and analytical context.

Gold and red tones should be used sparingly. They are semantic accents, not additional brand colors.

---

# Typography

Three families, with clearly defined voices.

## Source Sans 3 — Primary Voice

Used for the vast majority of the identity:

* headings;
* body copy;
* navigation;
* buttons;
* labels;
* cards;
* UI;
* diagrams;
* presentations.

Source Sans 3 represents **clarity, modernity, and structure**.

Weight creates hierarchy rather than switching typefaces unnecessarily.

**Light 300** — large editorial titles and expressive statements.
**Regular 400** — body copy and explanations.
**Medium 500** — emphasis and interactive elements.
**Semibold 600** — structural headings and navigation.
**Bold 700** — exceptional emphasis and major results.

Avoid excessive Bold. The default expression of the identity should feel controlled rather than loud.

---

## IBM Plex Mono — Technical Voice

Used for:

* code;
* numbers and metrics;
* dates;
* tags;
* experimental parameters;
* datasets;
* metadata;
* slide numbers;
* the logomark;
* technical annotations.

IBM Plex Mono represents **precision, evidence, method, and engineering**.

Use primarily at weight 400 or 500.

Examples:

`EXPERIMENT / 04`

`N = 12,840`

`+18.4%`

`[ _ >]`

It should appear as a technical annotation layer over the primary visual language, not replace Source Sans 3 for normal text.

---

## Source Serif 4 — Reflective Voice

Used selectively for:

* quotations;
* questions;
* insights;
* manifestos;
* editorial statements;
* special printed materials;
* moments of reflection.

Source Serif 4 represents **depth, contemplation, and intellectual expression**.

It should be rare enough that its appearance signals a change in tone.

For example:

> *What happens when information becomes understanding?*

The rule is:

> **Source Sans 3 communicates.**
> **IBM Plex Mono measures.**
> **Source Serif 4 reflects.**

Approximately **80% Source Sans 3 / 10% IBM Plex Mono / 10% Source Serif 4** is a useful starting point, not a rigid quota.

---

# Graphic Language

The graphic system combines **flat editorial structure with selective physical depth**.

The interface should not look entirely flat, nor should every element float.

Depth must communicate hierarchy.

## Cards

Cards use subtle gray surfaces derived from Paper.

Default:

`background: #F7F6F7`

Alternative:

`background: #F1F0F1`

Cards should use generous padding and restrained corner radii.

Avoid excessive borders. Prefer separation through:

* surface contrast;
* spacing;
* subtle shadow;
* alignment.

Cards should feel like **editorial objects placed on a surface**, not generic SaaS components.

---

# Drop Shadows

Shadows introduce physical hierarchy and help selected elements appear as objects.

Use them selectively for:

* featured cards;
* floating visual objects;
* image cutouts;
* interactive elements;
* overlays.

Avoid applying shadows to every card.

A recommended language:

```css
--shadow-sm:
  0 2px 8px rgba(15, 17, 16, 0.06);

--shadow-md:
  0 8px 24px rgba(15, 17, 16, 0.08);

--shadow-lg:
  0 20px 50px rgba(15, 17, 16, 0.12);
```

Shadows should be **soft, neutral, and diffuse**.

Never use strong black shadows.

---

# Image Cutouts

Photography and imagery may appear as **isolated silhouettes**, removed from their original backgrounds.

Instead of:

> rectangular photograph inside a card

prefer:

> object extracted from the photograph and placed directly within the composition.

Examples include:

* objects;
* scientific instruments;
* plants;
* books;
* devices;
* artifacts;
* architectural elements.

Cutouts can overlap:

* cards;
* grid boundaries;
* typography;
* colored surfaces.

This introduces **curiosity and controlled visual disruption**.

A subtle drop shadow can give the cutout physical presence.

The image should feel like an **object being examined**, rather than decorative photography.

---

# Layering

The system works with three visual depths:

### Background

Paper.

Flat, quiet, spacious.

### Information

Gray cards, typography, diagrams.

Structured and organized.

### Objects

Cutout images, featured cards, selected data points.

Allowed to float using subtle shadows.

This creates a visual metaphor:

> **The page is a workspace. Information is organized on it. Objects are placed upon it for examination.**

Isso, para mim, é uma direção particularmente forte para a sua identidade.

---

# Structural Elements

Use:

* thin 1px dividers;
* asymmetric editorial grids;
* generous negative space;
* gray cards;
* vertical rules;
* small mono labels;
* oversized typography;
* cropped elements;
* subtle overlaps;
* occasional floating cutouts.

Avoid:

* excessive rounded rectangles;
* gradients as decoration;
* glassmorphism;
* excessive pills;
* icon-heavy interfaces;
* strong shadows;
* decorative blobs;
* generic abstract 3D shapes.

---

# Buttons

**Primary**

Olive background with Paper text.

Hover moves toward a darker Olive rather than changing to Navy.

**Secondary**

Navy text with subtle Navy border.

Hover uses Navy background with Paper text.

**Tertiary**

Text only, usually Olive, accompanied by an arrow or typographic symbol.

This keeps Olive as **action** and Navy as **structure**, preserving the semantic distinction between the two.

---

# Icons

Hand-drawn inline SVGs remain appropriate.

Use:

* `24 × 24` viewBox;
* `stroke="currentColor"`;
* `stroke-width: 1.5`;
* `fill: none`;
* rounded caps and joins.

Default: Onyx or Stone.

Interactive: Olive.

Avoid making Navy the default icon color; Navy should retain greater visual weight.

---

# Dividers

`1px solid var(--ash)`

Dividers are structural, never decorative.

For major section transitions, a Navy surface or strong whitespace break is preferable to a thicker divider.
