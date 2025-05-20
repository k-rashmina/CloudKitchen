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
const mongoose = require("mongoose");
const RestaurantJob = require("../models/restaurantJob");


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

// const createRestaurantJobCtrl = async (req, res) => {
//   try {
//     const newRestaurant = await createRestaurantJobService(req.body);
//     res.status(201).json(newRestaurant);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

const createRestaurantJobCtrl = async (req, res) => {
  try {
    const {
      userId,
      restaurantId,
      orderId,
      items,
      totalAmount,
      status
    } = req.body;

    // Validate required fields
    if (!userId || !restaurantId || !orderId || !items || !totalAmount || !status) {
      throw new Error('Missing required fields');
    }

    // Validate items array
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error('Items must be a non-empty array');
    }

    // Helper function to validate and convert ID
    const toObjectId = (id, fieldName) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`Invalid ${fieldName} ID`);
      }
      return new mongoose.Types.ObjectId(id);
    };

    const transformedPayload = {
      userId: toObjectId(userId, 'user'),
      restaurantId: toObjectId(restaurantId, 'restaurant'),
      orderId: toObjectId(orderId, 'order'),
      items: items.map(item => {
        if (!item.itemId || !item.quantity) {
          throw new Error('Each item must have itemId and quantity');
        }
        return {
          itemId: toObjectId(item.itemId, 'item'),
          quantity: item.quantity
        };
      }),
      totalAmount,
      status
    };

    const newRestaurant = await createRestaurantJobService(transformedPayload);
    res.status(201).json(newRestaurant);
  } catch (err) {
    console.error("Error creating restaurant job:", err);
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

const updateRestaurantJobStatus = async (req, res) => {
  try {
    const updated = await RestaurantJob.findByIdAndUpdate(req.body._id, {status: req.body.status})
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
  updateRestaurantJobStatus
};
