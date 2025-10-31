const express = require("express");
const Stripe = require("stripe");

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * Body esperado:
 * {
 *   "items": [
 *     { "title": "Taladro Percutor 800W", "price": 59990, "quantity": 1 },
 *     { "title": "Broca 10mm", "price": 2990, "quantity": 2 }
 *   ]
 * }
 * CLP en Stripe NO usa decimales → unit_amount = 59990
 */
router.post("/create-checkout-session", async (req, res) => {
  try {
    const { items } = req.body || {};
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "items es requerido" });
    }

    const line_items = items.map((it) => ({
      quantity: Number(it.quantity) || 1,
      price_data: {
        currency: "clp",
        unit_amount: Number(it.price),
        product_data: {
          name: it.title || it.name || "Producto ferretería",
          // images: it.imageUrl ? [it.imageUrl] : undefined, // opcional, https público
        },
      },
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items,
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    return res.json({ sessionId: session.id });
  } catch (err) {
    console.error("Stripe error:", err?.message || err);
    return res.status(500).json({ message: "No se pudo crear la sesión de pago" });
  }
});

// (Opcional) Detalle para recibo
router.get("/session/:id", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.id, {
      expand: ["payment_intent", "line_items"],
    });
    res.json(session);
  } catch (err) {
    console.error("Stripe session error:", err?.message || err);
    res.status(500).json({ message: "No se pudo obtener la sesión" });
  }
});

module.exports = router;

