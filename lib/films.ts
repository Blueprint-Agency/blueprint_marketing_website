/**
 * The films shown on /services/video-production.
 *
 * TRUTH RULES OBSERVED HERE (same as lib/clients.ts)
 * --------------------------------------------------
 * - Only films the user has actually supplied a link to appear here.
 * - `client` and `title` are the real client and the real published title.
 *   Nothing is paraphrased into something that sounds better.
 * - The caption is the client and the kind of film. That is all. There was a
 *   `note` field here for a sentence about each shoot; the user removed it on
 *   2026-08-10. Do not reintroduce it by writing plausible-sounding briefs,
 *   which is what an empty field on a portfolio page invites.
 * - No duration, no crew size, no shoot length, no turnaround, no budget.
 *   None of those are on record.
 *
 * POSTERS
 * -------
 * Each film's poster is the client's own published thumbnail, downloaded to
 * /public/films and cropped to a clean 16:9 still: both source frames were
 * letterboxed cinemascope with burned-in subtitles, and the bars plus the
 * subtitle line came off so the poster reads as a frame rather than as a
 * screenshot of a video player. Self-hosted rather than hotlinked from
 * i.ytimg.com so next/image can optimise it and no third-party request is
 * made before the reader chooses to watch anything.
 *
 * Every file in /public/films is 1280x720. Keep it that way; the width and
 * height passed to next/image are what stop the poster shifting the layout.
 */

export type Film = {
  /** Anchor id on the page, so a section further down can link to the film. */
  slug: string;
  youtubeId: string;
  /** The client, named with permission. */
  client: string;
  /** What kind of film it is, in plain words. Not a category label. */
  kind: string;
  /** The published title, verbatim. Used as the iframe and button label. */
  title: string;
  /** 1280x720 still in /public/films. */
  poster: string;
};

/**
 * Landscape films. Order is deliberate: this is the order they are shown in,
 * and the first one is the page's LCP image.
 */
export const FILMS: Film[] = [
  {
    slug: "vm-pacific",
    youtubeId: "lzOI_aqTqa4",
    client: "VM Pacific",
    kind: "Company profile film",
    title: "VM Pacific | Company Profile Video",
    poster: "/films/vm-pacific.jpg",
  },
  {
    slug: "oriental-postnatal-centre",
    youtubeId: "3xOPvJTLbLg",
    client: "Oriental Postnatal Centre",
    kind: "Tour of the centre",
    title: "Oriental Postnatal Centre House Tour",
    poster: "/films/oriental-postnatal-centre.jpg",
  },
];

/**
 * Vertical films: Reels, TikTok, Shorts. 9:16.
 *
 * Ships EMPTY on purpose. The user confirmed on 2026-08-10 that short-form
 * work exists and that the links are coming, so the section and its styling
 * are built and waiting. It renders nothing at all while this array is empty,
 * which is the same pattern lib/testimonials.ts uses: a section with real
 * content in it or no section, never a section with placeholders in it.
 *
 * TO TURN IT ON: add entries below. A poster is not required — leave
 * `poster` as an empty string and the screen falls back to the film's own
 * ground until a still is added to /public/films. Posters should be 720x1280.
 */
export const VERTICAL_FILMS: Film[] = [];
