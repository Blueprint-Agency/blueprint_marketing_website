"use client";

import { useState } from "react";
import ServiceArt from "./ServiceArt";
import { Reveal } from "./SeoArt";

/**
 * The interactive pieces of /custom-solutions.
 *
 * WHY NO PROJECTS (user, 2026-10-08)
 * ----------------------------------
 * Clients for custom work stay anonymous, and the user decided against
 * anonymised project cards too: a reader who sees three projects assumes
 * those three are all we do. So the page shows the range instead, sorted
 * by industry, and every module is framed as something we can build, not
 * something we have built. Nothing here may say "we built this for".
 */

/* ------------------------------------------------------------------
   Hero: the tools a business runs on today, pulled into one system.
   ------------------------------------------------------------------ */

const TODAY = [
  { name: "Excel", note: "Leads.xlsx (final v3)" },
  { name: "WhatsApp groups", note: "Branch updates" },
  { name: "A notebook", note: "Follow up Tuesday" },
  { name: "Three apps", note: "None of them talk" },
];

const SYSTEM = ["Leads", "Customers", "Bookings", "Payments", "Reports"];

export function CustomHero() {
  return (
    <Reveal className="cs-hero-art" threshold={0.2}>
      <div className="cs-merge" aria-hidden="true">
        <div className="cs-today">
          <span className="cs-cap">Today</span>
          {TODAY.map((t, i) => (
            <span
              className="cs-tool"
              key={t.name}
              style={{ "--i": i } as React.CSSProperties}
            >
              <b>{t.name}</b>
              <i>{t.note}</i>
            </span>
          ))}
        </div>
        <div className="cs-wires">
          {TODAY.map((t, i) => (
            <span
              className="cs-wire"
              key={t.name}
              style={{ "--i": i } as React.CSSProperties}
            />
          ))}
        </div>
        <div className="cs-system">
          <span className="cs-cap">One system</span>
          <div className="cs-app">
            <div className="cs-app-bar">
              <i />
              <i />
              <i />
              <span>Your business</span>
            </div>
            <div className="cs-app-body">
              <div className="cs-app-nav">
                {SYSTEM.map((s, i) => (
                  <span className={i === 0 ? "is-on" : ""} key={s}>
                    {s}
                  </span>
                ))}
              </div>
              <div className="cs-app-main">
                <span className="cs-kpis">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="cs-rows">
                  <i />
                  <i />
                  <i />
                  <i />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------
   The four kinds of build, each with ServiceArt's own drawing.
   ------------------------------------------------------------------ */

export function BuildArt({ id }: { id: string }) {
  return (
    <Reveal className="jb-art cs-kind-art" threshold={0.3}>
      <ServiceArt id={id} />
    </Reveal>
  );
}

/* ------------------------------------------------------------------
   The industry explorer: a hub for the business, the modules around it,
   and the one selected described underneath.
   ------------------------------------------------------------------ */

export type Module = { name: string; body: string; replaces: string };
export type Industry = {
  id: string;
  label: string;
  hub: string;
  intro: string;
  modules: Module[];
  note?: React.ReactNode;
};

export function IndustryExplorer({ industries }: { industries: Industry[] }) {
  const [ind, setInd] = useState(0);
  const [mod, setMod] = useState(0);
  const cur = industries[ind];
  const m = cur.modules[mod];

  return (
    <div className="ix">
      <div className="ix-tabs" role="tablist" aria-label="Industries">
        {industries.map((x, i) => (
          <button
            key={x.id}
            role="tab"
            type="button"
            id={`ix-tab-${x.id}`}
            aria-selected={i === ind}
            aria-controls="ix-panel"
            className={i === ind ? "is-on" : ""}
            onClick={() => {
              setInd(i);
              setMod(0);
            }}
          >
            {x.label}
          </button>
        ))}
      </div>

      <div
        className="ix-panel"
        id="ix-panel"
        role="tabpanel"
        aria-labelledby={`ix-tab-${cur.id}`}
        key={cur.id}
      >
        <p className="ix-intro">{cur.intro}</p>

        <div className="ix-map">
          <span className="ix-hub">
            <i>Your</i>
            {cur.hub}
          </span>
          <div className="ix-mods">
            {cur.modules.map((x, i) => (
              <button
                key={x.name}
                type="button"
                className={`ix-mod ${i === mod ? "is-on" : ""}`}
                aria-pressed={i === mod}
                onClick={() => setMod(i)}
                style={{ "--i": i } as React.CSSProperties}
              >
                <span className="ix-mod-n mono">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {x.name}
              </button>
            ))}
          </div>
        </div>

        <div className="ix-detail" aria-live="polite" key={m.name}>
          <h3 className="h3">{m.name}</h3>
          <p className="prose">{m.body}</p>
          <span className="ix-replaces">
            <b>Replaces</b> {m.replaces}
          </span>
        </div>

        {cur.note && <p className="ix-note">{cur.note}</p>}
      </div>
    </div>
  );
}
