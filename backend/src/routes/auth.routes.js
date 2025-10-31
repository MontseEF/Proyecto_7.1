// backend/src/routes/auth.routes.js
const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { sign } = require("../utils/jwt");

const router = express.Router();

/**
 * POST /api/auth/register
 * body: { name, email, password }
 */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) {
      return res.status(400).json({ message: "name, email y password son requeridos" });
    }
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "El email ya está registrado" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });

    const token = sign({ id: user._id, email: user.email, role: user.role });
    return res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (e) {
    console.error("Register error:", e.message);
    return res.status(500).json({ message: "No se pudo registrar" });
  }
});

/**
 * POST /api/auth/login
 * body: { email, password }
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ message: "email y password requeridos" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Credenciales inválidas" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Credenciales inválidas" });

    const token = sign({ id: user._id, email: user.email, role: user.role });
    return res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (e) {
    console.error("Login error:", e.message);
    return res.status(500).json({ message: "No se pudo iniciar sesión" });
  }
});

module.exports = router;
