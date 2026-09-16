const COLS = [66, 203, 340, 477, 614];

export default function FlowChart() {
  return (
    <figure className="flow-figure">
      <svg
        viewBox="0 0 680 272"
        role="img"
        aria-label="Decision tree: start from the question the reader is asking, then branch to five outcomes — how categories compare leads to a bar chart, change over time leads to a line chart, where things happen leads to a locator map, a whole broken into parts leads to a stacked bar (used sparingly, skip pie charts), and how two values relate leads to a scatter plot. Bar chart, line chart, and locator map are marked as used in this workshop's three exercises."
      >
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
          </marker>
        </defs>

        {/* Top question */}
        <rect x="210" y="8" width="260" height="56" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <text x="340" y="32" textAnchor="middle" fontSize="14" fontWeight="600" fill="currentColor">What is the reader</text>
        <text x="340" y="50" textAnchor="middle" fontSize="14" fontWeight="600" fill="currentColor">trying to understand?</text>

        {/* Trunk + branch line */}
        <g fill="none" stroke="currentColor" strokeWidth="1.2">
          <line x1="340" y1="64" x2="340" y2="90" />
          <line x1={COLS[0]} y1="90" x2={COLS[4]} y2="90" />
          {COLS.map((cx) => (
            <line key={cx} x1={cx} y1="90" x2={cx} y2="112" markerEnd="url(#arrow)" />
          ))}
        </g>

        {/* Row 1 — the question each format answers */}
        {["How categories|compare", "Change over|time", "Where things|happen", "A whole broken|into parts", "How two values|relate"].map(
          (label, i) => {
            const [l1, l2] = label.split("|");
            return (
              <g key={i}>
                <rect x={COLS[i] - 62} y="116" width="124" height="50" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.85" />
                <text x={COLS[i]} y="137" textAnchor="middle" fontSize="12" fill="currentColor">{l1}</text>
                <text x={COLS[i]} y="153" textAnchor="middle" fontSize="12" fill="currentColor">{l2}</text>
              </g>
            );
          }
        )}

        {/* Second drop */}
        <g fill="none" stroke="currentColor" strokeWidth="1.2">
          {COLS.map((cx) => (
            <line key={cx} x1={cx} y1="166" x2={cx} y2="188" markerEnd="url(#arrow)" />
          ))}
        </g>

        {/* Row 2 — the chart type */}
        <g>
          <rect x={COLS[0] - 62} y="192" width="124" height="64" fill="none" stroke="var(--accent)" strokeWidth="1.4" />
          <text x={COLS[0]} y="219" textAnchor="middle" fontSize="14" fontWeight="700" fill="currentColor">Bar chart</text>
          <text x={COLS[0]} y="237" textAnchor="middle" fontSize="10.5" fill="var(--accent)">used — Exercise 1</text>
        </g>
        <g>
          <rect x={COLS[1] - 62} y="192" width="124" height="64" fill="none" stroke="var(--accent)" strokeWidth="1.4" />
          <text x={COLS[1]} y="219" textAnchor="middle" fontSize="14" fontWeight="700" fill="currentColor">Line chart</text>
          <text x={COLS[1]} y="237" textAnchor="middle" fontSize="10.5" fill="var(--accent)">used — Exercise 2</text>
        </g>
        <g>
          <rect x={COLS[2] - 62} y="192" width="124" height="64" fill="none" stroke="var(--accent)" strokeWidth="1.4" />
          <text x={COLS[2]} y="219" textAnchor="middle" fontSize="14" fontWeight="700" fill="currentColor">Locator map</text>
          <text x={COLS[2]} y="237" textAnchor="middle" fontSize="10.5" fill="var(--accent)">used — Exercise 3</text>
        </g>
        <g>
          <rect x={COLS[3] - 62} y="192" width="124" height="64" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.85" />
          <text x={COLS[3]} y="219" textAnchor="middle" fontSize="14" fontWeight="700" fill="currentColor">Stacked bar</text>
          <text x={COLS[3]} y="237" textAnchor="middle" fontSize="10.5" fill="currentColor" opacity="0.65">use sparingly</text>
        </g>
        <g>
          <rect x={COLS[4] - 62} y="192" width="124" height="64" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.85" />
          <text x={COLS[4]} y="228" textAnchor="middle" fontSize="14" fontWeight="700" fill="currentColor">Scatter plot</text>
        </g>
      </svg>
      <figcaption>
        Start from the reader's question, not the chart you already like. The three outlined outcomes are the ones
        this workshop builds — a line chart can also be a color-coded heat-map table, and a locator map can be a
        choropleth when you're shading regions instead of plotting points. Skip pie charts; a stacked bar does the
        same job more accurately.
      </figcaption>
    </figure>
  );
}
