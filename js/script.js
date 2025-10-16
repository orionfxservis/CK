/* ==========================================================
   ✅ GLOBAL PATH FIX — Works in / and /pages/
========================================================== */
function getBasePath() {
  return window.location.pathname.includes("/pages/") ? "../" : "./";
}

/* ==========================================================
   ✅ MOBILE MENU TOGGLE
========================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("nav ul");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }

  // Auto-hide mobile menu on navigation
  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
      if (nav.classList.contains("active")) {
        nav.classList.remove("active");
      }
    });
  });
});

/* ==========================================================
   ✅ HERO SLIDESHOW — Controlled by /data/banners.json
========================================================== */
async function loadHeroSlideshow() {
  const basePath = getBasePath();
  const slideshow = document.querySelector(".hero-slideshow");
  if (!slideshow) return;

  try {
    const response = await fetch(`${basePath}data/banners.json`);
    const banners = await response.json();

    slideshow.innerHTML = banners.map((b, i) => `
      <div class="slide ${i === 0 ? "active" : ""}" 
           style="background-image: url('${basePath}${b.image}')">
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

  } catch (error) {
    console.error("❌ Error loading slideshow:", error);
  }
}

/* ==========================================================
   ✅ FETCH & DISPLAY CARS — from /data/cars.json
========================================================== */
async function loadCars() {
  const basePath = getBasePath();
  const carContainer = document.querySelector(".car-list");
  if (!carContainer) return;

  try {
    const response = await fetch(`${basePath}data/cars.json`);
    const cars = await response.json();

    carContainer.innerHTML = cars.map(car => `
      <div class="car-card">
        <img src="${basePath}${car.images?.[0] || 'images/default.jpg'}" alt="${car.name}">
        <div class="car-info">
          <h3>${car.name}</h3>
          <p>${car.price ? `Price: ${car.price}` : "Contact for Price"}</p>
          <button class="buy-btn" data-name="${car.name}">Buy Now</button>
          <button class="whatsapp-btn" data-name="${car.name}">WhatsApp</button>
        </div>
      </div>
    `).join("");

    setupPopups();

  } catch (error) {
    console.error("❌ Error loading cars:", error);
  }
}

/* ==========================================================
   ✅ POPUP MODALS for Buy & WhatsApp
========================================================== */
function setupPopups() {
  const buyBtns = document.querySelectorAll(".buy-btn");
  const whatsappBtns = document.querySelectorAll(".whatsapp-btn");

  buyBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const carName = btn.dataset.name;
      showPopup(`Interested in buying: ${carName}`);
    });
  });

  whatsappBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const carName = btn.dataset.name;
      showPopup(`Message on WhatsApp about: ${carName}`);
    });
  });
}

function showPopup(message) {
  // Remove existing popup if open
  const existing = document.querySelector(".popup");
  if (existing) existing.remove();

  const popup = document.createElement("div");
  popup.className = "popup";
  popup.innerHTML = `
    <div class="popup-content">
      <p>${message}</p>
      <button class="close-popup">Close</button>
    </div>
  `;

  document.body.appendChild(popup);

  document.querySelector(".close-popup").addEventListener("click", () => {
    popup.remove();
  });
}

/* ==========================================================
   ✅ INIT
========================================================== */
document.addEventListener("DOMContentLoaded", () => {
  loadHeroSlideshow();
  loadCars();
});
