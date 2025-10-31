const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

/**
 * GET /api/products
 */
router.get("/", async (_req, res) => {
  try {
    const items = await Product.find().sort({ createdAt: -1 });
    return res.json(items);
  } catch (e) {
    console.error("Products list error:", e.message);
    return res.status(500).json({ message: "No se pudo obtener el catálogo" });
  }
});

/**
 * GET /api/products/:id
 */
router.get("/:id", async (req, res) => {
  try {
    const it = await Product.findById(req.params.id);
    if (!it) return res.status(404).json({ message: "Producto no encontrado" });
    return res.json(it);
  } catch (e) {
    console.error("Product detail error:", e.message);
    return res.status(500).json({ message: "No se pudo obtener el producto" });
  }
});

module.exports = router;
