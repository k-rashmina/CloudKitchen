const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
// const { connectRabbitMQ } = require("../utils/rabbitmq");
const notificationRoutes = require("./routes/notificationRoutes"); // Import routes

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" })); // Gateway URL

// Routes
app.use("/api/notifications", notificationRoutes); // Mount notification routes
app.get("/", (req, res) => res.send("Notification Service Running")); // Keep root route

// Connect to RabbitMQ (commented out)
// connectRabbitMQ();

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    const PORT = process.env.PORT || 5005;
    app.listen(PORT, () =>
      console.log(`🚀 Notification Service running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });