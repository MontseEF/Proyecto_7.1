const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // CJS: sin extensión

const router = Router();

const sign = (user) =>
  jwt.sign(
    { id: user._id.toString(), email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Faltan campos" });
    }
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: "Usuario ya existe" });

    const hashed = await bcrypt.hash(String(password), 10);
    const user = await User.create({ name, email, password: hashed, role: "user" });

    const token = sign(user);
    return res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("auth/register:", err.message);
    return res.status(500).json({ msg: "Error en registro" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ msg: "Faltan credenciales" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Credenciales inválidas" });

    const ok = await bcrypt.compare(String(password), user.password);
    if (!ok) return res.status(400).json({ msg: "Credenciales inválidas" });

    const token = sign(user);
    return res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("auth/login:", err.message);
    return res.status(500).json({ msg: "Error en login" });
  }
});

module.exports = router;

