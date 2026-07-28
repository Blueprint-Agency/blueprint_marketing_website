# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary buyer: **Malaysian SME owner-operators** — clinics, service businesses, and local/regional
consumer brands across Malaysia and SEA.

They run the business themselves. They are not marketers and do not have a marketing department.
They buy on trust and proof, and they want the whole problem taken off their plate rather than a
set of levers to operate. The person evaluating the site is the same person who signs and the same
person who will be in the WhatsApp thread afterwards.

## Product Purpose

Blueprint is a digital marketing agency that also builds the software and AI systems its clients
run on. It exists to increase client revenue — winning attention, converting it, and keeping the
follow-up from leaking.

Success is measured per client, in that client's own numbers.

## Positioning

**Marketing leads; the build capability is the edge.**

Marketing is where the revenue and the demonstrable proof are today. The differentiator a
neighbouring KL marketing agency cannot truthfully copy is that Blueprint also *builds and runs the
systems* — booking, CRM, WhatsApp automation, apps, custom software — rather than only buying media
and handing off.

Explicit constraint on this position: the AI/systems capability is real and growing, but it must not
be sold ahead of what Blueprint can currently point to. Overselling AI outruns the evidence.

> Conflict on record (2026-07-26): the existing `blueprint-site/index.html` inverts this. It leads
> with AI systems as SYS-01…SYS-06 and demotes SEO, SEM, funnels, Meta ads, video, and branding to a
> chip row labelled "the fuel that feeds it." Future work on that page must correct the emphasis to
> match the position above.

## Operating Context

- **Conversion happens on WhatsApp.** Prospects message rather than book or fill in a form. Every
  CTA must terminate in a real WhatsApp conversation, not a scheduler and not a contact form. This
  also demonstrates the WhatsApp automation Blueprint sells.
- **WhatsApp destination (confirmed 2026-07-26): `+60 12-628 6586`.**
  Link form: `https://wa.me/60126286586` — digits only, no `+`, no spaces.
  Primary CTAs should carry a prefilled `?text=` so the visitor never faces a blank message box.
- No scheduling link is in use. `askblueprintagency@gmail.com` exists but is not the intended
  primary conversion path; it is acceptable only as a secondary contact in the footer.
- Clients operate in Malaysia/SEA; several have multiple physical branches.

## Capabilities and Constraints

**Build capabilities** *(recorded from existing site copy; not individually confirmed in interview)*
AI agents and workflows · web and mobile apps · booking systems · CRM and pipelines ·
WhatsApp automation · custom software and internal tools.

**Marketing services** *(same source and caveat)*
Google SEO · Google SEM · funnel building · Meta ads · video production · branding.

**Delivery method** *(from existing site copy; not confirmed in interview)*
Audit → Architect → Build → Scale.

**Technical state**
- Static hand-written HTML with inline CSS/JS. No build step, no framework, no package manifest.
- Source lives one level down at `blueprint-site/` (`index.html`, `hero-spline.html`, empty `assets/`).
- Not a git repository.
- `hero-spline.html` embeds a third-party Spline scene by URL and requires network + WebGL.

**Open decisions — do not invent**
- Whether the site converts to Next.js (the README proposes it) is unresolved.
- No stated outcome metric exists for the Five Clinic engagement (whether bookings, enquiries, or
  rankings measurably improved). The case study currently reports outputs only. Do not infer a
  result that was not supplied.

## Brand Commitments

- Name: **Blueprint** (legal/footer form: Blueprint Agency).
- Contact on record: `askblueprintagency@gmail.com`.
- A "B" monogram mark is in use across the existing site and loader.
- Taglines present in code — "Your revenue, engineered." and "Grow beyond." — originate from the
  existing files and were **not** confirmed as binding in interview.
- **Standing design preference (user-confirmed, 2026-07-26): plain over metaphorical.** Offered two
  fully-worked metaphor worlds (a POS till roll, then Malaysian expressway signage) as alternatives
  to the incumbent Pasar Malam world, the user re-rolled both and steered: *"I want it to be simple
  and direct, no need specific theme with analogies."* Treat a governing metaphor as a thing to
  justify, not a default. The stated craft bar is **Stripe / Linear** — precise typography, generous
  space, restrained colour, real interface as the imagery. Directness is a constraint on *concept*,
  not on ambition or finish.
- **Proof imagery is the clients' own live sites (user-confirmed, 2026-07-26).** Screenshots of the
  six real client sites carry the visual weight in place of a metaphor. This is verifiable evidence,
  not decoration, and it is the reason no invented imagery is needed.

## Evidence on Hand

**Nameable clients (user-confirmed, 2026-07-26):**

| Client | Domain |
|---|---|
| Five Clinic | fiveclinic.com.my |
| Vatti Malaysia | vattimalaysia.com |
| Kaiteki | kaiteki.my, blog.kaiteki.my |
| AQ Energy | aq.energy |
| Teeko | teeko.ai |
| Yoga Sadhana | yogasadhana.sg |

**Five Clinic detail** — aesthetic clinic led by Dr Calvin Choo (MOH LCP-certified); Bangsar and
Puchong branches; treatments include Rejuran, HIFU, slimming, laser. Currently the flagship case
study.

**Absences future work must not fabricate:**

- **No agency-wide aggregate figure exists.** Results are provable per client only. The hero
  `$1,284,920` counter and `+38% avg. client revenue lift` are placeholders and must be **removed**,
  not swapped for another number.
- **No logo files exist.** `assets/` is empty; the four "your logo" chips have nothing behind them
  yet. Named clients are confirmed, but their marks still need sourcing.
- **No testimonials about Blueprint are on record.** The three quotes currently under "Real reviews.
  Real results." are paraphrased *patient* reviews of Five Clinic — evidence about the client, not
  about the agency. They must not be presented as endorsements of Blueprint.
- Per-client outcome metrics beyond Five Clinic's structural facts (2 branches, 40+ treatment pages)
  have not been supplied.

## Product Principles

1. **Proof precedes claim.** Per-client results only. No aggregate revenue or lift figure appears
   anywhere until a defensible one exists.
2. **Lead with marketing, close with the build.** The systems capability is the differentiator, but
   it is introduced as what makes the marketing compound — never as the headline offer that outruns
   the evidence.
3. **Write to an owner, not a marketer.** The reader runs the whole business and is judging whether
   this is off their plate. Jargon that assumes a marketing department loses them.
4. **Every CTA ends in a WhatsApp conversation.** The conversion path is the channel the buyer
   already lives in, and using it is itself a demonstration of the product.
5. **The agency's own site is a work sample.** Anything Blueprint would not ship for a paying client
   — fabricated numbers, placeholder logos, borrowed proof — cannot ship here either.
