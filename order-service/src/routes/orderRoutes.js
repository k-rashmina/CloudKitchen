const express = require("express");
const router = express.Router();
const { createOrder,updateOrderStatus,getOrdersByUser,cancelOrder } = require("../controllers/orderController");

router.post("/", createOrder);
router.patch("/status", updateOrderStatus); 
router.get("/user-orders", getOrdersByUser);
router.patch("/cancel/:orderId", cancelOrder);

module.exports = router;
