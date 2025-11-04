// backend/src/server.js
require("dotenv/config");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const apiRouter = require("./router"); 

const app = express();
app.set("trust proxy", 1);

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));

const allowed = (process.env.CORS_ORIGIN || "http://localhost:5173")
  .split(",")
  .map(s => s.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, cb) => (!origin || allowed.includes(origin)) ? cb(null, true) : cb(new Error("CORS: " + origin)),
  credentials: true,
}));

app.get("/", (_, res) => res.send("API Ferretería OK"));
app.get("/api/health", (_, res) => res.json({ status: "ok", at: new Date() }));

app.use("/api", apiRouter);

app.use((req, res) => res.status(404).json({ message: "Ruta no encontrada" }));
app.use((err, req, res, next) => {
  console.error("💥 Error no manejado:", err.message);
  res.status(500).json({ message: "Error interno del servidor" });
});

const PORT = process.env.PORT || 3000;
const URI = process.env.MONGO_URI;

(async () => {
  try {
    if (!URI) throw new Error("MONGO_URI no está definido");
    await mongoose.connect(URI);
    console.log("✅ MongoDB conectado");
    app.listen(PORT, () => console.log(`🚀 Backend escuchando en puerto ${PORT}`));
  } catch (e) {
    console.error("❌ No se pudo iniciar el servidor:", e.message);
    process.exit(1);
  }
})();
