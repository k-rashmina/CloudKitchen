const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
// const { connectRabbitMQ } = require("../utils/rabbitmq");
const routes = require("./routes");
const { MonitorRestaurantJobs } = require("./services/restaurant-services");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" })); // Gateway URL

// Connect to RabbitMQ
// connectRabbitMQ();

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    // Start the server only if MongoDB is connected
    const PORT = process.env.PORT || 5002;
    app.listen(PORT, () => {
      console.log(`🚀 Restaurant Service running on port ${PORT}`);
      MonitorRestaurantJobs();
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Exit if database connection fails
  });

app.use("/", routes);
app.get("/test", (req, res) => res.send("Restaurant Service Running"));
