"use client";

import { useEffect, useRef, useState } from "react";
import { GoogleG } from "./Marks";
import { Reveal } from "./SeoArt";

/**
 * The one section on each ads page that only that service has.
 *
 *  - BudgetFlow (Google Ads): where the budget goes across three kinds of
 *    search, before and after the account is cleaned up. It plays itself
 *    once when it reaches the screen, and the two buttons let the reader
 *    flip between the states.
 *  - FatigueChart (Meta Ads): three creatives each rising and tiring, and
 *    each replaced as it starts to slide.
 *
 * Both are illustrations of a shape. The widths and curves are not a
 * client's figures, and each diagram says so under itself.
 */

type Row = {
  who: string;
  query: string;
  body: string;
  before: number;
  after: number;
  tagBefore: string;
  tagAfter: string;
  state: "cut" | "keep" | "grow";
};

const ROWS: Row[] = [
  {
    who: "Researching",
    query: "how does a facial work",
    body: "Curious, not ready. The click costs the same as a buyer's.",
    before: 44,
    after: 0,
    tagBefore: "Paying for curiosity",
    tagAfter: "Cut: negative keyword",
    state: "cut",
  },
  {
    who: "Comparing",
    query: "best facial bangsar",
    body: "Choosing between options. Worth it when the page answers the comparison.",
    before: 32,
    after: 38,
    tagBefore: "Lands on the homepage",
    tagAfter: "Kept, page built for it",
    state: "keep",
  },
  {
    who: "Ready to book",
    query: "facial bangsar open now",
    body: "Wants it today. This is where the budget belongs.",
    before: 24,
    after: 62,
    tagBefore: "Runs out by lunchtime",
    tagAfter: "Budget moved here",
    state: "grow",
  },
];

export function BudgetFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const [after, setAfter] = useState(false);
  const [touched, setTouched] = useState(false);

  /* Play the change once, a beat after the diagram is on screen, unless
     the reader has already chosen a state herself. */
  useEffect(() => {
    const el = ref.current;
    if (!el || touched) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          timer = setTimeout(() => setAfter(true), 1600);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [touched]);

  function choose(v: boolean) {
    setTouched(true);
    setAfter(v);
  }

  return (
    <div className={`bf ${after ? "is-after" : ""}`} ref={ref}>
      <div className="bf-head">
        <span className="bf-title">
          <GoogleG size={14} />
          Where your budget goes
        </span>
        <span className="bf-toggle" role="group" aria-label="Show the budget">
          <button
            type="button"
            aria-pressed={!after}
            className={!after ? "is-on" : ""}
            onClick={() => choose(false)}
          >
            Before
          </button>
          <button
            type="button"
            aria-pressed={after}
            className={after ? "is-on" : ""}
            onClick={() => choose(true)}
          >
            After
          </button>
        </span>
      </div>

      <div className="bf-rows">
        {ROWS.map((r) => (
          <div className={`bf-row is-${r.state}`} key={r.query}>
            <div className="bf-label">
              <span className="bf-who">{r.who}</span>
              <span className="bf-q mono">{r.query}</span>
              <span className="bf-body">{r.body}</span>
            </div>
            <div className="bf-track" aria-hidden="true">
              <span
                className="bf-fill"
                style={{ width: `${after ? r.after : r.before}%` }}
              />
            </div>
            <span className="bf-tag">{after ? r.tagAfter : r.tagBefore}</span>
          </div>
        ))}
      </div>
      <p className="bf-note">
        An illustration of the shape, not a client&rsquo;s figures. The bars are
        shares of one monthly budget.
      </p>
    </div>
  );
}

/* Three creatives, each a rise and a slide, staggered so the next is
   climbing as the last one tires. Drawn in a 600 x 240 box. */
const CURVES = [
  { d: "M20 220 C 70 220, 90 60, 150 60 S 240 150, 300 210", cls: "fc-a" },
  { d: "M200 220 C 250 220, 270 50, 330 50 S 420 140, 480 205", cls: "fc-b" },
  { d: "M380 220 C 430 220, 450 40, 510 40 S 570 70, 590 90", cls: "fc-c" },
];

export function FatigueChart() {
  return (
    <Reveal className="fc" threshold={0.3}>
      <svg
        className="fc-svg"
        viewBox="0 0 600 260"
        role="img"
        aria-label="Three ads, each bringing bookings that rise and then tire, each replaced by the next as it starts to slide."
      >
        <line className="fc-axis" x1="20" y1="222" x2="590" y2="222" />
        <line className="fc-axis" x1="20" y1="20" x2="20" y2="222" />
        {[255, 435].map((x) => (
          <g className="fc-swap" key={x}>
            <line x1={x} y1="30" x2={x} y2="222" />
            <text x={x + 6} y="38">
              Replaced
            </text>
          </g>
        ))}
        {CURVES.map((c, i) => (
          <path
            className={`fc-line ${c.cls}`}
            d={c.d}
            key={c.cls}
            pathLength={1}
            style={{ "--i": i } as React.CSSProperties}
          />
        ))}
        <text className="fc-label" x="24" y="250">
          Weeks running
        </text>
        <text className="fc-label" x="30" y="16">
          Bookings from the ad
        </text>
      </svg>
      <div className="fc-legend">
        <span className="fc-key fc-a">Video: the room</span>
        <span className="fc-key fc-b">Video: the therapist</span>
        <span className="fc-key fc-c">Photo: the price list</span>
      </div>
      <p className="bf-note">
        An illustration of the shape, not a client&rsquo;s figures.
      </p>
    </Reveal>
  );
}
