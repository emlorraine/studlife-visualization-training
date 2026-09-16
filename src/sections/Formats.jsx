import FlowChart from "../components/FlowChart.jsx";
import Admonition from "../components/Admonition.jsx";
import { FORMAT_CARDS, PRACTICES, getChapter } from "../data/content.js";

const sub = (id) => getChapter("formats").subsections.find((s) => s.id === id);

export default function Formats() {
  return (
    <article className="chapter">
      <h1>Visual storytelling formats</h1>

      <h2 id={sub("why-format").id}>
        {sub("why-format").title}
      </h2>
      <p>
        Before picking a chart type, it's worth stepping back to the bigger choice: what <em>kind</em> of visual
        story is this, even? Every format below can carry a data-driven campus-safety story — they just carry
        different parts of it, and each links to a real, published example worth opening in class.
      </p>

      <h2 id={sub("five-formats").id}>
        {sub("five-formats").title}
      </h2>
      <dl className="format-list">
        {FORMAT_CARDS.map((card) => (
          <div className="format-item" key={card.label}>
            <dt>{card.label}</dt>
            <dd>
              <p>{card.body}</p>
              <p className="format-example">
                Example:{" "}
                <a href={card.example.url} target="_blank" rel="noopener noreferrer">
                  {card.example.outlet} — "{card.example.title}"
                </a>
              </p>
              <p className="format-note">{card.example.note}</p>
            </dd>
          </div>
        ))}
      </dl>

      <h2 id={sub("decision-guide").id}>
        {sub("decision-guide").title}
      </h2>
      <p>
        Every chart in this workshop came out of the same short decision: what question is the reader actually
        asking? Start there, not with a chart type you already like.
      </p>
      <FlowChart />
      <table className="practice-table">
        <caption>Six habits worth keeping, for any newsroom chart</caption>
        <tbody>
          {PRACTICES.map((p) => (
            <tr key={p.title}>
              <th scope="row">{p.title}</th>
              <td>{p.body}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 id={sub("our-call").id}>
        {sub("our-call").title}
      </h2>
      <Admonition kind="note" title="Our call for this project">
        <p>
          A short interactive graphics sequence — the three Datawrapper builds on the home page — stitched together with
          brief connective text, not full scrollytelling and not video. It's the format that best matches our
          timeline, our team's tools, and a story where different readers legitimately want different slices of the
          same numbers.
        </p>
      </Admonition>
    </article>
  );
}
