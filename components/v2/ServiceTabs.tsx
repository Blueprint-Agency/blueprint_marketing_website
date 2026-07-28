"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { Service } from "@/lib/services";
import ServiceArt from "./ServiceArt";

/**
 * The services section, as a vertical tab set: the list of what we do on the
 * left, a picture of the actual surface the work happens on to the right.
 *
 * WHY IT IS BUILT THIS WAY
 * ------------------------
 * - The deck of twelve equal cards asked the reader to compare twelve things
 *   at once and gave no room for a picture of any of them. One at a time,
 *   with the interface beside it, is the same information at a readable pace.
 *
 * - Autoplay only runs while the block is on screen, stops the moment the
 *   reader touches anything, and never starts at all under
 *   prefers-reduced-motion. A carousel that keeps moving under someone
 *   reading it is a carousel that gets scrolled past.
 *
 * - Every panel is rendered into the HTML and hidden with the `hidden`
 *   attribute rather than dropped, so all twelve services stay in the
 *   document for crawlers, and the tab list names every one of them even
 *   before JavaScript runs.
 */

const DWELL = 7000;

export default function ServiceTabs({
  groupId,
  eyebrow,
  services,
}: {
  groupId: string;
  eyebrow: string;
  services: Service[];
}) {
  const [active, setActive] = useState(0);
  /** Autoplay is off until we know the block is on screen and motion is welcome. */
  const [auto, setAuto] = useState(false);
  /** Held while a pointer is over the block or focus is inside it. */
  const [hold, setHold] = useState(false);
  /** Once the reader has chosen for themselves, we stop choosing for them. */
  const taken = useRef(false);
  const hostRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const host = hostRef.current;
    if (!host) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          setAuto(!taken.current && e.isIntersecting);
        }
      },
      { threshold: 0.4 },
    );
    io.observe(host);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!auto || hold) return;
    const id = setTimeout(
      () => setActive((prev) => (prev + 1) % services.length),
      DWELL,
    );
    return () => clearTimeout(id);
  }, [auto, hold, active, services.length]);

  const choose = useCallback(
    (next: number, moveFocus = false) => {
      const i = (next + services.length) % services.length;
      taken.current = true;
      setAuto(false);
      setActive(i);
      if (moveFocus) tabRefs.current[i]?.focus();
    },
    [services.length],
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
      End: services.length - 1,
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
          {services.map((s, i) => {
            const on = i === active;
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                id={`${groupId}-tab-${s.id}`}
                aria-selected={on}
                aria-controls={`${groupId}-panel-${s.id}`}
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
        {services.map((s, i) => (
          <div
            key={s.id}
            id={`${groupId}-panel-${s.id}`}
            role="tabpanel"
            aria-labelledby={`${groupId}-tab-${s.id}`}
            hidden={i !== active}
            className="svt-panel"
          >
            <div className="svt-art">
              <ServiceArt id={s.id} />
            </div>
            <p className="prose svt-body">{s.body}</p>
            <div className="svt-detail">
              <div>
                <p className="small svc-label">What we do</p>
                <ul className="svc-does">
                  {s.does.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
              <p className="svc-ideal">
                <span className="small svc-label">Ideal for</span>
                {s.idealFor}
              </p>
            </div>
          </div>
        ))}

        {/* Overlay sized to the artwork so the controls sit in the band at
            its foot without living inside any one panel. Hidden from
            assistive tech and skipped by Tab: the tab list already offers
            every service, and arrows here would only be a second, worse
            route to the same six. */}
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
