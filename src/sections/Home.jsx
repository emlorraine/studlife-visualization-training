import LinkJump from "../components/LinkJump.jsx";
import Admonition from "../components/Admonition.jsx";
import DatawrapperEmbed from "../components/DatawrapperEmbed.jsx";
import { getChapter } from "../data/content.js";

import step1_1 from "../../imgs/1.1.png";
import step1_5 from "../../imgs/1.5.png";
import step1_6 from "../../imgs/1.6.png";
import step2_1 from "../../imgs/2.1.png";
import step2_2 from "../../imgs/2.2.png";
import step2_4 from "../../imgs/2.4.png";
import step2_5 from "../../imgs/2.5.png";
import step3_1 from "../../imgs/3.1.png";
import step3_3 from "../../imgs/3.3.png";
import step3_4 from "../../imgs/3.4.png";
import step3_5 from "../../imgs/3.5.png";
import step3_6 from "../../imgs/3.6.png";
import step3_7 from "../../imgs/3.7.png";
import step3_8 from "../../imgs/3.8.png";

const GITHUB_RAW = "https://raw.githubusercontent.com/emlorraine/studlife-visualization-training/main";

const sub = (id) => getChapter("home").subsections.find((s) => s.id === id);

export default function Home({ onNavigate }) {
  return (
    <article className="chapter">
      <h1>Building a Visual Story</h1>
      <p className="chapter-dek">
        A workshop built from one dataset built from <a href="https://police.wustl.edu/clery-reports-log/crime-log/">WUPD's Clery Report crime log</a>. It walks from an overview to three Datawrapper
        exercises: a bar chart, a timeline, and a bump chart. Nothing past the cleaning stage (see{" "}
        <LinkJump chapter="data" onNavigate={onNavigate}>
          Data &amp; Cleaning
        </LinkJump>
        ) requires writing any code.
      </p>

      <Admonition kind="note" title="Before you start">
        <ul>
          <li>
            A free <a href="https://www.datawrapper.de/" target="_blank" rel="noopener noreferrer">Datawrapper</a>{" "}
            account for everyone building along.
          </li>
          <li>A spreadsheet tool: Google Sheets, Excel, or Numbers.</li>
          <li>
            The cleaned <code className="mono">cleaned.csv</code> and each exercise's data file, all in the GitHub
            repo (linked below and in <LinkJump chapter="data" onNavigate={onNavigate}>Data &amp; Cleaning</LinkJump>).
          </li>
        </ul>
      </Admonition>

      <h2 id={sub("pitch-statement").id}>
        {sub("pitch-statement").title}
      </h2>
      <p>
        <strong>I'm proposing an interactive story built from WUPD's Clery Act crime log</strong>: three linked
        Datawrapper visuals. Each one answers a question the last one raises, walking a campus reader from "what
        gets reported" to "when" to "which locations."
      </p>
      <p>
        The data behind this is already handled. See{" "}
        <LinkJump chapter="data" subsection="background" onNavigate={onNavigate}>
          Data &amp; Cleaning
        </LinkJump>{" "}
        for how I scraped and deduped it. Nothing below requires touching the raw file again.
      </p>

      <h2 id={sub("exercise-1").id}>
        {sub("exercise-1").title}
      </h2>
      <p className="question">
        "What gets reported to WUPD more than anything else, and how does everything else compare?"
      </p>
      <p>
        The simplest chart in Datawrapper that can carry a finding. This is the control group for the two builds
        after it.
      </p>
      <h3>Data needed</h3>
      <p>
        A summary table: one row per bucketed incident type (the same eight types plus "Other" used throughout this
        workshop), with a single count column totaling incidents across the full 2022–2026 window.{" "}
        <a href={`${GITHUB_RAW}/data/exercise_1.csv`} target="_blank" rel="noopener noreferrer">
          data/exercise_1.csv
        </a>{" "}
        (opens the raw file, ready to copy).
      </p>
      <h3>Steps</h3>
      <ol>
        <li>
          Start a new chart and go to <strong>Upload Data:</strong> paste the summary table. One row per type, one
          count column.
          <img className="step-screenshot" src={step1_1} alt="Datawrapper's Upload Data screen with the Exercise 1 summary table pasted in" />
        </li>
        <li>
          <strong>Check &amp; Describe:</strong> confirm the count column reads as a number.
        </li>
        <li>
          <strong>Visualize:</strong> choose <strong>Bar Chart</strong> from the chart-type grid, then switch it to
          a horizontal bar. Incident-type labels like "Property Destruction" clip in a vertical layout.
        </li>
        <li>
          Write a title that states the finding readers should take from the chart.
        </li>
        <li>
          Refine the appearance. Click "Refine" to modify the colors and other settings. For visualizations like
          this, use one neutral color for every bar, one accent color for whichever category the finding is
          actually about.
          <img className="step-screenshot" src={step1_5} alt="Datawrapper's Refine tab with one bar set to an accent color and the rest left neutral" />
        </li>
        <li>
          Click the <strong>Annotate</strong> tab to add a subtitle, data credits, and byline. The subtitle should explain what the chart shows, and the data credits should link WUPD Crime Log page. The byline should include your name and publication.
          <img className="step-screenshot" src={step1_6} alt="Datawrapper's Annotate tab with the subtitle, data credits, and byline fields filled in" />
        </li>
        <li>
          <strong>Publish &amp; Embed.</strong>
        </li>
      </ol>
      <p className="checkpoint">
        Bars sorted tallest to shortest, one category visually distinct, a title that states the finding rather
        than describing the axes.
      </p>
      <h2>Finished chart</h2>
      <DatawrapperEmbed
        id="datawrapper-chart-mTBDc"
        title="Larceny reports account for more than half of WUPD's five-year log"
        ariaLabel="Bar Chart"
        src="https://datawrapper.dwcdn.net/mTBDc/3/"
        height="400"
      />

      <h2 id={sub("exercise-2").id}>
        {sub("exercise-2").title}
      </h2>
      <p className="question">
        "Is WashU trending toward more incidents than past years, fewer, or about the same? Does that trend look
        different by crime type?"
      </p>
      <p>
        This is a step up in complexity. Instead of one total, it's several years broken out by category, which is
        exactly the shape a timeline or a year-by-type heat map is built for.
      </p>
      <h3>Data needed</h3>
      <p>
        A grid of year (2022–2026) by incident type, each cell a count, the same shape as a pivot table, ready to
        paste in.{" "}
        <a href={`${GITHUB_RAW}/data/exercise_2.csv`} target="_blank" rel="noopener noreferrer">
          data/exercise_2.csv
        </a>{" "}
        (opens the raw file, ready to copy).
      </p>
      <h3>Steps</h3>
      <ol>
        <li>
          <strong>Upload Data:</strong> paste the year-by-type grid, year as columns and incident type as rows.
          <img className="step-screenshot" src={step2_1} alt="Datawrapper's Upload Data screen with the year-by-type grid pasted in" />
        </li>
        <li>
          <strong>Check &amp; Describe:</strong> confirm the year columns read as numbers, not text.
          <img className="step-screenshot" src={step2_2} alt="Datawrapper's Check & Describe screen confirming the year columns are read as numbers" />
        </li>
        <li>
          <strong>Visualize:</strong> try two chart types and see which reads faster: <strong>Table</strong>, or{" "}
          <strong>Multiple Lines Chart</strong>, with one line per top incident type.
        </li>
        <li>
          For the table: open the <strong>Refine</strong> tab, click each incident-type column, and check "Show as
          heatmap" in that column's settings. It's a per-column option, not a chart-wide switch, so it has to be
          turned on once for each column. For the line chart: label lines directly rather than relying on a legend.
          <img className="step-screenshot" src={step2_4} alt="Datawrapper's Refine tab with 'Show as heatmap' checked for one incident-type column" />
        </li>
        <li>
          Still in Visualize, open the <strong>Annotate</strong> tab: flag the current year as partial as it hasn't
          finished yet. Also add a title, the appropriate data credits and byline as before.
          <img className="step-screenshot" src={step2_5} alt="Datawrapper's Annotate tab flagging 2026 as a partial year" />
        </li>
        <li>
          <strong>Publish &amp; Embed.</strong>
        </li>
      </ol>
      <p className="checkpoint">
        A reader can find, at a glance, which crime type is rising, which is flat, and which is falling, with the
        current year clearly marked as in-progress.
      </p>
      <h2>Finished chart</h2>
      <DatawrapperEmbed
        id="datawrapper-chart-ypYJb"
        title="Larceny remains the most common crime reported to WUPD"
        ariaLabel="Table"
        src="https://datawrapper.dwcdn.net/ypYJb/2/"
        height="355"
      />

      <h2 id={sub("exercise-3").id}>
        {sub("exercise-3").title}
      </h2>
      <p className="question">
        "Has the same place been WUPD's biggest hot spot the whole time, or does the answer change from year to
        year?"
      </p>
      <p>
        The ten locations with the most incidents since 2022, ranked against each other year by year. A bump
        chart, built as a line chart with the vertical axis reversed so rank 1 sits at the top. No addresses, no
        geocoding, no map.
      </p>
      <h3>Data needed</h3>
      <p>
        One row per year (2022–2026), one column per each of the ten highest-volume locations, with each cell
        holding that location's rank that year among just those ten: 1 for the most incidents that year, 10 for
        the fewest. Ties get the same rank.{" "}
        <a href={`${GITHUB_RAW}/data/exercise_3.csv`} target="_blank" rel="noopener noreferrer">
          data/exercise_3.csv
        </a>{" "}
        (opens the raw file, ready to copy).
      </p>
      <h3>Steps</h3>
      <ol>
        <li>
          <strong>Upload Data:</strong> paste the year-by-location rank table. Rows are years (2022–2026, five
          rows), columns are the ten locations, and every value is a rank from 1 to 10, never a raw incident count.
          <img className="step-screenshot" src={step3_1} alt="Datawrapper's Upload Data screen with the year-by-location rank table pasted in" />
        </li>
        <li>
          <strong>Check &amp; Describe:</strong> confirm every rank column reads as a number, not text.
        </li>
        <li>
          <strong>Visualize:</strong> choose <strong>Lines</strong> from the chart-type grid.
          <img className="step-screenshot" src={step3_3} alt="Datawrapper's chart-type grid with Lines selected" />
        </li>
        <li>
          Open the <strong>Refine</strong> tab, find "Vertical axis," and in the Custom range field enter{" "}
          <code className="mono">10.5,0.5</code>. That reverses the axis so rank 1 sits at the top instead of the
          bottom, which is what makes this read as a ranking. If the chart comes out upside down, with rank 10 at
          the top, swap the order to <code className="mono">0.5,10.5</code>.
          <img className="step-screenshot" src={step3_4} alt="Datawrapper's Refine tab with the vertical axis custom range set to 10.5,0.5" />
        </li>
        <li>
          In the same Refine tab, find the <strong>Lines</strong> section and set Interpolation to{" "}
          <strong>Curved</strong>. This chart has ten lines crossing each other constantly, since the busiest
          location changes hands almost every year: curved lines make those crossings easier to follow than sharp
          straight-line intersections.
          <img className="step-screenshot" src={step3_5} alt="Datawrapper's Lines section with Interpolation set to Curved" />
        </li>
        <li>
          Still in the <strong>Lines</strong> section, turn on <strong>"Show symbols"</strong> and set it to appear
          on <strong>every data point</strong>, not just the first and last. Without this, a curved line only implies
          each year's rank; the circle at every point marks it exactly, which matters here since five years means
          five ranks to read off per location.
          <img className="step-screenshot" src={step3_6} alt="Datawrapper's Lines section with 'Show symbols' turned on for every data point" />
        </li>
        <li>
          Still in Lines, set every line's base color to a light gray first. Then override two lines with their own
          strong color: <strong>Danforth University Center</strong>, since it rises from mid-pack to rank 1 by
          2026, and <strong>Athletic Complex</strong>, since it falls from tied for 1st in 2022 to last by 2024 and
          stays there. Those two carry the finding; the other eight stay gray so they don't compete for attention.
          <img className="step-screenshot" src={step3_7} alt="Datawrapper's Lines section with every line light gray except Danforth University Center and Athletic Complex" />
        </li>
        <li>
          Location names run long ("Danforth University Center," "Anheuser-Busch Hall"). If labels get cut off,
          scroll to the bottom of the Refine tab, under Appearance, and increase the label margin.
          <img className="step-screenshot" src={step3_8} alt="Datawrapper's Refine tab, Appearance section, with the label margin increased" />
        </li>
        <li>
          Click the <strong>Annotate</strong> tab and add:
          <br />
          Title: "Danforth University Center became WUPD's busiest location almost overnight"
          <br />
          Subtitle: "It ranked near the middle in 2022. Athletic Complex, once tied for first, fell to last."
          <br />
          Also add data credits linking the WUPD Crime Log page, a byline, and a short footer note that 2026 is
          partial and its rank could still shift before the year ends.
        </li>
        <li>
          <strong>Publish &amp; Embed.</strong>
        </li>
      </ol>
      <p className="checkpoint">
        A reader can pick any one line and trace it from 2022 to 2026, and see exactly which year, if any, that
        location was WUPD's most-cited, with the gray-vs-colored lines making Danforth University Center's rise and
        Athletic Complex's fall obvious at a glance. Check the chart on a mobile preview too, since line labels move
        to the top of the chart on small screens.
      </p>
      <h2>Finished chart</h2>
      <DatawrapperEmbed
        id="datawrapper-chart-0X5Vc"
        title="DUC becomes WUPD's busiest location for reported crimes"
        ariaLabel="Line chart"
        src="https://datawrapper.dwcdn.net/0X5Vc/2/"
        height="414"
      />

      <h2 id={sub("together").id}>
        {sub("together").title}
      </h2>
      <p>
        Three embed codes aren't a story yet. They're three separate charts on a page. What turns them into one
        interactive is the narration between them: a sentence or two, right before each embed, saying what the last
        chart couldn't tell you. The bar chart raises <em>what</em> gets reported most. The timeline raises{" "}
        <em>when</em>, and teaches the reader to be skeptical of a trend line before trusting it. The bump chart
        answers <em>which locations</em>, showing whether the same place stays WUPD's biggest problem or the title
        keeps changing hands, without ever needing to place a pin on a map.
      </p>
      <p>
        Before publishing, I'd still need: the final Google Sheet link with the 2022–2026 summary tables above; the
        cleaned CSV link and a decision on where it's hosted; and a sign-off from WUPD or the Clery compliance
        office on how the "what this data does and doesn't prove" caveat is worded, since the trend chart touches
        records they own.
      </p>
    </article>
  );
}
