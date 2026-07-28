"use client";

import { ArrowRight } from "lucide-react";
import { Suspense, lazy, useEffect, useState } from "react";

/* The shader is ~40kB of WebGL that nothing above the fold needs. Lazily
   imported so it costs nothing until this section is actually rendered,
   and wrapped in Suspense so the card never pops in empty. */
const Dithering = lazy(() =>
  import("@paper-design/shaders-react").then((mod) => ({
    default: mod.Dithering,
  })),
);

export type CTASectionProps = {
  /** Primary action. A wa.me link with the message prefilled. */
  waHref: string;
  /** Secondary action, for people who will not open WhatsApp. */
  emailHref: string;
  /** Display form of the WhatsApp number, e.g. "+60 12-628 6586". */
  phone: string;
};

/**
 * The closing card. A dithered warp field drifting behind the last thing
 * she reads before she messages.
 *
 * Adapted to this site's world rather than pasted from the shadcn source:
 * the reference component assumes shadcn theme tokens (bg-card, text-primary,
 * border-border) and a serif display face, none of which exist here. The
 * form — inset 48px card, shader field, pill badge, oversized two-tone
 * headline, pill action — is kept exactly; the material is the v2 palette
 * and Schibsted Grotesk, so the close still reads as the same page.
 */
export function CTASection({ waHref, emailHref, phone }: CTASectionProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [reduced, setReduced] = useState(false);

  /* The shader animates on a WebGL clock, so no CSS media query can stop
     it. We read the preference ourselves and hold the field still. */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const speed = reduced ? 0 : isHovered ? 0.6 : 0.2;

  return (
    <section className="close-wrap">
      <div
        className="dither-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Suspense fallback={<div className="dither-fallback" aria-hidden="true" />}>
          <div className="dither-field" aria-hidden="true">
            <Dithering
              colorBack="#00000000"
              colorFront="#25c9e8"
              shape="warp"
              type="4x4"
              speed={speed}
              className="dither-canvas"
              minPixelRatio={1}
            />
          </div>
        </Suspense>

        <div className="dither-inner">
          <p className="live-pill">
            <span className="live-dot" aria-hidden="true">
              <span className="live-ping" />
              <span className="live-core" />
            </span>
            WhatsApp {phone}
          </p>

          {/* The explicit space survives the narrow-width rule that hides
              the break — without it the two beats run together as one word. */}
          <h2 className="close-h">
            Tell us where you&rsquo;re{" "}
            <br />
            <span className="close-h-soft">losing customers.</span>
          </h2>

          <p className="close-p">
            One message. We will tell you what we would do about it, and whether
            we are the right people to do it.
          </p>

          <div className="close-actions">
            <a
              className="pill pill-act"
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Message us on WhatsApp</span>
              <ArrowRight className="pill-arrow" aria-hidden="true" />
            </a>
            <a className="pill pill-ghost" href={emailHref}>
              Email instead
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
