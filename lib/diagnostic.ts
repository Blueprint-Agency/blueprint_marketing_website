/**
 * THE DIAGNOSTIC — the questionnaire that replaced "Two things cost you customers".
 *
 * WHAT CHANGED AND WHY
 * --------------------
 * The old section told the reader what her problem was and then sold the
 * answer. This one makes her name the problem herself and then hands her a
 * reading. Same argument, opposite direction — and self-diagnosis is the
 * version she believes, because she supplied the evidence.
 *
 * It is also the lead form. There is no email gate: the final action is a
 * WhatsApp message pre-written from her own answers, so a completed
 * questionnaire arrives in the business's actual inbox already qualified.
 *
 * THE PRESCRIPTION (2026-07-28)
 * -----------------------------
 * The output is not a list of services. It is three ordered moves, because
 * that is the actual shape of the advice:
 *
 *   FIX   — the leak she named. Nothing else pays until this holds.
 *   SCALE — the channel already bringing her customers. Cheapest growth
 *           available, because the guessing is already done.
 *   OPEN  — the channel she is not touching at all. The blind spot, which
 *           is where her competitors are while she is not.
 *
 * That ordering matters and is enforced: widening a channel that feeds a
 * leaking bucket makes the loss bigger, not smaller. So FIX always comes
 * first, and the copy says so out loud.
 *
 * CRO SHAPE (deliberate, in this order)
 * ------------------------------------
 * 1. Cheapest question first. "What kind of business?" costs nothing to
 *    answer and is about her, not about us. Never open with a form field.
 * 2. Scale second (branches / franchise). Low friction, and it is the single
 *    biggest fork in what we would actually build.
 * 3. The diagnosis question third, once she is committed. Multi-select,
 *    capped at three: most owners genuinely have two, and a cap forces a
 *    priority instead of collecting a shrug that ticks every box.
 * 4 & 5. What runs today, on each side of the offer. These decide SCALE and
 *    OPEN — what is present gets widened, what is absent gets opened.
 * 6. Who runs it. Decides how much we build versus hand over, and it is the
 *    question that separates "needs automation" from "needs infrastructure".
 * 7. Timing last. It is the qualifier, and it is the only question that
 *    would have felt like a sales question if asked early.
 *
 * TRUTH RULES
 * -----------
 * Every service the engine can recommend is a capability recorded in
 * PRODUCT.md and already present in lib/services.ts. The reading names a
 * mechanism and a priority; it never claims an outcome, a percentage or a
 * timeline, because none is recorded.
 */

import { SERVICES, type Service } from "@/lib/services";
import { whatsapp } from "@/lib/site";

export type Choice = {
  value: string;
  label: string;
  note?: string;
  /** Multi-select only: selecting this clears every other option. */
  exclusive?: boolean;
};

export type Answers = {
  sector: string;
  branches: string;
  leak: string[];
  attract: string[];
  capture: string[];
  team: string;
  urgency: string;
};

export type QuestionId = keyof Answers;

export type Question = {
  id: QuestionId;
  /** Label on the progress rail. Two words maximum. */
  short: string;
  question: string;
  help?: string;
  /** Checkbox semantics instead of radio, and no auto-advance. */
  multi?: boolean;
  /** Multi-select only: hard cap on how many can be held at once. */
  max?: number;
  choices: Choice[];
};

export const QUESTIONS: Question[] = [
  {
    id: "sector",
    short: "Business",
    question: "What kind of business do you run?",
    help: "So the reading at the end is about your kind of business, not a generic one.",
    choices: [
      {
        value: "clinic",
        label: "A clinic",
        note: "Aesthetic, medical, dental or therapy",
      },
      {
        value: "product",
        label: "A product or retail brand",
        note: "Sold through dealers, showrooms or your own shop",
      },
      {
        value: "considered",
        label: "A big-ticket service",
        note: "Solar, renovation, installations, anything people ask for a quotation first",
      },
      {
        value: "studio",
        label: "A studio, class or membership",
        note: "You sell time, seats or a place people come back to",
      },
      { value: "other", label: "Something else" },
    ],
  },
  {
    id: "branches",
    short: "Scale",
    question: "How many outlets do you run?",
    help: "Whatever we build has to work the same way in every one of them.",
    choices: [
      { value: "one", label: "One", note: "Or online only" },
      { value: "2-5", label: "2 to 5 outlets" },
      { value: "6-10", label: "6 to 10 outlets" },
      { value: "10+", label: "More than 10, or a franchise" },
    ],
  },
  {
    id: "leak",
    short: "The leak",
    question: "Where does it actually break down?",
    help: "Pick up to three. If everything feels broken, choose the three that cost you the most. The order we fix them in depends on it.",
    multi: true,
    max: 3,
    choices: [
      {
        value: "unseen",
        label: "Not enough people find us at all",
        note: "The phone would ring if they knew we existed",
      },
      {
        value: "nobite",
        label: "They visit the site, then leave without asking",
        note: "People come, and nothing happens",
      },
      {
        value: "slow",
        label: "Enquiries come in and we are slow to reply",
        note: "Especially after hours and on weekends",
      },
      {
        value: "cold",
        label: "We reply, then they go quiet",
        note: "No one follows up and the deal goes cold",
      },
      {
        value: "admin",
        label: "We are busy, and running it is eating the team",
        note: "Growing means hiring more people",
      },
      {
        value: "unsure",
        label: "We cannot tell. That is the problem",
        note: "No numbers you would trust either way",
        exclusive: true,
      },
    ],
  },
  {
    id: "attract",
    short: "Traffic",
    question: "What brings people in today?",
    help: "Choose everything that applies. What is here is what we would scale.",
    multi: true,
    choices: [
      { value: "seo", label: "Google search", note: "We rank for things people type" },
      { value: "sem", label: "Google Ads" },
      { value: "meta", label: "Facebook or Instagram ads" },
      { value: "social", label: "Organic social and content" },
      {
        value: "nothing",
        label: "Nothing deliberate",
        note: "Word of mouth and walk-ins",
        exclusive: true,
      },
    ],
  },
  {
    id: "capture",
    short: "Catching",
    question: "When an enquiry comes in, what catches it?",
    help: "Choose everything that applies.",
    multi: true,
    choices: [
      { value: "manual", label: "WhatsApp, replied by a person" },
      { value: "forms", label: "A website form or an email inbox" },
      { value: "booking", label: "An online booking system" },
      { value: "crm", label: "A CRM that tracks every lead" },
      { value: "sheets", label: "An Excel sheet or a notebook" },
      {
        value: "none",
        label: "Nothing formal",
        note: "Depends who is free at the time",
        exclusive: true,
      },
    ],
  },
  {
    id: "team",
    short: "Team",
    question: "Who runs your marketing day to day?",
    help: "This decides how much we build for you and how much we hand over.",
    choices: [
      {
        value: "none",
        label: "Nobody. I do it myself",
        note: "In between running everything else",
      },
      {
        value: "one",
        label: "One person in-house",
        note: "A marketing person, or an admin who picks it up",
      },
      { value: "small", label: "Two or three in-house" },
      { value: "big", label: "Four or more in-house" },
      {
        value: "agency",
        label: "An outside agency runs it",
        note: "With or without someone in-house managing them",
      },
    ],
  },
  {
    id: "urgency",
    short: "Timing",
    question: "How soon do you want this fixed?",
    choices: [
      {
        value: "now",
        label: "Now",
        note: "It is costing us money every week it stays like this",
      },
      { value: "quarter", label: "In the next few months" },
      { value: "looking", label: "Just looking at options for later" },
    ],
  },
];

export const EMPTY_ANSWERS: Answers = {
  sector: "",
  branches: "",
  leak: [],
  attract: [],
  capture: [],
  team: "",
  urgency: "",
};

/** The visible label for a stored value — used by the summary chips and the message. */
export function labelFor(id: QuestionId, value: string): string {
  const q = QUESTIONS.find((x) => x.id === id);
  return q?.choices.find((c) => c.value === value)?.label ?? value;
}

/* ---------------------------------------------------------------- engine */

type Weights = Record<string, number>;

function bump(w: Weights, id: string, n: number) {
  w[id] = (w[id] ?? 0) + n;
}

/**
 * The leaks she names do most of the work; everything else adjusts them.
 * Weights are deliberately small and legible — this is a priority ordering
 * over eleven real capabilities, not a scoring model pretending to be one.
 *
 * `web-design` carries the weight that used to be split between `funnels` and
 * `branding`, which were merged into it on 2026-08-17. Where both scored the
 * same leak — `nobite`, the visitor who arrives and leaves — the higher of the
 * two is kept rather than the sum: adding them would have made one service
 * outrank everything on the list by arithmetic rather than by judgement.
 */
const BY_LEAK: Record<string, Weights> = {
  unseen: { seo: 6, sem: 5, meta: 3, "web-design": 2 },
  nobite: { "web-design": 6, video: 3, seo: 1 },
  slow: { whatsapp: 6, booking: 5, ai: 2 },
  cold: { crm: 6, whatsapp: 4, ai: 2, "web-design": 1 },
  admin: { ai: 6, software: 4, apps: 3, crm: 2 },
  unsure: { seo: 2, "web-design": 2, whatsapp: 2, crm: 2 },
};

const BY_SECTOR: Record<string, Weights> = {
  clinic: { booking: 3, whatsapp: 3, seo: 2 },
  product: { sem: 3, meta: 2, crm: 1, "web-design": 1 },
  considered: { crm: 3, seo: 2, "web-design": 2 },
  studio: { booking: 3, meta: 2, apps: 1 },
  other: {},
};

const BY_BRANCHES: Record<string, Weights> = {
  one: {},
  "2-5": { booking: 1, crm: 1, whatsapp: 1 },
  "6-10": { booking: 2, crm: 2, software: 1, whatsapp: 1 },
  "10+": { software: 3, crm: 3, booking: 2, apps: 2 },
};

/**
 * Capacity changes what is worth building, not just what is broken. Nobody
 * in-house means it has to run without a person; a full team means they do
 * not need hands, they need the infrastructure they are working around.
 */
const BY_TEAM: Record<string, Weights> = {
  none: { ai: 3, whatsapp: 3, booking: 2 },
  one: { ai: 2, crm: 2, whatsapp: 1, booking: 1 },
  small: { crm: 2, "web-design": 1, software: 1 },
  big: { software: 2, apps: 2, crm: 1 },
  agency: { booking: 3, crm: 3, whatsapp: 2 },
};

/** What she is NOT running is the opportunity. */
const MISSING_ATTRACT: Weights = { seo: 3, sem: 2, meta: 2 };
const MISSING_CAPTURE: Weights = { booking: 3, crm: 3 };

const VERDICTS: Record<string, { verdict: string; reading: string }> = {
  unseen: {
    verdict: "The cheapest customer you will ever get is going to someone else.",
    reading:
      "People are searching for what you do on Google today, and they are finding whoever built the page that answers them. That is a demand problem, and it is the one that builds up over time. Every month you are not there, a competitor is, and they get that customer for free.",
  },
  nobite: {
    verdict: "You are paying for the attention, then losing it at the door.",
    reading:
      "Traffic that lands and leaves is the most expensive kind there is. Usually there is no clear next step on the page, or nothing on it makes you look like the safe choice, so the visitor goes back to the other three tabs they had open.",
  },
  slow: {
    verdict: "You already have the customer. The reply time is what loses them.",
    reading:
      "In Malaysia the enquiry comes in on WhatsApp, and usually after hours. Whoever replies first is the one who gets that customer. If yours only gets replied on Monday morning, you paid for a customer that somebody else served on Saturday night.",
  },
  cold: {
    verdict: "The money is going into the gap after the first reply.",
    reading:
      "A deal that needed one more follow up and did not get it just goes cold, and nobody notices, because nobody was tracking it. That is not your team being careless. There is simply nothing holding the lead.",
  },
  admin: {
    verdict: "The business works. Running it is the bottleneck.",
    reading:
      "When everything between an enquiry coming in and a customer being served is done by hand, growing means hiring more people. Most of that work does not need a person. It needs the system nobody has had a free week to build.",
  },
  unsure: {
    verdict: "Not knowing where it leaks is the thing to fix first.",
    reading:
      "Nearly every business we take on is losing money in two places: the people who never find them, and the ones who do and then slip through the gap after the click. Without tracking you cannot tell which one is yours, so you end up spending more on the half that was already working.",
  },
};

const BRANCH_NOTE: Record<string, string> = {
  one: "",
  "2-5": "Across two to five outlets the fix also has to work the same way in each one. If not, the outlet with the slowest reply quietly drags down the average, and you cannot see which outlet it is.",
  "6-10": "At six to ten outlets this is no longer something you can hold together by hand. The same funnel, the same reply and the same follow up have to run at every outlet and report to one place, or you are running ten different businesses.",
  "10+": "At this size it is a systems problem dressed up as a marketing problem. One funnel, one reply standard, one place where every lead is tracked, copied to every outlet and reported in one place, and built so that opening the next outlet is a setting rather than a whole project.",
};

/** Who would actually run the thing once it exists. */
const TEAM_NOTE: Record<string, string> = {
  none: "With nobody on marketing full time, none of this can depend on someone remembering to do it. Whatever we build has to keep running whether or not you have time that week.",
  one: "One person in-house can run this. What they cannot do is build it and run it at the same time. So we would build the machine and leave them operating it, instead of assembling it.",
  small: "Two or three in-house is real capacity. What a team that size usually cannot do is build the systems underneath the work. So the split is clean: we build, your team runs.",
  big: "With four or more in-house you do not need more hands. You need the systems your team is currently working around: the lead tracking, the automation, the tools that stop good people doing manual work.",
  agency: "An agency is buying you traffic. Very few of them build the booking, the CRM or the WhatsApp reply that catches it, which is exactly the half you just told us is leaking. That gap is the usual reason ad spend stops converting.",
};

const URGENCY_LINE: Record<string, string> = {
  now: "You said you want this fixed now, so we would put the fastest moving piece live first, instead of starting with the part that takes months to build up.",
  quarter:
    "You have a few months, which is the comfortable case. It lets us start the slow work and the switch-on-today work at the same time.",
  looking:
    "You are still looking, so there is nothing to sell you today. Ask us what we would do and we will tell you, whether or not you ever hire us.",
};

const SECTOR_PHRASE: Record<string, string> = {
  clinic: "a clinic",
  product: "a product brand",
  considered: "a big-ticket service",
  studio: "a studio or membership business",
  other: "a business like yours",
};

/** The three acquisition channels SCALE and OPEN choose between. */
const CHANNELS = ["seo", "sem", "meta"] as const;

const CHANNEL_LABEL: Record<string, string> = {
  seo: "Google search",
  sem: "Google Ads",
  meta: "Facebook and Instagram ads",
};

export type Move = {
  kind: "fix" | "scale" | "open";
  head: string;
  body: string;
  /** The capability this move resolves to. Absent when there is nothing to scale. */
  service?: Service;
};

export type Diagnosis = {
  verdict: string;
  /** One paragraph per leak she named, hers first. */
  readings: string[];
  /** Only present when she named more than one leak. */
  compound: string;
  branch: string;
  team: string;
  urgency: string;
  /** Fix, then scale, then open. The order is the advice. */
  moves: Move[];
  /** Top three recommended capabilities, best first. */
  services: Service[];
  /** WhatsApp deep link, pre-written from the answers. */
  href: string;
  /** Button text, dynamic on both timing and the top recommendation. */
  cta: string;
};

const byId = new Map(SERVICES.map((s) => [s.id, s]));

export function diagnose(a: Answers, business?: string): Diagnosis {
  const w: Weights = {};

  /* Every named leak scores in full. Three selections legitimately produce a
     broader recommendation — that IS the finding, and flattening it would
     hide the compounding the reading goes on to name. */
  for (const leak of a.leak) {
    for (const [id, n] of Object.entries(BY_LEAK[leak] ?? {})) bump(w, id, n);
  }
  for (const [id, n] of Object.entries(BY_SECTOR[a.sector] ?? {})) bump(w, id, n);
  for (const [id, n] of Object.entries(BY_BRANCHES[a.branches] ?? {})) bump(w, id, n);
  for (const [id, n] of Object.entries(BY_TEAM[a.team] ?? {})) bump(w, id, n);

  const running = a.attract.includes("nothing") ? [] : a.attract;
  for (const [id, n] of Object.entries(MISSING_ATTRACT)) {
    if (!running.includes(id)) bump(w, id, n);
  }
  /* Already buying traffic and it is not converting — the page is the problem,
     not the channel. Sending more budget at it would make the leak bigger. */
  if (
    (running.includes("sem") || running.includes("meta")) &&
    a.leak.includes("nobite")
  ) {
    bump(w, "web-design", 3);
  }

  const caught = a.capture.includes("none") ? [] : a.capture;
  for (const [id, n] of Object.entries(MISSING_CAPTURE)) {
    if (!caught.includes(id)) bump(w, id, n);
  }
  if (caught.includes("manual")) bump(w, "whatsapp", 3);
  if (caught.includes("forms")) bump(w, "whatsapp", 2);
  if (caught.includes("sheets")) {
    bump(w, "software", 2);
    bump(w, "ai", 1);
  }
  if (a.capture.includes("none")) {
    bump(w, "whatsapp", 3);
    bump(w, "crm", 1);
  }

  /* Ties break on the order in lib/services.ts, which runs attract-then-build.
     That is the right tiebreak: with nothing else to separate them, the thing
     that brings people in comes before the thing that catches them. */
  const ranked = SERVICES.filter((s) => (w[s.id] ?? 0) > 0).sort(
    (x, y) => (w[y.id] ?? 0) - (w[x.id] ?? 0),
  );

  const services = ranked.slice(0, 3);
  /* Every path through the engine scores at least four services, but a
     recommendation list is not a place to trust arithmetic blindly. */
  if (services.length === 0) {
    for (const id of ["web-design", "whatsapp", "crm"]) {
      const s = byId.get(id);
      if (s) services.push(s);
    }
  }

  const top = services[0];
  const primary = a.leak[0] ?? "unsure";
  const v = VERDICTS[primary] ?? VERDICTS.unsure;

  /* Hers first, then the others in the order she picked them. */
  const readings = [
    v.reading,
    ...a.leak.slice(1).map((k) => VERDICTS[k]?.reading).filter(Boolean),
  ] as string[];

  return {
    verdict: v.verdict,
    readings,
    compound:
      a.leak.length > 1
        ? `You picked ${a.leak.length === 2 ? "two" : "three"} of these, which is the normal case, and the reason it feels unfixable from the inside. They multiply instead of adding up. The traffic you pay for pours into the gap you also picked, so money spent on the first problem leaves through the second. That is why the order below matters more than the list itself.`
        : "",
    branch: BRANCH_NOTE[a.branches] ?? "",
    team: TEAM_NOTE[a.team] ?? "",
    urgency: URGENCY_LINE[a.urgency] ?? "",
    moves: buildMoves(a, w, top, running, caught),
    services,
    href: whatsapp(buildMessage(a, services, business)),
    cta:
      a.urgency === "now"
        ? `Start with ${top.name}`
        : a.urgency === "quarter"
          ? `Plan ${top.name} with us`
          : `Ask us about ${top.name}`,
  };
}

/**
 * Fix, scale, open.
 *
 * SCALE reads the channels she already runs; OPEN reads the ones she does
 * not. When she runs all three, there is no channel left to open and the
 * blind spot has moved to the other half of the business, so OPEN falls
 * through to the strongest thing missing from how she catches enquiries.
 */
function buildMoves(
  a: Answers,
  w: Weights,
  top: Service,
  running: string[],
  caught: string[],
): Move[] {
  const byScore = (x: string, y: string) => (w[y] ?? 0) - (w[x] ?? 0);
  const scaleId = CHANNELS.filter((c) => running.includes(c)).sort(byScore)[0];
  const openId = CHANNELS.filter((c) => !running.includes(c)).sort(byScore)[0];

  const moves: Move[] = [];

  /* Keyed on whether the top service is a DEMAND channel, not on its group.
     Web design and video are grouped under "attract" but they are conversion
     work — telling someone whose complaint is "they visit and leave" that not
     enough people are arriving contradicts the answer she just gave us. */
  const isDemand = (CHANNELS as readonly string[]).includes(top.id);
  moves.push({
    kind: "fix",
    head: "Fix this first",
    body: isDemand
      ? `This one is the demand problem itself. There is no leak to plug before it, because not enough people are coming in for a leak to matter yet. ${top.name} is where the first ringgit goes.`
      : `Everything you spend bringing people in drains out here. We would put ${top.name} in before adding a single new visitor. Widening a channel that feeds a leaking bucket only makes the loss bigger.`,
    service: top,
  });

  if (scaleId) {
    moves.push({
      kind: "scale",
      head: "Scale where customers already come from",
      body: `${CHANNEL_LABEL[scaleId]} is already bringing you people. That means the expensive question is already answered: yes, this works for your business. Widening something you know works is the cheapest growth available to you, and we would do that before starting anything new beside it.`,
      service: byId.get(scaleId),
    });
  } else {
    moves.push({
      kind: "scale",
      head: "There is nothing to scale yet",
      body: running.includes("social")
        ? "Organic content is the only thing you run on purpose. It is worth keeping, but there is no dial on it. You cannot decide on Tuesday to have more of it by Friday. Until something with a dial is running, there is nothing here to widen."
        : "Nothing deliberate is bringing people in, so every customer you have, found you by accident. That is not a scaling problem yet, it is a starting one. It also means the first channel you switch on has nothing to be compared against.",
    });
  }

  if (openId) {
    moves.push({
      kind: "open",
      head: "Open what you are not touching",
      body: `You are not running ${CHANNEL_LABEL[openId]} at all. For ${SECTOR_PHRASE[a.sector] ?? "a business like yours"}, that is usually the biggest pool of customers nobody in your business is looking at, and your competitors are already there with nobody competing against them.`,
      service: byId.get(openId),
    });
  } else {
    /* All three channels running: the blind spot is on the other half.
       Walked as an explicit ladder rather than "first build service she has
       not got" — that let Custom Software be described as the thing catching
       her enquiries, which it is not. These three are the catch layer, in
       the order they are worth adding. WhatsApp automation is last because
       it is the only one the capture question cannot report her as having. */
    const gapId = !caught.includes("booking")
      ? "booking"
      : !caught.includes("crm")
        ? "crm"
        : "whatsapp";
    const gap = byId.get(gapId);
    moves.push({
      kind: "open",
      head: "Open what you are not touching",
      body: gap
        ? `You are running all three channels, so the blind spot is not traffic. It is what happens after the traffic arrives. ${gap.name} is the piece missing from how you catch what you are already paying for, and it is the cheapest thing on this page to add, because the customers are already coming.`
        : "You are running all three channels and catching enquiries properly, which is rare. At that point the growth is in depth rather than width. Doing each of them a lot better beats adding a fourth.",
      service: gap,
    });
  }

  return moves;
}

/**
 * The lead, as she will send it.
 *
 * She never faces an empty compose box, and the business receives a message
 * it can act on without asking six questions back. Kept as plain labelled
 * lines rather than prose: it has to survive being read on a phone, at
 * speed, by somebody with fourteen other chats open.
 */
function buildMessage(a: Answers, services: Service[], business?: string): string {
  const list = (ids: string[], id: QuestionId) =>
    ids.length ? ids.map((v) => labelFor(id, v)).join("; ") : "None";

  const lines = [
    "Hi Blueprint, I just did the questionnaire on your site. Here is what I answered.",
    "",
    `Business: ${labelFor("sector", a.sector)}`,
    `Locations: ${labelFor("branches", a.branches)}`,
    `Biggest problems: ${list(a.leak, "leak")}`,
    `Bringing people in now: ${list(a.attract, "attract")}`,
    `Catching enquiries now: ${list(a.capture, "capture")}`,
    `Marketing team: ${labelFor("team", a.team)}`,
    `Timing: ${labelFor("urgency", a.urgency)}`,
  ];

  const named = business?.trim();
  if (named) lines.push(`Business name / site: ${named}`);

  lines.push(
    "",
    `It suggested: ${services.map((s) => s.name).join(", ")}.`,
    "",
    "Can you tell me what you would look at first?",
  );

  return lines.join("\n");
}
