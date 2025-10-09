let carsData = [];

// Load cars from JSON
async function loadCars() {
  try {
    const res = await fetch('../data/cars.json');
    carsData = await res.json();
    showCars(carsData);
  } catch (err) {
    console.error('Failed to load cars:', err);
  }
}

// Show car cards
function showCars(list) {
  const container = document.getElementById('carList');
  const noResults = document.getElementById('noResults');
  container.innerHTML = '';

  if (list.length === 0) {
    noResults.style.display = 'block';
    return;
  } else {
    noResults.style.display = 'none';
  }

  list.forEach((car, index) => {
    const card = document.createElement('div');
    card.className = 'car-card';
    card.innerHTML = `
      <img src="${car.images?.[0] || '../images/default.jpg'}" alt="${car.name}">
      <h3>${car.name}</h3>
      <p>${car.model}</p>
      <p><strong>PKR ${car.price}</strong></p>
      <button class="details-btn" data-index="${index}">Details</button>
    `;
    card.querySelector('.details-btn').addEventListener('click', () => openModal(list[index]));
    container.appendChild(card);
  });
}

// Modal
function openModal(car) {
  const modal = document.getElementById('carModal');
  document.getElementById('modalMainImg').src = car.images?.[0] || '../images/default.jpg';
  const thumbs = document.getElementById('modalThumbs');
  thumbs.innerHTML = '';
  (car.images || []).forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.onclick = () => (document.getElementById('modalMainImg').src = src);
    thumbs.appendChild(img);
  });
  document.getElementById('modalDetails').innerHTML = `
    <h2>${car.name}</h2>
    <p><strong>Model:</strong> ${car.model}</p>
    <p><strong>Specs:</strong> ${car.specs}</p>
    <p><strong>Color:</strong> ${car.color}</p>
    <p><strong>Location:</strong> ${car.location}</p>
    <p><strong>Price:</strong> PKR ${car.price}</p>
  `;
  document.getElementById('whatsappLink').href = 
    \`https://wa.me/?text=I'm interested in \${car.name} (\${car.model}) - PKR \${car.price}\`;
  modal.style.display = 'flex';
}

document.querySelector('.close').onclick = () => {
  document.getElementById('carModal').style.display = 'none';
};
window.onclick = e => {
  if (e.target === document.getElementById('carModal'))
    document.getElementById('carModal').style.display = 'none';
};

// Search
document.getElementById('searchBtn').addEventListener('click', () => {
  const name = document.getElementById('name').value.toLowerCase();
  const model = document.getElementById('model').value.toLowerCase();
  const specs = document.getElementById('specs').value.toLowerCase();
  const color = document.getElementById('color').value.toLowerCase();
  const location = document.getElementById('location').value.toLowerCase();
  const price = document.getElementById('price').value;

  const filtered = carsData.filter(car => {
    const matchesName = !name || car.name.toLowerCase().includes(name);
    const matchesModel = !model || car.model.toLowerCase().includes(model);
    const matchesSpecs = !specs || car.specs.toLowerCase().includes(specs);
    const matchesColor = !color |
