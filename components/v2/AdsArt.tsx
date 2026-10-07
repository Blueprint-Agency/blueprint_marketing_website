import { ArtMeta, ArtSem } from "./ServiceArt";
import { GoogleG, InstagramMark, PlayMark, WhatsAppMark } from "./Marks";

/**
 * The three-jobs drawings for the Google Ads and Meta Ads pages.
 *
 * Same rules as SeoArt and ServiceArt: `sa-*` primitives, a generic
 * business nobody is named in, and no figure that could be read as a
 * result. Where a drawing ranks things (campaigns, creatives) it ranks them
 * with a label, never a number.
 *
 * Two of the six are ServiceArt's own tiles, reused rather than redrawn, so
 * a reader coming from the home page's services tabs sees the same Ads
 * Manager she saw there.
 *
 * SeoJobArt in SeoArt.tsx looks ids up here after its own, and wraps the
 * drawing in the observer that builds it on arrival.
 */

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

/* Google Ads 02: the ad and the page it lands on say the same thing. */
function ArtMatch() {
  return (
    <Frame tone={3} caption="The ad and the page agree">
      <div className="ads-sponsored">
        <span className="ads-spon-tag">Sponsored</span>
        <span className="sa-url">your-business.com.my/facial-bangsar</span>
        <span className="ads-match">Facial in Bangsar, book tonight</span>
      </div>
      <span className="ads-arrow" />
      <div className="ads-landing">
        <span className="ads-match is-h">Facial in Bangsar, book tonight</span>
        <span className="sa-line" />
        <span className="sa-chips">
          <span className="sa-chip">Prices listed</span>
          <span className="sa-chip">Open till 9pm</span>
        </span>
        <span className="sa-cta is-act">
          <WhatsAppMark size={9} />
          Message us
        </span>
      </div>
    </Frame>
  );
}

/* Google Ads 03: campaigns judged by bookings, and the one that gets cut. */
function ArtOptimise() {
  const rows: { name: string; tag: string; state: string }[] = [
    { name: "facial bangsar", tag: "Bookings", state: "is-good" },
    { name: "facial spa near me", tag: "Bookings", state: "is-good" },
    { name: "what is a facial", tag: "No bookings", state: "is-cut" },
  ];
  return (
    <Frame tone={0} caption="Judged on bookings">
      <div className="ads-opt-head">
        <GoogleG size={11} />
        <span className="sa-name">Search terms</span>
        <span className="sa-chip">This month</span>
      </div>
      <div className="ads-opt">
        {rows.map((r) => (
          <div className={`ads-opt-row ${r.state}`} key={r.name}>
            <span className="mono ads-opt-q">{r.name}</span>
            <span className="ads-opt-tag">{r.tag}</span>
          </div>
        ))}
      </div>
      <div className="sa-foot">
        <span className="sa-chip ads-neg">Negative: &ldquo;what is&rdquo;</span>
        <span className="sa-chip">Budget moved</span>
      </div>
    </Frame>
  );
}

/* Meta 01: the post, on the feed, made for the feed. */
function ArtFeed() {
  return (
    <Frame tone={4} caption="Made for the feed">
      <div className="ads-post">
        <div className="sa-ad-head">
          <span className="sa-avatar" />
          <span className="sa-ad-who">
            <span className="sa-name">Your business</span>
            <span className="sa-muted">Sponsored</span>
          </span>
          <span className="ads-post-plat">
            <InstagramMark size={12} />
          </span>
        </div>
        <div className="ads-post-media">
          <span className="sa-play">
            <PlayMark size={13} />
          </span>
          <span className="ads-post-cap">The real room. The real people.</span>
        </div>
        <div className="ads-post-foot">
          <span className="ads-post-icons">
            <i />
            <i />
            <i />
          </span>
          <span className="sa-cta">Send message</span>
        </div>
      </div>
    </Frame>
  );
}

/* Meta 03: creatives ranked by bookings, and the one that has tired out. */
function ArtCreative() {
  const rows: { name: string; tag: string; state: string }[] = [
    { name: "Video: the room", tag: "Most bookings", state: "is-good" },
    { name: "Video: the therapist", tag: "Testing", state: "" },
    { name: "Photo: the price list", tag: "Tired, replace", state: "is-cut" },
  ];
  return (
    <Frame tone={2} caption="Tested against bookings">
      <div className="ads-opt">
        {rows.map((r, i) => (
          <div className={`ads-opt-row ads-cr ${r.state}`} key={r.name}>
            <span className={`ads-thumb t${i}`} />
            <span className="ads-opt-q">{r.name}</span>
            <span className="ads-opt-tag">{r.tag}</span>
          </div>
        ))}
      </div>
      <div className="sa-foot">
        <span className="sa-chip">New cut next week</span>
      </div>
    </Frame>
  );
}

export const AD_ART: Record<string, () => React.JSX.Element> = {
  "g-buy": ArtSem,
  "g-page": ArtMatch,
  "g-opt": ArtOptimise,
  "m-creative": ArtFeed,
  "m-audience": ArtMeta,
  "m-opt": ArtCreative,
};
