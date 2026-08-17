/**
 * One illustration per job in the three-jobs section of /services/web-design.
 *
 * SAME VOCABULARY AS THE HOME PAGE, DELIBERATELY
 * ----------------------------------------------
 * These are built from the `sa-*` primitives ServiceArt uses: the gradient
 * tile, the paper interface card floating on it, the caption pill, the
 * skeleton lines, the search hit, the action button. Not a resemblance, the
 * same rules. A reader who has come from the home page has already learned
 * to read these as "a picture of the surface the work happens on", and this
 * section is asking to be read exactly that way.
 *
 * The whole tile scales off its container rather than the viewport, so the
 * same drawing survives a 340px column here and a 700px one on the home
 * page. See .svt-stage in plain.css for where that came from.
 *
 * THE SAME THREE CONSTRAINTS AS ServiceArt
 * ----------------------------------------
 * 1. No performance figures. Nothing here carries a number that could be
 *    read as a result Blueprint achieved. PRODUCT.md records none.
 * 2. No real client data, and no invented people. The business shown is
 *    generic and nobody in it is named.
 * 3. Platform marks are drawn glyphs used nominatively. See Marks.tsx.
 *
 * Every tile is aria-hidden. The copy beside it carries the argument, and a
 * screen reader should not have to wade through interface furniture to
 * reach it.
 *
 * WHY EACH ONE SHOWS WHAT IT SHOWS
 * --------------------------------
 * The temptation in a section like this is three decorative shapes. Each of
 * these instead draws the exact claim its paragraph makes, and would be
 * wrong beside either of the other two:
 *
 *  - TRUST draws the things a stranger checks before believing you: where
 *    you are, when you are open, whether you are registered, who works
 *    there. It is the page at the moment of judgement.
 *  - STEP draws the same green action ending every block of the page. The
 *    repetition IS the point: one obvious next step, in every place the
 *    decision might be made, not one button on a contact page.
 *  - FOUND draws the search result, because being found is not a property
 *    of your site, it is a position on somebody else's page.
 */

import { GoogleG, WhatsAppMark } from "./Marks";

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

/** The three dots every window in this system opens with. */
function WinBar() {
  return (
    <div className="sa-win-bar">
      <i />
      <i />
      <i />
    </div>
  );
}

/* 01 — Trust. The page at the moment somebody decides you are real. */
function ArtTrust() {
  return (
    <Frame tone={4} caption="The 11pm judgement">
      <div className="sa-desktop ja-fill">
        <WinBar />
        <div className="sa-win-main">
          <div className="ja-hero">
            <span className="ja-hero-h" />
            <span className="ja-hero-s" />
          </div>
          <div className="sa-chips">
            <span className="sa-chip">Cheras, KL</span>
            <span className="sa-chip">Open till 9pm</span>
            <span className="sa-chip">Registered</span>
          </div>
          <div className="ja-who">
            <span className="sa-avatar" />
            <span className="sa-avatar" />
            <span className="sa-avatar" />
            <span className="sa-muted">The people who treat you</span>
          </div>
        </div>
      </div>
    </Frame>
  );
}

/* 02 — The step. Every block on the page ends in the same conversation. */
function ArtStep() {
  return (
    <Frame tone={3} caption="One thing to do next">
      <div className="sa-desktop ja-fill">
        <WinBar />
        <div className="sa-win-main">
          {/* Two blocks, not one. A single button is a contact page; the
              same action at the foot of every block is the claim, and two
              is the smallest number that reads as a pattern. A third was
              tried and the card clipped it, which looked like a bug rather
              than like a page continuing. */}
          {[0, 1].map((n) => (
            <div className="ja-block" key={n}>
              <span className="sa-line" />
              <span className="sa-line sa-short" />
              <span className="sa-cta is-act">
                <WhatsAppMark size={9} />
                Message us
              </span>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

/* 03 — Found. Somebody else's page, and your position on it. */
function ArtFound() {
  return (
    <Frame tone={0} caption="When they go looking">
      <div className="sa-search">
        <GoogleG size={12} />
        <span className="sa-query">chiropractor cheras</span>
        <span className="sa-mag" />
      </div>
      <div className="sa-serp">
        <div className="sa-hit is-you">
          <span className="sa-pos">1</span>
          <span className="sa-hit-body">
            <span className="sa-url">your-business.com.my</span>
            <span className="sa-hit-title">
              Chiropractor in Cheras, open seven days
            </span>
            <span className="sa-line" />
            {/* The row of deep links a result earns when the site is
                structured. It is also what fills the card: without it the
                hits stack at the top and leave a band of empty paper. */}
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
              <span className="sa-line sa-short" />
            </span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

const ART: Record<string, () => React.JSX.Element> = {
  trust: ArtTrust,
  step: ArtStep,
  found: ArtFound,
};

export default function JobArt({ id }: { id: string }) {
  const Art = ART[id];
  return Art ? <Art /> : null;
}
