const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI no está definido en .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri); // dbName viene en el URI
    console.log('Conectado a MongoDB Atlas');
  } catch (err) {
    console.error('Error conectando a MongoDB:', err.message);
    process.exit(1);
  }

  
  mongoose.connection.on('error', (err) => {
    console.error('Mongo error:', err.message);
  });
}

module.exports = connectDB;
