import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/ui/hero-dithering-card";
import { BudgetFlow } from "@/components/v2/AdsDiagrams";
import { GoogleHero } from "@/components/v2/AdsHero";
import AuditCta from "@/components/v2/AuditCta";
import { Nav, Footer } from "@/components/v2/Chrome";
import {
  RevenueLadder,
  SearchPath,
  SeoJobArt,
  SiteTree,
} from "@/components/v2/SeoArt";
import { SITE, WA } from "@/lib/site";

/**
 * /google-ads-for-local-businesses: the Google Ads service.
 *
 * Built 2026-10-07 in the SEO page's format at the user's request: the
 * same sections in the same order, the same revenue position, the same
 * diagrams fed different content. Read the note at the top of
 * app/seo-for-local-businesses/page.tsx first; everything it says about
 * the position and about what may not be claimed applies here.
 *
 * WHERE THE CONTENT CAME FROM
 * ---------------------------
 * The `sem` entry in lib/services.ts: Search, Shopping and Performance Max,
 * keyword and negative-keyword discipline, landing pages built for the
 * campaign, optimisation against what converts, and the line that paid
 * search is the faster tool and a way to test what converts before
 * building SEO around it. There is no Google Ads pitch on record the way
 * there is for SEO, so nothing here goes past that entry plus the revenue
 * position.
 *
 * THE FREE AUDIT for Google Ads is the user's offer, confirmed 2026-10-07,
 * as are the weekly negative keywords and the ad budget being paid to
 * Google separately from our fee.
 *
 * No budget figure, cost per click, return on ad spend or guarantee
 * appears anywhere. PRODUCT.md records none.
 */

export const metadata: Metadata = {
  title: "Google Ads",
  description:
    "Google Ads for local businesses in Malaysia, measured on the revenue the spend brings back rather than clicks. Search and Performance Max campaigns, landing pages built for each ad, every lead matched to a booking.",
  alternates: { canonical: "/google-ads-for-local-businesses" },
  openGraph: {
    title: "Google Ads · Blueprint",
    description:
      "Google Ads measured on revenue, not clicks. Every lead matched to a booking, campaign by campaign.",
    url: "/google-ads-for-local-businesses",
    type: "article",
  },
};

const JOBS: { id: string; tag: string; title: string; body: string }[] = [
  {
    id: "g-buy",
    tag: "01",
    title: "Buying the right searches",
    body: "Search, Shopping and Performance Max campaigns built around what you actually sell. Keywords chosen for intent, and negative keywords added every week so the budget stops paying for people who were never going to book.",
  },
  {
    id: "g-page",
    tag: "02",
    title: "A page built for the ad",
    body: "An ad that says “facial in Bangsar, book tonight” should land on a page that says the same thing, with the price and a WhatsApp button, not on your homepage. Each campaign gets a landing page built for it.",
  },
  {
    id: "g-opt",
    tag: "03",
    title: "Optimising against bookings",
    body: "Every WhatsApp tap, call and form is sent back to Google as a conversion, so the account learns from leads rather than clicks. Search terms that never turn into bookings are cut, and the budget moves to the ones that do.",
  },
];

const BUILT: { kind: string; body: string }[] = [
  {
    kind: "Search campaigns",
    body: "One ad group per service and area, so the ad someone sees matches the words they typed.",
  },
  {
    kind: "Performance Max and Shopping",
    body: "Where they fit your business: the photos, videos and headlines Google mixes across Search, Maps and YouTube.",
  },
  {
    kind: "Landing pages",
    body: "A page for each campaign, saying what the ad said, with one obvious next step.",
  },
  {
    kind: "Negative keywords",
    body: "The list of searches you will never pay for again, reviewed against the search terms report every week.",
  },
  {
    kind: "Conversion tracking",
    body: "WhatsApp taps, calls and forms counted as leads, and bookings matched back to the campaign they came from.",
  },
];

const FAQ: { q: string; a: string[] }[] = [
  {
    q: "How do you know which bookings came from ads?",
    a: [
      "Every WhatsApp tap, call and form on the landing page is tracked and sent back to Google Ads, so each lead arrives labelled with the campaign and search term it came from.",
      "Then once a month we sit with whoever answers your WhatsApp and match those leads against the bookings. That match is what turns a click count into a revenue figure.",
    ],
  },
  {
    q: "How much should I spend?",
    a: [
      "There is no figure that suits every business. We look at the searches in your area and what they cost before suggesting where to start, and the ad budget is paid to Google separately from our fee.",
    ],
  },
  {
    q: "Should I run Google Ads or do SEO?",
    a: [
      "Ads put you in front of someone searching this afternoon; SEO takes months to build and keeps paying once it does. Ads are also the quickest way to find out which services convert before committing to build pages around them, so ads are a sensible place to start, with SEO grown behind them.",
    ],
  },
  {
    q: "Do you guarantee results?",
    a: [
      "No. Nobody controls the auction. What we commit to is reporting honestly every month, in revenue as well as in clicks, so you can see whether the spend is paying for itself.",
    ],
  },
  {
    q: "What do you need from me?",
    a: [
      "Access to your Google Ads account if you have one, your website, and someone on your side who can sit with us once a month to match leads to bookings.",
    ],
  },
];

export default function GoogleAdsPage() {
  return (
    <>
      <Nav />

      <main id="main" className="acc-gads">
        <section className="svc-open">
          <div className="shell seo-hero">
            <div>
              <Link className="back-link" href="/#services">
                All services
              </Link>
              <p className="eyebrow svc-eyebrow">Google Ads</p>
              <h1 className="h1" style={{ maxWidth: "20ch" }}>
                Google Ads measured in <em>revenue</em>, not clicks.
              </h1>
              <p className="lead svc-lead">
                Most ad reports stop at clicks and cost per click. Ours end at
                the bookings your team closed and what they were worth, campaign
                by campaign.
              </p>
              <div className="cta-row svc-actions">
                <a
                  className="btn btn-act"
                  href={WA.googleAds}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ask us to look at your ads
                </a>
                <a className="btn btn-ghost-dark" href="#revenue">
                  How we measure it
                </a>
              </div>
            </div>
            <GoogleHero />
          </div>
        </section>

        <section className="band" id="revenue">
          <div className="shell seo-split">
            <div>
              <p className="eyebrow">What makes us different</p>
              <h2 className="h2" style={{ maxWidth: "16ch" }}>
                We track the hardest number: <em>revenue</em>.
              </h2>
              <p className="prose" style={{ marginTop: 22 }}>
                Impressions, clicks and cost per click are what Google Ads puts
                on the front page, so they are what most reports send. None of
                them tells you whether the money you spent came back.
              </p>
              <p className="prose" style={{ marginTop: 16 }}>
                So we keep going. Every tap on the landing page is tracked to
                the campaign and search term it came from, and every month we
                sit with your team and match those leads to real bookings. Our
                success is measured on the revenue your ad spend brings back.
              </p>
            </div>
            <RevenueLadder
              them="Where most ad reports stop"
              rungs={[
                { name: "Impressions", note: "Who saw the ad" },
                { name: "Clicks", note: "Who came through" },
                { name: "Cost per click", note: "What each one cost" },
                { name: "Leads", note: "WhatsApp, calls, forms" },
                { name: "Bookings", note: "Matched with your team" },
                { name: "Revenue", note: "Against what you spent" },
              ]}
            />
          </div>
        </section>

        <section className="band band-sunk">
          <div className="shell">
            <p className="eyebrow">Where the budget goes</p>
            <h2 className="h2" style={{ maxWidth: "20ch" }}>
              Three searches. Only one is ready to <em>book</em>.
            </h2>
            <BudgetFlow />
            <p className="prose" style={{ marginTop: 34, maxWidth: "62ch" }}>
              The first thing we check is which of these your budget is actually
              buying. The search terms report shows the real words people typed
              before they clicked, and it is where we look for waste first.
            </p>
          </div>
        </section>

        <AuditCta
          heading={
            <>
              Get a free Google Ads audit <em>now</em>.
            </>
          }
          lead="Send us your website. We will look at which searches you are paying for, and where those clicks go after they land."
          checks={[
            "Which searches your budget is actually buying",
            "The search terms that never turn into bookings",
            "Whether each landing page matches its ad",
            "Whether calls and WhatsApp taps count as conversions",
          ]}
          message="Hi Blueprint, I'd like a free Google Ads audit. My website is: "
        />

        <section className="band">
          <div className="shell">
            <p className="eyebrow">The whole way there</p>
            <h2 className="h2" style={{ maxWidth: "20ch" }}>
              From an ad click to money in the <em>bank</em>.
            </h2>
            <p className="prose" style={{ marginTop: 22, maxWidth: "62ch" }}>
              The ad covers the first two steps. The other four decide whether
              the click turns into revenue, so the work covers all six.
            </p>
            <SearchPath
              steps={[
                {
                  title: "She searches",
                  body: "“facial bangsar open now”. She wants it today.",
                },
                {
                  title: "She sees your ad",
                  body: "At the top of the page, above the free results.",
                },
                {
                  title: "She lands on its page",
                  body: "Built for that ad, not your homepage.",
                },
                {
                  title: "She taps WhatsApp",
                  body: "That tap is a lead, and Google is told so.",
                },
                {
                  title: "You book her",
                  body: "Your team replies and fixes the slot.",
                },
                {
                  title: "It shows as revenue",
                  body: "Set against what the click cost.",
                },
              ]}
              owners={[
                "Google Ads: being there first",
                "Landing page: turning the click into a tap",
                "Your team",
                "We report it",
              ]}
            />
          </div>
        </section>

        <section className="band band-sunk">
          <div className="shell">
            <h2 className="h2" style={{ maxWidth: "18ch" }}>
              Clicks are one of <em>three</em> jobs.
            </h2>
            <div className="jb">
              {JOBS.map((j) => (
                <div className="jb-item" key={j.id}>
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

        <section className="band">
          <div className="shell">
            <p className="eyebrow">What gets built</p>
            <h2 className="h2" style={{ maxWidth: "20ch" }}>
              An account built around what you <em>sell</em>.
            </h2>
            <SiteTree
              root="Your Google Ads account"
              tags={["Search", "PMax"]}
              branches={[
                {
                  name: "Search",
                  pages: ["facial bangsar", "facial near me", "facial puchong"],
                },
                {
                  name: "Performance Max",
                  pages: ["Photos", "Videos", "Headlines"],
                },
                {
                  name: "Landing pages",
                  pages: ["/facial-bangsar", "/facial-puchong", "/first-visit"],
                },
                {
                  name: "Tracking",
                  pages: ["WhatsApp taps", "Calls", "Bookings"],
                },
              ]}
            />
            <dl className="seo-pages">
              {BUILT.map((p) => (
                <div className="seo-page" key={p.kind}>
                  <dt className="h3">{p.kind}</dt>
                  <dd className="prose">{p.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

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
                Want the searches that keep paying after the ads stop?{" "}
                <Link href="/seo-for-local-businesses">See how we do SEO</Link>.
              </p>
            </div>
          </div>
        </section>

        <CTASection
          waHref={WA.googleAds}
          emailHref={`mailto:${SITE.email}`}
          phone={SITE.whatsappDisplay}
        />
      </main>

      <Footer />
    </>
  );
}
