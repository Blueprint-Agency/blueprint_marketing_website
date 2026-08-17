import { Check, Minus } from "lucide-react";
import { MATRIX, PLANS } from "@/lib/pricing";

/**
 * The full plan comparison, under the four cards.
 *
 * WHY IT IS HERE
 * --------------
 * See the note over MATRIX in lib/pricing.ts for the argument. Short
 * version: the cards answer what it costs and cannot answer which one am
 * I, because each card's list says only what that plan ADDS to the one
 * before it. This table is the only place on the page a reader can find
 * the first plan that contains the one thing she came for.
 *
 * WHY IT IS A REAL TABLE
 * ----------------------
 * Because it is real tabular data, and the grid-of-divs version of this
 * component is the reason so many pricing pages are unusable with a screen
 * reader. Row and column headers are marked as headers, each group opens a
 * section whose heading is a `th` spanning the row, and every tick and
 * dash carries a word for the screen reader that the sighted reader gets
 * from the mark's shape. The `<caption>` is visually hidden rather than
 * absent, so the table announces what it is before its first cell.
 *
 * WHY IT SCROLLS SIDEWAYS ON A PHONE
 * ----------------------------------
 * Five columns do not fit at 390px and the alternatives are worse. Turning
 * it into four stacked lists reproduces the cards, which is what this
 * exists to be different from; dropping to two columns asks the reader to
 * choose the comparison before she has read it. So the table keeps its
 * shape, the first column stays pinned while the rest scrolls under it,
 * and a line above says so. `.pm-scroll` is focusable, which is required:
 * a scrolling region that cannot be reached by keyboard traps its content
 * for anybody not using a pointer.
 *
 * THE HIGHLIGHTED COLUMN IS THE SAME PLAN THE CARDS FLAG. It is read off
 * `plan.popular` rather than written down again here, so the two can never
 * disagree about which plan is being recommended.
 */
export default function PlanMatrix() {
  return (
    <div className="pm">
      <div className="pm-head">
        <h3 className="h3" id="pm-h">
          Every plan, side by side
        </h3>
        <p className="small pm-hint">
          Scrolls sideways on a narrow screen. The feature column stays put.
        </p>
      </div>

      <div
        className="pm-scroll"
        tabIndex={0}
        role="group"
        aria-labelledby="pm-h"
      >
        <table className="pm-table">
          <caption className="pm-caption">
            What each plan includes, compared across all four.
          </caption>
          <thead>
            <tr>
              <th scope="col" className="pm-corner">
                <span className="pm-vh">Feature</span>
              </th>
              {PLANS.map((p) => (
                <th
                  scope="col"
                  key={p.id}
                  className={`pm-plan${p.popular ? " is-pick" : ""}`}
                >
                  <span className="pm-plan-name">{p.name}</span>
                  <span className="pm-plan-loc">{p.locations}</span>
                </th>
              ))}
            </tr>
          </thead>

          {MATRIX.map((g) => (
            <tbody key={g.group}>
              <tr className="pm-group">
                <th scope="colgroup" colSpan={PLANS.length + 1}>
                  {g.group}
                </th>
              </tr>
              {g.rows.map((r) => (
                <tr key={r.label}>
                  <th scope="row" className="pm-row-head">
                    <span className="pm-row-label">{r.label}</span>
                    {r.note && <span className="small pm-row-note">{r.note}</span>}
                  </th>
                  {r.cells.map((cell, i) => (
                    <td
                      key={PLANS[i].id}
                      className={`pm-cell${PLANS[i].popular ? " is-pick" : ""}`}
                    >
                      {cell === true && (
                        <>
                          <Check
                            aria-hidden="true"
                            size={16}
                            strokeWidth={2.5}
                            className="pm-yes"
                          />
                          <span className="pm-vh">Included</span>
                        </>
                      )}
                      {cell === false && (
                        <>
                          <Minus
                            aria-hidden="true"
                            size={16}
                            strokeWidth={2.5}
                            className="pm-no"
                          />
                          <span className="pm-vh">Not included</span>
                        </>
                      )}
                      {typeof cell === "string" && (
                        <span className="pm-val">{cell}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}
