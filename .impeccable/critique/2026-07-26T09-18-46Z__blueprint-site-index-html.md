---
target: blueprint-site/index.html
total_score: 11
max_score: 32
na_heuristics: 7,10
p0_count: 3
p1_count: 2
timestamp: 2026-07-26T09-18-46Z
slug: blueprint-site-index-html
---
Method: dual-agent (A: design review · B: detector + static evidence) — both run as isolated parallel sub-agents, neither seeing the other's output before synthesis.
Browser: unavailable — no browser automation tool exposed in this session. No live overlay was produced and none is claimed. Visual reasoning is from source; A's box-math inferences are labelled as such.
Surface mode: **Persuade**. Critiqued against `PRODUCT.md` (written immediately prior to this run).

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 1 | Loader bar animates to 100% over a fixed 1.5s regardless of real load; a pulsing green "live" dot labels the hardcoded constant `target = 1284920` (:482). Clicking any CTA produces no feedback at all. |
| 2 | Match System / Real World | 1 | `SYS-01`, `connects: pipeline`, `REV.OUT ↗`, `x:00 y:00`, `expansion focus`, `// the fuel that feeds it —`. Engineer register sold to a clinic owner-operator who is explicitly not a marketer. "Book a call" promises a scheduler that does not exist. |
| 3 | User Control and Freedom | 1 | `overflow:hidden` on documentElement at :517, released at 3000ms (:519). No skip, no dismiss, no keypress escape, no reduced-motion guard, no session check. |
| 4 | Consistency and Standards | 2 | Two labels for one action ("Book a call" :313 vs "Book a growth audit" :336/:464). Three semantically different things share one chip visual. Hover affordance on inert spans. Saved from 1 by a genuinely coherent token/radius/type system. |
| 5 | Error Prevention | 1 | Guaranteed dead end with no fallback: no phone, no WhatsApp, no address, and `askblueprintagency@gmail.com` appears nowhere in the file. |
| 6 | Recognition Rather Than Recall | 2 | Zero `id` attributes exist, so nav cannot resolve even once hrefs are fixed; "About" targets a section that does not exist. No active state across a ~5-screen scroll. |
| 7 | Flexibility and Efficiency | n/a | Persuade surface: one linear scroll path; expert accelerators neither expected nor appropriate. |
| 8 | Aesthetic and Minimalist Design | 2 | Below the fold is restrained and well-composed. The hero is not: 13 competing elements above the fold, and the decoration carries fabricated content. |
| 9 | Error Recovery | 1 | No error states of any kind. ~14 rules declare `"Space Grotesk"`/`"JetBrains Mono"` with no generic fallback (:38, :94, :101, :150, :173, :233, :269…) — slow fonts on Malaysian mobile yield Times headlines. |
| 10 | Help and Documentation | n/a | Persuade surface. Absence of pricing/scope/next-steps is scored under Emotional Journey. |
| **Total** | | **11 / 32** | **Poor (34%) — major overhaul required; the core experience is broken** |

Eight heuristics scored; 7 and 10 marked `n/a`; maximum renormalized 40 → 32.

## Design Specificity Verdict

**Category-interchangeable. This is a dark-mode SaaS template wearing a blueprint costume — and the costume is the only authored layer.**

**LLM assessment.** The brief is stated in the repo itself (`README.md:4-5`: *"look like Solana/Avax, convert like Hyros"*) — two reference classes, neither of which sells anything to a Malaysian clinic owner. The result reads accordingly: ink-navy canvas, three blurred aurora blobs, glassmorphic chips, a cyan count-up stat, an `auto-fit` feature grid, a four-step process row, a testimonial triptych, a gradient-bordered final CTA. Change six nouns and this is a crypto L1, a devtools startup, or a fintech.

There *is* a real idea inside it — the blueprint vernacular (corner ticks, `//` eyebrows, `SYS-0x` part numbers, `connects:` fields, the 56px drafting grid). It is executed with unusual discipline and it is genuinely ownable. But it is a skin over a generic skeleton, and it speaks engineer to a buyer PRODUCT.md defines as explicitly not one.

Two findings make the verdict concrete:

1. **The one bespoke element the author designed is not in the file.** `:115-128` carries a CSS block commented `/* the main character */` — `.engine` (560px square), `.ring-out` (46s orbit), `.hub` (64s counter-orbit), `.flow`/`.flow-out` (animated dash flow), `.core-glow`, `.draw` (1200-unit stroke reveal), `.io.in`/`.io.out` labels, plus a dedicated 720px breakpoint. **No matching markup exists anywhere in the body.** The diagram that would have visualised attention-in/revenue-out — the literal argument of the headline — is dead code. The generic aurora backdrop it was meant to sit inside shipped alone. *The specific thing was deleted; the interchangeable thing is live.* Both assessments found this independently.
2. **The confirmed headline offer is styled as a byproduct.** SEO, SEM, funnels, Meta ads, video, branding render as `.fchip` spans under `// the fuel that feeds it —`, with a hover state at :221 on elements that are not links and do nothing.

**Deterministic scan.** `detect.mjs` returned **22 findings, exit 2**, in `blueprint-site/index.html`:

| antipattern | count | severity | category |
|---|---|---|---|
| `overused-font` | 18 | warning | slop |
| `codex-grid-background` | 1 | advisory | slop |
| `em-dash-overuse` | 1 | warning | slop |
| `dark-glow` | 1 | warning | slop |
| `radial-halo` | 1 | warning | slop |

**All 22 are category `slop`. Zero `quality`. Zero `contrast`/accessibility.**

Where the detector and the review agree, disagree, and where each was wrong:

- **Agree — typography.** Inter + Space Grotesk + JetBrains Mono is the most common AI-UI trio. But the raw count is misleading: 18 hits are **one decision counted 18 times**, because the CSS never uses its own `.disp` class and re-declares the literal stack 16 times. Score it as 1 finding plus a DRY smell the detector isn't reporting.
- **Agree — decorative gradient stack.** `radial-halo` fired once on `.aurora .b1` (:78), but siblings `.b2` (:79) and `.b3` (:80) are the same construct, and they sit on top of a *separate* `.glow` radial (:58-64) and a `.vignette` radial (:65-67). **Four independent decorative gradient layers in one viewport.** The detector undercounted its own finding.
- **False positive — `codex-grid-background` (:49).** The rule's own text carves out "blueprint… surfaces." The product is named Blueprint, the copy is drafting vernacular, and the grid is radially masked at .35 opacity rather than tiled edge-to-edge. This is the exception the rule describes. **Dismissed.**
- **Dismissed on severity — `dark-glow` (:96).** An 18px blue halo on a **24×24px** brand mark, ~576px². Not the "glowing card/hero/button" failure mode. Real rule, wrong weight here.
- **Detector caught what the review missed — `em-dash-overuse`.** 19 em-dashes in short marketing copy, several consecutive (:453-456 has one per step card). A cadence tell that reads as machine-written on a page selling human strategic judgment. Legitimate, and the design review didn't flag it.
- **The review caught what the detector cannot.** The scan reported **zero contrast findings**, but `.tick` at `--faint` with `opacity:.7` over `--ink` computes to **~3.7:1 at 11px — below AA**. The opacity multiplier defeats the token, which is exactly the class of bug a static rule engine misses. More importantly, every P0 below is structural and invisible to the detector.

**The critical read on that scan:** 22 clean-category hits with zero quality or contrast violations would normally suggest a healthy page. It is the opposite here. The detector measures whether the surface looks generated; it cannot measure whether the page *works*, and this page does not. **A clean-ish detector run on a page with 12 dead links is the strongest possible argument for not treating the scan as the scorecard.**

**Visual overlays.** None. No browser automation is exposed in this session, so no live server was started and no injection was attempted. No user-visible overlay exists for this run.

## Overall Impression

Someone with real typographic and systems instinct built a convincing shell and never connected it to a business.

The craft signal is genuine: nine well-chosen custom properties, amber disciplined to CTAs only, `clamp()` on every display size, per-context `ch` measure caps, a global `:focus-visible` ring most hand-written marketing pages skip, and a correct `html:not(.js)` progressive-enhancement fallback. That is not a beginner's file.

And it converts nobody. **Twelve links, twelve `href="#"`.** Combined with `html{scroll-behavior:smooth}` (:18), the amber "Book a growth audit" doesn't fail loudly — it *smooth-scrolls the visitor to the top of the page*, so the site reads as working and the company reads as dysfunctional. There is no phone number, no WhatsApp link, no address, no form, and the email on record appears nowhere in the file. A buyer with money out cannot reach Blueprint by any route on this page.

**The single biggest opportunity:** PRODUCT.md hands you an uncopyable page and the file ignores it. Six real named clients with six live URLs across MY/SG, a named MOH-certified doctor, two physical branches, and a conversion channel — WhatsApp — that is both the buyer's habitat *and* a live demonstration of the automation being sold. A page built from those facts cannot be forked by a KL competitor in an afternoon. This one can.

## What's Working

1. **The blueprint vernacular is a real, ownable idea, executed with discipline.** The corner ticks, `//` eyebrows, `SYS-0x` numbering, `connects:` fields, and masked 56px grid form one consistent fiction where name, metaphor, and type system agree. `.step` using `border-top:2px solid var(--blue)` with `border-radius:0 0 12px 12px` reads as a drafting-sheet tab rather than a rounded card — a small, sharp, deliberate detail. This is why the page is a costume and not a naked template. Keep the idea; change who it's spoken to.
2. **The token and type system is professional.** Amber genuinely reserved for CTAs (the README states the rule and the code keeps it). `max-width` set as `62ch`/`72ch`/`24ch`/`52ch` per context rather than one blanket value. `--faint` on `--panel` computes ~5.7:1, above AA. Global `:focus-visible` at :107 with nothing anywhere setting `outline:none`. This foundation survives a redesign — don't throw it out.
3. **Progressive enhancement and no-JS handling beat the category norm.** `documentElement.className='js'` fires in `<head>` before render, paired with the `html:not(.js)` reveal fallback at :226, so scroll-reveal content is visible with JavaScript off. The reduced-motion branch snaps counters to final values instead of leaving them at zero. The intent is right — two specific leaks are logged in P1-2.

## Priority Issues

### [P0] Every conversion path is `href="#"`, and no alternative contact method exists in the file

**What.** 12 dead links: nav ×5 (:309-313), hero CTAs ×2 (:336-337), final CTA (:464), footer ×4 (:474). No `mailto:`, no `tel:`, no form, no booking endpoint. Grep for `<button|<input|<form|role=|aria-` returns nothing. Compounding it: because the page has **no meta description, no Open Graph tags, no Twitter card, and no favicon**, sharing it into WhatsApp — the confirmed conversion channel — previews as a naked URL.

**Why it matters.** This is a Persuade surface with exactly one job. It fails silently rather than visibly, so the visitor blames the company. Every other issue here is downstream. And an agency selling SEO shipped a page with zero SEO or social metadata into the one channel its whole funnel depends on.

**Fix.** (a) Ship `askblueprintagency@gmail.com` as a live `mailto:` today — the page cannot ship with zero reachable contact points. (b) Once the number lands, make every primary CTA a `wa.me` link with a prefilled message (`?text=Hi Blueprint, I run a <business> in <city> and want to talk about…`) — prefilling kills blank-message paralysis and demonstrates the automation being sold. (c) Change the verb to "WhatsApp us"; "Book" promises a calendar that does not exist. (d) Add a persistent WhatsApp affordance in the mobile thumb zone. (e) Add `id` attributes and wire the nav; delete "About," which targets nothing. (f) "See the work" has six real destinations available right now. (g) Add meta description, OG tags, and a favicon.

**Suggested command:** `/impeccable harden`

### [P0] No mobile nav exists; the header CTA is clipped off-screen on every phone

**What.** The file contains four layout media queries — 720px (targeting the deleted `.engine` markup), 860px and 560px (both `.frag`/`.ticker` only). **None touches `nav`, `.links`, hero padding, section padding, the type scale, or `footer`.** `.links` is a nowrap flex row of four links plus a button at `gap:26px`; minimum content plus padding is roughly **557px inside a 375px viewport**. `.stage{overflow:hidden}` (:48) and `body{overflow-x:hidden}` (:22) then clip it silently.

**Why it matters.** Malaysian SME owner-operators arriving from Meta or Google are overwhelmingly on phones. The persistent header CTA — the one meant to catch a buyer who decides at any scroll depth — does not exist for them, and it disappears with no console error and nothing visibly broken.

**Fix.** Add a real breakpoint below ~760px. Given all four nav links currently point at nothing and the page is a single scroll, the honest answer is **brand + one WhatsApp button** — which also removes a 5-option decision point. Then drop `overflow:hidden` as a horizontal-overflow band-aid so future overflow fails loudly in testing instead of silently in production.

**Suggested command:** `/impeccable adapt`

### [P0] Fabricated proof occupies the four most credibility-critical positions

**What.** (a) `target = 1284920` (:482) rendered as `$1,284,920` under a **pulsing green "live" dot** labelled "generated for clients" — a hardcoded constant costumed as real-time telemetry. (b) `+38% avg. client revenue lift` (:493), animated to imply measurement. (c) Four literal `your logo` chips (:345-348) inside `TRUSTED BY`. (d) `New lead · Acme Co` and `Revenue +$12,480` in the hero.

**Why it matters.** This buyer, per PRODUCT.md, "buys on trust and proof." A fake live counter is not a neutral placeholder — it is an active lie with a green status light on it. And `$1.28M` sitting beside `your logo · your logo · your logo · your logo` reads as caught mid-fabrication: the numbers were invented but the logos couldn't be. It also violates the agency's own Principle 5 — *the site is a work sample.* No agency would ship `your logo` to Five Clinic.

**Fix.** Delete `.ticker` and `.stat` and the count-up JS at :481-494 — PRODUCT.md says **remove, not replace**. Set the six confirmed client names as a wordmark row; six real names beat four empty chips and one real one, and need zero asset sourcing. Replace `Acme Co` with a real client. If the hero needs a number, `40+ treatment pages built to rank` is the one figure on this page that is true, specific, and verifiable in one tap. **Also fix `README.md:35`**, which still instructs "swap for real agency numbers" — leave it and the placeholders come back.

**Suggested command:** `/impeccable clarify`

### [P1] The information architecture inverts the confirmed positioning

**What.** AI occupies the eyebrow (`// ai growth systems`), the sub, all six primary cards as `SYS-01…06`, the section thesis ("AI systems are our sharpest edge"), and the footer. The six services PRODUCT.md identifies as where the revenue and proof actually are get one row of dead spans labelled "the fuel."

**Why it matters.** This is the conflict PRODUCT.md logs on record, and it fails on both ends. It oversells AI ahead of the evidence — six AI/build capabilities get full card treatment while the case study proves *marketing* outcomes. And it undersells what the buyer searched for: someone looking for "marketing agency KL" lands on six software products. The page's own case study argues against its IA — `.cs-built` lists SEO landing pages, a consult funnel, WhatsApp automation, booking, and Google SEM. **Marketing came first in the actual work and last on the page.**

**Fix.** Invert the grid: lead with the six marketing services as the primary card set in language an owner-operator recognises. Demote the build capability to the differentiator slot right after — *"unlike a media agency, we build the systems that catch what the marketing brings in."* That keeps the edge without outrunning the proof. Kill `expansion focus` (:214) — internal roadmap language has no place on a customer page. Drop `SYS-0x` numbering from the marketing cards.

**Suggested command:** `/impeccable shape`

### [P1] The loader locks scroll for 3s, overrides reduced-motion, and swallows the page's own animations

**What.** :517 sets `overflow:hidden` unconditionally at parse time; :519 releases at **3000ms**. The IIFE has **no reduced-motion check** — a user requesting less motion still gets the full lock and the five-gradient strobe. Worse, the `@media(prefers-reduced-motion:reduce)` block sets `*{animation:none!important}` and then **explicitly re-enables `loaderFade` and `bzoom` with `!important` (:279-280)** — so the `scale(1) → scale(30)` full-viewport tunnel zoom, the most motion-aggressive effect on the page, is the one deliberately exempted for the users who asked for less. No skip, no dismiss, no `sessionStorage`. And both count-ups (≈2.0s and ≈1.3s) start at parse and **finish behind the curtain** — the showpiece animation performs to a closed door.

**Why it matters.** Three seconds of enforced blank-and-wait on first paint, on a mid-range Android over Malaysian mobile data, behind three render-blocking font families and three `blur(64px)` composited layers, is a bounce tax paid before a single word is read. The reduced-motion leak is not an oversight — the CSS proves the author knew about the preference and overrode it for the two loudest effects.

**Fix.** Cut the lock to ~800ms tied to a real signal (`window.load` or font-ready), not a magic timeout. Add an `rm` early-return at the top of the IIFE. **Remove the `!important` re-enables at :279-280.** Add `sessionStorage` so returning prospects skip it. Add generic fallbacks (`,sans-serif` / `,monospace`) to the ~14 rules missing them.

**Suggested command:** `/impeccable optimize`

## Cognitive Load

**4 of 8 checklist items fail → high cognitive load (critical).**

Failing: **single focus** (13 discrete elements compete above the fold, four on independent `float` loops); **chunking** (nav 5, `.mods` 6, `.fuel` 6 — all exceed the ≤4 working-memory limit); **visual hierarchy in the hero** (the cyan ticker and the amber H1 accent are the two loudest chromatic events and they fight; `--cyan` is simultaneously eyebrow, ticker, metric, and focus-ring color); **minimal choices**.

Passing: grouping, one-thing-at-a-time, working memory, progressive disclosure (scroll is the disclosure mechanism and it's used correctly).

Compounding: `.mods` uses `repeat(auto-fit,minmax(238px,1fr))` against a 1172px content width → **4 columns for 6 items**, an orphan row on every desktop. The grid engine composed that, not a designer.

## Emotional Journey

**Shape: a 3-second forced wait → one real peak → four consecutive credibility valleys → an ending that does nothing.**

**Peak (~3-5s).** "Your revenue, / **engineered.**" at `clamp(38px,6.4vw,74px)`, amber on ink, over a drafting grid. This is the one moment the page earns — confident, legible, ownable.

**Valley 1 — immediately after the peak.** `TRUSTED BY · Five Clinic® · your logo · your logo · your logo · your logo`. The first thing after the headline is a public admission of one client and four empty slots — when six are nameable today.

**Valley 2.** The SYS grid says where the agency is taking *itself* ("the core of where we're taking clients next"). The owner-operator's actual question — *will you take this off my plate?* — is never asked or answered.

**Valley 3.** "Real reviews. Real results." Three five-star quotes, every one about a doctor's needle technique. Zero words about Blueprint. The `// what their patients say` eyebrow is honest — credit for that — but the section occupies the agency's social-proof slot under the agency's results claim and delivers evidence about a third party.

**Valley 4 — the high-stakes moment, with no reassurance whatsoever.** At the decision point the page provides no price, no range, no engagement model, no timeline, no team, no founder, no photograph, no registration, no address, no email, no phone, no response-time promise, no "what happens next" — and, because the file contains **zero images**, not one visual example of the agency's actual work. A marketing and design agency asks an owner-operator to hand over their revenue on the strength of nothing shown.

**End — the worst possible one under peak-end.** "Ready to engineer your revenue?" → amber button → `href="#"` → silent smooth-scroll back to the hero. The final experienced state is *a non-response to a stated intent to buy*, dressed as a navigation glitch. That is what they remember.

## Persona Red Flags

**Jordan (Confused First-Timer)** — 3 seconds of black screen; first readable word is `// ai growth systems`, which reads as a code comment. Cannot answer "what do they sell?" in five seconds — the H1 is a slogan, the sub leads with AI, the first six offerings are software categories, and nothing says "we do your marketing." Burns attention deciding whether `SYS-01` / `connects: revenue` / `REV.OUT ↗` are meaningful. Reads "Real reviews" and learns how much a Rejuran injection hurt. Finds no price, no team, no next step. Taps the CTA, is silently returned to the top, concludes *he* did something wrong, looks for a phone number or email to try instead — **there is none anywhere on the page** — and leaves.

**Casey (Distracted Mobile User)** — the dominant traffic profile here. 3-second scroll lock on 4G behind three render-blocking font families; thumb-flicks do nothing; app-switches. The header CTA is **clipped off-screen** (P0-2). At ≤560px, `.frag.f1`/`.f3` remain absolutely positioned at `z-index:6`; on 375×667, `.frag.f3` (`bottom:22%`) lands in the same band as the `.cta` row and **likely overlaps and intercepts taps on the primary button** *(reasoned from box math, not observed — no browser this session)*. No sticky WhatsApp affordance; both CTAs sit at the extreme top and bottom of a five-screen scroll, the two hardest one-handed reaches. Three `blur(64px)` blobs at 62vw with permanent `will-change:transform` on infinite loops — the phone heats, scroll judders. She shares it to her business partner on WhatsApp and it previews as a bare URL.

**Riley (Deliberate Stress Tester)** — clicks all 12 links, all dead. Views source, finds the hardcoded `1284920` under a "live" dot, `+38%` as a loop terminal, four literal `your logo` strings, and `Acme Co`. Finds ~40 lines of CSS plus a dedicated 720px breakpoint targeting **markup that does not exist**, and a duplicate dead position block at :84-89 fully overridden by :136-152. Notices `.frag` declares `animation:pop .6s ease both, float 7s ease-in-out infinite` — both animate `transform`, `float` is declared last and runs from 0s, so **it overrides `pop`'s transform for the entire entrance**; the staggered pop-in never renders as designed. Resizes and finds that between ~861px and ~1340px — **every 13" laptop, 1280×800, 1366×768** — `.frag` negative offsets push the chips past the viewport edge where `overflow:hidden` clips them mid-word. Tabs during the loader and lands on nav links behind an opaque `z-index:1000` overlay with no `aria-hidden`, no focus trap, invisible focus.

**Dr Aina — Clinic Owner-Operator** *(project-specific, derived from PRODUCT.md)* — runs a two-branch aesthetic practice in KL, signs the cheques, will personally be in the WhatsApp thread, judging one thing: *will this be off my plate or added to it?* **Cannot tell whether Blueprint does her marketing** — she came for Google and Meta ads and is being sold `SYS-06 Custom software`. **Reads the SYS grid as a menu she must configure**; six numbered modules with `connects:` fields is a system diagram, and she wanted to hand over a problem, not operate a control panel. **The six things she actually wants are the six things that pretend to be interactive and aren't.** **The case study is her own industry and still doesn't close her**: metrics are `2` (branches they already had), `40+` (an output, not a result), and `5.0★` labelled as the *client's* reputation — **it never states whether bookings or revenue went up.** She reads the one section built to convince her and cannot answer "did it work?" **Zero visual proof** — she's evaluating a design agency with not a single image in the file, and five of her six future peers have live sites Blueprint built, none shown. No registration, address, founder, face, phone, or privacy policy (which Meta and Google increasingly require on ad landing pages). And "Book a call" is the wrong verb — she would message, not book a slot with a stranger.

## Minor Observations

- **`.mods` resolves 4+2 on every desktop.** `repeat(3,1fr)` above 900px would be a decision instead of an accident.
- **The metaphor is drilled past meaning:** engineered / engine / engineering / GROWTH-ENGINE / revenue engine ×2 / "snap onto the engine" / "Ready to engineer your revenue?" — eight instances. It stops carrying information around the third.
- **Three labels, one action:** nav "Book a call," hero/final "Book a growth audit," footer "Contact."
- **`hero-spline.html` is worse, not better.** It carries the same eight dead links, drops JetBrains Mono (inconsistent token set), still renders Spline's placeholder copy *"DISTORT YOUR MONITORS… & BEYOND"* per `README.md:26`, and requires WebGL plus a live third-party iframe on exactly the devices least able to afford either. **Do not stitch it in its current state** — the README's step 1 is currently bad advice.
- **`.mod.feat::after` injects "expansion focus" via CSS `content:`** — invisible to assistive tech and to text search. It also shouldn't exist at all.
- **No `<main>`, no landmark structure, no `aria-hidden` on ~10 decorative SVGs.** Heading order is otherwise clean apart from `.method` jumping h2 → h4 (:451 → :453-456), purely for an 18px vs 19px size difference.
- **`.tick.bl`/`.tick.br` sit at `bottom:22px` of `.stage`**, which ends after the wrapping `.proof` bar — on narrow viewports they will overlay the stat.
- **One "important number" color.** `--cyan` carries the ticker, the lift stat, and the case-study metrics — two fabrications and one real figure, levelling their credibility downward.
- Loader `overflow:hidden` is set on `documentElement` only; iOS Safari frequently ignores this, so the lock may be inconsistent across the exact device population it most affects.
- **Zero external dependencies besides Google Fonts** — no analytics, no trackers, no CDN scripts. Clean, and also a GDPR/PDPA consideration for a client-facing agency.

## Questions to Consider

1. **The `.engine` diagram is fully styled and entirely absent from the HTML.** Why was the one element that would have *shown* attention-in/revenue-out deleted, while the generic aurora backdrop it was designed to sit inside was kept?
2. **What would this page look like if it were built from the six client names and nothing else?** Six real MY/SG businesses, six live URLs, six one-line stories. No aurora, no SYS numbering, no count-up. Would it convert better? Almost certainly. Could a KL competitor fork it? No — which is the entire point of the positioning.
3. **The README says "look like Solana/Avax." Do Malaysian clinic owners buy from crypto L1 websites?** The reference class was chosen for what impresses other agencies. Who was this page actually made to impress?
4. **The page argues WhatsApp automation is a core capability and then offers no way to WhatsApp anyone.** The strongest possible demo is a prefilled `wa.me` link that returns an instant, obviously-automated-but-genuinely-helpful reply. The proof and the CTA are the same object. Why isn't it built?
5. **What is the honest version of the proof section on launch day?** "One clinic. Forty treatment pages ranking. Two branches. Here's the site — go look." Smaller than `$1,284,920` and infinitely more persuasive, because it can be verified in one tap. What is the fake number actually protecting?
6. **Three seconds of loader, and both count-ups finish behind it.** If the showpiece animation is invisible, what is the loader for — and who is it for?
