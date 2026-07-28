---
name: Blueprint V2 (parallel candidate world — /v2 only)
description: Brand blue owns the top and bottom of the page as a grained, drifting aurora; paper and ink hold the long middle where the client screenshots live; WhatsApp green stays the only action colour.
colors:
  paper: "#fcfcfd"
  paper-sunk: "#f4f5f7"
  ink: "#0b0c0e"
  ink-soft: "#494e56"
  ink-mute: "#5f646c"
  ink-on-band: "#b6bcc4"
  ink-on-band-mute: "#949aa3"
  line: "#e4e6ea"
  line-strong: "#d2d6dc"
  act: "#25d366"
  act-press: "#1eb455"
  act-ink: "#06150c"
  act-text: "#0e7c43"
  brand: "#1e4fe0"
  brand-deep: "#0a1b45"
  brand-mid: "#12296b"
  brand-lift: "#3b7dff"
  brand-text: "#1741c4"
  cyan: "#25c9e8"
  violet: "#6c4bf0"
  warm: "#ff7a3d"
  on-brand: "#ffffff"
  on-brand-soft: "rgba(255,255,255,0.82)"
  on-brand-mute: "rgba(255,255,255,0.68)"
  on-brand-line: "rgba(255,255,255,0.16)"
typography:
  display:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 6.4vw, 5rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.033em"
  headline:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "clamp(2rem, 3.9vw, 3rem)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.028em"
  title:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.28
    letterSpacing: "-0.014em"
  lead:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1.55vw, 1.3125rem)"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  body:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  mono:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    letterSpacing: "-0.01em"
    fontFeature: "tabular-nums"
rounded:
  hair: "3px"
  tail: "4px"
  mark: "7px"
  control: "9px"
  surface: "12px"
  panel: "14px"
  full: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  "2xl": "32px"
  "3xl": "44px"
  "4xl": "56px"
  band: "88px"
  band-wide: "128px"
components:
  button-act:
    backgroundColor: "{colors.act}"
    textColor: "{colors.act-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "13px 20px"
  button-act-hover:
    backgroundColor: "{colors.act-press}"
  button-act-compact:
    backgroundColor: "{colors.act}"
    textColor: "{colors.act-ink}"
    rounded: "{rounded.control}"
    padding: "9px 15px"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "13px 20px"
  button-ghost-dark:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "13px 20px"
  frame:
    backgroundColor: "#ffffff"
    rounded: "{rounded.surface}"
  frame-bar:
    backgroundColor: "#f7f8fa"
    textColor: "{colors.ink-mute}"
    typography: "{typography.mono}"
    padding: "9px 12px"
  note:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "26px"
  band-sunk:
    backgroundColor: "{colors.paper-sunk}"
    textColor: "{colors.ink}"
    padding: "88px 24px"
  close-band:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    padding: "88px 24px"
  mark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.mark}"
    size: "27px"
  step-number:
    backgroundColor: "transparent"
    textColor: "{colors.ink-mute}"
    rounded: "{rounded.full}"
    size: "30px"
---

# Design System: Blueprint V2 "Plain"

**Scope, before anything else. This document governs the `/v2` route only** — the files `app/v2/layout.tsx`, `app/v2/v2.css`, `app/v2/page.tsx`, and `components/v2/Thread.tsx`. **`DESIGN.md` at this project root governs `/` ("Pasar Malam at Dusk") and is the incumbent, still-live world.** The two are parallel candidates being compared, not a system and its extension. Nothing here overrides `DESIGN.md`; nothing in `DESIGN.md` applies to `/v2`. Do not blend them, do not port tokens across, and do not use one file to justify a change in the other's territory.

Every token and rule below was read off the shipped `/v2` build, not off the direction contract. Where the build and the contract diverge, the build is recorded and the divergence is noted in prose.

## Overview

**Creative North Star: "The Plain Document"**

This world refuses a governing metaphor. There is no lane, no stall, no gate, no atmosphere — the page is a well-set document on near-white paper with near-black type, hairline rules between sections, and one action colour. Its persuasive load is carried entirely by real artefacts: six screenshots of six live client sites, each in a quiet browser frame with its actual address legible in the chrome. The system is deliberately colourless so that the client work supplies all the chroma. Remove the screenshots and the page goes monochrome, which is the correct test of whether the proof is doing the work.

Density is low and rhythm is generous: one shell (1180px), one gutter (24px), bands of 88px rising to 128px from 768px. Sections are separated by ground change (a sunk grey band, an ink-black band) or by a single 1px line, never by ornament. Type does the hierarchy alone — one family, Schibsted Grotesk, worked across a wide weight range (400 through 800, including the intermediate 550 and 650 the variable font affords) and a tight negative tracking that increases as size increases. Geist Mono appears only where a machine address does: the URL in a browser chrome bar.

The build refuses the agency default explicitly and visibly: there is no dark gradient hero, no invented stat counter, no icon feature-card grid. It also ships a designed absence — the "On results" note states plainly that no aggregate revenue figure or average lift exists, and the layout is composed so the page reads as complete without them. That is a visual property, not just a copy decision: the sections that would normally hold big numbers hold real screenshots and a real transcript instead, and the page carries its weight without a single fabricated figure.

**Key Characteristics:**
- Near-white paper ground (#fcfcfd) with near-black ink (#0b0c0e); no gradients anywhere.
- One reserved green, WhatsApp's own, in four values — action, press, on-green ink, and a darkened text/focus value that is legible on paper.
- All chroma originates in real client screenshots inside browser frames showing live URLs.
- One typeface for everything except machine addresses.
- Hairline separation (1px) and ground change instead of boxes and cards; only three surfaces are actually enclosed.
- Composed to look complete with no aggregate metrics, because none can be honestly defended.
- Wholly scoped under `.v2`; it inherits nothing from the incumbent world's stylesheet but the Tailwind reset.

## Colors

A monochrome paper-and-ink palette with exactly one hue admitted, and that hue is the action.

### Primary
- **WhatsApp Action Green** (`{colors.act}`): Fills the only button that starts a conversation, in the nav, the hero, and the close. It is a brand-true green because the action literally *is* WhatsApp; it is never used as decoration, never as a heading colour, never as a border.
- **Pressed Green** (`{colors.act-press}`): The hover fill for the action button, and the source hue of its hover glow.
- **Green-Safe Ink** (`{colors.act-ink}`): Near-black with a green cast, used for label text sitting on the action fill and for text inside the outgoing WhatsApp bubble.
- **Legible Green** (`{colors.act-text}`): The only green permitted to carry words on the paper ground (measured 5.2:1). Used for the good verdict strip's text and for the focus ring on paper.

### Neutral
- **Paper** (`{colors.paper}`): The page ground. Also painted onto `html` and `body` under this route so overscroll and any area below a short page do not flash the incumbent world's indigo through.
- **Sunk Paper** (`{colors.paper-sunk}`): The alternate band ground for the services and process sections, and the fill of incoming message bubbles. It separates sections by ground change instead of by a container.
- **Ink** (`{colors.ink}`): All primary type, the logo mark, and the single black close band.
- **Soft Ink** (`{colors.ink-soft}`): Body prose, lead paragraph, and nav links at rest — a deliberate step down from headline black so the headings stay dominant without a size increase.
- **Muted Ink** (`{colors.ink-mute}`): Captions, URL text in browser chrome, service notes, timestamps, step numerals.
- **Hairline** (`{colors.line}`): The 1px separator that does most of the structural work — section edges, list rows, panel divisions.
- **Strong Hairline** (`{colors.line-strong}`): The heavier 1px used where a border must read as an enclosure or a control edge: browser frames, the outline button, the honesty note, the step numeral ring, the chrome dots.
- **Band Prose / Band Mute** (`{colors.ink-on-band}` / `{colors.ink-on-band-mute}`): Secondary text on the ink close band, tinted from the band's own hue rather than dropped to neutral grey (measured 4.9:1 for the mute value).

### Named Rules

**The Reserved Green Rule.** Green means "message us on WhatsApp" and nothing else. It appears as the action fill, its press state, its on-fill ink, and its darkened legible value in the good verdict and the focus ring — all four are the same commitment. It is never a heading colour, never a decorative border, never a section accent.

**The Borrowed Chroma Rule.** Every colour on the page that is not paper, ink, or the reserved green comes from inside a client screenshot. The system contributes no palette of its own to imagery; it supplies the frame and gets out of the way.

**The Contrast-Earns-The-Value Rule.** Where a colour must carry words, the recorded value is the one that passes on its actual ground, not the brand value. The green on paper is the darkened text value; the focus ring inverts to full brand green inside the ink close band, because dark green on near-black measures ~2.4:1 and would leave the two most important CTAs with an invisible ring. A value is never softened to make a contrast finding disappear.

## Typography

**Display / Body Font:** Schibsted Grotesk (with system-ui, sans-serif)
**Mono Font:** Geist Mono (with ui-monospace, monospace)

**Character:** One grotesk doing every job, distinguished by weight and tracking rather than by family. Headlines are heavy (800) and tightly tracked with sub-1.0 leading, so they read as objects; body text is plain 400 at generous 1.65 leading. Geist Mono is not a second voice — it is a signal that the string is a machine address.

### Hierarchy
- **Display** (800, `clamp(2.25rem, 6.4vw, 5rem)`, 0.98, -0.033em, balanced wrap): The one hero sentence. The 2.25rem floor is load-bearing: a larger floor pushed the headline to four lines at 390px and shouldered the WhatsApp action toward the fold.
- **Headline** (800, `clamp(2rem, 3.9vw, 3rem)`, 1.04, -0.028em, balanced wrap): Every section opener. Constrained by an explicit character measure per section (16–20ch) rather than by a container width.
- **Title** (700, 1.25rem, 1.28, -0.014em): Column headings and process step names.
- **Lead** (400, `clamp(1.125rem, 1.55vw, 1.3125rem)`, 1.55, max 34ch, soft ink): The single paragraph under the hero sentence. Its short measure is what keeps the hero column from competing with the screenshot beside it.
- **Body** (400, 1.0625rem, 1.65, max 68ch, soft ink): All running prose.
- **List Row** (550, 1.0625rem, -0.012em): Service names, paired inline with a 400-weight muted note at 0.9375rem.
- **Label** (400, 0.875rem, 1.5, muted ink): Captions under screenshots, disclosure lines, footer meta.
- **Mono** (400, 0.8125rem, -0.01em, tabular numerals): URLs in browser chrome only.

### Named Rules

**The One Family Rule.** Schibsted Grotesk sets everything a human reads. Geist Mono is admitted only for a machine address — a URL in a chrome bar. If a string is not something you could type into an address bar, it is not mono.

**The Measure-Not-Container Rule.** Text width is limited by character count on the text itself (34ch lead, 68ch prose, 16–20ch headings, 62ch disclosure), never by narrowing the shell. Sections that want a narrow column use a 780px inner column inside the full shell, so the page's left gutter never wobbles on the way down.

**The Weight-Does-The-Work Rule.** Hierarchy steps come from weight and tracking before size. The ramp is few and obvious: 800 for headings, 700 for titles, 550/650 for emphasis inside small text, 400 for prose.

## Layout

One column, one shell, one gutter. The shell is 1180px max with 24px inline padding and auto margins; every section uses it, so the left edge is identical from the nav to the footer. Vertical rhythm is carried by bands: 88px block padding, rising to 128px at 768px and up. Sections are distinguished by ground (paper, sunk paper, ink) or by a single hairline, never by a card wrapping the whole section.

Narrow-measure sections (process, close, honesty note) use a 780px inner column *inside* the full shell rather than a narrower shell. This is deliberate and recorded: centring a narrow shell would push those sections' left edge inboard of every other section.

Breakpoints observed: 640px (work grid to 2-up, secondary nav links appear), 768px (band padding to 128px, services to 2 columns, note padding to 34px), 900px (hero splits to two columns), 1000px (work grid to 3-up).

The hero is a single column on phones with the screenshot *below* the action, so the sentence and the WhatsApp button own the first screen; from 900px it becomes `minmax(0,1fr) / minmax(0,1.06fr)` with a 56px gap, the screenshot given the slightly larger share so its URL stays legible. Work tiles are cropped to a fixed 16/10 window with top-centre object position, so six sites of six different heights read as one row. The thread panels use `repeat(auto-fit, minmax(290px, 1fr))` — the only auto-fit grid in the system, because the two panels must sit side by side to make their comparison and stack cleanly when they cannot.

Grid gaps in use: 20px (thread panels), 28px (work tiles), 40–56px (services), 44–56px (hero).

## Elevation & Depth

The system is flat by default and separates by hairline and ground change. Shadow exists, but only in two places and both are literal rather than decorative: the browser frame casts a soft real-object shadow because it is standing in for a window, and the action button carries a small resting shadow plus a green-tinted lift on hover because it is the one thing meant to be pressed. Bands, lists, notes, and the close band have no shadow at all. The sticky nav gains depth from a translucent paper fill (86%) with a 10px backdrop blur and a bottom hairline, not from a shadow.

### Shadow Vocabulary
- **Frame at rest** (`box-shadow: 0 1px 2px rgba(11,12,14,0.05), 0 12px 28px -12px rgba(11,12,14,0.2)`): The browser frame around every client screenshot.
- **Frame lifted** (`box-shadow: 0 1px 2px rgba(11,12,14,0.06), 0 22px 44px -16px rgba(11,12,14,0.28)`): Applied to the frame when its work tile is hovered, paired with a -3px translate.
- **Action at rest** (`box-shadow: 0 1px 2px rgba(11,12,14,0.14)`): The WhatsApp button's seated weight.
- **Action lifted** (`box-shadow: 0 6px 16px -4px rgba(30,180,85,0.5)`): Hover only; the glow is tinted from the pressed green, so the only coloured shadow in the system belongs to the only reserved colour.

### Named Rules

**The Hairline-First Rule.** Structure is a 1px line or a change of ground before it is a border, and a border before it is a shadow. Three things in this world are enclosed — the browser frame, the thread panel, and the honesty note — and each is enclosed because it is a distinct object, not to group text.

**The Shadow-Means-Object Rule.** A shadow is only permitted where the element is pretending to be a physical thing (a window) or is meant to be pressed (the action). Text blocks, bands, list rows and section groupings are never shadowed.

## Shapes

Radii are small and stepped by role, not by a single global value: 3px on the focus ring, 4px on the pressed corner of a message bubble's tail, 7px on the logo mark, 9px on every button, 12px on browser frames and message bubbles, 14px on the thread panel and honesty note, and full pills (999px) on chrome dots, the "11 hours later" gap chip, typing dots, and the step numeral ring. Nothing is sharp-cornered and nothing is heavily rounded; the largest radius on a large surface is 14px.

Borders are 1px throughout, in exactly two values — the hairline for separation and the strong hairline for enclosure and controls. There is one dashed border in the system: the elapsed-time chip inside the slow thread, dashed because it marks absence rather than content. Message bubbles carry the WhatsApp tail convention (one corner dropped to 4px, left on incoming and right on outgoing), which is the world's own material and is therefore used straight.

## Components

### Buttons
- **Shape:** Softly rounded rectangle (9px), 1px transparent border reserved so outline variants sit on the same box.
- **Action (primary):** WhatsApp green fill with green-safe near-black label, 16px/600 weight at -0.011em tracking, 13px 20px padding, 9px icon gap. A compact variant at 9px 15px / 0.9375rem is used in the nav and for the thread's replay control.
- **Hover / Focus:** Fill deepens to pressed green, -1px translate, green-tinted glow; active returns to 0. All state changes run 0.16s ease-out on background, border, transform and shadow. Focus is a 3px legible-green outline at 3px offset, inverting to full brand green inside the ink close band.
- **Outline:** Transparent fill, ink label, strong-hairline border; hover darkens the border to ink and adds a 3.5% ink wash.
- **Ghost on ink:** Transparent fill, paper label, 28% paper border; hover raises the border to 75% and adds a 7% paper wash. Used only on the close band, only as the secondary to the action.

### Browser Frame (signature component)
The system's defining object and its entire imagery strategy. A white surface with a strong-hairline border and 12px radius, containing a chrome bar (three neutral 9px dots, then the live host in Geist Mono, ellipsised) above a screenshot cropped to a 16/10 window. The URL is not decoration: it is the claim that the visitor can go and check, so it must be real, must be legible, and must match the link's destination. In the hero the frame appears at full size with a caption beneath; in the work grid six frames are wrapped in link tiles that translate -3px and deepen the frame shadow on hover, over 0.18s on a firm decelerate.

### Thread (signature component)
Two WhatsApp threads compared side by side inside 14px-radius white panels with hairline heads and a minimum 300px body. Incoming bubbles are sunk paper on the left, outgoing are WhatsApp's own bubble green (#d8fdd2) on the right with green-safe ink; both cap at 82% width with the tail corner dropped to 4px. Elapsed time appears as a centred dashed pill. Each panel closes with a verdict strip: a warm-red-on-blush strip for the lost enquiry, legible-green-on-pale-green for the booked one.

Motion: messages arrive with a 0.34s fade and 7px rise on a firm decelerate (`cubic-bezier(0.16, 1, 0.3, 1)`); nothing springs and nothing travels far. A three-dot typing indicator blinks on a 1.1s loop with 0.16s stagger and is hidden from assistive technology. The timeline is 7.2s stepped at 100ms, triggered once at 35% viewport intersection.

The important behaviour is the default state: the component renders **finished**, not empty. Server output shows both conversations complete, and the animation only rewinds and plays after JS confirms it is running and motion is welcome. Under `prefers-reduced-motion`, it stays finished as a deliberate still. A manual replay control is always present.

### Lists and Steps
Service rows and process steps are separated by hairlines top and bottom with no container: 15px vertical padding for service rows, 22px for steps. A step carries a 30px full-circle numeral in strong hairline with muted tabular type in a fixed first column, 18px from its text. This is the system's replacement for the icon feature-card the direction contract refuses.

### Navigation
Sticky at top, 62px tall, translucent paper at 86% with a 10px backdrop blur and a bottom hairline. Left: a 27px ink square mark (7px radius, paper "B", 800 weight) beside the wordmark at 700/-0.022em. Right: two soft-ink text links that fade in at 640px and hover to full ink over 0.15s, then the compact action button. The nav's only strong element is the green button.

### Honesty Note
A strong-hairline 14px panel on paper (26px padding, 34px from 768px) holding the statement that no aggregate revenue or lift figure exists. It is treated as a first-class section, given its own band and its own enclosure, rather than shrunk into footnote type.

### Aurora (signature material)
The brand ground, used on exactly two bands: the nav-and-hero at the top and the close at the bottom. A `168deg` linear gradient from `#0b1e4d` through `#16307f` to `#1a2f7a`, with three blurred radial blobs drifting over it on long offset cycles — violet top-right (26s), cyan bottom-right (32s), and a single warm bloom at reduced opacity (38s). Each blob is 80px-blurred, `will-change: transform`, and animates only `transform` and `scale`, so nothing repaints.

Over the whole thing sits an `feTurbulence` grain at 40% via a data-URI SVG. The grain is load-bearing, not decoration: without it the gradient reads as a default CSS ramp, and with it the band reads as a material. It is a real noise filter rather than a tiled cell field, which also keeps it clear of the tiled-background antipattern.

The blobs live in an `aria-hidden` field at `z-index: -2`, carry no text and no focus targets, and stop dead under `prefers-reduced-motion` — where the still composition is already the finished picture.

**Cascade hazard, learned the hard way:** `.aurora` supplies the background, and `.close-band` is defined *later* at equal specificity. Any `background` declaration on `.close-band` silently wins and blanks the ground, rendering white type on near-white. Never declare a background on a band that also carries `.aurora`.

### Gradient Rules ("colourful borders")
The brand ramp appears as structural rules, never as an enclosure. A 3px pseudo-element bar at `top: 0`, 2px radius, on three components: problem blocks (brand → violet → cyan → transparent, opening a section), results metrics (brand → cyan), and segment panels (brand → violet → cyan at 45% opacity, rising to full on hover).

They are rules that happen to carry colour, so the system keeps its hairline discipline — no box is ever wrapped in a gradient, and no card gets a coloured left border. Note the repetition risk: three components sharing one device is the ceiling, and the results bar is usually absent, so at most two are visible at once.

### Proof Strip
A sunk band with hairlines top and bottom sitting immediately under the hero, holding a muted 0.875rem label above a row of all six live client sites. Each item is a link pairing a 46×32px browser-frame thumbnail (1px strong hairline, 4px radius, image cropped to top-centre) with the client name at 0.875rem/650 and the live host in Geist Mono at 0.75rem, both ellipsised. The row reflows 2 → 3 (720px) → 6 (1040px) columns. Hover underlines the name only.

This component exists to do a job the system could not do honestly any other way: it occupies the position a testimonial carousel would take, using the only proof that is on record. No quote, headshot, or client logo appears anywhere in this world, because none is confirmed.

### Segment Panel
Buyer self-identification, four to a section, reflowing 1 → 2 columns at 760px. A 14px-radius hairline panel on paper (26px padding, 32px from 768px) laid out as a column so its footer bottom-aligns across a row of unequal panels. Inside, in fixed order: a title at title scale, a muted 0.875rem "who you are" line, a 1.0625rem/500 ink statement of that buyer's actual pain, then a hairline-separated list of what gets built, then a footer naming the real clients of that type as underlined ink links.

The list marker is a 7px hairline ring in strong-hairline ink, deliberately **not** a green tick — a marker is not an action, so it does not get the reserved colour.

### Problem Block
The system's heaviest structural device, used exactly twice. A 2px solid ink top rule opens it — the only 2px rule in the world apart from the results grid — followed by a head row pairing a muted Geist Mono ordinal (`01`, `02`) with the enemy named in the heading. The body is a two-column grid from 900px: prose on the left at the standard measure, and on the right a bold "what we build against it" label above a hairline service list.

The enemy heading sits one step **below** the section heading that introduces it — `clamp(1.75rem, 3vw, 2.375rem)` against the h2's `clamp(2rem, 3.9vw, 3rem)`. At equal size the two enemies read as siblings of the section rather than as its content, and the section loses its spine.

### Mid-page CTA Band
A sunk band with hairlines top and bottom, 32px vertical padding, holding a 1.5rem heading plus a ≤56ch supporting line on the left and the action button on the right, wrapping to stacked on narrow widths. It exists because a page of this length is entered mid-scroll, and the action must not require scrolling back to the top.

### Results Grid (conditional)
Renders **only** when real measured figures exist in `lib/results.ts`; otherwise the Honesty Note holds the same slot. Two to four metrics reflow to three columns at 700px, each opening with a 2px ink top rule above a `clamp(2.5rem, 5vw, 3.5rem)`/800 tabular value at -0.035em and a ≤26ch muted label. A period is required alongside any figure.

This conditional is a design decision, not an implementation detail: PRODUCT.md forbids aggregate or invented outcome numbers, so the system is built to look finished without any figure and to absorb a real one without redesign.

### Footer
Four columns from 980px (1.4fr 1fr 1fr 1.2fr), collapsing to two at 620px and one below. A brand column with the mark, wordmark and a ≤34ch line; then link columns under 0.875rem/700 headings, 9px apart. A hairline above a base row carries the copyright.

## Named Rules (structure)

**The Repeated Action Rule.** The WhatsApp action appears at four depths — nav, hero, mid-page band, close — always the same destination, never the same sentence. The wording is written for where the reader is: an opener in the hero, a diagnostic question mid-page, a commitment at the close. A visitor who enters at any scroll position can act without travelling.

**The Marker-Is-Not-An-Action Rule.** The Reserved Green Rule holds absolutely through every component added here. Segment list markers, problem ordinals, results rules and footer links are all ink or hairline. Green appears only on the action and its states — never on a marker, heading, border, rule, or hover.

**The Colour-Concentration Rule.** Brand blue owns the two ends of the page — nav and hero at the top, close at the bottom — and paper holds everything between. This is what keeps a gradient an event rather than a wash, and it is not negotiable: the long middle is where six real client screenshots live, and they need a calm ground to read against. A third blue band in the middle would cost the work its legibility and the colour its impact.

**The Two-Colour-Jobs Rule.** Blue is identity; green is action. Blue carries the brand grounds, the gradient rules, emphasis links, the step numerals and hover states. Green appears only on the WhatsApp action and its states — never on a marker, heading, border, rule or hover, on any ground. The Reserved Green Rule survives the introduction of brand colour completely intact, and the action is *more* visible for it: saturated green on deep blue is the highest-contrast pairing on the page.

Any blue that carries words on paper uses `brand-text` (5.4:1), never `brand`. On the aurora bands the focus ring switches to cyan, since the legible-green ring is unreadable against deep blue.

**The Enemy-Named-In-The-Heading Rule.** A problem section states the loss in the buyer's own words as its heading, and only then explains it. The capabilities that answer it are listed beside the prose, not as a separate services section — a service is only legible as a purchase once the thing it prevents has a name.

## Do's and Don'ts

### Do:
- **Do** keep every rule of this file scoped under `.v2`. The world isolates itself: it paints `html` and `body` under its own route, and it neutralises the incumbent layout's amber skip link so another world's brand cannot appear on the first keyboard press.
- **Do** let real client screenshots supply all imagery and all chroma, always inside a browser frame carrying the site's live, correct address.
- **Do** separate sections with a change of ground (paper / sunk paper / ink) or a single hairline.
- **Do** reserve green for the WhatsApp action and its states, per **The Reserved Green Rule**.
- **Do** use the darkened legible green for any green that carries words on paper, and invert the focus ring to full brand green on the ink band.
- **Do** limit text by character measure on the text itself, and use the 780px inner column rather than a narrower shell, per **The Measure-Not-Container Rule**.
- **Do** ship stateful and animated components in their finished state on the server, so a visitor with no JS or reduced motion reads the whole argument.
- **Do** label any illustrated content as an illustration in plain 0.875rem type adjacent to it, as the thread does.
- **Do** compose sections so the page reads complete without any aggregate figure; use real artefacts where a metric would otherwise sit.

### Don't:
- **Don't** import, port, or reference tokens from `DESIGN.md` / `app/globals.css`. That is the incumbent world's system for `/`.
- **Don't** introduce a gradient, a dark gradient hero, an invented stat counter, or an icon feature-card grid — the three defaults this direction was built to refuse.
- **Don't** add a second typeface. One grotesk, plus mono for machine addresses only.
- **Don't** put a shadow on a text block, a band, or a list grouping; shadows belong to frames and the action, per **The Shadow-Means-Object Rule**.
- **Don't** use green as a heading colour, a decorative border, or a section accent.
- **Don't** show a browser frame with a fabricated, shortened, or mismatched URL; the address is the proof.
- **Don't** put an aggregate revenue figure, an average lift, or an unconfirmed sector label anywhere in this world. Client tiles that lack confirmed sector and place render the neutral "Visit the site →" line instead of an invented one.
- **Don't** let an entrance animation be the only path to the content, or leave a panel blank before it plays.
- **Don't** narrow the shell to create a reading measure; the left gutter is fixed for the whole page.

---

*Sidecar note: `.impeccable/design.json` was intentionally not written or modified by this pass. That sidecar describes the incumbent "Pasar Malam at Dusk" world at `/`, and this candidate world is out of its scope until one of the two is chosen.*
