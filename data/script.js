// ✅ script.js — Common JS for all pages (ClickWorx)

document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  initHeroSlideshow();
});

// -----------------------------
// ✅ Mobile Menu Handler
// -----------------------------
function initMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector("nav ul");

  if (menuToggle && navLinks) {
    // Toggle menu open/close
    menuToggle.addEventListener("click", e => {
      e.stopPropagation();
      navLinks.classList.toggle("active");
    });

    // Auto-hide menu on outside click
    document.addEventListener("click", e => {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove("active");
      }
    });

    // Auto-hide menu on link click
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  }
}

// -----------------------------
// ✅ Hero Slideshow Loader (from data/banners.json)
// -----------------------------
function initHeroSlideshow() {
  const heroContainer = document.querySelector(".hero-slideshow");
  if (!heroContainer) return;

  // Auto-detect base path depending on whether page is in /pages/
  const basePath = window.location.pathname.includes("/pages/") ? "../" : "./";
  const bannerPath = `${basePath}data/banners.json`;

  fetch(bannerPath)
    .then(res => {
      if (!res.ok) throw new Error(`Failed to load ${bannerPath}`);
      return res.json();
    })
    .then(images => {
      if (!Array.isArray(images) || images.length === 0) return;

      let index = 0;
      heroContainer.style.backgroundImage = `url(${basePath}${images[index].image})`;

      setInterval(() => {
        index = (index + 1) % images.length;
        heroContainer.style.backgroundImage = `url(${basePath}${images[index].image})`;
      }, 4000);
    })
    .catch(err => {
      console.error("Slideshow load failed:", err);
      // Fallback background if banners.json or image fails
      heroContainer.style.background = `linear-gradient(
        rgba(0, 0, 0, 0.4),
        rgba(0, 0, 0, 0.4)
      ), url(${basePath}images/BG/default.jpg) center/cover no-repeat`;
    });
}
