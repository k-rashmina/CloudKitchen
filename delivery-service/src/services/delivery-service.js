const {
  createDelivery,
  assignDriver,
  updateStatus,
  getById,
} = require("../data-access/DeliveryJobDB");
const {
  getAvailable,
  findAvailableNearby,
  markAssigned,
  updateLocation,
} = require("../data-access/DriverDB");

const createDeliveryService = async (data) => {
  return await createDelivery(data);
};

const assignDriverService = async (deliveryId) => {
  const availableDriver = await findAvailableNearby(); // can use mock
  if (!availableDriver) throw new Error("No available drivers");

  await markAssigned(availableDriver._id);
  return await assignDriver(deliveryId, availableDriver._id);
};

const updateStatusService = async (deliveryId, status) => {
  return await updateStatus(deliveryId, status);
};

const getDeliveryByIdService = async (id) => {
  return await getById(id);
};

const getAvailableDriversService = async () => {
  return await getAvailable();
};

const updateDriverLocationService = async (driverId, coordinates) => {
  return await updateLocation(driverId, coordinates);
};

module.exports = {
  createDeliveryService,
  assignDriverService,
  updateStatusService,
  getDeliveryByIdService,
  getAvailableDriversService,
  updateDriverLocationService,
};
