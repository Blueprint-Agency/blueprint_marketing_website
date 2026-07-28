import Link from "next/link";
import Gate from "@/components/Gate";
import { Nav, Footer, StickyChop, WhatsAppGlyph } from "@/components/Chrome";
import { CLIENTS } from "@/lib/clients";
import { WA } from "@/lib/site";

const AWNING: Record<string, string> = {
  tarp: "repeating-linear-gradient(90deg,var(--color-tarp) 0 18px,var(--color-tarp-pale) 18px 36px)",
  pink: "repeating-linear-gradient(90deg,var(--color-card-pink) 0 18px,var(--color-card-stock) 18px 36px)",
  green:
    "repeating-linear-gradient(90deg,var(--color-awning-green) 0 18px,var(--color-tarp-pale) 18px 36px)",
  tungsten:
    "repeating-linear-gradient(90deg,var(--color-tungsten-deep) 0 18px,var(--color-card-stock) 18px 36px)",
};

const TRADES = [
  {
    n: "01",
    title: "Fill the lane",
    lead: "Most of the people who want what you sell are searching for it tonight. Right now they are walking past somebody else.",
    body: "This is the bulk of what we do and it is where our results are. We put you in front of them on Google and Meta, and we keep you there.",
    tags: [
      "Google SEO",
      "Google Ads",
      "Meta ads",
      "Funnel building",
      "Video",
      "Branding",
    ],
    awning: "tungsten",
    lead_size: true,
  },
  {
    n: "02",
    title: "Light the stall",
    lead: "Getting them past your door is wasted if the door looks shut.",
    body: "Pages built for the thing they actually searched for, that load fast on a phone on 4G, and give them one obvious next step instead of a phone number and a hope.",
    tags: ["Websites", "Service pages", "Landing pages", "Mobile apps"],
    awning: "pink",
    lead_size: false,
  },
  {
    n: "03",
    title: "Man the counter",
    lead: "You are with a customer. The phone goes. That one is gone.",
    body: "This is the part most agencies will not touch, and it is why we are different: we build the systems that reply, book and follow up while you are busy, including at 11pm, which is when a lot of people finally get around to it.",
    tags: [
      "WhatsApp automation",
      "Booking systems",
      "CRM & follow up",
      "Custom software",
      "AI agents",
    ],
    awning: "tarp",
    lead_size: false,
  },
];

const METHOD = [
  {
    time: "5pm",
    title: "Walk the lane",
    body: "We look at where your customers already are, what they are typing, and exactly where you are losing them.",
  },
  {
    time: "6pm",
    title: "Set up the stall",
    body: "We plan the whole thing on paper before anything is built: the ads, the pages, what happens when somebody messages at midnight.",
  },
  {
    time: "7pm",
    title: "Switch the lights on",
    body: "We build it and launch it. Pages, ads, booking, WhatsApp, all wired together, not six separate things you have to manage.",
  },
  {
    time: "Late",
    title: "Count the night",
    body: "We measure what actually came in, tell you straight what worked, and put more into that.",
  },
];

/** A stall: awning, the tube under it, then the lit counter. */
function Stall({
  awning,
  children,
  className = "",
}: {
  awning: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <article className={`flex flex-col ${className}`}>
      <div
        className="tarp-scallop h-6 w-full shrink-0 animate-sway"
        style={{ backgroundImage: AWNING[awning] }}
        aria-hidden="true"
      />
      <div className="tube h-2 w-full shrink-0" aria-hidden="true" />
      <div className="counter-lit flex flex-1 flex-col p-5 sm:p-6">
        {children}
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <StickyChop />

      <main id="main">
        {/* ============================================================
            HERO — the seam
            ============================================================ */}
        <section className="relative px-4 pt-6 pb-2 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <p className="shout mb-4 text-xs tracking-[0.2em] text-tungsten sm:text-sm">
              Marketing &amp; systems · Kuala Lumpur
            </p>
            <h1
              className="shout max-w-3xl text-fluoro"
              style={{ fontSize: "clamp(2.4rem, 9vw, 4.75rem)" }}
            >
              The crowd is already
              <br />
              <span className="text-tungsten">walking past</span> your door.
            </h1>

            {/* Say the plain thing. She arrived cold and should not have to
                infer the category from a 12px eyebrow. */}
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-tarp-pale/90 sm:text-lg">
              Blueprint is a Kuala Lumpur marketing agency.{" "}
              <span className="text-fluoro">
                We run the ads, search and pages that bring customers to your
                door, then we build the booking, WhatsApp and follow up systems
                that make sure you don&rsquo;t lose them when they arrive.
              </span>
            </p>

            <a
              href={WA.general}
              className="chop mt-7 inline-flex items-center gap-2.5 border-chop-deep bg-chop px-6 py-3.5 text-base font-black text-ink no-underline shadow-[0_6px_0_var(--color-chop-deep)] transition-transform active:translate-y-1 active:shadow-[0_2px_0_var(--color-chop-deep)]"
            >
              <WhatsAppGlyph size={20} />
              WhatsApp us
            </a>
          </div>

          <div className="mx-auto mt-9 max-w-5xl overflow-hidden rounded-md border-2 border-plum-edge bg-night/60">
            <Gate />
          </div>
        </section>

        {/* ============================================================
            THE TRADE — marketing dominant, by area as well as order
            ============================================================ */}
        <section className="px-4 py-16 sm:px-6 sm:py-24" aria-labelledby="trade">
          <div className="mx-auto max-w-5xl">
            <h2
              id="trade"
              className="shout max-w-2xl text-4xl text-fluoro sm:text-5xl"
            >
              Three jobs. We do all three.
            </h2>
            <p className="mt-4 max-w-xl text-tarp-pale/80">
              Most agencies do the first one and hand you the rest. That is
              where the money leaks out.
            </p>

            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              {TRADES.map((t) => (
                <Stall
                  key={t.n}
                  awning={t.awning}
                  className={t.lead_size ? "lg:col-span-2" : ""}
                >
                  <div
                    className={
                      t.lead_size
                        ? "flex flex-col gap-6 lg:flex-row lg:items-start"
                        : ""
                    }
                  >
                    <div className={t.lead_size ? "lg:w-1/2" : ""}>
                      <div className="flex items-baseline gap-3">
                        <span className="price-card marker inline-block rotate-[-2deg] px-2.5 py-0.5 text-2xl leading-none">
                          {t.n}
                        </span>
                        <h3
                          className={`shout text-fluoro ${t.lead_size ? "text-3xl sm:text-4xl" : "text-2xl"}`}
                        >
                          {t.title}
                        </h3>
                      </div>
                      <p
                        className={`mt-4 leading-relaxed font-medium text-fluoro ${t.lead_size ? "text-lg sm:text-xl" : "text-base"}`}
                      >
                        {t.lead}
                      </p>
                    </div>
                    <div className={t.lead_size ? "lg:w-1/2 lg:pt-2" : ""}>
                      <p className="mt-3 text-sm leading-relaxed text-tarp-pale/85 lg:mt-0">
                        {t.body}
                      </p>
                      <ul className="mt-5 flex flex-wrap gap-1.5">
                        {t.tags.map((tag) => (
                          <li
                            key={tag}
                            className="border border-tungsten/45 px-2 py-1 text-xs font-medium text-tarp-pale"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Stall>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            THE LANE — six stalls, real live links
            ============================================================ */}
        <section
          id="work"
          className="scroll-mt-4 px-4 py-16 sm:px-6 sm:py-24"
          aria-labelledby="work-h"
        >
          <div className="mx-auto max-w-5xl">
            <h2 id="work-h" className="shout text-4xl text-fluoro sm:text-5xl">
              Walk the lane.
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-tarp-pale/90">
              We are not going to put a big invented number on this page. What
              we have is six businesses you can go and look at for yourself.
            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {CLIENTS.map((c) => {
                const domain = c.href.replace("https://", "");
                const body = (
                  <>
                    <h3 className="shout text-2xl text-fluoro">{c.name}</h3>
                    {c.sector && (
                      <p className="mt-1 text-sm text-tarp-pale/80">
                        {c.sector} · {c.place}
                      </p>
                    )}
                    {/* The evidence is the live site. Hand-lettered, because
                        on a stall the important number is always hand-written. */}
                    <p className="marker mt-3 text-lg break-all text-card-green">
                      {domain}
                    </p>
                    {c.detail && (
                      <ul className="mt-4 flex flex-wrap gap-1.5">
                        {c.detail.built.slice(0, 3).map((b) => (
                          <li
                            key={b}
                            className="border border-tungsten/45 px-2 py-0.5 text-xs text-tarp-pale"
                          >
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                    <span className="shout mt-auto pt-5 text-sm text-tungsten">
                      {c.detail ? "Read the full night →" : "Visit the site ↗"}
                    </span>
                  </>
                );

                const shell =
                  "no-underline transition-transform hover:-translate-y-1";

                return c.detail ? (
                  <Link key={c.slug} href={`/work/${c.slug}`} className={shell}>
                    <Stall awning={c.awning} className="h-full">
                      {body}
                    </Stall>
                  </Link>
                ) : (
                  <a
                    key={c.slug}
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={shell}
                  >
                    <Stall awning={c.awning} className="h-full">
                      {body}
                    </Stall>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================================
            METHOD — a night's running order, not another card grid
            ============================================================ */}
        <section
          id="method"
          className="scroll-mt-4 border-y-2 border-plum-edge bg-night-deep/60 px-4 py-16 sm:px-6 sm:py-24"
          aria-labelledby="method-h"
        >
          <div className="mx-auto max-w-3xl">
            <h2 id="method-h" className="shout text-4xl text-fluoro sm:text-5xl">
              How a night runs.
            </h2>

            <ol className="mt-10 border-l-2 border-tungsten/50 pl-6 sm:pl-8">
              {METHOD.map((m) => (
                <li key={m.time} className="relative pb-9 last:pb-0">
                  <span
                    className="bulb absolute -left-[31px] top-2 h-3 w-3 sm:-left-[39px]"
                    aria-hidden="true"
                  />
                  <span className="marker text-xl text-tungsten">{m.time}</span>
                  <h3 className="shout mt-1 text-2xl text-fluoro">{m.title}</h3>
                  <p className="mt-2 leading-relaxed text-tarp-pale/85">
                    {m.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ============================================================
            CLOSE
            ============================================================ */}
        <section className="px-4 py-20 sm:px-6 sm:py-28" aria-labelledby="close">
          <div className="mx-auto max-w-3xl text-center">
            <div
              className="tarp tarp-scallop mx-auto mb-2 h-7 w-full max-w-md animate-sway"
              aria-hidden="true"
            />
            <div
              className="tube mx-auto mb-8 h-2 w-full max-w-md"
              aria-hidden="true"
            />
            <h2
              id="close"
              className="shout text-4xl leading-[0.92] text-fluoro sm:text-6xl"
            >
              Tell us what you sell.
              <br />
              <span className="text-tungsten">
                We&rsquo;ll tell you where you&rsquo;re losing people.
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-tarp-pale/85">
              Message us on WhatsApp. A real person replies, and yes, we know
              how that sounds coming from the people who sell you automation.
            </p>

            <a
              href={WA.audit}
              className="chop mt-8 inline-flex items-center gap-3 border-chop-deep bg-chop px-7 py-4 text-lg font-black text-ink no-underline shadow-[0_7px_0_var(--color-chop-deep)] transition-transform active:translate-y-1 active:shadow-[0_2px_0_var(--color-chop-deep)]"
            >
              <WhatsAppGlyph size={22} />
              Start a WhatsApp chat
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
