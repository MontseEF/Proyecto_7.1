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
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Conexión Mongo
if (!process.env.MONGO_URI) {
  console.warn("Falta MONGO_URI en .env (Mongo no se conectará).");
} else {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Conectado a MongoDB"))
    .catch((e) => console.error("Error MongoDB:", e.message));
}

// Rutas bajo /api
app.use("/api", apiRouter);

// Arranque
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend escuchando en puerto ${PORT}`));
