// Archivo de prueba para verificar la configuración
require("dotenv/config");

console.log("=== DEBUG INFORMACIÓN ===");
console.log("PORT:", process.env.PORT);
console.log("MONGO_URI existe:", !!process.env.MONGO_URI);
console.log("JWT_SECRET existe:", !!process.env.JWT_SECRET);
console.log("CORS_ORIGIN:", process.env.CORS_ORIGIN);

// Probar conexión a MongoDB
const mongoose = require("mongoose");

async function testConnection() {
    try {
        console.log("Intentando conectar a MongoDB...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Conexión a MongoDB exitosa");
        
        // Probar crear un usuario de prueba
        const User = require("./src/models/User");
        const testUser = {
            name: "Test User",
            email: "debug@test.com",
            password: "hashedpassword",
        };
        
        // Verificar si existe
        const exists = await User.findOne({ email: testUser.email });
        if (exists) {
            console.log("✅ Usuario de prueba ya existe");
        } else {
            console.log("ℹ️ Creando usuario de prueba...");
            await User.create(testUser);
            console.log("✅ Usuario de prueba creado");
        }
        
        process.exit(0);
    } catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
}

testConnection();