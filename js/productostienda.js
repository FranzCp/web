function agregarAlCarrito(nombre, precio, imagen) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  const index = carrito.findIndex(item => item.nombre === nombre);
  if (index >= 0) {
    carrito[index].cantidad += 1;
  } else {
    carrito.push({ nombre, precio, cantidad: 1, imagen });
  }

  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarContador();
  alert(`${nombre} agregado al carrito`);
}

function actualizarContador() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const total = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  document.getElementById('contador').textContent = total;
}

window.onload = actualizarContador;