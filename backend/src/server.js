const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// Health
app.get('/api/health', (_, res) => res.json({ ok: true, service: 'backend', ts: Date.now() }));

// Rutas reales
const productsRouter = require('./routes/products');
app.use('/api/products', productsRouter);

// Arranque seguro: primero DB, después server
const PORT = process.env.PORT || 3000;
(async () => {
  await connectDB();
  app.listen(PORT, () => console.log(`Backend en http://localhost:${PORT}`));
})();
