const Product = require("../models/Product");

// Existing function to get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.render("products", { products, user: req.session.user });
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// New function to get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.render("product-detail", { product, user: req.session.user });
  } catch (err) {
    res.status(500).send("Server error");
  }
};
