const { Client } = require("@googlemaps/google-maps-services-js");
const cron = require("node-cron");
const {
  createDelivery,
  assignDriver,
  updateStatus,
  getById,
  getPendingDeliveries,
  updateDeliveryJob,
  getByOrderId
} = require("../data-access/DeliveryJobDB");
const {
  getAvailable,
  findAvailableNearby,
  markAssigned,
  updateLocation,
} = require("../data-access/DriverDB");

const client = new Client({});

const orderServiceUrl =
  process.env.ORDER_SERVICE_URL || `http://localhost:5003`;

const notificationServiceUrl =
  process.env.NOTIFICATION_SERVICE_URL || `http://localhost:5005`;

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

const updateDeliveryJobService = async (deliveryJob) => {
  return await updateDeliveryJob(deliveryJob);
};

const getDeliveryByIdService = async (id) => {
  return await getById(id);
};

const getDeliveryByOrderIdService = async (orderId) => {
  return await getByOrderId(orderId);
};

const getAvailableDriversService = async () => {
  return await getAvailable();
};

const updateDriverLocationService = async (driverId, coordinates) => {
  return await updateLocation(driverId, coordinates);
};

const MonitorDeliveryJobs = async () => {
  try {
    cron.schedule("*/15 * * * * *", async () => {
      const pendingDeliveries = await getPendingDeliveries();
      // console.log("pendingDeliveries - ", pendingDeliveries);

      pendingDeliveries.forEach(async (delivery) => {
        const availableDrivers = await getAvailableDriversService();
        // console.log("availableDrivers - ", availableDrivers);

        if (availableDrivers.length == 0) {
          return;
        }

        const origins = [delivery.pickupLocation];
        let destinations = [];
        availableDrivers.forEach((driver) => {
          destinations.push(driver.currentLocation);
        });

        // console.log("origins - ", origins);
        // console.log("destinations - ", destinations);

        const elems = await getDistanceValues(origins, destinations);
        // console.log("elems - ", elems);

        let indexWithMinimumDistanceValue = 0;

        for (let i = 0; i < elems.length; i++) {
          if (
            elems[i].distance.value <
            elems[indexWithMinimumDistanceValue].distance.value
          ) {
            indexWithMinimumDistanceValue = i;
          }
        }

        const nearestDriver =
          availableDrivers[indexWithMinimumDistanceValue]._id;

        delivery.driverId = nearestDriver;
        delivery.status = "assigned";

        await updateDeliveryJobService(delivery);

        // order status change api call
        await axios.patch(`${orderServiceUrl}/order/status`, {
          orderId: delivery.orderId,
          status: "on-the-way",
        });

        // //notification api call
        // const notificationResponse = await axios.post(
        //   `${notificationServiceUrl}/api/notifications/dnotification`,
        //   {
        //     driverId: delivery.driverId,
        //     deliveryJobId: delivery._id
        //   }
        // );

      });
    });
  } catch (e) {
    console.log(e.message);
  }
};

const getDistanceValues = async (origin, destinations) => {
  try {
    const response = await client.distancematrix({
      params: {
        origins: origin,
        destinations: destinations,
        travelMode: "DRIVING",
        key: process.env.GOOGLE_API_KEY || "AIzaSyCjgDOFzVZR8aWVM4SoZMRO0Hw4Lb883Ec",
      },
    });

    // console.log("response.data - ", response.data);

    return response.data.rows[0].elements;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  createDeliveryService,
  assignDriverService,
  updateStatusService,
  getDeliveryByIdService,
  getAvailableDriversService,
  updateDriverLocationService,
  MonitorDeliveryJobs,
  getDeliveryByOrderIdService
};
