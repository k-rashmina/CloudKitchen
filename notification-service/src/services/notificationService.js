const User = require("../models/User");
const Notification = require("../models/Notification");
const { sendEmail } = require("./emailService");

class NotificationService {
  async sendOrderConfirmation(userId, orderDetails) {
    try {
      // Validate inputs
      if (!userId || !orderDetails) {
        throw new Error('Missing userId or orderDetails');
      }

      // Fetch user (still needed for email)
      const user = await User.findById(userId).lean();
      if (!user) throw new Error(`User ${userId} not found`);

      // Generate email content from request body
      const emailContent = this._generateEmailContent(user, orderDetails);

      // Send email and log notification
      await this._sendAndLogNotification(
        userId, 
        orderDetails._id, // Using orderId from request body
        user.email, 
        emailContent
      );

      return { success: true };
    } catch (error) {
      await this._logFailedNotification(
        userId, 
        orderDetails?._id, // Optional chaining in case orderDetails is invalid
        error
      );
      throw error;
    }
  }

  _generateEmailContent(user, order) {
    return `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 8px; overflow: hidden;">
      <!-- Header -->
      <div style="background-color: #f8f8f8; padding: 20px; text-align: center; border-bottom: 1px solid #eaeaea;">
        <h1 style="color: #2c3e50; margin: 0;">Order Confirmation</h1>
        <p style="color: #7f8c8d; margin: 5px 0 0;">Order #${order._id}</p>
      </div>

      <!-- Body -->
      <div style="padding: 20px;">
        <p style="font-size: 16px;">Dear ${user.name},</p>
        <p style="font-size: 16px;">Thank you for your order! We've prepared it and will deliver to you shortly.</p>
        
        <h3 style="color: #2c3e50; border-bottom: 1px solid #ecf0f1; padding-bottom: 8px;">Order Summary</h3>
        
        <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
          <thead>
            <tr style="background-color: #f8f9fa;">
              <th style="text-align: left; padding: 10px; border-bottom: 1px solid #ddd;">Item</th>
              <th style="text-align: right; padding: 10px; border-bottom: 1px solid #ddd;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${order.items.map(item => `
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">
                  ${item.itemId.name} × ${item.quantity}
                </td>
                <td style="text-align: right; padding: 10px; border-bottom: 1px solid #eee;">
                  Rs. ${(item.itemId.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            `).join('')}
          </tbody>
          <tfoot>
            <tr>
              <td style="padding: 10px; text-align: right; font-weight: bold;">Total:</td>
              <td style="text-align: right; padding: 10px; font-weight: bold;">Rs. ${order.totalAmount.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>

        <p style="font-size: 16px;">
          We appreciate your choise and hope you enjoy your meal!<br>
          If you have any questions about your order, please reply to this email.
        </p>
      </div>

      <!-- Footer -->
      <div style="background-color: #2c3e50; color: white; padding: 15px; text-align: center; font-size: 14px;">
        <p style="margin: 0;">© ${new Date().getFullYear()} Cloud Kitchen. All rights reserved.</p>
        <p style="margin: 5px 0 0;">
          <a href="0710165553" style="color: #3498db; text-decoration: none;">Contact Us</a> | 
          <a href="#" style="color: #3498db; text-decoration: none;">Privacy Policy</a>
        </p>
      </div>
    </div>
      
    `;
  }

  async _sendAndLogNotification(userId, orderId, email, content) {
    await Promise.all([
      sendEmail(email, "Order Confirmation", content),
      Notification.create({
        userId,
        orderId,
        type: "email",
        status: "sent",
        content
      })
    ]);
  }

  async _logFailedNotification(userId, orderId, error) {
    console.error('[NOTIFICATION FAILURE]', error.message);
    await Notification.create({
      userId,
      orderId,
      type: "email",
      status: "failed",
      content: error.message
    });
  }
}

module.exports = new NotificationService();