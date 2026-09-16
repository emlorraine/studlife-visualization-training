// An inline text button that jumps to another chapter (and optionally a
// specific subsection within it), used within prose to cross-reference
// another part of the workshop without breaking the reading flow.
export default function LinkJump({ chapter, subsection, onNavigate, children }) {
  return (
    <button type="button" className="linklike" onClick={() => onNavigate(chapter, subsection)}>
      {children}
    </button>
  );
}
