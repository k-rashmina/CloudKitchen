const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Mount proxy routes
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`🚀 API Gateway running on port ${PORT}`);
});
