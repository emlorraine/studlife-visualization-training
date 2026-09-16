const LABELS = {
  note: "Note",
  caution: "Caution",
  tip: "Tip",
};

// A Sphinx-style admonition box — a labeled, bordered callout for asides,
// caveats, and warnings that a reader (or an instructor narrating a demo)
// should not skim past.
export default function Admonition({ kind = "note", title, children }) {
  return (
    <div className={"admonition admonition--" + kind}>
      <p className="admonition-label">{title || LABELS[kind] || LABELS.note}</p>
      <div className="admonition-body">{children}</div>
    </div>
  );
}
