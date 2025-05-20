const express = require("express");
const router = express.Router();
const {
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
} = require("./controllers/restaurant-ctrl");

router.get("/restaurants", getAllRestaurantsCtrl);
router.get("/restaurantJobs", getAllRestaurantJobsCtrl);
router.post("/restaurants", createRestaurantCtrl);
router.post("/restaurantsJob", createRestaurantJobCtrl);
router.put("/restaurants/:id", updateRestaurantCtrl);
router.put("/restaurants/:id/availability", setAvailabilityCtrl);
router.put("/restaurants/status", updateRestaurantJobStatus);

router.get("/menus/:restaurantId", getMenuItemsCtrl);
router.post("/menus/:restaurantId", addMenuItemCtrl);
router.put("/menus/:id", updateMenuItemCtrl);
router.delete("/menus/:id", deleteMenuItemCtrl);

module.exports = router;
