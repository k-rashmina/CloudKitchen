const Restaurant = require("../models/restaurant");
const MenuItem = require("../models/menuItem");
const RestaurantJob = require("../models/restaurantJob");

const getAllRestaurants = async () => {
  return await Restaurant.find().populate("menuItems");
};

const getAllReadyRestaurantJobs = async () => {
  return await RestaurantJob.find({ status: "ready" }).populate("items.itemId");
};

const createRestaurant = async (data) => {
  const restaurant = new Restaurant(data);
  return await restaurant.save();
};

const createRestaurantJob = async (data) => {
  const restaurantJob = new RestaurantJob(data);
  return await restaurantJob.save();
};

const updateRestaurant = async (id, data) => {
  return await Restaurant.findByIdAndUpdate(id, data, { new: true });
};

const setAvailability = async (id, isAvailable) => {
  return await Restaurant.findByIdAndUpdate(id, { isAvailable }, { new: true });
};

const getMenuItems = async (restaurantId) => {
  return await MenuItem.find({ restaurantId });
};

const addMenuItem = async (restaurantId, menuItemData) => {
  const menuItem = new MenuItem({ ...menuItemData, restaurantId });
  const saved = await menuItem.save();
  await Restaurant.findByIdAndUpdate(restaurantId, {
    $push: { menuItems: saved._id },
  });
  return saved;
};

const updateMenuItem = async (id, data) => {
  return await MenuItem.findByIdAndUpdate(id, data, { new: true });
};

const deleteMenuItem = async (id) => {
  const menuItem = await MenuItem.findById(id);
  if (menuItem) {
    await Restaurant.findByIdAndUpdate(menuItem.restaurantId, {
      $pull: { menuItems: id },
    });
    await menuItem.remove();
  }
};

module.exports = {
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
};
