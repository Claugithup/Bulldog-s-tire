console.log('app.js cargado correctamente');

const formularioUsuario = document.getElementById('formUsuario');
const tablaUsuarios = document.getElementById('tablaUsuarios');

// ✅ Crear Usuario
formularioUsuario.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const contrasena = document.getElementById('contrasena').value;
    const rol = document.getElementById('rol').value;

    const nuevoUsuario = { nombre, email, contrasena, rol };

    try {
        const respuesta = await fetch('http://localhost:5000/api/usuarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoUsuario),
        });

        if (!respuesta.ok) throw new Error('Error al registrar usuario');

        alert('Usuario registrado con éxito');
        formularioUsuario.reset();
        obtenerUsuarios(); // Actualizar tabla
    } catch (error) {
        alert('Error: ' + error.message);
    }
});

// ✅ Obtener Usuarios
async function obtenerUsuarios() {
    try {
        const respuesta = await fetch('http://localhost:5000/api/usuarios');
        const usuarios = await respuesta.json();

        tablaUsuarios.innerHTML = '';

        usuarios.forEach((usuario) => {
            const fila = `
                <tr>
                    <td>${usuario.id}</td>
                    <td>${usuario.nombre}</td>
                    <td>${usuario.email}</td>
                    <td>${usuario.rol}</td>
                </tr>
            `;
            tablaUsuarios.innerHTML += fila;
        });
    } catch (error) {
        alert('Error al obtener usuarios: ' + error.message);
    }
}

// ✅ Llamar a obtenerUsuarios al cargar
document.addEventListener('DOMContentLoaded', obtenerUsuarios);
