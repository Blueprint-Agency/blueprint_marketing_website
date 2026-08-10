"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { SERVICES, SERVICE_PAGES, serviceHref } from "@/lib/services";

/**
 * The nav's Services menu.
 *
 * WHY A MENU AND NOT A LINK
 * -------------------------
 * "Services" used to be an anchor to `/#services`. That is fine on the home
 * page and useless everywhere else: from a case study or the video page it
 * throws the reader back to the top of a different document to hunt for a
 * band. It also hid the whole offer behind one word — a visitor could not
 * learn that we do booking systems without scrolling a page they had already
 * decided to leave.
 *
 * WHY IT LISTS ALL TWELVE
 * -----------------------
 * The two columns are the site's own taxonomy — the same `group` split the
 * home page's two tab sets and the footer already use. A curated "core four"
 * would have to decide which eight services are not core, and that decision
 * is not recorded anywhere; the honest version is the list we actually sell.
 * Twelve names in two columns of six is one glance, not a wall.
 *
 * EVERY ROW LANDS SOMEWHERE
 * -------------------------
 * See serviceHref() in lib/services.ts. A service with a page goes to the
 * page; the rest deep-link to their own tab in the home page's services
 * section. A dropdown whose rows all scroll to the same band is a menu that
 * lies about being a menu.
 *
 * BEHAVIOUR
 * ---------
 * Opens on hover only where hover is real (`(hover: hover)`), because on a
 * touch screen a tap fires mouseenter and click together and the panel opens
 * and shuts in the same gesture. Everywhere it opens on click. Escape closes
 * and returns focus to the trigger, a click outside closes, moving focus out
 * closes, and ArrowDown from the trigger opens and steps into the list.
 *
 * The bar hides its links below 860px (`.hide-md`), so this menu is desktop
 * chrome. It is not a substitute for a mobile menu, and the site does not
 * have one yet — that is a separate piece of work.
 */

const GROUPS = [
  { key: "attract" as const, head: "Bringing people in" },
  { key: "build" as const, head: "Keeping them once they arrive" },
];

/** Hover-out grace. Long enough to cross the gap between bar and panel. */
const CLOSE_DELAY = 140;

export default function ServicesMenu() {
  const [open, setOpen] = useState(false);
  /** Whether this device actually hovers. Read once, on the client. */
  const [hoverable, setHoverable] = useState(false);
  const hostRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setHoverable(window.matchMedia("(hover: hover)").matches);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY);
  }, [cancelClose]);

  useEffect(() => cancelClose, [cancelClose]);

  /* Outside click. pointerdown rather than click so the panel is gone before
     whatever was clicked underneath it reacts. */
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!hostRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && open) {
      e.stopPropagation();
      setOpen(false);
      btnRef.current?.focus();
      return;
    }
    if (e.key === "ArrowDown" && e.target === btnRef.current) {
      e.preventDefault();
      setOpen(true);
      /* After the panel exists. Opening and focusing in the same tick
         focuses a link that has not been rendered yet. */
      requestAnimationFrame(() =>
        panelRef.current?.querySelector<HTMLElement>("a")?.focus(),
      );
    }
  };

  /**
   * A row was chosen. Close, and if the reader is already sitting on the very
   * hash we are navigating to, nudge ServiceTabs by hand: the browser fires no
   * hashchange when the hash does not change, so the tab would not move and
   * the menu would look broken on the one page it matters most.
   */
  const onPick = (href: string) => {
    setOpen(false);
    if (!href.startsWith("/#") || typeof window === "undefined") return;
    if (window.location.pathname === "/" && window.location.hash === href.slice(1)) {
      window.dispatchEvent(new Event("hashchange"));
    }
  };

  return (
    <div
      ref={hostRef}
      className="nav-menu"
      onMouseEnter={hoverable ? () => { cancelClose(); setOpen(true); } : undefined}
      onMouseLeave={hoverable ? scheduleClose : undefined}
      onKeyDown={onKeyDown}
      onBlurCapture={(e) => {
        if (!hostRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={btnRef}
        type="button"
        className={`nav-link nav-menu-btn${open ? " is-open" : ""}`}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="nav-services-panel"
        onClick={() => setOpen((v) => !v)}
      >
        Services
        <ChevronDown className="nav-menu-caret" size={15} strokeWidth={2.4} aria-hidden="true" />
      </button>

      {/* Rendered always and hidden with the `hidden` attribute, so every
          service name is in the document for a crawler and for a reader
          whose JavaScript has not run — the same rule ServiceTabs follows
          with its twelve panels. */}
      <div
        ref={panelRef}
        id="nav-services-panel"
        className="nav-menu-panel"
        hidden={!open}
      >
        <div className="nav-menu-cols">
          {GROUPS.map((g) => (
            <div className="nav-menu-col" key={g.key}>
              <h2 className="nav-menu-head">{g.head}</h2>
              <ul className="nav-menu-list">
                {SERVICES.filter((s) => s.group === g.key).map((s) => {
                  const href = serviceHref(s.id);
                  return (
                    <li key={s.id}>
                      <Link
                        className="nav-menu-item"
                        href={href}
                        onClick={() => onPick(href)}
                      >
                        <span className="nav-menu-name">{s.name}</span>
                        {/* The one mark in the panel, and it earns its place:
                            it says this row leads to a page of its own rather
                            than to a tab. Nothing else here is decorated. */}
                        {SERVICE_PAGES[s.id] && (
                          <span className="nav-menu-flag">Page</span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <Link
          className="nav-menu-all"
          href="/#services"
          onClick={() => onPick("/#services")}
        >
          See all services
        </Link>
      </div>
    </div>
  );
}
