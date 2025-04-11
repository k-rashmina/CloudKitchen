const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { publishToQueue } = require("../utils/rabbitmq");

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
  try {
    console.log("Received registration request:", req.body);

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password and save user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    console.log("User saved successfully:", user);

    // Publish event to RabbitMQ
    publishToQueue("user_registered", { id: user._id, name, email });

    res.status(201).json({ message: "User Registered" });
  } catch (err) {
    console.error("Error during user registration:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
