const express = require("express");
const {
  getProducts,
  getProductById,
} = require("../controllers/productController");
const { protect } = require("../controllers/authController");
const router = express.Router();

// Get all products, (authenticated)
router.get("/", protect, getProducts);

// Get a specific product by ID, (authenticated)
router.get("/:id", protect, getProductById);

module.exports = router;
