// ✅ script.js — Common JS for all pages (ClickWorx)

document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  initHeroSlideshow();
});

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

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  }
}

// -----------------------------
// ✅ Hero Slideshow Loader
// -----------------------------
function initHeroSlideshow() {
  const heroContainer = document.querySelector(".hero-slideshow");
  if (!heroContainer) return;

  // ✅ Auto-detect base path (works locally & on GitHub)
  const basePath = window.location.pathname.includes("/pages/") ? "../" : "./";

  fetch(`${basePath}data/banners.json`)
    .then(response => {
      if (!response.ok) throw new Error(`Cannot load banners.json`);
      return response.json();
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
    .catch(err => console.error("Slideshow load failed:", err));
}

