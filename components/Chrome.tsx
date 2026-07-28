import Link from "next/link";
import { SITE, WA } from "@/lib/site";

/* The mark. Kept from the incumbent brand — the name and the B are
   confirmed commitments; the drafting vernacular around them was not. */
export function Mark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`shout inline-grid place-items-center bg-tungsten text-ink ${className}`}
      style={{ clipPath: "polygon(0 0,100% 6%,96% 100%,4% 94%)" }}
      aria-hidden="true"
    >
      B
    </span>
  );
}

export function WhatsAppGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.15c-.24.68-1.42 1.31-1.95 1.36-.5.05-.96.23-3.23-.67-2.72-1.07-4.44-3.85-4.57-4.03-.13-.18-1.09-1.45-1.09-2.77 0-1.32.69-1.97.94-2.24.24-.27.53-.34.7-.34.18 0 .35 0 .5.01.17.01.39-.06.61.47.23.55.77 1.9.84 2.04.07.14.11.3.02.48-.09.18-.14.29-.27.45-.14.16-.29.35-.41.47-.14.14-.28.28-.12.55.16.27.71 1.17 1.52 1.9 1.04.93 1.92 1.21 2.19 1.35.27.14.43.11.59-.07.16-.18.68-.79.86-1.07.18-.27.36-.22.61-.13.25.09 1.59.75 1.86.89.27.14.45.2.52.32.07.11.07.66-.17 1.34Z" />
    </svg>
  );
}

export function Nav() {
  return (
    <nav
      className="relative z-20 flex items-center justify-between gap-3 px-4 py-4 sm:px-6"
      aria-label="Main"
    >
      <Link
        href="/"
        className="flex items-center gap-2.5 text-fluoro no-underline"
      >
        <Mark className="h-8 w-8 text-lg" />
        <span className="shout text-xl tracking-tight">Blueprint</span>
      </Link>

      <div className="flex items-center gap-4">
        <Link
          href="/#work"
          className="hidden text-sm font-medium text-tarp-pale/80 no-underline transition-colors hover:text-fluoro sm:inline"
        >
          The lane
        </Link>
        <Link
          href="/#method"
          className="hidden text-sm font-medium text-tarp-pale/80 no-underline transition-colors hover:text-fluoro sm:inline"
        >
          How it works
        </Link>
        <a
          href={WA.general}
          className="chop border-chop bg-chop px-3 py-1.5 text-sm font-black text-ink no-underline transition-transform hover:-translate-y-0.5 sm:px-4"
        >
          WhatsApp us
        </a>
      </div>
    </nav>
  );
}

/**
 * The chop, pinned in the thumb zone. A Malaysian SME owner reading this on
 * her phone between appointments should never have to scroll to reach it.
 */
export function StickyChop() {
  return (
    <a
      href={WA.general}
      aria-label="Message Blueprint on WhatsApp (stays on screen while you scroll)"
      className="chop fixed right-4 bottom-4 z-50 flex items-center gap-2 border-chop-deep bg-chop px-4 py-3 text-sm font-black text-ink no-underline shadow-[0_6px_0_var(--color-chop-deep)] transition-transform active:translate-y-1 active:shadow-[0_2px_0_var(--color-chop-deep)] sm:right-6 sm:bottom-6"
    >
      <WhatsAppGlyph />
      WhatsApp us
    </a>
  );
}

export function Footer() {
  // pb-28 below sm so the sticky chop never sits on top of the copyright.
  return (
    <footer className="relative z-10 border-t-2 border-plum-edge bg-night-deep/80 px-4 pt-10 pb-28 sm:px-6 sm:pb-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 sm:flex-row sm:justify-between">
        <div className="max-w-sm">
          <div className="mb-3 flex items-center gap-2.5">
            <Mark className="h-7 w-7 text-base" />
            <span className="shout text-lg text-fluoro">Blueprint</span>
          </div>
          <p className="text-sm leading-relaxed text-tarp-pale/70">
            We bring customers to Malaysian businesses, and build the systems
            that catch them when they arrive.
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <p className="shout mb-1 text-xs tracking-[0.16em] text-tungsten">
            Talk to us
          </p>
          <a
            href={WA.general}
            className="font-semibold text-chop no-underline hover:underline"
          >
            WhatsApp {SITE.whatsappDisplay}
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="text-tarp-pale/75 no-underline hover:text-fluoro hover:underline"
          >
            {SITE.email}
          </a>
          <Link
            href="/#work"
            className="mt-2 text-tarp-pale/75 no-underline hover:text-fluoro hover:underline"
          >
            The lane
          </Link>
          <Link
            href="/#method"
            className="text-tarp-pale/75 no-underline hover:text-fluoro hover:underline"
          >
            How it works
          </Link>
        </div>
      </div>

      {/* /65 not /45 — at 12px this needs 4.5:1 and /45 measured 4.10:1. */}
      <p className="mx-auto mt-10 max-w-5xl text-xs text-tarp-pale/65">
        © {new Date().getFullYear()} {SITE.legalName}. Kuala Lumpur, Malaysia.
      </p>
    </footer>
  );
}
