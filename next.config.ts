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
  async rewrites() {
    return [
      {
        source: "/proposals/:slug",
        destination: "/proposals/:slug.html",
      },
    ];
  },
};

export default nextConfig;
