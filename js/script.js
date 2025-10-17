/* ==========================================================
   ✅ GLOBAL PATH FIX — Works for / and /pages/
========================================================== */
function getBasePath() {
  const path = window.location.pathname;
  if (path.includes("/pages/")) return "../";
  return "./";
}

/* ✅ Normalize Image Paths */
function fixImagePath(url) {
  if (!url) return "";
  // Remove accidental /pages/ in URLs
  return url.replace("/pages/", "/");
}

/* ==========================================================
   ✅ MOBILE MENU
========================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("nav ul");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }

  // Hide on navigation
  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
      if (nav.classList.contains("active")) nav.classList.remove("active");
    });
  });
});

/* ==========================================================
   ✅ HERO SLIDESHOW — from /data/banners.json
========================================================== */
async function loadHeroSlideshow() {
  const basePath = getBasePath();
  const slideshow = document.querySelector(".hero-slideshow");
  if (!slideshow) return;

  try {
    const res = await fetch(`${basePath}data/banners.json`);
    const banners = await res.json();

    slideshow.innerHTML = banners.map((b, i) => `
      <div class="slide ${i === 0 ? "active" : ""}" 
           style="background-image:url('${fixImagePath(basePath + b.image)}')">
        <div class="slide-caption">
          <h2>${b.title || ""}</h2>
          <p>${b.subtitle || ""}</p>
        </div>
      </div>
    `).join("");

    let index = 0;
    const slides = document.querySelectorAll(".slide");
    setInterval(() => {
      slides[index].classList.remove("active");
      index = (index + 1) % slides.length;
      slides[index].classList.add("active");
    }, 5000);

  } catch (err) {
    console.error("❌ Slideshow error:", err);
  }
}

/* ==========================================================
   ✅ LOAD CARS — from /data/cars.json
========================================================== */
async function loadCars() {
  const basePath = getBasePath();
  const carContainer = document.querySelector(".car-list");
  if (!carContainer) return;

  try {
    const res = await fetch(`${basePath}data/cars.json`);
    const cars = await res.json();

    carContainer.innerHTML = cars.map(car => `
      <div class="car-card">
        <img src="${fixImagePath(basePath + (car.images?.[0] || "images/default.jpg"))}" alt="${car.name}">
        <div class="car-info">
          <h3>${car.name}</h3>
          <p>${car.price ? "Price: " + car.price : "Contact for Price"}</p>
          <button class="buy-btn" data-name="${car.name}">Buy Now</button>
          <button class="whatsapp-btn" data-name="${car.name}">WhatsApp</button>
        </div>
      </div>
    `).join("");

    setupPopups();

  } catch (err) {
    console.error("❌ Cars load error:", err);
  }
}

/* ==========================================================
   ✅ POPUP WINDOWS
========================================================== */
function setupPopups() {
  const buyBtns = document.querySelectorAll(".buy-btn");
  const whatsappBtns = document.querySelectorAll(".whatsapp-btn");

  buyBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      showPopup(`Interested in buying: ${btn.dataset.name}`);
    });
  });

  whatsappBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      showPopup(`Send WhatsApp about: ${btn.dataset.name}`);
    });
  });
}

function showPopup(msg) {
  const old = document.querySelector(".popup");
  if (old) old.remove();

  const popup = document.createElement("div");
  popup.className = "popup";
  popup.innerHTML = `
    <div class="popup-content">
      <p>${msg}</p>
      <button class="close-popup">Close</button>
    </div>
  `;
  document.body.appendChild(popup);
  document.querySelector(".close-popup").addEventListener("click", () => popup.remove());
}

/* ==========================================================
   ✅ INIT
========================================================== */
document.addEventListener("DOMContentLoaded", () => {
  loadHeroSlideshow();
  loadCars();
});
