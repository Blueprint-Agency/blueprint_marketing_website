"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { Shot } from "@/lib/rebuilds";

/**
 * Two websites, side by side, both scrolling as the reader scrolls.
 *
 * WHY NOT THE USUAL DEVICE
 * ------------------------
 * The default before/after is a slider with a handle you drag across one
 * image to reveal another underneath. It is the wrong instrument here, and
 * for a reason worth writing down: a wipe slider only tells the truth when
 * both halves are the same picture. These are two different sites with
 * different sections in a different order — wiping between them compares a
 * hero against a review block and invites the reader to conclude something
 * that is not there.
 *
 * What actually needs comparing is the whole of each page, so the whole of
 * each page is what is shown. Both frames pan from their top to their foot
 * as the section crosses the viewport, in PROPORTION rather than in pixels:
 * the two pages are 4,860 and 6,115px tall, so a shared pixel offset would
 * have one of them finished while the other was still in its middle. At
 * matched percentages the reader is always looking at the same DEPTH of both
 * sites, which is the only honest way to hold them next to each other.
 *
 * NO SCROLL HIJACKING. There is no sticky stage and nothing is pinned. The
 * page scrolls at its own speed and the two images are read off that scroll
 * position; a reader who wants none of this can flick straight past and the
 * section behaves like two static screenshots, because that is all it is.
 *
 * REDUCED MOTION. The effect never starts. Both frames stay at the top of
 * their page, which is the state that carries the comparison anyway: the two
 * first screens are what the argument mostly rests on, and the section under
 * this one quotes the specific differences rather than leaving them to be
 * spotted.
 *
 * ONE LISTENER, NOT TWO. The panes do not each watch the scroll position.
 * The host measures once per frame and writes both transforms, so adding a
 * third pane later costs nothing.
 */

export default function BeforeAfter({
  before,
  after,
  beforeNote,
  afterNote,
}: {
  before: Shot;
  after: Shot;
  beforeNote: string;
  afterNote: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const panRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const host = hostRef.current;
    if (!host) return;

    /* rAF-coalesced. A passive scroll listener fires far more often than the
       compositor can paint, and getBoundingClientRect inside every one of
       those is a layout read per event. */
    let queued = 0;

    const apply = () => {
      queued = 0;
      const box = host.getBoundingClientRect();
      const vh = window.innerHeight;
      /* `crossing` runs 0 to 1 over the whole distance the block travels
         through the viewport: 0 the instant its top edge reaches the bottom
         of the screen, 1 the instant its foot leaves the top. */
      const crossing = (vh - box.top) / (vh + box.height);

      /* The pan uses the middle 55% of that and holds still either side, and
         the lead-in is the important half. Panning straight from `crossing`
         meant the two sites were already a third of the way down by the time
         the block was properly on screen — so the one comparison the page
         most rests on, the two first screens, only existed during the moment
         the block was half off the bottom of the display. Now both frames sit
         at the top of their page while it arrives, start moving once the
         reader is looking at it, and are at the foot before it leaves.

         Expressed as a window on `crossing` rather than as a measurement
         against the viewport, so it behaves the same whether the block is
         two frames wide and half the screen tall or one column on a phone
         that is taller than the screen — where anything solved for
         `vh - height` divides by roughly nothing. */
      const p = Math.min(1, Math.max(0, (crossing - 0.3) / 0.55));

      for (const pan of panRefs.current) {
        const win = pan?.parentElement;
        if (!pan || !win) continue;
        /* Measured from the DOM rather than from the file's intrinsic size:
           the image is rendered at whatever width the column happens to be,
           and the window's height is an aspect-ratio the CSS owns. */
        const travel = pan.offsetHeight - win.clientHeight;
        if (travel <= 0) continue;
        pan.style.transform = `translate3d(0, ${-(travel * p).toFixed(1)}px, 0)`;
      }
    };

    const onScroll = () => {
      if (!queued) queued = requestAnimationFrame(apply);
    };

    /* Images decode after this effect runs, and offsetHeight is wrong until
       they do. The load listener catches that; resize catches the column
       changing width, which changes both heights at once. */
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("load", onScroll);
    return () => {
      if (queued) cancelAnimationFrame(queued);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("load", onScroll);
    };
  }, []);

  const panes: { tag: string; shot: Shot; note: string }[] = [
    { tag: "Before", shot: before, note: beforeNote },
    { tag: "After", shot: after, note: afterNote },
  ];

  return (
    <div className="ba" ref={hostRef}>
      {panes.map((pane, i) => (
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
            <div className="ba-window">
              <div
                className="ba-pan"
                ref={(el) => {
                  panRefs.current[i] = el;
                }}
              >
                <Image
                  src={pane.shot.src}
                  alt={pane.shot.alt}
                  width={pane.shot.width}
                  height={pane.shot.height}
                  sizes="(min-width: 900px) 560px, 92vw"
                  /* Both are above the fold of a page whose entire point is
                     that you can see them, and a lazy full-page screenshot
                     fading in halfway through the pan is worse than the
                     bytes it saves. */
                  priority={i === 1}
                />
              </div>
            </div>
          </div>
        </figure>
      ))}
    </div>
  );
}
