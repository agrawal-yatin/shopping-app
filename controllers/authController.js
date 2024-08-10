const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Render the registration page
exports.renderRegisterPage = (req, res) => {
  res.render("register", { title: "Register", user: req.session.user });
};

// Handle user registration
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.create({ username, password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    req.session.user = user; // Store user info in session
    res.status(201).redirect("/"); // Redirect to products page
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Render the login page
exports.renderLoginPage = (req, res) => {
  res.render("login", { title: "Login", user: req.session.user });
};

// Handle user login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    req.session.user = user; // Store user info in session
    res.redirect("/"); // Redirect to products page
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Handle user logout
exports.logout = (req, res) => {
  res.clearCookie("token"); // Clear the token cookie
  // Log the user out
  req.session.destroy(() => {
    res.redirect("/"); // Redirect to home or login page
  });
};

// Protect routes using JWT
exports.protect = async (req, res, next) => {
  let token;
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ error: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    res.status(401).json({ error: "Token is not valid" });
  }
};