const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken"); // Make sure to import jwt
const { Server } = require("ws");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const connectDB = require("./config/db");
const User = require("./models/User"); // Import User model
const Product = require("./models/Product"); // Ensure you have this model

dotenv.config(); 

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// Middleware to set user based on token
app.use(async (req, res, next) => {
  if (req.cookies && req.cookies.token) {
    try {
      const token = req.cookies.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
    } catch (err) {
      req.user = null;
    }
  } else {
    req.user = null;
  }
  res.locals.user = req.user; // Make `user` available in views
  next();
});

// Set view engine
app.set("view engine", "ejs");

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

// Routes
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);

// Home route
// app.get("/", (req, res) => {
//   res.render("index", { user: req.user }); // Render index.ejs and pass user object
// });

app.get("/", async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products
    res.render("index", { products, user: req.user }); // Pass products to view
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// WebSocket server for real-time updates
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});

const wss = new Server({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (message) => {
    console.log("Received:", message);
    // Broadcast the message to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});
