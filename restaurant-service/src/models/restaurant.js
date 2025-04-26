const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    location: {
      lat: Number,
      lng: Number,
    },
    menuItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MenuItem",
      },
    ],
  },
  { timestamps: true }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;
