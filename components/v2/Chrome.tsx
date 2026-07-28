import Link from "next/link";
import { SERVICES } from "@/lib/services";
import { SITE, WA } from "@/lib/site";

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

export function Nav() {
  return (
    <header className="nav">
      <div className="shell nav-row">
        <Link className="nav-brand" href="/">
          <span className="mark" aria-hidden="true">
            B
          </span>
          <span className="nav-word">Blueprint</span>
        </Link>
        <nav className="nav-links" aria-label="Main">
          <a href="/#services" className="nav-link hide-md">
            Services
          </a>
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
              {attract.map((s) => (
                <li key={s.id}>
                  <a className="foot-link" href="/#services">
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="foot-head">Keeping them</h2>
            <ul className="foot-list">
              {build.map((s) => (
                <li key={s.id}>
                  <a className="foot-link" href="/#services">
                    {s.name}
                  </a>
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
