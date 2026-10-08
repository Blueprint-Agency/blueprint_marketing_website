import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/ui/hero-dithering-card";
import { Nav, Footer } from "@/components/v2/Chrome";
import {
  DayRibbon,
  LeakCalc,
  WaHero,
  WaStory,
  type StoryStep,
} from "@/components/v2/WaArt";
import { SITE, WA } from "@/lib/site";

/**
 * /whatsapp-automation-for-local-businesses: the WhatsApp Automation
 * service. The first of the systems pages (user, 2026-10-08).
 *
 * A NEW TASTE, ON PURPOSE
 * -----------------------
 * The user asked for the systems pages to feel different from the
 * marketing ones rather than be another variant of them. So: a light
 * hero instead of the black one, a phone that plays a real conversation,
 * one enquiry followed start to finish beside a pinned phone, and a
 * calculator. The marketing pages argue; this one shows the thing working.
 *
 * WHAT THE USER CONFIRMED (2026-10-08)
 * ------------------------------------
 * - Built on the official WhatsApp Business Platform.
 * - Does all four: instant replies and FAQs, qualifying and routing,
 *   booking real slots in the chat, follow-ups and broadcasts.
 * - Set flows plus AI for open questions, plus a human.
 * - Replies in English, Malay and Chinese, and switches to whichever the
 *   customer writes in.
 * - Connects to calendars and booking systems, CRMs, and Google Sheets.
 * - Human handover through a shared team inbox and alerts to staff.
 * - Keeping an existing number depends on whether Meta allows that number
 *   onto the platform. Setup time is not stated.
 * - No price. Meta's conversation fees are billed separately.
 * - The demo is Blueprint's own main number, which runs the automation.
 *
 * NO CLIENT PROOF. Clients for this service prefer to stay anonymous and
 * no figures were supplied, so the page carries none: the demo is the
 * proof, and the calculator runs on the reader's own estimates.
 */

export const metadata: Metadata = {
  title: "WhatsApp Automation",
  description:
    "WhatsApp automation for local businesses in Malaysia, on the official WhatsApp Business Platform. Instant replies, qualifying, bookings in the chat, follow-ups, in English, Malay and Chinese. Try the demo on our own number.",
  alternates: { canonical: "/whatsapp-automation-for-local-businesses" },
  openGraph: {
    title: "WhatsApp Automation · Blueprint",
    description:
      "Every WhatsApp answered, even at 11pm. Message our own number and watch it work.",
    url: "/whatsapp-automation-for-local-businesses",
    type: "article",
  },
};

const STEPS: StoryStep[] = [
  {
    time: "11:42 PM",
    title: "She messages, late",
    body: "She asks the price and whether there is a slot tomorrow, half in Malay. Nobody at the business is awake.",
  },
  {
    time: "11:42 PM",
    title: "It answers in seconds, in her language",
    body: "The price and a straight answer, in the language she wrote in. English, Malay or Chinese.",
  },
  {
    time: "11:42 PM",
    title: "It asks what it needs to know",
    body: "Which branch, which service. A couple of taps, so the booking lands in the right place.",
  },
  {
    time: "11:43 PM",
    title: "It offers real slots and books one",
    body: "Slots come from your actual calendar. She taps one and it is confirmed inside the chat.",
  },
  {
    time: "11:43 PM",
    title: "It writes everything down",
    body: "The booking goes into your calendar, the contact into your CRM, a row into your Google Sheet. Nobody types it up the next morning.",
  },
  {
    time: "9:00 AM",
    title: "It follows up",
    body: "A reminder before the visit with the things people ask on the day. The ones who went quiet get a nudge instead.",
  },
  {
    time: "Any time",
    title: "A person takes over when it matters",
    body: "When a question needs judgement, it says so and hands the chat to whoever is on duty, with the whole conversation in front of them.",
  },
];

const TILES: {
  title: string;
  body: string;
  cls: string;
  demo: React.ReactNode;
}[] = [
  {
    title: "Instant replies and FAQs",
    body: "Prices, hours, location, parking, what to bring. Answered the moment she asks, at any hour.",
    cls: "t-faq",
    demo: (
      <span className="tile-chips">
        <i>Price list</i>
        <i>Opening hours</i>
        <i>How to get there</i>
      </span>
    ),
  },
  {
    title: "Qualifies and routes",
    body: "A few questions, then the lead goes to the right branch or the right person.",
    cls: "t-route",
    demo: (
      <span className="tile-route">
        <i>New enquiry</i>
        <b />
        <span>
          <i>Bangsar</i>
          <i>Puchong</i>
        </span>
      </span>
    ),
  },
  {
    title: "Books in the chat",
    body: "Real slots from your calendar, confirmed inside WhatsApp.",
    cls: "t-book",
    demo: (
      <span className="tile-chips is-slots">
        <i>11:00am</i>
        <i>2:30pm</i>
        <i className="is-on">6:00pm</i>
      </span>
    ),
  },
  {
    title: "Follow-ups and broadcasts",
    body: "Reminders before the visit, a nudge for the ones who went quiet, and campaigns to past customers.",
    cls: "t-follow",
    demo: (
      <span className="tile-queue">
        <i>
          <b>Tomorrow 9am</b> Reminder
        </i>
        <i>
          <b>In 3 days</b> Still interested?
        </i>
        <i>
          <b>Next month</b> New treatment
        </i>
      </span>
    ),
  },
  {
    title: "Speaks her language",
    body: "English, Malay and Chinese, and it replies in whichever one she writes in.",
    cls: "t-lang",
    demo: (
      <span className="tile-langs">
        <i>Ada slot esok?</i>
        <i>明天有位吗？</i>
        <i>Any slot tomorrow?</i>
      </span>
    ),
  },
  {
    title: "Connects to what you run",
    body: "Your calendar or booking system, your CRM, and Google Sheets.",
    cls: "t-connect",
    demo: (
      <span className="tile-chips">
        <i>Calendar</i>
        <i>CRM</i>
        <i>Google Sheets</i>
      </span>
    ),
  },
  {
    title: "Hands over to a person",
    body: "A shared inbox your whole team can answer from, and an alert to whoever is on duty.",
    cls: "t-hand",
    demo: (
      <span className="tile-chips">
        <i>Shared inbox</i>
        <i>Staff alert</i>
      </span>
    ),
  },
];

const FAQ: { q: string; a: string[] }[] = [
  {
    q: "Will it sound like a robot?",
    a: [
      "It is written in your voice, in short messages, the way your best front-desk person would reply. Anything it cannot answer well, it hands to your team instead of guessing.",
    ],
  },
  {
    q: "Will the AI make things up?",
    a: [
      "Prices, bookings and anything that must be exactly right run on set flows, not AI. The AI answers open questions only from information you have approved, and anything outside that goes to a person.",
    ],
  },
  {
    q: "Can my staff still reply themselves?",
    a: [
      "Yes. Every conversation sits in a shared inbox your team can answer from, and whoever is on duty gets an alert when a chat needs them. They can step into any conversation at any point.",
    ],
  },
  {
    q: "Can I keep my current WhatsApp number?",
    a: [
      "Often, but it depends on whether Meta allows that number onto the WhatsApp Business Platform. We check that before anything else.",
    ],
  },
  {
    q: "Which languages does it reply in?",
    a: [
      "English, Malay and Chinese. It replies in whichever language the customer writes in, and switches if she does.",
    ],
  },
  {
    q: "What does it connect to?",
    a: [
      "Your calendar or booking system, so the slots it offers are real. Your CRM, so every conversation becomes a contact. And Google Sheets, if that is where you like to see things.",
    ],
  },
  {
    q: "What does it cost?",
    a: [
      "It depends on the flows your business needs, so we quote after a conversation. Meta also charges its own per-conversation fees for the WhatsApp Business Platform, which are billed separately.",
    ],
  },
  {
    q: "How long does it take to set up?",
    a: [
      "It depends on how many flows you need and what it connects to. We map them with you first and give you a date then.",
    ],
  },
];

export default function WhatsAppAutomationPage() {
  return (
    <>
      <Nav />

      <main id="main" className="acc-wa">
        {/* ---------------- the opening ----------------
            Light, not the black of the marketing pages: the systems pages
            are the other half of the site and are allowed to look it. */}
        <section className="wa-open">
          <div className="shell wa-open-grid">
            <div>
              <Link className="back-link" href="/#services">
                All services
              </Link>
              <h1 className="h1" style={{ maxWidth: "17ch", marginTop: 34 }}>
                Every WhatsApp <em>answered</em>, even at 11pm.
              </h1>
              <p className="lead" style={{ marginTop: 22, maxWidth: "44ch" }}>
                It replies in seconds, books real slots inside the chat, follows
                up the ones who go quiet, and hands over to your team when a
                person is needed. In English, Malay or Chinese, whichever she
                writes in.
              </p>
              <div className="cta-row wa-actions">
                <a
                  className="btn btn-act"
                  href={WA.waDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Try the demo on WhatsApp
                </a>
                <a className="btn btn-line" href="#story">
                  Watch one enquiry
                </a>
              </div>
              <p className="wa-demo-note">
                Our own number runs on it. Message it and you are using the
                demo.
              </p>
            </div>
            <WaHero />
          </div>
        </section>

        {/* ---------------- when they message ---------------- */}
        <section className="band band-sunk">
          <div className="shell">
            {/* Centred, and no measure set: it breaks only when the screen
                is too narrow for one line, and the h2's balanced wrapping
                keeps the two halves even when it does. */}
            <h2 className="h2" style={{ textAlign: "center" }}>
              Can you reply your leads within <em>seconds</em>, at all times?
            </h2>
            <p
              className="prose"
              style={{
                marginTop: 22,
                marginInline: "auto",
                maxWidth: "62ch",
                textAlign: "center",
              }}
            >
              Lunch breaks, the ride home, 11pm in bed. A message that waits
              until morning gives her all night to book somewhere else.
            </p>
            <DayRibbon />
          </div>
        </section>

        {/* ---------------- the story ---------------- */}
        <section className="band" id="story">
          <div className="shell">
            <h2 className="h2" style={{ maxWidth: "18ch" }}>
              Watch one message become a <em>visit</em>.
            </h2>
            <WaStory steps={STEPS} />
          </div>
        </section>

        {/* ---------------- the calculator ---------------- */}
        <section className="band band-sunk" id="calculator">
          <div className="shell">
            <h2 className="h2" style={{ maxWidth: "18ch" }}>
              Work out the revenue you could <em>win back</em>.
            </h2>
            <p className="prose" style={{ marginTop: 22, maxWidth: "62ch" }}>
              Move the sliders to match your business. It works out how many
              bookings go elsewhere while a message waits for a reply.
            </p>
            <LeakCalc
              cta={
                <a
                  className="btn btn-act"
                  href={WA.waDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  See how fast ours answers
                </a>
              }
            />
          </div>
        </section>

        {/* ---------------- what it does ---------------- */}
        <section className="band">
          <div className="shell">
            <h2 className="h2" style={{ textAlign: "center" }}>
              Your front desk&rsquo;s favourite new <em>hire</em>.
            </h2>
            <div className="tiles">
              {TILES.map((t) => (
                <div className={`tile ${t.cls}`} key={t.title}>
                  <div className="tile-demo" aria-hidden="true">
                    {t.demo}
                  </div>
                  <h3 className="h3">{t.title}</h3>
                  <p className="prose">{t.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- the platform ---------------- */}
        <section className="band band-sunk">
          <div className="shell">
            <div className="wa-official">
              <div>
                <h2 className="h2" style={{ maxWidth: "18ch" }}>
                  Built on the official WhatsApp Business <em>Platform</em>.
                </h2>
              </div>
              <ul className="wa-official-list">
                <li>
                  <b>Meta&rsquo;s own API.</b> Not an unofficial tool that puts
                  your number at risk of being banned.
                </li>
                <li>
                  <b>One number, the whole team.</b> A shared inbox instead of
                  one phone passed around the front desk.
                </li>
                <li>
                  <b>Room to grow.</b> Broadcasts, templates and integrations
                  that the WhatsApp Business app on a phone cannot do.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ---------------- the demo ---------------- */}
        <section className="wa-demo">
          <div className="shell wa-demo-grid">
            <div>
              <p className="wa-demo-kicker">
                <span className="audit-dot" aria-hidden="true" />
                Live, any hour
              </p>
              <h2 className="h2">
                The demo is our own <em>number</em>.
              </h2>
              <p className="wa-demo-lead">
                Blueprint&rsquo;s WhatsApp runs on the same automation. Message
                it now, at any hour, ask it anything, and see how it answers and
                when it hands you to a person.
              </p>
              <a
                className="btn btn-act wa-demo-btn"
                href={WA.waDemo}
                target="_blank"
                rel="noopener noreferrer"
              >
                Message {SITE.whatsappDisplay}
              </a>
            </div>
            <ol className="wa-demo-try">
              <li>Ask what we do and what it costs</li>
              <li>Ask in Malay or Chinese</li>
              <li>Ask something only a person could answer</li>
            </ol>
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
                It answers the leads. The marketing brings them in:{" "}
                <Link href="/seo-for-local-businesses">SEO</Link>,{" "}
                <Link href="/google-ads-for-local-businesses">Google Ads</Link>{" "}
                and <Link href="/meta-ads-for-local-businesses">Meta Ads</Link>.
              </p>
            </div>
          </div>
        </section>

        <CTASection
          waHref={WA.waDemo}
          emailHref={`mailto:${SITE.email}`}
          phone={SITE.whatsappDisplay}
        />
      </main>

      <Footer />
    </>
  );
}
