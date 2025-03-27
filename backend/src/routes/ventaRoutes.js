const express = require('express');
const {
  crearVenta,
  obtenerVentas,
  obtenerVentaPorId,
  eliminarVenta,
} = require('../controllers/VentaController');

const router = express.Router();

router.post('/', crearVenta);
router.get('/', obtenerVentas);
router.get('/:id', obtenerVentaPorId);
router.delete('/:id', eliminarVenta);

module.exports = router;
