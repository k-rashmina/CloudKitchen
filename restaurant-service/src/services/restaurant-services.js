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
} = require("../data-access/restaurant-dao");
const cron = require("node-cron");
const axios = require("axios");

const getAllRestaurantsService = async () => {
  return await getAllRestaurants();
};

const createRestaurantService = async (restaurantData) => {
  return await createRestaurant(restaurantData);
};

const createRestaurantJobService = async (restaurantJobData) => {
  return await createRestaurantJob(restaurantJobData);
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
    cron.schedule("* * * * *", async () => {
      console.log("🔍 Monitoring Restaurant Jobs");

      const restaurantJobs = await getAllReadyRestaurantJobs();

      //notification and delivery api calls
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
