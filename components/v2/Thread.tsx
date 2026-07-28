"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The one authored moment on the page.
 *
 * Two WhatsApp threads run from the same enquiry, side by side. The right
 * one finishes while the left one is still waiting — that gap IS the
 * argument, and it plays out in the actual channel this buyer converts in
 * rather than in a metaphor for it.
 *
 * Everything here is clearly labelled as an illustration. PRODUCT.md
 * forbids inventing customers or outcomes; this invents neither. It
 * demonstrates a capability Blueprint is recorded as having (WhatsApp
 * automation and booking) without claiming a specific result.
 */

type Item =
  | { kind: "in" | "out"; at: number; text: string; time: string }
  | { kind: "gap"; at: number; text: string }
  | { kind: "typing"; at: number; until: number };

const SLOW: Item[] = [
  {
    kind: "in",
    at: 0,
    text: "Hi, do you still have Rejuran slots this week?",
    time: "9:41 PM",
  },
  { kind: "gap", at: 1000, text: "Closed. Nobody is at the desk." },
  { kind: "gap", at: 3600, text: "11 hours later" },
  {
    kind: "out",
    at: 4400,
    text: "Hi! So sorry for the slow reply 🙏 Yes, we still have slots...",
    time: "8:52 AM",
  },
  {
    kind: "in",
    at: 5500,
    text: "It's ok, I already booked somewhere else.",
    time: "9:15 AM",
  },
];

const FAST: Item[] = [
  {
    kind: "in",
    at: 0,
    text: "Hi, do you still have Rejuran slots this week?",
    time: "9:41 PM",
  },
  { kind: "typing", at: 700, until: 1500 },
  {
    kind: "out",
    at: 1500,
    text: "Hi! Yes, Rejuran this week: Thu 3:00pm, Fri 11:30am, Sat 2:00pm. Which one suits you?",
    time: "9:41 PM",
  },
  { kind: "in", at: 2700, text: "Friday 11:30 please", time: "9:43 PM" },
  { kind: "typing", at: 3100, until: 3800 },
  {
    kind: "out",
    at: 3800,
    text: "Booked ✓ Friday 11:30am, Bangsar. You'll get a reminder the day before.",
    time: "9:43 PM",
  },
];

const SLOW_VERDICT = 6300;
const FAST_VERDICT = 4600;
const RUNTIME = 7200;
const TICK = 100;

function Panel({
  title, sub, items, t, verdictAt, verdict, tone,
}: {
  title: string;
  sub: string;
  items: Item[];
  t: number;
  verdictAt: number;
  verdict: string;
  tone: "bad" | "good";
}) {
  return (
    <div className="thread">
      <div className="thread-head">
        <div>
          <div style={{ fontWeight: 700, fontSize: "0.9375rem" }}>{title}</div>
          <div className="small" style={{ marginTop: 1 }}>{sub}</div>
        </div>
      </div>

      <div className="thread-body">
        {items.map((item, i) => {
          if (t < item.at) return null;

          if (item.kind === "typing") {
            if (t >= item.until) return null;
            // Purely a pacing device. Hidden from assistive tech so a
            // screen reader is not told "typing" three times while the
            // transcript it actually needs is arriving around it.
            return (
              <div
                key={i}
                className="msg msg-out arrive"
                style={{ padding: 0 }}
                aria-hidden="true"
              >
                <span className="typing">
                  <i /><i /><i />
                </span>
              </div>
            );
          }

          if (item.kind === "gap") {
            return (
              <div key={i} className="msg-gap arrive">
                {item.text}
              </div>
            );
          }

          return (
            <div
              key={i}
              className={`msg arrive ${item.kind === "in" ? "msg-in" : "msg-out"}`}
            >
              {item.text}
              <span className="msg-time">{item.time}</span>
            </div>
          );
        })}
      </div>

      {t >= verdictAt && (
        <div className={`verdict verdict-${tone}`}>{verdict}</div>
      )}
    </div>
  );
}

export default function Thread() {
  /**
   * Starts FINISHED, not empty. The server renders both conversations in
   * full, so a visitor with no JS, a failed hydration, or an observer that
   * never fires still reads the entire argument — the panels are never two
   * blank boxes. The animation is an enhancement layered on top: once we
   * know JS is running and motion is allowed, we rewind and let it play.
   */
  const [t, setT] = useState(RUNTIME);
  const [running, setRunning] = useState(false);
  const hostRef = useRef<HTMLDivElement>(null);
  const played = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      // Stays at RUNTIME: a deliberate still showing the finished exchange.
      played.current = true;
      return;
    }

    const host = hostRef.current;
    if (!host) return;

    // JS is alive and motion is welcome, so rewind to the top of the
    // timeline and wait for the section to come into view.
    setT(0);

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !played.current) {
            played.current = true;
            setT(0);
            setRunning(true);
          }
        }
      },
      { threshold: 0.35 },
    );
    io.observe(host);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setT((prev) => {
        const next = prev + TICK;
        if (next >= RUNTIME) {
          clearInterval(id);
          setRunning(false);
          return RUNTIME;
        }
        return next;
      });
    }, TICK);
    return () => clearInterval(id);
  }, [running]);

  return (
    <div ref={hostRef}>
      <div
        style={{
          display: "grid",
          gap: 20,
          gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
        }}
      >
        <Panel
          title="No system behind it"
          sub="The enquiry waits for someone to be free"
          items={SLOW}
          t={t}
          verdictAt={SLOW_VERDICT}
          verdict="Enquiry lost."
          tone="bad"
        />
        <Panel
          title="Blueprint's system behind it"
          sub="Answers instantly, offers real slots, books"
          items={FAST}
          t={t}
          verdictAt={FAST_VERDICT}
          verdict="Booked in two minutes, while the clinic was closed."
          tone="good"
        />
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          marginTop: 16,
        }}
      >
        <p className="small" style={{ maxWidth: "62ch" }}>
          An illustration of the WhatsApp automation Blueprint builds. Not a
          real customer conversation, and not a claimed result.
        </p>
        <button
          type="button"
          className="btn btn-line"
          style={{ padding: "9px 15px", fontSize: "0.875rem" }}
          onClick={() => {
            setT(0);
            setRunning(true);
          }}
        >
          Play again
        </button>
      </div>
    </div>
  );
}
