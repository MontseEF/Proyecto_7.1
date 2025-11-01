require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// --- Esquemas locales (no importamos nada externo) ---
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  stock: Number,
  image: String,
});
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "user" },
});

const Product = mongoose.model("Product", productSchema);
const User = mongoose.model("User", userSchema);

// --- Datos de la ferretería ---
const products = [
  { name: "Taladro", description: "Taladro eléctrico industrial", price: 45990, stock: 15, image: "taladro.png" },
  { name: "Martillo", description: "Martillo de carpintero acero", price: 7990, stock: 50, image: "martillo.jpg" },
  { name: "Pintura Látex", description: "Pintura látex interior 1 galón", price: 18990, stock: 20, image: "pintura.webp" },
  { name: "Cemento", description: "Cemento 25kg alta resistencia", price: 6490, stock: 40, image: "cemento.jpg" },
  { name: "Atornillador", description: "Atornillador manual multiuso", price: 3990, stock: 80, image: "atornillador.webp" },
  { name: "Sierra Circular", description: "Sierra circular corte madera", price: 52990, stock: 12, image: "sierra-circular.webp" },
];

// contraseña “123456” ya hasheada
const adminUser = {
  name: "Admin",
  email: "admin@ferreteria.com",
  password: bcrypt.hashSync("123456", 10), // hash en runtime
  role: "admin",
};

async function seed() {
  const uri = (process.env.MONGODB_URI || "").trim();
  if (!uri) {
    console.error("Falta MONGODB_URI en backend/.env");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log("Conectado a Mongo para seed");

    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Productos insertados:", products.length);

    // upsert admin (para que no reviente por unique si ya existe)
    await User.updateOne(
      { email: adminUser.email },
      { $set: adminUser },
      { upsert: true }
    );
    console.log("Usuario admin listo (admin@ferreteria.com / 123456)");
  } catch (err) {
    console.error("Error en seed:", err.message);
  } finally {
    await mongoose.disconnect();
    console.log("Conexión cerrada");
    process.exit(0);
  }
}

seed();