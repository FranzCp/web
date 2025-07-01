function cargarCarrito() {
  const contenedor = document.getElementById('carrito-lista');
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  let html = ``;

  carrito.forEach((producto, index) => {
    const subtotal = producto.precio * producto.cantidad;
    html += `
      <div class="carrito-row" style="display:flex; align-items:center; border-bottom:1px solid #222; padding:16px 0;">
        <div style="flex:2; display:flex; align-items:center; gap:16px;">
          <img src="${producto.imagen}" alt="${producto.nombre}" style="width:90px; height:60px; object-fit:cover; border-radius:12px;">
          <div>
            <div style="font-weight:600;">${producto.nombre}</div>
            <div style="font-size:13px; color:#444;">Vendido y despachado por: EcoTaste</div>
          </div>
        </div>
        <div style="flex:1; text-align:center;">
          <span style="text-decoration:line-through; color:#888;">S/ ${(producto.precio * 1.5).toFixed(2)}</span><br>
          <span style="color:#0099ff; font-weight:600;">S/${producto.precio.toFixed(2)}</span>
        </div>
        <div style="flex:1; text-align:center;">
          <button onclick="cambiarCantidad(${index}, -1)" style="border:none; background:none; font-size:18px;">−</button>
          <span style="margin:0 8px;">${producto.cantidad}</span>
          <button onclick="cambiarCantidad(${index}, 1)" style="border:none; background:none; font-size:18px;">+</button>
        </div>
        <div style="flex:1; text-align:center; color:#0099ff; font-weight:600;">
          S/${subtotal.toFixed(2)}
        </div>
      </div>
    `;
  });

  contenedor.innerHTML = html;

  actualizarDetallePago(carrito);
}

function cambiarCantidad(index, delta) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  carrito[index].cantidad += delta;

  if (carrito[index].cantidad <= 0) {
    carrito.splice(index, 1);
  }

  localStorage.setItem('carrito', JSON.stringify(carrito));
  cargarCarrito();
}

function eliminar(index) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito.splice(index, 1);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  cargarCarrito();
}

function vaciarCarrito() {
  localStorage.removeItem('carrito');
  cargarCarrito();
}

function enviarPorWhatsApp() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  if (carrito.length === 0) {
    alert("El carrito está vacío");
    return;
  }

  let mensaje = '🛒 Pedido:\n';
  carrito.forEach(producto => {
    mensaje += `${producto.nombre} x${producto.cantidad} - $${producto.precio * producto.cantidad}\n`;
  });

  const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  mensaje += `Total: $${total}`;

  const numero = '51987654321'; 
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
}

function actualizarDetallePago(carrito) {
  const detalleDiv = document.querySelector('.detallepago');
  if (!detalleDiv) return;

  let html = `
    <h4>Detalle de la compra</h4>
    <p>Gracias por tu compra. A continuación, te mostramos el detalle de tu pedido:</p>
    <ul style="list-style:none; padding-left:0;">
  `;
  let total = 0;
  carrito.forEach(producto => {
    const subtotal = producto.precio * producto.cantidad;
    total += subtotal;
    html += `<li>${producto.nombre} x ${producto.cantidad} = S/.${subtotal}</li>`;
  });
  html += `</ul><hr><strong>Total: S/.${total}</strong>`;
  detalleDiv.innerHTML = html;
}

window.onload = cargarCarrito;
