import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/ui/hero-dithering-card";
import { Nav, Footer } from "@/components/v2/Chrome";
import RebuildTabs from "@/components/v2/RebuildTabs";
import { REBUILDS } from "@/lib/rebuilds";
import { SITE, WA } from "@/lib/site";

/**
 * /services/web-design: the web design service, and the branding work that
 * comes with it.
 *
 * THE NAV USED TO DISAGREE WITH THE URL
 * -------------------------------------
 * Until 2026-08-17 the nav row and the footer said "Branding" and landed
 * here, and the first argument section existed to earn that substitution.
 * The service has since been renamed to Web Design, so the two now agree and
 * the argument stands on its own: for a clinic in Cheras the brand is not a
 * logo sheet, it is the page a stranger lands on at 11pm. Keep that section.
 * It is no longer explaining a link, but it is still the reason a reader who
 * came for a logo should be looking at screenshots of websites.
 *
 * THE SHAPE
 * ---------
 * Proof first, on the dark ground, before a word of argument. The same
 * decision /services/video-production makes and for the same reason: a reader
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
 * Between them they answer the three questions a reader arrives with: will
 * you rewrite what I say, will you break what already works, and do you
 * understand my customers. None of those is answerable without the others
 * there to contrast it against, which is why the three are one control with
 * three settings rather than three unrelated case studies.
 *
 * COLOUR follows the site's rule that the ends are dark and the middle is
 * paper, with one exception this page earns: the screenshot band is dark,
 * because a screenshot reads as a lit screen only when it is the only lit
 * thing in the frame. That is the same argument the film screens make on the
 * video page. The two sunk bands at the foot are the middle's only ground
 * change and they carry the argument sections, so nothing between the proof
 * and the close is a second lit object competing with the captures.
 *
 * THE ORDER OF THE ARGUMENT SECTIONS
 * ----------------------------------
 * What a website is (the brand is the page), then what makes one work (the
 * three jobs), then who does the work (the position). Each answers the
 * question the one before it raises, so they do not survive being reordered
 * or read as three separate opinions.
 *
 * WHAT IS DELIBERATELY ABSENT
 * ---------------------------
 * No ranking, no traffic figure, no enquiry count, no before/after graph, no
 * page-speed score, no "conversion-optimised". This is the page genre that
 * runs almost entirely on invented numbers, and the only defence against
 * writing one is that there is nowhere in the codebase to put it: see the
 * hard rules at the top of lib/rebuilds.ts.
 *
 * WHAT WAS CUT ON 2026-08-17, AND WHAT IT COST
 * --------------------------------------------
 * This page has been too long three times. It ran to seven pairs and
 * 33,000px before Vatti's four remaining category pages came out. It still
 * ran to about 15,000px of screenshot after that, which is what putting each
 * capture in a scrolling window of its own fixed. Then the user cut two
 * things at once: the three stacked rebuild sections became one tabbed stage,
 * and the three Was / Now lists went entirely.
 *
 * The Was / Now lists were the page's only checkable claims. Hard rule 2 in
 * lib/rebuilds.ts exists to make every one of them point at something a
 * reader can see in the capture above it, and eighteen rows of that is a lot
 * of argument to remove. The `changes` data is still on every rebuild in that
 * file, unrendered, and putting the lists back is a matter of mapping over it
 * again. The screenshots now carry the whole case on their own.
 *
 * If pages are ever added or removed, check the counted nouns. "Three
 * rebuilds, four pages between them" in the lead is counted off REBUILDS by
 * hand and is the first thing here to go stale.
 */

export const metadata: Metadata = {
  title: "Web design & branding",
  description:
    "Branding for a local business is mostly the website. Three rebuilds shown in full: a chiropractic clinic, a kitchen appliance brand and a nine-branch aesthetic clinic, every page before and after, top to bottom, nothing cropped.",
  alternates: { canonical: "/services/web-design" },
  openGraph: {
    title: "Web design & branding · Blueprint",
    description:
      "Client sites rebuilt, shown before and after, top to bottom, with nothing cropped out.",
    url: "/services/web-design",
    type: "article",
  },
};

/**
 * The three jobs a site has to do at once.
 *
 * Added 2026-08-17. The user asked for the mindset stated on the page: that
 * we build design, conversion and search as one job, and that the point of
 * the site is enquiries rather than compliments.
 *
 * WHY EACH ONE CARRIES ITS OWN FAILURE
 * ------------------------------------
 * "We do all three" is what every agency says, and said on its own it is
 * unfalsifiable and therefore worth nothing. What is checkable is what each
 * discipline produces when it is the only one present, and every reader has
 * seen at least one of the three: the beautiful site nobody enquires
 * through, the sharp landing page nobody finds, the page that ranks and is
 * not believed. Naming the failure is what turns the claim into an argument,
 * so the second half of each item is the load-bearing half. Do not trim it
 * back to a description of the discipline.
 *
 * NO NUMBERS. This is the section of a web design page where the genre
 * reaches for "+38% conversion" and "3x more leads". PRODUCT.md records no
 * such figure, so there is none here. See the hard rules in lib/rebuilds.ts.
 */
const MINDSET: { title: string; body: string }[] = [
  {
    title: "It has to look like the safe choice",
    body: "A stranger decides whether you are credible before reading a word, on a phone, usually at night. That judgement is design doing its job, and it is the half most people mean by a website. On its own it produces a site that gets compliments and no enquiries.",
  },
  {
    title: "It has to make the next step obvious",
    body: "Every page is built around one thing to do next, put where the decision actually happens, with nothing standing between the reader and doing it. Conversion work, or CRO, is mostly the removal of reasons to hesitate. On its own it produces a page that converts the few people who happen to find it.",
  },
  {
    title: "It has to be there when someone looks",
    body: "The pages are built around what people actually type into Google, and built to stay fast and legible to a crawler long after launch. That is the SEO half, and it is the one that keeps paying. On its own it produces visitors who arrive, do not believe what they see, and go back.",
  },
];

export default function WebDesignPage() {
  const [clinic, brand, aesthetic] = REBUILDS;

  /* One line per rebuild, saying what that one demonstrates. Two of the three
     are the headings the deleted Was / Now bands used to carry; the clinic's
     is the same point its band made, which was that a rewrite is not a coat
     of paint. The italic word in each carries no descender, per the display
     rule the rest of the site follows. */
  const tabs = [
    {
      rebuild: clinic,
      finding: (
        <>
          The words changed, not just the <em>look</em>.
        </>
      ),
    },
    {
      rebuild: brand,
      finding: (
        <>
          Sometimes the words are already <em>right</em>.
        </>
      ),
    },
    {
      rebuild: aesthetic,
      finding: (
        <>
          People arrive with a problem, not a treatment <em>name</em>.
        </>
      ),
    },
  ];

  return (
    <>
      <Nav />

      <main id="main">
        {/* ---------------- the opening ----------------
            One claim and one action. The work itself follows in the band
            below rather than inside this one, so the headline and the
            WhatsApp button own the first screen. */}
        <section className="svc-open">
          <div className="shell">
            <Link className="back-link" href="/#services">
              All services
            </Link>

            {/* The italic phrase carries no descenders, which is the rule
                every display line on this site follows: the display
                line-heights are 0.98 and 1.04 and a true italic at this
                weight hangs its g / y / p below the box they leave.

                THE H1 NAMES THE SERVICE, ON PURPOSE (2026-08-17)
                It used to read "Nobody meets your brand. They meet your
                website.", a better sentence and a worse heading. It did not
                contain the words anybody searches for, and an H1 is the one
                line on a page that is read by a person and a crawler at the
                same time. "Web design" now opens it, and the argument the old
                line made survives in the section below the proof, which is
                where it was always doing the real work.

                The eyebrow above lost "web design" in the same edit, so the
                two lines do not say it twice in a row. It still carries the
                branding half, because that work is real and the H1 no longer
                mentions it. */}
            <p className="eyebrow svc-eyebrow">Websites &amp; branding</p>
            <h1 className="h1" style={{ maxWidth: "17ch" }}>
              Web design for the page people <em>decide</em> on.
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
        </section>

        {/* ---------------- the proof ----------------
            One stage, three clients. See RebuildTabs.tsx for what a tab
            costs a page like this one and why it was taken anyway. */}
        <section className="band band-shots" id="rebuilds">
          <div className="shell">
            <RebuildTabs tabs={tabs} />
          </div>
        </section>

        {/* ---------------- the argument ----------------
            Narrow column, no eyebrow: the heading is its own label and the
            hero's eyebrow is the page's only one.

            It makes the case that branding, for this kind of business, is
            mostly the website, which is what tells a reader who arrived
            wanting a logo why he is being shown sites. */}
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

        {/* ---------------- the three jobs ----------------
            The mindset, in the home page's own device: the numbered hairline
            list the "Why Blueprint" band uses, down to the mono numeral in
            brand blue. Reused rather than reinvented, so the two pages read
            as one site and this section adds no CSS of its own.

            It is a list and the section above it is a prose column, which is
            what separates them; the sunk ground separates the pair from the
            paper band above. Three cards in a row would have been the easy
            version and it would have said "three services" when the whole
            argument is that they are one job.

            Sits after the brand argument and before the position: what a
            website is, then what makes one work, then who does the work. */}
        <section className="band band-sunk">
          <div className="shell">
            <h2 className="h2" style={{ maxWidth: "18ch" }}>
              Looking good is one of <em>three</em> jobs.
            </h2>
            <p className="prose" style={{ marginTop: 22, maxWidth: "62ch" }}>
              A site earns its keep when three things are true at the same
              time. Most are built by people who do one of them, and the two
              that are absent go unnoticed until the enquiries do not come.
            </p>

            <div className="why">
              {MINDSET.map((m, i) => (
                <div className="why-item" key={m.title}>
                  <span className="why-n mono" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="h3">{m.title}</h3>
                    <p className="prose" style={{ marginTop: 8 }}>
                      {m.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* The payoff line, and the reason the section exists. Sits under
                the list rather than in the lead above it: the three failures
                have to be read before "all three" means anything. */}
            <p className="prose" style={{ marginTop: 34, maxWidth: "62ch" }}>
              Done together they have one job, and it is not decoration.
              Somebody looking for what you sell finds you, believes you, and
              sends the message.
            </p>
          </div>
        </section>

        {/* ---------------- the position ----------------
            The same commitment as WHY[1] on the home page, pointed at this
            service. A framed inset across the full shell so it does not read
            as a second helping of the column above it. */}
        <section className="band band-sunk">
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
