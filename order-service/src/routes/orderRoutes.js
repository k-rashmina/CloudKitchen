const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.post("/", async (req, res) => {
  try {
    const userId = req.headers["x-user-id"]; // From API Gateway or frontend
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { restaurantId, items, totalAmount } = req.body;

    // Basic validation
    if (!restaurantId || !Array.isArray(items) || items.length === 0 || !totalAmount) {
      return res.status(400).json({ message: "Missing or invalid required fields" });
    }

    const newOrder = new Order({
      userId,
      restaurantId,
      items,
      totalAmount,
      status: "pending", // Default order status
    });

    const savedOrder = await newOrder.save();

    return res.status(201).json({ message: "Order Created", order: savedOrder });
  } catch (error) {
    console.error("Order Creation Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
