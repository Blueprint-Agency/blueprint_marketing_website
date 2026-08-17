import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/ui/hero-dithering-card";
import BookingTour from "@/components/v2/BookingTour";
import { Nav, Footer } from "@/components/v2/Chrome";
import Compare from "@/components/v2/Compare";
import Pricing from "@/components/v2/Pricing";
import FeatureCarousel from "@/components/ui/feature-carousel";
import JourneyTimeline from "@/components/v2/JourneyTimeline";
import { BOOKING_FAQ, PAINS, SCREENS } from "@/lib/booking";
import { PLANS, ringgit } from "@/lib/pricing";
import { SITE, WA } from "@/lib/site";

/**
 * /services/booking-system — Reserve Today, the booking platform.
 *
 * WHAT CHANGED ON 2026-08-17
 * --------------------------
 * This page shipped on 2026-08-15 as an opening and a price list, with a
 * note at the top of this file saying what it still owed: proof before the
 * argument, the argument before the price, and an FAQ. In the note's own
 * words, "do not let the page ship with the price as the first thing a
 * reader meets. A price list is an answer, and it reads as an ambush when
 * it arrives before the reader has been given the question."
 *
 * That is now paid off, and the shape below is what pays it.
 *
 * THE SHAPE, AND WHY IT IS IN THIS ORDER
 * --------------------------------------
 *  1. THE OPENING. One claim, two actions. Unchanged in kind from the two
 *     sibling service pages so a reader arriving from the nav lands
 *     somewhere recognisably part of the same set.
 *  2. THE PROBLEM, named before anything is sold. Five specific failures a
 *     studio owner has lived through, each one naming its own mechanism.
 *     This is DESIGN.v2.md's Enemy-Named-In-The-Heading Rule, and it is
 *     the device Rezerv's own home page opens on.
 *  3. THE PRODUCT, SHOWN. Four screens, drawn, one at a time. This is the
 *     proof slot the two sibling pages fill with client screenshots, and
 *     it is the slot this page was missing entirely. See BookingArt.tsx
 *     for why these are drawings rather than captures.
 *  4. THE ARGUMENT. What it replaces, and why a studio's calendar being
 *     the business means this is not admin software.
 *  5. A MID-PAGE ACTION. The page is long enough to be entered mid-scroll,
 *     and the action must not require travelling back to the top. The
 *     Repeated Action Rule, DESIGN.v2.md.
 *  6. THE COMPARISON. How five platforms bill a second studio. It sits
 *     immediately before the price because it is the frame the price
 *     should be read in, and after the product because a comparison read
 *     before you know what the thing does is a table of nouns.
 *  7. THE PRICE.
 *  8. THE FAQ, which is where a reader who has just seen a figure goes
 *     looking for the catch. The two recorded absences are answered in it
 *     rather than hidden: no member mobile app, no website builder.
 *  9. THE CLOSE.
 *
 * THE TENSION THIS PAGE CARRIES
 * -----------------------------
 * Every other page on this site refuses to publish a figure, and the FAQ
 * on the home page says so in the user's own words. That rule is about
 * services quoted per business. This is a product with one price list for
 * everyone, and the distinction only holds while it stays visible, which
 * is what the eyebrow and the lead are doing. See the header of
 * lib/pricing.ts.
 *
 * EVERY FIGURE ON THIS PAGE IS A PROPOSAL EXCEPT GROUP, which the user
 * confirmed on 2026-08-16. lib/pricing.ts records where each number came
 * from. The competitor figures in section 6 are research read on one day
 * and are dated on the page itself; re-check them before launch.
 *
 * WHAT IS STILL ABSENT, DELIBERATELY
 * ----------------------------------
 * No testimonial, no studio count, no rating badge, no "trusted by" logo
 * wall, no uptime figure, no time-saved claim. Rezerv's page carries all
 * six and this one carries none, because PRODUCT.md records none of them
 * for this platform and lib/testimonials.ts sets out at length why an
 * invented quote is worse than an invented number. If real ones arrive,
 * the slot for them is between the product tour and the argument.
 */

export const metadata: Metadata = {
  title: "Booking system for studios & clinics",
  description:
    "Reserve Today — scheduling, credits, memberships, staff leave, payroll and a retail store, on your own address. Plans covering one, two or five studios, priced in ringgit, with no per-booking fee.",
  alternates: { canonical: "/services/booking-system" },
  openGraph: {
    title: "Booking system for studios & clinics · Blueprint",
    description:
      "Plans covering one, two or five studios, priced in ringgit. Scheduling, credits, leave, payroll and retail, on your own address.",
    url: "/services/booking-system",
    type: "article",
  },
};

/**
 * The three reassurances under the hero action.
 *
 * Every one is a fact stated elsewhere on this page and checkable against
 * it: the price list is published below, the no-meter promise is the
 * opening line of the pricing section, and the address is a row in the
 * matrix. A reassurance row that says anything the page does not go on to
 * demonstrate is the exact device this site refuses everywhere else.
 *
 * NOT "no credit card required", NOT "cancel anytime", NOT "set up in
 * minutes". The first two are about a self-serve trial that does not
 * exist, and the third is a timeline nothing on record supports.
 */
const ASSURANCES = [
  "One published price list",
  "No per-booking or per-member fee",
  "Runs on your own address",
];

export default function BookingSystemPage() {
  /* Read off PLANS rather than written down, so the sentence under the
     comparison cannot come to disagree with the card it is describing. */
  const solo = PLANS[0];

  return (
    <>
      <Nav />

      <main id="main">
        {/* ---------------- the opening ----------------
            Same dark ground and same shape as the two sibling service
            pages. */}
        <section className="svc-open">
          <div className="shell">
            <Link className="back-link" href="/#services">
              All services
            </Link>

            {/* No descenders in the italic phrase. The display
                line-heights are 0.98 and 1.04 and a true italic at this
                weight hangs its g / y / p below the box they leave. */}
            <p className="eyebrow svc-eyebrow">Booking systems</p>
            <h1 className="h1" style={{ maxWidth: "16ch" }}>
              Your calendar <em>is</em> the business.
            </h1>
            <p className="lead svc-lead">
              Reserve Today runs the classes, the credits, the memberships, the
              staff leave, the payroll and the shop, on your own address, at a
              price you can read before you talk to anybody.
            </p>
            <div className="cta-row svc-actions">
              <a
                className="btn btn-act"
                href={WA.booking}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a demo
              </a>
              <a className="btn btn-ghost-dark" href="#pricing">
                See the price
              </a>
            </div>

            <ul className="svc-assure">
              {ASSURANCES.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------------- the problem ----------------
            Named before anything is sold. Five rows on hairlines with a
            mono ordinal, which is the numbered-list device the home page's
            "Why Blueprint" band and the web design page's three jobs both
            use. Reused rather than reinvented, so the three pages read as
            one site. */}
        <section className="band band-sunk">
          <div className="shell">
            <div className="col">
              <p className="eyebrow">Before the software</p>
              <h2 className="h2" style={{ maxWidth: "19ch" }}>
                None of this is a <em>software</em> problem yet.
              </h2>
              <p className="prose" style={{ marginTop: 22 }}>
                It is five separate small failures, and every one of them is
                survivable on its own. What they have in common is that each
                needs a person to notice it, and the person is you.
              </p>
            </div>

            <ol className="pn">
              {PAINS.map((p, i) => (
                <li className="pn-item" key={p.title}>
                  <span className="pn-n mono" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="h3">{p.title}</h3>
                    <p className="prose" style={{ marginTop: 8 }}>
                      {p.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------------- who runs it ----------------
            Buyer self-identification, and the fix for a page that claimed
            "studios & clinics" in its title and then spoke only to studios
            for its whole length.

            THIS SECTION HAS BEEN BUILT THREE TIMES IN ONE DAY. First as
            three panels segmented by function ("you sell a timetable"),
            rejected because an owner identifies as running a pilates
            studio rather than as a seller of timetables, and because three
            panels of prose is not scannable. Then as a chip field of
            fifteen types. Now as the supplied carousel, at the user's
            explicit direction after being shown where it departs from
            DESIGN.v2.md. That is a decision on the record, not an
            oversight: see the head of components/ui/feature-carousel.tsx.

            IT IS THE ONLY THING ON THIS SITE BUILT FROM TAILWIND
            UTILITIES, and it brings its own palette, its own radii and its
            own motion with it. It is deliberately NOT wrapped in .col or
            given a .band's measure, because half-constraining a component
            that is already off-system reads worse than letting it be its
            own object. */}
        <section className="band" id="who">
          <div className="shell">
            <div className="col">
              <p className="eyebrow">Who runs it</p>
              {/* "local" carries the italic, and it is the word that earns
                  it: it is the half of the sentence a Singapore or US
                  platform cannot say back. It is also descender-free, which
                  every display line on this site has to be. "system" and
                  "your" both fail that test on their y. */}
              <h2 className="h2" style={{ maxWidth: "20ch" }}>
                One system for your <em>local</em> business.
              </h2>
              {/* EVERY FEATURE NAMED HERE IS TRUE ON ALL FOUR PLANS. That
                  is the constraint on this paragraph, and it is why leave,
                  payroll and private sessions are absent from it despite
                  being the more impressive things to list: all three start
                  at Studio, so putting them under a sentence that says
                  "one system underneath all of them" would be claiming a
                  Solo customer gets them. Check MATRIX in lib/pricing.ts
                  before adding to this list. */}
              <p className="prose" style={{ marginTop: 22 }}>
                Fifteen trades on this list, and one system underneath all of
                them. Classes and appointments on the same schedule. Credits,
                packages and unlimited memberships. A checkout that takes
                card, FPX, DuitNow and Touch &rsquo;n Go, QR check-in at the
                door, and the whole thing running on an address of your own.
              </p>
            </div>
          </div>

          {/* Outside the shell: the carousel carries its own max-width and
              its own padding, and nesting those inside a 1180px shell
              would give it two competing measures. */}
          <div style={{ marginTop: 40 }}>
            <FeatureCarousel />
          </div>
        </section>

        {/* ---------------- the product ----------------
            The proof slot. Four screens, drawn, one at a time.

            Paper, not the dark ground the web design page gives its
            screenshots: those are captures of lit screens and need dark to
            read as lit. These are drawings whose own frames carry a brand
            gradient, and a dark band behind them would put two saturated
            grounds against each other with a paper interface floating
            between. Paper is also what the home page puts ServiceTabs on,
            and this is the same component. */}
        <section className="band band-sunk" id="tour">
          <div className="shell">
            <div className="col">
              <p className="eyebrow">What you would be running</p>
              {/* Was "One system, and four screens of it." until the
                  section above was retitled "One system for your local
                  business". Two headings two sections apart both opening on
                  the same two words reads as a template rather than as an
                  argument, and the one above is the user's own wording, so
                  this is the one that moves. "screens" carries no
                  descender, per the display rule. */}
              <h2 className="h2" style={{ maxWidth: "20ch" }}>
                The whole of it, on four <em>screens</em>.
              </h2>
              <p className="prose" style={{ marginTop: 22 }}>
                The owner&rsquo;s week, what a member sees, the leave that
                closes a class, and the month end that is already worked out.
                They are one product and they only work because they are.
              </p>
            </div>

            <BookingTour screens={SCREENS} eyebrow="The four screens" />

            {/* Required, and not a disclaimer bolted on. DESIGN.v2.md: "Do
                label any illustrated content as an illustration in plain
                0.875rem type adjacent to it." */}
            <p className="small svt-note">
              These four screens are drawn here rather than captured from a
              live account. The names and figures in them are invented; no
              studio&rsquo;s members, balances or takings appear on this page.
            </p>
          </div>
        </section>

        {/* ---------------- what a member does ----------------
            Six steps, and the section that answers the question actually
            deciding the purchase. Everything above this is addressed to
            the owner and describes what she operates; none of it says
            whether her members will use the thing. An owner who has
            watched one booking system go unused by the people it was
            bought for is buying adoption, not features.

            Every step maps to a row in MATRIX. See the note over JOURNEY
            in lib/booking.ts, and check against the matrix before adding
            a seventh: this is the shape of section where a page invents
            the feature the story wants. */}
        <section className="band" id="journey">
          <div className="shell">
            <div className="col">
              <p className="eyebrow">The other side of it</p>
              <h2 className="h2" style={{ maxWidth: "22ch" }}>
                Your member never finds out what any of this is <em>called</em>.
              </h2>
              <p className="prose" style={{ marginTop: 22 }}>
                She sees six things, and this is all of them. The test of a
                booking system is not whether you can operate it. It is
                whether she gets to the end of this without messaging you.
              </p>
            </div>

            <JourneyTimeline />

            <p className="prose jn-close">
              Not one of those six needs anybody at the studio to be awake.
              That is the whole of what is being bought, and it is the reason
              every part of it sits on the cheapest plan rather than being
              held back for the expensive one.
            </p>
          </div>
        </section>

        {/* ---------------- the mid-page action ----------------
            The Repeated Action Rule. A page this long is entered
            mid-scroll, and the reader must not have to travel back to the
            top to act. Different sentence, same destination. */}
        <section className="midcta">
          <div className="shell">
            <div className="midcta-row">
              <div>
                <h2 className="h3">Want to see it against your own timetable?</h2>
                <p className="small" style={{ marginTop: 6, maxWidth: "56ch" }}>
                  A demo runs on your actual week rather than an empty account,
                  which is the only way to find out whether it holds your class
                  types, your packages and your teachers.
                </p>
              </div>
              <a
                className="btn btn-act"
                href={WA.booking}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a demo
              </a>
            </div>
          </div>
        </section>

        {/* ---------------- the comparison ----------------
            Immediately before the price, because it is the frame the price
            should be read in. See the note over COMPETITORS in
            lib/pricing.ts for what these figures are and are not. */}
        <section className="band">
          <div className="shell">
            <div className="col">
              <p className="eyebrow">How the category bills</p>
              <h2 className="h2" style={{ maxWidth: "21ch" }}>
                Most of them charge you again for the second <em>room</em>.
              </h2>
              <p className="prose" style={{ marginTop: 22 }}>
                We are not the cheapest way to book one studio, and the table
                says so. What is different is what happens on the day you open
                the second one: here a location is an allowance the plan
                already covers, and almost everywhere else it is a multiplier.
              </p>
            </div>

            <Compare />
          </div>
        </section>

        {/* ---------------- the price ----------------
            Now it arrives after the question rather than in place of it.
            Carries its own band-sunk ground and its own heading; see
            Pricing.tsx, and PlanMatrix.tsx for the comparison beneath the
            cards. */}
        <Pricing ctaHref={WA.booking} />

        {/* ---------------- the FAQ ----------------
            Where a reader who has just read a price goes looking for the
            catch, which is why it is here and not further up. Same native
            details/summary the home page uses: keyboard-operable, findable
            by in-page search, and it works with no JavaScript at all. */}
        <section className="band" id="booking-faq">
          <div className="shell">
            <div className="col">
              <h2 className="h2" style={{ maxWidth: "20ch" }}>
                The questions that come after the <em>price</em>.
              </h2>
              <p className="prose" style={{ marginTop: 22 }}>
                Including the two we would rather you heard from us: there is
                no member app in the stores, and this is not a website builder.
                Both are answered below.
              </p>

              <div className="faq">
                {BOOKING_FAQ.map((f) => (
                  <details className="faq-item" key={f.q}>
                    <summary>
                      <span>{f.q}</span>
                      <span className="faq-mark" aria-hidden="true" />
                    </summary>
                    <div className="faq-a">
                      {f.a.map((para) => (
                        <p className="prose" key={para}>
                          {para}
                        </p>
                      ))}
                      {/* The website answer is the one absence that is
                          honestly a different service we sell, so it links
                          to it rather than stopping at "no". */}
                      {f.q.startsWith("Does it build my website") && (
                        <p className="prose">
                          <Link href="/services/web-design">
                            See how we build the site itself
                          </Link>
                          .
                        </p>
                      )}
                    </div>
                  </details>
                ))}
              </div>

              <p className="small" style={{ marginTop: 26, maxWidth: "62ch" }}>
                Anything not answered here is a question for the demo. Plans
                start at RM {ringgit(solo.monthly ?? 0)} a month for{" "}
                {solo.locations.toLowerCase()}.
              </p>
            </div>
          </div>
        </section>

        <CTASection
          waHref={WA.booking}
          emailHref={`mailto:${SITE.email}`}
          phone={SITE.whatsappDisplay}
        />
      </main>

      <Footer />
    </>
  );
}
