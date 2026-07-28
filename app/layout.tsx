import type { Metadata, Viewport } from "next";
import { Archivo, Be_Vietnam_Pro, Shantell_Sans } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bevietnam",
  display: "swap",
});

const shantell = Shantell_Sans({
  subsets: ["latin"],
  variable: "--font-shantell",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Blueprint. The crowd is already walking past your door",
    template: "%s · Blueprint",
  },
  description:
    "Blueprint runs the marketing that brings customers to Malaysian businesses, and builds the booking, CRM and WhatsApp systems that catch them when they arrive.",
  openGraph: {
    type: "website",
    locale: "en_MY",
    url: SITE.url,
    siteName: "Blueprint",
    title: "Blueprint. The crowd is already walking past your door",
    description:
      "We make them stop, and we make sure you can serve them when they do. Marketing and the systems that catch it, for Malaysian businesses.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blueprint. The crowd is already walking past your door",
    description:
      "Marketing that brings people in, and the systems that catch them. For Malaysian businesses.",
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1c1039",
  colorScheme: "dark",
};

/* The direction contract. Emitted as a real HTML comment so it survives
   the production build and can be audited against the render. */
const CONTRACT = `<!--
  IMPECCABLE DIRECTION CONTRACT

  THESIS: The crowd already walks past her door; we make them stop and make
  sure she can serve them when they do. Refuses the dark-SaaS feature-card
  grid and the drafting-blueprint vernacular that preceded it.

  OWN-WORLD: Pasar malam at dusk. Indigo-plum sky, tungsten string lights,
  blue/white tarpaulin awnings, fluorescent counter tube, hot-pink and acid
  green marker on fluoro price card. Archivo black-condensed shouts,
  Be Vietnam Pro reads, Shantell Sans writes the numbers by hand.

  STORY: She recognises the lane. She sees who crosses and who walks on.
  She asks how. She walks past six stalls that are busy. She taps the chop.

  FIRST VIEWPORT: A horizontal seam. Above it, a lane of drifting figures.
  Below it, the lit stall whose docket fills as they cross; the labelled gate
  sits on the seam and the crossing travels downward through it. One geometry
  holds at every width. A full-size WhatsApp chop sits in the hero, above the
  lane, so the action is present before the demonstration.

  FORM: Pasar Malam — candidate 6 of the grounded list — staged as the dealt
  translation gate. Seed key 8eb867b2.
-->`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-MY">
      <body
        className={`${archivo.variable} ${beVietnam.variable} ${shantell.variable} font-body antialiased`}
      >
        <div hidden dangerouslySetInnerHTML={{ __html: CONTRACT }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-tungsten focus:px-4 focus:py-2 focus:text-ink focus:font-semibold focus:rounded"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
