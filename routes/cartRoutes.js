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

router.get("/", protect, getCart);
router.post("/add", protect, addToCart);
router.post("/update", protect, updateCart);
router.post("/remove", protect, removeFromCart);
router.get("/count", protect, getCartCount);

module.exports = router;
