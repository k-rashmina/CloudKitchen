const notificationService = require('../services/notificationService');

const sendOrderConfirmation = async (req, res) => {
  try {
    const { userId, orderId } = req.body;


    if (!userId || !orderId) {
      return res.status(400).json({ error: "Missing userId or orderId" });
    }

    await notificationService.sendOrderConfirmation(userId, orderId);
    res.status(200).json({ message: "Notification sent successfully" });
  } catch (error) {
    console.error('Controller Error:', {
      message: error.message,
      stack: error.stack // Full error stack trace
    });
    res.status(500).json({ error: error.message });
  }
};

module.exports = { sendOrderConfirmation };