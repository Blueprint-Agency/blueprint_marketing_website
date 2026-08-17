"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SERVICES, SERVICE_PAGES, serviceHref } from "@/lib/services";
import { WA } from "@/lib/site";

/**
 * The nav for phones.
 *
 * WHY THIS EXISTS
 * ---------------
 * Below 860px the bar dropped everything except the wordmark and the
 * WhatsApp button: `.hide-md` hid "Who it's for" and the FAQ, and
 * ServicesMenu hides itself because a hover panel is not a thing on a
 * touch screen. A phone reader could therefore reach no part of this site
 * from the top of it, on the half of traffic most likely to arrive there.
 * ServicesMenu's own header has said this was owed since it was written.
 *
 * WHAT IT SHOWS
 * -------------
 * The same eleven services in the same two groups the desktop menu and the
 * footer use, from the same array, so the three cannot drift apart. Then
 * the two links the bar drops, then the action. Nothing is curated down
 * for the small screen: a phone reader is not a lesser reader, and a menu
 * that lists eight of eleven services is a menu that hides three.
 *
 * BEHAVIOUR
 * ---------
 * Escape closes and returns focus to the button. A link closes it, which
 * matters here in a way it does not on desktop: most rows are same-page
 * anchors, and an anchor that leaves a full-screen sheet covering the
 * thing it scrolled to is a dead end. The page behind is locked while it
 * is open, and crossing 860px closes it, so a rotation does not leave a
 * sheet pinned open over a desktop layout.
 *
 * The panel is rendered only while open. That is the opposite of what
 * ServicesMenu does, and deliberately: that one stays in the document for
 * crawlers and for no-JS readers, and it can, because it is a small panel.
 * This is a full-height fixed sheet, and one of those left in the document
 * behind `hidden` is a large block of links that a screen reader has to be
 * kept out of by hand. The crawler argument is already served by the copy
 * in the footer, which lists every one of these services on every page.
 */

const GROUPS = [
  { key: "attract" as const, head: "Bringing people in" },
  { key: "build" as const, head: "Keeping them once they arrive" },
] satisfies { key: "attract" | "build"; head: string }[];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const close = useCallback((returnFocus = false) => {
    setOpen(false);
    if (returnFocus) btnRef.current?.focus();
  }, []);

  /* Lock the page behind the sheet. Without this the body scrolls under a
     fixed overlay, which on iOS also drags the sheet itself around. */
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  /* Escape from anywhere.
     Focus is deliberately NOT moved into the sheet on open. The sheet is
     rendered immediately after the button in the DOM, so the next Tab
     already lands on its first row and a screen reader reads straight into
     it. Sending focus there by hand instead put the site's focus ring, a
     3px green box, around the first service for every reader who opened
     the menu with a thumb and had asked for no such thing. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close(true);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  /* The button is display:none above 860px. A sheet left open across that
     boundary would hang over the desktop layout with no way to shut it. */
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia("(min-width: 860px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [open]);

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        className={`nav-burger${open ? " is-open" : ""}`}
        aria-expanded={open}
        aria-controls="nav-sheet"
        aria-label={open ? "Close menu" : "Menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="nav-burger-bars" aria-hidden="true">
          <span />
          <span />
        </span>
      </button>

      {open && (
        <div
          id="nav-sheet"
          className="nav-sheet"
          /* Not a modal dialog: it is navigation, and the bar with the
             close button stays visible and operable above it. */
          role="group"
          aria-label="Site menu"
        >
          <div className="shell nav-sheet-inner">
            {GROUPS.map((g) => (
              <section className="nav-sheet-group" key={g.key}>
                <h2 className="nav-sheet-head">{g.head}</h2>
                <ul className="nav-sheet-list">
                  {SERVICES.filter((s) => s.group === g.key).map((s) => (
                    <li key={s.id}>
                      <Link
                        className="nav-sheet-item"
                        href={serviceHref(s.id)}
                        onClick={() => close()}
                      >
                        <span>{s.name}</span>
                        {/* Same mark the desktop menu uses: this row leads
                            to a page of its own rather than to a tab. */}
                        {SERVICE_PAGES[s.id] && (
                          <span className="nav-sheet-flag">Page</span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}

            <section className="nav-sheet-group">
              <h2 className="nav-sheet-head">The rest of the site</h2>
              <ul className="nav-sheet-list">
                <li>
                  <Link className="nav-sheet-item" href="/#who" onClick={() => close()}>
                    <span>Who it&rsquo;s for</span>
                  </Link>
                </li>
                <li>
                  <Link className="nav-sheet-item" href="/#faq" onClick={() => close()}>
                    <span>FAQ</span>
                  </Link>
                </li>
                {/* Only anchors that exist on the home page. There is no
                    #work section: the case studies are reached from the
                    logo wall inside #fix. */}
                <li>
                  <Link className="nav-sheet-item" href="/#services" onClick={() => close()}>
                    <span>All services</span>
                  </Link>
                </li>
              </ul>
            </section>

            <a
              className="btn btn-act nav-sheet-act"
              href={WA.general}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => close()}
            >
              WhatsApp us
            </a>
          </div>
        </div>
      )}
    </>
  );
}
