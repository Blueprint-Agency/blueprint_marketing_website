"use client";

import { GoogleG, InstagramMark, PlayMark, WhatsAppMark } from "./Marks";
import { Reveal } from "./SeoArt";

/**
 * The hero drawings for the Google Ads and Meta Ads pages.
 *
 * The SEO page's hero is a report; these two are deliberately not, so the
 * three service pages are told apart at first sight (user's call,
 * 2026-10-07). Each draws the moment its channel exists for:
 *
 *  - GOOGLE: a results page, and your ad dropping into the top slot above
 *    the free results, then the WhatsApp tap it earns.
 *  - META: a phone feed scrolling past, stopping on your ad, and the chat
 *    that opens when she taps it.
 *
 * Same rules as every drawing on the site: a generic business, no figures,
 * aria-hidden, motion held until on screen and off under reduced motion.
 */

export function GoogleHero() {
  return (
    <Reveal className="seo-hero-art gh">
      <div className="sa-frame sa-tone-1" aria-hidden="true">
        <div className="sa-ui">
          <div className="sa-search">
            <GoogleG size={12} />
            <span className="sa-query">facial bangsar open now</span>
            <span className="sa-mag" />
          </div>
          <div className="gh-results">
            <div className="gh-slot">
              <div className="gh-ad">
                <span className="gh-spon">Sponsored</span>
                <span className="sa-url">
                  your-business.com.my/facial-bangsar
                </span>
                <span className="gh-title">
                  Facial in Bangsar, book tonight
                </span>
                <span className="sa-chips">
                  <span className="sa-chip">Open till 9pm</span>
                  <span className="sa-chip">Prices listed</span>
                </span>
              </div>
            </div>
            {[1, 2, 3].map((n) => (
              <div className="gh-org" key={n}>
                <span className="sa-url">competitor-{n}.com.my</span>
                <span className="sa-line" />
                <span className="sa-line sa-short" />
              </div>
            ))}
          </div>
          <span className="gh-toast">
            <WhatsAppMark size={11} />
            New lead from this ad
          </span>
        </div>
        <span className="sa-pill">Top of the page</span>
      </div>
    </Reveal>
  );
}

export function MetaHero() {
  return (
    <Reveal className="seo-hero-art mh">
      <div className="sa-frame sa-tone-2 mh-frame" aria-hidden="true">
        <div className="mh-phone">
          <div className="mh-bar">
            <InstagramMark size={11} />
            <span>Feed</span>
          </div>
          <div className="mh-viewport">
            <div className="mh-track">
              <div className="mh-post" />
              <div className="mh-post is-alt" />
              <div className="mh-post is-ad">
                <div className="mh-ad-head">
                  <span className="sa-avatar" />
                  <span className="mh-ad-who">
                    <b>Your business</b>
                    <i>Sponsored</i>
                  </span>
                </div>
                <div className="mh-ad-media">
                  <span className="sa-play">
                    <PlayMark size={12} />
                  </span>
                </div>
                <span className="mh-ad-cta">Send message</span>
              </div>
              <div className="mh-post" />
            </div>
          </div>
          <div className="mh-chat">
            <div className="mh-chat-head">
              <WhatsAppMark size={12} />
              <b>Your business</b>
            </div>
            <span className="mh-bub is-in">Hi, any slot tonight?</span>
            <span className="mh-bub is-out">
              Yes, 8pm in Bangsar. Shall I book it?
            </span>
          </div>
        </div>
        <span className="sa-pill">Stopped mid-scroll</span>
      </div>
    </Reveal>
  );
}
