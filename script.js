// Get the container where properties will appear
const grid = document.getElementById("propertyGrid");

// Fetch properties from JSON
fetch("properties.json")
  .then(res => res.json())
  .then(properties => {
    // Save globally for modal
    window.allProperties = properties;

    // Create a card for each property
    properties.forEach((p, index) => {
      const card = document.createElement("div");
      card.className = "property-card";
      card.innerHTML = `
        <img src="${p.thumbnail}" alt="${p.title}" loading="lazy">
        <div class="card-content">
          <h3>${p.title}</h3>
          <p style="color:#6b7280;">${p.location}</p>
          <p style="font-size:0.95rem;">${p.highlight}</p>
          <div class="price">${p.price}</div>
          <button class="btn" onclick="openModal(${index})">View Details</button>
        </div>
      `;
      grid.appendChild(card);
    });
  });

// Modal functions
function openModal(index) {
  const p = window.allProperties[index];

  document.getElementById("modalImage").src = p.images[0];
  document.getElementById("modalTitle").textContent = p.title;
  document.getElementById("modalPrice").textContent = p.price;
  document.getElementById("modalLocation").textContent = p.location;
  document.getElementById("modalExtra").textContent = p.highlight;
  document.getElementById("modalDescription").textContent = p.description;

  const msg = encodeURIComponent(
    `Hello Home Ground Merchants,\n\nI'm interested in "${p.title}" (${p.price}) in ${p.location}.`
  );

  document.getElementById("whatsappCTA").href =
    `https://wa.me/254724154316?text=${msg}`;

  document.getElementById("propertyModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("propertyModal").style.display = "none";
}

// Close modal if clicking outside
document.getElementById('propertyModal').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeModal();
});
