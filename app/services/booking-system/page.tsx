import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/ui/hero-dithering-card";
import { Nav, Footer } from "@/components/v2/Chrome";
import Pricing from "@/components/v2/Pricing";
import { SITE, WA } from "@/lib/site";

/**
 * /services/booking-system — Reserve Today, the booking platform.
 *
 * WHAT IS HERE AND WHAT IS NOT (2026-08-15)
 * -----------------------------------------
 * This page currently carries the opening and the price list, and that is
 * all. It was built pricing-first because the price list was what was
 * asked for and because the section had to live somewhere real to be
 * looked at. It is a page in progress, not a finished one.
 *
 * What a finished version still needs, in the order the other service
 * pages put it:
 *
 *  - PROOF, before the argument and before the price. Both sibling pages
 *    open with the work itself — /services/web-design shows two rebuilds
 *    top to bottom, /services/video-production shows the films. This page
 *    has nothing in that slot yet. Screens of the scheduler, the member's
 *    booking flow and the leave calendar are the obvious candidates, and
 *    Yoga Sadhana is the one studio actually running it.
 *  - THE ARGUMENT — why a studio's calendar being the business means the
 *    booking system is not admin software.
 *  - AN FAQ, which is where the tension noted below gets answered for a
 *    reader who goes looking.
 *
 * Do not let the page ship with the price as the first thing a reader
 * meets. A price list is an answer, and it reads as an ambush when it
 * arrives before the reader has been given the question.
 *
 * THE TENSION THIS PAGE CARRIES
 * -----------------------------
 * Every other page on this site refuses to publish a figure, and the FAQ
 * says so in the user's own words. That rule is about services quoted per
 * business. This is a product with one price list for everyone, and the
 * distinction only holds while it stays visible — which is what the
 * eyebrow and the lead below are doing. See the header of lib/pricing.ts.
 *
 * EVERY FIGURE ON THIS PAGE IS A PROPOSAL. lib/pricing.ts records where
 * the numbers came from and that they are awaiting confirmation.
 */

export const metadata: Metadata = {
  title: "Booking system for studios & clinics",
  description:
    "Reserve Today — scheduling, credits, memberships, staff leave, payroll and a retail store, on your own address. Plans covering one, two or five studios, priced in ringgit.",
  alternates: { canonical: "/services/booking-system" },
  openGraph: {
    title: "Booking system for studios & clinics · Blueprint",
    description:
      "Plans covering one, two or five studios, priced in ringgit. Scheduling, credits, leave, payroll and retail, on your own address.",
    url: "/services/booking-system",
    type: "article",
  },
};

export default function BookingSystemPage() {
  return (
    <>
      <Nav />

      <main id="main">
        {/* ---------------- the opening ----------------
            Same dark ground and same shape as the two sibling service
            pages, so a reader arriving from the nav menu lands somewhere
            that is recognisably part of the same set. */}
        <section className="svc-open">
          <div className="shell">
            <Link className="back-link" href="/#services">
              All services
            </Link>

            {/* No descenders in the italic phrase — the display
                line-heights are 0.98 and 1.04 and a true italic at this
                weight hangs its g / y / p below the box they leave. */}
            <p className="eyebrow svc-eyebrow">Booking systems</p>
            <h1 className="h1" style={{ maxWidth: "16ch" }}>
              Your calendar <em>is</em> the business.
            </h1>
            <p className="lead svc-lead">
              Reserve Today runs the classes, the credits, the memberships, the
              staff leave, the payroll and the shop — on your own address, at a
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
          </div>
        </section>

        {/* ---------------- the price ----------------
            See the note at the top of this file: proof and argument still
            have to land above this. */}
        <Pricing ctaHref={WA.booking} />

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
