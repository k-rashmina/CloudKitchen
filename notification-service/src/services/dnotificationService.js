const DeliveryNotification = require('../models/DeliveryNotification');

class NotificationService {
  // 1. Create delivery notification
  async createDeliveryNotification(driverId, deliveryJobId) {
    try {
      const notificationContent = `🚨 New delivery (${deliveryJobId}) assigned at ${new Date().toLocaleString()}`;
      
      return await DeliveryNotification.create({
        driver: driverId,
        deliveryJob: deliveryJobId,
        content: notificationContent
        // unread: true and createdAt are automatic
      });
    } catch (error) {
      throw new Error(`Notification creation failed: ${error.message}`);
    }
  }

  // 2. Get unread notifications
  async getUnreadNotifications(driverId) {
    return await DeliveryNotification.findOne({
      driver: driverId,
      unread: true
    })
  }

  // 3. Mark as read
  async markNotificationAsRead(notificationId) {
    return await DeliveryNotification.findByIdAndUpdate(
      notificationId,
      { $set: { unread: false } },
      { new: true } // Return updated doc
    );
  }
}

module.exports = new NotificationService();