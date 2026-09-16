export default function CodeDisclosure({ summary, note, code }) {
  return (
    <details className="code-disclosure">
      <summary>{summary}</summary>
      {note && <p className="code-note">{note}</p>}
      <pre className="code-block">
        <code>{code}</code>
      </pre>
    </details>
  );
}
