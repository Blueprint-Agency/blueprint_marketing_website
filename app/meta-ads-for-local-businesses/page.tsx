import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/ui/hero-dithering-card";
import { FatigueChart } from "@/components/v2/AdsDiagrams";
import { MetaHero } from "@/components/v2/AdsHero";
import AuditCta from "@/components/v2/AuditCta";
import { Nav, Footer } from "@/components/v2/Chrome";
import { MetaMark } from "@/components/v2/Marks";
import {
  RevenueLadder,
  SearchPath,
  SeoJobArt,
  SiteTree,
  TypedQuery,
} from "@/components/v2/SeoArt";
import { SITE, WA } from "@/lib/site";

/**
 * /meta-ads-for-local-businesses: the Meta (Facebook and Instagram) ads
 * service.
 *
 * Built 2026-10-07 in the SEO page's format at the user's request, beside
 * the Google Ads page. Read the note at the top of
 * app/seo-for-local-businesses/page.tsx first; the position and the limits
 * on what may be claimed apply here unchanged.
 *
 * WHERE THE CONTENT CAME FROM
 * ---------------------------
 * The `meta` entry in lib/services.ts: creative built for the platform
 * rather than resized from a poster; interest, behaviour and lookalike
 * targeting; a full-funnel structure from first view to enquiry; continuous
 * creative testing because creative is what fatigues. And its framing:
 * search captures people who already want something, Meta creates the want.
 * Nothing here goes past that entry plus the revenue position.
 *
 * Where Google Ads has three searches, this page has three audiences. A
 * feed has no query, so the typed box carries the audience's name instead,
 * with the Meta mark in place of Google's.
 *
 * THE FREE AUDIT for Meta ads is the user's offer, confirmed 2026-10-07.
 *
 * CREATIVE IS NOT INCLUDED (user, 2026-10-07). Video and photo can be made
 * by us at a separate charge, or by the client's own content team with us
 * briefing it. Nothing here may say the ads fee includes production.
 */

export const metadata: Metadata = {
  title: "Meta Ads",
  description:
    "Facebook and Instagram ads for local businesses in Malaysia, measured on the revenue they bring in rather than reach or likes. Creative made for the feed, audiences for every stage, every message matched to a booking.",
  alternates: { canonical: "/meta-ads-for-local-businesses" },
  openGraph: {
    title: "Meta Ads · Blueprint",
    description:
      "Facebook and Instagram ads measured on revenue, not likes. Every message matched to a booking.",
    url: "/meta-ads-for-local-businesses",
    type: "article",
  },
};

const AUDIENCES: { who: string; query: string; body: string; hot?: boolean }[] =
  [
    {
      who: "Never heard of you",
      query: "into skincare",
      body: "Gets the video of the real room and the real people. That is what earns a second look from a stranger.",
    },
    {
      who: "Has seen you",
      query: "watched your video",
      body: "Watched most of a video or visited the site. Gets the price, the first-visit offer and a reason to book this week.",
    },
    {
      who: "Nearly booked",
      query: "messaged, not booked",
      body: "Started a conversation and went quiet. Gets reminded, with the answer to whatever stopped her.",
      hot: true,
    },
  ];

const JOBS: { id: string; tag: string; title: string; body: string }[] = [
  {
    id: "m-creative",
    tag: "01",
    title: "Creative made for the feed",
    body: "On a feed, the creative is the ad, so it is made for the platform rather than resized from a poster: short video of the real place and the real people, cut for feed, stories and reels. We can make it, or brief your own content team.",
  },
  {
    id: "m-audience",
    tag: "02",
    title: "The right people, then again",
    body: "Interest, behaviour and lookalike audiences reach people who have never heard of you. Retargeting follows up the ones who watched, visited or messaged. One structure from first view to enquiry.",
  },
  {
    id: "m-opt",
    tag: "03",
    title: "Tested against bookings",
    body: "Creative tires, so it is tested continuously. Each ad is judged on the bookings it brings rather than the likes, and replaced when it starts to tire.",
  },
];

const BUILT: { kind: string; body: string }[] = [
  {
    kind: "Cold campaigns",
    body: "Interest, behaviour and lookalike audiences around your outlets, shown the creative that introduces you.",
  },
  {
    kind: "Retargeting",
    body: "Video viewers, site visitors and people who messaged without booking, each shown something different.",
  },
  {
    kind: "Creative",
    body: "Video and photo for each placement, made by us or by your content team, with new versions ready before the current ones tire.",
  },
  {
    kind: "Message flow",
    body: "Ads that open WhatsApp or Messenger with a first message ready, so tapping the ad starts a conversation.",
  },
  {
    kind: "Tracking",
    body: "The Meta pixel and conversion tracking set up properly, and every message matched back to the ad it came from.",
  },
];

const FAQ: { q: string; a: string[] }[] = [
  {
    q: "How do you know which bookings came from Meta?",
    a: [
      "Every message and every tap on the site is tracked back to the ad that started it, so each lead arrives labelled with its campaign and creative.",
      "Then once a month we sit with whoever answers your WhatsApp and match those leads against the bookings. That match is what turns a like count into a revenue figure.",
    ],
  },
  {
    q: "Should I run Meta ads or Google Ads?",
    a: [
      "They do different jobs. Google catches people who already know they want what you sell. Meta creates the want, in someone who was not looking: it is where a treatment, a product or a studio gets discovered. Running both covers the people already looking and creates more of them.",
    ],
  },
  {
    q: "Do you make the videos?",
    a: [
      "We can, and it is charged separately from running the ads. Or we work with your own content team: we brief what each ad needs, they shoot it, and we test what they make.",
      "Either way, good footage of the real place, the real people and the real work does more than anything stock.",
    ],
  },
  {
    q: "How much should I spend?",
    a: [
      "There is no figure that suits every business. We look at your area and your audience before suggesting where to start, and the ad budget is paid to Meta separately from our fee.",
    ],
  },
  {
    q: "Do you guarantee results?",
    a: [
      "No. Nobody controls the auction. What we commit to is reporting honestly every month, in revenue as well as in reach, so you can see whether the spend is paying for itself.",
    ],
  },
  {
    q: "What do you need from me?",
    a: [
      "Access to your Facebook page and ad account, your website, and someone on your side who can sit with us once a month to match leads to bookings.",
    ],
  },
];

export default function MetaAdsPage() {
  return (
    <>
      <Nav />

      <main id="main" className="acc-meta">
        <section className="svc-open">
          <div className="shell seo-hero">
            <div>
              <Link className="back-link" href="/#services">
                All services
              </Link>


              <h1 className="h1" style={{ maxWidth: "18ch", marginTop: 34 }}>
                Meta ads measured in <em>revenue</em>, not likes.
              </h1>
              <p className="lead svc-lead">
                Most Facebook and Instagram reports stop at reach and
                engagement. Ours end at the bookings your team closed and what
                they were worth.
              </p>
              <div className="cta-row svc-actions">
                <a
                  className="btn btn-act"
                  href={WA.metaAds}
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
            <MetaHero />
          </div>
        </section>

        <section className="band" id="revenue">
          <div className="shell seo-split">
            <div>
              <h2 className="h2" style={{ maxWidth: "16ch" }}>
                We track the hardest number: <em>revenue</em>.
              </h2>
              <p className="prose" style={{ marginTop: 22 }}>
                Reach, likes and engagement are what Ads Manager puts on the
                front page, and they are easy to make look good. None of them
                tells you whether the money you spent came back.
              </p>
              <p className="prose" style={{ marginTop: 16 }}>
                So we keep going. Every message is tracked to the ad that
                started it, and every month we sit with your team and match
                those leads to real bookings. Our success is measured on the
                revenue your ad spend brings back.
              </p>
            </div>
            <RevenueLadder
              them="Where most Meta reports stop"
              rungs={[
                { name: "Reach", note: "Who saw it" },
                { name: "Engagement", note: "Likes, comments, shares" },
                { name: "Clicks", note: "Who tapped through" },
                { name: "Leads", note: "Messages and enquiries" },
                { name: "Bookings", note: "Matched with your team" },
                { name: "Revenue", note: "Against what you spent" },
              ]}
            />
          </div>
        </section>

        <section className="band band-sunk">
          <div className="shell">
            <h2 className="h2" style={{ maxWidth: "20ch" }}>
              Three audiences, three different <em>ads</em>.
            </h2>
            <div className="seo-searches is-funnel">
              {AUDIENCES.map((s, i) => (
                <div
                  className={`note seo-search ${s.hot ? "is-new" : ""}`}
                  key={i}
                >
                  <p className="eyebrow seo-who">{s.who}</p>
                  <TypedQuery query={s.query} icon="meta" />
                  <p className="prose" style={{ marginTop: 16 }}>
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
            <p className="prose" style={{ marginTop: 34, maxWidth: "62ch" }}>
              One ad shown to everyone talks to none of them properly. The first
              thing we check is whether your ads speak to these three people
              differently, and whether anyone is following up the ones who
              already messaged.
            </p>
          </div>
        </section>

        {/* ---------------- creative fatigue ----------------
            The section only this page has. See AdsDiagrams.tsx. */}
        <section className="band">
          <div className="shell">
            <div className="col">
              <h2 className="h2" style={{ maxWidth: "18ch" }}>
                Every ad <em>tires</em>. We plan for it.
              </h2>
              <p className="prose" style={{ marginTop: 22 }}>
                The same people see the same ad, and each time it does a little
                less. Left alone, the budget keeps going to it after it has
                stopped bringing bookings.
              </p>
              <p className="prose" style={{ marginTop: 16 }}>
                So the next version is made before the current one tires, and
                swapped in when its bookings start to slide, not after they have
                gone.
              </p>
            </div>
            <FatigueChart />
          </div>
        </section>

        <AuditCta
          heading={
            <>
              Get a free Meta ads audit <em>now</em>.
            </>
          }
          lead="Send us your website or your Facebook page. We will look at what your ads are paying for, and whether any of it is turning into bookings."
          checks={[
            "Which ads bring messages, not just likes",
            "Whether your audiences overlap and bid against each other",
            "Which creative has tired out",
            "Whether messages are tracked through to bookings",
          ]}
          message="Hi Blueprint, I'd like a free Meta ads audit. My website or page is: "
          fieldIcon={<MetaMark size={16} />}
        />

        <section className="band">
          <div className="shell">
            <h2 className="h2" style={{ maxWidth: "20ch" }}>
              From a scroll to money in the <em>bank</em>.
            </h2>
            <p className="prose" style={{ marginTop: 22, maxWidth: "62ch" }}>
              The ad covers the first two steps. The other four decide whether
              the attention turns into revenue, so the work covers all six.
            </p>
            <SearchPath
              steps={[
                {
                  title: "She scrolls",
                  body: "Instagram, at night. She is not looking for anything.",
                },
                {
                  title: "Your ad stops her",
                  body: "The real room and the real people, cut for the feed.",
                },
                {
                  title: "She taps Send message",
                  body: "WhatsApp opens with a first message ready.",
                },
                {
                  title: "She gets an answer",
                  body: "Quickly, while she is still interested.",
                },
                {
                  title: "You book her",
                  body: "Your team closes and fixes the slot.",
                },
                {
                  title: "It shows as revenue",
                  body: "Matched back to the ad that started it.",
                },
              ]}
              owners={[
                "Creative and targeting: stopping her",
                "The message: turning interest into a lead",
                "Your team",
                "We report it",
              ]}
            />
          </div>
        </section>

        <section className="band band-sunk">
          <div className="shell">
            <h2 className="h2" style={{ maxWidth: "18ch" }}>
              Reach is one of <em>three</em> jobs.
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
            <h2 className="h2" style={{ maxWidth: "20ch" }}>
              A campaign for every stage of the <em>decision</em>.
            </h2>
            <SiteTree
              root="Your Meta ad account"
              tags={["Facebook", "Instagram"]}
              branches={[
                { name: "Cold", pages: ["Interests", "Lookalikes", "Broad"] },
                {
                  name: "Warm",
                  pages: ["Video viewers", "Site visitors", "Page engagers"],
                },
                {
                  name: "Hot",
                  pages: [
                    "Messaged, not booked",
                    "Past customers",
                    "Booking page visitors",
                  ],
                },
                {
                  name: "Creative",
                  pages: ["Feed video", "Stories and reels", "Carousel"],
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
                The ad is only as good as the footage in it.{" "}
                <Link href="/services/video-production">
                  Watch the films we make
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        <CTASection
          waHref={WA.metaAds}
          emailHref={`mailto:${SITE.email}`}
          phone={SITE.whatsappDisplay}
        />
      </main>

      <Footer />
    </>
  );
}
