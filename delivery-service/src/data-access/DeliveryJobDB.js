const Delivery = require("../models/deliveryJob");
// const User = require("../models/User");

const createDelivery = async (data) => {
  const delivery = new Delivery(data);
  return await delivery.save();
};

const assignDriver = async (deliveryId, driverId) => {
  return await Delivery.findByIdAndUpdate(
    deliveryId,
    {
      driverId,
      status: "assigned",
    },
    { new: true }
  );
};

const updateStatus = async (id, status) => {
  return await Delivery.findByIdAndUpdate(id, { status }, { new: true });
};

const updateDeliveryJob = async (deliveryJob) => {
  return await Delivery.findByIdAndUpdate(deliveryJob._id, deliveryJob);
};

const getById = async (id) => {
  return await Delivery.findById(id).populate("restaurantId");
  // .populate("orderId")
  // .populate("items.itemId");
};

const getByOrderId = async (orderId) => {
  return await Delivery.findOne({ orderId: orderId }).populate([
    "driverId",
    "customerId",
  ]);
};

const getPendingDeliveries = async () => {
  return await Delivery.find({ status: "pending" });
};

module.exports = {
  createDelivery,
  assignDriver,
  updateStatus,
  getById,
  getPendingDeliveries,
  updateDeliveryJob,
  getByOrderId,
};
