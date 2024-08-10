const express = require("express");
const {
  register,
  login,
  renderRegisterPage,
  renderLoginPage,
  logout,
} = require("../controllers/authController");
const router = express.Router();

// Render registration page
router.get("/register", renderRegisterPage);

// Handle registration form submission
router.post("/register", register);

// Render login page
router.get("/login", renderLoginPage);

// Handle login form submission
router.post("/login", login);

// Handle logout
router.get("/logout", logout);

module.exports = router;
