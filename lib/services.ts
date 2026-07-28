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
 * FLAGGED FOR USER CONFIRMATION (2026-07-27)
 * ------------------------------------------
 * `WHY[1]` ("You talk to the person doing the work") describes how Blueprint
 * staffs an engagement. It is NOT recorded in PRODUCT.md — it was inferred
 * from the agency's size and the WhatsApp-first conversion path. If the user
 * cannot confirm it, cut it; it is a promise a buyer will hold them to.
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

/** Buyer qualification — the "you're probably here because" pattern. */
export const QUALIFY: string[] = [
  "You are spending on ads and cannot tell which part of it is working.",
  "Enquiries come in, and too many of them go quiet before they book.",
  "Your competitors keep appearing on Google above you.",
  "You are doing the follow up yourself, at night, and you cannot keep doing it.",
  "You have been handed reports before, and never a system.",
];

/** Why the combination works. Mechanism, not claims. */
export const WHY_IT_WORKS: { title: string; body: string }[] = [
  {
    title: "The marketing and the systems are built together",
    body: "Traffic and follow-up are designed as one thing. That is the whole point. Separately, they leak into the gap between them.",
  },
  {
    title: "Every path ends in a conversation",
    body: "Not a form, not a call-back request. WhatsApp, where your customers already are, answered immediately.",
  },
  {
    title: "We build what we recommend",
    body: "The booking system, the CRM, the automation. We are not writing a spec for somebody else to deliver, so nothing gets handed over and dropped.",
  },
  {
    title: "Plain reporting",
    body: "What we did, what happened, what we are doing next, in language that does not assume you have a marketing department.",
  },
];

/**
 * Differentiators.
 *
 * NOTE: index 1 is NOT confirmed in PRODUCT.md — see the file header.
 */
export const WHY: { title: string; body: string; unconfirmed?: boolean }[] = [
  {
    title: "We build the machine, not just the ads",
    body: "Most agencies buy media and hand the leads back to you. The booking system, the CRM, the WhatsApp automation and the apps are built here, by the same people who ran the campaign that filled them.",
  },
  {
    title: "You talk to the person doing the work",
    body: "Not a salesperson in the pitch and an account manager afterwards. The person who would run it is the person in the chat.",
    unconfirmed: true,
  },
  {
    title: "We write to an owner, not a marketer",
    body: "You run the whole business. You should not need to learn marketing jargon to understand what you are paying for.",
  },
  {
    title: "We will not print a number we cannot defend",
    body: "There is no agency-wide revenue figure or average lift on this site, because we do not have one we could stand behind. Ask us what we can share about a specific client and we will tell you honestly.",
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
