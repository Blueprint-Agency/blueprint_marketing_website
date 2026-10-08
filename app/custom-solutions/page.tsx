import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/ui/hero-dithering-card";
import { Nav, Footer } from "@/components/v2/Chrome";
import {
  BuildArt,
  CustomHero,
  IndustryExplorer,
  type Industry,
} from "@/components/v2/CustomArt";
import { SITE, WA } from "@/lib/site";

/**
 * /custom-solutions: CRM & Pipelines, Web & Mobile Apps, AI Agents &
 * Workflows and Custom Software, merged into one page (user, 2026-10-08).
 *
 * The second systems page, in the same family as the WhatsApp page (light
 * hero, show rather than argue) but with its own centrepiece: an explorer
 * that lays out what we can build for each industry.
 *
 * WHAT THE USER CONFIRMED (2026-10-08)
 * ------------------------------------
 * - Industries: clinics and wellness, retail and product brands, property
 *   and big-ticket sales, studios and membership.
 * - Built as a mix: custom code where it matters, proven platforms where
 *   they fit.
 * - Ownership is agreed per project.
 * - The delivery method is Audit, Architect, Build, Scale.
 * - After launch: a monthly maintenance plan.
 * - The offer is a free consultation.
 * - No projects shown, not even anonymised: see CustomArt.tsx. Every module
 *   is something we CAN build. Never word it as something we have built.
 *
 * No price and no timeline, because none was given.
 */

export const metadata: Metadata = {
  title: "Custom Solutions",
  description:
    "Custom CRMs, apps, AI agents and internal tools for businesses in Malaysia that have outgrown spreadsheets and off-the-shelf software. See what we can build for clinics, retail brands, property and big-ticket sales, and studios.",
  alternates: { canonical: "/custom-solutions" },
  openGraph: {
    title: "Custom Solutions · Blueprint",
    description:
      "CRMs, apps, AI agents and internal tools, built around how your business actually runs.",
    url: "/custom-solutions",
    type: "article",
  },
};

const KINDS: { id: string; title: string; body: string; eg: string[] }[] = [
  {
    id: "crm",
    title: "CRM and pipelines",
    body: "Every lead in one place, moving through your real sales stages, with the next follow-up already scheduled.",
    eg: ["Lead pipelines", "Quotation tracking", "Follow-up reminders"],
  },
  {
    id: "apps",
    title: "Web and mobile apps",
    body: "Apps for your customers to book, buy and come back, or for your team to do the job on the move.",
    eg: ["Member apps", "Customer portals", "Field team apps"],
  },
  {
    id: "ai",
    title: "AI agents and workflows",
    body: "The repetitive work between a lead arriving and a customer being served, handled without a person, with a human where it matters.",
    eg: ["Lead qualifying", "Document handling", "Automated hand-offs"],
  },
  {
    id: "software",
    title: "Internal tools and dashboards",
    body: "The system behind the counter: operations, stock, branches and reports, built for how your team actually works.",
    eg: ["Multi-branch dashboards", "Stock and orders", "Staff tools"],
  },
];

const INDUSTRIES: Industry[] = [
  {
    id: "clinics",
    label: "Clinics & wellness",
    hub: "clinic",
    intro:
      "Clinics, aesthetics, spas, physio and chiro. Patients come back, buy packages and move between branches, and most of that lives in WhatsApp chats and paper.",
    modules: [
      {
        name: "Patient CRM",
        body: "Every enquiry from WhatsApp, the website and ads in one place, with the patient's history and the next follow-up beside it.",
        replaces: "WhatsApp chats and a notebook at the front desk",
      },
      {
        name: "Packages and credits",
        body: "Sessions sold, used and remaining, tracked per patient and honoured at every branch.",
        replaces: "Punch cards and a spreadsheet per branch",
      },
      {
        name: "Digital records and consent",
        body: "Intake forms, consent and before-and-after photos filled in on a tablet and attached to the patient's record.",
        replaces: "Paper forms in a filing cabinet",
      },
      {
        name: "Recall and rebooking",
        body: "Patients reminded when their next session or review is due, so the second visit happens without someone remembering to chase it.",
        replaces: "Staff remembering to follow up",
      },
      {
        name: "Multi-branch dashboard",
        body: "Revenue, bookings and therapist schedules by outlet, on one screen, every day.",
        replaces: "End-of-day reports sent in a WhatsApp group",
      },
      {
        name: "AI enquiry assistant",
        body: "Answers treatment questions from your own approved information and books the consultation, handing anything clinical to your team.",
        replaces: "The same ten questions answered by hand",
      },
    ],
  },
  {
    id: "retail",
    label: "Retail & product brands",
    hub: "brand",
    intro:
      "Brands selling through dealers, showrooms or their own shop. The product moves through many hands, and the information about it rarely keeps up.",
    modules: [
      {
        name: "Dealer portal",
        body: "Dealers check stock and price lists and place orders themselves, any hour, without calling your sales team.",
        replaces: "Phone calls and an emailed price list",
      },
      {
        name: "Warranty registration",
        body: "Customers register a product by scanning a QR code, and you finally know who owns what.",
        replaces: "Paper warranty cards nobody posts back",
      },
      {
        name: "Service and repair tracking",
        body: "Service jobs logged, assigned and followed through, with the customer kept up to date.",
        replaces: "A whiteboard and a lot of phone calls",
      },
      {
        name: "Stock and order dashboard",
        body: "Stock across the warehouse, showrooms and dealers, and orders in progress, in one view.",
        replaces: "Three spreadsheets that disagree",
      },
      {
        name: "Sales team CRM",
        body: "Leads from showrooms, events and online assigned to the right person and followed up on time.",
        replaces: "Leads written on the back of a brochure",
      },
      {
        name: "AI product assistant",
        body: "Answers spec, compatibility and stockist questions from your own catalogue, at any hour.",
        replaces: "Sales staff answering the same questions all day",
      },
    ],
  },
  {
    id: "property",
    label: "Property & big-ticket sales",
    hub: "sales team",
    intro:
      "Property, solar, renovation, education and anything people research for weeks. The sale is long, and most of it is lost to a follow-up that never happened.",
    modules: [
      {
        name: "Sales pipeline CRM",
        body: "Every lead moving from enquiry to signed, with who owns it, what happened last and what happens next.",
        replaces: "A spreadsheet only one person understands",
      },
      {
        name: "Quotation builder",
        body: "Branded quotes put together in minutes from your own price book, and a note when the customer opens one.",
        replaces: "Quotes rebuilt in Word every time",
      },
      {
        name: "Site visit scheduling",
        body: "Visits and surveys booked, assigned to the right person, with photos and notes from site attached to the lead.",
        replaces: "A shared calendar and a camera roll",
      },
      {
        name: "Follow-up sequences",
        body: "Messages that keep a long decision warm over weeks, timed to the stage the customer is at.",
        replaces: "Hoping someone remembers to call back",
      },
      {
        name: "AI lead qualifier",
        body: "Asks budget, timeline and location before your team spends an hour on a call, and books the ones worth it.",
        replaces: "Sales calls with people who were never buying",
      },
      {
        name: "Customer progress portal",
        body: "Customers see where their project is, from signed to handed over, without calling to ask.",
        replaces: "'Any update?' messages every week",
      },
    ],
  },
  {
    id: "studios",
    label: "Studios & membership",
    hub: "studio",
    intro:
      "Gyms, yoga, classes and anything people pay to come back to. The business is the repeat visit, and the system has to make coming back easy.",
    modules: [
      {
        name: "Branded member app",
        body: "Members book, pay and see their credits in an app with your name on it, not a marketplace's.",
        replaces: "Booking through someone else's platform",
      },
      {
        name: "Loyalty and referrals",
        body: "Points, rewards and referral codes that bring members back and bring their friends.",
        replaces: "A stamp card",
      },
      {
        name: "Renewal and win-back",
        body: "Reminders before a membership runs out, and a nudge to the members who stopped coming.",
        replaces: "Noticing they left months later",
      },
      {
        name: "Instructor dashboard",
        body: "Schedules, class numbers and what each instructor is owed, without the month-end spreadsheet.",
        replaces: "A month-end spreadsheet",
      },
      {
        name: "Franchise and multi-studio reports",
        body: "Every location's members, classes and revenue side by side.",
        replaces: "Reports collected one studio at a time",
      },
      {
        name: "AI front desk",
        body: "Answers class, pricing and membership questions and books trials, any hour.",
        replaces: "Staff answering messages after closing",
      },
    ],
    note: (
      <>
        For class bookings, credits and QR check-in, our{" "}
        <Link href="/services/booking-system">booking system</Link> already does
        it out of the box. Custom work starts where that ends.
      </>
    ),
  },
];

const STEPS: { name: string; body: string; out: string }[] = [
  {
    name: "Audit",
    body: "We sit with your team and map how the work actually flows today: what lives in spreadsheets, chats and notebooks, and where time and leads go missing.",
    out: "A map of how you work now",
  },
  {
    name: "Architect",
    body: "We design the system around that, decide what is worth building and what a proven platform already does, and agree the scope with you.",
    out: "A plan and a quote",
  },
  {
    name: "Build",
    body: "We build it in stages, so your team uses the first parts while the rest is still being made, and tells us what to change.",
    out: "A working system",
  },
  {
    name: "Scale",
    body: "After launch, a monthly maintenance plan keeps it running, fixes what needs fixing and adds what the business grows into.",
    out: "A system that keeps up",
  },
];

const FAQ: { q: string; a: string[] }[] = [
  {
    q: "Do you build everything from scratch?",
    a: [
      "No, and that is on purpose. We write custom code where your process is genuinely yours, and use proven platforms where they already do the job well. It saves you time and money, and you end up with fewer moving parts to maintain.",
    ],
  },
  {
    q: "My industry is not on the list. Can you still help?",
    a: [
      "Very likely. The four industries are where these needs come up most, not a limit on what we build. Tell us how your business runs today and we will tell you what is worth building.",
    ],
  },
  {
    q: "Who owns it once it is built?",
    a: [
      "It depends on the project, and it is agreed with you before we start: who holds the code, the data and the accounts.",
    ],
  },
  {
    q: "What happens after launch?",
    a: [
      "A monthly maintenance plan keeps it running: support when something breaks, fixes, and small changes as the business changes.",
    ],
  },
  {
    q: "Can it connect to what we already use?",
    a: [
      "In most cases, yes: WhatsApp, calendars, spreadsheets, payment and accounting tools, wherever those tools allow it. We check exactly what connects during the audit.",
    ],
  },
  {
    q: "What does it cost, and how long does it take?",
    a: [
      "Both depend on what is being built. The free consultation is where we find out, and you get a scope and a quote after the audit, before any build starts.",
    ],
  },
];

export default function CustomSolutionsPage() {
  return (
    <>
      <Nav />

      <main id="main" className="acc-cs">
        {/* ---------------- the opening ---------------- */}
        <section className="wa-open cs-open">
          <div className="shell wa-open-grid">
            <div>
              <Link className="back-link" href="/#services">
                All services
              </Link>
              <h1 className="h1" style={{ maxWidth: "16ch", marginTop: 34 }}>
                Software built around how you <em>work</em>.
              </h1>
              <p className="lead" style={{ marginTop: 22, maxWidth: "44ch" }}>
                When the business has outgrown spreadsheets, notebooks and five
                apps that do not talk to each other, we build the system it
                needs: a CRM, a customer app, an AI agent, an internal tool, or
                all of them joined up.
              </p>
              <div className="cta-row wa-actions">
                <a
                  className="btn btn-act"
                  href={WA.customConsult}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book a free consultation
                </a>
                <a className="btn btn-line" href="#industries">
                  See what we build for you
                </a>
              </div>
            </div>
            <CustomHero />
          </div>
        </section>

        {/* ---------------- by industry ---------------- */}
        <section className="band band-sunk" id="industries">
          <div className="shell">
            <h2 className="h2" style={{ textAlign: "center" }}>
              What your industry usually <em>needs</em>.
            </h2>
            <p
              className="prose"
              style={{
                marginTop: 22,
                marginInline: "auto",
                maxWidth: "60ch",
                textAlign: "center",
              }}
            >
              Pick your industry, then tap any piece to see what it does and
              what it replaces. Take one, or join several into one system.
            </p>
            <IndustryExplorer industries={INDUSTRIES} />
          </div>
        </section>

        {/* ---------------- the four kinds ---------------- */}
        <section className="band">
          <div className="shell">
            <h2 className="h2" style={{ textAlign: "center" }}>
              Four kinds of build, one <em>team</em>.
            </h2>
            <div className="cs-kinds">
              {KINDS.map((k) => (
                <div className="cs-kind" key={k.id}>
                  <BuildArt id={k.id} />
                  <h3 className="h3">{k.title}</h3>
                  <p className="prose">{k.body}</p>
                  <span className="cs-eg">
                    {k.eg.map((e) => (
                      <i key={e}>{e}</i>
                    ))}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- how a project runs ---------------- */}
        <section className="band band-sunk">
          <div className="shell">
            <h2 className="h2" style={{ textAlign: "center" }}>
              How a project <em>runs</em>.
            </h2>
            <ol className="cs-steps">
              {STEPS.map((s, i) => (
                <li
                  className="cs-step"
                  key={s.name}
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <span className="cs-step-n mono">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="h3">{s.name}</h3>
                  <p className="prose">{s.body}</p>
                  <span className="cs-out">
                    <b>You get</b> {s.out}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------------- the consultation ---------------- */}
        <section className="wa-demo cs-consult">
          <div className="shell wa-demo-grid">
            <div>
              <p className="wa-demo-kicker">
                <span className="audit-dot" aria-hidden="true" />
                Free, no obligation to build
              </p>
              <h2 className="h2">
                Start with a free <em>consultation</em>.
              </h2>
              <p className="wa-demo-lead">
                Tell us how your business runs today. We will map where time and
                leads go missing, and tell you what is worth building, and what
                is not.
              </p>
              <a
                className="btn btn-act wa-demo-btn"
                href={WA.customConsult}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a free consultation
              </a>
            </div>
            <ol className="wa-demo-try cs-bring">
              <li>How a lead or order moves through the business today</li>
              <li>The spreadsheets and apps your team lives in</li>
              <li>The one job you would hand to a system tomorrow</li>
            </ol>
          </div>
        </section>

        {/* ---------------- questions ---------------- */}
        <section className="band band-sunk" id="faq">
          <div className="shell">
            <div className="col">
              <h2 className="h2">
                Questions owners <em>ask</em>.
              </h2>
              <div className="faq">
                {FAQ.map((f) => (
                  <details className="faq-item" key={f.q}>
                    <summary>
                      <span>{f.q}</span>
                      <span className="faq-mark" aria-hidden="true" />
                    </summary>
                    <div className="faq-a">
                      {f.a.map((para) => (
                        <p className="prose" key={para}>
                          {para}
                        </p>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
              <p className="prose" style={{ marginTop: 28 }}>
                Need the front desk handled first?{" "}
                <Link href="/whatsapp-automation-for-local-businesses">
                  See WhatsApp automation
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        <CTASection
          waHref={WA.customConsult}
          emailHref={`mailto:${SITE.email}`}
          phone={SITE.whatsappDisplay}
        />
      </main>

      <Footer />
    </>
  );
}
