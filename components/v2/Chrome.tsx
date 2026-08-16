"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SERVICES, serviceHref } from "@/lib/services";
import { SITE, WA } from "@/lib/site";
import MobileMenu from "./MobileMenu";
import ServicesMenu from "./ServicesMenu";

/**
 * Nav and footer for the Plain world.
 *
 * Lifted out of the homepage when v2 became the only design, so the case
 * study pages and the 404 wear the same chrome as the page they are reached
 * from. Previously each page carried its own copy and the two worlds' navs
 * disagreed about what the site even was.
 *
 * The nav links point at homepage anchors, so they are absolute (`/#services`)
 * rather than bare fragments. On a case study page a bare `#services` would
 * scroll to nothing.
 */

/**
 * `overHero` is passed only by a page whose first viewport is a dark hero —
 * in practice, the homepage. It lets the nav go see-through so the hero's
 * mesh grid runs behind it, and switches it to frosted glass on scroll.
 *
 * It has to be opt-in rather than automatic. This nav is shared chrome: on a
 * case study page or the 404 the first viewport is paper, and a transparent
 * bar carrying white type would be white-on-white until the reader scrolled.
 */
export function Nav({ overHero }: { overHero?: boolean } = {}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!overHero) return;
    /* 12px rather than 0: a trackpad resting against the page produces a
       stream of 1-2px scroll events, and a bar that frosts and clears on
       every one of them is a flicker, not a transition. */
    const read = () => setScrolled(window.scrollY > 12);
    read();
    window.addEventListener("scroll", read, { passive: true });
    return () => window.removeEventListener("scroll", read);
  }, [overHero]);

  return (
    <header
      className={`nav${overHero ? " nav-over" : ""}`}
      data-scrolled={overHero && scrolled ? "true" : undefined}
    >
      <div className="shell nav-row">
        <Link className="nav-brand" href="/">
          <span className="mark" aria-hidden="true">
            B
          </span>
          <span className="nav-word">Blueprint</span>
        </Link>
        <nav className="nav-links" aria-label="Main">
          {/* Services is a menu rather than an anchor. See ServicesMenu:
              from any page that is not the home page, `/#services` sent the
              reader to the top of another document to go looking. */}
          <ServicesMenu />
          <a href="/#who" className="nav-link hide-md">
            Who it&rsquo;s for
          </a>
          <a href="/#faq" className="nav-link hide-md">
            FAQ
          </a>
          <a
            className="btn btn-act btn-sm"
            href={WA.general}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp us
          </a>
          {/* Below 860px this is the only way into the site from the bar:
              ServicesMenu hides itself and .hide-md drops the rest. */}
          <MobileMenu />
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  const attract = SERVICES.filter((s) => s.group === "attract");
  const build = SERVICES.filter((s) => s.group === "build");

  return (
    <footer className="foot">
      <div className="shell">
        <div className="foot-grid">
          <div>
            <div className="nav-brand">
              <span className="mark" aria-hidden="true">
                B
              </span>
              <span className="nav-word">Blueprint</span>
            </div>
            <p className="small" style={{ marginTop: 12, maxWidth: "34ch" }}>
              Marketing and the systems that catch it, for Malaysian
              businesses.
            </p>
          </div>

          <div>
            <h2 className="foot-head">Bringing people in</h2>
            <ul className="foot-list">
              {/* One rule for where a service links, shared with the nav's
                  Services menu: serviceHref() in lib/services.ts. A service
                  with a page goes to it, the rest to their own tab in the
                  home page's services section. */}
              {attract.map((s) => (
                <li key={s.id}>
                  <Link className="foot-link" href={serviceHref(s.id)}>
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="foot-head">Keeping them</h2>
            <ul className="foot-list">
              {build.map((s) => (
                <li key={s.id}>
                  <Link className="foot-link" href={serviceHref(s.id)}>
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="foot-head">Talk to us</h2>
            <ul className="foot-list">
              <li>
                <a
                  className="foot-link"
                  href={WA.general}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp {SITE.whatsappDisplay}
                </a>
              </li>
              <li>
                <a className="foot-link" href={`mailto:${SITE.email}`}>
                  {SITE.email}
                </a>
              </li>
              <li>
                <a className="foot-link" href="/#faq">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="foot-base">
          <span className="small">
            © {new Date().getFullYear()} {SITE.legalName}
          </span>
        </div>
      </div>
    </footer>
  );
}
