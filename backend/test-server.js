require("dotenv/config");
const express = require("express");
const cors = require("cors");

const app = express();

// Middlewares básicos
app.use(express.json());
app.use(cors());

// Ruta de prueba simple
app.get("/", (req, res) => {
    console.log("✅ Solicitud recibida en /");
    res.json({ message: "Servidor funcionando", timestamp: new Date() });
});

app.get("/api/test", (req, res) => {
    console.log("✅ Solicitud recibida en /api/test");
    res.json({ status: "OK", test: true });
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(500).json({ error: "Error del servidor" });
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

const PORT = 3001; // Puerto diferente
const server = app.listen(PORT, '127.0.0.1', () => {
    console.log(`🚀 Servidor de prueba iniciado`);
    console.log(`📡 Puerto: ${PORT}`);
    console.log(`🌐 URL: http://127.0.0.1:${PORT}`);
    console.log(`🧪 Test: http://127.0.0.1:${PORT}/api/test`);
});

server.on('error', (err) => {
    console.error('Error del servidor:', err);
});

console.log("Script terminado, servidor debería estar funcionando...");