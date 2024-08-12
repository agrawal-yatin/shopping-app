const express = require("express");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { Server } = require("ws");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const connectDB = require("./config/db");
const User = require("./models/User");
const Product = require("./models/Product");
const crypto = require("crypto");
const cartController = require("./controllers/cartController");


// Generate a dynamic JWT secret
process.env.JWT_SECRET = crypto.randomBytes(64).toString("hex");

// Generate a dynamic session secret
process.env.SESSION_SECRET = crypto.randomBytes(64).toString("hex");

dotenv.config(); 

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
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
  res.locals.user = req.user;
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

app.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.render("index", { products, user: req.user }); 
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

// Set WebSocket server in CartController
cartController.setWebSocketServer(wss);

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
