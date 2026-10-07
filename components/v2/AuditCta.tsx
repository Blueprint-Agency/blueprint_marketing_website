"use client";

import { useState } from "react";
import { SITE, WA, whatsapp } from "@/lib/site";
import { GoogleG } from "./Marks";
import { Reveal } from "./SeoArt";

/**
 * The free website audit offer on /seo-for-local-businesses.
 *
 * The offer is the user's own (2026-10-07). It still ends in WhatsApp, as
 * every CTA on the site must: the field only composes the first message,
 * so she types her address once and lands in a thread that already says
 * what she wants. Without JavaScript the form posts to wa.me with the
 * address as the message, which is still a working thread.
 *
 * The card on the right is the audit drawn as it runs: the checks named
 * are the ones the page says we make, and none of them carries a figure.
 */

const CHECKS = [
  "How many visitors already knew your name",
  "Which competitors take the searches in your area",
  "The services and branches with no page of their own",
  "Where the site loses people before they tap WhatsApp",
];

export default function AuditCta() {
  const [site, setSite] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const url = site.trim();
    const href = url
      ? whatsapp(`Hi Blueprint, I'd like a free website audit. My website is: ${url}`)
      : WA.seoAudit;
    window.open(href, "_blank", "noopener,noreferrer");
  }

  return (
    <section className="audit" aria-labelledby="audit-h">
      <div className="shell audit-grid">
        <div className="audit-copy">
          <p className="audit-kicker">
            <span className="audit-dot" aria-hidden="true" />
            Free, for your business
          </p>
          <h2 className="h2" id="audit-h">
            Get a free website audit <em>now</em>.
          </h2>
          <p className="audit-lead">
            Send us your website. We will tell you how many of your Google
            visitors already knew your name, and who is getting the rest.
          </p>

          <form
            className="audit-form"
            action={`https://wa.me/${SITE.whatsappNumber}`}
            method="get"
            target="_blank"
            onSubmit={onSubmit}
          >
            <label className="audit-field">
              <span className="sr-only">Your website address</span>
              <GoogleG size={16} />
              <input
                name="text"
                type="text"
                inputMode="url"
                autoComplete="url"
                placeholder="your-business.com.my"
                value={site}
                onChange={(e) => setSite(e.target.value)}
              />
            </label>
            <button className="btn btn-act audit-btn" type="submit">
              Get my free audit
            </button>
          </form>
          <p className="audit-note">
            Opens WhatsApp with your address already filled in.
          </p>
        </div>

        <Reveal className="audit-card" threshold={0.3}>
          <div className="audit-card-bar" aria-hidden="true">
            <i />
            <i />
            <i />
            <span className="audit-card-url mono">your-business.com.my</span>
          </div>
          <div className="audit-scan" aria-hidden="true">
            <span className="audit-scan-line" />
          </div>
          <ul className="audit-checks">
            {CHECKS.map((c, i) => (
              <li
                className="audit-check"
                key={c}
                style={{ "--i": i } as React.CSSProperties}
              >
                <span className="audit-tick" aria-hidden="true" />
                {c}
              </li>
            ))}
          </ul>
          <div className="audit-card-foot" aria-hidden="true">
            <span className="audit-bar">
              <span className="audit-bar-fill" />
            </span>
            <span className="mono audit-done">Audit ready</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
