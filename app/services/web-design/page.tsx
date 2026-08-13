import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/ui/hero-dithering-card";
import BeforeAfter from "@/components/v2/BeforeAfter";
import { Nav, Footer } from "@/components/v2/Chrome";
import { REBUILDS } from "@/lib/rebuilds";
import { SITE, WA } from "@/lib/site";

/**
 * /services/web-design — the branding service, shown as the thing it is
 * actually bought as.
 *
 * WHY THE URL DISAGREES WITH THE NAV
 * ----------------------------------
 * The nav row and the footer say "Branding" and land here. That substitution
 * is the page's opening argument rather than an accident of routing: for a
 * clinic in Cheras, the brand is not a logo sheet, it is the page a stranger
 * lands on at 11pm. lib/services.ts holds the link in SERVICE_PAGES, and the
 * first section below is what earns it.
 *
 * THE SHAPE, AND WHY IT IS THE VIDEO PAGE'S
 * -----------------------------------------
 * Proof first, on the dark ground, before a word of argument — the same
 * decision /services/video-production makes and for the same reason. A reader
 * who wants to know whether we can build a site can look at one we built and
 * leave, and that is the correct outcome. The argument is underneath for the
 * reader who is still there.
 *
 * Colour follows the site's rule: the ends are dark and the middle is paper.
 * The opening band is --hero-ground so the sticky bar and the band read as
 * one surface, the close is the navy dither card, and there is no second dark
 * event in between — three inversions is a stripe pattern, not a composition.
 *
 * WHAT IS DELIBERATELY ABSENT
 * ---------------------------
 * No ranking, no traffic figure, no enquiry count, no before/after graph, no
 * page-speed score, no "conversion-optimised". This is the page genre that
 * runs almost entirely on invented numbers, and the only defence against
 * writing one is that there is nowhere in the codebase to put it: see the
 * hard rules at the top of lib/rebuilds.ts.
 *
 * That leaves the two screenshots and six quoted differences carrying the
 * whole of the proof, which is the point. Everything the page claims, a
 * reader can see for herself in the pair above it.
 */

export const metadata: Metadata = {
  title: "Web design & branding",
  description:
    "Branding for a local business is mostly the website. One clinic's site rebuilt end to end, before and after, both pages shown in full and six differences you can check.",
  alternates: { canonical: "/services/web-design" },
  openGraph: {
    title: "Web design & branding · Blueprint",
    description:
      "One clinic's website rebuilt end to end. Before and after, both pages in full, and six differences that are not about taste.",
    url: "/services/web-design",
    type: "article",
  },
};

export default function WebDesignPage() {
  /* One rebuild today. The page is written to take the second without being
     rewritten: everything below the first section loops. */
  const [lead] = REBUILDS;

  return (
    <>
      <Nav />

      <main id="main">
        {/* ---------------- the opening ----------------
            One claim, one action, and then the work itself, on the ground
            the nav is already painted. */}
        <section className="svc-open">
          <div className="shell">
            <Link className="back-link" href="/#services">
              All services
            </Link>

            {/* The italic phrase carries no descenders, which is the rule
                every display line on this site follows: the display
                line-heights are 0.98 and 1.04 and a true italic at this
                weight hangs its g / y / p below the box they leave. */}
            <p className="eyebrow svc-eyebrow">Branding &amp; web design</p>
            <h1 className="h1" style={{ maxWidth: "17ch" }}>
              Nobody meets your brand. They meet your <em>website</em>.
            </h1>
            <p className="lead svc-lead">
              Identity, messaging and the site all of it lands on. Below is a
              clinic we rebuilt, before and after, both pages end to end. Scroll
              and they scroll with you.
            </p>
            <div className="cta-row svc-actions">
              <a
                className="btn btn-act"
                href={WA.rebuild}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ask us about a rebuild
              </a>
            </div>
          </div>

          <div className="shell">
            <div className="ba-head">
              <h2 className="h3">{lead.client}</h2>
              <p className="small ba-meta">
                {lead.sector} · {lead.place}
              </p>
            </div>

            {/* The notes under BEFORE and AFTER are the only labelling the
                pair gets. They name what each screen is and stop: a caption
                explaining what the reader is supposed to conclude from a
                picture is a caption doing the picture's job badly. */}
            <BeforeAfter
              before={lead.before}
              after={lead.after}
              beforeNote="The site we were handed"
              afterNote="The rebuild"
            />
          </div>
        </section>

        {/* ---------------- the argument ----------------
            Narrow column, no eyebrow: the heading is its own label and the
            hero's eyebrow is the page's only one.

            This is where the URL earns itself. It has to make the case that
            branding, for this kind of business, is mostly the website —
            otherwise the nav says one word and the page shows another. */}
        <section className="band">
          <div className="shell">
            <div className="col">
              <h2 className="h2" style={{ maxWidth: "20ch" }}>
                The brand is whatever the <em>page</em> makes people think.
              </h2>
              <p className="prose" style={{ marginTop: 22 }}>
                A logo, a palette and a set of rules are worth having, and we
                do that work. But almost nobody ever sees them on their own.
                They see one page, at eleven at night, on a phone, deciding
                whether a stranger should be allowed near their spine. That
                page is the brand, and everything else is how it stays
                consistent.
              </p>
              <p className="prose" style={{ marginTop: 16 }}>
                Which is why a rebrand that stops at the logo tends not to
                change anything. The visitor was never confused about the
                colours. She was trying to find out where you are, who works
                there, whether they are registered, what you would do to her
                on the first visit, and how to ask a question without filling
                in a form.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------- what changed ----------------
            The list of differences, on the sunk ground.

            Every row is quoted or pointed at rather than described, and each
            one is visible in the two screenshots above. That constraint is
            enforced in lib/rebuilds.ts and it is what keeps this section from
            becoming the usual list of adjectives — "modern", "clean",
            "user-friendly" — that could be written without looking at either
            site. */}
        <section className="band band-sunk">
          <div className="shell">
            <div className="col">
              <p className="eyebrow">What actually changed</p>
              <h2 className="h2" style={{ maxWidth: "20ch" }}>
                Not a new coat of <em>paint</em>.
              </h2>
              <p className="prose" style={{ marginTop: 22 }}>
                Six differences you can check against the two screens above.
                None of them are about taste.
              </p>
            </div>

            <ol className="chg">
              {lead.changes.map((c, i) => (
                <li className="chg-row" key={c.label}>
                  <span className="chg-n mono" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="chg-label">{c.label}</h3>
                  <div className="chg-pair">
                    <p className="chg-side chg-was">
                      <span className="chg-tag">Was</span>
                      {c.before}
                    </p>
                    <p className="chg-side chg-now">
                      <span className="chg-tag">Now</span>
                      {c.after}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------------- the position ----------------
            The same commitment as WHY[1] on the home page, pointed at this
            service. A framed inset across the full shell so it does not read
            as a third helping of the 780px column above it. */}
        <section className="band">
          <div className="shell">
            <div className="note svc-claim">
              <h2 className="h2" style={{ maxWidth: "22ch" }}>
                A site is not finished when it looks <em>finished</em>.
              </h2>
              <p className="prose" style={{ marginTop: 20 }}>
                Most of what is on the right-hand screen is there because of
                what happens after launch: the pages built around what people
                search for, the WhatsApp button that starts a real
                conversation, the booking, the hours, the reviews. We run that
                side too, so the site is built for the campaigns it will carry
                rather than handed over and wished well.
              </p>
              <p className="prose" style={{ marginTop: 16 }}>
                The same team that designs it runs the marketing that points
                at it.
              </p>
            </div>
          </div>
        </section>

        <CTASection
          waHref={WA.rebuild}
          emailHref={`mailto:${SITE.email}`}
          phone={SITE.whatsappDisplay}
        />
      </main>

      <Footer />
    </>
  );
}
