# Blueprint — agency website

Marketing/portfolio site for **Blueprint**, a digital-marketing agency pivoting to AI systems
(webapp, booking, CRM, WhatsApp automation, mobile apps). Positioning: look like Solana/Avax,
convert like Hyros, own the word "Blueprint." Dark, engineered, upmarket.

## Files
- `index.html` — the full single-page site: loader (B tunnel-zoom) → hero → what we build
  (AI systems as spec-sheet modules, marketing as "the fuel") → Five Clinic case study →
  testimonials → The Blueprint Method → final CTA → footer. Scroll reveals + count-up stats.
  Hero here is the older "aurora" version — replace it with the Spline hero below.
- `hero-spline.html` — preferred hero: dark, embeds a Spline 3D scene full-bleed with nav + CTA
  overlay, a hidden SEO `<h1>`, and legibility vignettes. Stitch this hero onto `index.html`.
- `assets/` — put PNG posters / images / exported logos here.

## Preview
Open `index.html` or `hero-spline.html` in Chrome/Safari (a real browser — in-app previews
freeze CSS animations and cache stale copies). The Spline hero needs internet + WebGL.

## Design tokens
- Colors: ink `#080B14`, blueprint blue `#3B78FF`, cyan `#38DBF0`, signal amber `#FFB020` (CTAs only).
- Fonts (Google Fonts): Space Grotesk (display), Inter (body), JetBrains Mono (labels).

## Live assets / values
- Spline scene (iframe): `https://my.spline.design/distortingtypography-rt9Ssj2kQZdErcCbEdy1NODB/`
  - The big words are still Spline's placeholder text ("DISTORT YOUR MONITORS… & BEYOND").
    Edit the text inside Spline to the Blueprint headline and republish — the same URL updates.
  - For a cleaner embed, export the **Spline Viewer** `scene.splinecode` URL (lets you hide the
    "Built with Spline" badge and control the background) and use `<spline-viewer>` / `@splinetool/react-spline`.
- Real client / proof = **Five Clinic** (fiveclinic.com.my): Dr Calvin Choo (MOH LCP-certified),
  Bangsar + Puchong branches; treatments incl. Rejuran, HIFU, slimming, laser. Featured as the
  flagship case study with paraphrased real reviews.

## Placeholders to replace before launch
- Hero aggregate stats `$1,284,920` and `+38% avg lift` — swap for real agency numbers.
- Trusted-by logos ("your logo" chips) — swap for real client logos.
- Add a PNG poster of the Spline scene for mobile / reduced-motion fallback.

## Next steps (for Claude Code)
1. Swap the placeholder text inside the Spline scene, then stitch `hero-spline.html`'s hero
   onto `index.html`, removing the old aurora hero.
2. Convert to **Next.js + Tailwind + Framer Motion**; port each section to a component; move the
   loader, scroll reveals, and count-ups to Framer Motion / IntersectionObserver.
3. Use `@splinetool/react-spline` with the `scene.splinecode` URL for the hero.
4. Replace all placeholder stats/logos with real assets.

## Git
```bash
git init && git add . && git commit -m "Blueprint site starter"
# then create a repo on GitHub and: git remote add origin <url> && git push -u origin main
```
