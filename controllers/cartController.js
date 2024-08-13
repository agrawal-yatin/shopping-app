const Cart = require("../models/Cart");

let wss;

// WebSocket server instance
exports.setWebSocketServer = (wsServer) => {
  wss = wsServer;
};

// Utility function to notify all clients
const notifyClients = (cart) => {
  if (wss) {
    wss.clients.forEach((client) => {
      if (client.readyState === client.OPEN) {
        client.send(JSON.stringify({ type: "CART_UPDATE", cart }));
      }
    });
  }
};

// Fetch and render the user's cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate(
      "products.product"
    );
    res.render("cart", { cart });

    // Notify all clients about the cart update
    notifyClients(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a product to the user's cart
exports.addToCart = async (req, res) => {
  const { productId } = req.body;
  try {
    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      cart = await Cart.create({
        userId: req.user._id,
        products: [{ product: productId }],
      });
    } else {
      const productIndex = cart.products.findIndex(
        (p) => p.product.toString() === productId
      );
      if (productIndex > -1) {
        cart.products[productIndex].quantity += 1;
      } else {
        cart.products.push({ product: productId });
      }
    }
    await cart.save();

    // Notify all clients about the cart update
    notifyClients(cart);

    res.redirect("/cart");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update the quantity of a product in the user's cart
exports.updateCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    const productIndex = cart.products.findIndex(
      (p) => p.product.toString() === productId
    );
    if (productIndex > -1) {
      cart.products[productIndex].quantity = quantity;
    }
    await cart.save();

    // Notify all clients about the cart update
    notifyClients(cart);

    res.redirect("/cart");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove a product from the user's cart 
exports.removeFromCart = async (req, res) => {
  const { productId } = req.body;
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    cart.products = cart.products.filter(
      (p) => p.product.toString() !== productId
    );
    await cart.save();

    // Notify all clients about the cart update
    notifyClients(cart);

    res.redirect("/cart");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get the total count of cart items
exports.getCartCount = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    const totalItems = cart
      ? cart.products.reduce((sum, item) => sum + item.quantity, 0)
      : 0;
    res.json({ totalItems });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
