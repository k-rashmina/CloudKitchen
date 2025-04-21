const express = require("express");
const router = express.Router();
const {
  getAllRestaurantsCtrl,
  createRestaurantCtrl,
  createRestaurantJobCtrl,
  updateRestaurantCtrl,
  setAvailabilityCtrl,
  getMenuItemsCtrl,
  addMenuItemCtrl,
  updateMenuItemCtrl,
  deleteMenuItemCtrl,
} = require("./controllers/restaurant-ctrl");

router.get("/restaurants", getAllRestaurantsCtrl);
router.post("/restaurants", createRestaurantCtrl);
router.post("/restaurantsJob", createRestaurantJobCtrl);
router.put("/restaurants/:id", updateRestaurantCtrl);
router.put("/restaurants/:id/availability", setAvailabilityCtrl);

router.get("/menus/:restaurantId", getMenuItemsCtrl);
router.post("/menus/:restaurantId", addMenuItemCtrl);
router.put("/menus/:id", updateMenuItemCtrl);
router.delete("/menus/:id", deleteMenuItemCtrl);

module.exports = router;
