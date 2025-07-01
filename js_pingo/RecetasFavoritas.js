// js_pingo/RecetasFavoritas.js

document.addEventListener('DOMContentLoaded', () => {
    function toggleFavorito(event) {
        const icon = event.target.closest('.icono-favorito'); 
        if (!icon) return; 
        const card = icon.closest('.tarjeta-receta');
        if (!card) {
            const galeriaCard = icon.closest('.receta-card');
            if (galeriaCard) {
                console.warn("Icono de favorito clicado en una tarjeta que no es '.tarjeta-receta'. Asegúrate de que los data-atributos estén presentes.");
                return;
            } else {
                return;
            }
        }

        const recetaId = card.dataset.id;
        const recetaNombre = card.dataset.nombre;
        const recetaImagen = card.dataset.imagen;
        const recetaTiempo = card.dataset.tiempo;
        const recetaDificultad = card.dataset.dificultad;
        const recetaDescripcion = card.dataset.descripcion;

        if (!recetaId || !recetaNombre || !recetaImagen) {
            console.error("Faltan datos esenciales (id, nombre, imagen) en la tarjeta para añadir a favoritos.", {
                id: recetaId,
                nombre: recetaNombre,
                imagen: recetaImagen,
                cardElement: card
            });
            alert("No se pudo añadir a favoritos. Faltan datos de la receta.");
            return;
        }

        let favoritas = JSON.parse(localStorage.getItem('recetasFavoritas')) || [];
        const index = favoritas.findIndex(r => r.id === recetaId);

        if (index === -1) {
            favoritas.push({
                id: recetaId,
                nombre: recetaNombre,
                imagen: recetaImagen,
                tiempo: recetaTiempo,
                dificultad: recetaDificultad,
                descripcion: recetaDescripcion
            });
            icon.src = 'img/favorito.png';
            icon.dataset.favorito = 'true';
            console.log(`Receta '${recetaNombre}' (ID: ${recetaId}) añadida a favoritos.`);
        } else {
            favoritas.splice(index, 1);
            icon.src = 'img/favsinrelleno.png'; 
            icon.dataset.favorito = 'false';
            console.log(`Receta '${recetaNombre}' (ID: ${recetaId}) eliminada de favoritos.`);
        }

        localStorage.setItem('recetasFavoritas', JSON.stringify(favoritas));
        console.log("Estado actual de favoritos:", favoritas);
        if (document.getElementById('listaRecetasFavoritas')) {
            mostrarRecetasFavoritas();
        }
    }

    function actualizarIconosFavoritos() {
        let favoritas = JSON.parse(localStorage.getItem('recetasFavoritas')) || [];
        document.querySelectorAll('.icono-favorito').forEach(icon => {
            const card = icon.closest('.tarjeta-receta') || icon.closest('.receta-card'); 
            if (card) {
                const recetaId = card.dataset.id;
                if (recetaId) {
                    if (favoritas.some(r => r.id === recetaId)) {
                        icon.src = 'img/favorito.png';
                        icon.dataset.favorito = 'true';
                    } else {
                        icon.src = 'img/favsinrelleno.png';
                        icon.dataset.favorito = 'false';
                    }
                }
            }
        });
    }

    function mostrarRecetasFavoritas() {
        const listaRecetasFavoritasDiv = document.getElementById('listaRecetasFavoritas');
        if (!listaRecetasFavoritasDiv) return;
        let favoritas = JSON.parse(localStorage.getItem('recetasFavoritas')) || [];
        listaRecetasFavoritasDiv.innerHTML = '';

        if (favoritas.length === 0) {
            listaRecetasFavoritasDiv.innerHTML = '<p class="mensaje-vacio">No tienes recetas favoritas aún. ¡Explora y añade algunas!</p>';
            return;
        }

        favoritas.forEach(receta => {
            const imagenSrc = receta.imagen && receta.imagen !== 'undefined' ? receta.imagen : 'img/default-recipe.png';
            const nombreReceta = receta.nombre && receta.nombre !== 'undefined' ? receta.nombre : 'Nombre no disponible';
            const descripcionReceta = receta.descripcion && receta.descripcion !== 'undefined' ? receta.descripcion : 'Sin descripción';
            const tiempoReceta = receta.tiempo && receta.tiempo !== 'undefined' ? receta.tiempo : 'N/A';
            const dificultadReceta = receta.dificultad && receta.dificultad !== 'undefined' ? receta.dificultad : 'N/A';

            const cardHtml = `
                <div class="tarjeta-receta-favorita" data-id="${receta.id}">
                    <img src="${imagenSrc}" alt="${nombreReceta}" class="receta-img">
                    <div class="info">
                        <h5>${nombreReceta}</h5>
                        <p><strong>Descripción:</strong> ${descripcionReceta}</p>
                        <p><strong>Tiempo:</strong> ${tiempoReceta}</p>
                        <p><strong>Dificultad:</strong> ${dificultadReceta}</p>
                    </div>
                    <button class="btn-quitar-favorito" data-id="${receta.id}">Quitar de Favoritos</button>
                </div>
            `;
            listaRecetasFavoritasDiv.insertAdjacentHTML('beforeend', cardHtml);
        });

        listaRecetasFavoritasDiv.querySelectorAll('.btn-quitar-favorito').forEach(button => {
            button.addEventListener('click', (e) => {
                const recetaId = e.target.dataset.id;
                let favoritasActualizadas = JSON.parse(localStorage.getItem('recetasFavoritas')) || [];
                favoritasActualizadas = favoritasActualizadas.filter(r => r.id !== recetaId);
                localStorage.setItem('recetasFavoritas', JSON.stringify(favoritasActualizadas));
                console.log(`Receta (ID: ${recetaId}) eliminada de favoritos desde la página de favoritos.`);
                mostrarRecetasFavoritas(); 
            });
        });
    }
    document.body.addEventListener('click', toggleFavorito);
    if (document.getElementById('cardsLargasRecetas')) {
        setTimeout(actualizarIconosFavoritos, 500);
    }
    if (document.getElementById('listaRecetasFavoritas')) {
        mostrarRecetasFavoritas();
    }
});