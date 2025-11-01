require("dotenv").config({ path: "./.env" });
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Routers
const authRouter = require("./routes/auth.routes");
const productsRouter = require("./routes/products.routes");
const stripeRouter = require("./routes/stripe.routes");

const app = express();
const PORT = process.env.PORT || 3000;
const ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(cors({ origin: ORIGIN, credentials: true }));
app.use(express.json());

// ---------- Conexión Mongo (con guardas) ----------
let MONGO_URI = (process.env.MONGODB_URI || process.env.MONGO_URI || "").trim();
// por si alguien dejó comillas al copiar/pegar
MONGO_URI = MONGO_URI.replace(/^"+|"+$/g, "").replace(/^'+|'+$/g, "");

if (!MONGO_URI) {
  console.error("Falta MONGODB_URI en backend/.env");
} else {
  mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB conectado"))
    .catch((err) => console.error("Error MongoDB:", err.message));
}

// Health
app.get("/api/health", (_req, res) => {
  const db = mongoose.connection.readyState === 1 ? "mongo" : "down";
  res.json({ ok: true, db });
});

// Rutas
app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/stripe", stripeRouter);

// Start
app.listen(PORT, () => console.log(`Backend en http://localhost:${PORT}`));