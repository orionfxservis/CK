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
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    // Auto-hide menu on page link click
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  }
}

// -----------------------------
// ✅ Hero Slideshow Loader (from banners.json)
// -----------------------------
function initHeroSlideshow() {
  const heroContainer = document.querySelector(".hero-slideshow");
  if (!heroContainer) return;

  const basePath =
    window.location.pathname.includes("/pages/") ? "../" : "./";

  fetch(`${basePath}data/banners.json`)
    .then(response => response.json())
    .then(images => {
      if (!Array.isArray(images) || images.length === 0) return;

      let index = 0;
      heroContainer.style.backgroundImage = `url(${basePath}${images[index].image})`;

      setInterval(() => {
        index = (index + 1) % images.length;
        heroContainer.style.backgroundImage = `url(${basePath}${images[index].image})`;
      }, 4000);
    })
    .catch(err => console.error("Slideshow load failed:", err));
}
