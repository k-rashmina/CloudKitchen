const express = require("express");
const router = express.Router();

// Example: Get all cart items
router.get("/cart", (req, res) => {
  res.json({ message: "Get all cart items 🛒" });
});

// Example: Add item to cart
router.post("/cart", (req, res) => {
  res.json({ message: "Add item to cart 🛒" });
});

module.exports = router;
