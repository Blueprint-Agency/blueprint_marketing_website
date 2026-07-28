"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------
   THE GATE

   Two rule-worlds and a seam. Above: the lane — everyone already
   walking past, every one of them a search, a scroll, a drive-by.
   Below: the stall — lit, staffed, with a docket. Crossing the seam
   rewrites a passer-by into a booking, stamped with where they came from.

   The ones who do not cross keep walking. That gap is the whole product.
   ------------------------------------------------------------------ */

type Source = "Google" | "Meta" | "Maps" | "Walk-by" | "Referral";

const SOURCES: Source[] = ["Google", "Meta", "Maps", "Walk-by", "Referral"];

type Walker = {
  id: number;
  x: number; // 0 → 108 (%), lane position
  lane: 0 | 1 | 2; // depth row, so the crowd is not a single file
  source: Source;
  /** decided at the seam; null until then */
  fate: "crossing" | "passing" | null;
};

type Docket = {
  id: number;
  time: string;
  source: Source;
};

const GATE_AT = 50; // % across, where the seam sits

/** Deterministic seed so server and client first paint agree. */
const SEED: Walker[] = Array.from({ length: 9 }, (_, i) => ({
  id: i,
  x: (i * 12.5) % 108,
  lane: (i % 3) as 0 | 1 | 2,
  source: SOURCES[i % SOURCES.length],
  fate: null,
}));

const SEED_DOCKET: Docket[] = [
  { id: -3, time: "6:20pm", source: "Google" },
  { id: -2, time: "7:05pm", source: "Meta" },
  { id: -1, time: "8:40pm", source: "Maps" },
];

function clockFrom(minutes: number): string {
  const total = 12 * 60 + minutes;
  const h24 = Math.floor(total / 60) % 24;
  const m = total % 60;
  const suffix = h24 >= 12 ? "pm" : "am";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(m).padStart(2, "0")}${suffix}`;
}

export default function Gate() {
  const [walkers, setWalkers] = useState<Walker[]>(SEED);
  const [docket, setDocket] = useState<Docket[]>(SEED_DOCKET);
  const [missed, setMissed] = useState(0);

  /** The two laws the visitor can change. Both start on. */
  const [laneFull, setLaneFull] = useState(true); // are we bringing people past?
  const [counterOn, setCounterOn] = useState(true); // is anyone answering?

  const [reduced, setReduced] = useState(false);
  const [mounted, setMounted] = useState(false);

  const nextId = useRef(100);
  const clock = useRef(380);
  const raf = useRef<number | null>(null);
  const last = useRef<number>(0);

  const lawsRef = useRef({ laneFull, counterOn });
  lawsRef.current = { laneFull, counterOn };

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const admit = useCallback((source: Source) => {
    clock.current += 7 + Math.floor(Math.random() * 26);
    const entry: Docket = {
      id: nextId.current++,
      time: clockFrom(clock.current),
      source,
    };
    setDocket((d) => [...d.slice(-7), entry]);
  }, []);

  /* The lane runs. Walkers meet the seam and are sorted by the laws. */
  useEffect(() => {
    if (!mounted || reduced) return;

    const tick = (t: number) => {
      const dt = last.current ? Math.min((t - last.current) / 1000, 0.05) : 0;
      last.current = t;

      setWalkers((prev) =>
        prev.map((w) => {
          const speed = 5.4;
          let x = w.x + speed * dt;
          let fate = w.fate;

          // At the seam, decide — once.
          if (fate === null && w.x < GATE_AT && x >= GATE_AT) {
            const { laneFull, counterOn } = lawsRef.current;
            // Walk-by traffic exists regardless of ad spend; the rest is bought.
            const inLane = laneFull || w.source === "Walk-by";
            const willCross = inLane && counterOn;
            fate = willCross ? "crossing" : "passing";
            if (willCross) admit(w.source);
            else setMissed((m) => m + 1);
          }

          if (x > 108) {
            x = -8;
            fate = null;
          }
          return { ...w, x, fate };
        }),
      );

      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      last.current = 0;
    };
  }, [mounted, reduced, admit]);

  /** Tapping a walker pushes them through by hand. */
  const push = (w: Walker) => {
    if (w.fate === "crossing") return;
    setWalkers((prev) =>
      prev.map((p) => (p.id === w.id ? { ...p, fate: "crossing" } : p)),
    );
    admit(w.source);
  };

  const crossing = walkers.filter((w) => w.fate === "crossing").length;

  return (
    <div className="relative">
      {/* ============ THE LANE ============ */}
      <div
        className="relative h-40 overflow-hidden border-b-2 border-plum-edge/60 sm:h-48"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(107,47,138,0.28))]" />

        {/* the far side of the lane: other stalls, shuttered and dim */}
        <div className="shutter absolute inset-x-0 top-0 h-14 opacity-70" />

        {walkers.map((w) => (
          <button
            key={w.id}
            type="button"
            tabIndex={-1}
            onClick={() => push(w)}
            className="absolute cursor-pointer border-0 bg-transparent p-0 transition-[opacity,transform] duration-500"
            style={{
              left: `${w.x}%`,
              bottom: `${10 + w.lane * 22}px`,
              opacity: w.fate === "crossing" ? 0 : 0.35 + w.lane * 0.2,
              transform:
                w.fate === "crossing"
                  ? "translateY(46px) scale(0.7)"
                  : "translateY(0) scale(1)",
            }}
          >
            <Figure dim={w.fate !== "crossing"} />
          </button>
        ))}
      </div>

      {/* ============ THE SEAM ============ */}
      <div className="relative">
        <div className="flex items-stretch">
          <div className="h-1.5 flex-1 bg-plum-edge/50" />
          <div className="relative -mt-3 px-3">
            <div className="chop border-tungsten bg-night px-3 py-1 text-xs font-black tracking-[0.18em] text-tungsten uppercase">
              the gate
            </div>
          </div>
          <div className="h-1.5 flex-1 bg-plum-edge/50" />
        </div>
      </div>

      {/* ============ THE STALL ============ */}
      <div className="relative">
        {/* awning */}
        <div className="tarp tarp-scallop h-7 w-full" />

        {/* string lights along the awning edge */}
        <div className="flex justify-between px-4 -mt-1" aria-hidden="true">
          {Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-1.5 ${counterOn ? "bulb animate-flicker" : "bulb-dim"}`}
              style={{ animationDelay: `${i * 0.7}s` }}
            />
          ))}
        </div>

        {/* the counter — the brightest surface on the page, because it is
            the lit thing in a dark lane */}
        <div className="tube h-2 w-full" aria-hidden="true" />
        <div className="counter-lit px-4 pt-5 pb-5 sm:px-6">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            {/* h2, not h3 — this is the first heading after the page h1 and
                must not skip a level. */}
            <h2 className="shout text-lg text-fluoro sm:text-xl">
              Tonight&rsquo;s bookings
            </h2>
            {/* This component's whole risk is being mistaken for real client
                data, so the disclaimer is a stamped label, not fine print. */}
            <p className="chop border-card-pink px-2 py-1 text-xs font-bold text-card-pink">
              Example, not real client data
            </p>
          </div>

          <ul className="grid gap-1.5 sm:grid-cols-2">
            {docket.length === 0 && (
              <li className="price-card col-span-full rotate-[-0.4deg] px-3 py-4 text-center text-sm">
                Nobody crossed. They all kept walking.
              </li>
            )}
            {docket.map((d, i) => (
              <li
                key={d.id}
                className="price-card animate-land flex items-center justify-between px-3 py-2 text-sm"
                style={{
                  transform: `rotate(${i % 2 === 0 ? "-0.5" : "0.6"}deg)`,
                }}
              >
                <span className="marker tabular text-base">{d.time}</span>
                <span className="rounded-sm bg-ink px-1.5 py-0.5 text-xs font-bold tracking-wider text-card-stock uppercase">
                  {d.source}
                </span>
              </li>
            ))}
          </ul>

          {/* the laws */}
          <div className="mt-5 flex flex-col gap-3 border-t-2 border-plum-edge/40 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              <Law
                on={laneFull}
                onToggle={() => setLaneFull((v) => !v)}
                onLabel="We're filling the lane"
                offLabel="No one's bringing people past"
              />
              <Law
                on={counterOn}
                onToggle={() => setCounterOn((v) => !v)}
                onLabel="Someone's at the counter"
                offLabel="Nobody's answering"
              />
            </div>
            <p
              className="text-xs text-tarp-pale/70 tabular"
              role="status"
              aria-live="polite"
            >
              {missed > 0 ? (
                <>
                  <span className="marker text-card-pink text-base">
                    {missed}
                  </span>{" "}
                  walked past while you watched
                </>
              ) : (
                <>Turn one off and watch what happens.</>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Screen readers get the argument in words, not a simulation. */}
      <p className="sr-only">
        An interactive illustration: people pass your business every day
        through search, social media and maps. When marketing brings them
        past and someone is there to answer, they become bookings. When
        either one is missing, they keep walking. Currently{" "}
        {crossing > 0 ? "people are crossing" : "no one is crossing"}, and{" "}
        {missed} have walked past.
      </p>
    </div>
  );
}

function Law({
  on,
  onToggle,
  onLabel,
  offLabel,
}: {
  on: boolean;
  onToggle: () => void;
  onLabel: string;
  offLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={on}
      className={`chop px-3 py-1.5 text-xs font-bold transition-colors ${
        on
          ? "border-chop text-chop"
          : "border-card-pink text-card-pink line-through decoration-2"
      }`}
    >
      {on ? onLabel : offLabel}
    </button>
  );
}

/** A person in the lane. Drawn, not photographed — no stock, no filler. */
function Figure({ dim }: { dim: boolean }) {
  return (
    <svg
      width="14"
      height="30"
      viewBox="0 0 14 30"
      fill="none"
      className={dim ? "text-tarp-pale" : "text-tungsten-hot"}
    >
      <circle cx="7" cy="4" r="3.4" fill="currentColor" />
      <path
        d="M7 8.5c-2.6 0-4.2 1.7-4.2 4.3v6.4h1.9l.5 10.3h3.6l.5-10.3h1.9v-6.4c0-2.6-1.6-4.3-4.2-4.3Z"
        fill="currentColor"
      />
    </svg>
  );
}
