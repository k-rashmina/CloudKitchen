const {
  getAllRestaurantsService,
  createRestaurantService,
  createRestaurantJobService,
  updateRestaurantService,
  setAvailabilityService,
  getMenuItemsService,
  addMenuItemService,
  updateMenuItemService,
  deleteMenuItemService,
} = require("../services/restaurant-services");
const { getAllReadyRestaurantJobs } = require("../data-access/restaurant-dao");
const axios = require("axios");

const getAllRestaurantsCtrl = async (req, res) => {
  try {
    const data = await getAllRestaurantsService();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllRestaurantJobsCtrl = async (req, res) => {
  try {
    const data = await getAllReadyRestaurantJobs();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createRestaurantCtrl = async (req, res) => {
  try {
    const newRestaurant = await createRestaurantService(req.body);
    res.status(201).json(newRestaurant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const createRestaurantJobCtrl = async (req, res) => {
  try {
    const newRestaurant = await createRestaurantJobService(req.body);
    res.status(201).json(newRestaurant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateRestaurantCtrl = async (req, res) => {
  try {
    const updated = await updateRestaurantService(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const setAvailabilityCtrl = async (req, res) => {
  try {
    const updated = await setAvailabilityService(
      req.params.id,
      req.body.isAvailable
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getMenuItemsCtrl = async (req, res) => {
  try {
    const items = await getMenuItemsService(req.params.restaurantId);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addMenuItemCtrl = async (req, res) => {
  try {
    const item = await addMenuItemService(req.params.restaurantId, req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateMenuItemCtrl = async (req, res) => {
  try {
    const updated = await updateMenuItemService(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteMenuItemCtrl = async (req, res) => {
  try {
    await deleteMenuItemService(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllRestaurantsCtrl,
  getAllRestaurantJobsCtrl,
  createRestaurantCtrl,
  createRestaurantJobCtrl,
  updateRestaurantCtrl,
  setAvailabilityCtrl,
  getMenuItemsCtrl,
  addMenuItemCtrl,
  updateMenuItemCtrl,
  deleteMenuItemCtrl,
};
