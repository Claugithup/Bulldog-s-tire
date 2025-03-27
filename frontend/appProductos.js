document.addEventListener('DOMContentLoaded', () => {
  const formProducto = document.getElementById('formProducto');
  const productosLista = document.getElementById('productosLista');

  // 🔥 Mostrar productos al cargar
  async function cargarProductos() {
    try {
      const respuesta = await fetch('http://127.0.0.1:5000/api/productos');
      const productos = await respuesta.json();

      productosLista.innerHTML = '';
      productos.forEach(producto => {
        productosLista.innerHTML += `
          <tr>
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>${producto.descripcion}</td>
            <td>$${producto.precio}</td>
            <td>${producto.categoria}</td>
            <td>${producto.stock}</td>
          </tr>
        `;
      });
    } catch (error) {
      alert('Error al obtener productos: ' + error.message);
    }
  }

  // 🟢 Registrar Producto
  formProducto.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const precio = document.getElementById('precio').value;
    const categoria = document.getElementById('categoria').value;
    const stock = document.getElementById('stock').value;

    try {
      const respuesta = await fetch('http://127.0.0.1:5000/api/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, descripcion, precio, categoria, stock }),
      });

      const resultado = await respuesta.json();

      if (respuesta.ok) {
        alert('Producto registrado con éxito');
        formProducto.reset();
        cargarProductos();
      } else {
        alert('Error: ' + resultado.mensaje);
      }
    } catch (error) {
      alert('Error al registrar producto: ' + error.message);
    }
  });

  // 📦 Al cargar la página
  cargarProductos();
});
