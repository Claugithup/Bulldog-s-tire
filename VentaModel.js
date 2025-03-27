const pool = require('../config/dbMySQL');

class VentaModel {
  static async crearVenta(cliente_id, producto_id, cantidad, total, metodo_pago, descuento = 0, impuesto = 0) {
    const [result] = await pool.query(
      'INSERT INTO ventas (cliente_id, producto_id, cantidad, total, metodo_pago, descuento, impuesto) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [cliente_id, producto_id, cantidad, total, metodo_pago, descuento, impuesto]
    );
    return result;
  }  

  static async obtenerVentas() {
    const sql = `
        SELECT v.id, 
               u.nombre AS cliente_nombre, 
               p.nombre AS producto_nombre, 
               v.cantidad, 
               v.total, 
               v.metodo_pago, 
               v.fecha
        FROM ventas v
        LEFT JOIN usuarios u ON v.cliente_id = u.id
        LEFT JOIN productos p ON v.producto_id = p.id
    `;

    const [rows] = await pool.query(sql);
    return rows;
}

  static async obtenerVentaPorId(id) {
    const [rows] = await pool.query(
      `SELECT v.*, u.nombre AS cliente, p.nombre AS producto
       FROM ventas v
       LEFT JOIN usuarios u ON v.cliente_id = u.id
       LEFT JOIN productos p ON v.producto_id = p.id
       WHERE v.id = ?`,
      [id]
    );
    return rows[0];
  }

  static async eliminarVenta(id) {
    const [result] = await pool.query('DELETE FROM ventas WHERE id = ?', [id]);
    return result;
  }
}

module.exports = VentaModel;
