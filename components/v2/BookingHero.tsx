import { Check, Mail, Ticket, LayoutDashboard } from "lucide-react";
import { Reveal } from "./SeoArt";

/**
 * The hero drawing on /services/booking-system: one booking, made on a
 * member's phone, with the three things it sets off floating around it.
 * Modelled on WaHero on the WhatsApp automation page (user, 2026-10-08):
 * a light hero with the product shown working rather than described.
 *
 * WHAT IT SHOWS IS ON RECORD. A credit coming off a balance (credit
 * bundles), a confirmation email (email on 21 events), the booking landing
 * in the admin system, and a QR code for check-in. Names are invented.
 *
 * MOTION follows Reveal's contract: no class without JavaScript, so it
 * all simply shows; `is-armed` holds; `is-in` plays the lines in order
 * (each carries --i) and then the three floating cards. Switched off under
 * prefers-reduced-motion in plain.css. Everything is aria-hidden; the hero
 * copy carries the meaning.
 */

/* A fixed pattern rather than a random one, so server and client agree. */
const QR = [
  "1110111",
  "1010101",
  "1110111",
  "0001000",
  "1101011",
  "0110110",
  "1011101",
];

export default function BookingHero() {
  return (
    <Reveal className="bkh-art" threshold={0.2}>
      <div className="bkh-stage" aria-hidden="true">
        <div className="bkh-phone">
          <div className="bkh-notch" />
          <div className="bkh-top">
            <span className="bkh-back">&lsaquo;</span>
            <b>Book a class</b>
          </div>

          <div className="bkh-line bkh-class" style={{ "--i": 0 } as React.CSSProperties}>
            <span className="bkh-tag">3 spots left</span>
            <b>Reformer</b>
            <span>Tue, 09:30 &middot; 50 min</span>
            <span>Studio B &middot; with Mei</span>
          </div>

          <div className="bkh-line bkh-pay" style={{ "--i": 1 } as React.CSSProperties}>
            <span>Pay with</span>
            <b>1 credit</b>
          </div>

          <div className="bkh-line bkh-cta" style={{ "--i": 2 } as React.CSSProperties}>
            Book with 1 credit
          </div>

          <div className="bkh-line bkh-done" style={{ "--i": 3 } as React.CSSProperties}>
            <span className="bkh-tick">
              <Check size={16} strokeWidth={3} />
            </span>
            <div>
              <b>You&rsquo;re booked</b>
              <span>Show this at the door</span>
            </div>
            <svg className="bkh-qr" viewBox="0 0 7 7" shapeRendering="crispEdges">
              {QR.flatMap((row, y) =>
                [...row].map((c, x) =>
                  c === "1" ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" /> : null,
                ),
              )}
            </svg>
          </div>
        </div>

        <span className="bkh-float f1">
          <i className="bkh-ico">
            <Ticket size={16} strokeWidth={2} />
          </i>
          <span>
            <b>Credit used</b> 7 left
          </span>
        </span>
        <span className="bkh-float f2">
          <i className="bkh-ico">
            <Mail size={16} strokeWidth={2} />
          </i>
          <span>
            <b>Confirmation emailed</b> Reminder set
          </span>
        </span>
        <span className="bkh-float f3">
          <i className="bkh-ico">
            <LayoutDashboard size={16} strokeWidth={2} />
          </i>
          <span>
            <b>Admin</b> New booking, Reformer 09:30
          </span>
        </span>
      </div>
    </Reveal>
  );
}
