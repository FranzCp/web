document.getElementById("formBusqueda").addEventListener("submit", function (e) {
  e.preventDefault();
  const query = document.getElementById("inputBusqueda").value;
  document.getElementById("textoBusqueda").textContent = query || "Todas";
  // Simular carga de datos
  cargarRecetas(query);
});

function scrollGaleria(px) {
  document.getElementById("galeriaRecetas").scrollBy({ left: px, behavior: "smooth" });
}

function cargarRecetas(query = "") {
  const recetas = [
    {
      "titulo": "Ensalada de Pollo",
      "imagen": "img/ensaladaPollo.jpg",
      "ingredientes": ["Pechuga de Pollo", "Lechuga", "Cebolla", "Tomate Cherry", "..."],
      "tiempo": "30 min",
      "porciones": 2,
      "autor": "Sofia",
      "estrellas": 3
    },
    {
      "titulo": "Saltado de Pollo y verduras",
      "imagen": "img/salteado.jpg",
      "ingredientes": ["Pechuga de pollo", "Brocoli", "Pimiento", "Tomate Cherry", "..."],
      "tiempo": "30 min",
      "porciones": 2,
      "autor": "Maria",
      "estrellas": 4
    },
    {
      "titulo": "Tortilla de Espinaca",
      "imagen": "img/tortilla.jpg",
      "ingredientes": ["Huevo", "Espinaca", "Ceebolla", "Tomate", "Sal"],
      "tiempo": "15 min",
      "porciones": 1,
      "autor": "Luis P.",
      "estrellas": 5
    },
    {
      "titulo": "Sopa de Lentejas",
      "imagen": "img/sopa.jpg",
      "ingredientes": ["Lentejas", "Zanahoria", "Apio", "Ajo"],
      "tiempo": "40 min",
      "porciones": 4,
      "autor": "Jose",
      "estrellas": 4
    },
    {
      "titulo": "Smoothie Verde",
      "imagen": "img/smothie.jpg",
      "ingredientes": ["Espinaca", "Manzana", "Plátano", "Agua de coco"],
      "tiempo": "5 min",
      "porciones": 2,
      "autor": "Maria",
      "estrellas": 5
    },
    {
      "titulo": "Bowl de Avena con Frutas",
      "imagen": "img/bowl.jpg",
      "ingredientes": ["avena", "leche vegetal", "plátano", "fresas", "chía", "miel"],
      "tiempo": "8 min",
      "porciones": 1,
      "autor": "Valeria",
      "estrellas": 5
    },
    {
      "titulo": "Wrap de Pollo y Vegetales",
      "imagen": "img/wrap.jpg",
      "ingredientes": ["tortilla integral", "pollo a la plancha", "lechuga", "zanahoria  ..."],
      "tiempo": "12 min",
      "porciones": 2,
      "autor": "Diego",
      "estrellas": 4
    }
  ];

  const galeria = document.getElementById("galeriaRecetas");
  const cards = document.getElementById("cardsLargasRecetas");

  galeria.innerHTML = "";
  cards.innerHTML = "";

  recetas.forEach(r => {
    const mini = document.createElement("a");
    mini.href = "receta.html";
    mini.className = "card text-decoration-none text-dark";
    mini.style = "min-width: 150px; max-width: 150px; height: 180px; overflow: hidden;";

    mini.innerHTML = `
  <img src="${r.imagen}" alt="" style="height: 130px; width: 100%; object-fit: cover;">
  <div class="card-body p-2" style="text-align: center;">
    <h6 class="card-title mb-0" style="font-size: 0.8rem;">${r.titulo}</h6>
  </div>
`;

    galeria.appendChild(mini);

    galeria.appendChild(mini);

    galeria.appendChild(mini);

    const card = document.createElement("div");
    card.className = "card flex-row shadow text-dark";
card.style = "height: 180px;"; 

card.innerHTML = `
  <img src="${r.imagen}" class="img-fluid" style="width: 200px; height: 100%; object-fit: cover;">
  <div class="card-body d-flex flex-column justify-content-between">
    <div>
      <h5 class="card-title mb-2">
        <a href="receta.html" class="text-dark text-decoration-none">${r.titulo}</a>
      </h5>
      <p class="card-text mb-2">${r.ingredientes.join(", ")}</p>
      <div class="d-flex align-items-center text-muted mb-2">
        <img src="img/reloj.png" alt="Tiempo" style="width: 16px; height: 16px;" class="me-1">
        ${r.tiempo}
        <img src="img/usuario.png" alt="Porciones" style="width: 16px; height: 16px;" class="ms-4 me-1">
        ${r.porciones} porciones
      </div>

      <div class="d-flex justify-content-between align-items-center flex-wrap">
        <small class="text-muted">Elaborado por: ${r.autor}</small>
        <div class="d-flex align-items-center gap-3 mt-1 mt-md-0">
          <div style="color: #73A571; font-size: 2rem;">
            ${"★".repeat(r.estrellas)}${"☆".repeat(5 - r.estrellas)}
          </div>
          <button class="favorito-btn border-0 bg-transparent p-0"
            onclick="toggleFavoritoImg(event, this)" data-titulo="${r.titulo}">
            <img src="img/favsinrelleno.png" alt="Favorito" style="width: 32px; height: 32px;">
          </button>
        </div>
      </div>
    </div>
  </div>
`;
    cards.appendChild(card);
  });


}

function toggleFavoritoImg(event, btn) {
  event.stopPropagation(); // Evita que el clic afecte otros elementos
  event.preventDefault();  // Evita navegación si accidentalmente está en un <a>

  const img = btn.querySelector("img");
  const esFavorito = btn.classList.toggle("activo");

  img.src = esFavorito ? "img/favorito.png" : "img/favsinrelleno.png";
}


cargarRecetas();