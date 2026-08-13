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
 * 2. EVERY `changes` ROW MUST BE READABLE IN THE TWO IMAGES. If a reader
 *    cannot look at the screenshots above the list and see the thing the row
 *    claims, the row is an assertion dressed as evidence. Titles are quoted
 *    from the pages' own <title> tags; headings are quoted from the pages.
 *
 * 3. NO OUTCOME FIGURES. Not rankings, not traffic, not enquiries, not
 *    conversion. None of them are recorded, and a rebuild page is where the
 *    temptation to invent one is strongest — the whole genre runs on
 *    "+340% leads" screenshots. See WHY[0] in lib/services.ts.
 *
 * THE ADDRESS IN THE CHROME BAR
 * -----------------------------
 * Both frames carry the CLIENT'S OWN DOMAIN, not the address each capture was
 * taken from. It is the same site at the same address, before and after, which
 * is the whole shape of the comparison — and a build URL in a browser frame is
 * a detail about our deployment pipeline that means nothing to a reader and
 * pulls her attention off the two pages. If a rebuild is ever shown here for a
 * business whose domain also CHANGED, that is a real difference and both bars
 * should show what they actually are.
 *
 * ADDING THE NEXT ONE
 * -------------------
 * Capture both pages full-page at 1440 wide, resize to 1200 and save as webp
 * into /public/web-design. Put the real pixel height in `height` — the frame
 * pans the image by (rendered height − window height) and gets that number
 * from the DOM, but next/image needs the intrinsic ratio or the box it
 * reserves is wrong and the page jumps on load.
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

export type Rebuild = {
  slug: string;
  client: string;
  sector: string;
  place: string;
  /** One line: what the job was. Not what it achieved. */
  brief: string;
  before: Shot;
  after: Shot;
  changes: { label: string; before: string; after: string }[];
};

export const REBUILDS: Rebuild[] = [
  {
    slug: "persistence-chiropractic",
    client: "Persistence Chiropractic",
    sector: "Chiropractic & physiotherapy clinic",
    place: "Sunway Velocity, Cheras, KL",
    brief:
      "A Gonstead chiropractic and physiotherapy clinic in Cheras, rebuilt from a template site into one that says where it is, who works there and what it treats.",
    before: {
      url: "persistencechiropractic.com",
      src: "/web-design/persistence-before.webp",
      width: 1200,
      height: 4860,
      alt: "The Persistence Chiropractic site as it stands: a stock photograph of a treatment across the whole first screen, with the headline set over it.",
    },
    after: {
      url: "persistencechiropractic.com",
      src: "/web-design/persistence-after.webp",
      width: 1200,
      height: 6115,
      alt: "The rebuilt site: a navy first screen naming the clinic's treatments and location, with the opening hours, phone number and a WhatsApp button above it.",
    },
    changes: [
      {
        label: "What the page is called",
        // Both quoted verbatim from the two pages' <title> tags.
        before: "“Best Chiropractor in KL, Malaysia”, which is the whole of Kuala Lumpur and a superlative nobody searches for.",
        after: "“Chiropractor in Cheras (Maluri), Kuala Lumpur”, which is the neighbourhood, and what somebody in it would actually type.",
      },
      {
        label: "The first thing it says",
        before: "“Heal your body the natural way through Chiropractic & Physiotherapy.” True of every clinic in the country.",
        after: "“Chiropractor and Physiotherapist in Cheras, under one roof.” Two things in one place, and where the place is.",
      },
      {
        label: "Getting hold of them",
        before: "A “Book an Appointment” button, and the phone number down in the footer.",
        after: "The address, the hours for every day of the week, the phone number and a WhatsApp button, all before the reader scrolls once.",
      },
      {
        label: "Who would be treating you",
        before: "Not on the home page. Partner logos, but no practitioners.",
        after: "Three chiropractors, each with their photograph, their qualification, the bodies they are registered with and their registration number.",
      },
      {
        label: "Working out what you need",
        before: "One block describing consultation and care, in the clinic's own words.",
        after: "Chiropractic and physiotherapy side by side, each listing the conditions it covers, and a set of answers to what people ask before booking.",
      },
      {
        label: "Finding the clinic",
        before: "An address in the footer.",
        after: "A section for it: the unit number, the walk from Sunway Velocity, the hours by day, and a map you can open.",
      },
    ],
  },
];
