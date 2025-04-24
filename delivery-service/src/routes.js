const express = require("express");
const router = express.Router();
const {
  createDeliveryCtrl,
  assignDriverCtrl,
  updateStatusCtrl,
  getDeliveryCtrl,
  getAvailableDriversCtrl,
  updateDriverLocationCtrl,
  createDriverCtrl,
} = require("./controllers/delivery-ctrl");

router.post("/deliveries", createDeliveryCtrl);
router.put("/deliveries/:id/assign", assignDriverCtrl);
router.put("/deliveries/:id/status", updateStatusCtrl);
router.get("/deliveries/:id", getDeliveryCtrl);

router.post("/driver", createDriverCtrl);
router.get("/drivers/available", getAvailableDriversCtrl);
router.put("/drivers/:id/location", updateDriverLocationCtrl);

module.exports = router;
