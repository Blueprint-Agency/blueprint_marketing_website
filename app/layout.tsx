import type { Metadata, Viewport } from "next";
import { Schibsted_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./plain.css";
import { SITE } from "@/lib/site";

/**
 * Root layout for the Plain world.
 *
 * The Pasar Malam direction was removed on 2026-07-28: the user chose Plain
 * as the site's only design, so its wrapper, fonts and stylesheet moved up
 * here from what used to be app/v2/layout.tsx. Everything in plain.css is
 * still scoped under `.v2`, and the wrapper div below is what supplies that
 * class, so the ~4,200 lines of existing selectors did not have to be
 * rewritten to become the default.
 */

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
  metadataBase: new URL(SITE.url),
  title: {
    default: "We get Malaysian businesses more customers",
    template: "%s · Blueprint",
  },
  description:
    "Blueprint runs the marketing that brings customers to Malaysian businesses, and builds the booking, CRM and WhatsApp systems that catch them when they arrive.",
  openGraph: {
    type: "website",
    locale: "en_MY",
    url: SITE.url,
    siteName: "Blueprint",
    title: "We get Malaysian businesses more customers",
    description:
      "Marketing that brings people in, and the systems that stop you losing them once they arrive. For Malaysian businesses.",
  },
  twitter: {
    card: "summary_large_image",
    title: "We get Malaysian businesses more customers",
    description:
      "Marketing that brings people in, and the systems that catch them. For Malaysian businesses.",
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  // The paper ground, not the old indigo. This is the colour the browser
  // chrome takes on a phone, so a stale value here shows as a band of the
  // deleted world above the page.
  themeColor: "#fcfcfd",
  colorScheme: "light",
};

/* The direction contract. Emitted as a real HTML comment so it survives
   the production build and can be audited against the render. */
const CONTRACT = `<!--
  IMPECCABLE DIRECTION CONTRACT: "PLAIN"

  THESIS: We get Malaysian businesses more customers, and here are six real
  ones you can open in a new tab. Refuses a governing metaphor entirely
  (the user re-rolled two fully-worked ones and steered "simple and direct,
  no analogies"), and refuses the agency default it would otherwise fall
  into: dark gradient hero, invented stat counters, icon feature-cards.

  OWN-WORLD: Near-white paper ground, near-black ink, hairline rules, and
  one reserved action green that only ever means WhatsApp. Every scrap of
  colour on the page comes from real screenshots of real client sites in
  quiet browser frames showing their live address. Schibsted Grotesk alone,
  worked hard; Geist Mono only for machine addresses.

  STORY: She reads one sentence and knows what this is. She names her own
  problem in the diagnostic and gets back an ordered prescription. She finds
  her own kind of business in "who it's for" and sees a real client like her.
  She messages from wherever she stopped reading.

  FIRST VIEWPORT: One sentence at up to 5rem, centred on the aurora, with a
  plain paragraph and the WhatsApp action beneath it. A strip of all six live
  client sites sits immediately under it.

  FORM: Canon, played straight. Craft bar set by the user at Stripe / Linear.
  Staging is the plain document: one column, generous rhythm, no staging
  device. Seed keys fb5c7e61 and 0d36f744, both re-rolled and discharged.

  STRUCTURE (2026-07-27): skeleton adapted from hyros.com at the user's
  request. What did NOT transfer is the half of that engine running on
  aggregate stats, headshot testimonials and a logo wall: PRODUCT.md records
  none of those, so those slots are absent rather than invented.

  DIAGNOSTIC (2026-07-28): the "two problems" section became a seven-question
  questionnaire. She names the leak herself and is handed an ordered
  prescription rather than a pitch. It is also the lead form: the finished
  answers leave as a pre-written WhatsApp message, not an email capture.

  SOLE DIRECTION (2026-07-28): Pasar Malam removed at the user's request.
  This is now the site.
-->`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-MY">
      <body
        className={`v2 ${schibsted.variable} ${geistMono.variable} antialiased`}
      >
        <div hidden dangerouslySetInnerHTML={{ __html: CONTRACT }} />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
