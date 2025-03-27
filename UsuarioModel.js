const pool = require('../config/dbMySQL');

class UsuarioModel {
  static async crearUsuario(nombre, email, contrasena, rol = 'cliente') {
    const [result] = await pool.query(
      'INSERT INTO usuarios (nombre, email, contrasena, rol) VALUES (?, ?, ?, ?)',
      [nombre, email, contrasena, rol]
    );
    return result;
  }

  static async obtenerUsuarios() {
    const [rows] = await pool.query('SELECT * FROM usuarios');
    return rows;
  }

  static async obtenerUsuarioPorId(id) {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    return rows[0];
  }

  static async actualizarUsuario(id, nombre, email, contrasena, rol) {
    const [result] = await pool.query(
      'UPDATE usuarios SET nombre = ?, email = ?, contrasena = ?, rol = ? WHERE id = ?',
      [nombre, email, contrasena, rol, id]
    );
    return result;
  }

  static async eliminarUsuario(id) {
    const [result] = await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
    return result;
  }
}

module.exports = UsuarioModel;
