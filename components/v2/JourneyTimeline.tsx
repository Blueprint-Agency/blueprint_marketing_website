"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { JOURNEY } from "@/lib/booking";

/**
 * The member's six steps as a timeline you can walk.
 *
 * WHY A TIMELINE AND NOT THE GRID IT REPLACED
 * -------------------------------------------
 * The previous version was a 3x2 grid of six numbered blocks with every
 * body visible at once. It was readable and it was wrong for what the
 * content is: this is a sequence in time, one thing happening after
 * another, and a grid is the one shape that says the six are peers with no
 * order. The rail is the argument. It fills as the member advances, so the
 * section shows a journey being completed rather than six features being
 * listed.
 *
 * VERTICAL, AND NOT HORIZONTAL
 * ----------------------------
 * A horizontal rail is what "timeline" suggests first, and it was tried on
 * paper. Six columns inside the 1180px shell is about 180px each, which is
 * too narrow for a sentence, so a horizontal version has to move the body
 * text into a separate panel away from the step it belongs to. Vertical
 * gives every step the full measure, keeps the body attached to its own
 * title, and is one layout at every width instead of two. Order tracking,
 * changelogs and git history are all vertical timelines; the shape is not
 * unusual, it is the normal one for steps that carry text.
 *
 * ALL SIX TITLES STAY VISIBLE. Only the body collapses. That is the whole
 * balance this component is trying to hold: the six titles ARE the journey
 * and hiding five of them behind a control would make the section worse
 * than the grid it replaced, while six open bodies is the wall of text the
 * grid already was.
 *
 * AN ACCORDION, NOT A TABLIST
 * ---------------------------
 * The other two tab sets on this page put their panels outside the tab
 * list, which is what the pattern requires. Here the body sits inside the
 * step it belongs to, so these are disclosure buttons: aria-expanded on
 * the button, a labelled region underneath it. Calling it a tablist and
 * then nesting the panels inside the list would be the wrong ARIA for the
 * DOM that is actually there.
 *
 * Collapsed bodies stay in the document, clipped by a 0fr grid row rather
 * than dropped, so a crawler and a reader with no JavaScript get all six.
 * `inert` takes them out of the tab order and the accessibility tree while
 * they are closed, which is the part a plain `overflow: hidden` gets
 * wrong: without it a screen reader reads six bodies that are not on
 * screen.
 */

/* Long enough to finish reading a body before it moves on. The tour dwells
   for 7s on a whole interface and the carousel for 3s on a chip; a
   sentence sits between the two. */
const DWELL = 4200;

export default function JourneyTimeline() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(false);
  const [hold, setHold] = useState(false);
  const taken = useRef(false);
  const hostRef = useRef<HTMLOListElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const host = hostRef.current;
    if (!host) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) setAuto(!taken.current && e.isIntersecting);
      },
      { threshold: 0.35 },
    );
    io.observe(host);
    return () => io.disconnect();
  }, []);

  /* Stops at the end rather than looping back to step one. A journey that
     silently restarts under a reader tells her she has misread where she
     is, and this one has a real last step. */
  useEffect(() => {
    if (!auto || hold || active >= JOURNEY.length - 1) return;
    const id = setTimeout(() => setActive((p) => p + 1), DWELL);
    return () => clearTimeout(id);
  }, [auto, hold, active]);

  const choose = useCallback((next: number, moveFocus = false) => {
    const i = Math.max(0, Math.min(JOURNEY.length - 1, next));
    taken.current = true;
    setAuto(false);
    setActive(i);
    if (moveFocus) btnRefs.current[i]?.focus();
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const keys: Record<string, number> = {
      ArrowDown: active + 1,
      ArrowRight: active + 1,
      ArrowUp: active - 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: JOURNEY.length - 1,
    };
    if (!(e.key in keys)) return;
    e.preventDefault();
    choose(keys[e.key], true);
  };

  return (
    <ol
      className="tl"
      ref={hostRef}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocusCapture={() => setHold(true)}
      onBlurCapture={() => setHold(false)}
    >
      {JOURNEY.map((s, i) => {
        const on = i === active;
        const done = i < active;
        return (
          <li
            className={`tl-step${on ? " is-on" : ""}${done ? " is-done" : ""}`}
            key={s.title}
          >
            <button
              type="button"
              id={`tl-btn-${i}`}
              aria-expanded={on}
              aria-controls={`tl-panel-${i}`}
              ref={(el) => {
                btnRefs.current[i] = el;
              }}
              className="tl-head"
              onClick={() => choose(i)}
            >
              <span className="tl-mark" aria-hidden="true">
                <span className="tl-dot" />
              </span>
              <span className="tl-copy">
                <span className="tl-n mono" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="tl-title">{s.title}</span>
              </span>
            </button>

            <div
              className="tl-slot"
              id={`tl-panel-${i}`}
              role="region"
              aria-labelledby={`tl-btn-${i}`}
              inert={!on}
            >
              <div className="tl-body">
                <p className="tl-text">{s.body}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
