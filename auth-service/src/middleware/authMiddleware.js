const jwt = require("jsonwebtoken");

const userAuth = (allowedRoles) => (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Access Denied. No token provided." });
        }

        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.status(401).json({ message: "Invalid or expired token." });

            req.user = decoded; // Attach user data to request
            
            // Check if the user's role is allowed
            if (allowedRoles && !allowedRoles.includes(decoded.role)) {
                return res.status(403).json({ message: "Access Denied: You do not have permission." });
            }

            next();
        });
    } catch (error) {
        return res.status(500).json({ message: "Authentication failed.", error });
    }
};

module.exports = userAuth;
