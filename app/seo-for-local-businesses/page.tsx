import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/ui/hero-dithering-card";
import AuditCta from "@/components/v2/AuditCta";
import { Nav, Footer } from "@/components/v2/Chrome";
import {
  HeroReport,
  RevenueLadder,
  SearchPath,
  SeoJobArt,
  SiteTree,
  TypedQuery,
} from "@/components/v2/SeoArt";
import { SITE, WA } from "@/lib/site";

/**
 * /seo-for-local-businesses: the Google SEO service.
 *
 * WHERE THIS CAME FROM
 * --------------------
 * Written 2026-10-07 from the Sans Wellness SEO pitch, which is the fullest
 * statement of how we sell and run SEO. What came across is the method:
 * the split between people who searched your name and people who did not,
 * SEO / AEO / CRO as three jobs, the page types, and matching leads to
 * bookings with the client's own team.
 *
 * THE POSITION (user's instruction, 2026-10-07)
 * ---------------------------------------------
 * What separates us from other SEO agencies is the number we are judged
 * on: revenue, not rankings, traffic or clicks. That is why the ladder sits
 * second, straight after the hero, and why the hero's drawing is a report
 * that ends in revenue. Every other section is in service of that claim.
 *
 * The same day the user cut the Malay-language section and the six-stage
 * "order of work" list. The language point survives as the EN / BM / 中文
 * layer on the site map and a row in the page list.
 *
 * WHAT DID NOT COME ACROSS, AND WHY
 * ---------------------------------
 * - Sans's own figures and the competitor tables. Sans is a prospect, not a
 *   client, and its numbers are not ours to publish. PRODUCT.md: no
 *   borrowed proof.
 * - KPI targets ("+10% a month"). A promise to one business after seeing its
 *   data; on a public page it reads as a guarantee to everyone.
 * - The price. lib/services.ts records none for SEO.
 *
 * The drawings carry shapes, not values. See SeoArt.tsx.
 */

export const metadata: Metadata = {
  title: "Google SEO",
  description:
    "SEO for local businesses in Malaysia, measured on the revenue it brings in rather than rankings or traffic. Pages for every service, branch and nearby town, in English, Malay and Chinese.",
  alternates: { canonical: "/seo-for-local-businesses" },
  openGraph: {
    title: "Google SEO · Blueprint",
    description:
      "SEO measured on revenue, not rankings. Every lead matched to a booking, outlet by outlet.",
    url: "/seo-for-local-businesses",
    type: "article",
  },
};

const SEARCHES: { who: string; query: string; body: string; you?: boolean }[] = [
  {
    who: "Knows you",
    query: "your name bangsar",
    body: "A returning customer, or someone a friend sent. They would have found you anyway.",
    you: true,
  },
  {
    who: "Does not know you",
    query: "facial bangsar",
    body: "Somebody nearby who wants it this week and has not picked a place. Whoever Google shows first gets the first look.",
  },
  {
    who: "Does not know you",
    query: "facial spa near me",
    body: "Somebody ready to book, choosing between whatever is on the screen. No page for the service, no place on it.",
  },
];

const JOBS: { id: string; tag: string; title: string; body: string }[] = [
  {
    id: "seo",
    tag: "SEO",
    title: "Getting found on Google",
    body: "Pages written for what people actually type, one for each service and each branch. A site that loads fast on a phone. Your Google Business Profile cleaned up for every outlet, so the map listing and the page agree.",
  },
  {
    id: "aeo",
    tag: "AEO",
    title: "Getting named by AI",
    body: "More people now ask ChatGPT, or read Google's AI answer, before they click anything. Those answers quote pages that say plainly where you are, what it costs and who each service suits. We write that down and mark the page up so an AI can read it.",
  },
  {
    id: "cro",
    tag: "CRO",
    title: "Turning visits into bookings",
    body: "Every WhatsApp tap, call tap and booking button is tracked. The booking flow is tested on a phone. Pages that get read and not acted on are found and fixed, because a page that ranks and converts nobody is a cost.",
  },
];

const PAGES: { kind: string; body: string }[] = [
  {
    kind: "Services",
    body: "One page for each thing you sell. The gap we look for first: a business that sells seven services and has a page for none of them.",
  },
  {
    kind: "Branches",
    body: "One page per outlet: address, hours, prices, who is there and how to get there.",
  },
  {
    kind: "Nearby towns",
    body: "Pages for the areas your customers come from where you have no branch.",
  },
  {
    kind: "Guides",
    body: "The questions people ask before they choose, answered, and linked to the page that books them.",
  },
  {
    kind: "Every language",
    body: "Malay customers type urut, not massage. Keyword research is done separately for English, Malay and Chinese, and every page is written for that searcher rather than translated.",
  },
];

const FAQ: { q: string; a: string[] }[] = [
  {
    q: "How do you know which bookings came from search?",
    a: [
      "Every WhatsApp tap, call tap and booking button on the site is tracked, so each lead arrives labelled with the page it came from.",
      "Then once a month we sit with whoever answers your WhatsApp and match those leads against the bookings, outlet by outlet. That match is what turns a click count into a revenue figure.",
    ],
  },
  {
    q: "Do I need a new website?",
    a: [
      "Not always. If the site is slow, hard to edit or missing the pages people search for, we rebuild it, and every existing address is redirected so nothing you already rank for is lost.",
    ],
  },
  {
    q: "How long before it shows?",
    a: [
      "SEO builds over months rather than switching on. We start with the branch pages and Google listings, because the people searching with an area in mind are the ones ready to book. If you need enquiries this week, Google Ads is the faster tool, and we run that too.",
    ],
  },
  {
    q: "Do you guarantee rankings?",
    a: [
      "No, and be wary of anyone who does: nobody controls Google. What we commit to is reporting honestly every month, in revenue as well as in rankings, so you can see whether it is paying for itself.",
    ],
  },
  {
    q: "What do you need from me?",
    a: [
      "Your branch list with addresses and opening hours, access to your website and Google account, and someone on your side who can sit with us once a month to match leads to bookings.",
    ],
  },
];

export default function SeoPage() {
  return (
    <>
      <Nav />

      <main id="main">
        {/* ---------------- the opening ----------------
            Copy left, the report it ends in on the right. Two actions: the
            WhatsApp thread, and a jump to the ladder for the reader who
            wants the argument before the conversation. */}
        <section className="svc-open">
          <div className="shell seo-hero">
            <div>
              <Link className="back-link" href="/#services">
                All services
              </Link>
              <p className="eyebrow svc-eyebrow">Google SEO</p>
              <h1 className="h1" style={{ maxWidth: "15ch" }}>
                SEO measured in <em>revenue</em>, not rankings.
              </h1>
              <p className="lead svc-lead">
                Most SEO reports stop at traffic and clicks. Ours end at the
                bookings your team closed and what they were worth, outlet by
                outlet.
              </p>
              <div className="cta-row svc-actions">
                <a
                  className="btn btn-act"
                  href={WA.seo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ask us to look at your search traffic
                </a>
                <a className="btn btn-ghost-dark" href="#revenue">
                  How we measure it
                </a>
              </div>
            </div>
            <HeroReport />
          </div>
        </section>

        {/* ---------------- the difference ----------------
            The claim the page is built on, second, before the method. */}
        <section className="band" id="revenue">
          <div className="shell seo-split">
            <div>
              <p className="eyebrow">What makes us different</p>
              <h2 className="h2" style={{ maxWidth: "16ch" }}>
                We track the hardest number: <em>revenue</em>.
              </h2>
              <p className="prose" style={{ marginTop: 22 }}>
                Rankings, traffic and clicks are easy to report and easy to
                make look good. None of them pays your rent. An SEO report that
                stops there cannot tell you whether the work is worth what it
                costs.
              </p>
              <p className="prose" style={{ marginTop: 16 }}>
                So we keep going. Every tap on your site is tracked to the page
                it came from, and every month we sit with your team and match
                those leads to real bookings. Our success is measured on the
                revenue that search brings you, not on a position in Google.
              </p>
            </div>
            <RevenueLadder />
          </div>
        </section>

        {/* ---------------- three searches ---------------- */}
        <section className="band band-sunk">
          <div className="shell">
            <p className="eyebrow">Where the new customers are</p>
            <h2 className="h2" style={{ maxWidth: "20ch" }}>
              Three searches. Your name is in only the <em>first</em>.
            </h2>
            <div className="seo-searches">
              {SEARCHES.map((s, i) => (
                <div
                  className={`note seo-search ${s.you ? "" : "is-new"}`}
                  key={i}
                >
                  <p className="eyebrow seo-who">{s.who}</p>
                  <TypedQuery query={s.query} />
                  <p className="prose" style={{ marginTop: 16 }}>
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
            <p className="prose" style={{ marginTop: 34, maxWidth: "62ch" }}>
              The first thing we check is how your Google visitors split
              between the first search and the other two, and which competitors
              are collecting the other two in your area. That gap is where the
              new revenue is.
            </p>
          </div>
        </section>

        {/* ---------------- mid-page action ---------------- */}
        {/* The free audit is the user's offer, confirmed 2026-10-07, and
            the only place on the site that promises one. See AuditCta. */}
        <AuditCta />

        {/* ---------------- the path ---------------- */}
        <section className="band">
          <div className="shell">
            <p className="eyebrow">The whole way there</p>
            <h2 className="h2" style={{ maxWidth: "20ch" }}>
              From a search to money in the <em>bank</em>.
            </h2>
            <p className="prose" style={{ marginTop: 22, maxWidth: "62ch" }}>
              Ranking covers the first two steps. The other four decide
              whether it turns into revenue, so the work covers all six.
            </p>
            <SearchPath />
          </div>
        </section>

        {/* ---------------- the three jobs ---------------- */}
        <section className="band band-sunk">
          <div className="shell">
            <h2 className="h2" style={{ maxWidth: "18ch" }}>
              Ranking is one of <em>three</em> jobs.
            </h2>
            <div className="jb">
              {JOBS.map((j) => (
                <div className="jb-item" key={j.tag}>
                  <span className="jb-n mono" aria-hidden="true">
                    {j.tag}
                  </span>
                  <div>
                    <h3 className="h3">{j.title}</h3>
                    <p className="prose" style={{ marginTop: 8 }}>
                      {j.body}
                    </p>
                  </div>
                  <SeoJobArt id={j.id} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- what gets built ---------------- */}
        <section className="band">
          <div className="shell">
            <p className="eyebrow">What gets built</p>
            <h2 className="h2" style={{ maxWidth: "20ch" }}>
              A page for every reason someone would <em>search</em>.
            </h2>
            <SiteTree />
            <dl className="seo-pages">
              {PAGES.map((p) => (
                <div className="seo-page" key={p.kind}>
                  <dt className="h3">{p.kind}</dt>
                  <dd className="prose">{p.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ---------------- questions ---------------- */}
        <section className="band band-sunk" id="faq">
          <div className="shell">
            <div className="col">
              <h2 className="h2">
                Questions owners <em>ask</em>.
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
              <p className="prose" style={{ marginTop: 28 }}>
                If the site needs rebuilding first, we do that too.{" "}
                <Link href="/services/web-design">
                  See a rebuild that kept every address it already ranked for
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        <CTASection
          waHref={WA.seo}
          emailHref={`mailto:${SITE.email}`}
          phone={SITE.whatsappDisplay}
        />
      </main>

      <Footer />
    </>
  );
}
