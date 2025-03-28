console.log("✅ appVentas.js cargado correctamente");

// ✅ Seleccionar elementos del formulario
const formularioVenta = document.getElementById("formVenta");
const tablaVentas = document.getElementById("ventasLista");  // 🔹 Corregido el ID
const selectCliente = document.getElementById("cliente_id");
const selectProducto = document.getElementById("producto_id");

// ✅ Cargar clientes, productos y ventas al iniciar
document.addEventListener("DOMContentLoaded", () => {
    obtenerClientes();
    obtenerProductos();
    obtenerVentas();
});

// ✅ Función para obtener y mostrar las ventas en la tabla
async function obtenerVentas() {
    try {
        const respuesta = await fetch("http://localhost:5000/api/ventas");
        const ventas = await respuesta.json();

        console.log("📌 Ventas obtenidas:", ventas); // 🛠️ Depuración para verificar datos recibidos

        tablaVentas.innerHTML = ""; // Limpiar antes de agregar nuevas filas

        ventas.forEach((venta) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${venta.id}</td>
                <td>${venta.cliente_nombre || "Desconocido"}</td>  
                <td>${venta.producto_nombre || "Desconocido"}</td>
                <td>${venta.cantidad}</td>
                <td>$${parseFloat(venta.total).toFixed(2)}</td>
                <td>${venta.metodo_pago}</td>
                <td><button onclick="eliminarVenta(${venta.id})">🗑️ Eliminar</button></td>
            `;
            tablaVentas.appendChild(fila);
        });

        console.log("✅ Ventas cargadas correctamente en la tabla.");

    } catch (error) {
        console.error("❌ Error al obtener ventas:", error);
    }
}

// ✅ Función para cargar productos en el select
async function obtenerProductos() {
    try {
        const respuesta = await fetch("http://localhost:5000/api/productos");
        const productos = await respuesta.json();

        selectProducto.innerHTML = "<option value=''>Seleccione un producto</option>";
        productos.forEach(producto => {
            selectProducto.innerHTML += `<option value="${producto.id}">${producto.nombre} - $${producto.precio}</option>`;
        });
    } catch (error) {
        console.error("❌ Error al obtener productos:", error);
    }
}

// ✅ Función para registrar una venta
formularioVenta.addEventListener("submit", async (e) => {
    e.preventDefault();

    const cliente_id = selectCliente.value;
    const producto_id = selectProducto.value;
    const cantidad = document.getElementById("cantidad").value;
    const metodo_pago = document.getElementById("metodo_pago").value;

    if (!cliente_id || !producto_id || !cantidad) {
        alert("⚠️ Todos los campos son obligatorios");
        return;
    }

    const nuevaVenta = { cliente_id, producto_id, cantidad, metodo_pago };

    try {
        const respuesta = await fetch("http://localhost:5000/api/ventas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevaVenta),
        });

        if (!respuesta.ok) throw new Error("Error al registrar venta");

        alert("✅ Venta registrada con éxito");
        formularioVenta.reset();
        obtenerVentas(); // Actualizar la tabla

    } catch (error) {
        alert("❌ Error: " + error.message);
    }
});

// ✅ Función para eliminar una venta
async function eliminarVenta(id) {
    if (!confirm("⚠️ ¿Seguro que deseas eliminar esta venta?")) return;

    try {
        const respuesta = await fetch(`http://localhost:5000/api/ventas/${id}`, {
            method: "DELETE",
        });

        if (!respuesta.ok) throw new Error("Error al eliminar la venta");

        alert("✅ Venta eliminada con éxito");
        obtenerVentas(); // Actualizar la tabla
    } catch (error) {
        alert("❌ Error: " + error.message);
    }
}

