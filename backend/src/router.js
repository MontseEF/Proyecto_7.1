// backend/src/router.js
const { Router } = require("express");

const router = Router();

// Rutas
router.use("/auth", require("./routes/auth.routes"));
router.use("/products", require("./routes/products.routes"));
router.use("/stripe", require("./routes/stripe.routes"));

router.get("/health", (_req, res) => res.json({ ok: true }));

module.exports = router;
