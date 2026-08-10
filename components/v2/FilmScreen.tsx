"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import type { Film } from "@/lib/films";

/**
 * One film, as a screen you press.
 *
 * WHY A FACADE RATHER THAN AN EMBED
 * ---------------------------------
 * A YouTube <iframe> costs roughly a megabyte of script and a dozen
 * third-party requests before anyone has decided to watch anything, and two
 * of them side by side would be the heaviest thing on the site by an order of
 * magnitude. So the resting state is a still and a button: no iframe, no
 * third-party request, nothing loaded from Google. The embed is created on
 * the click that asks for it, with autoplay set, so pressing play plays the
 * film rather than loading a player the reader then has to press again.
 *
 * It is also the honest version of the design. The page is about film, and a
 * frame from the actual film is a better image than a player's chrome.
 *
 * -nocookie is the domain rather than youtube.com: the reader gets the film
 * without being handed a tracking cookie on a page they only came to look at.
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
}: {
  film: Film;
  /** True for the first film only — it is the page's LCP image. */
  priority?: boolean;
  sizes: string;
  vertical?: boolean;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure className={`film${vertical ? " film-v" : ""}`} id={film.slug}>
      <div className="film-screen">
        {playing ? (
          <iframe
            className="film-embed"
            src={`https://www.youtube-nocookie.com/embed/${film.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            title={film.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            className="film-play"
            onClick={() => setPlaying(true)}
            aria-label={`Play the film: ${film.title}`}
          >
            {film.poster && (
              <Image
                className="film-poster"
                src={film.poster}
                alt=""
                width={vertical ? 720 : 1280}
                height={vertical ? 1280 : 720}
                sizes={sizes}
                priority={priority}
              />
            )}
            <span className="film-mark" aria-hidden="true">
              <Play size={20} strokeWidth={2.4} fill="currentColor" />
            </span>
          </button>
        )}
      </div>

      {/* The client and the kind of film, and nothing else. A description of
          the shoot sat here until 2026-08-10; the user removed it. The film
          is the description. */}
      <figcaption className="film-cap">
        <h3 className="h3">{film.client}</h3>
        <p className="small film-kind">{film.kind}</p>
      </figcaption>
    </figure>
  );
}
