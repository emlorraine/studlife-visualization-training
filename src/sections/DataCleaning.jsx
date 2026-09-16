import CodeDisclosure from "../components/CodeDisclosure.jsx";
import Admonition from "../components/Admonition.jsx";
import { MERGE_ROWS, SCRAPE_SCRIPT, getChapter } from "../data/content.js";

const sub = (id) => getChapter("data").subsections.find((s) => s.id === id);

export default function DataCleaning() {
  return (
    <article className="chapter">
      <h1>Data &amp; cleaning</h1>
      <p className="chapter-dek">
        Before anyone opens Datawrapper, the data has to be trustworthy. Here's what I started with, where it came
        from, and what I did to clean it up. This is written for anyone on the team, not just the person who wrote
        the scraper.
      </p>

      <h2 id={sub("background").id}>
        {sub("background").title}
      </h2>
      <p>
        905 incidents from WUPD's public Crime Log, one of the disclosures the university publishes under the
        federal Clery Act. It spans August 27, 2019 through September 8, 2026, and was scraped in September 2026.
      </p>
      <div className="link-box">
        <span className="icon">📄</span>
        <span>
          Cleaned CSV (<code className="mono">cleaned.csv</code>):
        </span>
        <a
          href="https://raw.githubusercontent.com/emlorraine/studlife-visualization-training/main/data/cleaned.csv"
          target="_blank"
          rel="noopener noreferrer"
        >
          data/cleaned.csv (raw file)
        </a>
      </div>
      <div className="link-box">
        <span className="icon">🔗</span>
        <span>Original source:</span>
        <a href="https://police.wustl.edu/clery-reports-log/crime-log/" target="_blank" rel="noopener noreferrer">
          police.wustl.edu/clery-reports-log/crime-log
        </a>
      </div>

      <h2 id={sub("data-acquisition").id}>
        {sub("data-acquisition").title}
      </h2>
      <p>
        WUPD's crime log isn't a downloadable file. It's a public webpage with 91 pages of entries. So I wrote a
        small program that visited each page on its own, one at a time, pausing about a second in between so it
        wasn't hammering the university's server. From every entry on every page, it pulled the same five pieces of
        information: when the incident was reported, when it actually occurred, what type of incident it was, where
        it happened, and a short synopsis.
      </p>
      <p>
        The important detail is <em>how</em> it read each entry. Rather than grabbing a paragraph of text and
        guessing which words meant what, the program looked in the exact same spot on the page for each field,
        every time, because WUPD's page lays each incident out the same way, field by field. That's why the
        categories in this dataset are exact matches to what WUPD wrote, rather than my best guess at parsing a
        sentence.
      </p>
      <CodeDisclosure
        summary="View the scraping script (bash)"
        note="This is a representative version of the orchestration script: the outer loop that fetches each page and waits between requests. It calls a short Python helper (using only the standard library, no third-party packages) to pull the five fields out of each page's fixed layout. That parsing step isn't shown here."
        code={SCRAPE_SCRIPT}
      />

      <h2 id={sub("cleaning").id}>
        {sub("cleaning").title}
      </h2>
      <p>
        Counting up the raw <code className="mono">Incident_Type</code> values turned up something that would
        quietly break any chart built straight from the source: WUPD renamed some of its own categories partway
        through the seven-year span. Every "Trespassing" record predates 2024; every "Trespass" record is from 2024
        or later. Chart those as two separate bars and you undercount trespassing with no obvious reason why.
      </p>
      <p>
        The fix, in a spreadsheet, is a find-and-replace, but it only works if you go looking for it first. I
        checked every column that repeats a category (incident type and location) for exact-duplicate meanings
        spelled two different ways:
      </p>
      <div className="table-wrap">
        <table>
          <caption>Merged during cleaning</caption>
          <thead>
            <tr>
              <th>Column</th>
              <th>Found as two values</th>
              <th>Merged into</th>
            </tr>
          </thead>
          <tbody>
            {MERGE_ROWS.map((row) => (
              <tr key={row.column + row.foundAs}>
                <td>{row.column}</td>
                <td>{row.foundAs}</td>
                <td>
                  <strong>{row.mergedInto}</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        One more cleanup call shapes how the data gets used later, without changing the underlying rows: the eight
        most common incident types cover 91% of all records, so the long tail of one-off categories (stalking, a
        handful of security memos, and similar) gets grouped into a single "Other" bucket for charting.
      </p>
      <Admonition kind="caution" title="What I'm upfront about">
        <p>
          The earliest years in the log (2019–2020) look far quieter than recent ones, and I can't fully separate an
          increase from incomplete retroactive logging in the site's early years. Thirteen report numbers appear
          twice in the source log (26 rows), each with two distinct internal IDs, a numbering quirk on WUPD's end,
          not a scraping error, so I kept both rows. 28 records have no disposition listed at all. None of this gets
          hidden in the cleaning step. It gets carried forward as a caveat wherever it's relevant to a chart.
        </p>
      </Admonition>

      <h2 id={sub("sheets-prep").id}>
        {sub("sheets-prep").title}
      </h2>
      <p>
        None of the three exercises require you to clean any data yourself. That work is already reflected in the
        linked CSVs. If you want to replicate it from scratch, here's exactly what happens between the cleaned CSV
        and each exercise's summary table, done in Google Sheets rather than code.
      </p>
      <p>
        Start by filtering the cleaned log down to the 2022–2026 window, excluding partial 2019 and pandemic-era
        2020–2021. Every exercise below builds from that filtered slice. For Exercises 1 and 2, also recompute the
        top-8-types "Other" bucket for this window specifically, since the top categories in 2022–2026 aren't
        guaranteed to match the full 2019–2026 set exactly.
      </p>
      <ul>
        <li>
          <strong>Exercise 1 (bar chart):</strong> use <code className="mono">COUNTIFS</code> to total incidents by
          bucketed type across the full 2022–2026 window. One row per type, one count column.
        </li>
        <li>
          <strong>Exercise 2 (timeline / heat map):</strong> build a pivot table with year as rows and bucketed
          incident type as columns, counting incidents in each cell.
        </li>
        <li>
          <strong>Exercise 3 (bump chart):</strong> build a location-by-year pivot, sum each location's row for a
          2022–2026 total, and keep the ten locations with the highest totals. For each year, including partial
          2026, use <code className="mono">RANK()</code> to rank just those ten locations against each other by
          that year's count, 1 being the most incidents. No address or geocoding involved.
        </li>
      </ul>
      <p>
        Exercise data files:{" "}
        <a
          href="https://github.com/emlorraine/studlife-visualization-training/tree/main/data"
          target="_blank"
          rel="noopener noreferrer"
        >
          github.com/emlorraine/studlife-visualization-training/data
        </a>
      </p>
    </article>
  );
}
