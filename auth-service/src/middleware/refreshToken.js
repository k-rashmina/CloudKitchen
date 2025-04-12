const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

// Function to generate access token
const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user.id, role: user.role, name: user.name, email: user.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME }
    );
};

const refreshTokenHandler = async (req, res) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Access Denied. No token provided." });
        }

        const refreshToken = authHeader.split(" ")[1];

        // Find user with this refresh token
        const user = await User.findOne({ refreshTokens: refreshToken });
        if (!user) {
            return res.status(403).json({ message: "Invalid refresh token." });
        }

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
            if (err) return res.status(403).json({ message: "Expired or invalid refresh token." });

            // Generate a new access token
            const newAccessToken = generateAccessToken(user);

            return res.status(200).json({ accessToken: `${newAccessToken}` });
        });
    } catch (error) {
        return res.status(500).json({ message: "Token refresh failed.", error: error.message });
    }
};

module.exports = refreshTokenHandler;
