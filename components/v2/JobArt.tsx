"use client";

import { useEffect, useRef, useState } from "react";

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
 *
 * EACH ONE BUILDS ITSELF WHEN THE READER REACHES IT
 * -------------------------------------------------
 * ServiceArt's tiles already animate on arrival, and the mechanism is free
 * there: its panels are hidden with the `hidden` attribute, which is
 * display:none, and an element that is display:none restarts its animations
 * when it is shown. These three are never hidden, so all of that motion was
 * playing at load, four thousand pixels below the fold, and was finished
 * before anybody could see it.
 *
 * So this is a client component for one reason: an IntersectionObserver that
 * says when the tile is on screen. `is-armed` holds the shared entry
 * animations, `is-in` releases them, starts the highlight this tile is for,
 * and then runs its loop. Three states rather than two, because the holding
 * class is what makes the degradation correct: without JavaScript nothing is
 * ever armed, the animations play at load exactly as they did before, and
 * the reader who scrolls down finds a drawn tile rather than an empty one.
 * Never gate the animations on the absence of `is-in` alone.
 *
 * A tile already on screen at mount skips straight to `is-in`, so nothing
 * paints in the held state on a short viewport.
 *
 * THE OBSERVER RUNS BOTH WAYS, AND THAT IS LOAD-BEARING NOW
 * ---------------------------------------------------------
 * It used to disconnect on the first sighting. It no longer does, because
 * the tiles carry looping animations and a loop that runs while its tile is
 * three screens away is a battery cost with no reader. Leaving view returns
 * the tile to `is-armed`, which stops every loop it owns; coming back plays
 * the whole build again.
 *
 * The rebuild on re-entry is deliberate rather than tolerated. It is what
 * ServiceTabs already does on every tab switch, for the same reason: a
 * drawing that assembles itself is worth more than a drawing that is simply
 * there, and it costs nothing to give it again.
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
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"" | "is-armed" | "is-in">("");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* Already up the page when this runs, so there is nothing to wait for
       and arming it would only paint a held frame. */
    if (el.getBoundingClientRect().top < window.innerHeight * 0.85) {
      setPhase("is-in");
      return;
    }

    setPhase("is-armed");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) setPhase(e.isIntersecting ? "is-in" : "is-armed");
      },
      /* A third of the tile. Less fires while it is still a sliver at the
         bottom edge and the build happens off screen again. Note this is
         also the threshold it stops at on the way out, so a tile does not
         flicker between the two states while it is half on screen. */
      { threshold: 0.34 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (!Art) return null;

  return (
    <div className={`jb-art ${phase}`} ref={ref}>
      <Art />
    </div>
  );
}
