---
name: Blueprint
description: A pasar malam at dusk — a lit stall in a dark lane, and the gate the crowd crosses to reach it.
colors:
  night-deep: "#120926"
  night: "#1c1039"
  plum: "#341751"
  plum-lit: "#4d2069"
  plum-edge: "#6b2f8a"
  tungsten: "#ffb13c"
  tungsten-hot: "#ffe3a8"
  tungsten-deep: "#d97c15"
  tarp: "#1d6fb8"
  tarp-pale: "#eaf2fb"
  fluoro: "#e9f5ff"
  card-pink: "#ff3d8b"
  card-green: "#86ff6b"
  card-stock: "#fff8e6"
  chop: "#25d366"
  chop-deep: "#128c48"
  ink: "#0d0619"
  bulb-dim: "#6a5233"
  shutter: "#241243"
  shutter-deep: "#180c2e"
  awning-green: "#2f9e4f"
shadows:
  card: "0 3px 0 rgba(0, 0, 0, 0.45)"
typography:
  display:
    fontFamily: "Archivo, Arial Narrow, sans-serif"
    fontSize: "clamp(2.4rem, 9vw, 4.75rem)"
    fontWeight: 900
    lineHeight: 0.88
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 75"
  headline:
    fontFamily: "Archivo, Arial Narrow, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3rem)"
    fontWeight: 900
    lineHeight: 0.88
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 75"
  title:
    fontFamily: "Archivo, Arial Narrow, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 900
    lineHeight: 0.88
    fontVariation: "'wdth' 75"
  lead:
    fontFamily: "Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 500
    lineHeight: 1.625
  body:
    fontFamily: "Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "normal"
  eyebrow:
    fontFamily: "Archivo, Arial Narrow, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 900
    letterSpacing: "0.2em"
    fontVariation: "'wdth' 75"
  marker:
    fontFamily: "Shantell Sans, Comic Sans MS, cursive"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.2
rounded:
  none: "0px"
  focus: "2px"
  chop: "6px"
  bulb: "9999px"
spacing:
  gutter: "16px"
  gutter-lg: "24px"
  grid-gap: "20px"
  counter-pad: "20px"
  counter-pad-lg: "24px"
  section-y: "64px"
  section-y-lg: "96px"
  close-y-lg: "112px"
components:
  chop-primary:
    backgroundColor: "{colors.chop}"
    textColor: "{colors.ink}"
    rounded: "{rounded.chop}"
    padding: "14px 24px"
  chop-primary-active:
    backgroundColor: "{colors.chop}"
    textColor: "{colors.ink}"
    rounded: "{rounded.chop}"
  chop-outline:
    backgroundColor: "transparent"
    textColor: "{colors.tungsten}"
    rounded: "{rounded.chop}"
    padding: "12px 20px"
  chop-label:
    backgroundColor: "{colors.night}"
    textColor: "{colors.tungsten}"
    rounded: "{rounded.chop}"
    padding: "4px 12px"
  stall-counter:
    backgroundColor: "{colors.plum-lit}"
    textColor: "{colors.fluoro}"
    rounded: "{rounded.none}"
    padding: "{spacing.counter-pad}"
  price-card:
    backgroundColor: "{colors.card-stock}"
    textColor: "{colors.ink}"
    typography: "{typography.marker}"
    rounded: "{rounded.none}"
    padding: "8px 12px"
  tag-chip:
    backgroundColor: "transparent"
    textColor: "{colors.tarp-pale}"
    rounded: "{rounded.none}"
    padding: "4px 8px"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.tarp-pale}"
    typography: "{typography.label}"
  nav-link-hover:
    textColor: "{colors.fluoro}"
  mark:
    backgroundColor: "{colors.tungsten}"
    textColor: "{colors.ink}"
    size: "32px"
---

# Design System: Blueprint

## Overview

**Creative North Star: "The Pasar Malam at Dusk"**

A Malaysian night market just after the lights go on. The sky is still bleeding indigo into plum, the string bulbs are already hot, and every stall is a striped tarpaulin awning over a fluorescent tube over a counter with hand-written cards on it. The page is that lane. The visitor is walking down it. Blueprint is the stall that is lit and staffed while the others are shuttered.

The system is **drenched, not neutral**. There is no grey, no white card on a dark background, no surface that exists only to hold content. The background is a painted sky gradient; every panel is a coloured object with a reason to be that colour. Depth comes from light — a tube throws a wash down onto a counter, a bulb glows because bulbs glow — never from soft ambient shadow. Density is generous and physical: things are stacked (awning, tube, counter), pinned (cards, always slightly crooked), and stamped (the chop, a rubber stamp with a 3px border).

The confirmed anti-reference is the site this replaced: a dark-navy / cyan / Space Grotesk drafting-blueprint vernacular with a feature-card grid. That world was destroyed deliberately. Its two signatures — the neutral card grid and the hairline-rule technical-drawing look — are the two things this world must never drift back toward. The stall replaced the card, and light replaced the hairline.

**Key Characteristics:**
- Drenched dusk palette: indigo → plum → lit-plum, with tungsten amber as the only warmth
- The stall (awning → tube → lit counter) as the universal container, not the card
- Three hands of type: a condensed black shout, a plain reading face, a hand-written marker
- Hard, zero-blur offset shadows; blur only where there is a light source
- WhatsApp green reserved exclusively for the conversion action
- Motion is ambient and slow (sway, flicker), and stops completely under reduced motion

## Colors

A drenched dusk: the surface *is* the colour, and every hue is a real object in a night market rather than a UI role borrowed from a palette generator.

### Primary
- **Tungsten String Light** (`{colors.tungsten}`): The wayfinding and emphasis colour. Every eyebrow, every "read more" arrow, every bulb, the second line of every two-tone headline, the timeline rail, the monogram plate, and the focus ring's parent hue. If the eye should go somewhere, it is amber.
- **Hot Tungsten** (`{colors.tungsten-hot}`): The filament itself — bulb bodies, crossing walker figures, and the focus-visible outline (3px, 3px offset). Brighter and paler than tungsten; used only where something is genuinely emitting.
- **Deep Tungsten** (`{colors.tungsten-deep}`): The dark stripe of the tungsten awning. Structural, never text.

### Secondary
- **Lit Plum** (`{colors.plum-lit}`): The counter surface. Every stall's content area sits on this, and it is the **brightest opaque surface on the page** — it must read as lit, because the whole metaphor depends on Blueprint's stall being the lit thing in a dark lane.
- **Plum Edge** (`{colors.plum-edge}`): The only structural border colour. 2px rules between sections, the Gate frame, the seam bar, footer and method-band edges. Used at full strength and at /40–/60 for internal divisions.
- **Tarpaulin Blue** (`{colors.tarp}`) and **Tarpaulin Pale** (`{colors.tarp-pale}`): The blue/white striped awning weave, and the default body text colour. Tarp-pale is the reading voice at 100% for chrome and at /65–/90 for secondary prose.

### Tertiary
- **Fluoro** (`{colors.fluoro}`): The fluorescent tube's own light. Doubles as the highest-emphasis text colour — every heading, every lead sentence, every hover-lightened link — and as the tube gradient's light source and the counter's downward wash. Text and light are the same colour here on purpose.
- **Marker Pink** (`{colors.card-pink}`): Hand-marker on a price card. Carries the negative and the cautionary: the "Example — not real client data" stamp, the disabled/struck law toggle, the missed-walker count, and one awning stripe.
- **Marker Green** (`{colors.card-green}`): Acid marker. Reserved for the hand-lettered client domain in the lane — the evidence you can go and check yourself.
- **Card Stock** (`{colors.card-stock}`): Fluorescent price-card paper. The only near-white opaque fill in the system, and it only ever appears as a card, never as a page background.

### Neutral
- **Night Deep** (`{colors.night-deep}`) and **Night** (`{colors.night}`): The overhead sky. Page root, the recessed method band (/60), the footer (/80), the Gate frame fill (/60).
- **Plum** (`{colors.plum}`): The horizon. Third stop of the body gradient at 72%, where the sky warms toward the lane.
- **Ink** (`{colors.ink}`): Near-black violet. Text *on* light surfaces only — price cards, the chop, the monogram, selection highlight.

### Named Rules

**The Reserved Chop Rule.** `{colors.chop}` and `{colors.chop-deep}` are WhatsApp's own green and they belong to the WhatsApp action alone. They appear on the hero chop, the sticky chop, the nav chop, the closing chop, the case-study chop, the footer WhatsApp line, and the "someone's at the counter" law when it is on — nothing else. Never use chop green for a heading, a border, a chart, a hover state, or a decorative accent. Its scarcity is what makes it a button on sight.

**The Lit Counter Rule.** The stall counter is `{colors.plum-lit}` with a fluoro wash falling from the top. It must always be lighter than the sky around it. A dark counter panel would make the whole metaphor lie.

**The Amber Wayfinding Rule.** Tungsten is the only emphasis colour that may appear more than once per screen. If something needs attention and is not the WhatsApp action, it is amber.

## Typography

**Display Font:** Archivo (variable, `wdth` axis) — with Arial Narrow fallback
**Body Font:** Be Vietnam Pro (400 / 500 / 600 / 700) — with system-ui fallback
**Marker Font:** Shantell Sans — with Comic Sans MS fallback

**Character:** A market stall's own signage. Archivo at weight 900 and 75% width is the painted board above the stall: compressed, uppercase, set at 0.88 line-height so lines stack like planks. Be Vietnam Pro is the voice that explains, plainly, to an owner-operator who is not a marketer. Shantell Sans is the marker pen — it only ever writes the things that would genuinely be hand-written on a stall.

### Hierarchy
- **Display** (900, `clamp(2.4rem, 9vw, 4.75rem)`, 0.88): The page H1 only. Two-tone: fluoro first line, tungsten second. Case-study H1 runs at a fixed 3rem → 3.75rem with 0.9 line-height.
- **Headline** (900, 2.25rem → 3rem): Section H2s — "Three jobs.", "Walk the lane.", "How a night runs." The closing H2 pushes to 3.75rem with 0.92 line-height.
- **Title** (900, 1.5rem): Stall names, method steps, in-page section headings. The lead stall in TRADES steps up to 1.875 → 2.25rem.
- **Lead** (500, 1.125rem, 1.625): The first paragraph inside a stall or case study, set in fluoro rather than tarp-pale.
- **Body** (400, 1rem, 1.625): Reading prose in tarp-pale at 80–90% opacity. Constrained by container: 2xl (42rem) under a display heading, 3xl (48rem) for long-form.
- **Label** (500, 0.75rem): Tag chips, disclaimers, docket source stamps, the copyright line.
- **Eyebrow** (900, 0.75rem, 0.2em tracking, uppercase): Display face at small size — the category line above the H1, the footer "Talk to us", "← Back to the lane".
- **Marker** (700, 1.125rem–1.875rem): Times, domains, counts, case-study facts.

### Named Rules

**The Three Hands Rule.** Archivo shouts, Be Vietnam Pro reads, Shantell Sans writes the numbers by hand. A font never takes another's job: no Archivo paragraphs, no Be Vietnam headings, no Shantell body copy.

**The Hand-Written Number Rule.** Anything that would be written by hand on a real stall is set in the marker face: docket times, the method's running order (`5pm`, `Late`), client domains, case-study facts (`40+`, `2`, `MOH`), the missed-walker count. Numbers that are UI (sizes, chip labels) stay in Be Vietnam Pro. Tabular figures (`.tabular`) are applied wherever numbers change in place.

**The Shout-Is-Uppercase Rule.** The display class carries `text-transform: uppercase` — never override it. Sentence-case Archivo reads as a mistake, not a variation.

## Layout

One column, one container ladder, one geometry at every width. Content sits in `max-w-5xl` (64rem) for the homepage sections, `max-w-3xl` (48rem) for the method band and case studies, and `max-w-2xl` (42rem) for a 404 or a supporting paragraph. Gutters are 16px, stepping to 24px at `sm`.

Vertical rhythm is set by section: 64px → 96px (`sm`) for standard sections, 80px → 112px for the closing section, and 24px of top padding for the hero so the first viewport delivers the seam without scrolling. Grid gap is a constant 20px everywhere — TRADES, the lane, the docket all use it.

Responsive behaviour is **reflow, not rearrangement**. TRADES is one column, becoming two at `lg` with the lead stall spanning both and splitting internally into a 50/50 lead-and-detail row. The lane is 1 → 2 (`sm`) → 3 (`lg`) columns of equal stalls. The Gate never changes structure: lane above, seam across, stall below, at 320px and at 1440px alike. The only height that adapts is the lane itself (160px → 192px).

The sticky chop is fixed bottom-right (16px, stepping to 24px at `sm`) at z-50, and the footer carries 112px of bottom padding below `sm` so the chop never covers the copyright line.

### Named Rules

**The One Geometry Rule.** Lane → seam → stall holds at every width. No breakpoint may reorder it, stack it differently, or hide the lane on mobile. If a layout only works at one width, it is the wrong layout.

**The Thumb-Zone Rule.** The WhatsApp chop is reachable without scrolling on every screen of the site. The buyer is reading on a phone between appointments.

## Elevation & Depth

Depth is **light and lamination**, not ambient shadow. Surfaces stack physically — an awning over a tube over a counter — and the tube's gradient wash down the top 60% of the counter is what makes the counter read as a surface receiving light. Nothing floats on a blur.

Shadows exist, but they are all zero-blur offsets: the flat drop of a card lying on a counter, and the solid thickness of a rubber stamp you can press. The only blurred shadows in the system are the bulb glows, and those are emitted light, not shadow.

### Shadow Vocabulary
- **Card drop** (`box-shadow: var(--shadow-card)` = `0 3px 0 rgba(0, 0, 0, 0.45)`): Every price card. It is lying on something.
- **Chop body** (`box-shadow: 0 6px 0 var(--color-chop-deep)`; 7px on the closing chop): The thickness of the stamp. On `:active` it collapses to `0 2px 0` with a 1px translate — the stamp is pressed.
- **Bulb glow** (`box-shadow: 0 0 6px 1px var(--color-tungsten), 0 0 14px 3px rgba(255,177,60,0.42)`): Sized to the bulb, not sprayed over the page. The unlit variant (`{colors.bulb-dim}`) has no shadow at all — lit and unlit are a state pair, not a one-off, which is why the dim value is a token.

### Named Rules

**The Hard Shadow Rule.** Shadows are offset and unblurred. Blur is reserved for light sources — a bulb may glow; a panel may not.

**The Light-Source Rule.** Every glow in the build belongs to an object that would emit light in the real lane. Do not add ambient bloom, backdrop blur, or a glow behind a heading to create emphasis; use tungsten instead.

## Shapes

The form language is **square-cut with one stamped exception**. Stalls, price cards, tag chips, case-study fact boxes, the method rail, the footer — all zero radius. The only rounded things are the chop (6px, matching the Gate's frame), the focus ring (2px), and bulbs (full circle). Radius is therefore semantic: if it is rounded, it is either something you press or something that is lit.

Borders are 2px and structural, in plum-edge: section separators, the Gate frame, fact boxes, the timeline rail (tungsten at /50). The chop's border is 3px, in `currentColor`, so an outline chop and a filled chop are the same object. Tag chips are the system's single 1px border, at `tungsten/45` — deliberately the lightest object in the hierarchy.

Two silhouettes recur and are load-bearing:
- **The scallop.** The awning's bottom edge is a repeating radial mask (22×14px, 11px circle) that bites semicircles out of it. Every awning in the system carries it. It is what makes a striped rectangle read as a tarpaulin.
- **The crooked card.** Price cards are rotated between 0.4° and 2° off-axis, alternating direction down a list. Nothing hand-placed sits perfectly square.

The monogram is a `clip-path` quadrilateral (`polygon(0 0,100% 6%,96% 100%,4% 94%)`) — an amber plate that looks cut, not drawn.

### Named Rules

**The Crooked Card Rule.** A price card is never at 0°. Rotate 0.4°–2°, and alternate the sign in a sequence so a list looks dealt rather than tiled.

**The Semantic Radius Rule.** Zero radius by default. 6px means pressable; a circle means lit. Never round a container to soften it.

## Components

### The Stall (signature — the system's universal container)
The stall replaced the card. It is three stacked strips: a 24–28px striped, scalloped, slowly-swaying awning; a 8px fluorescent tube; then the lit counter holding all content at 20px padding (24px at `sm`). It is used for TRADES entries, for every client in the lane, and for the Gate's booking counter — three completely different content types in one form, which is exactly why it is the system's most important pattern.

- **Awning hues:** four variants (`tarp` blue/white, `pink`, `green`, `tungsten`), each a 18px-period stripe, assigned per item purely to keep a grid from reading uniform.
- **Counter:** `{colors.plum-lit}` with a fluoro wash falling from the top edge.
- **Interactive stalls** (client lane) lift 4px on hover with no other change; the underlying link carries no underline.

### Buttons — The Chop
- **Shape:** Stamped rectangle, gently rounded (6px), 3px `currentColor` border, display face, uppercase-weight black.
- **Primary:** Chop green fill, ink text, chop-deep border, 24px × 14px padding (28px × 16px on the closing CTA), with a 6px solid green underhang.
- **Active:** Translates down 1px and the underhang collapses to 2px. There is no hover elevation on the primary chop — pressing is the gesture.
- **Nav variant:** Same fill, smaller (12–16px × 6px), and this one lifts 2px on hover.
- **Outline variant:** Transparent fill, tungsten border and text (404 "Back to the lane"), or plum/tungsten as a small stamped label ("the gate", 10px, 0.18em tracking, uppercase).
- **Label variant:** The chop shape used as a stamp rather than a control — the pink "Example — not real client data" disclaimer. Any disclaimer in this system is stamped, never set as fine print.

### Cards / Containers — The Price Card
- **Corner Style:** Square (0px).
- **Background:** Card stock, ink text, always in the marker face.
- **Shadow:** Card drop (`0 3px 0 rgba(0,0,0,0.45)`).
- **Rotation:** 0.4°–2°, alternating.
- **Padding:** 8–12px for docket rows and chips; 20–24px when used as a full section (the "On results" honesty note).

### Chips
- **Tags:** 1px `tungsten/45` border, transparent fill, tarp-pale text, 0.75rem (0.6875rem in the lane), zero radius. The lightest object in the system.
- **Source stamps:** Ink fill, card-stock text, 0.625rem, wide-tracked uppercase, 4px radius. Used inside the docket only.

### Navigation
Transparent, unpinned, sitting directly on the sky at 16px/24px padding. Monogram plate plus wordmark in display face at the left; two text links (`tarp-pale/80` → fluoro on hover, hidden below `sm`) and the nav chop at the right. There is no mobile menu — below `sm` the nav reduces to wordmark plus chop, which is the only navigation a phone visitor needs.

### The Gate (signature interaction)
The argument, animated. A lane of nine drifting SVG figures crosses a seam into a lit stall; the walkers that cross become dockets that land on the counter, the ones that do not keep walking and increment a struck-through count. Driven by a `requestAnimationFrame` loop at 5.4%/s with a deterministic seed so server and client first paint agree. Two toggles ("We're filling the lane", "Someone's at the counter") flip the laws — turning either off stops the crossing, which is the product thesis in one gesture.

- Figures are **drawn, not photographed**: a 14×30 SVG person, dimmed tarp-pale while passing, hot tungsten while crossing.
- Crossing is `translateY(46px) scale(0.7)` to zero opacity over 500ms — downward through the seam.
- Dockets land with `land` (0.38s, `cubic-bezier(0.22,1,0.36,1)`, no overshoot) — a card settles on a counter, it does not spring.
- The rAF loop is skipped entirely when `prefers-reduced-motion` matches; the still composition carries the argument, and a screen-reader paragraph states it in words.

### Motion Vocabulary
- **sway** (7s ease-in-out, ±1.1°, origin top-centre): every awning, always.
- **flicker** (9s linear, dipping to 0.55 opacity in the last 7%): bulb strings, staggered 0.7s per bulb.
- **land** (0.38s, firm decelerate): dockets arriving.
- **Hover/press:** 4px lift on stalls, 2px lift on the nav chop, 1px press on the primary chop. Nothing else moves on interaction.

### Named Rules

**The Full Stop Rule.** Under `prefers-reduced-motion: reduce`, everything stops — one global block killing animation, transition and scroll-behaviour, **with no `!important` re-enables anywhere**. The replaced site had two. The composition must read as a deliberate still with nothing running.

**The Stall-Not-Card Rule.** New repeating content gets a stall. If you find yourself reaching for a bordered rectangle with a title and body, you have reintroduced the feature-card grid this world was built to destroy.

**The Drawn-Not-Stocked Rule.** People are drawn as figures; icons are inline SVG. No stock photography, no illustration library, no placeholder imagery.

## Do's and Don'ts

### Do:
- **Do** build any new repeating content as a stall: scalloped swaying awning → fluoro tube → `{colors.plum-lit}` counter.
- **Do** keep the counter the brightest opaque surface in its neighbourhood.
- **Do** use tungsten for every emphasis and wayfinding cue that is not the WhatsApp action.
- **Do** hand-letter in Shantell Sans anything that would be hand-written on a real stall — times, domains, counts, facts — and apply `.tabular` when a number changes in place.
- **Do** rotate price cards 0.4°–2° and alternate the direction down a list.
- **Do** use offset, zero-blur shadows for weight, and reserve blur for objects that emit light.
- **Do** stamp disclaimers in the chop shape (pink border, pink text) rather than shrinking them into fine print.
- **Do** end every primary CTA in a WhatsApp link with a prefilled message.
- **Do** render a missing fact as an honest note in the world's own vocabulary — the "On results" price card — rather than omitting the section or filling it.
- **Do** keep body text above 4.5:1: tarp-pale at /65 or higher at 12px, /80 or higher for prose.

### Don't:
- **Don't** use `{colors.chop}` or `{colors.chop-deep}` for anything other than the WhatsApp conversion action. Not a heading, not a border, not a hover, not a chart.
- **Don't** put a dark panel where a counter belongs.
- **Don't** reintroduce the neutral bordered feature-card grid, hairline technical rules, or the navy/cyan/Space Grotesk vernacular of the replaced site.
- **Don't** add `!important` re-enables inside the reduced-motion block, or exempt a "subtle" animation from it.
- **Don't** override the display class's uppercase, or set body copy in Archivo or Shantell.
- **Don't** add ambient blur, backdrop-filter, or a glow behind text to create emphasis.
- **Don't** ship a stock photo, an illustration-library asset, or a grey placeholder box. Every image in this system is drawn SVG until real client photography exists.
- **Don't** print a number, sector, location, or outcome that is not user-confirmed. `lib/clients.ts` enforces this with `detail: null` and `outcomes: null`; `lib/site.ts` enforces it by falling back to `http://localhost:4310` rather than a guessed production domain. A guess rendered beside a real client's name is the same failure as a fabricated metric, and the visual system is designed to look complete without one.
