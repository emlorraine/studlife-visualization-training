import { useEffect, useRef, useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import PrevNext from "./components/PrevNext.jsx";
import Home from "./sections/Home.jsx";
import DataCleaning from "./sections/DataCleaning.jsx";
const CHAPTER_COMPONENTS = {
  home: Home,
  data: DataCleaning,
};

export default function App() {
  const [activeChapter, setActiveChapter] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pendingScrollId = useRef(null);
  const contentRef = useRef(null);

  function navigate(chapterId, subsectionId) {
    setSidebarOpen(false);
    if (chapterId === activeChapter) {
      if (subsectionId) {
        document.getElementById(subsectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }
    pendingScrollId.current = subsectionId || null;
    setActiveChapter(chapterId);
  }

  useEffect(() => {
    if (pendingScrollId.current) {
      const id = pendingScrollId.current;
      pendingScrollId.current = null;
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "auto", block: "start" });
      });
    } else {
      contentRef.current?.scrollTo({ top: 0 });
    }
  }, [activeChapter]);

  const ActiveComponent = CHAPTER_COMPONENTS[activeChapter];

  return (
    <div className="docs-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="topbar">
        <button
          className="menu-toggle"
          aria-label={sidebarOpen ? "Close table of contents" : "Open table of contents"}
          aria-expanded={sidebarOpen}
          onClick={() => setSidebarOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <div className="docs-body">
        <Sidebar
          activeChapter={activeChapter}
          onNavigate={navigate}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main id="main-content" className="content" ref={contentRef}>
          <div className="content-inner">
            <ActiveComponent onNavigate={navigate} />
            <PrevNext chapterId={activeChapter} onNavigate={(id) => navigate(id)} />
          </div>
        </main>
      </div>
    </div>
  );
}
