/**
 * Service deep-dives, qualification, differentiators and FAQ for /v2.
 *
 * TRUTH RULES OBSERVED HERE
 * -------------------------
 * - Every service listed is a capability recorded in PRODUCT.md. Nothing is
 *   added because a competitor offers it.
 * - No pricing, minimum spend, timeline guarantee, client count, or outcome
 *   figure appears anywhere. PRODUCT.md records none of them.
 * - "Ideal for" lines are judgements about fit, not claims of results.
 *
 * NOTHING IN THIS FILE IS AWAITING CONFIRMATION (2026-07-29)
 * ----------------------------------------------------------
 * The one flagged line — `WHY[1]`, "You talk to the person doing the work",
 * inferred from the agency's size rather than recorded in PRODUCT.md — was
 * cut in the PASE rewrite of WHY below, per the instruction attached to the
 * flag. Every claim here is now traceable to PRODUCT.md.
 */

export type Service = {
  id: string;
  name: string;
  tagline: string;
  body: string;
  /** Concrete deliverables. Recorded capabilities only. */
  does: string[];
  idealFor: string;
  group: "attract" | "build";
};

export const SERVICES: Service[] = [
  {
    id: "seo",
    name: "Google SEO",
    tagline: "Get found by people already looking for you",
    body: "The best customer you will ever get is the one searching for your service on Google right now. Ranking for those searches costs nothing per click and keeps paying you back for years.",
    does: [
      "Find the terms your customers actually search, not the ones that sound impressive",
      "A page built to answer each one properly",
      "Fix the technical problems holding the site back",
      "Report on what moved, in plain language",
    ],
    idealFor:
      "Businesses whose customers research before they buy: treatments, installations, big-ticket purchases.",
    group: "attract",
  },
  {
    id: "sem",
    name: "Google Ads",
    tagline: "Be there the moment someone is ready to buy",
    body: "SEO takes months to build up. Paid search puts you in front of the same high-intent searcher this afternoon, so you can find out what converts before you commit to building for it.",
    does: [
      "Search, Shopping and Performance Max campaigns",
      "Keyword and negative-keyword discipline so budget is not wasted",
      "Landing pages built for the campaign, not the homepage",
      "Ongoing optimisation against what actually converts",
    ],
    idealFor:
      "Anyone who needs enquiries now, and anyone testing which services are worth building SEO around.",
    group: "attract",
  },
  {
    id: "meta",
    name: "Meta Ads",
    tagline: "Facebook and Instagram, run properly",
    body: "Search captures people who already know they want it. Meta creates the want. It is where a treatment, a product or a studio gets discovered by someone who was not looking for it.",
    does: [
      "Creative built for the platform rather than resized from a poster",
      "Interest, behaviour and lookalike targeting",
      "Full-funnel structure from first view to enquiry",
      "Continuous creative testing, because creative is what fatigues",
    ],
    idealFor:
      "Building demand for something people do not yet know they need, and for visual businesses.",
    group: "attract",
  },
  {
    id: "funnels",
    name: "Funnel Building",
    tagline: "One obvious next step, not a phone number",
    body: "Most ad budget dies on the page it lands on. A funnel gives the visitor exactly one thing to do next, and makes doing it feel easy rather than like a commitment.",
    does: [
      "Landing pages written around one decision",
      "Consultation and enquiry flows",
      "Every path ending in a real WhatsApp conversation",
      "Testing what actually gets the message sent",
    ],
    idealFor:
      "Anyone spending on traffic that arrives and then does nothing.",
    group: "attract",
  },
  {
    id: "video",
    name: "Video Production",
    tagline: "The thing that makes people stop",
    body: "On a feed, the video is the ad. Everything else is delivery. Good footage of the real place, the real people and the real work outperforms anything stock.",
    does: [
      "Shoots built around what the ad needs, not what looks nice",
      "Cutdowns for feed, story and short-form",
      "Creative variations for testing",
    ],
    idealFor:
      "Businesses with something worth showing: a space, a process, a result.",
    group: "attract",
  },
  {
    id: "branding",
    name: "Branding",
    tagline: "Look like the business you want to be",
    body: "A buyer decides whether you are credible before they read a word. When you are asking someone to trust you with their face, their home or their money, looking established is not vanity.",
    does: [
      "Identity, mark and the rules that keep it consistent",
      "How it applies across the website, the ads and the shop itself",
      "Messaging that says what you do without jargon",
    ],
    idealFor:
      "Businesses that have outgrown how they look, or are entering a more premium market.",
    group: "attract",
  },
  {
    id: "booking",
    name: "Booking Systems",
    tagline: "They book themselves, at any hour",
    body: "Every enquiry that needs a human to convert it is an enquiry that can be lost. A booking system takes the appointment while you are with someone else, or asleep.",
    does: [
      "Booking flows built around how you actually schedule",
      "Slot, staff and branch handling",
      "Reminders that cut no-shows",
      "Connected to the marketing so the source is never lost",
    ],
    idealFor:
      "Clinics, studios, and anyone whose calendar is the business.",
    group: "build",
  },
  {
    id: "whatsapp",
    name: "WhatsApp Automation",
    tagline: "Answers the moment someone messages",
    body: "In Malaysia the enquiry arrives on WhatsApp, usually after hours. The business that replies in seconds gets the customer; the one that replies on Monday pays for them and loses them.",
    does: [
      "Instant, human-sounding first replies",
      "Qualifying questions that route to the right person",
      "Offering real slots and confirming bookings in the chat",
      "Follow-up sequences for the ones who go quiet",
    ],
    idealFor:
      "Every business whose customers WhatsApp you instead of filling in a form. Which is most of them here.",
    group: "build",
  },
  {
    id: "crm",
    name: "CRM & Pipelines",
    tagline: "Nobody falls through a crack",
    body: "A long decision needs somewhere to live. Without a pipeline, the deal that needed one more follow-up simply goes cold, and nobody notices because nobody was tracking it.",
    does: [
      "Pipeline built around your actual sales stages",
      "Enquiries routed in automatically from every channel",
      "Follow-up tasks and reminders that fire on their own",
      "Visibility of what is in play and what is stalling",
    ],
    idealFor:
      "Quotations, consultations, and anything with weeks between enquiry and sale.",
    group: "build",
  },
  {
    id: "apps",
    name: "Web & Mobile Apps",
    tagline: "When the off-the-shelf thing will not do",
    body: "Sometimes the workflow the business actually needs does not exist as a product you can subscribe to. We build it.",
    does: [
      "Customer-facing web and mobile apps",
      "Internal tools for the way your team works",
      "Integration with what you already run on",
    ],
    idealFor:
      "Businesses that have outgrown Excel sheets and off-the-shelf software.",
    group: "build",
  },
  {
    id: "ai",
    name: "AI Agents & Workflows",
    tagline: "The admin nobody wants to do",
    body: "The repetitive work between a lead arriving and a customer being served is where staff time disappears. Much of it can be handled without a person, reliably.",
    does: [
      "Agents that handle enquiries, qualification and routing",
      "Automated workflows across the tools you use",
      "Human handover at the point it actually matters",
    ],
    idealFor:
      "Owners doing admin at night that should not need doing at all.",
    group: "build",
  },
  {
    id: "software",
    name: "Custom Software",
    tagline: "Built around how you work",
    body: "For the parts of the business that are genuinely yours: the process no competitor runs and no off-the-shelf product supports.",
    does: [
      "Internal systems and dashboards",
      "Multi-branch and multi-team operations",
      "Whatever the business actually needs that nothing else covers",
    ],
    idealFor:
      "Established businesses with a process worth protecting.",
    group: "build",
  },
];

/**
 * Services with a page of their own, keyed by Service.id.
 *
 * Single source of truth for where a service name links, wherever it is
 * listed — the nav menu, the footer, anywhere later. It used to live inside
 * components/v2/Chrome.tsx, which meant the nav and the footer could disagree
 * about whether a service had a page.
 */
export const SERVICE_PAGES: Record<string, string> = {
  video: "/services/video-production",
  /* Branding's page is at /web-design, not /branding, and that is deliberate.
     The page argues that for a local business the brand is met as a website
     first, and the whole of its proof is one site rebuilt end to end — so the
     URL names what is actually on it. A reader clicking "Branding" in the nav
     lands on a page whose first section explains the substitution. */
  branding: "/services/web-design",
  booking: "/services/booking-system",
};

/**
 * Where a service's name should link.
 *
 * A service with a page of its own links to it. Everything else links to the
 * home page's services section, deep-linked to that service's own tab —
 * `#svc-<id>` is read by ServiceTabs, which selects the tab and scrolls the
 * section into view. Deliberately NOT an element id: no element carries it,
 * so the browser jumps nowhere and ServiceTabs owns the whole behaviour.
 *
 * This is what keeps the nav's Services menu honest. Twelve rows that all
 * scroll to the same band is a menu that lies about being a menu; twelve rows
 * that each land on the thing they name is navigation, and each one upgrades
 * to a real page by adding a line to SERVICE_PAGES above.
 */
export function serviceHref(id: string): string {
  return SERVICE_PAGES[id] ?? `/#svc-${id}`;
}

/** Buyer qualification — the "you're probably here because" pattern. */
export const QUALIFY: string[] = [
  "You are spending on ads and cannot tell which part of it is working.",
  "Enquiries come in, and too many of them go quiet before they book.",
  "Your competitors keep appearing on Google above you.",
  "You are doing the follow up yourself, at night, and you cannot keep doing it.",
  "You have been handed reports before, and never a system.",
];

/**
 * BRAND VALUES.
 *
 * Was "Differentiators" — a PASE persuasion ladder whose four rungs mostly
 * landed on one mechanism (the leak, the automated reply, the 11pm follow-up).
 * The user called that out on 2026-08-06 as too WhatsApp-heavy and asked for
 * values instead. A first pass gave four; the user asked for three and for
 * better ones. This is that cut.
 *
 * WHY THREE, AND WHY THESE THREE
 * ------------------------------
 * The four-point version had a structural fault: [0] "we look before we sell"
 * and [2] "no number we cannot defend" were the same value wearing two
 * costumes — both were honesty-at-a-cost — and [3] was a tone commitment
 * rather than a stance. Four points that are really two-and-a-half read as a
 * list padded to fill a grid.
 *
 * Three axes, no overlap:
 *
 *   [0] WHAT WE SAY       <- "Proof precedes claim" (PRODUCT.md Principle 1)
 *   [1] WHAT WE DO        <- Positioning: marketing leads, the build is edge
 *   [2] WHAT WE DO FIRST  <- Audit → Architect → Build → Scale, stage one
 *
 * [2] replaced a "we work for owners, not marketing departments" point on
 * 2026-08-06. That one failed a test worth remembering: a value has to say
 * something about US. It described the READER instead, and told him what he
 * lacks. The page already proves it works that way by being written in plain
 * words — a site that has to announce it is plain-spoken is neither.
 *
 * The test each one does have to pass is that it costs the company something.
 * A value that is free to hold is a slogan: nobody advertises that they will
 * happily take your money. [0] loses sales — it declines a bad fit rather
 * than sell into it. [1] removes the escape hatch of blaming the other
 * supplier. [2] is the most expensive of the three, because the cheap fix it
 * recommends first bills less than the ad budget it talks you out of.
 *
 * They also reinforce each other rather than sitting in parallel, which is
 * what makes this a position instead of a list: advice you have to build
 * yourself ([1]) is advice you give more carefully ([0]), and the reason you
 * can afford to name the unprofitable fix first ([2]) is that you are paid
 * for the build rather than the media ([1]).
 *
 * KEEP [0] AND [2] SEPARATE. They drift together every time this file is
 * edited, because both read as "honesty". [0] is about what we CLAIM; [2] is
 * about what we SPEND. The "fix you already own" line belongs in [2] and was
 * moved there out of [0] for exactly this reason.
 *
 * WHAT THIS DELIBERATELY DOES NOT DO
 * ----------------------------------
 * The commercial version of every one of these wants a number this business
 * does not have: "results in 30 days", "join 200 Malaysian businesses",
 * "38% average lift". PRODUCT.md records no aggregate figure, no timeline,
 * no client count and no testimonial. Nothing below asserts any of the four.
 * WhatsApp appears exactly once, inside a list of systems in [1], which is
 * the weight the positioning gives it.
 *
 * LOAD-BEARING: [0] is the only place on the home page that explains why
 * there are no percentages on it, since the "On results" note was removed on
 * 2026-08-06 with the empty testimonial band. The FAQ answers it a second
 * time for a reader who goes looking; this is where a reader who does not go
 * looking meets it. Do not soften [0] without putting that argument back
 * somewhere a reader will actually pass.
 *
 * Both promises in [0] — that we will name a fix we are not paid for, and
 * that we will decline a bad fit — are on record. See the "What does it
 * cost?" answer in FAQ below, which already commits to the second in the
 * user's own framing.
 */
export const WHY: { title: string; body: string }[] = [
  {
    // WHAT WE SAY. Proof precedes claim. Costs us sales, which is the point.
    // The "fix you already own" line moved out of here into [2] on the same
    // day it was written — it was about how we spend, not about what we
    // claim, and keeping it here blurred both points.
    title: "We only say what we can prove",
    body: "There is no revenue figure and no average lift anywhere on this site, because we do not have one we could honestly stand behind, and a number without a source is decoration. Results belong to each client, in that client's own numbers. Ask us about a business like yours and we will tell you exactly what we can share. And if we are not the right fit, you will hear that from us before you hear a price.",
  },
  {
    // WHAT WE DO. The position, and the one claim a competing KL agency
    // cannot truthfully repeat. Last line is the value, not the feature.
    title: "We build what we recommend",
    body: "We do not hand over a strategy and leave you to find someone to build it. The same team that recommends the work builds it: the marketing that brings people in, and the sites, booking, CRM and WhatsApp automation that hold them once they arrive. It is a useful discipline, because advice you have to build yourself is advice you give more carefully.",
  },
  {
    // WHAT WE DO FIRST. Audit-first, which is stage one of the recorded
    // delivery method and the only stage that decides what the other three
    // do. Replaced "We work for owners, not marketing departments" on
    // 2026-08-06: the user judged it did not fit and did not need saying.
    // Correct on both counts — it described the reader back to himself and
    // told him what he does not have, which the rest of the page already
    // demonstrates by simply being written in plain words.
    title: "We spend your money last",
    body: "Before anything is bought or built, we look at what you already have and find where people are actually dropping off. Often the first fix is a page or a follow-up step you own already, and it costs a fraction of the ad budget that would have papered over it. More traffic is the easiest thing for an agency to sell you, and it is rarely the first thing you need.",
  },
];

export type Faq = { q: string; a: string[] };

export const FAQ: Faq[] = [
  {
    q: "What exactly do you offer?",
    a: [
      "Two halves of one job. The marketing that brings people in: SEO, Google Ads, Meta ads, funnels, video and branding. And the systems that stop you losing them once they arrive: booking, WhatsApp automation, CRM, apps and custom software.",
      "You can start with one and add the other later. Most businesses need both eventually, because the leak is usually on the side they were not looking at.",
    ],
  },
  {
    q: "Can I hire you for just one service?",
    a: [
      "Yes. Plenty of jobs start with a single piece, usually SEO or the WhatsApp automation, and grow from there once it is working.",
    ],
  },
  {
    q: "What does it cost?",
    a: [
      "It depends entirely on what you need built and how much ad spend you want to run, so we do not publish a price or a minimum. Tell us what your business is and roughly what you are working with, and we will tell you what we would do and what it would take.",
      "If we are not the right fit for your budget we will say so rather than sell you something undersized.",
    ],
  },
  {
    q: "How quickly will I see something?",
    a: [
      "That depends on where you are starting and which half of the problem you have. Paid search and WhatsApp automation change things quickly because they are switched on rather than grown. SEO builds up over months.",
      "We would rather tell you which one applies to you after looking at your business than give you a timeline here that we cannot stand behind.",
    ],
  },
  {
    q: "Do you only work with big companies?",
    a: [
      "No. The businesses on this page are Malaysian and Singaporean owner-run companies: clinics, product brands, a solar company, a yoga studio. If you run the business yourself, you are exactly who this is built for.",
    ],
  },
  {
    q: "Why do you not show results and percentages?",
    a: [
      "Because we do not have an agency-wide figure we could honestly defend, and a number without a source is just decoration.",
      "Results belong to each client and each client's own numbers. Ask us about a specific business like yours in the chat and we will tell you what we are able to share.",
    ],
  },
  {
    q: "What happens after I message you?",
    a: [
      "You get a conversation, not a pitch deck. We ask what the business does and where it feels like people are dropping off, and we tell you what we would look at first, whether or not you hire us.",
    ],
  },
];
