// seedProducts.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

// Dummy products array
const products = [
  {
    "name": "Dummy Product 1",
    "price": 29.99,
    "image": "https://via.placeholder.com/150"
  },
  {
    "name": "Dummy Product 2",
    "price": 39.99,
    "image": "https://via.placeholder.com/150"
  },
  {
    "name": "Dummy Product 3",
    "price": 19.99,
    "image": "https://via.placeholder.com/150"
  }
];

// Function to add products to the database
const seedProducts = async () => {
  try {
    await Product.deleteMany(); // Clear existing products if needed
    await Product.insertMany(products);
    console.log("Dummy products added successfully");
    mongoose.connection.close(); // Close the connection after seeding
  } catch (error) {
    console.error("Error adding products:", error.message);
    mongoose.connection.close();
  }
};

seedProducts();
