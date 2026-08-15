/**
 * Website rebuilds, before and after.
 *
 * The proof behind /services/web-design, and the reason that page can exist
 * at all: a branding page with nothing on it but adjectives is the exact kind
 * of page PRODUCT.md was written to prevent.
 *
 * HARD RULES FOR THIS FILE
 * ------------------------
 * 1. BOTH SCREENSHOTS ARE REAL, AND BOTH ARE OURS TO SHOW. The `before` is a
 *    capture of a client's own site as it stood; the `after` is a capture of
 *    what we built for the same client. Never put a stranger's site in the
 *    `before` slot. A competitor's homepage used as a bad example is somebody
 *    else's business held up for a sales point, and it is not ours to hold.
 *
 * 2. EVERY `changes` ROW MUST BE READABLE IN THE SCREENSHOTS. If a reader
 *    cannot look at the captures above the list and see the thing the row
 *    claims, the row is an assertion dressed as evidence. Titles are quoted
 *    from the pages' own <title> tags; headings are quoted from the pages.
 *
 * 3. NO OUTCOME FIGURES. Not rankings, not traffic, not enquiries, not
 *    conversion. None of them are recorded, and a rebuild page is where the
 *    temptation to invent one is strongest — the whole genre runs on
 *    "+340% leads" screenshots. See WHY[0] in lib/services.ts.
 *
 * 4. A ROW THAT SAYS NOTHING CHANGED IS A LEGITIMATE ROW. Vatti's first one
 *    does. The titles and the addresses came through the rebuild untouched,
 *    and a page that only ever lists improvements is a page that will
 *    eventually invent one.
 *
 * THE ADDRESS IN THE CHROME BAR
 * -----------------------------
 * Both frames carry the CLIENT'S OWN DOMAIN, not the address each capture was
 * taken from. It is the same site at the same address, before and after, which
 * is the whole shape of the comparison — and a build URL in a browser frame is
 * a detail about our deployment pipeline that means nothing to a reader and
 * pulls her attention off the two pages.
 *
 * CAPTURING THE NEXT ONE
 * ----------------------
 * Full page at 1440 wide, resized to 1200, saved as webp into
 * /public/web-design. Put the real pixel height in `height`: the rendered
 * height comes from the CSS, but next/image needs the intrinsic ratio or the
 * box it reserves is wrong and the page jumps as each capture arrives.
 *
 * Two things will ruin a capture, and both were hit doing Vatti:
 *
 *  - LAZY IMAGES. Walk the page to the bottom slowly before shooting, and
 *    clear `loading="lazy"` first. The old Vatti site's partner logos came
 *    out as an empty white band on the first attempt, which is our capture
 *    rig misrepresenting a client's site rather than a fact about it.
 *
 *  - SCROLL-DRIVEN SECTIONS. The new site pins a section and moves a text
 *    block through it as you scroll. A plain full-page screenshot renders
 *    that at scroll zero: the text is somewhere outside the frame and the
 *    section comes out as a thousand pixels of empty background. Kill the
 *    animations (`animation: none`, `animation-timeline: auto`), then unpin
 *    the sticky children and collapse the containers that were only tall in
 *    order to buy scroll distance. Stitching viewport tiles was tried first
 *    and is worse: it duplicates the pinned background across every tile.
 *
 *    UNPIN TO `position: relative`, NEVER TO `static`. Static stops the
 *    element being a containing block, so `absolute inset-0` children —
 *    the tint sitting over a hero photograph — re-anchor to some ancestor
 *    and stop matching the picture they cover. Vatti's home page shipped
 *    once with a bright margin of untinted background around all four
 *    edges of its hero because of exactly this, and it looked like a bug
 *    in the site we had built rather than a bug in the capture.
 */

export type Shot = {
  /** Shown in the frame's chrome bar. The client's own domain — see above. */
  url: string;
  src: string;
  /** Intrinsic pixel size of the file. */
  width: number;
  height: number;
  alt: string;
};

/** One page of a site, before and after. */
export type PagePair = {
  slug: string;
  /** What this page is, in the client's own terms. */
  name: string;
  before: Shot;
  after: Shot;
};

export type Rebuild = {
  slug: string;
  client: string;
  sector: string;
  place: string;
  /** One line: what the job was. Not what it achieved. */
  brief: string;
  /** The first entry is the one shown first and loaded eagerly. */
  pages: PagePair[];
  changes: { label: string; before: string; after: string }[];
};

const PERSISTENCE_DOMAIN = "persistencechiropractic.com";
const VATTI_DOMAIN = "vattimalaysia.com";
const KAITEKI_DOMAIN = "kaiteki.my";

export const REBUILDS: Rebuild[] = [
  {
    slug: "persistence-chiropractic",
    client: "Persistence Chiropractic",
    sector: "Chiropractic & physiotherapy clinic",
    place: "Sunway Velocity, Cheras, KL",
    brief:
      "A Gonstead chiropractic and physiotherapy clinic in Cheras, rebuilt from a template site into one that says where it is, who works there and what it treats.",
    pages: [
      {
        slug: "home",
        name: "Home page",
        before: {
          url: PERSISTENCE_DOMAIN,
          src: "/web-design/persistence-before.webp",
          width: 1200,
          height: 4860,
          alt: "The Persistence Chiropractic site as it stands: a stock photograph of a treatment across the whole first screen, with the headline set over it.",
        },
        after: {
          url: PERSISTENCE_DOMAIN,
          src: "/web-design/persistence-after.webp",
          width: 1200,
          height: 6115,
          alt: "The rebuilt site: a navy first screen naming the clinic's treatments and location, with the opening hours, phone number and a WhatsApp button above it.",
        },
      },
    ],
    changes: [
      {
        label: "What the page is called",
        // Both quoted verbatim from the two pages' <title> tags.
        before:
          "“Best Chiropractor in KL, Malaysia”, which is the whole of Kuala Lumpur and a superlative nobody searches for.",
        after:
          "“Chiropractor in Cheras (Maluri), Kuala Lumpur”, which is the neighbourhood, and what somebody in it would actually type.",
      },
      {
        label: "The first thing it says",
        before:
          "“Heal your body the natural way through Chiropractic & Physiotherapy.” True of every clinic in the country.",
        after:
          "“Chiropractor and Physiotherapist in Cheras, under one roof.” Two things in one place, and where the place is.",
      },
      {
        label: "Getting hold of them",
        before:
          "A “Book an Appointment” button, and the phone number down in the footer.",
        after:
          "The address, the hours for every day of the week, the phone number and a WhatsApp button, all before the reader scrolls once.",
      },
      {
        label: "Who would be treating you",
        before: "Not on the home page. Partner logos, but no practitioners.",
        after:
          "Three chiropractors, each with their photograph, their qualification, the bodies they are registered with and their registration number.",
      },
      {
        label: "Working out what you need",
        before:
          "One block describing consultation and care, in the clinic's own words.",
        after:
          "Chiropractic and physiotherapy side by side, each listing the conditions it covers, and a set of answers to what people ask before booking.",
      },
      {
        label: "Finding the clinic",
        before: "An address in the footer.",
        after:
          "A section for it: the unit number, the walk from Sunway Velocity, the hours by day, and a map you can open.",
      },
    ],
  },

  {
    slug: "vatti-malaysia",
    client: "VATTI Malaysia",
    sector: "Kitchen appliance brand",
    place: "Malaysia",
    brief:
      "A kitchen appliance brand's site rebuilt on the same addresses and the same copy. The search work had already been done here, so the job was everything else: the home page and all five category pages, end to end. Two of them are below.",
    pages: [
      {
        slug: "home",
        name: "Home page",
        before: {
          url: VATTI_DOMAIN,
          src: "/web-design/vatti-home-before.webp",
          width: 1200,
          height: 5488,
          alt: "The VATTI Malaysia home page as it stands: a pale template with a stock hero carousel, a welcome paragraph and a contact form at the foot.",
        },
        after: {
          url: VATTI_DOMAIN,
          src: "/web-design/vatti-home-after.webp",
          width: 1200,
          height: 8596,
          alt: "The rebuilt home page: a dark, product-led first screen, the range as large photographs, a quote builder and a dealer map of Malaysia.",
        },
      },
      {
        slug: "kitchen-hood",
        name: "Kitchen hoods",
        before: {
          url: VATTI_DOMAIN,
          src: "/web-design/vatti-kitchen-hood-before.webp",
          width: 1200,
          height: 7459,
          alt: "The kitchen hood category page as it stands: a product grid of photographs and paragraphs on white, with a comparison heading and nothing under it.",
        },
        after: {
          url: VATTI_DOMAIN,
          src: "/web-design/vatti-kitchen-hood-after.webp",
          width: 1200,
          height: 9852,
          alt: "The rebuilt kitchen hood page: a pinned product hero, then sixteen models as cards carrying their airflow, pressure and noise figures.",
        },
      },
      /* Cooker hobs, combi and steam ovens, dishwashers and water purifiers
         were captured and shown here too, and came out on 2026-08-15 at the
         user's request: six pairs at full length ran the page to 33,000px,
         and the four that went are the four that repeat the argument the
         kitchen hood pair already makes. The captures are reproducible from
         the note at the top of this file if they are ever wanted back —
         /cooker-hob-in-malaysia, /combi-and-steam-oven-in-malaysia,
         /dishwasher-in-malaysia and /one-tap-purifier-in-malaysia, on both
         hosts. The work covered all six; this page shows two of them. */
    ],
    changes: [
      {
        label: "What the pages are called",
        /* Quoted from both pages' <title> tags, which are byte-identical.
           Checked on all six pages; the claim below is deliberately scoped
           to the two that are actually on the page, per rule 2 above — a
           reader can verify "these two" against the screenshots and cannot
           verify "all six" against anything. */
        before:
          "“Kitchen Hood in Malaysia | VATTI Cooker & Range Hoods”, at vattimalaysia.com/kitchen-hood-in-malaysia.",
        after:
          "The same title, at the same address. Both pages kept both. The search work here was already done and there was nothing to be gained by touching it.",
      },
      {
        label: "What a product card tells you",
        before:
          "A photograph, a model name and a paragraph of description. To find out how much air a hood actually moves, you opened its page.",
        after:
          "The measured figures on the card itself — airflow, pressure, noise — so sixteen models can be compared without leaving the grid.",
      },
      {
        label: "Comparing two models",
        before:
          "A “Compare VATTI Kitchen Hood Models” heading with nothing underneath it, and a WhatsApp button where the table should have been.",
        after:
          "A table that compares them: models side by side, the same rows of specification run against each one.",
      },
      {
        label: "Narrowing the range down",
        before: "Filter chips for the five product series.",
        after:
          "Series, and what the hood does — BLDC motor, hand sensor, PM2.5, ductless — each chip carrying the number of models behind it.",
      },
      {
        label: "Asking what it costs",
        before:
          "A contact form at the foot of the home page: name, email, contact number, subject, message.",
        after:
          "A few questions about the kitchen instead, which end in a WhatsApp thread with the answers already written into it.",
      },
      {
        label: "Finding somewhere to buy one",
        before: "A “Store Locations” page in the menu.",
        after:
          "The dealer network on the home page, as a map of Malaysia, with the number of authorised dealers beside it.",
      },
    ],
  },

  {
    slug: "kaiteki",
    client: "Kaiteki Clinic",
    sector: "Skin & aesthetic clinic",
    place: "Nine branches, KL to Sabah",
    brief:
      "A nine-branch aesthetic clinic whose old site was a hand-built static one, a separate HTML file per treatment. Rebuilt around the thing a patient actually arrives with, which is a concern rather than a treatment name.",
    pages: [
      {
        slug: "home",
        name: "Home page",
        before: {
          url: KAITEKI_DOMAIN,
          src: "/web-design/kaiteki-home-before.webp",
          width: 1200,
          height: 5269,
          alt: "The old Kaiteki home page: a cream hero reading “Welcome to Kaiteki Clinic”, then a dark band with a dropdown asking what you want to treat.",
        },
        after: {
          url: KAITEKI_DOMAIN,
          src: "/web-design/kaiteki-home-after.webp",
          width: 1200,
          height: 7823,
          alt: "The rebuilt home page: “Japanese-inspired skin & aesthetic care”, followed by the concerns as a grid of photographs and a walk-through of the first visit.",
        },
      },
    ],
    changes: [
      {
        label: "What the page is called",
        // Both quoted verbatim from the two pages' <title> tags.
        before:
          "“Kaiteki Skin Aesthetic Clinic || Homepage”. The word Homepage, and a double pipe, in the browser tab and in Google's results.",
        after: "“Kaiteki: Japanese-Inspired Aesthetic Clinic in Malaysia”.",
      },
      {
        label: "The first thing it says",
        before:
          "“Welcome to Kaiteki Clinic. We believe beauty is the way of life.” A greeting, and a sentiment.",
        after:
          "“Japanese-inspired skin & aesthetic care.” Under it: nine branches, twenty doctors, and that every treatment starts with an assessment.",
      },
      {
        label: "Saying what is wrong",
        before:
          "A dropdown headed “I have something in mind…”. You pick a condition out of a select box and it opens WhatsApp.",
        after:
          "“What brings you in?” — the same conditions as a grid you can look through, each one a photograph rather than a line in a menu.",
      },
      {
        label: "How the menu is organised",
        before:
          "About Us, Skin Care, Skin, Face, Hair & Body, Our Services, Blog, Our Branch. Four of those eight are ways of saying treatments.",
        after:
          "Concerns, Treatments, Device & Injectables, Products, Locations, About, Blog. The first one is how a patient thinks about it.",
      },
      {
        label: "What happens when you get there",
        before: "Not on the page.",
        after:
          "The first visit, numbered: a free consultation, then a plan, then treatment. And the doctors who would be seeing you, on the same page.",
      },
      {
        label: "Choosing a branch",
        before: "A column of gold buttons under “Our Branches”.",
        after:
          "Nine branches, each with a photograph of the actual place, filtered by state.",
      },
    ],
  },
];

export function rebuildBySlug(slug: string): Rebuild | undefined {
  return REBUILDS.find((r) => r.slug === slug);
}
