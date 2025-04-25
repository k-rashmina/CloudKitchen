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



  
  const handleOrderStatusUpdate = async (orderId, status) => {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
  
    return updatedOrder;
  };

  const getUserOrdersFromDB = async (userId) => {
    return await Order.find({ userId });
  };






  
  module.exports = {
    handleOrderCreation,
    handleOrderStatusUpdate,
    getUserOrdersFromDB,
  };



