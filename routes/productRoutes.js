const express = require("express");
const {
  getProducts,
  getProductById,
} = require("../controllers/productController");
const { protect } = require("../controllers/authController");
const router = express.Router();

// Route to get all products, protected by authentication
router.get("/", protect, getProducts);

// Route to get a specific product by ID, also protected by authentication if needed
router.get("/:id", protect, getProductById);

module.exports = router;
