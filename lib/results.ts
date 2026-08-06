/**
 * MEASURED CLIENT RESULTS — the one slot on the site that may carry numbers.
 *
 * HOW THIS WORKS
 * --------------
 * `RESULTS` is null until real, defensible figures exist.
 *
 * STALE SINCE 2026-07-29, READ BEFORE USING: the home page no longer has a
 * results grid to fill. It was removed that day and nothing reads `RESULTS`
 * now — this file is a kept shape and a kept standard, not a live switch.
 * The "On results" note it used to fall through to went too, on 2026-08-06,
 * along with the empty testimonial band that inherited the slot. The case
 * study at app/work/[slug] still renders its own version of that note when
 * `detail.outcomes` is null, and that is where measured figures should land
 * first, because per-client is the only scope PRODUCT.md allows.
 *
 * WHY IT IS BUILT THIS WAY
 * ------------------------
 * PRODUCT.md is explicit: no agency-wide aggregate, no average lift, and no
 * per-client outcome that was not actually measured. The user confirmed on
 * 2026-07-27 that results exist for one client and can be supplied. They had
 * not been supplied at build time, so the slot ships empty rather than
 * guessed. An invented number here is the exact failure this rebuild was
 * commissioned to remove.
 *
 * TO FILL IT IN
 * -------------
 * Replace `null` with an object like the commented example below. Every
 * field is required except `note`. Keep `period` honest — a number without
 * a timeframe is not a result, it is a boast.
 *
 * export const RESULTS: ClientResults | null = {
 *   slug: "five-clinic",
 *   client: "Five Clinic",
 *   period: "Jan 2025 – Jun 2026",
 *   headline: "What changed after we rebuilt the funnel",
 *   metrics: [
 *     { value: "3.4x", label: "more booked consultations per month" },
 *     { value: "62%", label: "of enquiries now answered inside a minute" },
 *     { value: "#1", label: "on Google for 12 treatment terms in KL" },
 *   ],
 *   note: "Measured against the six months before launch, from the clinic's own booking system.",
 * };
 */

export type ResultMetric = {
  /** The figure itself. Keep it short: "3.4x", "62%", "#1". */
  value: string;
  /** What the figure counts, in the owner's language, not marketing's. */
  label: string;
};

export type ClientResults = {
  /** Must match a slug in lib/clients.ts. */
  slug: string;
  client: string;
  /** The window the figures cover. Required — a number with no period is not a result. */
  period: string;
  headline: string;
  /** Two to four. More than four and none of them land. */
  metrics: ResultMetric[];
  /** Where the numbers came from and what they are measured against. */
  note?: string;
};

export const RESULTS: ClientResults | null = null;
