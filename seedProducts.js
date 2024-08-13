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
    name: "Fjallraven Foldsack Backpack",
    price: 109.95,
    description:
      "Perfect pack for everyday use and walks in the forest. Padded sleeve fits laptops up to 15 inches.",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  },
  {
    name: "Mens Casual Slim Fit T-Shirt",
    price: 22.3,
    description:
      "Slim fit, contrast raglan sleeves, lightweight fabric, three-button henley placket.",
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
  },
  {
    name: "Mens Cotton Jacket",
    price: 55.99,
    description:
      "Great for Spring/Autumn/Winter. Suitable for work, hiking, and outdoors. A good gift choice.",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
  },
  {
    name: "Mens Casual Slim Fit",
    price: 15.99,
    description: "Color may vary slightly. Detailed size information is below.",
    image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
  },
  {
    name: "BIYLACLESEN Snowboard Jacket",
    price: 56.99,
    description:
      "US standard size. 100% Polyester. Detachable liner, adjustable hood, and multiple pockets.",
    image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
  },
  {
    name: "Leather Moto Jacket",
    price: 29.95,
    description:
      "100% Polyurethane shell, faux leather. 2 front pockets, removable hood, and button details.",
    image: "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
  },
  {
    name: "Rain Jacket Women Windbreaker",
    price: 39.99,
    description:
      "Lightweight raincoat with hood, adjustable waist, button and zipper closure, and side pockets.",
    image: "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
  },
  {
    name: "MBJ Short Sleeve V-Neck",
    price: 9.85,
    description:
      "95% Rayon, 5% Spandex. Lightweight fabric with great stretch, ribbed sleeves and neckline.",
    image: "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
  },
  {
    name: "Short Sleeve Moisture Tee",
    price: 7.95,
    description:
      "100% Polyester. Lightweight, breathable, moisture-wicking fabric, V-neck collar.",
    image: "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg",
  },
  {
    name: "DANVOUY Casual Cotton T-Shirt",
    price: 12.99,
    description:
      "95% Cotton, 5% Spandex. Casual, short sleeve, letter print, V-neck, suitable for various occasions.",
    image: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
  },
];
;

// Function to add products to the database
const seedProducts = async () => {
  try {
    const existingProducts = await Product.find(); // Check for existing products

    if (existingProducts.length > 0) {
      console.log("Products already exist. Skipping seeding.");
    } else {
      await Product.insertMany(products);
      console.log("Dummy products added successfully");
    }

    mongoose.connection.close(); // Close the connection after seeding or skipping
  } catch (error) {
    console.error("Error adding products:", error.message);
    mongoose.connection.close();
  }
};

seedProducts();
