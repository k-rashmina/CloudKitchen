const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    // items: [
    //   {
    //     itemId: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "MenuItem",
    //       required: true,
    //     },
    //     quantity: {
    //       type: Number,
    //       required: true,
    //       min: 1,
    //     },
    //   },
    // ],
    status: {
      type: String,
      enum: ["pending", "assigned", "delivering", "completed", "cancelled"],
      default: "pending",
    },
    pickupLocation: {
      lat: Number,
      lng: Number,
    },
    dropoffLocation: {
      lat: Number,
      lng: Number,
    },
    estimatedTime: {
      type: Date,
    },
  },
  { timestamps: true }
);

// deliverySchema.index({ dropoffLocation: "2dsphere" });

const Delivery = mongoose.model("Delivery", deliverySchema);
module.exports = Delivery;
