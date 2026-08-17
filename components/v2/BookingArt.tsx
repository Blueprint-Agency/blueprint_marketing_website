/**
 * Reserve Today, drawn. Four screens of the booking platform, built as
 * real HTML and CSS in the same vocabulary ServiceArt already uses.
 *
 * WHY DRAWN AND NOT CAPTURED
 * --------------------------
 * The sibling service pages carry screenshots because their proof IS the
 * screenshot: /services/web-design shows client sites at their live
 * addresses, and the address is the claim. A booking system has no such
 * address to show. What it has is an operator's console holding one
 * studio's real members, real balances and real teachers, and none of that
 * belongs in a marketing capture.
 *
 * So this follows ServiceArt, JobArt and QualArt instead: interfaces drawn
 * as interfaces. Type stays crisp at any density, the copy changes without
 * a re-shoot, and there is nothing in any of these frames that had to be
 * taken out of somebody's account.
 *
 * The page labels them as drawings underneath. Do not remove that line.
 *
 * THREE CONSTRAINTS, INHERITED FROM ServiceArt UNCHANGED
 * ------------------------------------------------------
 * 1. NO FIGURES THAT COULD BE READ AS A RESULT. There is money on the
 *    payroll screen because a payroll screen with no money on it is not a
 *    payroll screen, and it is a teacher's pay for a fortnight rather than
 *    a studio's revenue. No total takings, no growth, no month over month.
 *    PRODUCT.md records no outcome for this platform and nothing here may
 *    imply one.
 * 2. NO REAL STUDIO'S DATA. Every name below is invented and every one is
 *    obviously generic. Yoga Sadhana runs this product and its members are
 *    real people; they are not in these frames.
 * 3. Everything is aria-hidden. The prose beside each screen carries the
 *    meaning, and a screen reader should not have to wade through drawn
 *    interface text to reach it.
 *
 * SCALE. Every frame sizes its type from `container-type: inline-size` on
 * the stage above it, so one drawing is legible in a 340px column and does
 * not become a poster at 700px. That is why the sizes in the new CSS are
 * in `em` and `cqw` rather than pixels.
 */

function Frame({
  tone,
  caption,
  children,
}: {
  tone: number;
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`sa-frame sa-tone-${tone}`} aria-hidden="true">
      <div className="sa-ui">{children}</div>
      <span className="sa-pill">{caption}</span>
    </div>
  );
}

function Bar({
  title,
  right,
}: {
  title: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="sa-bar">
      <span className="sa-mini-mark">R</span>
      <span className="sa-app">{title}</span>
      {right && <span className="sa-bar-right">{right}</span>}
    </div>
  );
}

/* ---------- 01 the schedule ----------
   The owner's week. The argument this drawing makes is in its fourth
   column: Thursday evening is struck out and greyed under a teacher's
   name, because the leave was approved in the same system. Every other
   screen in this set exists to make that one column possible. */
function ArtScheduler() {
  const week: { day: string; classes: { time: string; name: string; who: string; state?: string }[] }[] = [
    {
      day: "Mon",
      classes: [
        { time: "07:00", name: "Vinyasa", who: "Studio A" },
        { time: "18:30", name: "Hatha", who: "Studio A" },
      ],
    },
    {
      day: "Tue",
      classes: [
        { time: "09:30", name: "Reformer", who: "Studio B" },
        { time: "19:00", name: "Yin", who: "Studio A" },
      ],
    },
    {
      day: "Wed",
      classes: [
        { time: "07:00", name: "Vinyasa", who: "Studio A" },
        { time: "12:15", name: "Private", who: "Studio B", state: "soft" },
      ],
    },
    {
      day: "Thu",
      classes: [
        { time: "09:30", name: "Reformer", who: "Studio B" },
        { time: "18:30", name: "On leave", who: "Blocked", state: "off" },
      ],
    },
    {
      day: "Fri",
      classes: [
        { time: "07:00", name: "Vinyasa", who: "Studio A" },
        /* The third line is the room on every other block and the state on
           this one, which is what a compact calendar block does with its
           one spare line. It has to be the word: the full class is marked
           by an ink border now rather than by a coloured edge, and an ink
           border on a 9px block is a difference nobody reads on its own. */
        { time: "18:30", name: "Flow", who: "Full", state: "full" },
      ],
    },
  ];

  return (
    <Frame tone={0} caption="The week, every room">
      <Bar
        title="Schedule"
        right={
          <span className="sa-chips">
            <span className="sa-chip is-on">Bangsar</span>
            <span className="sa-chip">Mont Kiara</span>
          </span>
        }
      />
      <div className="bk-week">
        {week.map((d) => (
          <div className="bk-day" key={d.day}>
            <span className="bk-day-name">{d.day}</span>
            {d.classes.map((c) => (
              <span
                className={`bk-class${c.state ? ` is-${c.state}` : ""}`}
                key={c.time + c.name}
              >
                <b>{c.time}</b>
                <i>{c.name}</i>
                <u>{c.who}</u>
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="sa-foot">
        <span className="sa-dot is-live" />
        <span className="sa-muted">Rooms held, not just slots</span>
        <span className="sa-chip is-on" style={{ marginLeft: "auto" }}>
          2 studios
        </span>
      </div>
    </Frame>
  );
}

/* ---------- 02 what a member sees ----------
   The half most booking demos skip. Her balance is the first thing on the
   screen because it is the first thing she wants, and the payment row at
   the foot is the whole Malaysian argument: a member asked for a foreign
   card at midnight closes the tab. */
function ArtMember() {
  return (
    <Frame tone={1} caption="Her account, your address">
      <Bar
        title="Book a class"
        right={<span className="sa-muted">studio.reservetoday.co</span>}
      />
      <div className="bk-bal">
        <span className="bk-bal-n">8</span>
        <span className="bk-bal-l">
          credits left
          <em>Unlimited monthly, renews 1 Sep</em>
        </span>
      </div>
      <div className="sa-rows">
        <div className="sa-row">
          <span className="bk-t">07:00</span>
          <span className="sa-name">Vinyasa</span>
          <span className="sa-cta is-act" style={{ marginLeft: "auto" }}>
            Book
          </span>
        </div>
        <div className="sa-row">
          <span className="bk-t">09:30</span>
          <span className="sa-name">Reformer</span>
          {/* Was "Waitlist" until the claim was traced and found to have no
              source. See the note in lib/booking.ts. "Full" is a state the
              scheduler drawing already shows and the data supports. */}
          <span className="sa-chip" style={{ marginLeft: "auto" }}>
            Full
          </span>
        </div>
        <div className="sa-row">
          <span className="bk-t">18:30</span>
          <span className="sa-name">Hatha</span>
          <span className="sa-chip is-act" style={{ marginLeft: "auto" }}>
            Booked
          </span>
        </div>
      </div>
      <div className="sa-foot">
        <span className="sa-muted">Pay with</span>
        <span className="sa-chips">
          <span className="sa-chip">Card</span>
          <span className="sa-chip">FPX</span>
          <span className="sa-chip">DuitNow</span>
          <span className="sa-chip">TnG</span>
        </span>
      </div>
    </Frame>
  );
}

/* ---------- 03 staff and leave ----------
   Two halves of one screen, and the arrow between them is the product.
   A leave calendar that does not reach the scheduler is a shared Google
   Calendar with a login, which is what most studios already have and what
   already failed them. */
function ArtLeave() {
  return (
    <Frame tone={2} caption="Approved, and the class closes">
      <Bar
        title="Leave"
        right={<span className="sa-chip is-on">1 waiting</span>}
      />
      <div className="bk-req">
        <span className="bk-av">SL</span>
        <span className="bk-req-who">
          <b>Teacher, evening classes</b>
          <em>Thu 18:30, one day</em>
        </span>
        <span className="sa-cta is-act">Approve</span>
      </div>
      <span className="bk-arrow" />
      <div className="bk-after">
        <span className="bk-after-l">Thursday, after approval</span>
        <div className="sa-slots">
          <span className="sa-slot">17:00</span>
          <span className="sa-slot is-taken">18:30</span>
          <span className="sa-slot">20:00</span>
        </div>
      </div>
      <div className="sa-foot">
        <span className="sa-dot is-warn" />
        <span className="sa-muted">Blocked before anybody can book it</span>
      </div>
    </Frame>
  );
}

/* ---------- 04 payroll and takings ----------
   Money is on this screen because a payroll run without money on it is not
   a payroll run. It is two teachers' pay for a fortnight, which is a
   description of the feature. It is not a studio's revenue, not a total,
   and not a change over time, because any of those would read as a result
   this site has no right to claim. See the constraints at the top. */
function ArtMoney() {
  const run = [
    ["Teacher A", "14 classes", "RM 1,120"],
    ["Teacher B", "9 classes", "RM 720"],
    ["Teacher C", "6 classes", "RM 480"],
  ];
  return (
    <Frame tone={3} caption="The run, already worked out">
      <Bar
        title="Payroll"
        right={<span className="sa-muted">1 to 15 Aug</span>}
      />
      <div className="sa-rows">
        {run.map(([who, n, pay]) => (
          <div className="sa-row" key={who}>
            <span className="sa-name">{who}</span>
            <span className="sa-muted">{n}</span>
            <span className="bk-pay">{pay}</span>
          </div>
        ))}
      </div>
      <div className="bk-tiles">
        <span className="bk-tile">
          <b>Commission</b>
          <i>On retail and packages</i>
        </span>
        <span className="bk-tile">
          <b>Store</b>
          <i>Mats, grips, towels</i>
        </span>
      </div>
      <div className="sa-foot">
        <span className="sa-dot is-live" />
        <span className="sa-muted">Built from attendance, not from paper</span>
      </div>
    </Frame>
  );
}

const ART: Record<string, () => React.JSX.Element> = {
  scheduler: ArtScheduler,
  member: ArtMember,
  leave: ArtLeave,
  money: ArtMoney,
};

export default function BookingArt({ id }: { id: string }) {
  const Art = ART[id];
  return Art ? <Art /> : null;
}
