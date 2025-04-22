const notificationService = require('../services/notificationService');

const sendOrderConfirmation = async (req, res) => {
  try {
    const { userId, ...orderDetails } = req.body;

    if (!userId || !orderDetails?._id) {
      return res.status(400).json({ 
        error: "Missing required fields",
        details: {
          required: ["userId", "_id", "items", "totalAmount"]
        }
      });
    }

    await notificationService.sendOrderConfirmation(userId, orderDetails);
    
    // Simplified success response
    res.status(200).json({ 
      message: "Notification sent successfully" 
    });
  } catch (error) {
    console.error('[CONTROLLER ERROR]', error);
    res.status(500).json({ 
      error: error.message,
      // Include stack trace only in development
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack }) 
    });
  }
};

module.exports = { sendOrderConfirmation };