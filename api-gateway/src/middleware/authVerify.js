const axios = require("axios");

const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "Unauthorized: No token" });

  try {
    // Verify token by calling the Auth Service
    const response = await axios.get(`${process.env.AUTH_SERVICE_URL}/user/verify-token`, {
      headers: { Authorization: token },
    });

    const userData = response.data;

    // Attach user data to headers for downstream services
    req.headers["x-user-id"] = userData.id;
    req.headers["x-user-role"] = userData.role;
    req.headers["x-user-email"] = userData.email;

    next(); // Proceed to proxy handler
  } catch (err) {
    return res.status(401).json({ message: "Token validation failed", error: err.message });
  }
};

module.exports = authenticateUser;
