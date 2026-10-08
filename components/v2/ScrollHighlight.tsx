"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * A highlighter stroke that sweeps across its words the first time they
 * scroll into view, then stays. Used on the booking system page to mark
 * "the manual work" in the problem heading.
 *
 * The stroke is a background gradient on an inline span, so it follows
 * the text if the line ever wraps. It starts drawn when the reader prefers
 * reduced motion, or when there is no IntersectionObserver, so nobody is
 * left with an unmarked heading. Styles: .hl in app/plain.css.
 */
export default function ScrollHighlight({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 1, rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span ref={ref} className={on ? "hl is-on" : "hl"}>
      {children}
    </span>
  );
}
