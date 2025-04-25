const express = require("express");
const router = express.Router();
const { createOrder,updateOrderStatus,getOrdersByUser } = require("../controllers/orderController");

router.post("/", createOrder);
router.patch("/status", updateOrderStatus); 
router.get("/user-orders", getOrdersByUser);

module.exports = router;
