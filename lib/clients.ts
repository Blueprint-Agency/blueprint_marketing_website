/**
 * The six clients confirmed nameable by the user on 2026-07-26.
 *
 * HARD RULE: `detail` is only populated where PRODUCT.md records real,
 * user-confirmed specifics. Five of six currently have none. Do not write
 * plausible-sounding engagement summaries for them — a fabricated case study
 * is exactly what this rebuild was commissioned to remove.
 *
 * A client with `detail: null` renders as a live stall in the lane linking
 * straight to their site. It does not get a case-study page until the user
 * supplies real content.
 */

export type ClientDetail = {
  /** What Blueprint actually built. Confirmed facts only. */
  built: string[];
  /** Verifiable structural facts. NOT outcome claims. */
  facts: { value: string; label: string }[];
  /** Longer narrative for the case-study page. */
  story: string[];
  /**
   * Measured results. Null everywhere until the user supplies real figures.
   * PRODUCT.md explicitly forbids inventing these.
   */
  outcomes: null;
};

export type Client = {
  slug: string;
  name: string;
  /**
   * Only set where the user confirmed it. Domain-inferred descriptors
   * ("Kitchen appliances", "Technology") are guesses, and a guess printed
   * beside a real client's name is the same failure as a fabricated metric.
   */
  sector?: string;
  place?: string;
  href: string;
  /** Stall awning hue — decorative only, keeps the lane from reading uniform. */
  awning: "tarp" | "pink" | "green" | "tungsten";
  detail: ClientDetail | null;
};

export const CLIENTS: Client[] = [
  {
    slug: "five-clinic",
    name: "Five Clinic",
    sector: "Aesthetic clinic",
    place: "Bangsar + Puchong, KL",
    href: "https://fiveclinic.com.my",
    awning: "tarp",
    detail: {
      built: [
        "SEO landing pages for every treatment",
        "Free-consultation funnel",
        "WhatsApp automation",
        "Booking system",
        "Google SEM",
      ],
      facts: [
        { value: "40+", label: "treatment pages built to rank on Google" },
        { value: "2", label: "outlets: Bangsar and Puchong" },
        { value: "MOH", label: "LCP-certified, doctor-led practice" },
      ],
      story: [
        "Five Clinic is led by Dr Calvin Choo, an MOH LCP-certified aesthetic doctor, across two branches in Bangsar and Puchong. Treatments run from Rejuran and HIFU to slimming and laser.",
        "A clinic like this has the same problem as a stall in a busy lane: the people who want what you do are already searching for it, and most of them never reach you. They search a treatment name, land somewhere else, and that is the end of it.",
        "So we built the lane and the counter together. Every treatment got its own page written to rank for what patients actually type. A free-consultation funnel gave them one obvious next step instead of a phone number and a hope. And WhatsApp automation answers the moment someone reaches out, whatever time that is.",
      ],
      outcomes: null,
    },
  },
  // Name + real live URL only. Sector and location are not on record for
  // these five; the site shows the link and lets the work speak instead.
  {
    slug: "vatti-malaysia",
    name: "Vatti Malaysia",
    href: "https://vattimalaysia.com",
    awning: "pink",
    detail: null,
  },
  {
    slug: "kaiteki",
    name: "Kaiteki",
    href: "https://kaiteki.my",
    awning: "green",
    detail: null,
  },
  {
    slug: "aq-energy",
    name: "AQ Energy",
    href: "https://aq.energy",
    awning: "tungsten",
    detail: null,
  },
  {
    slug: "teeko",
    name: "Teeko",
    href: "https://teeko.ai",
    awning: "tarp",
    detail: null,
  },
  {
    slug: "yoga-sadhana",
    name: "Yoga Sadhana",
    href: "https://yogasadhana.sg",
    awning: "pink",
    detail: null,
  },
];

export const CASE_STUDIES = CLIENTS.filter((c) => c.detail !== null);

export function clientBySlug(slug: string): Client | undefined {
  return CLIENTS.find((c) => c.slug === slug);
}
