import Image from "next/image";
import type { PagePair, Shot } from "@/lib/rebuilds";

/**
 * Two websites, side by side, each shown whole, each inside a window it
 * scrolls through under the reader's own hand.
 *
 * WHAT THIS IS NOT, AND HAS TWICE REFUSED TO BE
 * ---------------------------------------------
 * NOT A WIPE SLIDER. A wipe only tells the truth when both halves are the
 * same picture. These are two different sites with different sections in a
 * different order, so wiping between them compares a hero against a review
 * block and invites a conclusion that is not there.
 *
 * NOT A PAN. This shipped once with the screenshot moving through a fixed
 * window on page scroll. The user cut it on 2026-08-13 and the reasons still
 * hold: a moving picture asks to be watched, and these want to be READ, at
 * whatever pace the reader chooses.
 *
 * WHAT CHANGED ON 2026-08-17
 * --------------------------
 * The plain version that replaced the pan put both captures on the page at
 * their natural height. Correct, and unaffordable: four pairs at a 552px
 * column ran to about 15,000px of screenshot, and the user asked for the
 * page to be shorter.
 *
 * So each capture now sits in a window of its own that the READER scrolls,
 * which is the distinction the 2026-08-13 note was actually drawing. The pan
 * moved the picture for her. This does not move at all until she moves it,
 * and it moves only the pane she is pointing at. Nothing is cropped, nothing
 * is scaled down, nothing is hidden behind a control, and there is still no
 * JavaScript in this file.
 *
 * THE WINDOWS ARE DIFFERENT HEIGHTS, AND THAT IS THE POINT
 * -------------------------------------------------------
 * The old layout carried one argument for free that a fixed window would
 * have thrown away: the taller page ran on after the shorter one had ended,
 * so you could SEE that the rebuild is half as long again without reading a
 * word of it.
 *
 * That survives here at one tenth the scale. The taller capture gets the
 * full stage height; the shorter one gets the same fraction of it that its
 * real height is of the taller (`--ba-share` below, computed off the
 * intrinsic sizes recorded in lib/rebuilds.ts). Both panes start at the same
 * top edge, so the shorter site's window ends higher on the screen, in the
 * same proportion the sites themselves differ by.
 *
 * This is the one thing to preserve if this component is touched again. A
 * well-meaning edit that gives both panes the same height loses the finding
 * and leaves two identical boxes that say nothing about either site.
 */

/** How tall this capture renders, per unit of column width. */
const ratio = (s: Shot) => s.height / s.width;

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
   * Only the first pair on the page. The rest are lazy: there are eight
   * full-page captures in this document and eagerly fetching all of them
   * would be several megabytes before the reader has scrolled anywhere.
   */
  eager?: boolean;
}) {
  const tallest = Math.max(ratio(pair.before), ratio(pair.after));

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

            {/* A scrollable region has to be reachable from a keyboard, or
                the only people who can read the capture are the ones holding
                a mouse. tabIndex and a name, and the browser gives it arrow
                keys, Page Up and Page Down for nothing. */}
            <div
              className="ba-view"
              tabIndex={0}
              role="group"
              aria-label={`${pane.tag}: ${pane.shot.url}, scroll to read the whole page`}
              style={
                {
                  "--ba-share": ratio(pane.shot) / tallest,
                } as React.CSSProperties
              }
            >
              {/* `.frame img` already sets width 100% and height auto, so the
                  file's own ratio decides how long this runs inside the
                  window. Nothing here resizes it. */}
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
          </div>
        </figure>
      ))}
    </div>
  );
}
