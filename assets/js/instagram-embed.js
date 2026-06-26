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
    // Handle case where embed.js already ran before DOMContentLoaded
    fitIframe(container);

    // Watch for embed.js injecting the iframe after DOMContentLoaded
    const observer = new MutationObserver(() => fitIframe(container));
    observer.observe(container, { childList: true, subtree: true });
  });
});
