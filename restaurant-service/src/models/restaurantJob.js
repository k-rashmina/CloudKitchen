const mongoose = require("mongoose");

const restaurantJobSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "User",
    },
    restaurantId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "Restaurant",
    },
    orderId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "orders",
    },
    items: [
      {
        itemId: {
          type: mongoose.SchemaTypes.ObjectId,
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
      enum: ["preparing", "ready", "done"],
      default: "preparing",
    },
  },
  { timestamps: true }
);

const RestaurantJob = mongoose.model("Restaurantjob", restaurantJobSchema);
module.exports = RestaurantJob;
