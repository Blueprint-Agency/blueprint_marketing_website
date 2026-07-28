# subyect.com — section-by-section teardown

Captured 2026-07-28 from a full-page render at 1440×16656 plus the raw HTML.
Everything below is what the markup and CSS actually contain, not a guess at
the look. Feasibility notes are against *this* repo (Next 16, React 19,
Tailwind v4, `.v2` "Plain" token system in `app/plain.css`).

---

## 0. The stack underneath

| Thing | What they use | What we have |
| --- | --- | --- |
| Framework | Next.js App Router, `next/font/local` | same |
| Smooth scroll | **Lenis** (`<html class="lenis">`) | not installed — ~3kb, one provider component |
| Animation | **`motion`** (Framer Motion v11+ package name), 16 refs | not installed |
| Layout | Tailwind + a hand-written stylesheet of `.sc`-style component classes | same pattern, `app/plain.css` |
| Fonts | Instrument Sans (variable, local) + **Avestiana** (commercial display italic) | Schibsted Grotesk |
| Effects | 95× `backdrop-filter`, 109× `blur()`, 40× `translate3d`, 22× `perspective` | none yet |
| Images | `next/image` + WebP, one `.mp4` | `next/image` already wired |

No GSAP, no ScrollTrigger, no WebGL, no canvas. **Every single effect on that
page is CSS transforms + Framer Motion's `useScroll`/`useTransform` + Lenis.**
That is the single most important finding: it is all reachable from where you are.

---

## 1. Design tokens

```
--bg-ink       #0F0E0C   near-black, warm-shifted (not #000, not neutral)
--bg-paper     #EDE6DA   warm bone — sections alternate ink ⇄ paper
--surface      #1A1410   raised card on ink
--surface-2    #2A2218   hairline / border on ink
--accent       #E77025   burnt orange — the ONLY chroma
--accent-glow  rgba(231,112,37,.55) 0 14px 44px -14px
```

Radius: `999px` on every button, ~20px on cards, `0` on rules.
The palette is disciplined: **two grounds, one accent.** Orange appears only on
CTAs, section eyebrows, numerals, and the one chart line. Never as a heading,
never as a border, never as a gradient background.

### Typography — the actual signature

Body and headline are the **same** family (Instrument Sans) at **Light**.
The identity comes from one move, repeated on every single H2:

> We design the decisions your ad account ***runs on.***
> Why top brands ***choose*** Subyect
> Our team of ***experts.***
> The loop your ***competitors*** aren't running.
> Questions we ***already answered.***

A 2–3 word phrase per heading swaps to a **bold, sharply-slanted display
italic** (Avestiana). That is the whole typographic personality — a light
grotesk interrupted once per headline. It costs nothing structurally and it is
what makes the page feel authored.

Eyebrows above each H2 are ~11px, uppercase, `letter-spacing: .18em`, muted:
`THE MACHINE`, `WHAT YOU ACTUALLY GET`, `THE OPERATING SYSTEM`, `BUILT IN-HOUSE`,
`INTELLIGENCE LAYER`, `BEFORE YOU SIGN`.

**Avestiana is a commercial licence.** Substitutes that keep the "one violent
italic" effect: Instrument Sans's own italic at 700 with `font-stretch` tight,
Familjen Grotesk Italic, Bricolage Grotesque Italic, or Uncut Sans Italic — all
free. The *device* transplants even if the face doesn't.

---

## 2. Section-by-section

### 2.1 Hero — full-bleed photo + pinned scale

**What you see:** a mountain summit at alpenglow, full viewport, headline
centred in white over it, floating pill nav on top, avatar cluster + "Trusted by
80+ brands", one orange pill CTA, a `Scroll` cue at the bottom.

**How it's built**
- `<Image fill priority>` on a WebP poster (`hero-poster.webp`), object-cover.
- The photo *is* the gradient. No CSS gradient mesh — the sunrise supplies the
  entire warm→dark ramp, and `--bg-ink` is sampled from its shadow so the
  section below it dissolves seamlessly. This is why the page reads expensive:
  the colour story is photographic, not generated.
- A `linear-gradient(to bottom, transparent, #0F0E0C)` overlay welds the photo
  into the next section.
- Nav is a `position: fixed` rounded pill with `backdrop-filter: blur()` and a
  translucent surface — not a full-width bar.
- The headline is **word-split**: the markdown extraction shows every word
  duplicated (`WeWedesigndesign…`), which is the fingerprint of two stacked
  layers — a dim "ghost" copy and a bright copy revealed per-word via
  `useScroll` progress. Same trick on `Ready to run your / Static ads at full power?`.

**Here:** yes, and cheaply. Word-split reveal is ~30 lines with `motion`.
The hard part is **the photograph.** You'd need one image whose own colour ramp
carries the section. For Blueprint that isn't a mountain — it'd be something from
your subject's world (a fabricated one will look stock and kill the effect).

---

### 2.2 Pinned stat scrub

**What you see:** black, then `80+ DTC brands`, `28,000+ static ads launched`,
`€20M+ client revenue` — each with a one-line gloss.

**How it's built:** the three stats appear **twice** in the DOM. That's a
`position: sticky` pinned viewport (~1000px of scroll runway) where a duplicate
set is scrubbed by scroll progress while the original stays for no-JS/SEO. The
big black gap in the static screenshot is the un-scrolled pin.

**Here:** yes. `position: sticky` + `useScroll({ offset: ["start start", "end end"] })`.
No library needed for the pin itself.

---

### 2.3 Logo marquee + ad-wall marquee

**What you see:** client logos scrolling horizontally, then a huge perspective
wall of 27 real static ads receding into the distance.

**How it's built**
- Logos: the 10-logo array is repeated **3×** in markup, wrapped in
  `overflow: hidden`, animated with `transform: translate3d(-33.33%,0,0)` on an
  `infinite linear` keyframe. Classic CSS-only marquee, no JS.
- Ad wall: same 3× repetition, but the container gets `perspective` +
  `rotateX/rotateY` and a `mask`/gradient fade at the edges, so a flat grid of
  9 images reads as a 3D wall. `rotate(-9deg)` / `rotate(9deg)` pairs confirm
  the tilt is per-column, not a single transform.
- Bottom of the wall: a floating "Connect with Jens Loman" pill + CTA — a
  personal face pinned over the proof.

**Here:** the marquee is trivial and already suits Blueprint. The ad wall is
trivial *mechanically* but requires ~27 pieces of real client creative. You have
`lib/logos.ts` rendering typographic wordmarks as a designed fallback — the same
honesty applies: don't fake a wall of work.

---

### 2.4 "Why top brands choose Subyect" — scattered tilted cards

**What you see:** three white cards on the bone ground, each rotated a few
degrees, at staggered vertical offsets, each holding a tiny abstract diagram
(a dot on a line, a crosshair, a rising curve), a `01`/`02`/`03` numeral, a
2-word title, one sentence.

**How it's built:** absolute/grid positioning with `rotate(-1.5deg)`,
`rotate(0.9deg)`, `rotate(-0.6deg)` — deliberately tiny, under 2°. Long soft
shadow. The micro-diagrams are inline SVG with `@keyframes draw` (stroke-dasharray)
and `dot-breathe` — both keyframe names are in their CSS.

Note: each card title also appears **twice** in the DOM → hover/scroll state swap.

**Here:** yes, entirely. This is CSS + inline SVG. Closest match to what
`components/v2/QualArt.tsx` already does. The `01/02/03` numbering is
defensible here only because the cards are genuinely a hierarchy of claim —
on a non-sequence, drop it.

---

### 2.5 Case studies — fanned card decks

**What you see:** four dark rounded panels. Left half = brand logo + numeral +
headline (with the italic emphasis) + one line + a chat-bubble testimonial in a
sunken box. Right half = 3–6 real ads **fanned like a hand of cards**, overlapping,
each rotated, bleeding off the panel's right edge.

**How it's built**
- Panel: `background: #1A1410`, `border-radius: 20px`, `overflow: hidden`.
- The fan: each ad absolutely positioned, `rotate(±8deg)`, incremental `left`,
  `z-index` ascending, drop-shadow. The images repeat 2× in DOM again → a
  hover state that spreads the fan.
- The testimonial is styled as a **real chat bubble** (`"Thanks guys, excited to
  launch🚀"`, emoji intact, typos intact). That unpolished quality is the point —
  it reads as a screenshot, not a marketing quote.

**Here:** yes. The fan is ~15 lines of CSS. The testimonial-as-chat-bubble device
is a *very* strong fit for Blueprint specifically, since your whole CTA funnel is
WhatsApp — a real WhatsApp bubble is more native to your product than it is to theirs.

---

### 2.6 Team row

**What you see:** 13 circular portraits in a single overlapping row, then two
pills: `HQ 📍 Herengracht 451, Amsterdam` and the trust cluster.

**How it's built:** flex row with negative margin-left, `border: 2px solid #0F0E0C`
on each circle so overlap reads clean, hover lifts + reveals the name/role.

**Here:** yes, trivial. Depends on having 13 people.

---

### 2.7 "One ad. Six decisions before it existed." — pinned annotation

**What you see:** one static ad centred, and six labels (Persona, Trigger,
Awareness, Format, Angle, Hypothesis) that appear around it as you scroll.

**How it's built:** sticky pin again (huge black gap in the static capture),
content duplicated 2×, labels revealed sequentially on scroll progress, likely
with connector lines. An orange radial glow sits behind the ad.

**This is the page's best idea.** It takes the abstract claim "we think before we
design" and makes it *literally visible* on one artifact. Closing line:
"Every ad we ship carries all six. That is why the account can learn from it."

**Here:** yes — and this is the one section worth stealing outright. Blueprint's
equivalent: one landing page or one campaign, annotated with the six decisions
behind it. It's the same rhetorical move and it works because it's specific.

---

### 2.8 Process loop — 6 cards in a boustrophedon with a return arrow

**What you see:** on bone ground, `01 Research → 02 Strategy → 03 Ideation`
across the top, then an arrow down, then `06 Analyse ← 05 Feedback ← 04 Design`
across the bottom, right-to-left, and `↩ Analysis feeds the next cycle.`

**How it's built:** a 3-column grid, second row visually reversed, with small
SVG arrows between cells. Each card holds a mini illustration (bar chart, form
skeleton, three swatch cards). Cards are white, tiny rotations, soft shadows.

**Here:** yes. And this one is genuinely *better structure* than the
`STEPS` array in `app/page.tsx:14-32` (Audit / Architect / Build / Scale),
because the snake layout + return arrow encodes that it's a **loop**, not a
line. Blueprint's four steps are also a loop. Currently they render as a list.

---

### 2.9 "The unfair advantage" — the product screenshot

**What you see:** a large screenshot of their internal tool (Obyect) in
perspective, one card inside it ringed in orange, then three stats on a hairline
rule: `1,500+ proven ads / 50+ top DTC brands / 30+ days live, every one`
(numbers in orange italic display, labels in small grey).

**How it's built:** `next/image` of a real UI screenshot, `perspective(1200px)
rotateX(4deg)`, masked at the bottom. The orange ring is baked into the image.

**Here:** conditional — only if Blueprint has an internal tool worth showing.
The **stat-on-a-rule** treatment (orange italic figure + tiny grey label, inline,
divided by hairlines) is reusable regardless and is a much better stat block
than three big centred numbers.

---

### 2.10 "Always in context" — the file-tree flex

**What you see:** left column of copy about a custom MCP server; right column a
dark terminal-ish panel showing a literal file tree:

```
obyect-mcp/
  server.ts
  tools/  scrape.ts  classify.ts  search.ts
  resources/  ads.json  triggers.json
  schema/  ad.ts  context.ts
```

plus tag chips `Claude MCP` / `TypeScript` / `Obyect DB`.

**How it's built:** plain nested `<ul>` with monospace type and `▸`/`·` glyphs,
in a `#1A1410` panel. Content is duplicated 2× → a typing/reveal animation
(`@keyframes lp-type`, `lp-blink` are in their CSS).

**Assessment:** this is the weakest section. It's engineering cosplay aimed at a
buyer who spends €100K/mo on ads and does not care what `classify.ts` is. It
signals "technical" to people who can't evaluate it. **Do not port this.**

---

### 2.11 Comparison chart

**What you see:** `You are comparing everyone. *None of them do this.*` over a
line chart — a dashed grey line (Everyone else) that peaks and decays, and a
solid orange line (Subyect) that compounds. X-axis labelled `1 2 3 4 5 6 CYCLE`.
Below: "All statics on the surface. / A different machine underneath."

**How it's built:** hand-authored inline SVG paths (not a chart library), drawn
in with `@keyframes draw` on `stroke-dashoffset`, triggered on scroll into view.

**Here:** yes, and it's the cheapest high-impact section on the page — one SVG,
two paths, one keyframe. Blueprint has an obvious analogue (leads that decay vs.
a system that compounds). Note the honest framing: it's clearly a *conceptual*
chart, not fake data with fake axes.

---

### 2.12 FAQ

**What you see:** numbered rows `01`–`04` in small orange italic, question in
light grotesk, `+` on the right, hairline dividers, on ink ground.

**How it's built:** `<details>`/`<summary>` or a controlled accordion.
Answers are real objection-handling, not filler ("Your team is good. It also
only ever sees one account, yours.").

**Here:** already have this at `app/page.tsx:439`. The only upgrade is the
numeral + hairline treatment.

---

### 2.13 Footer

**What you see:** a rounded bone card floating on ink, inset from all sides.
Wordmark, one line of positioning, a booking row with a portrait, orange CTA,
three inline stats, two link columns. Below the card, on the ink, a tiny legal
line and the sign-off `Designed to convert.`

**How it's built:** `border-radius: 24px`, `margin: 0 24px 24px`, paper background.

**Here:** yes, trivial, and it's a nice closing device — the page ends on the
light ground it kept returning to.

---

## 3. The rhythm that holds it together

Ignoring individual sections, the page's real structure is:

```
INK    hero photo
INK    stats (pinned)
PAPER  ad wall
PAPER  why us
INK    case studies
INK    team
INK    six decisions (pinned)
PAPER  process loop
INK    Obyect + MCP
PAPER  comparison
INK    FAQ
PAPER  footer card
```

**Alternating ink/paper bands** is what makes 16,000px of scroll not feel long.
Each band change is a chapter break. Blueprint already has the primitive for
this — `.band` / `.band-sunk` in `plain.css` — but `--paper-sunk: #f4f5f7` is
a 3% shift where subyect's is a **full inversion**. That's the difference between
a texture and a chapter.

---

## 4. Feasibility here — the honest version

**The conflict you should decide on first.** `app/plain.css` opens with a stated
strategy: *"Restrained. Near-white ground, ink type, one reserved action colour.
All chroma on the page comes from the six real client sites — the proof is the
palette."* Subyect is the opposite: warm-ink ground, photographic chroma, one
orange accent everywhere. You cannot have both. Porting subyect's *look* means
deleting the Plain direction; porting its *techniques* does not.

I'd port techniques, not the skin.

### Port these (high value, fits Blueprint, no new dependencies)

| Technique | Effort | Why it fits |
| --- | --- | --- |
| Italic-emphasis phrase in every H2 | 1h | Whole typographic identity for near-zero cost |
| Full ink⇄paper band inversion (upgrade `--paper-sunk`) | 1h | Fixes long-scroll fatigue |
| Eyebrow labels above each H2 | 30m | Free wayfinding |
| Snake/loop process layout + return arrow | 3h | Your 4 steps *are* a loop; the list hides that |
| Fanned card decks for case studies | 3h | Best proof device on their page |
| Testimonial as a real chat bubble | 2h | More native to Blueprint (WhatsApp) than to them |
| Compounding-vs-decay SVG chart | 3h | Cheapest high-impact section on the page |
| Stat-on-a-hairline row | 1h | Better than centred big numbers |
| Logo marquee | 1h | Already have the logo data |
| Floating footer card | 1h | Clean close |

### Port with a real prerequisite

| Technique | Blocker |
| --- | --- |
| Photographic hero | Needs one commissioned/licensed image whose own colour ramp drives the section. A stock mountain will read as stock. |
| Perspective ad wall | Needs ~27 pieces of real client work. |
| "Six decisions" pinned annotation | Needs a real artifact of yours to annotate — this is the best section on their site and worth building properly. |
| Team row | Needs the team. |

### Needs dependencies

`motion` (~34kb gzip) + `lenis` (~3kb) for: word-split hero reveal, sticky
scrubs, staggered card entrances. `position: sticky` pins work without either.
Given the current site ships zero animation libraries, add these **only** if you
commit to the pinned-annotation section — that one earns them. Everything else
in the "port these" table is pure CSS.

### Don't port

- The MCP file-tree section — engineering cosplay for a non-engineering buyer.
- Duplicating content 2×/3× in the DOM for hover states. They do it because it's
  the fast Framer Motion pattern; it doubles your DOM and your a11y surface.
- 16,000px of page. Subyect earns it with 28,000 ads of proof. Match length to
  the amount of evidence you actually have.

---

## 5. Suggested order if you build it

1. Type: italic emphasis + eyebrows. (Half a day, changes the whole feel.)
2. Bands: real ink⇄paper inversion.
3. Process loop → snake layout.
4. Case studies → fanned decks + chat-bubble testimonials.
5. Compounding SVG chart.
6. Then, and only then, decide on the hero photograph and the pinned
   annotation section — those two are where the money and the dependencies are.
