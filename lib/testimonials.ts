/**
 * CLIENT TESTIMONIALS — the second slot on the site that may carry claims
 * about outcomes, and the only one that carries someone else's words.
 *
 * HOW THIS WORKS
 * --------------
 * `TESTIMONIALS` is empty until real, attributable quotes exist. While it is
 * empty the page renders the honest "On results" note instead of a slider,
 * and looks complete doing it. Fill this array and the slider appears
 * automatically. Nothing else needs changing.
 *
 * WHY IT SHIPS EMPTY
 * ------------------
 * PRODUCT.md, "Absences future work must not fabricate":
 *
 *   > No testimonials about Blueprint are on record. The three quotes
 *   > currently under "Real reviews. Real results." are paraphrased
 *   > *patient* reviews of Five Clinic — evidence about the client, not
 *   > about Blueprint.
 *
 * So there was nothing to migrate into this file. Those Five Clinic patient
 * reviews are NOT eligible here: a patient praising a clinic is not a client
 * praising Blueprint, and running them in this slot would attribute a
 * stranger's words to a relationship that never happened.
 *
 * An invented quote is worse than an invented number. A number is a claim; a
 * quote with a name, a job title and a face attached is a fabricated person
 * endorsing a real company to real buyers.
 *
 * TO FILL IT IN
 * -------------
 * Add one object per client. Every field except `photo` is required.
 *
 *   export const TESTIMONIALS: Testimonial[] = [
 *     {
 *       quote:
 *         "Their exact words. Lightly trimmed for length is fine; rewritten " +
 *         "is not, because then it is Blueprint's sentence in their mouth.",
 *       name: "Dr Calvin Choo",
 *       title: "Founder",
 *       company: "Five Clinic",
 *       photo: "/testimonials/calvin-choo.jpg",
 *     },
 *   ];
 *
 * Before anything goes in here, three things have to be true:
 *
 * 1. THEY SAID IT. From a message, an email, a call you took notes on — a
 *    real source you could produce if asked.
 * 2. THEY AGREED TO IT BEING PUBLISHED, with their name, their job title,
 *    their company and their face on this page. Consent to say something is
 *    not consent to have it printed under a photograph.
 * 3. THE PHOTO IS THEIRS AND YOU MAY USE IT. Not a stock headshot, not a
 *    scraped LinkedIn picture.
 *
 * `photo` may be null. The slider then draws their initials in a brand disc,
 * which is a perfectly good avatar and is the correct thing to ship while
 * you are waiting on a picture — it is not a reason to substitute a stock
 * face for a real person.
 *
 * Photos live in `public/testimonials/`. Square, at least 160x160, cropped
 * to the face; the slider renders them at 64px and the layout does not care
 * about the source dimensions beyond that.
 */

export type Testimonial = {
  /** Their words, not a paraphrase. */
  quote: string;
  name: string;
  /** Their role, e.g. "Founder", "Clinic Manager". */
  title: string;
  company: string;
  /** Path under /public, or null to render initials instead. */
  photo: string | null;
};

export const TESTIMONIALS: Testimonial[] = [];
