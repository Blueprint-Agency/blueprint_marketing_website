import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/ui/hero-dithering-card";
import { Nav, Footer } from "@/components/v2/Chrome";
import FilmScreen from "@/components/v2/FilmScreen";
import { FILMS, VERTICAL_FILMS } from "@/lib/films";
import { SITE, WA } from "@/lib/site";

/**
 * /services/video-production — the first service to get a page of its own.
 *
 * THE READ
 * --------
 * This is Plain, not a new world. Every token, every class and every rule
 * below already existed on the home page; what is new is one device, and it
 * is the only one the subject actually needs: the films themselves, lit on a
 * black ground, directly under the sentence that says what they are.
 *
 * COLOUR
 * ------
 * The page keeps the site's rule that the ends are dark and the middle is
 * paper. The opening band is --hero-ground, the same black the sticky nav is
 * painted, so the bar and the band are one surface and there is no seam
 * across the top of the first viewport. The close is the navy dither card the
 * home page closes on. Between them the page is paper, and there is no second
 * dark event: the ink chapter that interrupts the home page would be a third
 * inversion here, and three is a stripe pattern rather than a composition.
 *
 * WHAT IS DELIBERATELY ABSENT
 * ---------------------------
 * No duration, no crew, no turnaround, no package tiers, no price, no view
 * count, no "trusted by N brands". None of those are recorded anywhere, and a
 * video page is exactly where the temptation to invent them is strongest. The
 * six films and the five client names are the whole of the proof, which is the
 * same standard lib/clients.ts holds the case studies to.
 *
 * THE REWRITE OF 2026-08-10
 * -------------------------
 * The page shipped in the morning with two films and was written around them:
 * "Two of them are below", and a "Two kinds of film" section whose two kinds
 * were the company profile and the tour. The user then supplied four more — a
 * customer testimonial for Garden Gem, and three verticals for Yoga Sadhana,
 * Kaiteki Clinic and Oriental Postnatal Centre — and every counted noun on
 * the page went stale at once.
 *
 * The rewrite is not a find-and-replace of "two" with "six". The new films
 * changed what the page can honestly claim, so the claim moved:
 *
 * - The range is now the argument. Two films of one company each was a sample;
 *   six films across five businesses is a body of work, and the lead sentence
 *   counts both numbers off lib/films.ts rather than reaching for "a range of".
 *
 * - The verticals section stops being a gated placeholder and becomes the
 *   answer to the question the landscape films raise: where does a five-minute
 *   film go on a phone. One of the three IS the house tour above, cut down,
 *   which is the cheapest possible demonstration of the point and the reason
 *   that repeat is shown rather than hidden.
 *
 * A "Four kinds of film" section sat between the argument and the position for
 * part of that day: four blocks naming the profile, the tour, the testimonial
 * and the short, each linking to an example. The user cut it on 2026-08-10 and
 * the page is better for it. It was the only section here that described the
 * work instead of showing it, and every claim it made is already visible in
 * the six captions above it — a reader who has watched a tour does not need a
 * paragraph explaining that a tour is a thing we shoot. Its one non-obvious
 * idea, that a film goes to work a second time in the feed, moved into the
 * verticals section, which is where it can be pointed at.
 *
 * A NOTE ON SCOPE (updated 2026-08-10)
 * ------------------------------------
 * lib/services.ts describes the video service in feed-advertising terms
 * ("cutdowns for feed, story and short-form", "creative variations for
 * testing"). When this page shipped that disagreed with it, since the page
 * sold long-form profiles and tours only. With the verticals it now overlaps:
 * short-form is genuinely part of the offer. It is still not the whole of it,
 * and services.ts says nothing about company profiles, tours or testimonials.
 * That entry has NOT been rewritten from here — it is home page copy and
 * changing it was not asked for — but the gap is now narrower and worth
 * closing when someone edits that file.
 */

export const metadata: Metadata = {
  title: "Video production",
  description:
    "Company profile films, tours of the place itself, treatments, customers on camera and short-form cuts for the feed. Ten films for six Malaysian and Singaporean businesses, all watchable here.",
  alternates: { canonical: "/services/video-production" },
  openGraph: {
    title: "Video production · Blueprint",
    description:
      "Company profiles, tours of the place, treatments, customers on camera and shorts for the feed. Ten films for six businesses.",
    url: "/services/video-production",
    type: "article",
  },
};

export default function VideoProductionPage() {
  return (
    <>
      <Nav />

      <main id="main">
        {/* ---------------- the opening ----------------
            One sentence, one action, and then the work, on the ground the
            nav is already painted. The films sit inside this band rather
            than in a section of their own on paper: a screen reads as a
            screen when it is the only lit thing in the frame, and putting
            them here means the reader meets the proof before the argument
            instead of after it. */}
        <section className="vp-open">
          <div className="shell">
            <Link className="back-link vp-back" href="/#services">
              All services
            </Link>

            {/* Every italic phrase on this page is chosen to be free of
                descenders ("seen", "shows", "watched", "feed"). The display
                line-heights are 0.98 and 1.04, and a true italic at weight
                880 hangs its g / y / p below the box those leave. */}
            <p className="eyebrow vp-eyebrow">Video production</p>
            <h1 className="h1" style={{ maxWidth: "20ch" }}>
              Some businesses have to be <em>seen</em>.
            </h1>
            {/* Ten and six are counted from lib/films.ts, not rounded up:
                four landscape films, six verticals, and six distinct clients
                across the two lists. If a film is added there, this sentence
                is the thing that goes wrong first. */}
            <p className="lead vp-lead">
              Company profiles, tours of the place itself, treatments,
              customers on camera, and short cuts made for the feed. Ten films
              for six businesses, and all ten are on this page.
            </p>
            <div className="cta-row vp-actions">
              <a
                className="btn btn-act"
                href={WA.shoot}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ask us about a shoot
              </a>
            </div>
          </div>

          <div className="shell">
            {/* Two up, two down. The first film ran the full width while
                there were three, to keep the third from sitting alone in a
                two-up row; with four there is no hole to solve and the
                matrix is the quieter answer. Four equal screens also say
                something the 1 + 2 arrangement did not, which is that these
                are four comparable pieces of work rather than one flagship
                and some support. */}
            <div className="film-grid">
              {FILMS.map((film, i) => (
                <FilmScreen
                  key={film.slug}
                  film={film}
                  /* Covers, turning over to the still. Landscape only: these
                     four posters are the clients' own thumbnails and put
                     four colour temperatures and a motion-blurred frame side
                     by side, which the shorts below do not do. See the note
                     in FilmScreen. */
                  flip
                  index={i}
                  sizes="(min-width: 900px) 550px, 100vw"
                />
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- the argument ----------------
            Narrow column, no eyebrow. The heading is its own label and the
            hero's eyebrow is the page's only one.

            The list in the first paragraph was written before most of these
            films existed and now reads as a description of the clients above
            it: a retreat, a clinic, a studio, a floor with people on it. It
            has not been changed, because it did not need to be. */}
        <section className="band">
          <div className="shell">
            <div className="col">
              <h2 className="h2">
                A page tells them. A film <em>shows</em> them.
              </h2>
              <p className="prose" style={{ marginTop: 22 }}>
                There is a kind of business you cannot write your way into. A
                retreat, a clinic, a facility, a floor with people working on
                it. The customer is not deciding whether they understand what
                you do. They are deciding whether to trust you with something,
                and that decision gets made by looking.
              </p>
              <p className="prose" style={{ marginTop: 16 }}>
                So the useful thing is not a better paragraph. It is footage of
                the real room, the real staff and the real standard of the
                place, which is the one thing a competitor cannot copy off your
                website.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------- vertical work ----------------
            Still gated on there being something real in it. It shipped empty
            on the morning of 2026-08-10 and filled the same afternoon; the
            guard stays, because the honest state of an unshot section is that
            it does not exist. Same rule the home page's testimonial band
            follows.

            Sits directly under the argument, and before the position, since
            the user moved it there on 2026-08-10. It reads better here than
            it did at the foot of the page: "that decision gets made by
            looking" is followed immediately by more things to look at, and
            the reader reaches the closing claim having already seen every
            film rather than being asked to take the last section on trust.
            The paper / sunk / paper alternation the page had is unchanged,
            because this section and the one it swapped with carried opposite
            grounds already.

            The first paragraph now carries the point the removed "short for
            the feed" block used to make: this is where a film goes to work a
            second time. The section is the only place that argument has left
            to live. */}
        {VERTICAL_FILMS.length > 0 && (
          <section className="band band-sunk" id="shorts">
            <div className="shell">
              <h2 className="h2" style={{ maxWidth: "18ch" }}>
                Made for the <em>feed</em>.
              </h2>
              <p className="prose" style={{ marginTop: 22, maxWidth: "62ch" }}>
                Vertical, captioned, and built to be understood with the sound
                off. One of these is the house tour further up this page, cut
                down and sped up for a feed that will not sit still for the
                long version. That is usually the cheapest film you will ever
                commission: a shoot you have already paid for, working
                somewhere else.
              </p>
              <div className="film-grid film-grid-v">
                {VERTICAL_FILMS.map((film) => (
                  <FilmScreen
                    key={film.slug}
                    film={film}
                    vertical
                    sizes="(min-width: 720px) 240px, 45vw"
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ---------------- the position ----------------
            The one thing a video house down the road cannot say. It is the
            same commitment as WHY[1] on the home page ("We build what we
            recommend") pointed at this service, so it is a stated position
            rather than a new claim. Set in a bordered inset across the full
            shell, which is what keeps it from reading as a third helping of
            the same 780px column the argument above it uses. It is now the
            page's last word before the CTA, and the framed measure is doing
            more work for it there than it was in the middle. */}
        <section className="band">
          <div className="shell">
            <div className="note vp-claim">
              <h2 className="h2" style={{ maxWidth: "20ch" }}>
                The film is not the job. Getting it <em>watched</em> is.
              </h2>
              <p className="prose" style={{ marginTop: 20 }}>
                Most video companies hand over a file and wish you luck with
                it. We run the marketing the film goes into, so it is cut for
                where it is actually going to be seen: the homepage, the ad,
                the reply someone gets on WhatsApp, the deck you send
                afterwards.
              </p>
              <p className="prose" style={{ marginTop: 16 }}>
                The same team that shoots it builds the page it lands on.
              </p>
            </div>
          </div>
        </section>

        {/* The site's bookend, carrying this page's own prefilled message. */}
        <CTASection
          waHref={WA.shoot}
          emailHref={`mailto:${SITE.email}`}
          phone={SITE.whatsappDisplay}
        />
      </main>

      <Footer />
    </>
  );
}
