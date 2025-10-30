const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const Product = require('../src/models/Product');

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { family: 4 });

    await Product.deleteMany({});
    await Product.insertMany([
      { name: 'Martillo Pro',     description: 'Mango de fibra',      price: 8990,  image: 'martillo.jpg' },
      { name: 'Atornillador 12V', description: 'Inalámbrico',         price: 19990, image: 'atornillador.webp' },
      { name: 'Taladro 600W',     description: '2 velocidades',        price: 34990, image: 'taladro.png' },
      { name: 'Sierra circular',  description: '7 1/4" 24T',           price: 79990, image: 'sierra-circular.webp' },
      { name: 'Cemento especial', description: 'Saco 25 kg',           price: 5990,  image: 'cemento.jpg' },
      { name: 'Pintura látex',    description: 'Antihongos 4L',        price: 12990, image: 'pintura.webp' },
    ]);

    console.log('Seed OK');
  } catch (e) {
    console.error('Seed error:', e.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
})();
