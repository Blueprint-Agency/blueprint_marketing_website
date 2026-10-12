import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  /**
   * Client proposals live as standalone documents in public/proposals.
   *
   * They are not app routes and deliberately do not import plain.css: each
   * one carries its own copy of the tokens, because a proposal is sent to
   * one company, is edited after it is sent, and must keep looking exactly
   * as it did the day it was shown. Coupling it to the site's stylesheet
   * would mean a later design change silently rewriting a document someone
   * has already signed against.
   *
   * The rewrite is only so the link can be sent without a file extension.
   * See app/robots.ts: /proposals is disallowed, and each document also
   * carries its own noindex.
   */
  /**
   * Belt and braces for the special projects: the page carries a noindex meta
   * tag and robots.txt disallows /projects/, but a header also covers the
   * images, CSS and JS under it, which a meta tag cannot.
   */
  async headers() {
    return [
      {
        source: "/projects/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/proposals/:slug",
        destination: "/proposals/:slug.html",
      },
      /**
       * Special projects: client sites rebuilt here as standalone static
       * pages (own HTML, CSS, JS and assets under public/projects/<slug>/),
       * e.g. the AQ Energy WordPress migration test. Same isolation reason as
       * the proposals: they carry another company's design system and must
       * not pick up plain.css. Disallowed in app/robots.ts and noindexed.
       */
      {
        source: "/projects/:slug",
        destination: "/projects/:slug/index.html",
      },
    ];
  },
};

export default nextConfig;
