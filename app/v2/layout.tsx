import type { Metadata } from "next";
import { Schibsted_Grotesk, Geist_Mono } from "next/font/google";
import "./v2.css";

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-schibsted",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "More customers for Malaysian businesses",
  description:
    "Blueprint runs the marketing that brings customers in, and builds the booking, CRM and WhatsApp systems that stop you losing them. Six real client sites you can open and check.",
  alternates: { canonical: "/v2" },
  // A parallel direction under evaluation, not a page to be indexed
  // alongside the live homepage.
  robots: { index: false, follow: false },
};

/* The direction contract. Emitted as a real HTML comment so it survives
   the production build and can be audited against the render. */
const CONTRACT = `<!--
  IMPECCABLE DIRECTION CONTRACT — V2 "PLAIN"

  THESIS: We get Malaysian businesses more customers, and here are six real
  ones you can open in a new tab. Refuses a governing metaphor entirely
  (the user re-rolled two fully-worked ones and steered "simple and direct,
  no analogies"), and refuses the agency default it would otherwise fall
  into: dark gradient hero, invented stat counters, icon feature-cards.

  OWN-WORLD: Near-white paper ground, near-black ink, hairline rules, and
  one reserved action green that only ever means WhatsApp. Every scrap of
  colour on the page comes from real screenshots of real client sites in
  quiet browser frames showing their live address. Schibsted Grotesk alone,
  worked hard; Geist Mono only for machine addresses. One ink-black band
  carries the close.

  STORY: She reads one sentence and knows what this is. She finds her own
  kind of business in "who it's for" and sees a real client like her. She
  learns the two places her money leaks, and watches the follow-up she does
  not have. She messages from wherever she stopped reading.

  FIRST VIEWPORT: One sentence at up to 5rem on the left with a plain
  paragraph and the WhatsApp action beneath it; a large real screenshot of
  Five Clinic in a browser frame on the right, its live URL legible in the
  chrome. A strip of all six live sites sits immediately under it.

  FORM: Canon, played straight — the standing exit taken by the user after
  two re-rolls. Craft bar set by the user at Stripe / Linear. Staging is
  the plain document: one column, generous rhythm, no staging device.
  Seed keys fb5c7e61 and 0d36f744, both re-rolled and discharged.

  STRUCTURE (2026-07-27): skeleton adapted from hyros.com at the user's
  request — proof inside the first screen, buyer segmentation by business
  type, problem-framed sections with the enemy named in the heading, a
  repeated action, and a real footer. What did NOT transfer is the half of
  that engine running on aggregate stats, headshot testimonials and a logo
  wall: PRODUCT.md records none of those, so those slots are absent rather
  than invented. The single results block is data-driven (lib/results.ts)
  and renders only once real measured figures are supplied; until then the
  honest "On results" note holds its place.
-->`;

export default function V2Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`v2 ${schibsted.variable} ${geistMono.variable}`}>
      <div hidden dangerouslySetInnerHTML={{ __html: CONTRACT }} />
      {children}
    </div>
  );
}
