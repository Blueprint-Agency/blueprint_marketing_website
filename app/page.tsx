import Link from "next/link";
import Image from "next/image";
import { CTASection } from "@/components/ui/hero-dithering-card";
import InteractiveGrid from "@/components/ui/interactive-grid";
import ScrollExpandHero from "@/components/ui/scroll-expansion-hero";
import { Nav, Footer } from "@/components/v2/Chrome";
import Diagnostic from "@/components/v2/Diagnostic";
import ProcessLoop from "@/components/v2/ProcessLoop";
import ServiceTabs from "@/components/v2/ServiceTabs";
import Testimonials from "@/components/v2/Testimonials";
import { CLIENTS, clientBySlug } from "@/lib/clients";
import { BRANDS, HAS_REAL_LOGOS } from "@/lib/logos";
import { MOCK_LOGO_TINTS, MOCK_TESTIMONIALS, PREVIEW_DATA } from "@/lib/preview";
import { SEGMENTS } from "@/lib/segments";
import { FAQ, SERVICES, WHY } from "@/lib/services";
import { TESTIMONIALS } from "@/lib/testimonials";
import { SITE, WA } from "@/lib/site";

const STEPS = [
  [
    "Audit",
    "We look at what you have and find where the customers are actually going missing. Usually it is not where you think.",
  ],
  [
    "Architect",
    "We plan the marketing and the systems together, as one thing, because separately they leak.",
  ],
  [
    "Build",
    "We build it: the pages, the campaigns, the booking, the automation, the follow up.",
  ],
  [
    "Scale",
    "Once it works, we spend more where it works and cut what does not.",
  ],
  /* `as const` so each entry types as a [name, body] pair rather than a
     string[] of unknown length — ProcessLoop destructures it. */
] as const;

function Chop({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a className="btn btn-act" href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

/* The logo wall, as a single self-scrolling line (2026-07-28).
   Was a 6-column grid. See lib/logos.ts for the files themselves.

   The track holds the brand list TWICE and slides exactly -50%, so the
   moment the first copy leaves the frame the second is sitting precisely
   where it began and the loop has no seam. The second copy is decoration:
   aria-hidden so a screen reader is not read eleven logos twice, and
   tabIndex -1 so the duplicate links stay out of the tab order. */
function LogoRun({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <>
      {BRANDS.map((b) => {
        const mark = (
          <>
            {b.logo ? (
              /* 480x160 is the real pixel size of every file in /public/logos,
                 so next/image reserves the right box and the intrinsic ratio
                 is never guessed. The CSS caps the rendered height; these
                 numbers exist to prevent layout shift, not to size it. */
              <Image
                src={b.logo}
                alt={b.name}
                width={480}
                height={160}
                style={b.scale ? { transform: `scale(${b.scale})` } : undefined}
              />
            ) : PREVIEW_DATA && !HAS_REAL_LOGOS ? (
              /* Neutral placeholder tile — deliberately NOT an imitation of
                 this company's real mark. Shows weight and rhythm only.

                 Suppressed once ANY real logo exists. The tile is a coloured
                 monogram, so on a wall of desaturated real marks it became
                 the brightest cell on the row — pulling the eye to the one
                 client whose logo is missing. A plain wordmark sits quietly
                 among them instead. */
              <span className="logo-mock">
                <span
                  className="logo-mock-tile"
                  style={{ background: MOCK_LOGO_TINTS[b.slug] ?? "#1e4fe0" }}
                  aria-hidden="true"
                >
                  {b.name.charAt(0)}
                </span>
                <span className="logo-word">{b.name}</span>
              </span>
            ) : (
              <span className="logo-word">{b.name}</span>
            )}
          </>
        );

        /* A cell without a confirmed URL is not a link. Wrapping it in an
           <a> with no href would put a focusable, clickable-looking element
           in the tab order that goes nowhere — worse than an honest static
           cell. The two states look identical; only one responds. */
        return (
          <li key={`${duplicate ? "dup" : "run"}-${b.slug}`} aria-hidden={duplicate}>
            {b.href ? (
              <a
                className="logo-cell"
                href={b.href}
                target="_blank"
                rel="noopener noreferrer"
                title={`${b.name}, opens their site`}
                tabIndex={duplicate ? -1 : undefined}
              >
                {mark}
              </a>
            ) : (
              <span className="logo-cell logo-cell-static">{mark}</span>
            )}
          </li>
        );
      })}
    </>
  );
}

function LogoWall() {
  return (
    /* The viewport. Overflow is clipped here and the edges are masked, so
       marks dissolve rather than being guillotined at the frame. */
    <div className="logo-marquee">
      <ul className="logo-track">
        <LogoRun />
        <LogoRun duplicate />
      </ul>
    </div>
  );
}

export default function HomePage() {
  const flagship = CLIENTS[0];
  const attract = SERVICES.filter((s) => s.group === "attract");
  const build = SERVICES.filter((s) => s.group === "build");

  /* Real quotes win whenever they exist. The mock set only fills the gap,
     and only while the preview flag is on. */
  const quotes =
    TESTIMONIALS.length > 0
      ? TESTIMONIALS
      : PREVIEW_DATA
        ? MOCK_TESTIMONIALS
        : [];

  return (
    <>
      {PREVIEW_DATA && (
        <div className="mockbar" role="status">
          <strong>PREVIEW DATA</strong>
          {/* The bar names exactly what is invented, and nothing else. The
              logos stopped being placeholders on 2026-07-28 and the results
              grid was removed on 2026-07-29, so the testimonials are now the
              only thing on the page that is made up. A warning that
              overstates gets ignored. */}
          <span>
            The testimonials are invented. Nobody said them, and the people
            named do not exist. Put real quotes in{" "}
            <code>lib/testimonials.ts</code> and set{" "}
            <code>PREVIEW_DATA = false</code> in <code>lib/preview.ts</code>{" "}
            before publishing.
          </span>
        </div>
      )}
      {/* The only page with a dark hero, so the only one whose nav is
          see-through over it. See the Nav definition in Chrome.tsx. */}
      <Nav overHero />

      <main id="main">
        {/* ---------------- hero ----------------
            The headline parts down the middle and a photograph of a crowd
            opens out of the gap. The subject is the argument: the crowd is
            the customers, and the hero is literally the act of getting at
            them. The two halves are chosen so the split falls on the page's
            own emphasis device — roman claim above, italic payload below.

            Stripped to headline and mesh on 2026-07-29: the action row and
            the paragraph under it both came out, so the hero is one claim on
            one ground and the logo wall lands immediately after it. The
            first ask on the page is now the WhatsApp button in the mid-page
            CTA — the component still takes `actions` if it needs to come
            back, and the primary action belongs there rather than in
            `children`, which only appears once the gesture completes. */}
        <ScrollExpandHero
          mediaType="image"
          mediaSrc="/photography/crowd.webp"
          mediaAlt=""
          overlayOpacity={0.4}
          background={<InteractiveGrid className="seh-grid" />}
          kicker="Digital marketing & growth systems"
          titleTop="We get Malaysian businesses"
          titleBottom={<em>more customers.</em>}
          scrollToExpand="Scroll"
        />

        {/* ---------------- logo wall ---------------- */}
        {/* The label stays inside the shell; the run does not. A marquee that
            stops at the shell's 1180px would fade out against empty page
            rather than against the edge of the screen, which reads as a
            cropped component instead of a line that keeps going. */}
        <section className="strip">
          <div className="shell">
            <p className="strip-label">
              Trusted by clinics, product brands and studios across Malaysia and
              Singapore
            </p>
          </div>
          <LogoWall />
        </section>

        {/* The "Symptoms" qualification section was removed on 2026-07-28 at
            the user's request. It ran between the logo strip and the
            diagnostic, listing the problems a reader might arrive with.

            The diagnostic below now does that job on its own, and arguably
            better: it asked her to recognise herself in a list, where the
            diagnostic has her name the problem herself.

            Still on disk and unreferenced after this: components/v2/QualArt.tsx,
            the QUALIFY array in lib/services.ts, and the .qual* rules in
            plain.css. Left in place rather than deleted so the section can be
            restored in one commit; delete them if it stays gone. */}

        {/* ---------------- the diagnostic ----------------
            Was "Two things cost you customers", which told the reader what
            her problem was and then sold her the answer. She names it
            herself now, and the reading she gets back is the version she
            believes — because she supplied the evidence for it. It doubles
            as the lead form: the finished questionnaire leaves as a
            pre-written WhatsApp message. See lib/diagnostic.ts. */}
        <section className="band band-sunk" id="fix">
          <div className="shell">
            <p className="eyebrow">The diagnostic</p>
            <h2 className="h2" style={{ maxWidth: "22ch" }}>
              Where is your business <em>losing customers</em>?
            </h2>
            <p className="prose" style={{ marginTop: 22 }}>
              Seven questions, under a minute. At the end you get our honest
              reading of where the money is going, and the three moves we
              would make, in the order we would make them. Whether or not you
              ever hire us.
            </p>

            <Diagnostic />
          </div>
        </section>

        {/* ---------------- services ---------------- */}
        <section className="band" id="services">
          <div className="shell">
            <p className="eyebrow">Services</p>
            {/* No <em> here. The heading is a bare label with no phrase
                worth slanting, and an emphasis placed for consistency
                rather than for meaning is the thing that makes the device
                read as a template. */}
            <h2 className="h2" style={{ maxWidth: "22ch" }}>
              What we can help you with.
            </h2>
            <p className="prose" style={{ marginTop: 22 }}>
              No buzzwords, and nothing on this list that we do not actually build.
              Start with one, or let us run the whole thing.
            </p>

            <ServiceTabs
              groupId="attract"
              eyebrow="Bringing people in"
              services={attract}
            />
            <ServiceTabs
              groupId="build"
              eyebrow="Keeping them once they arrive"
              services={build}
            />

            <p className="small svt-note">
              The screens beside each service are illustrations of the work,
              drawn here. They are not screenshots of a client account, and not a
              claimed result.
            </p>
          </div>
        </section>

        {/* ---------------- mid CTA ---------------- */}
        <section className="midcta">
          <div className="shell midcta-row">
            <div>
              <h2 className="h3" style={{ fontSize: "1.5rem" }}>
                Not sure which of these you need?
              </h2>
              <p className="small" style={{ marginTop: 6, maxWidth: "56ch" }}>
                Tell us what your business does and where it feels like people
                are dropping off. We will tell you what we would look at first.
              </p>
            </div>
            <Chop href={WA.audit}>Ask us on WhatsApp</Chop>
          </div>
        </section>

        {/* ---------------- who it's for ---------------- */}
        <section className="band" id="who">
          <div className="shell">
            <p className="eyebrow">Who it&rsquo;s for</p>
            <h2 className="h2" style={{ maxWidth: "20ch" }}>
              Find your business. <em>We&rsquo;ve built this before.</em>
            </h2>
            <p className="prose" style={{ marginTop: 22 }}>
              The problem is never quite the same. A clinic loses people at 11pm;
              a solar company loses them three weeks into a decision. What we
              build depends on which one you are.
            </p>

            <div className="seg-grid">
              {SEGMENTS.map((s) => {
                const clients = s.clientSlugs
                  .map(clientBySlug)
                  .filter((c): c is NonNullable<typeof c> => Boolean(c));
                return (
                  <article className="seg" key={s.id}>
                    <h3 className="h3">{s.title}</h3>
                    <p className="small seg-who">{s.who}</p>
                    <p className="seg-pain">{s.pain}</p>
                    <ul className="seg-builds">
                      {s.builds.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                    <div className="seg-foot">
                      <span className="small">We do this for</span>
                      <span className="seg-clients">
                        {clients.map((c) => (
                          <a
                            key={c.slug}
                            className="seg-client"
                            href={c.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {c.name}
                          </a>
                        ))}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------------- why us ----------------
            The ink chapter — see the CHAPTER LAYER in plain.css. It was two
            sections sharing one ground until 2026-07-29; "Why it works" came
            out and this is now the whole chapter, which is why the
            `.band-ink + .band-ink` seam rule no longer has anything to do
            here. Still the page's only dark event between the navy hero and
            the navy close; a second one would turn a composition back into a
            stripe pattern.

            No eyebrow: the heading is already its own label, and an eyebrow
            repeating the heading beneath it is decoration. */}
        <section className="band band-ink">
          <div className="shell">
            <h2 className="h2" style={{ maxWidth: "20ch" }}>
              Why <em>Blueprint</em>.
            </h2>
            <div className="why">
              {WHY.map((w, i) => (
                <div className="why-item" key={w.title}>
                  <span className="why-n mono" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="h3">{w.title}</h3>
                    <p className="prose" style={{ marginTop: 8 }}>
                      {w.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- testimonials OR the honest note ----------------
            Was the results grid, which had nothing real in it and was
            rendering MOCK_RESULTS behind the PREVIEW_DATA flag with a
            "Sample data" tag on top. Removed 2026-07-29 and replaced with
            client quotes.

            Same shape as the slot it replaces: real material if there is
            any, the honest note if there is not. TESTIMONIALS ships empty
            because PRODUCT.md records no testimonial about Blueprint — see
            lib/testimonials.ts for what has to be true before one goes in.
            The note is not a placeholder; it is what this section says
            until a client agrees to be quoted. */}
        <section className="band band-sunk">
          {quotes.length > 0 ? (
            <>
              {/* The heading stays inside the shell; the row does not — the
                  same split the logo wall makes, for the same reason. Inside
                  .col the track was held to 780px, so it faded out against
                  empty band less than halfway across the screen. A marquee
                  has to run to the edges or it reads as a cropped component
                  rather than a line that keeps going. */}
              <div className="shell">
                <div className="col">
                  {/* Real quotes win whenever they exist; the mock set only
                      fills the gap, and says so on the card. */}
                  {TESTIMONIALS.length === 0 && (
                    <p className="sample-tag">
                      Sample testimonials, not real client quotes
                    </p>
                  )}
                  <h2 className="h2">
                    In their <em>words</em>.
                  </h2>
                </div>
              </div>
              {/* 26, not 34: the marquee now carries 16px of its own top
                  padding to keep the hover glow out of the clip, and that
                  padding is part of the gap the reader sees. */}
              <div style={{ marginTop: 26 }}>
                <Testimonials items={quotes} />
              </div>
            </>
          ) : (
            <div className="shell">
              <div className="note col">
                <h2 className="h3" style={{ fontSize: "1.375rem" }}>
                  On results
                </h2>
                <p className="prose" style={{ marginTop: 14 }}>
                  You will not find an agency-wide revenue number or an average
                  percentage lift anywhere on this page, because we do not have
                  one we could honestly defend. Results belong to each client, in
                  that client&rsquo;s own numbers.
                </p>
                <p className="prose" style={{ marginTop: 14 }}>
                  You will not find a wall of quotes either. When a client is
                  happy to be named saying something, it will appear here in
                  their words, with their face on it. Until then this space
                  stays empty rather than borrowed.
                </p>
                <p className="prose" style={{ marginTop: 14 }}>
                  Ask us about a business like yours in the chat and we will tell
                  you exactly what we are able to share.
                </p>
                {flagship.detail && (
                  <div style={{ marginTop: 24 }}>
                    <Link className="btn btn-line" href={`/work/${flagship.slug}`}>
                      Read what we built for {flagship.name}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </section>

        {/* ---------------- how it runs ----------------
            Was a stacked list until 2026-07-29; now four cards with arrows
            between them and a return arrow closing the cycle, adopted from
            subyect.com at the user's request. SUBYECT-TEARDOWN.md §2.8 had
            already made the case: these four stages ARE a loop, and a list
            is the one shape that hides it.

            Laid out 2x2 on desktop so the cards snake and the fourth sits
            under the first, which is what lets the return arrow close the
            cycle. One row of four was tried first and read as a pipeline
            with an end, with the return leg stranded underneath it. */}
        <section className="band">
          <div className="shell">
            <div className="col">
              <h2 className="h2">
                How it <em>runs</em>.
              </h2>
              <p className="prose" style={{ marginTop: 22 }}>
                Four stages, each one feeding the next. You are told what is
                happening at every stage, in plain words.
              </p>
            </div>
          </div>
          <div className="shell">
            <ProcessLoop steps={STEPS} />
          </div>
        </section>

        {/* ---------------- FAQ ---------------- */}
        <section className="band band-sunk" id="faq">
          <div className="shell">
            <div className="col">
              <h2 className="h2">
                Questions people <em>actually</em> ask.
              </h2>
              <div className="faq">
                {FAQ.map((f) => (
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
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- close ----------------
            The bookend, as an inset card. Copy unchanged; the band it used
            to sit in is now a 48px card carrying a dithered warp field. */}
        <CTASection
          waHref={WA.general}
          emailHref={`mailto:${SITE.email}`}
          phone={SITE.whatsappDisplay}
        />
      </main>

      <Footer />
    </>
  );
}
