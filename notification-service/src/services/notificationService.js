const User = require("../models/User");
const Order = require("../models/Order");
const Notification = require("../models/Notification");
const { sendEmail } = require("./emailService");

class NotificationService {
  async sendOrderConfirmation(userId, orderId) {
    try {

      const user = await User.findById(userId).lean();
      if (!user) throw new Error(`User ${userId} not found`);

      const order = await Order.findById(orderId).lean();
      if (!order) throw new Error(`Order ${orderId} not found`);


      const emailContent = `
        <h1>Order Confirmation</h1>
        <p>Hello ${user.name}, your order (#${order._id}) has been placed!</p>
        <h3>Order Details:</h3>
        <ul>
          ${order.items.map(item => `<li>Item ID: ${item.itemId} x ${item.quantity}</li>`).join("")}
        </ul>
        <p>Total Amount: $${order.totalAmount}</p>
      `;


      await sendEmail(user.email, "Order Confirmation", emailContent);


      await Notification.create({
        userId,
        orderId,
        type: "email",
        status: "sent",
        content: emailContent,
      });

      return { success: true };
    } catch (error) {
      console.error('[ERROR] NotificationService:', error.message);
      await Notification.create({
        userId,
        orderId,
        type: "email",
        status: "failed",
        content: error.message,
      });
      throw error;
    }
  }
}

module.exports = new NotificationService();