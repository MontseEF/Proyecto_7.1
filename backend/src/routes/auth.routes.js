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
    
    // Validaciones
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Nombre, email y contraseña son requeridos" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres" });
    }

    // Verificar si el email ya existe
    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) {
      return res.status(409).json({ message: "El email ya está registrado" });
    }

    // Crear usuario
    const hash = await bcrypt.hash(password, 12);
    const user = await User.create({ 
      name: name.trim(), 
      email: email.toLowerCase().trim(), 
      password: hash 
    });

    // Generar token
    const token = sign({ id: user._id, email: user.email, role: user.role });
    
    console.log("✅ Usuario registrado:", user.email);
    
    return res.status(201).json({
      message: "Usuario registrado exitosamente",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (e) {
    console.error("❌ Register error:", e.message);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
});

/**
 * POST /api/auth/login
 * body: { email, password }
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    
    // Validaciones
    if (!email || !password) {
      return res.status(400).json({ message: "Email y contraseña son requeridos" });
    }

    // Buscar usuario
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ message: "Email o contraseña incorrectos" });
    }

    // Verificar contraseña
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Email o contraseña incorrectos" });
    }

    // Generar token
    const token = sign({ id: user._id, email: user.email, role: user.role });
    
    console.log("Usuario logueado:", user.email);
    
    return res.json({
      message: "Inicio de sesión exitoso",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (e) {
    console.error("Login error:", e.message);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;
