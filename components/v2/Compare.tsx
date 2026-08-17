import {
  COMPETITORS,
  COMPETITORS_CHECKED,
  COMPETITORS_FX,
} from "@/lib/pricing";

/**
 * How five booking platforms bill a second studio.
 *
 * READ THE NOTE OVER `COMPETITORS` IN lib/pricing.ts BEFORE TOUCHING THIS.
 * It records what these figures are (published rates read on one day,
 * converted at one rate), why the comparison is about billing structure
 * rather than about features, and why it does not claim we are cheapest.
 *
 * TWO LINES UNDER THE TABLE ARE NOT OPTIONAL
 * ------------------------------------------
 * The date and the conversion rate. A ringgit figure for a platform that
 * publishes in dollars is our arithmetic and not their price, and a
 * competitor price with no date on it is a claim about today that was true
 * on some other day. Both are rendered from constants in lib/pricing.ts so
 * that updating the research updates the disclosure with it.
 *
 * WHY IT IS NOT A TICK GRID
 * -------------------------
 * Rezerv's home page runs one against four named competitors and it is the
 * obvious thing to answer in kind. It would be a mistake: this platform
 * has no member mobile app and no website builder, two competitors here
 * have both, and a feature grid written by us would either carry those
 * rows and lose or omit them and stop being believed the moment the reader
 * opens the other tab. Those two absences are answered in the FAQ, in
 * words, where an absence can be explained rather than merely scored.
 *
 * THE ROW ORDER IS NOT A RANKING. Ours first because it is the subject of
 * the page, then the rest in the order lib/pricing.ts records them. Do not
 * sort by price: it would read as a claim to be cheapest, which is the one
 * thing this table must not say, since we are not.
 */
export default function Compare() {
  return (
    <div className="cmp">
      {/* A header row rather than a table head, because at this width the
          whole thing collapses to stacked blocks on a phone and a real
          `thead` would leave three orphaned labels above them. The row is
          hidden from assistive tech and each cell below carries its own
          label instead, so the two readings stay equivalent. */}
      <div className="cmp-head" aria-hidden="true">
        <span>Platform</span>
        <span>Entry plan</span>
        <span>What a second studio costs</span>
      </div>

      <ul className="cmp-list">
        {COMPETITORS.map((c) => (
          <li className={`cmp-row${c.ours ? " is-ours" : ""}`} key={c.name}>
            <span className="cmp-who">
              <span className="cmp-name">{c.name}</span>
              <span className="small cmp-where">{c.where}</span>
            </span>
            <span className="cmp-price">
              <span className="small cmp-label">Entry plan</span>
              {/* No `mono` here, despite .pr-addon-price setting the
                  precedent two sections down the same page. DESIGN.v2.md's
                  One Family Rule admits Geist Mono for a machine address
                  and nothing else, and a price is not one. Tabular numerals
                  give the column its alignment without a second typeface. */}
              <span className="cmp-fig">{c.entry}</span>
              <span className="small cmp-per">a month</span>
            </span>
            <span className="cmp-bill">
              <span className="small cmp-label">A second studio</span>
              {c.billing}
            </span>
          </li>
        ))}
      </ul>

      <p className="small cmp-foot">
        Competitor rates are the published entry price on each platform&rsquo;s
        own pricing page, read on {COMPETITORS_CHECKED}. Figures published in
        dollars are converted at {COMPETITORS_FX}, so those are our arithmetic
        rather than their price. Check them before you decide anything: pricing
        moves, and the structure in the last column is the part that tends not
        to.
      </p>
    </div>
  );
}
