/**
 * Reserve Today — the booking platform's published price list.
 *
 * READ THIS BEFORE CHANGING A NUMBER
 * ----------------------------------
 * This is the ONE file on the site that carries prices, and it exists in
 * tension with a rule the rest of the codebase enforces hard: lib/site.ts
 * refuses to assert a price on the user's behalf, and the FAQ in
 * lib/services.ts says plainly that we do not publish one.
 *
 * That rule is about SERVICES. An SEO retainer or a rebuild is scoped per
 * business and quoting it on a page would be a guess. Reserve Today is a
 * PRODUCT — the same software, on the same subdomain shape, for every
 * studio that signs up — and a product with no price on its page reads as
 * a product with something to hide. The two positions are compatible only
 * as long as the distinction stays visible on the page itself, which is
 * why the booking page says the price is the platform's and the FAQ answer
 * about custom work is left exactly as it is.
 *
 * Do not let this file become a precedent for pricing the services.
 *
 * EVERY FIGURE BELOW IS A PROPOSAL, NOT A CONFIRMED FACT (2026-08-15)
 * ------------------------------------------------------------------
 * PRODUCT.md records no price for this platform. Confirm these before the
 * page goes live.
 *
 * WHERE THESE NUMBERS CAME FROM
 * -----------------------------
 * A first pass priced this per location against Rezerv alone, at
 * RM 149 / 449 / 799 per outlet. Reading four competitors instead of one
 * moved it. Published rates on 2026-08-15, converted at RM 4.40 to the US
 * dollar, as a monthly figure:
 *
 *   Schedulah (MY)   RM 250 per branch. 10 users free, then RM 10 each.
 *   Aoikumo (MY)     RM 298 per outlet monthly; RM 223 / 448 / 557 annual.
 *   Vibefam (SG)     RM 480 / 920 / 1,272 — TWO LOCATIONS ON EVERY PLAN.
 *   Rezerv (SG)      RM 264 / 836 / 1,408 per location.
 *
 * Two conclusions, both load-bearing for the shape below.
 *
 * FIRST: Rezerv is the outlier, not the market. Pricing at half of Rezerv
 * felt aggressive and is not — it lands fourth of five on entry price.
 *
 * SECOND, and the reason this file changed: Vibefam bundles two locations
 * into every tier including its cheapest. A two-location boutique — Yoga
 * Sadhana's shape, and the customer worth winning — could run on Vibefam
 * for RM 392 a month against RM 748 here. Billing the second location was
 * handing a competitor the easiest objection in the category.
 *
 * So locations are ALLOWANCES now, not multipliers. The axis is still the
 * location, which is the unit a studio owner already thinks in and which
 * the platform can genuinely enforce — but a tier covers a number of them
 * rather than multiplying by them.
 *
 * WHAT THIS GIVES UP, RECORDED SO IT IS NOT REDISCOVERED AS A SURPRISE
 * -------------------------------------------------------------------
 * Against the per-location version this collects RM 290 a month less from
 * a two-location studio and RM 3,162 less from a five-location group. That
 * is revenue from deals the per-location structure was losing, which is
 * the whole argument for the change, but it is a real give-up and the
 * five-location case is the one to watch. Anything past five locations is
 * an Enterprise quote, not a published per-location rate — see the note
 * over ADDONS for why there is no such rate on the page.
 *
 * WHAT NO PRICE CHANGE FIXES
 * --------------------------
 * There is no member mobile app and no website builder. Vibefam puts apps
 * on its entry plan and a site builder on its middle one; Rezerv has both.
 * A studio comparing pages will notice. Do not paper over it here.
 *
 * CORPORATE PACKAGES ARE DELIBERATELY NOT LISTED (2026-08-16)
 * -----------------------------------------------------------
 * They were the Studio-to-Group gate until the user pointed out that they
 * do not actually separate those two tiers. That was right, and for a
 * worse reason than "it is just another package type" — mechanically it is
 * not one, since a corporate purchase creates a request rather than
 * granting credits, and it can be browsed without logging in at all.
 *
 * The reason it fails as a gate is that it is not scale-dependent. A
 * single-location studio can land a corporate client; a five-site group
 * can sell none. And the flow's own design sends the negotiation to
 * WhatsApp, so the software part is a catalogue page and a request queue —
 * perhaps a fifth of how a corporate deal actually gets done. Gate that
 * behind a RM 450 step and a Studio customer who wins one corporate client
 * does not upgrade, they run it by hand, and the gate collects nothing
 * while making the ladder look arbitrary.
 *
 * So it is gated nowhere and listed nowhere. The capability still exists
 * and still works; it is simply not a line on a pricing card. Do not add
 * it back to a tier list to pad one out.
 *
 * What separates Studio from Group is the part that only bites at size:
 * five locations instead of two, unlimited roles instead of three, full
 * reporting history, export, and support.
 *
 * REPORTING WINDOW IS NOT RETENTION (2026-08-16)
 * -----------------------------------------------
 * Group used to say "unlimited reporting history" and now says reports
 * reach back two years. Nothing is deleted any sooner — the two are
 * separate promises and the old wording sold them as one.
 *
 * Retention is cheap and is now a universal promise, stated once in the
 * note under the plans. The arithmetic is not close: a five-location
 * group at capacity writes roughly 274,000 bookings a year, which at a
 * generous 1 KB all-in for the row, its indexes, its audit entries and
 * its send-log lines is about 274 MB a year. Five years of that is 1.4 GB.
 * Managed Postgres storage is cents at that size and CSV egress is less.
 * Storage was never the thing to be afraid of.
 *
 * The unbounded promise was the compute. An all-time aggregate across
 * five locations and five years is a slow scan that degrades every other
 * studio sharing the instance — and if the database is billed by
 * compute-seconds or rows read rather than by provisioned size, that same
 * report is a line item rather than just a slow page. WE DO NOT CURRENTLY
 * KNOW WHICH, because the platform's code is not in this repository. That
 * is a good reason to publish a bounded window until somebody has checked.
 *
 * Two years is not a retreat from the field, either. Rezerv's own matrix
 * caps its Business tier at a twelve-month filter over two years of
 * history and offers unlimited only on Enterprise, which is sales-led and
 * flat-priced — exactly where an unbounded query promise belongs, since
 * that is the one tier whose price can be set against the customer who
 * actually uses it. Reserve Today now draws the line in the same place.
 *
 * If a bounded window is ever widened, widen it for new contracts. This
 * is the kind of promise that cannot be taken back from a customer who
 * already bought on it.
 *
 * THE ORDER OF THE PLANS IS LOAD-BEARING. Each plan's `list` after the
 * first says what it ADDS to the one before it, so the array reads as a
 * ladder. Reordering it silently makes every list wrong.
 */

/** Free months on annual billing. Two of twelve, i.e. 16.7% off. */
export const MONTHS_FREE = 2;

export type Plan = {
  id: string;
  name: string;
  /** Ringgit per month. `null` means sales-led — no figure is shown. */
  monthly: number | null;
  /**
   * How many studios the plan covers. Printed in the price block rather
   * than buried in `list`, because it is the line that beats the
   * competition on structure and it only works if it is read.
   */
  locations: string;
  /** Who it is for. One sentence, a judgement about fit, not a claim. */
  fits: string;
  /** Heading above `list` — "Includes" on the first plan, "adds" after. */
  listLabel: string;
  list: string[];
  /** At most one. Marks the plan we expect most studios to land on. */
  popular?: boolean;
};

export const PLANS: Plan[] = [
  {
    id: "solo",
    name: "Solo",
    monthly: 149,
    locations: "One location",
    fits: "Freelance teachers and single-room practitioners running their own diary.",
    listLabel: "Includes",
    list: [
      "One staff account",
      "Unlimited classes, bookings and members",
      "Credit bundles and unlimited memberships",
      "Workshops with tiered pricing",
      "Card, FPX, DuitNow and Touch 'n Go checkout",
      "QR check-in and attendance",
      "Email notifications on 21 events",
      "Reports reaching back three months",
    ],
  },
  {
    id: "studio",
    name: "Studio",
    monthly: 549,
    locations: "Up to two locations",
    fits: "Boutique studios with a teaching team and more than one class running at once.",
    listLabel: "Everything in Solo, plus",
    list: [
      "Unlimited staff accounts, three roles",
      "Overlapping schedules and room assignment",
      "Leave management that blocks the scheduler",
      "Payroll and commission",
      "Private sessions, 1-on-1 and 2-on-1",
      "Retail store, up to 100 products",
      "Reports reaching back twelve months",
    ],
    popular: true,
  },
  {
    id: "group",
    name: "Group",
    monthly: 999,
    locations: "Up to five locations",
    fits: "Multi-site operators who need one set of numbers to reconcile across every studio.",
    listLabel: "Everything in Studio, plus",
    list: [
      "Unlimited roles with row-level scope",
      "The unified request inbox",
      "Unlimited retail products",
      "Your own domain, included",
      "CSV export and API access",
      "Reports reaching back two years",
      "Priority support",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthly: null,
    locations: "Unlimited locations",
    fits: "Franchise networks, and anyone with data residency or procurement requirements.",
    listLabel: "Everything in Group, plus",
    list: [
      "Flat price across every outlet",
      "Reports across your whole history",
      "Super-admin impersonation and multi-brand",
      "Dedicated onboarding and migration",
      "A response-time SLA in writing",
    ],
  },
];

export type Addon = { name: string; price: string; note: string };

/**
 * ONE ADD-ON, AND IT IS ONE-OFF (2026-08-16)
 *
 * There were four. Three were removed because a recurring add-on is a
 * meter, and this page opens by promising there are no meters — no charge
 * per booking, per sale, per member, per studio. Every monthly extra
 * listed underneath turned that promise into a technicality:
 *
 *  - EXTRA LOCATION at RM 199 was the worst of them. It put a
 *    per-location price on a page whose headline is that your second
 *    studio does not double the bill. It also undercut its own ladder:
 *    Studio plus two extras came to RM 947 against Group at RM 999, so
 *    Group only won at exactly five locations. Past five is an Enterprise
 *    quote now, which is what it always was in practice.
 *  - YOUR OWN DOMAIN at RM 39 is now simply a Group feature, listed in
 *    that plan and nowhere else.
 *  - EXTRA ROLES at RM 49 charged for a permission slot, which reads as
 *    petty directly beneath a promise not to charge per thing. Removing
 *    it also makes three-roles-versus-unlimited a real Studio-to-Group
 *    gate, which that boundary needed after corporate came out of it.
 *
 * What remains is a one-time fee for work a person actually does. That is
 * the test for anything added here: if it recurs monthly, it belongs in a
 * plan price, not in this list.
 */
export const ADDONS: Addon[] = [
  {
    name: "Moving your data across",
    price: "RM 1,500 to 3,000",
    note: "Once. Members, balances, packages and future bookings brought over from whatever you run now. Where it lands in the range depends on how much history comes with you and what shape it arrives in.",
  },
];

/**
 * The effective monthly rate when the year is paid up front.
 *
 * THIS IS THE FIGURE THE PAGE OPENS ON, and that reverses an earlier call.
 * The first version headlined the true monthly rate on the grounds that
 * Rezerv's page prints its annual-billed number large and its real monthly
 * only at checkout, which is a bait. That reasoning was sound and the
 * conclusion was still wrong: every studio competitor headlines the annual
 * rate, so leading with the monthly costs about a 20% apparent premium on
 * a page a buyer skims. The switch is two visible buttons and the monthly
 * is one tap away, so nothing is concealed by defaulting to the yearly
 * figure — which is the difference between this and what Rezerv does.
 */
export function annualMonthly(monthly: number): number {
  return Math.round((monthly * (12 - MONTHS_FREE)) / 12);
}

/** The full year, paid up front. */
export function annualTotal(monthly: number): number {
  return monthly * (12 - MONTHS_FREE);
}

/**
 * The annual discount as a whole percent — 17 at two months free.
 *
 * Derived rather than written down, because the page states the same
 * saving two ways ("2 months free" on the switch, "Save 17%" on each
 * card) and a hardcoded percentage is the half that goes stale the day
 * MONTHS_FREE changes. Competitors quote the percentage rather than the
 * months — Rezerv 20%, Schedulah 15% — so the page needs to be readable
 * in the same unit to be compared at all.
 */
export function annualSavingPct(): number {
  return Math.round((MONTHS_FREE / 12) * 100);
}

/** `1500` -> `"1,500"`. Thousands separator only; the RM is set separately. */
export function ringgit(n: number): string {
  return n.toLocaleString("en-MY");
}
