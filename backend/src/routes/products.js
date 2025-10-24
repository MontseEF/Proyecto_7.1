const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// GET /api/products - lista
router.get('/', async (req, res) => {
  const items = await Product.find().sort({ createdAt: -1 }).lean();
  res.json(items);
});

// (Opcional) POST /api/products - crear (para tests)
router.post('/', async (req, res) => {
  const doc = await Product.create(req.body);
  res.status(201).json(doc);
});

module.exports = router;

