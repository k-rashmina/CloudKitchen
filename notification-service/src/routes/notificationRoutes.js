const express = require("express");
const { sendOrderConfirmation } = require("../controllers/notificationController");

const router = express.Router();
router.post("/order-confirmation", sendOrderConfirmation);

module.exports = router;