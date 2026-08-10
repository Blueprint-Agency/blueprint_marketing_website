/**
 * The client logo wall.
 *
 * REPLACES the client website screenshots at the user's request (2026-07-27).
 * REAL FILES SUPPLIED 2026-07-28 — the wordmark placeholder state below is
 * now only reached by Teeko, which has no logo file yet.
 *
 * THE FILES
 * ---------
 * Sources came from `Downloads/blueprint client logo` as a mix of png, jpg,
 * webp and gif. Every one was processed to a single consistent form:
 *
 *   1. Converted to PNG (gif takes frame 0).
 *   2. Flat backgrounds knocked out by a flood fill FROM THE BORDER, so the
 *      outer white goes transparent while white *inside* a mark — the counter
 *      in Global Marque's coin, the highlight in QueueBee's speech bubble —
 *      survives. A global white-to-alpha replace would have punched holes
 *      straight through those.
 *   3. Cropped tight to real content. This is where the "empty white space"
 *      went: vatti lost 81% of its area, garden-gem 38%.
 *   4. Scaled to a constant OPTICAL AREA rather than a constant height, then
 *      centred on an identical 480x160 transparent canvas. Constant height
 *      would make a 6:1 wordmark like ttklia read as enormous beside a square
 *      mark like yoga-sadhana; equal area is what makes them look like one row.
 *
 * Every file is therefore exactly 480x160 and needs no per-logo CSS.
 *
 * TO ADD OR REPLACE ONE
 * ---------------------
 * Drop the source in `Downloads/blueprint client logo` and re-run the same
 * pipeline, or hand-make a 480x160 transparent PNG with the mark centred and
 * roughly 40,000px^2 of ink. Then set `logo` on the entry below.
 *
 * A note on treatment: logos arrive in wildly different weights, colours and
 * aspect ratios, and a wall of them at full colour reads as clutter. They are
 * rendered desaturated at a uniform optical height, lifting to full colour on
 * hover. That is a deliberate design decision, not a limitation.
 */

export type Brand = {
  slug: string;
  name: string;
  /**
   * The client's live site, or null where no URL is confirmed.
   *
   * NOT A PLACEHOLDER FOR A GUESS. PRODUCT.md records URLs for six clients
   * only; the rest are null and render as an unlinked cell rather than send
   * a visitor to an address that may not exist. See lib/site.ts, which holds
   * the same line about the company's own domain.
   */
  href: string | null;
  /** Path under /public, or null while no file exists. */
  logo: string | null;
  /** Optical size correction. The pipeline already equalises area, so this
   *  should stay unset unless a specific mark reads wrong on the wall. */
  scale?: number;
};

export const BRANDS: Brand[] = [
  /* --- confirmed in PRODUCT.md: name, URL and logo all verified ---

     Five Clinic was removed from the wall on 2026-08-11 at the user's
     request. It is still a confirmed client in PRODUCT.md, still the site's
     flagship case study at /work/five-clinic, and /public/logos/five-clinic.png
     is still on disk — only this row no longer carries it. Restoring it is
     putting the entry back. */
  {
    slug: "vatti-malaysia",
    name: "Vatti Malaysia",
    href: "https://vattimalaysia.com",
    logo: "/logos/vatti-malaysia.png",
  },
  {
    slug: "kaiteki",
    name: "Kaiteki",
    href: "https://kaiteki.my",
    logo: "/logos/kaiteki.png",
  },
  {
    slug: "aq-energy",
    name: "AQ Energy",
    href: "https://aq.energy",
    logo: "/logos/aq-energy.png",
  },
  {
    slug: "yoga-sadhana",
    name: "Yoga Sadhana",
    href: "https://yogasadhana.sg",
    logo: "/logos/yoga-sadhana.png",
  },
  {
    /* Not in PRODUCT.md's client table, but Blueprint builds and maintains
       this site — it is a sibling project in the same workspace. The URL is
       taken from that repo's own metadata, not guessed. */
    slug: "persistence-chiro",
    name: "Persistence Chiropractic",
    href: "https://www.persistencechiropractic.com",
    logo: "/logos/persistence-chiro.png",
  },

  /* Teeko was removed from the wall on 2026-07-28 at the user's request. It
     is still a confirmed client in PRODUCT.md and still appears elsewhere on
     the site; it is only absent from this row, because no logo file exists
     and a lone wordmark among the real marks read as an omission. */

  /* --- supplied 2026-07-28, not recorded in PRODUCT.md ---
     The folder they arrived in is the user's assertion that these are
     clients, so they are on the wall. Their URLs are a separate question:
     only the two that print a domain inside their own wordmark have one. */
  {
    slug: "partglobal",
    name: "PartGlobal",
    /* Read off the logo itself, which sets "PARTGLOBAL.com". */
    href: "https://partglobal.com",
    logo: "/logos/partglobal.png",
  },
  {
    slug: "ttklia",
    name: "TTKLIA",
    /* Read off the logo itself, which sets "ttklia.com". */
    href: "https://ttklia.com",
    logo: "/logos/ttklia.png",
  },
  {
    slug: "queuebee",
    name: "QueueBee",
    href: null,
    logo: "/logos/queuebee.png",
  },
  {
    slug: "garden-gem",
    name: "Garden Gem",
    href: null,
    logo: "/logos/garden-gem.png",
  },
  {
    slug: "global-marque",
    name: "Global Marque",
    href: null,
    logo: "/logos/global-marque.png",
  },
];

/** True once at least one real logo file has been supplied. */
export const HAS_REAL_LOGOS = BRANDS.some((b) => b.logo !== null);
