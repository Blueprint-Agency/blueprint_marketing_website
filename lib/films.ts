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
 * TITLES ARE THE PUBLISHED ONES, VERBATIM (2026-08-10)
 * ----------------------------------------------------
 * Four of the six read like the file names they were exported as
 * ("YogaSadhana_June_TaiSeng_Opening"). They are kept exactly as published,
 * because this field's job is to record what the video is actually called and
 * a tidied-up version is a small fiction. It is no longer what a screen reader
 * announces: FilmScreen's accessible label is built from `client` and `kind`
 * instead, for exactly this reason. `title` is the iframe's title attribute,
 * where the real name is the useful one.
 *
 * POSTERS
 * -------
 * Each film's poster is the client's own published thumbnail, downloaded to
 * /public/films. Self-hosted rather than hotlinked from i.ytimg.com so
 * next/image can optimise it and no third-party request is made before the
 * reader chooses to watch anything.
 *
 * Landscape posters are cropped to a clean 16:9 still. All three source frames
 * carried burned-in subtitles, and on the first two a letterboxed cinemascope
 * bar as well; both came off so the poster reads as a frame rather than as a
 * screenshot of a video player.
 *
 * Vertical posters are NOT cropped, and the difference is deliberate. A reel
 * is a captioned medium: the caption is part of how the thing is designed to
 * be watched, and a short-form still with the words taken out stops looking
 * like short-form. They are the published frame, downscaled.
 *
 * Landscape files in /public/films are 1280x720 and vertical ones are 720x1280.
 * Keep it that way; the width and height passed to next/image are what stop
 * the poster shifting the layout.
 */

export type Film = {
  /** Anchor id on the page, so a section further down can link to the film. */
  slug: string;
  youtubeId: string;
  /** The client, named with permission. */
  client: string;
  /** What kind of film it is, in plain words. Not a category label. */
  kind: string;
  /** The published title, verbatim. Used as the iframe title. */
  title: string;
  /** 1280x720 still in /public/films (720x1280 for the verticals). */
  poster: string;
};

/**
 * Landscape films. Order is deliberate: this is the order they are shown in
 * and the first one is the page's LCP image. Four of them, shown two up and
 * two down, which is why a fifth should arrive with a sixth rather than on
 * its own.
 *
 * Four different jobs on purpose: a tour, a company profile, a customer
 * testimonial and a treatment.
 *
 * WHY THE TOUR LEADS AND NOT THE PROFILE
 * --------------------------------------
 * The company profile led until the page went to three films on 2026-08-10.
 * VM Pacific's only available still is a motion-blurred frame — the published
 * thumbnail is mid-gesture and the faces are smeared — and there is no better
 * source, since the poster is the client's own published thumbnail and we do
 * not hold the footage. It was the wrong image to make the biggest on the
 * page.
 *
 * The first slot is no longer full width, so that argument is weaker than it
 * was, but the second one stands: the page's headline is "Some businesses have
 * to be seen", and the tour's still is a real room, a real member of staff and
 * a row of cots, in a place you can tell is here. A company profile of a
 * company the reader cannot place proves less.
 */
export const FILMS: Film[] = [
  {
    slug: "oriental-postnatal-centre",
    youtubeId: "3xOPvJTLbLg",
    client: "Oriental Postnatal Centre",
    kind: "Tour of the centre",
    title: "Oriental Postnatal Centre House Tour",
    poster: "/films/oriental-postnatal-centre.jpg",
  },
  {
    slug: "vm-pacific",
    youtubeId: "lzOI_aqTqa4",
    client: "VM Pacific",
    kind: "Company profile film",
    title: "VM Pacific | Company Profile Video",
    poster: "/films/vm-pacific.jpg",
  },
  {
    /* Named from the mark on the wall in the film's own opening frames:
       "Garden Gem · Postnatal Retreat · 宝苑". The published YouTube title
       says "Confinement Centre" and the user called it a "Confinement
       Retreat"; the business's own signage is the tiebreak. */
    slug: "garden-gem",
    youtubeId: "yLw3fndskmQ",
    client: "Garden Gem Postnatal Retreat",
    kind: "A customer, on camera",
    title: "Garden Gem Confinement Centre_English vTestimonial",
    poster: "/films/garden-gem.jpg",
  },
  {
    /* The poster is NOT this film's published thumbnail. That frame is a
       procedure close-up carrying two burned-in text layers, and the top one
       reads 非常安全 — "very safe". Cropping to clear both leaves a window
       roughly 725px wide, which upscaled into a face filling the tile.

       This still comes from one of YouTube's own auto-generated frames
       instead: the doctor and a patient in the clinic, holding the Kaiteki
       mirror. Cleaner, and it makes the honest point better. It is also the
       one poster on this page that is not the client's chosen thumbnail, and
       the reason is worth stating plainly: republishing a clinic's safety
       claim as artwork on our own site is us making a medical claim, and
       PRODUCT.md Principle 1 does not allow it. */
    slug: "kaiteki-double-eyelid",
    youtubeId: "RPstMk_I4cM",
    client: "Kaiteki Clinic",
    kind: "A treatment, on camera",
    title: "Double Eyelid Suture - Kaiteki Clinic",
    poster: "/films/kaiteki-double-eyelid.jpg",
  },
];

/**
 * Vertical films: Reels, TikTok, Shorts. 9:16.
 *
 * Shipped empty from 2026-08-10 until the user supplied three the same day,
 * then three more. The section renders itself only when there is something
 * real in it, and now there is plenty.
 *
 * One of them is the Oriental Postnatal house tour again, cut down and sped up
 * for the feed. That repetition is the most useful thing on the page rather
 * than a duplicate to hide: it is the same shoot in both formats, on the same
 * page, which is the argument the section makes in words.
 *
 * ORDER
 * -----
 * Six across two rows of three. Three clients appear twice in this list, and
 * the order below is the one arrangement where no client repeats within a row
 * OR within a column of that grid — a repeat in either reads as a mistake in
 * a matrix this small. If a seventh short is added, check that again rather
 * than appending blindly.
 */
export const VERTICAL_FILMS: Film[] = [
  {
    slug: "yoga-sadhana",
    youtubeId: "O-aoapttfb0",
    client: "Yoga Sadhana",
    kind: "A new studio, on opening day",
    title: "YogaSadhana_June_TaiSeng_Opening",
    poster: "/films/yoga-sadhana.jpg",
  },
  {
    slug: "kaiteki",
    youtubeId: "NnS7mdha9_w",
    client: "Kaiteki Clinic",
    kind: "The doctor, on acne scars",
    title: "AcneScar Doctor - Kaiteki Clinic",
    poster: "/films/kaiteki.jpg",
  },
  {
    slug: "oriental-postnatal-short",
    youtubeId: "S05sR4a9Ws4",
    client: "Oriental Postnatal Centre",
    kind: "The house tour, sped up",
    title: "Oriental Postnatal - Sped Up House Tour",
    poster: "/films/oriental-postnatal-short.jpg",
  },
  {
    /* The client is named from the published title, "Careplus_July_Kiss".
       The user described this one as "Dr Chan GP in STD niche", which is the
       niche rather than a trading name, so it is not what the caption says.

       `kind` is the frame's own words: the film opens on an "Ask me a
       question" card and the doctor answers it. It names neither the
       condition nor the act, and that is a judgement, not squeamishness —
       the caption's job is to say what kind of film this is, and "a doctor
       taking questions" is the kind. The subject is visible in the poster
       for anyone reading it, which is the client's own choice to have made
       and not ours to restate. */
    slug: "careplus",
    youtubeId: "ZXRuYhhUREc",
    client: "Careplus",
    kind: "A doctor, taking questions",
    title: "Careplus_July_Kiss",
    poster: "/films/careplus.jpg",
  },
  {
    slug: "yoga-sadhana-group",
    youtubeId: "SyGvH9ygWPg",
    client: "Yoga Sadhana",
    kind: "A group testimonial",
    title: "YogaSadhana_June_Group_Testimonial",
    poster: "/films/yoga-sadhana-group.jpg",
  },
  {
    /* The published title carries the offer itself, "RM16,888 Limited
       Opening Promo". The caption does not repeat it: that price is the
       client's, it was a limited opening offer and may well be over, and a
       stale number on our page would be the client's promise going out of
       date in our shop window. */
    slug: "oriental-promo",
    youtubeId: "gq6TM0p0Nf8",
    client: "Oriental Postnatal Centre",
    kind: "An opening promotion",
    title: "Oriental RM16,888 Limited Opening Promo (Chinese)",
    poster: "/films/oriental-promo.jpg",
  },
];
