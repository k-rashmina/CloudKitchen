const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectRabbitMQ, publishToQueue } = require("./utils/rabbitmq");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" })); // Gateway URL

// Connect to RabbitMQ
// connectRabbitMQ();

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    // Start the server only if MongoDB is connected
    const PORT = process.env.PORT || 5003;
    app.listen(PORT, () =>
      console.log(`🚀 Order Service running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Exit if database connection fails
  });

app.get("/", (req, res) => res.send("Order Service Running"));
app.use("/order", require("./routes/orderRoutes"));


app.post("/test", (req, res) => {
  const userId = req.headers["x-user-id"];
  const role = req.headers["x-user-role"];
  const email = req.headers["x-user-email"];
  

  if (!userId) return res.status(401).json({ message: "User ID not found in request" });

  const { restaurantId, items, totalAmount } = req.body;

  // Use the userId to create an order
  res.json({ message: "Order tested work for user", userId,
    role,email,restaurantId, items, totalAmount
   });
});