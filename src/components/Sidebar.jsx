import { CHAPTERS } from "../data/content.js";

export default function Sidebar({ activeChapter, onNavigate, open, onClose }) {
  return (
    <>
      {open && <div className="sidebar-scrim" onClick={onClose} aria-hidden="true" />}
      <aside className={"sidebar" + (open ? " sidebar--open" : "")} aria-label="Table of contents">
        <button className="sidebar-home" onClick={() => onNavigate("home")}>
          <span className="sidebar-home-title">Building a Visual Story</span>
        </button>

        <nav className="toc">
          <ol>
            {CHAPTERS.map((chapter) => (
              <li key={chapter.id}>
                <button
                  className={"toc-chapter" + (activeChapter === chapter.id ? " is-active" : "")}
                  onClick={() => onNavigate(chapter.id)}
                >
                  {chapter.title}
                </button>
                {chapter.subsections.length > 0 && (
                  <ol className="toc-sub">
                    {chapter.subsections.map((sub) => (
                      <li key={sub.id}>
                        <button
                          className={
                            "toc-subsection" +
                            (activeChapter === chapter.id ? " is-in-chapter" : "")
                          }
                          onClick={() => onNavigate(chapter.id, sub.id)}
                        >
                          {sub.title}
                        </button>
                      </li>
                    ))}
                  </ol>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </aside>
    </>
  );
}
