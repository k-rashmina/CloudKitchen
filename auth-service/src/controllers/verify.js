const express = require("express");
const jwt = require("jsonwebtoken");


const verify =  (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token missing or malformed" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid or expired token" });
    
    // Return the decoded token payload
    res.json({ id: decoded.id, role: decoded.role, email: decoded.email });
  });
};

module.exports = verify;
