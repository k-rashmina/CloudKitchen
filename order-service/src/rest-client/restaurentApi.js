const axios = require("axios");

const notifyRestaurantService = async (order) => {
  const formattedItems = order.items.map(item => ({
    itemId: item.itemId,
    quantity: item.quantity,
  }));

  const payload = {
    userId: order.userId,
    restaurantId: order.restaurantId,
    orderId: order._id,
    items: formattedItems,
    totalAmount: order.totalAmount,
    status: order.status,
  };

  try {
    const response = await axios.post("http://restaurant-service:5002/restaurantsJob", payload);
    console.log("📡 Notified Restaurant Service:", JSON.stringify(payload, null, 2));
  } catch (err) {
    console.error("❌ Failed to notify restaurant-service:", err.message);
  }
};

module.exports = { notifyRestaurantService };
