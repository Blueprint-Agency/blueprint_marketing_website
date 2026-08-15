/**
 * Confirmed product facts only. Anything not recorded in PRODUCT.md
 * does not belong in this file — and must not be invented to fill it.
 */

export const SITE = {
  name: "Blueprint",
  legalName: "Blueprint Agency",
  /**
   * NOT CONFIRMED — no domain is recorded in PRODUCT.md.
   *
   * This value feeds metadataBase, every canonical URL, sitemap.xml and
   * robots.txt. It deliberately falls back to localhost rather than a
   * guessed domain, so nothing ships pointing search engines at an address
   * that may not be yours. Set NEXT_PUBLIC_SITE_URL before deploying.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:4310",
  email: "askblueprintagency@gmail.com",
  /** Confirmed 2026-07-26. Digits only, no plus, no spaces. */
  whatsappNumber: "60126286586",
  whatsappDisplay: "+60 12-628 6586",
} as const;

/**
 * Every primary CTA goes through here. A prefilled message means she never
 * faces an empty compose box — the single biggest drop-off on a WhatsApp
 * funnel — and it demonstrates the automation being sold.
 */
export function whatsapp(message: string): string {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const WA = {
  general: whatsapp(
    "Hi Blueprint, I run a business in Malaysia and I'd like to talk about getting more customers in.",
  ),
  // No pricing or free-offer commitment is recorded in PRODUCT.md, so this
  // must not assert one on the user's behalf.
  audit: whatsapp(
    "Hi Blueprint, I'd like to talk about where my business is losing customers.",
  ),
  fromWork: (client: string) =>
    whatsapp(
      `Hi Blueprint, I saw what you did for ${client} and I'd like something similar for my business.`,
    ),
  /**
   * /services/video-production. Names the shoot rather than the service, so
   * the first line of the thread is already the thing she wants to talk
   * about. No format, budget or date is asserted on her behalf.
   */
  shoot: whatsapp(
    "Hi Blueprint, I'd like to talk about getting a video made for my business.",
  ),
  /**
   * /services/web-design. Names the website rather than "branding", because
   * the website is what the reader has just spent the page looking at and it
   * is the thing she can picture. No timeline, budget or page count is
   * asserted on her behalf.
   */
  rebuild: whatsapp(
    "Hi Blueprint, I'd like to talk about rebuilding my website.",
  ),
  /**
   * /services/booking-system. The only CTA on the site that follows a
   * published price, so it names the demo rather than an open-ended
   * conversation — a reader who has just read a price list and tapped
   * "Book a demo" should not open a thread that says something else.
   *
   * There is no self-serve trial, which is why this says demo and not
   * sign-up. If a trial is ever offered, this string and the note under
   * the plans both have to change together.
   *
   * No plan is named: she may well have read three of them and picked a
   * fourth.
   */
  booking: whatsapp(
    "Hi Blueprint, I'd like to book a demo of the booking system for my studio.",
  ),
} as const;
