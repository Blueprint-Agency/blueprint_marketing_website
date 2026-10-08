import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Calculator,
  CalendarDays,
  Check,
  FileSpreadsheet,
  Hourglass,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
import { CTASection } from "@/components/ui/hero-dithering-card";
import { Nav, Footer } from "@/components/v2/Chrome";
import Compare from "@/components/v2/Compare";
import Pricing from "@/components/v2/Pricing";
import FeatureCarousel from "@/components/ui/feature-carousel";
import ScrollHighlight from "@/components/v2/ScrollHighlight";
import TwoSystems from "@/components/v2/TwoSystems";
import BookingHero from "@/components/v2/BookingHero";
import { BOOKING_FAQ, PAINS } from "@/lib/booking";
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
 *  2. THE PROBLEM, named before anything is sold. One callout and six
 *     icon tiles, each a chore a studio owner does by hand today.
 *     This is DESIGN.v2.md's Enemy-Named-In-The-Heading Rule, and it is
 *     the device Rezerv's own home page opens on.
 *  3. THE PRODUCT, SHOWN. The two systems it is made of, the members'
 *     booking site and the admin system, drawn side by side. This is the
 *     proof slot the two sibling pages fill with client screenshots. See
 *     TwoSystems.tsx, and BookingArt.tsx for why these are drawings.
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
 * is what the lead is doing. See the header of
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
/**
 * One icon per entry in PAINS, keyed by its id, plus where its tile sits in
 * the scatter: a tilt (deg), a vertical offset (px, desktop only), a float
 * duration and delay (s) so no two tiles bob in step, and a tint.
 * Hand-placed rather than random so the server and client render the same
 * thing and the scatter never lands two tiles on top of each other.
 */
const PAIN_ART: Record<
  string,
  { icon: LucideIcon; tilt: number; dy: number; dur: number; delay: number; tint: string }
> = {
  timetable: { icon: CalendarDays, tilt: -4, dy: 10, dur: 6.2, delay: 0, tint: "brand" },
  packages: { icon: FileSpreadsheet, tilt: 3, dy: -18, dur: 7.1, delay: -2.4, tint: "act" },
  expiry: { icon: Hourglass, tilt: -2, dy: 22, dur: 5.6, delay: -1.1, tint: "warm" },
  leave: { icon: MessageCircle, tilt: 5, dy: -6, dur: 6.8, delay: -3.3, tint: "act" },
  payroll: { icon: Calculator, tilt: -5, dy: 16, dur: 7.4, delay: -0.6, tint: "violet" },
  second: { icon: Building2, tilt: 2, dy: -14, dur: 6.0, delay: -4.2, tint: "brand" },
};

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
            Light, with the product shown working on the right. Modelled
            on the WhatsApp automation page's hero (user, 2026-10-08): the
            systems pages are the other half of the site and are allowed
            to look it, where the marketing pages keep the black .svc-open.
            The drawing is components/v2/BookingHero.tsx. */}
        <section className="bkh-open">
          <div className="shell bkh-grid">
            <div>
              <Link className="back-link" href="/#services">
                All services
              </Link>
              {/* No descenders in the italic phrase. The display
                  line-heights are 0.98 and 1.04 and a true italic at this
                  weight hangs its g / y / p below the box they leave. */}
              <h1 className="h1" style={{ maxWidth: "16ch", marginTop: 34 }}>
                Your calendar <em>is</em> the business.
              </h1>
              <p className="lead" style={{ marginTop: 22, maxWidth: "44ch" }}>
                Reserve Today runs the classes, the credits, the memberships, the
                staff leave, the payroll and the shop, on your own address, at a
                price you can read before you talk to anybody.
              </p>
              <div className="cta-row bkh-actions">
                <a
                  className="btn btn-act"
                  href={WA.booking}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book a demo
                </a>
                <a className="btn btn-line" href="#pricing">
                  See the price
                </a>
              </div>

              <ul className="bkh-assure">
                {ASSURANCES.map((a) => (
                  <li key={a}>
                    <Check size={15} strokeWidth={3} aria-hidden="true" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <BookingHero />
          </div>
        </section>

        {/* ---------------- the problem ----------------
            Named before anything is sold, as one callout and a scatter of
            floating icon tiles: the work, visibly all over the place. Was five numbered rows of prose until 2026-10-08,
            simplified at the user's direction so the list reads at a
            glance. "manual" carries the italic and has no descender, per
            the display rule. */}
        <section className="band band-sunk pn-band">
          <div className="shell">
            <div className="col">
              <h2 className="h2">
                Tired of doing all{" "}
                <ScrollHighlight>
                  the <em>manual</em> work
                </ScrollHighlight>
                ?
              </h2>
              <p className="prose" style={{ marginTop: 22 }}>
                Every one of these needs a person to remember it, and the
                person is you.
              </p>
            </div>

            <ul className="pn">
              {PAINS.map((p) => {
                const art = PAIN_ART[p.id];
                const Icon = art.icon;
                return (
                  <li
                    className="pn-item"
                    key={p.id}
                    data-tint={art.tint}
                    style={
                      {
                        "--tilt": `${art.tilt}deg`,
                        "--dy": `${art.dy}px`,
                        "--dur": `${art.dur}s`,
                        "--delay": `${art.delay}s`,
                      } as React.CSSProperties
                    }
                  >
                    <div className="pn-card">
                      <span className="pn-icon" aria-hidden="true">
                        <Icon size={22} strokeWidth={1.75} />
                      </span>
                      <span className="pn-label">{p.label}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
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
            The proof slot. The two systems the product is made of, side
            by side: the booking site members use and the admin system the
            team runs on. Replaced the four-screen tour on 2026-10-08 at
            the user's direction. See components/v2/TwoSystems.tsx for
            where every feature named in it is on record. */}
        <section className="band band-sunk" id="tour">
          <div className="shell">
            <div className="col ts-head">
              {/* "and" carries the italic: it is the point of the section,
                  and it has no descender, per the display rule. */}
              <h2 className="h2">
                Built for your members <em>and</em> your team.
              </h2>
              <p className="prose" style={{ marginTop: 22 }}>
                Two systems on one platform. Your customers get a booking site
                of their own, and you get the admin system that runs everything
                behind it.
              </p>
            </div>

            <TwoSystems />

            {/* Required, and not a disclaimer bolted on. DESIGN.v2.md: "Do
                label any illustrated content as an illustration in plain
                0.875rem type adjacent to it." */}
            <p className="small svt-note">
              Both screens are drawn here rather than captured from a live
              account, and the names in them are invented. Leave, payroll and
              some admin tools depend on the plan; the price list below shows
              which.
            </p>
          </div>
        </section>

        {/* ---------------- the mid-page action ----------------
            The Repeated Action Rule. A page this long is entered
            mid-scroll, and the reader must not have to travel back to the
            top to act. Different sentence, same destination.

            Redesigned on 2026-10-08 as a contained brand card rather than
            the shared .midcta strip, which the home page still uses. The
            three checks are what the demo is run against, taken from the
            sentence this card always carried; nothing here promises a
            duration, a price or a response time, because none is on
            record. The week grid on the right is decoration, aria-hidden. */}
        <section className="bkcta-band">
          <div className="shell">
            <div className="bkcta">
              <div className="bkcta-copy">
                <h2 className="bkcta-h">
                  Want to see it against your own <em>timetable</em>?
                </h2>
                <p className="bkcta-p">
                  A demo runs on your actual week rather than an empty account,
                  so you can see it hold everything you already run.
                </p>
                <ul className="bkcta-checks">
                  {["Your class types", "Your packages", "Your teachers"].map(
                    (c) => (
                      <li key={c}>
                        <Check size={15} strokeWidth={3} aria-hidden="true" />
                        {c}
                      </li>
                    ),
                  )}
                </ul>
                <div className="bkcta-actions">
                  <a
                    className="btn btn-act"
                    href={WA.booking}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book a demo
                    <ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />
                  </a>
                  <a className="btn btn-ghost-dark" href="#pricing">
                    See the price
                  </a>
                </div>
              </div>

              <div className="bkcta-art" aria-hidden="true">
                <div className="bkcta-week">
                  {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d) => (
                    <span className="bkcta-day" key={d}>
                      {d}
                    </span>
                  ))}
                  {[
                    ["Vinyasa", "07:00", 1],
                    ["Reformer", "09:30", 0],
                    ["Vinyasa", "07:00", 0],
                    ["Reformer", "09:30", 2],
                    ["Flow", "07:00", 0],
                    ["Hatha", "18:30", 0],
                    ["Yin", "19:00", 2],
                    ["Private", "12:15", 1],
                    ["Barre", "18:30", 0],
                    ["Flow", "18:30", 1],
                  ].map(([n, t, k], i) => (
                    <span className={`bkcta-slot k${k}`} key={i}>
                      <b>{t}</b>
                      {n}
                    </span>
                  ))}
                </div>
              </div>
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
              <h2 className="h2" style={{ maxWidth: "21ch" }}>
                Most of them charge you again for the second <em>room</em>.
              </h2>
              <p className="prose" style={{ marginTop: 22 }}>
                We start lower than every platform in this table. What is
                different is what happens on the day you open
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
