const ProductoModel = require('../models/ProductoModel');

const crearProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, categoria, stock } = req.body;
const resultado = await ProductoModel.crearProducto(nombre, descripcion, precio, categoria, stock);
    res.status(201).json({ mensaje: 'Producto creado', id: resultado.insertId });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear producto', error: error.message });
  }
};

const obtenerProductos = async (req, res) => {
  try {
    const productos = await ProductoModel.obtenerProductos();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener productos', error: error.message });
  }
};

const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio, categoria, stock } = req.body;
    await ProductoModel.actualizarProducto(id, nombre, precio, categoria, stock);
    res.json({ mensaje: 'Producto actualizado' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar producto', error: error.message });
  }
};

const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    await ProductoModel.eliminarProducto(id);
    res.json({ mensaje: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar producto', error: error.message });
  }
};

module.exports = {
  crearProducto,
  obtenerProductos,
  actualizarProducto,
  eliminarProducto,
};
