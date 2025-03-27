const UsuarioModel = require('../models/UsuarioModel');

const crearUsuario = async (req, res) => {
  try {
    console.log("Datos recibidos:", req.body); // <-- Verifica qué está llegando

    const { nombre, email, contrasena, rol } = req.body;  // Cambiado de "contraseña" a "contrasena"

    // Validación: Verifica que todos los campos están presentes
    if (!nombre || !email || !contrasena || !rol) {
      return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
    }

    const resultado = await UsuarioModel.crearUsuario(nombre, email, contrasena, rol);
    res.status(201).json({ mensaje: 'Usuario creado', id: resultado.insertId });
  } catch (error) {
    console.error("Error al crear usuario:", error);  // <-- Muestra el error en la consola
    res.status(500).json({ mensaje: 'Error al crear usuario', error: error.message });
  }
};

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await UsuarioModel.obtenerUsuarios();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuarios', error: error.message });
  }
};

const obtenerUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await UsuarioModel.obtenerUsuarioPorId(id);
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuario', error: error.message });
  }
};

const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, contraseña, rol } = req.body;
    await UsuarioModel.actualizarUsuario(id, nombre, email, contraseña, rol);
    res.json({ mensaje: 'Usuario actualizado' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar usuario', error: error.message });
  }
};

const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    await UsuarioModel.eliminarUsuario(id);
    res.json({ mensaje: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar usuario', error: error.message });
  }
};

module.exports = {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
};
