const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" })); // Gateway URL

// // Connect to RabbitMQ
// // connectRabbitMQ();

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("✅ MongoDB Connected");
//     // Start the server only if MongoDB is connected
//     const PORT = process.env.PORT || 5006;
//     app.listen(PORT, () =>
//       console.log(`🚀 Payment Service running on port ${PORT}`)
//     );
//   })
//   .catch((err) => {
//     console.error("❌ MongoDB Connection Error:", err);
//     process.exit(1); // Exit if database connection fails
//   });

// app.get("/", (req, res) => res.send("Payment Service Running"));
