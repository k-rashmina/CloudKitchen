const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    const PORT = process.env.PORT || 5006;
    app.listen(PORT, () =>
      console.log(`🚀 Payment Service running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

app.get("/", (req, res) => res.send("Payment Service Running"));
