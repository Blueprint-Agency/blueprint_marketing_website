"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import Thread from "./Thread";
import {
  EMPTY_ANSWERS,
  QUESTIONS,
  diagnose,
  labelFor,
  type Answers,
  type Question,
} from "@/lib/diagnostic";

/**
 * The diagnostic. Seven questions, then a reading and a pre-written WhatsApp
 * message. See lib/diagnostic.ts for why it is shaped this way.
 *
 * HOW IT IS BUILT
 * ---------------
 * - Choices are real <input type="radio"> and <input type="checkbox"> inside
 *   a <fieldset>/<legend>, visually replaced by the card. That buys arrow-key
 *   navigation, the group announcement, and the "3 of 7" relationship for
 *   free, and correctly for every screen reader, none of which a div with
 *   role="radio" gets right without a lot of code that can rot.
 *
 * - Single-select steps advance themselves after a short beat, so the whole
 *   thing is closer to seven taps than fourteen. The beat exists so the
 *   selection is visibly registered before the panel changes; without it the
 *   tap feels like it went somewhere else.
 *
 * - Nothing is submitted anywhere. The completed questionnaire leaves as a
 *   WhatsApp message she sends herself, which is the site's only conversion
 *   path and the one thing this business is certain to read.
 */

/** Long enough to see the card select, short enough not to feel like a wait. */
const ADVANCE_MS = 260;

export default function Diagnostic() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(EMPTY_ANSWERS);
  const [business, setBusiness] = useState("");
  /* Suppresses the panel slide on the very first paint, so the section does
     not animate itself into view before anyone has touched it. */
  const [moved, setMoved] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  /* Arrow keys move selection between native radios, which fires change on
     every option passed through. Auto-advancing on that would rip the panel
     away from a keyboard user on their first arrow press, so the beat is
     armed by pointers only and the Next button carries the keyboard. */
  const arrowing = useRef(false);

  const total = QUESTIONS.length;
  const done = step >= total;

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const go = useCallback(
    (next: number) => {
      if (timer.current) clearTimeout(timer.current);
      setMoved(true);
      setStep(Math.max(0, Math.min(next, total)));
    },
    [total],
  );

  const pick = useCallback(
    (q: Question, value: string) => {
      setMoved(true);
      if (q.multi) {
        setAnswers((prev) => {
          const cur = prev[q.id] as string[];
          const exclusive = q.choices.find((c) => c.exclusive)?.value;
          if (value === exclusive) {
            return { ...prev, [q.id]: cur.includes(value) ? [] : [value] };
          }
          const kept = cur.filter((v) => v !== exclusive);
          if (kept.includes(value)) {
            return { ...prev, [q.id]: kept.filter((v) => v !== value) };
          }
          /* At the cap, an unselected option is already disabled in the UI.
             This is the second lock, so a stray programmatic call cannot put
             the answer over the limit the copy promised. */
          if (q.max && kept.length >= q.max) return prev;
          return { ...prev, [q.id]: [...kept, value] };
        });
        return;
      }

      setAnswers((prev) => ({ ...prev, [q.id]: value }));
      if (timer.current) clearTimeout(timer.current);
      if (arrowing.current) return;
      timer.current = setTimeout(
        () => setStep((s) => Math.min(s + 1, total)),
        ADVANCE_MS,
      );
    },
    [total],
  );

  const restart = () => {
    if (timer.current) clearTimeout(timer.current);
    setAnswers(EMPTY_ANSWERS);
    setBusiness("");
    setMoved(true);
    setStep(0);
  };

  const result = useMemo(
    () => (done ? diagnose(answers, business) : null),
    [done, answers, business],
  );

  const q = done ? null : QUESTIONS[step];
  const raw = q ? answers[q.id] : "";
  const chosen = Array.isArray(raw) ? raw : raw ? [raw] : [];
  const answered = chosen.length > 0;
  const pct = (Math.min(step, total) / total) * 100;

  return (
    <div className="dq">
      {/* ---------- progress ---------- */}
      <div className="dq-prog">
        <ol className="dq-rail">
          {QUESTIONS.map((item, i) => {
            const state = i < step ? " is-done" : i === step ? " is-now" : "";
            return (
              <li className={`dq-rail-item${state}`} key={item.id}>
                <button
                  type="button"
                  className="dq-rail-btn"
                  /* Backwards only. Jumping ahead to a question whose answer
                     changes the ones before it is how a wizard gets into a
                     state nobody can explain. */
                  disabled={i > step}
                  onClick={() => go(i)}
                >
                  <span className="dq-rail-dot" aria-hidden="true" />
                  <span className="dq-rail-word">{item.short}</span>
                  <span className="dq-sr">
                    {i < step ? "answered, go back to" : "current"} question{" "}
                    {i + 1}: {item.question}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
        <div className="dq-bar" aria-hidden="true">
          <span
            className="dq-bar-fill"
            style={{ transform: `scaleX(${pct / 100})` }}
          />
        </div>
        {/* The panel is swapped, not focused, so this is the only thing that
            tells a screen-reader user the question changed under them. It
            carries the new question text as well as the count. */}
        <p className="small dq-count" aria-live="polite">
          {done
            ? `All ${total} answered. Here is your reading`
            : `Question ${step + 1} of ${total}`}
          {q && <span className="dq-sr">: {q.question}</span>}
        </p>
      </div>

      {/* ---------- the card ---------- */}
      <div className="dq-card">
        <div
          className={`dq-panel${moved ? " is-moving" : ""}`}
          key={done ? "result" : step}
        >
          {q ? (
            <fieldset className="dq-set">
              <legend className="dq-q">{q.question}</legend>
              {q.help && <p className="small dq-help">{q.help}</p>}

              <div
                className="dq-choices"
                onPointerDown={() => {
                  arrowing.current = false;
                }}
                onKeyDown={(e) => {
                  if (e.key.startsWith("Arrow")) arrowing.current = true;
                }}
              >
                {q.choices.map((c) => {
                  const on = chosen.includes(c.value);
                  /* At the cap, the options she has not taken go quiet rather
                     than swallowing the tap silently. The exclusive option is
                     never locked — it clears the others by definition. */
                  const locked = Boolean(
                    q.max && !on && !c.exclusive && chosen.length >= q.max,
                  );
                  return (
                    <label
                      className={`dq-choice${on ? " is-on" : ""}${
                        locked ? " is-locked" : ""
                      }`}
                      key={c.value}
                    >
                      <input
                        className="dq-input"
                        type={q.multi ? "checkbox" : "radio"}
                        name={q.id}
                        value={c.value}
                        checked={on}
                        disabled={locked}
                        onChange={() => pick(q, c.value)}
                      />
                      <span className="dq-tick" aria-hidden="true" />
                      <span className="dq-choice-copy">
                        <span className="dq-choice-label">{c.label}</span>
                        {c.note && (
                          <span className="dq-choice-note">{c.note}</span>
                        )}
                      </span>
                    </label>
                  );
                })}
              </div>

              {q.multi && (
                <p className="small dq-multi-note" aria-live="polite">
                  {q.max ? (
                    <>
                      <strong className="dq-tally">
                        {chosen.length} of {q.max} chosen
                      </strong>
                      {chosen.length >= q.max
                        ? ". Untick one to swap it for another."
                        : ". Pick the ones that cost you the most."}
                    </>
                  ) : (
                    "Pick as many as apply. What is missing tells us more than what is there."
                  )}
                </p>
              )}
            </fieldset>
          ) : (
            result && (
              <div className="dq-result">
                {/* Verdict, then ONE paragraph, then the prescription. The
                    supporting detail is real and she may want it, but making
                    her read seven paragraphs to reach the advice buries the
                    only part of this page she came for. It moves below. */}
                <p className="small dq-eyebrow">Your reading</p>
                <h3 className="h2 dq-verdict">{result.verdict}</h3>
                <p className="prose dq-read">{result.readings[0]}</p>
                {result.compound && (
                  <p className="prose dq-read">{result.compound}</p>
                )}

                {/* The prescription. Three ordered moves rather than a list,
                    because the order is the actual advice: widening a channel
                    that feeds a leaking bucket loses more, not less. */}
                <p className="small dq-answers-label">
                  What we would do, in this order
                </p>
                <ol className="dq-moves">
                  {result.moves.map((m, i) => (
                    <li className={`dq-move is-${m.kind}`} key={m.kind}>
                      <span className="dq-move-rail" aria-hidden="true">
                        <span className="mono dq-move-n">{i + 1}</span>
                      </span>
                      <div className="dq-move-copy">
                        <h4 className="dq-move-head">
                          {m.head}
                          {m.service && (
                            <span className="dq-move-svc">{m.service.name}</span>
                          )}
                        </h4>
                        <p className="prose dq-move-body">{m.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>

                <p className="small dq-answers-label">
                  What we would build against it
                </p>
                <ol className="dq-recs">
                  {result.services.map((s, i) => (
                    <li className="dq-rec" key={s.id}>
                      <span className="mono dq-rec-n" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="dq-rec-copy">
                        <span className="dq-rec-name">
                          {s.name}
                          {i === 0 && (
                            <span className="dq-rec-flag">Start here</span>
                          )}
                        </span>
                        <span className="dq-rec-tag">{s.tagline}</span>
                      </span>
                    </li>
                  ))}
                </ol>

                {/* Everything else she told us, after the payoff rather than
                    in front of it. Depth for the reader who wants it, skipped
                    without loss by the one who does not. */}
                {(result.readings.length > 1 ||
                  result.branch ||
                  result.team ||
                  result.urgency) && (
                  <details className="dq-more">
                    <summary>
                      <span>What else your answers tell us</span>
                      <span className="dq-more-mark" aria-hidden="true" />
                    </summary>
                    <div className="dq-more-body">
                      {result.readings.slice(1).map((r) => (
                        <p className="prose dq-read" key={r}>
                          {r}
                        </p>
                      ))}
                      {result.branch && (
                        <p className="prose dq-read">{result.branch}</p>
                      )}
                      {result.team && (
                        <p className="prose dq-read">{result.team}</p>
                      )}
                      {result.urgency && (
                        <p className="prose dq-read">{result.urgency}</p>
                      )}
                    </div>
                  </details>
                )}

                {/* The one authored moment on the page, now earned rather
                    than asserted: it only appears for the readers whose own
                    answers put reply speed at the top. */}
                {result.services.some((s) => s.id === "whatsapp") && (
                  <div className="dq-thread">
                    <Thread />
                  </div>
                )}

                <div className="dq-send">
                  <label className="dq-field">
                    <span className="small dq-field-label">
                      Business name or website{" "}
                      <span className="dq-optional">optional</span>
                    </span>
                    <input
                      className="dq-text"
                      type="text"
                      value={business}
                      onChange={(e) => setBusiness(e.target.value)}
                      placeholder="So we can look before we reply"
                      autoComplete="organization"
                    />
                  </label>

                  <p className="small dq-send-note">
                    Your answers are written into the message. Nothing is sent
                    until you press send in WhatsApp.
                  </p>

                  <div className="cta-row dq-cta">
                    <a
                      className="btn btn-act"
                      href={result.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {result.cta}
                    </a>
                    <button
                      type="button"
                      className="btn btn-line"
                      onClick={restart}
                    >
                      <RotateCcw size={16} strokeWidth={2.2} />
                      Start over
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        {!done && (
          <div className="dq-foot">
            <button
              type="button"
              className="btn btn-line btn-sm"
              onClick={() => go(step - 1)}
              disabled={step === 0}
            >
              <ArrowLeft size={16} strokeWidth={2.2} />
              Back
            </button>
            <button
              type="button"
              className="btn btn-act btn-sm"
              onClick={() => go(step + 1)}
              disabled={!answered}
            >
              {step === total - 1 ? "See my reading" : "Next"}
              <ArrowRight size={16} strokeWidth={2.2} />
            </button>
          </div>
        )}
      </div>

      {/* ---------- what she has said so far ---------- */}
      {step > 0 && (
        <div className="dq-chips">
          <span className="small dq-chips-label">Your answers</span>
          {QUESTIONS.slice(0, done ? total : step).map((item, i) => {
            const v = answers[item.id];
            const text = Array.isArray(v)
              ? v.map((x) => labelFor(item.id, x)).join(", ")
              : labelFor(item.id, v);
            if (!text) return null;
            return (
              <button
                type="button"
                className="dq-chip"
                key={item.id}
                onClick={() => go(i)}
              >
                <span className="dq-chip-k">{item.short}</span>
                <span className="dq-chip-v">{text}</span>
                <span className="dq-sr">, change this answer</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
