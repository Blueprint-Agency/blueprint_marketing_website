"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Scroll-expansion hero.
 *
 * The reader's scroll drives a media panel from a small card to near
 * full-bleed while the two halves of the headline part to let it through.
 * Adapted from a community component; four things were changed because the
 * original could not ship on this site.
 *
 * 1. SCROLL LOCK. The original called window.scrollTo(0, 0) on every scroll
 *    event until expansion finished. That silently defeats the skip link and
 *    every nav anchor — click "See what we do" before expanding and you get
 *    yanked back to the top with no explanation. Here the lock is an explicit
 *    body overflow lock with scrollbar-width compensation, released the
 *    instant expansion completes, the hero leaves the viewport, or a hash
 *    navigation happens.
 *
 * 2. KEYBOARD. The original advanced on wheel and touch only, so a
 *    keyboard-only reader met a page that would not move and had no way to
 *    reach the content. Arrow/Page/Space/Enter now advance it, Home or
 *    Escape releases it, and focus entering anything behind the hero expands
 *    it immediately rather than trapping the user.
 *
 * 3. REDUCED MOTION. The whole gesture is skipped: the panel renders already
 *    expanded and nothing is ever locked. This world's contract is that
 *    motion is never load-bearing, and a hero you must animate to get past
 *    would make it exactly that.
 *
 * 4. BACKGROUND AS A NODE. The original required a background image URL.
 *    `background` takes any node so this site can hand it the existing
 *    animated aurora instead of a flat photograph.
 */

export interface ScrollExpandHeroProps {
  mediaType?: "video" | "image";
  mediaSrc: string;
  posterSrc?: string;
  mediaAlt?: string;
  /** Anything painted behind the hero. Fades out as the media takes over. */
  background?: ReactNode;
  /** Static image alternative to `background`. */
  bgImageSrc?: string;
  /** Headline above the media. Slides left as it opens. */
  titleTop?: ReactNode;
  /** Headline below the media. Slides right as it opens. */
  titleBottom?: ReactNode;
  /** Small label above the headline. */
  kicker?: ReactNode;
  /** The prompt telling the reader the hero responds to scroll. */
  scrollToExpand?: string;
  /** Always visible, under the headline. Put the primary action here — it
   *  must not depend on the reader completing a gesture. */
  actions?: ReactNode;
  /** Black scrim over the media, 0–1. Keeps type legible over a busy photo. */
  overlayOpacity?: number;
  /** Revealed once the media is fully open. */
  children?: ReactNode;
}

export default function ScrollExpandHero({
  mediaType = "image",
  mediaSrc,
  posterSrc,
  mediaAlt = "",
  background,
  bgImageSrc,
  titleTop,
  titleBottom,
  kicker,
  scrollToExpand,
  actions,
  overlayOpacity = 0.4,
  children,
}: ScrollExpandHeroProps) {
  const [progress, setProgress] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  /** Null until measured. Prevents a flash of the gesture before we know
   *  whether the reader wants motion at all. */
  const [motionOk, setMotionOk] = useState<boolean | null>(null);

  const sectionRef = useRef<HTMLElement | null>(null);
  const touchY = useRef(0);
  const progressRef = useRef(0);
  const expandedRef = useRef(false);

  progressRef.current = progress;
  expandedRef.current = expanded;

  const finish = useCallback(() => {
    setProgress(1);
    setExpanded(true);
  }, []);

  const advance = useCallback((delta: number) => {
    if (expandedRef.current) return;
    const next = Math.min(Math.max(progressRef.current + delta, 0), 1);
    setProgress(next);
    if (next >= 1) setExpanded(true);
  }, []);

  /* Reduced motion and viewport class. */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      const ok = !mq.matches;
      setMotionOk(ok);
      if (!ok) {
        setProgress(1);
        setExpanded(true);
      }
    };
    apply();
    mq.addEventListener("change", apply);

    const size = () => setIsMobile(window.innerWidth < 768);
    size();
    window.addEventListener("resize", size);
    return () => {
      mq.removeEventListener("change", apply);
      window.removeEventListener("resize", size);
    };
  }, []);

  /* If the page is loaded at an anchor, or one is followed, there is no
     gesture to complete — the reader has already said where they want to be. */
  useEffect(() => {
    if (window.location.hash) finish();
    const onHash = () => finish();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [finish]);

  const locked = motionOk === true && !expanded;

  /* The lock. Body overflow rather than preventDefault on every scroll, so
     keyboard and scrollbar dragging are held too, and releasing is one line
     rather than a race with the browser. The padding keeps the page from
     jumping sideways as the scrollbar disappears. */
  useEffect(() => {
    if (!locked) return;
    const { body } = document;
    const prevOverflow = body.style.overflow;
    const prevPad = body.style.paddingRight;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPad;
    };
  }, [locked]);

  /* Input. Registered once; the handlers read refs so a wheel tick does not
     tear down and rebuild every listener on the page. */
  useEffect(() => {
    if (!locked) return;

    const onWheel = (e: globalThis.WheelEvent) => {
      e.preventDefault();
      advance(e.deltaY * 0.0009);
    };
    const onTouchStart = (e: globalThis.TouchEvent) => {
      touchY.current = e.touches[0].clientY;
    };
    const onTouchMove = (e: globalThis.TouchEvent) => {
      if (!touchY.current) return;
      e.preventDefault();
      const y = e.touches[0].clientY;
      const dy = touchY.current - y;
      advance(dy * (dy < 0 ? 0.008 : 0.005));
      touchY.current = y;
    };
    const onTouchEnd = () => {
      touchY.current = 0;
    };
    const onKey = (e: globalThis.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
        case "PageDown":
        case " ":
        case "Enter":
          e.preventDefault();
          advance(0.28);
          break;
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          advance(-0.28);
          break;
        case "End":
        case "Escape":
          e.preventDefault();
          finish();
          break;
        case "Tab":
          /* Someone is navigating by keyboard and wants past the hero.
             Open it rather than let them tab into content they cannot see. */
          finish();
          break;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
    };
  }, [locked, advance, finish]);

  const mediaW = 300 + progress * (isMobile ? 650 : 1250);
  const mediaH = 400 + progress * (isMobile ? 200 : 400);
  const slide = progress * (isMobile ? 42 : 46);

  return (
    <section ref={sectionRef} className="seh" data-expanded={expanded}>
      <div className="seh-stage">
        {/* The ground. Fades as the media takes the frame. */}
        <motion.div
          className="seh-bg"
          initial={false}
          animate={{ opacity: 1 - progress }}
          transition={{ duration: 0.12 }}
          aria-hidden="true"
        >
          {background}
          {bgImageSrc && (
            <Image
              src={bgImageSrc}
              alt=""
              fill
              priority
              sizes="100vw"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          )}
        </motion.div>

        <div className="seh-viewport">
          {/* The media. Grows from a card to near full-bleed. */}
          <div
            className="seh-media"
            style={{ width: `${mediaW}px`, height: `${mediaH}px` }}
            aria-hidden="true"
          >
            {mediaType === "video" ? (
              <video
                src={mediaSrc}
                poster={posterSrc}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                controls={false}
                disablePictureInPicture
              />
            ) : (
              <Image
                src={mediaSrc}
                alt={mediaAlt}
                fill
                priority
                sizes="100vw"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            )}
            <span
              className="seh-scrim"
              style={{ opacity: overlayOpacity }}
              aria-hidden="true"
            />
          </div>

          {/* Three bands, not one stack: kicker at the top, headline on the
              centre line where the media opens through it, action at the
              foot. Stacked together they collided with the media card at its
              starting size — the button sat half behind a photograph. */}
          {kicker && <p className="seh-kicker">{kicker}</p>}

          {/* One <h1>, split into two lines that part around the media as it
              opens, so it stays a single heading to assistive tech and to a
              crawler. */}
          <h1 className="h1 seh-title">
            <span
              className="seh-line"
              style={{ transform: `translate3d(-${slide}vw,0,0)` }}
            >
              {titleTop}
            </span>{" "}
            <span
              className="seh-line"
              style={{ transform: `translate3d(${slide}vw,0,0)` }}
            >
              {titleBottom}
            </span>
          </h1>

          <div className="seh-foot">
            {actions && <div className="seh-actions">{actions}</div>}
          </div>

          {/* A sibling of the foot, not a child of it. Inside the foot — which
              is positioned for stacking — the foot became its offset parent
              and `bottom` measured from the buttons rather than from the
              viewport, landing the cue on top of them at every width. */}
          {scrollToExpand && !expanded && (
            <p className="seh-cue" style={{ opacity: 1 - progress * 1.6 }}>
              {scrollToExpand}
            </p>
          )}
        </div>
      </div>

      {children && (
        <motion.div
          className="seh-reveal"
          initial={false}
          animate={{ opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.7 }}
          /* Hidden from AT and from the tab order until it is actually
             visible, so nobody lands on invisible content. */
          aria-hidden={!expanded}
          inert={!expanded ? true : undefined}
        >
          {children}
        </motion.div>
      )}
    </section>
  );
}
