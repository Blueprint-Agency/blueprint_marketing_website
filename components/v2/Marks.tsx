/**
 * Platform glyphs, drawn here, used nominatively.
 *
 * These say WHICH platform a piece of work happens on — the same way a
 * plumber's van says which boilers they service. That is nominative use and
 * it is fine. What is NOT fine, and does not appear anywhere on this site:
 *
 *   - Partner / Certified / Premier badges. Those are eligibility claims
 *     with programme rules attached, and PRODUCT.md records none of them.
 *   - Any implication of endorsement by Google, Meta or WhatsApp.
 *
 * The Google "G" is the one mark reproduced faithfully, because a wonky G
 * looks worse than no G. The rest are simplified glyphs in each platform's
 * own colour — recognisable, obviously drawn, never passed off as the
 * official asset. If real brand files are wanted later, take them from each
 * platform's own brand resource page and follow its guidelines.
 */

type MarkProps = { size?: number };

export function GoogleG({ size = 16 }: MarkProps) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden="true">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.28-3.14.76-4.59l-7.97-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

/** Google Ads: two leaning bars in blue and yellow, green dot at the foot. */
export function GoogleAdsMark({ size = 16 }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <rect
        x="7.1"
        y="1.6"
        width="6.2"
        height="17"
        rx="3.1"
        transform="rotate(-30 10.2 10.1)"
        fill="#FBBC04"
      />
      <rect
        x="10.9"
        y="1.6"
        width="6.2"
        height="17"
        rx="3.1"
        transform="rotate(30 14 10.1)"
        fill="#4285F4"
      />
      <circle cx="6.6" cy="18.3" r="3.5" fill="#34A853" />
    </svg>
  );
}

/** Meta: the lemniscate, simplified to a single stroked pass. */
export function MetaMark({ size = 16 }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path
        d="M2.9 14.4c0-4.2 2-7.6 4.6-7.6 2.2 0 3.5 2 5 4.6 1.7 3 2.7 5.4 4.4 5.4 1.6 0 2.4-1.6 2.4-3.9 0-2.7-1.1-5.5-3.1-5.5-1.5 0-2.7 1.3-3.9 3.2"
        fill="none"
        stroke="#0866FF"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M2.9 14.4c0 2.3 1.1 3.5 2.6 3.5 1.4 0 2.4-.9 3.6-2.7"
        fill="none"
        stroke="#0866FF"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function FacebookMark({ size = 16 }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#1877F2" />
      <path
        d="M15.6 15.5l.5-3.3h-3.1V10c0-.9.44-1.8 1.85-1.8h1.42V5.4s-1.29-.22-2.52-.22c-2.57 0-4.25 1.56-4.25 4.38v2.64H6.6v3.3h2.9v8a11.2 11.2 0 003.1 0v-8h2.99z"
        fill="#fff"
      />
    </svg>
  );
}

export function InstagramMark({ size = 16 }: MarkProps) {
  const id = `ig-${size}`;
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#FDCB52" />
          <stop offset="45%" stopColor="#E1306C" />
          <stop offset="100%" stopColor="#833AB4" />
        </linearGradient>
      </defs>
      <rect
        x="2.2"
        y="2.2"
        width="19.6"
        height="19.6"
        rx="5.6"
        fill="none"
        stroke={`url(#${id})`}
        strokeWidth="2.2"
      />
      <circle
        cx="12"
        cy="12"
        r="4.4"
        fill="none"
        stroke={`url(#${id})`}
        strokeWidth="2.2"
      />
      <circle cx="17.4" cy="6.6" r="1.4" fill={`url(#${id})`} />
    </svg>
  );
}

/** WhatsApp: the handset in its bubble, simplified. */
export function WhatsAppMark({ size = 16 }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path
        d="M12 2.2c5.4 0 9.8 4.3 9.8 9.6 0 5.3-4.4 9.6-9.8 9.6-1.7 0-3.3-.42-4.7-1.16L2.4 21.8l1.6-4.7A9.4 9.4 0 012.2 11.8c0-5.3 4.4-9.6 9.8-9.6z"
        fill="#25D366"
      />
      <path
        d="M8.5 7.4c.3 0 .5.02.7.44.25.5.85 1.95.92 2.1.08.14.13.31.03.5-.1.2-.15.32-.3.5-.15.17-.31.39-.44.52-.15.15-.3.31-.13.6.17.3.77 1.27 1.65 2.06 1.14 1.01 2.1 1.33 2.4 1.48.3.15.47.13.65-.08.17-.2.75-.87.95-1.17.2-.3.4-.25.66-.15.27.1 1.7.8 2 .95.28.14.47.21.54.33.07.12.07.7-.16 1.37-.24.68-1.42 1.32-1.96 1.4-.55.08-1.06.31-3.55-.72-2.98-1.24-4.85-4.3-5-4.5-.14-.2-1.19-1.58-1.19-3.02 0-1.43.75-2.14 1.02-2.43.27-.3.59-.37.79-.37z"
        fill="#fff"
      />
    </svg>
  );
}

/** Generic play triangle. Not a platform mark — used for video surfaces. */
export function PlayMark({ size = 16 }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path d="M8.5 5.6l10 6.4-10 6.4V5.6z" fill="currentColor" />
    </svg>
  );
}
