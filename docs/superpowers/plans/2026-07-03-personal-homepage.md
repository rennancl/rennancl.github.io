# Personal Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the `rennancl.github.io` static homepage (single-page profile + résumé subpage) per the approved design spec.

**Architecture:** Plain HTML/CSS, no JavaScript, no build step, no external dependencies. GitHub Pages serves the repo root as-is. One shared stylesheet drives both `index.html` and `resume/index.html`.

**Tech Stack:** HTML5, CSS3 (system fonts only — no web fonts/CDNs), `python3 -m http.server` for local verification.

## Global Constraints

- No JavaScript. Anchor scrolling relies on CSS `scroll-behavior: smooth`.
- No external network requests at runtime (no CDN fonts, no hotlinked images) — all assets committed locally.
- Static light theme only, no dark-mode toggle.
- Max content width ~700px, centered single column.
- Colors: background `#faf9f6`, text `#2a2a2a`, muted `#6b6b6b`, accent `#2c5f6f`, rule `#ddd8cd`.
- Fonts: headings `ui-serif, Georgia, "Times New Roman", serif`; body `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`.
- Source PDF: `/Users/rennan/Downloads/cv_resume_rennan.pdf` (confirmed newer of two local copies, Mar 2026).
- Publications section must include all 6 papers (5 from the PDF + the 2026 AAAI ICWSM paper found on Google Scholar, absent from the PDF).

---

### Task 1: Assets — avatar image and résumé PDF

**Files:**
- Create: `assets/img/avatar.jpg`
- Create: `assets/rennan-cordeiro-lima-resume.pdf`

**Interfaces:**
- Produces: `assets/img/avatar.jpg` (referenced by `index.html` as `<img src="assets/img/avatar.jpg">`), `assets/rennan-cordeiro-lima-resume.pdf` (referenced by `resume/index.html` as `../assets/rennan-cordeiro-lima-resume.pdf`).

- [ ] **Step 1: Create directories**

```bash
mkdir -p assets/img
```

- [ ] **Step 2: Download the GitHub avatar**

```bash
curl -sL "https://github.com/rennancl.png?size=200" -o assets/img/avatar.jpg
```

- [ ] **Step 3: Verify the avatar downloaded correctly**

Run: `file assets/img/avatar.jpg`
Expected: output contains `JPEG image data` (or `PNG image data`) — not `HTML document` or `ASCII text` (which would mean the request failed/redirected to an error page).

- [ ] **Step 4: Copy the résumé PDF into the repo**

```bash
cp /Users/rennan/Downloads/cv_resume_rennan.pdf assets/rennan-cordeiro-lima-resume.pdf
```

- [ ] **Step 5: Verify the copy is byte-identical to the source**

Run: `diff /Users/rennan/Downloads/cv_resume_rennan.pdf assets/rennan-cordeiro-lima-resume.pdf`
Expected: no output (files identical).

- [ ] **Step 6: Commit**

```bash
git add assets/img/avatar.jpg assets/rennan-cordeiro-lima-resume.pdf
git commit -m "Add avatar image and resume PDF assets"
```

---

### Task 2: Stylesheet and home page (`index.html`)

**Files:**
- Create: `assets/css/style.css`
- Create: `index.html`

**Interfaces:**
- Consumes: `assets/img/avatar.jpg`, `assets/rennan-cordeiro-lima-resume.pdf` is NOT referenced here (only linked to via `resume/` subpage in Task 3) — this task links to `resume/` as a relative path, not to the PDF directly.
- Produces: `assets/css/style.css` (class names `.avatar`, `.title`, `.bio`, `.links`, `.sep`, `.entry`, `.entry-title`, `.entry-meta`, `.entry-desc`, `.pub-title`, `.pub-meta`, `.skills-line`, `.label`, `.page-header` — consumed by Task 3's `resume/index.html` via `.page-header`, `.btn`, `.resume-actions`, `.pdf-embed`, which are also defined in this same stylesheet).

- [ ] **Step 1: Create the stylesheet**

Create `assets/css/style.css`:

```css
:root {
  --bg: #faf9f6;
  --text: #2a2a2a;
  --muted: #6b6b6b;
  --accent: #2c5f6f;
  --rule: #ddd8cd;
  --serif: ui-serif, Georgia, "Times New Roman", serif;
  --sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--sans);
  line-height: 1.6;
  margin: 0;
  padding: 0 1.5rem;
}

main,
header,
footer {
  max-width: 700px;
  margin: 0 auto;
}

header.page-header {
  padding: 4rem 0 2rem;
}

.avatar {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1.25rem;
}

h1 {
  font-family: var(--serif);
  font-size: 2rem;
  margin: 0 0 0.25rem;
}

.title {
  color: var(--muted);
  margin: 0 0 1rem;
  font-size: 1.05rem;
}

.bio {
  margin: 0 0 1.25rem;
  max-width: 60ch;
}

.links a {
  color: var(--accent);
  text-decoration: none;
}

.links a:hover {
  text-decoration: underline;
}

.links .sep {
  color: var(--muted);
  margin: 0 0.5rem;
}

section {
  padding: 2rem 0;
  border-top: 1px solid var(--rule);
}

section h2 {
  font-family: var(--serif);
  font-size: 1.3rem;
  margin: 0 0 1.25rem;
}

.entry {
  margin-bottom: 1.5rem;
}

.entry:last-child {
  margin-bottom: 0;
}

.entry-title {
  font-weight: 600;
  margin: 0;
}

.entry-meta {
  color: var(--muted);
  font-size: 0.92rem;
  margin: 0.15rem 0 0.4rem;
}

.entry-desc {
  margin: 0;
}

.pub-title {
  font-weight: 600;
  margin: 0 0 0.2rem;
}

.pub-meta {
  color: var(--muted);
  font-size: 0.92rem;
  margin: 0 0 1.25rem;
}

.skills-line {
  margin: 0 0 0.6rem;
}

.skills-line .label {
  color: var(--muted);
}

footer {
  padding: 2.5rem 0 4rem;
  color: var(--muted);
  font-size: 0.92rem;
}

footer a {
  color: var(--accent);
}

.resume-actions {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  margin: 1.5rem 0;
}

.btn {
  display: inline-block;
  padding: 0.55rem 1.1rem;
  border: 1px solid var(--accent);
  color: var(--accent);
  text-decoration: none;
  border-radius: 4px;
  font-size: 0.95rem;
}

.btn:hover {
  background: var(--accent);
  color: var(--bg);
}

.pdf-embed {
  width: 100%;
  height: 85vh;
  border: 1px solid var(--rule);
}

@media (max-width: 480px) {
  h1 {
    font-size: 1.6rem;
  }

  .links a {
    display: inline-block;
    margin-bottom: 0.3rem;
  }
}
```

- [ ] **Step 2: Create the home page**

Create `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Rennan Cordeiro Lima</title>
<meta name="description" content="Tech Lead and Data Scientist working in machine learning, information retrieval, and large-scale data systems.">
<link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
<header class="page-header">
  <img src="assets/img/avatar.jpg" alt="Rennan Cordeiro Lima" class="avatar">
  <h1>Rennan Cordeiro Lima</h1>
  <p class="title">Tech Lead &amp; Data Scientist · PhD Candidate in NLP</p>
  <p class="bio">I work across machine learning, information retrieval, and large-scale data systems, in industry and academia. I'm a published researcher in IR/NLP, currently a PhD candidate at UFMG, with experience leading teams and building production-grade search and predictive modeling systems.</p>
  <p class="links">
    <a href="https://github.com/rennancl">GitHub</a><span class="sep">·</span><a href="https://scholar.google.com/citations?user=CIopUhUAAAAJ&hl=en">Google Scholar</a><span class="sep">·</span><a href="https://www.linkedin.com/in/rennancl">LinkedIn</a><span class="sep">·</span><a href="mailto:rennancl@gmail.com">Email</a>
  </p>
</header>

<main>
  <section id="experience">
    <h2>Experience</h2>

    <div class="entry">
      <p class="entry-title">Kunumi — Tech Lead</p>
      <p class="entry-meta">Jan 2025 – Present · Remote</p>
      <p class="entry-desc">Leading a 5–10 person data science team building short-term delinquency prediction models at national scale, using Python, Spark, Databricks, and LightGBM.</p>
    </div>

    <div class="entry">
      <p class="entry-title">Kunumi — Data Scientist</p>
      <p class="entry-meta">May 2024 – Dec 2025 · Remote</p>
      <p class="entry-desc">Built a national-scale income prediction model on bank transaction and salary data, engineering features and training models with Spark, Databricks, and LightGBM.</p>
    </div>

    <div class="entry">
      <p class="entry-title">MPMG project @ DCC/UFMG — Software Engineer</p>
      <p class="entry-meta">Mar 2021 – Present · Belo Horizonte, Brazil</p>
      <p class="entry-desc">Built a governmental search engine over 1M+ documents using Transformers and Elasticsearch, now used daily by two teams of prosecutors.</p>
    </div>

    <div class="entry">
      <p class="entry-title">MPMG project @ DCC/UFMG — Software Engineer Tech Lead</p>
      <p class="entry-meta">Mar 2021 – Aug 2023 · Belo Horizonte, Brazil</p>
      <p class="entry-desc">Led a ~10-person team building crawler configuration software supporting 5,000+ target websites.</p>
    </div>

    <div class="entry">
      <p class="entry-title">IBGE project @ DCC/UFMG — Data Scientist</p>
      <p class="entry-meta">Oct 2020 – Mar 2021 · Belo Horizonte, Brazil</p>
      <p class="entry-desc">Built web scraping and price-retrieval pipelines covering 100+ shopping sites and 10,000+ products nationwide.</p>
    </div>

    <div class="entry">
      <p class="entry-title">Studio Sol — Data Scientist</p>
      <p class="entry-meta">Jan 2021 – Mar 2021 · Belo Horizonte, Brazil</p>
      <p class="entry-desc">Maintained a music recommender system and analytics for 3M users; contributed to a Docker/Kubernetes microservice deployment.</p>
    </div>

    <div class="entry">
      <p class="entry-title">Studio Sol — Data Scientist Intern</p>
      <p class="entry-meta">Aug 2019 – Jan 2021 · Belo Horizonte, Brazil</p>
      <p class="entry-desc">Implemented music recommender systems and data analysis over 1M+ songs and 100,000+ artists.</p>
    </div>
  </section>

  <section id="education">
    <h2>Education</h2>

    <div class="entry">
      <p class="entry-title">PhD Candidate in Computer Science — Natural Language Processing</p>
      <p class="entry-meta">Federal University of Minas Gerais (UFMG) · Mar 2026 – Present</p>
    </div>

    <div class="entry">
      <p class="entry-title">M.Sc. in Computer Science — Information Retrieval</p>
      <p class="entry-meta">Federal University of Minas Gerais (UFMG) · Mar 2021 – Dec 2023 · Average grade 98/100</p>
    </div>

    <div class="entry">
      <p class="entry-title">B.Sc. in Computer Science</p>
      <p class="entry-meta">Federal University of Minas Gerais (UFMG) · Mar 2016 – Mar 2021 · Honored as one of the best students</p>
    </div>
  </section>

  <section id="publications">
    <h2>Publications</h2>

    <p class="pub-title">Misinformation Span Detection in Videos via Audio Transcripts</p>
    <p class="pub-meta">B. Matos, R. C. Lima, S. Zannettou, F. Benevenuto, R. L. T. Santos. Proceedings of the International AAAI Conference on Web and Social Media (ICWSM), 2026.</p>

    <p class="pub-title">On representation learning-based methods for effective, efficient, and scalable code retrieval</p>
    <p class="pub-meta">C. França, R. C. Lima, C. Andrade, W. Cunha, P. O. S. V. de Melo, B. Ribeiro-Neto, et al. Neurocomputing, 600:128172, 2024.</p>

    <p class="pub-title">Intellectual dark web, alt-lite and alt-right: Are they really that different? A multi-perspective analysis of the textual content produced by contrarians</p>
    <p class="pub-meta">B. Matos, R. C. Lima, J. M. Almeida, M. A. Gonçalves, R. L. T. Santos. Social Network Analysis and Mining, 14(1):32, 2024.</p>

    <p class="pub-title">I've heard this before: Initial results on TikTok's impact on the re-popularization of songs</p>
    <p class="pub-meta">B. Matos, F. Galuppo, R. Cordeiro, F. Figueiredo. arXiv preprint arXiv:2411.01239, 2024.</p>

    <p class="pub-title">On the presence of abusive language in mis/disinformation</p>
    <p class="pub-meta">B. Matos, R. C. Lima, et al. SocInfo International Conference, 2022. Springer.</p>

    <p class="pub-title">On extractive summarization for profile-centric neural expert search in academia</p>
    <p class="pub-meta">R. C. Lima, R. L. T. Santos. ACM SIGIR International Information Retrieval Conference, 2022.</p>

    <p><a href="https://scholar.google.com/citations?user=CIopUhUAAAAJ&hl=en">View all on Google Scholar →</a></p>
  </section>

  <section id="skills">
    <h2>Skills</h2>
    <p class="skills-line"><span class="label">Languages &amp; Platforms:</span> Python · C · SQL · Bash · Web</p>
    <p class="skills-line"><span class="label">Tools &amp; Frameworks:</span> PyTorch · Docker · Git · Elasticsearch · HuggingFace · Django · Jupyter · Transformers · Sklearn</p>
    <p class="skills-line"><span class="label">Spoken Languages:</span> Portuguese (Native) · English (Fluent) · Spanish (Beginner)</p>
  </section>
</main>

<footer>
  <p><a href="resume/">Full résumé (PDF) →</a></p>
</footer>
</body>
</html>
```

- [ ] **Step 3: Verify the home page renders and links resolve**

```bash
python3 -m http.server 8000 &
sleep 1
curl -s -o /dev/null -w "index.html: %{http_code}\n" http://localhost:8000/index.html
curl -s -o /dev/null -w "style.css: %{http_code}\n" http://localhost:8000/assets/css/style.css
curl -s -o /dev/null -w "avatar.jpg: %{http_code}\n" http://localhost:8000/assets/img/avatar.jpg
grep -c '<section id="experience">' index.html
grep -c '<section id="education">' index.html
grep -c '<section id="publications">' index.html
grep -c '<section id="skills">' index.html
kill %1
```

Expected: all `curl` lines print `200`; each `grep -c` prints `1`.

- [ ] **Step 4: Commit**

```bash
git add assets/css/style.css index.html
git commit -m "Add home page and stylesheet"
```

---

### Task 3: Résumé subpage (`resume/index.html`)

**Files:**
- Create: `resume/index.html`

**Interfaces:**
- Consumes: `assets/css/style.css` classes `.page-header`, `.resume-actions`, `.btn`, `.pdf-embed` (defined in Task 2); `assets/rennan-cordeiro-lima-resume.pdf` (produced in Task 1).
- Produces: the `resume/` route linked from `index.html`'s footer (Task 2, already wired via `href="resume/"`).

- [ ] **Step 1: Create the résumé subpage**

Create `resume/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Résumé — Rennan Cordeiro Lima</title>
<link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>
<header class="page-header">
  <p><a href="../">← Back</a></p>
  <h1>Résumé</h1>
  <div class="resume-actions">
    <a class="btn" href="../assets/rennan-cordeiro-lima-resume.pdf" download>Download PDF</a>
  </div>
</header>
<main>
  <iframe class="pdf-embed" src="../assets/rennan-cordeiro-lima-resume.pdf" title="Rennan Cordeiro Lima résumé PDF"></iframe>
</main>
</body>
</html>
```

- [ ] **Step 2: Verify the subpage and PDF resolve**

```bash
python3 -m http.server 8000 &
sleep 1
curl -s -o /dev/null -w "resume page: %{http_code}\n" http://localhost:8000/resume/index.html
curl -s -o /dev/null -w "resume pdf: %{http_code}\n" http://localhost:8000/assets/rennan-cordeiro-lima-resume.pdf
curl -s -o /dev/null -w "stylesheet from subpage: %{http_code}\n" http://localhost:8000/resume/../assets/css/style.css
kill %1
```

Expected: all three lines print `200`.

- [ ] **Step 3: Commit**

```bash
git add resume/index.html
git commit -m "Add resume subpage with embedded PDF"
```

---

### Task 4: Final cross-page verification

**Files:** none created — verification only.

- [ ] **Step 1: Serve the whole site locally and open it in a browser**

```bash
cd /Users/rennan/rennancl.github.io && python3 -m http.server 8000 &
open http://localhost:8000/
```

- [ ] **Step 2: Manually confirm in the browser**

Check: avatar loads, all four header links (GitHub, Scholar, LinkedIn, Email) point to correct URLs, all four sections render (Experience, Education, Publications, Skills), footer link navigates to `/resume/`, résumé subpage shows the embedded PDF and the "← Back" link returns home, "Download PDF" actually downloads the file.

- [ ] **Step 3: Stop the local server**

```bash
kill %1
```

- [ ] **Step 4: Final commit if any manual fixes were made during verification**

```bash
git add -A
git commit -m "Fix issues found during final verification"
```

(Skip this step if no fixes were needed.)

---

## Self-Review Notes

- **Spec coverage:** About/bio/links → Task 2 Step 2 header. Experience → Task 2 Step 2 `#experience`. Education → `#education`. Publications (6 entries incl. 2026 AAAI paper) → `#publications`. Skills → `#skills`. Résumé subpage with PDF embed + download button → Task 3. Avatar + PDF assets → Task 1. All spec sections covered.
- **Placeholder scan:** no TBD/TODO; all copy is final text, not description-of-text.
- **Type/name consistency:** `assets/rennan-cordeiro-lima-resume.pdf` path matches between Task 1 (produces) and Task 3 (consumes, as `../assets/...`). CSS class names used in `index.html` and `resume/index.html` all defined in Task 2's `style.css`.
