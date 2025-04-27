const express = require("express");
const cartRoutes = require("./cartRoutes");
// const paymentRoutes = require("./paymentRoutes");

const router = express.Router();

// Health Check
router.get("/", (req, res) => {
  res.send("Payment Service Running 🚀");
});

// Mount routes
router.use(cartRoutes);
// router.use(paymentRoutes);

module.exports = router;
