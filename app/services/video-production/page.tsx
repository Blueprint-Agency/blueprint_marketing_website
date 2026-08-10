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
 * two films and the two client names are the whole of the proof, which is the
 * same standard lib/clients.ts holds the case studies to.
 *
 * A NOTE ON SCOPE (2026-08-10)
 * ----------------------------
 * The user confirmed this page sells company profile films and tours of the
 * space. lib/services.ts still describes the video service in feed-advertising
 * terms ("cutdowns for feed, story and short-form", "creative variations for
 * testing"), which is a narrower and different framing. That entry has NOT
 * been rewritten from here: it is home page copy and changing it was not
 * asked for. If the two are meant to agree, services.ts is the file to edit.
 */

export const metadata: Metadata = {
  title: "Video production",
  description:
    "Company profile films and walkthroughs of the space itself, for Malaysian businesses people have to see before they trust. Two films you can watch here.",
  alternates: { canonical: "/services/video-production" },
  openGraph: {
    title: "Video production · Blueprint",
    description:
      "Company profile films and tours of the place itself, for businesses people have to see before they trust.",
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
            <p className="lead vp-lead">
              Company profile films, and walkthroughs of the place itself. Two
              of them are below.
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
            <div className="film-grid">
              {FILMS.map((film, i) => (
                <FilmScreen
                  key={film.slug}
                  film={film}
                  /* The first film is the largest image above the fold on
                     this page, so it is the LCP element and the only one
                     worth preloading. */
                  priority={i === 0}
                  sizes="(min-width: 900px) 560px, 100vw"
                />
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- the argument ----------------
            Narrow column, no eyebrow. The heading is its own label and the
            hero's eyebrow is the page's only one. */}
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

        {/* ---------------- what we make ----------------
            Exactly two, because exactly two is what we make. A third block
            would have to be invented to balance the grid, which is how a
            layout starts writing the copy. */}
        <section className="band band-sunk" id="what">
          <div className="shell">
            <h2 className="h2" style={{ maxWidth: "16ch" }}>
              Two kinds of film.
            </h2>

            <div className="kinds">
              <article className="kind">
                <h3 className="h3">The company profile</h3>
                <p className="prose" style={{ marginTop: 12 }}>
                  One piece that says who the business is, who runs it and why
                  it is worth dealing with. It sits on the homepage, it opens a
                  pitch, and it does the job a company brochure has always been
                  bad at.
                </p>
                <a className="kind-link" href="#vm-pacific">
                  Watch the VM Pacific film
                </a>
              </article>

              <article className="kind">
                <h3 className="h3">The tour of the place</h3>
                <p className="prose" style={{ marginTop: 12 }}>
                  A walkthrough of the premises, shot the way a visitor moves
                  through it. For businesses whose room is the product: a
                  retreat, a clinic, a showroom, a floor someone has to be
                  willing to walk into.
                </p>
                <a className="kind-link" href="#oriental-postnatal-centre">
                  Watch the Oriental Postnatal Centre tour
                </a>
              </article>
            </div>
          </div>
        </section>

        {/* ---------------- the position ----------------
            The one thing a video house down the road cannot say. It is the
            same commitment as WHY[1] on the home page ("We build what we
            recommend") pointed at this service, so it is a stated position
            rather than a new claim. Set in a bordered inset across the full
            shell: a fourth layout family, and the one section on this page
            not held to the 780px column, so the three paper sections do not
            all hug the same left edge in the same measure. */}
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

        {/* ---------------- vertical work ----------------
            Renders only when there is something real in it. The user
            confirmed short-form exists and that links are coming; until they
            land, lib/films.ts holds an empty array and this section does not
            exist rather than existing empty. Same rule the home page's
            testimonial band follows. */}
        {VERTICAL_FILMS.length > 0 && (
          <section className="band band-sunk">
            <div className="shell">
              <h2 className="h2" style={{ maxWidth: "18ch" }}>
                Made for the <em>feed</em>.
              </h2>
              <div className="film-grid film-grid-v">
                {VERTICAL_FILMS.map((film) => (
                  <FilmScreen
                    key={film.slug}
                    film={film}
                    vertical
                    sizes="(min-width: 900px) 260px, 45vw"
                  />
                ))}
              </div>
            </div>
          </section>
        )}

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
