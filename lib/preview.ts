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

export const PREVIEW_DATA = true;

/** INVENTED. Not measured. Not Five Clinic's real numbers. */
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
