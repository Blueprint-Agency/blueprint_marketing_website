import Image from "next/image";
import type { Testimonial } from "@/lib/testimonials";

/**
 * Client testimonials, as a self-scrolling row of cards.
 *
 * Was a one-at-a-time fader with dots and arrows until 2026-07-29. It is now
 * the same device the logo wall uses, for the same reasons and with the same
 * three fixes already worked out there:
 *
 * 1. THE TRACK HOLDS THE LIST TWICE and slides exactly -50%, so the moment
 *    the first copy leaves the frame the second is sitting precisely where it
 *    began and the loop has no seam.
 * 2. SPACING IS MARGIN ON THE ITEM, NOT GAP ON THE TRACK. With gap the track
 *    measures 12 cards + 11 gaps, so -50% lands a half-gap short of where the
 *    second copy starts and the loop stutters once per cycle.
 * 3. THE SECOND COPY IS DECORATION: aria-hidden so a screen reader is not
 *    read six clients twice, and inert so nothing inside it can be tabbed to.
 *
 * NO JAVASCRIPT. Pausing is `:hover` and `:focus-within` on the frame, the
 * per-card glow is `:hover` on the card, and reduced motion is a media query
 * that stops the crawl and turns the row into a plain scrollable strip. That
 * makes this a server component — the previous version shipped a client
 * bundle to run a timer that CSS was always able to do.
 */

function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="tst-card">
      <blockquote className="tst-quote">
        <p>{t.quote}</p>
      </blockquote>
      <figcaption className="tst-by">
        <span className="tst-face">
          {t.photo ? (
            <Image src={t.photo} alt="" width={104} height={104} />
          ) : (
            <span className="tst-initials" aria-hidden="true">
              {initials(t.name)}
            </span>
          )}
        </span>
        <span className="tst-who">
          <span className="tst-name">{t.name}</span>
          <span className="tst-role">
            {t.title}, {t.company}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

/** Their initials, for when a photo has not been supplied yet. Two letters at
 *  most: three-part names are common here and "JSL" reads as a code. */
function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  const first = parts[0][0];
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export default function Testimonials({ items }: { items: Testimonial[] }) {
  if (items.length === 0) return null;

  return (
    <div className="tst-marquee">
      <ul className="tst-track">
        {items.map((t) => (
          <li key={`${t.name}-${t.company}`}>
            <Card t={t} />
          </li>
        ))}
        {items.map((t) => (
          <li key={`${t.name}-${t.company}-dup`} aria-hidden="true" inert>
            <Card t={t} />
          </li>
        ))}
      </ul>
    </div>
  );
}
