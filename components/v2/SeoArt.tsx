"use client";

import { useEffect, useRef, useState } from "react";
import { GoogleG, WhatsAppMark } from "./Marks";

/**
 * The drawings and diagrams on /seo-for-local-businesses.
 *
 * Same rules as JobArt and ServiceArt, and the same `sa-*` primitives where
 * a drawing is a picture of an interface:
 *
 *  1. No performance figures. Bars and lines show shape, never a value, and
 *     nothing here can be read as a result Blueprint achieved.
 *  2. No real client data. The business is generic and nobody is named.
 *  3. Everything decorative is aria-hidden; the copy beside it carries the
 *     argument. The diagrams that ARE the argument (the ladder, the flow,
 *     the site map) keep their text readable to a screen reader.
 *
 * Every piece builds itself when it reaches the screen, through Reveal
 * below, which is JobArt's three-state observer lifted out so it can wrap
 * anything: no class without JavaScript (everything simply shows), then
 * `is-armed` to hold, then `is-in` to play. Loops stop when the piece
 * leaves the screen. All motion is switched off under
 * prefers-reduced-motion in plain.css.
 */

export function Reveal({
  className = "",
  children,
  threshold = 0.3,
}: {
  className?: string;
  children: React.ReactNode;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"" | "is-armed" | "is-in">("");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.85 && r.bottom > 0) {
      setPhase("is-in");
    } else {
      setPhase("is-armed");
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          setPhase(e.isIntersecting ? "is-in" : "is-armed");
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <div className={`${className} ${phase}`.trim()} ref={ref}>
      {children}
    </div>
  );
}

function Frame({
  tone,
  caption,
  children,
}: {
  tone: number;
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`sa-frame sa-tone-${tone}`} aria-hidden="true">
      <div className="sa-ui">{children}</div>
      <span className="sa-pill">{caption}</span>
    </div>
  );
}

/* ------------------------------------------------------------------
   Hero: the monthly report, read top to bottom, ending in revenue.
   ------------------------------------------------------------------ */

const REPORT: { label: string; w: number; hot?: boolean }[] = [
  { label: "Search visitors", w: 92 },
  { label: "WhatsApp & call taps", w: 64 },
  { label: "Leads", w: 46 },
  { label: "Bookings", w: 34 },
  { label: "Revenue from search", w: 72, hot: true },
];

export function HeroReport() {
  return (
    <Reveal className="seo-hero-art">
      <Frame tone={0} caption="Your monthly report">
        <div className="seo-rep-head">
          <span className="sa-name">Search report</span>
          <span className="sa-chips">
            <span className="sa-chip">Bangsar</span>
            <span className="sa-chip">Puchong</span>
          </span>
        </div>
        <div className="seo-rep">
          {REPORT.map((r, i) => (
            <div
              className={`seo-rep-row ${r.hot ? "is-hot" : ""}`}
              key={r.label}
              style={{ "--i": i, "--w": `${r.w}%` } as React.CSSProperties}
            >
              <span className="seo-rep-label">{r.label}</span>
              <span className="seo-rep-track">
                <span className="seo-rep-fill" />
              </span>
            </div>
          ))}
        </div>
        <div className="sa-foot">
          <span className="sa-chip seo-rep-ok">Matched to bookings</span>
          <span className="sa-chip">By outlet</span>
        </div>
      </Frame>
    </Reveal>
  );
}

/* ------------------------------------------------------------------
   The three searches: a search box that types its own query.
   ------------------------------------------------------------------ */

export function TypedQuery({ query }: { query: string }) {
  return (
    <Reveal className="seo-typed" threshold={0.6}>
      <span className="seo-typed-box">
        <GoogleG size={14} />
        <span
          className="seo-typed-q mono"
          style={{ "--n": query.length } as React.CSSProperties}
        >
          {query}
        </span>
      </span>
    </Reveal>
  );
}

/* ------------------------------------------------------------------
   The ladder: every number between a ranking and the money.
   ------------------------------------------------------------------ */

const RUNGS: { name: string; note: string }[] = [
  { name: "Ranking position", note: "Where you appear" },
  { name: "Search visitors", note: "Who clicked through" },
  { name: "Button taps", note: "WhatsApp, call, booking" },
  { name: "Leads", note: "Real conversations" },
  { name: "Bookings", note: "Matched with your team" },
  { name: "Revenue", note: "What it brought in" },
];

export function RevenueLadder() {
  return (
    <Reveal className="seo-ladder" threshold={0.25}>
      <ol className="seo-rungs">
        {RUNGS.map((r, i) => (
          <li
            className={`seo-rung ${i === RUNGS.length - 1 ? "is-money" : ""} ${i < 3 ? "is-easy" : ""}`}
            key={r.name}
            style={{ "--i": i } as React.CSSProperties}
          >
            <span className="seo-rung-n mono" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="seo-rung-name">{r.name}</span>
            <span className="seo-rung-note">{r.note}</span>
          </li>
        ))}
      </ol>
      <div className="seo-brace seo-brace-them">
        <span>Where most SEO reports stop</span>
      </div>
      <div className="seo-brace seo-brace-us">
        <span>What we are measured on</span>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------
   The path: a search, a page, a tap, a booking, money.
   ------------------------------------------------------------------ */

const PATH: { title: string; body: string }[] = [
  { title: "She searches", body: "“facial bangsar”. Your name is not in it." },
  { title: "She finds you", body: "Page one of Google, or named by an AI." },
  {
    title: "She reads the page",
    body: "Prices, hours, who is there, how to get there.",
  },
  { title: "She taps WhatsApp", body: "That tap is a lead, and we count it." },
  { title: "You book her", body: "Your team replies and fixes the slot." },
  {
    title: "It shows as revenue",
    body: "Matched back to the search that started it.",
  },
];

const OWNERS: { label: string; tone: string }[] = [
  { label: "SEO & AEO: being there", tone: "a" },
  { label: "CRO: turning the visit into a tap", tone: "b" },
  { label: "Your team", tone: "c" },
  { label: "We report it", tone: "d" },
];

export function SearchPath() {
  return (
    <Reveal className="seo-path" threshold={0.25}>
      <div className="seo-path-track">
        <div className="seo-path-rail" aria-hidden="true">
          <span className="seo-path-dot" />
        </div>
        <ol className="seo-path-steps">
          {PATH.map((p, i) => (
            <li
              className={`seo-path-step ${i === PATH.length - 1 ? "is-money" : ""}`}
              key={p.title}
              style={{ "--i": i } as React.CSSProperties}
            >
              <span className="seo-path-node mono" aria-hidden="true">
                {i === PATH.length - 1 ? "RM" : i + 1}
              </span>
              <span className="seo-path-title">{p.title}</span>
              <span className="seo-path-body">{p.body}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="seo-path-owners">
        {OWNERS.map((o) => (
          <span
            className={`seo-owner-band is-${o.tone}`}
            key={o.label}
          >
            {o.label}
          </span>
        ))}
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------
   The site map: one page for every reason someone would search.
   ------------------------------------------------------------------ */

const BRANCHES: { name: string; pages: string[] }[] = [
  { name: "Services", pages: ["/facial", "/massage", "/postnatal"] },
  { name: "Branches", pages: ["/bangsar", "/puchong", "/cheras"] },
  { name: "Nearby towns", pages: ["/shah-alam", "/subang", "/kajang"] },
  {
    name: "Guides",
    pages: ["/guides/first-visit", "/guides/prices", "/guides/aftercare"],
  },
];

export function SiteTree() {
  return (
    <Reveal className="seo-tree" threshold={0.25}>
      <div className="seo-tree-root">
        <span className="seo-tree-url mono">your-business.com.my</span>
        <span className="seo-langs">
          <span className="seo-lang">EN</span>
          <span className="seo-lang">BM</span>
          <span className="seo-lang">中文</span>
        </span>
      </div>
      <div className="seo-tree-cols">
        {BRANCHES.map((b, c) => (
          <div
            className="seo-tree-col"
            key={b.name}
            style={{ "--c": c } as React.CSSProperties}
          >
            <span className="seo-tree-head">{b.name}</span>
            {b.pages.map((p, i) => (
              <span
                className="seo-tree-page mono"
                key={p}
                style={{ "--i": i } as React.CSSProperties}
              >
                {p}
              </span>
            ))}
          </div>
        ))}
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------
   The three jobs: Google, an AI answer, the tap on a phone.
   ------------------------------------------------------------------ */

function ArtFound() {
  return (
    <Frame tone={0} caption="Google, page one">
      <div className="sa-search">
        <GoogleG size={12} />
        <span className="sa-query">facial bangsar</span>
        <span className="sa-mag" />
      </div>
      <div className="sa-serp">
        <div className="sa-hit is-you">
          <span className="sa-pos">1</span>
          <span className="sa-hit-body">
            <span className="sa-url">your-business.com.my/bangsar</span>
            <span className="sa-hit-title">
              Facial in Bangsar, open till 9pm
            </span>
            <span className="sa-line" />
            <span className="sa-sitelinks">
              <i />
              <i />
              <i />
            </span>
          </span>
          <span className="sa-tag">You</span>
        </div>
        {[2, 3].map((n) => (
          <div className="sa-hit sa-dim" key={n}>
            <span className="sa-pos">{n}</span>
            <span className="sa-hit-body">
              <span className="sa-url">competitor-{n}.com.my</span>
              <span className="sa-line sa-short" />
            </span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

function ArtAi() {
  return (
    <Frame tone={2} caption="Named in the answer">
      <div className="seo-ai">
        <span className="seo-ai-ask">
          Where can I get a facial in Bangsar tonight?
        </span>
        <span className="seo-ai-ans">
          <span className="seo-ai-spark" />
          <span className="seo-ai-lines">
            <span className="sa-line sa-short" />
            <span className="seo-ai-pick">
              <span className="seo-ai-name">Your business, Bangsar</span>
              <span className="sa-chips">
                <span className="sa-chip">Open till 9pm</span>
                <span className="sa-chip">Prices on the site</span>
              </span>
              <span className="seo-ai-src mono">your-business.com.my/bangsar</span>
            </span>
            <span className="seo-ai-other">
              <span className="sa-line" />
              <span className="sa-line sa-short" />
            </span>
          </span>
        </span>
        <span className="seo-ai-box">
          <span>Ask anything</span>
          <span className="seo-ai-send" />
        </span>
      </div>
    </Frame>
  );
}

function ArtTap() {
  return (
    <Frame tone={1} caption="Every tap counted">
      <div className="seo-phone">
        <span className="seo-phone-img" />
        <span className="seo-phone-h">Facial in Bangsar</span>
        <span className="sa-line" />
        <span className="sa-line sa-short" />
        <span className="sa-chips">
          <span className="sa-chip">Open till 9pm</span>
          <span className="sa-chip">Prices listed</span>
          <span className="sa-chip">From the LRT</span>
        </span>
        <span className="seo-phone-foot">
          <span className="seo-phone-cta">
            <span className="sa-cta is-act">
              <WhatsAppMark size={9} />
              Message us
            </span>
            <span className="seo-tap" />
          </span>
          <span className="seo-tapped mono">Lead +1 · Bangsar page</span>
        </span>
      </div>
    </Frame>
  );
}

const JOB_ART: Record<string, () => React.JSX.Element> = {
  seo: ArtFound,
  aeo: ArtAi,
  cro: ArtTap,
};

export function SeoJobArt({ id }: { id: string }) {
  const Art = JOB_ART[id];
  if (!Art) return null;
  return (
    <Reveal className="jb-art" threshold={0.34}>
      <Art />
    </Reveal>
  );
}
