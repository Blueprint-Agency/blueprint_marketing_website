"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import type { Film } from "@/lib/films";

/**
 * One film, as a screen you press.
 *
 * WHY A FACADE RATHER THAN AN EMBED
 * ---------------------------------
 * A YouTube <iframe> costs roughly a megabyte of script and a dozen
 * third-party requests before anyone has decided to watch anything, and four
 * of them side by side would be the heaviest thing on the site by an order of
 * magnitude. So the resting state is a still and a button: no iframe, no
 * third-party request, nothing loaded from Google. The embed is created on
 * the click that asks for it, with autoplay set, so pressing play plays the
 * film rather than loading a player the reader then has to press again.
 *
 * -nocookie is the domain rather than youtube.com: the reader gets the film
 * without being handed a tracking cookie on a page they only came to look at.
 *
 * THE FLIP CARD (`flip`, added 2026-08-11)
 * ----------------------------------------
 * The landscape films opt into a cover. At rest each one is a navy card
 * carrying the client's name; it turns over to the still, and the still is
 * what you press.
 *
 * The reason is not decoration. These posters are the clients' own published
 * thumbnails and we do not hold the footage, so they are the only frames
 * available — and four of them side by side is four different colour
 * temperatures, two burned-in subtitle styles and one badly motion-blurred
 * frame, on a black band. The user called it on 2026-08-11. A cover fixes the
 * grid without touching the films, and it does something the posters could
 * not: it puts the client's name at full size, which is the actual proof.
 *
 * Nothing is hidden that the reader cannot get to in one gesture, and the
 * still is still the thing behind the cover rather than a substitute for it.
 *
 * INTERACTION
 * -----------
 * Hover flips it where hover is real; where it is not, the first tap flips
 * and the second plays. That two-tap rule is why focus does NOT flip the card
 * on a touch device: a tap fires focus and click together, the focus handler
 * would flip it, and the click handler would then find it already flipped and
 * start the film on the first tap.
 *
 * The whole card is ONE button, front and back. Two focusable faces inside a
 * flipping container is a tab order that lands on things nobody can see.
 *
 * Playing drops the 3D entirely and renders the plain screen. An iframe
 * inside a preserve-3d subtree is a rendering bug waiting to be reported, and
 * there is nothing left to flip back to once the film is running.
 *
 * The poster carries alt="" because it is inside a <button> that already
 * names the film. Alt text here would make a screen reader read the film's
 * title twice for one control.
 */
export default function FilmScreen({
  film,
  priority = false,
  sizes,
  vertical = false,
  flip = false,
  index = 0,
}: {
  film: Film;
  /** True for the first film only — it is the page's LCP image. */
  priority?: boolean;
  sizes: string;
  vertical?: boolean;
  /** Wear a cover that turns over to the still. Landscape films only. */
  flip?: boolean;
  /** Position in its grid. Varies the cover's gradient; nothing else. */
  index?: number;
}) {
  const [playing, setPlaying] = useState(false);
  const [flipped, setFlipped] = useState(false);
  /** Whether this device actually hovers. Read once, on the client. */
  const [hoverable, setHoverable] = useState(false);

  useEffect(() => {
    if (flip) setHoverable(window.matchMedia("(hover: hover)").matches);
  }, [flip]);

  /* A cover that has not been turned over is not covering a decision the
     reader has made yet: the first press turns it, the second plays. On a
     hovering device the turn has already happened by the time a press is
     possible, so the first press plays. */
  const press = () => {
    if (hoverable || flipped) setPlaying(true);
    else setFlipped(true);
  };

  const label = `Play the film: ${film.client}, ${film.kind.toLowerCase()}`;

  /* The still, and the control drawn on it. Shared by the plain screen and
     the back of the cover so the two cannot drift apart. */
  const still = (
    <>
      {film.poster && (
        <Image
          className="film-poster"
          src={film.poster}
          alt=""
          width={vertical ? 720 : 1280}
          height={vertical ? 1280 : 720}
          sizes={sizes}
          /* Never on a flip card. Behind a cover the still is not the
             largest painted element, so preloading it buys nothing and
             costs a request on first paint. It is in the viewport well
             before anyone reaches it, so the default lazy load has it
             ready by the time the card turns. */
          priority={flip ? false : priority}
        />
      )}
      <span className="film-mark" aria-hidden="true">
        <Play size={20} strokeWidth={2.4} fill="currentColor" />
      </span>
    </>
  );

  return (
    <figure className={`film${vertical ? " film-v" : ""}`} id={film.slug}>
      {playing ? (
        <div className="film-screen">
          <iframe
            className="film-embed"
            src={`https://www.youtube-nocookie.com/embed/${film.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            title={film.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      ) : flip ? (
        /* The BUTTON does not rotate. The span inside it does.

           This is load-bearing, not tidiness. With the listeners on the
           rotating element the card oscillated: a rotating element's
           hit-testable area is its PROJECTION, which narrows as it turns,
           so a pointer resting anywhere but dead centre fell outside the
           element part-way through the turn, fired mouseleave, and started
           the turn back — which widened the projection, fired mouseenter,
           and began the whole thing again. Sweeping across the row made a
           card flap five times. The button's own box never moves, so
           hover, click and the focus ring are all measured against
           something that holds still. */
        <button
          type="button"
          className="film-flip"
          style={{ ["--i" as string]: index }}
          data-flipped={flipped ? "true" : undefined}
          aria-label={label}
          onClick={press}
          onMouseEnter={hoverable ? () => setFlipped(true) : undefined}
          onMouseLeave={hoverable ? () => setFlipped(false) : undefined}
          /* Focus turns the card only where a press cannot also have
             happened in the same gesture. See INTERACTION above. */
          onFocus={hoverable ? () => setFlipped(true) : undefined}
          onBlur={hoverable ? () => setFlipped(false) : undefined}
        >
          <span className="film-flipper">
            <span className="film-face film-face-front">
              {/* aria-hidden: the button's own label already says the client
                  and the kind. Left readable, a screen reader announces the
                  name, then the kind, then the same two again as the label. */}
              <span className="film-cover" aria-hidden="true">
                <span className="film-cover-name">{film.client}</span>
                <span className="film-cover-kind">{film.kind}</span>
                <span className="film-cover-cue">Watch the film</span>
              </span>
            </span>
            <span className="film-face film-face-back">{still}</span>
          </span>
        </button>
      ) : (
        <div className="film-screen">
          <button
            type="button"
            className="film-play"
            onClick={() => setPlaying(true)}
            /* Built from the caption rather than from film.title, which is
               the published title verbatim and on most of these is the
               export file name ("YogaSadhana_June_TaiSeng_Opening"). Read
               aloud, that is a string of characters; the client and the kind
               of film is what the control actually does. The real title is
               still on the iframe once it exists. */
            aria-label={label}
          >
            {still}
          </button>
        </div>
      )}

      {/* The client and the kind of film, and nothing else. A description of
          the shoot sat here until 2026-08-10; the user removed it. The film
          is the description.

          A flip card carries both on its cover at full size, so it does not
          get a caption as well — the same two lines twice, one of them in
          32px type, is the layout talking over itself. */}
      {!flip && (
        <figcaption className="film-cap">
          <h3 className="h3">{film.client}</h3>
          <p className="small film-kind">{film.kind}</p>
        </figcaption>
      )}
    </figure>
  );
}
