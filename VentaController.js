const VentaModel = require('../models/VentaModel');
const UsuarioModel = require('../models/UsuarioModel');
const ProductoModel = require('../models/ProductoModel');
const { generarFactura } = require('../services/FacturaService');

const crearVenta = async (req, res) => {
  try {
    const { cliente_id, producto_id, cantidad, metodo_pago, descuento = 0, impuesto = 0 } = req.body;

    // 1️⃣ Obtener el precio del producto
    const producto = await ProductoModel.obtenerProductoPorId(producto_id);
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    // 2️⃣ Calcular el total de la venta
    const subtotal = producto.precio * cantidad;
    const total = subtotal - descuento + impuesto;

    // 3️⃣ Crear la venta en la base de datos
    const resultado = await VentaModel.crearVenta(cliente_id, producto_id, cantidad, total, metodo_pago, descuento, impuesto);

    // 4️⃣ Obtener la info del cliente
    const cliente = await UsuarioModel.obtenerUsuarioPorId(cliente_id);
    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }

    // 5️⃣ Generar la factura
    const venta = {
      id: resultado.insertId,
      cliente_id,
      producto_id,
      cantidad,
      total,
      metodo_pago,
      descuento,
      impuesto,
      fecha: new Date().toISOString(),
    };

    const factura = generarFactura(venta, cliente, producto);

    // 6️⃣ Enviar respuesta con la venta creada
    res.status(201).json({
      mensaje: 'Venta creada con factura',
      id: venta.id,
      facturaArchivo: factura.nombreArchivo,
      facturaRuta: factura.rutaArchivo,
    });

  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear venta', error: error.message });
  }
};

module.exports = {
  crearVenta,
  obtenerVentas: async (req, res) => {
    try {
      const ventas = await VentaModel.obtenerVentas();
      res.json(ventas);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener ventas', error: error.message });
    }
  },
  obtenerVentaPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const venta = await VentaModel.obtenerVentaPorId(id);
      if (venta) {
        res.json(venta);
      } else {
        res.status(404).json({ mensaje: 'Venta no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener venta', error: error.message });
    }
  },
  eliminarVenta: async (req, res) => {
    try {
      const { id } = req.params;
      await VentaModel.eliminarVenta(id);
      res.json({ mensaje: 'Venta eliminada' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al eliminar venta', error: error.message });
    }
  },
};

