const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes");
const cors = require("cors");
dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;



// Middleware to parse JSON
app.use(express.json());

// Enable CORS for frontend on http://localhost:5173
app.use(cors({
  origin: "http://localhost:5173",   // allow frontend origin
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],  // allowed methods
  credentials: true,  // if you need to send cookies or auth headers
}));
// Mount proxy routes
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`🚀 API Gateway running on port ${PORT}`);
});
