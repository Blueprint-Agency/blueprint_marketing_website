/**
 * Reserve Today — everything on /services/booking-system that is not a
 * price. Prices live in lib/pricing.ts and only there.
 *
 * WHY THIS FILE EXISTS (2026-08-17)
 * ---------------------------------
 * The page shipped pricing-first on 2026-08-15 with a note at the top of
 * app/services/booking-system/page.tsx saying, in the user's own terms,
 * that a price list arriving before the argument reads as an ambush. This
 * file is the argument: the problem, the product, the objections. The page
 * now runs problem, proof, argument, comparison, price, FAQ, close.
 *
 * WHAT IS ALLOWED IN HERE, AND WHAT IS NOT
 * ----------------------------------------
 * The same rule the rest of the codebase enforces. Nothing below asserts a
 * result, a client count, a timeline, a rating or a quote, because
 * PRODUCT.md records none of those for this platform. Every line is either
 * a description of what the software does, a statement of what it does
 * NOT do, or a judgement written as a judgement.
 *
 * The absences are load-bearing and deliberately printed. lib/pricing.ts
 * records that there is no member mobile app and no website builder, and
 * says "do not paper over it here". FAQ below answers both in the open,
 * because a studio owner comparing three tabs will find out either way and
 * the only question is whether she finds out from us.
 */

/* ============================================================
   THE PROBLEM
   ============================================================ */

/**
 * What a studio owner is actually living with, named before anything is
 * sold. Rezerv opens its home page on the same device ("Struggling to
 * manage your fitness business efficiently?") and it is the right one:
 * the design system already has a rule for it, The Enemy-Named-In-The-
 * Heading Rule in DESIGN.v2.md.
 *
 * Each line is a specific failure with a mechanism, not a mood. "Admin is
 * hard" is unfalsifiable and sells nothing. "A teacher takes leave, the
 * class stays open, a member books it" is a scene the reader has lived
 * through, and it names the exact feature that prevents it.
 *
 * ORDER IS THE ESCALATION: one diary, then money, then people, then the
 * month end, then the second site. It ends where the price list begins.
 */
export const PAINS: { title: string; body: string }[] = [
  {
    title: "The timetable exists in three places",
    body: "A Google Sheet, an Instagram story and whatever the front desk has written down. They disagree by the end of most weeks, and the version a member acts on is whichever one she saw last.",
  },
  {
    title: "Packages get tracked by hand",
    body: "Ten-class credits, unlimited months, the friend who paid for half a package in cash. Somebody is keeping that in a spreadsheet, and the expiries are the part that quietly goes uncollected.",
  },
  {
    title: "Leave does not reach the schedule",
    body: "A teacher tells you on WhatsApp that she is away on Thursday. The Thursday class stays open, a member books it, and you find out when she arrives.",
  },
  {
    title: "Payroll is a monthly reconstruction",
    body: "Hours, headcounts and commission worked out from attendance sheets after the fact, every month, by the person who can least afford the evening.",
  },
  {
    title: "The second studio starts it all again",
    body: "A new timetable, a second set of spreadsheets, and no single number that tells you how the business is doing rather than how one room is doing.",
  },
];

/* ============================================================
   THE PRODUCT, SHOWN
   ============================================================ */

export type Screen = {
  /** Matches a drawing in components/v2/BookingArt.tsx. */
  id: string;
  /** Tab label. Short: the tab column is set at display scale. */
  name: string;
  /** One line under the name when the tab is open. */
  tagline: string;
  /** The paragraph under the drawing. What it does and why it matters. */
  body: string;
};

/**
 * Four screens, and the order is an argument rather than a feature list.
 *
 * The scheduler is what the owner runs. The booking page is what her
 * member sees, and it is the half most booking software demos skip, which
 * is why it is second rather than last. Leave is the one that makes the
 * first two safe. Money is the reason the whole thing pays for itself.
 *
 * WHY THEY ARE DRAWN AND NOT SCREENSHOT
 * -------------------------------------
 * The same decision ServiceArt, JobArt and QualArt already made on this
 * site: type stays crisp at any density, copy changes without a re-shoot,
 * and nothing has to be lifted out of a real studio's account. Yoga
 * Sadhana's members are real people with real bookings and their names do
 * not belong in a marketing capture.
 *
 * A note under the tour says these are drawings. Keep it. DESIGN.v2.md:
 * "Do label any illustrated content as an illustration in plain 0.875rem
 * type adjacent to it."
 */
export const SCREENS: Screen[] = [
  {
    id: "scheduler",
    name: "The schedule",
    tagline: "One timetable, and it is the one that is true",
    body: "Every class, room, teacher and private session in one week view, across every location on the plan. Overlapping classes are allowed because studios actually run them; double-booking a room is not, because the scheduler holds the room as well as the slot. Change a class here and the members holding it are told, without anybody writing a message.",
  },
  {
    id: "member",
    name: "What a member sees",
    tagline: "Booking that finishes on the first try",
    /* THIS LINE ONCE CLAIMED WAITLISTS AND CANCELLATION WINDOWS. Both were
       written here on 2026-08-17 and neither appears in PLANS, in MATRIX or
       anywhere else in this repository. They may well be real features; the
       point is that nothing on record said so, and a capability invented in
       a marketing sentence is exactly what the hard rules at the top of
       lib/pricing.ts and lib/rebuilds.ts exist to stop. Removed the same
       day. If the platform does have them, add them to MATRIX first and
       then say so here, so the cards, the table and this sentence cannot
       come apart. */
    body: "Your timetable on your own address, with her credit balance at the top and the next class one tap away. Checkout takes card, FPX, DuitNow and Touch 'n Go, because a Malaysian member who is asked for a foreign card at midnight simply closes the tab. QR check-in at the door is hers to operate rather than the front desk's, and the emails that confirm and remind send themselves.",
  },
  {
    id: "leave",
    name: "Staff and leave",
    tagline: "The class closes when the teacher is away",
    body: "A teacher requests leave in the same system that holds the timetable. Approve it and the scheduler blocks those slots before anybody can book them, which is the whole point and the reason a leave calendar in a separate app is worth nothing. Roles decide who can see what, so a teacher sees her own classes and not the takings.",
  },
  {
    id: "money",
    name: "Payroll and takings",
    tagline: "The month end is already worked out",
    body: "Attendance becomes hours, hours and headcounts become pay and commission, and the run is there at the end of the month instead of being rebuilt from paper. Alongside it: what each class, teacher and location actually sold, and a retail store for the mats, grips and towels that currently get sold out of a drawer.",
  },
];

/* ============================================================
   WHAT A MEMBER ACTUALLY DOES
   ============================================================ */

export type JourneyStep = { title: string; body: string };

/**
 * The member's loop, added 2026-08-17.
 *
 * WHY THIS IS THE MOST PERSUASIVE SECTION ON THE PAGE
 * ---------------------------------------------------
 * Everything above it is addressed to the owner and describes what she
 * operates. None of it answers the question that actually decides the
 * purchase, which is whether her members will use the thing at all. A
 * studio owner who has watched one booking system go unused by the people
 * it was bought for is not buying features, she is buying adoption.
 *
 * It is also the one device on Rezerv's home page that runs entirely on
 * narrative and needs no data: six steps following named people from first
 * visit to rebooking. Nothing in it requires a customer count, a
 * testimonial or a figure, which is why it is available to this page when
 * four of their other proof blocks are not.
 *
 * EVERY STEP IS A ROW IN MATRIX. In order: runs on your own address;
 * credit bundles and memberships plus the four checkout methods; credits
 * again; email notifications on 21 events; QR check-in and attendance;
 * and credits once more. Nothing here is a capability the price list does
 * not already sell.
 *
 * IT SAYS EMAIL, NOT "NOTIFICATIONS". The recorded feature is email on 21
 * events. Writing it as notifications invites a reader to assume SMS and
 * WhatsApp, which is the softest possible way to claim two channels
 * nothing on record supports.
 */
export const JOURNEY: JourneyStep[] = [
  {
    title: "She finds the timetable",
    body: "On your own address, in a browser, with nothing to download first.",
  },
  {
    title: "She buys",
    body: "A credit block, a package or a membership. Card, FPX, DuitNow or Touch 'n Go.",
  },
  {
    title: "She books",
    body: "One tap, and the credit comes off her balance while she watches.",
  },
  {
    title: "She is told",
    body: "A confirmation, then a reminder before the class. Emails fire on 21 events.",
  },
  {
    title: "She checks in",
    body: "A QR code at the door records the attendance without the front desk.",
  },
  {
    title: "She books the next one",
    body: "Her balance is on the screen she lands on, and the next class is one tap from it.",
  },
];

/* ============================================================
   WHAT IT REPLACES

   NOT RENDERED ANYWHERE SINCE 2026-08-17. The user removed the
   section that used it, "Everything here closes a tab you already
   have", which carried this list struck through above two
   paragraphs of argument.

   The array is kept rather than deleted, the same way lib/rebuilds.ts
   keeps its `changes` data after the Was / Now lists came off the web
   design page. Putting the section back is a matter of mapping over
   it again; the .rp CSS that styled it was removed with the section,
   because dead CSS ships to every visitor and a dead export does not.

   NOTHING WAS LOST FROM THE PAGE'S ARGUMENT. The two paragraphs that
   sat under this list made one point, that the parts deciding whether
   a member trusts you are on every plan rather than being the
   upgrade. That point is still made twice: once by the closing line
   of the journey timeline, and once by the lead of the pricing
   section itself.
   ============================================================ */

/**
 * The all-in-one argument, made by naming the things that go away rather
 * than by claiming to be all-in-one. Every competitor page in this
 * category says "everything in one place"; none of them says which six
 * tabs you get to close, and the second version is the one a reader can
 * check against her own browser.
 *
 * NO COUNT IS CLAIMED in the heading on the page. "Six tools" would be an
 * invented figure about the reader's own business.
 */
export const REPLACES: { thing: string; note: string }[] = [
  {
    thing: "The timetable spreadsheet",
    note: "and the second copy of it somebody keeps offline",
  },
  {
    thing: "The credits and packages sheet",
    note: "with the expiry dates nobody is watching",
  },
  {
    thing: "The DM inbox as a booking system",
    note: "and the double bookings it produces on a busy week",
  },
  {
    thing: "A separate leave form",
    note: "that the schedule never hears about",
  },
  {
    thing: "The monthly payroll rebuild",
    note: "worked back from attendance sheets",
  },
  {
    thing: "A payment link sent by hand",
    note: "one member at a time, after the class",
  },
];

/* ============================================================
   THE FAQ
   ============================================================ */

export type BookingFaq = { q: string; a: string[] };

/**
 * Written to be read by somebody who has just seen the price and is
 * looking for the catch. So the two answers she is hunting for, the trial
 * and the absences, are third, fourth and fifth rather than buried.
 *
 * THE TWO ABSENCES ARE ANSWERED IN THE OPEN, ON PURPOSE
 * -----------------------------------------------------
 * lib/pricing.ts: "There is no member mobile app and no website builder.
 * Vibefam puts apps on its entry plan and a site builder on its middle
 * one; Rezerv has both. A studio comparing pages will notice. Do not paper
 * over it here."
 *
 * A page that answers its own worst question is the cheapest trust this
 * page can buy, and the website answer is the one place on this page where
 * a missing feature is honestly a different service we sell. It links to
 * it. That is a cross-sell that costs the reader nothing, which is the
 * only kind worth making.
 *
 * NOTHING HERE STATES A TIMELINE. No setup or migration duration is
 * recorded anywhere, so none is promised. The onboarding answer says what
 * happens, not how long it takes.
 */
export const BOOKING_FAQ: BookingFaq[] = [
  {
    q: "Are there per-booking, per-member or per-sale fees?",
    a: [
      "No. The plan price is the whole software cost. We do not take a cut of what you sell, we do not charge for the member who signs up in March, and we do not meter bookings.",
      "Card and e-wallet processing is the one thing on top, and it goes to the payment provider rather than to us. You would be paying it whoever you ran your booking on.",
    ],
  },
  {
    q: "What does a second location cost?",
    a: [
      "Nothing extra, up to the number of locations your plan covers. Studio covers two and Group covers five, and there is no per-outlet charge inside that.",
      "Past five it becomes a quote rather than a published rate, because at that size the questions are about migration, reporting and support rather than about seats.",
    ],
  },
  {
    q: "Is there a free trial?",
    a: [
      "No, and the honest reason is that a trial on an empty account tells you nothing about a booking system. What matters is whether it holds your timetable, your class types, your credit packages and your teachers.",
      "So the first step is a demo run against your actual schedule instead. You see your own week in it before you decide anything.",
    ],
  },
  {
    q: "Do my members get a mobile app?",
    a: [
      "Not a native one in the app stores. Members book on the web, on your own address, and it is built to be added to a phone's home screen where it behaves like an app.",
      "This is a real difference from some competitors and we would rather you heard it here than found it in a comparison. If a branded app in the stores is a requirement for you, say so at the demo and we will tell you plainly whether we are the right fit.",
    ],
  },
  {
    q: "Does it build my website as well?",
    a: [
      "No. Reserve Today runs the booking, the timetable, the checkout and the member's account, on your own address. It is not a website builder and there are no page templates in it.",
      "The website is a separate piece of work, and it is one we do. If you need both, the two get built to sit together rather than bolted on afterwards.",
    ],
  },
  {
    q: "Can you move my members across from what I run now?",
    a: [
      "Yes, and it is the one thing on this page charged as a one-off rather than monthly. Members, remaining credit balances, active packages and future bookings come over.",
      "Where it lands in the range depends on how much history comes with you and what shape it arrives in. An export from another booking platform is a different job from a folder of spreadsheets, and we will tell you which one you have before quoting it.",
    ],
  },
  {
    q: "Who owns the data, and what happens if we leave?",
    a: [
      "You do. CSV export is on the Group plan and available on request on any plan, and nothing is deleted when a report can no longer reach it.",
      "The reporting window on each plan is how far back one report can look, not how long your records are kept. Those are two different promises and it is worth knowing which is which when you compare us to anybody else.",
    ],
  },
  {
    q: "Can it run on our own domain?",
    a: [
      "Every plan runs on an address of your own on our domain. Your own domain, pointed at it with a certificate we maintain, is included on Group.",
    ],
  },
];
