import Link from "next/link";
import Image from "next/image";
import { CTASection } from "@/components/ui/hero-dithering-card";
import Diagnostic from "@/components/v2/Diagnostic";
import QualArt from "@/components/v2/QualArt";
import ServiceTabs from "@/components/v2/ServiceTabs";
import { CLIENTS, clientBySlug } from "@/lib/clients";
import { BRANDS } from "@/lib/logos";
import { MOCK_LOGO_TINTS, MOCK_RESULTS, PREVIEW_DATA } from "@/lib/preview";
import { RESULTS } from "@/lib/results";
import { SEGMENTS } from "@/lib/segments";
import { FAQ, QUALIFY, SERVICES, WHY, WHY_IT_WORKS } from "@/lib/services";
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
];

function Aurora() {
  return (
    <div className="aurora-field" aria-hidden="true">
      <span className="blob blob-1" />
      <span className="blob blob-2" />
      <span className="blob blob-3" />
    </div>
  );
}

function Chop({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a className="btn btn-act" href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

/* The logo wall. Until real files are supplied every cell renders as a
   typographic wordmark — a designed state rather than an empty box — and
   keeps the link to the live site, so "go and check" survives the swap
   away from screenshots. See lib/logos.ts. */
function LogoWall() {
  return (
    <ul className="logo-row">
      {BRANDS.map((b) => (
        <li key={b.slug}>
          <a
            className="logo-cell"
            href={b.href}
            target="_blank"
            rel="noopener noreferrer"
            title={`${b.name}, opens their site`}
          >
            {b.logo ? (
              <Image
                src={b.logo}
                alt={b.name}
                width={200}
                height={72}
                style={b.scale ? { transform: `scale(${b.scale})` } : undefined}
              />
            ) : PREVIEW_DATA ? (
              /* Neutral placeholder tile — deliberately NOT an imitation of
                 this company's real mark. Shows weight and rhythm only. */
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
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function V2Page() {
  const flagship = CLIENTS[0];
  const attract = SERVICES.filter((s) => s.group === "attract");
  const build = SERVICES.filter((s) => s.group === "build");

  /* Real figures win whenever they exist. Mock data only fills the gap. */
  const results = RESULTS ?? (PREVIEW_DATA ? MOCK_RESULTS : null);

  return (
    <>
      {PREVIEW_DATA && (
        <div className="mockbar" role="status">
          <strong>PREVIEW DATA</strong>
          <span>
            Sample figures and placeholder logos. Nothing here is real. Set{" "}
            <code>PREVIEW_DATA = false</code> in <code>lib/preview.ts</code>{" "}
            before publishing.
          </span>
        </div>
      )}
      <header className="nav">
        <div className="shell nav-row">
          <div className="nav-brand">
            <span className="mark" aria-hidden="true">
              B
            </span>
            <span className="nav-word">Blueprint</span>
          </div>
          <nav className="nav-links" aria-label="Main">
            <a href="#services" className="nav-link hide-md">
              Services
            </a>
            <a href="#who" className="nav-link hide-md">
              Who it&rsquo;s for
            </a>
            <a href="#faq" className="nav-link hide-md">
              FAQ
            </a>
            <a
              className="btn btn-act btn-sm"
              href={WA.general}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp us
            </a>
          </nav>
        </div>
      </header>

      <main id="main">
        {/* ---------------- hero ---------------- */}
        <section className="band band-hero aurora">
          <Aurora />
          <div className="shell hero-center">
            <p className="hero-kicker">Digital marketing &amp; growth systems</p>
            <h1 className="h1">We get Malaysian businesses more customers.</h1>
            <p className="lead hero-lead">
              Blueprint runs the marketing that brings people in, like SEO, Google
              Ads, Meta and funnels, then builds the booking, CRM and WhatsApp
              systems that stop you losing them once they arrive.
            </p>
            <div className="cta-row hero-cta">
              <Chop href={WA.audit}>
                Tell us where you&rsquo;re losing customers
              </Chop>
              <a className="btn btn-line" href="#services">
                See what we do
              </a>
            </div>
          </div>
        </section>

        {/* ---------------- logo wall ---------------- */}
        <section className="strip">
          <div className="shell">
            <p className="strip-label">
              Trusted by clinics, product brands and studios across Malaysia and
              Singapore
            </p>
            <LogoWall />
          </div>
        </section>

        {/* ---------------- qualification ---------------- */}
        <section className="band">
          <div className="shell">
            <div className="col">
              <h2 className="h2">
                You&rsquo;re probably here because of one of these.
              </h2>
            </div>

            {/* Statements and illustrations are paired grid ROWS, not two
                independent stacks — that is the only way the artwork stays
                level with the line it illustrates at every width. */}
            <div className="qual-grid">
              {QUALIFY.map((q, i) => (
                <div className="qual-row" key={q}>
                  <p className="qual-text">{q}</p>
                  <div className="qual-art">
                    <QualArt i={i} />
                  </div>
                </div>
              ))}
            </div>

            <div className="col">
              <p className="prose" style={{ marginTop: 34 }}>
                If any of that sounds like your business, you are in the right
                place, and the fix is usually not more ad spend.
              </p>
              <div className="cta-row" style={{ marginTop: 26 }}>
                <Chop href={WA.audit}>Find out if we&rsquo;re a fit</Chop>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- the diagnostic ----------------
            Was "Two things cost you customers", which told the reader what
            her problem was and then sold her the answer. She names it
            herself now, and the reading she gets back is the version she
            believes — because she supplied the evidence for it. It doubles
            as the lead form: the finished questionnaire leaves as a
            pre-written WhatsApp message. See lib/diagnostic.ts. */}
        <section className="band band-sunk" id="fix">
          <div className="shell">
            <h2 className="h2" style={{ maxWidth: "22ch" }}>
              Where is your business losing customers?
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
            <h2 className="h2" style={{ maxWidth: "20ch" }}>
              Find your business. We&rsquo;ve built this before.
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

        {/* ---------------- why it works ---------------- */}
        <section className="band band-sunk">
          <div className="shell">
            <h2 className="h2" style={{ maxWidth: "20ch" }}>
              Why it works.
            </h2>
            <p className="prose" style={{ marginTop: 22 }}>
              Most businesses buy traffic first and think about what happens to
              it afterwards. We build it the other way round.
            </p>
            <div className="works">
              {WHY_IT_WORKS.map((w) => (
                <div className="work-item" key={w.title}>
                  <h3 className="h3">{w.title}</h3>
                  <p className="prose" style={{ marginTop: 8 }}>
                    {w.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- why us ---------------- */}
        <section className="band">
          <div className="shell">
            <h2 className="h2" style={{ maxWidth: "20ch" }}>
              Why Blueprint.
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

        {/* ---------------- results OR the honest note ---------------- */}
        <section className="band band-sunk">
          <div className="shell">
            {results ? (
              <div className="col">
                {!RESULTS && (
                  <p className="sample-tag">Sample data, not real figures</p>
                )}
                <h2 className="h2">{results.headline}</h2>
                <p className="prose" style={{ marginTop: 18 }}>
                  {results.client} · {results.period}
                </p>
                <div className="res-grid">
                  {results.metrics.map((m) => (
                    <div className="res" key={m.label}>
                      <div className="res-value">{m.value}</div>
                      <div className="small res-label">{m.label}</div>
                    </div>
                  ))}
                </div>
                {results.note && (
                  <p className="small" style={{ marginTop: 22 }}>
                    {results.note}
                  </p>
                )}
              </div>
            ) : (
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
            )}
          </div>
        </section>

        {/* ---------------- how it runs ---------------- */}
        <section className="band">
          <div className="shell">
            <div className="col">
              <h2 className="h2">How it runs.</h2>
              <p className="prose" style={{ marginTop: 22 }}>
                Four stages. You are told what is happening at each one, in plain
                words, by the person doing it.
              </p>
              <div style={{ marginTop: 36 }}>
                {STEPS.map(([name, body], i) => (
                  <div className="step" key={name}>
                    <span className="step-n" aria-hidden="true">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="h3">{name}</h3>
                      <p className="prose" style={{ marginTop: 7 }}>
                        {body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- FAQ ---------------- */}
        <section className="band band-sunk" id="faq">
          <div className="shell">
            <div className="col">
              <h2 className="h2">Questions people actually ask.</h2>
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

      <footer className="foot">
        <div className="shell">
          <div className="foot-grid">
            <div>
              <div className="nav-brand">
                <span className="mark" aria-hidden="true">
                  B
                </span>
                <span className="nav-word">Blueprint</span>
              </div>
              <p className="small" style={{ marginTop: 12, maxWidth: "34ch" }}>
                Marketing and the systems that catch it, for Malaysian
                businesses.
              </p>
            </div>

            <div>
              <h2 className="foot-head">Bringing people in</h2>
              <ul className="foot-list">
                {attract.map((s) => (
                  <li key={s.id}>
                    <a className="foot-link" href="#services">
                      {s.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="foot-head">Keeping them</h2>
              <ul className="foot-list">
                {build.map((s) => (
                  <li key={s.id}>
                    <a className="foot-link" href="#services">
                      {s.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="foot-head">Talk to us</h2>
              <ul className="foot-list">
                <li>
                  <a
                    className="foot-link"
                    href={WA.general}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp {SITE.whatsappDisplay}
                  </a>
                </li>
                <li>
                  <a className="foot-link" href={`mailto:${SITE.email}`}>
                    {SITE.email}
                  </a>
                </li>
                <li>
                  <a className="foot-link" href="#faq">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="foot-base">
            <span className="small">
              © {new Date().getFullYear()} {SITE.legalName}
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
