/**
 * Service illustrations — one per service, showing the actual surface the
 * work happens on: the Ads Manager, the search page, the calendar, the chat.
 *
 * Built as real HTML/CSS interfaces rather than screenshots or stock photos,
 * for the same reasons as QualArt: type stays crisp at any density, copy
 * changes without a re-shoot, and nothing has to be lifted from a real
 * client account.
 *
 * THREE CONSTRAINTS, SAME AS THE REST OF THE SITE
 * -----------------------------------------------
 * 1. No performance figures. Charts and bars here carry shape only — no
 *    spend, no ROAS, no lift, no numbers that could be read as a result
 *    Blueprint achieved. PRODUCT.md records none, so none appear.
 * 2. No real client data. Every name shown is generic ("your business").
 * 3. Platform marks are drawn glyphs used nominatively — see Marks.tsx. No
 *    partner or certification badge appears anywhere.
 *
 * The whole block is aria-hidden. The service copy beside it carries the
 * meaning; a screen reader should not have to wade through fake interface
 * text to reach it.
 */

import {
  FacebookMark,
  GoogleAdsMark,
  GoogleG,
  InstagramMark,
  MetaMark,
  PlayMark,
  WhatsAppMark,
} from "./Marks";

function Frame({
  tone,
  caption,
  children,
}: {
  tone: number;
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`sa-frame sa-tone-${tone}`} aria-hidden="true">
      <div className="sa-ui">{children}</div>
      <span className="sa-pill">{caption}</span>
    </div>
  );
}

function AppBar({
  mark,
  title,
  right,
}: {
  mark: React.ReactNode;
  title: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="sa-bar">
      {mark}
      <span className="sa-app">{title}</span>
      {right && <span className="sa-bar-right">{right}</span>}
    </div>
  );
}

/** A rising trend with no axis, no numbers — shape only, by design. */
function Trend() {
  return (
    <svg className="sa-trend" viewBox="0 0 120 46" preserveAspectRatio="none">
      <defs>
        <linearGradient id="sa-trend-fill" x1="0" y1="0" x2="0" y2="1">
          <stop
            offset="0%"
            style={{ stopColor: "var(--brand)", stopOpacity: 0.22 }}
          />
          <stop
            offset="100%"
            style={{ stopColor: "var(--brand)", stopOpacity: 0 }}
          />
        </linearGradient>
      </defs>
      <path
        className="sa-trend-area"
        d="M0 40 L20 34 L40 36 L60 24 L80 26 L100 12 L120 6 L120 46 L0 46 Z"
        fill="url(#sa-trend-fill)"
      />
      {/* pathLength normalises the geometry to 1, so the draw-on animation
          in plain.css can use a dasharray of exactly 1 rather than a magic
          number guessed at the real path length. */}
      <path
        className="sa-trend-line"
        pathLength={1}
        d="M0 40 L20 34 L40 36 L60 24 L80 26 L100 12 L120 6"
        fill="none"
        style={{ stroke: "var(--brand)" }}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        className="sa-trend-dot"
        cx="120"
        cy="6"
        r="3"
        style={{ fill: "var(--brand)" }}
      />
    </svg>
  );
}

/* ---------- bringing people in ---------- */

/* SEO — the search page, with you on it. */
function ArtSeo() {
  return (
    <Frame tone={0} caption="Google, page one">
      <div className="sa-search">
        <GoogleG size={13} />
        <span className="sa-query">physiotherapy near me</span>
        <span className="sa-mag" />
      </div>
      <div className="sa-serp">
        <div className="sa-hit is-you">
          <span className="sa-pos">1</span>
          <span className="sa-hit-body">
            <span className="sa-url">your-business.com.my</span>
            <span className="sa-hit-title">
              Physiotherapy in Bangsar, book this week
            </span>
            <span className="sa-line" />
            <span className="sa-line sa-short" />
            <span className="sa-sitelinks">
              <i />
              <i />
              <i />
            </span>
          </span>
          <span className="sa-tag">You</span>
        </div>
        {[2, 3].map((n) => (
          <div className="sa-hit sa-dim" key={n}>
            <span className="sa-pos">{n}</span>
            <span className="sa-hit-body">
              <span className="sa-url">competitor-{n}.com.my</span>
              <span className="sa-line" />
              <span className="sa-line sa-short" />
            </span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* Google Ads — the manager you would otherwise be staring at. */
function ArtSem() {
  return (
    <Frame tone={1} caption="Google Ads Manager">
      <AppBar
        mark={<GoogleAdsMark size={15} />}
        title="Google Ads"
        right={
          <span className="sa-tabs">
            <i className="is-on" />
            <i />
            <i />
          </span>
        }
      />
      <div className="sa-split">
        <div className="sa-chart">
          <span className="sa-chart-label">Clicks</span>
          <Trend />
          <span className="sa-axis">
            <i />
            <i />
            <i />
            <i />
          </span>
        </div>
        <div className="sa-rows">
          {["Search: Treatments", "Shopping: Core range", "Performance Max"].map(
            (name, n) => (
              <div className="sa-row" key={name}>
                <span className={`sa-dot ${n === 2 ? "is-idle" : "is-live"}`} />
                <span className="sa-name">{name}</span>
                <span className="sa-meter">
                  <i style={{ width: ["78%", "54%", "31%"][n] }} />
                </span>
              </div>
            ),
          )}
          <div className="sa-chips">
            <span className="sa-chip">Negatives</span>
            <span className="sa-chip">Landing page</span>
          </div>
        </div>
      </div>
    </Frame>
  );
}

/* Meta — the manager on the left, what the customer sees on the right. */
function ArtMeta() {
  return (
    <Frame tone={2} caption="Meta Ads Manager">
      <AppBar
        mark={<MetaMark size={16} />}
        title="Ads Manager"
        right={
          <span className="sa-plats">
            <FacebookMark size={13} />
            <InstagramMark size={13} />
          </span>
        }
      />
      <div className="sa-split">
        <div className="sa-rows">
          {["Cold: Interest", "Retarget: Viewed", "Lookalike 1%"].map(
            (name, n) => (
              <div className="sa-row" key={name}>
                <span className="sa-dot is-live" />
                <span className="sa-name">{name}</span>
                <span className="sa-meter">
                  <i style={{ width: ["66%", "88%", "42%"][n] }} />
                </span>
              </div>
            ),
          )}
          <div className="sa-chips">
            <span className="sa-chip">Creative A</span>
            <span className="sa-chip is-on">Creative B</span>
            <span className="sa-chip">C</span>
          </div>
        </div>
        <div className="sa-adcard">
          <div className="sa-ad-head">
            <span className="sa-avatar" />
            <span className="sa-ad-who">
              <span className="sa-name">Your business</span>
              <span className="sa-muted">Sponsored</span>
            </span>
          </div>
          <div className="sa-ad-media">
            <span className="sa-play">
              <PlayMark size={13} />
            </span>
          </div>
          <div className="sa-line" />
          <div className="sa-line sa-short" />
          <span className="sa-cta">Send message</span>
        </div>
      </div>
    </Frame>
  );
}

/* Video — the shoot, cut for every placement. */
function ArtVideo() {
  return (
    <Frame tone={4} caption="Shot, cut, tested">
      <div className="sa-split">
        <div className="sa-phone">
          <span className="sa-phone-notch" />
          <span className="sa-play is-big">
            <PlayMark size={16} />
          </span>
          <span className="sa-scrub">
            <i />
          </span>
        </div>
        <div className="sa-cuts">
          <div className="sa-chips">
            <span className="sa-chip is-on">9:16</span>
            <span className="sa-chip">1:1</span>
            <span className="sa-chip">16:9</span>
          </div>
          {["Hook: first 3 seconds", "The room, the process", "Offer + CTA"].map(
            (label) => (
              <div className="sa-clip" key={label}>
                <span className="sa-clip-thumb">
                  <PlayMark size={9} />
                </span>
                <span className="sa-name">{label}</span>
              </div>
            ),
          )}
          <span className="sa-track">
            <i style={{ width: "34%" }} />
            <i style={{ width: "22%" }} />
            <i style={{ width: "44%" }} />
          </span>
        </div>
      </div>
    </Frame>
  );
}

/* Web design: the site, and the sheet the rest of the business is held to.
   Was ArtBranding until the service was renamed on 2026-08-17. The drawing
   did not need redrawing: it already put the website first among the things
   the identity is applied to, which is the order the service now argues for. */
function ArtWebDesign() {
  return (
    <Frame tone={5} caption="The site, and the rules that hold it">
      <div className="sa-split">
        <div className="sa-brand">
          <span className="sa-lockup">
            <i />
            <span className="sa-lock-word" />
          </span>
          {/* The swatch row is Blueprint's own brand ramp, pulled from the
              tokens rather than restated as literals, so a palette change
              moves the illustration with it. */}
          <span className="sa-swatches">
            <i style={{ background: "var(--brand-deep)" }} />
            <i style={{ background: "var(--brand)" }} />
            <i style={{ background: "var(--brand-lift)" }} />
            <i style={{ background: "var(--cyan)" }} />
            <i style={{ background: "var(--paper-sunk)" }} />
          </span>
          <span className="sa-spec">
            <em>Aa</em>
            <span className="sa-spec-lines">
              <i />
              <i />
              <i className="sa-short" />
            </span>
          </span>
        </div>
        <div className="sa-apply">
          {["Website", "Ads", "Signage"].map((label, n) => (
            <div className="sa-apply-tile" key={label}>
              <span className={`sa-apply-art sa-apply-${n}`} />
              <span className="sa-muted">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

/* ---------- keeping them once they arrive ---------- */

/* Booking — the calendar taking the appointment for you. */
function ArtBooking() {
  const slots = [
    ["9:00", "taken"],
    ["10:15", "open"],
    ["11:30", "picked"],
    ["1:00", "taken"],
    ["2:30", "open"],
    ["4:00", "open"],
  ];
  return (
    <Frame tone={0} caption="Your booking calendar">
      <AppBar
        mark={<span className="sa-mini-mark">B</span>}
        title="Bookings"
        right={
          <span className="sa-chips">
            <span className="sa-chip is-on">Bangsar</span>
            <span className="sa-chip">Mont Kiara</span>
          </span>
        }
      />
      <div className="sa-week">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d, n) => (
          <span key={d} className={n === 4 ? "is-on" : ""}>
            {d}
          </span>
        ))}
      </div>
      <div className="sa-slots">
        {slots.map(([time, state]) => (
          <span key={time} className={`sa-slot is-${state}`}>
            {time}
          </span>
        ))}
      </div>
      <div className="sa-foot">
        <span className="sa-chip is-act">Confirmed</span>
        <span className="sa-muted">Reminder sends the day before</span>
      </div>
    </Frame>
  );
}

/* WhatsApp — the reply that happens whether you are awake or not. */
function ArtWhatsapp() {
  return (
    <Frame tone={1} caption="Answered in seconds">
      <div className="sa-wa-head">
        <WhatsAppMark size={16} />
        <span className="sa-wa-who">
          <span className="sa-name">Your business</span>
          <span className="sa-wa-state">typically replies instantly</span>
        </span>
        <span className="sa-muted">9:41 PM</span>
      </div>
      <div className="sa-chat">
        <span className="sa-bub sa-in">Hi, any slots this week?</span>
        <span className="sa-bub sa-out">
          Yes! Thu 3:00pm, Fri 11:30am, Sat 2:00pm. Which one suits you?
        </span>
        <span className="sa-bub sa-in">Friday 11:30 please</span>
        <span className="sa-bub sa-out sa-done">
          Booked ✓ Friday 11:30am, Bangsar.
        </span>
      </div>
      <div className="sa-foot">
        <span className="sa-chip">Qualified</span>
        <span className="sa-chip">Booked</span>
        <span className="sa-chip">Reminder set</span>
      </div>
    </Frame>
  );
}

/* CRM — the deal that would otherwise have gone quiet. */
function ArtCrm() {
  const cols: [string, number][] = [
    ["New", 3],
    ["Qualified", 2],
    ["Quoted", 2],
    ["Won", 1],
  ];
  return (
    <Frame tone={2} caption="Your pipeline">
      <AppBar
        mark={<span className="sa-mini-mark">P</span>}
        title="Pipeline"
        right={
          <span className="sa-chips">
            <span className="sa-chip">This week</span>
          </span>
        }
      />
      <div className="sa-board">
        {cols.map(([name, count], c) => (
          <div className="sa-col" key={name}>
            <span className="sa-col-head">{name}</span>
            {Array.from({ length: count }).map((_, i) => (
              <span
                className={`sa-card ${c === 2 && i === 0 ? "is-lit" : ""}`}
                key={i}
              >
                <i className="sa-line" />
                <i className="sa-line sa-short" />
                {c === 2 && i === 0 && (
                  <em className="sa-task">Follow up today</em>
                )}
              </span>
            ))}
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* Apps — the thing that did not exist as a product you could subscribe to. */
function ArtApps() {
  return (
    <Frame tone={3} caption="Built for how you work">
      <div className="sa-devices">
        <div className="sa-desktop">
          <span className="sa-win-bar">
            <i />
            <i />
            <i />
          </span>
          <div className="sa-win-body">
            <span className="sa-rail">
              <i />
              <i className="is-on" />
              <i />
              <i />
            </span>
            <span className="sa-win-main">
              <span className="sa-tiles">
                <i />
                <i />
                <i />
              </span>
              <span className="sa-line" />
              <span className="sa-line" />
              <span className="sa-line sa-short" />
            </span>
          </div>
        </div>
        <div className="sa-handset">
          <span className="sa-phone-notch" />
          <span className="sa-hs-head" />
          <span className="sa-line" />
          <span className="sa-line sa-short" />
          <span className="sa-cta is-act">Open</span>
        </div>
      </div>
    </Frame>
  );
}

/* AI — the admin that happens without anybody doing it. */
function ArtAi() {
  return (
    <Frame tone={4} caption="Runs while you sleep">
      <div className="sa-flow">
        <span className="sa-node">
          <WhatsAppMark size={12} />
          Enquiry arrives
        </span>
        <span className="sa-arrow" />
        <span className="sa-node is-lit">
          <span className="sa-mini-mark is-ai">AI</span>
          Qualifies, answers
        </span>
        <span className="sa-arrow" />
        <span className="sa-branch">
          <span className="sa-node sa-node-sm">Books the slot</span>
          <span className="sa-node sa-node-sm">Chases the quiet ones</span>
          <span className="sa-node sa-node-sm is-hand">Hands to you</span>
        </span>
      </div>
      <div className="sa-foot">
        <span className="sa-muted">Every step logged where you can see it</span>
      </div>
    </Frame>
  );
}

/* Custom software — the operation on one screen. */
function ArtSoftware() {
  return (
    <Frame tone={5} caption="Your operation, one screen">
      <AppBar
        mark={<span className="sa-mini-mark">O</span>}
        title="Operations"
        right={
          <span className="sa-chips">
            <span className="sa-chip is-on">All branches</span>
          </span>
        }
      />
      <div className="sa-tiles sa-tiles-lg">
        {["Today", "This week", "Staff"].map((label) => (
          <span className="sa-tile" key={label}>
            <em>{label}</em>
            <span className="sa-meter">
              <i style={{ width: `${40 + label.length * 4}%` }} />
            </span>
          </span>
        ))}
      </div>
      <div className="sa-rows">
        {[
          ["Bangsar", "on track"],
          ["Mont Kiara", "on track"],
          ["Penang", "attention"],
        ].map(([name, state]) => (
          <div className="sa-row" key={name}>
            <span className={`sa-dot ${state === "on track" ? "is-live" : "is-warn"}`} />
            <span className="sa-name">{name}</span>
            <span className="sa-muted">{state}</span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

const ART: Record<string, () => React.JSX.Element> = {
  seo: ArtSeo,
  sem: ArtSem,
  meta: ArtMeta,
  video: ArtVideo,
  "web-design": ArtWebDesign,
  booking: ArtBooking,
  whatsapp: ArtWhatsapp,
  crm: ArtCrm,
  apps: ArtApps,
  ai: ArtAi,
  software: ArtSoftware,
};

export default function ServiceArt({ id }: { id: string }) {
  const Art = ART[id];
  return Art ? <Art /> : null;
}
