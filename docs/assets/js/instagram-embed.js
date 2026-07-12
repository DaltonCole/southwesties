document.addEventListener("DOMContentLoaded", () => {
  const containers = document.querySelectorAll(".event-instagram-embed");
  if (!containers.length) return;

  function fitIframe(container) {
    const iframe = container.querySelector("iframe");
    if (!iframe || iframe.dataset.fitted) return;
    iframe.dataset.fitted = "true";
    iframe.style.setProperty("width", "100%", "important");
    iframe.style.setProperty("max-width", "100%", "important");
    iframe.style.setProperty("min-width", "0", "important");
  }

  containers.forEach((container) => {
    fitIframe(container);
    if (container.querySelector("iframe[data-fitted]")) return;

    const observer = new MutationObserver(() => {
      fitIframe(container);
      if (container.querySelector("iframe[data-fitted]")) observer.disconnect();
    });
    observer.observe(container, { childList: true, subtree: true });
  });
});
