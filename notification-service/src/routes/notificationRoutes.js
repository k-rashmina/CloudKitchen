const express = require("express");
const { sendOrderConfirmation } = require("../controllers/notificationController");
const {createNotification,getUnreadNotifications,markAsRead} = require('../controllers/dnotificationController');
  

const router = express.Router();

// Order Confirmation email route
router.post("/order-confirmation", sendOrderConfirmation);



// Delivery Notification Routes
router.post('/dnotification', createNotification);
router.get('/unread/:driverId', getUnreadNotifications);
router.put('/mark-read/:notificationId', markAsRead);

module.exports = router;