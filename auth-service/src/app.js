const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectRabbitMQ } = require("./utils/rabbitmq");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors(['http://localhost:5173/*'])); // Gateway URL

// Connect to RabbitMQ
connectRabbitMQ();

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    // Start the server only if MongoDB is connected
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () =>
      console.log(`🚀 Auth Service running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Exit if database connection fails
  });

app.use("/user", require("./routes/authRoutes"));

app.get("/", (req, res) => res.send("Auth Service Running"));
