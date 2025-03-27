const pool = require('../config/dbMySQL');

class ProductoModel {
  static async crearProducto(nombre, descripcion, precio, categoria, stock) {
    const [result] = await pool.query(
      'INSERT INTO productos (nombre, descripcion, precio, categoria, stock) VALUES (?, ?, ?, ?, ?)',
      [nombre, descripcion, precio, categoria, stock]
    );
    return result;
  }

  static async obtenerProductos() {
    const [rows] = await pool.query('SELECT * FROM productos');
    return rows;
  }

  static async obtenerProductoPorId(id) {
    const [rows] = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
    return rows[0];
  }

  static async actualizarProducto(id, nombre, descripcion, precio, categoria, stock) {
    const [result] = await pool.query(
      'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, categoria = ?, stock = ? WHERE id = ?',
      [nombre, descripcion, precio, categoria, stock, id]
    );
    return result;
  }

  static async eliminarProducto(id) {
    const [result] = await pool.query('DELETE FROM productos WHERE id = ?', [id]);
    return result;
  }
}

module.exports = ProductoModel;

