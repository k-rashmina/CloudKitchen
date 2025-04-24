const Delivery = require("../models/deliveryJob");

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

const getById = async (id) => {
  return await Delivery.findById(id)
    .populate("driverId")
    .populate("restaurantId")
    .populate("orderId")
    .populate("items.itemId");
};

module.exports = {
  createDelivery,
  assignDriver,
  updateStatus,
  getById,
};
