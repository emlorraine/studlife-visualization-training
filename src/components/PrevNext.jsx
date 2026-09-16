import { CHAPTERS, getChapterIndex } from "../data/content.js";

export default function PrevNext({ chapterId, onNavigate }) {
  const i = getChapterIndex(chapterId);
  const prev = i > 0 ? CHAPTERS[i - 1] : null;
  const next = i < CHAPTERS.length - 1 ? CHAPTERS[i + 1] : null;

  return (
    <div className="prev-next">
      {prev ? (
        <button className="prev-next-link prev" onClick={() => onNavigate(prev.id)}>
          <span className="prev-next-dir">← Previous</span>
          <span className="prev-next-title">{prev.title}</span>
        </button>
      ) : (
        <span />
      )}
      {next ? (
        <button className="prev-next-link next" onClick={() => onNavigate(next.id)}>
          <span className="prev-next-dir">Next →</span>
          <span className="prev-next-title">{next.title}</span>
        </button>
      ) : (
        <span />
      )}
    </div>
  );
}
