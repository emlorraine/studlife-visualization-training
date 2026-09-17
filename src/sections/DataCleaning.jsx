import CodeDisclosure from "../components/CodeDisclosure.jsx";
import { MERGE_ROWS, SCRAPE_SCRIPT, getChapter } from "../data/content.js";

const sub = (id) => getChapter("data").subsections.find((s) => s.id === id);

export default function DataCleaning() {
  return (
    <article className="chapter">
      <h1>Data &amp; cleaning</h1>
      <h2 id={sub("background").id}>
        {sub("background").title}
      </h2>
      <p>
        The federal Clery Act requires universities to publish an annual crime log. This dataset gathers 905 incidents scraped from WUPD's public log, spanning from August 2019 through September 2026.
      </p>
      <div className="link-box">
        <span className="icon">📄</span>
        <span>Cleaned CSV:</span>
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
        <span>Original source:</span>
        <a href="https://police.wustl.edu/clery-reports-log/crime-log/" target="_blank" rel="noopener noreferrer">
          police.wustl.edu/clery-reports-log/crime-log
        </a>
      </div>

      <h2 id={sub("data-acquisition").id}>
        {sub("data-acquisition").title}
      </h2>
      <p>
        While WUPD offers a downloadable spreadsheet, their site's online log contained more entries, so I scraped those web pages directly. For each entry, I extracted five main fields: report date, occurrence date, incident type, location, and a short synopsis.
      </p>
      <CodeDisclosure
        summary="View the scraping script (bash)"
        code={SCRAPE_SCRIPT}
      />

      <h2 id={sub("cleaning").id}>
        {sub("cleaning").title}
      </h2>
      <p>
        After downloading the raw data, I cleaned it up to make the values consistent and easy to work with. These changes are reflected in the cleaned CSV used in the exercises below, primarily standardizing location names and incident types.
      </p>
      <div className="table-wrap">
        <table>
          <caption>Merged during cleaning</caption>
          <thead>
            <tr>
              <th>Column</th>
              <th>Raw Values</th>
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
        Including those years would distort the analysis because remote learning drastically reduced on-campus density, making those numbers an inaccurate baseline for typical academic years.
      </p>
      <ul>
        <li>
          <strong>Exercise 1 (bar chart)—</strong> use <code className="mono">COUNTIFS</code> to total incidents by
          bucketed type across the full 2022–2026 window. Ensure there is one row per type with one count column.
        </li>
        <li>
          <strong>Exercise 2 (timeline / heat map)—</strong> build a pivot table with year as rows and bucketed
          incident type as columns, counting incidents in each cell.
        </li>
        <li>
          <strong>Exercise 3 (bump chart)—</strong> build a location-by-year pivot, sum each location's row for a
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