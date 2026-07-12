// Mobile navigation toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (!toggle || !nav) return;

  function closeMenu() {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.textContent = "☰";
  }

  function openMenu() {
    nav.classList.add("open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.textContent = "✕";
  }

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    nav.classList.contains("open") ? closeMenu() : openMenu();
  });

  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) closeMenu();
  });

  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });
});
