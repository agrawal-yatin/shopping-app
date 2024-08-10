const express = require("express");
const { getProducts } = require("../controllers/productController");
const { protect } = require("../controllers/authController");
const router = express.Router();

router.get("/", protect, getProducts);

module.exports = router;
