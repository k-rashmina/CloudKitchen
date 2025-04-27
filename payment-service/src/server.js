const dotenv = require("dotenv");
const app = require("./app");
const connectDB = require("./config/db");

dotenv.config();

// Connect to MongoDB first
connectDB();

// Then start the server
const PORT = process.env.PORT || 5006;
app.listen(PORT, () => {
  console.log(`🚀 Payment Service running on port ${PORT}`);
});
