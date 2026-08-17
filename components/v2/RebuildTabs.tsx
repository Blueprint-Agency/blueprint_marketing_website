"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import BeforeAfter from "@/components/v2/BeforeAfter";
import type { Rebuild } from "@/lib/rebuilds";

/**
 * The three rebuilds, one at a time, chosen by the reader.
 *
 * WHY THE PAGE STOPPED STACKING THEM
 * ----------------------------------
 * They ran as three sections down the page until 2026-08-17. Even after each
 * capture was put in a window of its own, three of those plus their headers
 * was still most of a long document, and the user asked for the shorter
 * version: one stage, three tabs.
 *
 * WHAT IS GIVEN UP, SO THAT IT IS ON THE RECORD
 * ---------------------------------------------
 * Two thirds of the proof is now behind a control a reader may never press.
 * A stacked page makes its case at whatever depth she stops scrolling; this
 * one makes it only if she picks. That is a real cost and it was accepted
 * deliberately in exchange for the length.
 *
 * Two things hold the other end of it. Every panel is in the HTML, hidden
 * with the `hidden` attribute rather than dropped, so a crawler and a reader
 * without JavaScript both get all three. And the tabs are named for the
 * clients, so the row itself says there are three of these rather than
 * looking like a filter over one.
 *
 * THE ORDER IS THE ARGUMENT
 * -------------------------
 * Left to right: a rewrite, a job where the words were already right, and an
 * information architecture job. They answer the three questions a reader
 * arrives with, will you rewrite what I say, will you break what already
 * works, and do you understand my customers, and none of the three is
 * answerable without the others there to contrast it against. Do not sort
 * this list by anything else.
 */

export type RebuildTab = {
  rebuild: Rebuild;
  /** What this one demonstrates. One line, set as the panel's heading. */
  finding: React.ReactNode;
};

export default function RebuildTabs({ tabs }: { tabs: RebuildTab[] }) {
  const [active, setActive] = useState(0);
  const hostRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  /** An anchor waiting for its panel to be shown. See the effect below. */
  const pending = useRef<string | null>(null);
  /** `active`, readable from the hash listener, which is an event handler
      and cannot see the state it was registered alongside. */
  const activeRef = useRef(active);
  const landed = useRef(false);

  /**
   * Scrolls to an anchor AFTER the panel holding it has been shown.
   *
   * This is not a flourish, it is the whole of why the deep links work:
   * scrollIntoView on an element inside a `hidden` panel does nothing at
   * all, silently. Reading the hash and scrolling in one pass looks right,
   * selects the correct tab, and lands the reader at the top of the page
   * wondering what the link did.
   *
   * It runs on every change of `active` and no-ops on all of them except
   * the ones a hash asked for.
   */
  useEffect(() => {
    activeRef.current = active;
    const hash = pending.current;
    if (!hash) return;
    pending.current = null;

    /* Instant the first time, because that is what the browser would have
       done with the anchor if the panel had been open. Smooth after, where
       it is a move the reader asked for from somewhere on the page. */
    const instant =
      !landed.current ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    landed.current = true;

    document.getElementById(hash)?.scrollIntoView({
      behavior: instant ? "auto" : "smooth",
      block: "start",
    });
  }, [active]);

  const choose = useCallback(
    (next: number, moveFocus = false) => {
      const i = (next + tabs.length) % tabs.length;
      setActive(i);
      if (moveFocus) tabRefs.current[i]?.focus();
    },
    [tabs.length],
  );

  /**
   * The page anchors still work.
   *
   * Every pair keeps the id it had when the rebuilds were stacked sections,
   * `<rebuild-slug>-<page-slug>`, and Vatti's own two-page index links to
   * them. This selects the panel that owns the anchor and hands the scroll
   * to the effect above.
   *
   * hashchange as well as mount, because a click on the in-panel index
   * changes only the hash and never remounts this component.
   *
   * An anchor in the panel already showing is left alone: the browser's own
   * jump is already doing it, correctly, and taking it over would only add
   * a second scroll on top.
   */
  useEffect(() => {
    const read = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;
      const i = tabs.findIndex((t) =>
        t.rebuild.pages.some((p) => `${t.rebuild.slug}-${p.slug}` === hash),
      );
      if (i < 0 || i === activeRef.current) return;
      pending.current = hash;
      setActive(i);
    };
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, [tabs]);

  /* Horizontal tablist keys, per the APG: arrows move and activate, Home and
     End jump to the ends. */
  const onKeyDown = (e: React.KeyboardEvent) => {
    const keys: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowDown: active + 1,
      ArrowLeft: active - 1,
      ArrowUp: active - 1,
      Home: 0,
      End: tabs.length - 1,
    };
    if (!(e.key in keys)) return;
    e.preventDefault();
    choose(keys[e.key], true);
  };

  return (
    <div className="rbt" ref={hostRef}>
      <div className="rbt-bar">
        <div
          className="rbt-list"
          role="tablist"
          aria-label="Rebuilds"
          onKeyDown={onKeyDown}
        >
          {tabs.map((t, i) => {
            const on = i === active;
            return (
              <button
                key={t.rebuild.slug}
                type="button"
                role="tab"
                id={`rbt-tab-${t.rebuild.slug}`}
                aria-selected={on}
                aria-controls={`rbt-panel-${t.rebuild.slug}`}
                tabIndex={on ? 0 : -1}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                className={`rbt-tab${on ? " is-on" : ""}`}
                onClick={() => choose(i)}
              >
                {t.rebuild.client}
              </button>
            );
          })}
        </div>
      </div>

      {tabs.map((t, i) => {
        const { rebuild } = t;
        const many = rebuild.pages.length > 1;

        return (
          <div
            key={rebuild.slug}
            id={`rbt-panel-${rebuild.slug}`}
            role="tabpanel"
            aria-labelledby={`rbt-tab-${rebuild.slug}`}
            hidden={i !== active}
            className="rbt-panel"
          >
            <div className="ba-head ba-head-lead">
              <h2 className="h2" style={{ maxWidth: "24ch" }}>
                {t.finding}
              </h2>
              <p className="prose ba-brief" style={{ marginTop: 20 }}>
                {rebuild.brief}
              </p>
              <p className="small ba-meta" style={{ marginTop: 18 }}>
                {rebuild.sector} · {rebuild.place}
              </p>
            </div>

            {/* Only for a rebuild with more than one page. One page does not
                need a contents list pointing at itself. */}
            {many && (
              <nav className="pg-index" aria-label={`${rebuild.client} pages`}>
                <span className="pg-index-label small">
                  {rebuild.pages.length} pages
                </span>
                <ul>
                  {rebuild.pages.map((p) => (
                    <li key={p.slug}>
                      <a href={`#${rebuild.slug}-${p.slug}`}>{p.name}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            {rebuild.pages.map((pair, n) => (
              <section
                className="pg"
                id={`${rebuild.slug}-${pair.slug}`}
                key={pair.slug}
                aria-label={`${rebuild.client}, ${pair.name}`}
              >
                {many && <h3 className="pg-name">{pair.name}</h3>}
                <BeforeAfter
                  pair={pair}
                  beforeNote="The site we were handed"
                  afterNote="The rebuild"
                  /* The first capture of the first rebuild, and nothing
                     else. The other panels are hidden at first paint, so
                     their images are not fetched until a tab is pressed,
                     which is most of what this control buys back. */
                  eager={i === 0 && n === 0}
                />
              </section>
            ))}
          </div>
        );
      })}
    </div>
  );
}
