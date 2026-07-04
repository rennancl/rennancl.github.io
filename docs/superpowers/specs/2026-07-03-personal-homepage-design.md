# Personal Homepage Design

## Purpose
Build the site for `rennancl.github.io` (currently empty repo, only `origin` remote configured). Elegant, minimalist personal homepage summarizing Rennan's professional/academic profile, sourced from his resume PDF, GitHub, and Google Scholar profile. The resume PDF is published as a subpage.

## Stack
Plain HTML/CSS. No JavaScript, no build step, no external dependencies (no CDN fonts/icons). GitHub Pages serves the repo root directly. Smooth anchor scrolling via CSS `scroll-behavior: smooth`.

## File structure
```
index.html                                    # single-page home
resume/index.html                             # resume subpage
assets/css/style.css
assets/img/avatar.jpg                         # GitHub avatar, downloaded locally
assets/rennan-cordeiro-lima-resume.pdf        # source: ~/Downloads/cv_resume_rennan.pdf (newest copy, Mar 2026)
```

## Visual design
- Background off-white (`#faf9f6`), body text dark graphite (`#2a2a2a`), accent color petrol blue (`#2c5f6f`) for links/highlights.
- Headings: serif system stack (`ui-serif, Georgia, serif`). Body: sans system stack (`-apple-system, "Segoe UI", sans-serif`).
- Single centered column, max-width ~700px, generous whitespace, thin-rule separators between sections (no cards/shadows).
- Responsive down to mobile widths (fluid type/padding, no fixed breakpoints needed given the simple column layout).

## Content — Home (`index.html`)
Single page, sections in this order, each an anchor target:

1. **Header/About** — name, one-line title ("Tech Lead & Data Scientist · PhD Candidate in NLP"), 2-3 sentence bio drawn from the resume summary, small avatar image, one line of plain-text links: GitHub · Google Scholar · LinkedIn · Email (`mailto:`).
2. **Experience** — reverse-chronological, condensed to company / role(s) / dates / one-line description each:
   - Kunumi (Tech Lead, Jan 2025–Present; Data Scientist, May 2024–Dec 2025)
   - MPMG project @ DCC/UFMG (Software Engineer, Mar 2021–Present; Software Engineer Tech Lead, Mar 2021–Aug 2023)
   - IBGE project @ DCC/UFMG (Data Scientist, Oct 2020–Mar 2021)
   - Studio Sol (Data Scientist, Jan 2021–Mar 2021; Data Scientist Intern, Aug 2019–Jan 2021)
3. **Education** — UFMG PhD (Mar 2026–Present), MSc (Mar 2021–Dec 2023, avg 98/100), BSc (Mar 2016–Mar 2021), one line each.
4. **Publications** — 6 entries: the 5 from the resume PDF plus the 2026 AAAI ICWSM paper found on Google Scholar ("Misinformation Span Detection in Videos via Audio Transcripts") that is not yet in the PDF. Format: title (bold), then authors · venue · year below. Closing line: "View all on Google Scholar →" linking to the Scholar profile.
5. **Skills** — three lines (Languages & Platforms / Tools & Frameworks / Spoken Languages), `·`-separated plain text, no icons/badges.
6. **Footer** — discreet line: "Full résumé (PDF) →" linking to `/resume/`.

## Content — Resume subpage (`resume/index.html`)
- Title "Résumé" (or "Currículo"), "← Back" link to home.
- "Download PDF" button/link above the embed, pointing to the PDF asset directly.
- `<iframe>` embedding the PDF, responsive height (~85vh), same page chrome/palette as home.

## Data sources
- Resume PDF (`~/Downloads/cv_resume_rennan.pdf`, the newer of two local copies) is the source of truth for experience/education/skills text.
- Google Scholar profile (`CIopUhUAAAAJ`) fetched live to cross-check publications — found one 2026 paper missing from the PDF, added to the Publications section.
- GitHub avatar downloaded from `rennancl`'s public profile image for local hosting (no hotlinking).

## Out of scope
- No JS interactivity, no dark-mode toggle (static light theme per approved choice).
- No individual per-publication links/DOIs (not reliably available) — only a link to the full Scholar profile.
- No featuring of GitHub pinned repos (they're old coursework, not representative of current work) — GitHub is linked as a profile link only.
