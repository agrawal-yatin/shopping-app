const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
  description: { type: String, required: false },
  sku: { type: String, required: false },
});

module.exports = mongoose.model("Product", productSchema);
