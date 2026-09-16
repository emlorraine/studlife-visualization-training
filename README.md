## Run it locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (defaults to `http://localhost:5173`).

## Build & serve a production version

```bash
npm run build      # outputs to dist/
npm run preview    # serves the built dist/ folder (defaults to http://localhost:4173)
```

`dist/` is a plain static folder afterward — you can also serve it with any static file server
(e.g. `npx serve dist`) or deploy it to any static host.

## Project structure

```
src/
  App.jsx              — top-level layout + chapter navigation state
  App.css              — all styling (minimal, light/dark aware)
  data/content.js       — the chapter/subsection outline, table data, format examples
  components/
    Sidebar.jsx           — persistent left-hand table of contents
    PrevNext.jsx          — Previous/Next links at the bottom of each chapter
    Admonition.jsx        — Note/Caution/Tip callout box
    CodeDisclosure.jsx    — collapsible <details> code block
    LinkJump.jsx          — inline text link that jumps to another chapter
    FlowChart.jsx         — the inline SVG chart-choice decision tree
  sections/
    Home.jsx              — Chapter 1 · The pitch + all three Datawrapper exercises
    DataCleaning.jsx       — Chapter 2 · Data & Cleaning
    Formats.jsx            — Chapter 3 · Visual Storytelling Formats (with linked real examples)
```