const Order = require("../models/Order");
const { publishToQueue } = require("../utils/rabbitmq");

const handleOrderCreation = async ({ userId, restaurantId, items, totalAmount }) => {
  const newOrder = new Order({
    userId,
    restaurantId,
    items,
    totalAmount,
    status: "pending",
  });

  const savedOrder = await newOrder.save();

  // Publish to RabbitMQ
  publishToQueue("order_created", savedOrder);

  return savedOrder;
};

module.exports = { handleOrderCreation };
