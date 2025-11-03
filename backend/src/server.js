require("dotenv/config");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");

const apiRouter = require("./router");

const app = express();

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

// Conexión Mongo
if (!process.env.MONGO_URI) {
  console.error("❌ Falta MONGO_URI en .env (MongoDB no se conectará).");
  process.exit(1);
} else {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Conectado a MongoDB"))
    .catch((e) => {
      console.error("❌ Error conectando a MongoDB:", e.message);
      process.exit(1);
    });
}

// Rutas bajo /api
app.use("/api", apiRouter);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ message: "Error interno del servidor" });
});

// Ruta 404
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

// Arranque
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Backend escuchando en puerto ${PORT}`));
