/**
 * Qualification illustrations — UI mockups, not icons.
 *
 * Built as real HTML/CSS rather than SVG or raster art, because these are
 * pictures of interfaces: they need actual type in the site's own face, at
 * small sizes, staying crisp at any density. A screenshot would go blurry
 * and would need re-shooting for every copy change; this does not.
 *
 * Each one depicts the specific failure named beside it, using the labels
 * an owner would actually see — campaign names, ROAS, read receipts, search
 * positions, notification counts.
 *
 * TWO DELIBERATE CONSTRAINTS
 * --------------------------
 * 1. Every figure shown is invented. These are illustrations of a PROBLEM,
 *    not reports of anything Blueprint measured, so no number here implies
 *    a result. The whole block is aria-hidden: the statement beside it
 *    carries the meaning, and a screen reader should not have to wade
 *    through fake interface text to reach it.
 *
 * 2. Platform marks are simplified glyphs drawn here, used nominatively to
 *    say which platforms the work happens on. No partner or certification
 *    badge appears anywhere — PRODUCT.md records none, and Meta/Google
 *    partner badges are claims with eligibility rules attached. If real
 *    brand assets are wanted later, take them from each platform's own
 *    brand resource page and follow its guidelines.
 */

/* --- simplified platform glyphs, drawn, used nominatively --- */

function GoogleAdsMark() {
  return (
    <span className="m-mark" style={{ background: "#fff" }}>
      <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
        <rect x="2" y="14" width="7" height="8" rx="2" fill="#34a853" />
        <rect x="9" y="8" width="6" height="14" rx="2" fill="#fbbc04" />
        <rect x="15" y="3" width="7" height="19" rx="2" fill="#4285f4" />
      </svg>
    </span>
  );
}

function MetaMark() {
  return (
    <span className="m-mark" style={{ background: "#fff" }}>
      <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
        <path
          d="M3 15c0-5 2.5-8 5-8s4 3 5.5 5.5S17 17 19 17s2-2 2-4-1-5-3-5"
          fill="none"
          stroke="#0866ff"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

function WaMark() {
  return (
    <span className="m-mark" style={{ background: "#25d366" }}>
      <svg viewBox="0 0 24 24" width="11" height="11" aria-hidden="true">
        <path
          d="M7 10c1 3 4 6 7 7l2-2 3 1.5v3c-6 1-13-6-12-12h3L12 11l-2 1"
          fill="#fff"
        />
      </svg>
    </span>
  );
}

function Tile({
  i,
  children,
  pill,
}: {
  i: number;
  children: React.ReactNode;
  pill: string;
}) {
  return (
    <div className={`m-tile m-tile-${i}`} aria-hidden="true">
      <div className="m-ui">{children}</div>
      <span className="m-pill">{pill}</span>
    </div>
  );
}

/* 01 — Money going out, nothing telling you which part came back. */
function ArtSpend() {
  return (
    <Tile i={0} pill="Which one made the money?">
      <div className="m-head">
        <span className="m-title">Campaigns</span>
        <span className="m-sub">Last 30 days</span>
      </div>
      <div className="m-rows">
        {[
          ["Search: Brand", "RM 4,200", <GoogleAdsMark key="a" />],
          ["Retargeting", "RM 2,850", <MetaMark key="b" />],
          ["Performance Max", "RM 1,940", <GoogleAdsMark key="c" />],
        ].map(([name, spend, mark], n) => (
          <div className="m-row" key={String(name)}>
            {mark as React.ReactNode}
            <span className="m-name">{name as string}</span>
            <span className="m-val">{spend as string}</span>
            <span className={`m-roas ${n === 1 ? "is-lit" : ""}`}>?</span>
          </div>
        ))}
      </div>
      <div className="m-chips">
        <span className="m-chip">ROAS ?</span>
        <span className="m-chip">CPL ?</span>
        <span className="m-chip">LTV ?</span>
      </div>
    </Tile>
  );
}

/* 02 — The enquiry that arrived and then died of silence. */
function ArtQuiet() {
  return (
    <Tile i={1} pill="No reply sent">
      <div className="m-head">
        <WaMark />
        <span className="m-title">New enquiry</span>
        <span className="m-sub m-right">9:41 PM</span>
      </div>
      <div className="m-chat">
        <span className="m-bub m-in">
          Hi, do you have any slots this week?
        </span>
        <span className="m-gap">3 days later</span>
        <span className="m-bub m-in m-faded">
          Hello? Still open?
        </span>
      </div>
      <div className="m-foot">
        <span className="m-seen">Seen ✓✓</span>
        <span className="m-muted">Not replied</span>
      </div>
    </Tile>
  );
}

/* 03 — Everyone else on page one, you further down. */
function ArtRank() {
  return (
    <Tile i={2} pill="You're on page 2">
      <div className="m-search">
        <span className="m-mag" />
        <span className="m-query">aesthetic clinic bangsar</span>
      </div>
      <div className="m-serp">
        {["clinic-one.com.my", "clinic-two.com.my", "clinic-three.com"].map(
          (d, n) => (
            <div className="m-hit" key={d}>
              <span className="m-pos">{n + 1}</span>
              <span>
                <span className="m-url">{d}</span>
                <span className="m-line" />
              </span>
            </div>
          ),
        )}
        <div className="m-hit is-you">
          <span className="m-pos">14</span>
          <span>
            <span className="m-url">your-clinic.com.my</span>
            <span className="m-line" />
          </span>
        </div>
      </div>
    </Tile>
  );
}

/* 04 — The follow-up is a person, and the person is you, at midnight. */
function ArtNight() {
  return (
    <Tile i={3} pill="Still you, at 11:47pm">
      <div className="m-phone">
        <div className="m-clock">
          <span className="m-time">11:47</span>
          <span className="m-day">Tuesday</span>
        </div>
        <div className="m-notes">
          <div className="m-note">
            <WaMark />
            <span className="m-name">WhatsApp</span>
            <span className="m-badge">9</span>
          </div>
          <div className="m-note">
            <span className="m-mark" style={{ background: "#e9e9ee" }} />
            <span className="m-name">Missed call</span>
            <span className="m-badge">2</span>
          </div>
          <div className="m-note m-faded">
            <MetaMark />
            <span className="m-name">Instagram DM</span>
            <span className="m-badge">4</span>
          </div>
        </div>
      </div>
    </Tile>
  );
}

/* 05 — A report tells you what happened. A system changes what happens. */
function ArtSystem() {
  return (
    <Tile i={4} pill="A report is not a system">
      <div className="m-split">
        <div className="m-doc">
          <span className="m-doc-name">Report_Oct.pdf</span>
          <span className="m-line" />
          <span className="m-line" />
          <span className="m-line m-short" />
          <span className="m-bars">
            <i style={{ height: "40%" }} />
            <i style={{ height: "66%" }} />
            <i style={{ height: "30%" }} />
            <i style={{ height: "80%" }} />
          </span>
        </div>
        <div className="m-flow">
          {["Ad", "Lead", "Booking", "Reminder"].map((s, n) => (
            <span className="m-node" key={s}>
              <i className={n === 0 ? "is-lit" : ""} />
              {s}
            </span>
          ))}
        </div>
      </div>
    </Tile>
  );
}

const ART = [ArtSpend, ArtQuiet, ArtRank, ArtNight, ArtSystem];

export default function QualArt({ i }: { i: number }) {
  const Art = ART[i % ART.length];
  return <Art />;
}
