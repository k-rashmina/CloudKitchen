const notificationService = require('../services/dnotificationService');

// 1. Create notification
const createNotification = async (req, res) => {
  try {
    const { driverId, deliveryJobId } = req.body;
    
    if (!driverId || !deliveryJobId) {
      return res.status(400).json({
        success: false,
        error: "Both driverId and deliveryJobId are required"
      });
    }

    const notification = await notificationService.createDeliveryNotification(driverId, deliveryJobId);
    
    res.status(201).json({
      success: true,
      data: notification
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// 2. Get unread notifications
const getUnreadNotifications = async (req, res) => {
  try {
    const driverId = req.params.driverId;
    const notifications = await notificationService.getUnreadNotifications(driverId);
    
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// 3. Mark as read
// Updated markAsRead function
const markAsRead = async (req, res) => {
    try {
      const { notificationId } = req.params; // Now getting from URL params
      
      if (!notificationId) {
        return res.status(400).json({
          success: false,
          error: "Notification ID is required in URL parameters"
        });
      }
  
      const updatedNotification = await notificationService.markNotificationAsRead(notificationId);
      
      if (!updatedNotification) {
        return res.status(404).json({
          success: false,
          error: "Notification not found"
        });
      }
  
      res.status(200).json({
        success: true,
        data: updatedNotification
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  };

module.exports = {
  createNotification,
  getUnreadNotifications,
  markAsRead
};