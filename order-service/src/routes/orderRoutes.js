const express = require("express");
const router = express.Router();
const { createOrder,updateOrderStatus } = require("../controllers/orderController");

router.post("/", createOrder);
router.patch("/status", updateOrderStatus); 

module.exports = router;
