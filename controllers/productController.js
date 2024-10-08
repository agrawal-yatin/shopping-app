const Product = require("../models/Product");

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.render("products", { products, user: req.session.user });
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const products = await Product.find(); 

    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.render("product-detail", { product, products, user: req.session.user });
  } catch (err) {
    res.status(500).send("Server error");
  }
};
