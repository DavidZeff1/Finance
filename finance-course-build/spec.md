# SPEC — "Finance & Economics: Zero to Master" section authoring guide

You are writing ONE section of a 20-section interactive online textbook. The site is a single
HTML page assembled from all sections. Your output must follow this spec exactly so every
section looks and behaves identically.

## Audience & voice

The reader is a computer-science graduate with data-science/AI certificates who knows **zero
finance and economics** and wants to work in the financial sector (analytics roles). So:

- Assume full comfort with math, data, code, percentages, logarithms. NEVER dumb down math.
- Assume ZERO knowledge of finance/econ jargon. Define EVERY term at first use (see `.term`).
- Voice: a sharp, friendly mentor. Plain English, short paragraphs (2–4 sentences), concrete
  numbers. Explain the *why* and the *intuition* before the formula. Use analogies from
  software/data/everyday life. Second person ("you") is fine. No fluff, no filler intros.
- Every abstract idea gets a worked numeric example with real-ish numbers.
- Where it fits naturally (1–3 times per section), connect the topic to the reader's data/CS
  background ("this is just a weighted average", "think of it as a hash map of claims").
- US-market framing by default (Fed, SEC, S&P 500) but note international equivalents
  (ECB, FCA, MSCI World) where relevant.
- This is education, not advice. Never recommend buying/selling anything.

## Length & structure targets

- 2,600–3,600 words of body prose (excluding widget JS and SVG markup).
- 4–7 subsections (`<h3>`), each 300–650 words.
- 3–5 static SVG figures (`.fig`), each teaching one idea visually.
- The interactive widget(s) specified in your brief (usually 1–2).
- Exactly one quiz block with 4–5 questions, near the end.
- One `.kt` (key takeaways) box at the very end, 5–8 bullets.
- Optionally 1–2 `<details class="deep">` deep-dives for advanced material.
- A short `.next-up` paragraph is NOT needed — the shell adds prev/next links automatically.

## File output

Write your section's HTML to the exact file path given in your task, using the Write tool.
The file contains ONLY the `<section>` element — no doctype, html, head, body, style, or
comments outside it.

## Section skeleton (follow exactly)

```html
<section class="lesson" id="sNN" data-num="NN" data-title="Section Title">
  <p class="eyebrow">Part R · Part Name</p>
  <h2>N. Section Title</h2>
  <p class="lede">Two sentences: why this topic matters and what the reader will be able to do.</p>

  <h3 id="sNN-slug-a">First subsection title</h3>
  <p>…prose…</p>
  …figures, callouts, widgets, tables interleaved with prose…

  <div class="quiz"> … </div>
  <div class="kt"> … </div>
</section>
```

- `NN` is your zero-padded section number (e.g. `s07`).
- EVERY id in your section (h3s, widgets, svg gradient ids, input ids) MUST start with `sNN-`
  to prevent collisions with other sections. Section root id is `sNN` exactly.
- Every `<h3>` MUST have an id — these build the sidebar sub-navigation.
- Escape `&` as `&amp;`, `<` as `&lt;` in text.

## Design tokens — NEVER hardcode colors

Use ONLY these CSS custom properties (defined globally; they adapt to light/dark themes).
Hardcoded hex/rgb/hsl values anywhere (CSS, SVG, JS) are a spec violation.

| Token | Use |
|---|---|
| `--bg` | page background |
| `--surface` | cards, widget panels, figure background |
| `--surface-2` | inset panels inside widgets |
| `--ink` | primary text |
| `--ink-2` | secondary text |
| `--muted` | axis labels, captions, hints |
| `--accent` | brand green — links, highlights, active states |
| `--accent-soft` | translucent accent wash (backgrounds only) |
| `--border` | hairline borders |
| `--grid` | chart gridlines (hairline) |
| `--axis` | chart axis/baseline strokes |
| `--up` / `--down` | gains/positive vs losses/negative (semantic; not series colors) |
| `--c1`…`--c8` | categorical chart series, ALWAYS assigned in fixed order c1,c2,c3… |

In SVG, presentation attributes don't support var(); use style attributes:
`<rect style="fill:var(--c1)">`, `<path style="stroke:var(--axis)" fill="none">`,
`<text style="fill:var(--muted)">`. `fill="none"`, `stroke-width`, `opacity` attrs are fine.

## Component library (shell provides all CSS — use these exact class names)

### Callouts
```html
<div class="callout co-key"><p class="co-label">Key idea</p><p>…</p></div>
```
Variants: `co-key` (Key idea), `co-ex` (Worked example), `co-warn` (Common pitfall),
`co-real` (Real world), `co-analogy` (Analogy), `co-you` (Your edge — ties to the reader's
data/CS skills). The `co-label` text should match the variant (you may customize slightly,
e.g. "Real world: the 2008 crisis"). Callouts may contain multiple `<p>`, lists, or small tables.

### Term definitions (inline glossary)
First use of every jargon term:
```html
<dfn class="term" tabindex="0" data-def="One-sentence plain-English definition.">liquidity</dfn>
```
The shell renders `data-def` as a tooltip on hover/focus. Keep defs under 160 chars, no quotes
inside (use apostrophes). Use generously — 10–25 terms per section.

### Formulas (no LaTeX — styled HTML)
```html
<div class="formula">
  <div class="formula-main">FV = PV × (1 + r)<sup>n</sup></div>
  <div class="formula-legend">FV = future value · PV = present value · r = rate per period · n = periods</div>
</div>
```
Use `<sub>`, `<sup>`, `×`, `−` (minus sign), `Σ`, `√`. Fractions: use `(a ÷ b)` inline or the
two-line pattern `<span class="frac"><span>numerator</span><span>denominator</span></span>`.

### Static figures (SVG)
```html
<figure class="fig">
  <svg viewBox="0 0 720 380" role="img" aria-label="Plain description of what the figure shows">…</svg>
  <figcaption><strong>Figure N.k</strong> — caption that states the takeaway, not just the topic.</figcaption>
</figure>
```
- viewBox width 720 (use height 260–420 as needed); the shell makes it responsive.
- Number figures N.1, N.2… where N is your section number (no leading zero, e.g. Figure 7.2).
- Charts: hairline gridlines `style="stroke:var(--grid)"` stroke-width 1; axis
  `style="stroke:var(--axis)"`; lines stroke-width 2.5; text 13–15px `style="fill:var(--muted)"`
  (data labels: `fill:var(--ink)`); series colors c1,c2,… in order; label lines/areas directly
  at line-end instead of relying on a legend when ≤4 series. Bars: gap ≥ 2px between fills,
  4px rounded top corners (use `rx="4"`), anchored to the baseline.
- Diagrams (flows, maps, timelines): boxes `style="fill:var(--surface-2);stroke:var(--border)"`
  rx="8", arrows `style="stroke:var(--axis)"` with small triangle markers, text `fill:var(--ink)`
  14–15px. Use `--accent` sparingly for THE key element.
- Text in SVG: font-family is inherited automatically; set only font-size (13–16px) and
  font-weight. Keep labels short so nothing overlaps. Check your coordinate math.
- No `<image>`, no external refs, no `<style>` inside SVG. Gradient/marker ids prefixed `sNN-`.

### Interactive widgets
```html
<div class="widget" id="sNN-widgetname">
  <div class="widget-head">
    <h4>Widget title</h4>
    <p>One line telling the user what to try.</p>
  </div>
  <div class="widget-body">
    …controls, readouts, and an <svg> chart the JS updates…
  </div>
</div>
<script>
(function () {
  var root = document.getElementById('sNN-widgetname');
  if (!root) return;
  // vanilla JS, ES5-compatible style is fine; no globals; query inside root only
})();
</script>
```
Rules:
- Vanilla JS only, wrapped in an IIFE, placed immediately after the widget div. No globals,
  no document.write, no external fetches, no setInterval unless cleaned up; prefer event-driven.
- Query elements via `root.querySelector`, never bare `document.getElementById` for inner parts.
- Controls markup (shell styles these):
  `<div class="ctl-row">` rows of controls; each control:
  `<label class="ctl">Label <output class="ctl-val">5%</output><input type="range" min max step value></label>`
  Buttons: `<div class="btn-group"><button class="btn is-active">A</button><button class="btn">B</button></div>`
  Selects/numeric inputs allowed: `<input type="number" class="num-in">`, `<select class="sel">`.
- Readouts: `<div class="stat-row"><div class="stat"><span class="stat-label">Future value</span><span class="stat-value">$14,802</span></div>…</div>`
  Color a stat conditionally via inline style with `var(--up)`/`var(--down)` only.
- Charts inside widgets: build/update SVG via JS (set viewBox, redraw path `d` attrs on input).
  Same visual rules as static figures. Give the SVG fixed viewBox; shell handles sizing.
- Format money/numbers with `toLocaleString('en-US', {maximumFractionDigits: 0})` etc.
- Make it deterministic where possible. Math.random is allowed (e.g. simulations) but provide
  a "re-run" button and sensible defaults so first paint always looks good.
- Handle edge cases (division by zero, log of negative) — clamp inputs, never show NaN.
- Widgets must be fully usable by keyboard (native inputs/buttons are — don't build fake ones).
- TEST YOUR MATH. Hand-compute one case and make sure the widget would show it.

### Quiz (exactly one per section; shell wires the behavior)
```html
<div class="quiz">
  <h4>Check your understanding</h4>
  <div class="quiz-item">
    <p class="quiz-q">1. Question text?</p>
    <div class="quiz-opts">
      <button class="quiz-opt">Wrong option</button>
      <button class="quiz-opt" data-correct>Right option</button>
      <button class="quiz-opt">Wrong option</button>
    </div>
    <p class="quiz-explain">One–three sentences explaining the right answer.</p>
  </div>
  …4–5 quiz-items total…
</div>
```
Exactly one `data-correct` per item; 3–4 options per item; vary the position of the correct
answer. Write plausible distractors that target real misconceptions. No inline JS — the shell
handles clicks, styling, and revealing `.quiz-explain`.

### Key takeaways
```html
<div class="kt"><h4>Key takeaways</h4><ul><li>…</li>…</ul></div>
```

### Tables
```html
<div class="tbl-wrap"><table>
  <thead><tr><th>…</th></tr></thead>
  <tbody><tr><td>…</td></tr></tbody>
</table></div>
```
Numeric columns: add class `td-num` on those cells (right-aligned, tabular figures).

### Deep dives
```html
<details class="deep"><summary>Deep dive: topic</summary> …paragraphs/figures… </details>
```

### Misc
- Inline code/tickers/keyboard: `<code>AAPL</code>`.
- External links: allowed ONLY as plain-text mentions (e.g. "the SEC's EDGAR database
  (sec.gov/edgar)") — never `<a href>` to the outside web. Internal cross-references to other
  sections ARE encouraged: `<a href="#s08">Section 8 (Fixed Income)</a>`.
- No emoji as section markers. No images. No iframes. No <style> or CSS beyond inline
  `style="…"` using tokens.

## Quality bar (the verifier will check these)

1. Zero hardcoded colors — tokens only.
2. All ids prefixed `sNN-`; section root `sNN`; no duplicate ids.
3. Balanced/valid HTML; buttons never nested in buttons; figure/figcaption order correct.
4. Every jargon term defined at first use via `.term` (or immediately in prose).
5. Worked examples: arithmetic actually checks out.
6. Widget JS: runs without errors, no globals leaked, edge cases clamped, math verified.
7. SVG figures: nothing overlaps, labels readable, coordinates sane, tokens for all colors.
8. Quiz: one data-correct each, explanations correct.
9. Word count within target; tone matches spec.
10. File contains exactly one top-level `<section>` and its trailing `<script>` tags, nothing else.
