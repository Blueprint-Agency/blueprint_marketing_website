import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/ui/hero-dithering-card";
import BeforeAfter from "@/components/v2/BeforeAfter";
import { Nav, Footer } from "@/components/v2/Chrome";
import { REBUILDS, type Rebuild } from "@/lib/rebuilds";
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
 * THE SHAPE
 * ---------
 * Proof first, on the dark ground, before a word of argument — the same
 * decision /services/video-production makes and for the same reason. A reader
 * who wants to know whether we can build a site can look at one we built and
 * leave, and that is the correct outcome.
 *
 * Three rebuilds, and they are deliberately not the same story:
 *
 *  - PERSISTENCE is a rewrite. The words changed, the positioning changed,
 *    the page went from a template to a clinic in a named neighbourhood.
 *  - VATTI is the opposite. Every page title and every address came through
 *    untouched, because the search work had already been done. What changed
 *    was the site itself, across six pages.
 *  - KAITEKI is neither: an information architecture job. The old site was
 *    organised around the clinic's own vocabulary, a hand-built HTML file
 *    per treatment. The rebuild is organised around what a patient turns up
 *    with, which is a concern and not a treatment name.
 *
 * Between them they answer the three questions a reader arrives with — will
 * you rewrite what I say, will you break what already works, and do you
 * understand my customers — and none of those is answerable without the
 * others there to contrast it against. Do not collapse them into one list of
 * improvements.
 *
 * COLOUR follows the site's rule that the ends are dark and the middle is
 * paper, with one exception this page earns: the screenshot bands are dark
 * wherever they fall, because a screenshot reads as a lit screen only when
 * it is the only lit thing in the frame. That is the same argument the film
 * screens make on the video page.
 *
 * WHAT IS DELIBERATELY ABSENT
 * ---------------------------
 * No ranking, no traffic figure, no enquiry count, no before/after graph, no
 * page-speed score, no "conversion-optimised". This is the page genre that
 * runs almost entirely on invented numbers, and the only defence against
 * writing one is that there is nowhere in the codebase to put it: see the
 * hard rules at the top of lib/rebuilds.ts.
 *
 * A NOTE ON LENGTH
 * ----------------
 * Full-length pairs make a long document — the Vatti kitchen hood capture is
 * nearly ten thousand pixels on its own. It ran to seven pairs and 33,000px
 * on 2026-08-15 before the user cut Vatti's four remaining category pages;
 * three pairs is the current shape and roughly half that. Two things keep it
 * navigable and both must survive any edit here: the BEFORE / AFTER labels
 * are sticky, and a rebuild with more than one page carries an index that
 * jumps to its pairs.
 *
 * If pages are ever added or removed, check the counted nouns. "Three
 * rebuilds, four pages between them" in the lead, and "the two pages above"
 * in each change list, are counted off REBUILDS by hand and are the first
 * things to go stale.
 */

export const metadata: Metadata = {
  title: "Web design & branding",
  description:
    "Branding for a local business is mostly the website. Three rebuilds shown in full — a chiropractic clinic, a kitchen appliance brand and a nine-branch aesthetic clinic — every page before and after, top to bottom, nothing cropped.",
  alternates: { canonical: "/services/web-design" },
  openGraph: {
    title: "Web design & branding · Blueprint",
    description:
      "Two client sites rebuilt, shown before and after, top to bottom, with the differences you can check against them.",
    url: "/services/web-design",
    type: "article",
  },
};

/** The pairs for one rebuild, plus its index when there is more than one. */
function Pairs({ rebuild, eager }: { rebuild: Rebuild; eager?: boolean }) {
  const many = rebuild.pages.length > 1;

  return (
    <>
      {/* Only when there is something to index. One page does not need a
          contents list pointing at itself. */}
      {many && (
        <nav className="pg-index" aria-label={`${rebuild.client} pages`}>
          <span className="pg-index-label small">
            {rebuild.pages.length} pages
          </span>
          <ul>
            {rebuild.pages.map((p) => (
              <li key={p.slug}>
                <a href={`#${rebuild.slug}-${p.slug}`}>{p.name}</a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {rebuild.pages.map((pair, i) => (
        <section
          className="pg"
          id={`${rebuild.slug}-${pair.slug}`}
          key={pair.slug}
          aria-label={`${rebuild.client}, ${pair.name}`}
        >
          {many && <h4 className="pg-name">{pair.name}</h4>}
          <BeforeAfter
            pair={pair}
            beforeNote="The site we were handed"
            afterNote="The rebuild"
            eager={eager && i === 0}
          />
        </section>
      ))}
    </>
  );
}

export default function WebDesignPage() {
  const [clinic, brand, aesthetic] = REBUILDS;

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
              Identity, messaging and the site all of it lands on. Below are
              three rebuilds, four pages between them, every one shown before
              and after, top to bottom, with nothing cropped out.
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
              <h2 className="h3">{clinic.client}</h2>
              <p className="small ba-meta">
                {clinic.sector} · {clinic.place}
              </p>
              <p className="prose ba-brief">{clinic.brief}</p>
            </div>

            {/* Two static captures at their full length — see the note at the
                top of BeforeAfter.tsx for what this replaced and why.

                The notes under BEFORE and AFTER are the only labelling the
                pair gets. They name what each screen is and stop: a caption
                explaining what the reader is supposed to conclude from a
                picture is a caption doing the picture's job badly. */}
            <Pairs rebuild={clinic} eager />
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

        {/* ---------------- what changed, clinic ----------------
            Every row is quoted or pointed at rather than described, and each
            one is visible in the screenshots above. That constraint is
            enforced in lib/rebuilds.ts and it is what keeps this section from
            becoming the usual list of adjectives — "modern", "clean",
            "user-friendly" — that could be written without looking at either
            site. */}
        <Changes rebuild={clinic} eyebrow="What actually changed">
          <h2 className="h2" style={{ maxWidth: "20ch" }}>
            Not a new coat of <em>paint</em>.
          </h2>
          <p className="prose" style={{ marginTop: 22 }}>
            Six differences you can check against the two screens above. None
            of them are about taste.
          </p>
        </Changes>

        {/* ---------------- the second rebuild ----------------
            Its own dark band rather than a second helping of the opening.
            The screens want the dark ground wherever they land; the band
            around them is a plain one. */}
        <section className="band band-shots">
          <div className="shell">
            <div className="ba-head ba-head-lead">
              <p className="eyebrow">The second one</p>
              <h2 className="h2" style={{ maxWidth: "22ch" }}>
                Sometimes the words are already <em>right</em>.
              </h2>
              <p className="prose ba-brief" style={{ marginTop: 20 }}>
                {brand.brief}
              </p>
              <p className="small ba-meta" style={{ marginTop: 18 }}>
                {brand.client} · {brand.sector} · {brand.place}
              </p>
            </div>

            <Pairs rebuild={brand} />
          </div>
        </section>

        {/* ---------------- what changed, brand ---------------- */}
        <Changes rebuild={brand} eyebrow="What actually changed">
          <h2 className="h2" style={{ maxWidth: "24ch" }}>
            The titles stayed. Everything under them <em>moved</em>.
          </h2>
          <p className="prose" style={{ marginTop: 22 }}>
            Six differences you can check against the two pages above. The
            first one is that nothing changed at all.
          </p>
        </Changes>

        {/* ---------------- the third rebuild ----------------
            The third distinct shape, and the reason it is worth a section
            of its own rather than a third set of screenshots: this one is
            an information architecture job. The old site was a hand-built
            static file per treatment, so it was organised around the
            clinic's own vocabulary. What changed is the question the page
            asks first. */}
        <section className="band band-shots">
          <div className="shell">
            <div className="ba-head ba-head-lead">
              <p className="eyebrow">The third one</p>
              <h2 className="h2" style={{ maxWidth: "24ch" }}>
                People arrive with a problem, not a treatment <em>name</em>.
              </h2>
              <p className="prose ba-brief" style={{ marginTop: 20 }}>
                {aesthetic.brief}
              </p>
              <p className="small ba-meta" style={{ marginTop: 18 }}>
                {aesthetic.client} · {aesthetic.sector} · {aesthetic.place}
              </p>
            </div>

            <Pairs rebuild={aesthetic} />
          </div>
        </section>

        {/* ---------------- what changed, aesthetic ---------------- */}
        <Changes rebuild={aesthetic} eyebrow="What actually changed">
          <h2 className="h2" style={{ maxWidth: "22ch" }}>
            Same clinic. Different <em>question</em>.
          </h2>
          <p className="prose" style={{ marginTop: 22 }}>
            Six differences you can check against the two screens above. Most
            of them are about what the page asks you first.
          </p>
        </Changes>

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
                Most of what is on the right-hand screens is there because of
                what happens after launch: the pages built around what people
                search for, the WhatsApp button that starts a real
                conversation, the booking, the hours, the reviews, the dealer
                map. We run that side too, so the site is built for the
                campaigns it will carry rather than handed over and wished
                well.
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

/** The Was / Now list for one rebuild. */
function Changes({
  rebuild,
  eyebrow,
  children,
}: {
  rebuild: Rebuild;
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <section className="band band-sunk">
      <div className="shell">
        <div className="col">
          <p className="eyebrow">{eyebrow}</p>
          {children}
        </div>

        <ol className="chg">
          {rebuild.changes.map((c, i) => (
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
  );
}
