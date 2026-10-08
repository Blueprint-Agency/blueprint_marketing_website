import {
  ArrowLeftRight,
  CalendarCheck,
  CalendarRange,
  ChartColumn,
  Check,
  CircleUser,
  CreditCard,
  Mail,
  Monitor,
  Package,
  QrCode,
  ShoppingBag,
  Smartphone,
  UserCog,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

/**
 * The two halves of Reserve Today, side by side: the booking site a member
 * uses, and the admin system the studio runs on. Replaced the four-screen
 * tour on 2026-10-08 at the user's direction, so the page shows the
 * product as two systems at a glance rather than one screen at a time.
 *
 * EVERY FEATURE NAMED HERE IS ON RECORD. The member side comes from the
 * old journey steps and the FAQ (the member's account); the admin side is
 * rows in MATRIX in lib/pricing.ts. Waitlists and cancellation windows are
 * not on record and are not here. Leave and payroll start at the Studio
 * plan, which is why the note under the section points at the price list.
 *
 * THE DRAWINGS FOLLOW BookingArt.tsx's RULES: invented, obviously generic
 * names, no figure that reads as a result, and aria-hidden, because the
 * feature lists carry the meaning. The page labels them as drawings.
 *
 * NOT "APP". There is no member app in the stores and the FAQ says so, so
 * the member side is called a booking site throughout.
 */

type Feature = { icon: LucideIcon; label: string };

const MEMBER: Feature[] = [
  { icon: CalendarCheck, label: "Browse and book classes" },
  { icon: ShoppingBag, label: "Buy credits, packages and memberships" },
  { icon: CreditCard, label: "Pay by card, FPX, DuitNow or Touch 'n Go" },
  { icon: Mail, label: "Email confirmations and reminders" },
  { icon: QrCode, label: "QR check-in at the door" },
  { icon: CircleUser, label: "Account, balance and settings" },
];

const ADMIN: Feature[] = [
  { icon: CalendarRange, label: "Every booking and the whole schedule" },
  { icon: Users, label: "Customers and their balances" },
  { icon: Package, label: "Products, packages and retail" },
  { icon: UserCog, label: "Staff, roles and leave" },
  { icon: Wallet, label: "Payroll and commission" },
  { icon: ChartColumn, label: "Reports and CSV export" },
];

function FeatureList({ items }: { items: Feature[] }) {
  return (
    <ul className="ts-list">
      {items.map(({ icon: Icon, label }) => (
        <li key={label}>
          <span className="ts-ico" aria-hidden="true">
            <Icon size={18} strokeWidth={1.9} />
          </span>
          {label}
        </li>
      ))}
    </ul>
  );
}

/* ---------- the member's booking site, drawn as a phone ---------- */
function MemberPhone() {
  const days = [
    ["Mon", "13"],
    ["Tue", "14"],
    ["Wed", "15"],
    ["Thu", "16"],
    ["Fri", "17"],
  ];
  const classes: { t: string; n: string; r: string; s: "book" | "booked" | "full" }[] = [
    { t: "07:00", n: "Vinyasa", r: "Studio A", s: "booked" },
    { t: "09:30", n: "Reformer", r: "Studio B", s: "book" },
    { t: "12:15", n: "Hatha", r: "Studio A", s: "book" },
    { t: "18:30", n: "Flow", r: "Studio A", s: "full" },
  ];
  return (
    <div className="ts-phone" aria-hidden="true">
      <div className="ts-notch" />
      <div className="ts-ph-top">
        <span className="ts-logo">R</span>
        <span className="ts-ph-title">Classes</span>
        <span className="ts-avatar" />
      </div>
      <div className="ts-balance">
        <span>Your credits</span>
        <b>8 left</b>
      </div>
      <div className="ts-days">
        {days.map(([d, n], i) => (
          <span key={d} className={i === 1 ? "is-on" : undefined}>
            <i>{d}</i>
            {n}
          </span>
        ))}
      </div>
      <div className="ts-classes">
        {classes.map((c) => (
          <div className="ts-class" key={c.t}>
            <span className="ts-time">{c.t}</span>
            <span className="ts-cname">
              {c.n}
              <i>{c.r}</i>
            </span>
            {c.s === "book" && <span className="ts-btn">Book</span>}
            {c.s === "booked" && (
              <span className="ts-btn is-done">
                <Check size={11} strokeWidth={3} /> Booked
              </span>
            )}
            {c.s === "full" && <span className="ts-btn is-full">Full</span>}
          </div>
        ))}
      </div>
      <div className="ts-tabs">
        <span className="is-on">Classes</span>
        <span>Shop</span>
        <span>Account</span>
      </div>
    </div>
  );
}

/* ---------- the admin system, drawn as a browser window ---------- */
function AdminWindow() {
  const nav = ["Bookings", "Schedule", "Customers", "Products", "Staff", "Payroll", "Reports"];
  const rows: { n: string; c: string; t: string; s: string; k: "in" | "paid" | "booked" }[] = [
    { n: "Aina R.", c: "Vinyasa", t: "07:00", s: "Checked in", k: "in" },
    { n: "Mei Ling T.", c: "Reformer", t: "09:30", s: "Paid, FPX", k: "paid" },
    { n: "Priya S.", c: "Reformer", t: "09:30", s: "Booked", k: "booked" },
    { n: "Daniel K.", c: "Private", t: "12:15", s: "Paid, card", k: "paid" },
    { n: "Hana Z.", c: "Hatha", t: "12:15", s: "Checked in", k: "in" },
    { n: "Sara L.", c: "Flow", t: "18:30", s: "Booked", k: "booked" },
  ];
  return (
    <div className="ts-window" aria-hidden="true">
      <div className="ts-chrome">
        <span />
        <span />
        <span />
        <em>admin.yourstudio.com</em>
      </div>
      <div className="ts-admin">
        <nav className="ts-side">
          <span className="ts-logo">R</span>
          {nav.map((n, i) => (
            <span key={n} className={i === 0 ? "is-on" : undefined}>
              {n}
            </span>
          ))}
        </nav>
        <div className="ts-main">
          <div className="ts-main-head">
            <b>Bookings</b>
            <span className="ts-chip">Today</span>
            <span className="ts-chip">Bangsar</span>
          </div>
          <div className="ts-table">
            <div className="ts-tr ts-th">
              <span>Customer</span>
              <span>Class</span>
              <span>Time</span>
              <span>Status</span>
            </div>
            {rows.map((r) => (
              <div className="ts-tr" key={r.n}>
                <span className="ts-who">
                  <i />
                  {r.n}
                </span>
                <span>{r.c}</span>
                <span>{r.t}</span>
                <span className={`ts-st is-${r.k}`}>{r.s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TwoSystems() {
  return (
    <div className="ts">
      <article className="ts-card ts-card-member">
        <div className="ts-stage">
          <MemberPhone />
        </div>
        <div className="ts-body">
          <p className="ts-kicker">
            <Smartphone size={16} strokeWidth={2} aria-hidden="true" />
            For your members
          </p>
          <h3 className="h3">The booking site</h3>
          <p className="ts-sub">
            Where customers book, buy and manage their own account, on your
            address, in any browser.
          </p>
          <FeatureList items={MEMBER} />
        </div>
      </article>

      <div className="ts-link" aria-hidden="true">
        <span>
          <ArrowLeftRight size={18} strokeWidth={2} />
        </span>
      </div>

      <article className="ts-card ts-card-admin">
        <div className="ts-stage">
          <AdminWindow />
        </div>
        <div className="ts-body">
          <p className="ts-kicker">
            <Monitor size={16} strokeWidth={2} aria-hidden="true" />
            For your team
          </p>
          <h3 className="h3">The admin system</h3>
          <p className="ts-sub">
            Where you run the business: bookings, customers, products and
            staff, across every location on your plan.
          </p>
          <FeatureList items={ADMIN} />
        </div>
      </article>
    </div>
  );
}
