const { Schema, model } = require('mongoose');

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true, min: 0 },
    imageUrl: String, // para más adelante
  },
  { timestamps: true }
);

module.exports = model('Product', ProductSchema);
