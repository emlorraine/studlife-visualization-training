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
        <span> Cleaned CSV:</span>
        <a
          href="https://raw.githubusercontent.com/emlorraine/studlife-visualization-training/main/data/cleaned.csv"
          target="_blank"
          rel="noopener noreferrer"
        >
          data/cleaned.csv
        </a>
      </div>
      <div className="link-box">
        <span className="icon">🔗</span>
        <span> Original source: </span>
        <a href="https://police.wustl.edu/clery-reports-log/crime-log/" target="_blank" rel="noopener noreferrer">
          police.wustl.edu/clery-reports-log/crime-log
        </a>
      </div>

      <h2 id={sub("data-acquisition").id}>
        {sub("data-acquisition").title}
      </h2>
      <p>
        While WUPD has a spreadsheet available for download, the runnings log on their site contained more entries so I
        wrote a small script that scraped that page instead. From every entry on every page, it pulled the same five pieces of
        information: when the incident was reported, when it actually occurred, what type of incident it was, where
        it happened, and a short synopsis.
      </p>
      <CodeDisclosure
        summary="View the scraping script (bash)"
        code={SCRAPE_SCRIPT}
      />

      <h2 id={sub("cleaning").id}>
        {sub("cleaning").title}
      </h2>
      <p>
        Once the raw data was downloaded, I cleaned it up in a few ways to make the data more consistent and easier to work with.
        Those changes are reflected in the cleaned CSV, which is what the exercises below use. The cleaning steps included standardizing location and incident values. For example:
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

      <h2 id={sub("sheets-prep").id}>
        {sub("sheets-prep").title}
      </h2>
      <p>
        None of the three exercises require you to clean any data yourself. That work is already reflected in the
        linked CSVs. If you want to replicate it from scratch, here's what happens between the cleaned CSV
        and each exercise's summary table, done in Google Sheets rather than code.
      </p>
      <p>
        Start by filtering the cleaned log down to the 2022–2026 window, setting aside partial 2019 data and the 2020–2021 pandemic years.
        Including those years risks distorting the analysis because remote learning drastically reduced student density on campus.
        Because campus activity was fundamentally anomalous during that period, using those numbers creates an unfair baseline that skews direct comparisons against typical academic years.
      </p>
      <ul>
        <li>
          <strong>Exercise 1 (bar chart):</strong> use <code className="mono">COUNTIFS</code> to total incidents by
          bucketed type across the full 2022–2026 window. Ensure there is one row per type with one count column.
        </li>
        <li>
          <strong>Exercise 2 (timeline / heat map):</strong> build a pivot table with year as rows and bucketed
          incident type as columns, counting incidents in each cell.
        </li>
        <li>
          <strong>Exercise 3 (bump chart):</strong> build a location-by-year pivot, sum each location's row for a
          2022–2026 total, and keep the ten locations with the highest totals. For each year, including partial
          2026, use <code className="mono">RANK()</code> to rank just those ten locations against each other by
          that year's count, 1 being the most incidents.
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
