const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", 
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Restaurant",
    },
    items: [
      {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "MenuItem", 
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["pending", "preparing", "on-the-way", "delivered", "cancelled"],
      default: "pending",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);