const { handleOrderCreation , handleOrderStatusUpdate } = require("../services/orderService");

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

const updateOrderStatus = async (req, res) => {
    try {
      const { orderId, status } = req.body;
  
      if (!orderId || !status) {
        return res.status(400).json({ message: "Order ID and new status are required" });
      }
  
      const updatedOrder = await handleOrderStatusUpdate(orderId, status);
      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      res.status(200).json({ message: "Order status updated", order: updatedOrder });
    } catch (err) {
      console.error("Update Order Status Error:", err);
      res.status(500).json({ message: "Server Error" });
    }
  };

module.exports = { createOrder ,updateOrderStatus };
