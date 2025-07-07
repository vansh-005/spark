const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  originalPrice: Number, // For discounts
  image: String,
  category: String,
  tags: [String],
  rating: Number
});

module.exports = mongoose.model('Product', ProductSchema);
