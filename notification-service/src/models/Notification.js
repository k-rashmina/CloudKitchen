const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    type: { type: String, enum: ["email", "sms"], default: "email" },
    status: { type: String, enum: ["sent", "failed"], default: "sent" },
    content: { type: String, required: true },
},

    { timestamps: true });

module.exports = mongoose.model("Notification", notificationSchema);