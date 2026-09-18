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
        We're going to build three interactives (a bar chart, a heatmap, and a bump chart) using <a href="https://police.wustl.edu/clery-reports-log/crime-log/">WUPD's Clery Report crime log</a>.
      </p>

      <Admonition kind="note" title="Before you start, please make sure you have the following ready:">
        <ul>
          <li>
            A free <a href="https://www.datawrapper.de/" target="_blank" rel="noopener noreferrer">Datawrapper</a> account for anyone building along.
          </li>
          <li>A spreadsheet tool such as Google Sheets, Excel, or Numbers.</li>
          <li>
            The cleaned <code className="mono">cleaned.csv</code> dataset and each exercise's data file in the GitHub repo (linked below and in <LinkJump chapter="data" onNavigate={onNavigate}>Data &amp; Cleaning</LinkJump>).
          </li>
        </ul>
      </Admonition>

      <h2 id={sub("pitch-statement").id}>
        {sub("pitch-statement").title}
      </h2>
      <p>
        <strong>I'm proposing an interactive story built from WUPD's Clery Act crime log</strong>. Each interactive answers a question raised by the previous one, guiding readers from "what gets reported" to "when" and "where."
      </p>
      <p>
        The underlying data is already prepared. See{" "}
        <LinkJump chapter="data" subsection="background" onNavigate={onNavigate}>
          Data &amp; Cleaning
        </LinkJump>{" "}
        to review how it was scraped and cleaned.
      </p>

      <h2 id={sub("exercise-1").id}>
        {sub("exercise-1").title}
      </h2>
      <p className="question">
        "What gets reported to WUPD more than anything else, and how does everything else compare?"
      </p>
      <p>
        We'll start with a simple bar chart to tally reported incidents by type. This serves as a baseline for the next two charts.
      </p>
      <h3>Data needed</h3>
      <p>
        A summary table: one row per incident category (the eight core types plus "Other"), with a single column totaling incidents across the 2022–2026 window.{" "}
        <strong>The data: </strong>
        <a href={`${GITHUB_RAW}/data/exercise_1.csv`} target="_blank" rel="noopener noreferrer">
          data/exercise_1.csv
        </a>
      </p>
      <h3>Steps</h3>
      <ol>
        <li>
          Start a new chart and navigate to <strong>Upload Data</strong> to paste the summary table.
          <img className="step-screenshot" src={step1_1} alt="Datawrapper's Upload Data screen with the Exercise 1 summary table pasted in" />
        </li>
        <li>
          <strong>Check &amp; Describe:</strong> confirm the count column formats as a number.
        </li>
        <li>
          <strong>Visualize:</strong> select <strong>Bar Chart</strong> from the grid of chart options.
        </li>
        <li>
          Refine the appearance. Under "Refine," adjust colors so all neutral bars share one shade, using a single accent color for the focus category.
          <img className="step-screenshot" src={step1_5} alt="Datawrapper's Refine tab with one bar set to an accent color and the rest left neutral" />
        </li><li>
          Open the <strong>Annotate</strong> tab to write a takeaway headline that summarizes the core finding. Also add data credits and a byline. Link the data credits to the WUPD Crime Log page, and include your name and publication in the byline.
          <img className="step-screenshot" src={step1_6} alt="Datawrapper's Annotate tab with the subtitle, data credits, and byline fields filled in" />
        </li>
        <li>
          <strong>Publish &amp; Embed.</strong>
        </li>
      </ol>
      <p className="checkpoint">
        Bars sorted highest to lowest, one highlighted category, and a title that states the core finding rather than describing the axes.
      </p>
      <h2>Finished chart</h2>
      <DatawrapperEmbed
        id="datawrapper-chart-mTBDc"
        title="Larceny reports account for more than half of WUPD's five-year log"
        ariaLabel="Bar Chart"
        src="https://datawrapper.dwcdn.net/mTBDc/3/"
        height="800"
      />

      <h2 id={sub("exercise-2").id}>
        {sub("exercise-2").title}
      </h2>
      <p className="question">
        "Is WashU trending toward more incidents than past years, fewer, or about the same? Does that trend look different by crime type?"
      </p>
      <p>
        Next, we'll break down incident counts across several years by category.
      </p>
      <h3>Data needed</h3>
      <p>
        A grid tracking years (2022–2026) by incident type, formatted like a pivot table with counts in each cell.{" "}
        <strong>The data: </strong>
        <a href={`${GITHUB_RAW}/data/exercise_2.csv`} target="_blank" rel="noopener noreferrer">
          data/exercise_2.csv
        </a>
      </p>
      <h3>Steps</h3>
      <ol>
        <li>
          <strong>Upload Data:</strong> paste the year-by-type grid with years as columns and incident types as rows.
          <img className="step-screenshot" src={step2_1} alt="Datawrapper's Upload Data screen with the year-by-type grid pasted in" />
        </li>
        <li>
          <strong>Check &amp; Describe:</strong> confirm the year columns parse as numbers rather than text.
          <img className="step-screenshot" src={step2_2} alt="Datawrapper's Check & Describe screen confirming the year columns are read as numbers" />
        </li>
        <li>
          <strong>Visualize:</strong> compare two chart types to see which reads faster: a <strong>Table</strong> or a <strong>Multiple Lines Chart</strong> featuring top incident types. This exercise will use the table option.
        </li>
        <li>
          For a table, select "Activate Heatmap" under the <strong>Refine</strong> tab. For a line chart, label lines directly instead of using a legend.
          <img className="step-screenshot" src={step2_4} alt="Datawrapper's Refine tab with 'Show as heatmap.'" />
        </li>
        <li>
          In the <strong>Annotate</strong> tab, note that the current year is partial. Add an informative title, data credits, and your byline.
          <img className="step-screenshot" src={step2_5} alt="Datawrapper's Annotate tab flagging 2026 as a partial year" />
        </li>
        <li>
          <strong>Publish &amp; Embed.</strong>
        </li>
      </ol>
      <p className="checkpoint">
        Readers can immediately spot which crime types are rising, falling, or staying flat.
      </p>
      <h2>Finished chart</h2>
      <DatawrapperEmbed
        id="datawrapper-chart-ypYJb"
        title="Larceny remains the most common crime reported to WUPD"
        ariaLabel="Table"
        src="https://datawrapper.dwcdn.net/ypYJb/2/"
        height="400px"
        width="110%"
      />

      <h2 id={sub("exercise-3").id}>
        {sub("exercise-3").title}
      </h2>
      <p className="question">
        "Has the same location remained WUPD's primary hot spot, or does the top location shift year to year?"
      </p>
      <p>
        We'll rank the ten highest-volume locations year by year using a bump chart, which is a line chart with a reversed vertical axis so rank 1 sits at the top.
      </p>
      <h3>Data needed</h3>
      <p>
        One row per year (2022–2026) and one column for each of the top ten locations. Each cell holds that location's annual rank from 1 (highest count) to 10 (lowest count), with ties sharing a rank.{" "}
        <strong>The data: </strong>
        <a href={`${GITHUB_RAW}/data/exercise_3.csv`} target="_blank" rel="noopener noreferrer">
          data/exercise_3.csv
        </a>
      </p>
      <h3>Steps</h3>
      <ol>
        <li>
          <strong>Upload Data:</strong> paste the year-by-location rank table (5 rows for years, 10 columns for locations). Values must be ranks from 1 to 10, not raw incident counts.
          <img className="step-screenshot" src={step3_1} alt="Datawrapper's Upload Data screen with the year-by-location rank table pasted in" />
        </li>
        <li>
          <strong>Check &amp; Describe:</strong> confirm every rank column parses as a number.
        </li>
        <li>
          <strong>Visualize:</strong> select <strong>Lines</strong> from the chart-type grid.
          <img className="step-screenshot" src={step3_3} alt="Datawrapper's chart-type grid with Lines selected" />
        </li>
        <li>
          In the <strong>Refine</strong> tab under "Vertical axis," enter <code className="mono">10.5,0.5</code> in the Custom range field. This reverses the axis so rank 1 displays at the top.
          <img className="step-screenshot" src={step3_4} alt="Datawrapper's Refine tab with the vertical axis custom range set to 10.5,0.5" />
        </li>
        <li>
          In the <strong>Lines</strong> section, set Interpolation to <strong>Curved</strong> to make intersecting paths easier to follow.
          <img className="step-screenshot" src={step3_5} alt="Datawrapper's Lines section with Interpolation set to Curved" />
        </li>
        <li>
          Enable <strong>"Show symbols"</strong> for <strong>every data point</strong>. This places an explicit marker at each annual rank.
          <img className="step-screenshot" src={step3_6} alt="Datawrapper's Lines section with 'Show symbols' turned on for every data point" />
        </li>
        <li>
          Set all lines to a light gray base color first. Then highlight two key locations: <strong>Danforth University Center</strong> (rising to rank 1 by 2026) and <strong>Athletic Complex</strong> (dropping to last place). Keep the remaining eight gray.
          <img className="step-screenshot" src={step3_7} alt="Datawrapper's Lines section with every line light gray except Danforth University Center and Athletic Complex" />
        </li>
        <li>
          If long location names clip, navigate to Appearance at the bottom of the Refine tab and expand the label margin.
          <img className="step-screenshot" src={step3_8} alt="Datawrapper's Refine tab, Appearance section, with the label margin increased" />
        </li>
        <li>
          In the <strong>Annotate</strong> tab, add a title, data credits linking to the WUPD Crime Log page, your byline, and a note stating that 2026 data is partial.
        </li>
        <li>
          <strong>Publish &amp; Embed.</strong>
        </li>
      </ol>
      <p className="checkpoint">
        Readers can trace any location from 2022 to 2026 to see when it peaked, with color highlights drawing immediate attention to the Danforth University Center's rise and Athletic Complex's decline. Always check the mobile preview, as line labels stack on smaller screens.
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
        These charts provide the visual foundation, but full story reporting requires additional context. Questions to investigate before publishing could include:
      </p>
      <ul>
        <li>What methodology does WUPD use to record reported incidents?</li>
        <li>How complete and accurate are location records year over year?</li>
        <li>What external factors might explain sudden volume shifts at specific locations?</li>
        <li>How do these trends compare to peer institutions or national campus crime reporting?</li>
        <li>How significantly do underreported or misclassified incidents affect the data?</li>
      </ul>
    </article>
  );
}