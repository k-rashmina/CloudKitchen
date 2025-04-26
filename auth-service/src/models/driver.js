const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: String,
  role: {
    type: String,
    enum: ["customer", "restaurant-admin", "delivery"],
    default: "delivery",
  },
  phone: String,
  status: {
    type: String,
    enum: ["available", "assigned", "inactive"],
    default: "available",
  },
  currentLocation: {
    lat: Number,
    lng: Number,
  },
  refreshTokens: { type: [String], default: [] },
});

// driverSchema.index({ currentLocation: "2dsphere" });

const Driver = mongoose.model("User", driverSchema);
module.exports = Driver;
