// Single source of truth for the chapter/subsection outline. The sidebar
// and each chapter's own headings all read from this. Deliberately
// unnumbered: Data & Cleaning is reference material you can dip into any
// time, not a sequential step you have to pass through before reaching the
// exercises on the home page.
export const CHAPTERS = [
  {
    id: "home",
    title: "The Pitch & Exercises",
    subsections: [
      { id: "pitch-statement", title: "Overview" },
      { id: "exercise-1", title: "Exercise 1: Bar chart" },
      { id: "exercise-2", title: "Exercise 2: Timeline / heat map" },
      { id: "exercise-3", title: "Exercise 3: Bump chart" },
      { id: "together", title: "Pulling it together" },
    ],
  },
  {
    id: "data",
    title: "Data & Cleaning",
    subsections: [
      { id: "background", title: "Background" },
      { id: "data-acquisition", title: "Data acquisition" },
      { id: "cleaning", title: "Cleaning" },
      { id: "sheets-prep", title: "Formatting the data" },
    ],
  },
];

export function getChapter(id) {
  return CHAPTERS.find((c) => c.id === id);
}

export function getChapterIndex(id) {
  return CHAPTERS.findIndex((c) => c.id === id);
}

export const MERGE_ROWS = [
  {
    column: "Incident Type",
    foundAs: '"Trespassing" (pre-2024) / "Trespass" (2024–)',
    mergedInto: "Trespassing",
  },
  {
    column: "Location",
    foundAs: '"Givens" / "Givens Hall"',
    mergedInto: "Givens Hall",
  },
  {
    column: "Location",
    foundAs: '"AC" / "Athletic Complex"',
    mergedInto: "Athletic Complex",
  },
];

export const SCRAPE_SCRIPT = `
# scrape_crime_log.sh: walk WUPD's public Crime Log, one page at a time
set -euo pipefail

BASE_URL="https://police.wustl.edu/clery-reports-log/crime-log/"
OUT_DIR="./raw_pages"
OUT_CSV="./wupd_crime_log_raw.csv"
TOTAL_PAGES=91

mkdir -p "$OUT_DIR"
echo "reported_date,occurred_date,incident_type,location,synopsis,disposition,report_number" > "$OUT_CSV"

for page in $(seq 1 "$TOTAL_PAGES"); do
  echo "Fetching page $page of $TOTAL_PAGES..."
  curl -sS --fail \\
    --user-agent "wupd-log-scraper/1.0 (research use; 1 req/sec)" \\
    "\${BASE_URL}?page=\${page}" \\
    -o "\${OUT_DIR}/page_\${page}.html"

  # hand the fixed-layout page off to the Python field parser
  python3 parse_log_page.py "\${OUT_DIR}/page_\${page}.html" >> "$OUT_CSV"

  sleep 1   # ~1 request per second, so as not to hammer the site
done

echo "Done. $(($(wc -l < "$OUT_CSV") - 1)) rows written to $OUT_CSV"`;

