const mongoose = require("mongoose");
const MenuItem = require("./menuitem")
const Restaurant = require("./restaurant");

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
      enum: ["preparing", "searching-drivers", "on-the-way", "delivered", "cancelled"],
      default: "preparing",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
