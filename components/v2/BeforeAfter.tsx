import Image from "next/image";
import type { PagePair } from "@/lib/rebuilds";

/**
 * Two websites, side by side, each shown whole.
 *
 * NOT A SLIDER, AND NO LONGER A SCROLLING WINDOW
 * ----------------------------------------------
 * The default before/after is a wipe slider: a handle you drag across one
 * image to reveal another underneath. It is the wrong instrument here, and
 * for a reason worth keeping on record — a wipe only tells the truth when
 * both halves are the same picture. These are two different sites with
 * different sections in a different order, so wiping between them compares a
 * hero against a review block and invites a conclusion that is not there.
 *
 * This shipped once as the other clever option: a fixed window per site with
 * the screenshot panning through it on scroll, both in proportion so the
 * reader was always at the same depth of each page. The user cut it on
 * 2026-08-13 in favour of the plain thing, and the plain thing is better.
 *
 *  - A moving picture asks to be watched. These want to be READ, at whatever
 *    pace the reader chooses. A pan takes that control away.
 *
 *  - The window was 4:3, so at any instant about a seventh of each site was
 *    visible. What is actually persuasive is the LENGTH: that one page keeps
 *    going where the other stops. A window hides exactly that.
 *
 *  - It cost a scroll listener and a layout read per frame, on a page whose
 *    entire content is pictures.
 *
 * So: two pictures at their natural height, in the site's browser frame, and
 * nothing else. No client boundary, no JavaScript, and it degrades to
 * precisely itself.
 *
 * THE HEIGHTS DO NOT MATCH, AND ARE NOT MADE TO
 * ---------------------------------------------
 * Both render at the column's width and keep their own ratio, so the taller
 * page runs on after the shorter one has ended. Nothing pads the short one to
 * meet it and nothing crops the tall one back — on Vatti's category pages the
 * new one is half as long again, and that is one of the findings.
 */

export default function BeforeAfter({
  pair,
  beforeNote,
  afterNote,
  eager = false,
}: {
  pair: PagePair;
  beforeNote: string;
  afterNote: string;
  /**
   * Only the first pair on the page. The rest are lazy: there are twelve
   * full-page captures in this document and eagerly fetching all of them
   * would be several megabytes before the reader has scrolled anywhere.
   */
  eager?: boolean;
}) {
  const panes = [
    { tag: "Before", shot: pair.before, note: beforeNote },
    { tag: "After", shot: pair.after, note: afterNote },
  ];

  return (
    <div className="ba">
      {panes.map((pane) => (
        <figure className="ba-pane" key={pane.tag}>
          <div className="ba-tag">
            <span className="ba-tag-word">{pane.tag}</span>
            <span className="ba-tag-note">{pane.note}</span>
          </div>

          {/* The site's own browser frame, unchanged. Both bars carry the
              client's domain rather than the address each capture came from —
              it is one site at one address, before and after, and that is the
              whole shape of the comparison. See lib/rebuilds.ts. */}
          <div className="frame ba-frame">
            <div className="frame-bar" aria-hidden="true">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
              <span className="frame-url small">{pane.shot.url}</span>
            </div>
            {/* `.frame img` already sets width 100% and height auto, so the
                file's own ratio decides how tall this ends up. */}
            <Image
              src={pane.shot.src}
              alt={pane.shot.alt}
              width={pane.shot.width}
              height={pane.shot.height}
              sizes="(min-width: 900px) 560px, 92vw"
              priority={eager}
              loading={eager ? undefined : "lazy"}
            />
          </div>
        </figure>
      ))}
    </div>
  );
}
