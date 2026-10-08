"use client";

import { useEffect, useRef, useState } from "react";
import { WhatsAppMark } from "./Marks";
import { Reveal } from "./SeoArt";

/**
 * The interactive pieces of /whatsapp-automation-for-local-businesses.
 *
 * THE SYSTEMS PAGES SHOW, THEY DO NOT ARGUE (user's call, 2026-10-08)
 * -------------------------------------------------------------------
 * The marketing pages make a case in diagrams. The build services have no
 * client who can be named, so this page lets the reader watch the thing
 * work instead: a chat that plays in the hero, one enquiry followed start
 * to finish beside a pinned phone, and a calculator that runs on the
 * reader's own numbers. Its real proof is the demo: Blueprint's own
 * WhatsApp runs on the same automation.
 *
 * The business in every chat is generic, nobody in it is named, and no
 * figure here is a result Blueprint claims. The prices and times inside
 * the chats belong to the drawn business, the way a mock-up's do.
 *
 * WhatsApp's own bubble colours are used inside the phone because the
 * phone is a picture of WhatsApp. Outside it, green stays the action
 * colour and nothing else.
 */

/* ------------------------------------------------------------------
   The phone, shared by the hero and the story.
   ------------------------------------------------------------------ */

type Msg =
  | { kind: "in" | "out"; text: string; time?: string; tag?: string }
  | { kind: "slots"; options: string[]; picked?: number }
  | { kind: "note"; text: string };

function Bubble({ m }: { m: Msg }) {
  if (m.kind === "note") return <span className="wa-note">{m.text}</span>;
  if (m.kind === "slots")
    return (
      <span className="wa-slots">
        {m.options.map((o, i) => (
          <span
            className={`wa-slot ${m.picked === i ? "is-picked" : ""}`}
            key={o}
          >
            {o}
          </span>
        ))}
      </span>
    );
  return (
    <span className={`wa-bub is-${m.kind}`}>
      {m.tag && (
        <span className={`wa-tag t-${m.tag.toLowerCase()}`}>{m.tag}</span>
      )}
      {m.text}
      {m.time && <span className="wa-time">{m.time}</span>}
    </span>
  );
}

function Phone({
  children,
  title = "Your business",
  status = "online",
}: {
  children: React.ReactNode;
  title?: string;
  status?: string;
}) {
  return (
    <div className="wa-phone" aria-hidden="true">
      <div className="wa-head">
        <span className="wa-avatar" />
        <span className="wa-who">
          <b>{title}</b>
          <i>{status}</i>
        </span>
        <WhatsAppMark size={14} />
      </div>
      <div className="wa-body">{children}</div>
      <div className="wa-input">
        <span>Message</span>
        <i />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   Hero: a conversation that plays itself, with the records it leaves
   floating beside the phone.
   ------------------------------------------------------------------ */

const HERO: Msg[] = [
  {
    kind: "in",
    text: "Hi, how much for a facial? Ada slot esok?",
    time: "11:42 PM",
  },
  {
    kind: "out",
    text: "Hi! Our signature facial is RM168. Esok we have these slots at Bangsar:",
    time: "11:42 PM",
  },
  { kind: "slots", options: ["11:00am", "2:30pm", "6:00pm"], picked: 2 },
  { kind: "in", text: "6pm please", time: "11:43 PM" },
  {
    kind: "out",
    text: "Booked ✓ Tomorrow, 6:00pm at Bangsar. We'll remind you in the morning.",
    time: "11:43 PM",
  },
];

export function WaHero() {
  return (
    <Reveal className="wa-hero-art" threshold={0.2}>
      <div className="wa-stage">
        <Phone status="typically replies instantly">
          {HERO.map((m, i) => (
            <span
              className="wa-line"
              key={i}
              style={{ "--i": i } as React.CSSProperties}
            >
              <Bubble m={m} />
            </span>
          ))}
        </Phone>
        <span className="wa-float f1" aria-hidden="true">
          <i className="wa-ico cal" />
          <span>
            <b>Calendar</b> Tomorrow 6:00pm, Bangsar
          </span>
        </span>
        <span className="wa-float f2" aria-hidden="true">
          <i className="wa-ico crm" />
          <span>
            <b>New lead</b> Facial, booked
          </span>
        </span>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------
   The 24-hour strip: when people message, and when anyone is there.
   ------------------------------------------------------------------ */

/* Hours, as fractions of a day. An illustration of a shape. */
const PINGS = [
  7.6, 8.4, 9.1, 12.4, 12.9, 13.3, 17.8, 18.6, 19.4, 20.2, 21.1, 21.7, 22.4,
  22.9, 23.5, 0.6, 1.2,
];

export function DayRibbon() {
  const open = 10;
  const close = 19;
  return (
    <Reveal className="wa-day" threshold={0.3}>
      <div className="wa-day-track">
        <span
          className="wa-day-open"
          style={{
            left: `${(open / 24) * 100}%`,
            width: `${((close - open) / 24) * 100}%`,
          }}
        >
          <span>Team online</span>
        </span>
        {PINGS.map((h, i) => {
          const out = h < open || h >= close;
          return (
            <span
              className={`wa-ping ${out ? "is-out" : ""}`}
              key={i}
              style={
                { left: `${(h / 24) * 100}%`, "--i": i } as React.CSSProperties
              }
            />
          );
        })}
      </div>
      <div className="wa-day-axis" aria-hidden="true">
        {["12am", "6am", "12pm", "6pm", "12am"].map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
      <div className="wa-day-key">
        <span className="k-in">Answered while someone is there</span>
        <span className="k-out">Waiting until morning</span>
      </div>
      <p className="bf-note">
        An illustration of the shape, not a client&rsquo;s data.
      </p>
    </Reveal>
  );
}

/* ------------------------------------------------------------------
   The story: one enquiry, start to finish, beside a pinned phone.
   ------------------------------------------------------------------ */

export type StoryStep = { time: string; title: string; body: string };

/* Each message carries the step it appears at. The phone shows every
   message up to the active step; the side panels belong to one step. */
const STORY: (Msg & { at: number })[] = [
  {
    kind: "in",
    text: "Hi, berapa harga facial? Ada slot esok?",
    time: "11:42 PM",
    at: 0,
  },
  {
    kind: "out",
    text: "Hai! Facial kami RM168, 60 minit. Ya, esok ada slot.",
    time: "11:42 PM",
    tag: "Flow",
    at: 1,
  },
  { kind: "out", text: "Which branch is easier for you?", tag: "Flow", at: 2 },
  { kind: "slots", options: ["Bangsar", "Puchong"], picked: 0, at: 2 },
  { kind: "out", text: "Bangsar tomorrow:", tag: "Flow", at: 3 },
  { kind: "slots", options: ["11:00am", "2:30pm", "6:00pm"], picked: 2, at: 3 },
  {
    kind: "out",
    text: "Booked ✓ Tomorrow 6:00pm, Bangsar.",
    time: "11:43 PM",
    tag: "Flow",
    at: 3,
  },
  { kind: "note", text: "Next morning, 9:00 AM", at: 5 },
  {
    kind: "out",
    text: "See you at 6pm today! Parking is behind the building, free after 5.",
    tag: "Flow",
    at: 5,
  },
  { kind: "in", text: "I have very sensitive skin, is that ok?", at: 6 },
  {
    kind: "out",
    text: "Good question. Let me get a therapist to answer that properly.",
    tag: "AI",
    at: 6,
  },
  {
    kind: "out",
    text: "Hi, therapist here. Yes, we have a gentle facial for that…",
    tag: "Team",
    at: 6,
  },
];

export function WaStory({ steps }: { steps: StoryStep[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting)
            setActive(Number((e.target as HTMLElement).dataset.i));
        }
      },
      /* A step is active while it crosses the middle band of the screen. */
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const shown = STORY.filter((m) => m.at <= active);

  return (
    <div className="wa-story">
      <ol className="wa-steps">
        {steps.map((s, i) => (
          <li
            className={`wa-step ${i === active ? "is-on" : ""}`}
            key={s.title}
            data-i={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
          >
            <span className="wa-step-time mono">{s.time}</span>
            <h3 className="h3">{s.title}</h3>
            <p className="prose" style={{ marginTop: 8 }}>
              {s.body}
            </p>
            {/* On a phone the pinned column is gone, so each step carries
                its own slice of the conversation. */}
            <div className="wa-step-chat" aria-hidden="true">
              {STORY.filter((m) => m.at === i).map((m, k) => (
                <span className="wa-line" key={k}>
                  <Bubble m={m} />
                </span>
              ))}
              {i === 4 && <Records />}
            </div>
          </li>
        ))}
      </ol>
      <div className="wa-pin">
        <div className="wa-pin-inner">
          <Phone
            status={
              active === 6
                ? "your team is replying"
                : "typically replies instantly"
            }
          >
            {shown.map((m, i) => (
              <span className="wa-line is-live" key={i}>
                <Bubble m={m} />
              </span>
            ))}
          </Phone>
          <div
            className={`wa-side ${active === 4 ? "is-on" : ""}`}
            aria-hidden="true"
          >
            <Records />
          </div>
        </div>
      </div>
    </div>
  );
}

function Records() {
  return (
    <span className="wa-records">
      <span className="wa-rec">
        <i className="wa-ico cal" />
        <span>
          <b>Calendar</b>
          Facial, tomorrow 6:00pm, Bangsar
        </span>
      </span>
      <span className="wa-rec">
        <i className="wa-ico crm" />
        <span>
          <b>CRM</b>
          New contact, stage: Booked
        </span>
      </span>
      <span className="wa-rec">
        <i className="wa-ico sheet" />
        <span>
          <b>Google Sheet</b>
          Row added: source, branch, service
        </span>
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------
   The calculator. The reader's numbers in, the reader's numbers out.
   ------------------------------------------------------------------ */

type Field = {
  key: "leads" | "after" | "lost" | "value";
  label: string;
  hint: string;
  min: number;
  max: number;
  step: number;
  unit?: "%" | "RM";
};

const FIELDS: Field[] = [
  {
    key: "leads",
    label: "WhatsApp enquiries a month",
    hint: "All of them, any time of day.",
    min: 20,
    max: 2000,
    step: 10,
  },
  {
    key: "after",
    label: "Customers who message outside opening hours",
    hint: "Evenings, late nights, Sundays.",
    min: 0,
    max: 80,
    step: 5,
    unit: "%",
  },
  {
    key: "lost",
    label: "Of those, customers who never reply the next day",
    hint: "Your honest guess.",
    min: 0,
    max: 80,
    step: 5,
    unit: "%",
  },
  {
    key: "value",
    label: "What one booking is worth",
    hint: "Average spend per visit.",
    min: 20,
    max: 2000,
    step: 10,
    unit: "RM",
  },
];

const rm = (n: number) => "RM " + Math.round(n).toLocaleString("en-MY");

export function LeakCalc({ cta }: { cta: React.ReactNode }) {
  const [v, setV] = useState({ leads: 300, after: 40, lost: 25, value: 150 });
  const waiting = (v.leads * v.after) / 100;
  const lost = (waiting * v.lost) / 100;
  const month = lost * v.value;

  return (
    <div className="calc">
      <div className="calc-in">
        {FIELDS.map((f) => (
          <label className="calc-field" key={f.key}>
            <span className="calc-top">
              <span className="calc-label">{f.label}</span>
              <span className="calc-val mono">
                {f.unit === "RM"
                  ? rm(v[f.key])
                  : v[f.key].toLocaleString("en-MY")}
                {f.unit === "%" ? "%" : ""}
              </span>
            </span>
            <input
              type="range"
              min={f.min}
              max={f.max}
              step={f.step}
              value={v[f.key]}
              onChange={(e) => setV({ ...v, [f.key]: Number(e.target.value) })}
              style={
                {
                  "--p": `${((v[f.key] - f.min) / (f.max - f.min)) * 100}%`,
                } as React.CSSProperties
              }
            />
            <span className="calc-hint">{f.hint}</span>
          </label>
        ))}
      </div>
      <div className="calc-out" aria-live="polite">
        <div className="calc-row">
          <span>Enquiries waiting overnight</span>
          <b className="mono">{Math.round(waiting).toLocaleString("en-MY")}</b>
        </div>
        <div className="calc-row">
          <span>Bookings lost to a slow reply</span>
          <b className="mono">{Math.round(lost).toLocaleString("en-MY")}</b>
        </div>
        <div className="calc-total">
          <span>Revenue you could win back, every month</span>
          <b>{rm(month)}</b>
          <span className="calc-year mono">{rm(month * 12)} a year</span>
        </div>
        <div className="calc-cta">{cta}</div>
        <p className="calc-note">
          Your numbers and your estimate. We do not have a figure for your
          business, and we will not invent one.
        </p>
      </div>
    </div>
  );
}
