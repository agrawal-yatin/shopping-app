const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Render registration page
exports.renderRegisterPage = (req, res) => {
  res.render("register", { title: "Register", user: req.session.user });
};

// Handle user registration
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    req.session.user = user;
    res.status(201).redirect("/");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Render login page
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
    req.session.user = user;
    res.redirect("/");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Handle user logout
exports.logout = (req, res) => {
  res.clearCookie("token");
  // Log the user out
  req.session.destroy(() => {
    res.redirect("/");
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