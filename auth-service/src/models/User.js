const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["customer", "restaurant-admin", "delivery"], default: "customer" },
  refreshTokens: { type: [String], default: [] }
});

module.exports = mongoose.model("User", UserSchema);
