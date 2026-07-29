/**
 * ============================================================
 *  PREVIEW / MOCKUP MODE
 * ============================================================
 *
 * Turned on 2026-07-27 at the user's request, so the design can be judged
 * with populated data before real material exists.
 *
 *  >>> EVERY FIGURE AND LOGO BELOW IS INVENTED. <<<
 *
 * None of it describes anything Blueprint has actually achieved for any
 * client. It exists only so the layout can be evaluated with content in it.
 *
 * ------------------------------------------------------------
 *  TO TURN IT OFF BEFORE THIS GOES ANYWHERE NEAR THE PUBLIC
 * ------------------------------------------------------------
 *  Set PREVIEW_DATA to false. That is the whole procedure.
 *  The results grid reverts to the honest "On results" note and the logo
 *  wall reverts to typographic wordmark cells. Nothing breaks.
 *
 * While it is true, a fixed warning bar is pinned to every viewport of the
 * page. That bar is deliberate and must not be removed while the flag is
 * on — it is the only thing standing between a mockup and a published lie.
 *
 * PRODUCT.md forbids inventing outcome figures. This file does not create
 * an exception to that rule; it quarantines the violation behind a switch
 * and a visible label so it cannot ship silently.
 */

import type { ClientResults } from "./results";
import type { Testimonial } from "./testimonials";

/* OFF, then BACK ON, both on 2026-07-29. It went off when the invented
   results grid was removed. It is on again because the user asked for the
   testimonial slider to be populated with mock data so the design can be
   judged — the same request, for the same reason, that created this file.

   That is exactly what this switch is for: the invented material is
   quarantined behind a flag and a warning bar rather than being written
   into lib/testimonials.ts, which is the file that will hold real quotes.
   Those two things must never be in the same array, or the day the real
   ones arrive nobody will be able to tell which is which. */
export const PREVIEW_DATA = true;

/** INVENTED. Not measured. Not Five Clinic's real numbers.
 *  UNUSED since 2026-07-29 — kept only as the shape lib/results.ts expects,
 *  so it is obvious what a filled-in ClientResults looks like. Nothing
 *  imports it, and turning PREVIEW_DATA back on will not render it. */
export const MOCK_RESULTS: ClientResults = {
  slug: "five-clinic",
  client: "Five Clinic",
  period: "Sample period, not a real project window",
  headline: "What changed after we rebuilt the funnel",
  metrics: [
    { value: "3.4×", label: "more booked consultations per month" },
    { value: "under 1 min", label: "average first reply to a WhatsApp enquiry" },
    { value: "12", label: "treatment terms ranking on page one in KL" },
  ],
  note: "SAMPLE DATA. These figures are invented for design preview and describe nothing that happened. Replace via lib/results.ts before publishing.",
};

/**
 * Placeholder marks for the logo wall.
 *
 * These are deliberately generic monogram tiles, NOT imitations of the real
 * companies' brands. Inventing a logo for a business that exists would
 * misrepresent them, so each cell shows a neutral initial tile beside the
 * name — enough to judge weight, rhythm and spacing on the wall, and
 * obviously not anybody's actual mark.
 *
 * Real files replace these entirely; see lib/logos.ts.
 */
export const MOCK_LOGO_TINTS: Record<string, string> = {
  "five-clinic": "#1e4fe0",
  "vatti-malaysia": "#0f766e",
  kaiteki: "#6c4bf0",
  "aq-energy": "#c2761a",
  teeko: "#b42d5c",
  "yoga-sadhana": "#1a7f5a",
};

/**
 * Placeholder testimonials, one per named client.
 *
 *  >>> EVERY QUOTE AND EVERY PERSON BELOW IS INVENTED. <<<
 *
 * Nobody said any of this. The names are not real people — they are not the
 * founders, staff or representatives of these companies, and any resemblance
 * to someone who actually works there is accidental. Dr Calvin Choo, the one
 * real individual PRODUCT.md names, is deliberately NOT quoted here: putting
 * invented words in an identifiable person's mouth is a different and worse
 * thing than a placeholder.
 *
 * The company names ARE real clients, because the user asked for one card per
 * client so the slider could be judged with the actual roster in it. That is
 * the specific reason this array must never outlive the preview flag: it
 * attributes fabricated praise to six businesses that exist.
 *
 * The photos are generated silhouettes on a tint, not faces. Same principle
 * as MOCK_LOGO_TINTS below: enough to judge the layout, obviously nobody.
 *
 * REPLACING THESE
 * ---------------
 * Do not edit this array into truth. Put real quotes in lib/testimonials.ts
 * and set PREVIEW_DATA = false. The real file wins automatically and this one
 * stops rendering. Keeping invented and genuine quotes in one array is how a
 * placeholder ends up published as a client's word.
 */
export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "We were spending on ads and had no idea which half was working. They found the leak in the booking flow first, before asking us to spend another ringgit.",
    name: "Sample Name",
    title: "Clinic Director",
    company: "Five Clinic",
    photo: "/testimonials/five-clinic.png",
  },
  {
    quote:
      "The enquiries were always there. They just went cold overnight and nobody chased them. Now the follow up happens whether or not anyone remembers to do it.",
    name: "Sample Name",
    title: "Marketing Lead",
    company: "Vatti Malaysia",
    photo: "/testimonials/vatti.png",
  },
  {
    quote:
      "What we actually wanted was one team who would build the thing they recommended. That turned out to be surprisingly hard to find.",
    name: "Sample Name",
    title: "Founder",
    company: "Kaiteki",
    photo: "/testimonials/kaiteki.png",
  },
  {
    quote:
      "They explain what they did in plain words. I do not have a marketing department and I never had to pretend I understood a dashboard.",
    name: "Sample Name",
    title: "Operations Manager",
    company: "AQ Energy",
    photo: "/testimonials/aq-energy.png",
  },
  {
    quote:
      "The WhatsApp automation answers people at midnight on a public holiday. That is the part I did not know I needed until I saw the replies.",
    name: "Sample Name",
    title: "Co-founder",
    company: "Teeko",
    photo: "/testimonials/teeko.png",
  },
  {
    quote:
      "Marketing and the booking system were built as one thing. Before, they were two suppliers blaming each other for the gap between them.",
    name: "Sample Name",
    title: "Studio Owner",
    company: "Yoga Sadhana",
    photo: "/testimonials/yoga-sadhana.png",
  },
];
