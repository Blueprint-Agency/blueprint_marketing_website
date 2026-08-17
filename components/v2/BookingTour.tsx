"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import BookingArt from "./BookingArt";
import type { Screen } from "@/lib/booking";

/**
 * The product tour: four screens of Reserve Today, one at a time, chosen
 * by the reader.
 *
 * WHY THIS IS A COPY OF ServiceTabs AND NOT ServiceTabs ITSELF
 * ------------------------------------------------------------
 * ServiceTabs is typed to `Service` from lib/services.ts and renders
 * `ServiceArt` by service id. Generalising it over both would mean two
 * type parameters and an injected art component, to be used in exactly two
 * places, which buys a shared file at the cost of both being harder to
 * read. The behaviour is small and the CSS is the part that actually
 * matters, and that IS shared: every class below is one this world already
 * defines. No new selectors were written for this component.
 *
 * Keep the two in step where the behaviour is the argument rather than the
 * code. Specifically: every panel is in the HTML and hidden with the
 * `hidden` attribute rather than dropped, so a crawler and a reader
 * without JavaScript get all four screens and the tab list names all four
 * before anything runs. That is the same promise RebuildTabs makes on
 * /services/web-design and it is the thing that makes a tab set on a
 * marketing page defensible at all.
 *
 * AUTOPLAY, AND WHY IT IS SO EASY TO STOP
 * ---------------------------------------
 * It only runs while the block is on screen, never under
 * prefers-reduced-motion, pauses on hover or focus, and stops for good the
 * moment the reader picks a tab herself. A carousel that keeps moving
 * under somebody reading it is a carousel that gets scrolled past, and on
 * this page the thing being scrolled past would be the product.
 */

const DWELL = 7000;

export default function BookingTour({
  screens,
  eyebrow,
}: {
  screens: Screen[];
  eyebrow: string;
}) {
  const [active, setActive] = useState(0);
  /** Off until we know the block is on screen and motion is welcome. */
  const [auto, setAuto] = useState(false);
  /** Held while a pointer is over the block or focus is inside it. */
  const [hold, setHold] = useState(false);
  /** Once the reader has chosen for herself, we stop choosing for her. */
  const taken = useRef(false);
  const hostRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const host = hostRef.current;
    if (!host) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) setAuto(!taken.current && e.isIntersecting);
      },
      { threshold: 0.4 },
    );
    io.observe(host);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!auto || hold) return;
    const id = setTimeout(
      () => setActive((prev) => (prev + 1) % screens.length),
      DWELL,
    );
    return () => clearTimeout(id);
  }, [auto, hold, active, screens.length]);

  const choose = useCallback(
    (next: number, moveFocus = false) => {
      const i = (next + screens.length) % screens.length;
      taken.current = true;
      setAuto(false);
      setActive(i);
      if (moveFocus) tabRefs.current[i]?.focus();
    },
    [screens.length],
  );

  /* Vertical tablist keys, per the APG: arrows move and activate, Home and
     End jump to the ends. */
  const onKeyDown = (e: React.KeyboardEvent) => {
    const keys: Record<string, number> = {
      ArrowDown: active + 1,
      ArrowRight: active + 1,
      ArrowUp: active - 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: screens.length - 1,
    };
    if (!(e.key in keys)) return;
    e.preventDefault();
    choose(keys[e.key], true);
  };

  return (
    <div
      className="svt"
      ref={hostRef}
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocusCapture={() => setHold(true)}
      onBlurCapture={() => setHold(false)}
    >
      <div className="svt-side">
        <h3 className="grp-head">{eyebrow}</h3>

        <div
          className="svt-list"
          role="tablist"
          aria-orientation="vertical"
          aria-label={eyebrow}
          onKeyDown={onKeyDown}
        >
          {screens.map((s, i) => {
            const on = i === active;
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                id={`tour-tab-${s.id}`}
                aria-selected={on}
                aria-controls={`tour-panel-${s.id}`}
                tabIndex={on ? 0 : -1}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                className={`svt-tab${on ? " is-on" : ""}`}
                onClick={() => choose(i)}
              >
                <span className="svt-rail" aria-hidden="true">
                  {on && (
                    <span
                      key={`${active}-${auto}-${hold}`}
                      className={`svt-rail-fill${auto && !hold ? " is-timing" : ""}`}
                      style={{ animationDuration: `${DWELL}ms` }}
                    />
                  )}
                </span>
                <span className="svt-n">/{String(i + 1).padStart(2, "0")}</span>
                <span className="svt-copy">
                  <span className="svt-name">{s.name}</span>
                  <span className="svt-tag-slot">
                    <span className="svt-tag">{s.tagline}</span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="svt-stage">
        {screens.map((s, i) => (
          <div
            key={s.id}
            id={`tour-panel-${s.id}`}
            role="tabpanel"
            aria-labelledby={`tour-tab-${s.id}`}
            hidden={i !== active}
            className="svt-panel"
          >
            <div className="svt-art">
              <BookingArt id={s.id} />
            </div>
            <p className="prose svt-body">{s.body}</p>
          </div>
        ))}

        {/* Sized to the artwork so the controls land in the band at its
            foot without living inside any one panel. Hidden from assistive
            tech and skipped by Tab: the tab list already offers all four,
            and arrows here would be a second, worse route to the same
            list. */}
        <div className="svt-nav" aria-hidden="true">
          <button
            type="button"
            className="svt-arrow"
            onClick={() => choose(active - 1)}
            tabIndex={-1}
          >
            <ChevronUp size={18} strokeWidth={2.2} />
          </button>
          <button
            type="button"
            className="svt-arrow"
            onClick={() => choose(active + 1)}
            tabIndex={-1}
          >
            <ChevronDown size={18} strokeWidth={2.2} />
          </button>
        </div>
      </div>
    </div>
  );
}
