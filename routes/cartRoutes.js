const express = require("express");
const {
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
  getCartCount,
} = require("../controllers/cartController");
const { protect } = require("../controllers/authController");
const router = express.Router();

// Get cart (authenticated)
router.get("/", protect, getCart);

// Add to cart (authenticated)
router.post("/add", protect, addToCart);

// Update cart (authenticated)
router.post("/update", protect, updateCart);

// Remove from cart (authenticated)
router.post("/remove", protect, removeFromCart);

// Get cart count (authenticated)
router.get("/count", protect, getCartCount);

module.exports = router;
