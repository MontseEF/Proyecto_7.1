const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const Product = require('../src/models/Product');


(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Product.deleteMany({});
    await Product.insertMany([
      { name: 'Martillo Pro', description: 'Mango de fibra', price: 8990 },
      { name: 'Taladro 600W', description: '2 velocidades', price: 34990 },
      { name: 'Atornillador', description: 'Inalámbrico', price: 19990 },
    ]);
    console.log('Seed OK');
  } catch (e) {
    console.error('Seed error:', e.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
})();
