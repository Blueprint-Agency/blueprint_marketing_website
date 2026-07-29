"use client";

import { useState } from "react";

/**
 * "How it runs" as a loop of four cards rather than a stacked list.
 *
 * Adopted from subyect.com's process section at the user's request
 * (2026-07-29); the analysis is SUBYECT-TEARDOWN.md §2.8, which had already
 * concluded that Blueprint's Audit → Architect → Build → Scale IS a loop and
 * that rendering it as a list hides the one thing that makes it interesting.
 * So the arrows run card to card and a return arrow closes the cycle: what
 * Scale learns is what the next Audit starts from.
 *
 * WHAT WAS TAKEN, AND WHAT DELIBERATELY WAS NOT
 * ----------------------------------------------
 * Taken: the card row, the arrows between cards, the small illustration in
 * each card, one card highlighted at a time.
 *
 * NOT taken: the orange. layout.tsx's chapter note is explicit that
 * subyect's palette does not transfer, because this site's chroma comes from
 * real client sites. The highlight is Blueprint's own contrast device — the
 * active card inverts to --brand-deep, exactly the way .band-ink inverts a
 * section, and by the same mechanism: it re-declares the world's tokens, so
 * the illustration inside it follows without a second set of rules.
 *
 * ALSO NOT taken: six cards in a boustrophedon. Four cards read straight
 * across, and snaking them would invent a direction change the content does
 * not have.
 *
 * INTERACTION
 * -----------
 * One card is always active, starting with the first, so the section never
 * renders in a neutral do-nothing state. A mouse activates on enter; a touch
 * activates on tap. Nothing is hidden behind the state — all four cards are
 * fully readable at all times — so the highlight is emphasis, not disclosure,
 * and it carries no ARIA. That is also why the cards are not buttons: there
 * is no content behind them for a button to reveal, and a screen reader
 * gains nothing from four controls that only recolour something.
 *
 * The illustrations animate only in the active card. Four looping animations
 * running at once on a paper band is a fidget spinner, not a diagram.
 */

const ART_COUNT = 4;

/** 01 — Audit. A scan sweeping a field of dots until it finds the bad one. */
function AuditArt() {
  const dots = [
    [26, 22],
    [58, 40],
    [44, 66],
    [82, 18],
    [96, 58],
    [120, 34],
    [140, 70],
    [162, 28],
    [176, 52],
  ];
  return (
    <svg viewBox="0 0 200 88" className="lp-art" aria-hidden="true">
      {dots.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="3"
          className="lp-dot"
          style={{ animationDelay: `${i * 90}ms` }}
        />
      ))}
      {/* The leak. It is the one the scan is looking for, so it is the one
          drawn in the accent and the one that keeps pulsing. */}
      <circle cx="112" cy="46" r="4.5" className="lp-dot lp-dot-hit" />
      <line x1="0" y1="6" x2="0" y2="82" className="lp-scan" />
    </svg>
  );
}

/** 02 — Architect. Two inputs resolved into one plan. */
function ArchitectArt() {
  return (
    <svg viewBox="0 0 200 88" className="lp-art" aria-hidden="true">
      <path d="M12 22 C56 22 62 44 96 44" className="lp-wire" />
      <path d="M12 66 C56 66 62 44 96 44" className="lp-wire" />
      <path d="M96 44 H186" className="lp-wire lp-wire-out" />
      <path d="M12 22 C56 22 62 44 96 44" className="lp-flow" />
      <path d="M12 66 C56 66 62 44 96 44" className="lp-flow lp-flow-b" />
      <path d="M96 44 H186" className="lp-flow lp-flow-c" />
      <circle cx="96" cy="44" r="5" className="lp-node" />
      <path d="M178 38 L186 44 L178 50" className="lp-head" />
    </svg>
  );
}

/** 03 — Build. Three panels landing in place, then the tick. */
function BuildArt() {
  return (
    <svg viewBox="0 0 200 88" className="lp-art" aria-hidden="true">
      {[16, 76, 136].map((x, i) => (
        <g key={x} className="lp-panel" style={{ animationDelay: `${i * 160}ms` }}>
          <rect x={x} y="14" width="48" height="60" rx="7" className="lp-plate" />
          <rect x={x + 10} y="26" width="28" height="5" rx="2.5" className="lp-bar" />
          <rect x={x + 10} y="38" width="18" height="5" rx="2.5" className="lp-bar" />
          <rect
            x={x + 10}
            y="56"
            width="24"
            height="8"
            rx="4"
            className="lp-bar lp-bar-act"
          />
        </g>
      ))}
      <g className="lp-tick">
        <circle cx="182" cy="18" r="10" className="lp-tick-disc" />
        <path d="M177 18 L181 22 L188 14" className="lp-tick-mark" />
      </g>
    </svg>
  );
}

/** 04 — Scale. Spend moves to the bar that is working. */
function ScaleArt() {
  const bars = [
    [20, 26],
    [56, 44],
    [92, 68],
    [128, 20],
    [164, 36],
  ];
  return (
    <svg viewBox="0 0 200 88" className="lp-art" aria-hidden="true">
      <line x1="10" y1="78" x2="190" y2="78" className="lp-axis" />
      {bars.map(([x, h], i) => (
        <rect
          key={x}
          x={x}
          y={78 - h}
          width="20"
          height={h}
          rx="4"
          className={`lp-col${i === 2 ? " lp-col-win" : ""}`}
          style={{ animationDelay: `${i * 110}ms`, transformOrigin: `${x}px 78px` }}
        />
      ))}
    </svg>
  );
}

const ART = [AuditArt, ArchitectArt, BuildArt, ScaleArt];

/** The arrow that sits in the gap between two cards. Always drawn pointing
 *  right; which way it actually points is a rotation set in CSS, because
 *  that depends on where in the 2x2 the card sits. */
function Arrow({ back }: { back?: boolean }) {
  return (
    <span
      className={`loop-arrow${back ? " loop-arrow-back" : ""}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 44 16" className="lp-arrow">
        <line x1="1" y1="8" x2="34" y2="8" className="lp-arrow-base" />
        <line x1="1" y1="8" x2="34" y2="8" className="lp-arrow-flow" />
        <path d="M30 3 L36 8 L30 13" className="lp-arrow-head" />
      </svg>
    </span>
  );
}

export default function ProcessLoop({
  steps,
}: {
  steps: readonly (readonly [string, string])[];
}) {
  const [active, setActive] = useState(0);

  /* A mouse highlights what it is over. A finger has no hover, so a tap has
     to do it — and pointerdown rather than click, so the card responds while
     the finger is still down instead of after it lifts. */
  const bind = (i: number) => ({
    onPointerEnter: (e: React.PointerEvent) => {
      if (e.pointerType !== "touch") setActive(i);
    },
    onPointerDown: () => setActive(i),
  });

  return (
    <div className="loop-wrap">
      <ol className="loop">
        {steps.slice(0, ART_COUNT).map(([name, body], i) => {
          const Art = ART[i];
          return (
            <li className="loop-cell" key={name}>
              <article
                className={`loop-card${i === active ? " is-on" : ""}`}
                {...bind(i)}
              >
                <span className="loop-art">
                  <Art />
                </span>
                <p className="loop-head">
                  <span className="loop-n mono" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h3 loop-name">{name}</span>
                </p>
                <p className="prose loop-body">{body}</p>
              </article>
              {/* Every card gets an arrow, including the last: on the 2x2 its
                  arrow is the return leg running back up to card 01, which
                  is what makes the diagram a cycle instead of a line with a
                  full stop. In one column there is nowhere sensible for a
                  return leg to go, so CSS hides that one and the caption
                  below carries the same point in words. */}
              <Arrow back={i === ART_COUNT - 1} />
            </li>
          );
        })}
      </ol>

      <p className="loop-return">
        What Scale learns is what the next Audit starts from.
      </p>
    </div>
  );
}
