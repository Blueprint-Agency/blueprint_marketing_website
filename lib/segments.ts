/**
 * "Who it's for" — buyer self-identification, segmented by business type.
 *
 * Scoped to the /v2 world on purpose. This file deliberately does NOT touch
 * lib/clients.ts, whose hard rule (sector only where user-confirmed) protects
 * the incumbent world at / and its case-study pages.
 *
 * SOURCING OF THE DESCRIPTORS BELOW
 * ---------------------------------
 * PRODUCT.md records no confirmed sector for five of the six clients, and
 * forbids printing a guess beside a real client's name. The descriptors here
 * are NOT guesses and NOT inferred from domain names: each is taken from the
 * client's own live homepage title or headline, captured 2026-07-27.
 *
 *   Vatti Malaysia — "Kitchen Appliances Supplier in Malaysia | VATTI"
 *   Kaiteki        — "Kaiteki Skin Aesthetic Clinic"
 *   AQ Energy      — "AQ Energy | Malaysia Solar Company for Homes & Businesses"
 *   Yoga Sadhana   — "Yoga Studio in Singapore for Beginners & More"
 *   Teeko          — homepage headline "Travel Malaysia Easy with Teeko",
 *                    with restaurants and travel SIM sections
 *   Five Clinic    — user-confirmed in PRODUCT.md (aesthetic clinic, Bangsar
 *                    and Puchong, doctor-led)
 *
 * Reading a client's own homepage is a different evidence class from
 * inventing a label, but it is still not the client confirming it to you.
 * Ask them before this goes public, and correct anything they dispute.
 */

export type Segment = {
  id: string;
  /** The buyer's own words for what they run. */
  title: string;
  /** Who this is, in one line addressed to them. */
  who: string;
  /** The problem this type of business actually has. */
  pain: string;
  /** What Blueprint builds for them — capabilities recorded in PRODUCT.md only. */
  builds: string[];
  /** Real clients of this type. Slugs must exist in lib/clients.ts. */
  clientSlugs: string[];
};

export const SEGMENTS: Segment[] = [
  {
    id: "clinics",
    title: "Clinics & aesthetics",
    who: "You are doctor-led or therapist-led, and your treatments are what people search for.",
    pain: "Patients search a treatment by name, land on a competitor, and you never even know they existed. The ones who do message you come in after hours.",
    builds: [
      "A page for every treatment, written to rank",
      "Free consultation funnel",
      "Booking system",
      "WhatsApp automation that answers at 11pm",
    ],
    clientSlugs: ["five-clinic", "kaiteki"],
  },
  {
    id: "product",
    title: "Retail & product brands",
    who: "You sell a physical product through dealers, showrooms or your own shop.",
    pain: "People compare you against three other brands, one in each tab, and whoever replies first and looks most trustworthy wins.",
    builds: [
      "Search and shopping campaigns",
      "Product and category pages built to convert",
      "Meta ads",
      "Enquiries routed into a CRM so nothing sits unread",
    ],
    clientSlugs: ["vatti-malaysia"],
  },
  {
    id: "considered",
    title: "High-consideration services",
    who: "You sell something people research for weeks before they commit: an installation, a system, a big-ticket service.",
    pain: "The decision takes months and involves quotations. Leads go cold in the gap between the first enquiry and the follow up nobody made.",
    builds: [
      "SEO for the questions people ask while they are deciding",
      "Quotation and enquiry funnels",
      "A CRM so long deals do not go cold",
      "Follow up automation across the whole decision window",
    ],
    clientSlugs: ["aq-energy"],
  },
  {
    id: "studios",
    title: "Studios, classes & apps",
    who: "You sell time, membership or a place people come back to. Or a product that lives on a phone.",
    pain: "Getting the first visit is one job. Getting the second, and the tenth, is a different job entirely, and it runs on follow up you do not have time to do.",
    builds: [
      "Local SEO and social that fills classes",
      "Booking and membership flows",
      "Web and mobile apps",
      "Repeat-visit and reminder automation",
    ],
    clientSlugs: ["yoga-sadhana", "teeko"],
  },
];

/**
 * The two problems the whole offer resolves to. Hyros names an enemy per
 * feature section; these are Blueprint's two, and both are answerable with
 * capabilities PRODUCT.md actually records.
 */
export type Problem = {
  id: string;
  enemy: string;
  body: string[];
  /** Recorded capabilities that answer it. */
  answers: { name: string; note: string }[];
};

export const PROBLEMS: Problem[] = [
  {
    id: "invisible",
    enemy: "They search for what you do. They land on someone else.",
    body: [
      "The people who want your treatment, your product, your service are already searching for it on Google today. Most of them will never see you. They will see whoever built the page that answers the question, and that is the end of it.",
      "This is the cheapest customer you will ever get, and it is the one most businesses quietly hand to a competitor every single day.",
    ],
    answers: [
      { name: "Google SEO", note: "A page for every question your customers actually type" },
      { name: "Google SEM", note: "Paid search on the terms worth paying for" },
      { name: "Meta ads", note: "Facebook and Instagram, run properly" },
      { name: "Funnel building", note: "One obvious next step instead of a phone number" },
      { name: "Video production", note: "The thing that makes people stop scrolling" },
      { name: "Branding", note: "Look like the business you want to be" },
    ],
  },
  {
    id: "leak",
    enemy: "Most of it leaks after the click.",
    body: [
      "You can buy all the attention you like. But if the enquiry comes in at 9:41 on a Tuesday night and nobody replies until Monday morning, you paid for a customer that somebody else served.",
      "That gap is where most of the money goes, and it is the part most agencies hand straight back to you.",
    ],
    answers: [
      { name: "Booking systems", note: "They book themselves, any hour" },
      { name: "WhatsApp automation", note: "Answers the moment someone messages" },
      { name: "CRM and pipelines", note: "Nobody falls through the cracks" },
      { name: "Web and mobile apps", note: "When off-the-shelf will not do" },
      { name: "AI agents and workflows", note: "The admin nobody wants to do" },
      { name: "Custom software", note: "Internal tools built around how you actually work" },
    ],
  },
];
