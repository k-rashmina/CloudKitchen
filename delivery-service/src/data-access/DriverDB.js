const Driver = require("../models/driver");

const getAvailable = async () => {
  return await Driver.find({ status: "available" });
};

// Simulated — in reality, you'd use $near queries with location
const findAvailableNearby = async () => {
  return await Driver.findOne({ status: "available" });
};

const markAssigned = async (driverId) => {
  return await Driver.findByIdAndUpdate(driverId, { status: "assigned" });
};

const updateLocation = async (driverId, coordinates) => {
  return await Driver.findByIdAndUpdate(
    driverId,
    {
      currentLocation: {
        type: "Point",
        coordinates,
      },
      lastActive: new Date(),
    },
    { new: true }
  );
};

module.exports = {
  getAvailable,
  findAvailableNearby,
  markAssigned,
  updateLocation,
};
