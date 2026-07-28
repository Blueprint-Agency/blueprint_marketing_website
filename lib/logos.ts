/**
 * The client logo wall for /v2.
 *
 * REPLACES the client website screenshots at the user's request (2026-07-27).
 *
 * STATUS: no logo files exist yet. PRODUCT.md records `assets/` as empty and
 * notes that the six clients are confirmed but their marks still need
 * sourcing. The user will supply a logo list once they approve the design.
 *
 * Until then every entry has `logo: null` and renders as a typographic
 * wordmark cell — a real, designed state, not a broken image or a grey box.
 * The cell still links to the client's live site, so the "go and check"
 * proof the screenshots used to carry is not lost entirely.
 *
 * TO ADD A REAL LOGO
 * ------------------
 * 1. Drop the file in `public/logos/` — SVG preferred, otherwise transparent
 *    PNG at 2x the display height (so at least 96px tall).
 * 2. Set `logo: "/logos/<file>"` on that entry.
 * Nothing else changes; the wall swaps that cell from wordmark to image.
 *
 * A note on treatment: logos arrive in wildly different weights, colours and
 * aspect ratios, and a wall of them at full colour reads as clutter. They are
 * rendered in a uniform optical height and desaturated, lifting to full
 * colour on hover. That is a deliberate design decision, not a limitation.
 */

export type Brand = {
  slug: string;
  name: string;
  href: string;
  /** Path under /public, or null while no file exists. */
  logo: string | null;
  /** Optical size correction. A wide wordmark and a square mark do not sit
   *  at the same height; nudge per logo once the real files land. */
  scale?: number;
};

export const BRANDS: Brand[] = [
  {
    slug: "five-clinic",
    name: "Five Clinic",
    href: "https://fiveclinic.com.my",
    logo: null,
  },
  {
    slug: "vatti-malaysia",
    name: "Vatti Malaysia",
    href: "https://vattimalaysia.com",
    logo: null,
  },
  {
    slug: "kaiteki",
    name: "Kaiteki",
    href: "https://kaiteki.my",
    logo: null,
  },
  {
    slug: "aq-energy",
    name: "AQ Energy",
    href: "https://aq.energy",
    logo: null,
  },
  {
    slug: "teeko",
    name: "Teeko",
    href: "https://teeko.ai",
    logo: null,
  },
  {
    slug: "yoga-sadhana",
    name: "Yoga Sadhana",
    href: "https://yogasadhana.sg",
    logo: null,
  },
];

/** True once at least one real logo file has been supplied. */
export const HAS_REAL_LOGOS = BRANDS.some((b) => b.logo !== null);
