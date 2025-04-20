const { handleOrderCreation } = require("../services/orderService");

const createOrder = async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { restaurantId, items, totalAmount } = req.body;

    if (!restaurantId || !Array.isArray(items) || items.length === 0 || !totalAmount) {
      return res.status(400).json({ message: "Missing or invalid required fields" });
    }

    const order = await handleOrderCreation({ userId, restaurantId, items, totalAmount });

    res.status(201).json({ message: "Order Created", order });
  } catch (error) {
    console.error("Order Creation Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { createOrder };
