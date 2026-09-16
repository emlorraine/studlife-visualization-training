import { useEffect } from "react";

// Datawrapper's resize script listens for postMessage events from any of its
// iframes and adjusts that iframe's height to fit its content. The listener
// only needs to be attached once for the whole page, no matter how many
// Datawrapper charts are embedded, so this module-level flag keeps repeated
// mounts of <DatawrapperEmbed> from stacking up duplicate listeners.
let resizeListenerAttached = false;

function ensureResizeListener() {
  if (resizeListenerAttached || typeof window === "undefined") return;
  resizeListenerAttached = true;
  window.addEventListener("message", (event) => {
    if (event.data["datawrapper-height"] === undefined) return;
    const iframes = document.querySelectorAll("iframe");
    for (const key in event.data["datawrapper-height"]) {
      for (const iframe of iframes) {
        if (iframe.contentWindow === event.source) {
          iframe.style.height = `${event.data["datawrapper-height"][key]}px`;
        }
      }
    }
  });
}

// Renders a published Datawrapper chart from its embed code. The iframe is
// injected as raw HTML (rather than JSX props) so it can carry the exact
// inline style Datawrapper ships, including the `!important` that keeps a
// host page's CSS from overriding the iframe's width.
export default function DatawrapperEmbed({ id, title, ariaLabel, src, height }) {
  useEffect(() => {
    ensureResizeListener();
  }, []);

  const html = `<iframe title="${title}" aria-label="${ariaLabel}" id="${id}" src="${src}" scrolling="no" frameborder="0" style="width: 0; min-width: 100% !important; border: none;" height="${height}" data-external="1"></iframe>`;

  return <div className="datawrapper-embed" dangerouslySetInnerHTML={{ __html: html }} />;
}
