"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import PlanMatrix from "./PlanMatrix";
import {
  ADDONS,
  MONTHS_FREE,
  PLANS,
  annualMonthly,
  annualSavingPct,
  annualTotal,
  ringgit,
} from "@/lib/pricing";

/**
 * The Reserve Today price list — four plans, each covering a number of
 * locations rather than multiplying by them, a billing switch, and the
 * add-ons.
 *
 * WHY IT OPENS ON THE YEARLY RATE
 * -------------------------------
 * Reversed on 2026-08-15 after reading four competitors instead of one.
 * Rezerv, Vibefam and Schedulah all headline the annual-billed rate, so a
 * page that opens on the true monthly reads about 20% more expensive than
 * it is to a buyer skimming three tabs.
 *
 * This is NOT the bait that reasoning was originally meant to avoid. The
 * bait is printing one number and charging another at checkout; here both
 * numbers are on the same control, the switch says which is which, and the
 * yearly card carries the full annual total underneath it. See the note
 * over annualMonthly() in lib/pricing.ts.
 *
 * WHY LOCATIONS SIT IN THE PRICE BLOCK
 * ------------------------------------
 * "Up to two locations" is the line that beats Vibefam on structure — they
 * bundle two into every tier and bill nothing extra, and until this page
 * says the same thing in the same place, the reader assumes the worse
 * answer. It goes above the fold of the card, not into the feature list,
 * because a reader who has to hunt for it has already left.
 *
 * WHY THE SWITCH IS TWO BUTTONS AND NOT A TOGGLE
 * ----------------------------------------------
 * A styled checkbox reads as a settings control and gives a screen reader
 * "checked" for an answer to a question with two named options. Two buttons
 * in a group, each announcing whether it is the current one, says the thing
 * that is actually true. It also means the labels are always both visible,
 * so nobody has to flip it to find out what the other side says.
 *
 * WHAT THIS COMPONENT MUST NOT GROW
 * ---------------------------------
 * No countdown, no "limited time", no struck-through anchor price, no seat
 * counter. Every one of them is available and every one of them would be
 * the first invented number on this site — see the hard rules at the top of
 * lib/pricing.ts and lib/rebuilds.ts. If a genuine promotion ever runs, it
 * belongs in lib/pricing.ts with a date attached, not hardcoded here.
 */
export default function Pricing({ ctaHref }: { ctaHref: string }) {
  /* Opens on yearly. See the note above, and annualMonthly() in
     lib/pricing.ts, before flipping this back. */
  const [annual, setAnnual] = useState(true);

  return (
    <section
      className="band band-sunk"
      id="pricing"
      aria-labelledby="pricing-h"
    >
      <div className="shell">
        <div className="col">
          <p className="eyebrow">What it costs</p>
          <h2 className="h2" id="pricing-h" style={{ maxWidth: "20ch" }}>
            Your second studio should not double the <em>bill</em>.
          </h2>
          <p className="prose" style={{ marginTop: 22 }}>
            No per-booking fee, no cut of what you sell, no charge per member.
            Each plan covers a set number of studios rather than billing you for
            each one, and the parts that decide whether a member trusts you with
            their money are on every plan there is.
          </p>
        </div>

        {/* ---------- billing switch ----------
            Labelled by the same text a reader sees, so the group announces
            "Billing" rather than an unnamed pair of buttons. */}
        <div className="pr-switch-row">
          <div className="pr-switch" role="group" aria-label="Billing period">
            <button
              type="button"
              className="pr-switch-btn"
              aria-pressed={!annual}
              onClick={() => setAnnual(false)}
            >
              Monthly
            </button>
            <button
              type="button"
              className="pr-switch-btn"
              aria-pressed={annual}
              onClick={() => setAnnual(true)}
            >
              Yearly
            </button>
          </div>
          <p className="small pr-switch-note">
            {MONTHS_FREE} months free when you pay for the year
          </p>
        </div>

        {/* ---------- the plans ---------- */}
        <ul className="pr-deck">
          {PLANS.map((plan) => {
            const shown =
              plan.monthly === null
                ? null
                : annual
                  ? annualMonthly(plan.monthly)
                  : plan.monthly;

            return (
              <li
                className={`pr-card${plan.popular ? " pr-card-pick" : ""}`}
                key={plan.id}
              >
                <div className="pr-card-head">
                  <h3 className="h3 pr-name">
                    {plan.name}
                    {plan.popular && (
                      <span className="pr-flag">Most studios</span>
                    )}
                  </h3>

                  <p className="pr-price">
                    {shown === null ? (
                      /* Not "Talk to us" — that is what the button
                         underneath already says, and the two stacked read
                         as a stutter. This slot answers "what does it
                         cost", so it answers it. */
                      "By quote"
                    ) : (
                      <>
                        <span className="pr-cur">RM</span>
                        {ringgit(shown)}
                        {/* Only on yearly. On monthly there is no saving
                            to state, and a greyed-out badge promising one
                            is an advertisement rather than a price. */}
                        {annual && (
                          <span className="pr-save">
                            Save {annualSavingPct()}%
                          </span>
                        )}
                      </>
                    )}
                  </p>
                  <p className="small pr-unit">
                    {plan.monthly === null ? "flat, billed yearly" : "a month"}
                  </p>
                  <p className="pr-locations">{plan.locations}</p>

                  {/* Only on yearly, and only where there is a figure to
                      total. On monthly this line would be an invitation to
                      do arithmetic the card has not asked for. */}
                  {annual && plan.monthly !== null && (
                    <p className="small pr-billed">
                      RM {ringgit(annualTotal(plan.monthly))} billed once a year
                    </p>
                  )}

                  <p className="small pr-fits">{plan.fits}</p>
                </div>

                <a
                  className={`btn btn-sm ${plan.popular ? "btn-act" : "btn-line"} pr-cta`}
                  href={ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {/* The same label on all four. There is no self-serve
                      sign-up behind any of them, so two labels pointing at
                      one WhatsApp thread would be a distinction the reader
                      finds out was imaginary. */}
                  Book a demo
                </a>

                <p className="pr-list-label">{plan.listLabel}</p>
                <ul className="pr-list">
                  {plan.list.map((line) => (
                    <li key={line}>
                      <Check aria-hidden="true" size={15} strokeWidth={2.5} />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>

        <p className="small pr-foot">
          Prices exclude payment processing, which goes to the card provider
          rather than to us. Every plan starts with a demo rather than a free
          trial, so you see it running against your own timetable before you
          decide. Nothing is ever deleted on any plan: the reporting window is
          how far back one report can reach, not how long we keep your records.
        </p>

        {/* ---------- the full comparison ----------
            Sits between the cards and the add-ons: it answers "which one am
            I", which is the question a reader has immediately after the
            cards and long before she cares what a migration costs. See the
            note over MATRIX in lib/pricing.ts for why four cards are not
            enough on their own. */}
        <PlanMatrix />

        {/* ---------- add-ons ---------- */}
        <div className="pr-addons">
          <p className="eyebrow">Added when you need it</p>
          <dl className="pr-addon-list">
            {ADDONS.map((a) => (
              <div className="pr-addon" key={a.name}>
                <dt className="pr-addon-head">
                  <span className="pr-addon-name">{a.name}</span>
                  <span className="pr-addon-price mono">{a.price}</span>
                </dt>
                <dd className="small pr-addon-note">{a.note}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
