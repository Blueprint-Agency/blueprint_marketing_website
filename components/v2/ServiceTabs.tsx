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
 * - The deck of equal cards asked the reader to compare every service at once
 *   and gave no room for a picture of any of them. One at a time, with the
 *   interface beside it, is the same information at a readable pace.
 *
 * - Autoplay only runs while the block is on screen, stops the moment the
 *   reader touches anything, and never starts at all under
 *   prefers-reduced-motion. A carousel that keeps moving under someone
 *   reading it is a carousel that gets scrolled past.
 *
 * - Every panel is rendered into the HTML and hidden with the `hidden`
 *   attribute rather than dropped, so every service stays in the document
 *   for crawlers, and the tab list names every one of them even before
 *   JavaScript runs.
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

  /**
   * Deep links. The nav's Services menu and the footer send readers to
   * `/#svc-<id>` (see serviceHref in lib/services.ts). Nothing in the document
   * carries that id, so the browser jumps nowhere and this is the only thing
   * that reacts: the group that owns the service selects it and scrolls
   * itself into view, and the other group ignores it.
   *
   * hashchange as well as mount, because arriving from the home page itself
   * changes only the hash and never remounts this component.
   */
  useEffect(() => {
    const read = () => {
      const hash = window.location.hash;
      if (!hash.startsWith("#svc-")) return;
      const i = services.findIndex((s) => s.id === hash.slice(5));
      if (i < 0) return;
      /* A reader who asked for a specific service is not looking for a
         carousel. Same latch a click on a tab sets. */
      taken.current = true;
      setAuto(false);
      setActive(i);
      hostRef.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "center",
      });
    };
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, [services]);

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
            {/* The panel is the artwork and one paragraph. The "What we do"
                list and the "Ideal for" line came out on 2026-07-29; the
                copy for both is still on each service in lib/services.ts
                (`does`, `idealFor`) if they are ever wanted back. */}
            <p className="prose svt-body">{s.body}</p>
          </div>
        ))}

        {/* Overlay sized to the artwork so the controls sit in the band at
            its foot without living inside any one panel. Hidden from
            assistive tech and skipped by Tab: the tab list already offers
            every service, and arrows here would only be a second, worse
            route to the same list. */}
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
