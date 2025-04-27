const {
  getAllRestaurants,
  getAllReadyRestaurantJobs,
  createRestaurant,
  createRestaurantJob,
  updateRestaurant,
  setAvailability,
  getMenuItems,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  setRestaurantJobStatus,
} = require("../data-access/restaurant-dao");
const cron = require("node-cron");
const axios = require("axios");
const User = require("../models/User");

const notificationServiceUrl =
  process.env.NOTIFICATION_SERVICE_URL || `http://localhost:5005`;

const deliveryServiceUrl =
  process.env.DELIVERY_SERVICE_URL || `http://localhost:5004`;

const orderServiceUrl =
  process.env.ORDER_SERVICE_URL || `http://localhost:5003`;

const getAllRestaurantsService = async () => {
  return await getAllRestaurants();
};

const createRestaurantService = async (restaurantData) => {
  return await createRestaurant(restaurantData);
};

const createRestaurantJobService = async (restaurantJobData) => {
  const restaurantJob = await createRestaurantJob(restaurantJobData);

  // await axios.patch(`${orderServiceUrl}/order/status`, {
  //   orderId: restaurantJob.orderId,
  //   status: "preparing",
  // });

  return restaurantJob;
};

const setRestaurantJobStatusService = async (jobId, status) => {
  return await setRestaurantJobStatus(jobId, status);
};

const updateRestaurantService = async (id, data) => {
  return await updateRestaurant(id, data);
};

const setAvailabilityService = async (id, isAvailable) => {
  return await setAvailability(id, isAvailable);
};

const getMenuItemsService = async (restaurantId) => {
  return await getMenuItems(restaurantId);
};

const addMenuItemService = async (restaurantId, menuItemData) => {
  return await addMenuItem(restaurantId, menuItemData);
};

const updateMenuItemService = async (menuItemId, data) => {
  return await updateMenuItem(menuItemId, data);
};

const deleteMenuItemService = async (menuItemId) => {
  return await deleteMenuItem(menuItemId);
};

const MonitorRestaurantJobs = async () => {
  try {
    cron.schedule("*/15 * * * * *", async () => {
      console.log("🔍 Monitoring Restaurant Jobs");

      const restaurantJobs = await getAllReadyRestaurantJobs();
      // console.log("restaurantJobs - ", restaurantJobs);

      restaurantJobs.map(async (job) => {
        await setRestaurantJobStatusService(job._id, "done");
        console.log("Restaurant job status changed!");
        // console.log("job - ", job);

        // //notification api call
        //   const notificationResponse = await axios.post(
        //     `${notificationServiceUrl}/api/notifications/order-confirmation`
        //   );

        // delivery api call
        const deliveryResponse = await axios.post(
          `${deliveryServiceUrl}/deliveries`,
          {
            orderId: job.orderId,
            customerId: job.userId,
            restaurantId: job.restaurantId,
            status: "pending",
            pickupLocation: job.restaurantId.location,
            dropoffLocation: job.userId.location,
          }
        );

        // // order status change api call
        // await axios.patch(`${orderServiceUrl}/order/status`, {
        //   orderId: job.orderId,
        //   status: "searching-drivers",
        // });
      });
    });
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  getAllRestaurantsService,
  createRestaurantService,
  createRestaurantJobService,
  updateRestaurantService,
  setAvailabilityService,
  getMenuItemsService,
  addMenuItemService,
  updateMenuItemService,
  deleteMenuItemService,
  MonitorRestaurantJobs,
};
