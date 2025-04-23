const mongoose = require('mongoose');

const deliveryNotificationSchema = new mongoose.Schema({
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  deliveryJob: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DeliveryJob',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  unread: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('DeliveryNotification', deliveryNotificationSchema);