const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// Healthcheck
app.get('/api/health', (_, res) =>
  res.json({ ok: true, service: 'backend', ts: Date.now() })
);

// Rutas
const productsRouter = require('./routes/products');
app.use('/api/products', productsRouter);

// Arranque: primero DB, luego server
const PORT = process.env.PORT || 4000;

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () =>
      console.log(`Backend en http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error('No se pudo iniciar el servidor porque la DB falló.');
    process.exit(1);
  }
})();
