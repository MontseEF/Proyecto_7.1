require("dotenv/config");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./src/models/User");
const { sign } = require("./src/utils/jwt");

const app = express();

// Middlewares básicos
app.use(express.json());
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
}));

// Conexión MongoDB
if (!process.env.MONGO_URI) {
    console.error("❌ Falta MONGO_URI");
    process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB conectado"))
    .catch(e => {
        console.error("❌ Error MongoDB:", e.message);
        process.exit(1);
    });

// Rutas básicas directas
app.get("/api/health", (req, res) => {
    res.json({ status: "OK", timestamp: new Date() });
});

app.post("/api/auth/register", async (req, res) => {
    try {
        console.log("📝 Solicitud de registro recibida:", req.body);
        
        const { name, email, password } = req.body || {};
        
        if (!name || !email || !password) {
            console.log("❌ Datos faltantes");
            return res.status(400).json({ message: "Nombre, email y contraseña requeridos" });
        }

        const exists = await User.findOne({ email: email.toLowerCase() });
        if (exists) {
            console.log("❌ Email ya existe");
            return res.status(409).json({ message: "Email ya registrado" });
        }

        const hash = await bcrypt.hash(password, 12);
        const user = await User.create({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: hash
        });

        const token = sign({ id: user._id, email: user.email, role: user.role });
        
        console.log("✅ Usuario registrado:", user.email);
        
        res.status(201).json({
            message: "Usuario registrado",
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        console.error("❌ Error registro:", error.message);
        res.status(500).json({ message: "Error interno" });
    }
});

app.post("/api/auth/login", async (req, res) => {
    try {
        console.log("🔑 Solicitud de login recibida:", { email: req.body?.email });
        
        const { email, password } = req.body || {};
        
        if (!email || !password) {
            console.log("❌ Credenciales faltantes");
            return res.status(400).json({ message: "Email y contraseña requeridos" });
        }

        const user = await User.findOne({ email: email.toLowerCase().trim() });
        if (!user) {
            console.log("❌ Usuario no encontrado");
            return res.status(401).json({ message: "Credenciales inválidas" });
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            console.log("❌ Contraseña incorrecta");
            return res.status(401).json({ message: "Credenciales inválidas" });
        }

        const token = sign({ id: user._id, email: user.email, role: user.role });
        
        console.log("✅ Login exitoso:", user.email);
        
        res.json({
            message: "Login exitoso",
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        console.error("❌ Error login:", error.message);
        res.status(500).json({ message: "Error interno" });
    }
});

// Middleware de error
app.use((err, req, res, next) => {
    console.error("💥 Error no manejado:", err.message);
    res.status(500).json({ message: "Error del servidor" });
});

// 404
app.use((req, res) => {
    console.log("❓ Ruta no encontrada:", req.method, req.url);
    res.status(404).json({ message: "Ruta no encontrada" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor simplificado en puerto ${PORT}`);
    console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
});