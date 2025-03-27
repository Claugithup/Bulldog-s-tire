const express = require('express');
require('dotenv').config();
const cors = require('cors');
const pool = require('./config/dbMySQL');

const usuarioRoutes = require('./routes/usuarioRoutes');
const productoRoutes = require('./routes/productoRoutes');
const ventaRoutes = require('./routes/ventaRoutes');
const path = require('path');

const app = express();

app.use(cors()); // 🟢 IMPORTANTE: Habilitar CORS
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
    res.send('🚀 Bulldog Tire API corriendo correctamente!');
});

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/ventas', ventaRoutes);
app.use('/api/facturas', express.static(path.join(__dirname, '..', 'facturas')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🔥 Servidor corriendo en http://localhost:${PORT}`);
});
